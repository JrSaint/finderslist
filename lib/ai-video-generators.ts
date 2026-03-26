import {
  AI_VIDEO_TOOLS,
  AI_VIDEO_CATEGORIES,
  type AIVideoTool,
  type AIVideoCategory,
} from "@/data/ai-video-generators";

export { AI_VIDEO_TOOLS, AI_VIDEO_CATEGORIES };
export type { AIVideoTool, AIVideoCategory };

export function getAllAIVideoTools(): AIVideoTool[] {
  return AI_VIDEO_TOOLS;
}

export function getFeaturedAIVideoTools(): AIVideoTool[] {
  return AI_VIDEO_TOOLS.filter((t) => t.featured);
}

export function getAIVideoToolBySlug(slug: string): AIVideoTool | undefined {
  return AI_VIDEO_TOOLS.find((t) => t.slug === slug);
}

export function getAIVideoToolsByCategory(category: AIVideoCategory): AIVideoTool[] {
  return AI_VIDEO_TOOLS.filter((t) => t.category === category);
}

export function getAllAIVideoCategories(): AIVideoCategory[] {
  return Object.keys(AI_VIDEO_CATEGORIES) as AIVideoCategory[];
}

export function getAIVideoCategoryCount(category: AIVideoCategory): number {
  return AI_VIDEO_TOOLS.filter((t) => t.category === category).length;
}

export const AI_VIDEO_PRICING_LABELS: Record<AIVideoTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const AI_VIDEO_PRICING_COLORS: Record<AIVideoTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const AI_VIDEO_ROLES = {} as const;

export type AIVideoRoleKey = keyof typeof AI_VIDEO_ROLES;

export function filterAIVideoTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): AIVideoTool[] {
  let tools = AI_VIDEO_TOOLS;

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
