'use client'

import React from 'react'
import { Brain, Network, Zap, Database, BarChart3, Activity } from 'lucide-react'
import Link from 'next/link'

const WhyPgElephant = () => {
  const products = [
    {
      icon: Brain,
      title: 'NeuronDB',
      category: 'AI Database Extension',
      description: 'AI database extension with vector search, RAG pipeline, ML inference, and GPU acceleration.',
      features: [
        'Vector search with HNSW indexing',
        '52 ML algorithms',
        '473 SQL functions',
        'GPU acceleration (CUDA/ROCm/Metal)',
        'RAG pipeline in-database'
      ],
      badges: ['PostgreSQL 16-18', '5 Vector Types', 'GPU Support'],
      postgresqlVersions: '16-18',
      href: '/neurondb'
    },
    {
      icon: Network,
      title: 'pgraft',
      category: 'High Availability Extension',
      description: 'Raft consensus for PostgreSQL with automatic leader election and split-brain prevention.',
      features: [
        'Automatic leader election',
        'Split-brain prevention',
        'Zero-downtime failover',
        'etcd-io/raft based',
        'Background worker architecture'
      ],
      badges: ['PostgreSQL 14-18', 'etcd-io/raft', 'Zero Split-Brain'],
      postgresqlVersions: '14-18',
      href: '/pgraft'
    },
    {
      icon: Zap,
      title: 'pgBalancer',
      category: 'Connection Pooler & Load Balancer',
      description: 'Connection pooler with load balancing, REST API, and machine learning query routing.',
      features: [
        'AI-powered load balancing',
        'REST API (17 endpoints)',
        'MQTT event streaming',
        'Connection pooling',
        'YAML configuration'
      ],
      badges: ['PostgreSQL 13+', 'REST API', 'AI Routing'],
      postgresqlVersions: '13-18',
      href: '/pgbalancer'
    },
    {
      icon: Database,
      title: 'FauxDB',
      category: 'Dual-Protocol Database',
      description: 'Dual-protocol database supporting MongoDB and MySQL wire protocols on PostgreSQL.',
      features: [
        'MongoDB wire protocol',
        'MySQL wire protocol',
        'PostgreSQL ACID guarantees',
        'SQL query translator',
        'Rust-powered performance'
      ],
      badges: ['MongoDB Protocol', 'MySQL Protocol', 'PostgreSQL 14+'],
      postgresqlVersions: '14-18',
      href: '/fauxdb'
    },
    {
      icon: BarChart3,
      title: 'pg_stat_insights',
      category: 'Performance Analytics Extension',
      description: 'Performance analytics extension with query analysis and optimization recommendations.',
      features: [
        'Query performance analysis',
        'Table and index statistics',
        'Cache hit ratio monitoring',
        'Optimization recommendations',
        '52 metrics across 11 views'
      ],
      badges: ['PostgreSQL 14+', '52 Metrics', '11 Views'],
      postgresqlVersions: '14-18',
      href: '/pg-stat-insights'
    },
    {
      icon: Activity,
      title: 'pgSentinel',
      category: 'Monitoring Platform',
      description: 'Monitoring platform with Grafana dashboards, Prometheus integration, and real-time metrics.',
      features: [
        'Grafana dashboards',
        'Prometheus integration',
        'Real-time metrics',
        'Alerting system',
        'Docker deployment'
      ],
      badges: ['Grafana', 'Prometheus', 'Docker'],
      postgresqlVersions: '13-18',
      href: '/pgsentinel'
    }
  ]

  return (
    <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#1f2937' }}>
      <div className="container-extra-wide relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-white drop-shadow-2xl shadow-2xl mb-6">
            Products
          </h2>
          <p className="text-xl text-white/90 leading-relaxed font-light drop-shadow-lg">
            PostgreSQL extensions and tools for AI, high availability, connection pooling, monitoring, and multi-protocol support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => {
            const IconComponent = product.icon
            return (
              <Link
                key={index}
                href={product.href}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/20 hover:shadow-xl hover:bg-white/15 hover:border-cyan-500/50 transition-all duration-300 relative z-10 group flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20 group-hover:border-cyan-500/50 transition-colors flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-white drop-shadow-lg group-hover:text-cyan-300 transition-colors" />
                  </div>
                  <span className="text-xs text-white/60 font-light px-2 py-1 bg-white/5 rounded border border-white/10">
                    {product.postgresqlVersions}
                  </span>
                </div>
                
                <div className="mb-2">
                  <span className="text-xs text-cyan-400/80 font-light uppercase tracking-wide">
                    {product.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-light text-white mb-3 drop-shadow-lg group-hover:text-cyan-300 transition-colors">
                  {product.title}
                </h3>
                
                <p className="text-white/90 leading-relaxed font-light drop-shadow-sm mb-4 text-sm">
                  {product.description}
                </p>
                
                <div className="mb-4 flex-1">
                  <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="text-white/80 text-xs font-light flex items-start">
                        <span className="text-cyan-400 mr-2 flex-shrink-0 mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.badges.slice(0, 3).map((badge, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-white/5 text-white/70 rounded border border-white/10 font-light"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                
                <div className="mt-auto text-cyan-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more →
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyPgElephant
