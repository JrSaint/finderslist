import {
  PAYMENT_PROCESSING_TOOLS,
  PAYMENT_PROCESSING_CATEGORIES,
  type PaymentProcessingTool,
  type PaymentProcessingCategory,
} from "@/data/payment-processing";

export { PAYMENT_PROCESSING_TOOLS, PAYMENT_PROCESSING_CATEGORIES };
export type { PaymentProcessingTool, PaymentProcessingCategory };

export function getAllPaymentProcessingTools(): PaymentProcessingTool[] {
  return PAYMENT_PROCESSING_TOOLS;
}

export function getFeaturedPaymentProcessingTools(): PaymentProcessingTool[] {
  return PAYMENT_PROCESSING_TOOLS.filter((t) => t.featured);
}

export function getPaymentProcessingToolBySlug(slug: string): PaymentProcessingTool | undefined {
  return PAYMENT_PROCESSING_TOOLS.find((t) => t.slug === slug);
}

export function getPaymentProcessingToolsByCategory(category: PaymentProcessingCategory): PaymentProcessingTool[] {
  return PAYMENT_PROCESSING_TOOLS.filter((t) => t.category === category);
}

export function getAllPaymentProcessingCategories(): PaymentProcessingCategory[] {
  return Object.keys(PAYMENT_PROCESSING_CATEGORIES) as PaymentProcessingCategory[];
}

export function getPaymentProcessingCategoryCount(category: PaymentProcessingCategory): number {
  return PAYMENT_PROCESSING_TOOLS.filter((t) => t.category === category).length;
}

export const PAYMENT_PROCESSING_PRICING_LABELS: Record<PaymentProcessingTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const PAYMENT_PROCESSING_PRICING_COLORS: Record<PaymentProcessingTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const PAYMENT_PROCESSING_ROLES = {} as const;

export type PaymentProcessingRoleKey = keyof typeof PAYMENT_PROCESSING_ROLES;

export function filterPaymentProcessingTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): PaymentProcessingTool[] {
  let tools = PAYMENT_PROCESSING_TOOLS;

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
