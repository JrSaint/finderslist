import {
  PROJECT_MANAGEMENT_TOOLS,
  PROJECT_MANAGEMENT_CATEGORIES,
  type ProjectManagementTool,
  type ProjectManagementCategory,
} from "@/data/project-management-software";

export { PROJECT_MANAGEMENT_TOOLS, PROJECT_MANAGEMENT_CATEGORIES };
export type { ProjectManagementTool, ProjectManagementCategory };

export function getAllProjectManagementTools(): ProjectManagementTool[] {
  return PROJECT_MANAGEMENT_TOOLS;
}

export function getFeaturedProjectManagementTools(): ProjectManagementTool[] {
  return PROJECT_MANAGEMENT_TOOLS.filter((t) => t.featured);
}

export function getProjectManagementToolBySlug(slug: string): ProjectManagementTool | undefined {
  return PROJECT_MANAGEMENT_TOOLS.find((t) => t.slug === slug);
}

export function getProjectManagementToolsByCategory(category: ProjectManagementCategory): ProjectManagementTool[] {
  return PROJECT_MANAGEMENT_TOOLS.filter((t) => t.category === category);
}

export function getAllProjectManagementCategories(): ProjectManagementCategory[] {
  return Object.keys(PROJECT_MANAGEMENT_CATEGORIES) as ProjectManagementCategory[];
}

export function getProjectManagementCategoryCount(category: ProjectManagementCategory): number {
  return PROJECT_MANAGEMENT_TOOLS.filter((t) => t.category === category).length;
}

export const PROJECT_MANAGEMENT_PRICING_LABELS: Record<ProjectManagementTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const PROJECT_MANAGEMENT_PRICING_COLORS: Record<ProjectManagementTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const PROJECT_MANAGEMENT_ROLES = {} as const;

export type ProjectManagementRoleKey = keyof typeof PROJECT_MANAGEMENT_ROLES;

export function filterProjectManagementTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): ProjectManagementTool[] {
  let tools = PROJECT_MANAGEMENT_TOOLS;

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
