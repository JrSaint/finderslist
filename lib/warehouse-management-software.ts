import {
  WAREHOUSE_MANAGEMENT_TOOLS,
  WAREHOUSE_MANAGEMENT_CATEGORIES,
  type WarehouseManagementTool,
  type WarehouseManagementCategory,
} from "@/data/warehouse-management-software";

export { WAREHOUSE_MANAGEMENT_TOOLS, WAREHOUSE_MANAGEMENT_CATEGORIES };
export type { WarehouseManagementTool, WarehouseManagementCategory };

export function getAllWarehouseManagementTools(): WarehouseManagementTool[] {
  return WAREHOUSE_MANAGEMENT_TOOLS;
}

export function getFeaturedWarehouseManagementTools(): WarehouseManagementTool[] {
  return WAREHOUSE_MANAGEMENT_TOOLS.filter((t) => t.featured);
}

export function getWarehouseManagementToolBySlug(slug: string): WarehouseManagementTool | undefined {
  return WAREHOUSE_MANAGEMENT_TOOLS.find((t) => t.slug === slug);
}

export function getWarehouseManagementToolsByCategory(category: WarehouseManagementCategory): WarehouseManagementTool[] {
  return WAREHOUSE_MANAGEMENT_TOOLS.filter((t) => t.category === category);
}

export function getAllWarehouseManagementCategories(): WarehouseManagementCategory[] {
  return Object.keys(WAREHOUSE_MANAGEMENT_CATEGORIES) as WarehouseManagementCategory[];
}

export function getWarehouseManagementCategoryCount(category: WarehouseManagementCategory): number {
  return WAREHOUSE_MANAGEMENT_TOOLS.filter((t) => t.category === category).length;
}

export const WAREHOUSE_MANAGEMENT_PRICING_LABELS: Record<WarehouseManagementTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const WAREHOUSE_MANAGEMENT_PRICING_COLORS: Record<WarehouseManagementTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const WAREHOUSE_MANAGEMENT_ROLES = {} as const;

export type WarehouseManagementRoleKey = keyof typeof WAREHOUSE_MANAGEMENT_ROLES;

export function filterWarehouseManagementTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): WarehouseManagementTool[] {
  let tools = WAREHOUSE_MANAGEMENT_TOOLS;

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
