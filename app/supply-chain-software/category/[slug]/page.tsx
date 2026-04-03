import { notFound } from "next/navigation";
import {
  getSupplyChainToolsByCategory,
  SUPPLY_CHAIN_CATEGORIES,
  getAllSupplyChainCategories,
  getAllSupplyChainTools,
} from "@/lib/supply-chain-software";
import type { SupplyChainCategory } from "@/lib/supply-chain-software";
import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import CategoryGuide from "@/components/CategoryGuide";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSupplyChainCategories().map((cat) => ({ slug: cat }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = SUPPLY_CHAIN_CATEGORIES[slug as SupplyChainCategory];
  if (!category) return {};
  const tools = getSupplyChainToolsByCategory(slug as SupplyChainCategory);
  return {
    title: `Best ${category.label} Tools (2026) — ${tools.length} Options Compared`,
    description: `Discover the best ${category.label.toLowerCase()} tools in 2026. We've curated ${tools.length} top tools with honest reviews, pricing breakdowns, and real-world use cases.`,
    keywords: [`${category.label} tools`, `best ${category.label} tools 2026`, "supply chain software", category.label],
    alternates: { canonical: `https://finderslist.com/supply-chain-software/category/${slug}` },
  };
}

export default async function SupplyChainCategoryPage({ params }: Props) {
  const { slug } = await params;

  if (!SUPPLY_CHAIN_CATEGORIES[slug as SupplyChainCategory]) notFound();

  const category = SUPPLY_CHAIN_CATEGORIES[slug as SupplyChainCategory];
  const tools = getSupplyChainToolsByCategory(slug as SupplyChainCategory);
  const allCategories = getAllSupplyChainCategories();
  const totalTools = getAllSupplyChainTools().length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Best ${category.label} Tools`,
    description: category.description,
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.name,
      description: tool.tagline,
      url: `https://finderslist.com/supply-chain-software/tools/${tool.slug}`,
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/supply-chain-software" className="hover:text-slate-300 transition-colors">Supply Chain Software</Link>
        <span>/</span>
        <span className="text-slate-300">{category.label}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-3xl">{category.emoji}</div>
            <div>
              <h1 className="text-2xl font-bold text-white">{category.label}</h1>
              <p className="text-slate-400 text-sm mt-0.5">{category.description}</p>
            </div>
          </div>
          <div className="mb-6 text-sm text-slate-500">Showing {tools.length} tool{tools.length !== 1 ? "s" : ""}</div>
          <CategoryGuide guide={(category as { guide?: string }).guide} />
          {tools.length === 0 ? (
            <div className="text-center py-16 text-slate-500">No tools in this category yet.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool as never} basePath="/supply-chain-software" />
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
                const info = SUPPLY_CHAIN_CATEGORIES[cat];
                const isActive = cat === slug;
                return (
                  <Link key={cat} href={`/supply-chain-software/category/${cat}`}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}>
                    <span>{info.emoji}</span><span>{info.label}</span>
                  </Link>
                );
              })}
            </div>
            <div className="mt-6"><AdBanner format="rectangle" className="h-64 w-full" /></div>
            <div className="mt-6 rounded-xl border border-white/10 bg-slate-900/50 p-4 text-center">
              <p className="text-sm text-slate-400 mb-3">Know a great tool?</p>
              <Link href="/supply-chain-software" className="block w-full rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors text-center">Browse All</Link>
              <p className="text-xs text-slate-600 mt-2">{totalTools} tools listed</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
