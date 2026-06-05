import Link from "next/link";

export default function AuthorBadge() {
  return (
    <div className="flex items-center gap-3 text-xs text-slate-500 mb-5 px-1">
      <div className="flex items-center gap-1.5">
        <svg className="w-3.5 h-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span>
          Reviewed by the{" "}
          <Link href="/about" className="text-slate-400 hover:text-slate-200 underline underline-offset-2 transition-colors">
            FindersList Editorial Team
          </Link>
        </span>
      </div>
      <span className="text-slate-700">·</span>
      <div className="flex items-center gap-1.5">
        <svg className="w-3.5 h-3.5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>Updated April 2026</span>
      </div>
    </div>
  );
}
