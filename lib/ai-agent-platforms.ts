import {
  AI_AGENTS_TOOLS,
  AI_AGENTS_CATEGORIES,
  type AIAgentsTool,
  type AIAgentsCategory,
} from "@/data/ai-agent-platforms";

export { AI_AGENTS_TOOLS, AI_AGENTS_CATEGORIES };
export type { AIAgentsTool, AIAgentsCategory };

export function getAllAIAgentsTools(): AIAgentsTool[] {
  return AI_AGENTS_TOOLS;
}

export function getFeaturedAIAgentsTools(): AIAgentsTool[] {
  return AI_AGENTS_TOOLS.filter((t) => t.featured);
}

export function getAIAgentsToolBySlug(slug: string): AIAgentsTool | undefined {
  return AI_AGENTS_TOOLS.find((t) => t.slug === slug);
}

export function getAIAgentsToolsByCategory(category: AIAgentsCategory): AIAgentsTool[] {
  return AI_AGENTS_TOOLS.filter((t) => t.category === category);
}

export function getAllAIAgentsCategories(): AIAgentsCategory[] {
  return Object.keys(AI_AGENTS_CATEGORIES) as AIAgentsCategory[];
}

export function getAIAgentsCategoryCount(category: AIAgentsCategory): number {
  return AI_AGENTS_TOOLS.filter((t) => t.category === category).length;
}

export const AI_AGENTS_PRICING_LABELS: Record<AIAgentsTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const AI_AGENTS_PRICING_COLORS: Record<AIAgentsTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const AI_AGENTS_ROLES = {} as const;

export type AIAgentsRoleKey = keyof typeof AI_AGENTS_ROLES;

export function filterAIAgentsTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): AIAgentsTool[] {
  let tools = AI_AGENTS_TOOLS;

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
