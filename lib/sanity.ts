import { createClient } from "next-sanity"

const projectId = "z3tni9rr"
const dataset = "production"
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-05-03"

// Allow disabling CDN via env var for immediate updates when needed
const useCdn = process.env.SANITY_USE_CDN !== "false" && process.env.NODE_ENV === "production"

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
      // Add token for preview mode if available
      token: process.env.SANITY_API_TOKEN,
    })
  : null

if (!projectId) {
  console.warn("⚠️ Sanity client not initialized: projectId is missing.")
}

// Create a local cache for data during build time
const localCache = new Map()

// Cache control - default to enabled in production, disabled in development
let isCacheEnabled = process.env.NODE_ENV === "production" && process.env.DISABLE_SANITY_CACHE !== "true"

// Helper function to fetch with caching
async function fetchWithCache(query: string, params?: any) {
  const cacheKey = JSON.stringify({ query, params })

  // Check if we have a cached result and caching is enabled
  if (isCacheEnabled && localCache.has(cacheKey)) {
    console.log("Using cached data for:", { query, params })
    return localCache.get(cacheKey)
  }

  console.log("Fetching fresh data for:", { query, params })

  // Fetch fresh data
  const result = await client?.fetch(query, params)

  // Store in cache if caching is enabled
  if (isCacheEnabled && result !== undefined) {
    localCache.set(cacheKey, result)
  }

  return result
}

// Add a function to clear the cache
export function clearSanityCache() {
  const cacheSize = localCache.size
  localCache.clear()
  console.log(`Cleared Sanity cache (${cacheSize} items)`)
  return cacheSize
}

// Functions to disable and enable cache
export function disableSanityCache() {
  const wasEnabled = isCacheEnabled
  isCacheEnabled = false
  console.log("Sanity cache disabled")
  return wasEnabled
}

export function enableSanityCache() {
  const wasDisabled = !isCacheEnabled
  isCacheEnabled = true
  console.log("Sanity cache enabled")
  return wasDisabled
}

// Get current cache status
export function getSanityCacheStatus() {
  return {
    enabled: isCacheEnabled,
    size: localCache.size,
  }
}

export async function getPosts() {
  if (!projectId) {
    // Return empty array if Sanity is not configured
    console.warn("Sanity project ID not configured")
    return []
  }

  return fetchWithCache(`
    *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt
    }
  `)
}

export async function getPost(slug: string) {
  if (!projectId) {
    // Return null if Sanity is not configured
    console.warn("Sanity project ID not configured")
    return null
  }

  return fetchWithCache(
    `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      content
    }
  `,
    { slug },
  )
}

export async function getSiteSettings() {
  if (!projectId) {
    // Return null if Sanity is not configured
    console.warn("Sanity project ID not configured")
    return null
  }

  try {
    const settings = await fetchWithCache(`
      *[_type == "siteSettings"][0] {
        title,
        logoText,
        logo {
          logoType,
          svgFile {
            asset->{
              url
            }
          },
          imageFile {
            asset->{
              url,
              metadata {
                dimensions
              }
            },
            alt
          },
          width,
          height
        },
        favicon {
          mainIcon {
            asset->{
              url,
              metadata {
                dimensions
              }
            }
          },
          appleTouchIcon {
            asset->{
              url,
              metadata {
                dimensions
              }
            }
          }
        }
      }
    `)

    console.log("Fetched site settings:", settings) // Debug log
    return settings
  } catch (error) {
    console.error("Error fetching site settings:", error)
    return null
  }
}

export async function getHomePageContent() {
  if (!projectId) {
    console.warn("Sanity project ID not configured")
    return null
  }

  try {
    const content = await fetchWithCache(`
      *[_type == "homePage"][0] {
        backgroundImage {
          asset->{
            url,
            metadata {
              dimensions
            }
          },
          alt
        },
        backgroundOverlay {
          overlayType,
          overlayColor,
          overlayOpacity,
          gradientDirection,
          gradientStartOpacity,
          gradientEndOpacity,
          imageOpacity
        },
        heroSection,
        contentSections[] {
          _type,
          _type == "textSection" => {
            heading,
            content,
            backgroundColor,
            textColor
          },
          _type == "imageSection" => {
            image {
              asset->{
                url,
                metadata {
                  dimensions
                }
              },
              alt
            },
            caption,
            size
          },
          _type == "ctaSection" => {
            heading,
            description,
            buttons[] {
              text,
              url,
              style
            }
          }
        },
        seo
      }
    `)

    console.log("Fetched home page content:", content)
    return content
  } catch (error) {
    console.error("Error fetching home page content:", error)
    return null
  }
}

export async function getFeaturedWorkItems() {
  if (!projectId) {
    console.warn("Sanity project ID not configured")
    return []
  }

  return fetchWithCache(`
    *[_type == "workItem" && featured == true] | order(completedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "image": mainImage.asset->url,
      client,
      completedAt,
      tags
    }
  `)
}

export async function getAllWorkItems() {
  if (!projectId) {
    console.warn("Sanity project ID not configured")
    return []
  }

  return fetchWithCache(`
    *[_type == "workItem"] | order(completedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "image": mainImage.asset->url,
      client,
      completedAt,
      tags
    }
  `)
}

export async function getWorkItem(slug: string) {
  if (!projectId) {
    console.warn("Sanity project ID not configured")
    return null
  }

  return fetchWithCache(
    `
    *[_type == "workItem" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      "image": mainImage.asset->url,
      "imageAlt": mainImage.alt,
      excerpt,
      client,
      completedAt,
      tags,
      content
    }
  `,
    { slug },
  )
}
