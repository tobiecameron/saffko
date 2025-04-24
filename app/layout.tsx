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

  return {
    title: siteTitle,
    description: "design and engagment solutions",
    openGraph: {
      title: siteTitle,
      description: "design and engagment solutions",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: "design and engagment solutions",
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
// test 