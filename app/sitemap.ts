import { MetadataRoute } from "next";

const BASE_URL = "https://finderslist.com";

// Static dates — prevents every build from marking all pages as "freshly modified"
// which wastes Google crawl budget. Update these when content actually changes.
const DATE_STATIC_PAGES = new Date("2026-01-15");
const DATE_DIRECTORIES = new Date("2026-03-28");
const DATE_TOOLS = new Date("2026-03-28");

// Map of all category routes to their lib import paths and function names
const CATEGORIES = [
  { path: "ai-tools", libName: "tools" },
  { path: "marketing-tools", libName: "marketing-tools" },
  { path: "finance-tools", libName: "finance-tools" },
  { path: "ecommerce-tools", libName: "ecommerce-tools" },
  { path: "productivity-tools", libName: "productivity-tools" },
  { path: "hr-tools", libName: "hr-tools" },
  { path: "crm-tools", libName: "crm-tools" },
  { path: "security-tools", libName: "security-tools" },
  { path: "website-builders", libName: "website-builders" },
  { path: "creator-tools", libName: "creator-tools" },
  { path: "developer-tools", libName: "developer-tools" },
  { path: "design-tools", libName: "design-tools" },
  { path: "support-tools", libName: "support-tools" },
  { path: "elearning-tools", libName: "elearning-tools" },
  { path: "analytics-tools", libName: "analytics-tools" },
  { path: "legal-tools", libName: "legal-tools" },
  { path: "hosting-tools", libName: "hosting-tools" },
  { path: "social-media-tools", libName: "social-media-tools" },
  { path: "email-tools", libName: "email-tools" },
  { path: "no-code-tools", libName: "no-code-tools" },
  // New categories
  { path: "appointment-scheduling-software", libName: "appointment-scheduling-software" },
  { path: "auto-insurance", libName: "auto-insurance" },
  { path: "budgeting-apps", libName: "budgeting-apps" },
  { path: "business-insurance", libName: "business-insurance" },
  { path: "business-phone-systems", libName: "business-phone-systems" },
  { path: "contract-management-software", libName: "contract-management-software" },
  { path: "credit-cards", libName: "credit-cards" },
  { path: "cryptocurrency-exchanges", libName: "cryptocurrency-exchanges" },
  { path: "document-management-software", libName: "document-management-software" },
  { path: "estate-planning-services", libName: "estate-planning-services" },
  { path: "field-service-management", libName: "field-service-management" },
  { path: "fitness-apps", libName: "fitness-apps" },
  { path: "fleet-management-software", libName: "fleet-management-software" },
  { path: "health-insurance", libName: "health-insurance" },
  { path: "home-insurance", libName: "home-insurance" },
  { path: "home-security-systems", libName: "home-security-systems" },
  { path: "home-warranty-companies", libName: "home-warranty-companies" },
  { path: "hotel-booking-platforms", libName: "hotel-booking-platforms" },
  { path: "inventory-management-software", libName: "inventory-management-software" },
  { path: "investment-platforms", libName: "investment-platforms" },
  { path: "life-insurance", libName: "life-insurance" },
  { path: "mental-health-apps", libName: "mental-health-apps" },
  { path: "moving-companies", libName: "moving-companies" },
  { path: "online-degree-programs", libName: "online-degree-programs" },
  { path: "online-tutoring-platforms", libName: "online-tutoring-platforms" },
  { path: "personal-loans", libName: "personal-loans" },
  { path: "pest-control-services", libName: "pest-control-services" },
  { path: "pos-systems", libName: "pos-systems" },
  { path: "robo-advisors", libName: "robo-advisors" },
  { path: "solar-panel-companies", libName: "solar-panel-companies" },
  { path: "student-loans", libName: "student-loans" },
  { path: "supply-chain-software", libName: "supply-chain-software" },
  { path: "tax-preparation-software", libName: "tax-preparation-software" },
  { path: "telehealth-platforms", libName: "telehealth-platforms" },
  { path: "test-prep-services", libName: "test-prep-services" },
  { path: "travel-insurance", libName: "travel-insurance" },
  { path: "vacation-rental-platforms", libName: "vacation-rental-platforms" },
  { path: "warehouse-management-software", libName: "warehouse-management-software" },
  // High-CPC niche directories
  { path: "mortgage-lenders", libName: "mortgage-lenders" },
  { path: "llc-formation-services", libName: "llc-formation-services" },
  { path: "background-check-services", libName: "background-check-services" },
  { path: "payment-processing", libName: "payment-processing" },
  { path: "gold-ira-companies", libName: "gold-ira-companies" },
  { path: "debt-relief-services", libName: "debt-relief-services" },
  { path: "medical-billing-software", libName: "medical-billing-software" },
  { path: "erp-software", libName: "erp-software" },
  { path: "workers-comp-insurance", libName: "workers-comp-insurance" },
  { path: "structured-settlement-companies", libName: "structured-settlement-companies" },
  { path: "business-loans", libName: "business-loans" },
  { path: "credit-repair-services", libName: "credit-repair-services" },
  { path: "tax-relief-services", libName: "tax-relief-services" },
  { path: "identity-theft-protection", libName: "identity-theft-protection" },
  { path: "personal-injury-lawyers", libName: "personal-injury-lawyers" },
  { path: "mesothelioma-lawyers", libName: "mesothelioma-lawyers" },
];

function camelCase(str: string): string {
  return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

async function getAllCategoryData() {
  const categoryData: Record<string, { tools: any[]; categories: string[] }> = {};

  for (const cat of CATEGORIES) {
    try {
      const lib = await import(`@/lib/${cat.libName}`);
      const camelName = camelCase(cat.libName);
      const toolsFn = lib[`getAll${camelName.charAt(0).toUpperCase() + camelName.slice(1).replace(/s$/, "")}Tools`] ||
        lib[`getAll${camelName.charAt(0).toUpperCase() + camelName.slice(1)}Tools`];

      const categoriesFn = lib[`getAll${camelName.charAt(0).toUpperCase() + camelName.slice(1).replace(/s$/, "")}Categories`] ||
        lib[`getAll${camelName.charAt(0).toUpperCase() + camelName.slice(1)}Categories`];

      const tools = toolsFn?.() || [];
      const categories = categoriesFn?.() || [];

      categoryData[cat.path] = { tools, categories };
    } catch (e) {
      // Silently skip if import fails
      categoryData[cat.path] = { tools: [], categories: [] };
    }
  }

  return categoryData;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categoryData = await getAllCategoryData();

  const entries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: DATE_DIRECTORIES,
      changeFrequency: "weekly",
      priority: 1,
    },
    { url: `${BASE_URL}/about`, lastModified: DATE_STATIC_PAGES, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: DATE_STATIC_PAGES, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/privacy`, lastModified: DATE_STATIC_PAGES, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/terms`, lastModified: DATE_STATIC_PAGES, changeFrequency: "monthly", priority: 0.4 },
  ];

  // Add category index pages and tool/category pages dynamically
  for (const cat of CATEGORIES) {
    const { tools, categories } = categoryData[cat.path];

    // Index page
    entries.push({
      url: `${BASE_URL}/${cat.path}`,
      lastModified: DATE_DIRECTORIES,
      changeFrequency: "weekly",
      priority: 0.9,
    });

    // Category pages
    if (Array.isArray(categories)) {
      for (const category of categories) {
        entries.push({
          url: `${BASE_URL}/${cat.path}/category/${category}`,
          lastModified: DATE_DIRECTORIES,
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }
    }

    // Tool pages
    if (Array.isArray(tools)) {
      for (const tool of tools) {
        entries.push({
          url: `${BASE_URL}/${cat.path}/tools/${tool.slug}`,
          lastModified: DATE_TOOLS,
          changeFrequency: "monthly",
          priority: 0.8,
        });
      }
    }
  }

  return entries;
}
