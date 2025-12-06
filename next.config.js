/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'react-markdown', '@vercel/analytics', '@vercel/speed-insights'],
    webpackBuildWorker: true,
    gzipSize: true,
    optimizeCss: true,
    scrollRestoration: true,
    // Optimize server components
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Temporarily disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pgelephant.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.pgelephant.com',
        port: '',
        pathname: '/**',
      }
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Enable compression and caching
  compress: true,

  // Enable static optimization
  staticPageGenerationTimeout: 120,

  // Production optimizations
  poweredByHeader: false,
  generateEtags: true,

  // SEO optimizations
  trailingSlash: false,
  generateBuildId: async () => {
    return process.env.BUILD_ID || 'build-' + Date.now()
  },

  // Output optimization
  // output: 'standalone',

  // Bundle analyzer for production builds
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
          })
        )
      }
      return config
    },
  }),

  // Enhanced security headers for SEO and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          // HTTPS and security headers
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' *.google-analytics.com *.googletagmanager.com; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: *.githubusercontent.com *.pgelephant.com; connect-src 'self' *.google-analytics.com *.googletagmanager.com; upgrade-insecure-requests",
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: '/(_next/static|favicon.ico|robots.txt|sitemap.xml|sitemap_index.xml)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache images
      {
        source: '/:path*\.(jpg|jpeg|png|gif|svg|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Enhanced redirects for better SEO and user experience
  async redirects() {
    return [
      // Legacy redirects
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
        source: '/guides',
        destination: '/docs',
        permanent: true,
      },
      // Product-specific redirects
      {
        source: '/postgresql-ha',
        destination: '/pgraft',
        permanent: true,
      },
      // 404 Pages - Documentation redirects
      {
        source: '/docs/pgbalancer/ai-configuration',
        destination: '/docs/pgbalancer/configuration',
        permanent: true,
      },
      {
        source: '/docs/pgbalancer/performance-tuning',
        destination: '/docs/pgbalancer/internals',
        permanent: true,
      },
      {
        source: '/docs/pgbalancer/installation',
        destination: '/docs/pgbalancer/getting-started',
        permanent: true,
      },
      {
        source: '/docs/ram/:path*',
        destination: '/pgraft',
        permanent: true,
      },
      {
        source: '/docs/fauxdb/api-reference',
        destination: '/docs/fauxdb/api',
        permanent: true,
      },
      {
        source: '/docs/fauxdb/migration',
        destination: '/docs/fauxdb/getting-started',
        permanent: true,
      },
      {
        source: '/docs/fauxdb/installation',
        destination: '/docs/fauxdb/getting-started',
        permanent: true,
      },
      {
        source: '/docs/fauxdb/configuration',
        destination: '/docs/fauxdb/getting-started',
        permanent: true,
      },
      {
        source: '/docs/fauxdb/kubernetes',
        destination: '/docs/fauxdb/docker',
        permanent: true,
      },
      {
        source: '/download/rale',
        destination: '/pgraft',
        permanent: true,
      },
      {
        source: '/download/ram',
        destination: '/pgraft',
        permanent: true,
      },
      {
        source: '/blog/high-availability',
        destination: '/blog/pgraft',
        permanent: true,
      },
      {
        source: '/blog/docker-deployment',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/getting-started',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/clustering',
        destination: '/blog/pgraft',
        permanent: true,
      },
      // Blog slug compatibility (underscore to dash)
      {
        source: '/blog/pg_stat_insights',
        destination: '/blog/pg-stat-insights',
        permanent: true,
      },
      {
        source: '/blog/pg_stat_insights/:path*',
        destination: '/blog/pg-stat-insights/:path*',
        permanent: true,
      },
      {
        source: '/blog/neurondb-semantic-search-guide',
        destination: 'https://www.neurondb.ai/blog/neurondb-semantic-search-guide',
        permanent: true,
      },
      {
        source: '/blog/neurondb',
        destination: 'https://www.neurondb.ai/blog/neurondb',
        permanent: true,
      },
      {
        source: '/postgresql-clustering',
        destination: '/pgraft',
        permanent: true,
      },
      {
        source: '/high-availability',
        destination: '/pgraft',
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
        source: '/raft-consensus',
        destination: '/pgraft',
        permanent: true,
      },
      {
        source: '/mongodb-alternative',
        destination: '/fauxdb',
        permanent: true,
      },
      {
        source: '/document-database',
        destination: '/fauxdb',
        permanent: true,
      },
      {
        source: '/mongodb-compatible',
        destination: '/fauxdb',
        permanent: true,
      },
      {
        source: '/consensus',
        destination: '/pgraft',
        permanent: true,
      },
      {
        source: '/distributed-consensus',
        destination: '/pgraft',
        permanent: true,
      },
      {
        source: '/leader-election',
        destination: '/pgraft',
        permanent: true,
      },
      // Common misspellings and variations
      {
        source: '/pg-elephant',
        destination: '/',
        permanent: true,
      },
      {
        source: '/pgelefant',
        destination: '/',
        permanent: true,
      },
      {
        source: '/pg-elefant',
        destination: '/',
        permanent: true,
      },
      // WWW redirect
      {
        source: '/(.*)',
        has: [
          {
            type: 'host',
            value: 'pgelephant.com',
          },
        ],
        destination: 'https://www.pgelephant.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig 