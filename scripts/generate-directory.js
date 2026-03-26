#!/usr/bin/env node
/**
 * Generates boilerplate lib + app files for a new FindersList directory.
 * Usage: node scripts/generate-directory.js <config.json>
 *
 * Config format: { directories: [{ slug, typePrefix, upperPrefix, accentColor, gradient, displayName, shortName, seoTitle, seoDescription, seoKeywords }] }
 */

const fs = require("fs");
const path = require("path");

const configPath = process.argv[2];
if (!configPath) {
  console.error("Usage: node scripts/generate-directory.js <config.json>");
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
const root = path.resolve(__dirname, "..");

for (const dir of config.directories) {
  const {
    slug,
    typePrefix,
    upperPrefix,
    accentColor,
    gradient,
    displayName,
    shortName,
    seoTitle,
    seoDescription,
    seoKeywords,
  } = dir;

  // ── Lib file ──────────────────────────────────────────────────────
  const libContent = `import {
  ${upperPrefix}_TOOLS,
  ${upperPrefix}_CATEGORIES,
  type ${typePrefix}Tool,
  type ${typePrefix}Category,
} from "@/data/${slug}";

export { ${upperPrefix}_TOOLS, ${upperPrefix}_CATEGORIES };
export type { ${typePrefix}Tool, ${typePrefix}Category };

export function getAll${typePrefix}Tools(): ${typePrefix}Tool[] {
  return ${upperPrefix}_TOOLS;
}

export function getFeatured${typePrefix}Tools(): ${typePrefix}Tool[] {
  return ${upperPrefix}_TOOLS.filter((t) => t.featured);
}

export function get${typePrefix}ToolBySlug(slug: string): ${typePrefix}Tool | undefined {
  return ${upperPrefix}_TOOLS.find((t) => t.slug === slug);
}

export function get${typePrefix}ToolsByCategory(category: ${typePrefix}Category): ${typePrefix}Tool[] {
  return ${upperPrefix}_TOOLS.filter((t) => t.category === category);
}

export function getAll${typePrefix}Categories(): ${typePrefix}Category[] {
  return Object.keys(${upperPrefix}_CATEGORIES) as ${typePrefix}Category[];
}

export function get${typePrefix}CategoryCount(category: ${typePrefix}Category): number {
  return ${upperPrefix}_TOOLS.filter((t) => t.category === category).length;
}

export const ${upperPrefix}_PRICING_LABELS: Record<${typePrefix}Tool["pricing"], string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

export const ${upperPrefix}_PRICING_COLORS: Record<${typePrefix}Tool["pricing"], string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-sky-500/20 text-sky-300 border-sky-500/30",
};

export const ${upperPrefix}_ROLES = {} as const;

export type ${typePrefix}RoleKey = keyof typeof ${upperPrefix}_ROLES;

export function filter${typePrefix}Tools({
  query,
  pricing,
  role,
}: {
  query?: string;
  pricing?: string;
  role?: string;
}): ${typePrefix}Tool[] {
  let tools = ${upperPrefix}_TOOLS;

  if (query && query.trim().length > 0) {
    const q = query.toLowerCase();
    tools = tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }

  if (pricing && ["free", "freemium", "paid"].includes(pricing)) {
    tools = tools.filter((t) => t.pricing === pricing);
  }

  return tools;
}
`;

  const libPath = path.join(root, "lib", `${slug}.ts`);
  fs.writeFileSync(libPath, libContent);
  console.log(`✓ lib/${slug}.ts`);

  // ── Main page ─────────────────────────────────────────────────────
  const ac = accentColor; // shorthand
  const mainPage = `import Link from "next/link";
import {
  getFeatured${typePrefix}Tools,
  getAll${typePrefix}Tools,
  getAll${typePrefix}Categories,
  ${upperPrefix}_CATEGORIES,
  get${typePrefix}CategoryCount,
  filter${typePrefix}Tools,
} from "@/lib/${slug}";
import ToolCard from "@/components/ToolCard";
import SearchBar from "@/components/SearchBar";
import AdBanner from "@/components/AdBanner";
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
    return { robots: { index: false, follow: false } };
  }
  return {
    title: ${JSON.stringify(seoTitle)},
    description: ${JSON.stringify(seoDescription)},
    keywords: ${JSON.stringify(seoKeywords)},
    alternates: { canonical: "https://finderslist.com/${slug}" },
  };
}

export default async function ${typePrefix}Page({ searchParams }: Props) {
  const { q, pricing, role } = await searchParams;
  const featured = getFeatured${typePrefix}Tools();
  const allTools = getAll${typePrefix}Tools();
  const categories = getAll${typePrefix}Categories();

  const isFiltering = !!(q || pricing || role);
  const filteredTools = isFiltering
    ? filter${typePrefix}Tools({ query: q, pricing, role })
    : allTools;

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(14,165,233,0.2),transparent)] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-${ac}-500/30 to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-${ac}-500/30 bg-${ac}-500/10 px-4 py-1.5 text-sm text-${ac}-300 backdrop-blur-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-${ac}-400 animate-pulse" />
            {allTools.length}+ curated ${displayName.toLowerCase()}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
            <span className="text-white">Find the Right </span>
            <span className="bg-gradient-to-r from-${ac}-400 via-${ac}-400 to-${ac}-300 bg-clip-text text-transparent">
              ${shortName}
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            The most comprehensive directory of ${displayName.toLowerCase()}. Compare top tools with honest reviews, pricing, and real-world use cases.
          </p>
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar large basePath="/${slug}" />
          </div>
          <div className="flex items-center justify-center gap-6 sm:gap-10 flex-wrap">
            {[
              { value: \`\${allTools.length}+\`, label: "Tools" },
              { value: \`\${categories.length}\`, label: "Categories" },
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
        <AdBanner slot="1234567893" format="horizontal" className="mt-8 h-24 w-full" />

        <section className="mt-10 p-5 rounded-2xl border border-white/8 bg-slate-900/30">
          <Suspense fallback={null}>
            <GenericFilterBar
              roles={{}}
              basePath="/${slug}"
              resultCount={filteredTools.length}
              accentClass="bg-${ac}-600 border-${ac}-500 shadow-${ac}-500/20"
            />
          </Suspense>
        </section>

        {isFiltering ? (
          <section className="mt-10 mb-16">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {q ? \`Results for "\\$\\{q}"\` : \`\${pricing?.charAt(0).toUpperCase()}\${pricing?.slice(1)} Tools\`}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {filteredTools.length} tool{filteredTools.length !== 1 ? "s" : ""} found
                </p>
              </div>
            </div>
            {filteredTools.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                <p className="text-4xl mb-4">🔍</p>
                <p className="text-lg font-medium text-slate-300 mb-2">No tools found</p>
                <p className="text-sm mb-6">Try a different search term or clear your filters</p>
                <Link href="/${slug}" className="text-${ac}-400 hover:text-${ac}-300 text-sm font-medium">Clear all filters →</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool as never} basePath="/${slug}" />
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
                  const info = ${upperPrefix}_CATEGORIES[cat];
                  const count = get${typePrefix}CategoryCount(cat);
                  return (
                    <Link
                      key={cat}
                      href={\`/${slug}/category/\${cat}\`}
                      className="flex flex-col gap-1.5 p-4 rounded-xl border border-white/8 bg-slate-900/40 hover:bg-slate-800/60 hover:border-${ac}-500/30 transition-all group"
                    >
                      <span className="text-2xl">{info.emoji}</span>
                      <span className="text-sm font-medium text-white group-hover:text-${ac}-300 transition-colors leading-tight">{info.label}</span>
                      <span className="text-xs text-slate-600">{count} tools</span>
                    </Link>
                  );
                })}
              </div>
            </section>

            <section className="mt-14">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-semibold text-white">Featured Tools</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Hand-picked by our team</p>
                </div>
                <span className="text-xs text-slate-600">{featured.length} tools</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {featured.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool as never} basePath="/${slug}" />
                ))}
              </div>
            </section>

            <div className="mt-12">
              <AdBanner slot="0987654324" format="rectangle" className="h-64 w-full max-w-lg mx-auto" />
            </div>

            <section className="mt-12 mb-16">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-semibold text-white">All Tools</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Complete directory</p>
                </div>
                <span className="text-xs text-slate-600">{allTools.length} tools</span>
              </div>
              <div className="flex flex-col gap-2">
                {allTools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool as never} variant="compact" basePath="/${slug}" />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
`;

  const appDir = path.join(root, "app", slug);
  fs.mkdirSync(appDir, { recursive: true });
  fs.writeFileSync(path.join(appDir, "page.tsx"), mainPage);
  console.log(`✓ app/${slug}/page.tsx`);

  // ── Category page ─────────────────────────────────────────────────
  const categoryPage = `import { notFound } from "next/navigation";
import {
  get${typePrefix}ToolsByCategory,
  ${upperPrefix}_CATEGORIES,
  getAll${typePrefix}Categories,
  getAll${typePrefix}Tools,
} from "@/lib/${slug}";
import type { ${typePrefix}Category } from "@/lib/${slug}";
import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAll${typePrefix}Categories().map((cat) => ({ slug: cat }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = ${upperPrefix}_CATEGORIES[slug as ${typePrefix}Category];
  if (!category) return {};
  const tools = get${typePrefix}ToolsByCategory(slug as ${typePrefix}Category);
  return {
    title: \`Best \${category.label} Tools (2026) — \${tools.length} Options Compared\`,
    description: \`Discover the best \${category.label.toLowerCase()} tools in 2026. We've curated \${tools.length} top tools with honest reviews, pricing breakdowns, and real-world use cases.\`,
    keywords: [\`\${category.label} tools\`, \`best \${category.label} tools 2026\`, ${JSON.stringify(displayName.toLowerCase())}, category.label],
    alternates: { canonical: \`https://finderslist.com/${slug}/category/\${slug}\` },
  };
}

export default async function ${typePrefix}CategoryPage({ params }: Props) {
  const { slug } = await params;

  if (!${upperPrefix}_CATEGORIES[slug as ${typePrefix}Category]) notFound();

  const category = ${upperPrefix}_CATEGORIES[slug as ${typePrefix}Category];
  const tools = get${typePrefix}ToolsByCategory(slug as ${typePrefix}Category);
  const allCategories = getAll${typePrefix}Categories();
  const totalTools = getAll${typePrefix}Tools().length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: \`Best \${category.label} Tools\`,
    description: category.description,
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.name,
      description: tool.tagline,
      url: \`https://finderslist.com/${slug}/tools/\${tool.slug}\`,
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/${slug}" className="hover:text-slate-300 transition-colors">${displayName}</Link>
        <span>/</span>
        <span className="text-slate-300">{category.label}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-${ac}-500/10 border border-${ac}-500/20 flex items-center justify-center text-3xl">{category.emoji}</div>
            <div>
              <h1 className="text-2xl font-bold text-white">{category.label}</h1>
              <p className="text-slate-400 text-sm mt-0.5">{category.description}</p>
            </div>
          </div>
          <div className="mb-6 text-sm text-slate-500">Showing {tools.length} tool{tools.length !== 1 ? "s" : ""}</div>
          {tools.length === 0 ? (
            <div className="text-center py-16 text-slate-500">No tools in this category yet.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool as never} basePath="/${slug}" />
              ))}
            </div>
          )}
          <div className="mt-10"><AdBanner slot="1122334458" format="horizontal" className="h-24 w-full" /></div>
        </div>

        <aside className="lg:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">All Categories</h3>
            <div className="space-y-1">
              {allCategories.map((cat) => {
                const info = ${upperPrefix}_CATEGORIES[cat];
                const isActive = cat === slug;
                return (
                  <Link key={cat} href={\`/${slug}/category/\${cat}\`}
                    className={\`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors \${
                      isActive ? "bg-${ac}-500/20 text-${ac}-300 border border-${ac}-500/30" : "text-slate-400 hover:text-white hover:bg-white/5"
                    }\`}>
                    <span>{info.emoji}</span><span>{info.label}</span>
                  </Link>
                );
              })}
            </div>
            <div className="mt-6"><AdBanner slot="5544332214" format="rectangle" className="h-64 w-full" /></div>
            <div className="mt-6 rounded-xl border border-white/10 bg-slate-900/50 p-4 text-center">
              <p className="text-sm text-slate-400 mb-3">Know a great tool?</p>
              <Link href="/${slug}" className="block w-full rounded-lg bg-${ac}-600 hover:bg-${ac}-500 px-4 py-2 text-sm font-medium text-white transition-colors text-center">Browse All</Link>
              <p className="text-xs text-slate-600 mt-2">{totalTools} tools listed</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
`;

  const catDir = path.join(appDir, "category", "[slug]");
  fs.mkdirSync(catDir, { recursive: true });
  fs.writeFileSync(path.join(catDir, "page.tsx"), categoryPage);
  console.log(`✓ app/${slug}/category/[slug]/page.tsx`);

  // ── Tool detail page ──────────────────────────────────────────────
  const toolPage = `import { notFound } from "next/navigation";
import {
  get${typePrefix}ToolBySlug,
  getAll${typePrefix}Tools,
  get${typePrefix}ToolsByCategory,
  ${upperPrefix}_CATEGORIES,
  ${upperPrefix}_PRICING_LABELS,
  ${upperPrefix}_PRICING_COLORS,
} from "@/lib/${slug}";
import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAll${typePrefix}Tools().map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = get${typePrefix}ToolBySlug(slug);
  if (!tool) return {};
  const category = ${upperPrefix}_CATEGORIES[tool.category];
  return {
    title: \`\${tool.name} Review (2026) — Pricing, Pros & Cons\`,
    description: \`\${tool.tagline}. Honest review of \${tool.name}: pros, cons, pricing, and real-world use cases.\`,
    keywords: [tool.name, ...tool.tags, category.label],
    openGraph: {
      title: \`\${tool.name} Review 2026 | FindersList\`,
      description: \`\${tool.tagline}. See honest pros, cons, pricing, and use cases.\`,
    },
    alternates: { canonical: \`https://finderslist.com/${slug}/tools/\${tool.slug}\` },
  };
}

export default async function ${typePrefix}ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = get${typePrefix}ToolBySlug(slug);
  if (!tool) notFound();

  const category = ${upperPrefix}_CATEGORIES[tool.category];
  const relatedTools = get${typePrefix}ToolsByCategory(tool.category).filter((t) => t.slug !== tool.slug).slice(0, 4);
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
        <Link href="/${slug}" className="hover:text-slate-300 transition-colors">${displayName}</Link>
        <span>/</span>
        <Link href={\`/${slug}/category/\${tool.category}\`} className="hover:text-slate-300 transition-colors">{category.label}</Link>
        <span>/</span>
        <span className="text-slate-300">{tool.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 min-w-0">
          <div className={\`rounded-2xl overflow-hidden mb-8 bg-gradient-to-br \${category.gradient} border border-white/10\`}>
            <div className="relative p-8">
              <div className="absolute inset-0 bg-slate-950/50" />
              <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 overflow-hidden backdrop-blur-sm shadow-xl">
                  {tool.domain ? (
                    <img src={\`https://www.google.com/s2/favicons?domain=\${tool.domain}&sz=128\`} alt={tool.name} width={56} height={56} className="object-contain" />
                  ) : (
                    <span className="text-4xl">{tool.logo}</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h1 className="text-3xl font-bold text-white">{tool.name}</h1>
                    {tool.featured && <span className="text-xs bg-${ac}-500/30 text-${ac}-200 border border-${ac}-400/30 rounded-full px-2.5 py-0.5">Featured</span>}
                    <span className={\`text-xs border rounded-full px-2.5 py-0.5 \${${upperPrefix}_PRICING_COLORS[tool.pricing]}\`}>{${upperPrefix}_PRICING_LABELS[tool.pricing]}</span>
                  </div>
                  <p className="text-lg text-white/80 mb-3 leading-snug">{tool.tagline}</p>
                  <Link href={\`/${slug}/category/\${tool.category}\`} className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white/90 transition-colors">
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
            <a href={visitUrl} target="_blank" rel="noopener noreferrer nofollow" className="flex items-center justify-center gap-2 rounded-xl bg-${ac}-600 hover:bg-${ac}-500 px-6 py-3 font-semibold text-white transition-colors">
              Visit {tool.name}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 mb-5">
            <h2 className="text-base font-semibold text-white mb-3">About {tool.name}</h2>
            <p className="text-slate-400 leading-relaxed">{tool.description}</p>
          </div>

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
                <div className="rounded-2xl border border-${ac}-500/20 bg-${ac}-500/5 p-5">
                  <h2 className="text-sm font-semibold text-${ac}-400 mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Watch Out For
                  </h2>
                  <ul className="space-y-2">{tool.cons.map((con, i) => (<li key={i} className="flex items-start gap-2 text-sm text-slate-300"><span className="text-${ac}-500 mt-0.5 flex-shrink-0">!</span>{con}</li>))}</ul>
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
                    <div className="w-6 h-6 rounded-full bg-${ac}-500/20 border border-${ac}-500/30 flex items-center justify-center flex-shrink-0 text-xs font-bold text-${ac}-400 mt-0.5">{i + 1}</div>
                    <p className="text-sm text-slate-300 leading-relaxed">{useCase}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <p className="text-xs text-slate-500 mb-1.5">Pricing Model</p>
              <p className="text-sm font-semibold text-white mb-1">{${upperPrefix}_PRICING_LABELS[tool.pricing]}</p>
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

          <AdBanner slot="2233445569" format="horizontal" className="h-24 w-full mb-8" />

          {relatedTools.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-white">More {category.label} Tools</h2>
                <Link href={\`/${slug}/category/\${tool.category}\`} className="text-xs text-${ac}-400 hover:text-${ac}-300 transition-colors">See all →</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedTools.map((t) => (<ToolCard key={t.slug} tool={t as never} basePath="/${slug}" />))}
              </div>
            </section>
          )}
        </div>

        <aside className="lg:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-4">
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <p className="text-sm font-medium text-white mb-3">Quick Access</p>
              <a href={visitUrl} target="_blank" rel="noopener noreferrer nofollow" className="block w-full rounded-lg bg-${ac}-600 hover:bg-${ac}-500 px-4 py-2.5 text-sm font-medium text-white transition-colors text-center">Open {tool.name} →</a>
              <p className="text-xs text-slate-600 mt-2 text-center">{${upperPrefix}_PRICING_LABELS[tool.pricing]} · {category.label}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <p className="text-sm font-medium text-white mb-2">💰 Pricing</p>
              <span className={\`inline-flex text-xs border rounded-full px-2.5 py-1 mb-2 \${${upperPrefix}_PRICING_COLORS[tool.pricing]}\`}>{${upperPrefix}_PRICING_LABELS[tool.pricing]}</span>
              <p className="text-xs text-slate-500 leading-relaxed">{pricingDetail}</p>
            </div>
            {tool.pros && tool.pros.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
                <p className="text-sm font-medium text-white mb-3">Top Strengths</p>
                <ul className="space-y-2">{tool.pros.slice(0, 3).map((pro, i) => (<li key={i} className="flex items-start gap-2 text-xs text-slate-400"><span className="text-emerald-500 flex-shrink-0 mt-0.5">✓</span>{pro}</li>))}</ul>
              </div>
            )}
            <AdBanner slot="6677889903" format="rectangle" className="h-64 w-full" />
            <div className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
              <p className="text-sm font-medium text-white mb-3">{category.emoji} Browse {category.label}</p>
              <Link href={\`/${slug}/category/\${tool.category}\`} className="block w-full rounded-lg border border-white/10 hover:border-${ac}-500/30 hover:bg-slate-800 px-4 py-2.5 text-sm text-slate-400 hover:text-white transition-all text-center">See all tools →</Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
`;

  const toolDir = path.join(appDir, "tools", "[slug]");
  fs.mkdirSync(toolDir, { recursive: true });
  fs.writeFileSync(path.join(toolDir, "page.tsx"), toolPage);
  console.log(`✓ app/${slug}/tools/[slug]/page.tsx`);
}

console.log(`\nDone! Generated ${config.directories.length * 4} files for ${config.directories.length} directories.`);
