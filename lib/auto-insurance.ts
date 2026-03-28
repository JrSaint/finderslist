import {
  AUTO_INSURANCE_TOOLS,
  AUTO_INSURANCE_CATEGORIES,
  type AutoInsuranceTool,
  type AutoInsuranceCategory,
} from "@/data/auto-insurance";

export { AUTO_INSURANCE_TOOLS, AUTO_INSURANCE_CATEGORIES };
export type { AutoInsuranceTool, AutoInsuranceCategory };

export function getAllAutoInsuranceTools(): AutoInsuranceTool[] {
  return AUTO_INSURANCE_TOOLS;
}

export function getFeaturedAutoInsuranceTools(): AutoInsuranceTool[] {
  return AUTO_INSURANCE_TOOLS.filter((t) => t.featured);
}

export function getAutoInsuranceToolBySlug(slug: string): AutoInsuranceTool | undefined {
  return AUTO_INSURANCE_TOOLS.find((t) => t.slug === slug);
}

export function getAutoInsuranceToolsByCategory(category: AutoInsuranceCategory): AutoInsuranceTool[] {
  return AUTO_INSURANCE_TOOLS.filter((t) => t.category === category);
}

export function getAllAutoInsuranceCategories(): AutoInsuranceCategory[] {
  return Object.keys(AUTO_INSURANCE_CATEGORIES) as AutoInsuranceCategory[];
}

export function getAutoInsuranceCategoryCount(category: AutoInsuranceCategory): number {
  return AUTO_INSURANCE_TOOLS.filter((t) => t.category === category).length;
}

export const AUTO_INSURANCE_PRICING_LABELS: Record<AutoInsuranceTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const AUTO_INSURANCE_PRICING_COLORS: Record<AutoInsuranceTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const AUTO_INSURANCE_ROLES = {} as const;

export type AutoInsuranceRoleKey = keyof typeof AUTO_INSURANCE_ROLES;

export function filterAutoInsuranceTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): AutoInsuranceTool[] {
  let tools = AUTO_INSURANCE_TOOLS;

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
