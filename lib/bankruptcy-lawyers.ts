import {
  BANKRUPTCY_LAWYER_TOOLS,
  BANKRUPTCY_LAWYER_CATEGORIES,
  type BankruptcyLawyerTool,
  type BankruptcyLawyerCategory,
} from "@/data/bankruptcy-lawyers";

export { BANKRUPTCY_LAWYER_TOOLS, BANKRUPTCY_LAWYER_CATEGORIES };
export type { BankruptcyLawyerTool, BankruptcyLawyerCategory };

export function getAllBankruptcyLawyerTools(): BankruptcyLawyerTool[] {
  return BANKRUPTCY_LAWYER_TOOLS;
}

export function getFeaturedBankruptcyLawyerTools(): BankruptcyLawyerTool[] {
  return BANKRUPTCY_LAWYER_TOOLS.filter((t) => t.featured);
}

export function getBankruptcyLawyerToolBySlug(slug: string): BankruptcyLawyerTool | undefined {
  return BANKRUPTCY_LAWYER_TOOLS.find((t) => t.slug === slug);
}

export function getBankruptcyLawyerToolsByCategory(category: BankruptcyLawyerCategory): BankruptcyLawyerTool[] {
  return BANKRUPTCY_LAWYER_TOOLS.filter((t) => t.category === category);
}

export function getAllBankruptcyLawyerCategories(): BankruptcyLawyerCategory[] {
  return Object.keys(BANKRUPTCY_LAWYER_CATEGORIES) as BankruptcyLawyerCategory[];
}

export function getBankruptcyLawyerCategoryCount(category: BankruptcyLawyerCategory): number {
  return BANKRUPTCY_LAWYER_TOOLS.filter((t) => t.category === category).length;
}

export function filterBankruptcyLawyerTools(filters: { query?: string; pricing?: string; role?: string }): BankruptcyLawyerTool[] {
  let results = BANKRUPTCY_LAWYER_TOOLS;
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

export const BANKRUPTCY_LAWYER_PRICING_LABELS: Record<BankruptcyLawyerTool["pricing"], string> = {
  free: "Free Consultation",
  freemium: "Freemium",
  paid: "Paid",
};

export const BANKRUPTCY_LAWYER_PRICING_COLORS: Record<BankruptcyLawyerTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const BANKRUPTCY_LAWYER_ROLES = {} as const;

export type BankruptcyLawyerRoleKey = keyof typeof BANKRUPTCY_LAWYER_ROLES;
