import {
  BUSINESS_PHONE_TOOLS,
  BUSINESS_PHONE_CATEGORIES,
  type BusinessPhoneTool,
  type BusinessPhoneCategory,
} from "@/data/business-phone-systems";

export { BUSINESS_PHONE_TOOLS, BUSINESS_PHONE_CATEGORIES };
export type { BusinessPhoneTool, BusinessPhoneCategory };

export function getAllBusinessPhoneTools(): BusinessPhoneTool[] {
  return BUSINESS_PHONE_TOOLS;
}

export function getFeaturedBusinessPhoneTools(): BusinessPhoneTool[] {
  return BUSINESS_PHONE_TOOLS.filter((t) => t.featured);
}

export function getBusinessPhoneToolBySlug(slug: string): BusinessPhoneTool | undefined {
  return BUSINESS_PHONE_TOOLS.find((t) => t.slug === slug);
}

export function getBusinessPhoneToolsByCategory(category: BusinessPhoneCategory): BusinessPhoneTool[] {
  return BUSINESS_PHONE_TOOLS.filter((t) => t.category === category);
}

export function getAllBusinessPhoneCategories(): BusinessPhoneCategory[] {
  return Object.keys(BUSINESS_PHONE_CATEGORIES) as BusinessPhoneCategory[];
}

export function getBusinessPhoneCategoryCount(category: BusinessPhoneCategory): number {
  return BUSINESS_PHONE_TOOLS.filter((t) => t.category === category).length;
}

export const BUSINESS_PHONE_PRICING_LABELS: Record<BusinessPhoneTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const BUSINESS_PHONE_PRICING_COLORS: Record<BusinessPhoneTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const BUSINESS_PHONE_ROLES = {} as const;

export type BusinessPhoneRoleKey = keyof typeof BUSINESS_PHONE_ROLES;

export function filterBusinessPhoneTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): BusinessPhoneTool[] {
  let tools = BUSINESS_PHONE_TOOLS;

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
