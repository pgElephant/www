import React from 'react'
import Head from 'next/head'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'

import Comparison from '@/components/Comparison'

import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>pgElephant - Distributed Consensus, PostgreSQL Clusters & MongoDB Compatible Document Database</title>
        <meta name="description" content="pgElephant provides distributed consensus, quorum selection, high-availability PostgreSQL clusters, and MongoDB-compatible document database solutions for modern applications." />
        <meta name="keywords" content="pgelephant, consensus, distributed, quorum, selection, postgres, postgresql, mongodb, mongo, document database, high availability, cluster management, leader election, failover" />
        <meta property="og:title" content="pgElephant - Distributed Consensus, PostgreSQL Clusters & MongoDB Compatible Document Database" />
        <meta property="og:description" content="Distributed consensus, quorum selection, PostgreSQL clusters, and MongoDB-compatible document database for high availability." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pgelephant.com/" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="pgElephant - Distributed Consensus, PostgreSQL Clusters & MongoDB Compatible Document Database" />
        <meta name="twitter:description" content="Distributed consensus, quorum selection, PostgreSQL clusters, and MongoDB-compatible document database." />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="canonical" href="https://pgelephant.com/" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700">
        <Header />
        <Hero />
        <Features />
        <Comparison />
        {/* ...existing code... */}
  {/* Footer is rendered by layout.tsx, removed to avoid duplication */}
      </main>
    </>
  )
}