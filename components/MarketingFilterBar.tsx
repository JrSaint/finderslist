"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { MARKETING_ROLES, type MarketingRoleKey } from "@/lib/marketing-tools";

const PRICING_FILTERS = [
  { value: "", label: "All Pricing" },
  { value: "free", label: "Free", color: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20" },
  { value: "freemium", label: "Freemium", color: "text-violet-400 border-violet-500/40 bg-violet-500/10 hover:bg-violet-500/20" },
  { value: "paid", label: "Paid", color: "text-amber-400 border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20" },
];

export default function MarketingFilterBar({ resultCount }: { resultCount: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPricing = searchParams.get("pricing") || "";
  const currentRole = searchParams.get("role") || "";
  const currentQuery = searchParams.get("q") || "";

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/marketing-tools?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const clearAll = () => {
    router.push("/marketing-tools", { scroll: false });
  };

  const hasFilters = currentPricing || currentRole || currentQuery;

  return (
    <div className="space-y-4">
      {/* Best For */}
      <div>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2.5">Best For</p>
        <div className="flex flex-wrap gap-2">
          {(Object.entries(MARKETING_ROLES) as [MarketingRoleKey, typeof MARKETING_ROLES[MarketingRoleKey]][]).map(([key, role]) => {
            const isActive = currentRole === key;
            return (
              <button
                key={key}
                onClick={() => updateParam("role", isActive ? "" : key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${
                  isActive
                    ? "bg-emerald-600 border-emerald-500 text-white shadow-sm shadow-emerald-500/20"
                    : "border-white/10 text-slate-400 hover:border-white/20 hover:text-white bg-slate-900/50"
                }`}
              >
                <span>{role.emoji}</span>
                {role.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pricing */}
      <div>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2.5">Pricing</p>
        <div className="flex flex-wrap gap-2">
          {PRICING_FILTERS.map((f) => {
            const isActive = currentPricing === f.value;
            return (
              <button
                key={f.value}
                onClick={() => updateParam("pricing", isActive ? "" : f.value)}
                className={`px-3 py-1.5 rounded-full border text-sm font-medium transition-all ${
                  isActive
                    ? f.value
                      ? `${f.color} shadow-sm`
                      : "bg-slate-700 border-slate-600 text-white"
                    : f.value
                    ? `${f.color} opacity-70`
                    : "border-white/10 text-slate-400 hover:border-white/20 hover:text-white bg-slate-900/50"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results + Clear */}
      {hasFilters && (
        <div className="flex items-center justify-between pt-1">
          <p className="text-sm text-slate-400">
            <span className="font-semibold text-white">{resultCount}</span> tool{resultCount !== 1 ? "s" : ""} found
          </p>
          <button
            onClick={clearAll}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
