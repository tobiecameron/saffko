console.log("Checking Tailwind CSS dependencies...")

try {
  // Try to require tailwindcss
  require.resolve("tailwindcss")
  console.log("✅ tailwindcss is installed")
} catch (e) {
  console.log("❌ tailwindcss is NOT installed. Run: npm install -D tailwindcss")
}

try {
  // Try to require postcss
  require.resolve("postcss")
  console.log("✅ postcss is installed")
} catch (e) {
  console.log("❌ postcss is NOT installed. Run: npm install -D postcss")
}

try {
  // Try to require autoprefixer
  require.resolve("autoprefixer")
  console.log("✅ autoprefixer is installed")
} catch (e) {
  console.log("❌ autoprefixer is NOT installed. Run: npm install -D autoprefixer")
}

// Check if tailwind config exists
const fs = require("fs")
if (fs.existsSync("./tailwind.config.js") || fs.existsSync("./tailwind.config.ts")) {
  console.log("✅ tailwind config file exists")
} else {
  console.log("❌ tailwind config file does NOT exist. Run: npx tailwindcss init")
}

// Check if postcss config exists
if (fs.existsSync("./postcss.config.js") || fs.existsSync("./postcss.config.mjs")) {
  console.log("✅ postcss config file exists")
} else {
  console.log("❌ postcss config file does NOT exist. Create one with tailwindcss and autoprefixer plugins.")
}

console.log("\nIf all checks passed but Tailwind still isn't working, try the following:")
console.log("1. Make sure @tailwind directives are in your CSS file")
console.log("2. Make sure your CSS file is imported in your layout or app component")
console.log("3. Check that your content paths in tailwind.config.js include all your template files")
console.log("4. Restart your development server")
