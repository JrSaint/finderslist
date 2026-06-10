/**
 * Prominent banner shown at the top of a tool page when the listing's status
 * indicates the product is no longer what it was: shut down, acquired, or
 * rebranded. Renders nothing for active/unknown status.
 */
export default function ToolStatusNotice({
  status,
  name,
}: {
  status?: "active" | "rebranded" | "acquired" | "shutdown";
  name: string;
}) {
  if (!status || status === "active") return null;

  if (status === "shutdown") {
    return (
      <div className="mb-6 rounded-xl border border-rose-500/30 bg-rose-500/10 px-5 py-4 flex items-start gap-3">
        <svg className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <p className="text-sm font-semibold text-rose-300">{name} has been shut down</p>
          <p className="text-xs text-rose-300/80 mt-0.5">
            This product is no longer available. See the related tools below for current alternatives.
          </p>
        </div>
      </div>
    );
  }

  const label = status === "acquired" ? "has been acquired" : "has been rebranded";
  return (
    <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 flex items-start gap-3">
      <svg className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div>
        <p className="text-sm font-semibold text-amber-300">{name} {label}</p>
        <p className="text-xs text-amber-300/80 mt-0.5">
          Details below reflect the latest verified information, but branding and ownership have changed.
        </p>
      </div>
    </div>
  );
}
