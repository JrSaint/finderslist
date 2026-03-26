import { notFound } from "next/navigation";
import { getEmailToolsByCategory, EMAIL_CATEGORIES, getAllEmailCategories, getAllEmailTools } from "@/lib/email-tools";
import type { EmailCategory } from "@/lib/email-tools";
import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";
import type { Metadata } from "next";

interface Props { params: Promise<{ slug: string }>; }

export async function generateStaticParams() {
  return getAllEmailCategories().map((cat) => ({ slug: cat }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = EMAIL_CATEGORIES[slug as EmailCategory];
  if (!category) return {};
  const tools = getEmailToolsByCategory(slug as EmailCategory);
  return {
    title: `Best ${category.label} Tools (2026) — ${tools.length} Options Compared`,
    description: `Discover the best ${category.label.toLowerCase()} tools in 2026. ${tools.length} top tools with honest reviews, pricing, and real-world use cases.`,
    alternates: { canonical: `https://finderslist.com/email-tools/category/${slug}` },
  };
}

export default async function EmailCategoryPage({ params }: Props) {
  const { slug } = await params;
  if (!EMAIL_CATEGORIES[slug as EmailCategory]) notFound();
  const category = EMAIL_CATEGORIES[slug as EmailCategory];
  const tools = getEmailToolsByCategory(slug as EmailCategory);
  const allCategories = getAllEmailCategories();
  const totalTools = getAllEmailTools().length;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/email-tools" className="hover:text-slate-300 transition-colors">Email Tools</Link>
        <span>/</span>
        <span className="text-slate-300">{category.label}</span>
      </nav>
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-3xl">{category.emoji}</div>
            <div>
              <h1 className="text-2xl font-bold text-white">{category.label}</h1>
              <p className="text-slate-400 text-sm mt-0.5">{category.description}</p>
            </div>
          </div>
          <div className="mb-6 text-sm text-slate-500">Showing {tools.length} tool{tools.length !== 1 ? "s" : ""}</div>
          {tools.length === 0 ? (
            <div className="text-center py-16 text-slate-500">No tools in this category yet. <Link href="/email-tools/submit" className="text-red-400 hover:text-red-300">Submit one!</Link></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tools.map((tool) => (<ToolCard key={tool.slug} tool={tool as never} basePath="/email-tools" />))}
            </div>
          )}
          <div className="mt-10"><AdBanner slot="1122334459" format="horizontal" className="h-24 w-full" /></div>
        </div>
        <aside className="lg:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">All Categories</h3>
            <div className="space-y-1">
              {allCategories.map((cat) => {
                const info = EMAIL_CATEGORIES[cat];
                const isActive = cat === slug;
                return (
                  <Link key={cat} href={`/email-tools/category/${cat}`} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? "bg-red-500/20 text-red-300 border border-red-500/30" : "text-slate-400 hover:text-white hover:bg-white/5"}`}>
                    <span>{info.emoji}</span>
                    <span>{info.label}</span>
                  </Link>
                );
              })}
            </div>
            <div className="mt-6"><AdBanner slot="5544332215" format="rectangle" className="h-64 w-full" /></div>
            <div className="mt-6 rounded-xl border border-white/10 bg-slate-900/50 p-4 text-center">
              <p className="text-sm text-slate-400 mb-3">Know a great tool?</p>
              <Link href="/email-tools/submit" className="block w-full rounded-lg bg-red-600 hover:bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors text-center">Submit a Tool</Link>
              <p className="text-xs text-slate-600 mt-2">{totalTools} tools listed</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
