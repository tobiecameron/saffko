import { revalidatePath } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"

// Secret to validate webhook requests
const WEBHOOK_SECRET = process.env.REVALIDATION_SECRET

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request if you have a secret
    const secret = request.headers.get("x-webhook-secret")
    if (WEBHOOK_SECRET && secret !== WEBHOOK_SECRET) {
      console.error("Invalid webhook secret", {
        expected: WEBHOOK_SECRET,
        received: secret,
      })
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
    }

    // Extract document type and ID from the webhook payload
    const { _type, _id, slug } = body

    console.log("Revalidation triggered for:", { _type, _id, slug })

    // Revalidate specific paths based on document type
    if (_type === "siteSettings") {
      revalidatePath("/")
      console.log("Revalidated home page")
    }

    if (_type === "post") {
      revalidatePath("/blog")
      console.log("Revalidated blog page")

      // If we have a slug, revalidate the specific post page
      if (slug?.current) {
        revalidatePath(`/blog/${slug.current}`)
        console.log(`Revalidated post: ${slug.current}`)
      }
    }

    // Fallback: revalidate everything
    if (!_type) {
      revalidatePath("/", "layout")
      console.log("Revalidated entire site (layout)")
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      paths:
        _type === "siteSettings"
          ? ["/"]
          : _type === "post"
            ? ["/blog", slug?.current ? `/blog/${slug.current}` : null].filter(Boolean)
            : ["/"],
    })
  } catch (err) {
    console.error("Revalidation error:", err)
    return NextResponse.json(
      { error: "Error revalidating", message: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    )
  }
}
