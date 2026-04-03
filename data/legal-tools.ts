export type LegalCategory =
  | "contract-management"
  | "legal-research"
  | "compliance"
  | "ip-trademark"
  | "document-automation";

export interface LegalTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: LegalCategory;
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

export const LEGAL_CATEGORIES: Record<
  LegalCategory,
  { label: string; emoji: string; description: string; gradient: string }
> = {
  "contract-management": {
    label: "Contract Management",
    emoji: "📋",
    description: "Create, send, sign, and manage contracts and legal agreements.",
    gradient: "from-blue-500 to-indigo-500",
  },
  "legal-research": {
    label: "Legal Research & AI",
    emoji: "⚖️",
    description: "AI-powered legal research, case law lookup, and legal analysis tools.",
    gradient: "from-purple-500 to-violet-500",
  },
  compliance: {
    label: "Compliance & Privacy",
    emoji: "🔒",
    description: "Tools to manage regulatory compliance, GDPR, and privacy requirements.",
    gradient: "from-green-500 to-teal-500",
  },
  "ip-trademark": {
    label: "IP & Trademark",
    emoji: "™️",
    description: "Tools for trademark search, IP management, and patent research.",
    gradient: "from-amber-500 to-orange-500",
  },
  "document-automation": {
    label: "Legal Document Automation",
    emoji: "📄",
    description: "Automate the creation of legal documents and policy generators.",
    gradient: "from-rose-500 to-pink-500",
  },
};

export const LEGAL_EDITORIAL = {
  title: "How to Choose the Right Legal Tools in 2026",
  intro: `Legal technology has transformed how businesses handle contracts, compliance, intellectual property, and legal research. Modern legal tools automate contract creation and review, track regulatory compliance across jurisdictions, protect trademarks and patents, and use AI to perform legal research that once required hours of manual work. Whether you are a legal professional or a business owner managing legal matters without dedicated counsel, the right tools reduce risk and save significant time and money.\n\nContract management is the most widely adopted category, with platforms that handle the entire lifecycle from drafting and negotiation through e-signature and renewal tracking. AI-powered contract review tools can analyze agreements in minutes, flagging risky clauses, missing terms, and deviations from your standard playbook. For businesses managing dozens or hundreds of active contracts, this automation prevents missed renewals and overlooked obligations.\n\nCompliance and privacy tools have become essential as regulations like GDPR, CCPA, and industry-specific requirements create an increasingly complex landscape. These platforms automate compliance monitoring, policy management, and audit preparation, helping legal teams stay ahead of regulatory changes without manual tracking across dozens of jurisdictions.`,
  buyerGuide: [
    "Contract volume and complexity — if you manage more than a handful of contracts, look for a platform with template libraries, clause libraries, approval workflows, and obligation tracking to prevent important deadlines from being missed.",
    "AI capabilities and accuracy — AI-powered legal tools vary widely in quality. Look for platforms trained on legal-specific datasets, and verify accuracy through trials rather than trusting marketing claims about AI performance.",
    "Integration with existing workflows — legal tools should connect with your CRM, cloud storage, email, and e-signature platforms. Friction in the workflow leads to adoption failures and teams reverting to email and shared drives.",
    "Security and confidentiality — legal documents contain highly sensitive information. Verify that the platform offers encryption at rest and in transit, SOC 2 compliance, role-based access controls, and data residency options if required.",
    "Scalability from small team to legal department — choose tools that serve your current needs without overcomplicating your workflow, but can scale with advanced features as your legal operations mature and your contract volume grows.",
  ],
  faq: [
    {
      question: "Can AI legal tools replace a lawyer?",
      answer: "AI legal tools are excellent for routine tasks like contract review, legal research, and compliance monitoring, but they cannot replace legal judgment for complex matters, litigation strategy, or high-stakes negotiations. Think of them as force multipliers that let lawyers and business owners handle routine work faster while reserving attorney time for matters that require human expertise.",
    },
    {
      question: "Do I need contract management software if I use e-signature tools like DocuSign?",
      answer: "E-signature tools handle the signing step but do not manage the full contract lifecycle. Contract management software adds template creation, negotiation tracking, clause libraries, obligation monitoring, and renewal alerts. If you only need signatures, an e-signature tool suffices. If you manage many active contracts, dedicated contract management software provides substantial value.",
    },
    {
      question: "How do small businesses handle legal compliance without a legal department?",
      answer: "Compliance platforms designed for small businesses automate much of the monitoring and documentation process. They track regulatory changes relevant to your industry, generate required policies and procedures, and alert you to upcoming deadlines. Combined with occasional consultations from an outside attorney, these tools let small businesses maintain compliance without a full-time legal team.",
    },
  ],
};

export const LEGAL_TOOLS: LegalTool[] = [
  {
    slug: "docusign",
    name: "DocuSign",
    tagline: "The world's most trusted eSignature platform",
    description:
      "DocuSign is the global leader in electronic signatures and digital transaction management. Used by over 1 million customers and 1 billion users worldwide, it allows businesses to sign, send, and manage legally binding agreements digitally. DocuSign is the standard for e-signatures across industries from real estate to healthcare to enterprise.",
    category: "contract-management",
    tags: ["eSignature", "contracts", "legal binding", "enterprise", "real estate", "global standard"],
    url: "https://docusign.com",
    affiliateUrl: "https://docusign.com?ref=finderslist",
    pricing: "freemium",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=docusign.com&sz=128",
    domain: "docusign.com",
    pros: [
      "Global standard for eSignatures",
      "Legally binding in 180+ countries",
      "Strong compliance (SOC 2, ISO 27001)",
      "Extensive integrations",
    ],
    cons: [
      "Expensive for high volume",
      "Free plan is very limited (3 envelopes/month)",
      "Can be slow for complex workflows",
    ],
    useCases: ["Sales contracts", "HR offer letters", "Real estate agreements", "Enterprise contract management"],
  },
  {
    slug: "hellosign",
    name: "Dropbox Sign (HelloSign)",
    tagline: "eSignatures that work where you work",
    description:
      "Dropbox Sign (formerly HelloSign) is a popular eSignature platform known for its clean API and easy Dropbox integration. It offers legally binding signatures, templates, team management, and a developer API for embedded signing workflows. A more affordable alternative to DocuSign for small and mid-size teams.",
    category: "contract-management",
    tags: ["eSignature", "Dropbox", "API", "templates", "affordable", "embedded signing"],
    url: "https://dropbox.com/sign",
    pricing: "freemium",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=dropbox.com&sz=128",
    domain: "dropbox.com",
    pros: [
      "More affordable than DocuSign",
      "Clean and simple interface",
      "Strong developer API",
      "Good Dropbox integration",
    ],
    cons: [
      "Less enterprise features than DocuSign",
      "Fewer advanced workflow options",
      "Some users report slower support",
    ],
    useCases: ["Freelancer and SMB contracts", "Embedded signing workflows", "Simple document signing"],
  },
  {
    slug: "pandadoc",
    name: "PandaDoc",
    tagline: "Documents that close deals faster",
    description:
      "PandaDoc is an all-in-one document automation platform that combines eSignatures, contract creation, proposals, quotes, and document analytics. Loved by sales teams for its ability to create beautiful, interactive proposals and track when recipients open and view documents. Competes with DocuSign for the full document lifecycle.",
    category: "contract-management",
    tags: ["eSignature", "proposals", "contracts", "quotes", "sales", "document analytics", "templates"],
    url: "https://pandadoc.com",
    affiliateUrl: "https://pandadoc.com?ref=finderslist",
    pricing: "freemium",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=pandadoc.com&sz=128",
    domain: "pandadoc.com",
    pros: [
      "All-in-one: proposals, quotes, and contracts",
      "Document analytics (view tracking)",
      "Beautiful proposal templates",
      "Good CRM integrations",
    ],
    cons: [
      "More expensive than simple eSign tools",
      "Some features only on higher plans",
      "Learning curve for full feature set",
    ],
    useCases: ["Sales proposals and quotes", "Contract management", "Client onboarding documents", "Partnership agreements"],
  },
  {
    slug: "ironclad",
    name: "Ironclad",
    tagline: "Digital contracting for high-growth companies",
    description:
      "Ironclad is an enterprise contract lifecycle management (CLM) platform used by leading companies to automate contract workflows, manage risk, and gain visibility into their entire contract portfolio. It features an AI-powered contract review assistant, workflow automation, and a contract repository.",
    category: "contract-management",
    tags: ["CLM", "contract lifecycle", "enterprise", "AI contract review", "workflow automation", "repository"],
    url: "https://ironcladapp.com",
    pricing: "paid",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=ironcladapp.com&sz=128",
    domain: "ironcladapp.com",
    pros: [
      "Best enterprise CLM platform",
      "AI-powered contract review",
      "Full lifecycle management",
      "Strong legal ops features",
    ],
    cons: [
      "Enterprise pricing only",
      "Complex to implement",
      "Requires significant setup",
    ],
    useCases: ["Enterprise contract management", "Legal operations teams", "High-volume contract workflows"],
  },
  {
    slug: "lexisnexis",
    name: "LexisNexis",
    tagline: "Comprehensive legal research and analytics",
    description:
      "LexisNexis is the gold standard for legal research, offering access to one of the world's largest databases of case law, statutes, regulations, and legal news. It's used by law firms, corporate legal departments, and academics for comprehensive legal research. Now includes AI-powered research tools.",
    category: "legal-research",
    tags: ["legal research", "case law", "statutes", "regulations", "law firms", "academic", "enterprise"],
    url: "https://lexisnexis.com",
    pricing: "paid",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=lexisnexis.com&sz=128",
    domain: "lexisnexis.com",
    pros: [
      "Most comprehensive legal database",
      "Trusted by top law firms globally",
      "AI-powered research features",
      "Strong citation analysis",
    ],
    cons: [
      "Very expensive",
      "Complex interface",
      "Primarily for lawyers — not accessible to non-lawyers",
    ],
    useCases: ["Law firm legal research", "Corporate legal department", "Academic legal research"],
  },
  {
    slug: "westlaw",
    name: "Westlaw",
    tagline: "The most intelligent legal research platform",
    description:
      "Westlaw by Thomson Reuters is LexisNexis's primary competitor for legal research, offering case law, statutes, secondary sources, and now AI-powered features including WestSearch Plus. It's the preferred platform for many litigators and corporate attorneys for its KeyCite citation tracking and research accuracy.",
    category: "legal-research",
    tags: ["legal research", "case law", "KeyCite", "Thomson Reuters", "AI research", "litigation", "enterprise"],
    url: "https://legal.thomsonreuters.com/westlaw",
    pricing: "paid",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=thomsonreuters.com&sz=128",
    domain: "thomsonreuters.com",
    pros: [
      "Industry-leading citation tracking (KeyCite)",
      "Excellent for litigation research",
      "AI-powered WestSearch",
      "Trusted by top law firms",
    ],
    cons: [
      "Expensive subscription",
      "Not accessible for non-lawyers",
      "Complex pricing structures",
    ],
    useCases: ["Litigation research", "Corporate legal research", "Law school and academic use"],
  },
  {
    slug: "casetext",
    name: "Casetext (CoCounsel)",
    tagline: "AI legal research and drafting assistant",
    description:
      "Casetext (now CoCounsel by Thomson Reuters) was the pioneer of AI-powered legal research. Its CoCounsel AI can review documents, draft legal memos, research case law, and analyze contracts in minutes. One of the first platforms to show that AI could meaningfully help lawyers with substantive legal work.",
    category: "legal-research",
    tags: ["AI legal research", "CoCounsel", "document review", "legal memos", "contract analysis", "Thomson Reuters"],
    url: "https://casetext.com",
    pricing: "paid",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=casetext.com&sz=128",
    domain: "casetext.com",
    pros: [
      "Pioneered AI-powered legal research",
      "Can draft and review documents",
      "Trusted by thousands of attorneys",
      "Now backed by Thomson Reuters",
    ],
    cons: [
      "Expensive",
      "Best suited for US legal research",
      "AI can occasionally hallucinate citations",
    ],
    useCases: ["AI-assisted legal research", "Document review", "Legal memo drafting", "Contract analysis"],
  },
  {
    slug: "harvey-ai",
    name: "Harvey AI",
    tagline: "Generative AI for elite law firms",
    description:
      "Harvey is an AI platform built specifically for law firms and legal departments, trained on legal data. It can assist with contract review, legal research, due diligence, and document drafting. Adopted by top global law firms including Allen & Overy and PricewaterhouseCoopers's legal practice.",
    category: "legal-research",
    tags: ["generative AI", "law firms", "contract review", "due diligence", "legal AI", "enterprise", "elite"],
    url: "https://harvey.ai",
    pricing: "paid",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=harvey.ai&sz=128",
    domain: "harvey.ai",
    pros: [
      "Purpose-built for legal professionals",
      "Adopted by top global law firms",
      "Strong contract review capabilities",
      "Enterprise security and compliance",
    ],
    cons: [
      "Enterprise-only pricing",
      "Not accessible to small firms or individuals",
      "Requires existing legal expertise to use effectively",
    ],
    useCases: ["Large law firm AI deployment", "M&A due diligence", "Contract review at scale"],
  },
  {
    slug: "cookieyes",
    name: "CookieYes",
    tagline: "Cookie consent and privacy compliance made easy",
    description:
      "CookieYes is a cookie consent management platform that helps websites comply with GDPR, CCPA, and other privacy regulations. It auto-scans for cookies, generates a consent banner, records user consent, and provides a cookie policy. Used by millions of websites worldwide for privacy compliance.",
    category: "compliance",
    tags: ["GDPR", "CCPA", "cookie consent", "privacy", "compliance", "cookie banner", "website"],
    url: "https://cookieyes.com",
    affiliateUrl: "https://cookieyes.com?ref=finderslist",
    pricing: "freemium",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=cookieyes.com&sz=128",
    domain: "cookieyes.com",
    pros: [
      "Easy to implement on any website",
      "Auto-scans and categorizes cookies",
      "GDPR and CCPA compliant",
      "Free plan available",
    ],
    cons: [
      "Limited customization on free plan",
      "Some advanced features require paid plans",
      "Cookie scanning can miss some trackers",
    ],
    useCases: ["Website GDPR compliance", "Cookie consent management", "Privacy policy generation"],
  },
  {
    slug: "termly",
    name: "Termly",
    tagline: "Generate privacy policies and terms of service",
    description:
      "Termly is a compliance platform that generates legally compliant privacy policies, terms of service, cookie policies, and GDPR/CCPA consent banners for websites and apps. It's used by over 300,000 businesses to manage legal documentation and stay compliant with evolving privacy laws.",
    category: "document-automation",
    tags: ["privacy policy", "terms of service", "GDPR", "CCPA", "cookie policy", "compliance", "generator"],
    url: "https://termly.io",
    affiliateUrl: "https://termly.io?ref=finderslist",
    pricing: "freemium",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=termly.io&sz=128",
    domain: "termly.io",
    pros: [
      "Generates compliance documents in minutes",
      "Updated for current privacy laws",
      "Covers GDPR, CCPA, and more",
      "Free tier available",
    ],
    cons: [
      "Generated policies may need lawyer review",
      "Limited customization without paid plan",
      "Not a substitute for legal counsel",
    ],
    useCases: ["Website legal pages", "App store compliance", "Startup legal documentation"],
  },
  {
    slug: "iubenda",
    name: "iubenda",
    tagline: "Legal tools for millions of websites and apps",
    description:
      "iubenda provides self-updating privacy policy and cookie policy generators that stay current with evolving laws (GDPR, CCPA, LGPD, etc.). Used by over 100,000 websites, it offers consent management, terms of service generation, and compliance solutions for businesses that need reliable legal coverage.",
    category: "document-automation",
    tags: ["privacy policy", "cookie policy", "GDPR", "self-updating", "consent management", "international", "affordable"],
    url: "https://iubenda.com",
    affiliateUrl: "https://iubenda.com?ref=finderslist",
    pricing: "freemium",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=iubenda.com&sz=128",
    domain: "iubenda.com",
    pros: [
      "Self-updating policies keep up with laws",
      "Supports multiple jurisdictions",
      "Modular, customizable policies",
      "Trusted by 100,000+ websites",
    ],
    cons: [
      "Annual subscription required",
      "Per-site pricing adds up",
      "Some features require lawyer knowledge to configure",
    ],
    useCases: ["Multi-jurisdiction compliance", "SaaS legal pages", "eCommerce privacy compliance"],
  },
  {
    slug: "clausebase",
    name: "ClauseBase",
    tagline: "Smart contract drafting for legal teams",
    description:
      "ClauseBase is a contract drafting and automation platform designed for law firms and in-house legal teams. It allows lawyers to build smart contract templates with conditional logic, automate repetitive drafting, and maintain a clause library that ensures consistency across all agreements.",
    category: "document-automation",
    tags: ["contract drafting", "automation", "templates", "clause library", "law firms", "in-house legal"],
    url: "https://clausebase.com",
    pricing: "paid",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=clausebase.com&sz=128",
    domain: "clausebase.com",
    pros: [
      "Smart templates with conditional logic",
      "Centralized clause library",
      "Reduces drafting errors",
      "Good for standardizing contracts",
    ],
    cons: [
      "Steep learning curve",
      "Requires legal expertise to set up",
      "Expensive for small firms",
    ],
    useCases: ["Contract automation for law firms", "Standardizing in-house agreement templates"],
  },
  {
    slug: "hotdocs",
    name: "HotDocs",
    tagline: "The leading document automation software",
    description:
      "HotDocs is the original and most established legal document automation platform, used by law firms, corporate legal teams, and government agencies to automate the creation of contracts, forms, and other documents from intelligent templates. Has been automating legal documents since the early days of legal tech.",
    category: "document-automation",
    tags: ["document automation", "legal templates", "forms", "law firms", "government", "enterprise", "SCORM"],
    url: "https://hotdocs.com",
    pricing: "paid",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=hotdocs.com&sz=128",
    domain: "hotdocs.com",
    pros: [
      "Industry pioneer with deep feature set",
      "Handles complex document logic",
      "Enterprise security",
      "On-premise option available",
    ],
    cons: [
      "Dated UI compared to modern tools",
      "Expensive",
      "Complex to implement",
    ],
    useCases: ["Law firm document automation", "Government form automation", "Enterprise legal documents"],
  },
  {
    slug: "trademark-engine",
    name: "Trademark Engine",
    tagline: "Affordable trademark registration services",
    description:
      "Trademark Engine is a trademark filing service that helps businesses file trademark applications with the USPTO at lower cost than traditional attorneys. It guides users through the trademark registration process, provides search reports, and handles paperwork — though users should still consult a trademark attorney for complex cases.",
    category: "ip-trademark",
    tags: ["trademark", "USPTO", "registration", "IP", "small business", "affordable", "brand protection"],
    url: "https://trademarkengine.com",
    affiliateUrl: "https://trademarkengine.com?ref=finderslist",
    pricing: "paid",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=trademarkengine.com&sz=128",
    domain: "trademarkengine.com",
    pros: [
      "Much more affordable than attorneys",
      "Simple guided filing process",
      "Fast turnaround",
      "Good for straightforward trademark filings",
    ],
    cons: [
      "Not a substitute for trademark attorney advice",
      "Complex IP matters still need lawyers",
      "Limited to USPTO filings",
    ],
    useCases: ["Small business trademark filing", "Brand protection on a budget", "Startup trademark registration"],
  },
  {
    slug: "corsearch",
    name: "Corsearch",
    tagline: "Brand protection and trademark research platform",
    description:
      "Corsearch is an enterprise trademark research and brand protection platform used by major corporations to search for trademark conflicts, monitor brand infringement online, and manage trademark portfolios globally. It combines trademark databases, AI screening, and monitoring tools in one platform.",
    category: "ip-trademark",
    tags: ["trademark research", "brand protection", "IP portfolio", "monitoring", "enterprise", "global", "AI"],
    url: "https://corsearch.com",
    pricing: "paid",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=corsearch.com&sz=128",
    domain: "corsearch.com",
    pros: [
      "Comprehensive global trademark database",
      "AI-powered screening",
      "Brand monitoring capabilities",
      "Enterprise IP portfolio management",
    ],
    cons: [
      "Enterprise pricing",
      "Complex for small businesses",
      "Requires IP expertise to use effectively",
    ],
    useCases: ["Enterprise trademark clearance", "Global brand protection", "IP portfolio management"],
  },
  {
    slug: "clio",
    name: "Clio",
    tagline: "The most widely used law practice management software",
    description:
      "Clio is the leading cloud-based law practice management software, used by over 150,000 legal professionals. It combines case management, time tracking, billing, client communication, and document management in one platform. It's the central hub for many law firms' operations.",
    category: "contract-management",
    tags: ["law practice management", "case management", "billing", "time tracking", "law firms", "cloud"],
    url: "https://clio.com",
    affiliateUrl: "https://clio.com?ref=finderslist",
    pricing: "paid",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=clio.com&sz=128",
    domain: "clio.com",
    pros: [
      "Complete law practice management",
      "Best-in-class billing and time tracking",
      "Strong client portal",
      "Large ecosystem of integrations",
    ],
    cons: [
      "Expensive for solo practitioners",
      "Can be complex to set up",
      "Not designed for non-legal teams",
    ],
    useCases: ["Law firm case management", "Legal billing and time tracking", "Client communication for attorneys"],
  },
  {
    slug: "lawgeex",
    name: "LawGeex",
    tagline: "AI contract review for in-house legal teams",
    description:
      "LawGeex uses AI to automate contract review for in-house legal teams, identifying issues, flagging deviations from company standards, and suggesting redlines in minutes instead of hours. It enables legal teams to review more contracts faster while maintaining consistent standards.",
    category: "legal-research",
    tags: ["AI contract review", "in-house legal", "redlines", "automation", "standards", "risk identification"],
    url: "https://lawgeex.com",
    pricing: "paid",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=lawgeex.com&sz=128",
    domain: "lawgeex.com",
    pros: [
      "Reviews contracts in minutes vs. hours",
      "Consistent standards across all reviews",
      "Integrates with existing workflows",
      "Reduces legal bottlenecks",
    ],
    cons: [
      "Enterprise-only pricing",
      "Still requires human lawyer sign-off",
      "Works best for routine contract types",
    ],
    useCases: ["High-volume in-house contract review", "NDAs and standard agreement review", "Legal ops efficiency"],
  },
  {
    slug: "osano",
    name: "Osano",
    tagline: "Privacy management platform for enterprises",
    description:
      "Osano is a comprehensive privacy compliance platform that helps companies manage consent, data subject rights requests, vendor monitoring, and privacy assessments. It's designed for privacy-first companies and legal teams that need to demonstrate compliance with GDPR, CCPA, and other global privacy regulations.",
    category: "compliance",
    tags: ["privacy compliance", "GDPR", "CCPA", "consent management", "DSAR", "vendor monitoring", "enterprise"],
    url: "https://osano.com",
    pricing: "paid",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=osano.com&sz=128",
    domain: "osano.com",
    pros: [
      "End-to-end privacy compliance management",
      "Monitors vendors for privacy compliance",
      "Strong DSAR management",
      "Privacy-first company mission",
    ],
    cons: [
      "Enterprise pricing",
      "Overkill for small businesses",
      "Complex to fully implement",
    ],
    useCases: ["Enterprise privacy compliance", "Privacy ops teams", "GDPR and CCPA program management"],
  },
];
