export type AnalyticsCategory =
  | "web-analytics"
  | "product-analytics"
  | "bi-dashboards"
  | "customer-data"
  | "seo-analytics";

export interface AnalyticsTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: AnalyticsCategory;
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

export const ANALYTICS_CATEGORIES: Record<
  AnalyticsCategory,
  { label: string; emoji: string; description: string; gradient: string; guide?: string }
> = {
  "web-analytics": {
    label: "Web Analytics",
    emoji: "🌐",
    description: "Track website traffic, user behavior, and conversion metrics.",
    gradient: "from-blue-500 to-cyan-500",
    guide: "Web analytics tools track how visitors find, navigate, and convert on your website, giving you the data to optimize marketing spend and user experience. They are essential for any business with an online presence, from small blogs to large e-commerce stores. Decide whether you need full user-level tracking with cookies or if privacy-friendly aggregate analytics will meet your needs, since cookie consent requirements can block a significant portion of traditional tracking.",
  },
  "product-analytics": {
    label: "Product Analytics",
    emoji: "📱",
    description: "Understand how users engage with your product features and flows.",
    gradient: "from-purple-500 to-violet-500",
    guide: "Product analytics platforms track how users interact with your app or software at the feature level, revealing which flows drive retention, where users drop off, and what behaviors correlate with conversion. They are built for product managers, growth teams, and UX designers who need to make data-driven decisions about what to build and improve. Look for tools with strong event tracking, cohort analysis, funnel visualization, and the ability to segment users by behavior rather than just demographics.",
  },
  "bi-dashboards": {
    label: "BI & Dashboards",
    emoji: "📊",
    description: "Connect data sources and build visualizations and business dashboards.",
    gradient: "from-amber-500 to-orange-500",
    guide: "Business intelligence and dashboard tools connect to your databases, spreadsheets, and SaaS platforms to create interactive visualizations and reports that anyone in your organization can use. They serve analysts, executives, and operations teams who need a unified view of business performance across departments. Evaluate how easily the tool connects to your data stack, whether non-technical users can build their own reports, and how well it handles large datasets without performance degradation.",
  },
  "customer-data": {
    label: "Customer Data Platforms",
    emoji: "🗄️",
    description: "Unify customer data from all sources for targeting and personalization.",
    gradient: "from-green-500 to-teal-500",
    guide: "Customer data platforms (CDPs) unify user data from your website, app, CRM, email, ads, and support tools into a single customer profile that powers personalization and targeting across all channels. They are most valuable for marketing and growth teams at companies with multiple data sources that create fragmented customer views. Assess the platform's integration breadth, identity resolution accuracy, real-time processing speed, and whether it supports the activation destinations your marketing stack requires.",
  },
  "seo-analytics": {
    label: "SEO Analytics",
    emoji: "🔍",
    description: "Track search rankings, keyword performance, and backlink profiles.",
    gradient: "from-rose-500 to-pink-500",
    guide: "SEO analytics tools monitor your search engine rankings, analyze keyword opportunities, audit technical site health, and track your backlink profile relative to competitors. They are indispensable for content marketers, SEO specialists, and agencies managing organic search strategies for multiple domains. Compare the size and freshness of the keyword database, crawl frequency, competitor analysis depth, and whether the tool provides actionable recommendations rather than just raw data.",
  },
};

export const ANALYTICS_EDITORIAL = {
  title: "How to Choose the Right Analytics Tool in 2026",
  intro: `Analytics tools transform raw data into actionable insights about your website traffic, product usage, marketing performance, and business operations. Without them, you're making decisions based on gut feeling rather than evidence — and in competitive markets, that's a recipe for wasted spend and missed opportunities.\n\nThe analytics landscape spans several distinct categories: web analytics tools like Google Analytics and Plausible track visitor behavior on your site, product analytics platforms like Mixpanel and Amplitude reveal how users interact with your app's features, and business intelligence dashboards like Looker and Metabase let you query and visualize data from any source. Many businesses need tools from more than one category.\n\nPrivacy regulations (GDPR, CCPA) have reshaped the market significantly. Cookie-consent requirements can block 30-60% of traditional tracking, which is why privacy-first analytics tools that don't require cookies have surged in popularity. Evaluate whether you need individual user tracking or if aggregate, privacy-friendly metrics are sufficient for your decision-making.`,
  buyerGuide: [
    "Data ownership and privacy compliance — understand where your data is stored, whether the tool requires cookies or consent banners, and how it handles GDPR, CCPA, and other privacy regulations.",
    "Implementation complexity — some tools require just a script tag while others need event tracking code throughout your codebase; factor in engineering time for proper setup and maintenance.",
    "Integration with your data stack — evaluate how the tool connects to your data warehouse, CRM, ad platforms, and other tools in your stack, as siloed analytics create incomplete pictures.",
    "Real-time vs. batch processing — determine whether you need live dashboards updating in seconds or if daily/hourly batch processing meets your needs, as real-time capabilities often cost significantly more.",
    "Self-serve analytics vs. analyst-dependent — consider whether your team can build their own reports and dashboards or if they'll need a data analyst to extract insights, as this affects ongoing operational costs.",
  ],
  faq: [
    {
      question: "Is Google Analytics still the best free option?",
      answer: "Google Analytics 4 remains the most feature-rich free analytics tool, but its learning curve is steep and it raises privacy concerns for European audiences. Privacy-focused alternatives like Plausible and Fathom offer simpler, cookie-free tracking for $9-14/month — often worth it for the cleaner data and GDPR compliance without consent banners.",
    },
    {
      question: "What is the difference between web analytics and product analytics?",
      answer: "Web analytics (Google Analytics, Plausible) tracks page views, traffic sources, and conversion funnels on websites. Product analytics (Mixpanel, Amplitude) tracks specific user actions within applications — button clicks, feature usage, retention cohorts — giving deeper insight into how people use your product.",
    },
    {
      question: "How much data history do I need to retain?",
      answer: "Most businesses need 13-24 months of data to identify seasonal trends and year-over-year comparisons. Enterprise analytics platforms may retain data indefinitely, while some free tools limit history. If long-term analysis is important, verify retention policies before committing.",
    },
  ],
};

export const ANALYTICS_TOOLS: AnalyticsTool[] = [
  {
    slug: "google-analytics-4",
    name: "Google Analytics 4",
    tagline: "The free, industry-standard web analytics platform",
    description:
      "Google Analytics 4 (GA4) is the standard free web analytics platform used by over 50 million websites. It offers event-based tracking, cross-device measurement, predictive analytics, and Google Ads integration. GA4 replaced Universal Analytics in 2023 and is essential knowledge for any digital marketer or web team.",
    category: "web-analytics",
    tags: ["free", "web analytics", "events", "Google Ads", "conversion tracking", "audience", "standard"],
    url: "https://analytics.google.com",
    pricing: "free",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=analytics.google.com&sz=128",
    domain: "analytics.google.com",
    pros: [
      "Free for most sites",
      "Deep Google Ads and Search Console integration",
      "Predictive audiences and insights",
      "Industry standard — universal knowledge",
    ],
    cons: [
      "Complex interface — steep learning curve",
      "Data sampling on free tier",
      "Privacy concerns and GDPR considerations",
    ],
    useCases: ["Website traffic analysis", "Google Ads optimization", "Conversion funnel tracking", "Audience building"],
  },
  {
    slug: "plausible",
    name: "Plausible Analytics",
    tagline: "Privacy-friendly, simple web analytics",
    description:
      "Plausible Analytics is a lightweight, open-source web analytics tool that is privacy-friendly and GDPR-compliant by design. It collects minimal data without cookies, making it a popular choice for privacy-conscious developers, bloggers, and European businesses who want simple traffic insights without compromising user privacy.",
    category: "web-analytics",
    tags: ["privacy-friendly", "GDPR", "no cookies", "open source", "simple", "lightweight", "European"],
    url: "https://plausible.io",
    affiliateUrl: "https://plausible.io?ref=finderslist",
    pricing: "paid",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=plausible.io&sz=128",
    domain: "plausible.io",
    pros: [
      "Privacy-friendly — no cookies needed",
      "GDPR compliant out of the box",
      "Clean, simple dashboard",
      "Lightweight script (< 1KB)",
    ],
    cons: [
      "No free plan (only 30-day trial)",
      "Less deep than GA4 for advanced analysis",
      "No Google Ads integration",
    ],
    useCases: ["Privacy-conscious websites", "European businesses", "Developer blogs", "Open source projects"],
  },
  {
    slug: "fathom-analytics",
    name: "Fathom Analytics",
    tagline: "Simple, privacy-first website analytics",
    description:
      "Fathom Analytics is a privacy-focused web analytics platform that's GDPR, CCPA, and PECR compliant. Like Plausible, it collects no personal data and uses no cookies. It stands out for its fast-loading script, simple pricing, and a strong focus on customer privacy and data sovereignty.",
    category: "web-analytics",
    tags: ["privacy", "GDPR", "CCPA", "no cookies", "simple", "fast", "indie"],
    url: "https://usefathom.com",
    affiliateUrl: "https://usefathom.com?ref=finderslist",
    pricing: "paid",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=usefathom.com&sz=128",
    domain: "usefathom.com",
    pros: [
      "Strong privacy compliance (GDPR, CCPA, PECR)",
      "Ultra-lightweight script",
      "Simple, focused dashboard",
      "Great customer support",
    ],
    cons: [
      "No free plan",
      "Less data detail than GA4",
      "Smaller feature set by design",
    ],
    useCases: ["Privacy-focused websites", "Indie hackers and bootstrappers", "Agencies with GDPR clients"],
  },
  {
    slug: "mixpanel",
    name: "Mixpanel",
    tagline: "Product analytics to help you convert, engage, and retain users",
    description:
      "Mixpanel is one of the most powerful product analytics platforms, designed to help teams understand user behavior at a granular level. It excels at funnel analysis, retention reports, A/B testing, and segmentation. Used by product and growth teams at leading tech companies to make data-driven decisions.",
    category: "product-analytics",
    tags: ["product analytics", "funnels", "retention", "A/B testing", "segmentation", "growth", "SaaS"],
    url: "https://mixpanel.com",
    affiliateUrl: "https://mixpanel.com?ref=finderslist",
    pricing: "freemium",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=mixpanel.com&sz=128",
    domain: "mixpanel.com",
    pros: [
      "Industry-leading funnel and retention analysis",
      "Powerful segmentation",
      "Free tier up to 20M events/month",
      "Strong SQL-based querying (JQL)",
    ],
    cons: [
      "Expensive at scale",
      "Requires good event tracking implementation",
      "Steeper learning curve",
    ],
    useCases: ["SaaS product analytics", "Mobile app analytics", "Growth experiment analysis", "User retention"],
  },
  {
    slug: "amplitude",
    name: "Amplitude",
    tagline: "Digital analytics for product, marketing, and data teams",
    description:
      "Amplitude is a leading digital analytics platform used by thousands of product teams to understand user behavior, measure feature impact, and drive growth. It offers powerful behavioral cohorts, journey maps, experimentation, and a data governance framework. The go-to choice for data-driven product orgs.",
    category: "product-analytics",
    tags: ["product analytics", "behavioral analytics", "experimentation", "cohorts", "journeys", "SaaS", "enterprise"],
    url: "https://amplitude.com",
    pricing: "freemium",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=amplitude.com&sz=128",
    domain: "amplitude.com",
    pros: [
      "Excellent behavioral cohort analysis",
      "Powerful journey and funnel visualization",
      "Built-in experimentation (A/B testing)",
      "Free plan for early-stage products",
    ],
    cons: [
      "Very expensive at enterprise scale",
      "Complex to set up properly",
      "Steep learning curve for analysts",
    ],
    useCases: ["Product-led growth analytics", "Feature impact measurement", "Experimentation programs", "User journeys"],
  },
  {
    slug: "heap",
    name: "Heap",
    tagline: "Automatically capture every user interaction",
    description:
      "Heap is a product analytics platform that automatically captures every user interaction on your site or app — clicks, taps, form submissions, page views — without any manual event instrumentation. Teams can then retroactively analyze any behavior without needing to re-instrument. Acquired by Contentsquare.",
    category: "product-analytics",
    tags: ["autocapture", "retroactive analysis", "product analytics", "no instrumentation", "Contentsquare", "funnels"],
    url: "https://heap.io",
    pricing: "freemium",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=heap.io&sz=128",
    domain: "heap.io",
    pros: [
      "Autocapture — no manual event tracking",
      "Retroactive analysis of any behavior",
      "Strong funnel analysis",
      "Good for early-stage products",
    ],
    cons: [
      "Expensive at scale",
      "Large data volumes can slow queries",
      "Less powerful segmentation than Amplitude",
    ],
    useCases: ["Product teams without engineering bandwidth", "Retroactive behavior analysis", "SaaS analytics"],
  },
  {
    slug: "posthog",
    name: "PostHog",
    tagline: "The open-source product analytics suite",
    description:
      "PostHog is an open-source product analytics suite that combines analytics, session recording, feature flags, A/B testing, and surveys in one platform. It can be self-hosted for complete data control, or used as a cloud product. Extremely popular with engineering-led startups who want all analytics in one open-source tool.",
    category: "product-analytics",
    tags: ["open source", "product analytics", "session recording", "feature flags", "A/B testing", "self-hosted"],
    url: "https://posthog.com",
    pricing: "freemium",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=posthog.com&sz=128",
    domain: "posthog.com",
    pros: [
      "Open source and self-hostable",
      "All-in-one: analytics, recordings, flags, A/B tests",
      "Generous free cloud tier",
      "Engineering-friendly",
    ],
    cons: [
      "Self-hosting requires infrastructure management",
      "UI is less polished than Amplitude",
      "Some features still maturing",
    ],
    useCases: ["Engineering-led startups", "Privacy-conscious product teams", "Open source projects"],
  },
  {
    slug: "tableau",
    name: "Tableau",
    tagline: "The industry-leading visual analytics platform",
    description:
      "Tableau is the world's most widely used business intelligence and data visualization platform. It connects to hundreds of data sources and lets analysts create interactive dashboards and reports without SQL or programming. Used by enterprises worldwide for self-service analytics and executive reporting.",
    category: "bi-dashboards",
    tags: ["business intelligence", "data visualization", "dashboards", "enterprise", "self-service", "Salesforce"],
    url: "https://tableau.com",
    affiliateUrl: "https://tableau.com?ref=finderslist",
    pricing: "paid",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=tableau.com&sz=128",
    domain: "tableau.com",
    pros: [
      "Most powerful data visualization",
      "Connects to 100+ data sources",
      "Excellent for executive dashboards",
      "Strong community and resource library",
    ],
    cons: [
      "Expensive ($70+/user/month)",
      "Steep learning curve",
      "Best value with Salesforce ecosystem",
    ],
    useCases: ["Enterprise BI", "Executive dashboards", "Self-service analytics for analysts", "Sales reporting"],
  },
  {
    slug: "looker",
    name: "Looker",
    tagline: "Enterprise data platform by Google Cloud",
    description:
      "Looker is a modern business intelligence and data exploration platform that uses LookML (a modeling language) to define data metrics consistently across the organization. Part of Google Cloud, it excels at governed analytics — ensuring every team uses the same definitions and calculations from a central data model.",
    category: "bi-dashboards",
    tags: ["business intelligence", "LookML", "data modeling", "Google Cloud", "governed analytics", "enterprise"],
    url: "https://looker.com",
    pricing: "paid",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=looker.com&sz=128",
    domain: "looker.com",
    pros: [
      "Excellent governed analytics with LookML",
      "Strong embedding capabilities",
      "Part of Google Cloud ecosystem",
      "API-first design",
    ],
    cons: [
      "Very expensive",
      "LookML requires technical expertise",
      "Slower query performance than some competitors",
    ],
    useCases: ["Enterprise data teams", "Embedded analytics products", "Single source of truth for metrics"],
  },
  {
    slug: "power-bi",
    name: "Microsoft Power BI",
    tagline: "Business analytics from Microsoft",
    description:
      "Power BI is Microsoft's business intelligence platform, deeply integrated into the Microsoft 365 ecosystem. It allows anyone to connect data, create beautiful dashboards, and share insights across the organization. The most affordable enterprise BI option when using Microsoft tools.",
    category: "bi-dashboards",
    tags: ["Microsoft", "business intelligence", "dashboards", "Excel", "Azure", "affordable", "Office 365"],
    url: "https://powerbi.microsoft.com",
    pricing: "freemium",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=microsoft.com&sz=128",
    domain: "microsoft.com",
    pros: [
      "Best Microsoft ecosystem integration",
      "Affordable ($10/user/month for Pro)",
      "Powerful with Azure and Excel",
      "Free desktop version available",
    ],
    cons: [
      "Sharing requires paid licenses",
      "Steeper curve for non-Microsoft users",
      "Performance can lag with large datasets",
    ],
    useCases: ["Microsoft-heavy organizations", "Excel-to-dashboard migration", "Affordable enterprise BI"],
  },
  {
    slug: "metabase",
    name: "Metabase",
    tagline: "Open-source business intelligence for everyone",
    description:
      "Metabase is an open-source BI tool that makes data exploration accessible to non-technical users. It features a visual query builder that requires no SQL, beautiful dashboards, and a self-service model where anyone in the company can answer data questions. Can be self-hosted or used as a cloud service.",
    category: "bi-dashboards",
    tags: ["open source", "self-hosted", "no-SQL query", "dashboards", "self-service", "affordable", "SMB"],
    url: "https://metabase.com",
    pricing: "freemium",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=metabase.com&sz=128",
    domain: "metabase.com",
    pros: [
      "Free to self-host",
      "Non-technical users can query data",
      "Clean, simple dashboard interface",
      "Good embedding support",
    ],
    cons: [
      "Less powerful than Tableau or Looker",
      "Advanced features require Pro plan",
      "Self-hosting requires infrastructure",
    ],
    useCases: ["Startup data teams", "Non-technical self-service analytics", "Budget BI for SMBs"],
  },
  {
    slug: "segment",
    name: "Segment (Twilio Segment)",
    tagline: "The leading customer data platform",
    description:
      "Segment is the world's leading Customer Data Platform (CDP), used by thousands of companies to collect, clean, and route customer data to any destination. It acts as a data pipeline hub — collect once, send everywhere. Acquired by Twilio, it's the standard way to manage data infrastructure for modern growth teams.",
    category: "customer-data",
    tags: ["CDP", "data pipeline", "customer data", "integrations", "events", "Twilio", "identity resolution"],
    url: "https://segment.com",
    pricing: "freemium",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=segment.com&sz=128",
    domain: "segment.com",
    pros: [
      "Collect once, send to 400+ destinations",
      "Cleans and unifies customer identities",
      "Industry standard for data infrastructure",
      "Free tier for small teams",
    ],
    cons: [
      "Expensive at scale",
      "Can have data latency",
      "Complex to implement properly",
    ],
    useCases: ["Customer data unification", "Marketing tech stack integration", "Data warehouse feeding", "Privacy compliance"],
  },
  {
    slug: "rudderstack",
    name: "RudderStack",
    tagline: "Open-source customer data platform",
    description:
      "RudderStack is an open-source, developer-first Customer Data Platform that competes with Segment. It allows teams to collect event data from any source and route it to any destination. Popular with engineering teams who want Segment's capabilities without the price tag and with more control over their data.",
    category: "customer-data",
    tags: ["open source", "CDP", "data pipeline", "Segment alternative", "developer-first", "affordable", "self-hosted"],
    url: "https://rudderstack.com",
    pricing: "freemium",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=rudderstack.com&sz=128",
    domain: "rudderstack.com",
    pros: [
      "Open source and self-hostable",
      "Much more affordable than Segment",
      "Strong developer tools",
      "Growing destination library",
    ],
    cons: [
      "Less mature than Segment",
      "Smaller ecosystem",
      "Self-hosting adds operational overhead",
    ],
    useCases: ["Cost-conscious data teams", "Engineering-first organizations", "Segment migration"],
  },
  {
    slug: "semrush",
    name: "Semrush",
    tagline: "The all-in-one SEO and marketing analytics platform",
    description:
      "Semrush is the most comprehensive SEO analytics platform, offering keyword research, rank tracking, backlink analysis, site audits, competitive intelligence, and content marketing tools in one platform. Used by over 10 million marketing professionals, it's the go-to platform for SEO agencies and in-house SEO teams.",
    category: "seo-analytics",
    tags: ["SEO", "keyword research", "rank tracking", "backlinks", "competitive intelligence", "site audit", "content"],
    url: "https://semrush.com",
    affiliateUrl: "https://semrush.com?ref=finderslist",
    pricing: "freemium",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=semrush.com&sz=128",
    domain: "semrush.com",
    pros: [
      "Most comprehensive SEO toolset",
      "Best competitive intelligence data",
      "Content marketing and PPC tools",
      "Free tier available",
    ],
    cons: [
      "Expensive ($129+/month)",
      "Overwhelming for beginners",
      "Some data can be inaccurate",
    ],
    useCases: ["SEO agency workflows", "Keyword and competitor research", "Rank tracking at scale", "Content strategy"],
  },
  {
    slug: "ahrefs",
    name: "Ahrefs",
    tagline: "SEO tools and resources to grow your search traffic",
    description:
      "Ahrefs is arguably the most trusted SEO tool for backlink analysis, with the industry's largest live backlink index. It also offers best-in-class keyword research, rank tracking, content explorer, and site audit tools. Preferred by many SEO professionals over Semrush for its backlink data accuracy and research features.",
    category: "seo-analytics",
    tags: ["SEO", "backlink analysis", "keyword research", "rank tracking", "content explorer", "site audit"],
    url: "https://ahrefs.com",
    affiliateUrl: "https://ahrefs.com?ref=finderslist",
    pricing: "paid",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=ahrefs.com&sz=128",
    domain: "ahrefs.com",
    pros: [
      "Best backlink data in the industry",
      "Excellent keyword research tool",
      "Content Explorer for content ideation",
      "Trusted by top SEO professionals",
    ],
    cons: [
      "Expensive ($99+/month)",
      "No free plan (only limited free tools)",
      "Less PPC/social data than Semrush",
    ],
    useCases: ["Backlink analysis", "Link building campaigns", "Competitor content research", "Technical SEO audits"],
  },
  {
    slug: "google-search-console",
    name: "Google Search Console",
    tagline: "Free tools to measure your search performance",
    description:
      "Google Search Console is a free tool from Google that shows how your site performs in Google Search — which queries bring visitors, what pages rank, how many impressions and clicks you get, and any indexing or technical issues. Essential for any SEO practitioner working on organic search performance.",
    category: "seo-analytics",
    tags: ["free", "Google", "SEO", "impressions", "clicks", "indexing", "technical SEO", "search performance"],
    url: "https://search.google.com/search-console",
    pricing: "free",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=google.com&sz=128",
    domain: "google.com",
    pros: [
      "Free and authoritative Google data",
      "Shows actual search queries driving traffic",
      "Indexing status and coverage reports",
      "Core Web Vitals monitoring",
    ],
    cons: [
      "Data limited to 16 months",
      "Queries limited to 1,000 rows by default",
      "No competitor data",
    ],
    useCases: ["Organic search monitoring", "Indexing issue diagnosis", "Search query analysis", "Core Web Vitals"],
  },
  {
    slug: "moz-pro",
    name: "Moz Pro",
    tagline: "SEO software for smarter marketing decisions",
    description:
      "Moz Pro is a comprehensive SEO platform that pioneered many SEO metrics including Domain Authority (DA) and Page Authority (PA). It offers keyword research, rank tracking, link building, and site audits. While less comprehensive than Semrush or Ahrefs, it's respected for its reliability and educational resources.",
    category: "seo-analytics",
    tags: ["SEO", "Domain Authority", "keyword research", "rank tracking", "link building", "site audit"],
    url: "https://moz.com",
    pricing: "freemium",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=moz.com&sz=128",
    domain: "moz.com",
    pros: [
      "Pioneer of Domain Authority metric",
      "Strong educational resources (Moz Academy)",
      "Clean, easy-to-use interface",
      "Free MozBar Chrome extension",
    ],
    cons: [
      "Less data than Semrush or Ahrefs",
      "Rank tracking is slower to update",
      "Expensive relative to data volume",
    ],
    useCases: ["SEO education and learning", "Domain Authority tracking", "Smaller agencies and consultants"],
  },
  {
    slug: "looker-studio",
    name: "Looker Studio",
    tagline: "Free data visualization and reporting from Google",
    description:
      "Looker Studio (formerly Google Data Studio) is Google's free data visualization tool that connects to Google Analytics, Google Ads, Search Console, BigQuery, and 800+ other connectors. It's the most popular free option for building marketing dashboards and client reports.",
    category: "bi-dashboards",
    tags: ["free", "Google", "dashboards", "data visualization", "Google Analytics", "reports", "marketing"],
    url: "https://lookerstudio.google.com",
    pricing: "free",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=google.com&sz=128",
    domain: "google.com",
    pros: [
      "Completely free",
      "Native Google product integrations",
      "800+ data connectors",
      "Good for client-facing reports",
    ],
    cons: [
      "Limited compared to paid BI tools",
      "Slow with large datasets",
      "Some connectors require paid third-party subscriptions",
    ],
    useCases: ["Marketing agency reports", "Google Analytics dashboards", "Free BI for small teams"],
  },
  {
    slug: "hotjar",
    name: "Hotjar",
    tagline: "Understand how users behave on your site",
    description:
      "Hotjar is a behavior analytics platform that complements web analytics with visual tools: heatmaps, session recordings, and feedback surveys. It helps teams understand not just what users do, but why — by showing where they click, how far they scroll, and where they drop off. Essential for CRO and UX research.",
    category: "web-analytics",
    tags: ["heatmaps", "session recording", "user behavior", "CRO", "UX research", "surveys", "feedback"],
    url: "https://hotjar.com",
    affiliateUrl: "https://hotjar.com?ref=finderslist",
    pricing: "freemium",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=hotjar.com&sz=128",
    domain: "hotjar.com",
    pros: [
      "Best heatmap and session recording UX",
      "Generous free plan",
      "Easy to set up",
      "Combines analytics with user feedback",
    ],
    cons: [
      "Not a replacement for full analytics platform",
      "Recording storage is limited on free plan",
      "Privacy considerations for session recording",
    ],
    useCases: ["CRO (conversion rate optimization)", "UX research", "Landing page optimization", "Sales page analysis"],
  },
];
