import {
  ECOMMERCE_INVENTORY_TOOLS,
  ECOMMERCE_INVENTORY_CATEGORIES,
  type EcommerceInventoryTool,
  type EcommerceInventoryCategory,
} from "@/data/ecommerce-inventory-software";

export { ECOMMERCE_INVENTORY_TOOLS, ECOMMERCE_INVENTORY_CATEGORIES };
export type { EcommerceInventoryTool, EcommerceInventoryCategory };

export function getAllEcommerceInventoryTools(): EcommerceInventoryTool[] {
  return ECOMMERCE_INVENTORY_TOOLS;
}

export function getFeaturedEcommerceInventoryTools(): EcommerceInventoryTool[] {
  return ECOMMERCE_INVENTORY_TOOLS.filter((t) => t.featured);
}

export function getEcommerceInventoryToolBySlug(slug: string): EcommerceInventoryTool | undefined {
  return ECOMMERCE_INVENTORY_TOOLS.find((t) => t.slug === slug);
}

export function getEcommerceInventoryToolsByCategory(category: EcommerceInventoryCategory): EcommerceInventoryTool[] {
  return ECOMMERCE_INVENTORY_TOOLS.filter((t) => t.category === category);
}

export function getAllEcommerceInventoryCategories(): EcommerceInventoryCategory[] {
  return Object.keys(ECOMMERCE_INVENTORY_CATEGORIES) as EcommerceInventoryCategory[];
}

export function getEcommerceInventoryCategoryCount(category: EcommerceInventoryCategory): number {
  return ECOMMERCE_INVENTORY_TOOLS.filter((t) => t.category === category).length;
}

export const ECOMMERCE_INVENTORY_PRICING_LABELS: Record<EcommerceInventoryTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const ECOMMERCE_INVENTORY_PRICING_COLORS: Record<EcommerceInventoryTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const ECOMMERCE_INVENTORY_ROLES = {} as const;

export type EcommerceInventoryRoleKey = keyof typeof ECOMMERCE_INVENTORY_ROLES;

export function filterEcommerceInventoryTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): EcommerceInventoryTool[] {
  let tools = ECOMMERCE_INVENTORY_TOOLS;

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
