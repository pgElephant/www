import React from 'react'
import { BookOpen, ArrowRight, Code, Download, ExternalLink, FileText, Container, Database, Cpu, Zap, Network, Activity, Star, Loader2, Crown, Shield, Layers, Server } from 'lucide-react'
import Link from 'next/link'

// Custom icon components matching download page
const NeuronDBIcon = () => (
  <div className="relative w-20 h-20 flex items-center justify-center">
    <Database className="w-12 h-12 text-purple-400" />
    <Cpu className="w-7 h-7 text-pink-400 absolute -top-1 -right-1" />
    <Zap className="w-5 h-5 text-yellow-400 absolute -bottom-1 -left-1" />
    <Network className="w-5 h-5 text-cyan-400 absolute -bottom-1 -right-1" />
  </div>
)

const PgStatInsightsIcon = () => (
  <div className="relative w-20 h-20 flex items-center justify-center">
    <Activity className="w-12 h-12 text-teal-400" />
    <Star className="w-7 h-7 text-yellow-400 absolute -top-1 -right-1" />
    <Database className="w-5 h-5 text-cyan-400 absolute -bottom-1 -left-1" />
    <Zap className="w-5 h-5 text-orange-400 absolute -bottom-1 -right-1" />
  </div>
)

const PgbalancerIcon = () => (
  <div className="relative w-20 h-20 flex items-center justify-center">
    <Database className="w-13 h-13 text-cyan-400" />
    <Loader2 className="w-6 h-6 text-green-400 absolute -top-1 -right-1 animate-spin" />
    <Zap className="w-5 h-5 text-yellow-400 absolute -bottom-1 -left-1" />
  </div>
)

const PgraftIcon = () => (
  <div className="relative w-20 h-20 flex items-center justify-center">
    <Database className="w-12 h-12 text-blue-400" />
    <Crown className="w-6 h-6 text-yellow-400 absolute -top-1 -right-1" />
    <Network className="w-5 h-5 text-green-400 absolute -bottom-1 -left-1" />
    <Shield className="w-5 h-5 text-purple-400 absolute -bottom-1 -right-1" />
  </div>
)

const FauxDbIcon = () => (
  <div className="relative w-20 h-20 flex items-center justify-center">
    <Database className="w-12 h-12 text-emerald-400" />
    <FileText className="w-6 h-6 text-orange-400 absolute -top-1 -right-1" />
    <Layers className="w-5 h-5 text-blue-400 absolute -bottom-1 -left-1" />
    <Activity className="w-5 h-5 text-red-400 absolute -bottom-1 -right-1" />
  </div>
)

const PgSentinelIcon = () => (
  <div className="relative w-20 h-20 flex items-center justify-center">
    <Server className="w-12 h-12 text-indigo-400" />
    <Activity className="w-6 h-6 text-green-400 absolute -top-1 -right-1" />
    <Shield className="w-5 h-5 text-cyan-400 absolute -bottom-1 -left-1" />
    <Star className="w-5 h-5 text-yellow-400 absolute -bottom-1 -right-1" />
  </div>
)

const DocsPage = () => {
  const products = [
    {
      id: 'neurondb',
      name: 'NeuronDB',
      title: 'AI Database Extension',
      icon: 'neurondb-custom',
      gradient: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-400/30',
      glowColor: 'shadow-purple-500/20',
      description: 'Production-grade AI database extension for PostgreSQL with vector search, ML inference, hybrid retrieval, and complete RAG pipeline',
      docs: [
        { title: 'Getting Started', href: '/docs/neurondb/getting-started', type: 'Guide', description: 'Quick start guide for NeuronDB' },
        { title: 'Installation', href: '/docs/neurondb/installation', type: 'Guide', description: 'Build and install from source' },
        { title: 'Vector Types', href: '/docs/neurondb/features', type: 'Reference', description: 'Vector data types and operators' },
        { title: 'ML & Embeddings', href: '/docs/neurondb/ml', type: 'Guide', description: 'Machine learning and embedding generation' },
        { title: 'GPU Acceleration', href: '/docs/neurondb/gpu', type: 'Guide', description: 'CUDA/ROCm GPU support' },
        { title: 'Hybrid Search', href: '/docs/neurondb/hybrid', type: 'Guide', description: 'Semantic + full-text search' },
        { title: 'RAG Pipeline', href: '/docs/neurondb/rag', type: 'Guide', description: 'Complete RAG implementation' },
        { title: 'Background Workers', href: '/docs/neurondb/background-workers', type: 'Guide', description: 'neuranq, neuranmon, neurandefrag' },
        { title: 'ML Analytics', href: '/docs/neurondb/analytics', type: 'Guide', description: 'K-means, DBSCAN, PCA, drift detection' },
        { title: 'Configuration', href: '/docs/neurondb/configuration', type: 'Reference', description: 'Extension configuration options' },
        { title: 'Performance', href: '/docs/neurondb/performance', type: 'Guide', description: 'Optimization and tuning' }
      ]
    },
    {
      id: 'pg_stat_insights',
      name: 'pg_stat_insights',
      title: 'Performance Analytics Extension',
      icon: 'pg_stat_insights-custom',
      gradient: 'from-teal-500/20 to-cyan-500/20',
      borderColor: 'border-teal-400/30',
      glowColor: 'shadow-teal-500/20',
      description: 'Deep PostgreSQL performance analytics extension with 52 metrics across 11 views. Track slow queries, cache efficiency, and optimize database performance',
      docs: [
        { title: 'Getting Started', href: '/docs/pg-stat-insights/getting-started', type: 'Guide', description: 'Quick start guide for pg_stat_insights' },
        { title: 'Metrics Guide', href: '/docs/pg_stat_insights/metrics', type: 'Reference', description: 'All 52 metric columns explained' },
        { title: 'Configuration', href: '/docs/pg_stat_insights/configuration', type: 'Reference', description: 'GUC parameters and tuning' },
        { title: 'API Reference', href: '/docs/pg-stat-insights/api', type: 'Reference', description: 'Complete view and function reference' },
        { title: 'Query Analytics', href: '/docs/pg-stat-insights/query-analytics', type: 'Guide', description: 'Query performance analysis' },
        { title: 'Best Practices', href: '/docs/pg-stat-insights/best-practices', type: 'Guide', description: 'Optimization best practices' }
      ]
    },
    {
      id: 'pgbalancer',
      name: 'pgbalancer',
      title: 'Connection Pooling & Load Balancing',
      icon: 'pgbalancer-custom',
      gradient: 'from-cyan-500/20 to-blue-500/20',
      borderColor: 'border-cyan-400/30',
      glowColor: 'shadow-cyan-500/20',
      description: 'Modern PostgreSQL connection pooler and load balancer. pgpool-II alternative with AI-powered load balancing, HAProxy mode, automatic failover, and REST API',
      docs: [
        { title: 'Getting Started', href: '/docs/pgbalancer/getting-started', type: 'Guide', description: 'Install and configure pgbalancer' },
        { title: 'Configuration', href: '/docs/pgbalancer/configuration', type: 'Guide', description: 'Configuration options and settings' },
        { title: 'Metrics & Observability', href: '/docs/pgbalancer/metrics', type: 'Guide', description: 'Prometheus metrics and monitoring' },
        { title: 'Architecture & Internals', href: '/docs/pgbalancer/internals', type: 'Guide', description: 'Learn about pgbalancer internals and architecture' }
      ]
    },
    {
      id: 'pgraft',
      name: 'pgraft',
      title: 'PostgreSQL Raft Extension',
      icon: 'pgraft-custom',
      gradient: 'from-blue-500/20 to-purple-500/20',
      borderColor: 'border-blue-400/30',
      glowColor: 'shadow-blue-500/20',
      description: 'PostgreSQL extension implementing Raft consensus protocol for distributed database systems with automatic leader election and split-brain prevention',
      docs: [
        { title: 'Getting Started', href: '/docs/pgraft/getting-started', type: 'Guide', description: 'Install and configure pgraft extension' },
        { title: 'Installation', href: '/docs/pgraft/installation', type: 'Guide', description: 'Build and install from source' },
        { title: 'Configuration', href: '/docs/pgraft/configuration', type: 'Guide', description: 'PostgreSQL configuration settings' },
        { title: 'SQL Functions', href: '/docs/pgraft/sql-reference', type: 'Reference', description: 'PostgreSQL SQL function reference' },
        { title: 'Raft Protocol', href: '/docs/pgraft/raft-protocol', type: 'Guide', description: 'Understanding Raft consensus implementation' },
        { title: 'Cluster Management', href: '/docs/pgraft/cluster-management', type: 'Guide', description: 'Managing PostgreSQL clusters with Raft' },
        { title: 'Performance', href: '/docs/pgraft/performance', type: 'Guide', description: 'Optimization and performance considerations' },
        { title: 'Troubleshooting', href: '/docs/pgraft/troubleshooting-guide', type: 'Guide', description: 'Common issues and solutions' }
      ]
    },
    {
      id: 'fauxdb',
      name: 'FauxDB',
      title: 'Dual-Protocol Database Server',
      icon: 'fauxdb-custom',
      gradient: 'from-emerald-500/20 to-green-500/20',
      borderColor: 'border-emerald-400/30',
      glowColor: 'shadow-emerald-500/20',
      description: 'Dual-protocol database with MongoDB AND MySQL wire protocol support. Built in Rust with pure PostgreSQL backend',
      docs: [
        { title: 'Getting Started', href: '/docs/fauxdb/getting-started', type: 'Guide', description: 'Install and configure FauxDB' },
        { title: 'Docker Setup', href: '/docs/fauxdb/docker', type: 'Tutorial', description: 'Containerized deployment guide' },
        { title: 'API Reference', href: '/docs/fauxdb/api', type: 'Reference', description: 'Complete API documentation' }
      ]
    },
    {
      id: 'pgsentinel',
      name: 'pgSentinel',
      title: 'Monitoring & Management Platform',
      icon: 'pgsentinel-custom',
      gradient: 'from-indigo-500/20 to-purple-500/20',
      borderColor: 'border-indigo-400/30',
      glowColor: 'shadow-indigo-500/20',
      description: 'Professional web-based monitoring and management platform for pgbalancer with real-time metrics, Grafana dashboards, and Prometheus integration',
      docs: [
        { title: 'Getting Started', href: '/docs/pgsentinel/getting-started', type: 'Guide', description: 'Quick start guide for pgSentinel' },
        { title: 'Configuration', href: '/docs/pgsentinel/configuration', type: 'Guide', description: 'Configuration options and settings' },
        { title: 'REST API', href: '/docs/pgsentinel/api', type: 'Reference', description: 'Complete API documentation' },
        { title: 'Troubleshooting', href: '/docs/pgsentinel/troubleshooting', type: 'Guide', description: 'Common issues and solutions' }
      ]
    }
  ]

  const getProductIcon = (iconType: string) => {
    switch (iconType) {
      case 'neurondb-custom':
        return <NeuronDBIcon />
      case 'pg_stat_insights-custom':
        return <PgStatInsightsIcon />
      case 'pgbalancer-custom':
        return <PgbalancerIcon />
      case 'pgraft-custom':
        return <PgraftIcon />
      case 'fauxdb-custom':
        return <FauxDbIcon />
      case 'pgsentinel-custom':
        return <PgSentinelIcon />
      default:
        return <Database className="w-12 h-12 text-white" />
    }
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)',
        }}
      >
        {/* Animated gradient overlay */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(6, 182, 212, 0.2) 50%, rgba(16, 185, 129, 0.2) 100%)'
          }}
        />
        
        {/* Animated orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-32 w-32 h-32 bg-gradient-to-r from-cyan-500/25 to-teal-500/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-32 left-1/3 w-48 h-48 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 right-1/4 w-36 h-36 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
        </div>

        <div className="container mx-auto px-6 py-32 relative z-10 max-w-6xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <BookOpen className="w-5 h-5 text-cyan-400" />
              <span className="text-white font-semibold">Complete Documentation</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-white">
              Documentation Hub
            </h1>
            <p className="text-xl mb-12 leading-relaxed text-white/90 max-w-3xl mx-auto">
              Comprehensive guides, API references, and tutorials for all pgElephant products. 
              Built by developers, for developers.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-cyan-400 mb-2">6</div>
                <div className="text-sm text-white/80">Products</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-purple-400 mb-2">40+</div>
                <div className="text-sm text-white/80">Guides</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-green-400 mb-2">100%</div>
                <div className="text-sm text-white/80">Open Source</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-orange-400 mb-2">24/7</div>
                <div className="text-sm text-white/80">Updated</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Documentation */}
      <div className="py-24" style={{ background: 'linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)' }}>
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className={`group relative bg-gradient-to-br ${product.gradient} backdrop-blur-sm rounded-2xl p-8 border-2 ${product.borderColor} transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${product.glowColor}`}
              >
                {/* Product Header */}
                <div className="flex items-start gap-6 mb-6">
                  <div className={`flex-shrink-0 rounded-2xl border-2 ${product.borderColor} bg-gradient-to-br ${product.gradient} p-4 group-hover:scale-110 transition-transform duration-300`}>
                    {getProductIcon(product.icon)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-lg text-cyan-300 font-semibold mb-3">
                      {product.title}
                    </p>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Documentation Links */}
                <div className="space-y-2">
                  {product.docs.map((doc, index) => (
                    <Link
                      key={index}
                      href={doc.href}
                      className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 transition-all group/link"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex-shrink-0">
                          <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-white/10 text-white border border-white/20">
                            {doc.type}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-white group-hover/link:text-cyan-300 transition-colors mb-1">
                            {doc.title}
                          </div>
                          <p className="text-xs text-white/60 group-hover/link:text-white/80 transition-colors truncate">
                            {doc.description}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-white/40 group-hover/link:text-cyan-400 group-hover/link:translate-x-1 transition-all flex-shrink-0" />
                    </Link>
                  ))}
                </div>

                {/* View All Link */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <Link
                    href={`/docs/${product.id}`}
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors group/all"
                  >
                    <FileText className="w-5 h-5" />
                    View Complete Documentation
                    <ArrowRight className="w-4 h-4 group-hover/all:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div 
        className="py-20 border-t border-white/10"
        style={{ 
          background: 'linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)'
        }}
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Additional Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="https://github.com/pgElephant"
              className="group p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 transition-all text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-purple-400/30 group-hover:scale-110 transition-transform">
                <ExternalLink className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">GitHub</h3>
              <p className="text-white/70 text-sm">
                Source code and contributions
              </p>
            </Link>
            
            <Link
              href="/download"
              className="group p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 transition-all text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-cyan-400/30 group-hover:scale-110 transition-transform">
                <Download className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">Downloads</h3>
              <p className="text-white/70 text-sm">
                Get the latest releases
              </p>
            </Link>
            
            <Link
              href="/community"
              className="group p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 transition-all text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-emerald-400/30 group-hover:scale-110 transition-transform">
                <Code className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">Community</h3>
              <p className="text-white/70 text-sm">
                Join our community
              </p>
            </Link>
            
            <Link
              href="/contact"
              className="group p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 transition-all text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-orange-400/30 group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">Support</h3>
              <p className="text-white/70 text-sm">
                Get help and support
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocsPage
