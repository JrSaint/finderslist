import {
  DEBT_RELIEF_TOOLS,
  DEBT_RELIEF_CATEGORIES,
  type DebtReliefTool,
  type DebtReliefCategory,
} from "@/data/debt-relief-services";

export { DEBT_RELIEF_TOOLS, DEBT_RELIEF_CATEGORIES };
export type { DebtReliefTool, DebtReliefCategory };

export function getAllDebtReliefTools(): DebtReliefTool[] {
  return DEBT_RELIEF_TOOLS;
}

export function getFeaturedDebtReliefTools(): DebtReliefTool[] {
  return DEBT_RELIEF_TOOLS.filter((t) => t.featured);
}

export function getDebtReliefToolBySlug(slug: string): DebtReliefTool | undefined {
  return DEBT_RELIEF_TOOLS.find((t) => t.slug === slug);
}

export function getDebtReliefToolsByCategory(category: DebtReliefCategory): DebtReliefTool[] {
  return DEBT_RELIEF_TOOLS.filter((t) => t.category === category);
}

export function getAllDebtReliefCategories(): DebtReliefCategory[] {
  return Object.keys(DEBT_RELIEF_CATEGORIES) as DebtReliefCategory[];
}

export function getDebtReliefCategoryCount(category: DebtReliefCategory): number {
  return DEBT_RELIEF_TOOLS.filter((t) => t.category === category).length;
}

export const DEBT_RELIEF_PRICING_LABELS: Record<DebtReliefTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const DEBT_RELIEF_PRICING_COLORS: Record<DebtReliefTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const DEBT_RELIEF_ROLES = {} as const;

export type DebtReliefRoleKey = keyof typeof DEBT_RELIEF_ROLES;

export function filterDebtReliefTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): DebtReliefTool[] {
  let tools = DEBT_RELIEF_TOOLS;

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
