import { notFound } from "next/navigation";
import {
  getBankruptcyLawyerToolsByCategory,
  BANKRUPTCY_LAWYER_CATEGORIES,
  getAllBankruptcyLawyerCategories,
  getAllBankruptcyLawyerTools,
} from "@/lib/bankruptcy-lawyers";
import type { BankruptcyLawyerCategory } from "@/lib/bankruptcy-lawyers";
import ToolCard from "@/components/ToolCard";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBankruptcyLawyerCategories().map((cat) => ({ slug: cat }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = BANKRUPTCY_LAWYER_CATEGORIES[slug as BankruptcyLawyerCategory];
  if (!category) return {};
  const tools = getBankruptcyLawyerToolsByCategory(slug as BankruptcyLawyerCategory);
  return {
    title: `Best ${category.label} (2026) — ${tools.length} Firms Compared`,
    description: `Discover the best ${category.label.toLowerCase()} in 2026. We've curated ${tools.length} top firms with honest profiles, specialties, and real-world case results.`,
    keywords: [`${category.label}`, `best ${category.label} 2026`, "bankruptcy lawyer", "bankruptcy attorney", category.label],
    alternates: { canonical: `https://finderslist.com/bankruptcy-lawyers/category/${slug}` },
  };
}

export default async function BankruptcyLawyerCategoryPage({ params }: Props) {
  const { slug } = await params;

  if (!BANKRUPTCY_LAWYER_CATEGORIES[slug as BankruptcyLawyerCategory]) notFound();

  const category = BANKRUPTCY_LAWYER_CATEGORIES[slug as BankruptcyLawyerCategory];
  const tools = getBankruptcyLawyerToolsByCategory(slug as BankruptcyLawyerCategory);
  const allCategories = getAllBankruptcyLawyerCategories();
  const totalTools = getAllBankruptcyLawyerTools().length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Best ${category.label}`,
    description: category.description,
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.name,
      description: tool.tagline,
      url: `https://finderslist.com/bankruptcy-lawyers/tools/${tool.slug}`,
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/bankruptcy-lawyers" className="hover:text-slate-300 transition-colors">Bankruptcy Lawyers</Link>
        <span>/</span>
        <span className="text-slate-300">{category.label}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-3xl">{category.emoji}</div>
            <div>
              <h1 className="text-2xl font-bold text-white">{category.label}</h1>
              <p className="text-slate-400 text-sm mt-0.5">{category.description}</p>
            </div>
          </div>
          <div className="mb-6 text-sm text-slate-500">Showing {tools.length} firm{tools.length !== 1 ? "s" : ""}</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool as never} basePath="/bankruptcy-lawyers" />
            ))}
          </div>

          <AdBanner slot="1234567898" format="horizontal" className="mt-10 h-24 w-full" />
        </div>

        <div className="lg:w-72 flex-shrink-0">
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5">
            <h3 className="text-sm font-semibold text-white mb-3">All Specialties</h3>
            <ul className="space-y-1.5">
              {allCategories.map((cat) => {
                const info = BANKRUPTCY_LAWYER_CATEGORIES[cat];
                const isActive = cat === slug;
                return (
                  <li key={cat}>
                    <Link
                      href={`/bankruptcy-lawyers/category/${cat}`}
                      className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg transition-colors ${
                        isActive ? "bg-blue-500/10 text-blue-300 border border-blue-500/20" : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span>{info.emoji}</span>
                      <span>{info.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link href="/bankruptcy-lawyers" className="mt-4 block text-center text-xs text-slate-500 hover:text-blue-400 transition-colors">
              ← View all {totalTools} firms
            </Link>
          </div>

          <AdBanner slot="0987654329" format="rectangle" className="mt-6 h-64 w-full" />
        </div>
      </div>
    </div>
  );
}
