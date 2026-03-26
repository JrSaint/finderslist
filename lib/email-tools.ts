import {
  EMAIL_TOOLS,
  EMAIL_CATEGORIES,
  type EmailTool,
  type EmailCategory,
} from "@/data/email-tools";

export { EMAIL_TOOLS, EMAIL_CATEGORIES };
export type { EmailTool, EmailCategory };

export function getAllEmailTools(): EmailTool[] {
  return EMAIL_TOOLS;
}

export function getFeaturedEmailTools(): EmailTool[] {
  return EMAIL_TOOLS.filter((t) => t.featured);
}

export function getEmailToolBySlug(slug: string): EmailTool | undefined {
  return EMAIL_TOOLS.find((t) => t.slug === slug);
}

export function getEmailToolsByCategory(category: EmailCategory): EmailTool[] {
  return EMAIL_TOOLS.filter((t) => t.category === category);
}

export function getAllEmailCategories(): EmailCategory[] {
  return Object.keys(EMAIL_CATEGORIES) as EmailCategory[];
}

export function getEmailCategoryCount(category: EmailCategory): number {
  return EMAIL_TOOLS.filter((t) => t.category === category).length;
}

export const EMAIL_PRICING_LABELS: Record<EmailTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const EMAIL_PRICING_COLORS: Record<EmailTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-blue-500/20 text-blue-300 border-blue-500/30",
};

export const EMAIL_ROLES = {
  "email-marketers": {
    label: "Email Marketers",
    emoji: "📧",
    categories: ["email-marketing"] as EmailCategory[],
    tags: ["automation", "segmentation", "A/B testing", "open rates", "list management"],
  },
  "ecommerce-brands": {
    label: "eCommerce Brands",
    emoji: "🛍️",
    categories: ["email-marketing", "transactional-email"] as EmailCategory[],
    tags: ["klaviyo", "abandoned cart", "flows", "Shopify", "revenue attribution"],
  },
  "developers": {
    label: "Developers & Startups",
    emoji: "💻",
    categories: ["transactional-email"] as EmailCategory[],
    tags: ["API", "SMTP", "transactional", "password reset", "notifications"],
  },
  "sales-teams": {
    label: "Sales & SDR Teams",
    emoji: "📞",
    categories: ["cold-email"] as EmailCategory[],
    tags: ["cold email", "outreach", "sequences", "personalization", "reply rates"],
  },
  "newsletter-writers": {
    label: "Newsletter Writers",
    emoji: "📰",
    categories: ["newsletter"] as EmailCategory[],
    tags: ["newsletter", "paid subscriptions", "audience growth", "monetization", "beehiiv"],
  },
} as const;

export type EmailRoleKey = keyof typeof EMAIL_ROLES;

export function filterEmailTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): EmailTool[] {
  let tools = EMAIL_TOOLS;

  if (role && role in EMAIL_ROLES) {
    const roleData = EMAIL_ROLES[role as EmailRoleKey];
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
