import {
  ATS_TOOLS,
  ATS_CATEGORIES,
  type ATSTool,
  type ATSCategory,
} from "@/data/applicant-tracking-systems";

export { ATS_TOOLS, ATS_CATEGORIES };
export type { ATSTool, ATSCategory };

export function getAllATSTools(): ATSTool[] {
  return ATS_TOOLS;
}

export function getFeaturedATSTools(): ATSTool[] {
  return ATS_TOOLS.filter((t) => t.featured);
}

export function getATSToolBySlug(slug: string): ATSTool | undefined {
  return ATS_TOOLS.find((t) => t.slug === slug);
}

export function getATSToolsByCategory(category: ATSCategory): ATSTool[] {
  return ATS_TOOLS.filter((t) => t.category === category);
}

export function getAllATSCategories(): ATSCategory[] {
  return Object.keys(ATS_CATEGORIES) as ATSCategory[];
}

export function getATSCategoryCount(category: ATSCategory): number {
  return ATS_TOOLS.filter((t) => t.category === category).length;
}

export const ATS_PRICING_LABELS: Record<ATSTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const ATS_PRICING_COLORS: Record<ATSTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const ATS_ROLES = {} as const;

export type ATSRoleKey = keyof typeof ATS_ROLES;

export function filterATSTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): ATSTool[] {
  let tools = ATS_TOOLS;

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
