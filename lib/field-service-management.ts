import {
  FIELD_SERVICE_TOOLS,
  FIELD_SERVICE_CATEGORIES,
  type FieldServiceTool,
  type FieldServiceCategory,
} from "@/data/field-service-management";

export { FIELD_SERVICE_TOOLS, FIELD_SERVICE_CATEGORIES };
export type { FieldServiceTool, FieldServiceCategory };

export function getAllFieldServiceTools(): FieldServiceTool[] {
  return FIELD_SERVICE_TOOLS;
}

export function getFeaturedFieldServiceTools(): FieldServiceTool[] {
  return FIELD_SERVICE_TOOLS.filter((t) => t.featured);
}

export function getFieldServiceToolBySlug(slug: string): FieldServiceTool | undefined {
  return FIELD_SERVICE_TOOLS.find((t) => t.slug === slug);
}

export function getFieldServiceToolsByCategory(category: FieldServiceCategory): FieldServiceTool[] {
  return FIELD_SERVICE_TOOLS.filter((t) => t.category === category);
}

export function getAllFieldServiceCategories(): FieldServiceCategory[] {
  return Object.keys(FIELD_SERVICE_CATEGORIES) as FieldServiceCategory[];
}

export function getFieldServiceCategoryCount(category: FieldServiceCategory): number {
  return FIELD_SERVICE_TOOLS.filter((t) => t.category === category).length;
}

export const FIELD_SERVICE_PRICING_LABELS: Record<FieldServiceTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const FIELD_SERVICE_PRICING_COLORS: Record<FieldServiceTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const FIELD_SERVICE_ROLES = {} as const;

export type FieldServiceRoleKey = keyof typeof FIELD_SERVICE_ROLES;

export function filterFieldServiceTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): FieldServiceTool[] {
  let tools = FIELD_SERVICE_TOOLS;

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
