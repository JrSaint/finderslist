import {
  BUSINESS_LOAN_TOOLS,
  BUSINESS_LOAN_CATEGORIES,
  type BusinessLoanTool,
  type BusinessLoanCategory,
} from "@/data/business-loans";

export { BUSINESS_LOAN_TOOLS, BUSINESS_LOAN_CATEGORIES };
export type { BusinessLoanTool, BusinessLoanCategory };

export function getAllBusinessLoanTools(): BusinessLoanTool[] {
  return BUSINESS_LOAN_TOOLS;
}

export function getFeaturedBusinessLoanTools(): BusinessLoanTool[] {
  return BUSINESS_LOAN_TOOLS.filter((t) => t.featured);
}

export function getBusinessLoanToolBySlug(slug: string): BusinessLoanTool | undefined {
  return BUSINESS_LOAN_TOOLS.find((t) => t.slug === slug);
}

export function getBusinessLoanToolsByCategory(category: BusinessLoanCategory): BusinessLoanTool[] {
  return BUSINESS_LOAN_TOOLS.filter((t) => t.category === category);
}

export function getAllBusinessLoanCategories(): BusinessLoanCategory[] {
  return Object.keys(BUSINESS_LOAN_CATEGORIES) as BusinessLoanCategory[];
}

export function getBusinessLoanCategoryCount(category: BusinessLoanCategory): number {
  return BUSINESS_LOAN_TOOLS.filter((t) => t.category === category).length;
}

export const BUSINESS_LOAN_PRICING_LABELS: Record<BusinessLoanTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const BUSINESS_LOAN_PRICING_COLORS: Record<BusinessLoanTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const BUSINESS_LOAN_ROLES = {} as const;

export type BusinessLoanRoleKey = keyof typeof BUSINESS_LOAN_ROLES;

export function filterBusinessLoanTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): BusinessLoanTool[] {
  let tools = BUSINESS_LOAN_TOOLS;

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
