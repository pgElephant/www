import React from 'react'
import Hero from '@/components/Hero'
import NeuronDBShowcase from '@/components/NeuronDBShowcase'
import WhyPgElephant from '@/components/WhyPgElephant'
import ClusterArchitecture from '@/components/ClusterArchitecture'
import FeaturesList from '@/components/FeaturesList'
import ProductSchema from '@/components/SEO/ProductSchema'

export const metadata = {
  title: 'pgElephant | Enterprise PostgreSQL Platform - AI Database, Vector Search & RAG Pipeline',
  description: 'pgElephant delivers enterprise-grade PostgreSQL solutions: NeurondB AI database extension with vector search, RAG pipeline, ML inference, and GPU acceleration. Plus pgbalancer connection pooling, pgraft Raft extension for leader election, FauxDB dual-protocol database (MongoDB + MySQL), pgSentinel monitoring, and pg_stat_insights analytics. Production-ready AI database for PostgreSQL.',
  keywords: [
    // AI Database & Vector Search Keywords
    'ai database', 'ai database postgresql', 'postgres ai', 'postgresql ai extension', 'postgres ai extension',
    'vector database', 'vector database postgresql', 'postgres vector database', 'vector search postgresql',
    'rag pipeline', 'rag database', 'rag postgresql', 'retrieval augmented generation postgresql',
    'semantic search postgresql', 'semantic database', 'similarity search postgresql',
    'machine learning postgresql', 'ml inference postgresql', 'postgres ml', 'postgresql machine learning',
    'embeddings database', 'embedding generation postgresql', 'hnsw postgresql', 'hybrid search',
    'pgvector alternative', 'neurondb', 'open source vector database', 'ai powered database',
    // Enterprise PostgreSQL Keywords
    'enterprise postgresql', 'postgresql platform', 'database clustering', 'high availability',
    'postgresql failover', 'mongodb alternative', 'mysql alternative', 'dual-protocol database',
    'raft algorithm', 'postgresql extension', 'database management', 'production database',
    'postgresql solutions', 'pgbalancer pooling', 'pgraft extension', 'fauxdb',
    'pgsentinel monitoring', 'pg_stat_insights analytics', 'postgresql monitoring', 'database analytics',
    'automatic failover', 'zero downtime', 'database replication', 'leader election',
    'postgresql ha', 'mongodb wire protocol', 'mysql wire protocol', 'sql translator',
    'distributed postgresql', 'postgresql consensus', 'database reliability'
  ].join(', '),
  openGraph: {
    title: 'pgElephant - Enterprise PostgreSQL Platform | AI Database, Vector Search & RAG',
    description: 'Enterprise-grade PostgreSQL solutions: NeurondB AI database extension with vector search, RAG pipeline, ML inference, and GPU acceleration. Plus pgbalancer connection pooling, pgraft Raft extension, FauxDB dual-protocol database (MongoDB + MySQL), pgSentinel monitoring, and pg_stat_insights analytics. Production-ready AI database for PostgreSQL.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'pgElephant Enterprise PostgreSQL Platform with AI Database',
      }
    ],
    type: 'website',
    locale: 'en_US',
    siteName: 'pgElephant',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'pgElephant - Enterprise PostgreSQL Platform | AI Database & Vector Search',
    description: 'Enterprise PostgreSQL solutions: NeurondB AI database with vector search, RAG pipeline, ML inference, GPU acceleration. Plus pgbalancer, pgraft, FauxDB, pgSentinel, and pg_stat_insights. Production-ready AI database.',
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