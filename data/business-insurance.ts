export type BusinessInsuranceCategory =
  | "general-liability"
  | "professional-liability"
  | "workers-comp"
  | "commercial-property"
  | "cyber-insurance";

export interface BusinessInsuranceTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: BusinessInsuranceCategory;
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

export const BUSINESS_INSURANCE_CATEGORIES: Record<BusinessInsuranceCategory, { label: string; emoji: string; description: string; gradient: string }> = {
  "general-liability": { label: "General Liability", emoji: "🛡️", description: "Protect your business from third-party claims of bodily injury and property damage.", gradient: "from-blue-600/30 to-indigo-800/40" },
  "professional-liability": { label: "Professional Liability", emoji: "⚖️", description: "E&O insurance that covers claims of negligence, errors, and professional mistakes.", gradient: "from-emerald-600/30 to-teal-800/40" },
  "workers-comp": { label: "Workers' Compensation", emoji: "🏗️", description: "Cover employee injuries and illnesses with state-compliant workers' comp policies.", gradient: "from-amber-600/30 to-orange-800/40" },
  "commercial-property": { label: "Commercial Property", emoji: "🏢", description: "Insure your business property, equipment, and inventory against damage and theft.", gradient: "from-violet-600/30 to-purple-800/40" },
  "cyber-insurance": { label: "Cyber Insurance", emoji: "🔒", description: "Protect against data breaches, ransomware, and cyber liability costs.", gradient: "from-rose-600/30 to-red-800/40" },
};

export const BUSINESS_INSURANCE_TOOLS: BusinessInsuranceTool[] = [
  // ── GENERAL LIABILITY ───────────────────────────────────────────────────
  {
    slug: "the-hartford",
    name: "The Hartford",
    tagline: "Business insurance backed by over 200 years of experience",
    description: "The Hartford is one of the largest and most established business insurance providers in the United States, offering a full suite of commercial coverage including general liability, workers' compensation, commercial auto, and property insurance. Their small business division is endorsed by AARP and provides dedicated agents who understand the needs of growing companies. The online quote process is straightforward, and bundled Business Owner's Policies (BOPs) offer significant savings.",
    category: "general-liability",
    tags: ["business insurance", "general liability", "workers comp", "BOP", "commercial auto", "AARP endorsed", "small business"],
    url: "https://www.thehartford.com",
    pricing: "paid",
    featured: true,
    logo: "🦌",
    domain: "thehartford.com",
    pros: [
      "Over 200 years of insurance experience with strong financial ratings",
      "AARP-endorsed small business insurance with dedicated agent support",
      "Bundled BOP policies save money on liability and property coverage",
      "Wide range of industry-specific coverage options",
      "Online certificate of insurance available for instant proof",
    ],
    cons: [
      "Quotes often require a phone call to finalize pricing",
      "Not the cheapest option for very small or low-risk businesses",
      "Online self-service portal could be more modern",
      "Limited availability for some high-risk industries",
    ],
    useCases: [
      "Get a Business Owner's Policy that bundles general liability and property coverage for a retail store",
      "Add workers' compensation coverage as you hire your first employees",
      "Request a certificate of insurance online to satisfy a client's vendor requirements",
    ],
  },
  {
    slug: "next-insurance",
    name: "Next Insurance",
    tagline: "Instant online business insurance built for small businesses",
    description: "Next Insurance is a technology-first insurer that provides instant online quotes and same-day coverage for small businesses and self-employed professionals. The entire process from quote to purchase to certificate of insurance happens online in minutes. Next specializes in general liability, professional liability, commercial auto, and workers' compensation with industry-tailored policies for over 1,300 business types.",
    category: "general-liability",
    tags: ["instant insurance", "online quotes", "small business", "self-employed", "general liability", "same-day coverage", "digital insurance"],
    url: "https://www.nextinsurance.com",
    pricing: "paid",
    featured: true,
    logo: "⚡",
    domain: "nextinsurance.com",
    pros: [
      "Fully online process delivers quotes and coverage in under 10 minutes",
      "Tailored policies for over 1,300 specific business types",
      "Monthly payment options with no hidden fees or cancellation penalties",
      "Instant certificates of insurance downloadable from the dashboard",
      "Competitive pricing starting under $30/month for many business types",
    ],
    cons: [
      "Newer company with less track record than legacy insurers",
      "Complex or high-risk businesses may not find adequate coverage",
      "Claims process is less established than traditional carriers",
      "Limited human agent support compared to traditional brokers",
    ],
    useCases: [
      "Get general liability coverage in minutes before starting a new landscaping contract",
      "Download an instant certificate of insurance to satisfy a commercial lease requirement",
      "Bundle general liability and professional liability for a consulting business under $75/month",
    ],
  },
  {
    slug: "simply-business",
    name: "Simply Business",
    tagline: "Compare business insurance quotes from top carriers online",
    description: "Simply Business is an online insurance marketplace that lets small business owners compare quotes from multiple carriers side by side. Rather than selling its own policies, it aggregates options from partners to help users find the best coverage at the best price. The platform covers general liability, professional liability, and BOP policies with a streamlined quote comparison experience.",
    category: "general-liability",
    tags: ["insurance marketplace", "quote comparison", "small business", "multiple carriers", "general liability", "BOP"],
    url: "https://www.simplybusiness.com",
    pricing: "paid",
    featured: true,
    logo: "🔍",
    domain: "simplybusiness.com",
    pros: [
      "Compare quotes from multiple top-rated carriers in one place",
      "No obligation to purchase after getting quotes",
      "Transparent side-by-side coverage comparison",
      "Educational resources help first-time buyers understand coverage types",
    ],
    cons: [
      "Not a direct insurer, so claims are handled by the underlying carrier",
      "Quote availability varies by state and business type",
      "May not include every carrier in the market",
    ],
    useCases: [
      "Compare general liability quotes from five carriers to find the lowest premium for a cleaning business",
      "Use the coverage recommendation tool to understand what insurance a new food truck needs",
      "Get a BOP quote comparison to bundle liability and property insurance for a salon",
    ],
  },
  {
    slug: "progressive-commercial",
    name: "Progressive Commercial",
    tagline: "Commercial insurance from the name you already trust",
    description: "Progressive Commercial extends the well-known consumer auto insurance brand into commercial coverage, offering commercial auto, general liability, BOP, and workers' compensation. The online quoting process is fast, and existing Progressive personal policyholders may benefit from multi-policy discounts. Progressive's strength is in commercial vehicle coverage for businesses that rely on fleets or work trucks.",
    category: "general-liability",
    tags: ["commercial auto", "business insurance", "fleet insurance", "general liability", "BOP", "Progressive", "multi-policy"],
    url: "https://www.progressivecommercial.com",
    pricing: "paid",
    featured: false,
    logo: "🅿️",
    domain: "progressivecommercial.com",
  },
  {
    slug: "state-farm-business",
    name: "State Farm Business",
    tagline: "Local agent support with nationwide business insurance coverage",
    description: "State Farm provides business insurance through its massive network of local agents, offering personalized service and face-to-face policy management. Coverage includes general liability, commercial property, business auto, and umbrella policies. The local agent model appeals to business owners who prefer a relationship-based approach to insurance over purely digital transactions.",
    category: "general-liability",
    tags: ["local agent", "business insurance", "general liability", "commercial property", "business auto", "umbrella policy"],
    url: "https://www.statefarm.com/small-business-solutions",
    pricing: "paid",
    featured: false,
    logo: "🔴",
    domain: "statefarm.com",
  },
  // ── PROFESSIONAL LIABILITY ──────────────────────────────────────────────
  {
    slug: "hiscox",
    name: "Hiscox",
    tagline: "Specialized professional liability insurance for small businesses",
    description: "Hiscox is a specialist insurer focused on professional liability (E&O) coverage for service-based businesses, consultants, and technology companies. The company has deep expertise in professional risks and offers tailored policies that address the specific exposures of knowledge workers. Online quotes and purchasing make it easy to get covered, and Hiscox's claims handling is known for being efficient and fair.",
    category: "professional-liability",
    tags: ["professional liability", "E&O insurance", "consultants", "technology insurance", "errors and omissions", "specialist coverage"],
    url: "https://www.hiscox.com",
    pricing: "paid",
    featured: true,
    logo: "🔶",
    domain: "hiscox.com",
    pros: [
      "Deep specialization in professional liability for service businesses",
      "Tailored policies for IT, consulting, marketing, and creative professionals",
      "Strong financial ratings and claims-paying reputation",
      "Online quotes available with same-day coverage binding",
      "Flexible payment options including monthly billing",
    ],
    cons: [
      "General liability and property coverage is less comprehensive than full-line carriers",
      "Pricing can be higher than generalist competitors for some industries",
      "Limited physical agent network for in-person consultations",
    ],
    useCases: [
      "Get E&O coverage for a technology consulting firm before signing a major client contract",
      "Add cyber liability to a professional liability policy for a marketing agency handling client data",
      "Secure professional indemnity coverage required by a government contract for an IT services company",
    ],
  },
  {
    slug: "thimble",
    name: "Thimble",
    tagline: "On-demand business insurance by the hour, day, or month",
    description: "Thimble offers flexible, short-term business insurance policies that can be purchased by the hour, day, week, or month. It is designed for freelancers, gig workers, and small businesses that need coverage for specific events or projects rather than year-round policies. Coverage includes general liability and professional liability with instant certificates available via the mobile app.",
    category: "professional-liability",
    tags: ["on-demand insurance", "short-term coverage", "freelancer insurance", "event insurance", "flexible policies", "gig worker"],
    url: "https://www.thimble.com",
    pricing: "paid",
    featured: true,
    logo: "🧵",
    domain: "thimble.com",
  },
  {
    slug: "coverwallet",
    name: "CoverWallet",
    tagline: "Business insurance made simple with AI-powered recommendations",
    description: "CoverWallet, an Aon company, uses technology to simplify business insurance shopping with AI-driven coverage recommendations. The platform analyzes your business profile and suggests appropriate coverage levels, then provides quotes from multiple carriers. Its dashboard centralizes all policies for easy management and renewal tracking.",
    category: "professional-liability",
    tags: ["AI insurance", "Aon", "coverage recommendations", "multi-carrier", "policy management", "business insurance"],
    url: "https://www.coverwallet.com",
    pricing: "paid",
    featured: false,
    logo: "👝",
    domain: "coverwallet.com",
  },
  // ── WORKERS' COMPENSATION ───────────────────────────────────────────────
  {
    slug: "pie-insurance",
    name: "Pie Insurance",
    tagline: "Workers' compensation insurance that's easy as pie",
    description: "Pie Insurance specializes exclusively in workers' compensation coverage for small businesses, using data and technology to offer competitive rates. The fully online application takes about three minutes to complete, and policies can be bound the same day. Pie's focus on workers' comp means they understand the nuances of classification codes and experience modifications better than generalist carriers.",
    category: "workers-comp",
    tags: ["workers compensation", "small business", "online workers comp", "pay-as-you-go", "classification codes", "workplace injury"],
    url: "https://www.pieinsurance.com",
    pricing: "paid",
    featured: false,
    logo: "🥧",
    domain: "pieinsurance.com",
  },
  {
    slug: "biberk",
    name: "biBERK",
    tagline: "Small business insurance from a Berkshire Hathaway company",
    description: "biBERK is Berkshire Hathaway's direct-to-small-business insurance platform, offering workers' compensation, general liability, BOP, umbrella, and commercial auto coverage. By cutting out the middleman and selling direct, biBERK can offer competitive pricing backed by the financial strength of Berkshire Hathaway. The entire process is online with no brokers or agents involved.",
    category: "workers-comp",
    tags: ["Berkshire Hathaway", "direct insurance", "workers comp", "general liability", "BOP", "commercial auto", "no broker"],
    url: "https://www.biberk.com",
    pricing: "paid",
    featured: false,
    logo: "🅱️",
    domain: "biberk.com",
  },
  {
    slug: "nationwide-business",
    name: "Nationwide Business",
    tagline: "Comprehensive business insurance from a Fortune 100 insurer",
    description: "Nationwide offers a full portfolio of commercial insurance products including general liability, professional liability, workers' compensation, commercial property, and cyber insurance. As a Fortune 100 company, Nationwide provides the financial stability and claims-handling infrastructure that larger businesses require. Local agents provide personalized service and industry-specific guidance.",
    category: "workers-comp",
    tags: ["Fortune 100", "comprehensive insurance", "workers comp", "commercial property", "local agent", "cyber insurance"],
    url: "https://www.nationwide.com/business",
    pricing: "paid",
    featured: false,
    logo: "🏠",
    domain: "nationwide.com",
  },
  // ── COMMERCIAL PROPERTY ─────────────────────────────────────────────────
  {
    slug: "travelers-business",
    name: "Travelers Business",
    tagline: "Commercial property and casualty insurance from a Dow Jones leader",
    description: "Travelers is one of the largest commercial property and casualty insurers in the United States, offering comprehensive coverage for businesses of all sizes. Their commercial property insurance covers buildings, equipment, inventory, and business interruption with industry-leading risk management resources. Travelers' strength lies in complex commercial risks and large property portfolios.",
    category: "commercial-property",
    tags: ["commercial property", "casualty insurance", "business interruption", "risk management", "equipment coverage", "large business"],
    url: "https://www.travelers.com/business-insurance",
    pricing: "paid",
    featured: false,
    logo: "☂️",
    domain: "travelers.com",
  },
  {
    slug: "embroker",
    name: "Embroker",
    tagline: "Tech-forward business insurance for startups and tech companies",
    description: "Embroker is an insurance platform built for startups, technology companies, and venture-backed businesses. It offers D&O, E&O, cyber liability, and EPLI coverage tailored to the risks that tech companies face. The platform's digital-first approach provides fast quotes and policy management with coverage designed around the startup lifecycle from seed to IPO.",
    category: "commercial-property",
    tags: ["startup insurance", "tech company", "D&O insurance", "cyber liability", "venture-backed", "EPLI", "digital insurance"],
    url: "https://www.embroker.com",
    pricing: "paid",
    featured: false,
    logo: "🚀",
    domain: "embroker.com",
  },
  // ── CYBER INSURANCE ─────────────────────────────────────────────────────
  {
    slug: "ap-intego",
    name: "AP Intego",
    tagline: "Business insurance marketplace with payroll integration",
    description: "AP Intego provides a business insurance marketplace with a focus on integrating insurance purchasing and management with payroll platforms. Their workers' comp pay-as-you-go model ties premiums to actual payroll data, eliminating large upfront deposits and surprise audit adjustments. The platform partners with payroll providers including Gusto and Square.",
    category: "cyber-insurance",
    tags: ["payroll integration", "workers comp", "pay-as-you-go", "insurance marketplace", "Gusto", "Square", "small business"],
    url: "https://www.apintego.com",
    pricing: "paid",
    featured: false,
    logo: "🔗",
    domain: "apintego.com",
  },
  {
    slug: "bold-penguin",
    name: "Bold Penguin",
    tagline: "Commercial insurance exchange connecting agents with carriers",
    description: "Bold Penguin operates a commercial insurance exchange that connects insurance agents, brokers, and carriers to streamline the quoting and binding process. Rather than selling directly to businesses, Bold Penguin powers the infrastructure that makes commercial insurance distribution more efficient. Small business owners benefit indirectly through faster quotes and more competitive options from participating agents.",
    category: "cyber-insurance",
    tags: ["insurance exchange", "commercial insurance", "agent platform", "carrier connection", "quote streamlining", "insurance technology"],
    url: "https://www.boldpenguin.com",
    pricing: "paid",
    featured: false,
    logo: "🐧",
    domain: "boldpenguin.com",
  },
];
