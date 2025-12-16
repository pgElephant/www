import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/pgraft',
          '/pgbalancer',
          '/pgsentinel',
          '/pg-stat-insights',
          '/docs',
          '/docs/*',
          '/blog',
          '/blog/*',
          '/community',
          '/download',
          '/contact',
          '/privacy',
          '/terms',
          '/*.css',
          '/*.js',
          '/*.png',
          '/*.jpg',
          '/*.jpeg',
          '/*.gif',
          '/*.svg',
          '/*.ico',
          '/*.webp',
          '/*.avif',
          '/*.woff',
          '/*.woff2',
          '/sitemap.xml',
          '/sitemap_index.xml'
        ],
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/private/',
          '/cgi-bin/',
          '/webmail/',
          '/mail/',
          '/ftp/',
          '/control/',
          '/hosting/',
          '/*.json$',
          '/tmp/',
          '/logs/',
          '/cache/',
          '/config/',
          '/includes/',
          '/wp-admin/',
          '/wp-includes/',
          '/cgi-bin/',
          '/search?*',
          '/*?utm_*',
          '/*?ref=*',
          '/*?source=*'
        ],
        crawlDelay: 0.5
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0.2
      },
      {
        userAgent: 'Googlebot-Image',
        allow: [
          '/*.png',
          '/*.jpg',
          '/*.jpeg',
          '/*.gif',
          '/*.svg',
          '/*.webp',
          '/*.avif'
        ]
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        crawlDelay: 0.5
      },
      {
        userAgent: 'Slurp',
        allow: '/',
        crawlDelay: 1
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        crawlDelay: 0.5
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
        crawlDelay: 2
      },
      {
        userAgent: 'YandexBot',
        allow: '/',
        crawlDelay: 1
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
        crawlDelay: 0
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
        crawlDelay: 0
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
        crawlDelay: 0
      }
    ],
    sitemap: ['https://www.pgelephant.com/sitemap.xml', 'https://www.pgelephant.com/sitemap_index.xml'],
    host: 'https://www.pgelephant.com'
  }
}
