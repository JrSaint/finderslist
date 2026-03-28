import {
  ERP_TOOLS,
  ERP_CATEGORIES,
  type ERPTool,
  type ERPCategory,
} from "@/data/erp-software";

export { ERP_TOOLS, ERP_CATEGORIES };
export type { ERPTool, ERPCategory };

export function getAllERPTools(): ERPTool[] {
  return ERP_TOOLS;
}

export function getFeaturedERPTools(): ERPTool[] {
  return ERP_TOOLS.filter((t) => t.featured);
}

export function getERPToolBySlug(slug: string): ERPTool | undefined {
  return ERP_TOOLS.find((t) => t.slug === slug);
}

export function getERPToolsByCategory(category: ERPCategory): ERPTool[] {
  return ERP_TOOLS.filter((t) => t.category === category);
}

export function getAllERPCategories(): ERPCategory[] {
  return Object.keys(ERP_CATEGORIES) as ERPCategory[];
}

export function getERPCategoryCount(category: ERPCategory): number {
  return ERP_TOOLS.filter((t) => t.category === category).length;
}

export const ERP_PRICING_LABELS: Record<ERPTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const ERP_PRICING_COLORS: Record<ERPTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const ERP_ROLES = {} as const;

export type ERPRoleKey = keyof typeof ERP_ROLES;

export function filterERPTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): ERPTool[] {
  let tools = ERP_TOOLS;

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
