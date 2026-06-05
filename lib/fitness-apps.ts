import {
  FITNESS_APP_TOOLS,
  FITNESS_APP_CATEGORIES,
  type FitnessAppTool,
  type FitnessAppCategory,
} from "@/data/fitness-apps";

export { FITNESS_APP_TOOLS, FITNESS_APP_CATEGORIES };
export type { FitnessAppTool, FitnessAppCategory };

export function getAllFitnessAppTools(): FitnessAppTool[] {
  return FITNESS_APP_TOOLS;
}

export function getFeaturedFitnessAppTools(): FitnessAppTool[] {
  return FITNESS_APP_TOOLS.filter((t) => t.featured);
}

export function getFitnessAppToolBySlug(slug: string): FitnessAppTool | undefined {
  return FITNESS_APP_TOOLS.find((t) => t.slug === slug);
}

export function getFitnessAppToolsByCategory(category: FitnessAppCategory): FitnessAppTool[] {
  return FITNESS_APP_TOOLS.filter((t) => t.category === category);
}

export function getAllFitnessAppCategories(): FitnessAppCategory[] {
  return Object.keys(FITNESS_APP_CATEGORIES) as FitnessAppCategory[];
}

export function getFitnessAppCategoryCount(category: FitnessAppCategory): number {
  return FITNESS_APP_TOOLS.filter((t) => t.category === category).length;
}

export const FITNESS_APP_PRICING_LABELS: Record<FitnessAppTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const FITNESS_APP_PRICING_COLORS: Record<FitnessAppTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const FITNESS_APP_ROLES = {} as const;

export type FitnessAppRoleKey = keyof typeof FITNESS_APP_ROLES;

export function filterFitnessAppTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): FitnessAppTool[] {
  let tools = FITNESS_APP_TOOLS;

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
