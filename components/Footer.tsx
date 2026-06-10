import Link from "next/link";
import { CATEGORIES, getAllCategories } from "@/lib/tools";

// High-value hubs surfaced site-wide for internal linking (audit follow-up).
const POPULAR_DIRECTORIES = [
  { href: "/ai-tools", label: "AI Tools" },
  { href: "/accounting-software", label: "Accounting Software" },
  { href: "/crm-tools", label: "CRM & Sales" },
  { href: "/payroll-software", label: "Payroll Software" },
  { href: "/personal-loans", label: "Personal Loans" },
  { href: "/home-insurance", label: "Home Insurance" },
  { href: "/project-management-software", label: "Project Management" },
  { href: "/website-builders", label: "Website Builders" },
];

export default function Footer() {
  const categories = getAllCategories();

  return (
    <footer className="border-t border-white/10 bg-slate-950 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <img src="/FindersListLogo.png" alt="FindersList" width={28} height={28} className="rounded-md" />
              <span className="text-lg font-bold">
                <span className="text-white">Finders</span>
                <span className="text-violet-400">List</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Curated directories for everything you&apos;re looking for.
            </p>
          </div>

          {/* Categories */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold text-slate-300 mb-3">AI Tool Categories</h3>
            <div className="grid grid-cols-2 gap-1">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/ai-tools/category/${cat}`}
                  className="text-sm text-slate-400 hover:text-slate-200 transition-colors py-1 flex items-center gap-1.5"
                >
                  {CATEGORIES[cat].label}
                </Link>
              ))}
            </div>
          </div>

          {/* Popular Directories */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-3">Popular Directories</h3>
            <div className="space-y-1">
              {POPULAR_DIRECTORIES.map((dir) => (
                <Link
                  key={dir.href}
                  href={dir.href}
                  className="block text-sm text-slate-400 hover:text-slate-200 transition-colors py-1"
                >
                  {dir.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-3">Site</h3>
            <div className="space-y-1">
              <Link href="/" className="block text-sm text-slate-400 hover:text-slate-200 transition-colors py-1">Home</Link>
              <Link href="/blog" className="block text-sm text-slate-400 hover:text-slate-200 transition-colors py-1">Blog</Link>
              <Link href="/ai-tools/submit" className="block text-sm text-slate-400 hover:text-slate-200 transition-colors py-1">Submit a Tool</Link>
              <Link href="/about" className="block text-sm text-slate-400 hover:text-slate-200 transition-colors py-1">About Us</Link>
              <Link href="/methodology" className="block text-sm text-slate-400 hover:text-slate-200 transition-colors py-1">Our Methodology</Link>
              <Link href="/contact" className="block text-sm text-slate-400 hover:text-slate-200 transition-colors py-1">Contact Us</Link>
              <Link href="/privacy" className="block text-sm text-slate-400 hover:text-slate-200 transition-colors py-1">Privacy Policy</Link>
              <Link href="/terms" className="block text-sm text-slate-400 hover:text-slate-200 transition-colors py-1">Terms of Service</Link>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} FindersList. Some links are affiliate links — we may earn a small commission at no extra cost to you.{" "}
            <Link href="/privacy" className="underline hover:text-slate-400 transition-colors">Privacy Policy</Link>
          </p>
          <p className="text-xs text-slate-600">
            Curated directories for the tools that matter.
          </p>
        </div>
      </div>
    </footer>
  );
}
