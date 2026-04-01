import {
  DIVORCE_LAWYER_TOOLS,
  DIVORCE_LAWYER_CATEGORIES,
  type DivorceLawyerTool,
  type DivorceLawyerCategory,
} from "@/data/divorce-lawyers";

export { DIVORCE_LAWYER_TOOLS, DIVORCE_LAWYER_CATEGORIES };
export type { DivorceLawyerTool, DivorceLawyerCategory };

export function getAllDivorceLawyerTools(): DivorceLawyerTool[] {
  return DIVORCE_LAWYER_TOOLS;
}

export function getFeaturedDivorceLawyerTools(): DivorceLawyerTool[] {
  return DIVORCE_LAWYER_TOOLS.filter((t) => t.featured);
}

export function getDivorceLawyerToolBySlug(slug: string): DivorceLawyerTool | undefined {
  return DIVORCE_LAWYER_TOOLS.find((t) => t.slug === slug);
}

export function getDivorceLawyerToolsByCategory(category: DivorceLawyerCategory): DivorceLawyerTool[] {
  return DIVORCE_LAWYER_TOOLS.filter((t) => t.category === category);
}

export function getAllDivorceLawyerCategories(): DivorceLawyerCategory[] {
  return Object.keys(DIVORCE_LAWYER_CATEGORIES) as DivorceLawyerCategory[];
}

export function getDivorceLawyerCategoryCount(category: DivorceLawyerCategory): number {
  return DIVORCE_LAWYER_TOOLS.filter((t) => t.category === category).length;
}

export function filterDivorceLawyerTools(filters: { query?: string; pricing?: string; role?: string }): DivorceLawyerTool[] {
  let results = DIVORCE_LAWYER_TOOLS;
  if (filters.query) {
    const q = filters.query.toLowerCase();
    results = results.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }
  if (filters.pricing) {
    results = results.filter((t) => t.pricing === filters.pricing);
  }
  return results;
}

export const DIVORCE_LAWYER_PRICING_LABELS: Record<DivorceLawyerTool["pricing"], string> = {
  free: "Free Consultation",
  freemium: "Freemium",
  paid: "Paid",
};

export const DIVORCE_LAWYER_PRICING_COLORS: Record<DivorceLawyerTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const DIVORCE_LAWYER_ROLES = {} as const;

export type DivorceLawyerRoleKey = keyof typeof DIVORCE_LAWYER_ROLES;
