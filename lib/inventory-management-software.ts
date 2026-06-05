import {
  INVENTORY_MANAGEMENT_TOOLS,
  INVENTORY_MANAGEMENT_CATEGORIES,
  type InventoryManagementTool,
  type InventoryManagementCategory,
} from "@/data/inventory-management-software";

export { INVENTORY_MANAGEMENT_TOOLS, INVENTORY_MANAGEMENT_CATEGORIES };
export type { InventoryManagementTool, InventoryManagementCategory };

export function getAllInventoryManagementTools(): InventoryManagementTool[] {
  return INVENTORY_MANAGEMENT_TOOLS;
}

export function getFeaturedInventoryManagementTools(): InventoryManagementTool[] {
  return INVENTORY_MANAGEMENT_TOOLS.filter((t) => t.featured);
}

export function getInventoryManagementToolBySlug(slug: string): InventoryManagementTool | undefined {
  return INVENTORY_MANAGEMENT_TOOLS.find((t) => t.slug === slug);
}

export function getInventoryManagementToolsByCategory(category: InventoryManagementCategory): InventoryManagementTool[] {
  return INVENTORY_MANAGEMENT_TOOLS.filter((t) => t.category === category);
}

export function getAllInventoryManagementCategories(): InventoryManagementCategory[] {
  return Object.keys(INVENTORY_MANAGEMENT_CATEGORIES) as InventoryManagementCategory[];
}

export function getInventoryManagementCategoryCount(category: InventoryManagementCategory): number {
  return INVENTORY_MANAGEMENT_TOOLS.filter((t) => t.category === category).length;
}

export const INVENTORY_MANAGEMENT_PRICING_LABELS: Record<InventoryManagementTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const INVENTORY_MANAGEMENT_PRICING_COLORS: Record<InventoryManagementTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const INVENTORY_MANAGEMENT_ROLES = {} as const;

export type InventoryManagementRoleKey = keyof typeof INVENTORY_MANAGEMENT_ROLES;

export function filterInventoryManagementTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): InventoryManagementTool[] {
  let tools = INVENTORY_MANAGEMENT_TOOLS;

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
