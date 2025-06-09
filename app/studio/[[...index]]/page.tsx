"use client"

import { NextStudio } from "next-sanity/studio"
import config from "../../../sanity.config"

// Ensure no metadata exports from this page
export default function StudioPage() {
  return <NextStudio config={config} />
}
