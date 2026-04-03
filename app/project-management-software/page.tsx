import Link from "next/link";
import {
  getFeaturedProjectManagementTools,
  getAllProjectManagementTools,
  getAllProjectManagementCategories,
  PROJECT_MANAGEMENT_CATEGORIES,
  getProjectManagementCategoryCount,
  filterProjectManagementTools,
} from "@/lib/project-management-software";
import { PROJECT_MANAGEMENT_EDITORIAL } from "@/data/project-management-software";
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
    return { robots: { index: false, follow: false }, alternates: { canonical: "https://finderslist.com/project-management-software" } };
  }
  return {
    title: "Best Project Management Software (2026) — 22+ Tools Reviewed",
    description: "Compare the best project management software for teams. Reviews of Monday.com, Asana, ClickUp, Notion, Jira, and more.",
    keywords: ["project management software","best project management tools 2026","task management","agile project management","team collaboration"],
    alternates: { canonical: "https://finderslist.com/project-management-software" },
  };
}

export default async function ProjectManagementPage({ searchParams }: Props) {
  const { q, pricing, role } = await searchParams;
  const featured = getFeaturedProjectManagementTools();
  const allTools = getAllProjectManagementTools();
  const categories = getAllProjectManagementCategories();

  const isFiltering = !!(q || pricing || role);
  const filteredTools = isFiltering
    ? filterProjectManagementTools({ query: q, pricing, role })
    : allTools;

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(14,165,233,0.2),transparent)] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-300 backdrop-blur-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            {allTools.length}+ curated project management software
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
            <span className="text-white">Find the Right </span>
            <span className="bg-gradient-to-r from-violet-400 via-violet-400 to-violet-300 bg-clip-text text-transparent">
              PM Tool
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            The most comprehensive directory of project management software. Compare top tools with honest reviews, pricing, and real-world use cases.
          </p>
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar large basePath="/project-management-software" />
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

        <section className="mt-10 p-5 rounded-2xl border border-white/8 bg-slate-900/30">
          <Suspense fallback={null}>
            <GenericFilterBar
              roles={{}}
              basePath="/project-management-software"
              resultCount={filteredTools.length}
              accentClass="bg-violet-600 border-violet-500 shadow-violet-500/20"
            />
          </Suspense>
        </section>

        {!isFiltering && (
          <EditorialSection
            title={PROJECT_MANAGEMENT_EDITORIAL.title}
            intro={PROJECT_MANAGEMENT_EDITORIAL.intro}
            buyerGuide={PROJECT_MANAGEMENT_EDITORIAL.buyerGuide}
            faq={PROJECT_MANAGEMENT_EDITORIAL.faq}
          />
        )}

        {!isFiltering && (
          <ComparisonTable
            tools={featured as never[]}
            categories={PROJECT_MANAGEMENT_CATEGORIES as Record<string, { label: string; emoji: string }>}
            basePath="/project-management-software"
          />
        )}

        {!isFiltering && <MethodologyBadge />}

        {isFiltering ? (
          <section className="mt-10 mb-16">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {q ? `Results for "\$\{q}"` : `${pricing?.charAt(0).toUpperCase()}${pricing?.slice(1)} Tools`}
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
                <Link href="/project-management-software" className="text-violet-400 hover:text-violet-300 text-sm font-medium">Clear all filters →</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool as never} basePath="/project-management-software" />
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
                  const info = PROJECT_MANAGEMENT_CATEGORIES[cat];
                  const count = getProjectManagementCategoryCount(cat);
                  return (
                    <Link
                      key={cat}
                      href={`/project-management-software/category/${cat}`}
                      className="flex flex-col gap-1.5 p-4 rounded-xl border border-white/8 bg-slate-900/40 hover:bg-slate-800/60 hover:border-violet-500/30 transition-all group"
                    >
                      <span className="text-2xl">{info.emoji}</span>
                      <span className="text-sm font-medium text-white group-hover:text-violet-300 transition-colors leading-tight">{info.label}</span>
                      <span className="text-xs text-slate-600">{count} tools</span>
                    </Link>
                  );
                })}
              </div>
            </section>

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
                  <ToolCard key={tool.slug} tool={tool as never} basePath="/project-management-software" />
                ))}
              </div>
            </section>
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
                  <ToolCard key={tool.slug} tool={tool as never} variant="compact" basePath="/project-management-software" />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
