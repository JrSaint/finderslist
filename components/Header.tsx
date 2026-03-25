"use client";

import Link from "next/link";
import { useState } from "react";
import { CATEGORIES, getAllCategories } from "@/lib/tools";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const categories = getAllCategories();

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
            <Link
              href="/ai-tools"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              AI Tools
            </Link>
            <div className="relative group">
              <button className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                Categories
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 rounded-xl border border-white/10 bg-slate-900 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {categories.map((cat) => {
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
            </div>
            <Link
              href="/ai-tools/submit"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              Submit Tool
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/ai-tools/submit"
              className="rounded-lg bg-violet-600 hover:bg-violet-500 px-4 py-2 text-sm font-medium text-white transition-colors"
            >
              + Add Your Tool
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
            <Link href="/ai-tools" className="block px-2 py-2 text-sm text-slate-400 hover:text-white" onClick={() => setMenuOpen(false)}>AI Tools</Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/ai-tools/category/${cat}`}
                className="flex items-center gap-2 px-2 py-2 text-sm text-slate-400 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                <span>{CATEGORIES[cat].emoji}</span>
                <span>{CATEGORIES[cat].label}</span>
              </Link>
            ))}
            <Link href="/ai-tools/submit" className="block px-2 py-2 text-sm text-slate-400 hover:text-white" onClick={() => setMenuOpen(false)}>Submit Tool</Link>
          </div>
        )}
      </div>
    </header>
  );
}
