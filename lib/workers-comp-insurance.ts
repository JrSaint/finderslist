import {
  WORKERS_COMP_TOOLS,
  WORKERS_COMP_CATEGORIES,
  type WorkersCompTool,
  type WorkersCompCategory,
} from "@/data/workers-comp-insurance";

export { WORKERS_COMP_TOOLS, WORKERS_COMP_CATEGORIES };
export type { WorkersCompTool, WorkersCompCategory };

export function getAllWorkersCompTools(): WorkersCompTool[] {
  return WORKERS_COMP_TOOLS;
}

export function getFeaturedWorkersCompTools(): WorkersCompTool[] {
  return WORKERS_COMP_TOOLS.filter((t) => t.featured);
}

export function getWorkersCompToolBySlug(slug: string): WorkersCompTool | undefined {
  return WORKERS_COMP_TOOLS.find((t) => t.slug === slug);
}

export function getWorkersCompToolsByCategory(category: WorkersCompCategory): WorkersCompTool[] {
  return WORKERS_COMP_TOOLS.filter((t) => t.category === category);
}

export function getAllWorkersCompCategories(): WorkersCompCategory[] {
  return Object.keys(WORKERS_COMP_CATEGORIES) as WorkersCompCategory[];
}

export function getWorkersCompCategoryCount(category: WorkersCompCategory): number {
  return WORKERS_COMP_TOOLS.filter((t) => t.category === category).length;
}

export const WORKERS_COMP_PRICING_LABELS: Record<WorkersCompTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const WORKERS_COMP_PRICING_COLORS: Record<WorkersCompTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const WORKERS_COMP_ROLES = {} as const;

export type WorkersCompRoleKey = keyof typeof WORKERS_COMP_ROLES;

export function filterWorkersCompTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): WorkersCompTool[] {
  let tools = WORKERS_COMP_TOOLS;

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
