import {
  TRAVEL_INSURANCE_TOOLS,
  TRAVEL_INSURANCE_CATEGORIES,
  type TravelInsuranceTool,
  type TravelInsuranceCategory,
} from "@/data/travel-insurance";

export { TRAVEL_INSURANCE_TOOLS, TRAVEL_INSURANCE_CATEGORIES };
export type { TravelInsuranceTool, TravelInsuranceCategory };

export function getAllTravelInsuranceTools(): TravelInsuranceTool[] {
  return TRAVEL_INSURANCE_TOOLS;
}

export function getFeaturedTravelInsuranceTools(): TravelInsuranceTool[] {
  return TRAVEL_INSURANCE_TOOLS.filter((t) => t.featured);
}

export function getTravelInsuranceToolBySlug(slug: string): TravelInsuranceTool | undefined {
  return TRAVEL_INSURANCE_TOOLS.find((t) => t.slug === slug);
}

export function getTravelInsuranceToolsByCategory(category: TravelInsuranceCategory): TravelInsuranceTool[] {
  return TRAVEL_INSURANCE_TOOLS.filter((t) => t.category === category);
}

export function getAllTravelInsuranceCategories(): TravelInsuranceCategory[] {
  return Object.keys(TRAVEL_INSURANCE_CATEGORIES) as TravelInsuranceCategory[];
}

export function getTravelInsuranceCategoryCount(category: TravelInsuranceCategory): number {
  return TRAVEL_INSURANCE_TOOLS.filter((t) => t.category === category).length;
}

export const TRAVEL_INSURANCE_PRICING_LABELS: Record<TravelInsuranceTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const TRAVEL_INSURANCE_PRICING_COLORS: Record<TravelInsuranceTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const TRAVEL_INSURANCE_ROLES = {} as const;

export type TravelInsuranceRoleKey = keyof typeof TRAVEL_INSURANCE_ROLES;

export function filterTravelInsuranceTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): TravelInsuranceTool[] {
  let tools = TRAVEL_INSURANCE_TOOLS;

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
