import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { SocialBar } from "@/components/social-bar"
import { SmoothScroll } from "@/components/smooth-scroll"
import { CursorSpotlight } from "@/components/cursor-spotlight"
import { GrainOverlay } from "@/components/grain-overlay"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CommandPalette } from "@/components/command-palette"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/sonner"

import "./globals.css"

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  metadataBase: new URL("https://stanspace.uk/"),
  title: {
    default: "Stanley Kamau | Software Engineer — Frontend & Systems",
    template: "%s | Stanley Kamau",
  },
  description:
    "Software Engineer shipping scalable systems, production banking systems & AI technologies, and modern web development.",
  keywords: ["Fullstack Developer", "Software Engineer", "React", "Next.js", "Node.js", "AI", "RAG", "Stanley Kamau"],
  authors: [{ name: "Stanley Kamau" }],
  creator: "Stanley Kamau",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stanspace.uk/",
    title: "Stanley Kamau | Software Engineer — Frontend & Systems",
    description: "Software Engineer shipping scalable systems, production banking systems & AI technologies, and modern web development.",
    siteName: "Stanley Kamau Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stanley Kamau | Software Engineer — Frontend & Systems",
    description: "Software Engineer shipping scalable systems, production banking systems & AI technologies, and modern web development.",
    creator: "@stanleymutua",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://stanspace.uk/",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-(--z-skip) focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-lg"
        >
          Skip to content
        </a>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SmoothScroll />
          <CursorSpotlight />
          <GrainOverlay />
          <SocialBar />
          {children}
          <Footer />
          <ScrollToTop />
          <CommandPalette />
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
