import {
  HOTEL_BOOKING_TOOLS,
  HOTEL_BOOKING_CATEGORIES,
  type HotelBookingTool,
  type HotelBookingCategory,
} from "@/data/hotel-booking-platforms";

export { HOTEL_BOOKING_TOOLS, HOTEL_BOOKING_CATEGORIES };
export type { HotelBookingTool, HotelBookingCategory };

export function getAllHotelBookingTools(): HotelBookingTool[] {
  return HOTEL_BOOKING_TOOLS;
}

export function getFeaturedHotelBookingTools(): HotelBookingTool[] {
  return HOTEL_BOOKING_TOOLS.filter((t) => t.featured);
}

export function getHotelBookingToolBySlug(slug: string): HotelBookingTool | undefined {
  return HOTEL_BOOKING_TOOLS.find((t) => t.slug === slug);
}

export function getHotelBookingToolsByCategory(category: HotelBookingCategory): HotelBookingTool[] {
  return HOTEL_BOOKING_TOOLS.filter((t) => t.category === category);
}

export function getAllHotelBookingCategories(): HotelBookingCategory[] {
  return Object.keys(HOTEL_BOOKING_CATEGORIES) as HotelBookingCategory[];
}

export function getHotelBookingCategoryCount(category: HotelBookingCategory): number {
  return HOTEL_BOOKING_TOOLS.filter((t) => t.category === category).length;
}

export const HOTEL_BOOKING_PRICING_LABELS: Record<HotelBookingTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const HOTEL_BOOKING_PRICING_COLORS: Record<HotelBookingTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const HOTEL_BOOKING_ROLES = {} as const;

export type HotelBookingRoleKey = keyof typeof HOTEL_BOOKING_ROLES;

export function filterHotelBookingTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): HotelBookingTool[] {
  let tools = HOTEL_BOOKING_TOOLS;

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
