import {
  PERSONAL_INJURY_TOOLS,
  PERSONAL_INJURY_CATEGORIES,
  type PersonalInjuryTool,
  type PersonalInjuryCategory,
} from "@/data/personal-injury-lawyers";

export { PERSONAL_INJURY_TOOLS, PERSONAL_INJURY_CATEGORIES };
export type { PersonalInjuryTool, PersonalInjuryCategory };

export function getAllPersonalInjuryTools(): PersonalInjuryTool[] {
  return PERSONAL_INJURY_TOOLS;
}

export function getFeaturedPersonalInjuryTools(): PersonalInjuryTool[] {
  return PERSONAL_INJURY_TOOLS.filter((t) => t.featured);
}

export function getPersonalInjuryToolBySlug(slug: string): PersonalInjuryTool | undefined {
  return PERSONAL_INJURY_TOOLS.find((t) => t.slug === slug);
}

export function getPersonalInjuryToolsByCategory(category: PersonalInjuryCategory): PersonalInjuryTool[] {
  return PERSONAL_INJURY_TOOLS.filter((t) => t.category === category);
}

export function getAllPersonalInjuryCategories(): PersonalInjuryCategory[] {
  return Object.keys(PERSONAL_INJURY_CATEGORIES) as PersonalInjuryCategory[];
}

export function getPersonalInjuryCategoryCount(category: PersonalInjuryCategory): number {
  return PERSONAL_INJURY_TOOLS.filter((t) => t.category === category).length;
}

export const PERSONAL_INJURY_PRICING_LABELS: Record<PersonalInjuryTool["pricing"], string> = {
  free: "Free Consultation",
  freemium: "Freemium",
  paid: "Paid",
};

export const PERSONAL_INJURY_PRICING_COLORS: Record<PersonalInjuryTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const PERSONAL_INJURY_ROLES = {} as const;

export type PersonalInjuryRoleKey = keyof typeof PERSONAL_INJURY_ROLES;

export function filterPersonalInjuryTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): PersonalInjuryTool[] {
  let tools = PERSONAL_INJURY_TOOLS;

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
