// Performance-optimized layout wrapper
// This file contains optimizations that can be applied to layout.tsx

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Lazy load components that are not immediately visible
export const LazyFooter = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-96 bg-slate-900" />,
  ssr: true,
})

export const LazyHeader = dynamic(() => import('@/components/Header'), {
  loading: () => <div className="h-16 bg-slate-900" />,
  ssr: true,
})

// Optimize font loading
export const fontOptimizations = {
  display: 'swap' as const,
  preload: true,
  fallback: ['system-ui', 'arial'],
}

// Resource hints for critical resources
export const resourceHints = (
  <>
    {/* Preconnect to external domains */}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    
    {/* DNS prefetch for analytics */}
    <link rel="dns-prefetch" href="https://www.google-analytics.com" />
    
    {/* Preload critical assets */}
    <link
      rel="preload"
      href="/fonts/inter-var.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />
  </>
)

// Web Vitals reporting
export function reportWebVitals(metric: any) {
  if (process.env.NODE_ENV === 'production') {
    // Send to analytics
    const { name, value, id, rating } = metric
    
    // Example: Send to Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', name, {
        value: Math.round(name === 'CLS' ? value * 1000 : value),
        event_label: id,
        non_interaction: true,
        rating,
      })
    }
    
    // Example: Send to custom analytics
    fetch('/api/analytics/vitals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ metric }),
    }).catch(() => {
      // Silently fail
    })
  }
}

