/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { webpack }) => {
    // Force sanity packages to resolve 'react' to the CJS index bundle (not the
    // react-server bundle), which exports useEffectEvent. The exports-field
    // resolution picks react.react-server.js in server builds, whose underlying
    // CJS bundle is missing useEffectEvent.
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^react$/, (resource) => {
        if (resource.context && /node_modules[\\/](@sanity|sanity)/.test(resource.context)) {
          resource.request = path.resolve(__dirname, 'node_modules/react/index.js')
        }
      })
    )
    return config
  },
}

module.exports = nextConfig
