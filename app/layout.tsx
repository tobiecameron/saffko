import type React from "react"
import "./globals.css"
import "./tailwind-fix.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "saffko",
  description: "design and engagement solutions",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://blokhouse.xyz"),
  openGraph: {
    title: "saffko",
    description: "design and engagement solutions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "saffko",
    description: "design and engagement solutions",
  },
    generator: 'v0.dev'
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
