import {
  NO_CODE_TOOLS,
  NO_CODE_CATEGORIES,
  type NoCodeTool,
  type NoCodeCategory,
} from "@/data/no-code-tools";

export { NO_CODE_TOOLS, NO_CODE_CATEGORIES };
export type { NoCodeTool, NoCodeCategory };

export function getAllNoCodeTools(): NoCodeTool[] {
  return NO_CODE_TOOLS;
}

export function getFeaturedNoCodeTools(): NoCodeTool[] {
  return NO_CODE_TOOLS.filter((t) => t.featured);
}

export function getNoCodeToolBySlug(slug: string): NoCodeTool | undefined {
  return NO_CODE_TOOLS.find((t) => t.slug === slug);
}

export function getNoCodeToolsByCategory(category: NoCodeCategory): NoCodeTool[] {
  return NO_CODE_TOOLS.filter((t) => t.category === category);
}

export function getAllNoCodeCategories(): NoCodeCategory[] {
  return Object.keys(NO_CODE_CATEGORIES) as NoCodeCategory[];
}

export function getNoCodeCategoryCount(category: NoCodeCategory): number {
  return NO_CODE_TOOLS.filter((t) => t.category === category).length;
}

export const NO_CODE_PRICING_LABELS: Record<NoCodeTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const NO_CODE_PRICING_COLORS: Record<NoCodeTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-lime-500/20 text-lime-300 border-lime-500/30",
};

export const NO_CODE_ROLES = {
  "non-technical-founders": {
    label: "Non-Technical Founders",
    emoji: "🚀",
    categories: ["app-builders", "database"] as NoCodeCategory[],
    tags: ["mvp", "startup", "no code", "bubble", "product"],
  },
  "operations-teams": {
    label: "Operations Teams",
    emoji: "⚙️",
    categories: ["automation", "database", "forms"] as NoCodeCategory[],
    tags: ["automation", "spreadsheets", "workflows", "internal tools", "reporting"],
  },
  "marketers": {
    label: "Marketers",
    emoji: "📈",
    categories: ["automation", "forms"] as NoCodeCategory[],
    tags: ["lead capture", "automation", "email triggers", "Zapier", "campaigns"],
  },
  "developers": {
    label: "Developers & Technical Teams",
    emoji: "💻",
    categories: ["automation", "workflow-ai"] as NoCodeCategory[],
    tags: ["n8n", "self-hosted", "API", "AI workflows", "integration"],
  },
  "agencies": {
    label: "Agencies & Consultants",
    emoji: "🏢",
    categories: ["app-builders", "automation"] as NoCodeCategory[],
    tags: ["client projects", "internal tools", "workflows", "custom portals"],
  },
} as const;

export type NoCodeRoleKey = keyof typeof NO_CODE_ROLES;

export function filterNoCodeTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): NoCodeTool[] {
  let tools = NO_CODE_TOOLS;

  if (role && role in NO_CODE_ROLES) {
    const roleData = NO_CODE_ROLES[role as NoCodeRoleKey];
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
