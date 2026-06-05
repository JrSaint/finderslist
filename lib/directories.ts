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
