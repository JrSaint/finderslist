export type EmailCategory =
  | "email-marketing"
  | "transactional-email"
  | "cold-email"
  | "newsletter"
  | "email-testing";

export interface EmailTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: EmailCategory;
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

export const EMAIL_CATEGORIES: Record<
  EmailCategory,
  { label: string; emoji: string; description: string; gradient: string; guide?: string }
> = {
  "email-marketing": {
    label: "Email Marketing Platforms",
    emoji: "📧",
    description: "Send newsletters, automated campaigns, and manage subscriber lists at scale.",
    gradient: "from-blue-500 to-indigo-500",
    guide: "Email marketing platforms manage subscriber lists, design campaigns, and automate email sequences for newsletters, promotions, and lifecycle marketing. They serve marketing teams and small businesses that need to nurture leads, drive repeat purchases, and communicate with their audience at scale. Compare automation workflow complexity, deliverability reputation, and pricing models since costs can escalate rapidly as your subscriber list grows.",
  },
  "transactional-email": {
    label: "Transactional Email",
    emoji: "⚡",
    description: "Reliable API-driven email for password resets, receipts, and notifications.",
    gradient: "from-amber-500 to-orange-500",
    guide: "Transactional email services deliver time-sensitive, triggered messages like password resets, order confirmations, and account notifications with high reliability and speed. They are built for developers and product teams that need API-driven email delivery with guaranteed inbox placement for critical application communications. Evaluate delivery speed, API documentation quality, and whether the service provides detailed delivery analytics and webhook notifications.",
  },
  "cold-email": {
    label: "Cold Email & Outreach",
    emoji: "📨",
    description: "Automate cold email sequences and outreach campaigns for sales and growth.",
    gradient: "from-green-500 to-teal-500",
    guide: "Cold email and outreach tools automate personalized email sequences for sales prospecting, link building, and business development with features like mail merge, follow-up scheduling, and reply detection. They serve sales teams and growth marketers running outbound campaigns that require sending hundreds or thousands of personalized emails. Focus on deliverability features like email warming, sending limits per account, and domain reputation monitoring to avoid ending up in spam folders.",
  },
  newsletter: {
    label: "Newsletter Platforms",
    emoji: "📰",
    description: "Publish, grow, and monetize email newsletters with dedicated creator tools.",
    gradient: "from-purple-500 to-violet-500",
    guide: "Newsletter platforms are designed specifically for writers and creators who publish recurring email content and want to grow a subscriber base they own. They combine simple publishing interfaces with audience growth tools, paid subscription options, and analytics tailored to newsletter creators. Evaluate whether the platform supports paid subscriptions for monetization, offers custom domain support, and provides the editorial tools that match your publishing workflow.",
  },
  "email-testing": {
    label: "Email Testing & Deliverability",
    emoji: "🔬",
    description: "Test, preview, and optimize email deliverability and inbox placement.",
    gradient: "from-rose-500 to-pink-500",
    guide: "Email testing and deliverability tools preview how your emails render across different clients, check for spam trigger words, and monitor your sender reputation and inbox placement rates. They are essential for teams sending high-volume campaigns where a drop in deliverability directly impacts revenue. Use these tools to test every campaign before sending and to diagnose deliverability issues like SPF, DKIM, and DMARC configuration problems.",
  },
};

export const EMAIL_EDITORIAL = {
  title: "How to Choose the Right Email Tool in 2026",
  intro: `Email remains the highest-ROI marketing channel, delivering an average return of $36 for every dollar spent. But the email tool landscape is fragmented across distinct use cases: marketing platforms for newsletters and campaigns, transactional services for password resets and order confirmations, cold email tools for sales outreach, and newsletter platforms for independent publishers building paid audiences.\n\nChoosing the right email tool starts with understanding your primary use case. Email marketing platforms like Mailchimp and ConvertKit manage subscriber lists, build automated sequences, and provide campaign analytics. Transactional email services like Postmark and SendGrid focus on deliverability and speed for triggered messages. Cold email tools like Instantly and Lemlist automate personalized outreach sequences for sales teams. Newsletter platforms like Beehiiv and Substack help writers build and monetize email audiences.\n\nDeliverability is the most important and most overlooked factor in email tooling. The most beautifully designed email is worthless if it lands in spam. In 2026, email authentication (SPF, DKIM, DMARC) is mandatory, and inbox providers like Gmail increasingly penalize senders with poor engagement metrics. The best email platforms provide built-in deliverability monitoring, authentication setup guidance, and list hygiene tools to keep your sender reputation healthy.`,
  buyerGuide: [
    "Match the tool to your use case -- marketing platforms, transactional services, cold email tools, and newsletter platforms are fundamentally different products designed for different workflows.",
    "Prioritize deliverability features -- look for built-in SPF/DKIM/DMARC setup, dedicated IP options, bounce handling, and deliverability monitoring dashboards.",
    "Evaluate automation capabilities -- the best marketing platforms support multi-step sequences triggered by subscriber behavior, not just time-based drip campaigns.",
    "Compare pricing based on your list size and sending volume -- some tools charge per subscriber, others per email sent, and the cheapest option at 1,000 subscribers may be the most expensive at 50,000.",
    "Check integration with your CRM and website -- email tools should sync contact data bidirectionally with your CRM and trigger automations based on website activity and purchase behavior.",
  ],
  faq: [
    {
      question: "What is the difference between marketing email and transactional email?",
      answer: "Marketing emails are sent to subscriber lists and include newsletters, promotions, and automated sequences. Transactional emails are triggered by user actions and include password resets, order confirmations, and shipping notifications. They have different deliverability requirements and are often best handled by separate tools to protect your sender reputation.",
    },
    {
      question: "How do I improve my email deliverability?",
      answer: "Set up SPF, DKIM, and DMARC authentication for your domain. Clean your list regularly by removing bounced and unengaged subscribers. Avoid spam trigger words in subject lines. Send consistently from a warmed-up domain. Monitor your deliverability metrics and immediately address any drops in inbox placement rates.",
    },
    {
      question: "Is cold email legal?",
      answer: "In the US, the CAN-SPAM Act allows unsolicited commercial email as long as you include a physical address, provide an unsubscribe mechanism, and honor opt-out requests within 10 days. However, GDPR in Europe requires prior consent for most commercial email. Always check the regulations in your recipients' jurisdictions and follow best practices to maintain your sender reputation.",
    },
  ],
};

export const EMAIL_TOOLS: EmailTool[] = [
  {
    slug: "klaviyo",
    name: "Klaviyo",
    tagline: "The platform for intelligent marketing automation",
    description:
      "Klaviyo is the leading email and SMS marketing platform for e-commerce brands, used by over 130,000 businesses. It integrates deeply with Shopify, BigCommerce, and WooCommerce to power data-driven automation flows — abandoned cart sequences, post-purchase follow-ups, browse abandonment, and more. The standard for DTC e-commerce marketing.",
    category: "email-marketing",
    tags: ["ecommerce", "Shopify", "SMS", "automation", "flows", "segmentation", "DTC", "abandoned cart"],
    url: "https://klaviyo.com",
    affiliateUrl: "https://klaviyo.com?ref=finderslist",
    pricing: "freemium",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=klaviyo.com&sz=128",
    domain: "klaviyo.com",
    pros: [
      "Best-in-class e-commerce data integration",
      "Powerful abandoned cart and flow automation",
      "Strong segmentation based on purchase behavior",
      "SMS and email in one platform",
    ],
    cons: [
      "Expensive as list size grows",
      "Learning curve for non-marketers",
      "Best value only with Shopify",
    ],
    useCases: ["Shopify store email marketing", "DTC brand automation", "E-commerce lifecycle email", "Abandoned cart recovery"],
  },
  {
    slug: "mailchimp",
    name: "Mailchimp",
    tagline: "The all-in-one marketing platform for growing businesses",
    description:
      "Mailchimp is the world's most popular email marketing platform with over 13 million users. It's the go-to starting point for small businesses and entrepreneurs, offering email marketing, automation, landing pages, and CRM in one tool. Known for its user-friendly interface and generous free plan.",
    category: "email-marketing",
    tags: ["email marketing", "automation", "landing pages", "CRM", "small business", "free plan", "templates"],
    url: "https://mailchimp.com",
    pricing: "freemium",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=mailchimp.com&sz=128",
    domain: "mailchimp.com",
    pros: [
      "Easiest email tool for beginners",
      "Free up to 500 contacts",
      "Good template library",
      "All-in-one with CRM and landing pages",
    ],
    cons: [
      "Expensive as list grows",
      "Automation is less powerful than Klaviyo",
      "Removed free plan features over time",
    ],
    useCases: ["Small business email marketing", "Newsletter sending", "Simple automation for beginners", "Event email campaigns"],
  },
  {
    slug: "activecampaign",
    name: "ActiveCampaign",
    tagline: "The email marketing, automation, and CRM platform",
    description:
      "ActiveCampaign is a powerful email marketing and marketing automation platform that combines email, SMS, CRM, and sales automation in one tool. Known for its advanced automation builder and deep customer journey capabilities, it's used by over 185,000 businesses who need more power than Mailchimp.",
    category: "email-marketing",
    tags: ["email marketing", "automation", "CRM", "sales automation", "SMS", "B2B", "advanced"],
    url: "https://activecampaign.com",
    affiliateUrl: "https://activecampaign.com?ref=finderslist",
    pricing: "paid",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=activecampaign.com&sz=128",
    domain: "activecampaign.com",
    pros: [
      "Most powerful automation builder in class",
      "CRM and email in one platform",
      "Advanced conditional logic in automations",
      "Good B2B and B2C versatility",
    ],
    cons: [
      "No free plan (only 14-day trial)",
      "Can be overwhelming to start",
      "Expensive at scale",
    ],
    useCases: ["B2B email nurture sequences", "Advanced marketing automation", "CRM + email for SMBs", "Sales and marketing alignment"],
  },
  {
    slug: "convertkit",
    name: "Kit (ConvertKit)",
    tagline: "The email platform built for creators",
    description:
      "Kit (formerly ConvertKit) is the leading email marketing platform for creators — bloggers, podcasters, YouTubers, and authors. It focuses on list growth, segmentation, visual automation, and paid newsletter capabilities. Its simplicity and creator-focused features have made it the preferred choice for the creator economy.",
    category: "email-marketing",
    tags: ["creators", "bloggers", "podcasters", "list growth", "automations", "paid newsletters", "simple"],
    url: "https://kit.com",
    affiliateUrl: "https://kit.com?ref=finderslist",
    pricing: "freemium",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=kit.com&sz=128",
    domain: "kit.com",
    pros: [
      "Best email tool for creators and bloggers",
      "Free up to 10,000 subscribers",
      "Clean, distraction-free editor",
      "Built-in paid newsletter (commerce) features",
    ],
    cons: [
      "Less powerful for e-commerce",
      "Limited landing page templates",
      "Not ideal for complex B2B automation",
    ],
    useCases: ["Creator newsletters", "Blogger email lists", "Podcaster audience management", "Paid newsletter monetization"],
  },
  {
    slug: "drip",
    name: "Drip",
    tagline: "E-commerce email and SMS marketing platform",
    description:
      "Drip is an e-commerce-focused email and SMS marketing platform built for data-driven online stores. It integrates with Shopify and WooCommerce, offering behavioral segmentation, product recommendation emails, and multi-step automation workflows. Popular with growing e-commerce brands that need more than Mailchimp.",
    category: "email-marketing",
    tags: ["ecommerce", "Shopify", "WooCommerce", "SMS", "behavioral segmentation", "product recommendations", "automation"],
    url: "https://drip.com",
    affiliateUrl: "https://drip.com?ref=finderslist",
    pricing: "paid",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=drip.com&sz=128",
    domain: "drip.com",
    pros: [
      "Strong e-commerce segmentation",
      "Product recommendation features",
      "Good visual automation builder",
      "Email and SMS combined",
    ],
    cons: [
      "Expensive vs Klaviyo for similar features",
      "Less popular = smaller community",
      "No free plan",
    ],
    useCases: ["E-commerce email automation", "Shopify and WooCommerce stores", "Product-focused email campaigns"],
  },
  {
    slug: "sendgrid",
    name: "Twilio SendGrid",
    tagline: "Email delivery API trusted by 80,000+ businesses",
    description:
      "Twilio SendGrid is the most widely used transactional email API, trusted by companies like Uber, Airbnb, and Spotify to reliably send billions of emails — password resets, notifications, receipts, and more. It offers a powerful API, SMTP relay, email templates, and a marketing email product, all on a foundation of world-class email deliverability.",
    category: "transactional-email",
    tags: ["API", "SMTP", "transactional email", "deliverability", "developer", "Twilio", "notifications"],
    url: "https://sendgrid.com",
    affiliateUrl: "https://sendgrid.com?ref=finderslist",
    pricing: "freemium",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=sendgrid.com&sz=128",
    domain: "sendgrid.com",
    pros: [
      "Industry-leading deliverability",
      "Powerful API with extensive documentation",
      "Free 100 emails/day",
      "Email analytics and tracking",
    ],
    cons: [
      "Support can be slow on free plans",
      "Marketing email product is basic",
      "Account suspension issues have been reported",
    ],
    useCases: ["App notification emails", "Password reset emails", "Receipt and order confirmation emails", "Large-scale email delivery"],
  },
  {
    slug: "postmark",
    name: "Postmark",
    tagline: "Transactional email done right",
    description:
      "Postmark is a premium transactional email service that prioritizes speed and deliverability above all else. It's used by developers and SaaS companies who need password reset emails and notifications to arrive within seconds, not minutes. Postmark has a strict acceptable use policy that keeps its sending reputation pristine.",
    category: "transactional-email",
    tags: ["transactional email", "fast delivery", "API", "developer", "SaaS", "password reset", "reliability"],
    url: "https://postmarkapp.com",
    affiliateUrl: "https://postmarkapp.com?ref=finderslist",
    pricing: "paid",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=postmarkapp.com&sz=128",
    domain: "postmarkapp.com",
    pros: [
      "Fastest inbox delivery times",
      "Excellent deliverability reputation",
      "Clean, developer-friendly API",
      "60-day email activity retention",
    ],
    cons: [
      "More expensive than SendGrid",
      "No free tier",
      "Strict acceptable use policy can affect edge cases",
    ],
    useCases: ["SaaS transactional emails", "Password resets and notifications", "High-priority system emails"],
  },
  {
    slug: "resend",
    name: "Resend",
    tagline: "Email API for developers",
    description:
      "Resend is a modern email API built by developers, for developers. It features a clean REST API, React Email support for building email templates as React components, and excellent developer experience. Growing rapidly as the modern alternative to SendGrid for developer-first teams.",
    category: "transactional-email",
    tags: ["API", "developer", "React Email", "modern", "transactional", "REST API", "TypeScript"],
    url: "https://resend.com",
    affiliateUrl: "https://resend.com?ref=finderslist",
    pricing: "freemium",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=resend.com&sz=128",
    domain: "resend.com",
    pros: [
      "Best developer experience in class",
      "React Email for component-based templates",
      "100 emails/day free",
      "Modern, clean API design",
    ],
    cons: [
      "Newer — less battle-tested than SendGrid",
      "Fewer advanced marketing features",
      "Smaller ecosystem",
    ],
    useCases: ["Next.js and React app emails", "Developer-first transactional emails", "Modern SaaS email setup"],
  },
  {
    slug: "mailgun",
    name: "Mailgun",
    tagline: "Email API service for developers",
    description:
      "Mailgun is a developer-focused email delivery API from Sinch, used by thousands of businesses for sending, receiving, and tracking emails. It offers a powerful API, email validation, inbox placement testing, and excellent documentation. A strong alternative to SendGrid for teams that want granular control.",
    category: "transactional-email",
    tags: ["API", "SMTP", "email validation", "inbox testing", "developer", "documentation", "Sinch"],
    url: "https://mailgun.com",
    affiliateUrl: "https://mailgun.com?ref=finderslist",
    pricing: "freemium",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=mailgun.com&sz=128",
    domain: "mailgun.com",
    pros: [
      "Excellent email validation API",
      "Inbox placement testing tools",
      "Good documentation",
      "EU data center available",
    ],
    cons: [
      "Support is slow on lower plans",
      "Dashboard UI feels dated",
      "Price-per-email adds up quickly",
    ],
    useCases: ["Developer-built email systems", "Email validation for sign-up forms", "EU-compliant email delivery"],
  },
  {
    slug: "instantly",
    name: "Instantly",
    tagline: "Cold email software that scales your outreach",
    description:
      "Instantly is a fast-growing cold email platform that lets users connect unlimited sending accounts, warm them up automatically, and run AI-personalized cold email campaigns at scale. Known for its aggressive deliverability features and aggressive pricing, it's become popular with sales teams and growth hackers.",
    category: "cold-email",
    tags: ["cold email", "unlimited accounts", "warm-up", "AI personalization", "scale", "sales", "deliverability"],
    url: "https://instantly.ai",
    affiliateUrl: "https://instantly.ai?ref=finderslist",
    pricing: "paid",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=instantly.ai&sz=128",
    domain: "instantly.ai",
    pros: [
      "Unlimited sending accounts on all plans",
      "Built-in email warm-up",
      "AI personalization at scale",
      "Strong deliverability features",
    ],
    cons: [
      "Focused on volume — not quality",
      "Cold email carries compliance risks",
      "Lead list quality still matters",
    ],
    useCases: ["B2B sales outreach at scale", "Agency lead generation", "Growth hacking campaigns"],
  },
  {
    slug: "lemlist",
    name: "Lemlist",
    tagline: "Personalized outreach that gets replies",
    description:
      "Lemlist is a cold email and multi-channel outreach platform known for its image and video personalization features that dramatically improve reply rates. It integrates with LinkedIn and calling tools to create true multi-channel sales sequences. Popular with SDR teams and growth agencies who prioritize quality over volume.",
    category: "cold-email",
    tags: ["cold email", "personalization", "LinkedIn", "multi-channel", "image personalization", "video", "SDR"],
    url: "https://lemlist.com",
    affiliateUrl: "https://lemlist.com?ref=finderslist",
    pricing: "paid",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=lemlist.com&sz=128",
    domain: "lemlist.com",
    pros: [
      "Best image and video personalization",
      "True multi-channel (email + LinkedIn + calls)",
      "Strong reply rate improvements",
      "Active community and education resources",
    ],
    cons: [
      "More expensive than volume-focused tools",
      "Personalization setup takes time",
      "Cold email compliance still required",
    ],
    useCases: ["Personalized B2B outreach", "Agency client acquisition", "SDR LinkedIn + email sequences"],
  },
  {
    slug: "apollo-io",
    name: "Apollo.io",
    tagline: "Sales intelligence and engagement platform",
    description:
      "Apollo.io combines a B2B lead database of 275M+ contacts with a powerful sales engagement platform for cold email and multi-channel outreach. Its unique value: find, enrich, and contact leads all in one tool. Used by over 1 million salespeople for prospecting, sequencing, and pipeline building.",
    category: "cold-email",
    tags: ["B2B database", "cold email", "prospecting", "lead enrichment", "sales sequences", "LinkedIn", "CRM"],
    url: "https://apollo.io",
    affiliateUrl: "https://apollo.io?ref=finderslist",
    pricing: "freemium",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=apollo.io&sz=128",
    domain: "apollo.io",
    pros: [
      "275M+ contact database",
      "All-in-one: find leads + send sequences",
      "Free tier available",
      "Strong CRM integrations",
    ],
    cons: [
      "Data quality varies",
      "Cold email compliance still required",
      "Free plan is limited",
    ],
    useCases: ["B2B prospecting + outreach", "Lead list building", "Sales team pipeline building"],
  },
  {
    slug: "beehiiv",
    name: "beehiiv",
    tagline: "The newsletter platform built for growth",
    description:
      "beehiiv is the fastest-growing newsletter platform, built by the team that grew Morning Brew to millions of subscribers. It offers a powerful editor, built-in monetization (ad network, paid subscriptions), referral program, and granular analytics. The go-to platform for creators who want to build and monetize a serious newsletter business.",
    category: "newsletter",
    tags: ["newsletter", "monetization", "ad network", "paid subscriptions", "referral program", "analytics", "creator"],
    url: "https://beehiiv.com",
    affiliateUrl: "https://beehiiv.com?ref=finderslist",
    pricing: "freemium",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=beehiiv.com&sz=128",
    domain: "beehiiv.com",
    pros: [
      "Best newsletter monetization ecosystem",
      "Built-in ad network for income",
      "Referral program for growth",
      "Superior analytics",
    ],
    cons: [
      "Free plan limited to 2,500 subscribers",
      "Less name recognition than Substack",
      "Limited design customization vs Ghost",
    ],
    useCases: ["Monetized newsletters", "Newsletter businesses", "Creator-to-paid-subscriber conversion"],
  },
  {
    slug: "substack",
    name: "Substack",
    tagline: "Start a newsletter. Build a community. Make money.",
    description:
      "Substack is the leading newsletter platform that allows writers to start free newsletters and convert readers to paid subscribers. It takes 10% of paid subscription revenue. With network effects from the Substack reader app and discovery features, it has become the default starting point for many writers and journalists.",
    category: "newsletter",
    tags: ["newsletter", "paid subscriptions", "writers", "journalists", "community", "reader app", "discovery"],
    url: "https://substack.com",
    pricing: "freemium",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=substack.com&sz=128",
    domain: "substack.com",
    pros: [
      "Free to start, no monthly fees",
      "Built-in reader network and discovery",
      "Simple to use",
      "Podcast and video support",
    ],
    cons: [
      "10% revenue cut on paid subscriptions",
      "Less analytics than beehiiv",
      "Limited growth tools compared to competitors",
    ],
    useCases: ["Independent writers", "Journalists going independent", "Thought leader newsletters"],
  },
  {
    slug: "ghost-newsletter",
    name: "Ghost",
    tagline: "Independent publishing and newsletter platform",
    description:
      "Ghost is an open-source publishing platform popular with independent creators and newsletter writers who want full control over their brand. It offers zero commission on memberships, native email newsletters, and a beautiful editing experience. Can be self-hosted or used on Ghost Pro (managed hosting).",
    category: "newsletter",
    tags: ["newsletter", "membership", "open source", "no commission", "self-hosted", "blogging", "creator"],
    url: "https://ghost.org",
    affiliateUrl: "https://ghost.org?ref=finderslist",
    pricing: "freemium",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=ghost.org&sz=128",
    domain: "ghost.org",
    pros: [
      "Zero commission on memberships",
      "Open source and self-hostable",
      "Beautiful writing experience",
      "Combined blog + newsletter",
    ],
    cons: [
      "Self-hosting requires technical knowledge",
      "Ghost Pro is expensive",
      "Smaller discovery network than Substack",
    ],
    useCases: ["Independent media brands", "Newsletter + blog combination", "Paid membership communities"],
  },
  {
    slug: "email-on-acid",
    name: "Email on Acid",
    tagline: "Email testing and email preview across clients",
    description:
      "Email on Acid is an email testing platform that previews how your email looks across 100+ email clients and devices — Gmail, Outlook, Apple Mail, and more. It also provides deliverability checks, accessibility testing, and spam filter testing to ensure emails land in the inbox and look perfect everywhere.",
    category: "email-testing",
    tags: ["email testing", "email preview", "Outlook", "Gmail", "deliverability", "accessibility", "spam testing"],
    url: "https://emailonacid.com",
    affiliateUrl: "https://emailonacid.com?ref=finderslist",
    pricing: "paid",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=emailonacid.com&sz=128",
    domain: "emailonacid.com",
    pros: [
      "Preview across 100+ clients",
      "Deliverability and spam score testing",
      "Accessibility checker",
      "Used by enterprise email teams",
    ],
    cons: [
      "Expensive subscription",
      "Some previews can take minutes",
      "Focused on testing only — no sending",
    ],
    useCases: ["Pre-send email QA", "Email agency client review", "Outlook rendering verification"],
  },
  {
    slug: "litmus",
    name: "Litmus",
    tagline: "The complete email optimization platform",
    description:
      "Litmus is the premium email optimization platform used by major brands and agencies to test, personalize, analyze, and optimize email campaigns before sending. It includes email previews, spam testing, email analytics beyond open rates, and a collaborative review workflow. The enterprise standard for email quality assurance.",
    category: "email-testing",
    tags: ["email testing", "analytics", "spam testing", "personalization", "enterprise", "previews", "collaboration"],
    url: "https://litmus.com",
    affiliateUrl: "https://litmus.com?ref=finderslist",
    pricing: "paid",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=litmus.com&sz=128",
    domain: "litmus.com",
    pros: [
      "Enterprise email QA standard",
      "Deep email analytics beyond opens",
      "Collaboration and approval workflows",
      "Spam filter testing across ISPs",
    ],
    cons: [
      "Expensive ($99+/month)",
      "Overkill for small senders",
      "Some previews require full plan",
    ],
    useCases: ["Enterprise email QA", "Agency email testing workflow", "Pre-send compliance verification"],
  },
];
