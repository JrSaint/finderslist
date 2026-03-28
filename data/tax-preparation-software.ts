export type TaxPrepCategory =
  | "diy-filing"
  | "professional-assisted"
  | "business-tax"
  | "tax-planning"
  | "state-specific";

export interface TaxPrepTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: TaxPrepCategory;
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

export const TAX_PREP_CATEGORIES: Record<TaxPrepCategory, { label: string; emoji: string; description: string; gradient: string }> = {
  "diy-filing": { label: "DIY Filing", emoji: "📝", description: "File your own taxes with guided software that walks you through every deduction.", gradient: "from-blue-600/30 to-indigo-800/40" },
  "professional-assisted": { label: "Professional Assisted", emoji: "👨‍💼", description: "Get expert help from CPAs and tax professionals while filing online.", gradient: "from-emerald-600/30 to-teal-800/40" },
  "business-tax": { label: "Business Tax", emoji: "🏢", description: "Specialized tools for business returns, S-corps, partnerships, and LLCs.", gradient: "from-amber-600/30 to-orange-800/40" },
  "tax-planning": { label: "Tax Planning", emoji: "📊", description: "Year-round tax strategy tools to minimize your liability before filing season.", gradient: "from-violet-600/30 to-purple-800/40" },
  "state-specific": { label: "State-Specific", emoji: "🗺️", description: "Filing tools optimized for state returns and multi-state tax situations.", gradient: "from-rose-600/30 to-red-800/40" },
};

export const TAX_PREP_TOOLS: TaxPrepTool[] = [
  // ── DIY FILING ──────────────────────────────────────────────────────────
  {
    slug: "turbotax",
    name: "TurboTax",
    tagline: "America's most popular tax preparation software",
    description: "TurboTax by Intuit is the dominant consumer tax software in the United States, processing hundreds of millions of returns since its launch. Its interview-style interface walks filers through income, deductions, and credits with plain-English questions. TurboTax's accuracy guarantee and maximum refund promise give users confidence, while its tiered pricing covers everything from simple W-2 returns to complex investment and self-employment situations.",
    category: "diy-filing",
    tags: ["tax filing", "tax preparation", "refund maximizer", "deduction finder", "W-2 filing", "self-employment tax"],
    url: "https://turbotax.intuit.com",
    pricing: "freemium",
    featured: true,
    logo: "🟢",
    domain: "turbotax.intuit.com",
    pros: [
      "Most polished user experience with step-by-step interview guidance",
      "Accuracy guarantee and maximum refund promise backed by Intuit",
      "Automatic import of W-2s, 1099s, and prior-year returns",
      "Live expert access available at every tier for an additional fee",
      "Handles complex situations including investments, rental income, and crypto",
    ],
    cons: [
      "Most expensive option, with aggressive upselling during the filing process",
      "Free tier is limited to very simple returns only",
      "State filing costs extra on most tiers",
      "Price increases as you progress through filing, creating sunk-cost pressure",
    ],
    useCases: [
      "Import your W-2 by photographing it and let TurboTax auto-fill your federal return",
      "Use the self-employed tier to track freelance deductions like home office and mileage",
      "Upgrade to Live Assisted for a CPA review before submitting a return with investment income",
    ],
  },
  {
    slug: "hr-block",
    name: "H&R Block",
    tagline: "Tax prep with the option to walk into 12,000+ offices",
    description: "H&R Block offers both online tax software and in-person filing at thousands of retail locations, giving filers the flexibility to start online and finish with a human if things get complicated. The online product covers free simple returns through complex self-employment situations. H&R Block's hybrid model is a unique advantage for people who want digital convenience with the safety net of professional help nearby.",
    category: "diy-filing",
    tags: ["tax filing", "in-person tax help", "tax preparation", "hybrid filing", "refund advance", "tax professional"],
    url: "https://www.hrblock.com",
    pricing: "freemium",
    featured: true,
    logo: "🟩",
    domain: "hrblock.com",
    pros: [
      "Hybrid model lets you start online and switch to in-person at 12,000+ locations",
      "Free tier covers more situations than TurboTax's free edition",
      "Refund advance loan available at no interest for early filers",
      "Strong import tools for W-2s, 1099s, and prior-year data from competitors",
    ],
    cons: [
      "Online interface is functional but less polished than TurboTax",
      "Upselling to premium tiers can be persistent during filing",
      "In-person pricing is significantly higher than online-only filing",
    ],
    useCases: [
      "File a simple W-2 return for free online and get your refund direct-deposited",
      "Start your return online, then book an in-person appointment when you discover Schedule C complexity",
      "Use the refund advance to access up to $3,500 of your refund before the IRS processes it",
    ],
  },
  {
    slug: "taxact",
    name: "TaxAct",
    tagline: "Affordable tax filing software with strong value pricing",
    description: "TaxAct has built its reputation on offering comprehensive tax preparation at a lower price point than TurboTax and H&R Block. It supports all major form types including self-employment, investment income, and rental properties. The interface is straightforward and the accuracy guarantee provides peace of mind, making TaxAct a solid choice for cost-conscious filers who do not need hand-holding through the process.",
    category: "diy-filing",
    tags: ["affordable tax filing", "tax preparation", "budget tax software", "deduction finder", "tax forms", "self-employment"],
    url: "https://www.taxact.com",
    pricing: "freemium",
    featured: true,
    logo: "📋",
    domain: "taxact.com",
    pros: [
      "Significantly cheaper than TurboTax across all tiers",
      "Covers all major tax situations including self-employment and investments",
      "Price lock guarantee prevents mid-filing price increases",
      "Accuracy guarantee with up to $100,000 in protection",
      "Prior-year data import works from most major competitors",
    ],
    cons: [
      "Interface feels dated compared to TurboTax's modern design",
      "Less hand-holding guidance for first-time filers",
      "Customer support options are more limited on lower tiers",
    ],
    useCases: [
      "File a moderately complex return with investment 1099s at half the cost of TurboTax",
      "Lock in your filing price early in tax season to avoid late-season price increases",
      "Import last year's TurboTax data and switch to TaxAct to save on this year's filing",
    ],
  },
  {
    slug: "freetaxusa",
    name: "FreeTaxUSA",
    tagline: "Free federal filing for all tax situations, no income limits",
    description: "FreeTaxUSA lives up to its name by offering genuinely free federal tax filing regardless of income level or return complexity. State returns cost a modest fee, and a paid tier adds priority support and audit assistance. It handles itemized deductions, self-employment, investments, and rental income at no charge for the federal portion, making it a favorite among budget-conscious filers who are comfortable with less guidance.",
    category: "diy-filing",
    tags: ["free tax filing", "federal filing", "budget tax prep", "all income levels", "self-employment", "investment tax"],
    url: "https://www.freetaxusa.com",
    pricing: "freemium",
    featured: true,
    logo: "🇺🇸",
    domain: "freetaxusa.com",
    pros: [
      "Federal filing is truly free for all tax situations with no income caps",
      "Handles complex returns including Schedule C, D, and E at no charge",
      "State filing is only $14.99, far cheaper than competitors",
      "Deluxe tier at $7.99 adds audit assistance and priority support",
    ],
    cons: [
      "Interface is more basic and less guided than premium alternatives",
      "No mobile app available, browser-only experience",
      "Limited import capabilities for prior-year returns from other software",
      "Customer support is email-only on the free tier",
    ],
    useCases: [
      "File a complex return with freelance income and stock sales for $0 in federal fees",
      "Add the Deluxe tier for $7.99 to get audit defense coverage on an investment-heavy return",
      "File federal and state returns together for under $15 total",
    ],
  },
  {
    slug: "cash-app-taxes",
    name: "Cash App Taxes",
    tagline: "100% free tax filing with federal and state included",
    description: "Cash App Taxes (formerly Credit Karma Tax) offers completely free federal and state tax filing with no upsells or hidden tiers. It supports most common tax situations and integrates directly with the Cash App ecosystem. The trade-off for the zero-dollar price tag is a more limited set of supported forms compared to paid alternatives.",
    category: "diy-filing",
    tags: ["free tax filing", "Cash App", "state filing", "simple taxes", "no cost", "mobile tax filing"],
    url: "https://cash.app/taxes",
    pricing: "free",
    featured: false,
    logo: "💲",
    domain: "cash.app",
  },
  // ── PROFESSIONAL ASSISTED ───────────────────────────────────────────────
  {
    slug: "taxslayer",
    name: "TaxSlayer",
    tagline: "Tax filing for the self-guided filer at a fair price",
    description: "TaxSlayer offers competitive pricing across its tiers while covering all major tax situations. Its Classic tier provides full support for all federal forms at a price well below TurboTax, and the Premium tier adds live chat with tax professionals. The self-employed tier includes a dedicated support line and expense tracking tools.",
    category: "professional-assisted",
    tags: ["affordable tax prep", "self-employed tax", "tax professional", "military tax", "all forms", "live support"],
    url: "https://www.taxslayer.com",
    pricing: "freemium",
    featured: false,
    logo: "⚔️",
    domain: "taxslayer.com",
  },
  {
    slug: "jackson-hewitt",
    name: "Jackson Hewitt",
    tagline: "Tax preparation in Walmart locations and online",
    description: "Jackson Hewitt provides tax preparation services through thousands of locations inside Walmart stores and standalone offices, plus an online filing option. The convenience of walk-in availability during evening and weekend hours makes it accessible for filers who prefer face-to-face assistance on their schedule.",
    category: "professional-assisted",
    tags: ["in-person tax prep", "Walmart tax filing", "tax professional", "walk-in filing", "refund advance", "tax help"],
    url: "https://www.jacksonhewitt.com",
    pricing: "paid",
    featured: false,
    logo: "🟧",
    domain: "jacksonhewitt.com",
  },
  {
    slug: "liberty-tax",
    name: "Liberty Tax",
    tagline: "Tax preparation with in-office and virtual options",
    description: "Liberty Tax offers both in-office and virtual tax preparation through a franchise network across the United States. The service focuses on making professional tax help accessible to communities that may be underserved by larger chains, with bilingual support available at many locations.",
    category: "professional-assisted",
    tags: ["franchise tax prep", "in-person filing", "virtual tax prep", "bilingual tax help", "community tax", "professional filing"],
    url: "https://www.libertytax.com",
    pricing: "paid",
    featured: false,
    logo: "🗽",
    domain: "libertytax.com",
  },
  {
    slug: "taxfyle",
    name: "Taxfyle",
    tagline: "Get matched with a licensed CPA to file your taxes",
    description: "Taxfyle connects filers with licensed CPAs and tax professionals who prepare and file returns on their behalf. Users upload documents through the app, and a matched professional handles the rest. It offers the quality of professional tax preparation at a lower cost than traditional CPA firms by operating as a marketplace.",
    category: "professional-assisted",
    tags: ["CPA matching", "professional tax prep", "document upload", "tax marketplace", "licensed professionals", "remote filing"],
    url: "https://www.taxfyle.com",
    pricing: "paid",
    featured: true,
    logo: "👔",
    domain: "taxfyle.com",
  },
  // ── BUSINESS TAX ────────────────────────────────────────────────────────
  {
    slug: "1040-com",
    name: "1040.com",
    tagline: "Flat-fee tax filing with no hidden upgrades",
    description: "1040.com by Drake Software charges one flat fee for federal and state filing regardless of return complexity. There are no tier-based upsells or locked features, making the total cost transparent from the start. Drake is a well-known name among tax professionals, and 1040.com brings that expertise to consumer filing.",
    category: "business-tax",
    tags: ["flat-fee filing", "no upsells", "Drake Software", "transparent pricing", "all forms included", "simple pricing"],
    url: "https://www.1040.com",
    pricing: "paid",
    featured: false,
    logo: "🔟",
    domain: "1040.com",
  },
  {
    slug: "olt",
    name: "OLT.com",
    tagline: "Online tax filing with free federal returns for eligible filers",
    description: "OLT.com (OnLine Taxes) offers free federal filing for qualifying filers and affordable paid options for others. It supports a wide range of tax forms and schedules, providing a no-frills filing experience that gets the job done without the marketing overhead of bigger brands.",
    category: "business-tax",
    tags: ["online tax filing", "free federal filing", "affordable tax prep", "tax forms", "simple filing", "budget option"],
    url: "https://www.olt.com",
    pricing: "freemium",
    featured: false,
    logo: "🌐",
    domain: "olt.com",
  },
  // ── TAX PLANNING ────────────────────────────────────────────────────────
  {
    slug: "esmart-tax",
    name: "eSmart Tax",
    tagline: "Guided tax preparation powered by Liberty Tax expertise",
    description: "eSmart Tax is Liberty Tax's online filing platform, offering step-by-step guided preparation with the backing of Liberty's tax professional network. It provides a clean online filing experience with the option to escalate complex questions to Liberty Tax professionals.",
    category: "tax-planning",
    tags: ["guided filing", "Liberty Tax online", "step-by-step tax", "professional backup", "online tax prep"],
    url: "https://www.esmarttax.com",
    pricing: "paid",
    featured: false,
    logo: "🧠",
    domain: "esmarttax.com",
  },
  {
    slug: "fileyourtaxes",
    name: "FileYourTaxes",
    tagline: "Straightforward online tax filing for common situations",
    description: "FileYourTaxes provides a simple online filing experience for filers with common tax situations. It supports W-2 income, basic deductions, and standard credits without the complexity of premium software, making it suitable for straightforward annual returns.",
    category: "tax-planning",
    tags: ["simple filing", "online tax", "W-2 filing", "standard deductions", "basic tax prep"],
    url: "https://www.fileyourtaxes.com",
    pricing: "paid",
    featured: false,
    logo: "📁",
    domain: "fileyourtaxes.com",
  },
  // ── STATE-SPECIFIC ──────────────────────────────────────────────────────
  {
    slug: "eztaxreturn",
    name: "EZTaxReturn",
    tagline: "Simple and fast online tax filing for basic returns",
    description: "EZTaxReturn focuses on making tax filing as quick as possible for filers with simple situations. The streamlined interface asks only necessary questions and can complete a basic return in under 30 minutes. It supports W-2 income, unemployment, retirement distributions, and common credits.",
    category: "state-specific",
    tags: ["fast filing", "simple tax return", "quick tax prep", "basic returns", "easy filing", "W-2 income"],
    url: "https://www.eztaxreturn.com",
    pricing: "paid",
    featured: false,
    logo: "⚡",
    domain: "eztaxreturn.com",
  },
  {
    slug: "irs-free-file",
    name: "IRS Free File",
    tagline: "Free tax filing through IRS-approved partner software",
    description: "IRS Free File is a public-private partnership that provides free federal tax filing through approved commercial software providers for taxpayers under the income threshold. Eligible filers can access guided preparation from partners like TaxAct and TaxSlayer at no cost, or use Free File Fillable Forms for any income level.",
    category: "state-specific",
    tags: ["IRS free file", "government program", "free filing", "income-based", "fillable forms", "taxpayer assistance"],
    url: "https://www.irs.gov/filing/free-file-do-your-federal-taxes-for-free",
    pricing: "free",
    featured: false,
    logo: "🏛️",
    domain: "irs.gov",
  },
];
