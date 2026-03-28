import {
  BACKGROUND_CHECK_TOOLS,
  BACKGROUND_CHECK_CATEGORIES,
  type BackgroundCheckTool,
  type BackgroundCheckCategory,
} from "@/data/background-check-services";

export { BACKGROUND_CHECK_TOOLS, BACKGROUND_CHECK_CATEGORIES };
export type { BackgroundCheckTool, BackgroundCheckCategory };

export function getAllBackgroundCheckTools(): BackgroundCheckTool[] {
  return BACKGROUND_CHECK_TOOLS;
}

export function getFeaturedBackgroundCheckTools(): BackgroundCheckTool[] {
  return BACKGROUND_CHECK_TOOLS.filter((t) => t.featured);
}

export function getBackgroundCheckToolBySlug(slug: string): BackgroundCheckTool | undefined {
  return BACKGROUND_CHECK_TOOLS.find((t) => t.slug === slug);
}

export function getBackgroundCheckToolsByCategory(category: BackgroundCheckCategory): BackgroundCheckTool[] {
  return BACKGROUND_CHECK_TOOLS.filter((t) => t.category === category);
}

export function getAllBackgroundCheckCategories(): BackgroundCheckCategory[] {
  return Object.keys(BACKGROUND_CHECK_CATEGORIES) as BackgroundCheckCategory[];
}

export function getBackgroundCheckCategoryCount(category: BackgroundCheckCategory): number {
  return BACKGROUND_CHECK_TOOLS.filter((t) => t.category === category).length;
}

export const BACKGROUND_CHECK_PRICING_LABELS: Record<BackgroundCheckTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const BACKGROUND_CHECK_PRICING_COLORS: Record<BackgroundCheckTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

export const BACKGROUND_CHECK_ROLES = {} as const;

export type BackgroundCheckRoleKey = keyof typeof BACKGROUND_CHECK_ROLES;

export function filterBackgroundCheckTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): BackgroundCheckTool[] {
  let tools = BACKGROUND_CHECK_TOOLS;

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
