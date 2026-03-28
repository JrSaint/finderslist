import {
  HOME_SECURITY_TOOLS,
  HOME_SECURITY_CATEGORIES,
  type HomeSecurityTool,
  type HomeSecurityCategory,
} from "@/data/home-security-systems";

export { HOME_SECURITY_TOOLS, HOME_SECURITY_CATEGORIES };
export type { HomeSecurityTool, HomeSecurityCategory };

export function getAllHomeSecurityTools(): HomeSecurityTool[] {
  return HOME_SECURITY_TOOLS;
}

export function getFeaturedHomeSecurityTools(): HomeSecurityTool[] {
  return HOME_SECURITY_TOOLS.filter((t) => t.featured);
}

export function getHomeSecurityToolBySlug(slug: string): HomeSecurityTool | undefined {
  return HOME_SECURITY_TOOLS.find((t) => t.slug === slug);
}

export function getHomeSecurityToolsByCategory(category: HomeSecurityCategory): HomeSecurityTool[] {
  return HOME_SECURITY_TOOLS.filter((t) => t.category === category);
}

export function getAllHomeSecurityCategories(): HomeSecurityCategory[] {
  return Object.keys(HOME_SECURITY_CATEGORIES) as HomeSecurityCategory[];
}

export function getHomeSecurityCategoryCount(category: HomeSecurityCategory): number {
  return HOME_SECURITY_TOOLS.filter((t) => t.category === category).length;
}

export const HOME_SECURITY_PRICING_LABELS: Record<HomeSecurityTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const HOME_SECURITY_PRICING_COLORS: Record<HomeSecurityTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const HOME_SECURITY_ROLES = {} as const;

export type HomeSecurityRoleKey = keyof typeof HOME_SECURITY_ROLES;

export function filterHomeSecurityTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): HomeSecurityTool[] {
  let tools = HOME_SECURITY_TOOLS;

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
