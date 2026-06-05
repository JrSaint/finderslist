import Link from "next/link";
import {
  getFeaturedMarketingAutomationTools,
  getAllMarketingAutomationTools,
  getAllMarketingAutomationCategories,
  MARKETING_AUTOMATION_CATEGORIES,
  getMarketingAutomationCategoryCount,
  filterMarketingAutomationTools,
} from "@/lib/marketing-automation-software";
import { MARKETING_AUTOMATION_EDITORIAL } from "@/data/marketing-automation-software";
import ToolCard from "@/components/ToolCard";
import SearchBar from "@/components/SearchBar";
import AdBanner from "@/components/AdBanner";
import EditorialSection from "@/components/EditorialSection";
import ComparisonTable from "@/components/ComparisonTable";
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
    return { robots: { index: false, follow: false }, alternates: { canonical: "https://www.finderslist.com/marketing-automation-software" } };
  }
  return {
    title: "Best Marketing Automation Software (2026) — Top Platforms Compared",
    description: "Compare the best marketing automation software in 2026. Reviews of HubSpot, ActiveCampaign, Mailchimp, Marketo, Klaviyo, and more multi-channel platforms.",
    keywords: ["marketing automation software","best marketing automation 2026","email automation","lead nurturing","all-in-one marketing platform"],
    alternates: { canonical: "https://www.finderslist.com/marketing-automation-software" },
  };
}

export default async function MarketingAutomationPage({ searchParams }: Props) {
  const { q, pricing, role } = await searchParams;
  const featured = getFeaturedMarketingAutomationTools();
  const allTools = getAllMarketingAutomationTools();
  const categories = getAllMarketingAutomationCategories();

  const isFiltering = !!(q || pricing || role);
  const filteredTools = isFiltering
    ? filterMarketingAutomationTools({ query: q, pricing, role })
    : allTools;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.finderslist.com" },
      { "@type": "ListItem", position: 2, name: "Marketing Automation Software", item: "https://www.finderslist.com/marketing-automation-software" },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Marketing Automation Software",
    description: "Compare the best marketing automation software in 2026. Reviews of HubSpot, ActiveCampaign, Mailchimp, Marketo, Klaviyo, and more multi-channel platforms.",
    numberOfItems: allTools.length,
    itemListElement: allTools.slice(0, 10).map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.name,
      url: `https://www.finderslist.com/marketing-automation-software/tools/${tool.slug}`,
      description: tool.tagline,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (MARKETING_AUTOMATION_EDITORIAL.faq || []).map((f) => ({
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
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/30 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-4 py-1.5 text-sm text-fuchsia-300 backdrop-blur-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
            {allTools.length}+ curated marketing automation software
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
            <span className="text-white">Find the Right </span>
            <span className="bg-gradient-to-r from-fuchsia-400 via-fuchsia-300 to-fuchsia-200 bg-clip-text text-transparent">
              Marketing Automation Software
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            The most comprehensive directory of marketing automation software. Compare top options with honest reviews, pricing, and real-world use cases.
          </p>
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar large basePath="/marketing-automation-software" tools={allTools as never[]} />
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
              basePath="/marketing-automation-software"
              resultCount={filteredTools.length}
              accentClass="bg-fuchsia-600 border-fuchsia-500 shadow-fuchsia-500/20"
            />
          </Suspense>
        </section>

        {!isFiltering && (
          <EditorialSection
            title={MARKETING_AUTOMATION_EDITORIAL.title}
            intro={MARKETING_AUTOMATION_EDITORIAL.intro}
            buyerGuide={MARKETING_AUTOMATION_EDITORIAL.buyerGuide}
            faq={MARKETING_AUTOMATION_EDITORIAL.faq}
          />
        )}

        {!isFiltering && (
          <ComparisonTable
            tools={featured as never[]}
            categories={MARKETING_AUTOMATION_CATEGORIES as Record<string, { label: string; emoji: string }>}
            basePath="/marketing-automation-software"
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
                  {filteredTools.length} listing{filteredTools.length !== 1 ? "s" : ""} found
                </p>
              </div>
            </div>
            {filteredTools.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                <p className="text-4xl mb-4">🔍</p>
                <p className="text-lg font-medium text-slate-300 mb-2">No results found</p>
                <p className="text-sm mb-6">Try a different search term or clear your filters</p>
                <Link href="/marketing-automation-software" className="text-fuchsia-400 hover:text-fuchsia-300 text-sm font-medium">Clear all filters →</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool as never} basePath="/marketing-automation-software" />
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
                  const info = MARKETING_AUTOMATION_CATEGORIES[cat];
                  const count = getMarketingAutomationCategoryCount(cat);
                  return (
                    <Link
                      key={cat}
                      href={`/marketing-automation-software/category/${cat}`}
                      className="flex flex-col gap-1.5 p-4 rounded-xl border border-white/8 bg-slate-900/40 hover:bg-slate-800/60 hover:border-fuchsia-500/30 transition-all group"
                    >
                      <span className="text-2xl">{info.emoji}</span>
                      <span className="text-sm font-medium text-white group-hover:text-fuchsia-300 transition-colors leading-tight">{info.label}</span>
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
                  <ToolCard key={tool.slug} tool={tool as never} basePath="/marketing-automation-software" />
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
                  <ToolCard key={tool.slug} tool={tool as never} variant="compact" basePath="/marketing-automation-software" />
                ))}
              </div>
            </section>
          </>
        )}

        <RelatedDirectories currentSlug="marketing-automation-software" />
      </div>
    </div>
  );
}
