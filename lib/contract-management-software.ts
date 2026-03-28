import {
  CONTRACT_MANAGEMENT_TOOLS,
  CONTRACT_MANAGEMENT_CATEGORIES,
  type ContractManagementTool,
  type ContractManagementCategory,
} from "@/data/contract-management-software";

export { CONTRACT_MANAGEMENT_TOOLS, CONTRACT_MANAGEMENT_CATEGORIES };
export type { ContractManagementTool, ContractManagementCategory };

export function getAllContractManagementTools(): ContractManagementTool[] {
  return CONTRACT_MANAGEMENT_TOOLS;
}

export function getFeaturedContractManagementTools(): ContractManagementTool[] {
  return CONTRACT_MANAGEMENT_TOOLS.filter((t) => t.featured);
}

export function getContractManagementToolBySlug(slug: string): ContractManagementTool | undefined {
  return CONTRACT_MANAGEMENT_TOOLS.find((t) => t.slug === slug);
}

export function getContractManagementToolsByCategory(category: ContractManagementCategory): ContractManagementTool[] {
  return CONTRACT_MANAGEMENT_TOOLS.filter((t) => t.category === category);
}

export function getAllContractManagementCategories(): ContractManagementCategory[] {
  return Object.keys(CONTRACT_MANAGEMENT_CATEGORIES) as ContractManagementCategory[];
}

export function getContractManagementCategoryCount(category: ContractManagementCategory): number {
  return CONTRACT_MANAGEMENT_TOOLS.filter((t) => t.category === category).length;
}

export const CONTRACT_MANAGEMENT_PRICING_LABELS: Record<ContractManagementTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const CONTRACT_MANAGEMENT_PRICING_COLORS: Record<ContractManagementTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const CONTRACT_MANAGEMENT_ROLES = {} as const;

export type ContractManagementRoleKey = keyof typeof CONTRACT_MANAGEMENT_ROLES;

export function filterContractManagementTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): ContractManagementTool[] {
  let tools = CONTRACT_MANAGEMENT_TOOLS;

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
