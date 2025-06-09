import { PortableText } from "@portabletext/react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface HomeContentProps {
  content: any
}

const portableTextComponents = {
  block: {
    h2: ({ children }: any) => <h2 className="text-2xl font-bold mb-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-semibold mb-3">{children}</h3>,
    normal: ({ children }: any) => <p className="mb-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-gray-500 pl-4 italic my-4">{children}</blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a href={value.href} className="text-blue-400 hover:text-blue-300 underline">
        {children}
      </a>
    ),
  },
}

export default function HomeContent({ content }: HomeContentProps) {
  if (!content) return null

  const getBackgroundClass = (bg: string) => {
    switch (bg) {
      case "black":
        return "bg-black"
      case "gray-900":
        return "bg-gray-900"
      case "white":
        return "bg-white"
      default:
        return "bg-transparent"
    }
  }

  const getTextColorClass = (color: string) => {
    switch (color) {
      case "black":
        return "text-black"
      case "gray-400":
        return "text-gray-400"
      default:
        return "text-white"
    }
  }

  const getImageSizeClass = (size: string) => {
    switch (size) {
      case "small":
        return "max-w-sm"
      case "medium":
        return "max-w-md"
      case "large":
        return "max-w-2xl"
      case "full":
        return "w-full"
      default:
        return "max-w-md"
    }
  }

  const getButtonVariant = (style: string) => {
    switch (style) {
      case "secondary":
        return "secondary"
      case "outline":
        return "outline"
      default:
        return "default"
    }
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      {content.heroSection && (
        <div className="text-center mb-8">
          {content.heroSection.subtitle && (
            <h2 className="text-xl font-semibold mb-4 text-white">{content.heroSection.subtitle}</h2>
          )}
          {content.heroSection.description && (
            <p className="text-gray-300 max-w-2xl mx-auto">{content.heroSection.description}</p>
          )}
        </div>
      )}

      {/* Content Sections */}
      {content.contentSections && content.contentSections.length > 0 && (
        <div className="space-y-12 max-w-4xl mx-auto">
          {content.contentSections.map((section: any, index: number) => (
            <div key={index}>
              {section._type === "textSection" && (
                <div
                  className={`p-8 rounded-lg ${getBackgroundClass(section.backgroundColor)} ${getTextColorClass(section.textColor)}`}
                >
                  {section.heading && <h2 className="text-2xl font-bold mb-6">{section.heading}</h2>}
                  {section.content && (
                    <div className="prose prose-invert max-w-none">
                      <PortableText value={section.content} components={portableTextComponents} />
                    </div>
                  )}
                </div>
              )}

              {section._type === "imageSection" && section.image && (
                <div className={`mx-auto ${getImageSizeClass(section.size)}`}>
                  <Image
                    src={section.image.asset.url || "/placeholder.svg"}
                    alt={section.image.alt || ""}
                    width={section.image.asset.metadata.dimensions.width}
                    height={section.image.asset.metadata.dimensions.height}
                    className="rounded-lg"
                  />
                  {section.caption && <p className="text-center text-gray-400 mt-2 text-sm">{section.caption}</p>}
                </div>
              )}

              {section._type === "ctaSection" && (
                <div className="text-center bg-gray-900 p-8 rounded-lg">
                  {section.heading && <h2 className="text-2xl font-bold mb-4 text-white">{section.heading}</h2>}
                  {section.description && <p className="text-gray-300 mb-6 max-w-2xl mx-auto">{section.description}</p>}
                  {section.buttons && section.buttons.length > 0 && (
                    <div className="flex flex-wrap gap-4 justify-center">
                      {section.buttons.map((button: any, buttonIndex: number) => (
                        <Button key={buttonIndex} variant={getButtonVariant(button.style)} asChild>
                          <a href={button.url}>{button.text}</a>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
