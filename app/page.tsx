import React from 'react'
import Hero from '@/components/Hero'
import WhyPgElephant from '@/components/WhyPgElephant'
import ProjectComparison from '@/components/ProjectComparison'

export const metadata = {
  title: 'Enterprise PostgreSQL Platform | pgElephant',
  description: 'pgElephant provides enterprise-grade PostgreSQL solutions: RALE for distributed consensus, RAM for clustering, and FauxDB for MongoDB compatibility.',
  keywords: 'pgelephant, postgresql, rale, ram, fauxdb, enterprise, clustering, consensus, mongodb, document database'
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <WhyPgElephant />
      <ProjectComparison />
    </main>
  )
}