/**
 * audit-integrity.mjs
 *
 * Weekly deterministic health check for FindersList — NO LLM, no data edits.
 * Validates every listing and reports problems for human follow-up:
 *   - dead / redirected primary URLs and affiliate URLs (HTTP check)
 *   - duplicate slugs within a directory
 *   - invalid category (not in the directory's type union)
 *   - invalid pricing enum
 *   - missing required fields (name, tagline, description, url, logo)
 *   - missing domain (favicon source)
 *
 * Writes audit-logs/integrity-<date>.md, prints a summary, emails a digest if
 * GMAIL creds are set, and exits non-zero when dead links are found (so the
 * GitHub Actions run is visibly flagged). It intentionally does NOT mutate data —
 * fixes are a human/PR decision.
 *
 * Usage: node scripts/audit-integrity.mjs [--dir <route>] [--no-net]
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { parseToolsFile, getCategories } from "./lib/parse-tools.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const ARGV = process.argv.slice(2);
const ONLY_DIR = (() => { const i = ARGV.indexOf("--dir"); return i !== -1 ? ARGV[i + 1] : null; })();
const NO_NET = ARGV.includes("--no-net");
const CONCURRENCY = parseInt(process.env.CONCURRENCY || "16", 10);
const PRICING = new Set(["free", "freemium", "paid"]);

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

const MANIFEST = JSON.parse(readFileSync(join(ROOT, "data/directories.json"), "utf-8"));

// ─── HTTP liveness ─────────────────────────────────────────────────────────────

async function checkUrl(url) {
  if (!url) return { ok: true, skipped: true };
  try {
    let r = await fetch(url, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(10000), headers: { "User-Agent": "Mozilla/5.0 FindersList-bot/1.0" } });
    // Some servers reject HEAD — retry GET.
    if (r.status === 405 || r.status === 403 || r.status === 501) {
      r = await fetch(url, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(12000), headers: { "User-Agent": "Mozilla/5.0 FindersList-bot/1.0" } });
    }
    return { ok: r.status < 400, status: r.status, redirected: r.redirected, finalUrl: r.url };
  } catch (e) {
    return { ok: false, status: 0, error: e.message };
  }
}

async function pool(items, fn, concurrency) {
  const results = new Array(items.length);
  let idx = 0;
  async function worker() {
    while (idx < items.length) {
      const i = idx++;
      results[i] = await fn(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
  return results;
}

// ─── Static checks ──────────────────────────────────────────────────────────────

function staticChecks(dir, blocks, categories) {
  const issues = [];
  const seen = new Map();
  const catSet = new Set(categories);
  for (const { obj: t } of blocks) {
    const where = `${dir.route} → ${t.slug}`;
    if (seen.has(t.slug)) issues.push({ dir: dir.route, slug: t.slug, type: "duplicate-slug", detail: where });
    seen.set(t.slug, true);
    if (categories.length && !catSet.has(t.category)) issues.push({ dir: dir.route, slug: t.slug, type: "invalid-category", detail: `category "${t.category}" not in [${categories.join(", ")}]` });
    if (!PRICING.has(t.pricing)) issues.push({ dir: dir.route, slug: t.slug, type: "invalid-pricing", detail: `pricing "${t.pricing}"` });
    for (const f of ["name", "tagline", "description", "url", "logo"]) {
      if (!t[f] || String(t[f]).trim() === "") issues.push({ dir: dir.route, slug: t.slug, type: "missing-field", detail: f });
    }
    if (!t.domain) issues.push({ dir: dir.route, slug: t.slug, type: "missing-domain", detail: "no domain → favicon falls back to emoji" });
  }
  return issues;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const runDate = new Date().toISOString().slice(0, 10);
  const dirs = ONLY_DIR ? MANIFEST.filter((d) => d.route === ONLY_DIR) : MANIFEST;
  if (!dirs.length) throw new Error(`No directory matched ${ONLY_DIR}`);

  const allIssues = [];
  const linkTargets = []; // { dir, slug, kind, url }

  for (const dir of dirs) {
    let src;
    try { src = readFileSync(join(ROOT, dir.dataFile), "utf-8"); }
    catch { allIssues.push({ dir: dir.route, slug: "-", type: "missing-data-file", detail: dir.dataFile }); continue; }
    let parsed;
    try { parsed = parseToolsFile(src); }
    catch (e) { allIssues.push({ dir: dir.route, slug: "-", type: "parse-error", detail: e.message }); continue; }
    const categories = getCategories(src);
    allIssues.push(...staticChecks(dir, parsed.blocks, categories));
    for (const { obj: t } of parsed.blocks) {
      linkTargets.push({ dir: dir.route, slug: t.slug, kind: "url", url: t.url });
      if (t.affiliateUrl && t.affiliateUrl !== t.url) linkTargets.push({ dir: dir.route, slug: t.slug, kind: "affiliateUrl", url: t.affiliateUrl });
    }
  }

  let deadLinks = [];
  if (!NO_NET) {
    console.log(`🔗 Checking ${linkTargets.length} URLs (concurrency ${CONCURRENCY})…`);
    const results = await pool(linkTargets, (t) => checkUrl(t.url), CONCURRENCY);
    results.forEach((r, i) => {
      const t = linkTargets[i];
      if (!r.ok) deadLinks.push({ ...t, status: r.status, error: r.error });
      else if (r.redirected) allIssues.push({ dir: t.dir, slug: t.slug, type: "redirect", detail: `${t.kind} ${t.url} → ${r.finalUrl}` });
    });
  }

  // ─── Report ───
  const byType = {};
  for (const i of [...allIssues, ...deadLinks.map((d) => ({ ...d, type: "dead-link" }))]) {
    (byType[i.type] ||= []).push(i);
  }
  const lines = [`# Integrity audit — ${runDate}`, ``, ONLY_DIR ? `Scope: ${ONLY_DIR}` : `Scope: all ${dirs.length} directories`, ``, `Listings checked: ${linkTargets.length} URLs across ${dirs.length} directories.`, ``];
  for (const type of Object.keys(byType).sort()) {
    lines.push(`## ${type} (${byType[type].length})`);
    for (const it of byType[type].slice(0, 200)) {
      lines.push(`- \`${it.dir}/${it.slug}\` — ${it.detail || it.error || (it.status != null ? `HTTP ${it.status} ${it.url}` : "")}`);
    }
    if (byType[type].length > 200) lines.push(`- …and ${byType[type].length - 200} more`);
    lines.push("");
  }
  const report = lines.join("\n");

  const logDir = join(ROOT, "audit-logs");
  if (!existsSync(logDir)) mkdirSync(logDir, { recursive: true });
  const reportFile = join(logDir, `integrity-${runDate}${ONLY_DIR ? "-" + ONLY_DIR : ""}.md`);
  writeFileSync(reportFile, report + "\n");

  console.log(`\n📋 ${allIssues.length} static issues, ${deadLinks.length} dead links. Report: ${reportFile.replace(ROOT + "/", "")}`);
  for (const type of Object.keys(byType).sort()) console.log(`   ${type}: ${byType[type].length}`);

  if (deadLinks.length && GMAIL_USER && GMAIL_APP_PASSWORD) await emailDigest(runDate, report);

  // Flag the CI run if there are dead links (the most actionable problem).
  if (deadLinks.length > 0) process.exit(2);
}

async function emailDigest(runDate, report) {
  try {
    const nodemailer = (await import("nodemailer")).default;
    const t = nodemailer.createTransport({ host: "smtp.gmail.com", port: 465, secure: true, auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD } });
    await t.sendMail({
      from: `FindersList Integrity <${GMAIL_USER}>`,
      to: GMAIL_USER,
      subject: `FindersList integrity audit — ${runDate}`,
      text: report,
    });
    console.log("📧 Digest emailed.");
  } catch (e) {
    console.warn(`⚠️ Email failed: ${e.message}`);
  }
}

main().catch((e) => { console.error("Fatal:", e); process.exit(1); });
