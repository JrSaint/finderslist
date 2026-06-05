import {
  CREDIT_REPAIR_TOOLS,
  CREDIT_REPAIR_CATEGORIES,
  type CreditRepairTool,
  type CreditRepairCategory,
} from "@/data/credit-repair-services";

export { CREDIT_REPAIR_TOOLS, CREDIT_REPAIR_CATEGORIES };
export type { CreditRepairTool, CreditRepairCategory };

export function getAllCreditRepairTools(): CreditRepairTool[] {
  return CREDIT_REPAIR_TOOLS;
}

export function getFeaturedCreditRepairTools(): CreditRepairTool[] {
  return CREDIT_REPAIR_TOOLS.filter((t) => t.featured);
}

export function getCreditRepairToolBySlug(slug: string): CreditRepairTool | undefined {
  return CREDIT_REPAIR_TOOLS.find((t) => t.slug === slug);
}

export function getCreditRepairToolsByCategory(category: CreditRepairCategory): CreditRepairTool[] {
  return CREDIT_REPAIR_TOOLS.filter((t) => t.category === category);
}

export function getAllCreditRepairCategories(): CreditRepairCategory[] {
  return Object.keys(CREDIT_REPAIR_CATEGORIES) as CreditRepairCategory[];
}

export function getCreditRepairCategoryCount(category: CreditRepairCategory): number {
  return CREDIT_REPAIR_TOOLS.filter((t) => t.category === category).length;
}

export const CREDIT_REPAIR_PRICING_LABELS: Record<CreditRepairTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const CREDIT_REPAIR_PRICING_COLORS: Record<CreditRepairTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const CREDIT_REPAIR_ROLES = {} as const;

export type CreditRepairRoleKey = keyof typeof CREDIT_REPAIR_ROLES;

export function filterCreditRepairTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): CreditRepairTool[] {
  let tools = CREDIT_REPAIR_TOOLS;

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
