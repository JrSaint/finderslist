export type RealEstateCategory = "crm" | "transaction-management" | "lead-generation" | "property-management" | "investor-tools";

export interface RealEstateTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: RealEstateCategory;
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

export const REAL_ESTATE_CATEGORIES: Record<RealEstateCategory, { label: string; emoji: string; description: string; gradient: string }> = {
  "crm": { label: "Real Estate CRM", emoji: "📇", description: "CRM platforms built for agents and brokerages to manage leads and clients.", gradient: "from-amber-600/30 to-orange-800/40" },
  "transaction-management": { label: "Transaction Management", emoji: "📝", description: "Tools for managing contracts, disclosures, and closing workflows digitally.", gradient: "from-blue-600/30 to-indigo-800/40" },
  "lead-generation": { label: "Lead Generation", emoji: "🎯", description: "Platforms for generating, capturing, and nurturing real estate leads.", gradient: "from-green-600/30 to-emerald-800/40" },
  "property-management": { label: "Property Management", emoji: "🏘️", description: "Software for managing rental properties, tenants, and maintenance requests.", gradient: "from-purple-600/30 to-violet-800/40" },
  "investor-tools": { label: "Investor & Analysis", emoji: "📊", description: "Tools for real estate investors including deal analysis and portfolio management.", gradient: "from-red-600/30 to-rose-800/40" },
};

export const REAL_ESTATE_TOOLS: RealEstateTool[] = [
  {
    slug: "follow-up-boss",
    name: "Follow Up Boss",
    tagline: "The #1 real estate CRM for high-performing teams and agents",
    description: "Follow Up Boss is the CRM of choice for top-producing real estate teams. It aggregates leads from 250+ sources (Zillow, Realtor.com, Facebook, your website) into one inbox and routes them to agents automatically. Smart Lists surface the hottest leads based on engagement, and the built-in dialer, texting, and email make it easy to work leads without switching tools. Follow Up Boss is known for the fastest speed-to-lead in the industry — leads are routed and contacted in seconds.",
    category: "crm",
    tags: ["follow up boss", "real estate crm", "lead routing", "speed to lead", "team management", "agents"],
    url: "https://www.followupboss.com",
    affiliateUrl: "https://www.followupboss.com",
    pricing: "paid",
    featured: true,
    logo: "⭐",
    domain: "followupboss.com",
    pros: ["Aggregates leads from 250+ sources into one inbox automatically", "Industry-fastest speed-to-lead with instant routing and response", "Smart Lists surface the most engaged leads for priority follow-up", "Built-in calling, texting, and email — no switching tools", "Excellent reporting on agent performance and lead source ROI"],
    cons: ["Pricing starts at $69/month and scales up quickly for teams", "No built-in transaction management — requires integration", "Learning curve for setting up automation rules and action plans", "Mobile app is functional but not as polished as desktop"],
    useCases: ["High-volume real estate teams managing hundreds of leads monthly", "Agents wanting to optimize speed-to-lead across multiple lead sources", "Brokerages needing visibility into agent performance and lead ROI"],
  },
  {
    slug: "kvcore",
    name: "kvCORE",
    tagline: "All-in-one real estate platform with IDX website, CRM, and marketing",
    description: "kvCORE (by Inside Real Estate) is a comprehensive real estate technology platform combining IDX websites, CRM, lead generation, marketing automation, and transaction management. It serves over 300,000 agents across major brokerages. The platform includes AI-powered lead scoring, behavioral automation, and a smart CRM that prioritizes your most engaged contacts. kvCORE's breadth makes it a one-stop solution for brokerages wanting a unified tech stack.",
    category: "crm",
    tags: ["kvcore", "real estate platform", "idx website", "lead generation", "brokerage", "all-in-one"],
    url: "https://insiderealestate.com/kvcore/",
    pricing: "paid",
    featured: true,
    logo: "🏠",
    domain: "insiderealestate.com",
    pros: ["All-in-one platform: IDX website, CRM, marketing, and transactions", "AI-powered lead scoring prioritizes highest-potential contacts", "Serves 300,000+ agents — proven at scale", "Behavioral automation triggers follow-up based on lead activity", "Built-in listing marketing with automated social media posts"],
    cons: ["Complex platform with steep learning curve", "Pricing requires contacting sales — not transparent", "Being all-in-one means some features aren't as deep as specialists", "Customer support can be slow during peak times"],
    useCases: ["Brokerages wanting a single platform for their entire tech stack", "Teams needing IDX websites with integrated lead capture and CRM", "Agents wanting AI-powered lead prioritization and automated follow-up"],
  },
  {
    slug: "dotloop",
    name: "Dotloop",
    tagline: "Real estate transaction management with e-signatures and compliance",
    description: "Dotloop (owned by Zillow Group) is the leading transaction management platform in real estate. It handles the entire transaction workflow: document creation, e-signatures, compliance review, and audit trail. Dotloop's editor lets agents fill out, edit, and sign contracts from any device. Used by 9,000+ brokerages and 200+ MLS organizations, it's deeply embedded in the real estate industry's transaction workflow.",
    category: "transaction-management",
    tags: ["dotloop", "transaction management", "e-signatures", "compliance", "zillow", "contracts"],
    url: "https://www.dotloop.com",
    pricing: "freemium",
    featured: true,
    logo: "🔄",
    domain: "dotloop.com",
    pros: ["Industry standard used by 9,000+ brokerages and 200+ MLS orgs", "Complete transaction workflow from contract to closing", "E-signatures, document editing, and compliance in one platform", "Mobile-friendly — agents can manage transactions from their phone", "Free plan available for individual agents"],
    cons: ["Owned by Zillow — some agents prefer platform-independent tools", "Document editor can be clunky for complex form editing", "Storage limits on lower-tier plans", "Integration options are more limited than DocuSign"],
    useCases: ["Real estate agents managing contracts and e-signatures digitally", "Brokerages needing compliance review and audit trails for transactions", "Teams wanting a shared transaction workspace with clients and agents"],
  },
  {
    slug: "zillow-premier-agent",
    name: "Zillow Premier Agent",
    tagline: "The largest real estate lead generation platform in the US",
    description: "Zillow Premier Agent connects agents with home buyers and sellers through Zillow's massive traffic (over 200 million monthly visitors). Agents pay for advertising placement on Zillow, Trulia, and StreetEasy to receive exclusive or shared leads in their target zip codes. It's the most expensive but highest-volume lead source in real estate. The platform includes a basic CRM, lead management, and performance tracking.",
    category: "lead-generation",
    tags: ["zillow", "premier agent", "lead generation", "buyer leads", "advertising", "real estate leads"],
    url: "https://www.zillow.com/premier-agent/",
    pricing: "paid",
    featured: true,
    logo: "🏡",
    domain: "zillow.com",
    pros: ["Access to 200M+ monthly visitors — largest real estate audience", "High-intent leads from buyers actively searching properties", "Targeting by zip code for hyperlocal lead generation", "Includes basic CRM and lead management tools", "Brand exposure on Zillow, Trulia, and StreetEasy listings"],
    cons: ["Very expensive — costs can run $1,000+/month in competitive markets", "Leads are often shared with other agents unless you buy exclusivity", "Lead quality varies significantly by market and price point", "ROI can be unpredictable and requires consistent follow-up"],
    useCases: ["Agents wanting high-volume buyer leads in specific zip codes", "Teams with strong follow-up systems to convert Zillow leads", "New agents needing to quickly build a pipeline in a new market"],
  },
  {
    slug: "appfolio",
    name: "AppFolio",
    tagline: "Modern property management software for residential and commercial portfolios",
    description: "AppFolio is one of the two leading property management platforms (alongside Buildium). It handles everything property managers need: tenant screening, online rent collection, maintenance requests, accounting, and owner reporting. AppFolio's AI-powered features include smart maintenance coordination, automated communications, and intelligent screening. It serves property managers with 50-10,000+ units.",
    category: "property-management",
    tags: ["appfolio", "property management", "rent collection", "tenant screening", "maintenance", "accounting"],
    url: "https://www.appfolio.com",
    pricing: "paid",
    featured: true,
    logo: "🏢",
    domain: "appfolio.com",
    pros: ["Comprehensive platform covering the full property management workflow", "AI-powered features for maintenance coordination and screening", "Online rent collection with tenant portal", "Strong accounting with owner statements and reporting", "Modern, intuitive interface that tenants and owners actually use"],
    cons: ["Minimum unit requirements — not ideal for very small portfolios", "Pricing per unit adds up for larger portfolios", "Implementation and onboarding takes several weeks", "Some advanced features require add-on fees"],
    useCases: ["Property managers with 50-5,000+ residential units", "Commercial property management needing CAM reconciliation", "Management companies wanting to modernize with AI-powered tools"],
  },
  { slug: "skyslope", name: "SkySlope", tagline: "Real estate transaction management and digital audit platform", description: "SkySlope provides transaction management, digital signatures, and audit compliance for real estate brokerages. Its DigiSign feature handles e-signatures, and the compliance dashboard gives brokers visibility into every transaction's status and missing documents.", category: "transaction-management", tags: ["skyslope", "transaction management", "e-signatures", "compliance", "audit", "brokerage"], url: "https://skyslope.com", pricing: "paid", featured: false, logo: "📋", domain: "skyslope.com" },
  { slug: "buildium", name: "Buildium", tagline: "Property management software for residential managers and community associations", description: "Buildium serves residential property managers and community associations with tenant management, online rent collection, accounting, maintenance tracking, and a tenant portal. It handles 1M+ properties and is particularly popular with small to mid-sized management companies.", category: "property-management", tags: ["buildium", "property management", "residential", "hoa", "rent collection", "tenant portal"], url: "https://www.buildium.com", pricing: "paid", featured: false, logo: "🏠", domain: "buildium.com" },
  { slug: "realgeeks", name: "Real Geeks", tagline: "Real estate websites and CRM designed for lead generation and conversion", description: "Real Geeks provides IDX real estate websites with integrated CRM and Facebook advertising tools. The platform focuses on lead generation through high-converting websites, PPC management, and automated nurture campaigns. Known for strong ROI on advertising spend.", category: "lead-generation", tags: ["real geeks", "idx website", "lead generation", "facebook ads", "ppc", "conversion"], url: "https://www.realgeeks.com", pricing: "paid", featured: false, logo: "🤓", domain: "realgeeks.com" },
  { slug: "rent-manager", name: "Rent Manager", tagline: "Flexible property management software for diverse real estate portfolios", description: "Rent Manager is a highly customizable property management platform handling residential, commercial, and mixed portfolios. It offers accounting, maintenance, tenant screening, and a built-in API for custom integrations. Popular with larger management companies needing flexibility.", category: "property-management", tags: ["rent manager", "property management", "commercial", "customizable", "accounting", "api"], url: "https://www.rentmanager.com", pricing: "paid", featured: false, logo: "🔧", domain: "rentmanager.com" },
  { slug: "boomtown", name: "BoomTown", tagline: "Real estate lead generation and CRM platform for teams", description: "BoomTown combines IDX websites, PPC advertising management, and CRM for real estate teams. The platform's Success Assurance program provides lead concierge services to qualify and nurture leads before passing them to agents. Known for high-quality lead generation.", category: "lead-generation", tags: ["boomtown", "lead generation", "ppc management", "concierge", "real estate teams", "idx"], url: "https://boomtownroi.com", pricing: "paid", featured: false, logo: "💥", domain: "boomtownroi.com" },
  { slug: "dealcheck", name: "DealCheck", tagline: "Real estate investment analysis for rental, flip, and BRRRR deals", description: "DealCheck lets real estate investors analyze rental properties, fix-and-flips, BRRRR deals, and multifamily investments. It calculates cash flow, ROI, cap rate, and other metrics with detailed financial projections. Import property data from MLS listings and generate professional reports for partners and lenders.", category: "investor-tools", tags: ["dealcheck", "investment analysis", "rental property", "fix and flip", "brrrr", "cash flow"], url: "https://dealcheck.io", pricing: "freemium", featured: false, logo: "📊", domain: "dealcheck.io" },
  { slug: "stessa", name: "Stessa", tagline: "Free rental property financial management and tracking for investors", description: "Stessa (part of Roofstock) provides free financial management tools for rental property investors. It automatically tracks income, expenses, and performance metrics across your portfolio. Bank account linking, receipt capture, and tax-ready reports simplify rental property accounting.", category: "investor-tools", tags: ["stessa", "rental tracking", "portfolio management", "free", "roofstock", "tax reporting"], url: "https://www.stessa.com", pricing: "free", featured: false, logo: "📈", domain: "stessa.com" },
  { slug: "wise-agent", name: "Wise Agent", tagline: "Affordable all-in-one real estate CRM for agents and small teams", description: "Wise Agent is an affordable real estate CRM ($49/mo flat) with contact management, transaction tracking, email marketing, and landing pages. Known for excellent customer support and fair pricing, it's a favorite among solo agents and small teams.", category: "crm", tags: ["wise agent", "affordable crm", "real estate", "email marketing", "transaction tracking", "solo agent"], url: "https://wiseagent.com", pricing: "paid", featured: false, logo: "🦉", domain: "wiseagent.com" },
  { slug: "reipro", name: "REIPro", tagline: "All-in-one real estate investment software for finding and analyzing deals", description: "REIPro helps real estate investors find motivated sellers, analyze deals, generate marketing campaigns, and manage leads. It includes comps analysis, direct mail marketing, and deal calculators. Designed for active investors and wholesalers.", category: "investor-tools", tags: ["reipro", "motivated sellers", "wholesaling", "deal analysis", "direct mail", "investor crm"], url: "https://reipro.io", pricing: "paid", featured: false, logo: "🏗️", domain: "reipro.io" },
  { slug: "propertyware", name: "Propertyware", tagline: "Property management software for single-family rental portfolios", description: "Propertyware specializes in single-family rental management — a niche underserved by platforms focused on multifamily. It handles accounting, maintenance, online payments, owner portals, and marketing. Owned by RealPage, it integrates with the broader RealPage ecosystem.", category: "property-management", tags: ["propertyware", "single family", "rental management", "realpage", "owner portal", "accounting"], url: "https://www.propertyware.com", pricing: "paid", featured: false, logo: "🏡", domain: "propertyware.com" },
];
