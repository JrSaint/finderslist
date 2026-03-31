import {
  CAR_ACCIDENT_LAWYER_TOOLS,
  CAR_ACCIDENT_LAWYER_CATEGORIES,
  type CarAccidentLawyerTool,
  type CarAccidentLawyerCategory,
} from "@/data/car-accident-lawyers";

export { CAR_ACCIDENT_LAWYER_TOOLS, CAR_ACCIDENT_LAWYER_CATEGORIES };
export type { CarAccidentLawyerTool, CarAccidentLawyerCategory };

export function getAllCarAccidentLawyerTools(): CarAccidentLawyerTool[] {
  return CAR_ACCIDENT_LAWYER_TOOLS;
}

export function getFeaturedCarAccidentLawyerTools(): CarAccidentLawyerTool[] {
  return CAR_ACCIDENT_LAWYER_TOOLS.filter((t) => t.featured);
}

export function getCarAccidentLawyerToolBySlug(slug: string): CarAccidentLawyerTool | undefined {
  return CAR_ACCIDENT_LAWYER_TOOLS.find((t) => t.slug === slug);
}

export function getCarAccidentLawyerToolsByCategory(category: CarAccidentLawyerCategory): CarAccidentLawyerTool[] {
  return CAR_ACCIDENT_LAWYER_TOOLS.filter((t) => t.category === category);
}

export function getAllCarAccidentLawyerCategories(): CarAccidentLawyerCategory[] {
  return Object.keys(CAR_ACCIDENT_LAWYER_CATEGORIES) as CarAccidentLawyerCategory[];
}

export function getCarAccidentLawyerCategoryCount(category: CarAccidentLawyerCategory): number {
  return CAR_ACCIDENT_LAWYER_TOOLS.filter((t) => t.category === category).length;
}

export const CAR_ACCIDENT_LAWYER_PRICING_LABELS: Record<CarAccidentLawyerTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const CAR_ACCIDENT_LAWYER_PRICING_COLORS: Record<CarAccidentLawyerTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const CAR_ACCIDENT_LAWYER_ROLES = {} as const;

export type CarAccidentLawyerRoleKey = keyof typeof CAR_ACCIDENT_LAWYER_ROLES;

export function filterCarAccidentLawyerTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): CarAccidentLawyerTool[] {
  let tools = CAR_ACCIDENT_LAWYER_TOOLS;

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
