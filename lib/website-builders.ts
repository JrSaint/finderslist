import {
  WEBSITE_BUILDER_TOOLS,
  WEBSITE_BUILDER_CATEGORIES,
  type WebsiteBuilderTool,
  type WebsiteBuilderCategory,
} from "@/data/website-builders";

export { WEBSITE_BUILDER_TOOLS, WEBSITE_BUILDER_CATEGORIES };
export type { WebsiteBuilderTool, WebsiteBuilderCategory };

export function getAllWebsiteBuilderTools(): WebsiteBuilderTool[] {
  return WEBSITE_BUILDER_TOOLS;
}

export function getFeaturedWebsiteBuilderTools(): WebsiteBuilderTool[] {
  return WEBSITE_BUILDER_TOOLS.filter((t) => t.featured);
}

export function getWebsiteBuilderToolBySlug(slug: string): WebsiteBuilderTool | undefined {
  return WEBSITE_BUILDER_TOOLS.find((t) => t.slug === slug);
}

export function getWebsiteBuilderToolsByCategory(category: WebsiteBuilderCategory): WebsiteBuilderTool[] {
  return WEBSITE_BUILDER_TOOLS.filter((t) => t.category === category);
}

export function getAllWebsiteBuilderCategories(): WebsiteBuilderCategory[] {
  return Object.keys(WEBSITE_BUILDER_CATEGORIES) as WebsiteBuilderCategory[];
}

export function getWebsiteBuilderCategoryCount(category: WebsiteBuilderCategory): number {
  return WEBSITE_BUILDER_TOOLS.filter((t) => t.category === category).length;
}

export const WEBSITE_BUILDER_PRICING_LABELS: Record<WebsiteBuilderTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const WEBSITE_BUILDER_PRICING_COLORS: Record<WebsiteBuilderTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
};

export const WEBSITE_BUILDER_ROLES = {
  "small-businesses": {
    label: "Small Businesses",
    emoji: "🏪",
    categories: ["general-builders", "ecommerce-builders"] as WebsiteBuilderCategory[],
    tags: ["small business", "local business", "affordable", "templates"],
  },
  "designers": {
    label: "Designers & Agencies",
    emoji: "🎨",
    categories: ["general-builders", "landing-pages"] as WebsiteBuilderCategory[],
    tags: ["design", "agency", "webflow", "portfolio", "custom"],
  },
  "ecommerce-founders": {
    label: "eCommerce Founders",
    emoji: "🛍️",
    categories: ["ecommerce-builders"] as WebsiteBuilderCategory[],
    tags: ["shopify", "ecommerce", "dropshipping", "online store", "checkout"],
  },
  "marketers": {
    label: "Performance Marketers",
    emoji: "📈",
    categories: ["landing-pages"] as WebsiteBuilderCategory[],
    tags: ["landing pages", "conversion", "a/b testing", "ads", "leads"],
  },
  "developers": {
    label: "Developers",
    emoji: "💻",
    categories: ["cms", "static-site-generators"] as WebsiteBuilderCategory[],
    tags: ["headless cms", "api", "jamstack", "react", "static"],
  },
} as const;

export type WebsiteBuilderRoleKey = keyof typeof WEBSITE_BUILDER_ROLES;

export function filterWebsiteBuilderTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): WebsiteBuilderTool[] {
  let tools = WEBSITE_BUILDER_TOOLS;

  if (role && role in WEBSITE_BUILDER_ROLES) {
    const roleData = WEBSITE_BUILDER_ROLES[role as WebsiteBuilderRoleKey];
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
