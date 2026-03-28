export type CallCenterCategory = "cloud-contact-center" | "helpdesk-phone" | "predictive-dialer" | "ivr-virtual-agent" | "workforce-management";

export interface CallCenterTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: CallCenterCategory;
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

export const CALL_CENTER_CATEGORIES: Record<CallCenterCategory, { label: string; emoji: string; description: string; gradient: string }> = {
  "cloud-contact-center": { label: "Cloud Contact Center", emoji: "☁️", description: "Full-featured cloud contact center platforms for omnichannel support.", gradient: "from-blue-600/30 to-indigo-800/40" },
  "helpdesk-phone": { label: "Helpdesk Phone Systems", emoji: "📞", description: "Phone-focused support tools integrated with helpdesk and ticketing.", gradient: "from-green-600/30 to-emerald-800/40" },
  "predictive-dialer": { label: "Outbound & Dialers", emoji: "📲", description: "Predictive and power dialers for outbound sales and collections.", gradient: "from-orange-600/30 to-red-800/40" },
  "ivr-virtual-agent": { label: "IVR & Virtual Agents", emoji: "🤖", description: "Interactive voice response and AI virtual agent platforms.", gradient: "from-purple-600/30 to-violet-800/40" },
  "workforce-management": { label: "Workforce Management", emoji: "📊", description: "Tools for scheduling, forecasting, and managing contact center agents.", gradient: "from-teal-600/30 to-cyan-800/40" },
};

export const CALL_CENTER_TOOLS: CallCenterTool[] = [
  {
    slug: "five9",
    name: "Five9",
    tagline: "Leading cloud contact center platform for enterprise omnichannel support",
    description: "Five9 is a market-leading cloud contact center platform serving enterprises with omnichannel support across voice, chat, email, SMS, and social. It includes AI-powered IVR, intelligent routing, workforce optimization, and real-time analytics. Five9 processes 8+ billion call minutes annually and serves customers like Lululemon, Under Armour, and DoorDash. The platform integrates deeply with Salesforce, Zendesk, and ServiceNow for unified agent experiences.",
    category: "cloud-contact-center",
    tags: ["five9", "cloud contact center", "omnichannel", "enterprise", "ai ivr", "workforce optimization"],
    url: "https://www.five9.com",
    pricing: "paid",
    featured: true,
    logo: "☁️",
    domain: "five9.com",
    pros: ["Market leader trusted by major brands (Lululemon, DoorDash)", "AI-powered IVR and intelligent routing reduce handle times", "Deep CRM integrations with Salesforce, Zendesk, ServiceNow", "Comprehensive workforce optimization and quality management", "99.999% uptime SLA with carrier-grade reliability"],
    cons: ["Enterprise pricing — expensive for small contact centers", "Implementation complexity requires professional services", "Agent interface can have a learning curve", "Some advanced features require add-on licenses"],
    useCases: ["Enterprise contact centers handling millions of interactions monthly", "Omnichannel support teams needing voice, chat, email, and social", "Organizations replacing on-premise systems with cloud contact center"],
  },
  {
    slug: "genesys-cloud",
    name: "Genesys Cloud CX",
    tagline: "All-in-one cloud contact center with AI and workforce engagement",
    description: "Genesys Cloud CX is a comprehensive cloud contact center platform known for its AI capabilities and broad feature set. It handles inbound/outbound voice, digital channels, workforce engagement, and analytics in a unified platform. Genesys serves 7,000+ organizations globally and is consistently ranked as a leader by Gartner. Its AI Experience platform includes predictive routing, chatbots, and sentiment analysis.",
    category: "cloud-contact-center",
    tags: ["genesys", "cloud cx", "ai contact center", "omnichannel", "workforce engagement", "gartner leader"],
    url: "https://www.genesys.com/genesys-cloud",
    pricing: "paid",
    featured: true,
    logo: "🟠",
    domain: "genesys.com",
    pros: ["Consistently ranked #1 by Gartner for cloud contact centers", "Comprehensive AI: predictive routing, chatbots, sentiment analysis", "Unified platform for all channels and workforce management", "Open API marketplace with 400+ pre-built integrations", "Scalable from 100 to 10,000+ agent deployments"],
    cons: ["Premium pricing — multiple tiers with add-on costs", "Complex platform requires dedicated administration", "Migration from legacy systems can be challenging", "Reporting customization has a learning curve"],
    useCases: ["Large enterprises needing Gartner-validated contact center platform", "Contact centers deploying AI for routing, chatbots, and analytics", "Global operations requiring multi-language, multi-region support"],
  },
  {
    slug: "aircall",
    name: "Aircall",
    tagline: "Cloud phone system built for sales and support teams with CRM integration",
    description: "Aircall is a cloud-based phone system designed specifically for sales and support teams. It integrates with 100+ business tools (Salesforce, HubSpot, Zendesk, Intercom) and provides features like call routing, IVR, call recording, analytics, and power dialing. Aircall is known for its ease of setup (minutes, not months) and intuitive interface. It serves 17,000+ companies and is particularly popular with mid-market SaaS and tech companies.",
    category: "helpdesk-phone",
    tags: ["aircall", "cloud phone", "sales dialer", "crm integration", "call recording", "mid-market"],
    url: "https://aircall.io",
    affiliateUrl: "https://aircall.io",
    pricing: "paid",
    featured: true,
    logo: "📞",
    domain: "aircall.io",
    pros: ["Sets up in minutes with zero hardware requirements", "100+ native integrations including Salesforce, HubSpot, Zendesk", "Intuitive interface — minimal training needed for agents", "Built-in power dialer for outbound sales teams", "Real-time analytics and call monitoring for managers"],
    cons: ["Per-user pricing ($30-50/user/mo) adds up for larger teams", "Call quality can vary based on internet connection", "Limited advanced contact center features vs. Five9/Genesys", "International calling rates are a separate cost"],
    useCases: ["SaaS sales teams needing a dialer integrated with HubSpot/Salesforce", "Support teams wanting phone support alongside their helpdesk", "Growing companies needing quick phone system setup without IT complexity"],
  },
  {
    slug: "talkdesk",
    name: "Talkdesk",
    tagline: "AI-powered cloud contact center for customer-obsessed companies",
    description: "Talkdesk is a cloud contact center platform heavily focused on AI innovation. Its AI products include virtual agents, agent assist (real-time guidance), interaction analytics, and workforce management with AI scheduling. Talkdesk Industry Experience Clouds provide pre-built solutions for financial services, healthcare, and retail. Used by companies like IBM, Fujitsu, and Trivago.",
    category: "cloud-contact-center",
    tags: ["talkdesk", "ai contact center", "industry clouds", "virtual agents", "agent assist", "analytics"],
    url: "https://www.talkdesk.com",
    pricing: "paid",
    featured: true,
    logo: "💬",
    domain: "talkdesk.com",
    pros: ["Strong AI focus: virtual agents, agent assist, and interaction analytics", "Industry-specific solutions for healthcare, financial services, retail", "AppConnect marketplace with 80+ integrations", "Low-code/no-code tools for admin customization", "Fast deployment — weeks, not months"],
    cons: ["Enterprise pricing with per-user and per-interaction fees", "Some AI features require separate premium licenses", "Smaller ecosystem than Genesys or Five9", "Workforce management module is newer and less mature"],
    useCases: ["Companies wanting AI-first contact center with virtual agents", "Healthcare or financial services needing industry-specific compliance", "Mid-market teams scaling from basic phone to full contact center"],
  },
  {
    slug: "nice-cxone",
    name: "NICE CXone",
    tagline: "Enterprise contact center platform with the industry's most comprehensive AI",
    description: "NICE CXone (formerly inContact) is a comprehensive cloud contact center platform with particularly strong workforce optimization and quality management. Its Enlighten AI provides purpose-built models for customer experience — including sentiment analysis, auto-summarization, and complaint detection. NICE serves some of the world's largest contact centers and is a Gartner Magic Quadrant leader alongside Genesys.",
    category: "cloud-contact-center",
    tags: ["nice cxone", "enterprise", "enlighten ai", "workforce optimization", "quality management", "gartner leader"],
    url: "https://www.nice.com/products/cx-platform",
    pricing: "paid",
    featured: true,
    logo: "🔵",
    domain: "nice.com",
    pros: ["Enlighten AI models purpose-built for CX use cases", "Industry-leading workforce optimization and quality management", "Gartner Magic Quadrant leader year after year", "Handles the largest contact center deployments globally", "Comprehensive recording, compliance, and analytics"],
    cons: ["Very expensive — designed for large enterprise budgets", "Complex platform with steep learning curve for admins", "Implementation timelines can be long for full deployments", "User interface can feel less modern than newer competitors"],
    useCases: ["Enterprise contact centers with 1,000+ agents", "Organizations requiring advanced workforce optimization", "Regulated industries needing comprehensive recording and compliance"],
  },
  { slug: "cloudtalk", name: "CloudTalk", tagline: "AI-powered business calling software for sales and support teams", description: "CloudTalk provides a cloud phone system with AI features for sales and support teams. It offers smart dialers, call flow designer, real-time analytics, and 35+ integrations. Popular with European and global SMBs for its competitive pricing and international number support in 160+ countries.", category: "helpdesk-phone", tags: ["cloudtalk", "business calling", "ai phone", "international", "smart dialer", "smb"], url: "https://www.cloudtalk.io", pricing: "paid", featured: false, logo: "📱", domain: "cloudtalk.io" },
  { slug: "dialpad", name: "Dialpad Contact Center", tagline: "AI-powered contact center with real-time transcription and coaching", description: "Dialpad's contact center solution features real-time transcription, AI agent assist with live coaching, and sentiment analysis. Built on Google Cloud, it provides excellent voice quality and AI capabilities. The platform is known for its modern interface and quick setup compared to legacy vendors.", category: "cloud-contact-center", tags: ["dialpad", "ai contact center", "real-time transcription", "coaching", "google cloud", "modern"], url: "https://www.dialpad.com/ai-contact-center/", pricing: "paid", featured: false, logo: "💎", domain: "dialpad.com" },
  { slug: "justcall", name: "JustCall", tagline: "Cloud phone system for remote sales and support teams", description: "JustCall provides a cloud phone system with SMS, WhatsApp, and calling features for distributed teams. It includes an auto-dialer, call recording, voicemail drops, and integrations with 100+ CRMs and helpdesks. Affordable pricing makes it popular with startups and small teams.", category: "helpdesk-phone", tags: ["justcall", "cloud phone", "sms", "whatsapp", "auto dialer", "affordable"], url: "https://justcall.io", pricing: "paid", featured: false, logo: "📞", domain: "justcall.io" },
  { slug: "phoneburner", name: "PhoneBurner", tagline: "Power dialer for outbound sales with no connection delays", description: "PhoneBurner is a power dialer that lets sales reps make 60-80 calls per hour with zero connection delay. It includes voicemail drop, email follow-up, lead management, and CRM integration. Unlike predictive dialers, PhoneBurner connects one call at a time with no awkward pauses.", category: "predictive-dialer", tags: ["phoneburner", "power dialer", "outbound sales", "voicemail drop", "lead management", "no delay"], url: "https://www.phoneburner.com", pricing: "paid", featured: false, logo: "🔥", domain: "phoneburner.com" },
  { slug: "convoso", name: "Convoso", tagline: "Predictive dialer and outbound contact center for lead generation", description: "Convoso provides predictive dialing, dynamic scripting, and DID management for outbound contact centers. Its smart caller ID rotation and speed-to-lead features maximize contact rates. Popular with insurance, solar, and home services lead generation companies.", category: "predictive-dialer", tags: ["convoso", "predictive dialer", "outbound", "lead generation", "caller id", "insurance"], url: "https://www.convoso.com", pricing: "paid", featured: false, logo: "📊", domain: "convoso.com" },
  { slug: "google-ccai", name: "Google Contact Center AI", tagline: "Google's AI platform for building virtual agents and assisting live agents", description: "Google CCAI provides AI building blocks for contact centers: Dialogflow virtual agents, Agent Assist for real-time guidance, and Insights for interaction analytics. It's a platform layer that integrates with existing contact center infrastructure rather than a standalone solution.", category: "ivr-virtual-agent", tags: ["google ccai", "dialogflow", "virtual agent", "agent assist", "ai platform", "analytics"], url: "https://cloud.google.com/solutions/contact-center", pricing: "paid", featured: false, logo: "🟢", domain: "cloud.google.com" },
  { slug: "amazon-connect", name: "Amazon Connect", tagline: "AWS cloud contact center with pay-per-use pricing", description: "Amazon Connect is AWS's cloud contact center service with true pay-per-use pricing — no upfront costs or long-term commitments. It includes AI features via Amazon Lex (chatbots), Contact Lens (analytics), and machine learning-based forecasting. Built on the same technology that powers Amazon's own customer service.", category: "cloud-contact-center", tags: ["amazon connect", "aws", "pay per use", "ai", "amazon lex", "scalable"], url: "https://aws.amazon.com/connect/", pricing: "freemium", featured: false, logo: "🔸", domain: "aws.amazon.com" },
  { slug: "playvox", name: "Playvox", tagline: "Workforce engagement and quality management for digital-first support", description: "Playvox provides workforce management, quality assurance, coaching, and performance management specifically for digital-first contact centers. It integrates with Zendesk, Salesforce, and other CX platforms to optimize agent scheduling and quality across chat, email, and social channels.", category: "workforce-management", tags: ["playvox", "workforce management", "quality assurance", "coaching", "digital support", "scheduling"], url: "https://www.playvox.com", pricing: "paid", featured: false, logo: "🎮", domain: "playvox.com" },
  { slug: "calabrio", name: "Calabrio", tagline: "Workforce optimization suite with analytics, scheduling, and quality management", description: "Calabrio ONE is a workforce optimization suite that combines workforce management, quality management, analytics, and recording. It helps contact centers optimize agent schedules, monitor quality, and gain insights from customer interactions. Integrates with major contact center platforms.", category: "workforce-management", tags: ["calabrio", "workforce optimization", "quality management", "scheduling", "analytics", "recording"], url: "https://www.calabrio.com", pricing: "paid", featured: false, logo: "📈", domain: "calabrio.com" },
  { slug: "8x8-contact-center", name: "8x8 Contact Center", tagline: "Integrated UCaaS and contact center platform for mid-market businesses", description: "8x8 provides a combined UCaaS and contact center platform, meaning voice, video, chat, and contact center all run on one platform. This integration eliminates the gap between internal communications and customer interactions. Strong international presence with local numbers in 100+ countries.", category: "cloud-contact-center", tags: ["8x8", "ucaas", "contact center", "integrated", "international", "mid-market"], url: "https://www.8x8.com/contact-center", pricing: "paid", featured: false, logo: "8️⃣", domain: "8x8.com" },
];
