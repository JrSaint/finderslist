import {
  MARKETING_AUTOMATION_TOOLS,
  MARKETING_AUTOMATION_CATEGORIES,
  type MarketingAutomationTool,
  type MarketingAutomationCategory,
} from "@/data/marketing-automation-software";

export { MARKETING_AUTOMATION_TOOLS, MARKETING_AUTOMATION_CATEGORIES };
export type { MarketingAutomationTool, MarketingAutomationCategory };

export function getAllMarketingAutomationTools(): MarketingAutomationTool[] {
  return MARKETING_AUTOMATION_TOOLS;
}

export function getFeaturedMarketingAutomationTools(): MarketingAutomationTool[] {
  return MARKETING_AUTOMATION_TOOLS.filter((t) => t.featured);
}

export function getMarketingAutomationToolBySlug(slug: string): MarketingAutomationTool | undefined {
  return MARKETING_AUTOMATION_TOOLS.find((t) => t.slug === slug);
}

export function getMarketingAutomationToolsByCategory(category: MarketingAutomationCategory): MarketingAutomationTool[] {
  return MARKETING_AUTOMATION_TOOLS.filter((t) => t.category === category);
}

export function getAllMarketingAutomationCategories(): MarketingAutomationCategory[] {
  return Object.keys(MARKETING_AUTOMATION_CATEGORIES) as MarketingAutomationCategory[];
}

export function getMarketingAutomationCategoryCount(category: MarketingAutomationCategory): number {
  return MARKETING_AUTOMATION_TOOLS.filter((t) => t.category === category).length;
}

export const MARKETING_AUTOMATION_PRICING_LABELS: Record<MarketingAutomationTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const MARKETING_AUTOMATION_PRICING_COLORS: Record<MarketingAutomationTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const MARKETING_AUTOMATION_ROLES = {} as const;

export type MarketingAutomationRoleKey = keyof typeof MARKETING_AUTOMATION_ROLES;

export function filterMarketingAutomationTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): MarketingAutomationTool[] {
  let tools = MARKETING_AUTOMATION_TOOLS;

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
