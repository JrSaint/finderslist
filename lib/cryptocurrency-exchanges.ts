import {
  CRYPTO_EXCHANGE_TOOLS,
  CRYPTO_EXCHANGE_CATEGORIES,
  type CryptoExchangeTool,
  type CryptoExchangeCategory,
} from "@/data/cryptocurrency-exchanges";

export { CRYPTO_EXCHANGE_TOOLS, CRYPTO_EXCHANGE_CATEGORIES };
export type { CryptoExchangeTool, CryptoExchangeCategory };

export function getAllCryptoExchangeTools(): CryptoExchangeTool[] {
  return CRYPTO_EXCHANGE_TOOLS;
}

export function getFeaturedCryptoExchangeTools(): CryptoExchangeTool[] {
  return CRYPTO_EXCHANGE_TOOLS.filter((t) => t.featured);
}

export function getCryptoExchangeToolBySlug(slug: string): CryptoExchangeTool | undefined {
  return CRYPTO_EXCHANGE_TOOLS.find((t) => t.slug === slug);
}

export function getCryptoExchangeToolsByCategory(category: CryptoExchangeCategory): CryptoExchangeTool[] {
  return CRYPTO_EXCHANGE_TOOLS.filter((t) => t.category === category);
}

export function getAllCryptoExchangeCategories(): CryptoExchangeCategory[] {
  return Object.keys(CRYPTO_EXCHANGE_CATEGORIES) as CryptoExchangeCategory[];
}

export function getCryptoExchangeCategoryCount(category: CryptoExchangeCategory): number {
  return CRYPTO_EXCHANGE_TOOLS.filter((t) => t.category === category).length;
}

export const CRYPTO_EXCHANGE_PRICING_LABELS: Record<CryptoExchangeTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const CRYPTO_EXCHANGE_PRICING_COLORS: Record<CryptoExchangeTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const CRYPTO_EXCHANGE_ROLES = {} as const;

export type CryptoExchangeRoleKey = keyof typeof CRYPTO_EXCHANGE_ROLES;

export function filterCryptoExchangeTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): CryptoExchangeTool[] {
  let tools = CRYPTO_EXCHANGE_TOOLS;

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
