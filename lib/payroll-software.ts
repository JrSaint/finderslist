import {
  PAYROLL_TOOLS,
  PAYROLL_CATEGORIES,
  type PayrollTool,
  type PayrollCategory,
} from "@/data/payroll-software";

export { PAYROLL_TOOLS, PAYROLL_CATEGORIES };
export type { PayrollTool, PayrollCategory };

export function getAllPayrollTools(): PayrollTool[] {
  return PAYROLL_TOOLS;
}

export function getFeaturedPayrollTools(): PayrollTool[] {
  return PAYROLL_TOOLS.filter((t) => t.featured);
}

export function getPayrollToolBySlug(slug: string): PayrollTool | undefined {
  return PAYROLL_TOOLS.find((t) => t.slug === slug);
}

export function getPayrollToolsByCategory(category: PayrollCategory): PayrollTool[] {
  return PAYROLL_TOOLS.filter((t) => t.category === category);
}

export function getAllPayrollCategories(): PayrollCategory[] {
  return Object.keys(PAYROLL_CATEGORIES) as PayrollCategory[];
}

export function getPayrollCategoryCount(category: PayrollCategory): number {
  return PAYROLL_TOOLS.filter((t) => t.category === category).length;
}

export const PAYROLL_PRICING_LABELS: Record<PayrollTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const PAYROLL_PRICING_COLORS: Record<PayrollTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const PAYROLL_ROLES = {} as const;

export type PayrollRoleKey = keyof typeof PAYROLL_ROLES;

export function filterPayrollTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): PayrollTool[] {
  let tools = PAYROLL_TOOLS;

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
