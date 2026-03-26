import Link from "next/link";
import {
  getFeaturedProductivityTools,
  getAllProductivityTools,
  getAllProductivityCategories,
  PRODUCTIVITY_CATEGORIES,
  getProductivityCategoryCount,
  filterProductivityTools,
  PRODUCTIVITY_ROLES,
} from "@/lib/productivity-tools";
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
    return { robots: { index: false, follow: false } };
  }
  return {
    title: "Best Productivity Tools Directory (2026) — 35+ Tools Reviewed",
    description:
      "Discover the best productivity tools for teams and individuals. Compare project management software, note-taking apps, time trackers, automation tools, and more — including Monday.com, Notion, Zapier, Slack, and 30+ others.",
    keywords: [
      "productivity tools",
      "best productivity software 2026",
      "project management tools",
      "note taking apps",
      "time tracking software",
      "automation tools",
      "productivity tools directory",
    ],
    alternates: { canonical: "https://finderslist.com/productivity-tools" },
  };
}

const roles = Object.fromEntries(
  Object.entries(PRODUCTIVITY_ROLES).map(([k, v]) => [k, { emoji: v.emoji, label: v.label }])
);

export default async function ProductivityToolsPage({ searchParams }: Props) {
  const { q, pricing, role } = await searchParams;
  const featured = getFeaturedProductivityTools();
  const allTools = getAllProductivityTools();
  const categories = getAllProductivityCategories();

  const isFiltering = !!(q || pricing || role);
  const filteredTools = isFiltering
    ? filterProductivityTools({ query: q, pricing, role })
    : allTools;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(20,184,166,0.2),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_60%,rgba(20,184,166,0.06),transparent)] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5 text-sm text-teal-300 backdrop-blur-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            {allTools.length}+ curated productivity tools
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
            <span className="text-white">Find the Right </span>
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
              Productivity Tool
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            The most comprehensive directory of productivity software. Compare project management tools, note-taking apps, time trackers, automation platforms, and more — all in one place.
          </p>
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar large basePath="/productivity-tools" />
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
        <AdBanner slot="1234567894" format="horizontal" className="mt-8 h-24 w-full" />

        {/* Filters */}
        <section className="mt-10 p-5 rounded-2xl border border-white/8 bg-slate-900/30">
          <Suspense fallback={null}>
            <GenericFilterBar
              roles={roles}
              basePath="/productivity-tools"
              resultCount={filteredTools.length}
              accentClass="bg-teal-600 border-teal-500 shadow-teal-500/20"
            />
          </Suspense>
        </section>

        {/* Search / filter results */}
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
                <Link href="/productivity-tools" className="text-teal-400 hover:text-teal-300 text-sm font-medium">
                  Clear all filters →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool as never} basePath="/productivity-tools" />
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
                  const info = PRODUCTIVITY_CATEGORIES[cat];
                  const count = getProductivityCategoryCount(cat);
                  return (
                    <Link
                      key={cat}
                      href={`/productivity-tools/category/${cat}`}
                      className="flex flex-col gap-1.5 p-4 rounded-xl border border-white/8 bg-slate-900/40 hover:bg-slate-800/60 hover:border-teal-500/30 transition-all group"
                    >
                      <span className="text-2xl">{info.emoji}</span>
                      <span className="text-sm font-medium text-white group-hover:text-teal-300 transition-colors leading-tight">
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
                  <ToolCard key={tool.slug} tool={tool as never} basePath="/productivity-tools" />
                ))}
              </div>
            </section>

            <div className="mt-12">
              <AdBanner slot="0987654325" format="rectangle" className="h-64 w-full max-w-lg mx-auto" />
            </div>

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
                  <ToolCard key={tool.slug} tool={tool as never} variant="compact" basePath="/productivity-tools" />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
