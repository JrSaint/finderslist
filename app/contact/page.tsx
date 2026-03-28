import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us — FindersList",
  description:
    "Get in touch with the FindersList team. Questions, feedback, tool submissions, and partnership inquiries welcome.",
  alternates: { canonical: "https://finderslist.com/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-slate-300 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-slate-300">Contact Us</span>
      </nav>

      <h1 className="text-3xl font-bold text-white mb-2">Contact Us</h1>
      <p className="text-sm text-slate-500 mb-10">
        We&apos;d love to hear from you. Reach out anytime.
      </p>

      <div className="space-y-8">
        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-xl mb-4">
              ✉️
            </div>
            <h2 className="text-base font-semibold text-white mb-1">
              General Inquiries
            </h2>
            <p className="text-sm text-slate-400 mb-3">
              Questions, feedback, or partnership opportunities.
            </p>
            <a
              href="mailto:hello@finderslist.com"
              className="text-sm text-violet-400 hover:text-violet-300 transition-colors font-medium"
            >
              hello@finderslist.com
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-xl mb-4">
              🛠️
            </div>
            <h2 className="text-base font-semibold text-white mb-1">
              Submit a Tool
            </h2>
            <p className="text-sm text-slate-400 mb-3">
              Want your tool or service listed on FindersList?
            </p>
            <Link
              href="/submit"
              className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              Go to submission form →
            </Link>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xl mb-4">
              🐛
            </div>
            <h2 className="text-base font-semibold text-white mb-1">
              Report an Issue
            </h2>
            <p className="text-sm text-slate-400 mb-3">
              Found incorrect information or a broken link? Let us know.
            </p>
            <a
              href="mailto:support@finderslist.com"
              className="text-sm text-amber-400 hover:text-amber-300 transition-colors font-medium"
            >
              support@finderslist.com
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-xl mb-4">
              💼
            </div>
            <h2 className="text-base font-semibold text-white mb-1">
              Advertising
            </h2>
            <p className="text-sm text-slate-400 mb-3">
              Interested in advertising or sponsorship opportunities?
            </p>
            <a
              href="mailto:ads@finderslist.com"
              className="text-sm text-sky-400 hover:text-sky-300 transition-colors font-medium"
            >
              ads@finderslist.com
            </a>
          </div>
        </div>

        {/* Additional info */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-6">
          <h2 className="text-base font-semibold text-white mb-3">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-slate-300 mb-1">
                How do you choose which tools to list?
              </h3>
              <p className="text-sm text-slate-400">
                Our editorial team researches each category thoroughly and selects tools based on
                popularity, user reviews, feature set, and market reputation. We aim to include a
                diverse range of options from free to enterprise-grade.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-300 mb-1">
                Do you accept paid placements?
              </h3>
              <p className="text-sm text-slate-400">
                No. Our listings and reviews are editorially independent. Some links are affiliate
                links (clearly disclosed), but this never affects which tools we include or how we
                describe them.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-300 mb-1">
                How often is the site updated?
              </h3>
              <p className="text-sm text-slate-400">
                We continuously add new directories and update existing listings. If you notice
                outdated information, please email us and we&apos;ll correct it promptly.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-300 mb-1">
                What is your response time?
              </h3>
              <p className="text-sm text-slate-400">
                We aim to respond to all inquiries within 1–2 business days.
              </p>
            </div>
          </div>
        </div>

        {/* Legal / transparency note */}
        <div className="text-sm text-slate-500 space-y-2">
          <p>
            FindersList is committed to transparency and user trust. For information about how we
            handle your data, please see our{" "}
            <Link
              href="/privacy"
              className="text-violet-400 hover:text-violet-300 underline"
            >
              Privacy Policy
            </Link>
            . For details about our editorial process and affiliate relationships, visit our{" "}
            <Link
              href="/about"
              className="text-violet-400 hover:text-violet-300 underline"
            >
              About page
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
