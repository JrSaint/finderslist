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
    "FindersList is a curated directory of the best AI tools for writing, coding, image generation, productivity, and more. Browse 100+ hand-picked AI tools with honest pros, cons, and use cases.",
  keywords: ["AI tools directory", "best AI tools", "AI tools list", "AI software", "AI writing tools", "AI coding tools", "FindersList"],
  metadataBase: new URL("https://finderslist.com"),
  openGraph: {
    type: "website",
    siteName: "FindersList",
    title: "FindersList — Curated Directories",
    description: "Curated directories for everything you're looking for.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FindersList — Curated Directories",
    description: "Curated directories for everything you're looking for.",
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
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
