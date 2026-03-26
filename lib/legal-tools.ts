import {
  LEGAL_TOOLS,
  LEGAL_CATEGORIES,
  type LegalTool,
  type LegalCategory,
} from "@/data/legal-tools";

export { LEGAL_TOOLS, LEGAL_CATEGORIES };
export type { LegalTool, LegalCategory };

export function getAllLegalTools(): LegalTool[] {
  return LEGAL_TOOLS;
}

export function getFeaturedLegalTools(): LegalTool[] {
  return LEGAL_TOOLS.filter((t) => t.featured);
}

export function getLegalToolBySlug(slug: string): LegalTool | undefined {
  return LEGAL_TOOLS.find((t) => t.slug === slug);
}

export function getLegalToolsByCategory(category: LegalCategory): LegalTool[] {
  return LEGAL_TOOLS.filter((t) => t.category === category);
}

export function getAllLegalCategories(): LegalCategory[] {
  return Object.keys(LEGAL_CATEGORIES) as LegalCategory[];
}

export function getLegalCategoryCount(category: LegalCategory): number {
  return LEGAL_TOOLS.filter((t) => t.category === category).length;
}

export const LEGAL_PRICING_LABELS: Record<LegalTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const LEGAL_PRICING_COLORS: Record<LegalTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-slate-500/20 text-slate-300 border-slate-500/30",
};

export const LEGAL_ROLES = {
  "general-counsel": {
    label: "General Counsel & CLOs",
    emoji: "⚖️",
    categories: ["contract-management", "compliance"] as LegalCategory[],
    tags: ["contract lifecycle", "legal ops", "risk", "compliance", "governance"],
  },
  "legal-ops": {
    label: "Legal Operations Teams",
    emoji: "⚙️",
    categories: ["contract-management", "e-signature"] as LegalCategory[],
    tags: ["automation", "workflow", "contract templates", "self-service", "metrics"],
  },
  "small-business-owners": {
    label: "Small Business Owners",
    emoji: "🏪",
    categories: ["e-signature", "ip-trademark"] as LegalCategory[],
    tags: ["contracts", "signatures", "LLC", "trademarks", "affordable"],
  },
  "compliance-officers": {
    label: "Compliance Officers",
    emoji: "🛡️",
    categories: ["compliance"] as LegalCategory[],
    tags: ["SOC 2", "HIPAA", "GDPR", "audit", "security controls"],
  },
} as const;

export type LegalRoleKey = keyof typeof LEGAL_ROLES;

export function filterLegalTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): LegalTool[] {
  let tools = LEGAL_TOOLS;

  if (role && role in LEGAL_ROLES) {
    const roleData = LEGAL_ROLES[role as LegalRoleKey];
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
