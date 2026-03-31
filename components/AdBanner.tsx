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
    if (process.env.NODE_ENV === "production") {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch {
        // AdSense not yet loaded
      }
    }
  }, []);

  // Show placeholder in development
  if (process.env.NODE_ENV === "development") {
    return (
      <div className={`flex items-center justify-center rounded-xl border border-dashed border-white/10 bg-slate-900/30 text-slate-600 text-xs ${className}`}>
        <span>📢 Ad</span>
      </div>
    );
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        {...(slot ? { "data-ad-slot": slot } : {})}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
