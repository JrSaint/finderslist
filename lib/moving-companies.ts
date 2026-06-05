import {
  MOVING_COMPANY_TOOLS,
  MOVING_COMPANY_CATEGORIES,
  type MovingCompanyTool,
  type MovingCompanyCategory,
} from "@/data/moving-companies";

export { MOVING_COMPANY_TOOLS, MOVING_COMPANY_CATEGORIES };
export type { MovingCompanyTool, MovingCompanyCategory };

export function getAllMovingCompanyTools(): MovingCompanyTool[] {
  return MOVING_COMPANY_TOOLS;
}

export function getFeaturedMovingCompanyTools(): MovingCompanyTool[] {
  return MOVING_COMPANY_TOOLS.filter((t) => t.featured);
}

export function getMovingCompanyToolBySlug(slug: string): MovingCompanyTool | undefined {
  return MOVING_COMPANY_TOOLS.find((t) => t.slug === slug);
}

export function getMovingCompanyToolsByCategory(category: MovingCompanyCategory): MovingCompanyTool[] {
  return MOVING_COMPANY_TOOLS.filter((t) => t.category === category);
}

export function getAllMovingCompanyCategories(): MovingCompanyCategory[] {
  return Object.keys(MOVING_COMPANY_CATEGORIES) as MovingCompanyCategory[];
}

export function getMovingCompanyCategoryCount(category: MovingCompanyCategory): number {
  return MOVING_COMPANY_TOOLS.filter((t) => t.category === category).length;
}

export const MOVING_COMPANY_PRICING_LABELS: Record<MovingCompanyTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const MOVING_COMPANY_PRICING_COLORS: Record<MovingCompanyTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const MOVING_COMPANY_ROLES = {} as const;

export type MovingCompanyRoleKey = keyof typeof MOVING_COMPANY_ROLES;

export function filterMovingCompanyTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): MovingCompanyTool[] {
  let tools = MOVING_COMPANY_TOOLS;

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
