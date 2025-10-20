import React from 'react'
import Hero from '@/components/Hero'
import WhyPgElephant from '@/components/WhyPgElephant'
import FeaturesList from '@/components/FeaturesList'
import ProductSchema from '@/components/SEO/ProductSchema'

export const metadata = {
  title: 'pgElephant | Enterprise PostgreSQL Platform - High Availability & MongoDB Alternative',
  description: 'pgElephant delivers enterprise-grade PostgreSQL solutions: pgbalancer connection pooling with load balancing, RALE distributed consensus, pgraft Raft extension for leader election, FauxDB MongoDB-compatible document database, pgSentinel monitoring platform, and pg_stat_insights performance analytics. Zero-downtime database operations for production environments.',
  keywords: [
    'enterprise postgresql', 'postgresql platform', 'database clustering', 'high availability',
    'postgresql failover', 'mongodb alternative', 'document database', 'distributed consensus',
    'raft algorithm', 'postgresql extension', 'database management', 'production database',
    'postgresql solutions', 'pgbalancer pooling', 'rale consensus', 'pgraft extension', 'fauxdb',
    'pgsentinel monitoring', 'pg_stat_insights analytics', 'postgresql monitoring', 'database analytics',
    'automatic failover', 'zero downtime', 'database replication', 'leader election',
    'postgresql ha', 'database clustering software', 'mongodb compatible database',
    'distributed postgresql', 'postgresql consensus', 'database reliability'
  ].join(', '),
  openGraph: {
    title: 'pgElephant - Enterprise PostgreSQL Platform | High Availability & MongoDB Alternative',
    description: 'Enterprise-grade PostgreSQL solutions: pgbalancer connection pooling with load balancing, RALE distributed consensus, pgraft Raft extension, FauxDB MongoDB-compatible document database, pgSentinel monitoring platform, and pg_stat_insights performance analytics.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'pgElephant Enterprise PostgreSQL Platform',
      }
    ],
    type: 'website',
    locale: 'en_US',
    siteName: 'pgElephant',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'pgElephant - Enterprise PostgreSQL Platform',
    description: 'Enterprise-grade PostgreSQL solutions: pgbalancer connection pooling, RALE distributed consensus, pgraft Raft extension, FauxDB MongoDB-compatible document database, pgSentinel monitoring platform, and pg_stat_insights performance analytics.',
    images: ['/og-image.jpg'],
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
        <FeaturesList />
      </main>
    </>
  )
}