export const revalidate = 60 // Revalidate at most once per minute

import { getPosts } from "@/lib/sanity"
import Link from "next/link"

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <main className="min-h-screen p-8 bg-black relative">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Blog</h1>

        <Link href="/" className="text-white hover:text-gray-300 transition-colors mb-8 inline-block">
          Back to Home
        </Link>

        {posts.length > 0 ? (
          <div className="grid gap-6 mt-8">
            {posts.map((post) => (
              <article key={post._id} className="border border-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-gray-300 transition-colors">
                    {post.title}
                  </Link>
                </h2>
                {post.publishedAt && (
                  <p className="text-sm text-gray-400 mb-3">{new Date(post.publishedAt).toLocaleDateString()}</p>
                )}
                {post.excerpt && <p className="text-gray-300">{post.excerpt}</p>}
              </article>
            ))}
          </div>
        ) : (
          <p className="text-center py-10 text-gray-400">No blog posts found.</p>
        )}
      </div>

      {/* Email address at the bottom - updated to hello@blokhouse.xyz and 50% darker */}
      <div className="text-center mt-12 pb-4 font-mono text-[0.85rem]" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
        <a href="mailto:hello@blokhouse.xyz" style={{ color: "rgba(255, 255, 255, 0.5)", textDecoration: "none" }}>
          hello@blokhouse.xyz
        </a>
      </div>
    </main>
  )
}
