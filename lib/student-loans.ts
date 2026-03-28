import {
  STUDENT_LOAN_TOOLS,
  STUDENT_LOAN_CATEGORIES,
  type StudentLoanTool,
  type StudentLoanCategory,
} from "@/data/student-loans";

export { STUDENT_LOAN_TOOLS, STUDENT_LOAN_CATEGORIES };
export type { StudentLoanTool, StudentLoanCategory };

export function getAllStudentLoanTools(): StudentLoanTool[] {
  return STUDENT_LOAN_TOOLS;
}

export function getFeaturedStudentLoanTools(): StudentLoanTool[] {
  return STUDENT_LOAN_TOOLS.filter((t) => t.featured);
}

export function getStudentLoanToolBySlug(slug: string): StudentLoanTool | undefined {
  return STUDENT_LOAN_TOOLS.find((t) => t.slug === slug);
}

export function getStudentLoanToolsByCategory(category: StudentLoanCategory): StudentLoanTool[] {
  return STUDENT_LOAN_TOOLS.filter((t) => t.category === category);
}

export function getAllStudentLoanCategories(): StudentLoanCategory[] {
  return Object.keys(STUDENT_LOAN_CATEGORIES) as StudentLoanCategory[];
}

export function getStudentLoanCategoryCount(category: StudentLoanCategory): number {
  return STUDENT_LOAN_TOOLS.filter((t) => t.category === category).length;
}

export const STUDENT_LOAN_PRICING_LABELS: Record<StudentLoanTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const STUDENT_LOAN_PRICING_COLORS: Record<StudentLoanTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const STUDENT_LOAN_ROLES = {} as const;

export type StudentLoanRoleKey = keyof typeof STUDENT_LOAN_ROLES;

export function filterStudentLoanTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): StudentLoanTool[] {
  let tools = STUDENT_LOAN_TOOLS;

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
