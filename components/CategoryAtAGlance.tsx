import Link from "next/link";

interface GlanceTool {
  slug: string;
  name: string;
  tagline: string;
  pricing: "free" | "freemium" | "paid";
  featured: boolean;
  logo: string;
  domain?: string;
  status?: string;
  startingPrice?: string;
}

/**
 * G2-style "At a Glance" strip for directory hub pages: instantly answers
 * "which one should I pick?" with superlative picks computed from the listing
 * data — no fabricated ratings, just transparent editorial signals.
 */
export default function CategoryAtAGlance({
  tools,
  basePath,
}: {
  tools: GlanceTool[];
  basePath: string;
}) {
  const alive = tools.filter((t) => t.status !== "shutdown");

  const editorsPick = alive.find((t) => t.featured) ?? alive[0];

  const bestFree =
    alive.find((t) => t.pricing === "free" && t.slug !== editorsPick?.slug) ??
    alive.find((t) => t.pricing === "freemium" && t.slug !== editorsPick?.slug);

  const priced = alive
    .filter((t) => t.startingPrice && t.pricing !== "free")
    .map((t) => ({ t, n: parseFloat((t.startingPrice ?? "").replace(/[^0-9.]/g, "")) }))
    .filter((x) => !isNaN(x.n) && x.n > 0)
    .sort((a, b) => a.n - b.n);
  const mostAffordable = priced.find(
    (x) => x.t.slug !== editorsPick?.slug && x.t.slug !== bestFree?.slug
  )?.t;

  const picks = [
    editorsPick && {
      label: "Editor's Pick",
      tool: editorsPick,
      style: "text-violet-300 bg-violet-500/15 border-violet-500/30",
    },
    bestFree && {
      label: bestFree.pricing === "free" ? "Best Free Option" : "Best Free Plan",
      tool: bestFree,
      style: "text-emerald-300 bg-emerald-500/15 border-emerald-500/30",
    },
    mostAffordable && {
      label: `Most Affordable · ${mostAffordable.startingPrice}`,
      tool: mostAffordable,
      style: "text-amber-300 bg-amber-500/15 border-amber-500/30",
    },
  ].filter(Boolean) as { label: string; tool: GlanceTool; style: string }[];

  if (picks.length < 2) return null;

  return (
    <section className="mb-10">
      <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
        At a glance
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {picks.map(({ label, tool, style }) => (
          <Link
            key={label}
            href={`${basePath}/tools/${tool.slug}`}
            className="group rounded-2xl border border-white/8 bg-slate-900/40 hover:bg-slate-800/50 hover:border-violet-500/30 transition-all p-4"
          >
            <span className={`inline-flex text-[11px] font-medium border rounded-full px-2.5 py-0.5 mb-3 ${style}`}>
              {label}
            </span>
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                {tool.domain ? (
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${tool.domain}&sz=64`}
                    alt=""
                    width={24}
                    height={24}
                    className="object-contain"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="text-xl">{tool.logo}</span>
                )}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors truncate">
                  {tool.name}
                </p>
                <p className="text-xs text-slate-400 truncate">{tool.tagline}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
