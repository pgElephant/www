/**
 * Analytics utility functions for tracking page views and events
 */

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void
  }
}

/**
 * Track a page view in Google Analytics
 */
export function trackPageView(url: string, title?: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
      page_path: url,
      page_title: title,
    })
  }
}

/**
 * Track a custom event in Google Analytics
 */
export function trackEvent(
  eventName: string,
  eventParams?: {
    category?: string
    label?: string
    value?: number
    [key: string]: any
  }
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: eventParams?.category,
      event_label: eventParams?.label,
      value: eventParams?.value,
      ...eventParams,
    })
  }
}

/**
 * Track blog post views
 */
export function trackBlogPostView(slug: string, title: string) {
  trackEvent('blog_post_view', {
    category: 'Blog',
    label: slug,
    blog_post_title: title,
    blog_post_slug: slug,
  })
}

/**
 * Track blog post engagement (time spent, scroll depth, etc.)
 */
export function trackBlogEngagement(
  slug: string,
  action: 'read_time' | 'scroll_depth' | 'share' | 'comment',
  value?: number
) {
  trackEvent('blog_engagement', {
    category: 'Blog',
    label: slug,
    action,
    value,
    blog_post_slug: slug,
  })
}



