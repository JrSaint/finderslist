"use client";

import Link from "next/link";
import { useState } from "react";
import { Tool, CATEGORIES, PRICING_LABELS, PRICING_COLORS } from "@/lib/tools";

interface ToolCardProps {
  tool: Tool;
  variant?: "default" | "compact";
  basePath?: string;
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
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
        style={{ imageRendering: "auto" }}
      />
    );
  }

  return <span className={sizeClass}>{tool.logo}</span>;
}

// Status + pricing pill shared by both variants. Shutdown/acquired/rebranded
// replace the pricing pill — a user must see "Shut down" before any price tier.
function StatusOrPricingPill({ tool }: { tool: Tool }) {
  if (tool.status === "shutdown") {
    return (
      <span className="text-xs bg-rose-500/15 text-rose-300 border border-rose-500/30 rounded-full px-2 py-0.5 whitespace-nowrap">
        Shut down
      </span>
    );
  }
  if (tool.status === "acquired" || tool.status === "rebranded") {
    return (
      <span className="text-xs bg-amber-500/15 text-amber-300 border border-amber-500/30 rounded-full px-2 py-0.5 whitespace-nowrap capitalize">
        {tool.status}
      </span>
    );
  }
  const label =
    tool.startingPrice && tool.pricing !== "free"
      ? `From ${tool.startingPrice}`
      : PRICING_LABELS[tool.pricing];
  return (
    <span className={`text-xs border rounded-full px-2 py-0.5 whitespace-nowrap ${PRICING_COLORS[tool.pricing]}`}>
      {label}
    </span>
  );
}

// Humanize a category slug ("small-business" → "Small Business") when the
// directory's CATEGORIES record doesn't cover it.
function humanizeCategory(slug: string): string {
  return slug
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export default function ToolCard({ tool, variant = "default", basePath = "/ai-tools" }: ToolCardProps) {
  const category = CATEGORIES[tool.category] ?? { emoji: "🔧", label: humanizeCategory(tool.category) };
  const isDead = tool.status === "shutdown";
  const showFeatured = tool.featured && !isDead;

  if (variant === "compact") {
    return (
      <Link
        href={`${basePath}/tools/${tool.slug}`}
        className={`flex items-center gap-4 p-3.5 rounded-xl border border-white/8 bg-slate-900/40 hover:bg-slate-800/60 hover:border-violet-500/25 transition-all group ${isDead ? "opacity-60" : ""}`}
      >
        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-slate-800/80 border border-white/10 flex items-center justify-center overflow-hidden">
          <ToolLogo tool={tool} size="sm" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors truncate">
              {tool.name}
            </span>
            {showFeatured && (
              <span className="flex-shrink-0 text-xs bg-violet-500/15 text-violet-300 border border-violet-500/25 rounded-full px-2 py-0.5">
                Featured
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 truncate mt-0.5">{tool.tagline}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <StatusOrPricingPill tool={tool} />
          <svg className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`${basePath}/tools/${tool.slug}`}
      className={`relative flex flex-col p-5 rounded-2xl border bg-slate-900/40 hover:bg-slate-800/50 transition-all group overflow-hidden ${
        isDead
          ? "border-white/8 opacity-60 hover:border-rose-500/30"
          : showFeatured
          ? "border-violet-500/20 ring-1 ring-violet-500/30 hover:border-violet-500/40"
          : "border-white/8 hover:border-violet-500/30"
      }`}
    >
      {/* subtle gradient — always on for featured, hover-only otherwise */}
      <div
        className={`absolute inset-0 bg-gradient-to-br transition-all pointer-events-none rounded-2xl ${
          showFeatured
            ? "from-violet-500/8 to-fuchsia-500/5"
            : "from-violet-500/0 to-fuchsia-500/0 group-hover:from-violet-500/5 group-hover:to-fuchsia-500/5"
        }`}
      />

      <div className="relative flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center overflow-hidden shadow-sm">
          <ToolLogo tool={tool} size="md" />
        </div>
        <div className="flex items-center gap-2">
          {showFeatured && (
            <span className="text-xs bg-violet-500/15 text-violet-300 border border-violet-500/25 rounded-full px-2 py-0.5">
              Featured
            </span>
          )}
          <StatusOrPricingPill tool={tool} />
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
        <span className="text-xs text-slate-400 group-hover:text-violet-400 transition-colors flex items-center gap-0.5">
          View
          <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
