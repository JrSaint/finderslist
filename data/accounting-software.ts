export type AccountingCategory = "small-business" | "enterprise-erp" | "bookkeeping" | "accounts-payable" | "financial-reporting";

export interface AccountingTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: AccountingCategory;
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

export const ACCOUNTING_CATEGORIES: Record<AccountingCategory, { label: string; emoji: string; description: string; gradient: string }> = {
  "small-business": { label: "Small Business Accounting", emoji: "🏢", description: "All-in-one accounting for small businesses covering invoicing, expenses, and taxes.", gradient: "from-blue-600/30 to-indigo-800/40" },
  "enterprise-erp": { label: "Enterprise ERP & Accounting", emoji: "🏛️", description: "Full-scale ERP systems handling complex financials for mid-market and enterprise.", gradient: "from-blue-700/30 to-violet-800/40" },
  "bookkeeping": { label: "Bookkeeping Services", emoji: "📚", description: "Tech-enabled bookkeeping services that handle your books with real accountants.", gradient: "from-indigo-600/30 to-blue-800/40" },
  "accounts-payable": { label: "Accounts Payable & Receivable", emoji: "💳", description: "Automate bill pay, vendor management, and collections workflows.", gradient: "from-blue-600/30 to-cyan-800/40" },
  "financial-reporting": { label: "Financial Reporting & FP&A", emoji: "📊", description: "Business intelligence and reporting tools built for finance teams.", gradient: "from-blue-600/30 to-slate-800/40" },
};

export const ACCOUNTING_TOOLS: AccountingTool[] = [
  {
    slug: "quickbooks-online",
    name: "QuickBooks Online",
    tagline: "The most popular accounting software for small businesses in the US",
    description: "QuickBooks Online dominates the small business accounting market with 80%+ market share in the US. It handles invoicing, expense tracking, bank reconciliation, tax preparation, and financial reporting. The platform connects to 750+ business apps and most accountants know it well — finding QBO-experienced bookkeepers is trivial. Features scale across Simple Start ($30/mo), Essentials ($60/mo), Plus ($90/mo), and Advanced ($200/mo) tiers. The trade-off is pricing complexity and a tendency to push add-ons (payroll, payments, time tracking) that increase your total cost. For straightforward small business accounting, nothing has a larger ecosystem.",
    category: "small-business",
    tags: ["accounting", "small business", "invoicing", "tax prep", "bookkeeping", "quickbooks"],
    url: "https://quickbooks.intuit.com",
    affiliateUrl: "https://quickbooks.intuit.com",
    pricing: "freemium",
    featured: true,
    logo: "📗",
    domain: "quickbooks.intuit.com",
    pros: ["Largest ecosystem — 750+ app integrations and most accountants know it", "Comprehensive feature set covering invoicing, expenses, reporting, and tax", "Excellent mobile app for receipt capture and invoicing on the go", "Automated bank feeds and smart categorization save hours weekly", "Scales from solo freelancer to 25+ employee businesses"],
    cons: ["Pricing increases frequently and add-ons inflate the real cost", "Customer support quality has declined with growth", "File limits and user caps on lower tiers feel artificial", "Can be overwhelming for very simple businesses that just need invoicing"],
    useCases: ["Small business needing full double-entry accounting", "Freelancer wanting invoicing + expense tracking in one tool", "Business working with an external accountant or CPA"],
  },
  {
    slug: "freshbooks",
    name: "FreshBooks",
    tagline: "Invoicing-first accounting software built for service businesses and freelancers",
    description: "FreshBooks started as an invoicing tool and evolved into a full accounting platform, but invoicing remains its superpower. Creating and sending professional invoices takes seconds, automated payment reminders improve collection rates, and the client portal lets customers view and pay invoices online. Time tracking and project profitability features make it ideal for agencies, consultants, and freelancers who bill by the hour. FreshBooks recently added double-entry accounting, bank reconciliation, and financial reports to compete with QuickBooks. The UI is the friendliest in the category — you don't need accounting knowledge to use it.",
    category: "small-business",
    tags: ["invoicing", "freelancer accounting", "time tracking", "expense tracking", "small business", "client billing"],
    url: "https://www.freshbooks.com",
    affiliateUrl: "https://www.freshbooks.com",
    pricing: "freemium",
    featured: true,
    logo: "🟢",
    domain: "freshbooks.com",
    pros: ["Best-in-class invoicing with automated reminders and online payments", "Incredibly easy to use — no accounting knowledge required", "Built-in time tracking and project profitability analysis", "Client portal for viewing invoices and making payments", "Excellent mobile app for receipts and invoicing on the go"],
    cons: ["Limited inventory management capabilities", "Double-entry accounting features are newer and less mature", "Client/invoice limits on lower-tier plans", "Not ideal for product-based businesses or complex accounting"],
    useCases: ["Freelancer or consultant billing clients by the hour", "Agency tracking project profitability across clients", "Service business wanting beautiful, professional invoices"],
  },
  {
    slug: "xero",
    name: "Xero",
    tagline: "Beautiful cloud accounting for small businesses and their advisors",
    description: "Xero is the leading cloud accounting platform outside the US, with particular dominance in the UK, Australia, and New Zealand. It offers a clean, modern interface for invoicing, bank reconciliation, expense tracking, and financial reporting. Xero's strength is its advisor ecosystem — accountants and bookkeepers love it. The platform includes unlimited users on all plans (unlike QuickBooks), multi-currency support, and 1,000+ app integrations. Xero shines for businesses with international operations. Pricing is competitive, though US-based businesses may find fewer local integrations compared to QuickBooks.",
    category: "small-business",
    tags: ["cloud accounting", "international", "invoicing", "bank reconciliation", "multi-currency", "xero"],
    url: "https://www.xero.com",
    affiliateUrl: "https://www.xero.com",
    pricing: "paid",
    featured: true,
    logo: "🔵",
    domain: "xero.com",
    pros: ["Unlimited users on all plans — no per-seat charges", "Excellent multi-currency support for international businesses", "Beautiful, intuitive interface with clean design", "Strong advisor ecosystem with dedicated partner program", "1,000+ app integrations through Xero Marketplace"],
    cons: ["Less dominant in the US market — fewer US-specific integrations", "Limited inventory features on lower plans", "Payroll is a separate add-on (not built in)", "Transaction limits on Starter plan can be restrictive"],
    useCases: ["International business needing multi-currency accounting", "Company working with a Xero-certified accountant", "Business wanting unlimited users without per-seat pricing"],
  },
  {
    slug: "wave-accounting",
    name: "Wave",
    tagline: "100% free accounting and invoicing for small businesses",
    description: "Wave offers genuinely free accounting software — not a trial, not freemium, but free forever. It includes double-entry accounting, unlimited invoicing, receipt scanning, and financial reporting at no cost. Wave monetizes through paid add-ons for payroll and payment processing. The platform is best for solopreneurs, freelancers, and very small businesses that need basic but capable accounting without a monthly fee. It's not as feature-rich as QuickBooks or Xero, but for what it costs (nothing), it's remarkably capable.",
    category: "small-business",
    tags: ["free accounting", "invoicing", "small business", "freelancer", "receipt scanning", "free"],
    url: "https://www.waveapps.com",
    pricing: "free",
    featured: true,
    logo: "🌊",
    domain: "waveapps.com",
    pros: ["Completely free accounting and invoicing — no credit card required", "Clean, easy-to-use interface for non-accountants", "Unlimited invoicing with online payment acceptance", "Receipt scanning via mobile app included free", "Bank connections and automatic transaction import"],
    cons: ["No inventory management at all", "Limited integrations compared to QuickBooks/Xero", "Customer support is limited on the free plan", "Payroll and payments are paid add-ons"],
    useCases: ["Freelancer needing free invoicing and expense tracking", "Side business that doesn't justify a monthly subscription", "Startup wanting to minimize costs in early stages"],
  },
  {
    slug: "netsuite",
    name: "NetSuite",
    tagline: "The world's leading cloud ERP for mid-market and growing businesses",
    description: "Oracle NetSuite is the leading cloud ERP, serving 37,000+ organizations worldwide. It unifies financial management, CRM, e-commerce, inventory, and HR in a single platform. NetSuite's strength is scalability — it grows from startup to IPO to global enterprise without switching systems. The platform handles multi-subsidiary consolidation, revenue recognition (ASC 606), multi-currency, and advanced financial planning. Pricing starts around $999/month with implementation costs of $25,000-$100,000+. Best for companies outgrowing QuickBooks that need a serious ERP.",
    category: "enterprise-erp",
    tags: ["erp", "enterprise accounting", "financial management", "multi-subsidiary", "cloud erp", "oracle"],
    url: "https://www.netsuite.com",
    pricing: "paid",
    featured: true,
    logo: "🟠",
    domain: "netsuite.com",
    pros: ["True cloud ERP that scales from startup to public company", "Multi-subsidiary and multi-currency consolidation built in", "Unified platform: financials, CRM, inventory, e-commerce", "SuiteAnalytics provides powerful real-time reporting", "Strong ecosystem of implementation partners"],
    cons: ["High total cost: $999+/mo plus $25K-$100K+ implementation", "Steep learning curve — requires dedicated admin or consultant", "Customization often requires SuiteScript development", "Long implementation timeline (3-6 months typical)"],
    useCases: ["Growing company outgrowing QuickBooks at 50-100+ employees", "Multi-entity business needing consolidated financials", "Pre-IPO company needing ASC 606 revenue recognition"],
  },
  { slug: "zoho-books", name: "Zoho Books", tagline: "Affordable cloud accounting that's part of the Zoho ecosystem", description: "Zoho Books is a capable, affordable accounting platform that shines when used alongside other Zoho products (CRM, Projects, Inventory). It offers invoicing, expense tracking, bank reconciliation, project tracking, and tax compliance. The free plan supports up to $50K annual revenue. For businesses already in the Zoho ecosystem, it's a no-brainer — data flows seamlessly between apps.", category: "small-business", tags: ["accounting", "zoho", "affordable", "invoicing", "small business", "ecosystem"], url: "https://www.zoho.com/books/", affiliateUrl: "https://www.zoho.com/books/", pricing: "freemium", featured: false, logo: "📒", domain: "zoho.com" },
  { slug: "sage-intacct", name: "Sage Intacct", tagline: "Best-in-class cloud financial management for mid-market companies", description: "Sage Intacct is the AICPA's preferred financial management solution, trusted by thousands of accounting firms and mid-market companies. It excels at multi-entity consolidation, dimensional reporting, and complex revenue recognition. The platform handles accounts payable, accounts receivable, cash management, and project accounting with deep automation. Best for companies with complex financial needs that have outgrown QuickBooks but don't need a full ERP like NetSuite.", category: "enterprise-erp", tags: ["financial management", "mid-market", "consolidation", "revenue recognition", "aicpa", "cloud accounting"], url: "https://www.sage.com/en-us/sage-business-cloud/intacct/", pricing: "paid", featured: false, logo: "🟩", domain: "sage.com" },
  { slug: "bench", name: "Bench", tagline: "Human-powered bookkeeping with dedicated bookkeepers and tax support", description: "Bench pairs proprietary software with a dedicated team of bookkeepers who handle your books monthly. You connect your accounts, and Bench's team categorizes transactions, reconciles accounts, and delivers monthly financial statements. Year-end tax packages and tax filing support are available. Best for small business owners who want hands-off bookkeeping without learning accounting software.", category: "bookkeeping", tags: ["bookkeeping service", "dedicated bookkeeper", "tax support", "small business", "hands-off", "financial statements"], url: "https://bench.co", affiliateUrl: "https://bench.co", pricing: "paid", featured: false, logo: "📘", domain: "bench.co" },
  { slug: "pilot", name: "Pilot", tagline: "Expert bookkeeping, tax, and CFO services for startups and growing businesses", description: "Pilot provides professional bookkeeping, tax preparation, and fractional CFO services for startups and high-growth businesses. Backed by Sequoia and Bezos Expeditions, Pilot handles accrual-basis bookkeeping, R&D tax credits, and financial reporting. The platform integrates with QuickBooks Online and provides a dashboard for real-time financial visibility. Best for VC-backed startups that need startup-savvy bookkeeping.", category: "bookkeeping", tags: ["startup bookkeeping", "tax preparation", "cfo services", "r&d credits", "venture-backed", "accrual accounting"], url: "https://pilot.com", pricing: "paid", featured: false, logo: "✈️", domain: "pilot.com" },
  { slug: "bill-com", name: "BILL", tagline: "Automate accounts payable and receivable to save your finance team hours", description: "BILL (formerly Bill.com) automates the entire accounts payable and receivable workflow. It handles invoice capture, approval routing, payment scheduling, and vendor management. Payments can be made via ACH, virtual card, or international wire. BILL integrates deeply with QuickBooks, Xero, NetSuite, and Sage. Used by 400,000+ businesses, it's the standard for AP automation in the mid-market.", category: "accounts-payable", tags: ["accounts payable", "ap automation", "bill pay", "invoice management", "vendor payments", "approval workflow"], url: "https://www.bill.com", pricing: "paid", featured: false, logo: "💸", domain: "bill.com" },
  { slug: "tipalti", name: "Tipalti", tagline: "End-to-end payables automation for high-growth and global businesses", description: "Tipalti automates the entire payables process: vendor onboarding, tax compliance, global payments (196 countries, 120 currencies), and reconciliation. It reduces payment processing time by 80% and handles supplier tax validation, W-8/W-9 collection, and 1099 preparation. Best for companies making 50+ monthly payments to vendors, affiliates, or publishers.", category: "accounts-payable", tags: ["payables automation", "global payments", "vendor management", "tax compliance", "mass payments", "reconciliation"], url: "https://tipalti.com", pricing: "paid", featured: false, logo: "🌐", domain: "tipalti.com" },
  { slug: "ramp", name: "Ramp", tagline: "Corporate cards and spend management that save companies 5% on average", description: "Ramp combines corporate cards with expense management, bill pay, and accounting automation. It automatically categorizes expenses, enforces spending policies, and identifies duplicate subscriptions. Ramp claims to save companies an average of 5% on total spend. The platform is free — Ramp makes money from interchange fees. Best for startups and mid-market companies wanting modern spend management.", category: "accounts-payable", tags: ["corporate cards", "expense management", "spend management", "bill pay", "free", "startup finance"], url: "https://ramp.com", pricing: "freemium", featured: false, logo: "🟡", domain: "ramp.com" },
  { slug: "brex", name: "Brex", tagline: "Financial stack for growing companies — cards, banking, and spend management", description: "Brex provides corporate cards, business accounts, bill pay, and travel management for startups and mid-market companies. It offers higher credit limits based on cash balance (not personal credit), automatic receipt matching, and policy enforcement. Brex Empower provides real-time budget tracking and approval workflows. The platform integrates with NetSuite, QuickBooks, and major ERPs.", category: "accounts-payable", tags: ["corporate cards", "startup finance", "business banking", "travel management", "spend control", "credit"], url: "https://brex.com", affiliateUrl: "https://brex.com", pricing: "freemium", featured: false, logo: "🔶", domain: "brex.com" },
  { slug: "mosaic", name: "Mosaic", tagline: "Strategic finance platform for real-time business intelligence and FP&A", description: "Mosaic is a strategic finance platform that provides real-time financial dashboards, budgeting, forecasting, and metric tracking. It integrates with your ERP, CRM, HRIS, and billing systems to create a single source of truth for finance teams. Pre-built SaaS metrics (ARR, burn rate, runway, CAC payback) and automated board reporting save FP&A teams hours weekly.", category: "financial-reporting", tags: ["fp&a", "financial planning", "business intelligence", "saas metrics", "forecasting", "budgeting"], url: "https://mosaic.tech", pricing: "paid", featured: false, logo: "🎨", domain: "mosaic.tech" },
  { slug: "jirav", name: "Jirav", tagline: "FP&A software for driver-based planning, budgeting, and forecasting", description: "Jirav provides financial planning and analysis tools with driver-based modeling, scenario planning, budget vs. actuals analysis, and automated reporting. It connects to QuickBooks, Xero, NetSuite, and HRIS systems for real-time data. Built for small and mid-market finance teams that need FP&A capabilities without the complexity of Adaptive Planning or Anaplan.", category: "financial-reporting", tags: ["fp&a", "budgeting", "forecasting", "scenario planning", "financial modeling", "reporting"], url: "https://jirav.com", pricing: "paid", featured: false, logo: "📈", domain: "jirav.com" },
  { slug: "digits", name: "Digits", tagline: "AI-powered accounting with real-time reporting and automated bookkeeping", description: "Digits uses AI to automate bookkeeping, transaction categorization, and financial reporting. It provides real-time P&L, balance sheet, and cash flow reports with drill-down capabilities. The platform highlights anomalies, tracks burn rate, and provides natural-language search across your financial data. Best for tech-savvy small businesses wanting modern, AI-enhanced accounting.", category: "small-business", tags: ["ai accounting", "automated bookkeeping", "real-time reporting", "small business", "anomaly detection", "modern accounting"], url: "https://digits.com", pricing: "paid", featured: false, logo: "🔢", domain: "digits.com" },
  { slug: "botkeeper", name: "Botkeeper", tagline: "AI-powered bookkeeping platform for accounting firms and businesses", description: "Botkeeper combines AI/ML automation with human oversight to deliver bookkeeping services at scale. It automates transaction categorization, bank reconciliation, and financial reporting while human reviewers handle exceptions. Best for accounting firms wanting to scale their bookkeeping practice and businesses wanting automated but supervised bookkeeping.", category: "bookkeeping", tags: ["ai bookkeeping", "accounting firms", "automated bookkeeping", "machine learning", "scalable", "financial reporting"], url: "https://botkeeper.com", pricing: "paid", featured: false, logo: "🤖", domain: "botkeeper.com" },
  { slug: "bookkeeper360", name: "Bookkeeper360", tagline: "Tech-enabled bookkeeping with real accountants and an integrated app", description: "Bookkeeper360 combines a dedicated bookkeeping team with proprietary software that provides real-time dashboards, KPI tracking, and financial insights. It integrates with QuickBooks and Xero and serves as both a bookkeeping service and a technology platform. Advisory services include tax planning, CFO consulting, and business valuation.", category: "bookkeeping", tags: ["bookkeeping service", "advisory", "cfo consulting", "real-time dashboards", "tax planning", "small business"], url: "https://bookkeeper360.com", pricing: "paid", featured: false, logo: "📖", domain: "bookkeeper360.com" },
  { slug: "divvy", name: "Divvy", tagline: "Free expense management and virtual cards now part of BILL", description: "Divvy (now part of BILL) provides free expense management software with corporate cards, budgeting, and real-time reporting. Managers set budget controls, employees spend within limits, and transactions auto-categorize. Virtual cards can be created instantly for one-time purchases or specific vendors. The platform integrates with QuickBooks, NetSuite, and Sage.", category: "accounts-payable", tags: ["expense management", "virtual cards", "budgeting", "free", "corporate cards", "spend control"], url: "https://getdivvy.com", pricing: "freemium", featured: false, logo: "💳", domain: "getdivvy.com" },
  { slug: "vareto", name: "Vareto", tagline: "Collaborative FP&A platform connecting finance with business teams", description: "Vareto is a modern FP&A platform that enables collaborative planning between finance and business teams. It provides real-time dashboards, driver-based modeling, and scenario analysis with a spreadsheet-like interface finance teams love. Vareto connects to 200+ data sources and automates data aggregation for headcount planning, revenue forecasting, and expense management.", category: "financial-reporting", tags: ["fp&a", "collaborative planning", "headcount planning", "revenue forecasting", "financial modeling", "real-time"], url: "https://vareto.com", pricing: "paid", featured: false, logo: "📊", domain: "vareto.com" },
];
