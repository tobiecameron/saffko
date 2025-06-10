import type React from "react"
import "./globals.css"
import "./tailwind-fix.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { getSiteSettings } from "@/lib/sanity"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSiteSettings()

    const defaultTitle = "saffko"
    const defaultDescription = "design and engagement solutions"
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://saffko.com"

    const title = settings?.title || defaultTitle
    const description = settings?.description || defaultDescription
    const metadata = settings?.metadata || {}

    return {
      title: metadata.metaTitle || title,
      description: metadata.metaDescription || description,
      metadataBase: new URL(siteUrl),
      openGraph: {
        title: metadata.ogTitle || title,
        description: metadata.ogDescription || description,
        type: metadata.ogType || "website",
        ...(metadata.ogImage?.asset?.url && {
          images: [
            {
              url: metadata.ogImage.asset.url,
              width: 1200,
              height: 630,
              alt: metadata.ogImage.alt || title,
            },
          ],
        }),
      },
      twitter: {
        card: metadata.twitterCard || "summary_large_image",
        title: metadata.twitterTitle || metadata.ogTitle || title,
        description: metadata.twitterDescription || metadata.ogDescription || description,
        ...(metadata.twitterImage?.asset?.url && {
          images: [
            {
              url: metadata.twitterImage.asset.url,
              width: 1200,
              height: 630,
              alt: metadata.twitterImage.alt || title,
            },
          ],
        }),
      },
      ...(metadata.canonicalUrl && {
        alternates: {
          canonical: metadata.canonicalUrl,
        },
      }),
      generator: "v0.dev",
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: "saffko",
      description: "design and engagement solutions",
      metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://saffko.com"),
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
      generator: "v0.dev",
    }
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
