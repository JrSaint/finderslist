import { notFound } from "next/navigation";
import { getToolBySlug, getAllTools, getToolsByCategory, CATEGORIES, PRICING_LABELS, PRICING_COLORS } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllTools().map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: `${tool.name} — AI Tool`,
    description: tool.tagline,
    openGraph: {
      title: `${tool.name} | FindersList`,
      description: tool.tagline,
    },
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) notFound();

  const category = CATEGORIES[tool.category];
  const relatedTools = getToolsByCategory(tool.category)
    .filter((t) => t.slug !== tool.slug)
    .slice(0, 4);

  const visitUrl = tool.affiliateUrl || tool.url;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 flex-wrap">
        <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/ai-tools" className="hover:text-slate-300 transition-colors">AI Tools</Link>
        <span>/</span>
        <Link href={`/ai-tools/category/${tool.category}`} className="hover:text-slate-300 transition-colors">
          {category.label}
        </Link>
        <span>/</span>
        <span className="text-slate-300">{tool.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Tool header */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-5 mb-8">
            <div className="w-20 h-20 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center text-4xl flex-shrink-0">
              {tool.logo}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold text-white">{tool.name}</h1>
                {tool.featured && (
                  <span className="text-xs bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded-full px-2 py-0.5">
                    Featured
                  </span>
                )}
                <span className={`text-xs border rounded-full px-2 py-0.5 ${PRICING_COLORS[tool.pricing]}`}>
                  {PRICING_LABELS[tool.pricing]}
                </span>
              </div>
              <p className="text-lg text-slate-300 mb-3">{tool.tagline}</p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href={`/ai-tools/category/${tool.category}`}
                  className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-violet-300 transition-colors"
                >
                  <span>{category.emoji}</span>
                  <span>{category.label}</span>
                </Link>
                <div className="flex flex-wrap gap-1.5">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-slate-500 bg-slate-800 border border-white/10 rounded-full px-2.5 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <a
              href={visitUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-500 px-6 py-3 font-semibold text-white transition-colors"
            >
              Visit {tool.name}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            {tool.affiliateUrl && (
              <p className="text-xs text-slate-600 self-center">
                * Affiliate link — we may earn a commission
              </p>
            )}
          </div>

          {/* About */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 mb-6">
            <h2 className="text-lg font-semibold text-white mb-3">About {tool.name}</h2>
            <p className="text-slate-400 leading-relaxed">{tool.description}</p>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <p className="text-xs text-slate-500 mb-1">Pricing</p>
              <p className="text-sm font-medium text-white">{PRICING_LABELS[tool.pricing]}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <p className="text-xs text-slate-500 mb-1">Category</p>
              <p className="text-sm font-medium text-white">{category.label}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <p className="text-xs text-slate-500 mb-1">Tags</p>
              <p className="text-sm font-medium text-white">{tool.tags.length} tags</p>
            </div>
          </div>

          <AdBanner slot="2233445566" format="horizontal" className="h-24 w-full mb-8" />

          {/* Related tools */}
          {relatedTools.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-white mb-4">
                More {category.label} Tools
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedTools.map((t) => (
                  <ToolCard key={t.slug} tool={t} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-4">
            {/* Quick action */}
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <p className="text-sm font-medium text-white mb-3">Quick Access</p>
              <a
                href={visitUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="block w-full rounded-lg bg-violet-600 hover:bg-violet-500 px-4 py-2.5 text-sm font-medium text-white transition-colors text-center"
              >
                Open {tool.name} →
              </a>
              <p className="text-xs text-slate-600 mt-2 text-center">
                {PRICING_LABELS[tool.pricing]}
              </p>
            </div>

            <AdBanner slot="6677889900" format="rectangle" className="h-64 w-full" />

            {/* Browse category */}
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <p className="text-sm font-medium text-white mb-3">
                {category.emoji} Browse {category.label}
              </p>
              <Link
                href={`/ai-tools/category/${tool.category}`}
                className="block w-full rounded-lg border border-white/10 hover:border-violet-500/30 hover:bg-slate-800 px-4 py-2.5 text-sm text-slate-400 hover:text-white transition-all text-center"
              >
                See all tools →
              </Link>
            </div>

            {/* Submit CTA */}
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4 text-center">
              <p className="text-sm text-slate-400 mb-3">Know a great AI tool?</p>
              <Link
                href="/ai-tools/submit"
                className="block w-full rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/10 px-4 py-2 text-sm font-medium text-slate-300 transition-colors text-center"
              >
                Submit a Tool
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
