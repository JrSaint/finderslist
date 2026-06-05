import {
  CALL_CENTER_TOOLS,
  CALL_CENTER_CATEGORIES,
  type CallCenterTool,
  type CallCenterCategory,
} from "@/data/call-center-software";

export { CALL_CENTER_TOOLS, CALL_CENTER_CATEGORIES };
export type { CallCenterTool, CallCenterCategory };

export function getAllCallCenterTools(): CallCenterTool[] {
  return CALL_CENTER_TOOLS;
}

export function getFeaturedCallCenterTools(): CallCenterTool[] {
  return CALL_CENTER_TOOLS.filter((t) => t.featured);
}

export function getCallCenterToolBySlug(slug: string): CallCenterTool | undefined {
  return CALL_CENTER_TOOLS.find((t) => t.slug === slug);
}

export function getCallCenterToolsByCategory(category: CallCenterCategory): CallCenterTool[] {
  return CALL_CENTER_TOOLS.filter((t) => t.category === category);
}

export function getAllCallCenterCategories(): CallCenterCategory[] {
  return Object.keys(CALL_CENTER_CATEGORIES) as CallCenterCategory[];
}

export function getCallCenterCategoryCount(category: CallCenterCategory): number {
  return CALL_CENTER_TOOLS.filter((t) => t.category === category).length;
}

export const CALL_CENTER_PRICING_LABELS: Record<CallCenterTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const CALL_CENTER_PRICING_COLORS: Record<CallCenterTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const CALL_CENTER_ROLES = {} as const;

export type CallCenterRoleKey = keyof typeof CALL_CENTER_ROLES;

export function filterCallCenterTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): CallCenterTool[] {
  let tools = CALL_CENTER_TOOLS;

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
