import {
  ECOMMERCE_PLATFORM_TOOLS,
  ECOMMERCE_PLATFORM_CATEGORIES,
  type EcommercePlatformTool,
  type EcommercePlatformCategory,
} from "@/data/ecommerce-platforms";

export { ECOMMERCE_PLATFORM_TOOLS, ECOMMERCE_PLATFORM_CATEGORIES };
export type { EcommercePlatformTool, EcommercePlatformCategory };

export function getAllEcommercePlatformTools(): EcommercePlatformTool[] {
  return ECOMMERCE_PLATFORM_TOOLS;
}

export function getFeaturedEcommercePlatformTools(): EcommercePlatformTool[] {
  return ECOMMERCE_PLATFORM_TOOLS.filter((t) => t.featured);
}

export function getEcommercePlatformToolBySlug(slug: string): EcommercePlatformTool | undefined {
  return ECOMMERCE_PLATFORM_TOOLS.find((t) => t.slug === slug);
}

export function getEcommercePlatformToolsByCategory(category: EcommercePlatformCategory): EcommercePlatformTool[] {
  return ECOMMERCE_PLATFORM_TOOLS.filter((t) => t.category === category);
}

export function getAllEcommercePlatformCategories(): EcommercePlatformCategory[] {
  return Object.keys(ECOMMERCE_PLATFORM_CATEGORIES) as EcommercePlatformCategory[];
}

export function getEcommercePlatformCategoryCount(category: EcommercePlatformCategory): number {
  return ECOMMERCE_PLATFORM_TOOLS.filter((t) => t.category === category).length;
}

export const ECOMMERCE_PLATFORM_PRICING_LABELS: Record<EcommercePlatformTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const ECOMMERCE_PLATFORM_PRICING_COLORS: Record<EcommercePlatformTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const ECOMMERCE_PLATFORM_ROLES = {} as const;

export type EcommercePlatformRoleKey = keyof typeof ECOMMERCE_PLATFORM_ROLES;

export function filterEcommercePlatformTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): EcommercePlatformTool[] {
  let tools = ECOMMERCE_PLATFORM_TOOLS;

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
