import { createClient } from "@sanity/client"

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "z3tni9rr",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-05-03",
  useCdn: process.env.NODE_ENV === "production",
})

async function sanityFetch<T>(query: string, params?: Record<string, unknown>): Promise<T> {
  return client.fetch<T>(query, params ?? {}, {
    next: { revalidate: 60 },
  })
}

export async function getSiteSettings() {
  return sanityFetch<any>(`
    *[_type == "siteSettings"][0] {
      title,
      description,
      logoText,
      socialLinks { instagram, twitter, facebook },
      metadata {
        metaTitle,
        ogTitle,
        ogDescription,
        ogType,
        ogImage { asset->{ url }, alt },
        twitterCard,
        twitterTitle,
        twitterDescription,
        twitterImage { asset->{ url }, alt },
        canonicalUrl
      },
      logo {
        logoType,
        svgFile { asset->{ url } },
        imageFile { asset->{ url, metadata { dimensions } }, alt },
        width,
        height
      },
      favicon {
        mainIcon { asset->{ url } },
        appleTouchIcon { asset->{ url } }
      }
    }
  `)
}

export async function getHomePageContent() {
  return sanityFetch<any>(`
    *[_type == "homePage"][0] {
      backgroundImage { asset->{ url, metadata { dimensions } }, alt },
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
        _type == "textSection" => { heading, content, backgroundColor, textColor },
        _type == "imageSection" => {
          image { asset->{ url, metadata { dimensions } }, alt },
          caption,
          size
        },
        _type == "ctaSection" => {
          heading,
          description,
          buttons[] { text, url, style }
        }
      },
      seo
    }
  `)
}

export async function getFeaturedWorkItems() {
  return sanityFetch<any[]>(`
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
  return sanityFetch<any[]>(`
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
  return sanityFetch<any>(
    `*[_type == "workItem" && slug.current == $slug][0] {
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
    }`,
    { slug },
  )
}

export async function getPosts() {
  return sanityFetch<any[]>(`
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
  return sanityFetch<any>(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      excerpt,
      content
    }`,
    { slug },
  )
}
