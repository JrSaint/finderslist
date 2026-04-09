"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { searchTools, CATEGORIES } from "@/lib/tools";
import Link from "next/link";

interface SearchableTool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  category: string;
  tags: string[];
}

interface SearchBarProps {
  large?: boolean;
  basePath?: string;
  tools?: SearchableTool[];
}

function filterTools(tools: SearchableTool[], query: string): SearchableTool[] {
  const q = query.toLowerCase();
  return tools.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.tagline.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q))
  );
}

export default function SearchBar({ large = false, basePath = "/ai-tools", tools }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchableTool[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  // Memoize category lookup for display
  const categoryMap = useMemo(() => {
    if (!tools) return null;
    const map: Record<string, { emoji: string }> = {};
    for (const t of tools) {
      if (!map[t.category]) map[t.category] = { emoji: "🔧" };
    }
    return map;
  }, [tools]);

  useEffect(() => {
    if (query.trim().length > 1) {
      if (tools) {
        setResults(filterTools(tools, query).slice(0, 6));
      } else {
        setResults(searchTools(query).slice(0, 6) as SearchableTool[]);
      }
      setOpen(true);
    } else {
      setResults([]);
      setOpen(false);
    }
  }, [query, tools]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Derive placeholder from basePath
  const dirName = basePath.replace(/^\//, "").replace(/-/g, " ");
  const placeholder = dirName ? `Search ${dirName}...` : "Search tools...";

  function getCategoryEmoji(category: string): string {
    if (categoryMap) return categoryMap[category]?.emoji ?? "🔧";
    return CATEGORIES[category as keyof typeof CATEGORIES]?.emoji ?? "🔧";
  }

  return (
    <div ref={ref} className="relative w-full">
      <div className={`flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-800/80 backdrop-blur px-4 ${large ? "py-4" : "py-2.5"} focus-within:border-violet-500/50 transition-colors`}>
        <svg className={`text-slate-500 flex-shrink-0 ${large ? "w-5 h-5" : "w-4 h-4"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          aria-label="Search tools"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={`flex-1 bg-transparent text-white placeholder-slate-500 outline-none ${large ? "text-lg" : "text-sm"}`}
          onKeyDown={(e) => {
            if (e.key === "Enter" && query.trim()) {
              setOpen(false);
              router.push(`${basePath}?q=${encodeURIComponent(query.trim())}`);
            }
          }}
        />
        {query && (
          <button aria-label="Clear search" onClick={() => { setQuery(""); setOpen(false); }} className="text-slate-500 hover:text-slate-300">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <div role="listbox" aria-label="Search results" className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-white/10 bg-slate-900 shadow-2xl z-50 overflow-hidden">
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
              <span className="text-xs text-slate-600">{getCategoryEmoji(tool.category)}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
