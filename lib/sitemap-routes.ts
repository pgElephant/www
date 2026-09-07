import fs from 'fs';
import path from 'path';

const APP_DIR = path.join(process.cwd(), 'app');

const EXCLUDED_TOP_LEVEL = new Set([
  'api',
  'forum',
  'sitemap-videos.xml',
  'community',
  'download',
  'contact',
  'blog',
  'docs',
  'pgbalancer',
  'pgraft',
  'pgsentinel',
  'pg-stat-insights',
]);

const EXCLUDED_EXACT = new Set([
  '/videos',
  '/videos-ai',
  '/community',
  '/download',
  '/contact',
  '/forum',
  '/docs',
  '/pgbalancer',
  '/pgraft',
  '/pgsentinel',
  '/pg-stat-insights',
]);

export type SitemapChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

export interface SitemapRouteMeta {
  path: string;
  changeFrequency: SitemapChangeFrequency;
  priority: number;
}

function isRedirectPage(pageFile: string): boolean {
  const content = fs.readFileSync(pageFile, 'utf-8');
  return /\bredirect\s*\(/.test(content);
}

function isDynamicSegment(name: string): boolean {
  return name.startsWith('[') && name.endsWith(']');
}

function discoverRoutes(dir: string, segments: string[]): string[] {
  const routes: string[] = [];

  if (segments.length === 1 && EXCLUDED_TOP_LEVEL.has(segments[0])) {
    return routes;
  }

  if (segments.some(isDynamicSegment)) {
    return routes;
  }

  const pageTsx = path.join(dir, 'page.tsx');
  const pageTs = path.join(dir, 'page.ts');
  const pageFile = fs.existsSync(pageTsx) ? pageTsx : fs.existsSync(pageTs) ? pageTs : null;

  if (pageFile && !isRedirectPage(pageFile)) {
    const routePath = segments.length === 0 ? '/' : `/${segments.join('/')}`;
    if (!EXCLUDED_EXACT.has(routePath)) {
      routes.push(routePath);
    }
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith('(') || entry.name.startsWith('_')) {
      continue;
    }
    if (isDynamicSegment(entry.name)) {
      continue;
    }
    routes.push(...discoverRoutes(path.join(dir, entry.name), [...segments, entry.name]));
  }

  return routes;
}

export function getDiscoveredRoutes(): string[] {
  return discoverRoutes(APP_DIR, []).sort();
}

export function getRouteMeta(routePath: string): SitemapRouteMeta {
  if (routePath === '/') {
    return { path: routePath, changeFrequency: 'weekly', priority: 1.0 };
  }

  if (['/ai', '/postgresql', '/cybersecurity'].includes(routePath)) {
    return { path: routePath, changeFrequency: 'daily', priority: 0.95 };
  }

  if (
    routePath.startsWith('/ai/') ||
    routePath.startsWith('/postgresql/') ||
    routePath.startsWith('/cybersecurity/')
  ) {
    return { path: routePath, changeFrequency: 'weekly', priority: 0.9 };
  }

  if (routePath === '/about' || routePath === '/github') {
    return { path: routePath, changeFrequency: 'monthly', priority: 0.92 };
  }

  if (['/pgbalancer', '/pgraft', '/pgsentinel', '/pg-stat-insights'].includes(routePath)) {
    return { path: routePath, changeFrequency: 'monthly', priority: 0.45 };
  }

  if (routePath === '/docs' || routePath.match(/^\/docs\/[^/]+$/)) {
    return { path: routePath, changeFrequency: 'monthly', priority: 0.4 };
  }

  if (routePath.startsWith('/docs/')) {
    return { path: routePath, changeFrequency: 'monthly', priority: 0.35 };
  }

  if (routePath === '/blog') {
    return { path: routePath, changeFrequency: 'weekly', priority: 0.55 };
  }

  if (routePath.startsWith('/blog/')) {
    return { path: routePath, changeFrequency: 'monthly', priority: 0.45 };
  }

  if (routePath === '/privacy' || routePath === '/terms') {
    return { path: routePath, changeFrequency: 'yearly', priority: 0.2 };
  }

  return { path: routePath, changeFrequency: 'monthly', priority: 0.3 };
}

export function getProductRoutes(): string[] {
  return getDiscoveredRoutes().filter(route =>
    ['/pgbalancer', '/pgraft', '/pgsentinel', '/pg-stat-insights'].includes(route)
  );
}

export function getDocRoutes(): string[] {
  return getDiscoveredRoutes().filter(route => route === '/docs' || route.startsWith('/docs/'));
}

export function getBlogRoutes(): string[] {
  return getDiscoveredRoutes().filter(route => route === '/blog' || route.startsWith('/blog/'));
}

export function getPersonalRoutes(): string[] {
  return getDiscoveredRoutes().filter(route => {
    if (route === '/' || route === '/about' || route === '/github') return true;
    if (['/ai', '/postgresql', '/cybersecurity'].includes(route)) return true;
    return false;
  });
}
