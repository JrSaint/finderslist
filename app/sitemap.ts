import { MetadataRoute } from "next";
import { getAllTools, getAllCategories } from "@/lib/tools";
import { getAllMarketingTools, getAllMarketingCategories } from "@/lib/marketing-tools";
import { getAllFinanceTools, getAllFinanceCategories } from "@/lib/finance-tools";
import { getAllEcommerceTools, getAllEcommerceCategories } from "@/lib/ecommerce-tools";
import { getAllProductivityTools, getAllProductivityCategories } from "@/lib/productivity-tools";
import { getAllHRTools, getAllHRCategories } from "@/lib/hr-tools";

const BASE_URL = "https://finderslist.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const aiTools = getAllTools();
  const aiCategories = getAllCategories();
  const marketingTools = getAllMarketingTools();
  const marketingCategories = getAllMarketingCategories();
  const financeTools = getAllFinanceTools();
  const financeCategories = getAllFinanceCategories();
  const ecommerceTools = getAllEcommerceTools();
  const ecommerceCategories = getAllEcommerceCategories();
  const productivityTools = getAllProductivityTools();
  const productivityCategories = getAllProductivityCategories();
  const hrTools = getAllHRTools();
  const hrCategories = getAllHRCategories();

  const makeToolPages = (tools: { slug: string }[], base: string) =>
    tools.map((tool) => ({
      url: `${BASE_URL}/${base}/tools/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  const makeCategoryPages = (categories: string[], base: string) =>
    categories.map((cat) => ({
      url: `${BASE_URL}/${base}/category/${cat}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    // Directory index pages
    { url: `${BASE_URL}/ai-tools`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
    { url: `${BASE_URL}/marketing-tools`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
    { url: `${BASE_URL}/finance-tools`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
    { url: `${BASE_URL}/ecommerce-tools`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
    { url: `${BASE_URL}/productivity-tools`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
    { url: `${BASE_URL}/hr-tools`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
    // Submit pages
    { url: `${BASE_URL}/ai-tools/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/marketing-tools/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/finance-tools/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/ecommerce-tools/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/productivity-tools/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/hr-tools/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    // Category pages
    ...makeCategoryPages(aiCategories, "ai-tools"),
    ...makeCategoryPages(marketingCategories, "marketing-tools"),
    ...makeCategoryPages(financeCategories, "finance-tools"),
    ...makeCategoryPages(ecommerceCategories, "ecommerce-tools"),
    ...makeCategoryPages(productivityCategories, "productivity-tools"),
    ...makeCategoryPages(hrCategories, "hr-tools"),
    // Tool pages
    ...makeToolPages(aiTools, "ai-tools"),
    ...makeToolPages(marketingTools, "marketing-tools"),
    ...makeToolPages(financeTools, "finance-tools"),
    ...makeToolPages(ecommerceTools, "ecommerce-tools"),
    ...makeToolPages(productivityTools, "productivity-tools"),
    ...makeToolPages(hrTools, "hr-tools"),
  ];
}
