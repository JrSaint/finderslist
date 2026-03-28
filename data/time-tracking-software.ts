export type TimeTrackingCategory = "freelancer" | "team-management" | "project-billing" | "employee-monitoring" | "enterprise";

export interface TimeTrackingTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: TimeTrackingCategory;
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

export const TIME_TRACKING_CATEGORIES: Record<TimeTrackingCategory, { label: string; emoji: string; description: string; gradient: string }> = {
  "freelancer": { label: "Freelancer & Solo", emoji: "🧑‍💻", description: "Simple time trackers for freelancers, consultants, and independent professionals.", gradient: "from-amber-600/30 to-yellow-800/40" },
  "team-management": { label: "Team Time Tracking", emoji: "👥", description: "Time tracking tools for teams with reporting, approvals, and timesheets.", gradient: "from-blue-600/30 to-indigo-800/40" },
  "project-billing": { label: "Project & Billing", emoji: "💰", description: "Time tracking integrated with project management, invoicing, and client billing.", gradient: "from-green-600/30 to-emerald-800/40" },
  "employee-monitoring": { label: "Employee Monitoring", emoji: "📊", description: "Time tracking with productivity monitoring, screenshots, and activity levels.", gradient: "from-red-600/30 to-rose-800/40" },
  "enterprise": { label: "Enterprise Timekeeping", emoji: "🏢", description: "Enterprise-grade time and attendance for large organizations and compliance.", gradient: "from-purple-600/30 to-violet-800/40" },
};

export const TIME_TRACKING_TOOLS: TimeTrackingTool[] = [
  {
    slug: "toggl-track",
    name: "Toggl Track",
    tagline: "The simplest and most popular time tracker for teams and freelancers",
    description: "Toggl Track is the most widely used time tracking tool, loved for its simplicity and beautiful design. Starting a timer takes one click — no complex setup or training. It works across web, desktop, mobile, and 100+ integrations. The reporting is powerful despite the simple interface: detailed breakdowns by project, client, tag, and team member. Toggl Track's freemium model includes unlimited tracking for up to 5 users. It's the go-to recommendation for anyone getting started with time tracking.",
    category: "freelancer",
    tags: ["toggl", "time tracking", "simple", "reports", "integrations", "freelancer"],
    url: "https://toggl.com/track/",
    affiliateUrl: "https://toggl.com/track/",
    pricing: "freemium",
    featured: true,
    logo: "⏱️",
    domain: "toggl.com",
    pros: ["Incredibly simple — one-click timer with zero learning curve", "Beautiful, intuitive interface across all platforms", "Free plan includes unlimited tracking for up to 5 users", "100+ integrations with project management and productivity tools", "Powerful reporting with filters by project, client, and team member"],
    cons: ["No built-in invoicing — requires integration with billing tools", "Employee monitoring features are minimal (by design)", "Advanced features like time estimates require paid plan", "No GPS or location tracking for field teams"],
    useCases: ["Freelancers tracking billable hours across multiple clients", "Small teams wanting simple time tracking with team reporting", "Agencies needing project-level time data for profitability analysis"],
  },
  {
    slug: "harvest",
    name: "Harvest",
    tagline: "Time tracking and invoicing for teams that bill clients by the hour",
    description: "Harvest combines time tracking with invoicing and expense tracking — making it ideal for agencies, consultants, and professional services firms. Track time, then convert it directly into invoices with one click. Harvest's budget tracking warns you when projects approach their hour limits, and capacity reports show who's overworked or underutilized. It integrates with QuickBooks, Xero, Stripe, and PayPal for seamless billing workflows. Harvest has been around since 2006 — it's mature, stable, and battle-tested.",
    category: "project-billing",
    tags: ["harvest", "time tracking", "invoicing", "expense tracking", "budgets", "agencies"],
    url: "https://www.getharvest.com",
    affiliateUrl: "https://www.getharvest.com",
    pricing: "freemium",
    featured: true,
    logo: "🌾",
    domain: "getharvest.com",
    pros: ["One-click time-to-invoice conversion saves hours on billing", "Budget tracking alerts when projects approach hour limits", "Capacity reports show team utilization and availability", "Integrates with QuickBooks, Xero, Stripe for complete billing workflow", "Mature and stable — 17+ years of continuous development"],
    cons: ["Interface design hasn't evolved much — can feel dated", "Reporting is good but not as visual as Toggl Track", "No employee monitoring or screenshot features", "Free plan limited to 1 user and 2 projects"],
    useCases: ["Agencies billing clients by the hour with direct time-to-invoice flow", "Professional services firms tracking project budgets and team capacity", "Consultants needing integrated time tracking and invoicing"],
  },
  {
    slug: "clockify",
    name: "Clockify",
    tagline: "100% free time tracker for teams of any size — unlimited users",
    description: "Clockify stands out by offering free time tracking for unlimited users with no restrictions on projects or tracking — making it the most generous free tier in the category. It includes timesheets, calendar view, kiosk mode (for on-site clocking), and detailed reporting. Paid plans add time-off tracking, invoicing, expenses, scheduling, and admin features. For teams that need basic time tracking without any budget, Clockify is unbeatable.",
    category: "team-management",
    tags: ["clockify", "free time tracking", "unlimited users", "timesheets", "kiosk", "team tracking"],
    url: "https://clockify.me",
    pricing: "freemium",
    featured: true,
    logo: "🕐",
    domain: "clockify.me",
    pros: ["Free for unlimited users — no restrictions on tracking or projects", "Timesheets, kiosk mode, and calendar view included free", "Works across web, desktop, mobile, and browser extensions", "Paid plans are very affordable ($3.99-$11.99/user/mo)", "Detailed reporting with export to PDF, CSV, and Excel"],
    cons: ["Free plan lacks time-off tracking, invoicing, and scheduling", "Interface is functional but not as polished as Toggl Track", "Integrations are more limited than Toggl or Harvest", "Advanced reporting requires paid plans"],
    useCases: ["Large teams needing free time tracking for all members", "Nonprofits and startups with zero budget for time tracking tools", "Organizations wanting basic timesheets with kiosk-style clocking"],
  },
  {
    slug: "time-doctor",
    name: "Time Doctor",
    tagline: "Time tracking with productivity monitoring for remote and distributed teams",
    description: "Time Doctor combines time tracking with employee productivity monitoring. It captures screenshots, tracks application and website usage, measures activity levels (keyboard/mouse), and provides distraction alerts. Managers get detailed reports on how time is spent, making it popular with remote-first companies wanting accountability without micromanagement. Used by companies like Ericsson, Verizon, and Re/Max. The tool is controversial — some see it as essential for remote team management, others view it as surveillance.",
    category: "employee-monitoring",
    tags: ["time doctor", "employee monitoring", "screenshots", "productivity tracking", "remote teams", "activity levels"],
    url: "https://www.timedoctor.com",
    affiliateUrl: "https://www.timedoctor.com",
    pricing: "paid",
    featured: true,
    logo: "👨‍⚕️",
    domain: "timedoctor.com",
    pros: ["Detailed productivity insights: app usage, web browsing, activity levels", "Configurable screenshot frequency (or disable entirely)", "Distraction alerts help employees stay focused in real time", "Payroll integration for automated payment based on tracked hours", "Strong API and integrations with project management tools"],
    cons: ["Can feel invasive — employee trust and morale considerations", "Screenshot feature raises privacy concerns in some jurisdictions", "Setup and onboarding require clear communication with team", "Pricing at $7-20/user/mo can be significant for large teams"],
    useCases: ["Remote companies needing visibility into distributed team productivity", "Outsourcing firms tracking contractor hours and deliverables", "Managers wanting to identify workflow bottlenecks and time waste"],
  },
  {
    slug: "hubstaff",
    name: "Hubstaff",
    tagline: "Time tracking with GPS, activity monitoring, and workforce management",
    description: "Hubstaff provides time tracking with GPS location tracking, activity monitoring, automated payroll, and workforce management. It's designed for both desk workers and field teams — GPS tracking and geofencing are standout features for construction, cleaning, and delivery businesses. The platform includes project budgets, client invoicing, and detailed productivity reports. Hubstaff has grown into a workforce management suite beyond just time tracking.",
    category: "employee-monitoring",
    tags: ["hubstaff", "gps tracking", "workforce management", "geofencing", "payroll", "field teams"],
    url: "https://hubstaff.com",
    affiliateUrl: "https://hubstaff.com",
    pricing: "freemium",
    featured: true,
    logo: "📍",
    domain: "hubstaff.com",
    pros: ["GPS tracking and geofencing ideal for field and mobile teams", "Automated payroll based on tracked hours", "Activity monitoring with configurable intensity", "Project budgets and client invoicing built in", "Workforce scheduling and shift management"],
    cons: ["Full feature set can feel overwhelming to set up", "GPS tracking raises privacy concerns with some employees", "Interface is feature-dense but not the most intuitive", "Battery drain from GPS tracking on mobile devices"],
    useCases: ["Field service companies tracking mobile worker locations and hours", "Construction firms needing GPS-verified time tracking and job costing", "Remote teams wanting time tracking integrated with payroll"],
  },
  { slug: "everhour", name: "Everhour", tagline: "Time tracking that lives inside your project management tool", description: "Everhour integrates directly into Asana, Jira, Trello, Monday.com, and other project management tools. Instead of switching to a separate time tracker, you track time right inside tasks and tickets. This native integration approach drives higher adoption since the timer is always visible where work happens.", category: "project-billing", tags: ["everhour", "asana integration", "jira", "trello", "native integration", "project billing"], url: "https://everhour.com", pricing: "freemium", featured: false, logo: "⏰", domain: "everhour.com" },
  { slug: "rescuetime", name: "RescueTime", tagline: "Automatic time tracking that runs in the background and reports your digital habits", description: "RescueTime automatically tracks how you spend time on your computer and phone — no timers to start or stop. It categorizes time as productive or distracting and provides daily/weekly reports. FocusTime blocks distracting websites during work hours. Ideal for individuals wanting self-awareness about their digital habits.", category: "freelancer", tags: ["rescuetime", "automatic tracking", "productivity", "focus time", "digital habits", "self-awareness"], url: "https://www.rescuetime.com", pricing: "freemium", featured: false, logo: "🛟", domain: "rescuetime.com" },
  { slug: "paymo", name: "Paymo", tagline: "Time tracking, project management, and invoicing in one platform", description: "Paymo combines task management, time tracking, resource scheduling, and invoicing for agencies and professional services. Its visual Gantt charts, Kanban boards, and resource scheduling give a holistic view of projects alongside time data. Good for small agencies wanting one tool for project and billing management.", category: "project-billing", tags: ["paymo", "project management", "invoicing", "gantt charts", "resource scheduling", "agencies"], url: "https://www.paymoapp.com", pricing: "freemium", featured: false, logo: "💵", domain: "paymoapp.com" },
  { slug: "timely-app", name: "Timely", tagline: "AI-powered automatic time tracking that removes the burden of manual logging", description: "Timely uses AI to automatically track everything you work on and drafts timesheets for you. It monitors apps, documents, meetings, and websites to create an accurate timeline of your day. You review and approve the AI-drafted entries. Timely removes the biggest pain point of time tracking: remembering to do it.", category: "team-management", tags: ["timely", "ai time tracking", "automatic", "memory timeline", "privacy-first", "smart scheduling"], url: "https://timelyapp.com", pricing: "paid", featured: false, logo: "🤖", domain: "timelyapp.com" },
  { slug: "deputy", name: "Deputy", tagline: "Workforce management with scheduling, time tracking, and compliance", description: "Deputy is a workforce management platform combining employee scheduling, time and attendance, task management, and compliance. It features AI-powered auto-scheduling, GPS clock-in, and break compliance tracking. Used by 365,000+ businesses for shift-based workforce management.", category: "enterprise", tags: ["deputy", "workforce management", "scheduling", "shift management", "compliance", "gps clock-in"], url: "https://www.deputy.com", pricing: "paid", featured: false, logo: "⭐", domain: "deputy.com" },
  { slug: "tsheets", name: "QuickBooks Time (TSheets)", tagline: "Time tracking by Intuit with deep QuickBooks and payroll integration", description: "QuickBooks Time (formerly TSheets) is Intuit's time tracking solution with native integration into QuickBooks and payroll. It features GPS tracking, geofencing, mobile clock-in, and project tracking. Being part of the QuickBooks ecosystem makes it the natural choice for QuickBooks users.", category: "enterprise", tags: ["quickbooks time", "tsheets", "intuit", "payroll integration", "gps", "quickbooks"], url: "https://quickbooks.intuit.com/time-tracking/", pricing: "paid", featured: false, logo: "📗", domain: "quickbooks.intuit.com" },
  { slug: "monday-time-tracking", name: "Monday.com Time Tracking", tagline: "Built-in time tracking within Monday.com's work management platform", description: "Monday.com includes native time tracking columns that let teams log hours directly within their work boards. No separate tool needed — time data lives alongside tasks, statuses, and deadlines. Best for teams already using Monday.com who want basic time tracking without another subscription.", category: "team-management", tags: ["monday.com", "built-in", "work management", "project tracking", "time logging", "native"], url: "https://monday.com/features/time-tracking", pricing: "paid", featured: false, logo: "🟣", domain: "monday.com" },
  { slug: "desktime", name: "DeskTime", tagline: "Automatic time tracking with productivity analysis for teams", description: "DeskTime automatically tracks time spent on applications, URLs, and documents, categorizing activities as productive, unproductive, or neutral. It includes project tracking, absence management, and optional screenshots. Popular with European companies for its balance of monitoring and privacy.", category: "employee-monitoring", tags: ["desktime", "automatic tracking", "productivity analysis", "screenshots", "absence management", "european"], url: "https://desktime.com", pricing: "freemium", featured: false, logo: "🖥️", domain: "desktime.com" },
  { slug: "freshbooks-time", name: "FreshBooks Time Tracking", tagline: "Time tracking built into FreshBooks accounting with one-click invoicing", description: "FreshBooks includes built-in time tracking that integrates directly with its invoicing and accounting features. Track time, then create invoices from logged hours with one click. Best for freelancers and small businesses already using FreshBooks for their accounting.", category: "freelancer", tags: ["freshbooks", "time tracking", "invoicing", "accounting", "freelancer", "one-click billing"], url: "https://www.freshbooks.com/timesheets-and-time-tracking", pricing: "paid", featured: false, logo: "🟢", domain: "freshbooks.com" },
  { slug: "kronos", name: "UKG (Kronos)", tagline: "Enterprise workforce management for time, attendance, and HR compliance", description: "UKG (Ultimate Kronos Group) is the enterprise leader in workforce management, serving millions of employees worldwide. It handles time and attendance, scheduling, absence management, and labor compliance for the largest organizations. UKG's Dimensions platform provides real-time analytics and AI-powered scheduling.", category: "enterprise", tags: ["ukg", "kronos", "enterprise", "workforce management", "compliance", "scheduling"], url: "https://www.ukg.com", pricing: "paid", featured: false, logo: "🏛️", domain: "ukg.com" },
];
