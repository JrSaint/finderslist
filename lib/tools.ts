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
