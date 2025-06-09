export const revalidate = 60 // Revalidate at most once per minute

import { getWorkItem } from "@/lib/sanity"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"

export default async function WorkItemPage({ params }: { params: { slug: string } }) {
  const workItem = await getWorkItem(params.slug)

  if (!workItem) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })
  }

  return (
    <main className="min-h-screen p-8 bg-black">
      <div className="max-w-4xl mx-auto">
        <Link href="/work" className="text-white hover:text-gray-300 transition-colors mb-8 inline-block">
          ← Back to Work
        </Link>

        <article className="mt-8">
          <h1 className="text-3xl font-bold mb-4">{workItem.title}</h1>

          <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-400">
            {workItem.client && (
              <div>
                <span className="font-semibold">Client:</span> {workItem.client}
              </div>
            )}
            {workItem.completedAt && (
              <div>
                <span className="font-semibold">Completed:</span> {formatDate(workItem.completedAt)}
              </div>
            )}
          </div>

          {workItem.image && (
            <div className="relative w-full h-[400px] mb-8">
              <Image
                src={workItem.image || "/placeholder.svg"}
                alt={workItem.imageAlt || workItem.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}

          {workItem.tags && workItem.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {workItem.tags.map((tag: string, index: number) => (
                <span key={index} className="bg-gray-800 text-xs px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="prose prose-invert max-w-none">
            {workItem.content && <PortableText value={workItem.content} />}
          </div>
        </article>

        <div className="text-center mt-12 pb-4 font-mono text-[0.85rem]" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
          <a href="mailto:angus@ipmc.com.au" style={{ color: "rgba(255, 255, 255, 0.5)", textDecoration: "none" }}>
            angus@ipmc.com.au
          </a>
        </div>
      </div>
    </main>
  )
}
