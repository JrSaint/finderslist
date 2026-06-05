"use client";

import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

interface DirectoryContentProps {
  intro: string;
  buyingGuide: string;
  faqs: FAQ[];
  accentColor?: string;
}

function FAQItem({ faq, accentColor }: { faq: FAQ; accentColor: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/5 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-white hover:text-slate-200 transition-colors"
      >
        <span className="pr-4">{faq.question}</span>
        <span
          className={`shrink-0 text-lg transition-transform duration-200 ${accentColor} ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      {open && (
        <p className="pb-4 text-sm text-slate-400 leading-relaxed">
          {faq.answer}
        </p>
      )}
    </div>
  );
}

export default function DirectoryContent({
  intro,
  buyingGuide,
  faqs,
  accentColor = "text-blue-400",
}: DirectoryContentProps) {
  return (
    <>
      {/* Expert Overview */}
      <section className="mt-14">
        <div className="rounded-2xl border border-white/8 bg-slate-900/40 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-white mb-4">
            What You Need to Know
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">{intro}</p>
        </div>
      </section>

      {/* Buying Guide */}
      <section className="mt-8">
        <div className="rounded-2xl border border-white/8 bg-slate-900/40 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-white mb-4">
            How to Choose
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            {buyingGuide}
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="mt-8">
          <div className="rounded-2xl border border-white/8 bg-slate-900/40 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Common questions answered by our research team
            </p>
            <div>
              {faqs.map((faq, i) => (
                <FAQItem key={i} faq={faq} accentColor={accentColor} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
