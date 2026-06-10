import Link from "next/link";
import freshness from "@/data/_freshness.json";
import { featuredPairs, pairSegment } from "@/lib/directories";

interface ComparisonTool {
  slug: string;
  name: string;
  tagline: string;
  pricing: "free" | "freemium" | "paid";
  category: string;
  logo: string;
  domain?: string;
  status?: "active" | "rebranded" | "acquired" | "shutdown";
  startingPrice?: string;
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

// Medal tints for the top three picks; slate chip for the rest.
const RANK_STYLES = [
  "bg-amber-500/20 text-amber-300 border-amber-500/40",
  "bg-slate-400/20 text-slate-200 border-slate-400/40",
  "bg-orange-700/25 text-orange-300 border-orange-600/40",
];

export default function ComparisonTable({ tools, categories, basePath }: ComparisonTableProps) {
  if (tools.length === 0) return null;

  // Real per-directory review date from the refresh pipeline (Capterra-style
  // "Last updated" trust signal). Falls back silently when not yet reviewed.
  const updatedIso = (freshness as Record<string, string>)[basePath.replace(/^\//, "")];
  const updatedLabel = updatedIso
    ? new Date(updatedIso).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : null;

  return (
    <section className="mt-14">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold text-white">Quick Comparison</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Picked by our{" "}
            <Link href="/methodology" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">
              editors
            </Link>{" "}
            for features, value, and reputation — never for affiliate payouts
            {updatedLabel && <span className="text-slate-500"> · Listings verified {updatedLabel}</span>}
          </p>
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl border border-white/8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8 bg-slate-900/60">
              <th className="text-left text-xs font-medium text-slate-400 px-4 py-3 w-10">#</th>
              <th className="text-left text-xs font-medium text-slate-400 px-4 py-3 whitespace-nowrap">Tool</th>
              <th className="text-left text-xs font-medium text-slate-400 px-4 py-3 whitespace-nowrap">Category</th>
              <th className="text-left text-xs font-medium text-slate-400 px-4 py-3 whitespace-nowrap">Pricing</th>
              <th className="text-left text-xs font-medium text-slate-400 px-4 py-3">Best For</th>
            </tr>
          </thead>
          <tbody>
            {tools.map((tool, i) => {
              const cat = categories[tool.category] ?? { emoji: "🔧", label: tool.category };
              const isDead = tool.status === "shutdown";
              return (
                <tr
                  key={tool.slug}
                  className={`border-b border-white/5 hover:bg-slate-800/40 transition-colors ${i % 2 === 0 ? "bg-slate-900/30" : "bg-slate-900/10"} ${isDead ? "opacity-60" : ""}`}
                >
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full border text-xs font-semibold ${RANK_STYLES[i] ?? "bg-slate-800/80 text-slate-400 border-white/10"}`}
                    >
                      {i + 1}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Link
                      href={`${basePath}/tools/${tool.slug}`}
                      className="flex items-center gap-2.5 text-white hover:text-violet-300 transition-colors font-medium"
                    >
                      <span className="w-8 h-8 rounded-lg bg-slate-800/80 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                        {tool.domain ? (
                          <img
                            src={`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=64`}
                            alt=""
                            width={20}
                            height={20}
                            className="object-contain"
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <span className="text-base">{tool.logo}</span>
                        )}
                      </span>
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
                    {isDead ? (
                      <span className="text-xs border rounded-full px-2 py-0.5 bg-rose-500/15 text-rose-300 border-rose-500/30">
                        Discontinued
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5">
                        <span className={`text-xs border rounded-full px-2 py-0.5 ${PRICING_COLORS[tool.pricing] ?? ""}`}>
                          {PRICING_LABELS[tool.pricing] ?? tool.pricing}
                        </span>
                        {tool.startingPrice && tool.pricing !== "free" && (
                          <span className="text-xs text-slate-400 whitespace-nowrap">from {tool.startingPrice}</span>
                        )}
                      </span>
                    )}
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

      {(() => {
        const pairs = featuredPairs(tools).slice(0, 4);
        if (pairs.length === 0) return null;
        return (
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-500">Popular comparisons:</span>
            {pairs.map(([a, b]) => (
              <Link
                key={pairSegment(a, b)}
                href={`/compare${basePath}/${pairSegment(a, b)}`}
                className="text-xs border border-white/10 hover:border-violet-500/30 bg-slate-900/50 hover:bg-slate-800 text-slate-300 hover:text-white rounded-full px-3 py-1 transition-all"
              >
                {a.name} vs {b.name}
              </Link>
            ))}
          </div>
        );
      })()}
    </section>
  );
}
