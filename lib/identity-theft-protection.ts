import {
  IDENTITY_THEFT_PROTECTION_TOOLS,
  IDENTITY_THEFT_PROTECTION_CATEGORIES,
  type IdentityTheftProtectionTool,
  type IdentityTheftProtectionCategory,
} from "@/data/identity-theft-protection";

export { IDENTITY_THEFT_PROTECTION_TOOLS, IDENTITY_THEFT_PROTECTION_CATEGORIES };
export type { IdentityTheftProtectionTool, IdentityTheftProtectionCategory };

export function getAllIdentityTheftProtectionTools(): IdentityTheftProtectionTool[] {
  return IDENTITY_THEFT_PROTECTION_TOOLS;
}

export function getFeaturedIdentityTheftProtectionTools(): IdentityTheftProtectionTool[] {
  return IDENTITY_THEFT_PROTECTION_TOOLS.filter((t) => t.featured);
}

export function getIdentityTheftProtectionToolBySlug(slug: string): IdentityTheftProtectionTool | undefined {
  return IDENTITY_THEFT_PROTECTION_TOOLS.find((t) => t.slug === slug);
}

export function getIdentityTheftProtectionToolsByCategory(category: IdentityTheftProtectionCategory): IdentityTheftProtectionTool[] {
  return IDENTITY_THEFT_PROTECTION_TOOLS.filter((t) => t.category === category);
}

export function getAllIdentityTheftProtectionCategories(): IdentityTheftProtectionCategory[] {
  return Object.keys(IDENTITY_THEFT_PROTECTION_CATEGORIES) as IdentityTheftProtectionCategory[];
}

export function getIdentityTheftProtectionCategoryCount(category: IdentityTheftProtectionCategory): number {
  return IDENTITY_THEFT_PROTECTION_TOOLS.filter((t) => t.category === category).length;
}

export const IDENTITY_THEFT_PROTECTION_PRICING_LABELS: Record<IdentityTheftProtectionTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const IDENTITY_THEFT_PROTECTION_PRICING_COLORS: Record<IdentityTheftProtectionTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const IDENTITY_THEFT_PROTECTION_ROLES = {} as const;

export type IdentityTheftProtectionRoleKey = keyof typeof IDENTITY_THEFT_PROTECTION_ROLES;

export function filterIdentityTheftProtectionTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): IdentityTheftProtectionTool[] {
  let tools = IDENTITY_THEFT_PROTECTION_TOOLS;

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
