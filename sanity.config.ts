import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./schemas"

export default defineConfig({
  basePath: "/studio",
  projectId: "z3tni9rr",
  dataset: "production",
  title: "S A F F K O",
  schema: {
    types: schemaTypes,
  },
  plugins: [deskTool(), visionTool()],
})
