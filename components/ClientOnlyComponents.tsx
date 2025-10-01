'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Client-side only components
const WebVitals = dynamic(() => import('@/components/SEO/WebVitals'), {
  ssr: false
})

const QuickIndexing = dynamic(() => import('@/components/SEO/QuickIndexing'), {
  ssr: false
})

export default function ClientOnlyComponents() {
  return (
    <>
      <Suspense fallback={null}>
        <WebVitals />
      </Suspense>
      <Suspense fallback={null}>
        <QuickIndexing />
      </Suspense>
    </>
  )
}