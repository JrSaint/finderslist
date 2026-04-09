import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-24 text-center">
      <p className="text-6xl mb-6">🔎</p>
      <h1 className="text-3xl font-bold text-white mb-3">Page Not Found</h1>
      <p className="text-slate-400 mb-8 leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Try browsing one of our directories instead.
      </p>
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <Link
          href="/"
          className="rounded-xl bg-violet-600 hover:bg-violet-500 px-6 py-3 text-sm font-semibold text-white transition-colors"
        >
          Browse All Directories
        </Link>
        <Link
          href="/contact"
          className="rounded-xl border border-white/10 hover:border-white/20 px-6 py-3 text-sm font-medium text-slate-300 hover:text-white transition-colors"
        >
          Report a Problem
        </Link>
      </div>
    </div>
  );
}
