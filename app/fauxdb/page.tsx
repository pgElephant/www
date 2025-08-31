import React from 'react'
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function FauxDBPage() {
  return (
    <>
      <Head>
        <title>FauxDB - MongoDB Compatible Document Database | pgElephant</title>
        <meta name="description" content="FauxDB is a scalable, flexible MongoDB-compatible document database built on PostgreSQL for modern applications." />
        <meta name="keywords" content="fauxdb, mongodb, mongo, document database, postgresql, postgres, compatible, scalable, flexible, pgelephant" />
        <meta property="og:title" content="FauxDB - MongoDB Compatible Document Database" />
        <meta property="og:description" content="MongoDB-compatible document database on PostgreSQL backend." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pgelephant.com/fauxdb" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FauxDB - MongoDB Compatible Document Database" />
        <meta name="twitter:description" content="Scalable MongoDB-compatible document database." />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="canonical" href="https://pgelephant.com/fauxdb" />
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
                FauxDB
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                Scalable, flexible document database built on PostgreSQL. Fully open source and MongoDB API compatible for modern apps.
              </p>
            </div>
          </div>
        </div>
        <section className="py-16 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-8">What is FauxDB?</h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              FauxDB is a high-performance, modern MongoDB to PostgreSQL proxy server built with cutting-edge C++24 features, Boost libraries, and the latest C++ libraries.
            </p>
            <h3 className="text-2xl font-bold text-white mb-6">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-blue-300 mb-2">C++24 Standard</h4>
                <p className="text-slate-300">Coroutines, ranges, std::expected</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-blue-300 mb-2">Boost Integration</h4>
                <p className="text-slate-300">ASIO, Beast, JSON, Coroutines</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-blue-300 mb-2">Async I/O</h4>
                <p className="text-slate-300">Non-blocking, event-driven architecture</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-blue-300 mb-2">Multi-threaded</h4>
                <p className="text-slate-300">Hardware-concurrency aware worker thread pool</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-blue-300 mb-2">MongoDB Wire Protocol</h4>
                <p className="text-slate-300">Full MongoDB 6.0+ protocol support</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-blue-300 mb-2">PostgreSQL Backend</h4>
                <p className="text-slate-300">Efficient PostgreSQL connection pooling</p>
              </div>
            </div>
            <div className="mt-8 text-slate-400">
              <p><strong>License:</strong> MIT</p>
              <p><strong>Languages:</strong> Makefile (79.8%), C++ (11.7%), C (4.6%), CMake (2.0%), Shell (1.3%), JavaScript (0.6%)</p>
            </div>
            <a href="https://github.com/pgElephant/fauxdb" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 mt-6 bg-blue-400/80 text-slate-900 font-semibold rounded-xl hover:bg-blue-500 transition-all duration-200">
              View on GitHub
            </a>
          </div>
        </section>
        <Footer />
      </main>
    </>
  )
}
