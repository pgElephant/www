import React from 'react'
import { BookOpen, ArrowRight, Code, Download, ExternalLink, FileText, Container } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const DocsPage = () => {
  const products = [
    {
      id: 'neurondb',
      name: 'NeurondB',
      title: 'AI Database Extension',
      icon: '/ico/pgElephant_HD.ico',
      description: 'Production-grade AI database extension for PostgreSQL with vector search, ML inference, hybrid retrieval, and complete RAG pipeline',
      docs: [
        { title: 'Getting Started', href: '/docs/neurondb/getting-started', type: 'Guide', description: 'Quick start guide for NeurondB' },
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
      id: 'pgbalancer',
      name: 'pgbalancer',
      title: 'Connection Pooling & Load Balancing',
      icon: '/ico/pgbalancer_HD.ico',
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
      icon: '/ico/pgsql_raft_leader_HD.ico',
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
      icon: '/ico/FauxDB_HD.ico',
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
      icon: '/ico/pgElephant_HD.ico',
      description: 'Professional web-based monitoring and management platform for pgbalancer with real-time metrics, Grafana dashboards, and Prometheus integration',
      docs: [
        { title: 'Getting Started', href: '/docs/pgsentinel/getting-started', type: 'Guide', description: 'Quick start guide for pgSentinel' },
        { title: 'Configuration', href: '/docs/pgsentinel/configuration', type: 'Guide', description: 'Configuration options and settings' },
        { title: 'REST API', href: '/docs/pgsentinel/api', type: 'Reference', description: 'Complete API documentation' },
        { title: 'Troubleshooting', href: '/docs/pgsentinel/troubleshooting', type: 'Guide', description: 'Common issues and solutions' }
      ]
    },
    {
      id: 'pg_stat_insights',
      name: 'pg_stat_insights',
      title: 'Performance Analytics Extension',
      icon: '/ico/pgElephant_HD.ico',
      description: 'Deep PostgreSQL performance analytics extension with 52 metrics across 11 views. Track slow queries, cache efficiency, and optimize database performance',
      docs: [
        { title: 'Getting Started', href: '/docs/pg-stat-insights/getting-started', type: 'Guide', description: 'Quick start guide for pg_stat_insights' },
        { title: 'API Reference', href: '/docs/pg-stat-insights/api', type: 'Reference', description: 'Complete view and function reference' },
        { title: 'Query Analytics', href: '/docs/pg-stat-insights/query-analytics', type: 'Guide', description: 'Query performance analysis' },
        { title: 'Best Practices', href: '/docs/pg-stat-insights/best-practices', type: 'Guide', description: 'Optimization best practices' }
      ]
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)',
        }}
      >
        {/* Elegant overlay gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(6, 182, 212, 0.15) 50%, rgba(16, 185, 129, 0.15) 100%)'
          }}
        />
        
        {/* Elegant floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-indigo-500/25 to-cyan-500/25 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-r from-teal-500/15 to-indigo-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          
          {/* Subtle pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }}
          />
        </div>

        <div className="container mx-auto px-6 py-28 relative z-10 max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-semibold text-white mb-6">
              Documentation
            </h1>
            <p className="text-xl mb-8 leading-relaxed text-white/90 max-w-3xl mx-auto">
              Complete guides and references for pgElephant products. Professional documentation following enterprise standards.
            </p>
            
            {/* Documentation Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-semibold text-white drop-shadow-2xl mb-2">6</div>
                <div className="text-sm text-white/90">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold text-white drop-shadow-2xl mb-2">34</div>
                <div className="text-sm text-white/90">Documentation Pages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold text-white drop-shadow-2xl mb-2">100%</div>
                <div className="text-sm text-white/90">Open Source</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Documentation Categories */}
      <div
        className="py-16"
        style={{ 
          background: 'linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)'
        }}
      >
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-white mb-4">
              Documentation Structure
            </h2>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              Our documentation follows enterprise standards with comprehensive guides, API references, and tutorials for each product.
            </p>
          </div>
          
          {/* Documentation Types */}
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-cyan-400" />
              <div>
                <h3 className="font-semibold text-white">Guides</h3>
                <p className="text-white/80 text-sm">Step-by-step installation and configuration</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-teal-400" />
              <div>
                <h3 className="font-semibold text-white">Reference</h3>
                <p className="text-white/80 text-sm">Complete API documentation and functions</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Container className="w-6 h-6 text-orange-400" />
              <div>
                <h3 className="font-semibold text-white">Tutorials</h3>
                <p className="text-white/80 text-sm">Docker, Kubernetes, and deployment guides</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Documentation */}
      <div className="py-20" style={{ background: 'linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)' }}>
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="space-y-16">
            {products.map((product) => (
              <div key={product.id} className="border-b border-white/10 pb-16 last:border-b-0">
                {/* Product Header */}
                <div className="flex items-center mb-6">
                  <Image 
                    src={product.icon} 
                    alt={product.name + ' icon'}
                    width={48}
                    height={48}
                    className="w-12 h-12 mr-4 object-contain"
                    unoptimized
                  />
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-1">
                      {product.name}
                    </h3>
                    <p className="text-lg text-white/80">
                      {product.title}
                    </p>
                  </div>
                </div>

                {/* Product Description */}
                <p className="text-white/90 mb-8 leading-relaxed">
                  {product.description}
                </p>

                {/* Documentation Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.docs.map((doc, index) => (
                    <Link
                      key={index}
                      href={doc.href}
                      className="flex items-start gap-4 p-4 text-left bg-white/5 backdrop-blur-sm hover:bg-white/10 rounded-lg transition-all group border border-white/10 hover:border-cyan-400/50"
                    >
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-white/10 text-white border border-white/20">
                          {doc.type}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-white group-hover:text-cyan-300 mb-1 transition-colors">
                          {doc.title}
                        </div>
                        <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                          {doc.description}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-cyan-400 transition-colors flex-shrink-0 mt-1" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Start Section */}
      <div 
        className="py-20 border-t border-white/10"
        style={{ 
          background: 'linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)'
        }}
      >
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-semibold text-white mb-6">
            Quick Start
          </h2>
          <p className="text-xl text-white/90 mb-12 leading-relaxed">
            Get up and running with pgElephant in minutes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                <Download className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Download
              </h3>
              <p className="text-white/80">
                Get the latest version of pgElephant products.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                <Code className="w-8 h-8 text-teal-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Install
              </h3>
              <p className="text-white/80">
                Follow our installation guides for your platform.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                <ExternalLink className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Deploy
              </h3>
              <p className="text-white/80">
                Deploy to production with confidence.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Link
              href="/download"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium text-white bg-orange-500 hover:bg-orange-600 transition-colors shadow-lg"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="py-20 border-t border-white/10" style={{ background: 'linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)' }}>
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-semibold text-white mb-12 text-center">
            Additional Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                <ExternalLink className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">GitHub</h3>
              <p className="text-white/80 text-sm mb-4">
                Source code, issues, and contributions
              </p>
              <Link
                href="https://github.com/pgElephant"
                className="text-sm font-medium text-cyan-400 hover:text-cyan-300"
              >
                View on GitHub →
              </Link>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Community</h3>
              <p className="text-white/80 text-sm mb-4">
                Join our community for support
              </p>
              <Link
                href="/community"
                className="text-sm font-medium text-cyan-400 hover:text-cyan-300"
              >
                Join Community →
              </Link>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Blog</h3>
              <p className="text-white/80 text-sm mb-4">
                Latest updates and tutorials
              </p>
              <Link
                href="/blog"
                className="text-sm font-medium text-cyan-400 hover:text-cyan-300"
              >
                Read Blog →
              </Link>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 border border-white/20">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Support</h3>
              <p className="text-white/80 text-sm mb-4">
                Get help and technical support
              </p>
              <Link
                href="/contact"
                className="text-sm font-medium text-cyan-400 hover:text-cyan-300"
              >
                Contact Support →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocsPage
