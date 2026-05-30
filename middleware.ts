import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_FILE = /\.[^/]+$/

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname === '/' ||
    pathname === '/videos' ||
    pathname === '/videos-ai' ||
    pathname.startsWith('/sitemap-videos.xml') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: '/:path*',
}
