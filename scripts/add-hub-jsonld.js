#!/usr/bin/env node
/**
 * Inject BreadcrumbList + ItemList JSON-LD into every directory hub page.
 * Hub page = app/<slug>/page.tsx (excluding non-directory pages).
 */
const fs = require("fs");
const path = require("path");

const APP_DIR = path.join(__dirname, "..", "app");
const SKIP = new Set([
  "about", "blog", "contact", "methodology",
  "privacy", "terms", "submit",
]);

const slugs = fs.readdirSync(APP_DIR).filter((d) => {
  const p = path.join(APP_DIR, d, "page.tsx");
  return fs.statSync(path.join(APP_DIR, d)).isDirectory() && fs.existsSync(p) && !SKIP.has(d);
});

const results = { modified: [], skipped: [] };

for (const slug of slugs) {
  const file = path.join(APP_DIR, slug, "page.tsx");
  let src = fs.readFileSync(file, "utf-8");

  if (src.includes("BreadcrumbList")) {
    results.skipped.push({ slug, reason: "already has BreadcrumbList" });
    continue;
  }

  // Extract display name from metadata title: "Best <Name> (2026)"
  const titleMatch = src.match(/title:\s*"Best\s+(.+?)\s*\(2026\)/);
  if (!titleMatch) {
    results.skipped.push({ slug, reason: "could not extract title" });
    continue;
  }
  let displayName = titleMatch[1].trim();
  // Strip trailing " Directory" if present (e.g., "AI Tools Directory" -> "AI Tools")
  displayName = displayName.replace(/\s+Directory$/i, "");

  // Extract page description from metadata
  const descMatch = src.match(/description:\s*\n?\s*"([^"]+)"/);
  const pageDescription = descMatch ? descMatch[1] : `Compare the best ${displayName.toLowerCase()}.`;

  // Find the default-export function name to detect the tools variable & start of return
  // Confirm it has `const allTools = `
  if (!/const\s+allTools\s*=/.test(src)) {
    results.skipped.push({ slug, reason: "no allTools variable" });
    continue;
  }

  // Find the top-level return wrapper: `<div className="min-h-screen">` (or the first <div after `return (`)
  const returnIdx = src.indexOf('return (\n    <div className="min-h-screen">');
  if (returnIdx === -1) {
    // try a more tolerant match
    const altMatch = src.match(/return \(\s*\n?\s*<div className="min-h-screen">/);
    if (!altMatch) {
      results.skipped.push({ slug, reason: "could not locate return wrapper" });
      continue;
    }
  }

  // Build the JSON-LD constants — inserted just above `return (`
  const jsonLdBlock = `  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.finderslist.com" },
      { "@type": "ListItem", position: 2, name: ${JSON.stringify(displayName)}, item: ${JSON.stringify(`https://www.finderslist.com/${slug}`)} },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: ${JSON.stringify(displayName)},
    description: ${JSON.stringify(pageDescription)},
    numberOfItems: allTools.length,
    itemListElement: allTools.slice(0, 10).map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.name,
      url: \`https://www.finderslist.com/${slug}/tools/\${tool.slug}\`,
      description: tool.tagline,
    })),
  };

`;

  // Insert the constants just before `  return (`
  const returnRegex = /\n(  return \(\s*\n)/;
  if (!returnRegex.test(src)) {
    results.skipped.push({ slug, reason: "could not find `  return (`" });
    continue;
  }
  src = src.replace(returnRegex, "\n" + jsonLdBlock + "$1");

  // Inject the two <script> tags right after the opening top-level `<div className="min-h-screen">`
  const wrapperRegex = /(<div className="min-h-screen">\s*\n)/;
  if (!wrapperRegex.test(src)) {
    results.skipped.push({ slug, reason: "could not find wrapper div" });
    continue;
  }
  const scripts =
    `      <script\n` +
    `        type="application/ld+json"\n` +
    `        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}\n` +
    `      />\n` +
    `      <script\n` +
    `        type="application/ld+json"\n` +
    `        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}\n` +
    `      />\n`;
  src = src.replace(wrapperRegex, `$1${scripts}`);

  fs.writeFileSync(file, src);
  results.modified.push({ slug, displayName });
}

console.log(`\nModified: ${results.modified.length}`);
for (const m of results.modified) console.log(`  OK  ${m.slug} -> "${m.displayName}"`);
console.log(`\nSkipped: ${results.skipped.length}`);
for (const s of results.skipped) console.log(`  SKIP ${s.slug}: ${s.reason}`);
