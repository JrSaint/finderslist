import {
  HR_TOOLS,
  HR_CATEGORIES,
  type HRTool,
  type HRCategory,
} from "@/data/hr-tools";

export { HR_TOOLS, HR_CATEGORIES };
export type { HRTool, HRCategory };

export function getAllHRTools(): HRTool[] {
  return HR_TOOLS;
}

export function getFeaturedHRTools(): HRTool[] {
  return HR_TOOLS.filter((t) => t.featured);
}

export function getHRToolBySlug(slug: string): HRTool | undefined {
  return HR_TOOLS.find((t) => t.slug === slug);
}

export function getHRToolsByCategory(category: HRCategory): HRTool[] {
  return HR_TOOLS.filter((t) => t.category === category);
}

export function getAllHRCategories(): HRCategory[] {
  return Object.keys(HR_CATEGORIES) as HRCategory[];
}

export function getHRCategoryCount(category: HRCategory): number {
  return HR_TOOLS.filter((t) => t.category === category).length;
}

export const HR_PRICING_LABELS: Record<HRTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const HR_PRICING_COLORS: Record<HRTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

export const HR_ROLES = {
  recruiters: {
    label: "Recruiters",
    emoji: "🎯",
    categories: ["ats"] as HRCategory[],
    tags: ["ATS", "recruiting", "hiring", "talent acquisition", "sourcing"],
  },
  "hr-managers": {
    label: "HR Managers",
    emoji: "👥",
    categories: ["hris", "payroll", "onboarding"] as HRCategory[],
    tags: ["HRIS", "payroll", "employee management", "onboarding", "compliance"],
  },
  "people-ops": {
    label: "People Ops",
    emoji: "🏢",
    categories: ["performance", "onboarding", "hris"] as HRCategory[],
    tags: ["performance management", "OKRs", "engagement", "culture", "feedback"],
  },
  "l-and-d": {
    label: "L&D Teams",
    emoji: "🎓",
    categories: ["learning"] as HRCategory[],
    tags: ["LMS", "training", "courses", "upskilling", "e-learning"],
  },
  "global-teams": {
    label: "Global Teams",
    emoji: "🌍",
    categories: ["payroll", "hris"] as HRCategory[],
    tags: ["global payroll", "international", "EOR", "contractor", "remote"],
  },
} as const;

export type HRRoleKey = keyof typeof HR_ROLES;

export function filterHRTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): HRTool[] {
  let tools = HR_TOOLS;

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

  if (role && role in HR_ROLES) {
    const config = HR_ROLES[role as HRRoleKey];
    tools = tools.filter(
      (t) =>
        (config.categories as readonly string[]).includes(t.category) ||
        t.tags.some((tag) =>
          config.tags.some((rt) => tag.toLowerCase().includes(rt.toLowerCase()))
        )
    );
  }

  return tools;
}
