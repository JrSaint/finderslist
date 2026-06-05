import {
  LIVE_CHAT_TOOLS,
  LIVE_CHAT_CATEGORIES,
  type LiveChatTool,
  type LiveChatCategory,
} from "@/data/live-chat-software";

export { LIVE_CHAT_TOOLS, LIVE_CHAT_CATEGORIES };
export type { LiveChatTool, LiveChatCategory };

export function getAllLiveChatTools(): LiveChatTool[] {
  return LIVE_CHAT_TOOLS;
}

export function getFeaturedLiveChatTools(): LiveChatTool[] {
  return LIVE_CHAT_TOOLS.filter((t) => t.featured);
}

export function getLiveChatToolBySlug(slug: string): LiveChatTool | undefined {
  return LIVE_CHAT_TOOLS.find((t) => t.slug === slug);
}

export function getLiveChatToolsByCategory(category: LiveChatCategory): LiveChatTool[] {
  return LIVE_CHAT_TOOLS.filter((t) => t.category === category);
}

export function getAllLiveChatCategories(): LiveChatCategory[] {
  return Object.keys(LIVE_CHAT_CATEGORIES) as LiveChatCategory[];
}

export function getLiveChatCategoryCount(category: LiveChatCategory): number {
  return LIVE_CHAT_TOOLS.filter((t) => t.category === category).length;
}

export const LIVE_CHAT_PRICING_LABELS: Record<LiveChatTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const LIVE_CHAT_PRICING_COLORS: Record<LiveChatTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const LIVE_CHAT_ROLES = {} as const;

export type LiveChatRoleKey = keyof typeof LIVE_CHAT_ROLES;

export function filterLiveChatTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): LiveChatTool[] {
  let tools = LIVE_CHAT_TOOLS;

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
