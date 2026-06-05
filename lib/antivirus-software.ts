import {
  ANTIVIRUS_TOOLS,
  ANTIVIRUS_CATEGORIES,
  type AntivirusTool,
  type AntivirusCategory,
} from "@/data/antivirus-software";

export { ANTIVIRUS_TOOLS, ANTIVIRUS_CATEGORIES };
export type { AntivirusTool, AntivirusCategory };

export function getAllAntivirusTools(): AntivirusTool[] {
  return ANTIVIRUS_TOOLS;
}

export function getFeaturedAntivirusTools(): AntivirusTool[] {
  return ANTIVIRUS_TOOLS.filter((t) => t.featured);
}

export function getAntivirusToolBySlug(slug: string): AntivirusTool | undefined {
  return ANTIVIRUS_TOOLS.find((t) => t.slug === slug);
}

export function getAntivirusToolsByCategory(category: AntivirusCategory): AntivirusTool[] {
  return ANTIVIRUS_TOOLS.filter((t) => t.category === category);
}

export function getAllAntivirusCategories(): AntivirusCategory[] {
  return Object.keys(ANTIVIRUS_CATEGORIES) as AntivirusCategory[];
}

export function getAntivirusCategoryCount(category: AntivirusCategory): number {
  return ANTIVIRUS_TOOLS.filter((t) => t.category === category).length;
}

export const ANTIVIRUS_PRICING_LABELS: Record<AntivirusTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const ANTIVIRUS_PRICING_COLORS: Record<AntivirusTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const ANTIVIRUS_ROLES = {} as const;

export type AntivirusRoleKey = keyof typeof ANTIVIRUS_ROLES;

export function filterAntivirusTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): AntivirusTool[] {
  let tools = ANTIVIRUS_TOOLS;

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
