import Link from "next/link";

interface ComparisonTool {
  slug: string;
  name: string;
  tagline: string;
  pricing: "free" | "freemium" | "paid";
  category: string;
  logo: string;
  domain?: string;
}

interface ComparisonTableProps {
  tools: ComparisonTool[];
  categories: Record<string, { label: string; emoji: string }>;
  basePath: string;
}

const PRICING_LABELS: Record<string, string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

const PRICING_COLORS: Record<string, string> = {
  free: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  freemium: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  paid: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

export default function ComparisonTable({ tools, categories, basePath }: ComparisonTableProps) {
  if (tools.length === 0) return null;

  return (
    <section className="mt-14">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold text-white">Quick Comparison</h2>
          <p className="text-xs text-slate-500 mt-0.5">Featured tools at a glance</p>
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl border border-white/8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8 bg-slate-900/60">
              <th className="text-left text-xs font-medium text-slate-400 px-4 py-3 whitespace-nowrap">Tool</th>
              <th className="text-left text-xs font-medium text-slate-400 px-4 py-3 whitespace-nowrap">Category</th>
              <th className="text-left text-xs font-medium text-slate-400 px-4 py-3 whitespace-nowrap">Pricing</th>
              <th className="text-left text-xs font-medium text-slate-400 px-4 py-3">Best For</th>
            </tr>
          </thead>
          <tbody>
            {tools.map((tool, i) => {
              const cat = categories[tool.category] ?? { emoji: "🔧", label: tool.category };
              return (
                <tr
                  key={tool.slug}
                  className={`border-b border-white/5 hover:bg-slate-800/40 transition-colors ${i % 2 === 0 ? "bg-slate-900/30" : "bg-slate-900/10"}`}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Link
                      href={`${basePath}/tools/${tool.slug}`}
                      className="flex items-center gap-2.5 text-white hover:text-violet-300 transition-colors font-medium"
                    >
                      {tool.domain ? (
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=32`}
                          alt=""
                          width={16}
                          height={16}
                          className="object-contain shrink-0"
                        />
                      ) : (
                        <span className="text-base shrink-0">{tool.logo}</span>
                      )}
                      {tool.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span>{cat.emoji}</span>
                      <span>{cat.label}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`text-xs border rounded-full px-2 py-0.5 ${PRICING_COLORS[tool.pricing] ?? ""}`}>
                      {PRICING_LABELS[tool.pricing] ?? tool.pricing}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 max-w-xs truncate">
                    {tool.tagline}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
