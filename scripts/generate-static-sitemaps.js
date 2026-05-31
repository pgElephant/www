#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const APP_DIR = path.join(process.cwd(), 'app')
const PUBLIC_DIR = path.join(process.cwd(), 'public')
const BASE_URL = 'https://www.pgelephant.com'
const LASTMOD = new Date().toISOString()

const EXCLUDED_TOP_LEVEL = new Set(['api', 'forum', 'sitemap-videos.xml'])
const PRODUCT_ROUTES = new Set(['/pgbalancer', '/pgraft', '/pgsentinel', '/pg-stat-insights'])

function isRedirectPage(pageFile) {
  return /\bredirect\s*\(/.test(fs.readFileSync(pageFile, 'utf-8'))
}

function discoverRoutes(dir, segments = []) {
  const routes = []

  if (segments.length === 1 && EXCLUDED_TOP_LEVEL.has(segments[0])) {
    return routes
  }

  const pageTsx = path.join(dir, 'page.tsx')
  const pageTs = path.join(dir, 'page.ts')
  const pageFile = fs.existsSync(pageTsx) ? pageTsx : fs.existsSync(pageTs) ? pageTs : null

  if (pageFile && !isRedirectPage(pageFile)) {
    routes.push(segments.length === 0 ? '/' : `/${segments.join('/')}`)
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith('(') || entry.name.startsWith('_')) {
      continue
    }
    routes.push(...discoverRoutes(path.join(dir, entry.name), [...segments, entry.name]))
  }

  return routes
}

function getRouteMeta(routePath) {
  if (routePath === '/') {
    return { changeFrequency: 'weekly', priority: 1.0 }
  }
  if (routePath === '/videos' || routePath === '/videos-ai') {
    return { changeFrequency: 'daily', priority: 0.9 }
  }
  if (PRODUCT_ROUTES.has(routePath)) {
    return { changeFrequency: 'weekly', priority: 0.9 }
  }
  if (routePath === '/docs' || routePath.match(/^\/docs\/[^/]+$/)) {
    return { changeFrequency: 'monthly', priority: 0.8 }
  }
  if (routePath.startsWith('/docs/')) {
    const priority =
      routePath.includes('getting-started') || routePath.includes('installation') ? 0.75 : 0.7
    return { changeFrequency: 'monthly', priority }
  }
  if (routePath === '/blog') {
    return { changeFrequency: 'weekly', priority: 0.7 }
  }
  if (routePath.startsWith('/blog/')) {
    return { changeFrequency: 'monthly', priority: 0.6 }
  }
  if (routePath === '/download' || routePath === '/community') {
    return { changeFrequency: 'weekly', priority: 0.75 }
  }
  if (routePath === '/contact' || routePath === '/privacy' || routePath === '/terms') {
    return { changeFrequency: 'monthly', priority: 0.4 }
  }
  return { changeFrequency: 'weekly', priority: 0.5 }
}

function slugToTitle(slug) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function buildUrlEntry(routePath, { includeNews = false, includeImage = false } = {}) {
  const { changeFrequency, priority } = getRouteMeta(routePath)
  const lines = [
    '  <url>',
    `    <loc>${BASE_URL}${routePath}</loc>`,
    `    <lastmod>${LASTMOD}</lastmod>`,
    `    <changefreq>${changeFrequency}</changefreq>`,
    `    <priority>${priority}</priority>`,
  ]

  if (includeImage && routePath === '/pgbalancer') {
    lines.push(
      '    <image:image>',
      `      <image:loc>${BASE_URL}/screenshots/pgbalancer-dashboard.jpg</image:loc>`,
      '      <image:title>pgbalancer AI Dashboard</image:title>',
      '      <image:caption>AI-powered PostgreSQL connection pooling and load balancing</image:caption>',
      '    </image:image>'
    )
  }

  if (includeNews && routePath.startsWith('/blog/') && routePath !== '/blog') {
    const slug = routePath.replace('/blog/', '')
    lines.push(
      '    <news:news>',
      '      <news:publication>',
      '        <news:name>pgElephant Blog</news:name>',
      '        <news:language>en</news:language>',
      '      </news:publication>',
      `      <news:publication_date>${LASTMOD}</news:publication_date>`,
      `      <news:title>${slugToTitle(slug)} - pgElephant Blog</news:title>`,
      '    </news:news>'
    )
  }

  lines.push('  </url>')
  return lines.join('\n')
}

function writeSitemap(filename, urlsetAttrs, entries) {
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<urlset ${urlsetAttrs}>`,
    ...entries,
    '</urlset>',
    '',
  ].join('\n')
  fs.writeFileSync(path.join(PUBLIC_DIR, filename), xml)
}

const routes = discoverRoutes(APP_DIR).sort()

writeSitemap(
  'sitemap_products.xml',
  'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"',
  routes
    .filter((route) => PRODUCT_ROUTES.has(route))
    .map((route) => buildUrlEntry(route, { includeImage: true }))
)

writeSitemap(
  'sitemap_docs.xml',
  'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  routes
    .filter((route) => route === '/docs' || route.startsWith('/docs/'))
    .map((route) => buildUrlEntry(route))
)

writeSitemap(
  'sitemap_blog.xml',
  'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"',
  routes
    .filter((route) => route === '/blog' || route.startsWith('/blog/'))
    .map((route) => buildUrlEntry(route, { includeNews: true }))
)

const indexXml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  '  <sitemap>',
  `    <loc>${BASE_URL}/sitemap.xml</loc>`,
  `    <lastmod>${LASTMOD}</lastmod>`,
  '  </sitemap>',
  '  <sitemap>',
  `    <loc>${BASE_URL}/sitemap_products.xml</loc>`,
  `    <lastmod>${LASTMOD}</lastmod>`,
  '  </sitemap>',
  '  <sitemap>',
  `    <loc>${BASE_URL}/sitemap_docs.xml</loc>`,
  `    <lastmod>${LASTMOD}</lastmod>`,
  '  </sitemap>',
  '  <sitemap>',
  `    <loc>${BASE_URL}/sitemap_blog.xml</loc>`,
  `    <lastmod>${LASTMOD}</lastmod>`,
  '  </sitemap>',
  '  <sitemap>',
  `    <loc>${BASE_URL}/sitemap-videos.xml</loc>`,
  `    <lastmod>${LASTMOD}</lastmod>`,
  '  </sitemap>',
  '</sitemapindex>',
  '',
].join('\n')

fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap_index.xml'), indexXml)

console.log(`Updated static sitemaps (${routes.length} routes discovered)`)
console.log(`  products: ${routes.filter((route) => PRODUCT_ROUTES.has(route)).length}`)
console.log(`  docs: ${routes.filter((route) => route === '/docs' || route.startsWith('/docs/')).length}`)
console.log(
  `  blog: ${routes.filter((route) => route === '/blog' || route.startsWith('/blog/')).length}`
)
