import React from 'react'
import Head from 'next/head'
import Download from '@/components/Download'

export default function DownloadPage() {
  return (
    <>
      <Head>
        <title>Download pgElephant - Distributed Consensus & PostgreSQL Solutions</title>
        <meta name="description" content="Download pgElephant for distributed consensus, PostgreSQL cluster management, MongoDB-compatible document database, and high availability solutions." />
        <meta name="keywords" content="download, pgelephant, consensus, distributed, quorum, postgresql, postgres, mongodb, mongo, document database, high availability, cluster management" />
        <meta property="og:title" content="Download pgElephant - Distributed Solutions" />
        <meta property="og:description" content="Get pgElephant for consensus, PostgreSQL, and MongoDB solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pgelephant.com/download" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Download pgElephant" />
        <meta name="twitter:description" content="Download distributed consensus and database solutions." />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="canonical" href="https://pgelephant.com/download" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700">
        <Download />
      </main>
    </>
  )
} 