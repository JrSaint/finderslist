import Link from "next/link";
import { getFeaturedTools, getAllTools, getAllCategories, CATEGORIES, getCategoryCount } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";
import SearchBar from "@/components/SearchBar";
import AdBanner from "@/components/AdBanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tools Directory",
  description:
    "Discover the best AI tools for writing, coding, image generation, video, productivity, and more. Browse 25+ curated AI tools.",
};

export default function AIToolsPage() {
  const featured = getFeaturedTools();
  const allTools = getAllTools();
  const categories = getAllCategories();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/40 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-300">
            <span className="inline-block w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            {allTools.length}+ AI tools and growing
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            <span className="text-white">Find the Right </span>
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              AI Tool
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
            The most comprehensive directory of AI tools. Discover, compare, and find exactly the right AI for any task.
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchBar large />
          </div>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm text-slate-500 flex-wrap">
            <span>Writing</span>
            <span>·</span>
            <span>Coding</span>
            <span>·</span>
            <span>Image Gen</span>
            <span>·</span>
            <span>Video & Audio</span>
            <span>·</span>
            <span>Productivity</span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Ad Banner */}
        <div className="mt-8">
          <AdBanner slot="1234567890" format="horizontal" className="h-24 w-full" />
        </div>

        {/* Categories */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-white mb-5">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.map((cat) => {
              const info = CATEGORIES[cat];
              const count = getCategoryCount(cat);
              return (
                <Link
                  key={cat}
                  href={`/ai-tools/category/${cat}`}
                  className="flex flex-col gap-1 p-4 rounded-xl border border-white/10 bg-slate-900/50 hover:bg-slate-800/70 hover:border-violet-500/30 transition-all group"
                >
                  <span className="text-2xl">{info.emoji}</span>
                  <span className="text-sm font-medium text-white group-hover:text-violet-300 transition-colors">
                    {info.label}
                  </span>
                  <span className="text-xs text-slate-500">{count} tools</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Featured Tools */}
        <section className="mt-14">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-white">Featured Tools</h2>
            <span className="text-sm text-slate-500">{featured.length} tools</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>

        {/* Mid-page Ad */}
        <div className="mt-12">
          <AdBanner slot="0987654321" format="rectangle" className="h-64 w-full max-w-lg mx-auto" />
        </div>

        {/* All Tools */}
        <section className="mt-12 mb-16">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-white">All Tools</h2>
            <span className="text-sm text-slate-500">{allTools.length} tools</span>
          </div>
          <div className="flex flex-col gap-2">
            {allTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} variant="compact" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
