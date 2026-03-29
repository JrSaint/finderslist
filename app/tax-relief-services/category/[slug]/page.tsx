import { notFound } from "next/navigation";
import {
  getTaxReliefToolsByCategory,
  TAX_RELIEF_CATEGORIES,
  getAllTaxReliefCategories,
  getAllTaxReliefTools,
} from "@/lib/tax-relief-services";
import type { TaxReliefCategory } from "@/lib/tax-relief-services";
import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllTaxReliefCategories().map((cat) => ({ slug: cat }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = TAX_RELIEF_CATEGORIES[slug as TaxReliefCategory];
  if (!category) return {};
  const tools = getTaxReliefToolsByCategory(slug as TaxReliefCategory);
  return {
    title: `Best ${category.label} Services (2026) — ${tools.length} Options Compared`,
    description: `Discover the best ${category.label.toLowerCase()} services in 2026. We've curated ${tools.length} top options with honest reviews, pricing breakdowns, and real-world use cases.`,
    keywords: [`${category.label} services`, `best ${category.label} 2026`, "tax relief", category.label],
    alternates: { canonical: `https://finderslist.com/tax-relief-services/category/${slug}` },
  };
}

export default async function TaxReliefCategoryPage({ params }: Props) {
  const { slug } = await params;

  if (!TAX_RELIEF_CATEGORIES[slug as TaxReliefCategory]) notFound();

  const category = TAX_RELIEF_CATEGORIES[slug as TaxReliefCategory];
  const tools = getTaxReliefToolsByCategory(slug as TaxReliefCategory);
  const allCategories = getAllTaxReliefCategories();
  const totalTools = getAllTaxReliefTools().length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Best ${category.label} Services`,
    description: category.description,
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.name,
      description: tool.tagline,
      url: `https://finderslist.com/tax-relief-services/tools/${tool.slug}`,
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/tax-relief-services" className="hover:text-slate-300 transition-colors">Tax Relief Services</Link>
        <span>/</span>
        <span className="text-slate-300">{category.label}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-3xl">{category.emoji}</div>
            <div>
              <h1 className="text-2xl font-bold text-white">{category.label}</h1>
              <p className="text-slate-400 text-sm mt-0.5">{category.description}</p>
            </div>
          </div>
          <div className="mb-6 text-sm text-slate-500">Showing {tools.length} service{tools.length !== 1 ? "s" : ""}</div>
          {tools.length === 0 ? (
            <div className="text-center py-16 text-slate-500">No services in this category yet.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool as never} basePath="/tax-relief-services" />
              ))}
            </div>
          )}
          <div className="mt-10"><AdBanner slot="1122334472" format="horizontal" className="h-24 w-full" /></div>
        </div>

        <aside className="lg:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">All Categories</h3>
            <div className="space-y-1">
              {allCategories.map((cat) => {
                const info = TAX_RELIEF_CATEGORIES[cat];
                const isActive = cat === slug;
                return (
                  <Link key={cat} href={`/tax-relief-services/category/${cat}`}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive ? "bg-red-500/20 text-red-300 border border-red-500/30" : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}>
                    <span>{info.emoji}</span><span>{info.label}</span>
                  </Link>
                );
              })}
            </div>
            <div className="mt-6"><AdBanner slot="5544332272" format="rectangle" className="h-64 w-full" /></div>
            <div className="mt-6 rounded-xl border border-white/10 bg-slate-900/50 p-4 text-center">
              <p className="text-sm text-slate-400 mb-3">Know a great service?</p>
              <Link href="/tax-relief-services" className="block w-full rounded-lg bg-red-600 hover:bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors text-center">Browse All</Link>
              <p className="text-xs text-slate-600 mt-2">{totalTools} services listed</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
