import {
  POS_SYSTEM_TOOLS,
  POS_SYSTEM_CATEGORIES,
  type POSSystemTool,
  type POSSystemCategory,
} from "@/data/pos-systems";

export { POS_SYSTEM_TOOLS, POS_SYSTEM_CATEGORIES };
export type { POSSystemTool, POSSystemCategory };

export function getAllPOSSystemTools(): POSSystemTool[] {
  return POS_SYSTEM_TOOLS;
}

export function getFeaturedPOSSystemTools(): POSSystemTool[] {
  return POS_SYSTEM_TOOLS.filter((t) => t.featured);
}

export function getPOSSystemToolBySlug(slug: string): POSSystemTool | undefined {
  return POS_SYSTEM_TOOLS.find((t) => t.slug === slug);
}

export function getPOSSystemToolsByCategory(category: POSSystemCategory): POSSystemTool[] {
  return POS_SYSTEM_TOOLS.filter((t) => t.category === category);
}

export function getAllPOSSystemCategories(): POSSystemCategory[] {
  return Object.keys(POS_SYSTEM_CATEGORIES) as POSSystemCategory[];
}

export function getPOSSystemCategoryCount(category: POSSystemCategory): number {
  return POS_SYSTEM_TOOLS.filter((t) => t.category === category).length;
}

export const POS_SYSTEM_PRICING_LABELS: Record<POSSystemTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const POS_SYSTEM_PRICING_COLORS: Record<POSSystemTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const POS_SYSTEM_ROLES = {} as const;

export type POSSystemRoleKey = keyof typeof POS_SYSTEM_ROLES;

export function filterPOSSystemTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): POSSystemTool[] {
  let tools = POS_SYSTEM_TOOLS;

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
