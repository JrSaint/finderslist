import {
  CREDIT_CARD_TOOLS,
  CREDIT_CARD_CATEGORIES,
  type CreditCardTool,
  type CreditCardCategory,
} from "@/data/credit-cards";

export { CREDIT_CARD_TOOLS, CREDIT_CARD_CATEGORIES };
export type { CreditCardTool, CreditCardCategory };

export function getAllCreditCardTools(): CreditCardTool[] {
  return CREDIT_CARD_TOOLS;
}

export function getFeaturedCreditCardTools(): CreditCardTool[] {
  return CREDIT_CARD_TOOLS.filter((t) => t.featured);
}

export function getCreditCardToolBySlug(slug: string): CreditCardTool | undefined {
  return CREDIT_CARD_TOOLS.find((t) => t.slug === slug);
}

export function getCreditCardToolsByCategory(category: CreditCardCategory): CreditCardTool[] {
  return CREDIT_CARD_TOOLS.filter((t) => t.category === category);
}

export function getAllCreditCardCategories(): CreditCardCategory[] {
  return Object.keys(CREDIT_CARD_CATEGORIES) as CreditCardCategory[];
}

export function getCreditCardCategoryCount(category: CreditCardCategory): number {
  return CREDIT_CARD_TOOLS.filter((t) => t.category === category).length;
}

export const CREDIT_CARD_PRICING_LABELS: Record<CreditCardTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const CREDIT_CARD_PRICING_COLORS: Record<CreditCardTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const CREDIT_CARD_ROLES = {} as const;

export type CreditCardRoleKey = keyof typeof CREDIT_CARD_ROLES;

export function filterCreditCardTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): CreditCardTool[] {
  let tools = CREDIT_CARD_TOOLS;

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
