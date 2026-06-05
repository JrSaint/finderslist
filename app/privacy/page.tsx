import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "FindersList privacy policy — how we collect, use, and protect your information.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  const lastUpdated = "March 26, 2026";

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
        <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-slate-300">Privacy Policy</span>
      </nav>

      <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
      <p className="text-sm text-slate-500 mb-10">Last updated: {lastUpdated}</p>

      <div className="prose prose-invert prose-slate max-w-none space-y-8 text-slate-300 leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
          <p>
            FindersList (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates finderslist.com (the &quot;Site&quot;). This Privacy Policy
            explains how we collect, use, disclose, and safeguard your information when you visit our website.
            Please read this policy carefully. If you disagree with its terms, please discontinue use of the Site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
          <p className="mb-3">We may collect information about you in various ways:</p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400">
            <li>
              <strong className="text-slate-300">Log Data:</strong> When you visit the Site, our servers automatically record information including your IP address, browser type, referring/exit pages, and date/time stamps.
            </li>
            <li>
              <strong className="text-slate-300">Cookies:</strong> We use cookies and similar tracking technologies to track activity on the Site and store certain information. You can instruct your browser to refuse cookies, though some parts of the Site may not function properly.
            </li>
            <li>
              <strong className="text-slate-300">Usage Data:</strong> We collect information on how the Site is accessed and used, including pages visited, time spent on pages, and links clicked.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">3. Google AdSense & Advertising</h2>
          <p className="mb-3">
            We use Google AdSense to display advertisements on the Site. Google AdSense uses cookies to serve ads
            based on your prior visits to this and other websites.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400">
            <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visits to this and/or other sites on the Internet.</li>
            <li>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline">Google Ads Settings</a>.</li>
            <li>You can also opt out via the <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline">Network Advertising Initiative opt-out page</a>.</li>
            <li>For more information on how Google uses data, visit <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline">How Google uses data when you use our partners&apos; sites or apps</a>.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">4. Affiliate Links Disclosure</h2>
          <p>
            FindersList participates in affiliate marketing programs. Some links on this Site are affiliate links,
            meaning we may earn a commission at no additional cost to you if you click through and make a purchase
            or sign up for a service. Affiliate links are clearly marked with &quot;* Affiliate link&quot; or noted in our
            footer disclosure. We only recommend tools and services we believe provide genuine value.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">5. Third-Party Services</h2>
          <p className="mb-3">
            Our Site may contain links to third-party websites and services. We are not responsible for the
            privacy practices or content of these third parties. We encourage you to review the privacy policies
            of any third-party sites you visit.
          </p>
          <p>
            Third-party services we use may include analytics providers and advertising networks, each of which
            may collect data subject to their own privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">6. Cookies Policy</h2>
          <p className="mb-3">We use the following types of cookies:</p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400">
            <li><strong className="text-slate-300">Essential Cookies:</strong> Required for the Site to function correctly.</li>
            <li><strong className="text-slate-300">Analytics Cookies:</strong> Help us understand how visitors use the Site.</li>
            <li><strong className="text-slate-300">Advertising Cookies:</strong> Used by Google AdSense to serve relevant ads.</li>
          </ul>
          <p className="mt-3">
            You can control cookies through your browser settings. Note that disabling cookies may affect
            Site functionality.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">7. Data Retention</h2>
          <p>
            We retain log data for a limited period necessary to fulfill the purposes outlined in this policy,
            unless a longer retention period is required or permitted by law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">8. Children&apos;s Privacy</h2>
          <p>
            The Site is not directed to children under the age of 13. We do not knowingly collect personal
            information from children under 13. If you are a parent or guardian and believe your child has
            provided us with personal information, please contact us.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">9. Your Rights</h2>
          <p className="mb-3">Depending on your location, you may have the following rights:</p>
          <ul className="list-disc pl-6 space-y-2 text-slate-400">
            <li>The right to access personal data we hold about you</li>
            <li>The right to request correction or deletion of your personal data</li>
            <li>The right to opt out of targeted advertising</li>
            <li>The right to data portability (where applicable under GDPR or CCPA)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">10. California Privacy Rights (CCPA)</h2>
          <p>
            California residents have the right to know what personal information we collect, the right to
            request deletion, and the right to opt out of the sale of personal information. We do not sell
            personal information. To exercise these rights, please contact us.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">11. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting
            the new policy on this page and updating the &quot;Last updated&quot; date. You are advised to review this
            policy periodically.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white mb-3">12. Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy, please contact us at:{" "}
            <a href="mailto:hello@finderslist.com" className="text-violet-400 hover:text-violet-300 underline">
              hello@finderslist.com
            </a>
          </p>
        </section>

      </div>
    </div>
  );
}
