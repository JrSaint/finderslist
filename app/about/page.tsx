import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — FindersList",
  description:
    "Learn about FindersList — a curated directory platform helping people find the best tools, services, and providers across 100+ categories.",
  alternates: { canonical: "https://finderslist.com/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-slate-300 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-slate-300">About Us</span>
      </nav>

      <h1 className="text-3xl font-bold text-white mb-2">About FindersList</h1>
      <p className="text-sm text-slate-500 mb-10">
        The directory platform built to help you make better decisions.
      </p>

      <div className="prose prose-invert prose-slate max-w-none space-y-8 text-slate-300 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Our Mission</h2>
          <p>
            FindersList was created with a simple goal: help people cut through the noise and find the
            right tools, software, and services for their needs. Whether you&apos;re a small business
            owner searching for accounting software, a startup comparing project management tools, or
            a family shopping for the best home insurance — we want to be the most helpful, honest
            resource you find.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">What We Do</h2>
          <p className="mb-3">
            We research, review, and organize tools and services into curated directories spanning
            100+ categories — from business software and finance to insurance, education, health, and
            home services. Each directory includes:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400">
            <li>
              <strong className="text-slate-300">Honest Reviews:</strong> We write original,
              detailed descriptions highlighting what each tool does well and where it falls short.
              No fluff, no paid rankings.
            </li>
            <li>
              <strong className="text-slate-300">Category Browsing:</strong> Every directory is
              organized into meaningful sub-categories so you can quickly narrow down your options.
            </li>
            <li>
              <strong className="text-slate-300">Pricing Transparency:</strong> We clearly label
              each listing as Free, Freemium, or Paid so you know upfront what to expect.
            </li>
            <li>
              <strong className="text-slate-300">Real Pros &amp; Cons:</strong> Featured tools
              include balanced pros, cons, and real-world use cases to help you evaluate fit.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">
            How We Make Money
          </h2>
          <p>
            FindersList is free to use. We earn revenue through display advertising (Google AdSense)
            and affiliate partnerships with some of the tools and services listed on our site. When
            you click an affiliate link and make a purchase, we may receive a small commission at no
            extra cost to you. This never influences our reviews or rankings — editorial independence
            is central to our credibility.
          </p>
          <p className="mt-3">
            Affiliate links are always clearly disclosed. You can read more in our{" "}
            <Link href="/privacy" className="text-violet-400 hover:text-violet-300 underline">
              Privacy Policy &amp; Affiliate Disclosure
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Our Editorial Standards</h2>
          <p>
            We hold ourselves to strict editorial standards. For a detailed look at how we
            research, evaluate, and review every tool and service, read our{" "}
            <Link href="/methodology" className="text-violet-400 hover:text-violet-300 underline">
              full methodology
            </Link>
            .
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400 mt-3">
            <li>All content is original — we never copy or scrape from other websites.</li>
            <li>
              We only list real, established tools and services that we have researched and
              verified.
            </li>
            <li>
              Affiliate relationships do not affect placement, scoring, or editorial opinions.
            </li>
            <li>
              We regularly update our directories to ensure accuracy and relevance.
            </li>
            <li>
              We clearly disclose advertising and affiliate relationships.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">Get in Touch</h2>
          <p>
            Have questions, feedback, or want to suggest a tool for inclusion? We&apos;d love to hear
            from you. Visit our{" "}
            <Link href="/contact" className="text-violet-400 hover:text-violet-300 underline">
              Contact page
            </Link>{" "}
            to reach our team.
          </p>
        </section>
      </div>
    </div>
  );
}
