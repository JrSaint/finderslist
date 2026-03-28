import {
  LIFE_INSURANCE_TOOLS,
  LIFE_INSURANCE_CATEGORIES,
  type LifeInsuranceTool,
  type LifeInsuranceCategory,
} from "@/data/life-insurance";

export { LIFE_INSURANCE_TOOLS, LIFE_INSURANCE_CATEGORIES };
export type { LifeInsuranceTool, LifeInsuranceCategory };

export function getAllLifeInsuranceTools(): LifeInsuranceTool[] {
  return LIFE_INSURANCE_TOOLS;
}

export function getFeaturedLifeInsuranceTools(): LifeInsuranceTool[] {
  return LIFE_INSURANCE_TOOLS.filter((t) => t.featured);
}

export function getLifeInsuranceToolBySlug(slug: string): LifeInsuranceTool | undefined {
  return LIFE_INSURANCE_TOOLS.find((t) => t.slug === slug);
}

export function getLifeInsuranceToolsByCategory(category: LifeInsuranceCategory): LifeInsuranceTool[] {
  return LIFE_INSURANCE_TOOLS.filter((t) => t.category === category);
}

export function getAllLifeInsuranceCategories(): LifeInsuranceCategory[] {
  return Object.keys(LIFE_INSURANCE_CATEGORIES) as LifeInsuranceCategory[];
}

export function getLifeInsuranceCategoryCount(category: LifeInsuranceCategory): number {
  return LIFE_INSURANCE_TOOLS.filter((t) => t.category === category).length;
}

export const LIFE_INSURANCE_PRICING_LABELS: Record<LifeInsuranceTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const LIFE_INSURANCE_PRICING_COLORS: Record<LifeInsuranceTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const LIFE_INSURANCE_ROLES = {} as const;

export type LifeInsuranceRoleKey = keyof typeof LIFE_INSURANCE_ROLES;

export function filterLifeInsuranceTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): LifeInsuranceTool[] {
  let tools = LIFE_INSURANCE_TOOLS;

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
