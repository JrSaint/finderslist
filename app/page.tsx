import Link from "next/link";
import type { Metadata } from "next";
import { getAllTools, getAllCategories } from "@/lib/tools";
import { getAllMarketingTools } from "@/lib/marketing-tools";
import { getAllFinanceTools } from "@/lib/finance-tools";
import { getAllEcommerceTools } from "@/lib/ecommerce-tools";
import { getAllProductivityTools } from "@/lib/productivity-tools";
import { getAllHRTools } from "@/lib/hr-tools";

export const metadata: Metadata = {
  title: "FindersList — Curated Software Directories",
  description: "FindersList hosts curated directories for AI tools, marketing tools, finance software, e-commerce tools, productivity apps, HR software, and more. Find exactly what you're looking for.",
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
    live: true,
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
    live: true,
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
    live: true,
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
    live: true,
    countKey: "ecommerce" as const,
  },
  {
    slug: "productivity-tools",
    emoji: "⚡",
    name: "Productivity Tools",
    description: "Project management, note-taking, time tracking, automation, and AI productivity tools for teams and individuals.",
    gradient: "from-teal-500/20 via-cyan-500/10 to-transparent",
    border: "border-teal-500/30 hover:border-teal-400/50",
    accentColor: "text-teal-400",
    badgeColor: "bg-teal-500/15 text-teal-300 border-teal-500/25",
    live: true,
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
    live: true,
    countKey: "hr" as const,
  },
];

export default function HubPage() {
  const aiToolCount = getAllTools().length;
  const marketingToolCount = getAllMarketingTools().length;
  const financeToolCount = getAllFinanceTools().length;
  const ecommerceToolCount = getAllEcommerceTools().length;
  const productivityToolCount = getAllProductivityTools().length;
  const hrToolCount = getAllHRTools().length;
  const totalListings = aiToolCount + marketingToolCount + financeToolCount + ecommerceToolCount + productivityToolCount + hrToolCount;
  const categoryCount = getAllCategories().length;

  const countMap = {
    ai: aiToolCount,
    marketing: marketingToolCount,
    finance: financeToolCount,
    ecommerce: ecommerceToolCount,
    productivity: productivityToolCount,
    hr: hrToolCount,
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
              { value: `${categoryCount + 30}+`, label: "Categories" },
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
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">Browse Directories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {directories.map((dir) => {
            const listingCount = dir.countKey ? countMap[dir.countKey] : 0;
            return (
              <Link
                key={dir.slug}
                href={`/${dir.slug}`}
                className={`group relative flex flex-col gap-4 p-6 rounded-2xl border bg-gradient-to-br ${dir.gradient} ${dir.border} transition-all overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/2 group-hover:to-white/0 transition-all pointer-events-none rounded-2xl" />
                <div className="relative flex items-start justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center text-2xl shadow-sm">
                    {dir.emoji}
                  </div>
                  <span className={`text-xs border rounded-full px-2.5 py-1 ${dir.badgeColor}`}>
                    Live · {listingCount}+ listings
                  </span>
                </div>
                <div className="relative">
                  <h3 className={`text-lg font-semibold text-white group-hover:${dir.accentColor} transition-colors mb-1.5`}>
                    {dir.name}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{dir.description}</p>
                </div>
                <div className={`relative flex items-center gap-1 text-sm ${dir.accentColor} mt-1 font-medium`}>
                  Browse directory
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
