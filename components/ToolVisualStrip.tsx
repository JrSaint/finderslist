type HeroTool = { slug: string; name: string; domain?: string; logo: string };

/**
 * Renders tool/brand visuals (favicons + names) for blog posts.
 * - variant="hero": large banner strip at the top of a post.
 * - variant="cluster": small overlapping favicon stack for index cards.
 *
 * Favicons come from the tool's domain via Google's favicon service (already
 * used on tool pages); the emoji `logo` is the fallback when there's no domain.
 */
export default function ToolVisualStrip({
  tools,
  variant = "hero",
}: {
  tools: HeroTool[];
  variant?: "hero" | "cluster";
}) {
  if (!tools || tools.length === 0) return null;

  if (variant === "cluster") {
    return (
      <div className="flex -space-x-2 shrink-0" aria-hidden>
        {tools.slice(0, 4).map((t) => (
          <span
            key={t.slug}
            className="w-8 h-8 rounded-lg bg-slate-800 border border-white/15 flex items-center justify-center overflow-hidden"
          >
            {t.domain ? (
              <img
                src={`https://www.google.com/s2/favicons?domain=${t.domain}&sz=64`}
                alt=""
                width={20}
                height={20}
                className="object-contain"
                loading="lazy"
              />
            ) : (
              <span className="text-base">{t.logo}</span>
            )}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="mb-10 rounded-2xl border border-white/10 bg-gradient-to-br from-violet-600/15 to-slate-900/40 p-6">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
        Tools featured in this article
      </p>
      <div className="flex flex-wrap gap-3">
        {tools.map((t) => (
          <div
            key={t.slug}
            className="flex items-center gap-2.5 rounded-xl bg-slate-900/60 border border-white/10 pl-2 pr-3.5 py-2"
          >
            <span className="w-9 h-9 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center overflow-hidden shrink-0">
              {t.domain ? (
                <img
                  src={`https://www.google.com/s2/favicons?domain=${t.domain}&sz=128`}
                  alt={t.name}
                  width={24}
                  height={24}
                  className="object-contain"
                  loading="lazy"
                />
              ) : (
                <span className="text-xl">{t.logo}</span>
              )}
            </span>
            <span className="text-sm font-medium text-slate-200 whitespace-nowrap">{t.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
