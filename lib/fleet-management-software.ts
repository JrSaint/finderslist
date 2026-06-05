import {
  FLEET_MANAGEMENT_TOOLS,
  FLEET_MANAGEMENT_CATEGORIES,
  type FleetManagementTool,
  type FleetManagementCategory,
} from "@/data/fleet-management-software";

export { FLEET_MANAGEMENT_TOOLS, FLEET_MANAGEMENT_CATEGORIES };
export type { FleetManagementTool, FleetManagementCategory };

export function getAllFleetManagementTools(): FleetManagementTool[] {
  return FLEET_MANAGEMENT_TOOLS;
}

export function getFeaturedFleetManagementTools(): FleetManagementTool[] {
  return FLEET_MANAGEMENT_TOOLS.filter((t) => t.featured);
}

export function getFleetManagementToolBySlug(slug: string): FleetManagementTool | undefined {
  return FLEET_MANAGEMENT_TOOLS.find((t) => t.slug === slug);
}

export function getFleetManagementToolsByCategory(category: FleetManagementCategory): FleetManagementTool[] {
  return FLEET_MANAGEMENT_TOOLS.filter((t) => t.category === category);
}

export function getAllFleetManagementCategories(): FleetManagementCategory[] {
  return Object.keys(FLEET_MANAGEMENT_CATEGORIES) as FleetManagementCategory[];
}

export function getFleetManagementCategoryCount(category: FleetManagementCategory): number {
  return FLEET_MANAGEMENT_TOOLS.filter((t) => t.category === category).length;
}

export const FLEET_MANAGEMENT_PRICING_LABELS: Record<FleetManagementTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const FLEET_MANAGEMENT_PRICING_COLORS: Record<FleetManagementTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const FLEET_MANAGEMENT_ROLES = {} as const;

export type FleetManagementRoleKey = keyof typeof FLEET_MANAGEMENT_ROLES;

export function filterFleetManagementTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): FleetManagementTool[] {
  let tools = FLEET_MANAGEMENT_TOOLS;

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
