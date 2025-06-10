"use client"

import type React from "react"
import { Instagram, Twitter, Facebook } from "lucide-react"

interface SocialLinks {
  instagram?: string
  twitter?: string
  facebook?: string
}

interface SVGLogoProps {
  logoText?: string
  socialLinks?: SocialLinks
}

const SVGLogo: React.FC<SVGLogoProps> = ({ logoText, socialLinks }) => {
  return (
    <div className="flex flex-col items-center">
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
      </svg>

      <div
        className="mt-[30px] font-mono text-[0.85rem] text-white logo-text drop-shadow-lg"
        style={{ marginTop: "30px", fontFamily: "monospace", fontSize: "0.85rem", color: "white" }}
      >
        {logoText || "saffko.com"}
      </div>

      {/* Social Media Links */}
      {socialLinks && (socialLinks.instagram || socialLinks.twitter || socialLinks.facebook) && (
        <div className="flex items-center gap-4 mt-3">
          {socialLinks.instagram && (
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-purple-300 transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram size={20} />
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
              <Twitter size={20} />
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
              <Facebook size={20} />
            </a>
          )}
        </div>
      )}
    </div>
  )
}

export default SVGLogo
