import {
  TAX_PREP_TOOLS,
  TAX_PREP_CATEGORIES,
  type TaxPrepTool,
  type TaxPrepCategory,
} from "@/data/tax-preparation-software";

export { TAX_PREP_TOOLS, TAX_PREP_CATEGORIES };
export type { TaxPrepTool, TaxPrepCategory };

export function getAllTaxPrepTools(): TaxPrepTool[] {
  return TAX_PREP_TOOLS;
}

export function getFeaturedTaxPrepTools(): TaxPrepTool[] {
  return TAX_PREP_TOOLS.filter((t) => t.featured);
}

export function getTaxPrepToolBySlug(slug: string): TaxPrepTool | undefined {
  return TAX_PREP_TOOLS.find((t) => t.slug === slug);
}

export function getTaxPrepToolsByCategory(category: TaxPrepCategory): TaxPrepTool[] {
  return TAX_PREP_TOOLS.filter((t) => t.category === category);
}

export function getAllTaxPrepCategories(): TaxPrepCategory[] {
  return Object.keys(TAX_PREP_CATEGORIES) as TaxPrepCategory[];
}

export function getTaxPrepCategoryCount(category: TaxPrepCategory): number {
  return TAX_PREP_TOOLS.filter((t) => t.category === category).length;
}

export const TAX_PREP_PRICING_LABELS: Record<TaxPrepTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const TAX_PREP_PRICING_COLORS: Record<TaxPrepTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const TAX_PREP_ROLES = {} as const;

export type TaxPrepRoleKey = keyof typeof TAX_PREP_ROLES;

export function filterTaxPrepTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): TaxPrepTool[] {
  let tools = TAX_PREP_TOOLS;

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
