export type SeoToolCategory =
  | "all-in-one"
  | "keyword-research"
  | "rank-tracking"
  | "backlink-analysis"
  | "technical-seo";

export interface SeoToolTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: SeoToolCategory;
  tags: string[];
  url: string;
  affiliateUrl?: string;
  pricing: "free" | "freemium" | "paid";
  featured: boolean;
  logo: string;
  domain?: string;
  pros?: string[];
  cons?: string[];
  useCases?: string[];
}

export const SEO_TOOL_CATEGORIES: Record<
  SeoToolCategory,
  { label: string; emoji: string; description: string; gradient: string }
> = {
  "all-in-one": {
    label: "All-in-One SEO",
    emoji: "🧰",
    description: "Comprehensive SEO platforms covering keyword research, rank tracking, site audits, and backlink analysis in a single tool.",
    gradient: "from-blue-600/30 to-blue-800/40",
  },
  "keyword-research": {
    label: "Keyword Research",
    emoji: "🔑",
    description: "Discover high-value keywords, search volume data, and content opportunities to drive organic traffic.",
    gradient: "from-green-600/30 to-green-800/40",
  },
  "rank-tracking": {
    label: "Rank Tracking",
    emoji: "📈",
    description: "Monitor your search engine rankings over time across keywords, locations, and devices.",
    gradient: "from-purple-600/30 to-purple-800/40",
  },
  "backlink-analysis": {
    label: "Backlink Analysis",
    emoji: "🔗",
    description: "Analyze backlink profiles, discover link-building opportunities, and monitor your domain authority.",
    gradient: "from-orange-600/30 to-orange-800/40",
  },
  "technical-seo": {
    label: "Technical SEO",
    emoji: "🛠️",
    description: "Crawl and audit websites to identify technical issues that impact search engine visibility and performance.",
    gradient: "from-red-600/30 to-red-800/40",
  },
};

export const SEO_TOOL_TOOLS: SeoToolTool[] = [
  // ─── Featured tools (full data) ───────────────────────────────────
  {
    slug: "ahrefs",
    name: "Ahrefs",
    tagline: "Industry-leading backlink analysis and all-in-one SEO toolkit",
    description:
      "Ahrefs is one of the most trusted SEO toolsets used by marketers worldwide. It features the largest backlink index on the web, powerful keyword research, competitive analysis, rank tracking, and comprehensive site auditing. Ahrefs is known for its accurate data and intuitive interface.",
    category: "all-in-one",
    tags: ["backlinks", "keyword research", "site audit", "competitor analysis", "rank tracking", "content explorer"],
    url: "https://ahrefs.com",
    pricing: "paid",
    featured: true,
    logo: "🔵",
    domain: "ahrefs.com",
    pros: [
      "Largest and most frequently updated backlink index",
      "Excellent keyword research with accurate difficulty scores",
      "Content Explorer for finding top-performing content in any niche",
      "Intuitive interface with minimal learning curve",
      "Powerful site audit tool with actionable recommendations",
    ],
    cons: [
      "No free plan — pricing starts at $99/month",
      "Limited number of tracked keywords on lower plans",
      "Does not include on-page content optimization features",
      "API access only available on higher-tier plans",
    ],
    useCases: [
      "Analyzing competitor backlink strategies to find link-building opportunities",
      "Performing in-depth keyword research for content planning",
      "Running technical site audits before a website launch or migration",
    ],
  },
  {
    slug: "semrush",
    name: "Semrush",
    tagline: "The all-in-one digital marketing suite for SEO, PPC, and content",
    description:
      "Semrush is a comprehensive digital marketing platform that goes beyond SEO to include PPC, social media, and content marketing tools. It offers robust keyword research, competitive intelligence, site audits, position tracking, and a content marketing toolkit. Semrush is widely adopted by agencies and in-house teams alike.",
    category: "all-in-one",
    tags: ["keyword research", "competitor analysis", "PPC", "content marketing", "site audit", "rank tracking"],
    url: "https://www.semrush.com",
    pricing: "paid",
    featured: true,
    logo: "🟠",
    domain: "semrush.com",
    pros: [
      "All-in-one platform covering SEO, PPC, social, and content",
      "Massive keyword database with 25+ billion keywords",
      "Excellent competitive intelligence and market analysis",
      "Built-in content marketing toolkit with SEO writing assistant",
      "Strong reporting and white-label options for agencies",
    ],
    cons: [
      "Expensive — plans start at $129.95/month",
      "Can feel overwhelming for beginners due to feature density",
      "Backlink database is smaller than Ahrefs",
      "Some advanced features require add-on purchases",
    ],
    useCases: [
      "Running full competitive analysis across SEO and paid search channels",
      "Building and managing a content calendar driven by keyword gaps",
      "Generating white-label SEO reports for agency clients",
    ],
  },
  {
    slug: "moz-pro",
    name: "Moz Pro",
    tagline: "Trusted SEO software with industry-standard Domain Authority metric",
    description:
      "Moz Pro is a well-established SEO toolset known for creating the Domain Authority metric. It provides keyword research, rank tracking, site audits, on-page optimization suggestions, and backlink analysis. Moz is popular among SEO beginners and professionals who value its educational resources and community.",
    category: "all-in-one",
    tags: ["domain authority", "keyword research", "site audit", "rank tracking", "link building", "on-page SEO"],
    url: "https://moz.com/products/pro",
    pricing: "paid",
    featured: true,
    logo: "🟡",
    domain: "moz.com",
    pros: [
      "Industry-standard Domain Authority and Page Authority metrics",
      "Beginner-friendly interface and excellent learning resources",
      "On-page optimization grader provides actionable suggestions",
      "Strong community and widely respected brand in SEO",
    ],
    cons: [
      "Smaller backlink index compared to Ahrefs and Semrush",
      "Keyword data volume is less comprehensive than competitors",
      "Site crawl limits can be restrictive on lower plans",
    ],
    useCases: [
      "Tracking Domain Authority over time to measure link-building progress",
      "Optimizing individual pages using the on-page grader",
      "Learning SEO fundamentals through integrated guides and the Moz community",
    ],
  },
  {
    slug: "se-ranking",
    name: "SE Ranking",
    tagline: "Affordable all-in-one SEO platform for agencies and SMBs",
    description:
      "SE Ranking is a cost-effective SEO platform that offers keyword rank tracking, website auditing, competitor research, backlink monitoring, and on-page SEO analysis. It provides flexible pricing based on the number of keywords tracked and check frequency, making it ideal for small businesses and agencies on a budget.",
    category: "all-in-one",
    tags: ["rank tracking", "site audit", "competitor research", "backlink monitoring", "affordable", "white-label"],
    url: "https://seranking.com",
    pricing: "paid",
    featured: true,
    logo: "🟢",
    domain: "seranking.com",
    pros: [
      "Flexible pricing starting as low as $44/month",
      "Accurate daily rank tracking across search engines",
      "White-label reporting and client management for agencies",
      "Comprehensive site audit with prioritized issue fixing",
      "Built-in social media management and marketing plan features",
    ],
    cons: [
      "Backlink database is less extensive than top-tier tools",
      "Interface can feel cluttered with so many features",
      "Content marketing tools are less developed than Semrush",
    ],
    useCases: [
      "Agencies managing multiple client SEO campaigns on a budget",
      "Small businesses tracking local and national keyword rankings daily",
      "Performing regular site audits and monitoring technical health over time",
    ],
  },
  {
    slug: "screaming-frog",
    name: "Screaming Frog",
    tagline: "The gold-standard desktop crawler for technical SEO audits",
    description:
      "Screaming Frog SEO Spider is a powerful desktop-based website crawler used by SEO professionals worldwide. It crawls websites to identify technical SEO issues such as broken links, duplicate content, redirect chains, missing metadata, and crawl errors. The free version crawls up to 500 URLs, while the paid version is unlimited.",
    category: "technical-seo",
    tags: ["site crawler", "technical audit", "broken links", "metadata", "redirect analysis", "desktop tool"],
    url: "https://www.screamingfrog.co.uk/seo-spider/",
    pricing: "freemium",
    featured: true,
    logo: "🐸",
    domain: "screamingfrog.co.uk",
    pros: [
      "Extremely thorough site crawling with granular configuration",
      "Free version crawls up to 500 URLs — great for small sites",
      "Integrates with Google Analytics, Search Console, and PageSpeed Insights",
      "Customizable extraction and regex-based filtering",
      "Lightweight desktop app with fast crawl speeds",
    ],
    cons: [
      "Desktop-only — no cloud-based collaboration features",
      "Steep learning curve for non-technical users",
      "Large site crawls can consume significant RAM",
      "No built-in keyword research or rank tracking",
    ],
    useCases: [
      "Auditing a website before and after a migration to catch broken URLs and redirects",
      "Finding and fixing duplicate content, thin pages, and missing meta tags",
      "Generating XML sitemaps and visualizing site architecture",
    ],
  },

  // ─── Standard tools (basic data) ──────────────────────────────────
  {
    slug: "ubersuggest",
    name: "Ubersuggest",
    tagline: "Beginner-friendly keyword research and SEO tool by Neil Patel",
    description:
      "Ubersuggest offers keyword suggestions, content ideas, backlink data, and site audit features. It provides a generous free tier and affordable paid plans, making it one of the most accessible entry points into SEO for small businesses and bloggers.",
    category: "keyword-research",
    tags: ["keyword ideas", "content suggestions", "site audit", "beginner-friendly", "affordable", "Neil Patel"],
    url: "https://neilpatel.com/ubersuggest/",
    pricing: "freemium",
    featured: false,
    logo: "🟧",
    domain: "neilpatel.com",
  },
  {
    slug: "mangools",
    name: "Mangools (KWFinder)",
    tagline: "Simple and affordable keyword research tool with beautiful UI",
    description:
      "Mangools is an SEO toolset best known for KWFinder, its intuitive keyword research tool. It also includes SERPChecker, SERPWatcher, LinkMiner, and SiteProfiler. Mangools is designed for freelancers and small teams who want powerful keyword data without the complexity of enterprise tools.",
    category: "keyword-research",
    tags: ["keyword finder", "SERP analysis", "link mining", "affordable", "beginner-friendly", "freelancer"],
    url: "https://mangools.com",
    pricing: "paid",
    featured: false,
    logo: "🥭",
    domain: "mangools.com",
  },
  {
    slug: "surfer-seo",
    name: "Surfer SEO",
    tagline: "Data-driven on-page optimization and content planning tool",
    description:
      "Surfer SEO analyzes top-ranking pages for any keyword and provides data-driven guidelines for optimizing content. It includes a content editor, SERP analyzer, audit tool, and keyword research features. Surfer is widely used by content teams and SEO agencies to create high-ranking content.",
    category: "keyword-research",
    tags: ["content optimization", "on-page SEO", "NLP", "content editor", "SERP analysis", "AI writing"],
    url: "https://surferseo.com",
    pricing: "paid",
    featured: false,
    logo: "🏄",
    domain: "surferseo.com",
  },
  {
    slug: "clearscope",
    name: "Clearscope",
    tagline: "Premium content optimization platform for high-performing SEO content",
    description:
      "Clearscope is an enterprise-grade content optimization tool that uses AI and natural language processing to help writers produce comprehensive, search-optimized content. It integrates with Google Docs and WordPress and is trusted by major brands for scaling content production.",
    category: "keyword-research",
    tags: ["content optimization", "NLP", "enterprise", "Google Docs", "WordPress", "content grading"],
    url: "https://www.clearscope.io",
    pricing: "paid",
    featured: false,
    logo: "🔬",
    domain: "clearscope.io",
  },
  {
    slug: "google-search-console",
    name: "Google Search Console",
    tagline: "Free tool from Google to monitor and troubleshoot search presence",
    description:
      "Google Search Console is a free service from Google that helps website owners monitor, maintain, and troubleshoot their site's presence in Google Search results. It provides data on search queries, indexing status, crawl errors, and Core Web Vitals performance.",
    category: "technical-seo",
    tags: ["free", "Google", "indexing", "search queries", "Core Web Vitals", "crawl errors"],
    url: "https://search.google.com/search-console",
    pricing: "free",
    featured: false,
    logo: "🔍",
    domain: "search.google.com",
  },
  {
    slug: "majestic",
    name: "Majestic",
    tagline: "Specialist backlink analysis tool with Trust Flow and Citation Flow metrics",
    description:
      "Majestic is a dedicated backlink analysis platform known for its proprietary Trust Flow and Citation Flow metrics. It maintains one of the largest link intelligence databases and is used by SEO professionals to evaluate link quality, discover linking opportunities, and monitor backlink profiles.",
    category: "backlink-analysis",
    tags: ["Trust Flow", "Citation Flow", "backlink index", "link intelligence", "link building", "domain analysis"],
    url: "https://majestic.com",
    pricing: "paid",
    featured: false,
    logo: "👑",
    domain: "majestic.com",
  },
  {
    slug: "spyfu",
    name: "SpyFu",
    tagline: "Competitor keyword research tool for SEO and PPC intelligence",
    description:
      "SpyFu specializes in competitive intelligence, letting you see every keyword your competitors rank for organically and every ad they buy on Google Ads. It offers keyword research, backlink analysis, rank tracking, and historical data going back over a decade.",
    category: "keyword-research",
    tags: ["competitor analysis", "PPC intelligence", "keyword history", "ad research", "rank tracking", "backlinks"],
    url: "https://www.spyfu.com",
    pricing: "paid",
    featured: false,
    logo: "🕵️",
    domain: "spyfu.com",
  },
  {
    slug: "serpstat",
    name: "Serpstat",
    tagline: "Growth hacking tool for SEO, PPC, and content marketing",
    description:
      "Serpstat is an all-in-one SEO platform offering keyword research, rank tracking, backlink analysis, site audits, and competitor research. It positions itself as a growth hacking tool with unique features like missing keywords analysis and tree-view keyword clustering.",
    category: "rank-tracking",
    tags: ["keyword clustering", "rank tracking", "site audit", "competitor research", "growth hacking", "PPC"],
    url: "https://serpstat.com",
    pricing: "freemium",
    featured: false,
    logo: "🐍",
    domain: "serpstat.com",
  },
  {
    slug: "brightedge",
    name: "BrightEdge",
    tagline: "Enterprise SEO platform with AI-powered content performance insights",
    description:
      "BrightEdge is an enterprise-level SEO platform that combines search analytics, content optimization, and competitive intelligence. It uses AI and machine learning to provide actionable recommendations and is trusted by Fortune 500 companies for managing SEO at scale.",
    category: "rank-tracking",
    tags: ["enterprise", "AI-powered", "content performance", "Fortune 500", "competitive intelligence", "automation"],
    url: "https://www.brightedge.com",
    pricing: "paid",
    featured: false,
    logo: "💡",
    domain: "brightedge.com",
  },
  {
    slug: "sitebulb",
    name: "Sitebulb",
    tagline: "Visual website auditing tool with prioritized hints and insights",
    description:
      "Sitebulb is a desktop-based website crawler that stands out for its visual reports and prioritized audit hints. It categorizes issues by severity and provides clear explanations, making technical SEO audits more accessible for teams of all experience levels.",
    category: "technical-seo",
    tags: ["site crawler", "visual reports", "audit hints", "technical SEO", "desktop tool", "prioritized issues"],
    url: "https://sitebulb.com",
    pricing: "paid",
    featured: false,
    logo: "💡",
    domain: "sitebulb.com",
  },
];
