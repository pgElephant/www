'use client'

import React, { useState } from 'react'
import Head from 'next/head'
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
    <>
      <Head>
        <title>Documentation - pgElephant Products | Consensus, PostgreSQL, MongoDB</title>
        <meta name="description" content="Comprehensive documentation for pgElephant products: distributed consensus, PostgreSQL clusters, MongoDB-compatible document database, and high availability solutions." />
        <meta name="keywords" content="documentation, pgelephant, consensus, distributed, quorum, postgresql, postgres, mongodb, mongo, document database, high availability, cluster management" />
        <meta property="og:title" content="Documentation - pgElephant Products" />
        <meta property="og:description" content="Complete guides for distributed consensus, PostgreSQL, and MongoDB solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pgelephant.com/docs" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Documentation - pgElephant Products" />
        <meta name="twitter:description" content="Comprehensive documentation for pgElephant solutions." />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="canonical" href="https://pgelephant.com/docs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pt-16 bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700">
      {/* Hero Section */}
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
              Documentation
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Comprehensive guides and resources for pgElephant products.
            </p>
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
    </>
  )
}

export default DocsPage 