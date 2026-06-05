import {
  TAX_RELIEF_TOOLS,
  TAX_RELIEF_CATEGORIES,
  type TaxReliefTool,
  type TaxReliefCategory,
} from "@/data/tax-relief-services";

export { TAX_RELIEF_TOOLS, TAX_RELIEF_CATEGORIES };
export type { TaxReliefTool, TaxReliefCategory };

export function getAllTaxReliefTools(): TaxReliefTool[] {
  return TAX_RELIEF_TOOLS;
}

export function getFeaturedTaxReliefTools(): TaxReliefTool[] {
  return TAX_RELIEF_TOOLS.filter((t) => t.featured);
}

export function getTaxReliefToolBySlug(slug: string): TaxReliefTool | undefined {
  return TAX_RELIEF_TOOLS.find((t) => t.slug === slug);
}

export function getTaxReliefToolsByCategory(category: TaxReliefCategory): TaxReliefTool[] {
  return TAX_RELIEF_TOOLS.filter((t) => t.category === category);
}

export function getAllTaxReliefCategories(): TaxReliefCategory[] {
  return Object.keys(TAX_RELIEF_CATEGORIES) as TaxReliefCategory[];
}

export function getTaxReliefCategoryCount(category: TaxReliefCategory): number {
  return TAX_RELIEF_TOOLS.filter((t) => t.category === category).length;
}

export const TAX_RELIEF_PRICING_LABELS: Record<TaxReliefTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const TAX_RELIEF_PRICING_COLORS: Record<TaxReliefTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const TAX_RELIEF_ROLES = {} as const;

export type TaxReliefRoleKey = keyof typeof TAX_RELIEF_ROLES;

export function filterTaxReliefTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): TaxReliefTool[] {
  let tools = TAX_RELIEF_TOOLS;

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
