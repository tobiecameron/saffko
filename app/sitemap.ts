import { MetadataRoute } from "next"
import { getPosts, getAllWorkItems } from "@/lib/sanity"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://saffko.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, workItems] = await Promise.all([getPosts(), getAllWorkItems()])

  const postRoutes = (posts ?? []).map((post: any) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  const workRoutes = (workItems ?? []).map((item: any) => ({
    url: `${BASE_URL}/work/${item.slug}`,
    lastModified: item.completedAt ? new Date(item.completedAt) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/work`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    ...workRoutes,
    ...postRoutes,
  ]
}
