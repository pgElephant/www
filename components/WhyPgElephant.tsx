'use client'

import React from 'react'
import { Shield, Zap, Database, Users, Globe, Lock } from 'lucide-react'

const WhyPgElephant = () => {
  const benefits = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade security with advanced encryption, access controls, and compliance features.'
    },
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Optimized for speed and scalability with intelligent caching and query optimization.'
    },
    {
      icon: Database,
      title: 'Multi-Database Support',
      description: 'PostgreSQL clustering, MongoDB compatibility, and distributed consensus all in one platform.'
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: '24/7 professional support from PostgreSQL and distributed systems experts.'
    },
    {
      icon: Globe,
      title: 'Global Scale',
      description: 'Built for enterprise workloads with automatic scaling and global distribution.'
    },
    {
      icon: Lock,
      title: 'Data Integrity',
      description: 'ACID compliance and strong consistency guarantees across all components.'
    }
  ]

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 25%, #475569 50%, #64748b 75%, #94a3b8 100%)' }}>
      {/* Floating Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container-extra-wide relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-thin text-white drop-shadow-2xl shadow-2xl mb-6">
            Why PgElephant?
          </h2>
          <p className="text-xl text-white/90 leading-relaxed font-thin drop-shadow-lg">
            Enterprise-grade PostgreSQL solutions that combine the reliability of PostgreSQL 
            with the flexibility of modern distributed systems and document databases.
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
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-6 border border-white/20">
                  <IconComponent className="w-6 h-6 text-white drop-shadow-lg" />
                </div>
                <h3 className="text-xl font-thin text-white mb-4 drop-shadow-lg">
                  {benefit.title}
                </h3>
                <p className="text-white/90 leading-relaxed font-thin drop-shadow-sm">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 text-white/80 text-sm font-thin drop-shadow-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full drop-shadow-lg"></div>
            Trusted by enterprises worldwide
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyPgElephant
