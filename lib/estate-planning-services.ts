import {
  ESTATE_PLANNING_TOOLS,
  ESTATE_PLANNING_CATEGORIES,
  type EstatePlanningTool,
  type EstatePlanningCategory,
} from "@/data/estate-planning-services";

export { ESTATE_PLANNING_TOOLS, ESTATE_PLANNING_CATEGORIES };
export type { EstatePlanningTool, EstatePlanningCategory };

export function getAllEstatePlanningTools(): EstatePlanningTool[] {
  return ESTATE_PLANNING_TOOLS;
}

export function getFeaturedEstatePlanningTools(): EstatePlanningTool[] {
  return ESTATE_PLANNING_TOOLS.filter((t) => t.featured);
}

export function getEstatePlanningToolBySlug(slug: string): EstatePlanningTool | undefined {
  return ESTATE_PLANNING_TOOLS.find((t) => t.slug === slug);
}

export function getEstatePlanningToolsByCategory(category: EstatePlanningCategory): EstatePlanningTool[] {
  return ESTATE_PLANNING_TOOLS.filter((t) => t.category === category);
}

export function getAllEstatePlanningCategories(): EstatePlanningCategory[] {
  return Object.keys(ESTATE_PLANNING_CATEGORIES) as EstatePlanningCategory[];
}

export function getEstatePlanningCategoryCount(category: EstatePlanningCategory): number {
  return ESTATE_PLANNING_TOOLS.filter((t) => t.category === category).length;
}

export const ESTATE_PLANNING_PRICING_LABELS: Record<EstatePlanningTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const ESTATE_PLANNING_PRICING_COLORS: Record<EstatePlanningTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const ESTATE_PLANNING_ROLES = {} as const;

export type EstatePlanningRoleKey = keyof typeof ESTATE_PLANNING_ROLES;

export function filterEstatePlanningTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): EstatePlanningTool[] {
  let tools = ESTATE_PLANNING_TOOLS;

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
