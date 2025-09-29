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
    <section className="py-20 bg-gray-50">
      <div className="container-extra-wide">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why PgElephant?
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
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
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <IconComponent className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Trusted by enterprises worldwide
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyPgElephant
