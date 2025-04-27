export const revalidate = 60 // Revalidate at most once per minute

import { getSiteSettings } from "@/lib/sanity"
import Image from "next/image"
import DebugInfo from "@/components/debug-info"
import Link from "next/link"

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

        {/* Logo Text - Only render if not empty */}
        {siteSettings?.logoText && siteSettings.logoText.trim() !== "" && (
          <div
            className="mt-[30px] font-mono text-[0.85rem] text-white logo-text"
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

      {/* Email address at the bottom */}
      <div className="fixed bottom-4 text-[0.85rem] text-white font-mono">
        <Link href="mailto:t@blokhouse.xyz" className="hover:text-gray-300 transition-colors">
          t@blokhouse.xyz
        </Link>
      </div>

      {/* Debug component - only visible in development */}
      {process.env.NODE_ENV !== "production" && <DebugInfo data={siteSettings} />}
    </div>
  )
}
