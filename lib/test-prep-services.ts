import {
  TEST_PREP_TOOLS,
  TEST_PREP_CATEGORIES,
  type TestPrepTool,
  type TestPrepCategory,
} from "@/data/test-prep-services";

export { TEST_PREP_TOOLS, TEST_PREP_CATEGORIES };
export type { TestPrepTool, TestPrepCategory };

export function getAllTestPrepTools(): TestPrepTool[] {
  return TEST_PREP_TOOLS;
}

export function getFeaturedTestPrepTools(): TestPrepTool[] {
  return TEST_PREP_TOOLS.filter((t) => t.featured);
}

export function getTestPrepToolBySlug(slug: string): TestPrepTool | undefined {
  return TEST_PREP_TOOLS.find((t) => t.slug === slug);
}

export function getTestPrepToolsByCategory(category: TestPrepCategory): TestPrepTool[] {
  return TEST_PREP_TOOLS.filter((t) => t.category === category);
}

export function getAllTestPrepCategories(): TestPrepCategory[] {
  return Object.keys(TEST_PREP_CATEGORIES) as TestPrepCategory[];
}

export function getTestPrepCategoryCount(category: TestPrepCategory): number {
  return TEST_PREP_TOOLS.filter((t) => t.category === category).length;
}

export const TEST_PREP_PRICING_LABELS: Record<TestPrepTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const TEST_PREP_PRICING_COLORS: Record<TestPrepTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const TEST_PREP_ROLES = {} as const;

export type TestPrepRoleKey = keyof typeof TEST_PREP_ROLES;

export function filterTestPrepTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): TestPrepTool[] {
  let tools = TEST_PREP_TOOLS;

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
