import { clearSanityCache } from "@/lib/sanity"
import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

// Secret to validate requests
const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET

export async function GET(request: NextRequest) {
  // Only allow in development or with a special header
  const secret = request.nextUrl.searchParams.get("secret")
  if (REVALIDATION_SECRET && secret !== REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 })
  }

  const path = request.nextUrl.searchParams.get("path") || "/"

  try {
    // Clear the Sanity cache
    const clearedItems = clearSanityCache()

    // Revalidate the path
    revalidatePath(path)

    return NextResponse.json({
      clearedCache: true,
      itemsCleared: clearedItems,
      revalidated: true,
      path,
      now: Date.now(),
    })
  } catch (err) {
    return NextResponse.json(
      {
        error: "Error clearing cache",
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
