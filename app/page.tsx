import Link from "next/link"
import { getSiteSettings } from "@/lib/sanity"
import Image from "next/image"

export default async function Home() {
  const siteSettings = await getSiteSettings()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black">
      <div className="relative flex place-items-center mb-8">
        {siteSettings?.logo?.svgFile?.asset?.url ? (
          <div className="flex items-center justify-center">
            <img
              src={siteSettings.logo.svgFile.asset.url || "/placeholder.svg"}
              alt="Logo"
              width={siteSettings.logo.width || 200}
              height={siteSettings.logo.height || 200}
              style={{
                width: `${siteSettings.logo.width || 200}px`,
                height: `${siteSettings.logo.height || 200}px`,
              }}
            />
          </div>
        ) : (
          // Fallback to the original image if no SVG is set
          <Image src="/logo.png" alt="Logo" width={180} height={37} priority />
        )}
      </div>
      <div className="flex gap-4">
        <Link href="/blog" className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors">
          Visit Blog
        </Link>
        <Link href="/studio" className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors">
          Sanity Studio
        </Link>
      </div>
    </main>
  )
}
