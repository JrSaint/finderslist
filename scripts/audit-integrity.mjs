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
 * GMAIL creds are set, and surfaces findings via a GitHub step summary plus a
 * ::warning:: annotation. It always exits 0 when it ran successfully — findings
 * are the audit WORKING; a red run means the script itself crashed. Links are
 * classified (dead vs bot-blocked vs unreachable vs cross-domain redirect) so
 * 403/429 bot protection doesn't masquerade as dead links. It intentionally
 * does NOT mutate data — fixes are a human/PR decision.
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
// Classification matters more than raw status: most big sites (OpenAI, Canva,
// BambooHR…) return 403/429 to non-browser clients, which is NOT a dead link.
// Only 404/410 on a browser-headed GET counts as confirmed dead.

const BROWSER_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

async function checkUrl(url) {
  if (!url) return { class: "ok", skipped: true };
  const attempt = (method, timeout) =>
    fetch(url, { method, redirect: "follow", signal: AbortSignal.timeout(timeout), headers: BROWSER_HEADERS });

  let r = null, err = null;
  try { r = await attempt("HEAD", 10000); } catch (e) { err = e; }
  // Fall back to GET on any HEAD failure or 4xx/5xx — many servers mishandle HEAD.
  if (!r || r.status >= 400) {
    try { r = await attempt("GET", 12000); err = null; } catch (e) { err = e; }
  }
  if (err) {
    // One retry for transient network errors before calling it unreachable.
    await new Promise((res) => setTimeout(res, 1500));
    try { r = await attempt("GET", 12000); err = null; } catch (e) { err = e; }
  }
  if (err) return { class: "unreachable", error: err.message };

  const s = r.status;
  if (s === 404 || s === 410) return { class: "dead", status: s };
  if (s === 401 || s === 403 || s === 405 || s === 429 || s === 503)
    return { class: "blocked", status: s }; // bot protection / rate limit — site is alive
  if (s >= 400) return { class: "http-error", status: s };
  return { class: "ok", status: s, redirected: r.redirected, finalUrl: r.url };
}

/** Registrable domain (last two labels) — good enough to spot real rebrands. */
function regDomain(host) {
  try { return host.replace(/^www\./, "").split(".").slice(-2).join("."); } catch { return host; }
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
      if (r.class === "dead") {
        deadLinks.push({ ...t, status: r.status });
      } else if (r.class === "unreachable") {
        allIssues.push({ dir: t.dir, slug: t.slug, type: "unreachable", detail: `${t.kind} ${t.url} — ${r.error}` });
      } else if (r.class === "http-error") {
        allIssues.push({ dir: t.dir, slug: t.slug, type: "http-error", detail: `${t.kind} HTTP ${r.status} ${t.url}` });
      } else if (r.class === "blocked") {
        // Bot protection / rate limiting — the site is alive. Informational only.
        allIssues.push({ dir: t.dir, slug: t.slug, type: "bot-blocked (info)", detail: `${t.kind} HTTP ${r.status} ${t.url}` });
      } else if (r.redirected && r.finalUrl) {
        // Only cross-domain redirects matter (possible rebrand/acquisition);
        // www/https/path-level redirects are routine noise.
        try {
          if (regDomain(new URL(t.url).hostname) !== regDomain(new URL(r.finalUrl).hostname)) {
            allIssues.push({ dir: t.dir, slug: t.slug, type: "redirect-crossdomain", detail: `${t.kind} ${t.url} → ${r.finalUrl}` });
          }
        } catch { /* unparseable URL — ignore */ }
      }
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

  console.log(`\n📋 ${allIssues.length} findings, ${deadLinks.length} confirmed-dead links. Report: ${reportFile.replace(ROOT + "/", "")}`);
  for (const type of Object.keys(byType).sort()) console.log(`   ${type}: ${byType[type].length}`);

  // Surface findings in the GitHub Actions UI without failing the run:
  // a step summary table plus a ::warning:: annotation for confirmed-dead links.
  if (process.env.GITHUB_STEP_SUMMARY) {
    const summary = [`### Integrity audit — ${runDate}`, "", "| Finding | Count |", "|---|---|",
      ...Object.keys(byType).sort().map((t) => `| ${t} | ${byType[t].length} |`),
      "", `Full report in the \`integrity-report\` artifact.`].join("\n");
    writeFileSync(process.env.GITHUB_STEP_SUMMARY, summary + "\n", { flag: "a" });
  }
  if (deadLinks.length > 0) {
    console.log(`::warning title=Integrity audit::${deadLinks.length} confirmed-dead link(s) (HTTP 404/410). See the integrity-report artifact.`);
  }

  if (deadLinks.length && GMAIL_USER && GMAIL_APP_PASSWORD) await emailDigest(runDate, report);

  // Exit 0 on findings — a finding is the audit WORKING, not failing. Non-zero
  // exits are reserved for genuine crashes so a red run always means "broken".
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
