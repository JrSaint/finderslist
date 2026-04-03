export type VideoConferencingCategory =
  | "all-purpose"
  | "webinar"
  | "team-meetings"
  | "healthcare"
  | "virtual-events";

export interface VideoConferencingTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: VideoConferencingCategory;
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

export const VIDEO_CONFERENCING_CATEGORIES: Record<VideoConferencingCategory, { label: string; emoji: string; description: string; gradient: string; guide?: string }> = {
  "all-purpose": { label: "All-Purpose", emoji: "🎥", description: "Versatile video conferencing platforms suitable for any meeting type, from one-on-ones to large company all-hands.", gradient: "from-blue-600/30 to-indigo-800/40", guide: "All-purpose video conferencing platforms handle everything from quick one-on-one calls to company-wide all-hands meetings with hundreds of participants. They are the best starting point for most organizations that need a single reliable platform for all meeting types. Evaluate platforms based on audio and video quality under varying network conditions, participant capacity limits, and the quality of AI features like transcription and meeting summaries." },
  "webinar": { label: "Webinar", emoji: "📡", description: "Purpose-built platforms for hosting webinars, product demos, and large-audience presentations with engagement tools.", gradient: "from-purple-600/30 to-violet-800/40", guide: "Webinar platforms are purpose-built for one-to-many presentations with features like attendee registration, Q&A moderation, polls, and post-event analytics. They are ideal for marketing teams, educators, and thought leaders who host regular online presentations or product demos. Look for platforms with high attendee capacity, automated email reminder sequences, CRM integration for lead capture, and on-demand replay capabilities." },
  "team-meetings": { label: "Team Meetings", emoji: "👥", description: "Lightweight tools designed for quick daily standups, team check-ins, and collaborative working sessions.", gradient: "from-green-600/30 to-emerald-800/40", guide: "Team meeting tools are lightweight, low-friction platforms designed for daily standups, quick check-ins, and collaborative working sessions rather than formal presentations. They are best for agile teams and remote-first organizations that value speed and simplicity over feature depth. Prioritize tools with instant join capabilities, persistent meeting rooms, screen sharing, and integration with your team's messaging and project management platforms." },
  "healthcare": { label: "Healthcare", emoji: "🏥", description: "HIPAA-compliant telehealth video platforms built for virtual patient consultations and medical appointments.", gradient: "from-red-600/30 to-rose-800/40", guide: "Healthcare video conferencing platforms are HIPAA-compliant solutions built specifically for virtual patient consultations, medical team collaboration, and clinical workflows. They are essential for healthcare organizations that must protect patient health information during video encounters. Verify that the platform provides a signed Business Associate Agreement, end-to-end encryption, waiting room functionality, and integration with your electronic health record system." },
  "virtual-events": { label: "Virtual Events", emoji: "🎪", description: "Full-featured event platforms for conferences, expos, and networking experiences with stages, booths, and breakout rooms.", gradient: "from-orange-600/30 to-amber-800/40", guide: "Virtual event platforms provide full conference experiences online with multiple stages, sponsor booths, networking lounges, breakout sessions, and expo hall functionality. They are best for organizations hosting large-scale conferences, trade shows, or multi-day events that need to replicate the in-person event experience digitally. Evaluate platforms based on maximum concurrent attendee capacity, networking matchmaking features, sponsor ROI tools, and post-event analytics and content repurposing options." },
};

export const VIDEO_CONFERENCING_EDITORIAL = {
  title: "How to Choose the Right Video Conferencing Software in 2026",
  intro: `Video conferencing software enables face-to-face communication between remote participants for team meetings, client calls, webinars, virtual events, and telehealth appointments. What was once a backup for in-person meetings has become the default for most professional interactions, with hybrid and remote work models making reliable video conferencing essential infrastructure for every organization.\n\nThe market includes general-purpose platforms like Zoom, Microsoft Teams, and Google Meet that handle everyday meetings; webinar platforms like Livestorm and Demio designed for large-audience presentations; and specialized solutions for healthcare (Doxy.me), education (BigBlueButton), and virtual events (Hopin). Most organizations standardize on one primary platform but may use specialized tools for specific use cases like webinars or customer-facing demos.\n\nIn 2026, AI has become the key differentiator between platforms. Automatic meeting transcription, real-time translation, AI-generated meeting summaries, action item extraction, and noise cancellation are rapidly becoming table stakes. The platforms investing most aggressively in AI features -- Zoom with AI Companion, Microsoft with Copilot, and Google with Gemini integration -- are pulling ahead in productivity features while maintaining the reliable audio and video quality that remains the foundation of any good video conferencing experience.`,
  buyerGuide: [
    "Audio and video reliability -- The most important feature is consistent, high-quality audio and video across different network conditions. Test platforms on your typical network setup and check how gracefully they handle bandwidth constraints without dropping calls or degrading quality.",
    "Meeting capacity and scalability -- Standard plans typically support 100 to 300 participants. If you host large all-hands meetings, webinars, or virtual events, verify the maximum capacity and whether large meetings require a higher-tier plan or separate product.",
    "AI and productivity features -- Evaluate AI meeting transcription accuracy, summary quality, action item detection, and real-time translation capabilities. These features save significant post-meeting time and ensure nothing falls through the cracks.",
    "Ecosystem integration -- Video conferencing should integrate with your calendar (Google Calendar, Outlook), messaging (Slack, Teams), project management (Asana, Jira), and CRM (Salesforce, HubSpot). One-click meeting joins from calendar events and automatic recording storage are basic expectations.",
    "Security and compliance -- For organizations handling sensitive information, verify end-to-end encryption availability, waiting room controls, meeting password enforcement, and compliance certifications (HIPAA for healthcare, FedRAMP for government). Host controls for muting, removing, and managing participants are essential.",
  ],
  faq: [
    {
      question: "Is Zoom still the best video conferencing platform?",
      answer: "Zoom remains the most feature-rich standalone video conferencing platform with excellent reliability and the broadest third-party integration ecosystem. However, Microsoft Teams is the better choice for organizations deeply invested in Microsoft 365, and Google Meet works seamlessly for Google Workspace users. The best platform depends on your existing ecosystem.",
    },
    {
      question: "Do I need a separate webinar platform?",
      answer: "If you host webinars occasionally with under 500 attendees, the webinar features built into Zoom or Microsoft Teams are usually sufficient. Dedicated webinar platforms like Livestorm, Demio, or ON24 become worthwhile when you run frequent webinars requiring advanced features like registration management, engagement analytics, automated follow-ups, and on-demand replay hosting.",
    },
    {
      question: "How much bandwidth does video conferencing require?",
      answer: "For reliable HD video calls, plan for at least 3 to 5 Mbps upload and download per participant. Group calls with gallery view need more bandwidth. Most modern platforms adapt to available bandwidth, but audio quality degrades below 1 Mbps. Wired ethernet connections are more reliable than WiFi for important meetings.",
    },
  ],
};

export const VIDEO_CONFERENCING_TOOLS: VideoConferencingTool[] = [
  // ── ALL-PURPOSE ───────────────────────────────────────────────────────
  {
    slug: "zoom",
    name: "Zoom",
    tagline: "The video conferencing platform that became synonymous with virtual meetings",
    description: "Zoom is the most widely adopted video conferencing platform in the world, offering reliable HD video and audio for meetings of all sizes. Its intuitive interface, breakout rooms, virtual backgrounds, and robust recording features make it a go-to for businesses, educators, and individuals alike. Zoom also provides a marketplace of integrations that extend its functionality into scheduling, transcription, and project management workflows.",
    category: "all-purpose",
    tags: ["video meetings", "screen sharing", "breakout rooms", "recording", "webinars", "virtual backgrounds"],
    url: "https://zoom.us",
    pricing: "freemium",
    featured: true,
    logo: "📹",
    domain: "zoom.us",
    pros: [
      "Industry-leading reliability with consistently high video and audio quality",
      "Generous free tier allows 40-minute meetings with up to 100 participants",
      "Breakout rooms and polling make workshops and training sessions interactive",
      "Massive ecosystem of third-party integrations and apps",
      "Cross-platform support including desktop, mobile, and browser clients",
    ],
    cons: [
      "Free plan limits group meetings to 40 minutes, pushing users toward paid tiers",
      "History of security and privacy concerns has required ongoing patches",
      "Meeting fatigue is a real issue given how ubiquitous the platform has become",
      "Advanced features like cloud recording and analytics require Business plan or higher",
    ],
    useCases: [
      "Host a company all-hands meeting with 500 employees using webinar mode and live Q&A",
      "Run a virtual classroom with breakout rooms for small-group exercises and whiteboard collaboration",
      "Record client discovery calls with automatic cloud transcription for team review",
    ],
  },
  {
    slug: "microsoft-teams",
    name: "Microsoft Teams",
    tagline: "Unified communication hub deeply integrated with the Microsoft 365 ecosystem",
    description: "Microsoft Teams combines video conferencing, persistent chat, file sharing, and app integrations into a single workspace that lives inside the Microsoft 365 suite. Teams excels for organizations already using Outlook, SharePoint, and OneDrive, providing seamless document collaboration during and between meetings. With Together Mode, live captions, and AI-powered Copilot features, Teams continues to evolve beyond basic video calls.",
    category: "team-meetings",
    tags: ["Microsoft 365", "team collaboration", "chat", "file sharing", "channels", "enterprise"],
    url: "https://www.microsoft.com/en-us/microsoft-teams/group-chat-software",
    pricing: "freemium",
    featured: true,
    logo: "🟦",
    domain: "microsoft.com",
    pros: [
      "Deep integration with Microsoft 365 apps eliminates context switching for Office users",
      "Persistent chat channels keep conversations organized by project or team",
      "Together Mode and custom backgrounds reduce virtual meeting fatigue",
      "Enterprise-grade security, compliance, and admin controls out of the box",
      "Free tier includes unlimited chat, 60-minute group meetings, and 5 GB storage",
    ],
    cons: [
      "Interface can feel heavy and overwhelming for users outside the Microsoft ecosystem",
      "Notification management across channels and chats requires careful tuning",
      "Performance on lower-end hardware can be sluggish compared to lighter alternatives",
      "Guest access and cross-organization collaboration setup can be confusing",
    ],
    useCases: [
      "Collaborate on a Word document in real time during a Teams meeting without leaving the app",
      "Set up project channels with tabs for Planner boards, shared files, and pinned meeting notes",
      "Use Copilot to generate meeting summaries and action items automatically after each standup",
    ],
  },
  {
    slug: "google-meet",
    name: "Google Meet",
    tagline: "Simple, reliable video meetings built into Google Workspace",
    description: "Google Meet provides a streamlined video conferencing experience that works directly from the browser with no downloads required. Tightly integrated with Google Calendar, Gmail, and Google Docs, it makes scheduling and joining meetings frictionless for Workspace users. Meet offers real-time captions, noise cancellation, and adaptive layouts that adjust to the number of participants automatically.",
    category: "all-purpose",
    tags: ["Google Workspace", "browser-based", "live captions", "noise cancellation", "calendar integration", "screen sharing"],
    url: "https://meet.google.com",
    pricing: "freemium",
    featured: true,
    logo: "🟢",
    domain: "meet.google.com",
    pros: [
      "No downloads needed — runs entirely in the browser for instant access",
      "Seamless integration with Google Calendar for one-click meeting joins",
      "AI-powered noise cancellation works remarkably well in noisy environments",
      "Live captions with automatic translation support over 60 languages",
      "Free tier allows 60-minute meetings with up to 100 participants",
    ],
    cons: [
      "Breakout rooms and advanced features are limited to paid Workspace plans",
      "Recording is only available on Business Standard tier and above",
      "Fewer third-party integrations compared to Zoom or Teams",
      "Virtual background options are more limited than competing platforms",
    ],
    useCases: [
      "Schedule a recurring team standup directly from Google Calendar with auto-generated Meet links",
      "Use live translated captions to hold multilingual client meetings without a human interpreter",
      "Share a Google Slides presentation with real-time co-editing during a brainstorming session",
    ],
  },
  {
    slug: "cisco-webex",
    name: "Cisco Webex",
    tagline: "Enterprise-grade video conferencing with AI-powered meeting intelligence",
    description: "Cisco Webex is a veteran video conferencing platform trusted by large enterprises and government agencies for its security, reliability, and advanced meeting features. Webex offers end-to-end encryption, real-time translation in over 100 languages, and AI-driven noise removal that adapts to your environment. Its tight integration with Cisco networking hardware makes it a natural fit for organizations already invested in the Cisco ecosystem.",
    category: "all-purpose",
    tags: ["enterprise", "end-to-end encryption", "AI translation", "hardware integration", "compliance", "noise removal"],
    url: "https://www.webex.com",
    pricing: "freemium",
    featured: true,
    logo: "🔵",
    domain: "webex.com",
    pros: [
      "Enterprise-grade end-to-end encryption meets the strictest compliance requirements",
      "AI-powered real-time translation supports over 100 languages natively",
      "Webex Devices ecosystem provides premium hardware for conference rooms",
      "Noise removal and speech enhancement are among the best in the industry",
      "FedRAMP authorized for government and public sector use",
    ],
    cons: [
      "Interface feels dated and less intuitive compared to Zoom or Google Meet",
      "Pricing structure is complex and can be expensive for smaller teams",
      "Free plan is more limited than competitors with only 40-minute meetings",
      "Mobile app experience lags behind the desktop client in features",
    ],
    useCases: [
      "Host a secure board meeting with end-to-end encryption and compliance-grade recording",
      "Enable real-time translation for a multinational town hall with employees across 15 countries",
      "Equip conference rooms with Webex Board devices for seamless hybrid meeting experiences",
    ],
  },
  {
    slug: "goto-meeting",
    name: "GoTo Meeting",
    tagline: "Dependable video conferencing built for professional business meetings",
    description: "GoTo Meeting is a long-standing video conferencing solution focused on delivering reliable, no-fuss meetings for business professionals. Part of the broader GoTo suite that includes webinar and contact center products, it offers one-click joining, drawing tools for screen sharing, and commuter mode for audio-only mobile participation. GoTo Meeting prioritizes stability and simplicity over feature bloat.",
    category: "all-purpose",
    tags: ["business meetings", "screen sharing", "drawing tools", "commuter mode", "reliable", "professional"],
    url: "https://www.goto.com/meeting",
    pricing: "paid",
    featured: true,
    logo: "🟠",
    domain: "goto.com",
    pros: [
      "Rock-solid reliability with consistently clear audio even on poor connections",
      "Drawing tools on shared screens make collaborative review sessions productive",
      "Commuter mode optimizes the experience for mobile audio-only participants",
      "Personal meeting rooms with static URLs simplify recurring meeting access",
      "Smart assistant generates meeting notes and action items automatically",
    ],
    cons: [
      "No free tier — all plans require a paid subscription starting at $14/month",
      "Interface feels less modern than Zoom or Google Meet",
      "Maximum participant count of 250 is lower than many competitors",
      "Fewer integrations and marketplace options compared to larger platforms",
    ],
    useCases: [
      "Run weekly client status meetings with drawing tools to annotate shared project timelines",
      "Use commuter mode to join the morning standup hands-free while driving to the office",
      "Set up a personal meeting room with a permanent link for ad-hoc vendor check-ins",
    ],
  },

  // ── TEAM MEETINGS ─────────────────────────────────────────────────────
  {
    slug: "whereby",
    name: "Whereby",
    tagline: "Browser-based video meetings with no downloads or logins required",
    description: "Whereby offers frictionless video meetings that work entirely in the browser, making it ideal for freelancers, consultants, and small teams who value simplicity. Guests join via a permanent room link with zero downloads, and embedded meeting rooms can be added directly into your own product or website.",
    category: "team-meetings",
    tags: ["browser-based", "no downloads", "embedded meetings", "simple", "API", "small teams"],
    url: "https://whereby.com",
    pricing: "freemium",
    featured: false,
    logo: "🪟",
    domain: "whereby.com",
    pros: [
      "Zero downloads required — guests join via permanent room link in any browser",
      "Embedded meeting rooms can be added directly into your own product or website",
      "Permanent room URLs simplify recurring meetings with no new links needed",
      "Clean, minimal interface reduces friction for non-technical participants",
    ],
    cons: [
      "Free plan limited to small group sizes",
      "Fewer advanced features like breakout rooms and recording compared to Zoom",
      "Not suitable for large meetings or webinars",
    ],
    useCases: [
      "Freelancer or consultant meeting clients who do not want to download software",
      "SaaS product embedding video meetings directly into their web application",
      "Small team wanting a permanent meeting room link for daily standups",
    ],
  },
  {
    slug: "around",
    name: "Around",
    tagline: "Lightweight floating video calls designed to reduce meeting fatigue",
    description: "Around is a minimalist video conferencing tool that uses small floating video bubbles instead of full-screen grids, allowing participants to keep working while staying visually connected. Its AI-powered audio features eliminate echo and background noise, making it ideal for teams that prefer camera-on culture without the heaviness of traditional video calls.",
    category: "team-meetings",
    tags: ["floating video", "lightweight", "noise cancellation", "always-on", "minimal UI", "remote teams"],
    url: "https://www.around.co",
    pricing: "freemium",
    featured: false,
    logo: "⭕",
    domain: "around.co",
    pros: [
      "Floating video bubbles allow participants to work while staying visually connected",
      "AI noise cancellation and echo elimination create crystal-clear audio",
      "Minimal UI reduces meeting fatigue compared to full-screen video grids",
      "Camera-on culture feels natural without being intrusive",
    ],
    cons: [
      "Not suitable for formal client presentations or large meetings",
      "Limited feature set compared to full-featured platforms like Zoom",
      "Smaller user base means fewer integrations and community resources",
    ],
    useCases: [
      "Remote team wanting always-on visual connection without full-screen video fatigue",
      "Engineering team running lightweight standups while continuing to code",
      "Camera-on culture team seeking a less formal alternative to traditional video calls",
    ],
  },

  // ── WEBINAR ───────────────────────────────────────────────────────────
  {
    slug: "livestorm",
    name: "Livestorm",
    tagline: "Browser-based webinar and video engagement platform for marketing teams",
    description: "Livestorm is a browser-based webinar platform built for marketing and sales teams to host product demos, onboarding sessions, and lead-generation webinars. It features automated email sequences, registration pages, engagement analytics, and CRM integrations that turn webinars into a scalable acquisition channel.",
    category: "webinar",
    tags: ["webinars", "lead generation", "marketing automation", "analytics", "browser-based", "engagement"],
    url: "https://livestorm.co",
    pricing: "freemium",
    featured: false,
    logo: "⚡",
    domain: "livestorm.co",
    pros: [
      "Browser-based — no downloads for hosts or attendees",
      "Automated email sequences turn webinars into lead-generation campaigns",
      "Engagement analytics measure attendee participation and conversion",
      "CRM integrations push webinar leads directly into sales pipelines",
    ],
    cons: [
      "Pricing scales with number of active contacts and attendees",
      "Less suitable for casual internal team meetings",
      "Free plan is limited to 30 attendees and 20-minute sessions",
    ],
    useCases: [
      "Marketing team running weekly product demo webinars to generate leads",
      "Customer success team hosting onboarding webinars for new customers",
      "SaaS company using webinar engagement data to qualify and route leads to sales",
    ],
  },
  {
    slug: "demio",
    name: "Demio",
    tagline: "No-download webinar platform focused on attendee engagement and conversions",
    description: "Demio is a webinar platform purpose-built for marketers who want high attendance rates and real-time engagement. With no downloads required, branded registration pages, and built-in calls to action, Demio turns webinars into conversion machines. Automated and on-demand webinar options let teams scale without going live every time.",
    category: "webinar",
    tags: ["webinars", "no downloads", "marketing", "automated webinars", "CTAs", "conversions"],
    url: "https://demio.com",
    pricing: "paid",
    featured: false,
    logo: "🎯",
    domain: "demio.com",
    pros: [
      "No-download experience maximizes attendee show-up rates",
      "Built-in calls to action and handouts optimize conversion during webinars",
      "Automated and on-demand webinar options enable scaling without going live",
      "Branded registration pages create professional first impressions",
    ],
    cons: [
      "Focused exclusively on webinars — not suitable for team meetings",
      "Attendee limits on lower-tier plans can be restrictive",
      "No free plan available — all tiers require paid subscription",
    ],
    useCases: [
      "Marketing team running automated webinars that play on a schedule without a live host",
      "SaaS company using in-webinar CTAs to drive trial signups during product demos",
      "Educator creating on-demand webinar content that attendees can watch anytime",
    ],
  },
  {
    slug: "loom",
    name: "Loom",
    tagline: "Async video messaging that replaces meetings with quick screen recordings",
    description: "Loom lets you record your screen, camera, or both and instantly share an async video message with a link. Instead of scheduling a meeting, teams use Loom to give feedback, walk through code, explain decisions, and onboard new hires on their own time. AI-powered summaries and chapters make longer recordings easy to skim.",
    category: "team-meetings",
    tags: ["async video", "screen recording", "video messaging", "AI summaries", "remote work", "onboarding"],
    url: "https://www.loom.com",
    pricing: "freemium",
    featured: false,
    logo: "🔴",
    domain: "loom.com",
    pros: [
      "Record screen and camera instantly and share with a link — no scheduling needed",
      "AI-powered summaries and chapters make longer recordings easy to skim",
      "Replaces many meetings with async video that recipients watch on their own time",
      "Generous free plan with up to 25 videos and 5 minutes each",
    ],
    cons: [
      "Not a real-time video conferencing tool — purely asynchronous",
      "Free plan limits video length and total storage",
      "Some teams resist adopting async video over traditional meetings",
    ],
    useCases: [
      "Engineering lead recording a code walkthrough for teammates to review asynchronously",
      "Manager giving feedback on a design mockup without scheduling a meeting",
      "Team lead creating onboarding videos that new hires can watch at their own pace",
    ],
  },

  // ── HEALTHCARE ────────────────────────────────────────────────────────
  {
    slug: "doxy-me",
    name: "Doxy.me",
    tagline: "Free HIPAA-compliant telemedicine platform for healthcare providers",
    description: "Doxy.me is a simple, browser-based telehealth platform designed specifically for healthcare providers who need HIPAA-compliant video visits. Patients join via a personalized waiting room link with no downloads or accounts required, making virtual care accessible for all demographics including elderly and less tech-savvy patients.",
    category: "healthcare",
    tags: ["telehealth", "HIPAA-compliant", "telemedicine", "patient portal", "no downloads", "healthcare"],
    url: "https://doxy.me",
    pricing: "freemium",
    featured: false,
    logo: "🩺",
    domain: "doxy.me",
    pros: [
      "Free HIPAA-compliant tier makes telehealth accessible to any practice size",
      "Zero downloads or accounts needed for patients — join via a waiting room link",
      "Simple, clinical design focused on healthcare workflows",
      "Accessible to elderly and less tech-savvy patients",
    ],
    cons: [
      "Video quality on the free tier can be lower than paid alternatives",
      "Features are intentionally basic — no breakout rooms or recording on free plan",
      "Designed exclusively for healthcare — not suitable for general business use",
    ],
    useCases: [
      "Solo practitioner or small clinic needing free HIPAA-compliant video visits",
      "Therapist conducting virtual sessions with patients who struggle with technology",
      "Healthcare provider wanting the simplest possible telehealth setup for patients",
    ],
  },

  // ── VIRTUAL EVENTS ────────────────────────────────────────────────────
  {
    slug: "hopin",
    name: "Hopin",
    tagline: "All-in-one virtual events platform for conferences, expos, and networking",
    description: "Hopin provides a complete virtual events platform with multiple stages, expo booths, networking areas, and breakout sessions that replicate the in-person event experience online. Organizers can host hybrid events with both virtual and physical attendees, making it a popular choice for large-scale conferences and trade shows.",
    category: "virtual-events",
    tags: ["virtual events", "conferences", "expo booths", "networking", "hybrid events", "multi-stage"],
    url: "https://hopin.com",
    pricing: "paid",
    featured: false,
    logo: "🎪",
    domain: "hopin.com",
    pros: [
      "Multiple stages, expo booths, and networking areas replicate in-person event experiences",
      "Supports hybrid events with both virtual and physical attendees",
      "Built-in networking feature connects attendees through random 1-on-1 video chats",
      "Comprehensive event analytics measure engagement and attendance across sessions",
    ],
    cons: [
      "Pricing is event-based and can be expensive for large conferences",
      "Platform complexity requires significant setup time for organizers",
      "Attendee experience can vary based on internet quality and device capabilities",
    ],
    useCases: [
      "Conference organizer hosting a multi-day virtual event with multiple stages and breakouts",
      "Company running a hybrid trade show with virtual expo booths alongside physical ones",
      "Event planner using built-in networking to facilitate attendee connections at scale",
    ],
  },

  // ── ALL-PURPOSE (continued) ───────────────────────────────────────────
  {
    slug: "zoho-meeting",
    name: "Zoho Meeting",
    tagline: "Affordable video conferencing tightly integrated with the Zoho suite",
    description: "Zoho Meeting is a budget-friendly video conferencing tool that shines for businesses already using Zoho CRM, Projects, or other Zoho apps. It offers screen sharing, recording, virtual backgrounds, and webinar capabilities at a fraction of the cost of larger platforms.",
    category: "all-purpose",
    tags: ["Zoho suite", "affordable", "screen sharing", "recording", "webinars", "small business"],
    url: "https://www.zoho.com/meeting/",
    pricing: "freemium",
    featured: false,
    logo: "🟡",
    domain: "zoho.com",
    pros: [
      "Very affordable pricing compared to Zoom, Teams, and Webex",
      "Tight integration with Zoho CRM, Projects, and other Zoho apps",
      "Webinar capabilities included without a separate product",
      "Free plan available with basic meeting features",
    ],
    cons: [
      "Video and audio quality can lag behind premium competitors",
      "Fewer third-party integrations outside the Zoho ecosystem",
      "Limited brand recognition means some external participants may hesitate",
    ],
    useCases: [
      "Zoho CRM user wanting video meetings integrated with their sales workflow",
      "Small business seeking the most affordable video conferencing with webinar features",
      "Team already using Zoho suite wanting to consolidate communication into one ecosystem",
    ],
  },
  {
    slug: "bluejeans",
    name: "BlueJeans",
    tagline: "Verizon-backed video meetings with Dolby Voice audio clarity",
    description: "BlueJeans by Verizon delivers premium video meetings with Dolby Voice spatial audio that makes conversations feel natural and immersive. Smart Meeting features provide AI-generated highlights, action items, and chaptered recordings that help teams stay aligned after every call.",
    category: "all-purpose",
    tags: ["Dolby Voice", "smart meetings", "AI highlights", "spatial audio", "enterprise", "Verizon"],
    url: "https://www.bluejeans.com",
    pricing: "paid",
    featured: false,
    logo: "👖",
    domain: "bluejeans.com",
    pros: [
      "Dolby Voice spatial audio creates natural, immersive conversation quality",
      "Smart Meeting features auto-generate highlights, action items, and chapters",
      "Backed by Verizon's enterprise-grade network infrastructure",
      "AI-generated chaptered recordings make post-meeting review efficient",
    ],
    cons: [
      "No free tier — all plans require paid subscription",
      "Smaller market share means fewer third-party integrations",
      "Verizon ownership has led to uncertainty about long-term product direction",
    ],
    useCases: [
      "Team prioritizing audio quality for important client or board calls",
      "Manager wanting AI-generated meeting highlights and action items automatically",
      "Enterprise equipping conference rooms with premium Dolby Voice audio",
    ],
  },
  {
    slug: "ringcentral-video",
    name: "RingCentral Video",
    tagline: "Unified communications platform combining video, phone, and messaging",
    description: "RingCentral Video is part of the RingCentral MVP platform, offering video meetings alongside cloud phone and team messaging in a single subscription. Its AI-powered meeting insights, live transcription, and whiteboarding make it a strong choice for businesses that want to consolidate their communication stack.",
    category: "all-purpose",
    tags: ["unified communications", "cloud phone", "team messaging", "AI insights", "whiteboarding", "UCaaS"],
    url: "https://www.ringcentral.com/video.html",
    pricing: "freemium",
    featured: false,
    logo: "💍",
    domain: "ringcentral.com",
    pros: [
      "Unified platform combines video meetings, cloud phone, and team messaging",
      "AI-powered meeting insights and live transcription built in",
      "Whiteboarding features support visual collaboration during meetings",
      "Single subscription replaces separate video, phone, and messaging tools",
    ],
    cons: [
      "Full platform can feel complex for teams only needing video conferencing",
      "Pricing reflects the unified platform — more expensive than video-only tools",
      "Mobile app can feel heavy with all communication features bundled together",
    ],
    useCases: [
      "Business wanting to consolidate video, phone, and messaging into one platform",
      "Sales team using RingCentral phone and wanting integrated video for client meetings",
      "Company replacing multiple communication tools with a single unified subscription",
    ],
  },
];
