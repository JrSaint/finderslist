import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/data/blog";
import { DIRECTORIES, SITE_HOST, extractTools, extractCategorySlugs, featuredPairs, pairSegment } from "@/lib/directories";
import freshnessData from "@/data/_freshness.json";

const BASE_URL = SITE_HOST;

// Static fallback dates — prevents every build from marking all pages as "freshly
// modified", which wastes Google crawl budget. Pages that the monthly refresh sweep
// actually changes get a real per-path date via data/_freshness.json (below); pages
// it didn't touch keep these static dates. Bump these only on a broad manual change.
const DATE_STATIC_PAGES = new Date("2026-01-15");
const DATE_DIRECTORIES = new Date("2026-03-30");
const DATE_TOOLS = new Date("2026-03-30");

// Per-path real modification dates written by scripts/refresh-listings.mjs.
// Keys: "<route>" (hub), "<route>/category/<cat>", "<route>/tools/<slug>".
const FRESHNESS = freshnessData as Record<string, string>;

function lastMod(key: string, fallback: Date): Date {
  const iso = FRESHNESS[key];
  return iso ? new Date(iso) : fallback;
}

// Directory routes come from the shared manifest (lib/directories.ts → data/directories.json),
// the single source of truth. `path` is the URL segment; `libName` resolves the lib import
// (note: "ai-tools" → lib/tools.ts).
const CATEGORIES = DIRECTORIES.map((d) => ({ path: d.route, libName: d.libName }));

async function getAllCategoryData() {
  const categoryData: Record<string, { tools: { slug: string }[]; categories: string[] }> = {};

  for (const cat of CATEGORIES) {
    try {
      const lib = await import(`@/lib/${cat.libName}`);
      // Scan exports instead of guessing accessor names — name-guessing silently
      // dropped the tool/category URLs of 81 of 108 directories from the sitemap.
      const tools = extractTools(lib);
      const categories = extractCategorySlugs(lib);
      if (tools.length === 0) {
        console.warn(`[sitemap] zero tools extracted for ${cat.path} (lib/${cat.libName})`);
      }
      categoryData[cat.path] = { tools, categories };
    } catch {
      console.warn(`[sitemap] failed to import lib/${cat.libName} for ${cat.path}`);
      categoryData[cat.path] = { tools: [], categories: [] };
    }
  }

  return categoryData;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categoryData = await getAllCategoryData();

  const entries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: DATE_DIRECTORIES,
      changeFrequency: "weekly",
      priority: 1,
    },
    { url: `${BASE_URL}/about`, lastModified: DATE_STATIC_PAGES, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/methodology`, lastModified: DATE_STATIC_PAGES, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: DATE_STATIC_PAGES, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/submit`, lastModified: DATE_STATIC_PAGES, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/privacy`, lastModified: DATE_STATIC_PAGES, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/terms`, lastModified: DATE_STATIC_PAGES, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/blog`, lastModified: DATE_DIRECTORIES, changeFrequency: "weekly", priority: 0.8 },
  ];

  // Add blog post pages
  for (const post of BLOG_POSTS) {
    entries.push({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Add category index pages and tool/category pages dynamically
  for (const cat of CATEGORIES) {
    const { tools, categories } = categoryData[cat.path];

    // Index page
    entries.push({
      url: `${BASE_URL}/${cat.path}`,
      lastModified: lastMod(cat.path, DATE_DIRECTORIES),
      changeFrequency: "weekly",
      priority: 0.9,
    });

    // Category pages
    if (Array.isArray(categories)) {
      for (const category of categories) {
        entries.push({
          url: `${BASE_URL}/${cat.path}/category/${category}`,
          lastModified: lastMod(`${cat.path}/category/${category}`, DATE_DIRECTORIES),
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }
    }

    // Tool pages
    if (Array.isArray(tools)) {
      for (const tool of tools) {
        entries.push({
          url: `${BASE_URL}/${cat.path}/tools/${tool.slug}`,
          lastModified: lastMod(`${cat.path}/tools/${tool.slug}`, DATE_TOOLS),
          changeFrequency: "monthly",
          priority: 0.8,
        });
      }

      // Featured head-to-head comparison pages
      for (const [a, b] of featuredPairs(tools)) {
        entries.push({
          url: `${BASE_URL}/compare/${cat.path}/${pairSegment(a, b)}`,
          lastModified: lastMod(cat.path, DATE_TOOLS),
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  return entries;
}
