import Link from "next/link";
import {
  getFeaturedVideoConferencingTools,
  getAllVideoConferencingTools,
  getAllVideoConferencingCategories,
  VIDEO_CONFERENCING_CATEGORIES,
  getVideoConferencingCategoryCount,
  filterVideoConferencingTools,
} from "@/lib/video-conferencing-software";
import { VIDEO_CONFERENCING_EDITORIAL } from "@/data/video-conferencing-software";
import ToolCard from "@/components/ToolCard";
import SearchBar from "@/components/SearchBar";
import AdBanner from "@/components/AdBanner";
import EditorialSection from "@/components/EditorialSection";
import ComparisonTable from "@/components/ComparisonTable";
import CategoryAtAGlance from "@/components/CategoryAtAGlance";
import MethodologyBadge from "@/components/MethodologyBadge";
import RelatedDirectories from "@/components/RelatedDirectories";
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
    return { robots: { index: false, follow: false }, alternates: { canonical: "https://www.finderslist.com/video-conferencing-software" } };
  }
  return {
    title: "Best Video Conferencing Software (2026) — Meetings & Webinars Compared",
    description: "Compare the best video conferencing software in 2026. Reviews of Zoom, Microsoft Teams, Google Meet, Webex, Doxy.me, and more for meetings and webinars.",
    keywords: ["video conferencing software","best video conferencing 2026","online meeting platform","webinar software","telehealth video"],
    alternates: { canonical: "https://www.finderslist.com/video-conferencing-software" },
  };
}

export default async function VideoConferencingPage({ searchParams }: Props) {
  const { q, pricing, role } = await searchParams;
  const featured = getFeaturedVideoConferencingTools();
  const allTools = getAllVideoConferencingTools();
  const categories = getAllVideoConferencingCategories();

  const isFiltering = !!(q || pricing || role);
  const filteredTools = isFiltering
    ? filterVideoConferencingTools({ query: q, pricing, role })
    : allTools;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.finderslist.com" },
      { "@type": "ListItem", position: 2, name: "Video Conferencing Software", item: "https://www.finderslist.com/video-conferencing-software" },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Video Conferencing Software",
    description: "Compare the best video conferencing software in 2026. Reviews of Zoom, Microsoft Teams, Google Meet, Webex, Doxy.me, and more for meetings and webinars.",
    numberOfItems: allTools.length,
    itemListElement: allTools.slice(0, 10).map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.name,
      url: `https://www.finderslist.com/video-conferencing-software/tools/${tool.slug}`,
      description: tool.tagline,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (VIDEO_CONFERENCING_EDITORIAL.faq || []).map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      {faqJsonLd.mainEntity.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(244,63,94,0.2),transparent)] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300 backdrop-blur-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            {allTools.length}+ curated video conferencing software
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
            <span className="text-white">Find the Right </span>
            <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-indigo-200 bg-clip-text text-transparent">
              Video Conferencing Software
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            The most comprehensive directory of video conferencing software. Compare top options with honest reviews, pricing, and real-world use cases.
          </p>
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar large basePath="/video-conferencing-software" tools={allTools as never[]} />
          </div>
          <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
            {[
              { value: `${allTools.length}+`, label: "Listings" },
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
              basePath="/video-conferencing-software"
              resultCount={filteredTools.length}
              accentClass="bg-indigo-600 border-indigo-500 shadow-indigo-500/20"
            />
          </Suspense>
        </section>

        {!isFiltering && (
          <EditorialSection
            title={VIDEO_CONFERENCING_EDITORIAL.title}
            intro={VIDEO_CONFERENCING_EDITORIAL.intro}
            buyerGuide={VIDEO_CONFERENCING_EDITORIAL.buyerGuide}
            faq={VIDEO_CONFERENCING_EDITORIAL.faq}
          />
        )}

        {!isFiltering && (
          <>
          <CategoryAtAGlance tools={allTools as never[]} basePath="/video-conferencing-software" />
          <ComparisonTable
            tools={featured as never[]}
            categories={VIDEO_CONFERENCING_CATEGORIES as Record<string, { label: string; emoji: string }>}
            basePath="/video-conferencing-software"
          />
          </>
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
                  {filteredTools.length} listing{filteredTools.length !== 1 ? "s" : ""} found
                </p>
              </div>
            </div>
            {filteredTools.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                <p className="text-4xl mb-4">🔍</p>
                <p className="text-lg font-medium text-slate-300 mb-2">No results found</p>
                <p className="text-sm mb-6">Try a different search term or clear your filters</p>
                <Link href="/video-conferencing-software" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">Clear all filters →</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool as never} basePath="/video-conferencing-software" />
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
                  const info = VIDEO_CONFERENCING_CATEGORIES[cat];
                  const count = getVideoConferencingCategoryCount(cat);
                  return (
                    <Link
                      key={cat}
                      href={`/video-conferencing-software/category/${cat}`}
                      className="flex flex-col gap-1.5 p-4 rounded-xl border border-white/8 bg-slate-900/40 hover:bg-slate-800/60 hover:border-indigo-500/30 transition-all group"
                    >
                      <span className="text-2xl">{info.emoji}</span>
                      <span className="text-sm font-medium text-white group-hover:text-indigo-300 transition-colors leading-tight">{info.label}</span>
                      <span className="text-xs text-slate-600">{count} listings</span>
                    </Link>
                  );
                })}
              </div>
            </section>

            <section className="mt-14">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-semibold text-white">Featured</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Hand-picked by our team</p>
                </div>
                <span className="text-xs text-slate-600">{featured.length} listings</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {featured.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool as never} basePath="/video-conferencing-software" />
                ))}
              </div>
            </section>
            <section className="mt-12 mb-16">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-semibold text-white">All Listings</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Complete directory</p>
                </div>
                <span className="text-xs text-slate-600">{allTools.length} listings</span>
              </div>
              <div className="flex flex-col gap-2">
                {allTools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool as never} variant="compact" basePath="/video-conferencing-software" />
                ))}
              </div>
            </section>
          </>
        )}

        <RelatedDirectories currentSlug="video-conferencing-software" />
      </div>
    </div>
  );
}
