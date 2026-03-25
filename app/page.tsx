import Link from "next/link";
import type { Metadata } from "next";
import { getAllTools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "FindersList — Curated Directories",
  description: "FindersList hosts curated directories for AI tools, crafts, and more. Find exactly what you're looking for.",
};

const directories = [
  {
    slug: "ai-tools",
    emoji: "🤖",
    name: "AI Tools",
    description: "Discover the best AI tools for writing, coding, image generation, productivity, and more.",
    color: "from-violet-500/20 to-fuchsia-500/10",
    border: "border-violet-500/30 hover:border-violet-400/50",
    live: true,
  },
  {
    slug: "crafts",
    emoji: "🧶",
    name: "Craft Patterns",
    description: "Browse curated knitting, crochet, sewing, and craft patterns from around the web.",
    color: "from-pink-500/20 to-rose-500/10",
    border: "border-pink-500/20",
    live: false,
  },
  {
    slug: "more",
    emoji: "✨",
    name: "More Coming Soon",
    description: "New curated directories are added regularly. Check back soon.",
    color: "from-slate-700/30 to-slate-800/20",
    border: "border-white/5",
    live: false,
  },
];

export default function HubPage() {
  const toolCount = getAllTools().length;

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/30 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/15 via-transparent to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="mb-5 flex items-center justify-center gap-2">
            <span className="text-5xl">🔍</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            <span className="text-white">Finders</span>
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">List</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Curated directories for everything you&apos;re looking for. Browse our growing collection of hand-picked resources.
          </p>
        </div>
      </section>

      {/* Directories */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">Browse Directories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {directories.map((dir) => (
            dir.live ? (
              <Link
                key={dir.slug}
                href={`/${dir.slug}`}
                className={`group relative flex flex-col gap-3 p-6 rounded-2xl border bg-gradient-to-br ${dir.color} ${dir.border} transition-all`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{dir.emoji}</span>
                  <span className="text-xs bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded-full px-2.5 py-0.5">
                    Live · {toolCount}+ listings
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-violet-300 transition-colors mb-1">
                    {dir.name}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{dir.description}</p>
                </div>
                <div className="flex items-center gap-1 text-sm text-violet-400 group-hover:text-violet-300 transition-colors mt-1">
                  Browse directory
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ) : (
              <div
                key={dir.slug}
                className={`relative flex flex-col gap-3 p-6 rounded-2xl border bg-gradient-to-br ${dir.color} ${dir.border} opacity-60`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{dir.emoji}</span>
                  <span className="text-xs bg-slate-700/50 text-slate-400 border border-white/10 rounded-full px-2.5 py-0.5">
                    Coming Soon
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-300 mb-1">{dir.name}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{dir.description}</p>
                </div>
              </div>
            )
          ))}
        </div>
      </section>
    </div>
  );
}
