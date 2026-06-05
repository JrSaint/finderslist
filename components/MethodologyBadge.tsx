import Link from "next/link";

export default function MethodologyBadge() {
  return (
    <div className="mt-8 flex justify-center">
      <Link
        href="/methodology"
        className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-slate-900/40 px-4 py-2 text-xs text-slate-400 hover:text-slate-200 hover:border-violet-500/30 transition-all"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        How we evaluate tools — Read our methodology
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
