export type HRISCategory =
  | "hris-platform"
  | "workforce-management"
  | "people-analytics"
  | "onboarding"
  | "compliance-hr";

export interface HRISTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: HRISCategory;
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

export const HRIS_CATEGORIES: Record<
  HRISCategory,
  { label: string; emoji: string; description: string; gradient: string }
> = {
  "hris-platform": {
    label: "HRIS Platforms",
    emoji: "👥",
    description:
      "Core human resource information systems that serve as the central employee database for managing people data, org charts, PTO, and HR workflows.",
    gradient: "from-violet-500 to-violet-700",
  },
  "workforce-management": {
    label: "Workforce Management",
    emoji: "📅",
    description:
      "Tools for managing workforce planning, scheduling, time tracking, and labor optimization across teams and locations.",
    gradient: "from-violet-600 to-violet-800",
  },
  "people-analytics": {
    label: "People Analytics",
    emoji: "📊",
    description:
      "Platforms focused on employee engagement, performance management, and organizational analytics to help leaders make data-driven people decisions.",
    gradient: "from-violet-400 to-violet-600",
  },
  onboarding: {
    label: "Employee Onboarding",
    emoji: "🎉",
    description:
      "Solutions designed to streamline the new hire experience from offer acceptance through the first months, including document collection, training, and cultural immersion.",
    gradient: "from-violet-500 to-violet-600",
  },
  "compliance-hr": {
    label: "HR Compliance",
    emoji: "⚖️",
    description:
      "Tools and platforms that help organizations maintain compliance with employment laws, regulations, and workplace safety requirements.",
    gradient: "from-violet-300 to-violet-500",
  },
};

export const HRIS_TOOLS: HRISTool[] = [
  {
    slug: "bamboohr",
    name: "BambooHR",
    tagline:
      "The most popular HRIS for small and midsize businesses, known for its intuitive interface and employee-friendly experience.",
    description:
      "BambooHR has become synonymous with small business HR for good reason. The platform provides a clean, intuitive central employee database with self-service capabilities that employees actually enjoy using. Core features include employee records, PTO tracking, org charts, reporting, and an onboarding module that helps new hires feel welcome before day one. The performance management module covers reviews, goals, and employee satisfaction surveys. BambooHR's applicant tracking system is built in, eliminating the need for a separate recruiting tool for many companies. The mobile app is well-designed for both employees and managers. Where BambooHR falls short is in depth and scalability. Payroll is available but is a newer addition that is less mature than dedicated payroll providers. Benefits administration is basic, and the platform lacks the advanced workforce planning and analytics that larger organizations need. Pricing is per-employee and can feel expensive relative to the feature set once you compare module-by-module. The reporting engine, while improved, is less flexible than competitors like Rippling. BambooHR works best for companies with 25-500 employees that want a straightforward, employee-friendly HRIS without the complexity of enterprise platforms.",
    category: "hris-platform",
    tags: [
      "HRIS",
      "small business",
      "employee database",
      "PTO tracking",
      "onboarding",
      "performance management",
      "ATS",
    ],
    url: "https://www.bamboohr.com",
    affiliateUrl: "https://www.bamboohr.com/partners/",
    pricing: "paid",
    featured: true,
    logo: "/logos/bamboohr.svg",
    domain: "bamboohr.com",
    pros: [
      "Exceptionally intuitive interface that employees and HR teams both enjoy using",
      "Built-in ATS, onboarding, and performance management in one platform",
      "Strong PTO tracking and time-off management workflows",
      "Clean mobile app for employees and managers",
      "Excellent onboarding experience with pre-boarding capabilities",
    ],
    cons: [
      "Payroll module is newer and less mature than dedicated providers",
      "Reporting is less flexible and powerful than some competitors",
      "Benefits administration features are relatively basic",
      "Can feel expensive on a per-employee basis for the feature depth offered",
    ],
    useCases: [
      "Small and midsize businesses with 25-500 employees wanting an all-in-one HRIS",
      "Companies prioritizing employee experience and self-service capabilities",
      "Organizations looking to replace spreadsheets and manual HR processes",
      "Businesses wanting built-in recruiting and onboarding without separate tools",
    ],
  },
  {
    slug: "rippling",
    name: "Rippling",
    tagline:
      "Unified workforce platform connecting HR, IT, and finance with a powerful employee graph and automation engine.",
    description:
      "Rippling takes a fundamentally different approach to HRIS by building HR as one module within a unified workforce management platform that also covers IT device management, app provisioning, and finance. The employee graph architecture means every system understands your organizational data, enabling powerful automations. When someone joins, changes roles, or leaves, Rippling can automatically trigger actions across HR, payroll, benefits, IT, and finance. The HRIS module itself is comprehensive with employee records, org charts, workflow approvals, document management, and a customizable reporting engine that is among the best in class. The modular pricing model is both a strength and a weakness. You can start with just HR and add modules as needed, but the full platform cost adds up quickly. Individual HR modules may be less specialized than best-of-breed alternatives since Rippling prioritizes breadth over maximum depth in any single area. The platform's power also means a steeper learning curve for HR administrators who need to configure complex automations. Customer support has received mixed reviews, particularly for smaller accounts.",
    category: "hris-platform",
    tags: [
      "HRIS",
      "unified platform",
      "automation",
      "IT management",
      "workforce platform",
      "employee graph",
      "modular",
    ],
    url: "https://www.rippling.com",
    affiliateUrl: "https://www.rippling.com/partners",
    pricing: "paid",
    featured: true,
    logo: "/logos/rippling.svg",
    domain: "rippling.com",
    pros: [
      "Unified platform connecting HR, IT, and finance eliminates data silos",
      "Powerful automation engine that triggers cross-system workflows",
      "Highly customizable reporting and analytics engine",
      "Modular pricing lets you start small and expand",
      "Modern interface that handles complexity without feeling overwhelming",
    ],
    cons: [
      "Full platform cost is significant when you add multiple modules",
      "Individual modules may lack depth compared to specialized competitors",
      "Steeper learning curve for administrators configuring advanced automations",
      "Customer support quality can be inconsistent for smaller accounts",
    ],
    useCases: [
      "Tech companies wanting unified HR and IT management in one platform",
      "Organizations that value automation and want to eliminate manual cross-system processes",
      "Growing companies looking for a platform that scales from 10 to 1000+ employees",
      "Businesses tired of managing separate HR, payroll, benefits, and IT tools",
    ],
  },
  {
    slug: "workday",
    name: "Workday",
    tagline:
      "Enterprise-grade HCM and finance platform used by the world's largest organizations for unified people and financial management.",
    description:
      "Workday is the gold standard for enterprise human capital management, used by many of the world's largest organizations including a significant portion of the Fortune 500. The platform provides a unified system for HR, payroll, talent management, learning, workforce planning, and financial management. Workday's architecture is built for scale, handling complex organizational structures with multi-country, multi-currency, and multi-language support. The analytics and machine learning capabilities provide insights into workforce trends, attrition risk, and talent gaps. However, Workday is expensive, with implementations often costing millions and taking 6-18 months. The platform is overkill for most companies under 1,000 employees, and the complexity requires dedicated administrators. Customization is possible but constrained compared to older on-premise systems, which can frustrate organizations with highly unique processes. Despite these drawbacks, Workday's comprehensive capabilities and continuous innovation make it the platform of choice for large enterprises.",
    category: "hris-platform",
    tags: [
      "enterprise HCM",
      "HR",
      "talent management",
      "workforce planning",
      "financial management",
      "analytics",
      "Fortune 500",
    ],
    url: "https://www.workday.com",
    pricing: "paid",
    featured: true,
    logo: "/logos/workday.svg",
    domain: "workday.com",
    pros: [
      "Comprehensive enterprise HCM covering HR, payroll, talent, and finance",
      "Built for global scale with multi-country and multi-currency support",
      "Advanced analytics and machine learning for workforce insights",
      "Continuous platform updates delivered automatically to all customers",
      "Strong security and compliance framework for regulated industries",
    ],
    cons: [
      "Extremely expensive with implementations often in the millions",
      "Implementation timelines of 6-18 months are common",
      "Overkill for organizations under 1,000 employees",
      "Customization options are more constrained than legacy on-premise systems",
    ],
    useCases: [
      "Large enterprises needing unified HCM and financial management",
      "Global organizations managing employees across many countries",
      "Fortune 500 companies requiring enterprise-grade security and compliance",
      "Organizations with 1,000+ employees outgrowing mid-market HRIS platforms",
    ],
  },
  {
    slug: "adp-workforce-now",
    name: "ADP Workforce Now",
    tagline:
      "Comprehensive HCM suite from ADP for midsize businesses covering payroll, HR, talent, and benefits in one platform.",
    description:
      "ADP Workforce Now is ADP's mid-market HCM platform, targeting businesses with 50 to 999 employees. The platform bundles payroll, HR management, benefits administration, talent management, and time and attendance into a unified suite. ADP's payroll processing is rock-solid with decades of expertise, and the compliance engine stays current with regulatory changes automatically. The data and benchmarking capabilities draw on ADP's massive dataset of payroll and workforce information. The integration marketplace covers hundreds of partners. The weaknesses mirror ADP's broader challenges: the interface is functional but not modern, the user experience trails newer competitors like Rippling and BambooHR, and pricing is opaque with frequent add-on costs. Implementation can be lengthy, and support quality depends heavily on your assigned representative. The platform works well if you value stability, compliance, and payroll expertise over cutting-edge UX and innovation.",
    category: "hris-platform",
    tags: [
      "HCM",
      "payroll",
      "midsize business",
      "ADP",
      "benefits",
      "talent management",
      "compliance",
    ],
    url: "https://www.adp.com/what-we-offer/products/adp-workforce-now.aspx",
    pricing: "paid",
    featured: true,
    logo: "/logos/adp.svg",
    domain: "adp.com",
    pros: [
      "Rock-solid payroll processing backed by decades of ADP expertise",
      "Comprehensive HCM covering payroll, HR, benefits, talent, and time",
      "Workforce benchmarking data drawn from ADP's massive employer dataset",
      "Automatic compliance updates for regulatory changes",
      "Large integration marketplace with hundreds of partners",
    ],
    cons: [
      "User interface feels dated compared to modern HRIS platforms",
      "Pricing is opaque with many features as paid add-ons",
      "Implementation timelines can be lengthy",
      "Support quality varies significantly by assigned representative",
    ],
    useCases: [
      "Midsize businesses with 50-999 employees needing a comprehensive HCM platform",
      "Companies that prioritize payroll reliability and compliance over modern UX",
      "Organizations wanting workforce benchmarking data for strategic planning",
      "Businesses upgrading from ADP Run as they scale past 50 employees",
    ],
  },
  {
    slug: "ukg",
    name: "UKG",
    tagline:
      "Workforce management and HCM suite formed from the merger of Ultimate Software and Kronos, strong in time and labor management.",
    description:
      "UKG (Ultimate Kronos Group) was formed from the merger of Ultimate Software and Kronos, combining strong HCM capabilities with industry-leading workforce management. UKG Pro handles core HR, payroll, talent management, and reporting for the enterprise market, while UKG Ready targets midsize businesses. The workforce management heritage means UKG excels at time tracking, scheduling, and labor compliance for industries with complex shift-based workforces. The platform is comprehensive but the merger integration is still ongoing in some areas, meaning the product experience can feel disjointed between modules that originated from different companies. Enterprise pricing and lengthy implementation timelines are standard. Best suited for organizations where workforce management and labor compliance are top priorities.",
    category: "workforce-management",
    tags: [
      "HCM",
      "workforce management",
      "time tracking",
      "scheduling",
      "payroll",
      "enterprise",
      "labor compliance",
    ],
    url: "https://www.ukg.com",
    pricing: "paid",
    featured: false,
    logo: "/logos/ukg.svg",
    domain: "ukg.com",
  },
  {
    slug: "namely",
    name: "Namely",
    tagline:
      "Mid-market HRIS that aims to give midsize companies the same quality of HR experience that employees at large companies expect.",
    description:
      "Namely targets midsize businesses with 50-1,000 employees, offering core HR, payroll, benefits administration, talent management, and time tracking in one platform. The employee experience is clean with a social-media-inspired company feed and self-service capabilities. Benefits administration is a relative strength, with a built-in benefits broker model. Namely has gone through periods of operational challenges and leadership changes, which have affected product development velocity and customer satisfaction. The platform covers the fundamentals well but lacks the innovation and depth of competitors like Rippling or BambooHR in specific areas. Payroll has historically been a weak point with reliability issues reported by some customers. Best for midsize companies wanting a unified mid-market HRIS with strong benefits support.",
    category: "hris-platform",
    tags: [
      "HRIS",
      "midsize business",
      "benefits administration",
      "payroll",
      "talent management",
      "employee experience",
      "self-service",
    ],
    url: "https://www.namely.com",
    affiliateUrl: "https://www.namely.com/partners",
    pricing: "paid",
    featured: false,
    logo: "/logos/namely.svg",
    domain: "namely.com",
  },
  {
    slug: "gusto",
    name: "Gusto",
    tagline:
      "People platform combining payroll, benefits, and HR tools for small businesses that want a modern employee experience.",
    description:
      "Gusto has evolved from a payroll provider into a broader people platform, and its HRIS capabilities have expanded significantly. Employee records, org charts, document management, PTO tracking, and onboarding workflows are all included alongside payroll and benefits. The employee self-service experience is excellent, with a clean interface that makes tasks like updating personal info, viewing pay stubs, and enrolling in benefits straightforward. Gusto's strengths remain strongest in payroll and benefits, where it is genuinely excellent for small businesses. The HRIS features are growing but still lighter than BambooHR or Rippling in areas like reporting, workflow customization, and performance management. Best for small businesses under 100 employees that want payroll and HR in one affordable platform.",
    category: "hris-platform",
    tags: [
      "HRIS",
      "payroll",
      "benefits",
      "small business",
      "onboarding",
      "PTO tracking",
      "employee experience",
    ],
    url: "https://gusto.com",
    affiliateUrl: "https://gusto.com/partner",
    pricing: "freemium",
    featured: false,
    logo: "/logos/gusto.svg",
    domain: "gusto.com",
  },
  {
    slug: "paylocity",
    name: "Paylocity",
    tagline:
      "Cloud HCM platform with modern social collaboration features and on-demand pay for the mid-market.",
    description:
      "Paylocity offers a cloud-based HCM suite for midsize businesses with a notable focus on employee engagement through its Community social collaboration feature. The platform covers core HR, payroll, benefits, talent management, learning management, and time tracking. The on-demand pay feature letting employees access earned wages early is increasingly popular. The mobile app is well-designed and the overall employee experience is modern. Paylocity's breadth is its strength, but some individual modules lack the depth of specialized tools. Pricing requires a sales conversation and can be higher than expected. Implementation timelines are moderate, and the learning curve for administrators using advanced features is significant. Best for midsize companies wanting a single platform with strong engagement features.",
    category: "hris-platform",
    tags: [
      "HCM",
      "payroll",
      "social collaboration",
      "on-demand pay",
      "midsize business",
      "engagement",
      "cloud",
    ],
    url: "https://www.paylocity.com",
    pricing: "paid",
    featured: false,
    logo: "/logos/paylocity.svg",
    domain: "paylocity.com",
  },
  {
    slug: "paycor",
    name: "Paycor",
    tagline:
      "Unified HCM with strong analytics, talent management, and recruiting for midsize organizations.",
    description:
      "Paycor provides a unified HCM platform covering core HR, payroll, talent acquisition, talent management, workforce management, and benefits. The analytics and reporting capabilities are a genuine differentiator, with benchmarking data and predictive insights that help HR leaders make data-driven decisions. The recruiting module uses AI to source candidates and the talent management features cover performance, learning, and career development. Paycor targets the midsize market and offers enough depth for companies with 50-2,500 employees. The platform can feel complex for smaller organizations, and some users report inconsistent support experiences. Pricing is competitive for the breadth of features but requires a demo to get a quote.",
    category: "hris-platform",
    tags: [
      "HCM",
      "analytics",
      "talent management",
      "recruiting",
      "payroll",
      "midsize business",
      "AI sourcing",
    ],
    url: "https://www.paycor.com",
    pricing: "paid",
    featured: false,
    logo: "/logos/paycor.svg",
    domain: "paycor.com",
  },
  {
    slug: "personio",
    name: "Personio",
    tagline:
      "European HRIS and people operations platform designed for small to midsize businesses across the EU.",
    description:
      "Personio is the leading HRIS for small to midsize businesses in Europe, with strong localization for German, UK, and EU labor markets. The platform covers core HR, recruiting, payroll preparation, absence management, and performance tracking. Personio understands European HR complexity including works councils, GDPR compliance, and country-specific employment regulations. The interface is clean and the workflow builder handles common HR processes well. The platform has expanded beyond its German roots but remains strongest in European markets. International companies with primarily US-based teams will find US-focused competitors more suitable. Some advanced features like learning management and detailed analytics require higher-tier plans.",
    category: "hris-platform",
    tags: [
      "HRIS",
      "European HR",
      "GDPR",
      "recruiting",
      "payroll prep",
      "SMB",
      "absence management",
    ],
    url: "https://www.personio.com",
    pricing: "paid",
    featured: false,
    logo: "/logos/personio.svg",
    domain: "personio.com",
  },
  {
    slug: "hibob",
    name: "HiBob",
    tagline:
      "Modern HRIS built for dynamic, mid-sized companies with a focus on culture, engagement, and global workforce management.",
    description:
      "HiBob (Bob) positions itself as the modern HRIS for mid-sized companies that care about culture and employee experience. The platform combines core HR, time and attendance, compensation management, and performance reviews with social features like kudos, surveys, and a culture-forward homepage. The global capabilities support multi-country workforces with localized settings. Bob's visual org chart, headcount planning, and people analytics are well-designed. The platform is growing quickly but is still maturing in some areas like payroll integrations and advanced reporting. Pricing is on the premium side for mid-market HRIS tools, and some customers report that certain features are less deep than the marketing suggests. Best for culture-conscious companies with 100-2,000 employees.",
    category: "people-analytics",
    tags: [
      "HRIS",
      "culture",
      "engagement",
      "global HR",
      "compensation management",
      "people analytics",
      "modern",
    ],
    url: "https://www.hibob.com",
    affiliateUrl: "https://www.hibob.com/partners/",
    pricing: "paid",
    featured: false,
    logo: "/logos/hibob.svg",
    domain: "hibob.com",
  },
  {
    slug: "lattice",
    name: "Lattice",
    tagline:
      "People management platform combining performance reviews, engagement surveys, OKRs, and compensation in one system.",
    description:
      "Lattice is a leading people management platform focused on performance, engagement, and growth. The platform covers performance reviews, continuous feedback, one-on-ones, OKRs and goals, engagement surveys, and compensation management. Lattice's strength is making performance management continuous rather than annual, with tools that integrate into the daily workflow. The analytics provide meaningful insights into team engagement and performance trends. The HRIS module is newer and more basic than BambooHR or Rippling, but it is adequate for core employee records. Lattice works best as a complement to a core HRIS or as a primary platform for companies that prioritize performance and engagement over administrative HR. Pricing is per-module, and the full suite can be expensive.",
    category: "people-analytics",
    tags: [
      "performance management",
      "engagement",
      "OKRs",
      "compensation",
      "feedback",
      "people management",
      "reviews",
    ],
    url: "https://lattice.com",
    affiliateUrl: "https://lattice.com/partners",
    pricing: "paid",
    featured: false,
    logo: "/logos/lattice.svg",
    domain: "lattice.com",
  },
  {
    slug: "leapsome",
    name: "Leapsome",
    tagline:
      "People enablement platform for performance management, employee engagement, learning, and compensation.",
    description:
      "Leapsome offers an integrated people enablement platform covering performance reviews, goals and OKRs, engagement surveys, learning paths, compensation management, and meeting frameworks. The platform emphasizes continuous development with features like 360-degree feedback, competency frameworks, and personalized learning paths. Leapsome has particular strength in the European market with good GDPR compliance and multi-language support. The analytics surface actionable insights from engagement and performance data. The platform competes with Lattice and Culture Amp, differentiating through its learning and development module. Individual modules may not match the depth of specialized tools, and the breadth of features can be overwhelming for smaller teams. Pricing is competitive on a per-module basis.",
    category: "people-analytics",
    tags: [
      "performance management",
      "engagement",
      "learning",
      "compensation",
      "OKRs",
      "people enablement",
      "development",
    ],
    url: "https://www.leapsome.com",
    affiliateUrl: "https://www.leapsome.com/partners",
    pricing: "paid",
    featured: false,
    logo: "/logos/leapsome.svg",
    domain: "leapsome.com",
  },
  {
    slug: "culture-amp",
    name: "Culture Amp",
    tagline:
      "Employee experience platform with industry-leading engagement surveys, performance tools, and people science.",
    description:
      "Culture Amp is widely regarded as having the strongest employee engagement survey capabilities on the market. The platform combines engagement surveys, performance management, and development tools backed by a team of organizational psychologists (People Scientists) who provide benchmarking data and best-practice frameworks. Survey design is flexible and analytics are deep, with heat maps, driver analysis, and action planning tools. Performance reviews and goal tracking are solid if less innovative than the engagement side. Culture Amp is primarily a performance and engagement tool rather than a full HRIS, so you will need it alongside a core HR system. Pricing is premium, and the value proposition depends heavily on how much your organization invests in acting on survey insights.",
    category: "people-analytics",
    tags: [
      "engagement surveys",
      "employee experience",
      "performance management",
      "people science",
      "analytics",
      "culture",
      "benchmarking",
    ],
    url: "https://www.cultureamp.com",
    pricing: "paid",
    featured: false,
    logo: "/logos/cultureamp.svg",
    domain: "cultureamp.com",
  },
  {
    slug: "sapling",
    name: "Sapling",
    tagline:
      "Employee onboarding and people operations platform focused on creating great first-day experiences for new hires.",
    description:
      "Sapling, now part of Kallidus, specializes in employee onboarding and people operations workflows. The platform provides structured onboarding programs with task assignments, document collection, IT provisioning triggers, and buddy/mentor assignment. The pre-boarding experience starts before day one, ensuring new hires feel welcome and prepared. Beyond onboarding, Sapling covers core HRIS functions like employee profiles, org charts, and PTO tracking. The workflow builder handles other people operations processes like offboarding, role changes, and promotions. Sapling integrates with major ATS platforms to create a smooth handoff from recruiting to onboarding. The platform is more focused than comprehensive HRIS tools, which is a strength for companies that prioritize the onboarding experience and a limitation for those wanting a single system for all HR needs.",
    category: "onboarding",
    tags: [
      "onboarding",
      "people operations",
      "pre-boarding",
      "new hire",
      "workflows",
      "HRIS",
      "employee experience",
    ],
    url: "https://www.sapling.com",
    pricing: "paid",
    featured: false,
    logo: "/logos/sapling.svg",
    domain: "sapling.com",
  },
  {
    slug: "workbright",
    name: "WorkBright",
    tagline:
      "Remote onboarding platform that lets new hires complete I-9s and paperwork from their phones before day one.",
    description:
      "WorkBright focuses specifically on the document collection and compliance side of onboarding, with a mobile-first approach that lets new hires complete I-9 verification, W-4 forms, and custom paperwork from their phones. The Smart I-9 feature uses the device camera for document verification, and the platform tracks completion status with automated reminders. WorkBright is popular with staffing agencies and seasonal employers who need to onboard large volumes of workers quickly. The platform does one thing well but does not replace a broader HRIS or onboarding experience tool. It is best used alongside other systems for organizations where document compliance is the primary onboarding pain point.",
    category: "onboarding",
    tags: [
      "remote onboarding",
      "I-9 verification",
      "mobile",
      "document collection",
      "compliance",
      "staffing",
      "seasonal hiring",
    ],
    url: "https://www.workbright.com",
    pricing: "paid",
    featured: false,
    logo: "/logos/workbright.svg",
    domain: "workbright.com",
  },
  {
    slug: "trainual",
    name: "Trainual",
    tagline:
      "Knowledge transfer and training platform that helps small businesses document processes and onboard employees consistently.",
    description:
      "Trainual helps small businesses create a central knowledge base of their processes, policies, and training materials. The platform makes it easy to build step-by-step training content with text, images, videos, and screen recordings, then assign it to specific roles or individuals. Completion tracking shows who has completed which training, and automated assignments ensure new hires get the right content for their role. Trainual is not a traditional HRIS or LMS but fills a specific niche for businesses that need to document tribal knowledge and standardize training. The platform is simple and approachable, which limits its depth for complex training scenarios. Pricing is per-seat and can add up for larger teams.",
    category: "onboarding",
    tags: [
      "training",
      "knowledge base",
      "onboarding",
      "SOPs",
      "process documentation",
      "small business",
      "completion tracking",
    ],
    url: "https://trainual.com",
    affiliateUrl: "https://trainual.com/partners",
    pricing: "paid",
    featured: false,
    logo: "/logos/trainual.svg",
    domain: "trainual.com",
  },
  {
    slug: "greenhouse",
    name: "Greenhouse",
    tagline:
      "Structured hiring platform with onboarding capabilities, helping companies build consistent and equitable hiring processes.",
    description:
      "Greenhouse is primarily known as an ATS but includes a capable onboarding module that creates a smooth transition from candidate to employee. The onboarding product covers pre-boarding tasks, new hire paperwork, IT and equipment provisioning, welcome messages, and first-week scheduling. The structured approach that defines Greenhouse's recruiting philosophy extends to onboarding with templates and workflows that ensure consistency. The onboarding module works best when paired with Greenhouse's ATS since the data flows seamlessly from offer acceptance to day one. As a standalone onboarding tool, it is less compelling since it does not include broader HRIS capabilities. Pricing is bundled with the ATS or available separately at enterprise rates.",
    category: "onboarding",
    tags: [
      "onboarding",
      "ATS",
      "structured hiring",
      "pre-boarding",
      "new hire",
      "recruiting",
      "equitable hiring",
    ],
    url: "https://www.greenhouse.com",
    pricing: "paid",
    featured: false,
    logo: "/logos/greenhouse.svg",
    domain: "greenhouse.com",
  },
  {
    slug: "lever",
    name: "Lever",
    tagline:
      "Talent acquisition suite combining ATS and CRM with built-in diversity and nurture capabilities.",
    description:
      "Lever provides a talent acquisition platform that combines applicant tracking with candidate relationship management, and includes basic onboarding handoff capabilities. The platform emphasizes diversity and inclusion with features like anonymized resume review and EEO reporting. Lever's CRM capabilities let recruiting teams build and nurture talent pipelines proactively. The onboarding integration ensures a smooth transition from offer acceptance to start date. Lever is primarily a recruiting tool rather than an HRIS, so it pairs best with a separate HR system. The platform is well-designed and modern but priced at the premium end for mid-market companies. Advanced analytics and some features require higher-tier plans.",
    category: "compliance-hr",
    tags: [
      "talent acquisition",
      "ATS",
      "CRM",
      "diversity",
      "recruiting",
      "pipeline management",
      "onboarding",
    ],
    url: "https://www.lever.co",
    pricing: "paid",
    featured: false,
    logo: "/logos/lever.svg",
    domain: "lever.co",
  },
  {
    slug: "deel-hr",
    name: "Deel HR",
    tagline:
      "Free global HRIS from Deel that provides a central employee database for distributed teams across 150+ countries.",
    description:
      "Deel HR is Deel's free HRIS offering that provides a central employee database for managing global teams. The platform covers employee profiles, org charts, document management, PTO tracking, and basic reporting across distributed workforces. Being free, it serves as an entry point into Deel's broader ecosystem of EOR, payroll, and contractor management products. The global focus means the platform understands international workforce nuances, but the HR features are basic compared to dedicated HRIS platforms like BambooHR or Rippling. The free tier has limitations, and advanced features push you toward Deel's paid products. Best for companies already using Deel for global payroll or EOR who want a unified employee directory.",
    category: "compliance-hr",
    tags: [
      "HRIS",
      "global HR",
      "free",
      "distributed teams",
      "employee database",
      "Deel",
      "international",
    ],
    url: "https://www.deel.com/hr",
    pricing: "paid",
    featured: false,
    logo: "/logos/deel.svg",
    domain: "deel.com",
  },
];
