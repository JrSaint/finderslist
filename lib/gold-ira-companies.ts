import {
  GOLD_IRA_TOOLS,
  GOLD_IRA_CATEGORIES,
  type GoldIRATool,
  type GoldIRACategory,
} from "@/data/gold-ira-companies";

export { GOLD_IRA_TOOLS, GOLD_IRA_CATEGORIES };
export type { GoldIRATool, GoldIRACategory };

export function getAllGoldIRATools(): GoldIRATool[] {
  return GOLD_IRA_TOOLS;
}

export function getFeaturedGoldIRATools(): GoldIRATool[] {
  return GOLD_IRA_TOOLS.filter((t) => t.featured);
}

export function getGoldIRAToolBySlug(slug: string): GoldIRATool | undefined {
  return GOLD_IRA_TOOLS.find((t) => t.slug === slug);
}

export function getGoldIRAToolsByCategory(category: GoldIRACategory): GoldIRATool[] {
  return GOLD_IRA_TOOLS.filter((t) => t.category === category);
}

export function getAllGoldIRACategories(): GoldIRACategory[] {
  return Object.keys(GOLD_IRA_CATEGORIES) as GoldIRACategory[];
}

export function getGoldIRACategoryCount(category: GoldIRACategory): number {
  return GOLD_IRA_TOOLS.filter((t) => t.category === category).length;
}

export const GOLD_IRA_PRICING_LABELS: Record<GoldIRATool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const GOLD_IRA_PRICING_COLORS: Record<GoldIRATool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const GOLD_IRA_ROLES = {} as const;

export type GoldIRARoleKey = keyof typeof GOLD_IRA_ROLES;

export function filterGoldIRATools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): GoldIRATool[] {
  let tools = GOLD_IRA_TOOLS;

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
