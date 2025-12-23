import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { SocialBar } from "@/components/social-bar"

import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://stanleykamau.netlify.app/"),
  title: {
    default: "Stanley Mutua | Fullstack Developer",
    template: "%s | Stanley Mutua",
  },
  description:
    "Fullstack Engineer specializing in scalable systems, AI technologies, and modern web development.",
  keywords: ["Fullstack Developer", "Software Engineer", "React", "Next.js", "Node.js", "AI", "RAG", "Stanley Mutua"],
  authors: [{ name: "Stanley Mutua" }],
  creator: "Stanley Mutua",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stanleykamau.netlify.app/",
    title: "Stanley Mutua | Fullstack Developer",
    description: "Fullstack Engineer specializing in scalable systems, AI technologies, and modern web development.",
    siteName: "Stanley Mutua Portfolio",
    images: [
      {
        url: "/og-image.png", // You should add this image to your public folder
        width: 1200,
        height: 630,
        alt: "Stanley Mutua Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stanley Mutua | Fullstack Developer",
    description: "Fullstack Engineer specializing in scalable systems, AI technologies, and modern web development.",
    creator: "@stanleymutua", // Replace with your Twitter handle
    images: ["/og-image.png"],
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
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon-dark-32x32.png",
        type: "image/png",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SocialBar />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
