import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-black">
      <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
      <p className="mb-6">The page you are looking for doesn't exist.</p>
      <Link href="/" className="text-white hover:text-gray-300 transition-colors underline">
        Return Home
      </Link>
    </div>
  )
}
