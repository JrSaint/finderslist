export type NoCodeCategory =
  | "app-builders"
  | "automation"
  | "database"
  | "forms"
  | "workflow-ai";

export interface NoCodeTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: NoCodeCategory;
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

export const NO_CODE_CATEGORIES: Record<
  NoCodeCategory,
  { label: string; emoji: string; description: string; gradient: string }
> = {
  "app-builders": {
    label: "No-Code App Builders",
    emoji: "📱",
    description: "Build web and mobile applications without writing a line of code.",
    gradient: "from-blue-500 to-indigo-500",
  },
  automation: {
    label: "Workflow Automation",
    emoji: "⚡",
    description: "Connect apps and automate repetitive tasks across your business.",
    gradient: "from-amber-500 to-orange-500",
  },
  database: {
    label: "No-Code Databases",
    emoji: "🗄️",
    description: "Flexible databases and spreadsheet-powered data management tools.",
    gradient: "from-green-500 to-teal-500",
  },
  forms: {
    label: "Form & Survey Builders",
    emoji: "📋",
    description: "Create forms, surveys, and data collection workflows without code.",
    gradient: "from-purple-500 to-violet-500",
  },
  "workflow-ai": {
    label: "AI Workflow Tools",
    emoji: "🤖",
    description: "Build AI-powered workflows, agents, and automations with no code.",
    gradient: "from-rose-500 to-pink-500",
  },
};

export const NO_CODE_EDITORIAL = {
  title: "How to Choose the Right No-Code Tool in 2026",
  intro: `No-code platforms let you build applications, automate workflows, and manage data without writing traditional code. They have evolved from simple drag-and-drop website builders into sophisticated development environments capable of powering production-grade SaaS products, internal tools, and complex business automations. For startups, small businesses, and enterprise teams alike, no-code tools compress months of development into days or weeks.\n\nThe no-code ecosystem spans several categories: app builders for creating web and mobile applications, automation platforms for connecting APIs and triggering workflows, database tools for managing structured data, form builders for collecting information, and AI-powered tools that add intelligence to workflows. The best choice depends on what you are building -- a customer-facing app requires different capabilities than an internal operations dashboard or a multi-step automation.\n\nWhile no-code tools dramatically lower the barrier to building software, they are not without trade-offs. Vendor lock-in, scalability limits, and customization ceilings are real concerns for growing businesses. Evaluate each platform's data export capabilities, API access, and performance under load before committing to a tool for a mission-critical use case.`,
  buyerGuide: [
    "Use case alignment -- app builders, automation platforms, and database tools serve fundamentally different purposes; start by defining whether you need a user-facing application, a backend workflow, or a data management system.",
    "Scalability and performance limits -- understand the platform's row limits, API call caps, and user thresholds; some tools work great for prototypes but buckle under production traffic.",
    "Integration ecosystem -- evaluate native connectors to your existing tools (CRM, payment processors, email providers) and whether the platform offers webhook and API access for custom integrations.",
    "Data portability and ownership -- confirm you can export your data and application logic if you outgrow the platform or need to migrate; avoid tools that lock your data in proprietary formats.",
    "Learning curve vs. capability depth -- simpler tools get you building faster but may hit walls quickly; more powerful platforms like Retool or Bubble require more learning but handle complex requirements.",
  ],
  faq: [
    {
      question: "Can no-code tools handle production-grade applications?",
      answer: "Yes, many modern no-code platforms power applications with thousands of daily active users. Tools like Bubble, Retool, and Glide have been used to build revenue-generating SaaS products and mission-critical internal tools. The key is choosing a platform designed for your scale and testing performance under realistic load conditions before launch.",
    },
    {
      question: "What happens if I outgrow a no-code platform?",
      answer: "Most reputable platforms offer data export and API access that allow migration. Some tools like WeWeb and Xano generate standard code that developers can take over. The risk of lock-in is real, so choose platforms with open data export from the start and consider a hybrid approach where no-code handles the frontend while custom code powers complex backend logic.",
    },
    {
      question: "How do no-code tools compare to hiring developers?",
      answer: "No-code tools are typically 5-10x faster and cheaper for building initial versions of applications and automations. They are ideal for MVPs, internal tools, and workflows that change frequently. However, for highly custom user experiences, complex algorithms, or applications requiring fine-grained performance tuning, professional developers remain the better choice.",
    },
  ],
};

export const NO_CODE_TOOLS: NoCodeTool[] = [
  {
    slug: "bubble",
    name: "Bubble",
    tagline: "The most powerful no-code platform",
    description:
      "Bubble is the most powerful visual web app builder, enabling non-technical founders and teams to build fully functional web applications — including user authentication, databases, complex logic, APIs, and payment processing — without writing code. Thousands of successful startups have been built entirely on Bubble, including companies that have raised millions in VC funding.",
    category: "app-builders",
    tags: ["app builder", "SaaS", "MVP", "non-technical", "database", "API", "startup", "VC-backed"],
    url: "https://bubble.io",
    affiliateUrl: "https://bubble.io?ref=finderslist",
    pricing: "freemium",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=bubble.io&sz=128",
    domain: "bubble.io",
    pros: [
      "Most powerful no-code app builder",
      "Full database and user authentication",
      "Large plugin ecosystem",
      "Proven by real startups and funded companies",
    ],
    cons: [
      "Steep learning curve",
      "Performance limitations at scale",
      "Vendor lock-in",
    ],
    useCases: ["SaaS MVP building", "Internal tools", "Marketplace apps", "Non-technical founder startups"],
  },
  {
    slug: "glide",
    name: "Glide",
    tagline: "Build apps from spreadsheets in minutes",
    description:
      "Glide is a no-code app builder that turns Google Sheets, Excel, or Airtable data into beautiful web and mobile apps in minutes. It's the fastest way to build data-driven apps without code — ideal for internal tools, client-facing portals, field apps, and simple workflows.",
    category: "app-builders",
    tags: ["Google Sheets", "Airtable", "mobile app", "internal tools", "quick", "data-driven", "portal"],
    url: "https://glideapps.com",
    affiliateUrl: "https://glideapps.com?ref=finderslist",
    pricing: "freemium",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=glideapps.com&sz=128",
    domain: "glideapps.com",
    pros: [
      "Build from existing spreadsheet data",
      "Very fast to get started",
      "Good-looking mobile apps",
      "Free tier available",
    ],
    cons: [
      "Less powerful than Bubble",
      "Complex logic is limited",
      "Best for simple data apps",
    ],
    useCases: ["Internal tools from spreadsheets", "Simple mobile apps", "Client portals", "Field team apps"],
  },
  {
    slug: "adalo",
    name: "Adalo",
    tagline: "Build mobile apps without code",
    description:
      "Adalo is a no-code app builder focused on creating native mobile apps for iOS and Android, as well as web apps. It features a component library, built-in database, and direct publishing to the App Store and Google Play. Popular with entrepreneurs and small teams who want to launch mobile apps without a developer.",
    category: "app-builders",
    tags: ["mobile app", "iOS", "Android", "App Store", "native", "no-code", "startup"],
    url: "https://adalo.com",
    affiliateUrl: "https://adalo.com?ref=finderslist",
    pricing: "freemium",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=adalo.com&sz=128",
    domain: "adalo.com",
    pros: [
      "Build and publish native mobile apps",
      "Publish to App Store and Google Play",
      "Component-based design",
      "Good for simple mobile apps",
    ],
    cons: [
      "Performance can be slow",
      "Limited complex logic",
      "More expensive than web-only builders",
    ],
    useCases: ["Simple mobile app MVPs", "Non-technical mobile app launching", "Community apps"],
  },
  {
    slug: "softr",
    name: "Softr",
    tagline: "Build client portals and internal tools from Airtable and Google Sheets",
    description:
      "Softr is a no-code tool for building client portals, internal tools, and web apps connected to Airtable or Google Sheets as the backend. It's extremely fast to set up — most users launch their first app in under an hour. Popular for membership sites, directories, dashboards, and data portals.",
    category: "app-builders",
    tags: ["Airtable", "Google Sheets", "client portal", "internal tools", "directory", "membership", "quick"],
    url: "https://softr.io",
    affiliateUrl: "https://softr.io?ref=finderslist",
    pricing: "freemium",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=softr.io&sz=128",
    domain: "softr.io",
    pros: [
      "Fastest to launch from Airtable data",
      "Clean, modern output",
      "Directory and portal templates",
      "Good user authentication features",
    ],
    cons: [
      "Dependent on Airtable or Google Sheets",
      "Limited customization",
      "Not suitable for complex apps",
    ],
    useCases: ["Client portals", "Internal employee tools", "Member directories", "Job boards"],
  },
  {
    slug: "zapier",
    name: "Zapier",
    tagline: "Automate your work across 7,000+ apps",
    description:
      "Zapier is the world's leading no-code automation platform, connecting over 7,000 apps so anyone can automate workflows without code. From simple two-step Zaps to complex multi-step workflows with conditional logic, filters, and delays, Zapier enables businesses to automate virtually any process involving web apps.",
    category: "automation",
    tags: ["automation", "integrations", "workflows", "7000+ apps", "Zaps", "no-code", "enterprise"],
    url: "https://zapier.com",
    affiliateUrl: "https://zapier.com?ref=finderslist",
    pricing: "freemium",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=zapier.com&sz=128",
    domain: "zapier.com",
    pros: [
      "Largest app integration library (7,000+)",
      "No-code — usable by anyone",
      "Multi-step workflows with logic",
      "Free plan available",
    ],
    cons: [
      "Expensive at scale",
      "Zaps have delays (not real-time)",
      "Complex logic requires higher plans",
    ],
    useCases: ["Cross-app workflow automation", "Lead routing and CRM syncing", "Notification automation", "Data syncing between apps"],
  },
  {
    slug: "make",
    name: "Make (Integromat)",
    tagline: "The most powerful visual automation platform",
    description:
      "Make (formerly Integromat) is a visual automation platform that allows users to design and automate complex workflows with a visual, drag-and-drop interface. It supports 1,500+ apps and is far more powerful and affordable than Zapier for advanced users who need complex logic, data transformations, and high-volume automation.",
    category: "automation",
    tags: ["visual automation", "complex workflows", "affordable", "1500+ apps", "data transformation", "developer-friendly"],
    url: "https://make.com",
    affiliateUrl: "https://make.com?ref=finderslist",
    pricing: "freemium",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=make.com&sz=128",
    domain: "make.com",
    pros: [
      "Most powerful visual workflow builder",
      "More affordable than Zapier",
      "Complex data transformations built in",
      "Free 1,000 operations/month",
    ],
    cons: [
      "Steeper learning curve than Zapier",
      "Fewer app integrations than Zapier",
      "Can get complex quickly",
    ],
    useCases: ["Complex multi-step automation", "Data transformation workflows", "Zapier alternative for power users"],
  },
  {
    slug: "n8n",
    name: "n8n",
    tagline: "Open-source workflow automation for technical teams",
    description:
      "n8n is an open-source, self-hostable workflow automation tool that gives developers the power of Zapier or Make with full control over their data and infrastructure. It supports 400+ integrations and allows custom JavaScript code nodes for any logic. The go-to choice for technical teams who want no-code automation without vendor lock-in.",
    category: "automation",
    tags: ["open source", "self-hosted", "JavaScript", "developer", "automation", "no vendor lock-in", "400+ integrations"],
    url: "https://n8n.io",
    affiliateUrl: "https://n8n.io?ref=finderslist",
    pricing: "freemium",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=n8n.io&sz=128",
    domain: "n8n.io",
    pros: [
      "Open source and self-hostable",
      "JavaScript code nodes for custom logic",
      "No execution limits when self-hosted",
      "Fair-code license",
    ],
    cons: [
      "Requires technical setup for self-hosting",
      "Fewer integrations than Zapier",
      "Less user-friendly for non-technical users",
    ],
    useCases: ["Developer-led automation", "Self-hosted workflow automation", "Custom integration pipelines"],
  },
  {
    slug: "airtable",
    name: "Airtable",
    tagline: "The platform to build next-gen apps",
    description:
      "Airtable is a flexible, cloud-based database and app-building platform that combines the familiarity of a spreadsheet with the power of a relational database. It's used by millions of teams for project management, CRM, content calendars, product roadmaps, and custom workflows. The foundation for many no-code app stacks.",
    category: "database",
    tags: ["database", "spreadsheet", "relational", "project management", "CRM", "content calendar", "flexible"],
    url: "https://airtable.com",
    affiliateUrl: "https://airtable.com?ref=finderslist",
    pricing: "freemium",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=airtable.com&sz=128",
    domain: "airtable.com",
    pros: [
      "Flexible relational database in spreadsheet form",
      "Great for non-technical teams",
      "Strong automation features",
      "Excellent template library",
    ],
    cons: [
      "Can get expensive with large teams",
      "Row limits on lower plans",
      "Can be slow with large datasets",
    ],
    useCases: ["Project management databases", "CRM for small teams", "Content calendars", "Product roadmaps"],
  },
  {
    slug: "notion-db",
    name: "Notion",
    tagline: "The all-in-one workspace for notes, docs, and databases",
    description:
      "Notion is a versatile all-in-one workspace that combines notes, documents, wikis, and databases in a single tool. Its linked database feature allows teams to build custom views (table, board, calendar, gallery) on any data, making it a popular Airtable alternative for teams that want knowledge management and data in one place.",
    category: "database",
    tags: ["workspace", "notes", "database", "wiki", "collaboration", "team", "flexible", "all-in-one"],
    url: "https://notion.so",
    pricing: "freemium",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=notion.so&sz=128",
    domain: "notion.so",
    pros: [
      "Combines notes, docs, and databases",
      "Beautiful page design",
      "Strong free plan",
      "AI writing assistance built in",
    ],
    cons: [
      "Database features less powerful than Airtable",
      "Can be slow with large databases",
      "Offline access is limited",
    ],
    useCases: ["Team wikis", "Project management", "Personal productivity", "Content planning"],
  },
  {
    slug: "baserow",
    name: "Baserow",
    tagline: "Open-source, no-code database platform",
    description:
      "Baserow is an open-source, self-hostable no-code database platform similar to Airtable. It allows teams to create, manage, and share databases with a spreadsheet-like interface. For teams who want Airtable's capabilities without the vendor lock-in or pricing constraints, Baserow is the ideal open-source alternative.",
    category: "database",
    tags: ["open source", "Airtable alternative", "self-hosted", "database", "no-code", "collaborative", "free"],
    url: "https://baserow.io",
    pricing: "freemium",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=baserow.io&sz=128",
    domain: "baserow.io",
    pros: [
      "Open source and self-hostable",
      "No row limits when self-hosted",
      "Good Airtable-like interface",
      "Free cloud tier available",
    ],
    cons: [
      "Less polished than Airtable",
      "Smaller app ecosystem",
      "Self-hosting requires technical knowledge",
    ],
    useCases: ["Self-hosted Airtable replacement", "GDPR-compliant data management", "Open source data tools"],
  },
  {
    slug: "nocodb",
    name: "NocoDB",
    tagline: "Open source Airtable alternative",
    description:
      "NocoDB is an open-source no-code platform that turns any database (MySQL, PostgreSQL, SQLite) into a smart spreadsheet with an Airtable-like interface. It's self-hostable, connects to existing databases, and provides REST and GraphQL APIs automatically. A powerful tool for technical teams wanting no-code UI on top of existing databases.",
    category: "database",
    tags: ["open source", "Airtable alternative", "MySQL", "PostgreSQL", "self-hosted", "API", "existing database"],
    url: "https://nocodb.com",
    pricing: "freemium",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=nocodb.com&sz=128",
    domain: "nocodb.com",
    pros: [
      "Connect to existing databases",
      "Auto-generates REST and GraphQL APIs",
      "Fully open source",
      "No row limits",
    ],
    cons: [
      "Requires technical setup",
      "UI is less polished",
      "Limited automation features",
    ],
    useCases: ["No-code UI on existing databases", "Internal admin panels", "Developer-built data tools"],
  },
  {
    slug: "typeform",
    name: "Typeform",
    tagline: "Build beautiful forms that people love to fill out",
    description:
      "Typeform is a conversational form builder that presents one question at a time, creating an engaging experience that dramatically improves completion rates. Used for surveys, lead capture, quizzes, product feedback, and registration forms. Its polished design and logic features make it popular for any data collection use case.",
    category: "forms",
    tags: ["conversational forms", "surveys", "lead capture", "quizzes", "NPS", "high completion rates", "branded"],
    url: "https://typeform.com",
    affiliateUrl: "https://typeform.com?ref=finderslist",
    pricing: "freemium",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=typeform.com&sz=128",
    domain: "typeform.com",
    pros: [
      "Beautiful, high-converting form design",
      "Conversational one-question-at-a-time format",
      "Logic jumps and conditional branches",
      "Wide range of question types",
    ],
    cons: [
      "Expensive for high response volumes",
      "Free plan is very limited (10 responses/month)",
      "Less powerful for complex logic vs specialized tools",
    ],
    useCases: ["Customer feedback surveys", "Lead generation forms", "Quiz funnels", "Event registration"],
  },
  {
    slug: "tally",
    name: "Tally",
    tagline: "The simplest way to create forms — free forever",
    description:
      "Tally is a free, Notion-inspired form builder that offers unlimited forms and unlimited responses at no cost. Its block-based editor allows creating sophisticated forms quickly. For teams who love Notion's interface and want a form tool with the same simplicity, Tally is the obvious free alternative to Typeform.",
    category: "forms",
    tags: ["free", "unlimited responses", "Notion-like", "simple", "block-based", "no branding", "embeddable"],
    url: "https://tally.so",
    affiliateUrl: "https://tally.so?ref=finderslist",
    pricing: "freemium",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=tally.so&sz=128",
    domain: "tally.so",
    pros: [
      "Completely free — unlimited forms and responses",
      "Notion-like block editor",
      "No Tally branding on forms",
      "Easy conditional logic",
    ],
    cons: [
      "Less feature-rich than Typeform",
      "Advanced integrations require Pro plan",
      "No native analytics dashboard",
    ],
    useCases: ["Free unlimited surveys", "Simple lead collection", "Internal team forms", "Event registration"],
  },
  {
    slug: "jotform",
    name: "JotForm",
    tagline: "Online forms with more power and fewer limits",
    description:
      "JotForm is a full-featured online form builder used by over 20 million users worldwide. It offers 10,000+ templates, 100+ integrations, payment collection, e-signature, conditional logic, and even PDF generation. A powerful, affordable alternative to Typeform with more features and a larger template library.",
    category: "forms",
    tags: ["forms", "templates", "payments", "e-signature", "conditional logic", "PDF", "integrations"],
    url: "https://jotform.com",
    affiliateUrl: "https://jotform.com?ref=finderslist",
    pricing: "freemium",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=jotform.com&sz=128",
    domain: "jotform.com",
    pros: [
      "Most feature-rich form builder",
      "10,000+ templates",
      "Payment collection built in",
      "E-signature support",
    ],
    cons: [
      "Interface can feel overwhelming",
      "Free plan has Jotform branding",
      "Less modern design than Typeform",
    ],
    useCases: ["Payment collection forms", "E-signature workflows", "Complex form logic", "Non-profit data collection"],
  },
  {
    slug: "voiceflow",
    name: "Voiceflow",
    tagline: "Build AI agents and chatbots without code",
    description:
      "Voiceflow is a platform for designing, prototyping, and deploying conversational AI agents — chatbots, voice assistants, and multi-channel AI workflows — without code. Used by product teams and agencies to build AI customer service agents, onboarding bots, and voice experiences for Alexa, web, and mobile.",
    category: "workflow-ai",
    tags: ["AI agents", "chatbots", "voice assistants", "conversational AI", "no-code", "Alexa", "customer service"],
    url: "https://voiceflow.com",
    affiliateUrl: "https://voiceflow.com?ref=finderslist",
    pricing: "freemium",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=voiceflow.com&sz=128",
    domain: "voiceflow.com",
    pros: [
      "Best no-code conversational AI builder",
      "Multi-channel (web, voice, SMS)",
      "Strong collaboration features",
      "Large template library",
    ],
    cons: [
      "Learning curve for complex AI agents",
      "Expensive for production deployments",
      "AI behavior can be hard to control",
    ],
    useCases: ["Customer service AI chatbots", "Alexa skills", "Onboarding bots", "AI product prototyping"],
  },
  {
    slug: "dify",
    name: "Dify",
    tagline: "Open-source platform for LLM app development",
    description:
      "Dify is an open-source LLM app development platform that provides a visual workflow builder for creating AI applications — chatbots, agents, text generators, and RAG pipelines — without deep ML knowledge. Self-hostable and increasingly used by teams building internal AI tools and customer-facing AI products.",
    category: "workflow-ai",
    tags: ["open source", "LLM", "AI agents", "RAG", "chatbots", "self-hosted", "visual workflow", "GPT"],
    url: "https://dify.ai",
    pricing: "freemium",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=dify.ai&sz=128",
    domain: "dify.ai",
    pros: [
      "Open source and self-hostable",
      "Visual workflow builder for AI",
      "Supports RAG knowledge bases",
      "Multi-model support (GPT, Claude, Llama)",
    ],
    cons: [
      "Technical setup required for self-hosting",
      "Rapidly evolving — some instability",
      "Less polished than commercial tools",
    ],
    useCases: ["Internal AI tools", "RAG-based knowledge chatbots", "AI workflow prototyping", "Self-hosted AI agents"],
  },
  {
    slug: "flowise",
    name: "Flowise",
    tagline: "Open-source drag-and-drop UI for LangChain",
    description:
      "Flowise is an open-source, self-hosted tool for building LLM-powered workflows and AI agents using a visual drag-and-drop interface built on LangChain. It allows developers and semi-technical users to assemble AI pipelines — RAG apps, chatbots, agent workflows — without writing code. Very popular in the AI builder community.",
    category: "workflow-ai",
    tags: ["open source", "LangChain", "visual builder", "RAG", "AI agents", "self-hosted", "LLM", "drag-and-drop"],
    url: "https://flowiseai.com",
    pricing: "free",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=flowiseai.com&sz=128",
    domain: "flowiseai.com",
    pros: [
      "Free and open source",
      "Visual LangChain builder",
      "Large active community",
      "No vendor lock-in",
    ],
    cons: [
      "Requires self-hosting or Docker knowledge",
      "Less polished than commercial tools",
      "Can be unstable with rapid updates",
    ],
    useCases: ["RAG pipeline building", "AI chatbot prototyping", "LangChain visual development", "Self-hosted AI agents"],
  },
  {
    slug: "retool",
    name: "Retool",
    tagline: "Build internal tools, remarkably fast",
    description:
      "Retool is the leading platform for building internal tools — admin panels, dashboards, and CRUD apps — that connect to any database or API. Used by over 7,000 companies including Amazon, Brex, and DoorDash, it dramatically reduces the time to build internal tools from weeks to hours.",
    category: "app-builders",
    tags: ["internal tools", "admin panel", "dashboard", "database", "API", "CRUD", "enterprise", "developer"],
    url: "https://retool.com",
    affiliateUrl: "https://retool.com?ref=finderslist",
    pricing: "freemium",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=retool.com&sz=128",
    domain: "retool.com",
    pros: [
      "Best platform for internal tools",
      "Connects to any database or API",
      "Developer-friendly (supports custom JS)",
      "Free for up to 5 users",
    ],
    cons: [
      "Expensive at scale",
      "Not for external-facing products",
      "Vendor lock-in",
    ],
    useCases: ["Internal admin panels", "Operations dashboards", "Customer support tooling", "Data management apps"],
  },
  {
    slug: "webflow-logic",
    name: "Webflow Logic",
    tagline: "Add logic and workflows to your Webflow site",
    description:
      "Webflow Logic is Webflow's built-in no-code workflow automation tool that allows users to add conditional logic, form triggers, and integrations directly within Webflow. It's designed to reduce the need for third-party automation tools like Zapier for common Webflow use cases like form routing, CRM updates, and email triggers.",
    category: "automation",
    tags: ["Webflow", "form automation", "no-code", "workflows", "CRM integration", "email triggers", "conditional"],
    url: "https://webflow.com/logic",
    pricing: "freemium",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=webflow.com&sz=128",
    domain: "webflow.com",
    pros: [
      "Native Webflow integration — no Zapier needed",
      "Simple form workflow automation",
      "Good for Webflow-based businesses",
    ],
    cons: [
      "Only works within Webflow ecosystem",
      "Less powerful than dedicated automation tools",
      "Still maturing",
    ],
    useCases: ["Webflow form routing", "Lead capture automation in Webflow", "CMS trigger workflows"],
  },
  {
    slug: "pabbly",
    name: "Pabbly Connect",
    tagline: "Unlimited automation workflows with a one-time payment",
    description:
      "Pabbly Connect is a workflow automation platform that offers unlimited workflows, unlimited automation tasks, and a one-time payment option — making it dramatically cheaper than Zapier or Make for high-volume automations. Supports 1,000+ apps and is popular with budget-conscious businesses and agencies.",
    category: "automation",
    tags: ["automation", "unlimited tasks", "one-time payment", "affordable", "Zapier alternative", "1000+ apps", "agency"],
    url: "https://pabbly.com/connect",
    affiliateUrl: "https://pabbly.com?ref=finderslist",
    pricing: "paid",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=pabbly.com&sz=128",
    domain: "pabbly.com",
    pros: [
      "One-time lifetime payment option",
      "Unlimited workflows and tasks",
      "Good for high-volume automation",
      "Affordable vs Zapier",
    ],
    cons: [
      "Less polished than Zapier",
      "Fewer app integrations",
      "Slower development pace",
    ],
    useCases: ["Budget automation at scale", "Agencies with many client automations", "High-volume workflow automation"],
  },
];
