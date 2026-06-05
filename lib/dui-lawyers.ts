import {
  DUI_LAWYER_TOOLS,
  DUI_LAWYER_CATEGORIES,
  type DUILawyerTool,
  type DUILawyerCategory,
} from "@/data/dui-lawyers";

export { DUI_LAWYER_TOOLS, DUI_LAWYER_CATEGORIES };
export type { DUILawyerTool, DUILawyerCategory };

export function getAllDUILawyerTools(): DUILawyerTool[] {
  return DUI_LAWYER_TOOLS;
}

export function getFeaturedDUILawyerTools(): DUILawyerTool[] {
  return DUI_LAWYER_TOOLS.filter((t) => t.featured);
}

export function getDUILawyerToolBySlug(slug: string): DUILawyerTool | undefined {
  return DUI_LAWYER_TOOLS.find((t) => t.slug === slug);
}

export function getDUILawyerToolsByCategory(category: DUILawyerCategory): DUILawyerTool[] {
  return DUI_LAWYER_TOOLS.filter((t) => t.category === category);
}

export function getAllDUILawyerCategories(): DUILawyerCategory[] {
  return Object.keys(DUI_LAWYER_CATEGORIES) as DUILawyerCategory[];
}

export function getDUILawyerCategoryCount(category: DUILawyerCategory): number {
  return DUI_LAWYER_TOOLS.filter((t) => t.category === category).length;
}

export function filterDUILawyerTools(filters: { query?: string; pricing?: string; role?: string }): DUILawyerTool[] {
  let results = DUI_LAWYER_TOOLS;
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

export const DUI_LAWYER_PRICING_LABELS: Record<DUILawyerTool["pricing"], string> = {
  free: "Free Consultation",
  freemium: "Freemium",
  paid: "Paid",
};

export const DUI_LAWYER_PRICING_COLORS: Record<DUILawyerTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const DUI_LAWYER_ROLES = {} as const;

export type DUILawyerRoleKey = keyof typeof DUI_LAWYER_ROLES;
