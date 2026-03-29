import { notFound } from "next/navigation";
import {
  getAddictionTreatmentCenterToolsByCategory,
  ADDICTION_TREATMENT_CATEGORIES,
  getAllAddictionTreatmentCenterCategories,
  getAllAddictionTreatmentCenterTools,
} from "@/lib/addiction-treatment-centers";
import type { AddictionTreatmentCategory } from "@/lib/addiction-treatment-centers";
import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllAddictionTreatmentCenterCategories().map((cat) => ({ slug: cat }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = ADDICTION_TREATMENT_CATEGORIES[slug as AddictionTreatmentCategory];
  if (!category) return {};
  const tools = getAddictionTreatmentCenterToolsByCategory(slug as AddictionTreatmentCategory);
  return {
    title: `Best ${category.label} (2026) — ${tools.length} Programs Compared`,
    description: `Discover the best ${category.label.toLowerCase()} in 2026. We've curated ${tools.length} top programs with honest profiles, treatment approaches, and real-world results.`,
    keywords: [`${category.label}`, `best ${category.label} 2026`, "addiction treatment", category.label],
    alternates: { canonical: `https://finderslist.com/addiction-treatment-centers/category/${slug}` },
  };
}

export default async function AddictionTreatmentCategoryPage({ params }: Props) {
  const { slug } = await params;

  if (!ADDICTION_TREATMENT_CATEGORIES[slug as AddictionTreatmentCategory]) notFound();

  const category = ADDICTION_TREATMENT_CATEGORIES[slug as AddictionTreatmentCategory];
  const tools = getAddictionTreatmentCenterToolsByCategory(slug as AddictionTreatmentCategory);
  const allCategories = getAllAddictionTreatmentCenterCategories();
  const totalTools = getAllAddictionTreatmentCenterTools().length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Best ${category.label}`,
    description: category.description,
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.name,
      description: tool.tagline,
      url: `https://finderslist.com/addiction-treatment-centers/tools/${tool.slug}`,
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/addiction-treatment-centers" className="hover:text-slate-300 transition-colors">Addiction Treatment Centers</Link>
        <span>/</span>
        <span className="text-slate-300">{category.label}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-3xl">{category.emoji}</div>
            <div>
              <h1 className="text-2xl font-bold text-white">{category.label}</h1>
              <p className="text-slate-400 text-sm mt-0.5">{category.description}</p>
            </div>
          </div>
          <div className="mb-6 text-sm text-slate-500">Showing {tools.length} program{tools.length !== 1 ? "s" : ""}</div>
          {tools.length === 0 ? (
            <div className="text-center py-16 text-slate-500">No programs in this category yet.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool as never} basePath="/addiction-treatment-centers" />
              ))}
            </div>
          )}
          <div className="mt-10"><AdBanner slot="1122334474" format="horizontal" className="h-24 w-full" /></div>
        </div>

        <aside className="lg:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">All Treatment Types</h3>
            <div className="space-y-1">
              {allCategories.map((cat) => {
                const info = ADDICTION_TREATMENT_CATEGORIES[cat];
                const isActive = cat === slug;
                return (
                  <Link key={cat} href={`/addiction-treatment-centers/category/${cat}`}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}>
                    <span>{info.emoji}</span><span>{info.label}</span>
                  </Link>
                );
              })}
            </div>
            <div className="mt-6"><AdBanner slot="5544332274" format="rectangle" className="h-64 w-full" /></div>
            <div className="mt-6 rounded-xl border border-white/10 bg-slate-900/50 p-4 text-center">
              <p className="text-sm text-slate-400 mb-3">Know a great center?</p>
              <Link href="/addiction-treatment-centers" className="block w-full rounded-lg bg-emerald-600 hover:bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition-colors text-center">Browse All</Link>
              <p className="text-xs text-slate-600 mt-2">{totalTools} centers listed</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
