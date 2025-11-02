import React from 'react'
import Hero from '@/components/Hero'
import NeuronDBShowcase from '@/components/NeuronDBShowcase'
import WhyPgElephant from '@/components/WhyPgElephant'
import ClusterArchitecture from '@/components/ClusterArchitecture'
import FeaturesList from '@/components/FeaturesList'
import ProductSchema from '@/components/SEO/ProductSchema'

export const metadata = {
  title: 'pgElephant | Enterprise PostgreSQL Platform - AI Database & Dual-Protocol Compatibility',
  description: 'pgElephant delivers enterprise-grade PostgreSQL solutions: NeurondB AI database extension with vector search and ML inference, pgbalancer connection pooling with load balancing, pgraft Raft extension for leader election, FauxDB dual-protocol database (MongoDB + MySQL), pgSentinel monitoring platform, and pg_stat_insights performance analytics. Zero-downtime database operations for production environments.',
  keywords: [
    'enterprise postgresql', 'postgresql platform', 'database clustering', 'high availability',
    'postgresql failover', 'mongodb alternative', 'mysql alternative', 'dual-protocol database',
    'AI database', 'vector database', 'machine learning postgresql', 'embeddings', 'semantic search',
    'raft algorithm', 'postgresql extension', 'database management', 'production database',
    'postgresql solutions', 'pgbalancer pooling', 'pgraft extension', 'fauxdb', 'neurondb',
    'pgsentinel monitoring', 'pg_stat_insights analytics', 'postgresql monitoring', 'database analytics',
    'automatic failover', 'zero downtime', 'database replication', 'leader election',
    'postgresql ha', 'mongodb wire protocol', 'mysql wire protocol', 'sql translator',
    'distributed postgresql', 'postgresql consensus', 'database reliability', 'hybrid search', 'RAG pipeline'
  ].join(', '),
  openGraph: {
    title: 'pgElephant - Enterprise PostgreSQL Platform | AI Database & Dual-Protocol Compatibility',
    description: 'Enterprise-grade PostgreSQL solutions: NeurondB AI database extension with vector search and ML inference, pgbalancer connection pooling with load balancing, pgraft Raft extension, FauxDB dual-protocol database (MongoDB + MySQL), pgSentinel monitoring platform, and pg_stat_insights performance analytics.',
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
    description: 'Enterprise-grade PostgreSQL solutions: NeurondB AI database extension, pgbalancer connection pooling, pgraft Raft extension, FauxDB dual-protocol database (MongoDB + MySQL), pgSentinel monitoring platform, and pg_stat_insights performance analytics.',
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
        <NeuronDBShowcase />
        <ClusterArchitecture />
        <FeaturesList />
      </main>
    </>
  )
}