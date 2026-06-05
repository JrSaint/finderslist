import { TOOLS, CATEGORIES, type Tool, type Category } from "@/data/tools";

export { TOOLS, CATEGORIES };
export type { Tool, Category };

export function getAllTools(): Tool[] {
  return TOOLS;
}

export function getFeaturedTools(): Tool[] {
  return TOOLS.filter((t) => t.featured);
}

export function getToolBySlug(slug: string): Tool | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: Category): Tool[] {
  return TOOLS.filter((t) => t.category === category);
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase();
  return TOOLS.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.tagline.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q))
  );
}

export function getAllCategories(): Category[] {
  return Object.keys(CATEGORIES) as Category[];
}

export function getCategoryCount(category: Category): number {
  return TOOLS.filter((t) => t.category === category).length;
}

export const PRICING_LABELS: Record<Tool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const PRICING_COLORS: Record<Tool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

// ── Role-based quick filters ─────────────────────────────────────────────────
export const ROLES = {
  writers: {
    label: "Writers",
    emoji: "✍️",
    categories: ["writing"] as Category[],
    tags: ["writing", "blog", "copywriting", "content", "grammar"],
  },
  developers: {
    label: "Developers",
    emoji: "💻",
    categories: ["coding"] as Category[],
    tags: ["coding", "code", "IDE", "terminal", "developer"],
  },
  marketers: {
    label: "Marketers",
    emoji: "📈",
    categories: ["marketing"] as Category[],
    tags: ["marketing", "SEO", "ads", "email", "social"],
  },
  designers: {
    label: "Designers",
    emoji: "🎨",
    categories: ["design", "image"] as Category[],
    tags: ["design", "image", "vector", "brand", "ui"],
  },
  researchers: {
    label: "Researchers",
    emoji: "🔬",
    categories: ["research"] as Category[],
    tags: ["research", "academic", "papers", "citations", "search"],
  },
  creators: {
    label: "Creators",
    emoji: "🎬",
    categories: ["video-audio"] as Category[],
    tags: ["video", "audio", "podcast", "music", "voice"],
  },
} as const;

export type RoleKey = keyof typeof ROLES;

export function getToolsByRole(role: RoleKey): Tool[] {
  const config = ROLES[role];
  return TOOLS.filter(
    (t) =>
      (config.categories as readonly string[]).includes(t.category) ||
      t.tags.some((tag) =>
        config.tags.some((rt) => tag.toLowerCase().includes(rt.toLowerCase()))
      )
  );
}

export function filterTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): Tool[] {
  let tools = TOOLS;

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

  if (role && role in ROLES) {
    const config = ROLES[role as RoleKey];
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
