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
        <title>pgElephant — PostgreSQL Cluster & Document Database</title>
        <meta name="description" content="pgElephant: Multi-node PostgreSQL clusters, document database, and high availability for modern production workloads." />
        <meta property="og:title" content="pgElephant — PostgreSQL Cluster & Document Database" />
        <meta property="og:description" content="Multi-node PostgreSQL clusters, document database, and high availability." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pgelephant.com/" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="pgElephant — PostgreSQL Cluster & Document Database" />
        <meta name="twitter:description" content="Multi-node PostgreSQL clusters, document database, and high availability." />
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
        <Footer />
      </main>
    </>
  )
}