"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";

interface IndexEntry {
  slug: string;
  name: string;
  tagline: string;
  logo: string;
  directory: string;
  directoryLabel: string;
  tags: string[];
}

// Module-scoped cache so a second mount (route change) doesn't refetch.
let cachedIndex: IndexEntry[] | null = null;
let inflight: Promise<IndexEntry[]> | null = null;

async function loadIndex(): Promise<IndexEntry[]> {
  if (cachedIndex) return cachedIndex;
  if (inflight) return inflight;
  inflight = fetch("/api/search-index")
    .then((r) => r.json())
    .then((data: IndexEntry[]) => {
      cachedIndex = data;
      return data;
    })
    .catch(() => [])
    .finally(() => {
      inflight = null;
    });
  return inflight;
}

function score(entry: IndexEntry, q: string): number {
  const name = entry.name.toLowerCase();
  const tagline = entry.tagline.toLowerCase();
  const dir = entry.directoryLabel.toLowerCase();
  // Highest weight: name prefix, then name contains, then tagline, then directory, then tags.
  if (name.startsWith(q)) return 100;
  if (name.includes(q)) return 80;
  if (tagline.includes(q)) return 50;
  if (dir.includes(q)) return 30;
  if (entry.tags.some((t) => t.toLowerCase().includes(q))) return 20;
  return 0;
}

export default function GlobalSearchBar() {
  const [index, setIndex] = useState<IndexEntry[]>(cachedIndex ?? []);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Lazy-load the index on first focus.
  async function ensureIndex() {
    if (cachedIndex) return;
    const data = await loadIndex();
    setIndex(data);
  }

  // Close on outside click.
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Keyboard shortcut: / focuses the search bar (skip when typing in another input).
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "/") return;
      const t = e.target as HTMLElement;
      if (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable) return;
      e.preventDefault();
      inputRef.current?.focus();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return index
      .map((e) => ({ entry: e, s: score(e, q) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 8)
      .map((x) => x.entry);
  }, [query, index]);

  useEffect(() => {
    setHighlighted(0);
  }, [query]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => (h + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => (h - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const r = results[highlighted];
      if (r) {
        window.location.href = `/${r.directory}/tools/${r.slug}`;
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  return (
    <div ref={ref} className="relative w-full max-w-xs xl:max-w-sm">
      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-800/80 backdrop-blur px-3 py-1.5 focus-within:border-violet-500/50 transition-colors">
        <svg className="w-4 h-4 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          aria-label="Search all tools across directories"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            ensureIndex();
            setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search all tools..."
          className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none text-sm min-w-0"
        />
        {query ? (
          <button
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
              setOpen(false);
              inputRef.current?.focus();
            }}
            className="text-slate-500 hover:text-slate-300"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        ) : (
          <kbd className="hidden md:inline-block text-[10px] text-slate-500 border border-white/10 rounded px-1.5 py-0.5">/</kbd>
        )}
      </div>

      {open && query.trim().length >= 2 && (
        <div
          role="listbox"
          aria-label="Search results"
          className="absolute top-full left-0 right-0 mt-2 rounded-xl border border-white/10 bg-slate-900 shadow-2xl z-50 overflow-hidden"
        >
          {results.length === 0 ? (
            <div className="px-4 py-3 text-sm text-slate-500">
              {index.length === 0 ? "Loading index..." : `No results for "${query}"`}
            </div>
          ) : (
            results.map((tool, i) => (
              <Link
                key={`${tool.directory}/${tool.slug}`}
                href={`/${tool.directory}/tools/${tool.slug}`}
                onClick={() => {
                  setQuery("");
                  setOpen(false);
                }}
                onMouseEnter={() => setHighlighted(i)}
                className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
                  i === highlighted ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <span className="text-lg flex-shrink-0">{tool.logo}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{tool.name}</p>
                  <p className="text-xs text-slate-500 truncate">{tool.tagline}</p>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-violet-400 whitespace-nowrap flex-shrink-0">
                  {tool.directoryLabel}
                </span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
