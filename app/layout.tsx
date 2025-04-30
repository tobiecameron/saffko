import type React from "react"
import "./globals.css"
import "./tailwind-fix.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { getSiteSettings } from "@/lib/sanity"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings()
  const siteTitle = siteSettings?.title || "BLOKHOUSE"

  // Get favicon URLs if they exist
  const faviconUrl = siteSettings?.favicon?.mainIcon?.asset?.url
  const appleTouchIconUrl = siteSettings?.favicon?.appleTouchIcon?.asset?.url

  // Add metadataBase to fix the warning during build
  return {
    title: siteTitle,
    description: "design and engagement solutions",
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://blokhouse.xyz"),
    openGraph: {
      title: siteTitle,
      description: "design and engagement solutions",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: "design and engagement solutions",
    },
    // Add favicon icons if they exist
    icons: {
      icon: faviconUrl ? [{ url: faviconUrl }] : undefined,
      apple: appleTouchIconUrl ? { url: appleTouchIconUrl } : undefined,
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ overflow: "hidden" }}>
      <body className={inter.className} style={{ overflow: "hidden", margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
