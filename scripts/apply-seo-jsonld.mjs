#!/usr/bin/env node
/**
 * apply-seo-jsonld.mjs  (one-time, idempotent codemod — run after Node is available)
 *
 * Safe, high-value structured-data wins across the directory pages:
 *   (a) FAQPage JSON-LD on every hub page, sourced from the already-imported
 *       <X>_EDITORIAL.faq (zero new content, rich-result eligible).
 *   (b) Canonical host consistency — rewrite "https://finderslist.com" →
 *       "https://www.finderslist.com" so canonicals match the sitemap.
 *   (c) tool-page dateModified — add `dateModified: tool.lastReviewed` to the
 *       SoftwareApplication JSON-LD (the honest freshness signal; replaces the
 *       temptation of fake aggregateRating — which we deliberately do NOT add).
 *
 * Idempotent: skips pages already processed. Prints a modified/skipped report.
 * Run on ONE directory first (build it) before the whole site:
 *   node scripts/apply-seo-jsonld.mjs --only accounting-software
 *   node scripts/apply-seo-jsonld.mjs            # all directories
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const ARGV = process.argv.slice(2);
const ONLY = (() => { const i = ARGV.indexOf("--only"); return i !== -1 ? ARGV[i + 1] : null; })();

const MANIFEST = JSON.parse(readFileSync(join(ROOT, "data/directories.json"), "utf-8"));
const dirs = ONLY ? MANIFEST.filter((d) => d.route === ONLY) : MANIFEST;

const report = { hubFaq: [], hubSkip: [], toolDate: [], toolSkip: [], hostFixed: 0 };

function fixHost(src) {
  // Only rewrites the bare non-www host inside string literals; www stays www.
  if (!src.includes("https://finderslist.com")) return src;
  report.hostFixed++;
  return src.replaceAll("https://finderslist.com", "https://www.finderslist.com");
}

// ─── (a) Hub FAQPage ───────────────────────────────────────────────────────────
function processHub(route) {
  const file = join(ROOT, "app", route, "page.tsx");
  if (!existsSync(file)) { report.hubSkip.push([route, "no page.tsx"]); return; }
  let src = readFileSync(file, "utf-8");
  const before = src;
  src = fixHost(src);

  if (!src.includes("FAQPage")) {
    const ed = src.match(/import\s*\{\s*(\w+_EDITORIAL)\s*\}\s*from/);
    const hasItemList = /JSON\.stringify\(itemListJsonLd\)/.test(src);
    const returnRe = /\n(  return \(\s*\n)/;
    if (!ed) { report.hubSkip.push([route, "no *_EDITORIAL import"]); }
    else if (!hasItemList) { report.hubSkip.push([route, "no itemListJsonLd anchor"]); }
    else if (!returnRe.test(src)) { report.hubSkip.push([route, "no `  return (` anchor"]); }
    else {
      const EDI = ed[1];
      const constBlock =
        `  const faqJsonLd = {\n` +
        `    "@context": "https://schema.org",\n` +
        `    "@type": "FAQPage",\n` +
        `    mainEntity: (${EDI}.faq || []).map((f) => ({\n` +
        `      "@type": "Question",\n` +
        `      name: f.question,\n` +
        `      acceptedAnswer: { "@type": "Answer", text: f.answer },\n` +
        `    })),\n` +
        `  };\n\n`;
      src = src.replace(returnRe, "\n" + constBlock + "$1");
      // Inject a <script> right after the existing itemList JSON-LD script tag.
      src = src.replace(
        /(<script\s+type="application\/ld\+json"\s+dangerouslySetInnerHTML=\{\{\s*__html:\s*JSON\.stringify\(itemListJsonLd\)\s*\}\}\s*\/>)/,
        `$1\n      {faqJsonLd.mainEntity.length > 0 && (\n        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />\n      )}`
      );
      report.hubFaq.push(route);
    }
  } else {
    report.hubSkip.push([route, "already has FAQPage"]);
  }

  if (src !== before) writeFileSync(file, src);
}

// ─── (c) Tool-page dateModified ─────────────────────────────────────────────────
function processToolPage(route) {
  const file = join(ROOT, "app", route, "tools", "[slug]", "page.tsx");
  if (!existsSync(file)) { report.toolSkip.push([route, "no tool page"]); return; }
  let src = readFileSync(file, "utf-8");
  const before = src;
  src = fixHost(src);

  if (!src.includes("dateModified")) {
    // Anchor: the SoftwareApplication jsonLd has `url: tool.url,`. Add dateModified after it.
    const re = /(const jsonLd = \{[\s\S]*?url:\s*tool\.url,\n)/;
    if (re.test(src)) {
      src = src.replace(re, `$1    ...(tool.lastReviewed ? { dateModified: tool.lastReviewed } : {}),\n`);
      report.toolDate.push(route);
    } else {
      report.toolSkip.push([route, "no `url: tool.url,` anchor in jsonLd"]);
    }
  } else {
    report.toolSkip.push([route, "already has dateModified"]);
  }

  if (src !== before) writeFileSync(file, src);
}

for (const d of dirs) {
  processHub(d.route);
  processToolPage(d.route);
}

console.log(`\nFAQPage added to ${report.hubFaq.length} hubs; dateModified added to ${report.toolDate.length} tool pages; host-fixed files: ${report.hostFixed}`);
if (report.hubSkip.length) { console.log(`\nHub skips (${report.hubSkip.length}):`); for (const [r, why] of report.hubSkip) console.log(`  ${r}: ${why}`); }
if (report.toolSkip.length) { console.log(`\nTool-page skips (${report.toolSkip.length}):`); for (const [r, why] of report.toolSkip) console.log(`  ${r}: ${why}`); }
