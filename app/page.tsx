import { getSiteSettings } from "@/lib/sanity"
import Image from "next/image"

export default async function Home() {
  const siteSettings = await getSiteSettings()

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black center-container">
      <div className="flex items-center justify-center logo-container">
        {siteSettings?.logo?.svgFile?.asset?.url ? (
          <img
            src={siteSettings.logo.svgFile.asset.url || "/placeholder.svg"}
            alt="Logo"
            style={{
              width: `${siteSettings.logo.width || 200}px`,
              height: `${siteSettings.logo.height || 200}px`,
            }}
          />
        ) : (
          <div>
            <Image src="/logo.png" alt="Logo" width={180} height={37} priority />
          </div>
        )}
      </div>
    </div>
  )
}
