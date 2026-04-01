import Link from "next/link";
import {
  getFeaturedGoldIRATools,
  getAllGoldIRATools,
  getAllGoldIRACategories,
  GOLD_IRA_CATEGORIES,
  getGoldIRACategoryCount,
  filterGoldIRATools,
} from "@/lib/gold-ira-companies";
import ToolCard from "@/components/ToolCard";
import SearchBar from "@/components/SearchBar";
import AdBanner from "@/components/AdBanner";
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
    return { robots: { index: false, follow: false }, alternates: { canonical: "https://finderslist.com/gold-ira-companies" } };
  }
  return {
    title: "Best Gold IRA Companies (2026) — 15+ Providers Compared",
    description: "Compare the best Gold IRA companies for rollovers, fees, and precious metals selection. Reviews of Augusta Precious Metals, Goldco, American Hartford Gold, and more.",
    keywords: ["gold IRA companies", "best gold IRA 2026", "gold IRA rollover", "precious metals IRA", "gold IRA comparison"],
    alternates: { canonical: "https://finderslist.com/gold-ira-companies" },
  };
}

export default async function GoldIRACompaniesPage({ searchParams }: Props) {
  const { q, pricing, role } = await searchParams;
  const featured = getFeaturedGoldIRATools();
  const allTools = getAllGoldIRATools();
  const categories = getAllGoldIRACategories();

  const isFiltering = !!(q || pricing || role);
  const filteredTools = isFiltering
    ? filterGoldIRATools({ query: q, pricing, role })
    : allTools;

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(234,179,8,0.2),transparent)] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-sm text-yellow-300 backdrop-blur-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            {allTools.length}+ curated gold IRA companies
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
            <span className="text-white">Find the Right </span>
            <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
              Gold IRA Company
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            The most comprehensive directory of Gold IRA companies. Compare top providers with honest reviews, fees, and real-world use cases.
          </p>
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar large basePath="/gold-ira-companies" />
          </div>
          <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
            {[
              { value: `${allTools.length}+`, label: "Companies" },
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

        <section className="mt-10 p-5 rounded-2xl border border-white/8 bg-slate-900/30">
          <Suspense fallback={null}>
            <GenericFilterBar
              roles={{}}
              basePath="/gold-ira-companies"
              resultCount={filteredTools.length}
              accentClass="bg-yellow-600 border-yellow-500 shadow-yellow-500/20"
            />
          </Suspense>
        </section>

        {isFiltering ? (
          <section className="mt-10 mb-16">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {q ? `Results for "${q}"` : `${pricing?.charAt(0).toUpperCase()}${pricing?.slice(1)} Tools`}
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
                <Link href="/gold-ira-companies" className="text-yellow-400 hover:text-yellow-300 text-sm font-medium">Clear all filters →</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool as never} basePath="/gold-ira-companies" />
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            <section className="mt-14">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-white">Browse by Category</h2>
                <span className="text-xs text-slate-600">{categories.length} categories</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {categories.map((cat) => {
                  const info = GOLD_IRA_CATEGORIES[cat];
                  const count = getGoldIRACategoryCount(cat);
                  return (
                    <Link
                      key={cat}
                      href={`/gold-ira-companies/category/${cat}`}
                      className="flex flex-col gap-1.5 p-4 rounded-xl border border-white/8 bg-slate-900/40 hover:bg-slate-800/60 hover:border-yellow-500/30 transition-all group"
                    >
                      <span className="text-2xl">{info.emoji}</span>
                      <span className="text-sm font-medium text-white group-hover:text-yellow-300 transition-colors leading-tight">{info.label}</span>
                      <span className="text-xs text-slate-600">{count} tools</span>
                    </Link>
                  );
                })}
              </div>
            </section>

            <section className="mt-14">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-semibold text-white">Featured Companies</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Hand-picked by our team</p>
                </div>
                <span className="text-xs text-slate-600">{featured.length} companies</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {featured.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool as never} basePath="/gold-ira-companies" />
                ))}
              </div>
            </section>

            <div className="mt-12">
              <AdBanner format="rectangle" className="h-64 w-full max-w-lg mx-auto" />
            </div>

            <section className="mt-12 mb-16">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-semibold text-white">All Companies</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Complete directory</p>
                </div>
                <span className="text-xs text-slate-600">{allTools.length} companies</span>
              </div>
              <div className="flex flex-col gap-2">
                {allTools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool as never} variant="compact" basePath="/gold-ira-companies" />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
