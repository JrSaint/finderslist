import {
  HOME_WARRANTY_TOOLS,
  HOME_WARRANTY_CATEGORIES,
  type HomeWarrantyTool,
  type HomeWarrantyCategory,
} from "@/data/home-warranty-companies";

export { HOME_WARRANTY_TOOLS, HOME_WARRANTY_CATEGORIES };
export type { HomeWarrantyTool, HomeWarrantyCategory };

export function getAllHomeWarrantyTools(): HomeWarrantyTool[] {
  return HOME_WARRANTY_TOOLS;
}

export function getFeaturedHomeWarrantyTools(): HomeWarrantyTool[] {
  return HOME_WARRANTY_TOOLS.filter((t) => t.featured);
}

export function getHomeWarrantyToolBySlug(slug: string): HomeWarrantyTool | undefined {
  return HOME_WARRANTY_TOOLS.find((t) => t.slug === slug);
}

export function getHomeWarrantyToolsByCategory(category: HomeWarrantyCategory): HomeWarrantyTool[] {
  return HOME_WARRANTY_TOOLS.filter((t) => t.category === category);
}

export function getAllHomeWarrantyCategories(): HomeWarrantyCategory[] {
  return Object.keys(HOME_WARRANTY_CATEGORIES) as HomeWarrantyCategory[];
}

export function getHomeWarrantyCategoryCount(category: HomeWarrantyCategory): number {
  return HOME_WARRANTY_TOOLS.filter((t) => t.category === category).length;
}

export const HOME_WARRANTY_PRICING_LABELS: Record<HomeWarrantyTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const HOME_WARRANTY_PRICING_COLORS: Record<HomeWarrantyTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const HOME_WARRANTY_ROLES = {} as const;

export type HomeWarrantyRoleKey = keyof typeof HOME_WARRANTY_ROLES;

export function filterHomeWarrantyTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): HomeWarrantyTool[] {
  let tools = HOME_WARRANTY_TOOLS;

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
