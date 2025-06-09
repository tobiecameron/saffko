import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate the request
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Here you would typically:
    // 1. Send an email notification
    // 2. Store the message in a database
    // 3. Integrate with a CRM or other system

    // For now, we'll just log it and return success
    console.log("Contact form submission:", { name, email, subject, message })

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Your message has been received",
    })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}
