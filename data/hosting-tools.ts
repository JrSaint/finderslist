export type HostingCategory =
  | "cloud-hosting"
  | "managed-wordpress"
  | "static-jamstack"
  | "vps-dedicated"
  | "domain-registrar";

export interface HostingTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: HostingCategory;
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

export const HOSTING_CATEGORIES: Record<
  HostingCategory,
  { label: string; emoji: string; description: string; gradient: string }
> = {
  "cloud-hosting": {
    label: "Cloud & PaaS Hosting",
    emoji: "☁️",
    description: "Platform-as-a-service and cloud hosting for modern web applications.",
    gradient: "from-blue-500 to-cyan-500",
  },
  "managed-wordpress": {
    label: "Managed WordPress Hosting",
    emoji: "📝",
    description: "Optimized hosting built specifically for WordPress performance and security.",
    gradient: "from-indigo-500 to-purple-500",
  },
  "static-jamstack": {
    label: "Static & JAMstack Hosting",
    emoji: "⚡",
    description: "Fast, global CDN hosting for static sites and JAMstack applications.",
    gradient: "from-amber-500 to-orange-500",
  },
  "vps-dedicated": {
    label: "VPS & Dedicated Servers",
    emoji: "🖥️",
    description: "Virtual private servers and dedicated hardware for full control.",
    gradient: "from-slate-500 to-gray-600",
  },
  "domain-registrar": {
    label: "Domain Registrars",
    emoji: "🌐",
    description: "Register, manage, and transfer domain names for your websites.",
    gradient: "from-green-500 to-teal-500",
  },
};

export const HOSTING_EDITORIAL = {
  title: "How to Choose the Right Web Hosting in 2026",
  intro: `Web hosting is the foundation of every online presence, determining your site's speed, reliability, security, and scalability. The hosting landscape spans everything from managed WordPress hosts optimized for a single CMS to cloud platforms that can scale to millions of requests per second. Choosing the right hosting provider depends on your technical skill level, the type of site or application you are building, and how much traffic you expect to handle.\n\nFor most websites and blogs, managed hosting takes care of server updates, security patches, backups, and performance optimization so you can focus on content. Developers building custom applications typically prefer cloud platforms like Vercel, Netlify, or AWS that offer deployment pipelines, serverless functions, and edge computing. Businesses with high-traffic sites or compliance requirements may need VPS or dedicated servers for full control over the infrastructure.\n\nPerformance has become a critical differentiator as search engines factor page speed into rankings and users abandon sites that take more than a few seconds to load. Look for hosts with global CDN networks, SSD storage, and server locations close to your target audience. The cheapest shared hosting may seem appealing, but slow load times and frequent downtime can cost you more in lost traffic than the price difference.`,
  buyerGuide: [
    "Performance and uptime guarantees — look for providers with 99.9%+ uptime SLAs and server response times under 200ms. Check independent monitoring data rather than relying solely on the provider's claims.",
    "Scalability path — your needs will change over time. Choose a provider where you can upgrade from shared to VPS to dedicated, or from a starter plan to enterprise, without migrating to a completely different platform.",
    "Security features included — SSL certificates, automated backups, DDoS protection, and malware scanning should be standard. Providers that charge extra for basic security features are cutting corners.",
    "Developer tools and deployment workflow — for modern web applications, look for Git-based deployment, staging environments, CLI tools, and CI/CD integration. These features dramatically speed up your development workflow.",
    "Support quality and response time — when your site goes down at 2 AM, you need fast, competent support. Test response times before committing and check reviews specifically about support quality during emergencies.",
  ],
  faq: [
    {
      question: "What type of hosting do I need for a WordPress site?",
      answer: "For most WordPress sites, managed WordPress hosting is the best choice. Providers like WP Engine, Kinsta, and Flywheel handle WordPress-specific optimization, automatic updates, security, and caching so you do not need server administration skills. Shared hosting works for very small sites but often delivers poor performance as your traffic grows.",
    },
    {
      question: "Is cloud hosting better than traditional shared hosting?",
      answer: "Cloud hosting offers better reliability, scalability, and performance than traditional shared hosting. With cloud hosting, your site runs on distributed infrastructure that can handle traffic spikes and recover from hardware failures automatically. Shared hosting puts multiple sites on a single server where one site's traffic spike can slow everyone else down.",
    },
    {
      question: "Do I need a VPS or dedicated server for my business website?",
      answer: "Most business websites do not need VPS or dedicated servers. Managed cloud hosting handles the vast majority of business sites efficiently. VPS and dedicated servers are best for applications with specific software requirements, high-traffic e-commerce sites processing thousands of transactions daily, or businesses with strict compliance requirements that mandate isolated infrastructure.",
    },
  ],
};

export const HOSTING_TOOLS: HostingTool[] = [
  {
    slug: "vercel",
    name: "Vercel",
    tagline: "The platform for frontend developers",
    description:
      "Vercel is the leading deployment platform for frontend developers, built by the creators of Next.js. It offers zero-config deployments, global edge network, serverless functions, and instant preview URLs on every git push. The go-to hosting platform for Next.js, Nuxt, SvelteKit, and any modern frontend framework.",
    category: "static-jamstack",
    tags: ["Next.js", "frontend", "serverless", "edge", "preview URLs", "CI/CD", "JAMstack"],
    url: "https://vercel.com",
    affiliateUrl: "https://vercel.com?ref=finderslist",
    pricing: "freemium",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=vercel.com&sz=128",
    domain: "vercel.com",
    pros: [
      "Best-in-class Next.js support",
      "Zero-config deployments from Git",
      "Fast global edge network",
      "Generous free tier",
    ],
    cons: [
      "Can get expensive for high-traffic sites",
      "Team features require paid plans",
      "Vendor lock-in concerns for heavy Vercel feature usage",
    ],
    useCases: ["Next.js applications", "Frontend team deployments", "Preview environments", "Edge-first web apps"],
  },
  {
    slug: "netlify",
    name: "Netlify",
    tagline: "Composable web platform for modern applications",
    description:
      "Netlify is the platform that pioneered modern web deployment with continuous deployment from Git, instant global CDN, serverless functions, and form handling. It supports all major frameworks and is the go-to platform for JAMstack sites, static sites, and full-stack serverless applications.",
    category: "static-jamstack",
    tags: ["JAMstack", "CI/CD", "serverless", "CDN", "forms", "frontend", "static sites"],
    url: "https://netlify.com",
    affiliateUrl: "https://netlify.com?ref=finderslist",
    pricing: "freemium",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=netlify.com&sz=128",
    domain: "netlify.com",
    pros: [
      "Pioneered modern git-based deployments",
      "Generous free tier",
      "Built-in forms, identity, and functions",
      "Framework-agnostic",
    ],
    cons: [
      "Bandwidth limits on free tier",
      "Large builds can be slow",
      "Some features require paid plans",
    ],
    useCases: ["Static site hosting", "JAMstack applications", "Agency client sites", "Gatsby and Astro hosting"],
  },
  {
    slug: "cloudflare-pages",
    name: "Cloudflare Pages",
    tagline: "Fast, free hosting on the Cloudflare global network",
    description:
      "Cloudflare Pages is a git-connected hosting platform for frontend applications, backed by Cloudflare's global network of 300+ data centers. It offers unlimited bandwidth, unlimited requests, and automatic deployments — making it one of the most generous free hosting options available for static sites.",
    category: "static-jamstack",
    tags: ["Cloudflare", "static hosting", "free", "unlimited bandwidth", "CDN", "edge", "git-connected"],
    url: "https://pages.cloudflare.com",
    pricing: "freemium",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=cloudflare.com&sz=128",
    domain: "cloudflare.com",
    pros: [
      "Unlimited bandwidth on free tier",
      "Cloudflare's global network",
      "No traffic spikes pricing surprises",
      "Integrated with Cloudflare Workers",
    ],
    cons: [
      "Build times can be slower than Vercel/Netlify",
      "Less Next.js-specific optimization",
      "Some features require Cloudflare ecosystem",
    ],
    useCases: ["High-traffic static sites", "Cost-conscious deployments", "Sites integrated with Cloudflare CDN"],
  },
  {
    slug: "render",
    name: "Render",
    tagline: "Cloud hosting that actually makes sense",
    description:
      "Render is a modern cloud hosting platform that supports web services, static sites, background workers, cron jobs, and managed databases — all from git with zero DevOps. A strong alternative to Heroku with transparent pricing, it's popular with startups and indie developers for its simplicity.",
    category: "cloud-hosting",
    tags: ["cloud hosting", "web services", "databases", "workers", "cron", "Heroku alternative", "startup"],
    url: "https://render.com",
    affiliateUrl: "https://render.com?ref=finderslist",
    pricing: "freemium",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=render.com&sz=128",
    domain: "render.com",
    pros: [
      "Simple, no-DevOps cloud platform",
      "Free tier for static sites and web services",
      "Managed databases included",
      "Transparent pricing",
    ],
    cons: [
      "Free web services spin down when idle",
      "Less features than major cloud providers",
      "Limited regions compared to AWS/GCP",
    ],
    useCases: ["Startup backend deployment", "Full-stack app hosting", "Hobby projects", "Heroku migration"],
  },
  {
    slug: "railway",
    name: "Railway",
    tagline: "Deploy anything, instantly",
    description:
      "Railway is a developer-focused cloud platform that allows developers to deploy any application from a Dockerfile or GitHub repo instantly. It offers automatic scaling, managed databases, environment management, and a usage-based pricing model. Popular with developers who want Heroku-like simplicity with modern infrastructure.",
    category: "cloud-hosting",
    tags: ["Docker", "instant deploy", "databases", "usage-based", "developer-first", "GitHub", "simple"],
    url: "https://railway.app",
    pricing: "freemium",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=railway.app&sz=128",
    domain: "railway.app",
    pros: [
      "Deploy from any Docker or GitHub repo",
      "Usage-based pricing",
      "Instant provisioning",
      "Good developer experience",
    ],
    cons: [
      "Limited enterprise features",
      "Smaller ecosystem than Render",
      "Pricing can be unpredictable",
    ],
    useCases: ["Backend APIs", "Hobby projects", "Prototype deployments", "Docker-based apps"],
  },
  {
    slug: "flyio",
    name: "Fly.io",
    tagline: "Run your apps close to your users, globally",
    description:
      "Fly.io is a platform for running application containers on hardware deployed in 30+ regions around the world, as close to users as possible. It's popular with developers who need low-latency global deployment and supports any language or framework via Docker. Known for its developer-friendly CLI and fast deploys.",
    category: "cloud-hosting",
    tags: ["Docker", "global deployment", "edge", "low-latency", "containers", "multi-region", "CLI"],
    url: "https://fly.io",
    pricing: "freemium",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=fly.io&sz=128",
    domain: "fly.io",
    pros: [
      "Global deployment in 30+ regions",
      "Low-latency edge computing",
      "Deploy any Docker container",
      "Good free tier",
    ],
    cons: [
      "More complex than Render or Railway",
      "Networking configuration can be tricky",
      "Documentation quality varies",
    ],
    useCases: ["Global low-latency apps", "Real-time apps", "Multi-region databases", "Docker container hosting"],
  },
  {
    slug: "wpengine",
    name: "WP Engine",
    tagline: "The WordPress digital experience platform",
    description:
      "WP Engine is the market leader for managed WordPress hosting, used by over 150,000 customers. It offers enterprise-grade performance, automatic daily backups, one-click staging environments, top-tier security, and expert WordPress support. The premium choice for businesses that take WordPress seriously.",
    category: "managed-wordpress",
    tags: ["managed WordPress", "enterprise", "staging", "backups", "security", "performance", "support"],
    url: "https://wpengine.com",
    affiliateUrl: "https://wpengine.com?ref=finderslist",
    pricing: "paid",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=wpengine.com&sz=128",
    domain: "wpengine.com",
    pros: [
      "Best-in-class WordPress performance",
      "One-click staging environments",
      "Expert WordPress support 24/7",
      "Automated daily backups",
    ],
    cons: [
      "Expensive ($20+/month for starter)",
      "No email hosting included",
      "Staging limited to higher plans",
    ],
    useCases: ["Business WordPress sites", "WooCommerce stores", "Agency client WordPress hosting"],
  },
  {
    slug: "kinsta",
    name: "Kinsta",
    tagline: "Premium managed WordPress hosting on Google Cloud",
    description:
      "Kinsta is a premium managed WordPress host powered exclusively by Google Cloud Platform. It uses LXD containers, automatic daily backups, Cloudflare CDN, and a custom control panel (MyKinsta) that's widely considered the best in the managed WordPress space. Loved by developers and agencies for its speed and reliability.",
    category: "managed-wordpress",
    tags: ["Google Cloud", "managed WordPress", "LXD containers", "Cloudflare CDN", "MyKinsta", "fast", "premium"],
    url: "https://kinsta.com",
    affiliateUrl: "https://kinsta.com?ref=finderslist",
    pricing: "paid",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=kinsta.com&sz=128",
    domain: "kinsta.com",
    pros: [
      "Best WordPress hosting UX (MyKinsta)",
      "Google Cloud infrastructure",
      "Cloudflare CDN included",
      "Excellent performance benchmarks",
    ],
    cons: [
      "Expensive ($35+/month)",
      "Limited to one site on starter plan",
      "No email hosting",
    ],
    useCases: ["High-traffic WordPress sites", "WooCommerce performance", "Agency managed WordPress"],
  },
  {
    slug: "flywheel",
    name: "Flywheel",
    tagline: "Managed WordPress for designers and agencies",
    description:
      "Flywheel is managed WordPress hosting designed specifically for creative agencies and designers. It features free site migration, demo sites for pitching clients, bulk billing, and a clean dashboard that makes managing multiple client sites easy. Now part of WP Engine.",
    category: "managed-wordpress",
    tags: ["managed WordPress", "agencies", "designers", "demo sites", "client billing", "WP Engine"],
    url: "https://getflywheel.com",
    pricing: "paid",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=getflywheel.com&sz=128",
    domain: "getflywheel.com",
    pros: [
      "Built for agencies managing multiple sites",
      "Free demo sites for pitching",
      "Clean, beautiful dashboard",
      "WP Engine infrastructure",
    ],
    cons: [
      "Expensive",
      "Less features than standalone WP Engine",
      "Limited dev-friendly tools",
    ],
    useCases: ["Design agency WordPress hosting", "Client site management", "Portfolio hosting"],
  },
  {
    slug: "siteground",
    name: "SiteGround",
    tagline: "Managed WordPress and web hosting that works",
    description:
      "SiteGround is one of the most recommended web hosts by WordPress.org, known for its excellent support, fast performance, and affordable pricing. It offers shared hosting, managed WordPress, WooCommerce hosting, and cloud hosting. Popular with bloggers, small businesses, and developers for the balance of price and quality.",
    category: "managed-wordpress",
    tags: ["WordPress", "shared hosting", "WooCommerce", "affordable", "support", "small business", "fast"],
    url: "https://siteground.com",
    affiliateUrl: "https://siteground.com?ref=finderslist",
    pricing: "paid",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=siteground.com&sz=128",
    domain: "siteground.com",
    pros: [
      "Excellent customer support",
      "Recommended by WordPress.org",
      "Good performance for the price",
      "Free daily backups",
    ],
    cons: [
      "Renewal prices are higher than intro pricing",
      "Storage limits on starter plans",
      "Less powerful than WP Engine or Kinsta",
    ],
    useCases: ["WordPress bloggers", "Small business websites", "Affordable WooCommerce hosting"],
  },
  {
    slug: "digitalocean",
    name: "DigitalOcean",
    tagline: "Cloud infrastructure for developers",
    description:
      "DigitalOcean is a developer-friendly cloud platform offering Droplets (VPS), managed Kubernetes, managed databases, and app deployment. Known for its simplicity, great documentation, and predictable pricing, it's the preferred cloud provider for indie developers, startups, and small dev teams.",
    category: "vps-dedicated",
    tags: ["VPS", "Droplets", "Kubernetes", "managed databases", "developer-friendly", "affordable", "startup"],
    url: "https://digitalocean.com",
    affiliateUrl: "https://digitalocean.com?ref=finderslist",
    pricing: "paid",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=digitalocean.com&sz=128",
    domain: "digitalocean.com",
    pros: [
      "Simple, developer-friendly interface",
      "Predictable, transparent pricing",
      "Excellent documentation",
      "Managed Kubernetes and databases",
    ],
    cons: [
      "Less feature-rich than AWS/GCP/Azure",
      "No free tier for VPS (only $200 credit)",
      "Limited enterprise support",
    ],
    useCases: ["Developer VPS hosting", "Startup cloud infrastructure", "Managed Kubernetes", "Simple database hosting"],
  },
  {
    slug: "linode-akamai",
    name: "Linode (Akamai)",
    tagline: "Cloud computing for developers and businesses",
    description:
      "Linode (now Akamai Cloud) is a developer-focused cloud computing platform offering VPS (Linodes), managed Kubernetes, object storage, and databases. Known for its competitive pricing, strong Linux support, and long-standing reputation in the developer community. A solid DigitalOcean alternative.",
    category: "vps-dedicated",
    tags: ["VPS", "Linux", "Akamai", "Kubernetes", "affordable", "developer", "cloud computing"],
    url: "https://linode.com",
    pricing: "paid",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=linode.com&sz=128",
    domain: "linode.com",
    pros: [
      "Competitive pricing",
      "Strong Linux community reputation",
      "Akamai CDN integration",
      "Good documentation",
    ],
    cons: [
      "Less developer-friendly UX than DigitalOcean",
      "Fewer managed services",
      "UI is dated",
    ],
    useCases: ["Linux VPS hosting", "Developer projects", "Budget cloud infrastructure"],
  },
  {
    slug: "hetzner",
    name: "Hetzner",
    tagline: "Powerful, affordable cloud hosting from Germany",
    description:
      "Hetzner is a German cloud provider known for offering the best price-to-performance ratio in the cloud hosting market. Its VPS (Cloud Servers) and dedicated servers offer exceptional hardware specs at a fraction of major cloud provider costs. Popular with European developers and cost-conscious engineering teams.",
    category: "vps-dedicated",
    tags: ["VPS", "dedicated servers", "affordable", "Germany", "European", "price-performance", "Linux"],
    url: "https://hetzner.com",
    pricing: "paid",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=hetzner.com&sz=128",
    domain: "hetzner.com",
    pros: [
      "Best price-to-performance in cloud",
      "Excellent dedicated server options",
      "GDPR-compliant European data centers",
      "Strong community reputation",
    ],
    cons: [
      "Primarily European data centers",
      "Less managed services",
      "UI is functional but not modern",
    ],
    useCases: ["European cloud hosting", "Cost-optimized infrastructure", "High-performance dedicated servers"],
  },
  {
    slug: "namecheap",
    name: "Namecheap",
    tagline: "Domain registration and web hosting, simply done",
    description:
      "Namecheap is one of the most popular domain registrars, known for competitive pricing, free WhoisGuard privacy protection on all domains, and a clean interface. It also offers shared hosting, VPS, and SSL certificates. A go-to for developers and small business owners who want affordable, reliable domain management.",
    category: "domain-registrar",
    tags: ["domain registration", "affordable", "WhoisGuard", "SSL", "hosting", "developer-friendly", "DNS"],
    url: "https://namecheap.com",
    affiliateUrl: "https://namecheap.com?ref=finderslist",
    pricing: "paid",
    featured: true,
    logo: "https://www.google.com/s2/favicons?domain=namecheap.com&sz=128",
    domain: "namecheap.com",
    pros: [
      "Very affordable domain pricing",
      "Free WhoisGuard privacy on all domains",
      "Clean, easy-to-use management interface",
      "Good DNS management",
    ],
    cons: [
      "Hosting is average quality",
      "Some renewal prices increase",
      "Support can be slow",
    ],
    useCases: ["Domain registration", "Domain management for multiple sites", "Developer domain portfolio"],
  },
  {
    slug: "cloudflare-registrar",
    name: "Cloudflare Registrar",
    tagline: "Register domains at wholesale cost",
    description:
      "Cloudflare Registrar offers domain registration at wholesale cost (no markup) — making it the most affordable registrar for most TLDs. There's no upselling, hidden fees, or price hikes on renewal. Ideal for users already in the Cloudflare ecosystem who want to consolidate their domain and DNS management.",
    category: "domain-registrar",
    tags: ["domain registration", "wholesale pricing", "no markup", "Cloudflare", "DNS", "affordable", "security"],
    url: "https://cloudflare.com/products/registrar",
    pricing: "paid",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=cloudflare.com&sz=128",
    domain: "cloudflare.com",
    pros: [
      "Truly wholesale pricing — no markup",
      "No renewal price increases",
      "Free WHOIS privacy",
      "Integrated with Cloudflare DNS",
    ],
    cons: [
      "No domain transfers out initially",
      "Only supports common TLDs",
      "Requires Cloudflare account",
    ],
    useCases: ["Cost-conscious domain registration", "Cloudflare ecosystem users", "Domain portfolio management"],
  },
  {
    slug: "godaddy",
    name: "GoDaddy",
    tagline: "The world's largest domain registrar",
    description:
      "GoDaddy is the world's largest domain registrar with over 85 million domains under management. It offers domains, web hosting, website builders, and email hosting. While marketing-heavy and not always the cheapest, its scale and 24/7 support make it the most familiar choice for non-technical small business owners.",
    category: "domain-registrar",
    tags: ["domain registration", "large scale", "website builder", "email hosting", "small business", "support"],
    url: "https://godaddy.com",
    affiliateUrl: "https://godaddy.com?ref=finderslist",
    pricing: "paid",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=godaddy.com&sz=128",
    domain: "godaddy.com",
    pros: [
      "Largest domain portfolio",
      "24/7 phone support",
      "All-in-one for non-technical users",
      "Good domain transfer tools",
    ],
    cons: [
      "Expensive renewal prices",
      "Aggressive upselling",
      "Not developer-friendly",
    ],
    useCases: ["Small business domain registration", "Non-technical users", "Domain auctions and reselling"],
  },
  {
    slug: "bluehost",
    name: "Bluehost",
    tagline: "Web hosting recommended by WordPress.org",
    description:
      "Bluehost is one of the oldest and most recommended web hosting companies, officially endorsed by WordPress.org. It offers shared hosting, managed WordPress, WooCommerce hosting, and VPS. Popular with beginners for its one-click WordPress install, 24/7 support, and affordable introductory pricing.",
    category: "managed-wordpress",
    tags: ["WordPress", "shared hosting", "beginner-friendly", "WooCommerce", "affordable", "WordPress.org endorsed"],
    url: "https://bluehost.com",
    affiliateUrl: "https://bluehost.com?ref=finderslist",
    pricing: "paid",
    featured: false,
    logo: "https://www.google.com/s2/favicons?domain=bluehost.com&sz=128",
    domain: "bluehost.com",
    pros: [
      "Endorsed by WordPress.org",
      "Very affordable intro pricing",
      "One-click WordPress install",
      "24/7 customer support",
    ],
    cons: [
      "Renewal prices are much higher",
      "Performance not on par with premium hosts",
      "Heavy upselling",
    ],
    useCases: ["Beginner WordPress blogs", "Small business sites", "Budget WordPress hosting"],
  },
];
