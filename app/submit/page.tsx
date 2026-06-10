"use client";

import { useState } from "react";
import directoriesManifest from "@/data/directories.json";

// Directory options come from the shared manifest — single source of truth,
// so new directories appear here automatically.
const DIRECTORIES = (directoriesManifest as { route: string; displayName: string }[])
  .map((d) => ({ value: d.route, label: d.displayName }))
  .sort((a, b) => a.label.localeCompare(b.label));

type State = "idle" | "loading" | "success" | "error";

export default function SubmitPage() {
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      toolName: data.get("tool_name"),
      url: data.get("url"),
      tagline: data.get("tagline"),
      description: data.get("description"),
      directory: data.get("directory"),
      pricing: data.get("pricing"),
      email: data.get("email"),
      honeypot: data.get("_hp"), // spam trap
    };

    try {
      const res = await fetch("/api/submit-tool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.ok) {
        setState("success");
        form.reset();
      } else {
        setErrorMsg(json.error || "Something went wrong. Please try again.");
        setState("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="mb-6 text-6xl">🎉</div>
        <h1 className="text-3xl font-bold text-white mb-4">Submission received!</h1>
        <p className="text-slate-400 mb-8">
          We&apos;ll review your tool and you&apos;ll get an email once it&apos;s live — usually
          within 24 hours.
        </p>
        <button
          onClick={() => setState("idle")}
          className="rounded-xl bg-violet-600 hover:bg-violet-500 px-6 py-3 font-semibold text-white transition-colors"
        >
          Submit Another Tool
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-center mb-10">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-300">
          📋 Get Listed on FindersList
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">Submit a Tool or Service</h1>
        <p className="text-slate-400">
          Submit any software, app, or service across our 100+ directories. Listings are
          reviewed and go live within 24 hours.
        </p>
      </div>

      {/* Featured listing upsell */}
      <div className="rounded-2xl border border-violet-500/30 bg-violet-500/5 p-5 mb-8">
        <div className="flex items-start gap-3">
          <span className="text-2xl">⭐</span>
          <div>
            <p className="text-sm font-semibold text-violet-300 mb-1">Want a Featured Listing?</p>
            <p className="text-sm text-slate-400">
              Featured tools appear at the top of directory pages, highlighted with a badge.
              Email us at{" "}
              <a
                href="mailto:hello@finderslist.com"
                className="text-violet-400 hover:text-violet-300 underline"
              >
                hello@finderslist.com
              </a>{" "}
              to discuss featured placement.
            </p>
          </div>
        </div>
      </div>

      {state === "error" && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300 mb-6">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Honeypot — hidden from real users, filled by bots */}
        <input type="text" name="_hp" className="hidden" tabIndex={-1} autoComplete="off" />

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Tool / Service Name <span className="text-violet-400">*</span>
          </label>
          <input
            type="text"
            name="tool_name"
            required
            placeholder="e.g. Notion, LegalZoom, Progressive"
            className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-4 py-3 text-white placeholder-slate-500 focus:border-violet-500/50 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Website URL <span className="text-violet-400">*</span>
          </label>
          <input
            type="url"
            name="url"
            required
            placeholder="https://yourtool.com"
            className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-4 py-3 text-white placeholder-slate-500 focus:border-violet-500/50 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Short Tagline <span className="text-violet-400">*</span>
          </label>
          <input
            type="text"
            name="tagline"
            required
            maxLength={100}
            placeholder="One sentence describing what it does"
            className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-4 py-3 text-white placeholder-slate-500 focus:border-violet-500/50 focus:outline-none transition-colors"
          />
          <p className="text-xs text-slate-600 mt-1">Max 100 characters</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Description
          </label>
          <textarea
            name="description"
            rows={4}
            placeholder="Tell us what makes this tool unique, who it's for, and its standout features..."
            className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-4 py-3 text-white placeholder-slate-500 focus:border-violet-500/50 focus:outline-none transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Best Directory <span className="text-violet-400">*</span>
          </label>
          <select
            name="directory"
            required
            className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-4 py-3 text-white focus:border-violet-500/50 focus:outline-none transition-colors"
          >
            <option value="" className="bg-slate-900">Select the best matching directory...</option>
            {DIRECTORIES.map((d) => (
              <option key={d.value} value={d.value} className="bg-slate-900">
                {d.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-600 mt-1">
            Don&apos;t worry if you&apos;re unsure — our team will place it in the right spot.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Pricing Model <span className="text-violet-400">*</span>
          </label>
          <div className="flex gap-3">
            {(["free", "freemium", "paid"] as const).map((p) => (
              <label key={p} className="flex-1 cursor-pointer">
                <input type="radio" name="pricing" value={p} required className="sr-only peer" />
                <div className="text-center py-2.5 rounded-xl border border-white/10 text-sm text-slate-400 peer-checked:border-violet-500/50 peer-checked:bg-violet-500/10 peer-checked:text-violet-300 transition-all capitalize">
                  {p}
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Your Email <span className="text-violet-400">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-4 py-3 text-white placeholder-slate-500 focus:border-violet-500/50 focus:outline-none transition-colors"
          />
          <p className="text-xs text-slate-600 mt-1">
            We&apos;ll notify you when your listing goes live.
          </p>
        </div>

        <button
          type="submit"
          disabled={state === "loading"}
          className="w-full rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 disabled:cursor-not-allowed px-6 py-3.5 font-semibold text-white transition-colors flex items-center justify-center gap-2"
        >
          {state === "loading" ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Submitting...
            </>
          ) : (
            "Submit for Review"
          )}
        </button>

        <p className="text-xs text-slate-600 text-center">
          Free submissions are reviewed within 24 hours. We reserve the right to decline any
          submission that doesn&apos;t meet our editorial standards.
        </p>
      </form>
    </div>
  );
}
