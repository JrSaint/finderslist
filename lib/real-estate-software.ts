import {
  REAL_ESTATE_TOOLS,
  REAL_ESTATE_CATEGORIES,
  type RealEstateTool,
  type RealEstateCategory,
} from "@/data/real-estate-software";

export { REAL_ESTATE_TOOLS, REAL_ESTATE_CATEGORIES };
export type { RealEstateTool, RealEstateCategory };

export function getAllRealEstateTools(): RealEstateTool[] {
  return REAL_ESTATE_TOOLS;
}

export function getFeaturedRealEstateTools(): RealEstateTool[] {
  return REAL_ESTATE_TOOLS.filter((t) => t.featured);
}

export function getRealEstateToolBySlug(slug: string): RealEstateTool | undefined {
  return REAL_ESTATE_TOOLS.find((t) => t.slug === slug);
}

export function getRealEstateToolsByCategory(category: RealEstateCategory): RealEstateTool[] {
  return REAL_ESTATE_TOOLS.filter((t) => t.category === category);
}

export function getAllRealEstateCategories(): RealEstateCategory[] {
  return Object.keys(REAL_ESTATE_CATEGORIES) as RealEstateCategory[];
}

export function getRealEstateCategoryCount(category: RealEstateCategory): number {
  return REAL_ESTATE_TOOLS.filter((t) => t.category === category).length;
}

export const REAL_ESTATE_PRICING_LABELS: Record<RealEstateTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const REAL_ESTATE_PRICING_COLORS: Record<RealEstateTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const REAL_ESTATE_ROLES = {} as const;

export type RealEstateRoleKey = keyof typeof REAL_ESTATE_ROLES;

export function filterRealEstateTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): RealEstateTool[] {
  let tools = REAL_ESTATE_TOOLS;

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
