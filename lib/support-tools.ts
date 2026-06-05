import {
  SUPPORT_TOOLS,
  SUPPORT_CATEGORIES,
  type SupportTool,
  type SupportCategory,
} from "@/data/support-tools";

export { SUPPORT_TOOLS, SUPPORT_CATEGORIES };
export type { SupportTool, SupportCategory };

export function getAllSupportTools(): SupportTool[] {
  return SUPPORT_TOOLS;
}

export function getFeaturedSupportTools(): SupportTool[] {
  return SUPPORT_TOOLS.filter((t) => t.featured);
}

export function getSupportToolBySlug(slug: string): SupportTool | undefined {
  return SUPPORT_TOOLS.find((t) => t.slug === slug);
}

export function getSupportToolsByCategory(category: SupportCategory): SupportTool[] {
  return SUPPORT_TOOLS.filter((t) => t.category === category);
}

export function getAllSupportCategories(): SupportCategory[] {
  return Object.keys(SUPPORT_CATEGORIES) as SupportCategory[];
}

export function getSupportCategoryCount(category: SupportCategory): number {
  return SUPPORT_TOOLS.filter((t) => t.category === category).length;
}

export const SUPPORT_PRICING_LABELS: Record<SupportTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const SUPPORT_PRICING_COLORS: Record<SupportTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-green-500/20 text-green-300 border-green-500/30",
};

export const SUPPORT_ROLES = {
  "support-managers": {
    label: "Support Managers",
    emoji: "👔",
    categories: ["help-desk", "feedback"] as SupportCategory[],
    tags: ["ticket routing", "SLA", "reporting", "team management", "customer satisfaction"],
  },
  "support-agents": {
    label: "Support Agents",
    emoji: "🎧",
    categories: ["help-desk", "live-chat", "knowledge-base"] as SupportCategory[],
    tags: ["tickets", "macros", "chat", "knowledge base", "canned responses"],
  },
  "customer-success": {
    label: "Customer Success Teams",
    emoji: "🤝",
    categories: ["customer-success", "feedback"] as SupportCategory[],
    tags: ["churn prevention", "health scores", "NPS", "onboarding", "expansion"],
  },
  "saas-founders": {
    label: "SaaS Founders",
    emoji: "🚀",
    categories: ["live-chat", "knowledge-base"] as SupportCategory[],
    tags: ["intercom", "live chat", "self-service", "onboarding", "in-app"],
  },
} as const;

export type SupportRoleKey = keyof typeof SUPPORT_ROLES;

export function filterSupportTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): SupportTool[] {
  let tools = SUPPORT_TOOLS;

  if (role && role in SUPPORT_ROLES) {
    const roleData = SUPPORT_ROLES[role as SupportRoleKey];
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
