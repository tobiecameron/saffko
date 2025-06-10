/** @type {import('next').NextConfig} */
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
  compiler: {
    // styledComponents: true,
  },
  webpack: (config, { isServer }) => {
    // Ensures all uses of styled-components resolve to the exact same version (Sanity UI compatibility fix)
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // 'styled-components': require.resolve('styled-components'),
    };
    return config
  },
}

module.exports = nextConfig
