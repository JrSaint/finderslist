import {
  MORTGAGE_LENDER_TOOLS,
  MORTGAGE_LENDER_CATEGORIES,
  type MortgageLenderTool,
  type MortgageLenderCategory,
} from "@/data/mortgage-lenders";

export { MORTGAGE_LENDER_TOOLS, MORTGAGE_LENDER_CATEGORIES };
export type { MortgageLenderTool, MortgageLenderCategory };

export function getAllMortgageLenderTools(): MortgageLenderTool[] {
  return MORTGAGE_LENDER_TOOLS;
}

export function getFeaturedMortgageLenderTools(): MortgageLenderTool[] {
  return MORTGAGE_LENDER_TOOLS.filter((t) => t.featured);
}

export function getMortgageLenderToolBySlug(slug: string): MortgageLenderTool | undefined {
  return MORTGAGE_LENDER_TOOLS.find((t) => t.slug === slug);
}

export function getMortgageLenderToolsByCategory(category: MortgageLenderCategory): MortgageLenderTool[] {
  return MORTGAGE_LENDER_TOOLS.filter((t) => t.category === category);
}

export function getAllMortgageLenderCategories(): MortgageLenderCategory[] {
  return Object.keys(MORTGAGE_LENDER_CATEGORIES) as MortgageLenderCategory[];
}

export function getMortgageLenderCategoryCount(category: MortgageLenderCategory): number {
  return MORTGAGE_LENDER_TOOLS.filter((t) => t.category === category).length;
}

export const MORTGAGE_LENDER_PRICING_LABELS: Record<MortgageLenderTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const MORTGAGE_LENDER_PRICING_COLORS: Record<MortgageLenderTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const MORTGAGE_LENDER_ROLES = {} as const;

export type MortgageLenderRoleKey = keyof typeof MORTGAGE_LENDER_ROLES;

export function filterMortgageLenderTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): MortgageLenderTool[] {
  let tools = MORTGAGE_LENDER_TOOLS;

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
