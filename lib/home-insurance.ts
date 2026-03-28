import {
  HOME_INSURANCE_TOOLS,
  HOME_INSURANCE_CATEGORIES,
  type HomeInsuranceTool,
  type HomeInsuranceCategory,
} from "@/data/home-insurance";

export { HOME_INSURANCE_TOOLS, HOME_INSURANCE_CATEGORIES };
export type { HomeInsuranceTool, HomeInsuranceCategory };

export function getAllHomeInsuranceTools(): HomeInsuranceTool[] {
  return HOME_INSURANCE_TOOLS;
}

export function getFeaturedHomeInsuranceTools(): HomeInsuranceTool[] {
  return HOME_INSURANCE_TOOLS.filter((t) => t.featured);
}

export function getHomeInsuranceToolBySlug(slug: string): HomeInsuranceTool | undefined {
  return HOME_INSURANCE_TOOLS.find((t) => t.slug === slug);
}

export function getHomeInsuranceToolsByCategory(category: HomeInsuranceCategory): HomeInsuranceTool[] {
  return HOME_INSURANCE_TOOLS.filter((t) => t.category === category);
}

export function getAllHomeInsuranceCategories(): HomeInsuranceCategory[] {
  return Object.keys(HOME_INSURANCE_CATEGORIES) as HomeInsuranceCategory[];
}

export function getHomeInsuranceCategoryCount(category: HomeInsuranceCategory): number {
  return HOME_INSURANCE_TOOLS.filter((t) => t.category === category).length;
}

export const HOME_INSURANCE_PRICING_LABELS: Record<HomeInsuranceTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const HOME_INSURANCE_PRICING_COLORS: Record<HomeInsuranceTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const HOME_INSURANCE_ROLES = {} as const;

export type HomeInsuranceRoleKey = keyof typeof HOME_INSURANCE_ROLES;

export function filterHomeInsuranceTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): HomeInsuranceTool[] {
  let tools = HOME_INSURANCE_TOOLS;

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
