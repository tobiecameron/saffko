import { defineConfig } from 'vite'

export default defineConfig({
  define: {
    'process.env.NEXT_PUBLIC_SANITY_PROJECT_ID': JSON.stringify(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'z3tni9rr'),
    'process.env.NEXT_PUBLIC_SANITY_DATASET': JSON.stringify(process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'),
  },
})