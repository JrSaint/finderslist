# FindersList — Automated Maintenance System

Recurring optimization & updating for the directory. Keeps ~1,900 listings across
108 directories accurate, fresh, and SEO-optimized, then auto-deploys via Vercel.

## How it runs (subscription mode — no API credits)
The recurring refresh runs on your **Claude subscription** via a local scheduled
task, **not** the Anthropic API:
- **`finderslist-maintenance`** — a daily Claude Code scheduled task
  (`~/.claude/scheduled-tasks/`). Each run picks the ~4 oldest-reviewed directories,
  uses **web search** to verify them, writes a decision JSON, and applies it with
  `refresh-listings.mjs --decision <file>` (which still enforces the tsc gate,
  change caps, field preservation, freshness, and audit logs). ~4 dirs/day → full
  site about every month. Requires Claude Code Desktop to be open (Mac Mini is
  always-on); if closed when due, it runs on next launch.
- The GitHub Actions **monthly cron is DISABLED** (it used API credits). The
  workflow remains for manual, API-billed runs via "Run workflow". The weekly
  **integrity audit** uses no AI, so it still runs free in Actions.
- Scripts support `--decision <file>` (apply agent-produced listing changes) and
  `--post-file <file>` (publish an agent-written blog post) with no API key.
- **Tool submissions** are credit-free too: the daily routine vets open
  `tool-submission` issues with web search and applies via
  `vet-submission.mjs --issue <N> --decision /tmp/vet-<N>.json [--dry-run]`
  (dup check, tsc gate + revert, commit/push, issue comment+close, email).
  The GitHub Actions instant path still works when API credits exist; on API
  failure it now **leaves the issue open** for the daily retry instead of
  closing it as rejected. The submit form's directory dropdown reads the
  shared manifest, so new directories appear automatically.

## Components

| File | Purpose |
|------|---------|
| `data/directories.json` | **Single source of truth** for all 108 directories (`route`, `libName`, `dataFile`, `displayName`). Consumed by sitemap + every script. |
| `lib/directories.ts` | Typed view of the manifest + `SITE_HOST`. |
| `scripts/lib/parse-tools.mjs` | Shared TS-data parser/serializer (brace-scanner; verified on all 1,900 listings). |
| `scripts/refresh-listings.mjs` | **Pipeline A engine.** Per-directory monthly sweep: Claude + web search re-verifies each listing (alive? pricing? prices? rebrand/shutdown?), refreshes stale fields, adds/removes/re-ranks, writes freshness + audit log, tsc-gates, commits. |
| `scripts/audit-integrity.mjs` | **Weekly deterministic check** (no LLM): confirmed-dead links (404/410), cross-domain redirects (rebrand signal), dup slugs, invalid categories, missing fields. Bot-blocked (403/429) URLs are info-only. Findings go to the run's step summary, a warning annotation, the artifact, and email; never edits data; red run = script crash only. |
| `scripts/apply-seo-jsonld.mjs` | One-time idempotent codemod: FAQPage JSON-LD on hubs, `dateModified` on tool pages, www-canonical fix. |
| `scripts/generate-blog-posts.mjs` | Runs after the monthly sweep: turns the month's audit logs into a few concise posts with tool/brand visuals (`heroTools`). Wired as the `blog` job in `refresh-listings.yml`. |
| `components/ToolVisualStrip.tsx` | Renders blog tool/brand visuals (favicon hero strip + index-card cluster). |
| `.github/workflows/refresh-listings.yml` | Monthly cron (1st, 06:00 UTC) — matrix fan-out, one job per directory, `max-parallel: 10`. Manual `workflow_dispatch` with `dir` + `dry_run` inputs. |
| `.github/workflows/audit-integrity.yml` | Weekly cron (Mon 07:00 UTC). |
| `.claude/routines/monthly-editorial-refresh.md` | **Pipeline B** prompt — scheduled Claude Code routine for competitive gap analysis + editorial freshness (register via `/schedule`). |

## Data model additions
Every `<X>Tool` interface gained optional fields (populated lazily by the sweep):
`lastReviewed`, `startingPrice`, `priceCurrency`, `status` (`active`/`rebranded`/`acquired`/`shutdown`).

## Safety rails (auto-deploy is gated)
- `npx tsc --noEmit` before any commit; on failure → `git checkout -- data/` + abort.
- **Change caps** (env-tunable): `CHANGE_CAP=20` updates, `REMOVE_CAP=2`, `ADD_CAP=3` per directory. Exceeding any → opens a **PR** instead of pushing to `main`.
- `featured` and `affiliateUrl` are **never** auto-changed (human-curated).
- One commit per directory → surgical `git revert` or Vercel "promote previous deployment" rollback.
- Per-run audit logs in `audit-logs/`; uploaded as Actions artifacts; emailed if Gmail creds set.
- **No `aggregateRating`** structured data (Google self-serving-review policy risk).

## Freshness & SEO
`data/_freshness.json` records real per-path modification dates (written by the sweep);
`app/sitemap.ts` uses them, falling back to static dates for untouched pages (preserves
crawl budget). Same dates feed tool-page `dateModified`.

## Required GitHub secrets / vars
Secrets: `ANTHROPIC_API_KEY`, `GH_PAT` (push that triggers Vercel), `GMAIL_USER`,
`GMAIL_APP_PASSWORD` (optional email). Repo vars (optional): `REFRESH_MODEL`
(default `claude-sonnet-4-6`), `WEB_SEARCH_TOOL` (default `web_search_20250305`).

## Operating it

```bash
# Dry-run one directory (no writes):
node scripts/refresh-listings.mjs --dir accounting-software --dry-run

# Parse-only smoke test (no API key needed):
node scripts/refresh-listings.mjs --dir accounting-software --dry-run --no-web

# Live refresh of one directory:
node scripts/refresh-listings.mjs --dir accounting-software

# Weekly integrity check (one dir or all):
node scripts/audit-integrity.mjs --dir accounting-software
node scripts/audit-integrity.mjs

# Apply SEO JSON-LD codemod (one dir first, then all):
node scripts/apply-seo-jsonld.mjs --only accounting-software
node scripts/apply-seo-jsonld.mjs

# Trigger the monthly sweep manually from GitHub (single dir, dry run):
#   Actions → "Refresh Listings (monthly sweep)" → Run workflow → dir=…, dry_run=true
```

## Pre-flight verification (run once on a machine with Node 20+)
1. `node scripts/refresh-listings.mjs --dir accounting-software --dry-run --no-web` → parses 20 listings, prints planned changes, writes nothing.
2. `npx tsc --noEmit` → clean (after `apply-seo-jsonld.mjs --only accounting-software`).
3. `npm run build` → confirms `_freshness.json` import + new JSON-LD compile.
4. Validate emitted JSON-LD (Rich Results Test); confirm **no** `aggregateRating`.
5. GitHub: run `refresh-listings.yml` with `dir=accounting-software`, `dry_run=true`.
