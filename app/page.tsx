import { getSiteSettings } from "@/lib/sanity"
import Image from "next/image"

export default async function Home() {
  const siteSettings = await getSiteSettings()

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-black center-container">
      <div className="flex flex-col items-center justify-center logo-container">
        {/* Optional: Display site title above the logo */}
        {siteSettings?.title && (
          <h1
            className="mb-8 text-2xl font-bold text-white"
            style={{
              marginBottom: "2rem",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {siteSettings.title}
          </h1>
        )}

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

        {siteSettings?.logoText && (
          <div
            className="mt-[30px] font-mono text-[0.85rem] text-white"
            style={{
              marginTop: "30px",
              fontFamily: "monospace",
              fontSize: "0.85rem",
              color: "white",
            }}
          >
            {siteSettings.logoText}
          </div>
        )}
      </div>
    </div>
  )
}
