'use client'
import React from 'react'
import { Zap, Shield, Globe, BarChart3, Terminal, ArrowRight, CheckCircle, Database, Users, Clock, Cpu, Github, TrendingUp, Lock } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: 'Automated Failover',
      description: 'Leader election uses RALE consensus. Failover completes in under 30 seconds. Zero data loss.',
      color: 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'TLS encryption, role-based access control, and audit logging included.',
      color: 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
    },
    {
      icon: Globe,
      title: 'Multi-Zone Replication',
      description: 'Distributes database across multiple availability zones. Improves resilience and performance.',
      color: 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
    },
    {
      icon: BarChart3,
      title: 'Monitoring',
      description: 'Real-time metrics, health checks, and observability. Prometheus integration included.',
      color: 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
    },
    {
      icon: Terminal,
      title: 'CLI and API',
      description: 'Command-line interface and REST API. Supports automation and integration workflows.',
      color: 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
    },
    {
      icon: Database,
      title: 'Zero Downtime',
      description: 'Failover occurs with no service interruption. For production environments.',
      color: 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
    }
  ]

  const stats = [
    { number: '99.99%', label: 'Uptime SLA' },
    { number: '<30s', label: 'Failover Time' },
    { number: '3x', label: 'Faster Development' },
    { number: '45%', label: 'Lower TCO' }
  ]

  return (
    <section className="premium-section">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-5xl font-thin text-white mb-8">
            Features
          </h2>
          <p className="text-xl text-white/90 leading-relaxed">
            Production-ready features for reliability, security, and performance.
          </p>
        </div>

        {/* Features Grid */}
        <div className="premium-grid mb-24">
          {features.map((feature, index) => (
            <div key={index} className="premium-card p-10">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 border border-white/20">
                <feature.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-thin text-white mb-6">
                {feature.title}
              </h3>
              <p className="text-white/90 leading-relaxed text-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="premium-card p-16">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-thin text-white mb-6">
              Performance Metrics
            </h3>
            <p className="text-xl text-white/90">
              Metrics from production deployments
            </p>
          </div>
          
          <div className="premium-grid">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold professional-text-gradient mb-4">
                  {stat.number}
                </div>
                <div className="text-white/90 font-semibold text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features