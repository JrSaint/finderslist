import Link from "next/link";

interface AuthorBadgeProps {
  /** ISO date (e.g. "2026-06-05") of the last editorial review of this listing. */
  lastReviewed?: string;
  /** Whether the page's outbound CTA uses an affiliate link. */
  hasAffiliate?: boolean;
}

function formatMonthYear(iso: string): string | null {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function AuthorBadge({ lastReviewed, hasAffiliate }: AuthorBadgeProps) {
  const reviewedLabel = lastReviewed ? formatMonthYear(lastReviewed) : null;

  return (
    <div className="flex items-center gap-3 text-xs text-slate-500 mb-5 px-1 flex-wrap">
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
        <span>{reviewedLabel ? `Reviewed ${reviewedLabel}` : "Regularly reviewed"}</span>
      </div>
      <span className="text-slate-700">·</span>
      <Link href="/methodology" className="text-slate-400 hover:text-slate-200 underline underline-offset-2 transition-colors">
        How we review
      </Link>
      {hasAffiliate && (
        <>
          <span className="text-slate-700">·</span>
          <Link href="/methodology" className="text-slate-500 hover:text-slate-300 transition-colors">
            Some links may earn us a commission
          </Link>
        </>
      )}
    </div>
  );
}
