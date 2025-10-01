import React from 'react'
import Hero from '@/components/Hero'
import WhyPgElephant from '@/components/WhyPgElephant'
import FeaturesList from '@/components/FeaturesList'
import LiveDemoTerminal from '@/components/LiveDemoTerminal'
import ProductSchema from '@/components/SEO/ProductSchema'

export const metadata = {
  title: 'Enterprise PostgreSQL Platform | High Availability & MongoDB Alternative',
  description: 'pgElephant delivers enterprise-grade PostgreSQL solutions: RAM clustering with automatic failover, RALE distributed consensus, pgraft Raft extension, and FauxDB MongoDB-compatible document database. Production-ready, open-source tools for modern applications.',
  keywords: [
    'enterprise postgresql', 'postgresql platform', 'database clustering', 'high availability',
    'postgresql failover', 'mongodb alternative', 'document database', 'distributed consensus',
    'raft algorithm', 'postgresql extension', 'database management', 'production database',
    'postgresql solutions', 'ram clustering', 'rale consensus', 'pgraft extension', 'fauxdb'
  ].join(', '),
  openGraph: {
    title: 'Enterprise PostgreSQL Platform | pgElephant',
    description: 'Enterprise-grade PostgreSQL solutions: RAM clustering, RALE distributed consensus, pgraft Raft extension, and FauxDB MongoDB-compatible document database.',
    images: ['/og-home.jpg'],
    type: 'website',
  },
  twitter: {
    title: 'Enterprise PostgreSQL Platform | pgElephant',
    description: 'Enterprise-grade PostgreSQL solutions: RAM clustering, RALE distributed consensus, pgraft Raft extension, and FauxDB MongoDB-compatible document database.',
    images: ['/twitter-home.jpg'],
  },
  alternates: {
    canonical: '/',
  },
}

export default function Home() {
  return (
    <>
      <ProductSchema
        name="pgElephant Platform"
        description="Enterprise-grade PostgreSQL solutions including RAM clustering, RALE distributed consensus, pgraft Raft extension, and FauxDB MongoDB-compatible document database."
        category="DatabaseApplication"
        operatingSystem={['Linux', 'macOS', 'Windows']}
        downloadUrl="/download"
        keywords={[
          'PostgreSQL', 'high availability', 'database clustering', 'failover',
          'distributed consensus', 'MongoDB alternative', 'document database'
        ]}
        features={[
          'Automatic failover with RAM clustering',
          'Distributed consensus with RALE',
          'Raft consensus protocol with pgraft',
          'MongoDB-compatible queries with FauxDB',
          'Production-ready reliability',
          'Open-source transparency'
        ]}
        requirements={[
          'PostgreSQL 12+',
          'Linux, macOS, or Windows',
          'Minimum 2GB RAM',
          'Network connectivity for clustering'
        ]}
        rating={{
          value: 4.8,
          count: 127,
          bestRating: 5,
          worstRating: 1
        }}
      />
      <main className="min-h-screen">
        <Hero />
        <WhyPgElephant />
        <FeaturesList />
        <LiveDemoTerminal />
      </main>
    </>
  )
}