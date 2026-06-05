import {
  CREATOR_TOOLS,
  CREATOR_CATEGORIES,
  type CreatorTool,
  type CreatorCategory,
} from "@/data/creator-tools";

export { CREATOR_TOOLS, CREATOR_CATEGORIES };
export type { CreatorTool, CreatorCategory };

export function getAllCreatorTools(): CreatorTool[] {
  return CREATOR_TOOLS;
}

export function getFeaturedCreatorTools(): CreatorTool[] {
  return CREATOR_TOOLS.filter((t) => t.featured);
}

export function getCreatorToolBySlug(slug: string): CreatorTool | undefined {
  return CREATOR_TOOLS.find((t) => t.slug === slug);
}

export function getCreatorToolsByCategory(category: CreatorCategory): CreatorTool[] {
  return CREATOR_TOOLS.filter((t) => t.category === category);
}

export function getAllCreatorCategories(): CreatorCategory[] {
  return Object.keys(CREATOR_CATEGORIES) as CreatorCategory[];
}

export function getCreatorCategoryCount(category: CreatorCategory): number {
  return CREATOR_TOOLS.filter((t) => t.category === category).length;
}

export const CREATOR_PRICING_LABELS: Record<CreatorTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const CREATOR_PRICING_COLORS: Record<CreatorTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-orange-500/20 text-orange-300 border-orange-500/30",
};

export const CREATOR_ROLES = {
  "youtubers": {
    label: "YouTubers",
    emoji: "▶️",
    categories: ["video-editing", "screen-recording"] as CreatorCategory[],
    tags: ["youtube", "video editing", "thumbnails", "shorts", "content creation"],
  },
  "podcasters": {
    label: "Podcasters",
    emoji: "🎙️",
    categories: ["podcast", "screen-recording"] as CreatorCategory[],
    tags: ["podcast", "audio", "recording", "hosting", "rss"],
  },
  "course-creators": {
    label: "Course Creators",
    emoji: "📚",
    categories: ["creator-platforms", "screen-recording"] as CreatorCategory[],
    tags: ["courses", "memberships", "online education", "digital products", "kajabi"],
  },
  "streamers": {
    label: "Live Streamers",
    emoji: "📡",
    categories: ["live-streaming", "screen-recording"] as CreatorCategory[],
    tags: ["twitch", "youtube live", "streaming", "obs", "multistream"],
  },
  "newsletter-writers": {
    label: "Newsletter Writers",
    emoji: "📰",
    categories: ["creator-platforms"] as CreatorCategory[],
    tags: ["newsletter", "email", "substack", "paid content", "subscribers"],
  },
} as const;

export type CreatorRoleKey = keyof typeof CREATOR_ROLES;

export function filterCreatorTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): CreatorTool[] {
  let tools = CREATOR_TOOLS;

  if (role && role in CREATOR_ROLES) {
    const roleData = CREATOR_ROLES[role as CreatorRoleKey];
    tools = tools.filter(
      (t) =>
        (roleData.categories as readonly string[]).includes(t.category) ||
        t.tags.some((tag) => roleData.tags.includes(tag as never))
    );
  }

  if (pricing && ["free", "freemium", "paid"].includes(pricing)) {
    tools = tools.filter((t) => t.pricing === pricing);
  }

  if (query) {
    const q = query.toLowerCase();
    tools = tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }

  return tools;
}
