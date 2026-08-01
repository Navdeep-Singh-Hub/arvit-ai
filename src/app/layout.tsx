import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/constants";
import { Providers } from "@/components/providers/providers";
import { Preloader } from "@/components/effects/preloader";
import { CursorGlow } from "@/components/effects/cursor-glow";
import { ScrollProgressBar } from "@/components/layout/scroll-progress-bar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/layout/back-to-top";
import { PageTransition } from "@/components/providers/page-transition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const TITLE = `${SITE.name} — AAC Tablet & Therapy Tablet`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: TITLE,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "therapy tablet",
    "AAC tablet",
    "AI speech therapy",
    "occupational therapy games",
    "body landmark therapy",
    "adult AAC communication",
    "pediatric therapy tablet",
    "special education tablet",
    "augmentative and alternative communication",
    "therapist dashboard",
    "parent therapy progress",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: TITLE,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased">
        <Providers>
          <Preloader />
          <CursorGlow />
          <ScrollProgressBar />
          <a
            href="#main-content"
            className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[200] focus-visible:rounded-full focus-visible:bg-brand-primary focus-visible:px-5 focus-visible:py-2.5 focus-visible:text-sm focus-visible:font-medium focus-visible:text-white"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" tabIndex={-1} className="relative z-10 flex-1 outline-none">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
