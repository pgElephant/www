/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.pgelephant.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/admin/*',
    '/private/*',
    '/api/*',
    '/_next/*',
    '/404',
    '/500',
    '*.json',
    '/server-sitemap.xml'
  ],
  transform: async (config, path) => {
    // Custom priority based on path
    let priority = 0.5
    let changefreq = 'weekly'

    if (path === '/') {
      priority = 1.0
      changefreq = 'weekly'
    } else if (path.match(/^\/(ram|fauxdb|rale|pgraft)$/)) {
      priority = 0.9
      changefreq = 'weekly'
    } else if (path.match(/^\/docs/)) {
      priority = 0.8
      changefreq = 'monthly'
    } else if (path.match(/^\/blog/)) {
      priority = 0.6
      changefreq = 'weekly'
    } else if (path.match(/^\/(download|community)/)) {
      priority = 0.7
      changefreq = 'weekly'
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    }
  },
  robotsTxtOptions: {
    policies: [
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
          '/cpanel/',
          '/cpanel',
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
      }
    ],
    additionalSitemaps: [
      'https://www.pgelephant.com/server-sitemap.xml',
    ],
  },
}