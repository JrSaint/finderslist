import {
  APPOINTMENT_SCHEDULING_TOOLS,
  APPOINTMENT_SCHEDULING_CATEGORIES,
  type AppointmentSchedulingTool,
  type AppointmentSchedulingCategory,
} from "@/data/appointment-scheduling-software";

export { APPOINTMENT_SCHEDULING_TOOLS, APPOINTMENT_SCHEDULING_CATEGORIES };
export type { AppointmentSchedulingTool, AppointmentSchedulingCategory };

export function getAllAppointmentSchedulingTools(): AppointmentSchedulingTool[] {
  return APPOINTMENT_SCHEDULING_TOOLS;
}

export function getFeaturedAppointmentSchedulingTools(): AppointmentSchedulingTool[] {
  return APPOINTMENT_SCHEDULING_TOOLS.filter((t) => t.featured);
}

export function getAppointmentSchedulingToolBySlug(slug: string): AppointmentSchedulingTool | undefined {
  return APPOINTMENT_SCHEDULING_TOOLS.find((t) => t.slug === slug);
}

export function getAppointmentSchedulingToolsByCategory(category: AppointmentSchedulingCategory): AppointmentSchedulingTool[] {
  return APPOINTMENT_SCHEDULING_TOOLS.filter((t) => t.category === category);
}

export function getAllAppointmentSchedulingCategories(): AppointmentSchedulingCategory[] {
  return Object.keys(APPOINTMENT_SCHEDULING_CATEGORIES) as AppointmentSchedulingCategory[];
}

export function getAppointmentSchedulingCategoryCount(category: AppointmentSchedulingCategory): number {
  return APPOINTMENT_SCHEDULING_TOOLS.filter((t) => t.category === category).length;
}

export const APPOINTMENT_SCHEDULING_PRICING_LABELS: Record<AppointmentSchedulingTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const APPOINTMENT_SCHEDULING_PRICING_COLORS: Record<AppointmentSchedulingTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const APPOINTMENT_SCHEDULING_ROLES = {} as const;

export type AppointmentSchedulingRoleKey = keyof typeof APPOINTMENT_SCHEDULING_ROLES;

export function filterAppointmentSchedulingTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): AppointmentSchedulingTool[] {
  let tools = APPOINTMENT_SCHEDULING_TOOLS;

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
