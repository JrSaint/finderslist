import {
  LLC_FORMATION_TOOLS,
  LLC_FORMATION_CATEGORIES,
  type LLCFormationTool,
  type LLCFormationCategory,
} from "@/data/llc-formation-services";

export { LLC_FORMATION_TOOLS, LLC_FORMATION_CATEGORIES };
export type { LLCFormationTool, LLCFormationCategory };

export function getAllLLCFormationTools(): LLCFormationTool[] {
  return LLC_FORMATION_TOOLS;
}

export function getFeaturedLLCFormationTools(): LLCFormationTool[] {
  return LLC_FORMATION_TOOLS.filter((t) => t.featured);
}

export function getLLCFormationToolBySlug(slug: string): LLCFormationTool | undefined {
  return LLC_FORMATION_TOOLS.find((t) => t.slug === slug);
}

export function getLLCFormationToolsByCategory(category: LLCFormationCategory): LLCFormationTool[] {
  return LLC_FORMATION_TOOLS.filter((t) => t.category === category);
}

export function getAllLLCFormationCategories(): LLCFormationCategory[] {
  return Object.keys(LLC_FORMATION_CATEGORIES) as LLCFormationCategory[];
}

export function getLLCFormationCategoryCount(category: LLCFormationCategory): number {
  return LLC_FORMATION_TOOLS.filter((t) => t.category === category).length;
}

export const LLC_FORMATION_PRICING_LABELS: Record<LLCFormationTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const LLC_FORMATION_PRICING_COLORS: Record<LLCFormationTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const LLC_FORMATION_ROLES = {} as const;

export type LLCFormationRoleKey = keyof typeof LLC_FORMATION_ROLES;

export function filterLLCFormationTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): LLCFormationTool[] {
  let tools = LLC_FORMATION_TOOLS;

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
