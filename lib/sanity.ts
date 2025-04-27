import { createClient } from "next-sanity"
import { cache } from "react"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-05-03"

// Allow disabling CDN via env var for immediate updates when needed
const useCdn = process.env.SANITY_USE_CDN !== "false" && process.env.NODE_ENV === "production"

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  // Add token for preview mode if available
  token: process.env.SANITY_API_TOKEN,
})

// Create cached versions of the functions to avoid duplicate requests
export const getPosts = cache(async () => {
  if (!projectId) {
    // Return empty array if Sanity is not configured
    console.warn("Sanity project ID not configured")
    return []
  }

  return client.fetch(`
    *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt
    }
  `)
})

export const getPost = cache(async (slug: string) => {
  if (!projectId) {
    // Return null if Sanity is not configured
    console.warn("Sanity project ID not configured")
    return null
  }

  return client.fetch(
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
})

export const getSiteSettings = cache(async () => {
  if (!projectId) {
    // Return null if Sanity is not configured
    console.warn("Sanity project ID not configured")
    return null
  }

  try {
    const settings = await client.fetch(`
      *[_type == "siteSettings"][0] {
        title,
        logoText,
        logo {
          svgFile {
            asset->{
              url
            }
          },
          width,
          height
        }
      }
    `)

    console.log("Fetched site settings:", settings) // Debug log
    return settings
  } catch (error) {
    console.error("Error fetching site settings:", error)
    return null
  }
})
