import {
  VIRTUAL_DATA_ROOM_TOOLS,
  VIRTUAL_DATA_ROOM_CATEGORIES,
  type VirtualDataRoomTool,
  type VirtualDataRoomCategory,
} from "@/data/virtual-data-rooms";

export { VIRTUAL_DATA_ROOM_TOOLS, VIRTUAL_DATA_ROOM_CATEGORIES };
export type { VirtualDataRoomTool, VirtualDataRoomCategory };

export function getAllVirtualDataRoomTools(): VirtualDataRoomTool[] {
  return VIRTUAL_DATA_ROOM_TOOLS;
}

export function getFeaturedVirtualDataRoomTools(): VirtualDataRoomTool[] {
  return VIRTUAL_DATA_ROOM_TOOLS.filter((t) => t.featured);
}

export function getVirtualDataRoomToolBySlug(slug: string): VirtualDataRoomTool | undefined {
  return VIRTUAL_DATA_ROOM_TOOLS.find((t) => t.slug === slug);
}

export function getVirtualDataRoomToolsByCategory(category: VirtualDataRoomCategory): VirtualDataRoomTool[] {
  return VIRTUAL_DATA_ROOM_TOOLS.filter((t) => t.category === category);
}

export function getAllVirtualDataRoomCategories(): VirtualDataRoomCategory[] {
  return Object.keys(VIRTUAL_DATA_ROOM_CATEGORIES) as VirtualDataRoomCategory[];
}

export function getVirtualDataRoomCategoryCount(category: VirtualDataRoomCategory): number {
  return VIRTUAL_DATA_ROOM_TOOLS.filter((t) => t.category === category).length;
}

export const VIRTUAL_DATA_ROOM_PRICING_LABELS: Record<VirtualDataRoomTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const VIRTUAL_DATA_ROOM_PRICING_COLORS: Record<VirtualDataRoomTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const VIRTUAL_DATA_ROOM_ROLES = {} as const;

export type VirtualDataRoomRoleKey = keyof typeof VIRTUAL_DATA_ROOM_ROLES;

export function filterVirtualDataRoomTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): VirtualDataRoomTool[] {
  let tools = VIRTUAL_DATA_ROOM_TOOLS;

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
