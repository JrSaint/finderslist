import {
  INVESTMENT_PLATFORM_TOOLS,
  INVESTMENT_PLATFORM_CATEGORIES,
  type InvestmentPlatformTool,
  type InvestmentPlatformCategory,
} from "@/data/investment-platforms";

export { INVESTMENT_PLATFORM_TOOLS, INVESTMENT_PLATFORM_CATEGORIES };
export type { InvestmentPlatformTool, InvestmentPlatformCategory };

export function getAllInvestmentPlatformTools(): InvestmentPlatformTool[] {
  return INVESTMENT_PLATFORM_TOOLS;
}

export function getFeaturedInvestmentPlatformTools(): InvestmentPlatformTool[] {
  return INVESTMENT_PLATFORM_TOOLS.filter((t) => t.featured);
}

export function getInvestmentPlatformToolBySlug(slug: string): InvestmentPlatformTool | undefined {
  return INVESTMENT_PLATFORM_TOOLS.find((t) => t.slug === slug);
}

export function getInvestmentPlatformToolsByCategory(category: InvestmentPlatformCategory): InvestmentPlatformTool[] {
  return INVESTMENT_PLATFORM_TOOLS.filter((t) => t.category === category);
}

export function getAllInvestmentPlatformCategories(): InvestmentPlatformCategory[] {
  return Object.keys(INVESTMENT_PLATFORM_CATEGORIES) as InvestmentPlatformCategory[];
}

export function getInvestmentPlatformCategoryCount(category: InvestmentPlatformCategory): number {
  return INVESTMENT_PLATFORM_TOOLS.filter((t) => t.category === category).length;
}

export const INVESTMENT_PLATFORM_PRICING_LABELS: Record<InvestmentPlatformTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const INVESTMENT_PLATFORM_PRICING_COLORS: Record<InvestmentPlatformTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const INVESTMENT_PLATFORM_ROLES = {} as const;

export type InvestmentPlatformRoleKey = keyof typeof INVESTMENT_PLATFORM_ROLES;

export function filterInvestmentPlatformTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): InvestmentPlatformTool[] {
  let tools = INVESTMENT_PLATFORM_TOOLS;

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
