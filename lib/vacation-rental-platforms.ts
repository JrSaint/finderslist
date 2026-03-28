import {
  VACATION_RENTAL_TOOLS,
  VACATION_RENTAL_CATEGORIES,
  type VacationRentalTool,
  type VacationRentalCategory,
} from "@/data/vacation-rental-platforms";

export { VACATION_RENTAL_TOOLS, VACATION_RENTAL_CATEGORIES };
export type { VacationRentalTool, VacationRentalCategory };

export function getAllVacationRentalTools(): VacationRentalTool[] {
  return VACATION_RENTAL_TOOLS;
}

export function getFeaturedVacationRentalTools(): VacationRentalTool[] {
  return VACATION_RENTAL_TOOLS.filter((t) => t.featured);
}

export function getVacationRentalToolBySlug(slug: string): VacationRentalTool | undefined {
  return VACATION_RENTAL_TOOLS.find((t) => t.slug === slug);
}

export function getVacationRentalToolsByCategory(category: VacationRentalCategory): VacationRentalTool[] {
  return VACATION_RENTAL_TOOLS.filter((t) => t.category === category);
}

export function getAllVacationRentalCategories(): VacationRentalCategory[] {
  return Object.keys(VACATION_RENTAL_CATEGORIES) as VacationRentalCategory[];
}

export function getVacationRentalCategoryCount(category: VacationRentalCategory): number {
  return VACATION_RENTAL_TOOLS.filter((t) => t.category === category).length;
}

export const VACATION_RENTAL_PRICING_LABELS: Record<VacationRentalTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const VACATION_RENTAL_PRICING_COLORS: Record<VacationRentalTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const VACATION_RENTAL_ROLES = {} as const;

export type VacationRentalRoleKey = keyof typeof VACATION_RENTAL_ROLES;

export function filterVacationRentalTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): VacationRentalTool[] {
  let tools = VACATION_RENTAL_TOOLS;

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
