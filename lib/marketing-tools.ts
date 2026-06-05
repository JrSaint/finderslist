import {
  MARKETING_TOOLS,
  MARKETING_CATEGORIES,
  type MarketingTool,
  type MarketingCategory,
} from "@/data/marketing-tools";

export { MARKETING_TOOLS, MARKETING_CATEGORIES };
export type { MarketingTool, MarketingCategory };

export function getAllMarketingTools(): MarketingTool[] {
  return MARKETING_TOOLS;
}

export function getFeaturedMarketingTools(): MarketingTool[] {
  return MARKETING_TOOLS.filter((t) => t.featured);
}

export function getMarketingToolBySlug(slug: string): MarketingTool | undefined {
  return MARKETING_TOOLS.find((t) => t.slug === slug);
}

export function getMarketingToolsByCategory(category: MarketingCategory): MarketingTool[] {
  return MARKETING_TOOLS.filter((t) => t.category === category);
}

export function getAllMarketingCategories(): MarketingCategory[] {
  return Object.keys(MARKETING_CATEGORIES) as MarketingCategory[];
}

export function getMarketingCategoryCount(category: MarketingCategory): number {
  return MARKETING_TOOLS.filter((t) => t.category === category).length;
}

export const MARKETING_PRICING_LABELS: Record<MarketingTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const MARKETING_PRICING_COLORS: Record<MarketingTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

export const MARKETING_ROLES = {
  founders: {
    label: "Founders",
    emoji: "🚀",
    categories: ["crm", "analytics", "landing-pages"] as MarketingCategory[],
    tags: ["CRM", "analytics", "conversion", "growth", "pipeline"],
  },
  marketers: {
    label: "Marketers",
    emoji: "📈",
    categories: ["seo", "content", "advertising"] as MarketingCategory[],
    tags: ["SEO", "content", "PPC", "ads", "social", "email"],
  },
  "content-creators": {
    label: "Content Creators",
    emoji: "✍️",
    categories: ["content", "seo"] as MarketingCategory[],
    tags: ["content", "blog", "SEO", "writing", "research"],
  },
  "social-managers": {
    label: "Social Managers",
    emoji: "📱",
    categories: ["social"] as MarketingCategory[],
    tags: ["social media", "scheduling", "Instagram", "TikTok", "LinkedIn"],
  },
  "email-marketers": {
    label: "Email Marketers",
    emoji: "📧",
    categories: ["email"] as MarketingCategory[],
    tags: ["email", "newsletter", "automation", "subscribers"],
  },
  "growth-hackers": {
    label: "Growth Hackers",
    emoji: "⚡",
    categories: ["advertising", "landing-pages", "analytics"] as MarketingCategory[],
    tags: ["ads", "conversion", "A/B testing", "landing pages", "growth"],
  },
} as const;

export type MarketingRoleKey = keyof typeof MARKETING_ROLES;

export function filterMarketingTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): MarketingTool[] {
  let tools = MARKETING_TOOLS;

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

  if (role && role in MARKETING_ROLES) {
    const config = MARKETING_ROLES[role as MarketingRoleKey];
    tools = tools.filter(
      (t) =>
        (config.categories as readonly string[]).includes(t.category) ||
        t.tags.some((tag) =>
          config.tags.some((rt) => tag.toLowerCase().includes(rt.toLowerCase()))
        )
    );
  }

  return tools;
}
