import {
  SEO_TOOL_TOOLS,
  SEO_TOOL_CATEGORIES,
  type SeoToolTool,
  type SeoToolCategory,
} from "@/data/seo-tools";

export { SEO_TOOL_TOOLS, SEO_TOOL_CATEGORIES };
export type { SeoToolTool, SeoToolCategory };

export function getAllSeoToolTools(): SeoToolTool[] {
  return SEO_TOOL_TOOLS;
}

export function getFeaturedSeoToolTools(): SeoToolTool[] {
  return SEO_TOOL_TOOLS.filter((t) => t.featured);
}

export function getSeoToolToolBySlug(slug: string): SeoToolTool | undefined {
  return SEO_TOOL_TOOLS.find((t) => t.slug === slug);
}

export function getSeoToolToolsByCategory(category: SeoToolCategory): SeoToolTool[] {
  return SEO_TOOL_TOOLS.filter((t) => t.category === category);
}

export function getAllSeoToolCategories(): SeoToolCategory[] {
  return Object.keys(SEO_TOOL_CATEGORIES) as SeoToolCategory[];
}

export function getSeoToolCategoryCount(category: SeoToolCategory): number {
  return SEO_TOOL_TOOLS.filter((t) => t.category === category).length;
}

export const SEO_TOOL_PRICING_LABELS: Record<SeoToolTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const SEO_TOOL_PRICING_COLORS: Record<SeoToolTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const SEO_TOOL_ROLES = {} as const;

export type SeoToolRoleKey = keyof typeof SEO_TOOL_ROLES;

export function filterSeoToolTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): SeoToolTool[] {
  let tools = SEO_TOOL_TOOLS;

  if (query && query.trim().length > 0) {
    const q = query.toLowerCase();
    tools = tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }

  if (pricing && ["free", "freemium", "paid"].includes(pricing)) {
    tools = tools.filter((t) => t.pricing === pricing);
  }

  return tools;
}
