import { NextResponse } from "next/server";
import { DIRECTORIES as MANIFEST, extractTools } from "@/lib/directories";

// Prerender once at build time. Index changes only when data/lib files change,
// so we get a static JSON file with no per-request cost.
export const dynamic = "force-static";
export const revalidate = false;

// ─── Directory registry ──────────────────────────────────────────────────────
// Derived from the shared manifest (lib/directories.ts → data/directories.json)
// so new directories appear in search automatically.

const DIRECTORIES = MANIFEST.map((d) => ({ path: d.route, libName: d.libName, label: d.displayName }));

interface RawTool {
  slug: string;
  name: string;
  tagline: string;
  logo: string;
  category?: string;
  tags?: string[];
}

export interface SearchIndexEntry {
  slug: string;
  name: string;
  tagline: string;
  logo: string;
  directory: string;
  directoryLabel: string;
  tags: string[];
}


export async function GET() {
  const index: SearchIndexEntry[] = [];

  for (const cat of DIRECTORIES) {
    try {
      const lib = await import(`@/lib/${cat.libName}`);
      const tools = extractTools<RawTool>(lib);
      for (const tool of tools) {
        index.push({
          slug: tool.slug,
          name: tool.name,
          tagline: tool.tagline,
          logo: tool.logo,
          directory: cat.path,
          directoryLabel: cat.label,
          tags: tool.tags ?? [],
        });
      }
    } catch {
      // Silently skip if a lib file is missing.
    }
  }

  return NextResponse.json(index, {
    headers: {
      // Long browser cache; index only changes when content does and a redeploy
      // will issue a new URL via Next.js static asset hashing.
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
    },
  });
}
