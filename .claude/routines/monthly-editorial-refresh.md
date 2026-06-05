# Routine: Monthly Editorial & Competitive Refresh (Pipeline B)

**Cadence:** Monthly, on the 8th (a few days after the GitHub Actions sweep on the 1st).
**Mechanism:** Scheduled remote Claude Code agent (registered via the `schedule` skill).
**Repo:** FindersList. **Autonomy:** auto-commit & deploy, with the guardrails below.

This routine is the judgment-heavy layer that complements the deterministic
`scripts/refresh-listings.mjs` sweep. The script handles per-listing accuracy,
pricing, and field freshness; this routine handles the things that need real
editorial reasoning and competitive awareness.

## Each run, do the following

Work through a rotating subset of directories (≈15 per month, oldest-reviewed
first — check `data/_freshness.json` and `audit-logs/` for what's most stale).
For each directory in the batch:

1. **Competitive gap analysis.** Use web search to find notable, currently-relevant
   tools/services in this category that are NOT yet listed. Add the strongest 1–3
   via the same data shape (see an existing entry in the `data/<name>.ts` file;
   set `featured: false`, `status: "active"`, `lastReviewed` = today).
2. **Prune & re-rank.** Flag listings that are clearly obsolete/defunct for removal
   (be conservative — confirm with web search). Re-evaluate which tools genuinely
   deserve `featured: true` and the ordering, but treat `featured` and
   `affiliateUrl` as human-curated: only change them via a PR, never a direct push.
3. **Editorial freshness.** Update `<X>_EDITORIAL.intro` / `buyerGuide` / `faq` and
   category `guide` text where it references an outdated year, stale market facts,
   or superseded leaders. Keep voice and length.
4. **Cross-directory consistency & QA.** Spot-check what the Pipeline A sweep changed
   this month (recent commits / `audit-logs/`) for quality regressions; fix any.

## Guardrails (must follow — same as Pipeline A)
- **Never edit** `data/directory-content*.ts`, `src/data/*`, or `data/blog.ts`
  (orphaned/different shape). Only the per-directory `data/<name>.ts` files.
- **Preserve `featured` and `affiliateUrl`.** Changes to these go via PR only.
- Run `npx tsc --noEmit` before committing; if it fails, revert and stop.
- **Caps:** if a directory needs >3 adds, >2 removes, or featured/ranking changes,
  open a PR (`gh pr create`) instead of pushing to `main`.
- Update `data/_freshness.json` for any page you change (keys: `<route>`,
  `<route>/tools/<slug>`) so the sitemap + JSON-LD reflect real dates.
- Write a short summary to `audit-logs/editorial-<YYYY-MM-DD>.md` and commit it.
- Do **not** add `aggregateRating` structured data (policy risk). FAQ/Offer/date only.
- One commit per directory; keep messages descriptive for easy rollback.

## Stop condition
After the batch (≈15 directories) or when the token budget is reached, summarize
what changed, what was routed to PRs, and which directories are next month's batch.
