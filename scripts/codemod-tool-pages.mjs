/**
 * codemod-tool-pages.mjs — one-time pass over all 108 app/<dir>/tools/[slug]/page.tsx
 * copies. Implements audit ranks 5, 6, 9 + the og:image fix:
 *
 *  A. <AuthorBadge /> → pass lastReviewed + hasAffiliate
 *  B. insert `const isDead = tool.status === "shutdown";` after the visitUrl decl
 *  C. JSON-LD availability → Discontinued when dead
 *  D. JSON-LD offers → real price from startingPrice when present
 *  E. CTA text → "No longer available" + de-affiliated href when dead
 *  F. rel → sponsored/nofollow only on affiliate links
 *  G. pricing copy → prefix actual "From $X" when known
 *  H. openGraph → explicit images (child openGraph otherwise wipes the root file image)
 *  I. ToolStatusNotice banner + import
 *  J. affiliate-note contrast bump (text-white/30 → /60)
 *
 * Usage: node scripts/codemod-tool-pages.mjs [--dry-run]
 * Prints per-transform totals and every file whose counts deviate.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DRY = process.argv.includes("--dry-run");

const files = readdirSync(join(ROOT, "app"))
  .map((d) => `app/${d}/tools/[slug]/page.tsx`)
  .filter((p) => existsSync(join(ROOT, p)))
  .sort();

const totals = {};
const anomalies = [];
function apply(file, src, name, from, to, expected) {
  let count = 0;
  let out = src;
  if (from instanceof RegExp) {
    out = src.replace(from, (...m) => { count++; return typeof to === "function" ? to(...m) : to; });
  } else {
    // Single-pass replace-all: safe even when `to` contains `from`.
    const parts = src.split(from);
    count = parts.length - 1;
    out = parts.join(to);
  }
  totals[name] = (totals[name] || 0) + count;
  if (expected !== undefined && count !== expected && !expected.includes?.(count)) {
    if (Array.isArray(expected) ? !expected.includes(count) : count !== expected) {
      anomalies.push(`${file}: ${name} count=${count} (expected ${expected})`);
    }
  }
  return out;
}

for (const rel of files) {
  const file = join(ROOT, rel);
  let s = readFileSync(file, "utf-8");
  const dir = rel.split("/")[1];

  // A. AuthorBadge props
  s = apply(rel, s, "A-authorbadge", "<AuthorBadge />",
    "<AuthorBadge lastReviewed={tool.lastReviewed} hasAffiliate={!!tool.affiliateUrl} />", 1);

  // B. isDead decl
  s = apply(rel, s, "B-isDead", "const visitUrl = tool.affiliateUrl || tool.url;",
    'const visitUrl = tool.affiliateUrl || tool.url;\n  const isDead = tool.status === "shutdown";', 1);

  // C. availability
  s = apply(rel, s, "C-availability", 'availability: "https://schema.org/OnlineOnly"',
    'availability: isDead ? "https://schema.org/Discontinued" : "https://schema.org/OnlineOnly"', [0, 1]);

  // D. offers price
  s = apply(rel, s, "D-offers",
    '...(tool.pricing === "free" ? { price: "0", priceCurrency: "USD" } : {})',
    '...(tool.startingPrice ? { price: tool.startingPrice.replace(/[^0-9.]/g, ""), priceCurrency: tool.priceCurrency || "USD" } : tool.pricing === "free" ? { price: "0", priceCurrency: "USD" } : {})',
    [0, 1]);

  // E. CTA text + href
  s = apply(rel, s, "E-visit-text", /(>\s*)Visit \{tool\.name\}/g,
    (m, p1) => `${p1}{isDead ? "No longer available" : <>Visit {tool.name}</>}`, [0, 1, 2]);
  s = apply(rel, s, "E-open-text", "Open {tool.name} →",
    '{isDead ? "No longer available" : <>Open {tool.name} →</>}', [0, 1]);
  s = apply(rel, s, "E-href", "href={visitUrl}", "href={isDead ? tool.url : visitUrl}", [1, 3]);

  // F. rel sponsored (affiliate-aware), both observed variants
  s = apply(rel, s, "F-rel-nofollow", 'rel="noopener noreferrer nofollow"',
    'rel={tool.affiliateUrl ? "sponsored nofollow noopener noreferrer" : "noopener noreferrer"}', [0, 3]);
  s = apply(rel, s, "F-rel-plain", 'href={isDead ? tool.url : visitUrl} target="_blank" rel="noopener noreferrer"',
    'href={isDead ? tool.url : visitUrl} target="_blank" rel={tool.affiliateUrl ? "sponsored nofollow noopener noreferrer" : "noopener noreferrer"}', [0, 1]);

  // G. pricing copy prefix
  s = apply(rel, s, "G-pricing-copy", "{pricingDetail}</p>",
    '{tool.startingPrice ? `From ${tool.startingPrice}. ` : ""}{pricingDetail}</p>', [0, 1, 2, 3]);

  // H. og images
  s = apply(rel, s, "H-og-images", /openGraph: \{\n(\s+)title/g,
    (m, p1) => `openGraph: {\n${p1}images: ["/og-image.png"],\n${p1}title`, [0, 1]);

  // I. ToolStatusNotice import + banner
  s = apply(rel, s, "I-import", 'import AuthorBadge from "@/components/AuthorBadge";',
    'import AuthorBadge from "@/components/AuthorBadge";\nimport ToolStatusNotice from "@/components/ToolStatusNotice";', 1);
  s = apply(rel, s, "I-banner", /(\n\s+<nav className="flex items-center gap-2 text-sm)/,
    (m, p1) => `\n      <ToolStatusNotice status={tool.status} name={tool.name} />${p1}`, 1);

  // J. affiliate-note contrast
  s = apply(rel, s, "J-contrast", 'text-xs text-white/30 text-center">* Affiliate link',
    'text-xs text-white/60 text-center">* Affiliate link', [0, 1]);

  if (!DRY) writeFileSync(file, s);
}

console.log(`${DRY ? "DRY RUN — " : ""}${files.length} files processed`);
for (const [k, v] of Object.entries(totals).sort()) console.log(`  ${k}: ${v}`);
if (anomalies.length) {
  console.log(`\nANOMALIES (${anomalies.length}):`);
  for (const a of anomalies) console.log("  " + a);
} else {
  console.log("\nNo anomalies — all counts within expected ranges.");
}
