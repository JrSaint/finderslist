import {
  ONLINE_DEGREE_TOOLS,
  ONLINE_DEGREE_CATEGORIES,
  type OnlineDegreeTool,
  type OnlineDegreeCategory,
} from "@/data/online-degree-programs";

export { ONLINE_DEGREE_TOOLS, ONLINE_DEGREE_CATEGORIES };
export type { OnlineDegreeTool, OnlineDegreeCategory };

export function getAllOnlineDegreeTools(): OnlineDegreeTool[] {
  return ONLINE_DEGREE_TOOLS;
}

export function getFeaturedOnlineDegreeTools(): OnlineDegreeTool[] {
  return ONLINE_DEGREE_TOOLS.filter((t) => t.featured);
}

export function getOnlineDegreeToolBySlug(slug: string): OnlineDegreeTool | undefined {
  return ONLINE_DEGREE_TOOLS.find((t) => t.slug === slug);
}

export function getOnlineDegreeToolsByCategory(category: OnlineDegreeCategory): OnlineDegreeTool[] {
  return ONLINE_DEGREE_TOOLS.filter((t) => t.category === category);
}

export function getAllOnlineDegreeCategories(): OnlineDegreeCategory[] {
  return Object.keys(ONLINE_DEGREE_CATEGORIES) as OnlineDegreeCategory[];
}

export function getOnlineDegreeCategoryCount(category: OnlineDegreeCategory): number {
  return ONLINE_DEGREE_TOOLS.filter((t) => t.category === category).length;
}

export const ONLINE_DEGREE_PRICING_LABELS: Record<OnlineDegreeTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const ONLINE_DEGREE_PRICING_COLORS: Record<OnlineDegreeTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const ONLINE_DEGREE_ROLES = {} as const;

export type OnlineDegreeRoleKey = keyof typeof ONLINE_DEGREE_ROLES;

export function filterOnlineDegreeTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): OnlineDegreeTool[] {
  let tools = ONLINE_DEGREE_TOOLS;

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
