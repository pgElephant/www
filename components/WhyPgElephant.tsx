'use client'

import React from 'react'
import { Brain, Network, Zap, Database, BarChart3, Activity } from 'lucide-react'
import Link from 'next/link'

const WhyPgElephant = () => {
  const products = [
    {
      icon: Brain,
      title: 'NeuronDB',
      description: 'AI database extension with vector search, RAG pipeline, ML inference, and GPU acceleration.',
      href: '/neurondb'
    },
    {
      icon: Network,
      title: 'pgraft',
      description: 'Raft consensus for PostgreSQL with automatic leader election and split-brain prevention.',
      href: '/pgraft'
    },
    {
      icon: Zap,
      title: 'pgBalancer',
      description: 'Connection pooler with load balancing, REST API, and machine learning query routing.',
      href: '/pgbalancer'
    },
    {
      icon: Database,
      title: 'FauxDB',
      description: 'Dual-protocol database supporting MongoDB and MySQL wire protocols on PostgreSQL.',
      href: '/fauxdb'
    },
    {
      icon: BarChart3,
      title: 'pg_stat_insights',
      description: 'Performance analytics extension with query analysis and optimization recommendations.',
      href: '/pg-stat-insights'
    },
    {
      icon: Activity,
      title: 'pgSentinel',
      description: 'Monitoring platform with Grafana dashboards, Prometheus integration, and real-time metrics.',
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
                className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/20 hover:shadow-xl hover:bg-white/15 hover:border-cyan-500/50 transition-all duration-300 relative z-10 group"
              >
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center mb-6 border border-white/20 group-hover:border-cyan-500/50 transition-colors">
                  <IconComponent className="w-6 h-6 text-white drop-shadow-lg group-hover:text-cyan-300 transition-colors" />
                </div>
                <h3 className="text-xl font-light text-white mb-4 drop-shadow-lg group-hover:text-cyan-300 transition-colors">
                  {product.title}
                </h3>
                <p className="text-white/90 leading-relaxed font-light drop-shadow-sm">
                  {product.description}
                </p>
                <div className="mt-4 text-cyan-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
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
