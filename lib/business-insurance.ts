import {
  BUSINESS_INSURANCE_TOOLS,
  BUSINESS_INSURANCE_CATEGORIES,
  type BusinessInsuranceTool,
  type BusinessInsuranceCategory,
} from "@/data/business-insurance";

export { BUSINESS_INSURANCE_TOOLS, BUSINESS_INSURANCE_CATEGORIES };
export type { BusinessInsuranceTool, BusinessInsuranceCategory };

export function getAllBusinessInsuranceTools(): BusinessInsuranceTool[] {
  return BUSINESS_INSURANCE_TOOLS;
}

export function getFeaturedBusinessInsuranceTools(): BusinessInsuranceTool[] {
  return BUSINESS_INSURANCE_TOOLS.filter((t) => t.featured);
}

export function getBusinessInsuranceToolBySlug(slug: string): BusinessInsuranceTool | undefined {
  return BUSINESS_INSURANCE_TOOLS.find((t) => t.slug === slug);
}

export function getBusinessInsuranceToolsByCategory(category: BusinessInsuranceCategory): BusinessInsuranceTool[] {
  return BUSINESS_INSURANCE_TOOLS.filter((t) => t.category === category);
}

export function getAllBusinessInsuranceCategories(): BusinessInsuranceCategory[] {
  return Object.keys(BUSINESS_INSURANCE_CATEGORIES) as BusinessInsuranceCategory[];
}

export function getBusinessInsuranceCategoryCount(category: BusinessInsuranceCategory): number {
  return BUSINESS_INSURANCE_TOOLS.filter((t) => t.category === category).length;
}

export const BUSINESS_INSURANCE_PRICING_LABELS: Record<BusinessInsuranceTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const BUSINESS_INSURANCE_PRICING_COLORS: Record<BusinessInsuranceTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const BUSINESS_INSURANCE_ROLES = {} as const;

export type BusinessInsuranceRoleKey = keyof typeof BUSINESS_INSURANCE_ROLES;

export function filterBusinessInsuranceTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): BusinessInsuranceTool[] {
  let tools = BUSINESS_INSURANCE_TOOLS;

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
