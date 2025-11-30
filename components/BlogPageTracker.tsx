'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageView, trackBlogPostView } from '@/lib/analytics'

interface BlogPageTrackerProps {
  slug?: string
  title?: string
}

/**
 * Component to track blog page views in Google Analytics
 * Automatically tracks page views and blog-specific events
 */
export default function BlogPageTracker({ slug, title }: BlogPageTrackerProps) {
  const pathname = usePathname()

  useEffect(() => {
    // Track page view
    trackPageView(pathname, title)

    // Track blog post view if slug and title are provided
    if (slug && title) {
      trackBlogPostView(slug, title)
    }
  }, [pathname, slug, title])

  return null
}



