import Link from "next/link";
import type { Metadata } from "next";
import { getAllTools, getAllCategories } from "@/lib/tools";
import { getAllMarketingTools } from "@/lib/marketing-tools";
import { getAllFinanceTools } from "@/lib/finance-tools";
import { getAllEcommerceTools } from "@/lib/ecommerce-tools";
import { getAllProductivityTools } from "@/lib/productivity-tools";
import { getAllHRTools } from "@/lib/hr-tools";
import { getAllCRMTools } from "@/lib/crm-tools";
import { getAllSecurityTools } from "@/lib/security-tools";
import { getAllWebsiteBuilderTools } from "@/lib/website-builders";
import { getAllCreatorTools } from "@/lib/creator-tools";
import { getAllDeveloperTools } from "@/lib/developer-tools";
import { getAllDesignTools } from "@/lib/design-tools";
import { getAllSupportTools } from "@/lib/support-tools";
import { getAllElearningTools } from "@/lib/elearning-tools";
import { getAllAnalyticsTools } from "@/lib/analytics-tools";
import { getAllLegalTools } from "@/lib/legal-tools";
import { getAllHostingTools } from "@/lib/hosting-tools";
import { getAllSocialMediaTools } from "@/lib/social-media-tools";
import { getAllEmailTools } from "@/lib/email-tools";
import { getAllNoCodeTools } from "@/lib/no-code-tools";

export const metadata: Metadata = {
  title: "FindersList — Curated Software Directories",
  description: "FindersList hosts 20+ curated directories for AI tools, marketing, finance, ecommerce, productivity, HR, CRM, security, design, developer tools, and more. Find exactly what you're looking for.",
  alternates: { canonical: "https://finderslist.com" },
};

const directories = [
  {
    slug: "ai-tools",
    emoji: "🤖",
    name: "AI Tools",
    description: "Discover the best AI tools for writing, coding, image generation, productivity, and more.",
    gradient: "from-violet-500/20 via-fuchsia-500/10 to-transparent",
    border: "border-violet-500/30 hover:border-violet-400/50",
    accentColor: "text-violet-400",
    badgeColor: "bg-violet-500/15 text-violet-300 border-violet-500/25",
    countKey: "ai" as const,
  },
  {
    slug: "marketing-tools",
    emoji: "📈",
    name: "Marketing Tools",
    description: "The best SEO, email marketing, social media, CRM, and advertising tools in one place.",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    border: "border-emerald-500/30 hover:border-emerald-400/50",
    accentColor: "text-emerald-400",
    badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
    countKey: "marketing" as const,
  },
  {
    slug: "finance-tools",
    emoji: "💰",
    name: "Finance & Accounting",
    description: "Compare accounting software, invoicing tools, payroll systems, expense trackers, and business banking.",
    gradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
    border: "border-amber-500/30 hover:border-amber-400/50",
    accentColor: "text-amber-400",
    badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/25",
    countKey: "finance" as const,
  },
  {
    slug: "ecommerce-tools",
    emoji: "🛍️",
    name: "E-commerce Tools",
    description: "Build your online store, streamline shipping, source products, and scale with the best e-commerce software.",
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    border: "border-blue-500/30 hover:border-blue-400/50",
    accentColor: "text-blue-400",
    badgeColor: "bg-blue-500/15 text-blue-300 border-blue-500/25",
    countKey: "ecommerce" as const,
  },
  {
    slug: "productivity-tools",
    emoji: "⚡",
    name: "Productivity Tools",
    description: "Project management, note-taking, time tracking, automation, and AI productivity tools for teams.",
    gradient: "from-teal-500/20 via-cyan-500/10 to-transparent",
    border: "border-teal-500/30 hover:border-teal-400/50",
    accentColor: "text-teal-400",
    badgeColor: "bg-teal-500/15 text-teal-300 border-teal-500/25",
    countKey: "productivity" as const,
  },
  {
    slug: "hr-tools",
    emoji: "👥",
    name: "HR & Recruiting",
    description: "ATS software, HRIS platforms, payroll tools, performance management, and onboarding solutions.",
    gradient: "from-rose-500/20 via-pink-500/10 to-transparent",
    border: "border-rose-500/30 hover:border-rose-400/50",
    accentColor: "text-rose-400",
    badgeColor: "bg-rose-500/15 text-rose-300 border-rose-500/25",
    countKey: "hr" as const,
  },
  {
    slug: "crm-tools",
    emoji: "🤝",
    name: "CRM & Sales",
    description: "CRM platforms, sales engagement tools, prospecting software, and conversation intelligence for revenue teams.",
    gradient: "from-sky-500/20 via-blue-500/10 to-transparent",
    border: "border-sky-500/30 hover:border-sky-400/50",
    accentColor: "text-sky-400",
    badgeColor: "bg-sky-500/15 text-sky-300 border-sky-500/25",
    countKey: "crm" as const,
  },
  {
    slug: "security-tools",
    emoji: "🔒",
    name: "Security Tools",
    description: "Password managers, VPNs, endpoint protection, identity management, and compliance automation tools.",
    gradient: "from-red-500/20 via-orange-500/10 to-transparent",
    border: "border-red-500/30 hover:border-red-400/50",
    accentColor: "text-red-400",
    badgeColor: "bg-red-500/15 text-red-300 border-red-500/25",
    countKey: "security" as const,
  },
  {
    slug: "website-builders",
    emoji: "🌐",
    name: "Website Builders",
    description: "No-code website builders, eCommerce platforms, CMS solutions, and landing page tools.",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    border: "border-cyan-500/30 hover:border-cyan-400/50",
    accentColor: "text-cyan-400",
    badgeColor: "bg-cyan-500/15 text-cyan-300 border-cyan-500/25",
    countKey: "websiteBuilders" as const,
  },
  {
    slug: "creator-tools",
    emoji: "🎬",
    name: "Creator Tools",
    description: "Video editing, podcast hosting, screen recording, live streaming, and creator monetization platforms.",
    gradient: "from-orange-500/20 via-amber-500/10 to-transparent",
    border: "border-orange-500/30 hover:border-orange-400/50",
    accentColor: "text-orange-400",
    badgeColor: "bg-orange-500/15 text-orange-300 border-orange-500/25",
    countKey: "creator" as const,
  },
  {
    slug: "developer-tools",
    emoji: "💻",
    name: "Developer Tools",
    description: "Version control, CI/CD, monitoring, error tracking, API testing, and issue tracking for engineering teams.",
    gradient: "from-indigo-500/20 via-violet-500/10 to-transparent",
    border: "border-indigo-500/30 hover:border-indigo-400/50",
    accentColor: "text-indigo-400",
    badgeColor: "bg-indigo-500/15 text-indigo-300 border-indigo-500/25",
    countKey: "developer" as const,
  },
  {
    slug: "design-tools",
    emoji: "🎨",
    name: "Design Tools",
    description: "UI design, graphic design, prototyping, motion design, and brand asset management tools.",
    gradient: "from-fuchsia-500/20 via-pink-500/10 to-transparent",
    border: "border-fuchsia-500/30 hover:border-fuchsia-400/50",
    accentColor: "text-fuchsia-400",
    badgeColor: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/25",
    countKey: "design" as const,
  },
  {
    slug: "support-tools",
    emoji: "🎧",
    name: "Customer Support",
    description: "Help desk platforms, live chat tools, knowledge bases, customer success software, and feedback tools.",
    gradient: "from-green-500/20 via-emerald-500/10 to-transparent",
    border: "border-green-500/30 hover:border-green-400/50",
    accentColor: "text-green-400",
    badgeColor: "bg-green-500/15 text-green-300 border-green-500/25",
    countKey: "support" as const,
  },
  {
    slug: "elearning-tools",
    emoji: "🎓",
    name: "eLearning Tools",
    description: "LMS platforms, course authoring software, virtual classrooms, and employee training solutions.",
    gradient: "from-yellow-500/20 via-amber-500/10 to-transparent",
    border: "border-yellow-500/30 hover:border-yellow-400/50",
    accentColor: "text-yellow-400",
    badgeColor: "bg-yellow-500/15 text-yellow-300 border-yellow-500/25",
    countKey: "elearning" as const,
  },
  {
    slug: "analytics-tools",
    emoji: "📊",
    name: "Analytics Tools",
    description: "Web analytics, product analytics, business intelligence, SEO analytics, and data pipeline tools.",
    gradient: "from-purple-500/20 via-violet-500/10 to-transparent",
    border: "border-purple-500/30 hover:border-purple-400/50",
    accentColor: "text-purple-400",
    badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/25",
    countKey: "analytics" as const,
  },
  {
    slug: "legal-tools",
    emoji: "⚖️",
    name: "Legal Tools",
    description: "Contract management, e-signature platforms, legal research tools, compliance automation, and IP management.",
    gradient: "from-slate-500/20 via-gray-500/10 to-transparent",
    border: "border-slate-500/30 hover:border-slate-400/50",
    accentColor: "text-slate-400",
    badgeColor: "bg-slate-500/15 text-slate-300 border-slate-500/25",
    countKey: "legal" as const,
  },
  {
    slug: "hosting-tools",
    emoji: "☁️",
    name: "Hosting & Cloud",
    description: "Cloud providers, managed WordPress hosting, VPS hosting, shared hosting, and serverless platforms.",
    gradient: "from-sky-500/20 via-cyan-500/10 to-transparent",
    border: "border-sky-500/30 hover:border-sky-400/50",
    accentColor: "text-sky-400",
    badgeColor: "bg-sky-500/15 text-sky-300 border-sky-500/25",
    countKey: "hosting" as const,
  },
  {
    slug: "social-media-tools",
    emoji: "📱",
    name: "Social Media Tools",
    description: "Social media scheduling, analytics, monitoring, community management, and influencer marketing platforms.",
    gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
    border: "border-pink-500/30 hover:border-pink-400/50",
    accentColor: "text-pink-400",
    badgeColor: "bg-pink-500/15 text-pink-300 border-pink-500/25",
    countKey: "socialMedia" as const,
  },
  {
    slug: "email-tools",
    emoji: "✉️",
    name: "Email Marketing",
    description: "Email marketing platforms, transactional email APIs, cold email tools, deliverability, and newsletter platforms.",
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    border: "border-blue-500/30 hover:border-blue-400/50",
    accentColor: "text-blue-400",
    badgeColor: "bg-blue-500/15 text-blue-300 border-blue-500/25",
    countKey: "email" as const,
  },
  {
    slug: "no-code-tools",
    emoji: "🔧",
    name: "No-Code Tools",
    description: "Automation platforms, no-code app builders, databases, AI workflow tools, and form builders.",
    gradient: "from-lime-500/20 via-green-500/10 to-transparent",
    border: "border-lime-500/30 hover:border-lime-400/50",
    accentColor: "text-lime-400",
    badgeColor: "bg-lime-500/15 text-lime-300 border-lime-500/25",
    countKey: "noCode" as const,
  },
];

export default function HubPage() {
  const aiToolCount = getAllTools().length;
  const marketingToolCount = getAllMarketingTools().length;
  const financeToolCount = getAllFinanceTools().length;
  const ecommerceToolCount = getAllEcommerceTools().length;
  const productivityToolCount = getAllProductivityTools().length;
  const hrToolCount = getAllHRTools().length;
  const crmToolCount = getAllCRMTools().length;
  const securityToolCount = getAllSecurityTools().length;
  const websiteBuilderCount = getAllWebsiteBuilderTools().length;
  const creatorToolCount = getAllCreatorTools().length;
  const developerToolCount = getAllDeveloperTools().length;
  const designToolCount = getAllDesignTools().length;
  const supportToolCount = getAllSupportTools().length;
  const elearningToolCount = getAllElearningTools().length;
  const analyticsToolCount = getAllAnalyticsTools().length;
  const legalToolCount = getAllLegalTools().length;
  const hostingToolCount = getAllHostingTools().length;
  const socialMediaToolCount = getAllSocialMediaTools().length;
  const emailToolCount = getAllEmailTools().length;
  const noCodeToolCount = getAllNoCodeTools().length;

  const totalListings =
    aiToolCount + marketingToolCount + financeToolCount + ecommerceToolCount +
    productivityToolCount + hrToolCount + crmToolCount + securityToolCount +
    websiteBuilderCount + creatorToolCount + developerToolCount + designToolCount +
    supportToolCount + elearningToolCount + analyticsToolCount + legalToolCount +
    hostingToolCount + socialMediaToolCount + emailToolCount + noCodeToolCount;

  const categoryCount = getAllCategories().length;

  const countMap = {
    ai: aiToolCount,
    marketing: marketingToolCount,
    finance: financeToolCount,
    ecommerce: ecommerceToolCount,
    productivity: productivityToolCount,
    hr: hrToolCount,
    crm: crmToolCount,
    security: securityToolCount,
    websiteBuilders: websiteBuilderCount,
    creator: creatorToolCount,
    developer: developerToolCount,
    design: designToolCount,
    support: supportToolCount,
    elearning: elearningToolCount,
    analytics: analyticsToolCount,
    legal: legalToolCount,
    hosting: hostingToolCount,
    socialMedia: socialMediaToolCount,
    email: emailToolCount,
    noCode: noCodeToolCount,
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(120,40,200,0.15),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_80%,rgba(16,185,129,0.08),transparent)] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-500/15 border border-violet-500/25 text-3xl shadow-lg shadow-violet-500/10">
            🔍
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            <span className="text-white">Finders</span>
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">List</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Curated directories for the software tools that actually matter. Hand-picked, honestly reviewed, free to browse.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {[
              { value: `${totalListings}+`, label: "Listings" },
              { value: `${categoryCount + 80}+`, label: "Categories" },
              { value: `${directories.length}`, label: "Live Directories" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Directories */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">Browse Directories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {directories.map((dir) => {
            const listingCount = countMap[dir.countKey] ?? 0;
            return (
              <Link
                key={dir.slug}
                href={`/${dir.slug}`}
                className={`group relative flex flex-col gap-3 p-5 rounded-2xl border bg-gradient-to-br ${dir.gradient} ${dir.border} transition-all overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/2 group-hover:to-white/0 transition-all pointer-events-none rounded-2xl" />
                <div className="relative flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center text-xl shadow-sm">
                    {dir.emoji}
                  </div>
                  <span className={`text-xs border rounded-full px-2 py-0.5 ${dir.badgeColor}`}>
                    {listingCount}+
                  </span>
                </div>
                <div className="relative">
                  <h3 className="text-base font-semibold text-white mb-1">
                    {dir.name}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{dir.description}</p>
                </div>
                <div className={`relative flex items-center gap-1 text-xs ${dir.accentColor} mt-auto font-medium`}>
                  Browse directory
                  <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-white/8 bg-slate-900/30">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-slate-500 text-sm mb-4">Know a tool that should be listed?</p>
          <Link
            href="/ai-tools/submit"
            className="inline-flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-6 py-3 text-sm font-semibold text-white transition-colors"
          >
            Submit a Tool
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
