import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Review Methodology — FindersList",
  description:
    "Learn how FindersList researches, evaluates, and reviews tools and services across 100+ categories. Our transparent methodology ensures honest, unbiased recommendations.",
  alternates: { canonical: "https://finderslist.com/methodology" },
};

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-slate-300 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-slate-300">Our Methodology</span>
      </nav>

      <h1 className="text-3xl font-bold text-white mb-2">How We Review Tools &amp; Services</h1>
      <p className="text-sm text-slate-500 mb-10">
        Our research process, evaluation criteria, and commitment to editorial independence.
      </p>

      <div className="prose prose-invert prose-slate max-w-none space-y-10 text-slate-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">How We Research</h2>
          <p>
            Every tool and service listed on FindersList goes through a structured research process
            before it reaches our directory. We start by identifying the leading options in each
            category through industry reports, user communities, expert recommendations, and direct
            product exploration.
          </p>
          <p className="mt-3">
            For each listing, we investigate the product&apos;s core features, pricing structure,
            target audience, and competitive positioning. We read official documentation, explore
            free trials and demos where available, analyze user reviews across multiple platforms,
            and review the company&apos;s track record for reliability, security, and customer
            support.
          </p>
          <p className="mt-3">
            We prioritize breadth and depth equally — our directories aim to cover both the
            well-known market leaders and the smaller, specialized alternatives that often serve
            specific needs better.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Our Evaluation Criteria</h2>
          <p className="mb-4">
            We evaluate every tool and service against a consistent set of criteria, adapted to
            the specifics of each category:
          </p>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/8 bg-slate-900/40 p-4">
              <h3 className="text-sm font-semibold text-white mb-1">Core Functionality</h3>
              <p className="text-sm text-slate-400">
                Does the product do what it claims? How well does it solve the core problem for its
                target audience? We look at feature completeness, reliability, and how it compares
                to alternatives.
              </p>
            </div>
            <div className="rounded-xl border border-white/8 bg-slate-900/40 p-4">
              <h3 className="text-sm font-semibold text-white mb-1">Ease of Use</h3>
              <p className="text-sm text-slate-400">
                How steep is the learning curve? Is the interface intuitive? We consider onboarding
                experience, documentation quality, and how quickly a new user can get productive.
              </p>
            </div>
            <div className="rounded-xl border border-white/8 bg-slate-900/40 p-4">
              <h3 className="text-sm font-semibold text-white mb-1">Pricing &amp; Value</h3>
              <p className="text-sm text-slate-400">
                We evaluate whether pricing is transparent, competitive, and fair for what you get.
                We note free tiers, trial periods, contract requirements, and any hidden costs.
              </p>
            </div>
            <div className="rounded-xl border border-white/8 bg-slate-900/40 p-4">
              <h3 className="text-sm font-semibold text-white mb-1">Customer Support</h3>
              <p className="text-sm text-slate-400">
                What support channels are available? How responsive is the team? We review support
                options, community resources, and the overall reputation for customer service.
              </p>
            </div>
            <div className="rounded-xl border border-white/8 bg-slate-900/40 p-4">
              <h3 className="text-sm font-semibold text-white mb-1">Security &amp; Trust</h3>
              <p className="text-sm text-slate-400">
                For tools that handle sensitive data, we look at encryption standards, compliance
                certifications, data handling policies, and the company&apos;s security track record.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Why We Don&apos;t Use Numerical Scores</h2>
          <p>
            You won&apos;t find star ratings or numerical scores on FindersList. We believe
            reducing a complex product to a single number oversimplifies the decision and often
            misleads more than it helps. A tool rated &ldquo;4.5 out of 5&rdquo; tells you
            almost nothing about whether it&apos;s right for your specific situation.
          </p>
          <p className="mt-3">
            Instead, we provide detailed pros and cons, real-world use cases, and category
            context so you can evaluate each option against your own priorities. The best budgeting
            app for a freelancer is different from the best one for a family of five — and our
            format lets you see why.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Editorial Independence</h2>
          <p>
            Some tools on FindersList include affiliate links. When you click one of these links
            and make a purchase, we may earn a small commission at no extra cost to you. This
            revenue helps us keep the site free and continue our research.
          </p>
          <p className="mt-3 font-medium text-white">
            Affiliate relationships never influence our reviews, rankings, or recommendations.
          </p>
          <p className="mt-3">
            Tools with affiliate partnerships receive the same evaluation as those without. We
            list tools we genuinely believe are worth considering — many of our listings have no
            affiliate relationship at all. Placement in our directories is determined by editorial
            judgment, not by commercial agreements.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">How We Stay Current</h2>
          <p>
            The tools and services landscape changes constantly — new products launch, pricing
            changes, features get added or removed. We regularly revisit our directories to update
            descriptions, adjust pros and cons, add new entrants, and retire tools that no longer
            meet our standards.
          </p>
          <p className="mt-3">
            If you notice outdated information on any listing, we encourage you to let us know.
            Keeping our directories accurate is a continuous process, and reader feedback is
            invaluable.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Suggest a Correction</h2>
          <p>
            Found something inaccurate, outdated, or misleading? We take corrections seriously.
            Visit our{" "}
            <Link href="/contact" className="text-violet-400 hover:text-violet-300 underline">
              Contact page
            </Link>{" "}
            to report an issue, and our editorial team will review it promptly.
          </p>
        </section>
      </div>
    </div>
  );
}
