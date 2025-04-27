export const revalidate = 60 // Revalidate at most once per minute

import { getPost } from "@/lib/sanity"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen p-8 bg-black">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="text-white hover:text-gray-300 transition-colors mb-8 inline-block">
          ← Back to Blog
        </Link>

        <article className="mt-8">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

          {post.publishedAt && (
            <p className="text-sm text-gray-400 mb-8">{new Date(post.publishedAt).toLocaleDateString()}</p>
          )}

          <div className="prose prose-invert max-w-none">{post.content && <PortableText value={post.content} />}</div>
        </article>

        {/* Email address at the bottom - updated to hello@blokhouse.xyz and 50% darker */}
        <div className="text-center mt-12 pb-4 font-mono text-[0.85rem]" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
          <a href="mailto:hello@blokhouse.xyz" style={{ color: "rgba(255, 255, 255, 0.5)", textDecoration: "none" }}>
            hello@blokhouse.xyz
          </a>
        </div>
      </div>
    </main>
  )
}
