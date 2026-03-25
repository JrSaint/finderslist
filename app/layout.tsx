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
    "FindersList hosts curated directories for AI tools, crafts, and more. Find exactly what you're looking for.",
  keywords: ["directory", "AI tools", "curated lists", "resource directory", "FindersList"],
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
