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

export const TAX_PREP_CATEGORIES: Record<TaxPrepCategory, { label: string; emoji: string; description: string; gradient: string; guide?: string }> = {
  "diy-filing": { label: "DIY Filing", emoji: "📝", description: "File your own taxes with guided software that walks you through every deduction.", gradient: "from-blue-600/30 to-indigo-800/40", guide: "DIY filing software walks you through your tax return step by step with interview-style questions, automatically applying deductions and credits you qualify for. It is best for W-2 employees, simple freelancers, and anyone comfortable answering basic questions about their financial situation. Look for platforms with free federal filing for simple returns, automatic W-2 import, and accuracy guarantee protection against IRS penalties." },
  "professional-assisted": { label: "Professional Assisted", emoji: "👨‍💼", description: "Get expert help from CPAs and tax professionals while filing online.", gradient: "from-emerald-600/30 to-teal-800/40", guide: "Professional-assisted filing combines the convenience of online tax software with access to CPAs and enrolled agents who review your return or answer questions in real time. It is ideal for filers with moderately complex situations who want expert reassurance without paying for a full-service accountant. Compare the level of access offered, whether unlimited questions are included, and whether the professional signs and guarantees your return." },
  "business-tax": { label: "Business Tax", emoji: "🏢", description: "Specialized tools for business returns, S-corps, partnerships, and LLCs.", gradient: "from-amber-600/30 to-orange-800/40", guide: "Business tax tools handle the specialized forms and schedules required for S-corps, C-corps, partnerships, LLCs, and sole proprietorships, including multi-state filings and estimated tax payments. They are best for small business owners and accountants preparing business entity returns. Evaluate platforms based on their support for your specific entity type, depreciation and asset tracking features, and integration with your bookkeeping software." },
  "tax-planning": { label: "Tax Planning", emoji: "📊", description: "Year-round tax strategy tools to minimize your liability before filing season.", gradient: "from-violet-600/30 to-purple-800/40", guide: "Tax planning tools help you estimate your tax liability throughout the year and identify strategies to reduce what you owe before filing season arrives. They are ideal for self-employed individuals, investors, and high earners who benefit from proactive tax optimization like retirement contributions and loss harvesting. Look for tools with real-time tax projections, scenario modeling, and quarterly estimated payment calculators." },
  "state-specific": { label: "State-Specific", emoji: "🗺️", description: "Filing tools optimized for state returns and multi-state tax situations.", gradient: "from-rose-600/30 to-red-800/40", guide: "State-specific filing tools are optimized for the unique tax rules, credits, and forms required by individual states, including complex multi-state filing situations. They are best for people who live in one state and work in another, remote workers with multi-state income, or residents of states with unusual tax structures. Check whether the platform supports all states where you have filing obligations and whether state returns are included or priced as add-ons." },
};

export const TAX_PREP_EDITORIAL = {
  title: "How to Choose the Right Tax Preparation Software in 2026",
  intro: `Tax preparation software guides individuals and businesses through the process of filing federal and state income tax returns, identifying deductions and credits, and electronically submitting returns to the IRS. For the 2025 tax year (filed in 2026), most taxpayers with straightforward W-2 income can file for free, while those with investments, rental income, self-employment, or itemized deductions will need a paid tier.\n\nThe market is dominated by a few major players -- TurboTax, H&R Block, TaxAct, and FreeTaxUSA -- but they differ significantly in pricing, user experience, and how aggressively they upsell. TurboTax offers the most polished interface but charges the highest prices, while FreeTaxUSA provides comparable accuracy at a fraction of the cost. If your tax situation involves business income, rental properties, or complex investments, the differences in how each platform handles these scenarios become more important than the base price.\n\nFor taxpayers who want professional help without visiting an office, most major platforms now offer CPA-assisted options where a licensed tax professional reviews your return, answers questions, and can even prepare the entire return remotely. These hybrid services typically cost $100 to $300 more than DIY filing but less than a traditional CPA engagement, making them a strong middle ground for people with moderately complex situations.`,
  buyerGuide: [
    "Tax situation complexity -- Simple W-2 filers can use almost any free option. Self-employed individuals, investors, and landlords should choose platforms with strong Schedule C, D, and E support plus business deduction guidance.",
    "True total cost -- Compare the all-in price including federal filing, state filing (often $30 to $60 extra per state), and any add-ons. Some platforms advertise low base prices but charge more for features like live chat support or audit protection.",
    "Accuracy guarantees -- All major platforms guarantee calculation accuracy and will cover IRS penalties if their software makes an error. Verify the specific terms of this guarantee, including maximum coverage amounts.",
    "Import capabilities -- The best software imports W-2s, 1099s, and prior-year returns automatically, saving significant time. Check whether the platform supports photo capture of tax documents and direct imports from brokerages and employers.",
    "Audit support -- Basic audit support provides guidance if you receive an IRS notice. Premium audit defense includes a tax professional who represents you before the IRS. Understand which level is included and what costs extra.",
  ],
  faq: [
    {
      question: "Can I really file my taxes for free?",
      answer: "Yes, if your income is below a certain threshold, you can use IRS Free File through participating software partners at no cost for federal returns. Additionally, platforms like FreeTaxUSA and Cash App Taxes offer free federal filing for all income levels, though state returns may cost extra.",
    },
    {
      question: "Is TurboTax worth the higher price?",
      answer: "TurboTax offers the most user-friendly interface and the broadest coverage of complex tax situations, which justifies the premium for some filers. However, for straightforward returns, competitors like FreeTaxUSA or TaxAct deliver equivalent accuracy at significantly lower prices.",
    },
    {
      question: "When should I hire a CPA instead of using software?",
      answer: "Consider a CPA if you have a complex business with employees, significant investment income across multiple entities, multi-state filing obligations, or if you are going through a major life event like selling a business or receiving an inheritance. The CPA-assisted tiers in tax software work well for moderately complex situations.",
    },
  ],
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
    pros: [
      "Completely free federal and state filing with no upsells or hidden tiers",
      "Integrates with Cash App for fast refund deposit",
      "Supports most common tax situations including itemized deductions",
      "Clean, simple interface within the Cash App ecosystem",
    ],
    cons: [
      "Does not support all complex tax forms like Schedule C for self-employment",
      "Requires a Cash App account to use the tax filing features",
      "Limited customer support compared to paid alternatives",
    ],
    useCases: [
      "Cash App user wanting to file federal and state returns at zero cost",
      "Simple W-2 filer looking for truly free tax filing with state included",
      "Budget-conscious taxpayer who does not need self-employment or complex investment filing",
    ],
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
    pros: [
      "Classic tier covers all federal forms at a price well below TurboTax",
      "Self-employed tier includes expense tracking and dedicated support line",
      "Free filing for active military members",
      "Live chat with tax professionals available on Premium tier",
    ],
    cons: [
      "Interface is more utilitarian and less guided than premium competitors",
      "Free tier is limited to very simple returns",
      "Less extensive import capabilities than TurboTax or H&R Block",
    ],
    useCases: [
      "Self-employed taxpayer wanting affordable filing with expense tracking tools",
      "Active military member looking for free tax filing support",
      "Cost-conscious filer who is comfortable navigating tax forms with minimal hand-holding",
    ],
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
    pros: [
      "Convenient Walmart locations with evening and weekend availability",
      "Walk-in appointments make tax filing accessible on your schedule",
      "No-interest refund advance loans available for early filers",
      "Online filing option available for those who prefer DIY",
    ],
    cons: [
      "In-person preparation costs significantly more than online software",
      "Quality varies by location since many offices are independently operated",
      "Online filing experience is less polished than major digital-first competitors",
    ],
    useCases: [
      "Taxpayer who wants in-person help at a Walmart location convenient to their routine",
      "Filer needing evening or weekend appointments that traditional CPA offices do not offer",
      "Person wanting a refund advance loan to access money before the IRS processes their return",
    ],
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
    pros: [
      "Both in-office and virtual preparation options provide flexibility",
      "Bilingual support available at many locations for non-English speakers",
      "Franchise model serves communities underserved by larger chains",
      "Personalized attention from local tax professionals",
    ],
    cons: [
      "In-person preparation fees are higher than DIY software",
      "Quality varies by franchise location and individual preparer",
      "Fewer locations than H&R Block or Jackson Hewitt in many markets",
    ],
    useCases: [
      "Taxpayer in a community underserved by larger tax prep chains",
      "Non-English speaker needing bilingual tax preparation assistance",
      "Person wanting the option to switch between in-office and virtual preparation",
    ],
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
    pros: [
      "Matched with a licensed CPA who prepares your return from uploaded documents",
      "Lower cost than hiring a traditional CPA firm directly",
      "No appointment scheduling — upload documents and let the CPA work asynchronously",
      "All preparers are licensed CPAs or tax professionals vetted by Taxfyle",
    ],
    cons: [
      "Less personal than an ongoing relationship with a dedicated CPA",
      "Turnaround time depends on CPA availability and complexity of return",
      "Limited ability to choose a specific preparer for specialized tax situations",
    ],
    useCases: [
      "Taxpayer who wants CPA-quality preparation without the cost of a full CPA engagement",
      "Person with a moderately complex return who does not want to file using DIY software",
      "Filer who prefers uploading documents on their own time rather than scheduling office visits",
    ],
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
    pros: [
      "One flat fee regardless of return complexity — no surprise upgrades",
      "All tax forms and schedules included at no additional cost",
      "Backed by Drake Software, a trusted name among professional tax preparers",
      "Transparent pricing from the start eliminates mid-filing price pressure",
    ],
    cons: [
      "Interface is functional but not as modern as TurboTax or H&R Block",
      "Less brand recognition among consumers compared to major competitors",
      "Limited live support options compared to larger platforms",
    ],
    useCases: [
      "Taxpayer frustrated by upsells who wants one flat price for everything",
      "Filer with a moderately complex return wanting all forms included without tier upgrades",
      "Person who values Drake Software's professional-grade accuracy in a consumer product",
    ],
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
    pros: [
      "Free federal filing for qualifying filers through IRS Free File partnership",
      "Supports a wide range of tax forms and schedules",
      "Affordable paid options for filers above the income threshold",
      "No-frills approach keeps costs low without marketing overhead",
    ],
    cons: [
      "Interface is dated and less intuitive than modern competitors",
      "Very limited guidance and hand-holding during the filing process",
      "Minimal customer support resources available",
    ],
    useCases: [
      "Income-eligible taxpayer wanting free federal filing through IRS Free File",
      "Budget-conscious filer looking for the lowest-cost option for a straightforward return",
      "Person comfortable navigating tax forms independently without step-by-step guidance",
    ],
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
    pros: [
      "Step-by-step guided preparation simplifies the filing process",
      "Backed by Liberty Tax's professional network for escalating complex questions",
      "Clean online interface for straightforward tax situations",
      "Option to hand off to a Liberty Tax professional if needed",
    ],
    cons: [
      "Smaller user base means fewer reviews and community resources",
      "Feature set is more limited than major competitors",
      "State filing may cost extra depending on the plan",
    ],
    useCases: [
      "Taxpayer wanting guided online filing with professional backup if questions arise",
      "Liberty Tax customer who prefers filing online but wants access to their professional network",
      "Filer with a straightforward return looking for a clean, guided filing experience",
    ],
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
    pros: [
      "Simple, no-frills approach for filers with common tax situations",
      "Supports W-2 income, basic deductions, and standard credits",
      "Straightforward filing without complex features that add confusion",
      "Affordable pricing for basic returns",
    ],
    cons: [
      "Not suitable for complex returns with self-employment or investment income",
      "Very limited features compared to major tax software platforms",
      "Minimal customer support options",
    ],
    useCases: [
      "Taxpayer with a simple W-2 return and standard deduction who wants fast filing",
      "Filer who does not need advanced features and prefers simplicity over options",
      "Person looking for a basic online filing tool for a straightforward annual return",
    ],
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
    pros: [
      "Streamlined interface completes basic returns in under 30 minutes",
      "Only asks necessary questions to minimize filing time",
      "Supports W-2 income, unemployment, and retirement distributions",
      "Simple and fast for filers who know their situation is straightforward",
    ],
    cons: [
      "Not suitable for self-employed filers or complex investment situations",
      "Limited form support compared to full-featured tax software",
      "Fewer deduction-finding features than TurboTax or H&R Block",
    ],
    useCases: [
      "Employee with a simple W-2 who wants to file a return as fast as possible",
      "Retiree with straightforward pension and Social Security income",
      "Person who filed a simple return last year and wants the quickest path to completion",
    ],
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
    pros: [
      "Completely free federal filing through IRS-approved commercial partners",
      "Available to taxpayers below the income threshold with guided software",
      "Free File Fillable Forms available to any taxpayer regardless of income",
      "Official IRS program ensures legitimacy and data security",
    ],
    cons: [
      "Income threshold limits access to guided software for higher earners",
      "Free File Fillable Forms require knowledge of tax forms — no guidance provided",
      "State filing may not be included depending on the partner software used",
    ],
    useCases: [
      "Low-to-moderate income taxpayer wanting free guided federal filing from IRS partners",
      "Tax-savvy filer who can complete forms manually and wants free electronic filing at any income level",
      "Person checking eligibility for free filing before paying for commercial software",
    ],
  },
];
