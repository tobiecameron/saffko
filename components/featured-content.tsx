"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface FeaturedContentProps {
  items: {
    title: string
    description: string
    image?: string
    slug?: string
  }[]
}

export default function FeaturedContent({ items }: FeaturedContentProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!items || items.length === 0) return null

  return (
    <div className="w-full max-w-6xl mx-auto mt-16 px-4">
      <h2 className="text-2xl font-bold mb-8 text-white">Featured Work</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 transition-colors"
          >
            {item.image && (
              <div className="relative h-48 w-full">
                <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 mb-4">{item.description}</p>

              {item.slug && (
                <Link
                  href={`/work/${item.slug}`}
                  className="inline-flex items-center text-blue-400 hover:text-blue-300"
                >
                  View details <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
