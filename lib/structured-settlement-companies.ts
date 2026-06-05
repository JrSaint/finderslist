import {
  STRUCTURED_SETTLEMENT_TOOLS,
  STRUCTURED_SETTLEMENT_CATEGORIES,
  type StructuredSettlementTool,
  type StructuredSettlementCategory,
} from "@/data/structured-settlement-companies";

export { STRUCTURED_SETTLEMENT_TOOLS, STRUCTURED_SETTLEMENT_CATEGORIES };
export type { StructuredSettlementTool, StructuredSettlementCategory };

export function getAllStructuredSettlementTools(): StructuredSettlementTool[] {
  return STRUCTURED_SETTLEMENT_TOOLS;
}

export function getFeaturedStructuredSettlementTools(): StructuredSettlementTool[] {
  return STRUCTURED_SETTLEMENT_TOOLS.filter((t) => t.featured);
}

export function getStructuredSettlementToolBySlug(slug: string): StructuredSettlementTool | undefined {
  return STRUCTURED_SETTLEMENT_TOOLS.find((t) => t.slug === slug);
}

export function getStructuredSettlementToolsByCategory(category: StructuredSettlementCategory): StructuredSettlementTool[] {
  return STRUCTURED_SETTLEMENT_TOOLS.filter((t) => t.category === category);
}

export function getAllStructuredSettlementCategories(): StructuredSettlementCategory[] {
  return Object.keys(STRUCTURED_SETTLEMENT_CATEGORIES) as StructuredSettlementCategory[];
}

export function getStructuredSettlementCategoryCount(category: StructuredSettlementCategory): number {
  return STRUCTURED_SETTLEMENT_TOOLS.filter((t) => t.category === category).length;
}

export const STRUCTURED_SETTLEMENT_PRICING_LABELS: Record<StructuredSettlementTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const STRUCTURED_SETTLEMENT_PRICING_COLORS: Record<StructuredSettlementTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const STRUCTURED_SETTLEMENT_ROLES = {} as const;

export type StructuredSettlementRoleKey = keyof typeof STRUCTURED_SETTLEMENT_ROLES;

export function filterStructuredSettlementTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): StructuredSettlementTool[] {
  let tools = STRUCTURED_SETTLEMENT_TOOLS;

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
