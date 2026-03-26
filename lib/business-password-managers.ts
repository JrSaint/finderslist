import {
  PASSWORD_MANAGER_TOOLS,
  PASSWORD_MANAGER_CATEGORIES,
  type PasswordManagerTool,
  type PasswordManagerCategory,
} from "@/data/business-password-managers";

export { PASSWORD_MANAGER_TOOLS, PASSWORD_MANAGER_CATEGORIES };
export type { PasswordManagerTool, PasswordManagerCategory };

export function getAllPasswordManagerTools(): PasswordManagerTool[] {
  return PASSWORD_MANAGER_TOOLS;
}

export function getFeaturedPasswordManagerTools(): PasswordManagerTool[] {
  return PASSWORD_MANAGER_TOOLS.filter((t) => t.featured);
}

export function getPasswordManagerToolBySlug(slug: string): PasswordManagerTool | undefined {
  return PASSWORD_MANAGER_TOOLS.find((t) => t.slug === slug);
}

export function getPasswordManagerToolsByCategory(category: PasswordManagerCategory): PasswordManagerTool[] {
  return PASSWORD_MANAGER_TOOLS.filter((t) => t.category === category);
}

export function getAllPasswordManagerCategories(): PasswordManagerCategory[] {
  return Object.keys(PASSWORD_MANAGER_CATEGORIES) as PasswordManagerCategory[];
}

export function getPasswordManagerCategoryCount(category: PasswordManagerCategory): number {
  return PASSWORD_MANAGER_TOOLS.filter((t) => t.category === category).length;
}

export const PASSWORD_MANAGER_PRICING_LABELS: Record<PasswordManagerTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const PASSWORD_MANAGER_PRICING_COLORS: Record<PasswordManagerTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const PASSWORD_MANAGER_ROLES = {} as const;

export type PasswordManagerRoleKey = keyof typeof PASSWORD_MANAGER_ROLES;

export function filterPasswordManagerTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): PasswordManagerTool[] {
  let tools = PASSWORD_MANAGER_TOOLS;

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
