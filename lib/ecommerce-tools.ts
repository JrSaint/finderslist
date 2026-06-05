import {
  ECOMMERCE_TOOLS,
  ECOMMERCE_CATEGORIES,
  type EcommerceTool,
  type EcommerceCategory,
} from "@/data/ecommerce-tools";

export { ECOMMERCE_TOOLS, ECOMMERCE_CATEGORIES };
export type { EcommerceTool, EcommerceCategory };

export function getAllEcommerceTools(): EcommerceTool[] {
  return ECOMMERCE_TOOLS;
}

export function getFeaturedEcommerceTools(): EcommerceTool[] {
  return ECOMMERCE_TOOLS.filter((t) => t.featured);
}

export function getEcommerceToolBySlug(slug: string): EcommerceTool | undefined {
  return ECOMMERCE_TOOLS.find((t) => t.slug === slug);
}

export function getEcommerceToolsByCategory(category: EcommerceCategory): EcommerceTool[] {
  return ECOMMERCE_TOOLS.filter((t) => t.category === category);
}

export function getAllEcommerceCategories(): EcommerceCategory[] {
  return Object.keys(ECOMMERCE_CATEGORIES) as EcommerceCategory[];
}

export function getEcommerceCategoryCount(category: EcommerceCategory): number {
  return ECOMMERCE_TOOLS.filter((t) => t.category === category).length;
}

export const ECOMMERCE_PRICING_LABELS: Record<EcommerceTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const ECOMMERCE_PRICING_COLORS: Record<EcommerceTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

export const ECOMMERCE_ROLES = {
  "store-owners": {
    label: "Store Owners",
    emoji: "🏪",
    categories: ["store-builders", "analytics"] as EcommerceCategory[],
    tags: ["Shopify", "WooCommerce", "online store", "e-commerce platform"],
  },
  entrepreneurs: {
    label: "Entrepreneurs",
    emoji: "💡",
    categories: ["print-on-demand", "dropshipping"] as EcommerceCategory[],
    tags: ["print on demand", "dropshipping", "no inventory", "passive income"],
  },
  "fulfillment-teams": {
    label: "Fulfillment Teams",
    emoji: "📦",
    categories: ["shipping", "inventory"] as EcommerceCategory[],
    tags: ["shipping", "fulfillment", "inventory", "warehouse", "carriers"],
  },
  marketers: {
    label: "E-com Marketers",
    emoji: "📈",
    categories: ["analytics"] as EcommerceCategory[],
    tags: ["analytics", "attribution", "ROAS", "LTV", "conversion"],
  },
  dropshippers: {
    label: "Dropshippers",
    emoji: "🚚",
    categories: ["dropshipping", "store-builders"] as EcommerceCategory[],
    tags: ["dropshipping", "supplier", "AliExpress", "no inventory"],
  },
} as const;

export type EcommerceRoleKey = keyof typeof ECOMMERCE_ROLES;

export function filterEcommerceTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): EcommerceTool[] {
  let tools = ECOMMERCE_TOOLS;

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

  if (role && role in ECOMMERCE_ROLES) {
    const config = ECOMMERCE_ROLES[role as EcommerceRoleKey];
    tools = tools.filter(
      (t) =>
        (config.categories as readonly string[]).includes(t.category) ||
        t.tags.some((tag) =>
          config.tags.some((rt) => tag.toLowerCase().includes(rt.toLowerCase()))
        )
    );
  }

  return tools;
}
