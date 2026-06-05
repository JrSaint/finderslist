import {
  FINANCE_TOOLS,
  FINANCE_CATEGORIES,
  type FinanceTool,
  type FinanceCategory,
} from "@/data/finance-tools";

export { FINANCE_TOOLS, FINANCE_CATEGORIES };
export type { FinanceTool, FinanceCategory };

export function getAllFinanceTools(): FinanceTool[] {
  return FINANCE_TOOLS;
}

export function getFeaturedFinanceTools(): FinanceTool[] {
  return FINANCE_TOOLS.filter((t) => t.featured);
}

export function getFinanceToolBySlug(slug: string): FinanceTool | undefined {
  return FINANCE_TOOLS.find((t) => t.slug === slug);
}

export function getFinanceToolsByCategory(category: FinanceCategory): FinanceTool[] {
  return FINANCE_TOOLS.filter((t) => t.category === category);
}

export function getAllFinanceCategories(): FinanceCategory[] {
  return Object.keys(FINANCE_CATEGORIES) as FinanceCategory[];
}

export function getFinanceCategoryCount(category: FinanceCategory): number {
  return FINANCE_TOOLS.filter((t) => t.category === category).length;
}

export const FINANCE_PRICING_LABELS: Record<FinanceTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const FINANCE_PRICING_COLORS: Record<FinanceTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

export const FINANCE_ROLES = {
  founders: {
    label: "Founders & CEOs",
    emoji: "🚀",
    categories: ["accounting", "business-banking", "payroll"] as FinanceCategory[],
    tags: ["small business", "startup", "accounting", "payroll", "banking"],
  },
  freelancers: {
    label: "Freelancers",
    emoji: "💼",
    categories: ["invoicing", "expense-tracking", "tax"] as FinanceCategory[],
    tags: ["invoicing", "freelance", "self-employed", "expense", "tax"],
  },
  accountants: {
    label: "Accountants",
    emoji: "📒",
    categories: ["accounting", "tax"] as FinanceCategory[],
    tags: ["accounting", "bookkeeping", "tax preparation", "compliance", "reconciliation"],
  },
  "finance-teams": {
    label: "Finance Teams",
    emoji: "📊",
    categories: ["expense-tracking", "accounting", "payroll"] as FinanceCategory[],
    tags: ["corporate card", "expense", "spend management", "reporting", "budget"],
  },
  startups: {
    label: "Startups",
    emoji: "⚡",
    categories: ["business-banking", "payroll", "accounting"] as FinanceCategory[],
    tags: ["startup", "banking", "global payroll", "equity", "international"],
  },
} as const;

export type FinanceRoleKey = keyof typeof FINANCE_ROLES;

export function filterFinanceTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): FinanceTool[] {
  let tools = FINANCE_TOOLS;

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

  if (role && role in FINANCE_ROLES) {
    const config = FINANCE_ROLES[role as FinanceRoleKey];
    tools = tools.filter(
      (t) =>
        (config.categories as readonly string[]).includes(t.category) ||
        t.tags.some((tag) =>
          config.tags.some((rt) => tag.toLowerCase().includes(rt.toLowerCase()))
        )
    );
  }

  return tools;
}
