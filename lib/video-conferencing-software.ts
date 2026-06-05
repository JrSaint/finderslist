import {
  VIDEO_CONFERENCING_TOOLS,
  VIDEO_CONFERENCING_CATEGORIES,
  type VideoConferencingTool,
  type VideoConferencingCategory,
} from "@/data/video-conferencing-software";

export { VIDEO_CONFERENCING_TOOLS, VIDEO_CONFERENCING_CATEGORIES };
export type { VideoConferencingTool, VideoConferencingCategory };

export function getAllVideoConferencingTools(): VideoConferencingTool[] {
  return VIDEO_CONFERENCING_TOOLS;
}

export function getFeaturedVideoConferencingTools(): VideoConferencingTool[] {
  return VIDEO_CONFERENCING_TOOLS.filter((t) => t.featured);
}

export function getVideoConferencingToolBySlug(slug: string): VideoConferencingTool | undefined {
  return VIDEO_CONFERENCING_TOOLS.find((t) => t.slug === slug);
}

export function getVideoConferencingToolsByCategory(category: VideoConferencingCategory): VideoConferencingTool[] {
  return VIDEO_CONFERENCING_TOOLS.filter((t) => t.category === category);
}

export function getAllVideoConferencingCategories(): VideoConferencingCategory[] {
  return Object.keys(VIDEO_CONFERENCING_CATEGORIES) as VideoConferencingCategory[];
}

export function getVideoConferencingCategoryCount(category: VideoConferencingCategory): number {
  return VIDEO_CONFERENCING_TOOLS.filter((t) => t.category === category).length;
}

export const VIDEO_CONFERENCING_PRICING_LABELS: Record<VideoConferencingTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const VIDEO_CONFERENCING_PRICING_COLORS: Record<VideoConferencingTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const VIDEO_CONFERENCING_ROLES = {} as const;

export type VideoConferencingRoleKey = keyof typeof VIDEO_CONFERENCING_ROLES;

export function filterVideoConferencingTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): VideoConferencingTool[] {
  let tools = VIDEO_CONFERENCING_TOOLS;

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
