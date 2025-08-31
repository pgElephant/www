'use client'
import React from 'react'
import { Zap, Shield, Globe, BarChart3, Terminal, ArrowRight, CheckCircle, Database, Users, Clock, Cpu, Github } from 'lucide-react'
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

        {/* Projects Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Open Source Projects
            </h3>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Our PostgreSQL High Availability platform is built on three core open source projects, each designed to work together seamlessly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'RALE',
                description: 'High Availability consensus engine with intelligent leader election and automatic failover.',
                href: 'https://github.com/pgElephant/rale',
                icon: '🔄',
                features: ['Consensus Algorithm', 'Leader Election', 'Automatic Failover', 'Zero Data Loss']
              },
              {
                name: 'RAM',
                description: 'Resource management and monitoring system for PostgreSQL clusters.',
                href: 'https://github.com/pgElephant/ram',
                icon: '📊',
                features: ['Resource Monitoring', 'Performance Metrics', 'Health Checks', 'Alerting']
              },
              {
                name: 'FauxDB',
                description: 'PostgreSQL-based document database for flexible data storage and retrieval.',
                href: 'https://github.com/pgElephant/fauxdb',
                icon: '📄',
                features: ['Document Storage', 'PostgreSQL Backend', 'Flexible Schema', 'JSON Support']
              }
            ].map((project) => (
              <div
                key={project.name}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-slate-400/30 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 group"
              >
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">{project.icon}</div>
                  <h4 className="text-2xl font-bold text-white mb-2">{project.name}</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{project.description}</p>
                </div>
                
                <div className="space-y-2 mb-6">
                  {project.features.map((feature) => (
                    <div key={feature} className="flex items-center text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-teal-400 mr-2 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center w-full px-6 py-3 bg-teal-600/20 border border-teal-400/30 text-teal-300 font-semibold rounded-xl hover:bg-teal-600/30 hover:border-teal-400/50 transition-all duration-200"
                >
                  <Github className="w-4 h-4 mr-2" />
                  View on GitHub
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features 