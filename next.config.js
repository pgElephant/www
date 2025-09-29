/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    domains: ['github.com', 'avatars.githubusercontent.com', 'pgelephant.com'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Enable compression
  compress: true,
  // Enable static optimization
  staticPageGenerationTimeout: 120,
  
  // Production optimizations
  poweredByHeader: false,
  generateEtags: false,
  
  // SEO optimizations
  trailingSlash: false,
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          // HTTPS and security headers
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: "upgrade-insecure-requests",
          },
        ],
      },
    ]
  },
  
  // Redirects for better SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/documentation',
        destination: '/docs',
        permanent: true,
      },
      {
        source: '/guide',
        destination: '/docs',
        permanent: true,
      },
      {
        source: '/tutorial',
        destination: '/docs',
        permanent: true,
      },
      {
        source: '/postgresql-ha',
        destination: '/ram',
        permanent: true,
      },
      {
        source: '/raft-extension',
        destination: '/pgraft',
        permanent: true,
      },
      {
        source: '/postgresql-raft',
        destination: '/pgraft',
        permanent: true,
      },
      {
        source: '/mongodb-alternative',
        destination: '/fauxdb',
        permanent: true,
      },
      {
        source: '/consensus',
        destination: '/rale',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig 