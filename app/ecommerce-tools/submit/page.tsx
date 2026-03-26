import type { Metadata } from "next";
import { ECOMMERCE_CATEGORIES, getAllEcommerceCategories } from "@/lib/ecommerce-tools";

export const metadata: Metadata = {
  title: "Submit an E-commerce Tool — FindersList",
  description: "Submit your e-commerce tool to FindersList to get discovered by thousands of online store owners, dropshippers, and entrepreneurs.",
};

export default function EcommerceSubmitPage() {
  const categories = getAllEcommerceCategories();

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-center mb-10">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300">
          🛍️ Get Listed on FindersList
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">Submit an E-commerce Tool</h1>
        <p className="text-slate-400">
          Found a great e-commerce tool that&apos;s not listed? Submit it and help others discover it.
          Listings are reviewed and go live within 48 hours.
        </p>
      </div>

      {/* Featured listing upsell */}
      <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-5 mb-8">
        <div className="flex items-start gap-3">
          <span className="text-2xl">⭐</span>
          <div>
            <p className="text-sm font-semibold text-blue-300 mb-1">Want a Featured Listing?</p>
            <p className="text-sm text-slate-400">
              Featured tools appear at the top of the homepage and category pages, highlighted with a badge.
              Email us at{" "}
              <a href="mailto:hello@finderslist.com" className="text-blue-400 hover:text-blue-300 underline">
                hello@finderslist.com
              </a>{" "}
              to discuss featured placement.
            </p>
          </div>
        </div>
      </div>

      <form
        action="https://formspree.io/f/xbdprzvr"
        method="POST"
        className="space-y-5"
      >
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Tool Name <span className="text-blue-400">*</span>
          </label>
          <input
            type="text"
            name="tool_name"
            required
            placeholder="e.g. Shopify"
            className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500/50 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Website URL <span className="text-blue-400">*</span>
          </label>
          <input
            type="url"
            name="url"
            required
            placeholder="https://yourtool.com"
            className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500/50 focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Short Tagline <span className="text-blue-400">*</span>
          </label>
          <input
            type="text"
            name="tagline"
            required
            maxLength={100}
            placeholder="One sentence describing what it does"
            className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500/50 focus:outline-none transition-colors"
          />
          <p className="text-xs text-slate-600 mt-1">Max 100 characters</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Description <span className="text-blue-400">*</span>
          </label>
          <textarea
            name="description"
            required
            rows={4}
            placeholder="Describe what the tool does, who it's for, and what makes it unique..."
            className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500/50 focus:outline-none transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Category <span className="text-blue-400">*</span>
          </label>
          <select
            name="category"
            required
            className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-4 py-3 text-white focus:border-blue-500/50 focus:outline-none transition-colors"
          >
            <option value="" className="bg-slate-900">Select a category...</option>
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-slate-900">
                {ECOMMERCE_CATEGORIES[cat].emoji} {ECOMMERCE_CATEGORIES[cat].label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Pricing Model <span className="text-blue-400">*</span>
          </label>
          <div className="flex gap-3">
            {(["free", "freemium", "paid"] as const).map((p) => (
              <label key={p} className="flex-1 cursor-pointer">
                <input type="radio" name="pricing" value={p} required className="sr-only peer" />
                <div className="text-center py-2.5 rounded-xl border border-white/10 text-sm text-slate-400 peer-checked:border-blue-500/50 peer-checked:bg-blue-500/10 peer-checked:text-blue-300 transition-all capitalize">
                  {p}
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Your Email <span className="text-blue-400">*</span>
          </label>
          <input
            type="email"
            name="_replyto"
            required
            placeholder="you@example.com"
            className="w-full rounded-xl border border-white/10 bg-slate-800/80 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500/50 focus:outline-none transition-colors"
          />
          <p className="text-xs text-slate-600 mt-1">We&apos;ll notify you when your tool goes live.</p>
        </div>

        <input type="hidden" name="_subject" value="New E-commerce Tool Submission — FindersList" />

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3.5 font-semibold text-white transition-colors"
        >
          Submit Tool for Review
        </button>

        <p className="text-xs text-slate-600 text-center">
          Free submissions are reviewed within 48 hours. We reserve the right to decline any submission.
        </p>
      </form>
    </div>
  );
}
