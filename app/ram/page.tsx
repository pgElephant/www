import React from 'react'
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function RamPage() {
  return (
    <>
      <Head>
        <title>RAM - PostgreSQL Cluster Management & Failover | pgElephant</title>
        <meta name="description" content="RAM provides automated PostgreSQL failover, cluster management, and high availability solutions powered by distributed consensus." />
        <meta name="keywords" content="ram, postgresql, postgres, cluster management, failover, high availability, distributed consensus, quorum, pgelephant" />
        <meta property="og:title" content="RAM - PostgreSQL Cluster Management & Failover" />
        <meta property="og:description" content="Automated PostgreSQL failover and cluster management for high availability." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pgelephant.com/ram" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RAM - PostgreSQL Cluster Management & Failover" />
        <meta name="twitter:description" content="Automated failover and cluster management for PostgreSQL." />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="canonical" href="https://pgelephant.com/ram" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700">
        <Header />
        <div className="bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700 text-white relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-teal-400/20 to-cyan-400/15 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-teal-500/20 to-cyan-500/15 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-teal-300/15 to-cyan-300/10 rounded-full blur-2xl" />
          </div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #0d9488 1px, transparent 0)`,
              backgroundSize: '50px 50px'
            }} />
          </div>

          {/* Glassmorphism Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-600/30 via-slate-700/20 to-teal-700/30 backdrop-blur-sm" />

          <div className="container-custom py-16 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                RAM
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                Automated PostgreSQL failover and cluster management powered by RALE. High availability, resilience, and seamless scaling.
              </p>
            </div>
          </div>
        </div>
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-8">What is RAM?</h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              RAM is a resource management and monitoring system for PostgreSQL clusters, providing automated failover and high availability.
            </p>
            <h3 className="text-2xl font-bold text-white mb-6">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-green-300 mb-2">Resource Monitoring</h4>
                <p className="text-slate-300">Comprehensive monitoring of cluster resources</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-green-300 mb-2">Performance Metrics</h4>
                <p className="text-slate-300">Detailed performance analytics and metrics</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-green-300 mb-2">Health Checks</h4>
                <p className="text-slate-300">Automated health monitoring and diagnostics</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-green-300 mb-2">Alerting</h4>
                <p className="text-slate-300">Real-time alerts for cluster issues</p>
              </div>
            </div>
            <div className="mt-8 text-slate-400">
              <p><strong>License:</strong> MIT</p>
              <p><strong>Languages:</strong> C (99.0%), Other (1.0%)</p>
            </div>
            <a href="https://github.com/pgElephant/ram" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 mt-6 bg-green-400/80 text-slate-900 font-semibold rounded-xl hover:bg-green-500 transition-all duration-200">
              View on GitHub
            </a>
          </div>
        </section>
        <Footer />
      </main>
    </>
  )
}
