import {
  ELEARNING_TOOLS,
  ELEARNING_CATEGORIES,
  type ElearningTool,
  type ElearningCategory,
} from "@/data/elearning-tools";

export { ELEARNING_TOOLS, ELEARNING_CATEGORIES };
export type { ElearningTool, ElearningCategory };

export function getAllElearningTools(): ElearningTool[] {
  return ELEARNING_TOOLS;
}

export function getFeaturedElearningTools(): ElearningTool[] {
  return ELEARNING_TOOLS.filter((t) => t.featured);
}

export function getElearningToolBySlug(slug: string): ElearningTool | undefined {
  return ELEARNING_TOOLS.find((t) => t.slug === slug);
}

export function getElearningToolsByCategory(category: ElearningCategory): ElearningTool[] {
  return ELEARNING_TOOLS.filter((t) => t.category === category);
}

export function getAllElearningCategories(): ElearningCategory[] {
  return Object.keys(ELEARNING_CATEGORIES) as ElearningCategory[];
}

export function getElearningCategoryCount(category: ElearningCategory): number {
  return ELEARNING_TOOLS.filter((t) => t.category === category).length;
}

export const ELEARNING_PRICING_LABELS: Record<ElearningTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const ELEARNING_PRICING_COLORS: Record<ElearningTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
};

export const ELEARNING_ROLES = {
  "instructional-designers": {
    label: "Instructional Designers",
    emoji: "📐",
    categories: ["employee-training"] as ElearningCategory[],
    tags: ["articulate", "scorm", "elearning design", "storyboarding", "instructional design"],
  },
  "l-and-d-managers": {
    label: "L&D Managers",
    emoji: "📊",
    categories: ["lms", "employee-training"] as ElearningCategory[],
    tags: ["LMS", "corporate training", "compliance", "reporting", "employee development"],
  },
  "teachers": {
    label: "Teachers & Professors",
    emoji: "🍎",
    categories: ["lms", "cohort-learning"] as ElearningCategory[],
    tags: ["k-12", "higher education", "moodle", "canvas", "grading"],
  },
  "hr-teams": {
    label: "HR & People Teams",
    emoji: "👥",
    categories: ["employee-training", "microlearning"] as ElearningCategory[],
    tags: ["onboarding", "compliance training", "skills", "professional development"],
  },
} as const;

export type ElearningRoleKey = keyof typeof ELEARNING_ROLES;

export function filterElearningTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): ElearningTool[] {
  let tools = ELEARNING_TOOLS;

  if (role && role in ELEARNING_ROLES) {
    const roleData = ELEARNING_ROLES[role as ElearningRoleKey];
    tools = tools.filter(
      (t) =>
        (roleData.categories as readonly string[]).includes(t.category) ||
        t.tags.some((tag) => roleData.tags.includes(tag as never))
    );
  }

  if (pricing && ["free", "freemium", "paid"].includes(pricing)) {
    tools = tools.filter((t) => t.pricing === pricing);
  }

  if (query) {
    const q = query.toLowerCase();
    tools = tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }

  return tools;
}
