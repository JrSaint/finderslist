import {
  PEST_CONTROL_TOOLS,
  PEST_CONTROL_CATEGORIES,
  type PestControlTool,
  type PestControlCategory,
} from "@/data/pest-control-services";

export { PEST_CONTROL_TOOLS, PEST_CONTROL_CATEGORIES };
export type { PestControlTool, PestControlCategory };

export function getAllPestControlTools(): PestControlTool[] {
  return PEST_CONTROL_TOOLS;
}

export function getFeaturedPestControlTools(): PestControlTool[] {
  return PEST_CONTROL_TOOLS.filter((t) => t.featured);
}

export function getPestControlToolBySlug(slug: string): PestControlTool | undefined {
  return PEST_CONTROL_TOOLS.find((t) => t.slug === slug);
}

export function getPestControlToolsByCategory(category: PestControlCategory): PestControlTool[] {
  return PEST_CONTROL_TOOLS.filter((t) => t.category === category);
}

export function getAllPestControlCategories(): PestControlCategory[] {
  return Object.keys(PEST_CONTROL_CATEGORIES) as PestControlCategory[];
}

export function getPestControlCategoryCount(category: PestControlCategory): number {
  return PEST_CONTROL_TOOLS.filter((t) => t.category === category).length;
}

export const PEST_CONTROL_PRICING_LABELS: Record<PestControlTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const PEST_CONTROL_PRICING_COLORS: Record<PestControlTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const PEST_CONTROL_ROLES = {} as const;

export type PestControlRoleKey = keyof typeof PEST_CONTROL_ROLES;

export function filterPestControlTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): PestControlTool[] {
  let tools = PEST_CONTROL_TOOLS;

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

  return tools;
}
