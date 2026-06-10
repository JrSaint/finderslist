import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  DIRECTORIES,
  SITE_HOST,
  extractTools,
  featuredPairs,
  pairSegment,
  getDirectoryByRoute,
} from "@/lib/directories";

// Only pre-generated featured pairs exist — anything else 404s.
export const dynamicParams = false;

interface CompareTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  url: string;
  affiliateUrl?: string;
  pricing: "free" | "freemium" | "paid";
  featured: boolean;
  logo: string;
  domain?: string;
  pros?: string[];
  cons?: string[];
  useCases?: string[];
  startingPrice?: string;
  status?: string;
  lastReviewed?: string;
}

interface Props {
  params: Promise<{ dir: string; pair: string }>;
}

const PRICING_LABELS: Record<string, string> = { free: "Free", freemium: "Freemium", paid: "Paid" };
const PRICING_COLORS: Record<string, string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

function humanize(slug: string): string {
  return slug.split("-").map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w)).join(" ");
}

async function loadPair(dir: string, pair: string) {
  const entry = getDirectoryByRoute(dir);
  if (!entry) return null;
  const lib = await import(`@/lib/${entry.libName}`);
  const tools = extractTools<CompareTool>(lib);
  const [sa, sb] = pair.split("-vs-").length === 2 ? pair.split("-vs-") : [null, null];
  if (!sa || !sb) return null;
  const a = tools.find((t) => t.slug === sa);
  const b = tools.find((t) => t.slug === sb);
  if (!a || !b) return null;
  const rank = (t: CompareTool) => tools.findIndex((x) => x.slug === t.slug) + 1;
  // "Our pick" = the editorially higher-ranked tool (array order = rank).
  const [first, second] = rank(a) <= rank(b) ? [a, b] : [b, a];
  return { entry, tools, a, b, first, second, rankA: rank(a), rankB: rank(b), total: tools.length };
}

export async function generateStaticParams() {
  const params: { dir: string; pair: string }[] = [];
  for (const d of DIRECTORIES) {
    try {
      const lib = await import(`@/lib/${d.libName}`);
      const tools = extractTools<CompareTool>(lib);
      for (const [a, b] of featuredPairs(tools)) {
        params.push({ dir: d.route, pair: pairSegment(a, b) });
      }
    } catch {
      // skip directories that fail to load
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { dir, pair } = await params;
  const data = await loadPair(dir, pair);
  if (!data) return {};
  const { a, b, entry } = data;
  return {
    title: `${a.name} vs ${b.name} (2026) — Pricing, Pros & Cons Compared`,
    description: `${a.name} or ${b.name}? Honest side-by-side comparison: pricing, strengths, weaknesses, and who each ${entry.displayName.toLowerCase()} pick is best for.`,
    openGraph: {
      images: ["/og-image.png"],
      title: `${a.name} vs ${b.name} (2026) | FindersList`,
      description: `Side-by-side ${entry.displayName.toLowerCase()} comparison: pricing, pros, cons, and use cases.`,
    },
    alternates: { canonical: `${SITE_HOST}/compare/${dir}/${pair}` },
  };
}

function ToolColumn({ tool, rank, total, basePath }: { tool: CompareTool; rank: number; total: number; basePath: string }) {
  const visitUrl = tool.affiliateUrl || tool.url;
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        <span className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
          {tool.domain ? (
            <img
              src={`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=128`}
              alt={tool.name}
              width={36}
              height={36}
              className="object-contain"
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          ) : (
            <span className="text-3xl">{tool.logo}</span>
          )}
        </span>
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-white truncate">{tool.name}</h2>
          <p className="text-xs text-slate-500">Ranked #{rank} of {total} in this directory</p>
        </div>
      </div>
      <p className="text-sm text-slate-400 leading-relaxed mb-4">{tool.tagline}</p>
      <div className="flex items-center gap-2 mb-5">
        <span className={`text-xs border rounded-full px-2.5 py-0.5 ${PRICING_COLORS[tool.pricing]}`}>
          {PRICING_LABELS[tool.pricing]}
        </span>
        {tool.startingPrice && tool.pricing !== "free" && (
          <span className="text-xs text-slate-400">from {tool.startingPrice}</span>
        )}
      </div>
      <div className="mt-auto flex flex-col gap-2">
        <a
          href={visitUrl}
          target="_blank"
          rel={tool.affiliateUrl ? "sponsored nofollow noopener noreferrer" : "noopener noreferrer"}
          className="rounded-xl bg-violet-600 hover:bg-violet-500 px-5 py-2.5 font-semibold text-white transition-colors text-sm text-center"
        >
          Visit {tool.name}
        </a>
        <Link
          href={`${basePath}/tools/${tool.slug}`}
          className="rounded-xl border border-white/10 hover:border-violet-500/30 hover:bg-slate-800 px-5 py-2.5 text-sm text-slate-300 hover:text-white transition-all text-center"
        >
          Full {tool.name} review
        </Link>
      </div>
    </div>
  );
}

function SideBySide({ title, a, b, listA, listB, tone }: {
  title: string; a: CompareTool; b: CompareTool;
  listA?: string[]; listB?: string[];
  tone: "pro" | "con" | "use";
}) {
  if ((!listA || listA.length === 0) && (!listB || listB.length === 0)) return null;
  const mark = tone === "pro" ? "✓" : tone === "con" ? "!" : "→";
  const markColor = tone === "pro" ? "text-emerald-500" : tone === "con" ? "text-rose-400" : "text-violet-400";
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[{ t: a, list: listA }, { t: b, list: listB }].map(({ t, list }) => (
          <div key={t.slug} className="rounded-2xl border border-white/8 bg-slate-900/40 p-5">
            <p className="text-sm font-semibold text-slate-300 mb-3">{t.name}</p>
            <ul className="space-y-2">
              {(list ?? []).map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                  <span className={`${markColor} mt-0.5 flex-shrink-0`}>{mark}</span>
                  {item}
                </li>
              ))}
              {(!list || list.length === 0) && <li className="text-sm text-slate-600">—</li>}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function ComparePage({ params }: Props) {
  const { dir, pair } = await params;
  const data = await loadPair(dir, pair);
  if (!data) notFound();
  const { entry, a, b, first, second, rankA, rankB, total } = data;
  const basePath = `/${entry.route}`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_HOST },
      { "@type": "ListItem", position: 2, name: entry.displayName, item: `${SITE_HOST}${basePath}` },
      { "@type": "ListItem", position: 3, name: `${a.name} vs ${b.name}` },
    ],
  };
  const appLd = (t: CompareTool) => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: t.name,
    description: t.description,
    url: t.url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    ...(t.lastReviewed ? { dateModified: t.lastReviewed } : {}),
    offers: {
      "@type": "Offer",
      ...(t.startingPrice
        ? { price: t.startingPrice.replace(/[^0-9.]/g, ""), priceCurrency: "USD" }
        : t.pricing === "free"
        ? { price: "0", priceCurrency: "USD" }
        : {}),
      availability: "https://schema.org/OnlineOnly",
    },
  });

  const rows: [string, string, string][] = [
    ["Pricing model", PRICING_LABELS[a.pricing], PRICING_LABELS[b.pricing]],
    ["Starting price", a.startingPrice ?? (a.pricing === "free" ? "Free" : "See website"), b.startingPrice ?? (b.pricing === "free" ? "Free" : "See website")],
    ["Category", humanize(a.category), humanize(b.category)],
    ["Editorial rank", `#${rankA} of ${total}`, `#${rankB} of ${total}`],
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appLd(a)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appLd(b)) }} />

      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 flex-wrap">
        <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
        <span>/</span>
        <Link href={basePath} className="hover:text-slate-300 transition-colors">{entry.displayName}</Link>
        <span>/</span>
        <span className="text-slate-300">{a.name} vs {b.name}</span>
      </nav>

      <header className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          {a.name} <span className="text-slate-500">vs</span> {b.name}
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          An honest side-by-side comparison of two of our top {entry.displayName.toLowerCase()} picks —
          pricing, strengths, weaknesses, and who each one is really for.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <ToolColumn tool={a} rank={rankA} total={total} basePath={basePath} />
        <ToolColumn tool={b} rank={rankB} total={total} basePath={basePath} />
      </div>

      <div className="rounded-2xl border border-violet-500/25 bg-violet-500/10 px-6 py-5 mb-10">
        <p className="text-sm text-violet-200">
          <span className="font-semibold">Our pick: {first.name}.</span>{" "}
          Our editors rank {first.name} higher overall in{" "}
          <Link href={basePath} className="underline underline-offset-2 hover:text-white">{entry.displayName}</Link>
          {" "}— but {second.name} can be the better fit depending on your budget and use case below.{" "}
          <Link href="/methodology" className="underline underline-offset-2 hover:text-white">How we review</Link>
        </p>
      </div>

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-white mb-4">Compare the details</h2>
        <div className="overflow-x-auto rounded-xl border border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 bg-slate-900/60">
                <th className="text-left text-xs font-medium text-slate-400 px-4 py-3"> </th>
                <th className="text-left text-xs font-medium text-white px-4 py-3">{a.name}</th>
                <th className="text-left text-xs font-medium text-white px-4 py-3">{b.name}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, va, vb], i) => (
                <tr key={label} className={`border-b border-white/5 ${i % 2 === 0 ? "bg-slate-900/30" : "bg-slate-900/10"}`}>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{label}</td>
                  <td className="px-4 py-3 text-slate-300">{va}</td>
                  <td className="px-4 py-3 text-slate-300">{vb}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <SideBySide title="Strengths" a={a} b={b} listA={a.pros} listB={b.pros} tone="pro" />
      <SideBySide title="Watch out for" a={a} b={b} listA={a.cons} listB={b.cons} tone="con" />
      <SideBySide title="Best use cases" a={a} b={b} listA={a.useCases} listB={b.useCases} tone="use" />

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-white mb-4">About each tool</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[a, b].map((t) => (
            <div key={t.slug} className="rounded-2xl border border-white/8 bg-slate-900/40 p-5">
              <p className="text-sm font-semibold text-slate-300 mb-2">{t.name}</p>
              <p className="text-sm text-slate-400 leading-relaxed">{t.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6 text-center">
        <p className="text-sm text-slate-400 mb-3">
          Still deciding? Browse all {total} options with honest pros, cons, and pricing.
        </p>
        <Link
          href={basePath}
          className="inline-flex rounded-xl bg-violet-600 hover:bg-violet-500 px-6 py-2.5 font-semibold text-white transition-colors text-sm"
        >
          See all {entry.displayName} →
        </Link>
      </div>
    </div>
  );
}
