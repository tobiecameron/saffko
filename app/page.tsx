export const revalidate = 60 // Revalidate at most once per minute

import { getSiteSettings, getHomePageContent, getFeaturedWorkItems } from "@/lib/sanity"
import Image from "next/image"
import DebugInfo from "@/components/debug-info"
import HomeContent from "@/components/home-content"
import FeaturedContent from "@/components/featured-content"

export default async function Home() {
  const [siteSettings, homePageContent, featuredWorkItems] = await Promise.all([
    getSiteSettings(),
    getHomePageContent(),
    getFeaturedWorkItems(),
  ])

  // Transform work items for the featured content component
  const featuredItems = featuredWorkItems.map((item: any) => ({
    title: item.title,
    description: item.excerpt || "",
    image: item.image,
    slug: item.slug,
  }))

  const renderLogo = () => {
    if (!siteSettings?.logo) {
      // Fallback to default logo
      return <Image src="/logo.png" alt="Logo" width={180} height={37} priority />
    }

    const { logoType, svgFile, imageFile, width = 200, height = 200 } = siteSettings.logo

    if (logoType === "svg" && svgFile?.asset?.url) {
      return (
        <img
          src={svgFile.asset.url || "/placeholder.svg"}
          alt="Logo"
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
        />
      )
    }

    if (logoType === "image" && imageFile?.asset?.url) {
      return (
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Image
            src={imageFile.asset.url || "/placeholder.svg"}
            alt={imageFile.alt || "Logo"}
            fill
            style={{
              objectFit: "cover",
            }}
            priority
          />
        </div>
      )
    }

    // Fallback to default logo if no valid logo is configured
    return <Image src="/logo.png" alt="Logo" width={180} height={37} priority />
  }

  // Generate overlay classes based on CMS settings
  const generateOverlayClasses = (overlaySettings: any) => {
    if (!overlaySettings || overlaySettings.overlayType === "none") {
      return ""
    }

    const opacity = overlaySettings.overlayOpacity || 20
    const color = overlaySettings.overlayColor || "black"

    if (overlaySettings.overlayType === "gradient") {
      const direction = overlaySettings.gradientDirection || "to-b"
      const startOpacity = overlaySettings.gradientStartOpacity || 30
      const endOpacity = overlaySettings.gradientEndOpacity || 60

      return `bg-gradient-${direction} from-${color}/${startOpacity} to-${color}/${endOpacity}`
    }

    return `bg-${color}/${opacity}`
  }

  // Generate image opacity
  const generateImageOpacity = (overlaySettings: any) => {
    const opacity = (overlaySettings?.imageOpacity || 95) / 100
    return opacity
  }

  const overlayClasses = generateOverlayClasses(homePageContent?.backgroundOverlay)
  const imageOpacity = generateImageOpacity(homePageContent?.backgroundOverlay)

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center center-container">
      {/* Background Image */}
      {homePageContent?.backgroundImage?.asset?.url && (
        <div className="absolute inset-0 z-0">
          <Image
            src={homePageContent.backgroundImage.asset.url || "/placeholder.svg"}
            alt={homePageContent.backgroundImage.alt || "Background"}
            fill
            style={{
              objectFit: "cover",
              opacity: imageOpacity,
            }}
            priority
          />
          {/* Configurable overlay */}
          {overlayClasses && <div className={`absolute inset-0 ${overlayClasses}`} />}
        </div>
      )}

      {/* Content - removed bg-black/20 that was covering the background */}
      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center logo-container">
          {/* Logo */}
          {renderLogo()}

          {/* Logo Text - Only render if not empty */}
          {siteSettings?.logoText && siteSettings.logoText.trim() !== "" && (
            <div
              className="mt-[30px] font-mono text-[0.85rem] text-white logo-text drop-shadow-lg"
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

        {/* Home Page Content */}
        <div className="mt-12 px-4 w-full max-w-6xl">
          <HomeContent content={homePageContent} />
        </div>

        {/* Featured Work */}
        {featuredItems.length > 0 && <FeaturedContent items={featuredItems} />}

        <div className="email-container">
          <a href="mailto:angus@ipmc.com.au" className="email-link drop-shadow-lg">
            email us
          </a>
        </div>

        {/* Debug component - only visible in development */}
        {process.env.NODE_ENV !== "production" && (
          <DebugInfo data={{ siteSettings, homePageContent, featuredWorkItems }} />
        )}
      </div>
    </div>
  )
}
