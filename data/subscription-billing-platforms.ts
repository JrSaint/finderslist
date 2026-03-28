export type SubscriptionBillingCategory = "recurring-billing" | "usage-billing" | "payment-infrastructure" | "revenue-recovery" | "cpq-quoting";

export interface SubscriptionBillingTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: SubscriptionBillingCategory;
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

export const SUBSCRIPTION_BILLING_CATEGORIES: Record<SubscriptionBillingCategory, { label: string; emoji: string; description: string; gradient: string }> = {
  "recurring-billing": { label: "Recurring Billing", emoji: "🔄", description: "Platforms for managing subscriptions, recurring invoices, and plan changes.", gradient: "from-indigo-600/30 to-purple-800/40" },
  "usage-billing": { label: "Usage & Metered Billing", emoji: "📊", description: "Billing platforms for usage-based, metered, and consumption pricing models.", gradient: "from-blue-600/30 to-cyan-800/40" },
  "payment-infrastructure": { label: "Payment Infrastructure", emoji: "💳", description: "Payment processing platforms that support subscription and recurring payments.", gradient: "from-green-600/30 to-emerald-800/40" },
  "revenue-recovery": { label: "Revenue Recovery", emoji: "💰", description: "Tools for reducing churn through failed payment recovery and dunning.", gradient: "from-orange-600/30 to-amber-800/40" },
  "cpq-quoting": { label: "CPQ & Subscription Quoting", emoji: "📋", description: "Configure-price-quote tools designed for subscription and SaaS sales.", gradient: "from-violet-600/30 to-fuchsia-800/40" },
};

export const SUBSCRIPTION_BILLING_TOOLS: SubscriptionBillingTool[] = [
  {
    slug: "stripe-billing",
    name: "Stripe Billing",
    tagline: "The developer-favorite subscription billing built on Stripe's payment infrastructure",
    description: "Stripe Billing is the most developer-friendly subscription management platform, built natively on Stripe's payment infrastructure. It handles recurring billing, usage-based pricing, trials, coupons, prorations, and invoicing through elegant APIs and a no-code dashboard. Stripe Billing supports 135+ currencies and dozens of payment methods globally. Revenue recognition, tax automation (via Stripe Tax), and real-time analytics are built in. For developer-led companies, Stripe Billing is the default choice.",
    category: "recurring-billing",
    tags: ["stripe billing", "subscription management", "recurring payments", "developer api", "global payments", "saas billing"],
    url: "https://stripe.com/billing",
    pricing: "freemium",
    featured: true,
    logo: "💜",
    domain: "stripe.com",
    pros: ["Best-in-class API and developer experience in the industry", "Built on Stripe's global payment infrastructure (135+ currencies)", "No monthly platform fee — pay only per transaction (0.5-0.8%)", "Revenue recognition, tax automation, and analytics built in", "Supports flat-rate, usage-based, tiered, and hybrid pricing models"],
    cons: ["Transaction-based pricing can exceed flat-fee platforms at high volume", "Complex pricing scenarios may require significant development work", "Dashboard UI is less intuitive for non-technical billing managers", "Customer portal customization is limited without code"],
    useCases: ["SaaS companies needing flexible, API-first subscription billing", "Startups wanting to start simple and scale without re-platforming", "Developer-led teams building custom billing flows and pricing experiments"],
  },
  {
    slug: "chargebee",
    name: "Chargebee",
    tagline: "Subscription billing and revenue management for scaling B2B SaaS",
    description: "Chargebee is a comprehensive subscription management platform handling the full revenue lifecycle: billing, invoicing, tax, revenue recognition, collections, and retention. It supports complex B2B scenarios like multi-entity billing, contract terms, ramp deals, and custom pricing. Chargebee's strength is handling the operational complexity that Stripe Billing leaves to developers — price changes, proration policies, dunning, and self-service portals are all configurable without code. Used by 5,000+ companies including Calendly, Freshworks, and Okta.",
    category: "recurring-billing",
    tags: ["chargebee", "subscription management", "b2b saas", "revenue management", "invoicing", "retention"],
    url: "https://www.chargebee.com",
    affiliateUrl: "https://www.chargebee.com",
    pricing: "freemium",
    featured: true,
    logo: "🐝",
    domain: "chargebee.com",
    pros: ["Handles complex B2B billing scenarios (ramp deals, custom terms, multi-entity)", "No-code configuration for pricing, dunning, and customer portal", "Built-in revenue recognition (ASC 606 / IFRS 15 compliant)", "Integrates with 30+ payment gateways — not locked to one processor", "Retention tools: cancel flow, pause subscriptions, and win-back offers"],
    cons: ["Pricing can be expensive at scale — revenue-based fees add up", "Setup and configuration take longer than simpler tools", "Reporting can be complex to configure for custom metrics", "Some integrations require the most expensive plan"],
    useCases: ["B2B SaaS companies with complex pricing and contract billing", "Scaling companies needing revenue recognition and tax compliance", "Businesses wanting to reduce churn with built-in retention tools"],
  },
  {
    slug: "paddle",
    name: "Paddle",
    tagline: "Complete payments infrastructure for SaaS — billing, tax, and compliance in one",
    description: "Paddle acts as your merchant of record, handling payments, subscription billing, global tax compliance, and fraud protection as a single platform. Unlike Stripe (where you're the merchant of record), Paddle takes on the legal and tax responsibility for selling your software globally. This means Paddle handles VAT, sales tax, and compliance in 200+ markets — you don't need to register for tax in each country. Paddle recently acquired ProfitWell for analytics and retention.",
    category: "payment-infrastructure",
    tags: ["paddle", "merchant of record", "saas payments", "global tax", "compliance", "profitwell"],
    url: "https://www.paddle.com",
    pricing: "paid",
    featured: true,
    logo: "🏓",
    domain: "paddle.com",
    pros: ["Merchant of Record model eliminates global tax and compliance burden", "Handles VAT, sales tax, and remittance in 200+ markets automatically", "ProfitWell analytics and retention tools included", "Reduces legal complexity of selling software internationally", "One platform for billing, payments, tax, and compliance"],
    cons: ["Higher transaction fees than Stripe (5%+ vs 2.9%)", "Less control over the payment experience since Paddle is the seller", "Fewer payment method options than Stripe in some regions", "Migrating away from Paddle is more complex due to MoR model"],
    useCases: ["SaaS companies selling globally wanting to avoid tax registration complexity", "Small teams without resources to manage international tax compliance", "B2C SaaS and developer tools needing simple global sales"],
  },
  {
    slug: "recurly",
    name: "Recurly",
    tagline: "Enterprise subscription management with industry-leading revenue recovery",
    description: "Recurly is an enterprise-grade subscription management platform known for its industry-leading revenue recovery (dunning). Recurly claims to recover an average of $13 for every $1 spent on the platform through its machine-learning-based dunning engine. The platform supports complex subscription scenarios, multiple payment gateways, and detailed analytics. Used by companies like Sling TV, BarkBox, and Twitch.",
    category: "recurring-billing",
    tags: ["recurly", "subscription management", "revenue recovery", "dunning", "enterprise", "analytics"],
    url: "https://recurly.com",
    pricing: "paid",
    featured: true,
    logo: "🔁",
    domain: "recurly.com",
    pros: ["Industry-leading ML-powered revenue recovery (dunning) engine", "Recovers average $13 for every $1 spent — strong ROI", "Supports multiple payment gateways simultaneously", "Robust analytics with churn analysis and cohort reporting", "Enterprise-grade with SOC 1 and SOC 2 compliance"],
    cons: ["Pricing is based on revenue — gets expensive as you scale", "Setup requires more technical effort than Chargebee's no-code approach", "Customer self-service portal customization is limited", "Smaller integration ecosystem compared to Stripe or Chargebee"],
    useCases: ["High-volume subscription businesses losing revenue to failed payments", "Media and streaming companies managing millions of subscribers", "Enterprise SaaS needing multi-gateway and advanced dunning"],
  },
  {
    slug: "zuora",
    name: "Zuora",
    tagline: "Enterprise subscription billing platform for the world's largest companies",
    description: "Zuora is the enterprise standard for subscription billing, serving the largest companies in the world including Zoom, Ford, and Caterpillar. It handles the most complex billing scenarios: usage metering, multi-product bundles, contract amendments, global currencies, and revenue recognition at massive scale. Zuora processes $100B+ in subscription commerce annually. Implementation is complex and expensive, making it best suited for companies with $10M+ ARR and dedicated billing operations.",
    category: "usage-billing",
    tags: ["zuora", "enterprise billing", "subscription commerce", "revenue recognition", "usage metering", "global"],
    url: "https://www.zuora.com",
    pricing: "paid",
    featured: true,
    logo: "🏛️",
    domain: "zuora.com",
    pros: ["Handles the most complex billing scenarios at enterprise scale", "Processes $100B+ in subscription commerce annually", "Robust revenue recognition (ASC 606) for public companies", "Multi-entity, multi-currency, and multi-product support", "Deep integrations with Salesforce, NetSuite, and major ERPs"],
    cons: ["Very expensive — total cost often $100K+/year including implementation", "Implementation takes 3-12 months with professional services", "Overkill for companies under $10M ARR", "User interface can feel dated and complex"],
    useCases: ["Enterprise companies with $10M+ ARR and complex billing needs", "Public companies requiring robust ASC 606 revenue recognition", "Global businesses with multi-entity, multi-currency billing"],
  },
  { slug: "maxio", name: "Maxio (SaaSOptics + Chargify)", tagline: "B2B SaaS financial operations platform for billing, analytics, and revenue recognition", description: "Maxio (merger of SaaSOptics and Chargify) provides billing, revenue recognition, SaaS metrics, and financial reporting in one platform. It's designed for B2B SaaS companies between $5M-$100M ARR needing to professionalize their financial operations. Combines the billing strength of Chargify with SaaSOptics' revenue recognition.", category: "recurring-billing", tags: ["maxio", "saasoptics", "chargify", "b2b saas", "revenue recognition", "saas metrics"], url: "https://www.maxio.com", pricing: "paid", featured: false, logo: "📈", domain: "maxio.com" },
  { slug: "lago", name: "Lago", tagline: "Open-source metered billing platform for usage-based pricing", description: "Lago is an open-source billing API for usage-based and metered pricing models. It handles event ingestion, real-time metering, invoice generation, and payment collection. Self-hostable and developer-friendly, Lago is popular with infrastructure and API companies implementing consumption pricing.", category: "usage-billing", tags: ["lago", "open source", "metered billing", "usage-based", "api", "self-hosted"], url: "https://www.getlago.com", pricing: "freemium", featured: false, logo: "🌊", domain: "getlago.com" },
  { slug: "ordway", name: "Ordway", tagline: "Billing and revenue automation for mid-market B2B companies", description: "Ordway automates billing, revenue recognition, and collections for mid-market B2B companies. It handles complex contract billing, usage pricing, and multi-element arrangements. Strong ERP integrations (NetSuite, QuickBooks, Sage) make it fit well in existing finance stacks.", category: "recurring-billing", tags: ["ordway", "b2b billing", "revenue automation", "contract billing", "mid-market", "erp integration"], url: "https://ordwaylabs.com", pricing: "paid", featured: false, logo: "📊", domain: "ordwaylabs.com" },
  { slug: "churnkey", name: "Churnkey", tagline: "AI-powered cancel flow and retention platform that saves churning subscribers", description: "Churnkey provides intelligent cancel flows, failed payment recovery, and reactivation campaigns. Its AI analyzes why customers cancel and presents personalized offers (discounts, pauses, plan changes) to retain them. Companies report 20-40% churn reduction within months of implementation.", category: "revenue-recovery", tags: ["churnkey", "churn reduction", "cancel flow", "retention", "dunning", "reactivation"], url: "https://churnkey.co", pricing: "paid", featured: false, logo: "🔑", domain: "churnkey.co" },
  { slug: "baremetrics", name: "Baremetrics", tagline: "Subscription analytics and revenue recovery for SaaS businesses", description: "Baremetrics provides real-time SaaS analytics (MRR, churn, LTV, etc.) and revenue recovery through automated dunning. It connects directly to Stripe, Chargebee, Recurly, and other billing providers. The Recover feature automates failed payment retries and customer communication.", category: "revenue-recovery", tags: ["baremetrics", "saas analytics", "mrr", "churn analysis", "dunning", "revenue recovery"], url: "https://baremetrics.com", pricing: "paid", featured: false, logo: "📊", domain: "baremetrics.com" },
  { slug: "dealHub", name: "DealHub", tagline: "Revenue platform with CPQ, subscription management, and billing", description: "DealHub provides configure-price-quote (CPQ), contract lifecycle management, subscription management, and billing in one revenue platform. It's designed for sales teams selling complex subscription and SaaS products, automating the quote-to-revenue process.", category: "cpq-quoting", tags: ["dealhub", "cpq", "subscription quoting", "revenue platform", "sales automation", "contract management"], url: "https://dealhub.io", pricing: "paid", featured: false, logo: "🤝", domain: "dealhub.io" },
  { slug: "orb", name: "Orb", tagline: "Developer-first billing platform for complex pricing models", description: "Orb is a modern billing platform built for engineering teams implementing complex pricing. It handles event-based metering, real-time usage tracking, and flexible pricing models (per-seat, usage, tiered, packaged). Orb's API-first approach and real-time data pipeline make it the choice for technically sophisticated billing needs.", category: "usage-billing", tags: ["orb", "developer billing", "event-based", "real-time metering", "api-first", "pricing models"], url: "https://www.withorb.com", pricing: "paid", featured: false, logo: "🔮", domain: "withorb.com" },
  { slug: "stripe-revenue-recognition", name: "Stripe Revenue Recognition", tagline: "Automated ASC 606 revenue recognition built into Stripe", description: "Stripe Revenue Recognition automates ASC 606 / IFRS 15 compliant revenue recognition for companies using Stripe Billing. It automatically generates revenue waterfalls, deferred revenue schedules, and accounting journal entries based on your billing data.", category: "payment-infrastructure", tags: ["stripe", "revenue recognition", "asc 606", "accounting", "deferred revenue", "compliance"], url: "https://stripe.com/revenue-recognition", pricing: "paid", featured: false, logo: "💜", domain: "stripe.com" },
  { slug: "fastspring", name: "FastSpring", tagline: "Full-service ecommerce platform for selling software and SaaS globally", description: "FastSpring is a merchant of record platform for software and SaaS companies selling globally. Like Paddle, it handles payments, tax, compliance, and subscription management. It's particularly popular with desktop software companies and game developers.", category: "payment-infrastructure", tags: ["fastspring", "merchant of record", "software sales", "global ecommerce", "tax compliance", "gaming"], url: "https://fastspring.com", pricing: "paid", featured: false, logo: "🚀", domain: "fastspring.com" },
  { slug: "cacheflow", name: "Cacheflow", tagline: "AI-powered CPQ and subscription billing for B2B SaaS sales", description: "Cacheflow combines CPQ with subscription billing and buyer financing in one platform. It automates proposal generation, contract creation, and payment collection. Unique financing options let buyers pay monthly while sellers get paid upfront.", category: "cpq-quoting", tags: ["cacheflow", "cpq", "buyer financing", "b2b sales", "proposals", "subscription billing"], url: "https://www.getcacheflow.com", pricing: "paid", featured: false, logo: "💰", domain: "getcacheflow.com" },
];
