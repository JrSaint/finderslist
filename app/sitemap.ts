import { MetadataRoute } from "next";
import { getAllTools, getAllCategories } from "@/lib/tools";
import { getAllMarketingTools, getAllMarketingCategories } from "@/lib/marketing-tools";

const BASE_URL = "https://finderslist.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const aiTools = getAllTools();
  const aiCategories = getAllCategories();
  const marketingTools = getAllMarketingTools();
  const marketingCategories = getAllMarketingCategories();

  const aiToolPages = aiTools.map((tool) => ({
    url: `${BASE_URL}/ai-tools/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const aiCategoryPages = aiCategories.map((cat) => ({
    url: `${BASE_URL}/ai-tools/category/${cat}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  const marketingToolPages = marketingTools.map((tool) => ({
    url: `${BASE_URL}/marketing-tools/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const marketingCategoryPages = marketingCategories.map((cat) => ({
    url: `${BASE_URL}/marketing-tools/category/${cat}`,
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
    {
      url: `${BASE_URL}/ai-tools`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/marketing-tools`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/ai-tools/submit`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/marketing-tools/submit`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...aiCategoryPages,
    ...aiToolPages,
    ...marketingCategoryPages,
    ...marketingToolPages,
  ];
}
