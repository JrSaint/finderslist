import Link from "next/link";
import { Tool, CATEGORIES, PRICING_LABELS, PRICING_COLORS } from "@/lib/tools";

interface ToolCardProps {
  tool: Tool;
  variant?: "default" | "compact";
}

export default function ToolCard({ tool, variant = "default" }: ToolCardProps) {
  const category = CATEGORIES[tool.category];

  if (variant === "compact") {
    return (
      <Link
        href={`/ai-tools/tools/${tool.slug}`}
        className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-slate-900/50 hover:bg-slate-800/60 hover:border-violet-500/30 transition-all group"
      >
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center text-xl">
          {tool.logo}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors truncate">
              {tool.name}
            </span>
            {tool.featured && (
              <span className="flex-shrink-0 text-xs bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded-full px-2 py-0.5">
                Featured
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 truncate">{tool.tagline}</p>
        </div>
        <span className={`flex-shrink-0 text-xs border rounded-full px-2 py-0.5 ${PRICING_COLORS[tool.pricing]}`}>
          {PRICING_LABELS[tool.pricing]}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/ai-tools/tools/${tool.slug}`}
      className="flex flex-col p-5 rounded-2xl border border-white/10 bg-slate-900/50 hover:bg-slate-800/60 hover:border-violet-500/30 transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-2xl">
          {tool.logo}
        </div>
        <div className="flex items-center gap-2">
          {tool.featured && (
            <span className="text-xs bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded-full px-2 py-0.5">
              Featured
            </span>
          )}
          <span className={`text-xs border rounded-full px-2 py-0.5 ${PRICING_COLORS[tool.pricing]}`}>
            {PRICING_LABELS[tool.pricing]}
          </span>
        </div>
      </div>

      <h3 className="text-base font-semibold text-white group-hover:text-violet-300 transition-colors mb-1">
        {tool.name}
      </h3>
      <p className="text-sm text-slate-400 mb-3 leading-relaxed line-clamp-2">{tool.tagline}</p>

      <div className="mt-auto flex items-center gap-2 flex-wrap">
        <span className="text-xs text-slate-500 flex items-center gap-1">
          {category.emoji} {category.label}
        </span>
      </div>
    </Link>
  );
}
