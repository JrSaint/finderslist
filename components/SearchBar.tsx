"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { searchTools, CATEGORIES } from "@/lib/tools";
import Link from "next/link";

export default function SearchBar({ large = false, basePath = "/ai-tools" }: { large?: boolean; basePath?: string }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ReturnType<typeof searchTools>>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length > 1) {
      setResults(searchTools(query).slice(0, 6));
      setOpen(true);
    } else {
      setResults([]);
      setOpen(false);
    }
  }, [query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <div className={`flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-800/80 backdrop-blur px-4 ${large ? "py-4" : "py-2.5"} focus-within:border-violet-500/50 transition-colors`}>
        <svg className={`text-slate-500 flex-shrink-0 ${large ? "w-5 h-5" : "w-4 h-4"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            basePath.includes("marketing") ? "Search marketing tools..." :
            basePath.includes("finance") ? "Search finance tools..." :
            basePath.includes("ecommerce") ? "Search e-commerce tools..." :
            basePath.includes("productivity") ? "Search productivity tools..." :
            basePath.includes("hr") ? "Search HR tools..." :
            basePath.includes("crm") ? "Search CRM & sales tools..." :
            basePath.includes("security") ? "Search security tools..." :
            basePath.includes("website-builders") ? "Search website builders..." :
            basePath.includes("creator") ? "Search creator tools..." :
            basePath.includes("developer") ? "Search developer tools..." :
            basePath.includes("design") ? "Search design tools..." :
            basePath.includes("support") ? "Search support tools..." :
            basePath.includes("elearning") ? "Search e-learning tools..." :
            basePath.includes("analytics") ? "Search analytics tools..." :
            basePath.includes("legal") ? "Search legal tools..." :
            basePath.includes("hosting") ? "Search hosting tools..." :
            basePath.includes("social-media") ? "Search social media tools..." :
            basePath.includes("email") ? "Search email tools..." :
            basePath.includes("no-code") ? "Search no-code tools..." :
            "Search AI tools..."
          }
          className={`flex-1 bg-transparent text-white placeholder-slate-500 outline-none ${large ? "text-lg" : "text-sm"}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" && query.trim()) {
              setOpen(false);
              router.push(`${basePath}?q=${encodeURIComponent(query.trim())}`);
            }
          }}
        />
        {query && (
          <button onClick={() => { setQuery(""); setOpen(false); }} className="text-slate-500 hover:text-slate-300">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-white/10 bg-slate-900 shadow-2xl z-50 overflow-hidden">
          {results.map((tool) => (
            <Link
              key={tool.slug}
              href={`${basePath}/tools/${tool.slug}`}
              onClick={() => { setQuery(""); setOpen(false); }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
            >
              <span className="text-lg">{tool.logo}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{tool.name}</p>
                <p className="text-xs text-slate-500 truncate">{tool.tagline}</p>
              </div>
              <span className="text-xs text-slate-600">{CATEGORIES[tool.category].emoji}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
