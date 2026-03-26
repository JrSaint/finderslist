import {
  TIME_TRACKING_TOOLS,
  TIME_TRACKING_CATEGORIES,
  type TimeTrackingTool,
  type TimeTrackingCategory,
} from "@/data/time-tracking-software";

export { TIME_TRACKING_TOOLS, TIME_TRACKING_CATEGORIES };
export type { TimeTrackingTool, TimeTrackingCategory };

export function getAllTimeTrackingTools(): TimeTrackingTool[] {
  return TIME_TRACKING_TOOLS;
}

export function getFeaturedTimeTrackingTools(): TimeTrackingTool[] {
  return TIME_TRACKING_TOOLS.filter((t) => t.featured);
}

export function getTimeTrackingToolBySlug(slug: string): TimeTrackingTool | undefined {
  return TIME_TRACKING_TOOLS.find((t) => t.slug === slug);
}

export function getTimeTrackingToolsByCategory(category: TimeTrackingCategory): TimeTrackingTool[] {
  return TIME_TRACKING_TOOLS.filter((t) => t.category === category);
}

export function getAllTimeTrackingCategories(): TimeTrackingCategory[] {
  return Object.keys(TIME_TRACKING_CATEGORIES) as TimeTrackingCategory[];
}

export function getTimeTrackingCategoryCount(category: TimeTrackingCategory): number {
  return TIME_TRACKING_TOOLS.filter((t) => t.category === category).length;
}

export const TIME_TRACKING_PRICING_LABELS: Record<TimeTrackingTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const TIME_TRACKING_PRICING_COLORS: Record<TimeTrackingTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const TIME_TRACKING_ROLES = {} as const;

export type TimeTrackingRoleKey = keyof typeof TIME_TRACKING_ROLES;

export function filterTimeTrackingTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): TimeTrackingTool[] {
  let tools = TIME_TRACKING_TOOLS;

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
