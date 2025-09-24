'use client'
import React from 'react'
import { Zap, Shield, Globe, BarChart3, Terminal, ArrowRight, CheckCircle, Database, Users, Clock, Cpu, Github, TrendingUp, Lock } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: 'Automated Failover',
      description: 'Intelligent leader election with RALE consensus. Automatic failover in under 30 seconds with zero data loss.',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      icon: Shield,
      title: 'Advanced Security',
      description: 'TLS encryption, role-based access control, and comprehensive audit logging for production environments.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Globe,
      title: 'Multi-Zone Replication',
      description: 'Distribute your database across multiple availability zones for maximum resilience and performance.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: BarChart3,
      title: 'Advanced Monitoring',
      description: 'Real-time metrics, health checks, and comprehensive observability with Prometheus integration.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Terminal,
      title: 'CLI & API',
      description: 'Powerful command-line interface and REST API for automation and integration workflows.',
      color: 'bg-gray-100 text-gray-600'
    },
    {
      icon: Database,
      title: 'Zero Downtime',
      description: 'Seamless failover with no service interruption. Built for production environments that cannot tolerate downtime.',
      color: 'bg-teal-100 text-teal-600'
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
          <h2 className="text-5xl font-bold premium-heading mb-8">
            Enterprise-Grade Features
          </h2>
          <p className="text-xl premium-subheading leading-relaxed">
            Built for production environments that demand reliability, security, and performance at scale.
          </p>
        </div>

        {/* Features Grid */}
        <div className="premium-grid mb-24">
          {features.map((feature, index) => (
            <div key={index} className="premium-card p-10">
              <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mb-8">
                <feature.icon className="w-10 h-10 text-slate-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="premium-card p-16">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold premium-heading mb-6">
              Proven Performance
            </h3>
            <p className="text-xl premium-subheading">
              Real-world metrics from production deployments
            </p>
          </div>
          
          <div className="premium-grid">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold professional-text-gradient mb-4">
                  {stat.number}
                </div>
                <div className="text-slate-600 font-semibold text-lg">
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