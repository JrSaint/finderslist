/**
 * refresh-listings.mjs
 *
 * Monthly auto-refresh sweep for FindersList. Re-verifies the listings in ONE
 * directory (the GitHub Actions matrix runs one job per directory) and applies
 * accuracy / freshness / pricing / SEO updates, then commits.
 *
 * Mirrors scripts/vet-submission.mjs (Anthropic SDK + text-splice edits + git),
 * but UPDATES existing entries instead of appending new ones.
 *
 * Flow (per directory):
 *  1. Resolve the data file from the shared manifest (data/directories.json)
 *  2. Parse the *_TOOLS array into real JS objects (eval of each object literal)
 *  3. For each batch of tools: fetch homepages + ask Claude (with the web_search
 *     server tool) to verify the listing is current and propose field updates
 *  4. Apply updates via slug-anchored block replacement, ALWAYS preserving the
 *     human-curated `featured` and `affiliateUrl` fields
 *  5. Safety gate: `npx tsc --noEmit`; on failure → revert + abort (never push red)
 *  6. Change caps: small in-cap runs commit+push to main (Vercel auto-deploys);
 *     runs that exceed caps (mass removals / featured changes) open a PR instead
 *  7. Write data/_freshness.json (per-path real dates → sitemap + JSON-LD) and an
 *     audit log under audit-logs/
 *
 * Usage:
 *   node scripts/refresh-listings.mjs --dir accounting-software [--dry-run] [--no-web] [--limit N]
 *
 * Env:
 *   ANTHROPIC_API_KEY (required unless --dry-run --no-web for a parse-only smoke test)
 *   GITHUB_TOKEN, REPO        (required for PR mode / push in CI)
 *   GMAIL_USER, GMAIL_APP_PASSWORD (optional — emails the audit digest)
 *   MODEL                     (default "claude-sonnet-4-6")
 *   WEB_SEARCH_TOOL           (default "web_search_20250305")
 *   CHANGE_CAP, REMOVE_CAP, ADD_CAP, BATCH_SIZE, WEB_MAX_USES (optional overrides)
 */

// @anthropic-ai/sdk is imported lazily (only when an API key is present), so
// --dry-run / --no-web parse tests work without the SDK installed locally.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import {
  parseToolsFile, getCategories, serializeTool, slugify, safeHostname,
} from "./lib/parse-tools.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ─── Args & config ───────────────────────────────────────────────────────────

const ARGV = process.argv.slice(2);
function arg(name, fallback = undefined) {
  const i = ARGV.indexOf(`--${name}`);
  if (i === -1) return fallback;
  const next = ARGV[i + 1];
  return next && !next.startsWith("--") ? next : true;
}
const DIR_ROUTE = arg("dir");
const DRY_RUN = !!arg("dry-run", false);
const NO_WEB = !!arg("no-web", false);
const LIMIT = arg("limit") ? parseInt(arg("limit"), 10) : Infinity;

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO = process.env.REPO || "JrSaint/finderslist";
const MODEL = process.env.MODEL || "claude-sonnet-4-6";
const WEB_SEARCH_TOOL = process.env.WEB_SEARCH_TOOL || "web_search_20250305";
const BATCH_SIZE = parseInt(process.env.BATCH_SIZE || "8", 10);
const WEB_MAX_USES = parseInt(process.env.WEB_MAX_USES || "4", 10);

// Change caps — exceeding ANY of these routes the run to a PR instead of pushing live.
const CHANGE_CAP = parseInt(process.env.CHANGE_CAP || "20", 10); // tools edited per dir
const REMOVE_CAP = parseInt(process.env.REMOVE_CAP || "2", 10);  // tools removed per dir
const ADD_CAP = parseInt(process.env.ADD_CAP || "3", 10);        // tools added per dir

const SITE_URL = "https://www.finderslist.com";

// ─── Manifest ─────────────────────────────────────────────────────────────────

const MANIFEST = JSON.parse(readFileSync(join(ROOT, "data/directories.json"), "utf-8"));

function resolveDir(route) {
  const entry = MANIFEST.find((d) => d.route === route);
  if (!entry) {
    throw new Error(
      `Unknown directory "${route}". Known routes: ${MANIFEST.map((d) => d.route).join(", ")}`
    );
  }
  return entry;
}

// ─── Homepage fetch (cheap liveness + context signal) ─────────────────────────

async function fetchSnippet(url) {
  try {
    const r = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 FindersList-bot/1.0" },
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
    });
    const finalUrl = r.url;
    const html = await r.text();
    const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 1500);
    return { status: r.status, finalUrl, text };
  } catch (e) {
    return { status: 0, finalUrl: url, text: `(fetch failed: ${e.message})` };
  }
}

// ─── Claude verification (batched, with web_search + prompt caching) ──────────

function directoryContext(dir, categories) {
  return `You are the editorial maintainer of FindersList.com — a curated directory of software and services.
You are auditing existing listings in the "${dir.displayName}" directory to keep them accurate and current.
Today's date context: this runs monthly; assume "now" is the run date.

Valid category slugs for this directory: ${categories.join(", ") || "(unknown — keep existing)"}.

For EACH tool you are given, use web search to verify and decide what (if anything) to update:
- Does the product still exist? Has it shut down, rebranded, or been acquired? → set "status".
- Is the "pricing" tier (free/freemium/paid) still correct?
- Are specific prices mentioned in the description still current? If you can confirm a current entry price,
  return "startingPrice" (e.g. "$30/mo", "$99/yr", "Free") and "priceCurrency" (e.g. "USD").
- Are the description, tagline, pros, cons, or useCases materially out of date or wrong? Only rewrite a field if
  it is genuinely stale or inaccurate — otherwise OMIT it (leave unchanged). Keep the existing voice and length.
- Tags: only update if clearly wrong/missing key terms.

NEVER change "slug", "featured", "affiliateUrl", "url", "name", "logo", "domain", "category" unless the product
was renamed/rebranded (then you may update name/url/domain and note it in "reason").

You may also, at the directory level:
- Suggest notable, currently-relevant tools that are MISSING from this directory ("adds").
- Flag listings that should be REMOVED (dead/defunct/irrelevant) ("removes") — be conservative.

Output STRICTLY one JSON object as your FINAL message, no prose around it:
{
  "updates": [
    { "slug": "<existing-slug>", "changed": true|false, "reason": "<short>", "source": "<url>",
      "fields": { /* only fields to change: status, pricing, startingPrice, priceCurrency, description, tagline, tags, pros, cons, useCases, name, url, domain */ } }
  ],
  "adds": [ { "name": "...", "url": "https://...", "category": "<cat-slug>", "tagline": "...", "reason": "..." } ],
  "removes": [ { "slug": "<existing-slug>", "reason": "..." } ]
}
If a tool needs no change, include it with "changed": false and empty "fields".`;
}

async function verifyBatch(client, dir, categories, batch) {
  const sys = directoryContext(dir, categories);
  const toolLines = batch
    .map((b, i) => {
      const t = b.obj;
      return `### Tool ${i + 1}: ${t.name} (slug: ${t.slug})
- url: ${t.url}
- current pricing tier: ${t.pricing}${t.startingPrice ? ` (startingPrice: ${t.startingPrice})` : ""}
- current status: ${t.status || "active"}
- tagline: ${t.tagline}
- description: ${t.description}
- homepage HTTP ${b.snippet.status}${b.snippet.finalUrl !== t.url ? ` (redirected → ${b.snippet.finalUrl})` : ""}
- homepage text: ${b.snippet.text}`;
    })
    .join("\n\n");

  const tools = NO_WEB ? [] : [{ type: WEB_SEARCH_TOOL, name: "web_search", max_uses: WEB_MAX_USES }];

  const resp = await client.messages.create({
    model: MODEL,
    max_tokens: 4000,
    system: [{ type: "text", text: sys, cache_control: { type: "ephemeral" } }],
    tools,
    messages: [{ role: "user", content: `Audit these ${batch.length} listings:\n\n${toolLines}` }],
  });

  const textOut = resp.content.filter((c) => c.type === "text").map((c) => c.text).join("\n");
  return parseJsonObject(textOut);
}

function parseJsonObject(raw) {
  const cleaned = raw.replace(/```(?:json)?/g, "").trim();
  // Find the last balanced {...} that parses.
  let depth = 0, start = -1;
  for (let i = 0; i < cleaned.length; i++) {
    if (cleaned[i] === "{") { if (depth === 0) start = i; depth++; }
    else if (cleaned[i] === "}") { depth--; if (depth === 0 && start !== -1) {
      try { return JSON.parse(cleaned.slice(start, i + 1)); } catch { /* keep scanning */ }
    } }
  }
  throw new Error(`Could not parse JSON from model output:\n${raw.slice(0, 400)}`);
}

// ─── Apply decisions to the file text ─────────────────────────────────────────

const UPDATABLE = new Set([
  "status", "pricing", "startingPrice", "priceCurrency",
  "description", "tagline", "tags", "pros", "cons", "useCases",
  "name", "url", "domain",
]);

function applyDecisions(src, parsed, decision, runDateISO) {
  let out = src;
  const changelog = [];
  const freshnessKeys = [];
  const bySlug = Object.fromEntries(parsed.blocks.map((b) => [b.slug, b]));

  // 1) Updates (field changes) — slug-anchored block replacement.
  for (const u of decision.updates || []) {
    const block = bySlug[u.slug];
    if (!block) continue;
    const fields = u.fields || {};
    const realChanges = Object.keys(fields).filter((k) => UPDATABLE.has(k));
    if (!u.changed || realChanges.length === 0) continue;

    const merged = { ...block.obj };
    for (const k of realChanges) merged[k] = fields[k];
    // Hard guarantees: never let automation touch these.
    merged.featured = block.obj.featured;
    if (block.obj.affiliateUrl !== undefined) merged.affiliateUrl = block.obj.affiliateUrl;
    merged.lastReviewed = runDateISO;

    const newText = serializeTool(merged);
    if (out.includes(block.text)) {
      out = out.replace(block.text, newText);
      changelog.push({ kind: "update", slug: u.slug, fields: realChanges, reason: u.reason, source: u.source });
      freshnessKeys.push(`${DIR_ROUTE}/tools/${u.slug}`);
    }
  }

  // 2) Removes — only within cap; otherwise the caller routes to PR mode.
  const removes = (decision.removes || []).filter((r) => bySlug[r.slug]);
  for (const r of removes) {
    const block = bySlug[r.slug];
    // Remove the block plus its trailing comma/newline.
    const re = new RegExp(block.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\s*,?\\n?");
    if (re.test(out)) {
      out = out.replace(re, "");
      changelog.push({ kind: "remove", slug: r.slug, reason: r.reason });
    }
  }

  // 3) Adds — append before the closing `];` (like vet-submission).
  const adds = decision.adds || [];
  for (const a of adds) {
    const slug = slugify(a.name);
    if (bySlug[slug]) continue; // dup guard
    const entry = {
      slug, name: a.name, tagline: a.tagline || "", description: a.description || a.tagline || "",
      category: a.category, tags: a.tags || [], url: a.url, pricing: a.pricing || "paid",
      featured: false, logo: a.logo || "🔗",
      domain: a.domain || safeHostname(a.url), status: "active", lastReviewed: runDateISO,
    };
    const lastBracket = out.lastIndexOf("];");
    if (lastBracket !== -1) {
      out = out.slice(0, lastBracket) + serializeTool(entry) + ",\n" + out.slice(lastBracket);
      changelog.push({ kind: "add", slug, reason: a.reason });
      freshnessKeys.push(`${DIR_ROUTE}/tools/${slug}`);
    }
  }

  return { out, changelog, freshnessKeys };
}

// ─── Freshness + audit-log writers ────────────────────────────────────────────

function updateFreshness(keys, runDateISO) {
  const fp = join(ROOT, "data/_freshness.json");
  const cur = existsSync(fp) ? JSON.parse(readFileSync(fp, "utf-8")) : {};
  for (const k of keys) cur[k] = runDateISO;
  if (keys.length) cur[DIR_ROUTE] = runDateISO; // hub page changed too
  writeFileSync(fp, JSON.stringify(sortKeys(cur), null, 2) + "\n");
}
function sortKeys(o) {
  return Object.fromEntries(Object.keys(o).sort().map((k) => [k, o[k]]));
}

function writeAuditLog(dir, changelog, decision, runDateISO, mode) {
  const logDir = join(ROOT, "audit-logs");
  if (!existsSync(logDir)) mkdirSync(logDir, { recursive: true });
  const file = join(logDir, `${runDateISO}-${dir.route}.md`);
  const lines = [
    `# Refresh: ${dir.displayName} — ${runDateISO}`,
    ``,
    `Mode: **${mode}**`,
    ``,
    `## Applied changes (${changelog.length})`,
    ...changelog.map((c) =>
      c.kind === "update"
        ? `- **update** \`${c.slug}\` — fields: ${c.fields.join(", ")} — ${c.reason || ""} ${c.source ? `(${c.source})` : ""}`
        : c.kind === "remove"
        ? `- **remove** \`${c.slug}\` — ${c.reason || ""}`
        : `- **add** \`${c.slug}\` — ${c.reason || ""}`
    ),
    ``,
    `## Suggested (not auto-applied)`,
    `- adds suggested: ${(decision.adds || []).length}, removes suggested: ${(decision.removes || []).length}`,
  ];
  writeFileSync(file, lines.join("\n") + "\n");
  return file;
}

// ─── tsc gate + git ───────────────────────────────────────────────────────────

function typecheck() {
  try {
    execSync("npx tsc --noEmit", { cwd: ROOT, stdio: "pipe" });
    return { ok: true };
  } catch (e) {
    return { ok: false, output: (e.stdout?.toString() || "") + (e.stderr?.toString() || "") };
  }
}

function git(cmd) {
  return execSync(`git ${cmd}`, { cwd: ROOT, stdio: "pipe" }).toString().trim();
}

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
  if (!res.ok) throw new Error(`GitHub API ${path} → ${res.status}: ${await res.text()}`);
  return res.json();
}

// ─── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  if (!DIR_ROUTE) throw new Error("Missing --dir <route>");
  const dir = resolveDir(DIR_ROUTE);
  const dataPath = join(ROOT, dir.dataFile);
  const runDateISO = new Date().toISOString().slice(0, 10);

  console.log(`🔄 Refreshing "${dir.displayName}" (${dir.dataFile}) — ${DRY_RUN ? "DRY RUN" : "LIVE"}${NO_WEB ? " [no-web]" : ""}`);

  let src = readFileSync(dataPath, "utf-8");
  const parsed = parseToolsFile(src);
  const categories = getCategories(src);
  console.log(`   Parsed ${parsed.blocks.length} listings, ${categories.length} categories.`);

  if (!ANTHROPIC_API_KEY && !NO_WEB) throw new Error("ANTHROPIC_API_KEY required (or pass --no-web for a parse-only run)");

  let decision = { updates: [], adds: [], removes: [] };
  if (ANTHROPIC_API_KEY) {
    const { default: Anthropic } = await import("@anthropic-ai/sdk");
    const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });
    const targets = parsed.blocks.slice(0, LIMIT);
    // Attach homepage snippets.
    for (const b of targets) b.snippet = await fetchSnippet(b.obj.url);

    for (let i = 0; i < targets.length; i += BATCH_SIZE) {
      const batch = targets.slice(i, i + BATCH_SIZE);
      console.log(`   Batch ${i / BATCH_SIZE + 1}: tools ${i + 1}-${i + batch.length}…`);
      try {
        const d = await verifyBatch(client, dir, categories, batch);
        decision.updates.push(...(d.updates || []));
        if (i === 0) { decision.adds = d.adds || []; } // adds/removes are directory-level; take from first batch
        decision.removes.push(...(d.removes || []));
      } catch (e) {
        console.warn(`   ⚠️ Batch failed: ${e.message}`);
      }
    }
  } else {
    console.log("   [no-web] Skipping Claude — parse-only smoke test.");
  }

  const { out, changelog, freshnessKeys } = applyDecisions(src, parsed, decision, runDateISO);

  const nUpdates = changelog.filter((c) => c.kind === "update").length;
  const nRemoves = changelog.filter((c) => c.kind === "remove").length;
  const nAdds = changelog.filter((c) => c.kind === "add").length;
  console.log(`   Changes: ${nUpdates} updated, ${nAdds} added, ${nRemoves} removed.`);

  // Decide push-to-main vs PR based on caps.
  const overCap =
    nUpdates > CHANGE_CAP ||
    (decision.removes || []).length > REMOVE_CAP ||
    (decision.adds || []).length > ADD_CAP;
  const mode = overCap ? "PR (over cap)" : "auto-push";

  if (DRY_RUN) {
    console.log(`\n── DRY RUN — no files written. Mode would be: ${mode} ──`);
    for (const c of changelog) console.log("   ", JSON.stringify(c));
    console.log(`   Suggested adds: ${(decision.adds || []).length}, removes: ${(decision.removes || []).length}`);
    return;
  }

  if (changelog.length === 0) {
    console.log("   Nothing to change. Done.");
    return;
  }

  // Write edits, then gate on typecheck.
  writeFileSync(dataPath, out);
  updateFreshness(freshnessKeys, runDateISO);
  const auditFile = writeAuditLog(dir, changelog, decision, runDateISO, mode);

  const tc = typecheck();
  if (!tc.ok) {
    console.error("   ❌ tsc --noEmit failed — reverting edits, not committing.");
    console.error(tc.output.slice(0, 1500));
    git("checkout -- data/");
    process.exit(1);
  }
  console.log("   ✅ tsc --noEmit passed.");

  // Commit.
  const branch = overCap ? `refresh/${dir.route}-${runDateISO}` : null;
  git("add data/ audit-logs/");
  const msg = `Refresh ${dir.displayName}: ${nUpdates} updated, ${nAdds} added, ${nRemoves} removed (${runDateISO})\n\nAuto-generated by refresh-listings.mjs. See ${auditFile.replace(ROOT + "/", "")}.`;
  git(`commit -m ${JSON.stringify(msg)}`);

  if (overCap && GITHUB_TOKEN) {
    git(`checkout -b ${branch}`);
    git(`push origin ${branch} --force-with-lease`);
    const pr = await ghFetch(`/repos/${REPO}/pulls`, {
      method: "POST",
      body: {
        title: `Refresh ${dir.displayName} (${runDateISO}) — review required`,
        head: branch,
        base: "main",
        body: `Automated monthly refresh exceeded change caps (updates>${CHANGE_CAP} or removes>${REMOVE_CAP} or adds>${ADD_CAP}).\n\nReview before merging — this will deploy live.\n\nSee \`${auditFile.replace(ROOT + "/", "")}\`.`,
      },
    });
    console.log(`   🔀 Opened PR for review: ${pr.html_url}`);
  } else {
    pushToMainWithRetry();
    console.log("   🚀 Pushed to main — Vercel will deploy.");
  }
}

// Parallel matrix jobs may push near-simultaneously (they all touch
// data/_freshness.json). Rebase + retry on contention, and always reset any
// half-finished rebase before retrying so a conflict can't cascade.
function pushToMainWithRetry(attempts = 8) {
  for (let n = 1; n <= attempts; n++) {
    try {
      git("fetch origin main");
      git("rebase origin/main");
      git("push origin HEAD:main");
      return;
    } catch (e) {
      try { git("rebase --abort"); } catch { /* no rebase in progress */ }
      if (n === attempts) throw e;
      const backoff = 1500 * n;
      console.warn(`   ↻ push contention (attempt ${n}/${attempts}) — retrying in ${backoff}ms`);
      execSync(`sleep ${(backoff / 1000).toFixed(1)}`);
    }
  }
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
