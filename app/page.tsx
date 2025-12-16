import React from 'react'
import Hero from '@/components/Hero'
import WhyPgElephant from '@/components/WhyPgElephant'
import ProductSchema from '@/components/SEO/ProductSchema'

export const metadata = {
  title: 'pgElephant | PostgreSQL High Availability Solution - Automatic Failover & Clustering',
  description: 'pgElephant is a PostgreSQL High Availability Solution providing automatic failover, zero-downtime clustering, and distributed consensus. Includes pgraft Raft extension for leader election, pgbalancer connection pooling, pgSentinel monitoring, and pg_stat_insights analytics.',
  keywords: [
    // PostgreSQL High Availability Keywords (Primary)
    'postgresql high availability', 'postgresql ha solution', 'postgresql high availability solution',
    'postgresql automatic failover', 'postgresql zero downtime', 'postgresql clustering',
    'postgresql failover', 'postgresql ha', 'postgresql leader election', 'postgresql consensus',
    'distributed postgresql', 'postgresql raft', 'postgresql replication', 'postgresql disaster recovery',
    // Enterprise PostgreSQL Keywords
    'enterprise postgresql', 'postgresql platform', 'database clustering', 'high availability',
    'postgresql failover', 'mongodb alternative', 'mysql alternative', 'dual-protocol database',
    'raft algorithm', 'postgresql extension', 'database management', 'production database',
    'postgresql solutions', 'pgbalancer pooling', 'pgraft extension',
    'pgsentinel monitoring', 'pg_stat_insights analytics', 'postgresql monitoring', 'database analytics',
    'automatic failover', 'zero downtime', 'database replication', 'leader election',
    'postgresql ha', 'mongodb wire protocol', 'mysql wire protocol', 'sql translator',
    'distributed postgresql', 'postgresql consensus', 'database reliability'
  ].join(', '),
  openGraph: {
    title: 'pgElephant - PostgreSQL High Availability Solution | Automatic Failover & Clustering',
    description: 'PostgreSQL High Availability Solution with automatic failover, zero-downtime clustering, and distributed consensus. Includes pgraft Raft extension, pgbalancer connection pooling, pgSentinel monitoring, and pg_stat_insights analytics.',
    images: [
      {
        url: '/og-image.jpg?v=2',
        width: 1200,
        height: 630,
        alt: 'pgElephant PostgreSQL Extensions',
      }
    ],
    type: 'website',
    locale: 'en_US',
    siteName: 'pgElephant',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'pgElephant - PostgreSQL High Availability Solution',
    description: 'PostgreSQL High Availability Solution with automatic failover, zero-downtime clustering, and distributed consensus. Includes pgraft, pgbalancer, pgSentinel, and pg_stat_insights.',
    images: ['/og-image.jpg?v=2'],
    creator: '@pgElephant',
    site: '@pgElephant',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function Home() {
  return (
    <>
      <ProductSchema />
      <main className="min-h-screen">
        <Hero />
        <WhyPgElephant />
      </main>
    </>
  )
}