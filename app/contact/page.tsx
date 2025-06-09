import ContactForm from "@/components/contact-form"
import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="min-h-screen p-8 bg-black relative">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Contact Us</h1>

        <Link href="/" className="text-white hover:text-gray-300 transition-colors mb-8 inline-block">
          Back to Home
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
          <div>
            <h2 className="text-xl font-semibold mb-6">Get in Touch</h2>
            <p className="text-gray-300 mb-8">
              Have a project in mind or want to learn more about our services? Fill out the form and we'll get back to
              you as soon as possible.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <a href="mailto:angus@ipmc.com.au" className="text-blue-400 hover:text-blue-300">
                    angus@ipmc.com.au
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-gray-300">+61 (0) 400 000 000</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-gray-300">Melbourne, Australia</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </div>

      <div className="text-center mt-12 pb-4 font-mono text-[0.85rem]" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
        <a href="mailto:angus@ipmc.com.au" style={{ color: "rgba(255, 255, 255, 0.5)", textDecoration: "none" }}>
          angus@ipmc.com.au
        </a>
      </div>
    </main>
  )
}
