import {
  BUSINESS_VPN_TOOLS,
  BUSINESS_VPN_CATEGORIES,
  type BusinessVPNTool,
  type BusinessVPNCategory,
} from "@/data/business-vpn-software";

export { BUSINESS_VPN_TOOLS, BUSINESS_VPN_CATEGORIES };
export type { BusinessVPNTool, BusinessVPNCategory };

export function getAllBusinessVPNTools(): BusinessVPNTool[] {
  return BUSINESS_VPN_TOOLS;
}

export function getFeaturedBusinessVPNTools(): BusinessVPNTool[] {
  return BUSINESS_VPN_TOOLS.filter((t) => t.featured);
}

export function getBusinessVPNToolBySlug(slug: string): BusinessVPNTool | undefined {
  return BUSINESS_VPN_TOOLS.find((t) => t.slug === slug);
}

export function getBusinessVPNToolsByCategory(category: BusinessVPNCategory): BusinessVPNTool[] {
  return BUSINESS_VPN_TOOLS.filter((t) => t.category === category);
}

export function getAllBusinessVPNCategories(): BusinessVPNCategory[] {
  return Object.keys(BUSINESS_VPN_CATEGORIES) as BusinessVPNCategory[];
}

export function getBusinessVPNCategoryCount(category: BusinessVPNCategory): number {
  return BUSINESS_VPN_TOOLS.filter((t) => t.category === category).length;
}

export const BUSINESS_VPN_PRICING_LABELS: Record<BusinessVPNTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const BUSINESS_VPN_PRICING_COLORS: Record<BusinessVPNTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const BUSINESS_VPN_ROLES = {} as const;

export type BusinessVPNRoleKey = keyof typeof BUSINESS_VPN_ROLES;

export function filterBusinessVPNTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): BusinessVPNTool[] {
  let tools = BUSINESS_VPN_TOOLS;

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
