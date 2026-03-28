import {
  BUDGETING_APP_TOOLS,
  BUDGETING_APP_CATEGORIES,
  type BudgetingAppTool,
  type BudgetingAppCategory,
} from "@/data/budgeting-apps";

export { BUDGETING_APP_TOOLS, BUDGETING_APP_CATEGORIES };
export type { BudgetingAppTool, BudgetingAppCategory };

export function getAllBudgetingAppTools(): BudgetingAppTool[] {
  return BUDGETING_APP_TOOLS;
}

export function getFeaturedBudgetingAppTools(): BudgetingAppTool[] {
  return BUDGETING_APP_TOOLS.filter((t) => t.featured);
}

export function getBudgetingAppToolBySlug(slug: string): BudgetingAppTool | undefined {
  return BUDGETING_APP_TOOLS.find((t) => t.slug === slug);
}

export function getBudgetingAppToolsByCategory(category: BudgetingAppCategory): BudgetingAppTool[] {
  return BUDGETING_APP_TOOLS.filter((t) => t.category === category);
}

export function getAllBudgetingAppCategories(): BudgetingAppCategory[] {
  return Object.keys(BUDGETING_APP_CATEGORIES) as BudgetingAppCategory[];
}

export function getBudgetingAppCategoryCount(category: BudgetingAppCategory): number {
  return BUDGETING_APP_TOOLS.filter((t) => t.category === category).length;
}

export const BUDGETING_APP_PRICING_LABELS: Record<BudgetingAppTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const BUDGETING_APP_PRICING_COLORS: Record<BudgetingAppTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const BUDGETING_APP_ROLES = {} as const;

export type BudgetingAppRoleKey = keyof typeof BUDGETING_APP_ROLES;

export function filterBudgetingAppTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): BudgetingAppTool[] {
  let tools = BUDGETING_APP_TOOLS;

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
