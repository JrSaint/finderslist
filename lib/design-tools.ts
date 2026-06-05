import {
  DESIGN_TOOLS,
  DESIGN_CATEGORIES,
  type DesignTool,
  type DesignCategory,
} from "@/data/design-tools";

export { DESIGN_TOOLS, DESIGN_CATEGORIES };
export type { DesignTool, DesignCategory };

export function getAllDesignTools(): DesignTool[] {
  return DESIGN_TOOLS;
}

export function getFeaturedDesignTools(): DesignTool[] {
  return DESIGN_TOOLS.filter((t) => t.featured);
}

export function getDesignToolBySlug(slug: string): DesignTool | undefined {
  return DESIGN_TOOLS.find((t) => t.slug === slug);
}

export function getDesignToolsByCategory(category: DesignCategory): DesignTool[] {
  return DESIGN_TOOLS.filter((t) => t.category === category);
}

export function getAllDesignCategories(): DesignCategory[] {
  return Object.keys(DESIGN_CATEGORIES) as DesignCategory[];
}

export function getDesignCategoryCount(category: DesignCategory): number {
  return DESIGN_TOOLS.filter((t) => t.category === category).length;
}

export const DESIGN_PRICING_LABELS: Record<DesignTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const DESIGN_PRICING_COLORS: Record<DesignTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30",
};

export const DESIGN_ROLES = {
  "product-designers": {
    label: "Product Designers",
    emoji: "🎨",
    categories: ["ui-design", "prototyping"] as DesignCategory[],
    tags: ["ux", "ui", "product design", "wireframing", "user research"],
  },
  "graphic-designers": {
    label: "Graphic Designers",
    emoji: "✏️",
    categories: ["graphic-design", "motion"] as DesignCategory[],
    tags: ["graphic design", "branding", "illustration", "print"],
  },
  "developers": {
    label: "Developers",
    emoji: "💻",
    categories: ["ui-design", "asset-management"] as DesignCategory[],
    tags: ["handoff", "components", "design system", "css", "svg"],
  },
  "brand-teams": {
    label: "Brand & Marketing Teams",
    emoji: "📢",
    categories: ["graphic-design", "asset-management"] as DesignCategory[],
    tags: ["brand", "marketing", "social media", "content", "templates"],
  },
  "motion-designers": {
    label: "Motion Designers",
    emoji: "🎬",
    categories: ["motion", "prototyping"] as DesignCategory[],
    tags: ["animation", "motion graphics", "video", "after effects", "lottie"],
  },
} as const;

export type DesignRoleKey = keyof typeof DESIGN_ROLES;

export function filterDesignTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): DesignTool[] {
  let tools = DESIGN_TOOLS;

  if (role && role in DESIGN_ROLES) {
    const roleData = DESIGN_ROLES[role as DesignRoleKey];
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
