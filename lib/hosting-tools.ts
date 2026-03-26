import {
  HOSTING_TOOLS,
  HOSTING_CATEGORIES,
  type HostingTool,
  type HostingCategory,
} from "@/data/hosting-tools";

export { HOSTING_TOOLS, HOSTING_CATEGORIES };
export type { HostingTool, HostingCategory };

export function getAllHostingTools(): HostingTool[] {
  return HOSTING_TOOLS;
}

export function getFeaturedHostingTools(): HostingTool[] {
  return HOSTING_TOOLS.filter((t) => t.featured);
}

export function getHostingToolBySlug(slug: string): HostingTool | undefined {
  return HOSTING_TOOLS.find((t) => t.slug === slug);
}

export function getHostingToolsByCategory(category: HostingCategory): HostingTool[] {
  return HOSTING_TOOLS.filter((t) => t.category === category);
}

export function getAllHostingCategories(): HostingCategory[] {
  return Object.keys(HOSTING_CATEGORIES) as HostingCategory[];
}

export function getHostingCategoryCount(category: HostingCategory): number {
  return HOSTING_TOOLS.filter((t) => t.category === category).length;
}

export const HOSTING_PRICING_LABELS: Record<HostingTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const HOSTING_PRICING_COLORS: Record<HostingTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const HOSTING_ROLES = {
  "developers": {
    label: "Developers & DevOps",
    emoji: "💻",
    categories: ["cloud-hosting", "vps-dedicated", "static-jamstack"] as HostingCategory[],
    tags: ["VPS", "cloud", "Docker", "deployment", "server"],
  },
  "wordpress-users": {
    label: "WordPress Site Owners",
    emoji: "📝",
    categories: ["managed-wordpress"] as HostingCategory[],
    tags: ["WordPress", "managed hosting", "WooCommerce", "staging", "performance"],
  },
  "startups": {
    label: "Startups & Side Projects",
    emoji: "🚀",
    categories: ["static-jamstack", "vps-dedicated"] as HostingCategory[],
    tags: ["cheap", "scalable", "free tier", "startup", "indie hacker"],
  },
  "agencies": {
    label: "Agencies",
    emoji: "🏢",
    categories: ["managed-wordpress", "cloud-hosting"] as HostingCategory[],
    tags: ["client sites", "white-label", "reseller", "multiple sites", "agency"],
  },
  "ecommerce-stores": {
    label: "eCommerce Stores",
    emoji: "🛍️",
    categories: ["managed-wordpress", "cloud-hosting"] as HostingCategory[],
    tags: ["WooCommerce", "performance", "uptime", "PCI compliance", "scalability"],
  },
} as const;

export type HostingRoleKey = keyof typeof HOSTING_ROLES;

export function filterHostingTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): HostingTool[] {
  let tools = HOSTING_TOOLS;

  if (role && role in HOSTING_ROLES) {
    const roleData = HOSTING_ROLES[role as HostingRoleKey];
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
