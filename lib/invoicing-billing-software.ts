import {
  INVOICING_TOOLS,
  INVOICING_CATEGORIES,
  type InvoicingTool,
  type InvoicingCategory,
} from "@/data/invoicing-billing-software";

export { INVOICING_TOOLS, INVOICING_CATEGORIES };
export type { InvoicingTool, InvoicingCategory };

export function getAllInvoicingTools(): InvoicingTool[] {
  return INVOICING_TOOLS;
}

export function getFeaturedInvoicingTools(): InvoicingTool[] {
  return INVOICING_TOOLS.filter((t) => t.featured);
}

export function getInvoicingToolBySlug(slug: string): InvoicingTool | undefined {
  return INVOICING_TOOLS.find((t) => t.slug === slug);
}

export function getInvoicingToolsByCategory(category: InvoicingCategory): InvoicingTool[] {
  return INVOICING_TOOLS.filter((t) => t.category === category);
}

export function getAllInvoicingCategories(): InvoicingCategory[] {
  return Object.keys(INVOICING_CATEGORIES) as InvoicingCategory[];
}

export function getInvoicingCategoryCount(category: InvoicingCategory): number {
  return INVOICING_TOOLS.filter((t) => t.category === category).length;
}

export const INVOICING_PRICING_LABELS: Record<InvoicingTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const INVOICING_PRICING_COLORS: Record<InvoicingTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const INVOICING_ROLES = {} as const;

export type InvoicingRoleKey = keyof typeof INVOICING_ROLES;

export function filterInvoicingTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): InvoicingTool[] {
  let tools = INVOICING_TOOLS;

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
