import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Priority loading for UnderConstruction (above the fold)
const UnderConstruction = dynamic(() => import('@/components/UnderConstruction'), {
  ssr: true,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-slate-400 border-t-teal-400 rounded-full animate-spin mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold text-white">Loading...</h1>
      </div>
    </div>
  )
})

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700">
      {/* Priority loading for UnderConstruction */}
      <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-slate-400 border-t-teal-400 rounded-full animate-spin mx-auto mb-4"></div>
            <h1 className="text-2xl font-bold text-white">Loading...</h1>
          </div>
        </div>
      }>
        <UnderConstruction />
      </Suspense>
    </main>
  )
} 