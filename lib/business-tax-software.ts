import {
  BUSINESS_TAX_TOOLS,
  BUSINESS_TAX_CATEGORIES,
  type BusinessTaxTool,
  type BusinessTaxCategory,
} from "@/data/business-tax-software";

export { BUSINESS_TAX_TOOLS, BUSINESS_TAX_CATEGORIES };
export type { BusinessTaxTool, BusinessTaxCategory };

export function getAllBusinessTaxTools(): BusinessTaxTool[] {
  return BUSINESS_TAX_TOOLS;
}

export function getFeaturedBusinessTaxTools(): BusinessTaxTool[] {
  return BUSINESS_TAX_TOOLS.filter((t) => t.featured);
}

export function getBusinessTaxToolBySlug(slug: string): BusinessTaxTool | undefined {
  return BUSINESS_TAX_TOOLS.find((t) => t.slug === slug);
}

export function getBusinessTaxToolsByCategory(category: BusinessTaxCategory): BusinessTaxTool[] {
  return BUSINESS_TAX_TOOLS.filter((t) => t.category === category);
}

export function getAllBusinessTaxCategories(): BusinessTaxCategory[] {
  return Object.keys(BUSINESS_TAX_CATEGORIES) as BusinessTaxCategory[];
}

export function getBusinessTaxCategoryCount(category: BusinessTaxCategory): number {
  return BUSINESS_TAX_TOOLS.filter((t) => t.category === category).length;
}

export const BUSINESS_TAX_PRICING_LABELS: Record<BusinessTaxTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const BUSINESS_TAX_PRICING_COLORS: Record<BusinessTaxTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const BUSINESS_TAX_ROLES = {} as const;

export type BusinessTaxRoleKey = keyof typeof BUSINESS_TAX_ROLES;

export function filterBusinessTaxTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): BusinessTaxTool[] {
  let tools = BUSINESS_TAX_TOOLS;

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
