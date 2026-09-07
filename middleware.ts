import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.[^/]+$/;

const ALLOWED_PREFIXES = [
  '/ai',
  '/postgresql',
  '/cybersecurity',
  '/github',
  '/about',
  '/privacy',
  '/terms',
  '/sitemap.xml',
  '/sitemap-videos.xml',
  '/robots.txt',
  '/_next/',
  '/api/',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname === '/' ||
    PUBLIC_FILE.test(pathname) ||
    ALLOWED_PREFIXES.some(
      prefix =>
        pathname === prefix || pathname.startsWith(`${prefix}/`) || pathname.startsWith(prefix)
    )
  ) {
    return NextResponse.next();
  }

  // Retire the former company and product surface while preserving old links.
  const legacyPrefixes = [
    '/docs',
    '/pgraft',
    '/pgbalancer',
    '/pgsentinel',
    '/pg-stat-insights',
    '/download',
    '/community',
    '/contact',
    '/forum',
    '/blog',
    '/videos',
    '/videos-ai',
  ];

  if (legacyPrefixes.some(prefix => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    const destination = pathname.startsWith('/videos-ai')
      ? '/ai'
      : pathname.startsWith('/videos') || pathname.startsWith('/blog')
        ? '/postgresql'
        : '/github';
    return NextResponse.redirect(new URL(destination, request.url), 308);
  }

  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: '/:path*',
};
