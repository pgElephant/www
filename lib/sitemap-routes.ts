import fs from 'fs'
import path from 'path'

const APP_DIR = path.join(process.cwd(), 'app')

const EXCLUDED_TOP_LEVEL = new Set(['api', 'forum', 'sitemap-videos.xml'])

export type SitemapChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never'

export interface SitemapRouteMeta {
  path: string
  changeFrequency: SitemapChangeFrequency
  priority: number
}

function isRedirectPage(pageFile: string): boolean {
  const content = fs.readFileSync(pageFile, 'utf-8')
  return /\bredirect\s*\(/.test(content)
}

function discoverRoutes(dir: string, segments: string[]): string[] {
  const routes: string[] = []

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

export function getDiscoveredRoutes(): string[] {
  return discoverRoutes(APP_DIR, []).sort()
}

export function getRouteMeta(routePath: string): SitemapRouteMeta {
  if (routePath === '/') {
    return { path: routePath, changeFrequency: 'weekly', priority: 1.0 }
  }

  if (routePath === '/videos' || routePath === '/videos-ai') {
    return { path: routePath, changeFrequency: 'daily', priority: 0.9 }
  }

  if (['/pgbalancer', '/pgraft', '/pgsentinel', '/pg-stat-insights'].includes(routePath)) {
    return { path: routePath, changeFrequency: 'weekly', priority: 0.9 }
  }

  if (routePath === '/docs' || routePath.match(/^\/docs\/[^/]+$/)) {
    return { path: routePath, changeFrequency: 'monthly', priority: 0.8 }
  }

  if (routePath.startsWith('/docs/')) {
    const priority =
      routePath.includes('getting-started') || routePath.includes('installation') ? 0.75 : 0.7
    return { path: routePath, changeFrequency: 'monthly', priority }
  }

  if (routePath === '/blog') {
    return { path: routePath, changeFrequency: 'weekly', priority: 0.7 }
  }

  if (routePath.startsWith('/blog/')) {
    return { path: routePath, changeFrequency: 'monthly', priority: 0.6 }
  }

  if (routePath === '/download' || routePath === '/community') {
    return { path: routePath, changeFrequency: 'weekly', priority: 0.75 }
  }

  if (routePath === '/contact' || routePath === '/privacy' || routePath === '/terms') {
    return { path: routePath, changeFrequency: 'monthly', priority: 0.4 }
  }

  return { path: routePath, changeFrequency: 'weekly', priority: 0.5 }
}

export function getProductRoutes(): string[] {
  return getDiscoveredRoutes().filter((route) =>
    ['/pgbalancer', '/pgraft', '/pgsentinel', '/pg-stat-insights'].includes(route)
  )
}

export function getDocRoutes(): string[] {
  return getDiscoveredRoutes().filter((route) => route === '/docs' || route.startsWith('/docs/'))
}

export function getBlogRoutes(): string[] {
  return getDiscoveredRoutes().filter((route) => route === '/blog' || route.startsWith('/blog/'))
}
