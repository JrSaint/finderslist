import { notFound } from "next/navigation";
import {
  getBankruptcyLawyerToolBySlug,
  getAllBankruptcyLawyerTools,
  getBankruptcyLawyerToolsByCategory,
  BANKRUPTCY_LAWYER_CATEGORIES,
  BANKRUPTCY_LAWYER_PRICING_LABELS,
  BANKRUPTCY_LAWYER_PRICING_COLORS,
} from "@/lib/bankruptcy-lawyers";
import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBankruptcyLawyerTools().map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getBankruptcyLawyerToolBySlug(slug);
  if (!tool) return {};
  const category = BANKRUPTCY_LAWYER_CATEGORIES[tool.category];
  return {
    title: `${tool.name} Review (2026) — Specialties, Pros & Cons`,
    description: `${tool.tagline}. Honest review of ${tool.name}: strengths, considerations, specialties, and real-world case focus.`,
    keywords: [tool.name, ...tool.tags, category.label],
    openGraph: {
      title: `${tool.name} Review 2026 | FindersList`,
      description: `${tool.tagline}. See honest pros, cons, specialties, and case focus.`,
    },
    alternates: { canonical: `https://finderslist.com/bankruptcy-lawyers/tools/${tool.slug}` },
  };
}

export default async function BankruptcyLawyerToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getBankruptcyLawyerToolBySlug(slug);
  if (!tool) notFound();

  const category = BANKRUPTCY_LAWYER_CATEGORIES[tool.category];
  const relatedTools = getBankruptcyLawyerToolsByCategory(tool.category).filter((t) => t.slug !== tool.slug).slice(0, 4);
  const visitUrl = tool.affiliateUrl || tool.url;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: tool.name,
    description: tool.description,
    url: tool.url,
    serviceType: "Bankruptcy & Debt Relief Law",
    keywords: tool.tags.join(", "),
  };

  const pricingDetail = {
    free: "Free consultation — most bankruptcy firms work on flat fees or offer free initial evaluations.",
    freemium: "Free initial resources with optional paid services.",
    paid: "Paid service. Check the website for current fee structures and consultation options.",
  }[tool.pricing];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/bankruptcy-lawyers" className="hover:text-slate-300 transition-colors">Bankruptcy Lawyers</Link>
        <span>/</span>
        <Link href={`/bankruptcy-lawyers/category/${tool.category}`} className="hover:text-slate-300 transition-colors">{category.label}</Link>
        <span>/</span>
        <span className="text-slate-300">{tool.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 min-w-0">
          <div className={`rounded-2xl overflow-hidden mb-8 bg-gradient-to-br ${category.gradient} border border-white/10`}>
            <div className="p-8">
              <div className="flex items-start gap-5 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-4xl flex-shrink-0">{tool.logo}</div>
                <div className="min-w-0">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">{tool.name}</h1>
                  <p className="text-slate-300 text-sm leading-relaxed">{tool.tagline}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${BANKRUPTCY_LAWYER_PRICING_COLORS[tool.pricing]}`}>
                  {BANKRUPTCY_LAWYER_PRICING_LABELS[tool.pricing]}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-white/5 text-slate-300 border-white/10">
                  {category.emoji} {category.label}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-3">Overview</h2>
            <p className="text-slate-400 leading-relaxed whitespace-pre-line">{tool.description}</p>
          </div>

          <AdBanner format="horizontal" className="mb-8 h-24 w-full" />

          {tool.pros && tool.pros.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-3">Strengths</h2>
              <ul className="space-y-2">
                {tool.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-400 text-sm">
                    <span className="text-emerald-400 mt-0.5 flex-shrink-0">+</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tool.cons && tool.cons.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-3">Considerations</h2>
              <ul className="space-y-2">
                {tool.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-400 text-sm">
                    <span className="text-amber-400 mt-0.5 flex-shrink-0">-</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tool.useCases && tool.useCases.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-3">Best For</h2>
              <ul className="space-y-2">
                {tool.useCases.map((useCase, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-400 text-sm">
                    <span className="text-blue-400 mt-0.5 flex-shrink-0">*</span>
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-8 p-5 rounded-xl border border-white/8 bg-slate-900/40">
            <h2 className="text-sm font-semibold text-white mb-2">Pricing</h2>
            <p className="text-slate-400 text-sm">{pricingDetail}</p>
          </div>
        </div>

        <div className="lg:w-80 flex-shrink-0 space-y-6">
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5">
            <a
              href={visitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors mb-4"
            >
              Visit {tool.name} →
            </a>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Category</span>
                <span className="text-slate-300">{category.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pricing</span>
                <span className="text-slate-300">{BANKRUPTCY_LAWYER_PRICING_LABELS[tool.pricing]}</span>
              </div>
              {tool.domain && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Website</span>
                  <span className="text-slate-300">{tool.domain}</span>
                </div>
              )}
            </div>
          </div>

          <AdBanner format="rectangle" className="h-64 w-full" />

          {relatedTools.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">Related in {category.label}</h3>
              <div className="space-y-2">
                {relatedTools.map((t) => (
                  <ToolCard key={t.slug} tool={t as never} variant="compact" basePath="/bankruptcy-lawyers" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
