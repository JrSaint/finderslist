import Link from "next/link";
import {
  getFeaturedHRTools,
  getAllHRTools,
  getAllHRCategories,
  HR_CATEGORIES,
  getHRCategoryCount,
  filterHRTools,
  HR_ROLES,
} from "@/lib/hr-tools";
import { HR_EDITORIAL } from "@/data/hr-tools";
import ToolCard from "@/components/ToolCard";
import SearchBar from "@/components/SearchBar";
import AdBanner from "@/components/AdBanner";
import EditorialSection from "@/components/EditorialSection";
import ComparisonTable from "@/components/ComparisonTable";
import MethodologyBadge from "@/components/MethodologyBadge";
import GenericFilterBar from "@/components/GenericFilterBar";
import { Suspense } from "react";
import type { Metadata } from "next";

interface Props {
  searchParams: Promise<{ q?: string; pricing?: string; role?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q, pricing, role } = await searchParams;
  const isFiltering = !!(q || pricing || role);
  if (isFiltering) {
    return { robots: { index: false, follow: false }, alternates: { canonical: "https://finderslist.com/hr-tools" } };
  }
  return {
    title: "Best HR & Recruiting Tools Directory (2026) — 35+ Tools Reviewed",
    description:
      "Discover the best HR software for recruiting, payroll, performance management, onboarding, and learning. Compare Greenhouse, BambooHR, Gusto, Rippling, Lattice, and 30+ more with honest reviews and pricing.",
    keywords: [
      "HR software",
      "best HR tools 2026",
      "ATS software",
      "payroll software",
      "HRIS systems",
      "performance management",
      "HR tools directory",
    ],
    alternates: { canonical: "https://finderslist.com/hr-tools" },
  };
}

const roles = Object.fromEntries(
  Object.entries(HR_ROLES).map(([k, v]) => [k, { emoji: v.emoji, label: v.label }])
);

export default async function HRToolsPage({ searchParams }: Props) {
  const { q, pricing, role } = await searchParams;
  const featured = getFeaturedHRTools();
  const allTools = getAllHRTools();
  const categories = getAllHRCategories();

  const isFiltering = !!(q || pricing || role);
  const filteredTools = isFiltering
    ? filterHRTools({ query: q, pricing, role })
    : allTools;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(244,63,94,0.2),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_60%,rgba(244,63,94,0.06),transparent)] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-sm text-rose-300 backdrop-blur-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            {allTools.length}+ curated HR & recruiting tools
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
            <span className="text-white">Find the Right </span>
            <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
              HR Tool
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            The most comprehensive directory of HR software. Compare applicant tracking systems, HRIS platforms, payroll tools, performance management software, and more — all in one place.
          </p>
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar large basePath="/hr-tools" />
          </div>
          <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
            {[
              { value: `${allTools.length}+`, label: "Tools" },
              { value: `${categories.length}`, label: "Categories" },
              { value: "Free", label: "to Browse" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdBanner format="horizontal" className="mt-8 h-24 w-full" />

        {/* Filters */}
        <section className="mt-10 p-5 rounded-2xl border border-white/8 bg-slate-900/30">
          <Suspense fallback={null}>
            <GenericFilterBar
              roles={roles}
              basePath="/hr-tools"
              resultCount={filteredTools.length}
              accentClass="bg-rose-600 border-rose-500 shadow-rose-500/20"
            />
          </Suspense>
        </section>

        {/* Search / filter results */}
        {!isFiltering && (
          <EditorialSection
            title={HR_EDITORIAL.title}
            intro={HR_EDITORIAL.intro}
            buyerGuide={HR_EDITORIAL.buyerGuide}
            faq={HR_EDITORIAL.faq}
          />
        )}

        {!isFiltering && (
          <ComparisonTable
            tools={featured as never[]}
            categories={HR_CATEGORIES as Record<string, { label: string; emoji: string }>}
            basePath="/hr-tools"
          />
        )}

        {!isFiltering && <MethodologyBadge />}

        {isFiltering ? (
          <section className="mt-10 mb-16">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {q
                    ? `Results for "${q}"`
                    : role
                    ? `Tools for ${role.split("-").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}`
                    : `${pricing?.charAt(0).toUpperCase()}${pricing?.slice(1)} Tools`}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {filteredTools.length} tool{filteredTools.length !== 1 ? "s" : ""} found
                </p>
              </div>
            </div>

            {filteredTools.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                <p className="text-4xl mb-4">🔍</p>
                <p className="text-lg font-medium text-slate-300 mb-2">No tools found</p>
                <p className="text-sm mb-6">Try a different search term or clear your filters</p>
                <Link href="/hr-tools" className="text-rose-400 hover:text-rose-300 text-sm font-medium">
                  Clear all filters →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool as never} basePath="/hr-tools" />
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            {/* Categories */}
            <section className="mt-14">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-white">Browse by Category</h2>
                <span className="text-xs text-slate-600">{categories.length} categories</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categories.map((cat) => {
                  const info = HR_CATEGORIES[cat];
                  const count = getHRCategoryCount(cat);
                  return (
                    <Link
                      key={cat}
                      href={`/hr-tools/category/${cat}`}
                      className="flex flex-col gap-1.5 p-4 rounded-xl border border-white/8 bg-slate-900/40 hover:bg-slate-800/60 hover:border-rose-500/30 transition-all group"
                    >
                      <span className="text-2xl">{info.emoji}</span>
                      <span className="text-sm font-medium text-white group-hover:text-rose-300 transition-colors leading-tight">
                        {info.label}
                      </span>
                      <span className="text-xs text-slate-600">{count} tools</span>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Featured Tools */}
            <section className="mt-14">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-semibold text-white">Featured Tools</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Hand-picked by our team</p>
                </div>
                <span className="text-xs text-slate-600">{featured.length} tools</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {featured.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool as never} basePath="/hr-tools" />
                ))}
              </div>
            </section>
            {/* All Tools */}
            <section className="mt-12 mb-16">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-semibold text-white">All Tools</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Complete directory</p>
                </div>
                <span className="text-xs text-slate-600">{allTools.length} tools</span>
              </div>
              <div className="flex flex-col gap-2">
                {allTools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool as never} variant="compact" basePath="/hr-tools" />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
