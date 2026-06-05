/**
 * generate-blog-posts.mjs
 *
 * Runs after the monthly refresh sweep. Turns the month's audit logs into a few
 * concise, engaging blog posts — each tied to a directory that changed, with
 * tool/brand visuals (favicons) pulled from that directory's data.
 *
 * Flow:
 *  1. Scan audit-logs/<YYYY-MM-*>.md for directories that changed this month
 *  2. Rank by number of applied changes; take the top N (BLOG_POSTS_PER_MONTH)
 *  3. For each: ask Claude (optionally with web search) to write a tight ~600-900
 *     word post summarizing what changed + current top picks
 *  4. Attach heroTools (denormalized {slug,name,domain,logo}) from the directory's
 *     featured tools, append to data/blog.ts, tsc-gate, commit
 *
 * Usage: node scripts/generate-blog-posts.mjs [--month YYYY-MM] [--limit N] [--dry-run] [--no-web]
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import { parseToolsFile } from "./lib/parse-tools.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const ARGV = process.argv.slice(2);
const arg = (n, d) => { const i = ARGV.indexOf(`--${n}`); return i !== -1 ? (ARGV[i + 1] && !ARGV[i + 1].startsWith("--") ? ARGV[i + 1] : true) : d; };
const MONTH = arg("month", new Date().toISOString().slice(0, 7)); // YYYY-MM
const LIMIT = parseInt(arg("limit", process.env.BLOG_POSTS_PER_MONTH || "3"), 10);
const DRY_RUN = !!arg("dry-run", false);
const NO_WEB = !!arg("no-web", false);

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const MODEL = process.env.MODEL || "claude-sonnet-4-6";
const WEB_SEARCH_TOOL = process.env.WEB_SEARCH_TOOL || "web_search_20250305";

const MANIFEST = JSON.parse(readFileSync(join(ROOT, "data/directories.json"), "utf-8"));

// ─── 1+2. Rank changed directories from this month's audit logs ────────────────

function changedDirsThisMonth() {
  const logDir = join(ROOT, "audit-logs");
  if (!existsSync(logDir)) return [];
  const counts = {};
  for (const f of readdirSync(logDir)) {
    // refresh logs: <YYYY-MM-DD>-<route>.md
    const m = f.match(/^(\d{4}-\d{2})-\d{2}-(.+)\.md$/);
    if (!m || m[1] !== MONTH) continue;
    const route = m[2];
    const body = readFileSync(join(logDir, f), "utf-8");
    const applied = (body.match(/^- \*\*(update|add|remove)\*\*/gm) || []).length;
    counts[route] = (counts[route] || 0) + applied;
  }
  return Object.entries(counts)
    .filter(([, n]) => n > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([route, n]) => ({ route, changes: n }));
}

// ─── heroTools from a directory's featured (or first) tools ────────────────────

function heroToolsFor(route, max = 5) {
  const dir = MANIFEST.find((d) => d.route === route);
  if (!dir) return [];
  const src = readFileSync(join(ROOT, dir.dataFile), "utf-8");
  const { blocks } = parseToolsFile(src);
  const tools = blocks.map((b) => b.obj);
  const picked = (tools.filter((t) => t.featured).length ? tools.filter((t) => t.featured) : tools).slice(0, max);
  return picked.map((t) => ({ slug: t.slug, name: t.name, domain: t.domain, logo: t.logo }));
}

function changelogSummary(route) {
  const logDir = join(ROOT, "audit-logs");
  const lines = [];
  for (const f of readdirSync(logDir)) {
    if (f.match(new RegExp(`^${MONTH}-\\d{2}-${route}\\.md$`))) {
      lines.push(readFileSync(join(logDir, f), "utf-8"));
    }
  }
  return lines.join("\n").slice(0, 4000);
}

// ─── 3. Claude writes the post ─────────────────────────────────────────────────

async function writePost(dir, heroTools, summary) {
  const { default: Anthropic } = await import("@anthropic-ai/sdk");
  const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });
  const monthName = new Date(MONTH + "-01").toLocaleString("en-US", { month: "long", year: "numeric" });

  const sys = `You write the FindersList blog — concise, engaging, professional, genuinely useful.
Voice: clear and confident, no fluff, no hype. Target ~600-900 words (a 4-5 minute read).
Write a monthly update post for the "${dir.displayName}" category covering ${monthName}.

Use the change summary below (what our editors updated this month) plus web search to ground it
in what actually happened — price changes, new entrants, shutdowns, shifts in the leaders.
Then give the reader current, specific top picks (reference the featured tools provided).

Structure with 3-4 "## " section headings. Open with a tight hook, not "In today's world".
End with a one-line takeaway. Output STRICTLY this JSON as your final message:
{
  "title": "<=70 chars, specific, no clickbait",
  "description": "1-2 sentence meta description (<=160 chars)",
  "content": "markdown body with ## headings, short paragraphs, optional - bullet lists",
  "readingMinutes": <integer>
}`;

  const featuredList = heroTools.map((t) => `- ${t.name} (${t.domain || ""})`).join("\n");
  const tools = NO_WEB ? [] : [{ type: WEB_SEARCH_TOOL, name: "web_search", max_uses: 4 }];
  const resp = await client.messages.create({
    model: MODEL,
    max_tokens: 3000,
    system: [{ type: "text", text: sys, cache_control: { type: "ephemeral" } }],
    tools,
    messages: [{ role: "user", content: `Featured tools to reference:\n${featuredList}\n\nThis month's editor change summary:\n${summary || "(no major listing changes — write an evergreen current-state update.)"}` }],
  });
  const text = resp.content.filter((c) => c.type === "text").map((c) => c.text).join("\n");
  return parseJson(text);
}

function parseJson(raw) {
  const c = raw.replace(/```(?:json)?/g, "").trim();
  let depth = 0, start = -1;
  for (let i = 0; i < c.length; i++) {
    if (c[i] === "{") { if (depth === 0) start = i; depth++; }
    else if (c[i] === "}") { depth--; if (depth === 0 && start !== -1) { try { return JSON.parse(c.slice(start, i + 1)); } catch {} } }
  }
  throw new Error("No JSON in model output");
}

// ─── 4. Append to data/blog.ts ─────────────────────────────────────────────────

function slugify(s) { return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); }

function appendPost(post) {
  const fp = join(ROOT, "data/blog.ts");
  let src = readFileSync(fp, "utf-8");
  const existing = [...src.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
  if (existing.includes(post.slug)) { console.log(`   skip dup slug ${post.slug}`); return false; }
  const entry =
    `  {\n` +
    `    slug: ${JSON.stringify(post.slug)},\n` +
    `    title: ${JSON.stringify(post.title)},\n` +
    `    description: ${JSON.stringify(post.description)},\n` +
    `    category: ${JSON.stringify(post.category)},\n` +
    `    author: "FindersList Editorial Team",\n` +
    `    publishedAt: ${JSON.stringify(post.date)},\n` +
    `    updatedAt: ${JSON.stringify(post.date)},\n` +
    `    readingTime: ${JSON.stringify(post.readingTime)},\n` +
    `    featured: ${post.featured},\n` +
    `    relatedDirectory: ${JSON.stringify(post.relatedDirectory)},\n` +
    `    monthTag: ${JSON.stringify(MONTH)},\n` +
    `    heroTools: ${JSON.stringify(post.heroTools)},\n` +
    `    content: ${JSON.stringify(post.content)},\n` +
    `  },`;
  const idx = src.lastIndexOf("];");
  src = src.slice(0, idx) + entry + "\n" + src.slice(idx);
  writeFileSync(fp, src);
  return true;
}

// ─── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const ranked = changedDirsThisMonth().slice(0, LIMIT);
  if (!ranked.length) { console.log("No changed directories with audit logs this month — nothing to write."); return; }
  console.log(`📝 Generating ${ranked.length} post(s) for ${MONTH}: ${ranked.map((r) => r.route).join(", ")}`);

  const date = new Date().toISOString().slice(0, 10);
  let wrote = 0;
  for (const { route } of ranked) {
    const dir = MANIFEST.find((d) => d.route === route);
    const heroTools = heroToolsFor(route);
    const summary = changelogSummary(route);

    if (!ANTHROPIC_API_KEY) { console.log(`   [no key] would write a post for ${route} with ${heroTools.length} hero tools`); continue; }
    let draft;
    try { draft = await writePost(dir, heroTools, summary); }
    catch (e) { console.warn(`   ⚠️ ${route}: ${e.message}`); continue; }

    const post = {
      slug: slugify(`${draft.title}-${MONTH}`),
      title: draft.title,
      description: draft.description,
      category: dir.displayName,
      date,
      readingTime: `${draft.readingMinutes || 5} min read`,
      featured: wrote === 0,
      relatedDirectory: route,
      heroTools,
      content: draft.content,
    };
    if (DRY_RUN) { console.log(`   DRY: ${post.slug} — "${post.title}" (${heroTools.length} visuals)`); continue; }
    if (appendPost(post)) { wrote++; console.log(`   ✅ ${post.slug}`); }
  }

  if (DRY_RUN || wrote === 0) return;

  try { execSync("npx tsc --noEmit", { cwd: ROOT, stdio: "pipe" }); }
  catch (e) { console.error("❌ tsc failed — reverting blog.ts"); execSync("git checkout -- data/blog.ts", { cwd: ROOT }); process.exit(1); }

  execSync("git add data/blog.ts", { cwd: ROOT });
  execSync(`git commit -m ${JSON.stringify(`Add ${wrote} monthly blog post(s) for ${MONTH}\n\nAuto-generated from the refresh audit logs.`)}`, { cwd: ROOT, stdio: "pipe" });
  try { execSync("git pull --rebase origin main && git push origin HEAD:main", { cwd: ROOT, stdio: "pipe" }); console.log("🚀 Pushed."); }
  catch (e) { console.warn("push skipped/failed:", e.message); }
}

main().catch((e) => { console.error("Fatal:", e); process.exit(1); });
