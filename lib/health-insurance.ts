import {
  HEALTH_INSURANCE_TOOLS,
  HEALTH_INSURANCE_CATEGORIES,
  type HealthInsuranceTool,
  type HealthInsuranceCategory,
} from "@/data/health-insurance";

export { HEALTH_INSURANCE_TOOLS, HEALTH_INSURANCE_CATEGORIES };
export type { HealthInsuranceTool, HealthInsuranceCategory };

export function getAllHealthInsuranceTools(): HealthInsuranceTool[] {
  return HEALTH_INSURANCE_TOOLS;
}

export function getFeaturedHealthInsuranceTools(): HealthInsuranceTool[] {
  return HEALTH_INSURANCE_TOOLS.filter((t) => t.featured);
}

export function getHealthInsuranceToolBySlug(slug: string): HealthInsuranceTool | undefined {
  return HEALTH_INSURANCE_TOOLS.find((t) => t.slug === slug);
}

export function getHealthInsuranceToolsByCategory(category: HealthInsuranceCategory): HealthInsuranceTool[] {
  return HEALTH_INSURANCE_TOOLS.filter((t) => t.category === category);
}

export function getAllHealthInsuranceCategories(): HealthInsuranceCategory[] {
  return Object.keys(HEALTH_INSURANCE_CATEGORIES) as HealthInsuranceCategory[];
}

export function getHealthInsuranceCategoryCount(category: HealthInsuranceCategory): number {
  return HEALTH_INSURANCE_TOOLS.filter((t) => t.category === category).length;
}

export const HEALTH_INSURANCE_PRICING_LABELS: Record<HealthInsuranceTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const HEALTH_INSURANCE_PRICING_COLORS: Record<HealthInsuranceTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const HEALTH_INSURANCE_ROLES = {} as const;

export type HealthInsuranceRoleKey = keyof typeof HEALTH_INSURANCE_ROLES;

export function filterHealthInsuranceTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): HealthInsuranceTool[] {
  let tools = HEALTH_INSURANCE_TOOLS;

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
