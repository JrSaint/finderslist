"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "fl-cookie-consent-v1";

type Choice = "accepted" | "rejected" | null;

export default function CookieConsent() {
  const [choice, setChoice] = useState<Choice>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(STORAGE_KEY) as Choice;
    setChoice(saved ?? null);
  }, []);

  function persist(next: Exclude<Choice, null>) {
    localStorage.setItem(STORAGE_KEY, next);
    setChoice(next);
    // Tell Google's consent mode about the choice
    if (typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      const gtag = (window as unknown as { gtag: (...args: unknown[]) => void }).gtag;
      gtag("consent", "update", {
        ad_storage: next === "accepted" ? "granted" : "denied",
        ad_user_data: next === "accepted" ? "granted" : "denied",
        ad_personalization: next === "accepted" ? "granted" : "denied",
        analytics_storage: next === "accepted" ? "granted" : "denied",
      });
    }
  }

  if (!mounted || choice !== null) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-slate-950/95 backdrop-blur-md border-t border-white/10 shadow-2xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div className="flex-1 text-sm text-slate-300">
            <p>
              We use cookies to analyze traffic and serve personalized ads. By accepting, you agree to our use of cookies.{" "}
              <Link href="/privacy" className="text-violet-400 hover:text-violet-300 underline">
                Learn more
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => persist("rejected")}
              className="rounded-lg border border-white/10 hover:border-white/20 px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
            >
              Reject
            </button>
            <button
              onClick={() => persist("accepted")}
              className="rounded-lg bg-violet-600 hover:bg-violet-500 px-4 py-2 text-sm font-semibold text-white transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
