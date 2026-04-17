"use client";

import { useState } from "react";

const DIRECTORIES = [
  { value: "ai-tools", label: "🤖 AI Tools" },
  { value: "accounting-software", label: "📊 Accounting Software" },
  { value: "addiction-treatment-centers", label: "🏥 Addiction Treatment Centers" },
  { value: "ai-agent-platforms", label: "🤖 AI Agent Platforms" },
  { value: "ai-coding-assistants", label: "💻 AI Coding Assistants" },
  { value: "ai-video-generators", label: "🎬 AI Video Generators" },
  { value: "analytics-tools", label: "📈 Analytics Tools" },
  { value: "applicant-tracking-systems", label: "👤 Applicant Tracking Systems" },
  { value: "appointment-scheduling-software", label: "📅 Appointment Scheduling" },
  { value: "auto-insurance", label: "🚗 Auto Insurance" },
  { value: "background-check-services", label: "🔍 Background Check Services" },
  { value: "bankruptcy-lawyers", label: "⚖️ Bankruptcy Lawyers" },
  { value: "budgeting-apps", label: "💰 Budgeting Apps" },
  { value: "business-insurance", label: "🏢 Business Insurance" },
  { value: "business-loans", label: "💵 Business Loans" },
  { value: "business-password-managers", label: "🔒 Business Password Managers" },
  { value: "business-phone-systems", label: "📞 Business Phone Systems" },
  { value: "business-tax-software", label: "🧾 Business Tax Software" },
  { value: "business-vpn-software", label: "🛡️ Business VPN Software" },
  { value: "contract-management-software", label: "📝 Contract Management" },
  { value: "credit-cards", label: "💳 Credit Cards" },
  { value: "credit-repair-services", label: "📋 Credit Repair Services" },
  { value: "creator-tools", label: "🎬 Creator Tools" },
  { value: "crm-tools", label: "🤝 CRM & Sales" },
  { value: "cryptocurrency-exchanges", label: "₿ Cryptocurrency Exchanges" },
  { value: "debt-relief-services", label: "💸 Debt Relief Services" },
  { value: "design-tools", label: "🎨 Design Tools" },
  { value: "developer-tools", label: "💻 Developer Tools" },
  { value: "document-management-software", label: "📄 Document Management" },
  { value: "dui-lawyers", label: "⚖️ DUI Lawyers" },
  { value: "ecommerce-inventory-software", label: "📦 E-commerce Inventory" },
  { value: "ecommerce-platforms", label: "🛍️ E-commerce Platforms" },
  { value: "ecommerce-tools", label: "🛒 E-commerce Tools" },
  { value: "elearning-tools", label: "🎓 eLearning Tools" },
  { value: "email-tools", label: "✉️ Email Marketing" },
  { value: "endpoint-security-software", label: "🔐 Endpoint Security" },
  { value: "erp-software", label: "🏭 ERP Software" },
  { value: "estate-planning-services", label: "📜 Estate Planning" },
  { value: "expense-management-software", label: "💼 Expense Management" },
  { value: "field-service-management", label: "🔧 Field Service Management" },
  { value: "finance-tools", label: "💰 Finance Tools" },
  { value: "fitness-apps", label: "💪 Fitness Apps" },
  { value: "fleet-management-software", label: "🚛 Fleet Management" },
  { value: "gold-ira-companies", label: "🥇 Gold IRA Companies" },
  { value: "health-insurance", label: "🏥 Health Insurance" },
  { value: "home-insurance", label: "🏠 Home Insurance" },
  { value: "home-security-systems", label: "🔒 Home Security Systems" },
  { value: "home-warranty-companies", label: "🏡 Home Warranty" },
  { value: "hosting-tools", label: "☁️ Hosting & Cloud" },
  { value: "hotel-booking-platforms", label: "🏨 Hotel Booking" },
  { value: "hr-tools", label: "👥 HR Tools" },
  { value: "hris-software", label: "👤 HRIS Software" },
  { value: "identity-theft-protection", label: "🛡️ Identity Theft Protection" },
  { value: "inventory-management-software", label: "📦 Inventory Management" },
  { value: "investment-platforms", label: "📈 Investment Platforms" },
  { value: "invoicing-billing-software", label: "🧾 Invoicing & Billing" },
  { value: "legal-tools", label: "⚖️ Legal Tools" },
  { value: "life-insurance", label: "❤️ Life Insurance" },
  { value: "llc-formation-services", label: "🏢 LLC Formation Services" },
  { value: "marketing-tools", label: "📢 Marketing Tools" },
  { value: "medical-billing-software", label: "🏥 Medical Billing Software" },
  { value: "mental-health-apps", label: "🧠 Mental Health Apps" },
  { value: "mesothelioma-lawyers", label: "⚖️ Mesothelioma Lawyers" },
  { value: "mortgage-lenders", label: "🏠 Mortgage Lenders" },
  { value: "mortgage-lending-software", label: "🏦 Mortgage Lending Software" },
  { value: "moving-companies", label: "📦 Moving Companies" },
  { value: "no-code-tools", label: "🔧 No-Code Tools" },
  { value: "online-degree-programs", label: "🎓 Online Degree Programs" },
  { value: "online-tutoring-platforms", label: "📚 Online Tutoring" },
  { value: "payment-processing", label: "💳 Payment Processing" },
  { value: "payroll-software", label: "💵 Payroll Software" },
  { value: "personal-injury-lawyers", label: "⚖️ Personal Injury Lawyers" },
  { value: "personal-loans", label: "💰 Personal Loans" },
  { value: "pest-control-services", label: "🐛 Pest Control Services" },
  { value: "pos-systems", label: "🏪 POS Systems" },
  { value: "productivity-tools", label: "⚡ Productivity Tools" },
  { value: "project-management-software", label: "📋 Project Management" },
  { value: "real-estate-software", label: "🏠 Real Estate Software" },
  { value: "robo-advisors", label: "🤖 Robo-Advisors" },
  { value: "security-tools", label: "🔒 Security Tools" },
  { value: "social-media-tools", label: "📱 Social Media Tools" },
  { value: "solar-panel-companies", label: "☀️ Solar Panel Companies" },
  { value: "structured-settlement-companies", label: "💼 Structured Settlements" },
  { value: "student-loans", label: "🎓 Student Loans" },
  { value: "subscription-billing-platforms", label: "🔄 Subscription Billing" },
  { value: "supply-chain-software", label: "🔗 Supply Chain Software" },
  { value: "support-tools", label: "🎧 Customer Support Tools" },
  { value: "tax-preparation-software", label: "🧾 Tax Preparation Software" },
  { value: "tax-relief-services", label: "💰 Tax Relief Services" },
  { value: "telehealth-platforms", label: "🩺 Telehealth Platforms" },
  { value: "test-prep-services", label: "📝 Test Prep Services" },
  { value: "time-tracking-software", label: "⏱️ Time Tracking Software" },
  { value: "travel-insurance", label: "✈️ Travel Insurance" },
  { value: "vacation-rental-platforms", label: "🏖️ Vacation Rental Platforms" },
  { value: "virtual-data-rooms", label: "🗄️ Virtual Data Rooms" },
  { value: "warehouse-management-software", label: "🏭 Warehouse Management" },
  { value: "website-builders", label: "🌐 Website Builders" },
  { value: "workers-comp-insurance", label: "🦺 Workers Comp Insurance" },
];

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
