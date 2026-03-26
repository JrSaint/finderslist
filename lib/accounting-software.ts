import {
  ACCOUNTING_TOOLS,
  ACCOUNTING_CATEGORIES,
  type AccountingTool,
  type AccountingCategory,
} from "@/data/accounting-software";

export { ACCOUNTING_TOOLS, ACCOUNTING_CATEGORIES };
export type { AccountingTool, AccountingCategory };

export function getAllAccountingTools(): AccountingTool[] {
  return ACCOUNTING_TOOLS;
}

export function getFeaturedAccountingTools(): AccountingTool[] {
  return ACCOUNTING_TOOLS.filter((t) => t.featured);
}

export function getAccountingToolBySlug(slug: string): AccountingTool | undefined {
  return ACCOUNTING_TOOLS.find((t) => t.slug === slug);
}

export function getAccountingToolsByCategory(category: AccountingCategory): AccountingTool[] {
  return ACCOUNTING_TOOLS.filter((t) => t.category === category);
}

export function getAllAccountingCategories(): AccountingCategory[] {
  return Object.keys(ACCOUNTING_CATEGORIES) as AccountingCategory[];
}

export function getAccountingCategoryCount(category: AccountingCategory): number {
  return ACCOUNTING_TOOLS.filter((t) => t.category === category).length;
}

export const ACCOUNTING_PRICING_LABELS: Record<AccountingTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const ACCOUNTING_PRICING_COLORS: Record<AccountingTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const ACCOUNTING_ROLES = {} as const;

export type AccountingRoleKey = keyof typeof ACCOUNTING_ROLES;

export function filterAccountingTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): AccountingTool[] {
  let tools = ACCOUNTING_TOOLS;

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
