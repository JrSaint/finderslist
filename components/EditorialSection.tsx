interface EditorialProps {
  title: string;
  intro: string;
  buyerGuide: string[];
  faq: { question: string; answer: string }[];
}

export default function EditorialSection({ title, intro, buyerGuide, faq }: EditorialProps) {
  return (
    <section className="mt-14 mb-2">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Intro */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>
          <div className="text-sm text-slate-400 leading-relaxed space-y-4 whitespace-pre-line">
            {intro}
          </div>
        </div>

        {/* Buyer Guide */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">What to Look For</h2>
          <ul className="space-y-2">
            {buyerGuide.map((point, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
                <span className="text-green-400 mt-0.5 shrink-0">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <details key={i} className="group rounded-xl border border-white/8 bg-slate-900/40">
                <summary className="flex items-center justify-between cursor-pointer p-4 text-sm font-medium text-white hover:text-slate-200 transition-colors">
                  {item.question}
                  <span className="text-slate-600 group-open:rotate-45 transition-transform text-lg leading-none">+</span>
                </summary>
                <div className="px-4 pb-4 text-sm text-slate-400 leading-relaxed">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
