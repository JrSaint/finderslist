import {
  MESOTHELIOMA_LAWYER_TOOLS,
  MESOTHELIOMA_LAWYER_CATEGORIES,
  type MesotheliomaLawyerTool,
  type MesotheliomaLawyerCategory,
} from "@/data/mesothelioma-lawyers";

export { MESOTHELIOMA_LAWYER_TOOLS, MESOTHELIOMA_LAWYER_CATEGORIES };
export type { MesotheliomaLawyerTool, MesotheliomaLawyerCategory };

export function getAllMesotheliomaLawyerTools(): MesotheliomaLawyerTool[] {
  return MESOTHELIOMA_LAWYER_TOOLS;
}

export function getFeaturedMesotheliomaLawyerTools(): MesotheliomaLawyerTool[] {
  return MESOTHELIOMA_LAWYER_TOOLS.filter((t) => t.featured);
}

export function getMesotheliomaLawyerToolBySlug(slug: string): MesotheliomaLawyerTool | undefined {
  return MESOTHELIOMA_LAWYER_TOOLS.find((t) => t.slug === slug);
}

export function getMesotheliomaLawyerToolsByCategory(category: MesotheliomaLawyerCategory): MesotheliomaLawyerTool[] {
  return MESOTHELIOMA_LAWYER_TOOLS.filter((t) => t.category === category);
}

export function getAllMesotheliomaLawyerCategories(): MesotheliomaLawyerCategory[] {
  return Object.keys(MESOTHELIOMA_LAWYER_CATEGORIES) as MesotheliomaLawyerCategory[];
}

export function getMesotheliomaLawyerCategoryCount(category: MesotheliomaLawyerCategory): number {
  return MESOTHELIOMA_LAWYER_TOOLS.filter((t) => t.category === category).length;
}

export const MESOTHELIOMA_LAWYER_PRICING_LABELS: Record<MesotheliomaLawyerTool["pricing"], string> = {
  free: "Free Consultation",
  freemium: "Freemium",
  paid: "Paid",
};

export const MESOTHELIOMA_LAWYER_PRICING_COLORS: Record<MesotheliomaLawyerTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const MESOTHELIOMA_LAWYER_ROLES = {} as const;

export type MesotheliomaLawyerRoleKey = keyof typeof MESOTHELIOMA_LAWYER_ROLES;

export function filterMesotheliomaLawyerTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): MesotheliomaLawyerTool[] {
  let tools = MESOTHELIOMA_LAWYER_TOOLS;

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
