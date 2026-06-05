import {
  DOCUMENT_MANAGEMENT_TOOLS,
  DOCUMENT_MANAGEMENT_CATEGORIES,
  type DocumentManagementTool,
  type DocumentManagementCategory,
} from "@/data/document-management-software";

export { DOCUMENT_MANAGEMENT_TOOLS, DOCUMENT_MANAGEMENT_CATEGORIES };
export type { DocumentManagementTool, DocumentManagementCategory };

export function getAllDocumentManagementTools(): DocumentManagementTool[] {
  return DOCUMENT_MANAGEMENT_TOOLS;
}

export function getFeaturedDocumentManagementTools(): DocumentManagementTool[] {
  return DOCUMENT_MANAGEMENT_TOOLS.filter((t) => t.featured);
}

export function getDocumentManagementToolBySlug(slug: string): DocumentManagementTool | undefined {
  return DOCUMENT_MANAGEMENT_TOOLS.find((t) => t.slug === slug);
}

export function getDocumentManagementToolsByCategory(category: DocumentManagementCategory): DocumentManagementTool[] {
  return DOCUMENT_MANAGEMENT_TOOLS.filter((t) => t.category === category);
}

export function getAllDocumentManagementCategories(): DocumentManagementCategory[] {
  return Object.keys(DOCUMENT_MANAGEMENT_CATEGORIES) as DocumentManagementCategory[];
}

export function getDocumentManagementCategoryCount(category: DocumentManagementCategory): number {
  return DOCUMENT_MANAGEMENT_TOOLS.filter((t) => t.category === category).length;
}

export const DOCUMENT_MANAGEMENT_PRICING_LABELS: Record<DocumentManagementTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const DOCUMENT_MANAGEMENT_PRICING_COLORS: Record<DocumentManagementTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const DOCUMENT_MANAGEMENT_ROLES = {} as const;

export type DocumentManagementRoleKey = keyof typeof DOCUMENT_MANAGEMENT_ROLES;

export function filterDocumentManagementTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): DocumentManagementTool[] {
  let tools = DOCUMENT_MANAGEMENT_TOOLS;

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
