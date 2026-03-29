import {
  ADDICTION_TREATMENT_TOOLS,
  ADDICTION_TREATMENT_CATEGORIES,
  type AddictionTreatmentTool,
  type AddictionTreatmentCategory,
} from "@/data/addiction-treatment-centers";

export { ADDICTION_TREATMENT_TOOLS, ADDICTION_TREATMENT_CATEGORIES };
export type { AddictionTreatmentTool, AddictionTreatmentCategory };

export function getAllAddictionTreatmentCenterTools(): AddictionTreatmentTool[] {
  return ADDICTION_TREATMENT_TOOLS;
}

export function getFeaturedAddictionTreatmentCenterTools(): AddictionTreatmentTool[] {
  return ADDICTION_TREATMENT_TOOLS.filter((t) => t.featured);
}

export function getAddictionTreatmentCenterToolBySlug(slug: string): AddictionTreatmentTool | undefined {
  return ADDICTION_TREATMENT_TOOLS.find((t) => t.slug === slug);
}

export function getAddictionTreatmentCenterToolsByCategory(category: AddictionTreatmentCategory): AddictionTreatmentTool[] {
  return ADDICTION_TREATMENT_TOOLS.filter((t) => t.category === category);
}

export function getAllAddictionTreatmentCenterCategories(): AddictionTreatmentCategory[] {
  return Object.keys(ADDICTION_TREATMENT_CATEGORIES) as AddictionTreatmentCategory[];
}

export function getAddictionTreatmentCenterCategoryCount(category: AddictionTreatmentCategory): number {
  return ADDICTION_TREATMENT_TOOLS.filter((t) => t.category === category).length;
}

export const ADDICTION_TREATMENT_PRICING_LABELS: Record<AddictionTreatmentTool["pricing"], string> = {
  free: "Free Resource",
  freemium: "Freemium",
  paid: "Paid",
};

export const ADDICTION_TREATMENT_PRICING_COLORS: Record<AddictionTreatmentTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const ADDICTION_TREATMENT_ROLES = {} as const;

export type AddictionTreatmentRoleKey = keyof typeof ADDICTION_TREATMENT_ROLES;

export function filterAddictionTreatmentCenterTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): AddictionTreatmentTool[] {
  let tools = ADDICTION_TREATMENT_TOOLS;

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
