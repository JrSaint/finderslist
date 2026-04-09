import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

const ADSENSE_CLIENT = "ca-pub-5534047032969220";

export const metadata: Metadata = {
  title: {
    default: "FindersList — Curated Directories",
    template: "%s | FindersList",
  },
  description:
    "FindersList hosts 100+ curated directories for AI tools, business software, finance, insurance, legal services, health, education, and more. Honest reviews, pricing transparency, and real-world use cases.",
  keywords: ["FindersList", "curated directories", "software reviews", "tool comparison", "best tools 2026"],
  metadataBase: new URL("https://finderslist.com"),
  openGraph: {
    type: "website",
    siteName: "FindersList",
    url: "https://finderslist.com",
    title: "FindersList — Curated Directories for Tools & Services",
    description: "100+ curated directories with honest reviews, pricing transparency, and side-by-side comparisons. Find the right tools for your needs.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "FindersList — Curated Directories" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@finderslist",
    title: "FindersList — Curated Directories for Tools & Services",
    description: "100+ curated directories with honest reviews, pricing transparency, and side-by-side comparisons.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "google-adsense-account": "ca-pub-5534047032969220",
    "impact-site-verification": "1733871c-115a-433f-88da-dca6b4e000d6",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-950 text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        {process.env.NODE_ENV === "production" && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
