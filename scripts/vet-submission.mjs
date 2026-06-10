/**
 * vet-submission.mjs
 *
 * Automated tool-submission pipeline for FindersList.
 * Runs inside GitHub Actions when an issue is labeled "tool-submission".
 *
 * Flow:
 *  1. Fetch open issues labeled "tool-submission" from GitHub
 *  2. Parse submission fields from the issue body
 *  3. Call Claude API to vet the tool (real product? right directory? good fit?)
 *  4. If approved → add entry to data file, commit, push (Vercel auto-deploys)
 *  5. Send approval/rejection email via Resend
 *  6. Comment on the issue and close it
 */

// @anthropic-ai/sdk is imported lazily (only in API mode), so the local
// --decision subscription mode works without the SDK installed.
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ─── Config ────────────────────────────────────────────────────────────────

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO = process.env.REPO || "JrSaint/finderslist"; // owner/repo
const MODEL = process.env.MODEL || "claude-sonnet-4-6";

// Subscription mode: a Claude Code agent produced the vetting decision via web
// search; this script just applies it (no API key / credits needed).
//   node scripts/vet-submission.mjs --issue 42 --decision /tmp/vet-42.json [--dry-run]
const ARGV = process.argv.slice(2);
function arg(name) {
  const i = ARGV.indexOf(`--${name}`);
  if (i === -1) return undefined;
  const next = ARGV[i + 1];
  return next && !next.startsWith("--") ? next : true;
}
const DECISION_FILE = arg("decision");
const DRY_RUN = !!arg("dry-run");
const SPECIFIC_ISSUE = arg("issue")
  ? parseInt(arg("issue"), 10)
  : process.env.ISSUE_NUMBER
  ? parseInt(process.env.ISSUE_NUMBER, 10)
  : null;

// Gmail SMTP requires the From address to match the authenticated account.
const FROM_EMAIL = GMAIL_USER ? `FindersList <${GMAIL_USER}>` : "FindersList";
const SITE_URL = "https://www.finderslist.com";

// All directories with their data file names and human-readable labels.
// Single source of truth: data/directories.json (see lib/directories.ts).
const DIRECTORIES = JSON.parse(
  readFileSync(join(ROOT, "data/directories.json"), "utf-8")
).map((d) => ({ path: d.route, dataFile: d.dataFile, label: d.displayName }));

// ─── GitHub helpers ─────────────────────────────────────────────────────────

async function ghFetch(path, options = {}) {
  const res = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API ${path} → ${res.status}: ${text}`);
  }
  return res.json();
}

async function getOpenSubmissions() {
  if (SPECIFIC_ISSUE) {
    const issue = await ghFetch(`/repos/${REPO}/issues/${SPECIFIC_ISSUE}`);
    if (issue.state === "open") return [issue];
    return [];
  }
  // Cron path: fetch all open issues with the label
  const issues = await ghFetch(
    `/repos/${REPO}/issues?state=open&labels=tool-submission&per_page=20`
  );
  return issues;
}

async function commentAndClose(issueNumber, body, approved) {
  // Add comment
  await ghFetch(`/repos/${REPO}/issues/${issueNumber}/comments`, {
    method: "POST",
    body: { body },
  });
  // Add result label
  await ghFetch(`/repos/${REPO}/issues/${issueNumber}/labels`, {
    method: "POST",
    body: { labels: [approved ? "submission-approved" : "submission-rejected"] },
  });
  // Close the issue
  await ghFetch(`/repos/${REPO}/issues/${issueNumber}`, {
    method: "PATCH",
    body: { state: "closed" },
  });
}

// ─── Parse issue body ───────────────────────────────────────────────────────

function parseIssueBody(body) {
  const fields = {};
  const lines = (body || "").split("\n");
  for (const line of lines) {
    const match = line.match(/^\*\*([^*]+)\*\*:\s*(.+)$/);
    if (match) {
      const key = match[1].trim().toLowerCase().replace(/\s+/g, "_");
      fields[key] = match[2].trim();
    }
  }
  return {
    toolName: fields.tool_name || "",
    url: fields.website_url || fields.url || "",
    tagline: fields.tagline || "",
    description: fields.description || "",
    suggestedDirectory: fields.suggested_directory || fields.directory || "",
    pricing: fields.pricing || "paid",
    submitterEmail: fields.submitter_email || fields.email || "",
  };
}

// ─── Read existing categories from data file ────────────────────────────────

function getExistingCategories(dataFilePath) {
  try {
    const content = readFileSync(join(ROOT, dataFilePath), "utf-8");
    // Extract the category type union: e.g. "practice-management" | "claims" | ...
    const typeMatch = content.match(/export type \w+Category = ([^;]+);/);
    if (!typeMatch) return [];
    return [...typeMatch[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  } catch {
    return [];
  }
}

function getExistingSlugs(dataFilePath) {
  try {
    const content = readFileSync(join(ROOT, dataFilePath), "utf-8");
    return [...content.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  } catch {
    return [];
  }
}

// ─── Claude API vetting ──────────────────────────────────────────────────────

async function vetWithClaude(submission, directoryInfo, existingCategories, existingSlugs) {
  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

  // Attempt to fetch the tool's homepage for extra context
  let pageSnippet = "";
  try {
    const r = await fetch(submission.url, {
      headers: { "User-Agent": "Mozilla/5.0 FindersList-bot/1.0" },
      signal: AbortSignal.timeout(8000),
    });
    const html = await r.text();
    // Grab first 2000 chars of visible text (strip tags)
    pageSnippet = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 2000);
  } catch {
    pageSnippet = "(Could not fetch the page — evaluate based on submission data alone)";
  }

  const dirList = DIRECTORIES.map((d) => `- ${d.path}: ${d.label}`).join("\n");
  const catList = existingCategories.length
    ? existingCategories.join(", ")
    : "Use your best judgment";

  const prompt = `You are an editorial reviewer for FindersList.com, a curated software and services directory.
A new tool has been submitted for listing. Evaluate it carefully and return a JSON decision.

## Submission
- Tool Name: ${submission.toolName}
- Website URL: ${submission.url}
- Tagline (from submitter): ${submission.tagline}
- Description (from submitter): ${submission.description}
- Suggested Directory: ${submission.suggestedDirectory}
- Pricing: ${submission.pricing}

## Scraped homepage snippet
${pageSnippet}

## FindersList directories (pick the best fit):
${dirList}

## Categories available in the suggested directory (${directoryInfo?.label || submission.suggestedDirectory}):
${catList}

## Already-listed slugs in this directory (to check for duplicates):
${existingSlugs.slice(0, 50).join(", ") || "none"}

## Your task
1. Decide: APPROVE or REJECT.
   - REJECT if: the URL is unreachable/404, the product clearly doesn't exist, it's spam/affiliate spam, it's a duplicate of an already-listed slug, or it's wildly off-topic for any directory.
   - APPROVE if: it's a real, legitimate product that provides genuine value to users.

2. If APPROVED, pick the best directory from the list above. Also pick the best category slug from the available categories list for that directory.

3. Generate a complete, high-quality tool entry as if written by a professional editor. Be specific, factual, and use the submitter's description + the page content as source material.

Return ONLY valid JSON (no markdown, no explanation) in this exact shape:
{
  "approved": true,
  "reason": "One sentence explaining the decision",
  "directory": "the-directory-path",
  "entry": {
    "slug": "lowercase-hyphenated-slug",
    "name": "Tool Name",
    "tagline": "One-sentence value proposition (max 100 chars)",
    "description": "2-3 sentence editorial description focusing on what it does, who it's for, and what makes it unique",
    "category": "category-slug",
    "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
    "url": "https://exact-url-from-submission",
    "pricing": "free|freemium|paid",
    "featured": false,
    "logo": "single-relevant-emoji",
    "domain": "domain.com",
    "pros": ["Pro 1", "Pro 2", "Pro 3", "Pro 4"],
    "cons": ["Con 1", "Con 2", "Con 3"],
    "useCases": ["Use case 1", "Use case 2", "Use case 3"]
  }
}

If REJECTED, use this shape:
{
  "approved": false,
  "reason": "Specific reason for rejection"
}`;

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 1500,
    messages: [{ role: "user", content: prompt }],
  });

  const raw = message.content[0].text.trim();
  // Strip any accidental markdown fences
  const json = raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  return JSON.parse(json);
}

// ─── Add tool to data file ───────────────────────────────────────────────────

function addToolToDataFile(dataFilePath, entry) {
  const fullPath = join(ROOT, dataFilePath);
  let content = readFileSync(fullPath, "utf-8");

  // Serialize the entry as a TypeScript object literal
  const entryStr = `  {
    slug: ${JSON.stringify(entry.slug)},
    name: ${JSON.stringify(entry.name)},
    tagline: ${JSON.stringify(entry.tagline)},
    description: ${JSON.stringify(entry.description)},
    category: ${JSON.stringify(entry.category)},
    tags: ${JSON.stringify(entry.tags)},
    url: ${JSON.stringify(entry.url)},
    pricing: ${JSON.stringify(entry.pricing)},
    featured: false,
    logo: ${JSON.stringify(entry.logo)},
    domain: ${JSON.stringify(entry.domain || new URL(entry.url).hostname.replace("www.", ""))},
    pros: ${JSON.stringify(entry.pros, null, 6).replace(/\n/g, "\n    ")},
    cons: ${JSON.stringify(entry.cons, null, 6).replace(/\n/g, "\n    ")},
    useCases: ${JSON.stringify(entry.useCases, null, 6).replace(/\n/g, "\n    ")},
  },`;

  // Insert before the closing ]; of the main export array
  const lastBracketIdx = content.lastIndexOf("];");
  if (lastBracketIdx === -1) throw new Error(`Could not find closing ]; in ${dataFilePath}`);

  content =
    content.slice(0, lastBracketIdx) +
    entryStr +
    "\n" +
    content.slice(lastBracketIdx);

  writeFileSync(fullPath, content, "utf-8");
  console.log(`✅ Added ${entry.name} to ${dataFilePath}`);
}

// ─── Git commit & push ───────────────────────────────────────────────────────

function commitAndPush(entry, directory) {
  const msg = `Add ${entry.name} to ${directory} directory\n\nAuto-added via tool submission pipeline.`;
  execSync(`git add data/`, { cwd: ROOT, stdio: "inherit" });
  execSync(`git commit -m ${JSON.stringify(msg)}`, { cwd: ROOT, stdio: "inherit" });
  execSync(`git push origin HEAD`, { cwd: ROOT, stdio: "inherit" });
  console.log("✅ Committed and pushed — Vercel will auto-deploy");
}

// ─── Email via Gmail SMTP ────────────────────────────────────────────────────

let _transporter = null;
async function getTransporter() {
  if (_transporter) return _transporter;
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) return null;
  const nodemailer = (await import("nodemailer")).default;
  _transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });
  return _transporter;
}

async function sendEmail({ to, subject, html }) {
  const transporter = await getTransporter();
  if (!transporter) {
    console.warn("⚠️  GMAIL_USER / GMAIL_APP_PASSWORD not set — skipping email");
    return;
  }
  try {
    await transporter.sendMail({ from: FROM_EMAIL, to, subject, html });
    console.log(`📧 Email sent to ${to}`);
  } catch (err) {
    console.warn(`⚠️  Gmail SMTP error: ${err.message}`);
  }
}

function approvalEmail(toolName, directory, slug) {
  const listingUrl = `${SITE_URL}/${directory}/tools/${slug}`;
  return `
<div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1e293b;">
  <h2 style="color:#7c3aed;">🎉 Your tool has been approved!</h2>
  <p>Great news — <strong>${toolName}</strong> has been reviewed and added to <a href="${SITE_URL}" style="color:#7c3aed;">FindersList.com</a>.</p>
  <p>Your listing is now live at:</p>
  <p style="text-align:center;">
    <a href="${listingUrl}" style="display:inline-block;background:#7c3aed;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">
      View Your Listing →
    </a>
  </p>
  <p style="color:#64748b;font-size:14px;">
    Want a <strong>featured placement</strong> at the top of the directory? Reply to this email and we'll discuss options.
  </p>
  <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />
  <p style="color:#94a3b8;font-size:12px;">FindersList · Curated directories for the tools that matter.</p>
</div>`;
}

function rejectionEmail(toolName, reason) {
  return `
<div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1e293b;">
  <h2>Your FindersList submission for ${toolName}</h2>
  <p>Thank you for submitting <strong>${toolName}</strong> to FindersList. After review, we were not able to add it at this time.</p>
  <p><strong>Reason:</strong> ${reason}</p>
  <p>If you believe this decision was made in error, or if you'd like to resubmit with more information, please reply to this email.</p>
  <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />
  <p style="color:#94a3b8;font-size:12px;">FindersList · <a href="${SITE_URL}" style="color:#94a3b8;">${SITE_URL}</a></p>
</div>`;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  if (!ANTHROPIC_API_KEY && !DECISION_FILE) {
    throw new Error("ANTHROPIC_API_KEY is required (or pass --decision <file> in subscription mode)");
  }
  if (!GITHUB_TOKEN) throw new Error("GITHUB_TOKEN is required");

  console.log("🔍 Fetching open tool submissions...");
  const issues = await getOpenSubmissions();
  console.log(`Found ${issues.length} open submission(s)`);

  for (const issue of issues) {
    console.log(`\n--- Processing issue #${issue.number}: ${issue.title} ---`);

    const submission = parseIssueBody(issue.body);

    if (!submission.toolName || !submission.url) {
      await commentAndClose(
        issue.number,
        "⚠️ Could not parse this submission — missing tool name or URL. Please resubmit using the form at https://finderslist.com/submit.",
        false
      );
      continue;
    }

    // Find best matching directory info
    const suggestedDir = DIRECTORIES.find(
      (d) =>
        d.path === submission.suggestedDirectory ||
        d.label.toLowerCase() === submission.suggestedDirectory.toLowerCase()
    );

    const existingCategories = suggestedDir
      ? getExistingCategories(suggestedDir.dataFile)
      : [];

    // Get existing slugs to check for duplicates (try suggested dir first)
    const existingSlugs = suggestedDir
      ? getExistingSlugs(suggestedDir.dataFile)
      : [];

    let decision;
    if (DECISION_FILE) {
      // Subscription mode: decision JSON was produced by a Claude Code agent.
      decision = JSON.parse(readFileSync(DECISION_FILE, "utf-8"));
      console.log(`Loaded decision from ${DECISION_FILE}`);
    } else if (!ANTHROPIC_API_KEY) {
      console.warn(`No ANTHROPIC_API_KEY and no --decision file — leaving issue #${issue.number} open.`);
      continue;
    }
    try {
      if (!decision) decision = await vetWithClaude(
        submission,
        suggestedDir,
        existingCategories,
        existingSlugs
      );
    } catch (err) {
      // Leave the issue OPEN so the daily cron and the local maintenance routine
      // can retry — an API failure (e.g. exhausted credits) must never reject a
      // legitimate submission.
      console.error(`Claude API error — leaving issue #${issue.number} open for retry:`, err.message || err);
      continue;
    }

    console.log(
      `Decision: ${decision.approved ? "✅ APPROVED" : "❌ REJECTED"} — ${decision.reason}`
    );

    if (!decision.approved) {
      if (DRY_RUN) {
        console.log(`DRY RUN — would reject issue #${issue.number}: ${decision.reason}`);
        continue;
      }
      // Rejection flow
      if (submission.submitterEmail) {
        await sendEmail({
          to: submission.submitterEmail,
          subject: `Your FindersList submission for ${submission.toolName}`,
          html: rejectionEmail(submission.toolName, decision.reason),
        });
      }
      await commentAndClose(
        issue.number,
        `❌ **Submission rejected**\n\n**Reason:** ${decision.reason}\n\n${
          submission.submitterEmail
            ? "A notification email has been sent to the submitter."
            : ""
        }`,
        false
      );
      continue;
    }

    // Approval flow
    const dir = DIRECTORIES.find((d) => d.path === decision.directory);
    if (!dir) {
      await commentAndClose(
        issue.number,
        `⚠️ Approved but could not find data file for directory "${decision.directory}". Manual addition required.`,
        false
      );
      continue;
    }

    // Re-check for duplicate in the final chosen directory
    const finalSlugs = getExistingSlugs(dir.dataFile);
    if (finalSlugs.includes(decision.entry.slug)) {
      await commentAndClose(
        issue.number,
        `⚠️ Tool with slug \`${decision.entry.slug}\` already exists in ${dir.label}. Skipping to avoid duplicate.`,
        false
      );
      continue;
    }

    if (DRY_RUN) {
      console.log(`DRY RUN — would add "${decision.entry?.name}" to ${decision.directory} and close issue #${issue.number} as ${decision.approved ? "approved" : "rejected"}.`);
      continue;
    }
    try {
      addToolToDataFile(dir.dataFile, decision.entry);
      // Never push a red tree: typecheck the data edit, revert on failure.
      try {
        execSync("npx tsc --noEmit", { cwd: ROOT, stdio: "pipe" });
      } catch (tscErr) {
        execSync("git checkout -- data/", { cwd: ROOT });
        throw new Error(`tsc failed after adding entry; edit reverted: ${(tscErr.stdout || "").toString().slice(0, 300)}`);
      }
      commitAndPush(decision.entry, decision.directory);
    } catch (err) {
      console.error("File write/commit error:", err);
      await commentAndClose(
        issue.number,
        `⚠️ Approved but failed to auto-add to the data file: ${err.message}. Manual addition required.`,
        false
      );
      continue;
    }

    const listingUrl = `${SITE_URL}/${decision.directory}/tools/${decision.entry.slug}`;

    if (submission.submitterEmail) {
      await sendEmail({
        to: submission.submitterEmail,
        subject: `🎉 ${submission.toolName} is now listed on FindersList!`,
        html: approvalEmail(submission.toolName, decision.directory, decision.entry.slug),
      });
    }

    await commentAndClose(
      issue.number,
      `✅ **Approved and published!**\n\n- **Directory:** [${dir.label}](${SITE_URL}/${decision.directory})\n- **Listing:** ${listingUrl}\n- **Category:** \`${decision.entry.category}\`\n\nVercel is deploying the change now. ${
        submission.submitterEmail
          ? "Approval email sent to submitter."
          : ""
      }`,
      true
    );

    console.log(`✅ Done — ${decision.entry.name} live at ${listingUrl}`);
  }

  console.log("\n✅ All submissions processed.");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
