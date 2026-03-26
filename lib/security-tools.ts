import {
  SECURITY_TOOLS,
  SECURITY_CATEGORIES,
  type SecurityTool,
  type SecurityCategory,
} from "@/data/security-tools";

export { SECURITY_TOOLS, SECURITY_CATEGORIES };
export type { SecurityTool, SecurityCategory };

export function getAllSecurityTools(): SecurityTool[] {
  return SECURITY_TOOLS;
}

export function getFeaturedSecurityTools(): SecurityTool[] {
  return SECURITY_TOOLS.filter((t) => t.featured);
}

export function getSecurityToolBySlug(slug: string): SecurityTool | undefined {
  return SECURITY_TOOLS.find((t) => t.slug === slug);
}

export function getSecurityToolsByCategory(category: SecurityCategory): SecurityTool[] {
  return SECURITY_TOOLS.filter((t) => t.category === category);
}

export function getAllSecurityCategories(): SecurityCategory[] {
  return Object.keys(SECURITY_CATEGORIES) as SecurityCategory[];
}

export function getSecurityCategoryCount(category: SecurityCategory): number {
  return SECURITY_TOOLS.filter((t) => t.category === category).length;
}

export const SECURITY_PRICING_LABELS: Record<SecurityTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const SECURITY_PRICING_COLORS: Record<SecurityTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-green-500/20 text-green-300 border-green-500/30",
};

export const SECURITY_ROLES = {
  "security-teams": {
    label: "Security Teams",
    emoji: "🛡️",
    categories: ["endpoint-security", "identity-security", "network-security"] as SecurityCategory[],
    tags: ["edr", "zero trust", "threat intelligence", "siem", "enterprise security"],
  },
  "it-admins": {
    label: "IT Administrators",
    emoji: "⚙️",
    categories: ["identity-security", "password-managers", "endpoint-security"] as SecurityCategory[],
    tags: ["sso", "mfa", "password manager", "endpoint protection", "device management"],
  },
  "individuals": {
    label: "Individuals & Families",
    emoji: "👤",
    categories: ["vpn", "password-managers"] as SecurityCategory[],
    tags: ["vpn", "password manager", "privacy", "personal security", "antivirus"],
  },
  "compliance-teams": {
    label: "Compliance & Risk Teams",
    emoji: "📋",
    categories: ["compliance"] as SecurityCategory[],
    tags: ["soc 2", "iso 27001", "hipaa", "compliance", "security training"],
  },
  "smbs": {
    label: "Small Businesses",
    emoji: "🏢",
    categories: ["vpn", "password-managers", "endpoint-security"] as SecurityCategory[],
    tags: ["affordable", "smb", "freemium", "small business", "basic security"],
  },
} as const;

export type SecurityRoleKey = keyof typeof SECURITY_ROLES;

export function filterSecurityTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): SecurityTool[] {
  let tools = SECURITY_TOOLS;

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

  if (role && role in SECURITY_ROLES) {
    const config = SECURITY_ROLES[role as SecurityRoleKey];
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
