import {
  MENTAL_HEALTH_TOOLS,
  MENTAL_HEALTH_CATEGORIES,
  type MentalHealthTool,
  type MentalHealthCategory,
} from "@/data/mental-health-apps";

export { MENTAL_HEALTH_TOOLS, MENTAL_HEALTH_CATEGORIES };
export type { MentalHealthTool, MentalHealthCategory };

export function getAllMentalHealthTools(): MentalHealthTool[] {
  return MENTAL_HEALTH_TOOLS;
}

export function getFeaturedMentalHealthTools(): MentalHealthTool[] {
  return MENTAL_HEALTH_TOOLS.filter((t) => t.featured);
}

export function getMentalHealthToolBySlug(slug: string): MentalHealthTool | undefined {
  return MENTAL_HEALTH_TOOLS.find((t) => t.slug === slug);
}

export function getMentalHealthToolsByCategory(category: MentalHealthCategory): MentalHealthTool[] {
  return MENTAL_HEALTH_TOOLS.filter((t) => t.category === category);
}

export function getAllMentalHealthCategories(): MentalHealthCategory[] {
  return Object.keys(MENTAL_HEALTH_CATEGORIES) as MentalHealthCategory[];
}

export function getMentalHealthCategoryCount(category: MentalHealthCategory): number {
  return MENTAL_HEALTH_TOOLS.filter((t) => t.category === category).length;
}

export const MENTAL_HEALTH_PRICING_LABELS: Record<MentalHealthTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const MENTAL_HEALTH_PRICING_COLORS: Record<MentalHealthTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const MENTAL_HEALTH_ROLES = {} as const;

export type MentalHealthRoleKey = keyof typeof MENTAL_HEALTH_ROLES;

export function filterMentalHealthTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): MentalHealthTool[] {
  let tools = MENTAL_HEALTH_TOOLS;

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
