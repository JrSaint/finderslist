import { MetadataRoute } from "next";
import { getAllTools, getAllCategories } from "@/lib/tools";
import { getAllMarketingTools, getAllMarketingCategories } from "@/lib/marketing-tools";
import { getAllFinanceTools, getAllFinanceCategories } from "@/lib/finance-tools";
import { getAllEcommerceTools, getAllEcommerceCategories } from "@/lib/ecommerce-tools";
import { getAllProductivityTools, getAllProductivityCategories } from "@/lib/productivity-tools";
import { getAllHRTools, getAllHRCategories } from "@/lib/hr-tools";
import { getAllCRMTools, getAllCRMCategories } from "@/lib/crm-tools";
import { getAllSecurityTools, getAllSecurityCategories } from "@/lib/security-tools";
import { getAllWebsiteBuilderTools, getAllWebsiteBuilderCategories } from "@/lib/website-builders";
import { getAllCreatorTools, getAllCreatorCategories } from "@/lib/creator-tools";
import { getAllDeveloperTools, getAllDeveloperCategories } from "@/lib/developer-tools";
import { getAllDesignTools, getAllDesignCategories } from "@/lib/design-tools";
import { getAllSupportTools, getAllSupportCategories } from "@/lib/support-tools";
import { getAllElearningTools, getAllElearningCategories } from "@/lib/elearning-tools";
import { getAllAnalyticsTools, getAllAnalyticsCategories } from "@/lib/analytics-tools";
import { getAllLegalTools, getAllLegalCategories } from "@/lib/legal-tools";
import { getAllHostingTools, getAllHostingCategories } from "@/lib/hosting-tools";
import { getAllSocialMediaTools, getAllSocialMediaCategories } from "@/lib/social-media-tools";
import { getAllEmailTools, getAllEmailCategories } from "@/lib/email-tools";
import { getAllNoCodeTools, getAllNoCodeCategories } from "@/lib/no-code-tools";

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
  const crmTools = getAllCRMTools();
  const crmCategories = getAllCRMCategories();
  const securityTools = getAllSecurityTools();
  const securityCategories = getAllSecurityCategories();
  const websiteBuilderTools = getAllWebsiteBuilderTools();
  const websiteBuilderCategories = getAllWebsiteBuilderCategories();
  const creatorTools = getAllCreatorTools();
  const creatorCategories = getAllCreatorCategories();
  const developerTools = getAllDeveloperTools();
  const developerCategories = getAllDeveloperCategories();
  const designTools = getAllDesignTools();
  const designCategories = getAllDesignCategories();
  const supportTools = getAllSupportTools();
  const supportCategories = getAllSupportCategories();
  const elearningTools = getAllElearningTools();
  const elearningCategories = getAllElearningCategories();
  const analyticsTools = getAllAnalyticsTools();
  const analyticsCategories = getAllAnalyticsCategories();
  const legalTools = getAllLegalTools();
  const legalCategories = getAllLegalCategories();
  const hostingTools = getAllHostingTools();
  const hostingCategories = getAllHostingCategories();
  const socialMediaTools = getAllSocialMediaTools();
  const socialMediaCategories = getAllSocialMediaCategories();
  const emailTools = getAllEmailTools();
  const emailCategories = getAllEmailCategories();
  const noCodeTools = getAllNoCodeTools();
  const noCodeCategories = getAllNoCodeCategories();

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
    { url: `${BASE_URL}/crm-tools`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
    { url: `${BASE_URL}/security-tools`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
    { url: `${BASE_URL}/website-builders`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
    { url: `${BASE_URL}/creator-tools`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
    { url: `${BASE_URL}/developer-tools`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
    { url: `${BASE_URL}/design-tools`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
    { url: `${BASE_URL}/support-tools`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
    { url: `${BASE_URL}/elearning-tools`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
    { url: `${BASE_URL}/analytics-tools`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
    { url: `${BASE_URL}/legal-tools`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
    { url: `${BASE_URL}/hosting-tools`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
    { url: `${BASE_URL}/social-media-tools`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
    { url: `${BASE_URL}/email-tools`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
    { url: `${BASE_URL}/no-code-tools`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
    // Submit pages
    { url: `${BASE_URL}/ai-tools/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/marketing-tools/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/finance-tools/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/ecommerce-tools/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/productivity-tools/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/hr-tools/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/crm-tools/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/security-tools/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/website-builders/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/creator-tools/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/developer-tools/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/design-tools/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/support-tools/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/elearning-tools/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/analytics-tools/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/legal-tools/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/hosting-tools/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/social-media-tools/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/email-tools/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/no-code-tools/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    // Category pages
    ...makeCategoryPages(aiCategories, "ai-tools"),
    ...makeCategoryPages(marketingCategories, "marketing-tools"),
    ...makeCategoryPages(financeCategories, "finance-tools"),
    ...makeCategoryPages(ecommerceCategories, "ecommerce-tools"),
    ...makeCategoryPages(productivityCategories, "productivity-tools"),
    ...makeCategoryPages(hrCategories, "hr-tools"),
    ...makeCategoryPages(crmCategories, "crm-tools"),
    ...makeCategoryPages(securityCategories, "security-tools"),
    ...makeCategoryPages(websiteBuilderCategories, "website-builders"),
    ...makeCategoryPages(creatorCategories, "creator-tools"),
    ...makeCategoryPages(developerCategories, "developer-tools"),
    ...makeCategoryPages(designCategories, "design-tools"),
    ...makeCategoryPages(supportCategories, "support-tools"),
    ...makeCategoryPages(elearningCategories, "elearning-tools"),
    ...makeCategoryPages(analyticsCategories, "analytics-tools"),
    ...makeCategoryPages(legalCategories, "legal-tools"),
    ...makeCategoryPages(hostingCategories, "hosting-tools"),
    ...makeCategoryPages(socialMediaCategories, "social-media-tools"),
    ...makeCategoryPages(emailCategories, "email-tools"),
    ...makeCategoryPages(noCodeCategories, "no-code-tools"),
    // Tool pages
    ...makeToolPages(aiTools, "ai-tools"),
    ...makeToolPages(marketingTools, "marketing-tools"),
    ...makeToolPages(financeTools, "finance-tools"),
    ...makeToolPages(ecommerceTools, "ecommerce-tools"),
    ...makeToolPages(productivityTools, "productivity-tools"),
    ...makeToolPages(hrTools, "hr-tools"),
    ...makeToolPages(crmTools, "crm-tools"),
    ...makeToolPages(securityTools, "security-tools"),
    ...makeToolPages(websiteBuilderTools, "website-builders"),
    ...makeToolPages(creatorTools, "creator-tools"),
    ...makeToolPages(developerTools, "developer-tools"),
    ...makeToolPages(designTools, "design-tools"),
    ...makeToolPages(supportTools, "support-tools"),
    ...makeToolPages(elearningTools, "elearning-tools"),
    ...makeToolPages(analyticsTools, "analytics-tools"),
    ...makeToolPages(legalTools, "legal-tools"),
    ...makeToolPages(hostingTools, "hosting-tools"),
    ...makeToolPages(socialMediaTools, "social-media-tools"),
    ...makeToolPages(emailTools, "email-tools"),
    ...makeToolPages(noCodeTools, "no-code-tools"),
  ];
}
