import Link from "next/link";
import type { Metadata } from "next";
import { BLOG_POSTS } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog — FindersList",
  description:
    "In-depth guides, comparisons, and expert advice to help you choose the right tools and services. Original research and analysis from the FindersList editorial team.",
  alternates: { canonical: "https://finderslist.com/blog" },
};

export default function BlogPage() {
  const featured = BLOG_POSTS.filter((p) => p.featured);
  const recent = BLOG_POSTS.filter((p) => !p.featured);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">FindersList Blog</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          In-depth guides, head-to-head comparisons, and expert analysis to help you make better decisions.
        </p>
      </div>

      {featured.length > 0 && (
        <section className="mb-14">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featured.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-white/10 bg-slate-900/40 hover:bg-slate-800/50 hover:border-violet-500/30 transition-all overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-violet-500/15 text-violet-300 border border-violet-500/25 rounded-full px-2.5 py-0.5">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-600">{post.readingTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-violet-300 transition-colors mb-2 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">{post.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-slate-500">{post.author} · {post.publishedAt}</span>
                    <span className="text-xs text-violet-400 group-hover:translate-x-0.5 transition-transform">Read →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {recent.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">All Articles</h2>
          <div className="space-y-4">
            {recent.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex gap-6 p-5 rounded-xl border border-white/8 bg-slate-900/30 hover:bg-slate-800/40 hover:border-violet-500/25 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-slate-800 text-slate-400 border border-white/10 rounded-full px-2.5 py-0.5">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-600">{post.readingTime}</span>
                  </div>
                  <h3 className="text-base font-semibold text-white group-hover:text-violet-300 transition-colors mb-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2">{post.description}</p>
                </div>
                <div className="hidden sm:flex flex-col items-end justify-center text-xs text-slate-600 shrink-0">
                  <span>{post.publishedAt}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {BLOG_POSTS.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          <p className="text-4xl mb-4">📝</p>
          <p className="text-lg font-medium text-slate-300 mb-2">Coming soon</p>
          <p className="text-sm">We&apos;re working on in-depth guides and comparisons. Check back soon.</p>
        </div>
      )}
    </div>
  );
}
