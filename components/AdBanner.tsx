"use client";

import { useEffect } from "react";

interface AdBannerProps {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal";
  className?: string;
}

const ADSENSE_CLIENT = "ca-pub-5534047032969220";

export default function AdBanner({ slot, format = "auto", className = "" }: AdBannerProps) {
  useEffect(() => {
    // Only push when we have a valid slot — pushing without a slot causes
    // silent errors in the adsbygoogle queue that block all ads on the page
    if (process.env.NODE_ENV === "production" && slot) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch {
        // Ignore if AdSense not yet loaded
      }
    }
  }, [slot]);

  if (process.env.NODE_ENV === "development") {
    return (
      <div className={`flex items-center justify-center rounded-xl border border-dashed border-white/10 bg-slate-900/30 text-slate-600 text-xs ${className}`}>
        <span>📢 Ad {slot ? `#${slot}` : "(Auto)"}</span>
      </div>
    );
  }

  // Without a slot, skip the <ins> — Auto Ads handles placement via the script
  if (!slot) return null;

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
