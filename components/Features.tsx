'use client'
import React from 'react'
import { Zap, Shield, Globe, BarChart3, Terminal, ArrowRight, CheckCircle, Database, Users, Clock, Cpu } from 'lucide-react'
import ElephantLogo from './ElephantLogo'

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: 'Automated Failover',
      description: 'Intelligent leader election with RALE consensus. Automatic failover in under 30 seconds with zero data loss.'
    },
    {
      icon: Shield,
      title: 'Advanced Security',
      description: 'TLS encryption, role-based access control, and comprehensive audit logging for production environments.'
    },
    {
      icon: Globe,
      title: 'Multi-Zone Replication',
      description: 'Distribute your database across multiple availability zones for maximum resilience and performance.'
    },
    {
      icon: BarChart3,
      title: 'Advanced Monitoring',
      description: 'Real-time metrics, health checks, and comprehensive observability with Prometheus integration.'
    },
    {
      icon: Terminal,
      title: 'CLI & API',
      description: 'Powerful command-line interface and REST API for automation and integration workflows.'
    },
    {
      icon: Database,
      title: 'Zero Downtime',
      description: 'Seamless failover with no service interruption. Built for production environments that cannot tolerate downtime.'
    },
    {
      icon: Users,
      title: 'Scalable',
      description: 'Add nodes dynamically without downtime. Scale your cluster horizontally as your needs grow.'
    },
    {
      icon: Clock,
      title: 'Fast Recovery',
      description: 'Automatic failover in under 30 seconds. Minimize service disruption with intelligent recovery.'
    },
    {
      icon: Cpu,
      title: 'High Performance',
      description: 'Optimized for production workloads with advanced caching, connection pooling, and query optimization.'
    }
  ]

  return (
    <section id="features" className="section-padding bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="text-teal-400 mr-4">
              <ElephantLogo size="lg" animated={true} />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="text-white">
                Why Choose
              </span>
              <br />
              <span className="text-teal-300">
                pgelephant?
              </span>
            </h2>
          </div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto font-medium">
            Built for production with professional features and simple configuration.
          </p>
        </div>

        {/* Sleek Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-slate-400/30 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 bg-slate-100/20 border border-slate-400/30 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-teal-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-slate-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features 