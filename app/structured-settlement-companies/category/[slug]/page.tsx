import { notFound } from "next/navigation";
import {
  getStructuredSettlementToolsByCategory,
  STRUCTURED_SETTLEMENT_CATEGORIES,
  getAllStructuredSettlementCategories,
  getAllStructuredSettlementTools,
} from "@/lib/structured-settlement-companies";
import type { StructuredSettlementCategory } from "@/lib/structured-settlement-companies";
import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllStructuredSettlementCategories().map((cat) => ({ slug: cat }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = STRUCTURED_SETTLEMENT_CATEGORIES[slug as StructuredSettlementCategory];
  if (!category) return {};
  const tools = getStructuredSettlementToolsByCategory(slug as StructuredSettlementCategory);
  return {
    title: `Best ${category.label} Structured Settlement Companies (2026) — ${tools.length} Options Compared`,
    description: `Discover the best structured settlement companies for ${category.label.toLowerCase()} in 2026. We've curated ${tools.length} top companies with honest reviews, payout estimates, and real-world use cases.`,
    keywords: [`${category.label} structured settlement`, `best ${category.label} companies 2026`, "structured settlement buyers", category.label],
    alternates: { canonical: `https://finderslist.com/structured-settlement-companies/category/${slug}` },
  };
}

export default async function StructuredSettlementCategoryPage({ params }: Props) {
  const { slug } = await params;

  if (!STRUCTURED_SETTLEMENT_CATEGORIES[slug as StructuredSettlementCategory]) notFound();

  const category = STRUCTURED_SETTLEMENT_CATEGORIES[slug as StructuredSettlementCategory];
  const tools = getStructuredSettlementToolsByCategory(slug as StructuredSettlementCategory);
  const allCategories = getAllStructuredSettlementCategories();
  const totalTools = getAllStructuredSettlementTools().length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Best ${category.label} Structured Settlement Companies`,
    description: category.description,
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.name,
      description: tool.tagline,
      url: `https://finderslist.com/structured-settlement-companies/tools/${tool.slug}`,
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/structured-settlement-companies" className="hover:text-slate-300 transition-colors">Structured Settlement Companies</Link>
        <span>/</span>
        <span className="text-slate-300">{category.label}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-3xl">{category.emoji}</div>
            <div>
              <h1 className="text-2xl font-bold text-white">{category.label}</h1>
              <p className="text-slate-400 text-sm mt-0.5">{category.description}</p>
            </div>
          </div>
          <div className="mb-6 text-sm text-slate-500">Showing {tools.length} compan{tools.length !== 1 ? "ies" : "y"}</div>
          {tools.length === 0 ? (
            <div className="text-center py-16 text-slate-500">No companies in this category yet.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool as never} basePath="/structured-settlement-companies" />
              ))}
            </div>
          )}
          <div className="mt-10"><AdBanner format="horizontal" className="h-24 w-full" /></div>
        </div>

        <aside className="lg:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">All Categories</h3>
            <div className="space-y-1">
              {allCategories.map((cat) => {
                const info = STRUCTURED_SETTLEMENT_CATEGORIES[cat];
                const isActive = cat === slug;
                return (
                  <Link key={cat} href={`/structured-settlement-companies/category/${cat}`}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive ? "bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30" : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}>
                    <span>{info.emoji}</span><span>{info.label}</span>
                  </Link>
                );
              })}
            </div>
            <div className="mt-6"><AdBanner format="rectangle" className="h-64 w-full" /></div>
            <div className="mt-6 rounded-xl border border-white/10 bg-slate-900/50 p-4 text-center">
              <p className="text-sm text-slate-400 mb-3">Know a great company?</p>
              <Link href="/structured-settlement-companies" className="block w-full rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 px-4 py-2 text-sm font-medium text-white transition-colors text-center">Browse All</Link>
              <p className="text-xs text-slate-600 mt-2">{totalTools} companies listed</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
