'use client'

import React, { useState } from 'react'

import { BookOpen, Search, ChevronRight, ExternalLink, Code, Settings, Database, Users, Shield, Zap, Globe, BarChart3, Terminal } from 'lucide-react'

const DocsPage = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    {
      title: 'Getting Started',
      description: 'Quick start guides and basic concepts',
      icon: BookOpen,
      color: 'bg-white/10 backdrop-blur-sm border-slate-400/30',
      articles: [
        { title: 'Installation Guide', href: '#', status: 'Complete' },
        { title: 'Quick Start Tutorial', href: '#', status: 'Complete' },
        { title: 'Basic Configuration', href: '#', status: 'Complete' },
        { title: 'First Cluster Setup', href: '#', status: 'Complete' }
      ]
    },
    {
      title: 'Core Concepts',
      description: 'Understanding PostgreSQL high availability',
      icon: Database,
      color: 'bg-white/10 backdrop-blur-sm border-slate-400/30',
      articles: [
        { title: 'Architecture Overview', href: '#', status: 'Complete' },
        { title: 'Leader Election', href: '#', status: 'Complete' },
        { title: 'Replication Strategies', href: '#', status: 'Complete' },
        { title: 'Failover Process', href: '#', status: 'Complete' }
      ]
    },
    {
      title: 'CLI Reference',
      description: 'Command-line interface documentation',
      icon: Terminal,
      color: 'bg-white/10 backdrop-blur-sm border-slate-400/30',
      articles: [
        { title: 'pgelephant cluster', href: '#', status: 'Complete' },
        { title: 'pgelephant node', href: '#', status: 'Complete' },
        { title: 'pgelephant config', href: '#', status: 'Complete' },
        { title: 'pgelephant logs', href: '#', status: 'Complete' }
      ]
    },
    {
      title: 'Configuration',
      description: 'Advanced configuration options',
      icon: Settings,
      color: 'bg-white/10 backdrop-blur-sm border-slate-400/30',
      articles: [
        { title: 'Cluster Configuration', href: '#', status: 'Complete' },
        { title: 'Security Settings', href: '#', status: 'Complete' },
        { title: 'Network Configuration', href: '#', status: 'Complete' },
        { title: 'Monitoring Setup', href: '#', status: 'Complete' }
      ]
    },
    {
      title: 'Operations',
      description: 'Day-to-day operations and maintenance',
      icon: Users,
      color: 'bg-white/10 backdrop-blur-sm border-slate-400/30',
      articles: [
        { title: 'Monitoring & Alerts', href: '#', status: 'Complete' },
        { title: 'Backup & Recovery', href: '#', status: 'Complete' },
        { title: 'Scaling Clusters', href: '#', status: 'Complete' },
        { title: 'Troubleshooting', href: '#', status: 'Complete' }
      ]
    },
    {
      title: 'Security',
      description: 'Security best practices and configuration',
      icon: Shield,
      color: 'bg-white/10 backdrop-blur-sm border-slate-400/30',
      articles: [
        { title: 'Authentication', href: '#', status: 'Complete' },
        { title: 'Encryption', href: '#', status: 'Complete' },
        { title: 'Network Security', href: '#', status: 'Complete' },
        { title: 'Audit Logging', href: '#', status: 'Complete' }
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
      {/* Header */}
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
              Everything you need to deploy and manage PostgreSQL high availability clusters.
            </p>
            
            {/* Search */}
            <div className="max-w-2xl mx-auto">
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