import {
  DEVELOPER_TOOLS,
  DEVELOPER_CATEGORIES,
  type DeveloperTool,
  type DeveloperCategory,
} from "@/data/developer-tools";

export { DEVELOPER_TOOLS, DEVELOPER_CATEGORIES };
export type { DeveloperTool, DeveloperCategory };

export function getAllDeveloperTools(): DeveloperTool[] {
  return DEVELOPER_TOOLS;
}

export function getFeaturedDeveloperTools(): DeveloperTool[] {
  return DEVELOPER_TOOLS.filter((t) => t.featured);
}

export function getDeveloperToolBySlug(slug: string): DeveloperTool | undefined {
  return DEVELOPER_TOOLS.find((t) => t.slug === slug);
}

export function getDeveloperToolsByCategory(category: DeveloperCategory): DeveloperTool[] {
  return DEVELOPER_TOOLS.filter((t) => t.category === category);
}

export function getAllDeveloperCategories(): DeveloperCategory[] {
  return Object.keys(DEVELOPER_CATEGORIES) as DeveloperCategory[];
}

export function getDeveloperCategoryCount(category: DeveloperCategory): number {
  return DEVELOPER_TOOLS.filter((t) => t.category === category).length;
}

export const DEVELOPER_PRICING_LABELS: Record<DeveloperTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const DEVELOPER_PRICING_COLORS: Record<DeveloperTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
};

export const DEVELOPER_ROLES = {
  "frontend-devs": {
    label: "Frontend Developers",
    emoji: "🎨",
    categories: ["version-control", "ci-cd"] as DeveloperCategory[],
    tags: ["react", "vue", "deployment", "frontend", "css"],
  },
  "backend-devs": {
    label: "Backend Developers",
    emoji: "⚙️",
    categories: ["monitoring", "api-tools", "error-tracking"] as DeveloperCategory[],
    tags: ["api", "databases", "monitoring", "backend", "server"],
  },
  "devops": {
    label: "DevOps & Platform",
    emoji: "🔧",
    categories: ["ci-cd", "monitoring"] as DeveloperCategory[],
    tags: ["deployment", "docker", "kubernetes", "infrastructure", "ci/cd"],
  },
  "engineering-managers": {
    label: "Engineering Managers",
    emoji: "👔",
    categories: ["issue-tracking", "monitoring"] as DeveloperCategory[],
    tags: ["project management", "sprint planning", "team productivity", "metrics"],
  },
  "indie-hackers": {
    label: "Indie Hackers",
    emoji: "🚀",
    categories: ["ci-cd", "version-control"] as DeveloperCategory[],
    tags: ["indie", "solo developer", "free", "startup", "side project"],
  },
} as const;

export type DeveloperRoleKey = keyof typeof DEVELOPER_ROLES;

export function filterDeveloperTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): DeveloperTool[] {
  let tools = DEVELOPER_TOOLS;

  if (role && role in DEVELOPER_ROLES) {
    const roleData = DEVELOPER_ROLES[role as DeveloperRoleKey];
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
