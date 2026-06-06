"use client"

import dynamic from "next/dynamic"

const Studio = dynamic(() => import("./studio-client"), { ssr: false })

export default function StudioPage() {
  return <Studio />
}
