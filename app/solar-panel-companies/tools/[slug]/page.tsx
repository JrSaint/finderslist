import { notFound } from "next/navigation";
import {
  getSolarPanelToolBySlug,
  getAllSolarPanelTools,
  getSolarPanelToolsByCategory,
  SOLAR_PANEL_CATEGORIES,
  SOLAR_PANEL_PRICING_LABELS,
  SOLAR_PANEL_PRICING_COLORS,
} from "@/lib/solar-panel-companies";
import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import AuthorBadge from "@/components/AuthorBadge";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSolarPanelTools().map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getSolarPanelToolBySlug(slug);
  if (!tool) return {};
  const category = SOLAR_PANEL_CATEGORIES[tool.category];
  return {
    title: `${tool.name} Review (2026) — Pricing, Pros & Cons`,
    description: `${tool.tagline}. Honest review of ${tool.name}: pros, cons, pricing, and real-world use cases.`,
    keywords: [tool.name, ...tool.tags, category.label],
    openGraph: {
      title: `${tool.name} Review 2026 | FindersList`,
      description: `${tool.tagline}. See honest pros, cons, pricing, and use cases.`,
    },
    alternates: { canonical: `https://finderslist.com/solar-panel-companies/tools/${tool.slug}` },
  };
}

export default async function SolarPanelToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getSolarPanelToolBySlug(slug);
  if (!tool) notFound();

  const category = SOLAR_PANEL_CATEGORIES[tool.category];
  const relatedTools = getSolarPanelToolsByCategory(tool.category).filter((t) => t.slug !== tool.slug).slice(0, 4);
  const visitUrl = tool.affiliateUrl || tool.url;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    url: tool.url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: tool.pricing === "free" ? "0" : undefined, priceCurrency: "USD", availability: "https://schema.org/OnlineOnly" },
    keywords: tool.tags.join(", "),
    author: { "@type": "Organization", name: "FindersList Editorial Team", url: "https://finderslist.com/about" },
  };

  const pricingDetail = {
    free: "100% free to use — no credit card required.",
    freemium: "Free plan available. Paid plans unlock advanced features and higher limits.",
    paid: "Paid subscription required. Check the website for current pricing and free trials.",
  }[tool.pricing];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/solar-panel-companies" className="hover:text-slate-300 transition-colors">Solar Panel Companies</Link>
        <span>/</span>
        <Link href={`/solar-panel-companies/category/${tool.category}`} className="hover:text-slate-300 transition-colors">{category.label}</Link>
        <span>/</span>
        <span className="text-slate-300">{tool.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 min-w-0">
          <div className={`rounded-2xl overflow-hidden mb-8 bg-gradient-to-br ${category.gradient} border border-white/10`}>
            <div className="relative p-8">
              <div className="absolute inset-0 bg-slate-950/50" />
              <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 overflow-hidden backdrop-blur-sm shadow-xl">
                  {tool.domain ? (
                    <img src={`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=128`} alt={tool.name} width={56} height={56} className="object-contain" />
                  ) : (
                    <span className="text-4xl">{tool.logo}</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h1 className="text-3xl font-bold text-white">{tool.name}</h1>
                    {tool.featured && <span className="text-xs bg-amber-500/30 text-amber-200 border border-amber-400/30 rounded-full px-2.5 py-0.5">Featured</span>}
                    <span className={`text-xs border rounded-full px-2.5 py-0.5 ${SOLAR_PANEL_PRICING_COLORS[tool.pricing]}`}>{SOLAR_PANEL_PRICING_LABELS[tool.pricing]}</span>
                  </div>
                  <p className="text-lg text-white/80 mb-3 leading-snug">{tool.tagline}</p>
                  <Link href={`/solar-panel-companies/category/${tool.category}`} className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white/90 transition-colors">
                    <span>{category.emoji}</span><span>{category.label}</span>
                  </Link>
                </div>
                <div className="hidden sm:flex flex-col gap-2 flex-shrink-0">
                  <a href={visitUrl} target="_blank" rel="noopener noreferrer nofollow" className="flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-slate-100 px-5 py-2.5 font-semibold text-slate-900 transition-colors text-sm whitespace-nowrap">
                    Visit {tool.name}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                  {tool.affiliateUrl && <p className="text-xs text-white/30 text-center">* Affiliate link</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="sm:hidden mb-6">
            <a href={visitUrl} target="_blank" rel="noopener noreferrer nofollow" className="flex items-center justify-center gap-2 rounded-xl bg-amber-600 hover:bg-amber-500 px-6 py-3 font-semibold text-white transition-colors">
              Visit {tool.name}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 mb-5">
            <h2 className="text-base font-semibold text-white mb-3">About {tool.name}</h2>
            <p className="text-slate-400 leading-relaxed">{tool.description}</p>
          </div>

          <AuthorBadge />

          {(tool.pros || tool.cons) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              {tool.pros && tool.pros.length > 0 && (
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                  <h2 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    What&apos;s Great
                  </h2>
                  <ul className="space-y-2">{tool.pros.map((pro, i) => (<li key={i} className="flex items-start gap-2 text-sm text-slate-300"><span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>{pro}</li>))}</ul>
                </div>
              )}
              {tool.cons && tool.cons.length > 0 && (
                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
                  <h2 className="text-sm font-semibold text-amber-400 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Watch Out For
                  </h2>
                  <ul className="space-y-2">{tool.cons.map((con, i) => (<li key={i} className="flex items-start gap-2 text-sm text-slate-300"><span className="text-amber-500 mt-0.5 flex-shrink-0">!</span>{con}</li>))}</ul>
                </div>
              )}
            </div>
          )}

          {tool.useCases && tool.useCases.length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 mb-5">
              <h2 className="text-base font-semibold text-white mb-4">Common Use Cases</h2>
              <div className="space-y-3">
                {tool.useCases.map((useCase, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center flex-shrink-0 text-xs font-bold text-amber-400 mt-0.5">{i + 1}</div>
                    <p className="text-sm text-slate-300 leading-relaxed">{useCase}</p>
                  </div>
                ))}
              </div>
            </div>
          )}


          {!tool.pros && !tool.useCases && (
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 mb-5">
              <h2 className="text-base font-semibold text-white mb-4">Quick Facts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 mb-2 uppercase tracking-wide">Best For</p>
                  <div className="flex flex-wrap gap-1.5">
                    {tool.tags.slice(0, 5).map((tag) => (
                      <span key={tag} className="text-xs text-slate-300 bg-slate-800/80 border border-white/10 rounded-full px-2.5 py-1">{tag}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-2 uppercase tracking-wide">Pricing</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{pricingDetail}</p>
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <p className="text-xs text-slate-500 mb-1.5">Pricing Model</p>
              <p className="text-sm font-semibold text-white mb-1">{SOLAR_PANEL_PRICING_LABELS[tool.pricing]}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{pricingDetail}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <p className="text-xs text-slate-500 mb-1.5">Category</p>
              <p className="text-sm font-semibold text-white mb-1">{category.label}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{category.description}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <p className="text-xs text-slate-500 mb-1.5">Tags</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {tool.tags.slice(0, 5).map((tag) => (<span key={tag} className="text-xs text-slate-500 bg-slate-800 border border-white/8 rounded-full px-2 py-0.5">{tag}</span>))}
              </div>
            </div>
          </div>

          <AdBanner format="horizontal" className="h-24 w-full mb-8" />

          {relatedTools.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-white">More {category.label} Tools</h2>
                <Link href={`/solar-panel-companies/category/${tool.category}`} className="text-xs text-amber-400 hover:text-amber-300 transition-colors">See all →</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedTools.map((t) => (<ToolCard key={t.slug} tool={t as never} basePath="/solar-panel-companies" />))}
              </div>
            </section>
          )}
        </div>

        <aside className="lg:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-4">
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <p className="text-sm font-medium text-white mb-3">Quick Access</p>
              <a href={visitUrl} target="_blank" rel="noopener noreferrer nofollow" className="block w-full rounded-lg bg-amber-600 hover:bg-amber-500 px-4 py-2.5 text-sm font-medium text-white transition-colors text-center">Open {tool.name} →</a>
              <p className="text-xs text-slate-600 mt-2 text-center">{SOLAR_PANEL_PRICING_LABELS[tool.pricing]} · {category.label}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <p className="text-sm font-medium text-white mb-2">💰 Pricing</p>
              <span className={`inline-flex text-xs border rounded-full px-2.5 py-1 mb-2 ${SOLAR_PANEL_PRICING_COLORS[tool.pricing]}`}>{SOLAR_PANEL_PRICING_LABELS[tool.pricing]}</span>
              <p className="text-xs text-slate-500 leading-relaxed">{pricingDetail}</p>
            </div>
            {tool.pros && tool.pros.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
                <p className="text-sm font-medium text-white mb-3">Top Strengths</p>
                <ul className="space-y-2">{tool.pros.slice(0, 3).map((pro, i) => (<li key={i} className="flex items-start gap-2 text-xs text-slate-400"><span className="text-emerald-500 flex-shrink-0 mt-0.5">✓</span>{pro}</li>))}</ul>
              </div>
            )}
            <AdBanner format="rectangle" className="h-64 w-full" />
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <p className="text-sm font-medium text-white mb-3">{category.emoji} Browse {category.label}</p>
              <Link href={`/solar-panel-companies/category/${tool.category}`} className="block w-full rounded-lg border border-white/10 hover:border-amber-500/30 hover:bg-slate-800 px-4 py-2.5 text-sm text-slate-400 hover:text-white transition-all text-center">See all tools →</Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
