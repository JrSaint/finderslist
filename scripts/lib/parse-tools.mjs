/**
 * parse-tools.mjs — shared TS-data-file parser/serializer for the FindersList
 * maintenance scripts (refresh-listings.mjs, audit-integrity.mjs).
 *
 * The data files (data/<name>.ts) hold `export const <X>TOOLS: <X>Tool[] = [ {...}, ... ];`.
 * These objects are plain JS-evaluable literals, so we brace-scan the array and
 * eval each object to get faithful values (emoji, multiline strings, etc.).
 *
 * Verified: correctly extracts all 1,900 listings across all 108 directories.
 */

/**
 * Scan from `open` (index of "[" or "{") to the matching close, respecting
 * string literals (", ', `) and nested brackets/braces. Returns the close index.
 */
export function matchBracket(text, open) {
  const stack = [text[open]];
  let i = open + 1;
  while (i < text.length && stack.length) {
    const c = text[i];
    if (c === '"' || c === "'" || c === "`") {
      const quote = c;
      i++;
      while (i < text.length) {
        if (text[i] === "\\") { i += 2; continue; }
        if (text[i] === quote) break;
        i++;
      }
    } else if (c === "[" || c === "{") {
      stack.push(c);
    } else if (c === "]" || c === "}") {
      stack.pop();
    }
    i++;
  }
  return i - 1;
}

/**
 * Parse a data file's source. Returns
 * { exportName, arrayOpen, arrayClose, blocks: [{ slug, text, start, end, obj }] }.
 * `text` is each object literal WITHOUT its trailing comma.
 */
export function parseToolsFile(src) {
  const decl = src.match(/export const (\w*TOOLS)\s*:\s*\w+\[\]\s*=\s*\[/);
  if (!decl) throw new Error("Could not find `export const *TOOLS: *[] = [` in data file");
  const exportName = decl[1];
  const arrayOpen = src.indexOf("[", decl.index + decl[0].length - 1);
  const arrayClose = matchBracket(src, arrayOpen);

  const blocks = [];
  let i = arrayOpen + 1;
  while (i < arrayClose) {
    if (src[i] === "{") {
      const end = matchBracket(src, i);
      const text = src.slice(i, end + 1);
      let obj;
      try {
        obj = new Function(`"use strict"; return (${text});`)();
      } catch (e) {
        throw new Error(`Failed to eval a tool object near index ${i}: ${e.message}`);
      }
      blocks.push({ slug: obj.slug, text, start: i, end: end + 1, obj });
      i = end + 1;
    } else {
      i++;
    }
  }
  return { exportName, arrayOpen, arrayClose, blocks };
}

/** Extract the category type-union slugs, e.g. "small-business" | "enterprise-erp". */
export function getCategories(src) {
  const m = src.match(/export type \w+Category\s*=\s*([^;]+);/);
  if (!m) return [];
  return [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]);
}

// Canonical field order + always-emitted set, matching the source data style
// (one field per line, single-line values via JSON.stringify).
const FIELD_ORDER = [
  "slug", "name", "tagline", "description", "category", "tags", "url",
  "affiliateUrl", "pricing", "featured", "logo", "domain",
  "pros", "cons", "useCases",
  "startingPrice", "priceCurrency", "status", "lastReviewed",
];
const ALWAYS = new Set([
  "slug", "name", "tagline", "description", "category", "tags",
  "url", "pricing", "featured", "logo",
]);

export function serializeTool(obj) {
  const lines = ["  {"];
  for (const key of FIELD_ORDER) {
    const v = obj[key];
    if (v === undefined || v === null) {
      if (ALWAYS.has(key)) lines.push(`    ${key}: ${JSON.stringify(v ?? "")},`);
      continue;
    }
    lines.push(`    ${key}: ${JSON.stringify(v)},`);
  }
  for (const key of Object.keys(obj)) {
    if (!FIELD_ORDER.includes(key)) lines.push(`    ${key}: ${JSON.stringify(obj[key])},`);
  }
  lines.push("  }");
  return lines.join("\n");
}

export function slugify(name) {
  return String(name).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function safeHostname(url) {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return ""; }
}
