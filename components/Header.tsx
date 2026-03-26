"use client";

import Link from "next/link";
import { useState } from "react";
import { CATEGORIES, getAllCategories } from "@/lib/tools";
import { MARKETING_CATEGORIES, getAllMarketingCategories } from "@/lib/marketing-tools";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const aiCategories = getAllCategories();
  const marketingCategories = getAllMarketingCategories();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🔍</span>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-white">Finders</span>
              <span className="text-violet-400">List</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {/* AI Tools dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown("ai")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/ai-tools"
                className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1"
              >
                🤖 AI Tools
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              {activeDropdown === "ai" && (
                <div className="absolute top-full left-0 mt-2 w-56 rounded-xl border border-white/10 bg-slate-900 shadow-2xl">
                  {aiCategories.map((cat) => {
                    const info = CATEGORIES[cat];
                    return (
                      <Link
                        key={cat}
                        href={`/ai-tools/category/${cat}`}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 first:rounded-t-xl last:rounded-b-xl transition-colors"
                      >
                        <span>{info.emoji}</span>
                        <span>{info.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Marketing Tools dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDropdown("marketing")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/marketing-tools"
                className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1"
              >
                📈 Marketing Tools
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              {activeDropdown === "marketing" && (
                <div className="absolute top-full left-0 mt-2 w-56 rounded-xl border border-white/10 bg-slate-900 shadow-2xl">
                  {marketingCategories.map((cat) => {
                    const info = MARKETING_CATEGORIES[cat];
                    return (
                      <Link
                        key={cat}
                        href={`/marketing-tools/category/${cat}`}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 first:rounded-t-xl last:rounded-b-xl transition-colors"
                      >
                        <span>{info.emoji}</span>
                        <span>{info.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/ai-tools/submit"
              className="rounded-lg bg-violet-600 hover:bg-violet-500 px-4 py-2 text-sm font-medium text-white transition-colors"
            >
              + Submit a Tool
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-slate-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 py-4 space-y-1">
            <p className="px-2 py-1 text-xs text-slate-600 uppercase tracking-wider">AI Tools</p>
            <Link href="/ai-tools" className="block px-2 py-2 text-sm text-slate-400 hover:text-white" onClick={() => setMenuOpen(false)}>
              🤖 Browse All AI Tools
            </Link>
            {aiCategories.map((cat) => (
              <Link
                key={cat}
                href={`/ai-tools/category/${cat}`}
                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-500 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                <span>{CATEGORIES[cat].emoji}</span>
                <span>{CATEGORIES[cat].label}</span>
              </Link>
            ))}
            <p className="px-2 py-1 mt-3 text-xs text-slate-600 uppercase tracking-wider">Marketing Tools</p>
            <Link href="/marketing-tools" className="block px-2 py-2 text-sm text-slate-400 hover:text-white" onClick={() => setMenuOpen(false)}>
              📈 Browse All Marketing Tools
            </Link>
            {marketingCategories.map((cat) => (
              <Link
                key={cat}
                href={`/marketing-tools/category/${cat}`}
                className="flex items-center gap-2 px-4 py-2 text-sm text-slate-500 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                <span>{MARKETING_CATEGORIES[cat].emoji}</span>
                <span>{MARKETING_CATEGORIES[cat].label}</span>
              </Link>
            ))}
            <div className="pt-2 border-t border-white/5 mt-2">
              <Link href="/ai-tools/submit" className="block px-2 py-2 text-sm text-slate-400 hover:text-white" onClick={() => setMenuOpen(false)}>Submit a Tool</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
