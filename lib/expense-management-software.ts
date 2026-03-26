import {
  EXPENSE_MANAGEMENT_TOOLS,
  EXPENSE_MANAGEMENT_CATEGORIES,
  type ExpenseManagementTool,
  type ExpenseManagementCategory,
} from "@/data/expense-management-software";

export { EXPENSE_MANAGEMENT_TOOLS, EXPENSE_MANAGEMENT_CATEGORIES };
export type { ExpenseManagementTool, ExpenseManagementCategory };

export function getAllExpenseManagementTools(): ExpenseManagementTool[] {
  return EXPENSE_MANAGEMENT_TOOLS;
}

export function getFeaturedExpenseManagementTools(): ExpenseManagementTool[] {
  return EXPENSE_MANAGEMENT_TOOLS.filter((t) => t.featured);
}

export function getExpenseManagementToolBySlug(slug: string): ExpenseManagementTool | undefined {
  return EXPENSE_MANAGEMENT_TOOLS.find((t) => t.slug === slug);
}

export function getExpenseManagementToolsByCategory(category: ExpenseManagementCategory): ExpenseManagementTool[] {
  return EXPENSE_MANAGEMENT_TOOLS.filter((t) => t.category === category);
}

export function getAllExpenseManagementCategories(): ExpenseManagementCategory[] {
  return Object.keys(EXPENSE_MANAGEMENT_CATEGORIES) as ExpenseManagementCategory[];
}

export function getExpenseManagementCategoryCount(category: ExpenseManagementCategory): number {
  return EXPENSE_MANAGEMENT_TOOLS.filter((t) => t.category === category).length;
}

export const EXPENSE_MANAGEMENT_PRICING_LABELS: Record<ExpenseManagementTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const EXPENSE_MANAGEMENT_PRICING_COLORS: Record<ExpenseManagementTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const EXPENSE_MANAGEMENT_ROLES = {} as const;

export type ExpenseManagementRoleKey = keyof typeof EXPENSE_MANAGEMENT_ROLES;

export function filterExpenseManagementTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): ExpenseManagementTool[] {
  let tools = EXPENSE_MANAGEMENT_TOOLS;

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
