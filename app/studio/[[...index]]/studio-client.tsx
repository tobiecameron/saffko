"use client"

import { NextStudio } from "next-sanity/studio"
import config from "../../../sanity.config.js"

export default function StudioClient() {
  return <NextStudio config={config} />
}
