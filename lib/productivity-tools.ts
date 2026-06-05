import {
  PRODUCTIVITY_TOOLS,
  PRODUCTIVITY_CATEGORIES,
  type ProductivityTool,
  type ProductivityCategory,
} from "@/data/productivity-tools";

export { PRODUCTIVITY_TOOLS, PRODUCTIVITY_CATEGORIES };
export type { ProductivityTool, ProductivityCategory };

export function getAllProductivityTools(): ProductivityTool[] {
  return PRODUCTIVITY_TOOLS;
}

export function getFeaturedProductivityTools(): ProductivityTool[] {
  return PRODUCTIVITY_TOOLS.filter((t) => t.featured);
}

export function getProductivityToolBySlug(slug: string): ProductivityTool | undefined {
  return PRODUCTIVITY_TOOLS.find((t) => t.slug === slug);
}

export function getProductivityToolsByCategory(category: ProductivityCategory): ProductivityTool[] {
  return PRODUCTIVITY_TOOLS.filter((t) => t.category === category);
}

export function getAllProductivityCategories(): ProductivityCategory[] {
  return Object.keys(PRODUCTIVITY_CATEGORIES) as ProductivityCategory[];
}

export function getProductivityCategoryCount(category: ProductivityCategory): number {
  return PRODUCTIVITY_TOOLS.filter((t) => t.category === category).length;
}

export const PRODUCTIVITY_PRICING_LABELS: Record<ProductivityTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const PRODUCTIVITY_PRICING_COLORS: Record<ProductivityTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

export const PRODUCTIVITY_ROLES = {
  teams: {
    label: "Teams",
    emoji: "👥",
    categories: ["project-management", "communication"] as ProductivityCategory[],
    tags: ["team", "collaboration", "project management", "workflow", "Kanban"],
  },
  solopreneurs: {
    label: "Solopreneurs",
    emoji: "🧘",
    categories: ["note-taking", "time-tracking", "ai-productivity"] as ProductivityCategory[],
    tags: ["personal productivity", "notes", "focus", "time blocking", "freelance"],
  },
  "remote-workers": {
    label: "Remote Workers",
    emoji: "🌍",
    categories: ["communication", "project-management"] as ProductivityCategory[],
    tags: ["remote", "async", "video", "Slack", "Loom", "documentation"],
  },
  "ops-managers": {
    label: "Ops & Managers",
    emoji: "⚙️",
    categories: ["automation", "project-management"] as ProductivityCategory[],
    tags: ["automation", "workflow", "Zapier", "Make", "operations", "process"],
  },
  developers: {
    label: "Developers",
    emoji: "💻",
    categories: ["project-management", "automation"] as ProductivityCategory[],
    tags: ["Linear", "GitHub", "engineering", "sprint", "issue tracking"],
  },
} as const;

export type ProductivityRoleKey = keyof typeof PRODUCTIVITY_ROLES;

export function filterProductivityTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): ProductivityTool[] {
  let tools = PRODUCTIVITY_TOOLS;

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

  if (role && role in PRODUCTIVITY_ROLES) {
    const config = PRODUCTIVITY_ROLES[role as ProductivityRoleKey];
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
