import {
  ANALYTICS_TOOLS,
  ANALYTICS_CATEGORIES,
  type AnalyticsTool,
  type AnalyticsCategory,
} from "@/data/analytics-tools";

export { ANALYTICS_TOOLS, ANALYTICS_CATEGORIES };
export type { AnalyticsTool, AnalyticsCategory };

export function getAllAnalyticsTools(): AnalyticsTool[] {
  return ANALYTICS_TOOLS;
}

export function getFeaturedAnalyticsTools(): AnalyticsTool[] {
  return ANALYTICS_TOOLS.filter((t) => t.featured);
}

export function getAnalyticsToolBySlug(slug: string): AnalyticsTool | undefined {
  return ANALYTICS_TOOLS.find((t) => t.slug === slug);
}

export function getAnalyticsToolsByCategory(category: AnalyticsCategory): AnalyticsTool[] {
  return ANALYTICS_TOOLS.filter((t) => t.category === category);
}

export function getAllAnalyticsCategories(): AnalyticsCategory[] {
  return Object.keys(ANALYTICS_CATEGORIES) as AnalyticsCategory[];
}

export function getAnalyticsCategoryCount(category: AnalyticsCategory): number {
  return ANALYTICS_TOOLS.filter((t) => t.category === category).length;
}

export const ANALYTICS_PRICING_LABELS: Record<AnalyticsTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const ANALYTICS_PRICING_COLORS: Record<AnalyticsTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-purple-500/20 text-purple-300 border-purple-500/30",
};

export const ANALYTICS_ROLES = {
  "marketing-analysts": {
    label: "Marketing Analysts",
    emoji: "📈",
    categories: ["web-analytics", "seo-analytics"] as AnalyticsCategory[],
    tags: ["google analytics", "seo", "attribution", "campaigns", "traffic"],
  },
  "product-managers": {
    label: "Product Managers",
    emoji: "📱",
    categories: ["product-analytics"] as AnalyticsCategory[],
    tags: ["funnels", "retention", "feature adoption", "user behavior", "A/B testing"],
  },
  "data-analysts": {
    label: "Data Analysts",
    emoji: "🔢",
    categories: ["bi-dashboards", "customer-data"] as AnalyticsCategory[],
    tags: ["SQL", "dashboards", "BI", "data warehouse", "reporting"],
  },
  "seo-managers": {
    label: "SEO Managers",
    emoji: "🔍",
    categories: ["seo-analytics"] as AnalyticsCategory[],
    tags: ["keyword research", "rank tracking", "backlinks", "site audit", "SERP"],
  },
  "data-engineers": {
    label: "Data Engineers",
    emoji: "⚙️",
    categories: ["customer-data"] as AnalyticsCategory[],
    tags: ["ETL", "data pipeline", "Fivetran", "dbt", "data warehouse"],
  },
} as const;

export type AnalyticsRoleKey = keyof typeof ANALYTICS_ROLES;

export function filterAnalyticsTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): AnalyticsTool[] {
  let tools = ANALYTICS_TOOLS;

  if (role && role in ANALYTICS_ROLES) {
    const roleData = ANALYTICS_ROLES[role as AnalyticsRoleKey];
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
