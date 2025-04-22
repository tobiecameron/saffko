import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black">
      <div className="relative flex place-items-center mb-8">
        <Image src="/logo.png" alt="Logo" width={180} height={37} priority />
      </div>
      <div className="flex gap-4">
        <Link href="/blog" className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors">
          Visit Blog
        </Link>
        <Link href="/studio" className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors">
          Sanity Studio
        </Link>
      </div>
    </main>
  )
}
