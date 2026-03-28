export type EstatePlanningCategory =
  | "wills-trusts"
  | "power-of-attorney"
  | "healthcare-directives"
  | "estate-administration"
  | "digital-estate";

export interface EstatePlanningTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: EstatePlanningCategory;
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

export const ESTATE_PLANNING_CATEGORIES: Record<EstatePlanningCategory, { label: string; emoji: string; description: string; gradient: string }> = {
  "wills-trusts": { label: "Wills & Trusts", emoji: "📜", description: "Create legally valid wills, living trusts, and testamentary documents online.", gradient: "from-amber-600/30 to-yellow-800/40" },
  "power-of-attorney": { label: "Power of Attorney", emoji: "🤝", description: "Designate trusted agents to make financial and legal decisions on your behalf.", gradient: "from-blue-600/30 to-indigo-800/40" },
  "healthcare-directives": { label: "Healthcare Directives", emoji: "🏥", description: "Document your medical wishes with living wills and healthcare proxy forms.", gradient: "from-emerald-600/30 to-teal-800/40" },
  "estate-administration": { label: "Estate Administration", emoji: "📋", description: "Tools for executors and administrators managing probate and estate settlement.", gradient: "from-violet-600/30 to-purple-800/40" },
  "digital-estate": { label: "Digital Estate", emoji: "💻", description: "Manage digital assets, online accounts, and digital legacy planning.", gradient: "from-rose-600/30 to-red-800/40" },
};

export const ESTATE_PLANNING_TOOLS: EstatePlanningTool[] = [
  // ── WILLS & TRUSTS ──────────────────────────────────────────────────────
  {
    slug: "trust-and-will",
    name: "Trust & Will",
    tagline: "Modern estate planning designed for the way you live today",
    description: "Trust & Will is the leading online estate planning platform, offering state-specific wills, trusts, and guardianship documents through a guided questionnaire that takes about 15 minutes to complete. The platform was designed to make estate planning accessible to younger generations who might otherwise put it off indefinitely. Documents are reviewed by estate planning attorneys in each state, and the platform provides ongoing updates as laws change.",
    category: "wills-trusts",
    tags: ["estate planning", "online will", "living trust", "guardianship", "state-specific", "attorney reviewed", "digital estate"],
    url: "https://trustandwill.com",
    pricing: "paid",
    featured: true,
    logo: "📜",
    domain: "trustandwill.com",
    pros: [
      "State-specific documents reviewed by licensed estate attorneys",
      "Clean, modern interface that completes in about 15 minutes",
      "Includes guardianship nomination for parents with minor children",
      "Unlimited updates to documents as life circumstances change",
      "Trust-based plans available for those wanting to avoid probate",
    ],
    cons: [
      "More expensive than bare-bones will generators",
      "No live attorney consultation included in base pricing",
      "Trust plans require additional investment over simple will plans",
      "Limited customization for complex multi-state estate situations",
    ],
    useCases: [
      "Create a will and guardianship nomination for minor children after the birth of a first child",
      "Set up a revocable living trust to avoid probate on a home and investment accounts",
      "Update beneficiary designations and power of attorney after a marriage or divorce",
    ],
  },
  {
    slug: "legalzoom",
    name: "LegalZoom",
    tagline: "The most recognized name in online legal document services",
    description: "LegalZoom is the largest online legal services platform in the United States, offering estate planning documents alongside business formation, trademark, and other legal services. Their estate planning products include last wills, living trusts, power of attorney, and healthcare directives. The guided process walks users through each decision with plain-English explanations, and optional attorney review adds professional oversight.",
    category: "wills-trusts",
    tags: ["legal documents", "online will", "living trust", "power of attorney", "attorney review", "legal services", "estate planning"],
    url: "https://www.legalzoom.com",
    pricing: "paid",
    featured: true,
    logo: "⚖️",
    domain: "legalzoom.com",
    pros: [
      "Most recognized and trusted brand in online legal services",
      "Comprehensive document library beyond just estate planning",
      "Optional attorney review available for additional assurance",
      "30-day satisfaction guarantee on all documents",
      "Large customer base provides confidence in document validity",
    ],
    cons: [
      "Pricing is higher than specialized estate planning platforms",
      "Documents can feel generic compared to attorney-drafted alternatives",
      "Upselling during the process can feel aggressive",
      "Customer support wait times can be lengthy during peak periods",
    ],
    useCases: [
      "Create a basic last will and testament with asset distribution instructions",
      "Add power of attorney documents to your estate plan during the same session",
      "Upgrade to attorney review for a living trust that includes real estate and investment accounts",
    ],
  },
  {
    slug: "nolo",
    name: "Nolo",
    tagline: "Legal information and DIY tools from the self-help law pioneer",
    description: "Nolo has been the leading publisher of self-help legal information for over 50 years, offering estate planning software, books, and online resources. Their Quicken WillMaker product is a comprehensive desktop and online tool for creating wills, trusts, healthcare directives, and financial power of attorney documents. Nolo's educational approach helps users understand the legal concepts behind their documents.",
    category: "wills-trusts",
    tags: ["self-help law", "WillMaker", "legal education", "DIY legal", "estate documents", "legal guides", "probate"],
    url: "https://www.nolo.com",
    pricing: "paid",
    featured: true,
    logo: "📚",
    domain: "nolo.com",
    pros: [
      "Over 50 years of self-help legal publishing expertise",
      "WillMaker software creates comprehensive estate document packages",
      "Extensive educational content explains the law behind each document",
      "One-time purchase covers wills, trusts, healthcare directives, and more",
      "Regular updates keep documents current with changing state laws",
    ],
    cons: [
      "Interface feels more utilitarian than modern competitors",
      "Desktop software approach feels dated compared to web-first platforms",
      "No attorney review or legal advice included",
    ],
    useCases: [
      "Use WillMaker to create a complete estate planning package including will, healthcare directive, and POA",
      "Reference Nolo's legal guides to understand the difference between a will and a living trust",
      "Create a pet trust to ensure care for animals after your passing",
    ],
  },
  {
    slug: "rocket-lawyer",
    name: "Rocket Lawyer",
    tagline: "Legal documents with on-call attorney access when you need it",
    description: "Rocket Lawyer combines document generation with access to a network of attorneys for consultations and document review. Their estate planning offerings include wills, living trusts, power of attorney, and healthcare directives. The membership model provides ongoing access to legal documents and attorney consultations, making it suitable for people who anticipate multiple legal needs over time.",
    category: "wills-trusts",
    tags: ["legal documents", "attorney access", "membership legal", "online will", "living trust", "legal consultation", "document review"],
    url: "https://www.rocketlawyer.com",
    pricing: "freemium",
    featured: true,
    logo: "🚀",
    domain: "rocketlawyer.com",
    pros: [
      "On-call attorney network available for document review and questions",
      "Membership includes unlimited document creation across all legal categories",
      "Free trial period lets you create documents before committing",
      "Attorney consultations included for members at no extra charge",
    ],
    cons: [
      "Monthly subscription model is more expensive long-term than one-time purchases",
      "Free tier requires membership to finalize and download documents",
      "Attorney availability varies by state and specialty",
      "Document templates may be less customizable than dedicated estate platforms",
    ],
    useCases: [
      "Create a will and schedule a free attorney consultation to review it as part of your membership",
      "Generate power of attorney and healthcare directive documents in the same session",
      "Use the membership to handle estate planning, business contracts, and landlord forms all year",
    ],
  },
  {
    slug: "freewill",
    name: "FreeWill",
    tagline: "Create your will for free and leave a legacy that matters",
    description: "FreeWill offers free online will creation funded by nonprofit partnerships. Users can create a legally valid will in about 20 minutes while optionally including charitable bequests to participating organizations. The platform is genuinely free with no upsells, making estate planning accessible to everyone regardless of budget.",
    category: "wills-trusts",
    tags: ["free will", "charitable giving", "nonprofit partner", "estate planning", "legacy planning", "accessible legal"],
    url: "https://www.freewill.com",
    pricing: "free",
    featured: true,
    logo: "🕊️",
    domain: "freewill.com",
  },
  // ── POWER OF ATTORNEY ───────────────────────────────────────────────────
  {
    slug: "willing",
    name: "Willing",
    tagline: "Simple and free online will maker for basic estate plans",
    description: "Willing provides a streamlined, free will-creation process that covers the essentials without overwhelming users with options. The platform focuses on simplicity, letting users create a will, designate beneficiaries, and name guardians in a matter of minutes. It is backed by MetLife and designed for people who need basic estate documents without complexity.",
    category: "power-of-attorney",
    tags: ["free will maker", "MetLife", "simple estate plan", "beneficiaries", "guardianship", "basic will"],
    url: "https://willing.com",
    pricing: "free",
    featured: false,
    logo: "✅",
    domain: "willing.com",
  },
  {
    slug: "tomorrow",
    name: "Tomorrow",
    tagline: "Family estate planning and life insurance in one app",
    description: "Tomorrow combines estate planning with life insurance, offering free wills, trusts, and guardianship documents alongside affordable term life coverage. The app-first approach makes it easy for young families to check both estate planning and life insurance off their list in a single session on their phone.",
    category: "power-of-attorney",
    tags: ["family estate planning", "life insurance", "mobile estate plan", "guardianship", "free will", "young families"],
    url: "https://www.tomorrow.me",
    pricing: "freemium",
    featured: false,
    logo: "🌅",
    domain: "tomorrow.me",
  },
  {
    slug: "gentreo",
    name: "Gentreo",
    tagline: "Create, store, and share estate documents digitally",
    description: "Gentreo offers digital estate planning with a focus on document storage and sharing. Users create wills, power of attorney, and healthcare proxy documents, then securely store and share them with designated family members and agents through an encrypted digital vault. The platform emphasizes making documents accessible when they are actually needed.",
    category: "power-of-attorney",
    tags: ["digital vault", "document sharing", "estate documents", "healthcare proxy", "power of attorney", "secure storage"],
    url: "https://www.gentreo.com",
    pricing: "paid",
    featured: false,
    logo: "🔐",
    domain: "gentreo.com",
  },
  // ── HEALTHCARE DIRECTIVES ───────────────────────────────────────────────
  {
    slug: "estate-guru",
    name: "Estate Guru",
    tagline: "Guided estate planning with educational support",
    description: "Estate Guru provides estate planning tools with an emphasis on educating users about their options. The platform walks users through the implications of each estate planning decision and helps them understand concepts like probate avoidance, trust funding, and beneficiary designations before making choices.",
    category: "healthcare-directives",
    tags: ["estate education", "guided planning", "probate avoidance", "trust funding", "beneficiary planning", "estate tools"],
    url: "https://www.estateguru.co",
    pricing: "paid",
    featured: false,
    logo: "🎓",
    domain: "estateguru.co",
  },
  {
    slug: "do-your-own-will",
    name: "Do Your Own Will",
    tagline: "Free online will creation with state-specific templates",
    description: "Do Your Own Will offers free, state-specific will templates that users can fill out and print at home. The platform provides step-by-step guidance through each section of the will and explains the witnessing and notarization requirements for each state. It is a straightforward option for people with simple estates who want to avoid any cost.",
    category: "healthcare-directives",
    tags: ["free will template", "state-specific", "printable will", "DIY will", "simple estate", "no cost"],
    url: "https://www.doyourownwill.com",
    pricing: "free",
    featured: false,
    logo: "✍️",
    domain: "doyourownwill.com",
  },
  // ── ESTATE ADMINISTRATION ───────────────────────────────────────────────
  {
    slug: "cake",
    name: "Cake",
    tagline: "End-of-life planning for yourself and the people you love",
    description: "Cake is a comprehensive end-of-life planning platform that covers everything from advance directives and funeral planning to digital legacy management. The free platform helps users document their wishes across medical care, financial matters, and personal preferences, then share those plans with family members. Cake's unique approach treats estate planning as part of broader life planning rather than just legal paperwork.",
    category: "estate-administration",
    tags: ["end-of-life planning", "advance directive", "funeral planning", "digital legacy", "family sharing", "life planning"],
    url: "https://www.joincake.com",
    pricing: "free",
    featured: false,
    logo: "🎂",
    domain: "joincake.com",
  },
  {
    slug: "everplans",
    name: "Everplans",
    tagline: "Organize and securely share your most important information",
    description: "Everplans provides a digital vault for organizing estate documents, insurance policies, financial accounts, and personal wishes. Users can designate deputies who receive access to specific information based on triggers. The platform is often offered as an employee benefit through financial advisors and employers, though individual plans are available directly.",
    category: "estate-administration",
    tags: ["digital vault", "document organization", "deputy access", "employee benefit", "estate organization", "information sharing"],
    url: "https://www.everplans.com",
    pricing: "paid",
    featured: false,
    logo: "🗄️",
    domain: "everplans.com",
  },
  // ── DIGITAL ESTATE ──────────────────────────────────────────────────────
  {
    slug: "fabric",
    name: "Fabric",
    tagline: "Financial planning for families with wills and life insurance",
    description: "Fabric (formerly Fabric by Gerber Life) offers free wills and affordable term life insurance designed for busy parents. The mobile-first platform lets parents create a will, set up guardianship, and get life insurance quotes in the same session. Fabric's integration of insurance and estate planning addresses the two most common financial planning gaps for young families.",
    category: "digital-estate",
    tags: ["family planning", "free will", "life insurance", "guardianship", "mobile-first", "parents", "Gerber Life"],
    url: "https://www.meetfabric.com",
    pricing: "freemium",
    featured: false,
    logo: "🧵",
    domain: "meetfabric.com",
  },
  {
    slug: "netlaw",
    name: "NetLaw",
    tagline: "Attorney-drafted estate planning document packages",
    description: "NetLaw provides estate planning document packages that are drafted and reviewed by licensed attorneys. Unlike template-based platforms, NetLaw's documents go through professional legal review before delivery. The service covers wills, trusts, powers of attorney, and healthcare directives with state-specific legal compliance.",
    category: "digital-estate",
    tags: ["attorney drafted", "legal review", "estate documents", "professional estate plan", "state compliant", "trust documents"],
    url: "https://www.netlaw.com",
    pricing: "paid",
    featured: false,
    logo: "⚖️",
    domain: "netlaw.com",
  },
  {
    slug: "uslegalwills",
    name: "USLegalWills",
    tagline: "Affordable online wills with lifetime updates included",
    description: "USLegalWills offers straightforward online will creation with lifetime update access included in the one-time purchase price. The platform covers wills, living wills, and power of attorney documents with a clean guided process. Their pricing model is transparent with no subscriptions or recurring fees required to maintain access to your documents.",
    category: "digital-estate",
    tags: ["affordable will", "lifetime updates", "no subscription", "online will", "living will", "power of attorney", "one-time fee"],
    url: "https://www.uslegalwills.com",
    pricing: "paid",
    featured: false,
    logo: "🇺🇸",
    domain: "uslegalwills.com",
  },
];
