import {
  ENDPOINT_SECURITY_TOOLS,
  ENDPOINT_SECURITY_CATEGORIES,
  type EndpointSecurityTool,
  type EndpointSecurityCategory,
} from "@/data/endpoint-security-software";

export { ENDPOINT_SECURITY_TOOLS, ENDPOINT_SECURITY_CATEGORIES };
export type { EndpointSecurityTool, EndpointSecurityCategory };

export function getAllEndpointSecurityTools(): EndpointSecurityTool[] {
  return ENDPOINT_SECURITY_TOOLS;
}

export function getFeaturedEndpointSecurityTools(): EndpointSecurityTool[] {
  return ENDPOINT_SECURITY_TOOLS.filter((t) => t.featured);
}

export function getEndpointSecurityToolBySlug(slug: string): EndpointSecurityTool | undefined {
  return ENDPOINT_SECURITY_TOOLS.find((t) => t.slug === slug);
}

export function getEndpointSecurityToolsByCategory(category: EndpointSecurityCategory): EndpointSecurityTool[] {
  return ENDPOINT_SECURITY_TOOLS.filter((t) => t.category === category);
}

export function getAllEndpointSecurityCategories(): EndpointSecurityCategory[] {
  return Object.keys(ENDPOINT_SECURITY_CATEGORIES) as EndpointSecurityCategory[];
}

export function getEndpointSecurityCategoryCount(category: EndpointSecurityCategory): number {
  return ENDPOINT_SECURITY_TOOLS.filter((t) => t.category === category).length;
}

export const ENDPOINT_SECURITY_PRICING_LABELS: Record<EndpointSecurityTool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const ENDPOINT_SECURITY_PRICING_COLORS: Record<EndpointSecurityTool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const ENDPOINT_SECURITY_ROLES = {} as const;

export type EndpointSecurityRoleKey = keyof typeof ENDPOINT_SECURITY_ROLES;

export function filterEndpointSecurityTools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): EndpointSecurityTool[] {
  let tools = ENDPOINT_SECURITY_TOOLS;

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
