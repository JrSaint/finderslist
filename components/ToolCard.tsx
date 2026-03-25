"use client";

import Link from "next/link";
import { useState } from "react";
import { Tool, CATEGORIES, PRICING_LABELS, PRICING_COLORS } from "@/lib/tools";

interface ToolCardProps {
  tool: Tool;
  variant?: "default" | "compact";
}

function ToolLogo({ tool, size = "md" }: { tool: Tool; size?: "sm" | "md" | "lg" }) {
  const [imgError, setImgError] = useState(false);
  const sizeClass = size === "lg" ? "text-4xl" : size === "sm" ? "text-lg" : "text-2xl";
  const imgSize = size === "lg" ? 48 : size === "sm" ? 24 : 32;

  if (tool.domain && !imgError) {
    return (
      <img
        src={`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=${imgSize * 2}`}
        alt={tool.name}
        width={imgSize}
        height={imgSize}
        className="object-contain"
        onError={() => setImgError(true)}
        style={{ imageRendering: "auto" }}
      />
    );
  }

  return <span className={sizeClass}>{tool.logo}</span>;
}

export default function ToolCard({ tool, variant = "default" }: ToolCardProps) {
  const category = CATEGORIES[tool.category];

  if (variant === "compact") {
    return (
      <Link
        href={`/ai-tools/tools/${tool.slug}`}
        className="flex items-center gap-4 p-3.5 rounded-xl border border-white/8 bg-slate-900/40 hover:bg-slate-800/60 hover:border-violet-500/25 transition-all group"
      >
        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-slate-800/80 border border-white/10 flex items-center justify-center overflow-hidden">
          <ToolLogo tool={tool} size="sm" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors truncate">
              {tool.name}
            </span>
            {tool.featured && (
              <span className="flex-shrink-0 text-xs bg-violet-500/15 text-violet-300 border border-violet-500/25 rounded-full px-2 py-0.5">
                Featured
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 truncate mt-0.5">{tool.tagline}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`text-xs border rounded-full px-2 py-0.5 ${PRICING_COLORS[tool.pricing]}`}>
            {PRICING_LABELS[tool.pricing]}
          </span>
          <svg className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/ai-tools/tools/${tool.slug}`}
      className="relative flex flex-col p-5 rounded-2xl border border-white/8 bg-slate-900/40 hover:bg-slate-800/50 hover:border-violet-500/30 transition-all group overflow-hidden"
    >
      {/* subtle gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-fuchsia-500/0 group-hover:from-violet-500/5 group-hover:to-fuchsia-500/5 transition-all pointer-events-none rounded-2xl" />

      <div className="relative flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center overflow-hidden shadow-sm">
          <ToolLogo tool={tool} size="md" />
        </div>
        <div className="flex items-center gap-2">
          {tool.featured && (
            <span className="text-xs bg-violet-500/15 text-violet-300 border border-violet-500/25 rounded-full px-2 py-0.5">
              Featured
            </span>
          )}
          <span className={`text-xs border rounded-full px-2 py-0.5 ${PRICING_COLORS[tool.pricing]}`}>
            {PRICING_LABELS[tool.pricing]}
          </span>
        </div>
      </div>

      <h3 className="relative text-base font-semibold text-white group-hover:text-violet-300 transition-colors mb-1">
        {tool.name}
      </h3>
      <p className="relative text-sm text-slate-400 mb-4 leading-relaxed line-clamp-2">{tool.tagline}</p>

      <div className="relative mt-auto flex items-center justify-between">
        <span className="text-xs text-slate-500 flex items-center gap-1.5">
          <span>{category.emoji}</span>
          <span>{category.label}</span>
        </span>
        <span className="text-xs text-slate-600 group-hover:text-violet-400 transition-colors flex items-center gap-0.5">
          View
          <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
