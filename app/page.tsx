import { getSiteSettings } from "@/lib/sanity"
import Image from "next/image"
import DebugInfo from "@/components/debug-info"

export default async function Home() {
  const siteSettings = await getSiteSettings()

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-black center-container">
      <div className="flex flex-col items-center justify-center logo-container">
        {/* Logo */}
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

        {/* Site Title */}
        {siteSettings?.title && siteSettings.title.trim() !== "" && (
          <h1
            className="mt-[30px] text-xl font-bold text-white site-title"
            style={{
              marginTop: "30px",
              fontSize: "1.25rem",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {siteSettings.title}
          </h1>
        )}

        {/* Logo Text - Only render if not empty */}
        {siteSettings?.logoText && siteSettings.logoText.trim() !== "" && (
          <div
            className="mt-4 font-mono text-[0.85rem] text-white logo-text"
            style={{
              marginTop: "1rem",
              fontFamily: "monospace",
              fontSize: "0.85rem",
              color: "white",
            }}
          >
            {siteSettings.logoText}
          </div>
        )}
      </div>

      {/* Debug component - only visible in development */}
      <DebugInfo data={siteSettings} />
    </div>
  )
}
