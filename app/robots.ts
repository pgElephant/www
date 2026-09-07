import { MetadataRoute } from 'next'
import { baseSEO } from '@/config/seo'

export default function robots(): MetadataRoute.Robots {
  const host = baseSEO.siteUrl

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/private/',
          '/forum/',
          '/search?',
          '/*?utm_*',
          '/*?ref=*',
          '/*?source=*',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/', '/forum/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/', '/forum/'],
      },
    ],
    sitemap: [
      `${host}/sitemap.xml`,
      `${host}/sitemap-videos.xml`,
    ],
    host,
  }
}
