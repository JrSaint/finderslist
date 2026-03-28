import {
  SOLAR_PANEL_TOOLS,
  SOLAR_PANEL_CATEGORIES,
  type SolarPanelTool,
  type SolarPanelCategory,
} from "@/data/solar-panel-companies";

export { SOLAR_PANEL_TOOLS, SOLAR_PANEL_CATEGORIES };
export type { SolarPanelTool, SolarPanelCategory };

export function getAllSolarPanelTools(): SolarPanelTool[] {
  return SOLAR_PANEL_TOOLS;
}

export function getFeaturedSolarPanelTools(): SolarPanelTool[] {
  return SOLAR_PANEL_TOOLS.filter((t) => t.featured);
}

export function getSolarPanelToolBySlug(slug: string): SolarPanelTool | undefined {
  return SOLAR_PANEL_TOOLS.find((t) => t.slug === slug);
}

export function getSolarPanelToolsByCategory(category: SolarPanelCategory): SolarPanelTool[] {
  return SOLAR_PANEL_TOOLS.filter((t) => t.category === category);
}

export function getAllSolarPanelCategories(): SolarPanelCategory[] {
  return Object.keys(SOLAR_PANEL_CATEGORIES) as SolarPanelCategory[];
}

export function getSolarPanelCategoryCount(category: SolarPanelCategory): number {
  return SOLAR_PANEL_TOOLS.filter((t) => t.category === category).length;
}

export const SOLAR_PANEL_PRICING_LABELS: Record<SolarPanelTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const SOLAR_PANEL_PRICING_COLORS: Record<SolarPanelTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const SOLAR_PANEL_ROLES = {} as const;

export type SolarPanelRoleKey = keyof typeof SOLAR_PANEL_ROLES;

export function filterSolarPanelTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): SolarPanelTool[] {
  let tools = SOLAR_PANEL_TOOLS;

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
