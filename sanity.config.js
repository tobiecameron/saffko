/**
 * This configuration is used by the Sanity Studio.
 * https://www.sanity.io/docs/configuration
 */

import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./schemas/index.js"

const config = defineConfig({
  basePath: "/studio",
  projectId: "z3tni9rr",
  dataset: "production",
  title: "S A F F K O",
  schema: {
    types: schemaTypes,
  },
  plugins: [structureTool(), visionTool()],
})

export default config
