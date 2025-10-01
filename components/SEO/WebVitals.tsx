'use client'

import { useEffect } from 'react'
import { onCLS, onFID, onFCP, onLCP, onTTFB, Metric } from 'web-vitals'

interface WebVitalsProps {
  debug?: boolean
}

const WebVitals: React.FC<WebVitalsProps> = ({ debug = false }) => {
  useEffect(() => {
    const sendToAnalytics = (metric: Metric) => {
      // Send to Google Analytics 4
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', metric.name, {
          custom_map: { metric_value: 'custom_metric_value' },
          custom_metric_value: Math.round(metric.value),
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.value),
          non_interaction: true,
        })
      }

      // Send to console in debug mode
      if (debug) {
        console.log('Web Vital:', {
          name: metric.name,
          value: metric.value,
          id: metric.id,
          delta: metric.delta,
          rating: getVitalRating(metric.name, metric.value),
        })
      }

      // Send to custom analytics endpoint if needed
      if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
        fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            metric: metric.name,
            value: metric.value,
            id: metric.id,
            delta: metric.delta,
            url: window.location.href,
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
          }),
        }).catch(console.error)
      }
    }

    // Measure all Core Web Vitals
    onCLS(sendToAnalytics)
    onFID(sendToAnalytics)
    onFCP(sendToAnalytics)
    onLCP(sendToAnalytics)
    onTTFB(sendToAnalytics)
  }, [debug])

  return null
}

// Helper function to rate Web Vitals performance
const getVitalRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
  const thresholds: Record<string, { good: number; poor: number }> = {
    CLS: { good: 0.1, poor: 0.25 },
    FID: { good: 100, poor: 300 },
    FCP: { good: 1800, poor: 3000 },
    LCP: { good: 2500, poor: 4000 },
    TTFB: { good: 800, poor: 1800 },
  }

  const threshold = thresholds[name]
  if (!threshold) return 'good'

  if (value <= threshold.good) return 'good'
  if (value <= threshold.poor) return 'needs-improvement'
  return 'poor'
}

export default WebVitals