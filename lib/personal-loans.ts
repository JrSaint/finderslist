import {
  PERSONAL_LOAN_TOOLS,
  PERSONAL_LOAN_CATEGORIES,
  type PersonalLoanTool,
  type PersonalLoanCategory,
} from "@/data/personal-loans";

export { PERSONAL_LOAN_TOOLS, PERSONAL_LOAN_CATEGORIES };
export type { PersonalLoanTool, PersonalLoanCategory };

export function getAllPersonalLoanTools(): PersonalLoanTool[] {
  return PERSONAL_LOAN_TOOLS;
}

export function getFeaturedPersonalLoanTools(): PersonalLoanTool[] {
  return PERSONAL_LOAN_TOOLS.filter((t) => t.featured);
}

export function getPersonalLoanToolBySlug(slug: string): PersonalLoanTool | undefined {
  return PERSONAL_LOAN_TOOLS.find((t) => t.slug === slug);
}

export function getPersonalLoanToolsByCategory(category: PersonalLoanCategory): PersonalLoanTool[] {
  return PERSONAL_LOAN_TOOLS.filter((t) => t.category === category);
}

export function getAllPersonalLoanCategories(): PersonalLoanCategory[] {
  return Object.keys(PERSONAL_LOAN_CATEGORIES) as PersonalLoanCategory[];
}

export function getPersonalLoanCategoryCount(category: PersonalLoanCategory): number {
  return PERSONAL_LOAN_TOOLS.filter((t) => t.category === category).length;
}

export const PERSONAL_LOAN_PRICING_LABELS: Record<PersonalLoanTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const PERSONAL_LOAN_PRICING_COLORS: Record<PersonalLoanTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const PERSONAL_LOAN_ROLES = {} as const;

export type PersonalLoanRoleKey = keyof typeof PERSONAL_LOAN_ROLES;

export function filterPersonalLoanTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): PersonalLoanTool[] {
  let tools = PERSONAL_LOAN_TOOLS;

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
