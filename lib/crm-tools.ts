import {
  CRM_TOOLS,
  CRM_CATEGORIES,
  type CRMTool,
  type CRMCategory,
} from "@/data/crm-tools";

export { CRM_TOOLS, CRM_CATEGORIES };
export type { CRMTool, CRMCategory };

export function getAllCRMTools(): CRMTool[] {
  return CRM_TOOLS;
}

export function getFeaturedCRMTools(): CRMTool[] {
  return CRM_TOOLS.filter((t) => t.featured);
}

export function getCRMToolBySlug(slug: string): CRMTool | undefined {
  return CRM_TOOLS.find((t) => t.slug === slug);
}

export function getCRMToolsByCategory(category: CRMCategory): CRMTool[] {
  return CRM_TOOLS.filter((t) => t.category === category);
}

export function getAllCRMCategories(): CRMCategory[] {
  return Object.keys(CRM_CATEGORIES) as CRMCategory[];
}

export function getCRMCategoryCount(category: CRMCategory): number {
  return CRM_TOOLS.filter((t) => t.category === category).length;
}

export const CRM_PRICING_LABELS: Record<CRMTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const CRM_PRICING_COLORS: Record<CRMTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const CRM_ROLES = {
  "sales-reps": {
    label: "Sales Reps & AEs",
    emoji: "🤝",
    categories: ["crm", "sales-engagement", "proposal"] as CRMCategory[],
    tags: ["sales pipeline", "email sequences", "proposals", "crm", "deal management"],
  },
  "sales-managers": {
    label: "Sales Managers",
    emoji: "📊",
    categories: ["pipeline", "conversation-intelligence"] as CRMCategory[],
    tags: ["forecasting", "coaching", "pipeline", "deal intelligence", "revenue"],
  },
  "sdrs": {
    label: "SDRs & BDRs",
    emoji: "📧",
    categories: ["sales-engagement", "prospecting"] as CRMCategory[],
    tags: ["cold email", "prospecting", "outreach", "sequences", "b2b data"],
  },
  "revops": {
    label: "RevOps Teams",
    emoji: "⚙️",
    categories: ["pipeline", "prospecting"] as CRMCategory[],
    tags: ["revenue intelligence", "data enrichment", "forecasting", "crm", "automation"],
  },
  "founders": {
    label: "Founders & Startups",
    emoji: "🚀",
    categories: ["crm", "prospecting", "sales-engagement"] as CRMCategory[],
    tags: ["freemium", "startup", "affordable", "crm", "lead generation"],
  },
} as const;

export type CRMRoleKey = keyof typeof CRM_ROLES;

export function filterCRMTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): CRMTool[] {
  let tools = CRM_TOOLS;

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

  if (role && role in CRM_ROLES) {
    const config = CRM_ROLES[role as CRMRoleKey];
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
