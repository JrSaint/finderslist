"use client";

import Link from "next/link";
import { useState } from "react";
import { CATEGORIES, getAllCategories } from "@/lib/tools";
import { MARKETING_CATEGORIES, getAllMarketingCategories } from "@/lib/marketing-tools";
import { FINANCE_CATEGORIES, getAllFinanceCategories } from "@/lib/finance-tools";
import { ECOMMERCE_CATEGORIES, getAllEcommerceCategories } from "@/lib/ecommerce-tools";
import { PRODUCTIVITY_CATEGORIES, getAllProductivityCategories } from "@/lib/productivity-tools";
import { HR_CATEGORIES, getAllHRCategories } from "@/lib/hr-tools";
import { CRM_CATEGORIES, getAllCRMCategories } from "@/lib/crm-tools";
import { SECURITY_CATEGORIES, getAllSecurityCategories } from "@/lib/security-tools";
import { WEBSITE_BUILDER_CATEGORIES, getAllWebsiteBuilderCategories } from "@/lib/website-builders";
import { CREATOR_CATEGORIES, getAllCreatorCategories } from "@/lib/creator-tools";
import { DEVELOPER_CATEGORIES, getAllDeveloperCategories } from "@/lib/developer-tools";
import { DESIGN_CATEGORIES, getAllDesignCategories } from "@/lib/design-tools";
import { SUPPORT_CATEGORIES, getAllSupportCategories } from "@/lib/support-tools";
import { ELEARNING_CATEGORIES, getAllElearningCategories } from "@/lib/elearning-tools";
import { ANALYTICS_CATEGORIES, getAllAnalyticsCategories } from "@/lib/analytics-tools";
import { LEGAL_CATEGORIES, getAllLegalCategories } from "@/lib/legal-tools";
import { HOSTING_CATEGORIES, getAllHostingCategories } from "@/lib/hosting-tools";
import { SOCIAL_MEDIA_CATEGORIES, getAllSocialMediaCategories } from "@/lib/social-media-tools";
import { EMAIL_CATEGORIES, getAllEmailCategories } from "@/lib/email-tools";
import { NO_CODE_CATEGORIES, getAllNoCodeCategories } from "@/lib/no-code-tools";

const PRIMARY_NAV = [
  { key: "ai", label: "🤖 AI Tools", href: "/ai-tools" },
  { key: "marketing", label: "📈 Marketing", href: "/marketing-tools" },
  { key: "finance", label: "💰 Finance", href: "/finance-tools" },
  { key: "ecommerce", label: "🛍️ E-commerce", href: "/ecommerce-tools" },
  { key: "productivity", label: "⚡ Productivity", href: "/productivity-tools" },
  { key: "hr", label: "👥 HR", href: "/hr-tools" },
] as const;

const MORE_DIRECTORIES = [
  { key: "crm", label: "🤝 CRM & Sales", href: "/crm-tools" },
  { key: "security", label: "🔒 Security", href: "/security-tools" },
  { key: "website-builders", label: "🌐 Website Builders", href: "/website-builders" },
  { key: "creator", label: "🎬 Creator Tools", href: "/creator-tools" },
  { key: "developer", label: "💻 Developer Tools", href: "/developer-tools" },
  { key: "design", label: "🎨 Design Tools", href: "/design-tools" },
  { key: "support", label: "🎧 Customer Support", href: "/support-tools" },
  { key: "elearning", label: "🎓 eLearning", href: "/elearning-tools" },
  { key: "analytics", label: "📊 Analytics", href: "/analytics-tools" },
  { key: "legal", label: "⚖️ Legal Tools", href: "/legal-tools" },
  { key: "hosting", label: "☁️ Hosting & Cloud", href: "/hosting-tools" },
  { key: "social-media", label: "📱 Social Media", href: "/social-media-tools" },
  { key: "email", label: "✉️ Email Marketing", href: "/email-tools" },
  { key: "no-code", label: "🔧 No-Code Tools", href: "/no-code-tools" },
] as const;

type PrimaryNavKey = typeof PRIMARY_NAV[number]["key"];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<PrimaryNavKey | "more" | null>(null);

  const aiCategories = getAllCategories();
  const marketingCategories = getAllMarketingCategories();
  const financeCategories = getAllFinanceCategories();
  const ecommerceCategories = getAllEcommerceCategories();
  const productivityCategories = getAllProductivityCategories();
  const hrCategories = getAllHRCategories();

  function getPrimaryCategories(key: PrimaryNavKey) {
    switch (key) {
      case "ai": return aiCategories.map((c) => ({ slug: c, ...CATEGORIES[c] }));
      case "marketing": return marketingCategories.map((c) => ({ slug: c, ...MARKETING_CATEGORIES[c] }));
      case "finance": return financeCategories.map((c) => ({ slug: c, ...FINANCE_CATEGORIES[c] }));
      case "ecommerce": return ecommerceCategories.map((c) => ({ slug: c, ...ECOMMERCE_CATEGORIES[c] }));
      case "productivity": return productivityCategories.map((c) => ({ slug: c, ...PRODUCTIVITY_CATEGORIES[c] }));
      case "hr": return hrCategories.map((c) => ({ slug: c, ...HR_CATEGORIES[c] }));
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <img src="/FindersListLogo.png" alt="FindersList" width={28} height={28} className="rounded-md" />
            <span className="text-xl font-bold tracking-tight">
              <span className="text-white">Finders</span>
              <span className="text-violet-400">List</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {PRIMARY_NAV.map((item) => {
              const cats = getPrimaryCategories(item.key);
              return (
                <div
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.key)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1 px-2.5 py-2 rounded-lg hover:bg-white/5"
                  >
                    {item.label}
                    <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  {activeDropdown === item.key && (
                    <div className="absolute top-full left-0 mt-1 w-52 rounded-xl border border-white/10 bg-slate-900 shadow-2xl py-1">
                      {cats.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`${item.href}/category/${cat.slug}`}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <span>{cat.emoji}</span>
                          <span>{cat.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* More dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("more")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1 px-2.5 py-2 rounded-lg hover:bg-white/5">
                More
                <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === "more" && (
                <div className="absolute top-full right-0 mt-1 w-56 rounded-xl border border-white/10 bg-slate-900 shadow-2xl py-1 grid grid-cols-1">
                  {MORE_DIRECTORIES.map((dir) => (
                    <Link
                      key={dir.key}
                      href={dir.href}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      {dir.label}
                    </Link>
                  ))}
                  <div className="border-t border-white/5 mt-1 pt-1">
                    <Link
                      href="/"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-violet-400 hover:text-violet-300 hover:bg-white/5 transition-colors"
                    >
                      View All Directories →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/ai-tools/submit"
              className="rounded-lg bg-violet-600 hover:bg-violet-500 px-4 py-2 text-sm font-medium text-white transition-colors whitespace-nowrap"
            >
              + Submit a Tool
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-slate-400 hover:text-white"
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
          <div className="lg:hidden border-t border-white/10 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
            {PRIMARY_NAV.map((item) => {
              const cats = getPrimaryCategories(item.key);
              return (
                <div key={item.key}>
                  <p className="px-2 py-1 text-xs text-slate-600 uppercase tracking-wider mt-2">{item.label}</p>
                  <Link
                    href={item.href}
                    className="block px-2 py-2 text-sm text-slate-400 hover:text-white"
                    onClick={() => setMenuOpen(false)}
                  >
                    Browse All →
                  </Link>
                  {cats.slice(0, 4).map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`${item.href}/category/${cat.slug}`}
                      className="flex items-center gap-2 px-4 py-1.5 text-sm text-slate-500 hover:text-white"
                      onClick={() => setMenuOpen(false)}
                    >
                      <span>{cat.emoji}</span>
                      <span>{cat.label}</span>
                    </Link>
                  ))}
                </div>
              );
            })}
            {/* More directories in mobile */}
            <div>
              <p className="px-2 py-1 text-xs text-slate-600 uppercase tracking-wider mt-2">More Directories</p>
              {MORE_DIRECTORIES.map((dir) => (
                <Link
                  key={dir.key}
                  href={dir.href}
                  className="flex items-center gap-2 px-2 py-2 text-sm text-slate-400 hover:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {dir.label}
                </Link>
              ))}
            </div>
            <div className="pt-2 border-t border-white/5 mt-2">
              <Link
                href="/ai-tools/submit"
                className="block px-2 py-2 text-sm text-slate-400 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                Submit a Tool
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
