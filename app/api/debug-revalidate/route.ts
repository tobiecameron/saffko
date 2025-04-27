import { revalidatePath } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"

// This endpoint is for debugging only - should be disabled or protected in production
export async function GET(request: NextRequest) {
  // Only allow in development or with a special header
  if (process.env.NODE_ENV !== "development" && !request.headers.get("x-debug-secret")) {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 })
  }

  const path = request.nextUrl.searchParams.get("path") || "/"

  try {
    revalidatePath(path)
    return NextResponse.json({
      revalidated: true,
      path,
      now: Date.now(),
    })
  } catch (err) {
    return NextResponse.json(
      {
        error: "Error revalidating",
        message: err instanceof Error ? err.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
