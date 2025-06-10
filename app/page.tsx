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

  // Render social links
  const renderSocialLinks = () => {
    const socialLinks = siteSettings?.socialLinks
    if (!socialLinks || (!socialLinks.instagram && !socialLinks.twitter && !socialLinks.facebook)) {
      return null
    }

    return (
      <div className="flex items-center gap-4 mt-4">
        {socialLinks.instagram && (
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-purple-300 transition-colors duration-200"
            aria-label="Instagram"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        )}
        {socialLinks.twitter && (
          <a
            href={socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-purple-300 transition-colors duration-200"
            aria-label="X (Twitter)"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        )}
        {socialLinks.facebook && (
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-purple-300 transition-colors duration-200"
            aria-label="Facebook"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
        )}
      </div>
    )
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

          {/* Social Links */}
          {renderSocialLinks()}
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
