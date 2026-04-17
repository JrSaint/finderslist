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

import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ─── Config ────────────────────────────────────────────────────────────────

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO = process.env.REPO || "JrSaint/finderslist"; // owner/repo
const SPECIFIC_ISSUE = process.env.ISSUE_NUMBER
  ? parseInt(process.env.ISSUE_NUMBER, 10)
  : null;

const FROM_EMAIL = "FindersList <submissions@finderslist.com>";
const SITE_URL = "https://finderslist.com";

// All directories with their data file names and human-readable labels
const DIRECTORIES = [
  { path: "ai-tools", dataFile: "data/tools.ts", label: "AI Tools" },
  { path: "marketing-tools", dataFile: "data/marketing-tools.ts", label: "Marketing Tools" },
  { path: "finance-tools", dataFile: "data/finance-tools.ts", label: "Finance Tools" },
  { path: "ecommerce-tools", dataFile: "data/ecommerce-tools.ts", label: "E-commerce Tools" },
  { path: "productivity-tools", dataFile: "data/productivity-tools.ts", label: "Productivity Tools" },
  { path: "hr-tools", dataFile: "data/hr-tools.ts", label: "HR Tools" },
  { path: "crm-tools", dataFile: "data/crm-tools.ts", label: "CRM & Sales" },
  { path: "security-tools", dataFile: "data/security-tools.ts", label: "Security Tools" },
  { path: "website-builders", dataFile: "data/website-builders.ts", label: "Website Builders" },
  { path: "creator-tools", dataFile: "data/creator-tools.ts", label: "Creator Tools" },
  { path: "developer-tools", dataFile: "data/developer-tools.ts", label: "Developer Tools" },
  { path: "design-tools", dataFile: "data/design-tools.ts", label: "Design Tools" },
  { path: "support-tools", dataFile: "data/support-tools.ts", label: "Customer Support Tools" },
  { path: "elearning-tools", dataFile: "data/elearning-tools.ts", label: "eLearning Tools" },
  { path: "analytics-tools", dataFile: "data/analytics-tools.ts", label: "Analytics Tools" },
  { path: "legal-tools", dataFile: "data/legal-tools.ts", label: "Legal Tools" },
  { path: "hosting-tools", dataFile: "data/hosting-tools.ts", label: "Hosting & Cloud" },
  { path: "social-media-tools", dataFile: "data/social-media-tools.ts", label: "Social Media Tools" },
  { path: "email-tools", dataFile: "data/email-tools.ts", label: "Email Marketing" },
  { path: "no-code-tools", dataFile: "data/no-code-tools.ts", label: "No-Code Tools" },
  { path: "accounting-software", dataFile: "data/accounting-software.ts", label: "Accounting Software" },
  { path: "appointment-scheduling-software", dataFile: "data/appointment-scheduling-software.ts", label: "Appointment Scheduling" },
  { path: "applicant-tracking-systems", dataFile: "data/applicant-tracking-systems.ts", label: "Applicant Tracking Systems" },
  { path: "auto-insurance", dataFile: "data/auto-insurance.ts", label: "Auto Insurance" },
  { path: "background-check-services", dataFile: "data/background-check-services.ts", label: "Background Check Services" },
  { path: "bankruptcy-lawyers", dataFile: "data/bankruptcy-lawyers.ts", label: "Bankruptcy Lawyers" },
  { path: "budgeting-apps", dataFile: "data/budgeting-apps.ts", label: "Budgeting Apps" },
  { path: "business-insurance", dataFile: "data/business-insurance.ts", label: "Business Insurance" },
  { path: "business-loans", dataFile: "data/business-loans.ts", label: "Business Loans" },
  { path: "business-password-managers", dataFile: "data/business-password-managers.ts", label: "Business Password Managers" },
  { path: "business-phone-systems", dataFile: "data/business-phone-systems.ts", label: "Business Phone Systems" },
  { path: "business-tax-software", dataFile: "data/business-tax-software.ts", label: "Business Tax Software" },
  { path: "business-vpn-software", dataFile: "data/business-vpn-software.ts", label: "Business VPN Software" },
  { path: "contract-management-software", dataFile: "data/contract-management-software.ts", label: "Contract Management" },
  { path: "credit-cards", dataFile: "data/credit-cards.ts", label: "Credit Cards" },
  { path: "credit-repair-services", dataFile: "data/credit-repair-services.ts", label: "Credit Repair Services" },
  { path: "cryptocurrency-exchanges", dataFile: "data/cryptocurrency-exchanges.ts", label: "Cryptocurrency Exchanges" },
  { path: "debt-relief-services", dataFile: "data/debt-relief-services.ts", label: "Debt Relief Services" },
  { path: "document-management-software", dataFile: "data/document-management-software.ts", label: "Document Management" },
  { path: "dui-lawyers", dataFile: "data/dui-lawyers.ts", label: "DUI Lawyers" },
  { path: "ecommerce-inventory-software", dataFile: "data/ecommerce-inventory-software.ts", label: "E-commerce Inventory Software" },
  { path: "ecommerce-platforms", dataFile: "data/ecommerce-platforms.ts", label: "E-commerce Platforms" },
  { path: "endpoint-security-software", dataFile: "data/endpoint-security-software.ts", label: "Endpoint Security" },
  { path: "erp-software", dataFile: "data/erp-software.ts", label: "ERP Software" },
  { path: "estate-planning-services", dataFile: "data/estate-planning-services.ts", label: "Estate Planning" },
  { path: "expense-management-software", dataFile: "data/expense-management-software.ts", label: "Expense Management" },
  { path: "field-service-management", dataFile: "data/field-service-management.ts", label: "Field Service Management" },
  { path: "fitness-apps", dataFile: "data/fitness-apps.ts", label: "Fitness Apps" },
  { path: "fleet-management-software", dataFile: "data/fleet-management-software.ts", label: "Fleet Management" },
  { path: "gold-ira-companies", dataFile: "data/gold-ira-companies.ts", label: "Gold IRA Companies" },
  { path: "health-insurance", dataFile: "data/health-insurance.ts", label: "Health Insurance" },
  { path: "home-insurance", dataFile: "data/home-insurance.ts", label: "Home Insurance" },
  { path: "home-security-systems", dataFile: "data/home-security-systems.ts", label: "Home Security Systems" },
  { path: "home-warranty-companies", dataFile: "data/home-warranty-companies.ts", label: "Home Warranty Companies" },
  { path: "hotel-booking-platforms", dataFile: "data/hotel-booking-platforms.ts", label: "Hotel Booking" },
  { path: "hris-software", dataFile: "data/hris-software.ts", label: "HRIS Software" },
  { path: "identity-theft-protection", dataFile: "data/identity-theft-protection.ts", label: "Identity Theft Protection" },
  { path: "inventory-management-software", dataFile: "data/inventory-management-software.ts", label: "Inventory Management" },
  { path: "investment-platforms", dataFile: "data/investment-platforms.ts", label: "Investment Platforms" },
  { path: "invoicing-billing-software", dataFile: "data/invoicing-billing-software.ts", label: "Invoicing & Billing" },
  { path: "legal-tools", dataFile: "data/legal-tools.ts", label: "Legal Tools" },
  { path: "life-insurance", dataFile: "data/life-insurance.ts", label: "Life Insurance" },
  { path: "llc-formation-services", dataFile: "data/llc-formation-services.ts", label: "LLC Formation Services" },
  { path: "medical-billing-software", dataFile: "data/medical-billing-software.ts", label: "Medical Billing Software" },
  { path: "mental-health-apps", dataFile: "data/mental-health-apps.ts", label: "Mental Health Apps" },
  { path: "mesothelioma-lawyers", dataFile: "data/mesothelioma-lawyers.ts", label: "Mesothelioma Lawyers" },
  { path: "mortgage-lenders", dataFile: "data/mortgage-lenders.ts", label: "Mortgage Lenders" },
  { path: "mortgage-lending-software", dataFile: "data/mortgage-lending-software.ts", label: "Mortgage Lending Software" },
  { path: "moving-companies", dataFile: "data/moving-companies.ts", label: "Moving Companies" },
  { path: "online-degree-programs", dataFile: "data/online-degree-programs.ts", label: "Online Degree Programs" },
  { path: "online-tutoring-platforms", dataFile: "data/online-tutoring-platforms.ts", label: "Online Tutoring" },
  { path: "payment-processing", dataFile: "data/payment-processing.ts", label: "Payment Processing" },
  { path: "payroll-software", dataFile: "data/payroll-software.ts", label: "Payroll Software" },
  { path: "personal-injury-lawyers", dataFile: "data/personal-injury-lawyers.ts", label: "Personal Injury Lawyers" },
  { path: "personal-loans", dataFile: "data/personal-loans.ts", label: "Personal Loans" },
  { path: "pest-control-services", dataFile: "data/pest-control-services.ts", label: "Pest Control Services" },
  { path: "pos-systems", dataFile: "data/pos-systems.ts", label: "POS Systems" },
  { path: "project-management-software", dataFile: "data/project-management-software.ts", label: "Project Management" },
  { path: "real-estate-software", dataFile: "data/real-estate-software.ts", label: "Real Estate Software" },
  { path: "robo-advisors", dataFile: "data/robo-advisors.ts", label: "Robo-Advisors" },
  { path: "solar-panel-companies", dataFile: "data/solar-panel-companies.ts", label: "Solar Panel Companies" },
  { path: "student-loans", dataFile: "data/student-loans.ts", label: "Student Loans" },
  { path: "structured-settlement-companies", dataFile: "data/structured-settlement-companies.ts", label: "Structured Settlement Companies" },
  { path: "subscription-billing-platforms", dataFile: "data/subscription-billing-platforms.ts", label: "Subscription Billing" },
  { path: "supply-chain-software", dataFile: "data/supply-chain-software.ts", label: "Supply Chain Software" },
  { path: "tax-preparation-software", dataFile: "data/tax-preparation-software.ts", label: "Tax Preparation Software" },
  { path: "tax-relief-services", dataFile: "data/tax-relief-services.ts", label: "Tax Relief Services" },
  { path: "telehealth-platforms", dataFile: "data/telehealth-platforms.ts", label: "Telehealth Platforms" },
  { path: "test-prep-services", dataFile: "data/test-prep-services.ts", label: "Test Prep Services" },
  { path: "time-tracking-software", dataFile: "data/time-tracking-software.ts", label: "Time Tracking Software" },
  { path: "travel-insurance", dataFile: "data/travel-insurance.ts", label: "Travel Insurance" },
  { path: "vacation-rental-platforms", dataFile: "data/vacation-rental-platforms.ts", label: "Vacation Rental Platforms" },
  { path: "virtual-data-rooms", dataFile: "data/virtual-data-rooms.ts", label: "Virtual Data Rooms" },
  { path: "warehouse-management-software", dataFile: "data/warehouse-management-software.ts", label: "Warehouse Management" },
  { path: "workers-comp-insurance", dataFile: "data/workers-comp-insurance.ts", label: "Workers Comp Insurance" },
  { path: "ai-agent-platforms", dataFile: "data/ai-agent-platforms.ts", label: "AI Agent Platforms" },
  { path: "ai-coding-assistants", dataFile: "data/ai-coding-assistants.ts", label: "AI Coding Assistants" },
  { path: "ai-video-generators", dataFile: "data/ai-video-generators.ts", label: "AI Video Generators" },
  { path: "addiction-treatment-centers", dataFile: "data/addiction-treatment-centers.ts", label: "Addiction Treatment Centers" },
];

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
    model: "claude-opus-4-5",
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

// ─── Email via Resend ────────────────────────────────────────────────────────

async function sendEmail({ to, subject, html }) {
  if (!RESEND_API_KEY) {
    console.warn("⚠️  RESEND_API_KEY not set — skipping email");
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
  });
  if (!res.ok) {
    const t = await res.text();
    console.warn(`⚠️  Resend error: ${res.status} ${t}`);
  } else {
    console.log(`📧 Email sent to ${to}`);
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
  if (!ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY is required");
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
    try {
      decision = await vetWithClaude(
        submission,
        suggestedDir,
        existingCategories,
        existingSlugs
      );
    } catch (err) {
      console.error("Claude API error:", err);
      await commentAndClose(
        issue.number,
        "⚠️ Automated vetting failed due to an internal error. This submission will be reviewed manually.",
        false
      );
      continue;
    }

    console.log(
      `Decision: ${decision.approved ? "✅ APPROVED" : "❌ REJECTED"} — ${decision.reason}`
    );

    if (!decision.approved) {
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

    try {
      addToolToDataFile(dir.dataFile, decision.entry);
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
