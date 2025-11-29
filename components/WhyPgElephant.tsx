'use client'

import React from 'react'
import { Shield, Zap, Database, Users, Globe, Lock } from 'lucide-react'

const WhyPgElephant = () => {
  const benefits = [
    {
      icon: Database,
      title: 'MongoDB Compatibility',
      description: 'FauxDB supports MongoDB wire protocol. Uses PostgreSQL storage with ACID transactions.'
    },
    {
      icon: Shield,
      title: 'Raft Consensus Clustering',
      description: 'pgraft implements Raft consensus for PostgreSQL. Automatic leader election. Prevents split-brain.'
    },
    {
      icon: Zap,
      title: 'Connection Pooling',
      description: 'pgbalancer uses machine learning for load balancing and query routing. Supports scaling.'
    },
    {
      icon: Lock,
      title: 'Reliability',
      description: 'Components provide consistency guarantees. Zero-downtime operations supported.'
    },
    {
      icon: Globe,
      title: 'Architecture',
      description: 'Built with Rust for performance. Distributed systems design. Cloud-native deployment.'
    },
    {
      icon: Users,
      title: 'Open Source',
      description: 'Open source development. Community-driven features. Enterprise support available.'
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
            Three PostgreSQL tools: FauxDB for MongoDB compatibility, pgraft for Raft consensus clustering, and pgbalancer for connection pooling.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/20 hover:shadow-xl hover:bg-white/15 transition-all duration-300 relative z-10"
              >
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center mb-6 border border-white/20">
                  <IconComponent className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
                <h3 className="text-xl font-light text-white mb-4 drop-shadow-lg">
                  {benefit.title}
                </h3>
                <p className="text-white/90 leading-relaxed font-light drop-shadow-sm">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyPgElephant
