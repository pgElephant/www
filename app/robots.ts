import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/ram',
          '/rale', 
          '/pgraft',
          '/fauxdb',
          '/docs',
          '/blog',
          '/community',
          '/download',
          '/contact',
          '/cpanel',
          '/cpanel/',
          '/*.css',
          '/*.js',
          '/*.png',
          '/*.jpg',
          '/*.jpeg',
          '/*.gif',
          '/*.svg',
          '/*.ico',
          '/*.webp',
          '/*.avif'
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
          '/logs/'
        ],
        crawlDelay: 1
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 1
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        crawlDelay: 1
      },
      {
        userAgent: 'Slurp',
        allow: '/',
        crawlDelay: 1
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        crawlDelay: 1
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
      }
    ],
    sitemap: 'https://www.pgelephant.com/sitemap_index.xml',
  }
}
