import type React from "react"

interface SVGLogoProps {
  logoText?: string
}

const SVGLogo: React.FC<SVGLogoProps> = ({ logoText }) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 500 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="paint0_linear" x1="0" y1="0" x2="500" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
      </defs>
      <rect width="500" height="10" fill="url(#paint0_linear)" />
      <path d="M25 25H475V125H25V25Z" fill="#111827" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="4rem"
        fill="white"
        fontFamily="sans-serif"
        fontWeight="bold"
        style={{ fontFamily: "sans-serif", fontWeight: "bold" }}
      >
        SAFFKO
      </text>
      <div
        className="mt-[30px] font-mono text-[0.85rem] text-white logo-text drop-shadow-lg"
        style={{ marginTop: "30px", fontFamily: "monospace", fontSize: "0.85rem", color: "white" }}
      >
        {logoText || "saffko.com"}
      </div>
    </svg>
  )
}

export default SVGLogo
