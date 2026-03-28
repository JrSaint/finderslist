import {
  ROBO_ADVISOR_TOOLS,
  ROBO_ADVISOR_CATEGORIES,
  type RoboAdvisorTool,
  type RoboAdvisorCategory,
} from "@/data/robo-advisors";

export { ROBO_ADVISOR_TOOLS, ROBO_ADVISOR_CATEGORIES };
export type { RoboAdvisorTool, RoboAdvisorCategory };

export function getAllRoboAdvisorTools(): RoboAdvisorTool[] {
  return ROBO_ADVISOR_TOOLS;
}

export function getFeaturedRoboAdvisorTools(): RoboAdvisorTool[] {
  return ROBO_ADVISOR_TOOLS.filter((t) => t.featured);
}

export function getRoboAdvisorToolBySlug(slug: string): RoboAdvisorTool | undefined {
  return ROBO_ADVISOR_TOOLS.find((t) => t.slug === slug);
}

export function getRoboAdvisorToolsByCategory(category: RoboAdvisorCategory): RoboAdvisorTool[] {
  return ROBO_ADVISOR_TOOLS.filter((t) => t.category === category);
}

export function getAllRoboAdvisorCategories(): RoboAdvisorCategory[] {
  return Object.keys(ROBO_ADVISOR_CATEGORIES) as RoboAdvisorCategory[];
}

export function getRoboAdvisorCategoryCount(category: RoboAdvisorCategory): number {
  return ROBO_ADVISOR_TOOLS.filter((t) => t.category === category).length;
}

export const ROBO_ADVISOR_PRICING_LABELS: Record<RoboAdvisorTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const ROBO_ADVISOR_PRICING_COLORS: Record<RoboAdvisorTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const ROBO_ADVISOR_ROLES = {} as const;

export type RoboAdvisorRoleKey = keyof typeof ROBO_ADVISOR_ROLES;

export function filterRoboAdvisorTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): RoboAdvisorTool[] {
  let tools = ROBO_ADVISOR_TOOLS;

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
