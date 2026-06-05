import {
  AI_CODING_TOOLS,
  AI_CODING_CATEGORIES,
  type AICodingTool,
  type AICodingCategory,
} from "@/data/ai-coding-assistants";

export { AI_CODING_TOOLS, AI_CODING_CATEGORIES };
export type { AICodingTool, AICodingCategory };

export function getAllAICodingTools(): AICodingTool[] {
  return AI_CODING_TOOLS;
}

export function getFeaturedAICodingTools(): AICodingTool[] {
  return AI_CODING_TOOLS.filter((t) => t.featured);
}

export function getAICodingToolBySlug(slug: string): AICodingTool | undefined {
  return AI_CODING_TOOLS.find((t) => t.slug === slug);
}

export function getAICodingToolsByCategory(category: AICodingCategory): AICodingTool[] {
  return AI_CODING_TOOLS.filter((t) => t.category === category);
}

export function getAllAICodingCategories(): AICodingCategory[] {
  return Object.keys(AI_CODING_CATEGORIES) as AICodingCategory[];
}

export function getAICodingCategoryCount(category: AICodingCategory): number {
  return AI_CODING_TOOLS.filter((t) => t.category === category).length;
}

export const AI_CODING_PRICING_LABELS: Record<AICodingTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const AI_CODING_PRICING_COLORS: Record<AICodingTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const AI_CODING_ROLES = {} as const;

export type AICodingRoleKey = keyof typeof AI_CODING_ROLES;

export function filterAICodingTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): AICodingTool[] {
  let tools = AI_CODING_TOOLS;

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
