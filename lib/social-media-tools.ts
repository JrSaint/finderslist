import {
  SOCIAL_MEDIA_TOOLS,
  SOCIAL_MEDIA_CATEGORIES,
  type SocialMediaTool,
  type SocialMediaCategory,
} from "@/data/social-media-tools";

export { SOCIAL_MEDIA_TOOLS, SOCIAL_MEDIA_CATEGORIES };
export type { SocialMediaTool, SocialMediaCategory };

export function getAllSocialMediaTools(): SocialMediaTool[] {
  return SOCIAL_MEDIA_TOOLS;
}

export function getFeaturedSocialMediaTools(): SocialMediaTool[] {
  return SOCIAL_MEDIA_TOOLS.filter((t) => t.featured);
}

export function getSocialMediaToolBySlug(slug: string): SocialMediaTool | undefined {
  return SOCIAL_MEDIA_TOOLS.find((t) => t.slug === slug);
}

export function getSocialMediaToolsByCategory(category: SocialMediaCategory): SocialMediaTool[] {
  return SOCIAL_MEDIA_TOOLS.filter((t) => t.category === category);
}

export function getAllSocialMediaCategories(): SocialMediaCategory[] {
  return Object.keys(SOCIAL_MEDIA_CATEGORIES) as SocialMediaCategory[];
}

export function getSocialMediaCategoryCount(category: SocialMediaCategory): number {
  return SOCIAL_MEDIA_TOOLS.filter((t) => t.category === category).length;
}

export const SOCIAL_MEDIA_PRICING_LABELS: Record<SocialMediaTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const SOCIAL_MEDIA_PRICING_COLORS: Record<SocialMediaTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-pink-500/20 text-pink-300 border-pink-500/30",
};

export const SOCIAL_MEDIA_ROLES = {
  "social-media-managers": {
    label: "Social Media Managers",
    emoji: "📱",
    categories: ["scheduling-publishing", "analytics-reporting"] as SocialMediaCategory[],
    tags: ["scheduling", "content calendar", "hashtags", "engagement", "reporting"],
  },
  "brands": {
    label: "Brands & Businesses",
    emoji: "🏢",
    categories: ["scheduling-publishing", "social-listening"] as SocialMediaCategory[],
    tags: ["brand monitoring", "multi-channel", "team collaboration", "approvals"],
  },
  "creators": {
    label: "Individual Creators",
    emoji: "🎨",
    categories: ["scheduling-publishing", "content-creation"] as SocialMediaCategory[],
    tags: ["creator", "instagram", "tiktok", "link in bio", "audience"],
  },
  "agencies": {
    label: "Social Media Agencies",
    emoji: "📊",
    categories: ["scheduling-publishing", "analytics-reporting"] as SocialMediaCategory[],
    tags: ["client reporting", "white-label", "multiple brands", "workflows"],
  },
  "influencer-teams": {
    label: "Influencer Marketing Teams",
    emoji: "⭐",
    categories: ["influencer-marketing"] as SocialMediaCategory[],
    tags: ["influencer discovery", "campaign tracking", "ROI", "gifting", "UGC"],
  },
} as const;

export type SocialMediaRoleKey = keyof typeof SOCIAL_MEDIA_ROLES;

export function filterSocialMediaTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): SocialMediaTool[] {
  let tools = SOCIAL_MEDIA_TOOLS;

  if (role && role in SOCIAL_MEDIA_ROLES) {
    const roleData = SOCIAL_MEDIA_ROLES[role as SocialMediaRoleKey];
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
