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
  return {
    title: `${tool.name} — AI Tool`,
    description: tool.tagline,
    openGraph: {
      title: `${tool.name} | FindersList`,
      description: tool.tagline,
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

  const pricingDetail = {
    free: "100% free to use — no credit card required.",
    freemium: "Free plan available. Paid plans unlock advanced features.",
    paid: "Paid subscription required. Check the website for current pricing.",
  }[tool.pricing];

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
            <div className="w-20 h-20 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center text-4xl flex-shrink-0 overflow-hidden">
              {tool.domain ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=64`}
                  alt={tool.name}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              ) : (
                <span>{tool.logo}</span>
              )}
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
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/ai-tools/category/${tool.category}`}
                  className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-violet-300 transition-colors"
                >
                  <span>{category.emoji}</span>
                  <span>{category.label}</span>
                </Link>
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
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 mb-5">
            <h2 className="text-base font-semibold text-white mb-3">About {tool.name}</h2>
            <p className="text-slate-400 leading-relaxed">{tool.description}</p>
          </div>

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
                {tool.tags.slice(0, 4).map((tag) => (
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

          <AdBanner slot="2233445566" format="horizontal" className="h-24 w-full mb-8" />

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
