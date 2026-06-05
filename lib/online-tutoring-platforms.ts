import {
  ONLINE_TUTORING_TOOLS,
  ONLINE_TUTORING_CATEGORIES,
  type OnlineTutoringTool,
  type OnlineTutoringCategory,
} from "@/data/online-tutoring-platforms";

export { ONLINE_TUTORING_TOOLS, ONLINE_TUTORING_CATEGORIES };
export type { OnlineTutoringTool, OnlineTutoringCategory };

export function getAllOnlineTutoringTools(): OnlineTutoringTool[] {
  return ONLINE_TUTORING_TOOLS;
}

export function getFeaturedOnlineTutoringTools(): OnlineTutoringTool[] {
  return ONLINE_TUTORING_TOOLS.filter((t) => t.featured);
}

export function getOnlineTutoringToolBySlug(slug: string): OnlineTutoringTool | undefined {
  return ONLINE_TUTORING_TOOLS.find((t) => t.slug === slug);
}

export function getOnlineTutoringToolsByCategory(category: OnlineTutoringCategory): OnlineTutoringTool[] {
  return ONLINE_TUTORING_TOOLS.filter((t) => t.category === category);
}

export function getAllOnlineTutoringCategories(): OnlineTutoringCategory[] {
  return Object.keys(ONLINE_TUTORING_CATEGORIES) as OnlineTutoringCategory[];
}

export function getOnlineTutoringCategoryCount(category: OnlineTutoringCategory): number {
  return ONLINE_TUTORING_TOOLS.filter((t) => t.category === category).length;
}

export const ONLINE_TUTORING_PRICING_LABELS: Record<OnlineTutoringTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const ONLINE_TUTORING_PRICING_COLORS: Record<OnlineTutoringTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const ONLINE_TUTORING_ROLES = {} as const;

export type OnlineTutoringRoleKey = keyof typeof ONLINE_TUTORING_ROLES;

export function filterOnlineTutoringTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): OnlineTutoringTool[] {
  let tools = ONLINE_TUTORING_TOOLS;

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
