import Link from "next/link";
import {
  getFeaturedPersonalInjuryTools,
  getAllPersonalInjuryTools,
  getAllPersonalInjuryCategories,
  PERSONAL_INJURY_CATEGORIES,
  getPersonalInjuryCategoryCount,
  filterPersonalInjuryTools,
} from "@/lib/personal-injury-lawyers";
import { PERSONAL_INJURY_EDITORIAL } from "@/data/personal-injury-lawyers";
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
    return { robots: { index: false, follow: false }, alternates: { canonical: "https://finderslist.com/personal-injury-lawyers" } };
  }
  return {
    title: "Best Personal Injury Lawyers (2026) — 15+ Firms & Directories Compared",
    description: "Compare the best personal injury lawyers and law firms for auto accidents, medical malpractice, workplace injuries, and product liability claims.",
    keywords: ["personal injury lawyer", "best personal injury attorneys", "car accident lawyer", "medical malpractice attorney", "injury law firm", "contingency fee lawyer"],
    alternates: { canonical: "https://finderslist.com/personal-injury-lawyers" },
  };
}

export default async function PersonalInjuryLawyersPage({ searchParams }: Props) {
  const { q, pricing, role } = await searchParams;
  const featured = getFeaturedPersonalInjuryTools();
  const allTools = getAllPersonalInjuryTools();
  const categories = getAllPersonalInjuryCategories();

  const isFiltering = !!(q || pricing || role);
  const filteredTools = isFiltering
    ? filterPersonalInjuryTools({ query: q, pricing, role })
    : allTools;

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(185,28,28,0.2),transparent)] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-sm text-red-300 backdrop-blur-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            {allTools.length}+ curated personal injury law firms & resources
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
            <span className="text-white">Find the Right </span>
            <span className="bg-gradient-to-r from-red-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">
              Personal Injury Lawyer
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            The most comprehensive directory of personal injury law firms. Compare top attorneys with honest profiles, specialties, and real-world case results.
          </p>
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar large basePath="/personal-injury-lawyers" />
          </div>
          <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
            {[
              { value: `${allTools.length}+`, label: "Firms & Resources" },
              { value: `${categories.length}`, label: "Specialties" },
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

        <section className="mt-10 p-5 rounded-2xl border border-white/8 bg-slate-900/30">
          <Suspense fallback={null}>
            <GenericFilterBar
              roles={{}}
              basePath="/personal-injury-lawyers"
              resultCount={filteredTools.length}
              accentClass="bg-red-600 border-red-500 shadow-red-500/20"
            />
          </Suspense>
        </section>

        {!isFiltering && (
          <EditorialSection
            title={PERSONAL_INJURY_EDITORIAL.title}
            intro={PERSONAL_INJURY_EDITORIAL.intro}
            buyerGuide={PERSONAL_INJURY_EDITORIAL.buyerGuide}
            faq={PERSONAL_INJURY_EDITORIAL.faq}
          />
        )}

        {!isFiltering && (
          <ComparisonTable
            tools={featured as never[]}
            categories={PERSONAL_INJURY_CATEGORIES as Record<string, { label: string; emoji: string }>}
            basePath="/personal-injury-lawyers"
          />
        )}

        {!isFiltering && <MethodologyBadge />}

        {isFiltering ? (
          <section className="mt-10 mb-16">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {q ? `Results for "${q}"` : `${pricing?.charAt(0).toUpperCase()}${pricing?.slice(1)} Tools`}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {filteredTools.length} result{filteredTools.length !== 1 ? "s" : ""} found
                </p>
              </div>
            </div>
            {filteredTools.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                <p className="text-4xl mb-4">🔍</p>
                <p className="text-lg font-medium text-slate-300 mb-2">No results found</p>
                <p className="text-sm mb-6">Try a different search term or clear your filters</p>
                <Link href="/personal-injury-lawyers" className="text-red-400 hover:text-red-300 text-sm font-medium">Clear all filters →</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool as never} basePath="/personal-injury-lawyers" />
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            <section className="mt-14">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-white">Browse by Specialty</h2>
                <span className="text-xs text-slate-600">{categories.length} specialties</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categories.map((cat) => {
                  const info = PERSONAL_INJURY_CATEGORIES[cat];
                  const count = getPersonalInjuryCategoryCount(cat);
                  return (
                    <Link
                      key={cat}
                      href={`/personal-injury-lawyers/category/${cat}`}
                      className="flex flex-col gap-1.5 p-4 rounded-xl border border-white/8 bg-slate-900/40 hover:bg-slate-800/60 hover:border-red-500/30 transition-all group"
                    >
                      <span className="text-2xl">{info.emoji}</span>
                      <span className="text-sm font-medium text-white group-hover:text-red-300 transition-colors leading-tight">{info.label}</span>
                      <span className="text-xs text-slate-600">{count} firms</span>
                    </Link>
                  );
                })}
              </div>
            </section>

            <section className="mt-14">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-semibold text-white">Featured Firms</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Hand-picked by our team</p>
                </div>
                <span className="text-xs text-slate-600">{featured.length} firms</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {featured.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool as never} basePath="/personal-injury-lawyers" />
                ))}
              </div>
            </section>
            <section className="mt-12 mb-16">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-semibold text-white">All Firms & Resources</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Complete directory</p>
                </div>
                <span className="text-xs text-slate-600">{allTools.length} listings</span>
              </div>
              <div className="flex flex-col gap-2">
                {allTools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool as never} variant="compact" basePath="/personal-injury-lawyers" />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
