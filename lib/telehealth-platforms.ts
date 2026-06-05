import {
  TELEHEALTH_TOOLS,
  TELEHEALTH_CATEGORIES,
  type TelehealthTool,
  type TelehealthCategory,
} from "@/data/telehealth-platforms";

export { TELEHEALTH_TOOLS, TELEHEALTH_CATEGORIES };
export type { TelehealthTool, TelehealthCategory };

export function getAllTelehealthTools(): TelehealthTool[] {
  return TELEHEALTH_TOOLS;
}

export function getFeaturedTelehealthTools(): TelehealthTool[] {
  return TELEHEALTH_TOOLS.filter((t) => t.featured);
}

export function getTelehealthToolBySlug(slug: string): TelehealthTool | undefined {
  return TELEHEALTH_TOOLS.find((t) => t.slug === slug);
}

export function getTelehealthToolsByCategory(category: TelehealthCategory): TelehealthTool[] {
  return TELEHEALTH_TOOLS.filter((t) => t.category === category);
}

export function getAllTelehealthCategories(): TelehealthCategory[] {
  return Object.keys(TELEHEALTH_CATEGORIES) as TelehealthCategory[];
}

export function getTelehealthCategoryCount(category: TelehealthCategory): number {
  return TELEHEALTH_TOOLS.filter((t) => t.category === category).length;
}

export const TELEHEALTH_PRICING_LABELS: Record<TelehealthTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const TELEHEALTH_PRICING_COLORS: Record<TelehealthTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const TELEHEALTH_ROLES = {} as const;

export type TelehealthRoleKey = keyof typeof TELEHEALTH_ROLES;

export function filterTelehealthTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): TelehealthTool[] {
  let tools = TELEHEALTH_TOOLS;

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
