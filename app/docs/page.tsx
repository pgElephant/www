'use client'

import React, { useState } from 'react'

import { BookOpen, Search, ChevronRight, ExternalLink, Code, Settings, Database, Users, Shield, Zap, Globe, BarChart3, Terminal, Cpu } from 'lucide-react'

const DocsPage = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    {
      title: 'RALE',
  description: 'Resilient Adaptive Leader Election (RALE).',
      icon: Cpu,
      color: 'bg-white/10 backdrop-blur-sm border-slate-400/30',
      articles: [
        { title: 'Getting Started', href: '/docs/rale/getting-started', status: 'Complete' },
        { title: 'RALE Documentation', href: '/docs/rale', status: 'Complete' },
        { title: 'API Reference', href: 'https://github.com/pgElephant/rale', status: 'External' }
      ]
    },
    {
      title: 'RAM',
  description: 'Resilient Adaptive Manager (RAM) for PostgreSQL.',
      icon: BarChart3,
      color: 'bg-white/10 backdrop-blur-sm border-slate-400/30',
      articles: [
        { title: 'Getting Started', href: '/docs/ram/getting-started', status: 'Complete' },
        { title: 'RAM Documentation', href: '/docs/ram', status: 'Complete' },
        { title: 'API Reference', href: 'https://github.com/pgElephant/ram', status: 'External' }
      ]
    },
    {
      title: 'FauxDB',
      description: 'MongoDB-compatible document database for PostgreSQL.',
      icon: Database,
      color: 'bg-white/10 backdrop-blur-sm border-slate-400/30',
      articles: [
        { title: 'Getting Started', href: '/docs/fauxdb/getting-started', status: 'Complete' },
        { title: 'FauxDB Documentation', href: '/docs/fauxdb', status: 'Complete' },
        { title: 'API Reference', href: 'https://github.com/pgElephant/fauxdb', status: 'External' }
      ]
    },
    {
      title: 'Secure PostgreSQL',
      description: 'Hardened PostgreSQL for enterprise security and compliance.',
      icon: Shield,
      color: 'bg-white/10 backdrop-blur-sm border-slate-400/30',
      articles: [
        { title: 'Getting Started', href: '/docs/secure-postgresql/getting-started', status: 'Complete' },
        { title: 'Security Features', href: '/docs/secure-postgresql/features', status: 'Complete' },
        { title: 'Compliance', href: '/docs/secure-postgresql/compliance', status: 'Complete' }
      ]
    }
  ]

  const popularArticles = [
    { title: 'Quick Start Guide', href: '#', views: '2.4k' },
    { title: 'Cluster Configuration', href: '#', views: '1.8k' },
    { title: 'Failover Testing', href: '#', views: '1.5k' },
    { title: 'Monitoring Setup', href: '#', views: '1.2k' },
    { title: 'Security Best Practices', href: '#', views: '980' }
  ]

  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.articles.some(article => 
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  return (
    <div className="pt-16 bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700">
      {/* Hero Section: Full-width horizontal product highlights */}
      <div className="relative">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-teal-400/20 to-cyan-400/15 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-teal-500/20 to-cyan-500/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-teal-300/15 to-cyan-300/10 rounded-full blur-2xl" />
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #0d9488 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-600/30 via-slate-700/20 to-teal-700/30 backdrop-blur-sm" />

        <div className="container-custom py-16 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center text-white">Documentation</h1>
          <div className="space-y-10">
            {/* RALE */}
            <section className="relative flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-yellow-400/10 via-teal-400/10 to-slate-700/10 rounded-3xl p-8 md:p-12 border border-yellow-300/20 shadow-xl overflow-hidden">
              <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none">
                <svg viewBox="0 0 400 200" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="300" cy="100" rx="120" ry="80" fill="url(#rale-docs-gradient)" opacity="0.18" />
                  <defs>
                    <radialGradient id="rale-docs-gradient" cx="0" cy="0" r="1" gradientTransform="translate(300 100) scale(120 80)" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#facc15" />
                      <stop offset="1" stopColor="#0d9488" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-2xl bg-yellow-300/20 border border-yellow-300/30 mr-0 md:mr-8 mb-6 md:mb-0">
                <Cpu className="w-12 h-12 text-yellow-400" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-extrabold text-yellow-200 mb-2">Opensource RAFT-like Leader Election (RALE)</h2>
                <p className="text-lg md:text-xl text-slate-100 mb-4">Enterprise-grade distributed consensus and leader election. Reliable, open source, and easy to integrate.</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <a href="/docs/rale/getting-started" className="px-6 py-3 bg-yellow-400/80 text-slate-900 font-semibold rounded-xl shadow hover:scale-105 transition">Getting Started</a>
                  <a href="/docs/rale" className="px-6 py-3 bg-white/10 text-yellow-200 font-semibold rounded-xl border border-yellow-300/30 hover:scale-105 transition">Documentation</a>
                  <a href="https://github.com/pgElephant/rale" className="px-6 py-3 bg-slate-800 text-yellow-200 font-semibold rounded-xl border border-yellow-300/30 hover:scale-105 transition">API Reference</a>
                </div>
              </div>
            </section>
            {/* RAM */}
            <section className="relative flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-green-400/10 via-teal-400/10 to-slate-700/10 rounded-3xl p-8 md:p-12 border border-green-300/20 shadow-xl overflow-hidden">
              <div className="absolute left-0 top-0 w-1/2 h-full pointer-events-none">
                <svg viewBox="0 0 400 200" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0" y="40" width="200" height="120" rx="60" fill="url(#ram-docs-gradient)" opacity="0.16" />
                  <defs>
                    <linearGradient id="ram-docs-gradient" x1="0" y1="100" x2="200" y2="100" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#22c55e" />
                      <stop offset="1" stopColor="#0d9488" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-2xl bg-green-300/20 border border-green-300/30 mr-0 md:mr-8 mb-6 md:mb-0">
                <BarChart3 className="w-12 h-12 text-green-400" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-extrabold text-green-200 mb-2">Opensource RAM</h2>
                <p className="text-lg md:text-xl text-slate-100 mb-4">Automated PostgreSQL failover and cluster management powered by RALE. High availability, resilience, and seamless scaling.</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <a href="/docs/ram/getting-started" className="px-6 py-3 bg-green-400/80 text-slate-900 font-semibold rounded-xl shadow hover:scale-105 transition">Getting Started</a>
                  <a href="/docs/ram" className="px-6 py-3 bg-white/10 text-green-200 font-semibold rounded-xl border border-green-300/30 hover:scale-105 transition">Documentation</a>
                  <a href="https://github.com/pgElephant/ram" className="px-6 py-3 bg-slate-800 text-green-200 font-semibold rounded-xl border border-green-300/30 hover:scale-105 transition">API Reference</a>
                </div>
              </div>
            </section>
            {/* FauxDB */}
            <section className="relative flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-blue-400/10 via-teal-400/10 to-slate-700/10 rounded-3xl p-8 md:p-12 border border-blue-300/20 shadow-xl overflow-hidden">
              <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none">
                <svg viewBox="0 0 400 200" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="300" cy="100" r="80" fill="url(#fauxdb-docs-gradient)" opacity="0.15" />
                  <defs>
                    <radialGradient id="fauxdb-docs-gradient" cx="0" cy="0" r="1" gradientTransform="translate(300 100) scale(80)" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#38bdf8" />
                      <stop offset="1" stopColor="#0d9488" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-300/20 border border-blue-300/30 mr-0 md:mr-8 mb-6 md:mb-0">
                <Database className="w-12 h-12 text-blue-400" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-extrabold text-blue-200 mb-2">Open Source MongoDB-Compatible PostgreSQL Document Database</h2>
                <p className="text-lg md:text-xl text-slate-100 mb-4">Scalable, flexible document database built on PostgreSQL. Fully open source and MongoDB API compatible for modern apps.</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <a href="/docs/fauxdb/getting-started" className="px-6 py-3 bg-blue-400/80 text-slate-900 font-semibold rounded-xl shadow hover:scale-105 transition">Getting Started</a>
                  <a href="/docs/fauxdb" className="px-6 py-3 bg-white/10 text-blue-200 font-semibold rounded-xl border border-blue-300/30 hover:scale-105 transition">Documentation</a>
                  <a href="https://github.com/pgElephant/fauxdb" className="px-6 py-3 bg-slate-800 text-blue-200 font-semibold rounded-xl border border-blue-300/30 hover:scale-105 transition">API Reference</a>
                </div>
              </div>
            </section>
          </div>
          {/* Search */}
          <div className="max-w-2xl mx-auto mt-16">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-slate-300/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-300/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h3 className="text-lg font-semibold text-white mb-4">Popular Articles</h3>
              <div className="space-y-2">
                {popularArticles.map((article) => (
                  <a
                    key={article.title}
                    href={article.href}
                    className="block p-3 rounded-lg hover:bg-slate-400/20 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300 group-hover:text-white">
                        {article.title}
                      </span>
                      <span className="text-xs text-slate-400">{article.views}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {searchQuery && (
              <div className="mb-8 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-slate-400/30">
                <p className="text-slate-300">
                  Showing results for "<span className="font-semibold">{searchQuery}</span>"
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredCategories.map((category, index) => (
                <div
                  key={category.title}
                  className={`${category.color} rounded-2xl p-6 border hover:shadow-xl hover:scale-105 transition-all duration-300`}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-slate-100/20 rounded-xl flex items-center justify-center mr-4 border border-slate-400/30">
                      <category.icon className="w-6 h-6 text-teal-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{category.title}</h3>
                      <p className="text-sm text-slate-300">{category.description}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {category.articles.map((article) => (
                      <a
                        key={article.title}
                        href={article.href}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-400/20 transition-colors group"
                      >
                        <span className="text-sm text-slate-300 group-hover:text-white">
                          {article.title}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs px-2 py-1 bg-green-400/20 text-green-300 rounded-full">
                            {article.status}
                          </span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-300 transition-colors" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Resources */}
            <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-slate-400/30">
              <h3 className="text-2xl font-bold text-white mb-6">Additional Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <a
                  href="https://github.com/pgElephant/rale"
                  className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-slate-400/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Code className="w-8 h-8 text-teal-400" />
                    <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-teal-300 transition-colors" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">API Reference</h4>
                  <p className="text-sm text-slate-300">Complete API documentation and examples</p>
                </a>
                
                <a
                  href="/community"
                  className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-slate-400/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Users className="w-8 h-8 text-teal-400" />
                    <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-teal-300 transition-colors" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">Community</h4>
                  <p className="text-sm text-slate-300">Get help from the community</p>
                </a>
                
                <a
                  href="/download"
                  className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-slate-400/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Zap className="w-8 h-8 text-teal-400" />
                    <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-teal-300 transition-colors" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">Download</h4>
                  <p className="text-sm text-slate-300">Get the latest version</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocsPage 