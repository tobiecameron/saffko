"use client"

interface SVGLogoProps {
  svgCode: string
  width: number
  height: number
}

export default function SVGLogo({ svgCode, width, height }: SVGLogoProps) {
  // Create a div with dangerouslySetInnerHTML to render the SVG
  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      dangerouslySetInnerHTML={{ __html: svgCode }}
      className="flex items-center justify-center"
    />
  )
}
