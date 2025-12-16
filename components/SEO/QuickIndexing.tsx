'use client'

import { useEffect } from 'react'

interface QuickIndexingProps {
  enabled?: boolean
  autoSubmit?: boolean
  urls?: string[]
}

const QuickIndexing: React.FC<QuickIndexingProps> = ({
  enabled = true,
  autoSubmit = false,
  urls = []
}) => {

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return

    const submitForIndexing = async () => {
      try {
        // Get current page URL
        const currentUrl = window.location.href

        // Default URLs to submit
        const defaultUrls = [
          '/',
          '/ram',
          '/rale',
          '/pgraft',
          '/docs',
          '/download',
          '/contact'
        ]

        const urlsToSubmit = urls.length > 0 ? urls : [...defaultUrls, currentUrl]

        // Submit to our bulk indexing API
        const response = await fetch('/api/indexing/bulk', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ urls: urlsToSubmit }),
        })

        const result = await response.json()

        if (result.success) {
          console.log('✅ Pages submitted for quick indexing:', result.message)
        } else {
          console.warn('⚠️ Indexing submission failed:', result.error)
        }

        // Additional indexing optimizations
        submitToSearchEngines()

      } catch (error) {
        console.error('❌ Error submitting pages for indexing:', error)
      }
    }

    const submitToSearchEngines = async () => {
      const baseUrl = window.location.origin
      const sitemapUrl = `${baseUrl}/sitemap.xml`

      // Ping major search engines
      const searchEngines = [
        `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
        `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
      ]

      // Use img tags to ping search engines (works around CORS)
      searchEngines.forEach((url, index) => {
        const img = new Image()
        img.onload = () => console.log(`✅ Pinged search engine ${index + 1}`)
        img.onerror = () => console.log(`⚠️ Failed to ping search engine ${index + 1}`)
        img.src = url
      })
    }

    const triggerIndexing = () => {
      // Submit immediately on page load for critical pages
      if (autoSubmit) {
        setTimeout(submitForIndexing, 1000)
      }

      // Also submit when user is about to leave (ensures new content is indexed)
      const handleBeforeUnload = () => {
        navigator.sendBeacon('/api/indexing/bulk', JSON.stringify({
          urls: [window.location.href]
        }))
      }

      // Submit on visibility change (when user switches tabs/returns)
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
          submitForIndexing()
        }
      }

      window.addEventListener('beforeunload', handleBeforeUnload)
      document.addEventListener('visibilitychange', handleVisibilityChange)

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload)
        document.removeEventListener('visibilitychange', handleVisibilityChange)
      }
    }

    return triggerIndexing()
  }, [enabled, autoSubmit, urls])

  // Expose global function for manual indexing
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).submitForIndexing = async (customUrls?: string[]) => {
        try {
          const response = await fetch('/api/indexing/bulk', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              urls: customUrls || [window.location.href]
            }),
          })
          const result = await response.json()
          console.log('Indexing result:', result)
          return result
        } catch (error) {
          console.error('Indexing error:', error)
          return { success: false, error }
        }
      }
    }
  }, [])

  return null
}

export default QuickIndexing