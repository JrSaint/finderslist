import {
  CLOUD_STORAGE_TOOLS,
  CLOUD_STORAGE_CATEGORIES,
  type CloudStorageTool,
  type CloudStorageCategory,
} from "@/data/cloud-storage-providers";

export { CLOUD_STORAGE_TOOLS, CLOUD_STORAGE_CATEGORIES };
export type { CloudStorageTool, CloudStorageCategory };

export function getAllCloudStorageTools(): CloudStorageTool[] {
  return CLOUD_STORAGE_TOOLS;
}

export function getFeaturedCloudStorageTools(): CloudStorageTool[] {
  return CLOUD_STORAGE_TOOLS.filter((t) => t.featured);
}

export function getCloudStorageToolBySlug(slug: string): CloudStorageTool | undefined {
  return CLOUD_STORAGE_TOOLS.find((t) => t.slug === slug);
}

export function getCloudStorageToolsByCategory(category: CloudStorageCategory): CloudStorageTool[] {
  return CLOUD_STORAGE_TOOLS.filter((t) => t.category === category);
}

export function getAllCloudStorageCategories(): CloudStorageCategory[] {
  return Object.keys(CLOUD_STORAGE_CATEGORIES) as CloudStorageCategory[];
}

export function getCloudStorageCategoryCount(category: CloudStorageCategory): number {
  return CLOUD_STORAGE_TOOLS.filter((t) => t.category === category).length;
}

export const CLOUD_STORAGE_PRICING_LABELS: Record<CloudStorageTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const CLOUD_STORAGE_PRICING_COLORS: Record<CloudStorageTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const CLOUD_STORAGE_ROLES = {} as const;

export type CloudStorageRoleKey = keyof typeof CLOUD_STORAGE_ROLES;

export function filterCloudStorageTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): CloudStorageTool[] {
  let tools = CLOUD_STORAGE_TOOLS;

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
