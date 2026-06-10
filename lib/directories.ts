import directoriesData from "@/data/directories.json";

/**
 * Single source of truth for every directory on FindersList.
 *
 * Consumed by:
 *  - app/sitemap.ts            (route/tool/category URLs + lastModified)
 *  - scripts/refresh-listings.mjs   (monthly auto-refresh sweep)
 *  - scripts/audit-integrity.mjs    (weekly link/data integrity check)
 *  - scripts/vet-submission.mjs      (new-submission pipeline)
 *
 * NOTE for the .mjs scripts: they read `data/directories.json` directly
 * (plain JSON, no TS loader needed). Keep this file and the JSON in sync —
 * the JSON is the file the scripts edit/read; this is just the typed view.
 *
 * Excludes non-directory routes (about, blog, contact, methodology, privacy,
 * submit, terms) and the orphaned `data/directory-content*.ts` / `data/blog.ts`
 * files, which have different shapes and are not tool directories.
 */

export interface DirectoryEntry {
  /** URL segment + folder name under app/, e.g. "accounting-software". */
  route: string;
  /** lib/<libName>.ts + data/<libName>.ts basename. NOTE: "ai-tools" → "tools". */
  libName: string;
  /** Path to the data file holding the *_TOOLS array, relative to repo root. */
  dataFile: string;
  /** Human-readable directory name, e.g. "Accounting Software". */
  displayName: string;
}

export const DIRECTORIES: DirectoryEntry[] = directoriesData as DirectoryEntry[];

/** Canonical site host. Use this everywhere to avoid www / non-www drift. */
export const SITE_HOST = "https://www.finderslist.com";

export function getDirectoryByRoute(route: string): DirectoryEntry | undefined {
  return DIRECTORIES.find((d) => d.route === route);
}

/**
 * Function names across the 108 lib files don't follow one consistent rule
 * (getAllAccountingTools vs getAllERPTools vs getAllTools, etc.), so callers
 * that import libs dynamically must NOT guess names — scan exports instead.
 * Used by app/sitemap.ts and app/api/search-index/route.ts so they can't drift.
 */
export function extractTools<T extends { slug: string }>(lib: Record<string, unknown>): T[] {
  // 1. Prefer a *_TOOLS / *TOOLS array export (most common pattern).
  for (const [key, val] of Object.entries(lib)) {
    if (key.endsWith("TOOLS") && Array.isArray(val) && val.length > 0 && typeof (val[0] as T)?.slug === "string") {
      return val as T[];
    }
  }
  // 2. Fall back to a getAll*Tools accessor.
  for (const [key, val] of Object.entries(lib)) {
    if (typeof val === "function" && key.startsWith("getAll") && key.endsWith("Tools")) {
      try {
        const result = (val as () => unknown)();
        if (Array.isArray(result) && result.length > 0 && typeof (result[0] as T)?.slug === "string") {
          return result as T[];
        }
      } catch {
        // try next export
      }
    }
  }
  return [];
}

/**
 * Featured head-to-head pairs for a directory's compare pages
 * (/compare/<route>/<a>-vs-<b>). Capped at the top 5 featured, alive tools so
 * every generated page is an editorially meaningful matchup — never thin
 * all-pairs spam. Pair order is the array (rank) order; URL slugs sort
 * alphabetically for a single canonical URL per pair.
 */
export function featuredPairs<T extends { slug: string; featured?: boolean; status?: string }>(
  tools: T[]
): [T, T][] {
  const feat = tools.filter((t) => t.featured && t.status !== "shutdown").slice(0, 5);
  const pairs: [T, T][] = [];
  for (let i = 0; i < feat.length; i++) {
    for (let j = i + 1; j < feat.length; j++) {
      pairs.push([feat[i], feat[j]]);
    }
  }
  return pairs;
}

/** Canonical URL segment for a pair, alphabetical by slug. */
export function pairSegment(a: { slug: string }, b: { slug: string }): string {
  return [a.slug, b.slug].sort()[0] + "-vs-" + [a.slug, b.slug].sort()[1];
}

/** Category slugs for a directory lib module, scanned the same way. */
export function extractCategorySlugs(lib: Record<string, unknown>): string[] {
  for (const [key, val] of Object.entries(lib)) {
    if (typeof val === "function" && key.startsWith("getAll") && key.endsWith("Categories")) {
      try {
        const result = (val as () => unknown)();
        if (Array.isArray(result) && result.every((x) => typeof x === "string")) {
          return result as string[];
        }
      } catch {
        // try next export
      }
    }
  }
  for (const [key, val] of Object.entries(lib)) {
    if (key.endsWith("_CATEGORIES") && val && typeof val === "object" && !Array.isArray(val)) {
      return Object.keys(val);
    }
  }
  return [];
}
