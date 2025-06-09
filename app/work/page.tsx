export const revalidate = 60 // Revalidate at most once per minute

import { getAllWorkItems } from "@/lib/sanity"
import Link from "next/link"
import Image from "next/image"

export default async function WorkPage() {
  const workItems = await getAllWorkItems()

  return (
    <main className="min-h-screen p-8 bg-black relative">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Our Work</h1>

        <Link href="/" className="text-white hover:text-gray-300 transition-colors mb-8 inline-block">
          Back to Home
        </Link>

        {workItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {workItems.map((item) => (
              <article key={item._id} className="border border-gray-800 rounded-lg overflow-hidden">
                {item.image && (
                  <div className="relative h-48 w-full">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">
                    <Link href={`/work/${item.slug}`} className="hover:text-gray-300 transition-colors">
                      {item.title}
                    </Link>
                  </h2>
                  {item.client && <p className="text-sm text-gray-400 mb-2">Client: {item.client}</p>}
                  {item.excerpt && <p className="text-gray-300 mb-4">{item.excerpt}</p>}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-800 text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-center py-10 text-gray-400">No work items found.</p>
        )}
      </div>

      <div className="text-center mt-12 pb-4 font-mono text-[0.85rem]" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
        <a href="mailto:angus@ipmc.com.au" style={{ color: "rgba(255, 255, 255, 0.5)", textDecoration: "none" }}>
          angus@ipmc.com.au
        </a>
      </div>
    </main>
  )
}
