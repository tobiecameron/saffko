import { disableSanityCache, enableSanityCache, getSanityCacheStatus, clearSanityCache } from "@/lib/sanity"
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

  const action = request.nextUrl.searchParams.get("action") || "status"
  const path = request.nextUrl.searchParams.get("path") || "/"

  try {
    let result = {}

    switch (action) {
      case "disable":
        result = { wasEnabled: disableSanityCache() }
        break
      case "enable":
        result = { wasDisabled: enableSanityCache() }
        break
      case "clear":
        result = { itemsCleared: clearSanityCache() }
        break
      case "status":
      default:
        result = getSanityCacheStatus()
        break
    }

    // Revalidate the path if requested
    if (request.nextUrl.searchParams.get("revalidate") === "true") {
      revalidatePath(path)
      result = { ...result, revalidated: true, path }
    }

    return NextResponse.json({
      ...result,
      now: Date.now(),
    })
  } catch (err) {
    return NextResponse.json(
      {
        error: "Error managing cache",
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
