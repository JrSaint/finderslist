import {
  SUPPLY_CHAIN_TOOLS,
  SUPPLY_CHAIN_CATEGORIES,
  type SupplyChainTool,
  type SupplyChainCategory,
} from "@/data/supply-chain-software";

export { SUPPLY_CHAIN_TOOLS, SUPPLY_CHAIN_CATEGORIES };
export type { SupplyChainTool, SupplyChainCategory };

export function getAllSupplyChainTools(): SupplyChainTool[] {
  return SUPPLY_CHAIN_TOOLS;
}

export function getFeaturedSupplyChainTools(): SupplyChainTool[] {
  return SUPPLY_CHAIN_TOOLS.filter((t) => t.featured);
}

export function getSupplyChainToolBySlug(slug: string): SupplyChainTool | undefined {
  return SUPPLY_CHAIN_TOOLS.find((t) => t.slug === slug);
}

export function getSupplyChainToolsByCategory(category: SupplyChainCategory): SupplyChainTool[] {
  return SUPPLY_CHAIN_TOOLS.filter((t) => t.category === category);
}

export function getAllSupplyChainCategories(): SupplyChainCategory[] {
  return Object.keys(SUPPLY_CHAIN_CATEGORIES) as SupplyChainCategory[];
}

export function getSupplyChainCategoryCount(category: SupplyChainCategory): number {
  return SUPPLY_CHAIN_TOOLS.filter((t) => t.category === category).length;
}

export const SUPPLY_CHAIN_PRICING_LABELS: Record<SupplyChainTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const SUPPLY_CHAIN_PRICING_COLORS: Record<SupplyChainTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const SUPPLY_CHAIN_ROLES = {} as const;

export type SupplyChainRoleKey = keyof typeof SUPPLY_CHAIN_ROLES;

export function filterSupplyChainTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): SupplyChainTool[] {
  let tools = SUPPLY_CHAIN_TOOLS;

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
