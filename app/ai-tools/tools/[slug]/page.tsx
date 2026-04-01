import { notFound } from "next/navigation";
import { getToolBySlug, getAllTools, getToolsByCategory, CATEGORIES, PRICING_LABELS, PRICING_COLORS, ROLES, type RoleKey } from "@/lib/tools";
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
  const category = CATEGORIES[tool.category];
  return {
    title: `${tool.name} Review (2025) — Pricing, Pros & Cons`,
    description: `${tool.tagline}. Honest review of ${tool.name}: pros, cons, pricing, and real-world use cases. Is it worth it in 2025?`,
    keywords: [tool.name, ...tool.tags, category.label, "AI tool review", "AI tools 2025"],
    openGraph: {
      title: `${tool.name} Review 2025 | FindersList`,
      description: `${tool.tagline}. See honest pros, cons, pricing, and use cases.`,
    },
    alternates: {
      canonical: `https://finderslist.com/ai-tools/tools/${tool.slug}`,
    },
  };
}

// Derive "Best for" roles from the tool's category/tags
function getBestForRoles(tool: ReturnType<typeof getToolBySlug>) {
  if (!tool) return [];
  return (Object.entries(ROLES) as [RoleKey, typeof ROLES[RoleKey]][])
    .filter(([, config]) =>
      (config.categories as readonly string[]).includes(tool.category) ||
      tool.tags.some((tag) =>
        config.tags.some((rt) => tag.toLowerCase().includes(rt.toLowerCase()))
      )
    )
    .map(([key, config]) => ({ key, ...config }));
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
  const bestForRoles = getBestForRoles(tool);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    url: tool.url,
    applicationCategory: "AIApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: tool.pricing === "free" ? "0" : undefined,
      priceCurrency: "USD",
      availability: "https://schema.org/OnlineOnly",
    },
    keywords: tool.tags.join(", "),
  };

  const pricingDetail = {
    free: "100% free to use — no credit card required.",
    freemium: "Free plan available. Paid plans unlock advanced features.",
    paid: "Paid subscription required. Check the website for current pricing.",
  }[tool.pricing];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 flex-wrap">
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

          {/* Hero Banner */}
          <div className={`rounded-2xl overflow-hidden mb-8 bg-gradient-to-br ${category.gradient} border border-white/10`}>
            <div className="relative p-8">
              <div className="absolute inset-0 bg-slate-950/50" />
              <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
                {/* Logo */}
                <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 overflow-hidden backdrop-blur-sm shadow-xl">
                  {tool.domain ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=128`}
                      alt={tool.name}
                      width={56}
                      height={56}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-4xl">{tool.logo}</span>
                  )}
                </div>
                {/* Title area */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h1 className="text-3xl font-bold text-white">{tool.name}</h1>
                    {tool.featured && (
                      <span className="text-xs bg-violet-500/30 text-violet-200 border border-violet-400/30 rounded-full px-2.5 py-0.5">
                        Featured
                      </span>
                    )}
                    <span className={`text-xs border rounded-full px-2.5 py-0.5 ${PRICING_COLORS[tool.pricing]}`}>
                      {PRICING_LABELS[tool.pricing]}
                    </span>
                  </div>
                  <p className="text-lg text-white/80 mb-3 leading-snug">{tool.tagline}</p>
                  <Link
                    href={`/ai-tools/category/${tool.category}`}
                    className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white/90 transition-colors"
                  >
                    <span>{category.emoji}</span>
                    <span>{category.label}</span>
                  </Link>
                </div>
                {/* CTA on desktop */}
                <div className="hidden sm:flex flex-col gap-2 flex-shrink-0">
                  <a
                    href={visitUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-slate-100 px-5 py-2.5 font-semibold text-slate-900 transition-colors text-sm whitespace-nowrap"
                  >
                    Visit {tool.name}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  {tool.affiliateUrl && (
                    <p className="text-xs text-white/30 text-center">* Affiliate link</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile CTA */}
          <div className="sm:hidden mb-6">
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
          </div>

          {/* About */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 mb-5">
            <h2 className="text-base font-semibold text-white mb-3">About {tool.name}</h2>
            <p className="text-slate-400 leading-relaxed">{tool.description}</p>
          </div>

          {/* Pros & Cons */}
          {(tool.pros || tool.cons) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              {tool.pros && tool.pros.length > 0 && (
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                  <h2 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    What&apos;s Great
                  </h2>
                  <ul className="space-y-2">
                    {tool.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {tool.cons && tool.cons.length > 0 && (
                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
                  <h2 className="text-sm font-semibold text-amber-400 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Watch Out For
                  </h2>
                  <ul className="space-y-2">
                    {tool.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-amber-500 mt-0.5 flex-shrink-0">!</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Use Cases */}
          {tool.useCases && tool.useCases.length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 mb-5">
              <h2 className="text-base font-semibold text-white mb-4">Common Use Cases</h2>
              <div className="space-y-3">
                {tool.useCases.map((useCase, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0 text-xs font-bold text-violet-400 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">{useCase}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Best for */}
          {bestForRoles.length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 mb-5">
              <h2 className="text-base font-semibold text-white mb-4">Best For</h2>
              <div className="flex flex-wrap gap-2">
                {bestForRoles.map((role) => (
                  <Link
                    key={role.key}
                    href={`/ai-tools?role=${role.key}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-slate-800/60 hover:border-violet-500/30 hover:bg-slate-700/60 text-sm text-slate-300 hover:text-white transition-all"
                  >
                    <span>{role.emoji}</span>
                    {role.label}
                  </Link>
                ))}
              </div>
              <p className="text-xs text-slate-600 mt-3">
                Click a role to find similar tools for that audience.
              </p>
            </div>
          )}

          {/* Details grid */}

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
              <p className="text-sm font-semibold text-white mb-1">{PRICING_LABELS[tool.pricing]}</p>
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
                {tool.tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-slate-500 bg-slate-800 border border-white/8 rounded-full px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <AdBanner format="horizontal" className="h-24 w-full mb-8" />

          {/* Related tools */}
          {relatedTools.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-white">
                  More {category.label} Tools
                </h2>
                <Link
                  href={`/ai-tools/category/${tool.category}`}
                  className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
                >
                  See all →
                </Link>
              </div>
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
                {PRICING_LABELS[tool.pricing]} · {category.label}
              </p>
            </div>

            {/* Pricing detail */}
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <p className="text-sm font-medium text-white mb-2">💰 Pricing</p>
              <span className={`inline-flex text-xs border rounded-full px-2.5 py-1 mb-2 ${PRICING_COLORS[tool.pricing]}`}>
                {PRICING_LABELS[tool.pricing]}
              </span>
              <p className="text-xs text-slate-500 leading-relaxed">{pricingDetail}</p>
            </div>

            {/* Quick pros summary */}
            {tool.pros && tool.pros.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
                <p className="text-sm font-medium text-white mb-3">Top Strengths</p>
                <ul className="space-y-2">
                  {tool.pros.slice(0, 3).map((pro, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="text-emerald-500 flex-shrink-0 mt-0.5">✓</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <AdBanner format="rectangle" className="h-64 w-full" />

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
