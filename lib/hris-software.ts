import {
  HRIS_TOOLS,
  HRIS_CATEGORIES,
  type HRISTool,
  type HRISCategory,
} from "@/data/hris-software";

export { HRIS_TOOLS, HRIS_CATEGORIES };
export type { HRISTool, HRISCategory };

export function getAllHRISTools(): HRISTool[] {
  return HRIS_TOOLS;
}

export function getFeaturedHRISTools(): HRISTool[] {
  return HRIS_TOOLS.filter((t) => t.featured);
}

export function getHRISToolBySlug(slug: string): HRISTool | undefined {
  return HRIS_TOOLS.find((t) => t.slug === slug);
}

export function getHRISToolsByCategory(category: HRISCategory): HRISTool[] {
  return HRIS_TOOLS.filter((t) => t.category === category);
}

export function getAllHRISCategories(): HRISCategory[] {
  return Object.keys(HRIS_CATEGORIES) as HRISCategory[];
}

export function getHRISCategoryCount(category: HRISCategory): number {
  return HRIS_TOOLS.filter((t) => t.category === category).length;
}

export const HRIS_PRICING_LABELS: Record<HRISTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const HRIS_PRICING_COLORS: Record<HRISTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const HRIS_ROLES = {} as const;

export type HRISRoleKey = keyof typeof HRIS_ROLES;

export function filterHRISTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): HRISTool[] {
  let tools = HRIS_TOOLS;

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
