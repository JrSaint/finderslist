import {
  MORTGAGE_LENDING_TOOLS,
  MORTGAGE_LENDING_CATEGORIES,
  type MortgageLendingTool,
  type MortgageLendingCategory,
} from "@/data/mortgage-lending-software";

export { MORTGAGE_LENDING_TOOLS, MORTGAGE_LENDING_CATEGORIES };
export type { MortgageLendingTool, MortgageLendingCategory };

export function getAllMortgageLendingTools(): MortgageLendingTool[] {
  return MORTGAGE_LENDING_TOOLS;
}

export function getFeaturedMortgageLendingTools(): MortgageLendingTool[] {
  return MORTGAGE_LENDING_TOOLS.filter((t) => t.featured);
}

export function getMortgageLendingToolBySlug(slug: string): MortgageLendingTool | undefined {
  return MORTGAGE_LENDING_TOOLS.find((t) => t.slug === slug);
}

export function getMortgageLendingToolsByCategory(category: MortgageLendingCategory): MortgageLendingTool[] {
  return MORTGAGE_LENDING_TOOLS.filter((t) => t.category === category);
}

export function getAllMortgageLendingCategories(): MortgageLendingCategory[] {
  return Object.keys(MORTGAGE_LENDING_CATEGORIES) as MortgageLendingCategory[];
}

export function getMortgageLendingCategoryCount(category: MortgageLendingCategory): number {
  return MORTGAGE_LENDING_TOOLS.filter((t) => t.category === category).length;
}

export const MORTGAGE_LENDING_PRICING_LABELS: Record<MortgageLendingTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const MORTGAGE_LENDING_PRICING_COLORS: Record<MortgageLendingTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const MORTGAGE_LENDING_ROLES = {} as const;

export type MortgageLendingRoleKey = keyof typeof MORTGAGE_LENDING_ROLES;

export function filterMortgageLendingTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): MortgageLendingTool[] {
  let tools = MORTGAGE_LENDING_TOOLS;

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
