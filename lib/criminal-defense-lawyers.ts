import {
  CRIMINAL_DEFENSE_LAWYER_TOOLS,
  CRIMINAL_DEFENSE_LAWYER_CATEGORIES,
  type CriminalDefenseLawyerTool,
  type CriminalDefenseLawyerCategory,
} from "@/data/criminal-defense-lawyers";

export { CRIMINAL_DEFENSE_LAWYER_TOOLS, CRIMINAL_DEFENSE_LAWYER_CATEGORIES };
export type { CriminalDefenseLawyerTool, CriminalDefenseLawyerCategory };

export function getAllCriminalDefenseLawyerTools(): CriminalDefenseLawyerTool[] {
  return CRIMINAL_DEFENSE_LAWYER_TOOLS;
}

export function getFeaturedCriminalDefenseLawyerTools(): CriminalDefenseLawyerTool[] {
  return CRIMINAL_DEFENSE_LAWYER_TOOLS.filter((t) => t.featured);
}

export function getCriminalDefenseLawyerToolBySlug(slug: string): CriminalDefenseLawyerTool | undefined {
  return CRIMINAL_DEFENSE_LAWYER_TOOLS.find((t) => t.slug === slug);
}

export function getCriminalDefenseLawyerToolsByCategory(category: CriminalDefenseLawyerCategory): CriminalDefenseLawyerTool[] {
  return CRIMINAL_DEFENSE_LAWYER_TOOLS.filter((t) => t.category === category);
}

export function getAllCriminalDefenseLawyerCategories(): CriminalDefenseLawyerCategory[] {
  return Object.keys(CRIMINAL_DEFENSE_LAWYER_CATEGORIES) as CriminalDefenseLawyerCategory[];
}

export function getCriminalDefenseLawyerCategoryCount(category: CriminalDefenseLawyerCategory): number {
  return CRIMINAL_DEFENSE_LAWYER_TOOLS.filter((t) => t.category === category).length;
}

export function filterCriminalDefenseLawyerTools(filters: { query?: string; pricing?: string; role?: string }): CriminalDefenseLawyerTool[] {
  let results = CRIMINAL_DEFENSE_LAWYER_TOOLS;
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

export const CRIMINAL_DEFENSE_LAWYER_PRICING_LABELS: Record<CriminalDefenseLawyerTool["pricing"], string> = {
  free: "Free Consultation",
  freemium: "Freemium",
  paid: "Paid",
};

export const CRIMINAL_DEFENSE_LAWYER_PRICING_COLORS: Record<CriminalDefenseLawyerTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const CRIMINAL_DEFENSE_LAWYER_ROLES = {} as const;

export type CriminalDefenseLawyerRoleKey = keyof typeof CRIMINAL_DEFENSE_LAWYER_ROLES;
