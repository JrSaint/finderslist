import {
  SUBSCRIPTION_BILLING_TOOLS,
  SUBSCRIPTION_BILLING_CATEGORIES,
  type SubscriptionBillingTool,
  type SubscriptionBillingCategory,
} from "@/data/subscription-billing-platforms";

export { SUBSCRIPTION_BILLING_TOOLS, SUBSCRIPTION_BILLING_CATEGORIES };
export type { SubscriptionBillingTool, SubscriptionBillingCategory };

export function getAllSubscriptionBillingTools(): SubscriptionBillingTool[] {
  return SUBSCRIPTION_BILLING_TOOLS;
}

export function getFeaturedSubscriptionBillingTools(): SubscriptionBillingTool[] {
  return SUBSCRIPTION_BILLING_TOOLS.filter((t) => t.featured);
}

export function getSubscriptionBillingToolBySlug(slug: string): SubscriptionBillingTool | undefined {
  return SUBSCRIPTION_BILLING_TOOLS.find((t) => t.slug === slug);
}

export function getSubscriptionBillingToolsByCategory(category: SubscriptionBillingCategory): SubscriptionBillingTool[] {
  return SUBSCRIPTION_BILLING_TOOLS.filter((t) => t.category === category);
}

export function getAllSubscriptionBillingCategories(): SubscriptionBillingCategory[] {
  return Object.keys(SUBSCRIPTION_BILLING_CATEGORIES) as SubscriptionBillingCategory[];
}

export function getSubscriptionBillingCategoryCount(category: SubscriptionBillingCategory): number {
  return SUBSCRIPTION_BILLING_TOOLS.filter((t) => t.category === category).length;
}

export const SUBSCRIPTION_BILLING_PRICING_LABELS: Record<SubscriptionBillingTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const SUBSCRIPTION_BILLING_PRICING_COLORS: Record<SubscriptionBillingTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const SUBSCRIPTION_BILLING_ROLES = {} as const;

export type SubscriptionBillingRoleKey = keyof typeof SUBSCRIPTION_BILLING_ROLES;

export function filterSubscriptionBillingTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): SubscriptionBillingTool[] {
  let tools = SUBSCRIPTION_BILLING_TOOLS;

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
