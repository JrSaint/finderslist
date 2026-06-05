import {
  MEDICAL_BILLING_TOOLS,
  MEDICAL_BILLING_CATEGORIES,
  type MedicalBillingTool,
  type MedicalBillingCategory,
} from "@/data/medical-billing-software";

export { MEDICAL_BILLING_TOOLS, MEDICAL_BILLING_CATEGORIES };
export type { MedicalBillingTool, MedicalBillingCategory };

export function getAllMedicalBillingTools(): MedicalBillingTool[] {
  return MEDICAL_BILLING_TOOLS;
}

export function getFeaturedMedicalBillingTools(): MedicalBillingTool[] {
  return MEDICAL_BILLING_TOOLS.filter((t) => t.featured);
}

export function getMedicalBillingToolBySlug(slug: string): MedicalBillingTool | undefined {
  return MEDICAL_BILLING_TOOLS.find((t) => t.slug === slug);
}

export function getMedicalBillingToolsByCategory(category: MedicalBillingCategory): MedicalBillingTool[] {
  return MEDICAL_BILLING_TOOLS.filter((t) => t.category === category);
}

export function getAllMedicalBillingCategories(): MedicalBillingCategory[] {
  return Object.keys(MEDICAL_BILLING_CATEGORIES) as MedicalBillingCategory[];
}

export function getMedicalBillingCategoryCount(category: MedicalBillingCategory): number {
  return MEDICAL_BILLING_TOOLS.filter((t) => t.category === category).length;
}

export const MEDICAL_BILLING_PRICING_LABELS: Record<MedicalBillingTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const MEDICAL_BILLING_PRICING_COLORS: Record<MedicalBillingTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const MEDICAL_BILLING_ROLES = {} as const;

export type MedicalBillingRoleKey = keyof typeof MEDICAL_BILLING_ROLES;

export function filterMedicalBillingTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): MedicalBillingTool[] {
  let tools = MEDICAL_BILLING_TOOLS;

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
