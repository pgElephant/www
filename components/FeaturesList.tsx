'use client'

import React from 'react'
import { 
  Database, 
  Zap, 
  Shield, 
  Globe, 
  Settings, 
  Crown, 
  Terminal, 
  Code,
  Server,
  Users,
  Lock,
  CheckCircle,
  ArrowRight,
  Cpu,
  HardDrive,
  Network,
  Activity
} from 'lucide-react'

const FeaturesList = () => {
  const projects = [
    {
      name: 'RAM',
      description: 'Resilient Adaptive Manager',
      icon: <Zap className="w-8 h-8" />,
      color: 'primary',
      features: [
        {
          title: 'Automatic Failover',
          description: 'Zero-downtime failover with sub-second detection',
          icon: <Zap className="w-5 h-5" />
        },
        {
          title: 'Leader Election',
          description: 'Raft-based consensus for reliable leader selection',
          icon: <Crown className="w-5 h-5" />
        },
        {
          title: 'Distributed Consensus',
          description: 'Multi-node coordination with split-brain prevention',
          icon: <Network className="w-5 h-5" />
        },
        {
          title: 'Real-time Monitoring',
          description: 'Prometheus metrics and Grafana dashboards',
          icon: <Activity className="w-5 h-5" />
        },
        {
          title: 'Enterprise Security',
          description: 'Token-based auth, SSL/TLS, rate limiting',
          icon: <Shield className="w-5 h-5" />
        },
        {
          title: 'Cloud-Native',
          description: 'Docker, Kubernetes, and Helm chart support',
          icon: <Server className="w-5 h-5" />
        }
      ]
    },
    {
      name: 'pgraft',
      description: 'PostgreSQL Raft Consensus Extension',
      icon: <Crown className="w-8 h-8" />,
      color: 'secondary',
      features: [
        {
          title: 'Raft Consensus Protocol',
          description: 'Implements the Raft algorithm for distributed consensus',
          icon: <Globe className="w-5 h-5" />
        },
        {
          title: 'Automatic Leader Election',
          description: 'Seamless leader election and failover',
          icon: <Crown className="w-5 h-5" />
        },
        {
          title: 'Log Replication',
          description: 'Consistent log replication across cluster nodes',
          icon: <Database className="w-5 h-5" />
        },
        {
          title: 'High Availability',
          description: 'Fault-tolerant cluster with automatic recovery',
          icon: <Shield className="w-5 h-5" />
        },
        {
          title: 'Zero-Downtime Operations',
          description: 'Non-disruptive cluster operations',
          icon: <Activity className="w-5 h-5" />
        },
        {
          title: 'Go Integration',
          description: 'Leverages Go\'s robust Raft implementation',
          icon: <Code className="w-5 h-5" />
        }
      ]
    },
    {
      name: 'FauxDB',
      description: 'MongoDB Compatible Document Database',
      icon: <Globe className="w-8 h-8" />,
      color: 'accent',
      features: [
        {
          title: '100% MongoDB Compatibility',
          description: 'Full wire protocol support with mongosh compatibility',
          icon: <Database className="w-5 h-5" />
        },
        {
          title: 'High Performance',
          description: 'Built in Rust for superior speed and memory efficiency',
          icon: <Zap className="w-5 h-5" />
        },
        {
          title: 'Advanced Features',
          description: 'Transactions, geospatial, aggregation pipelines',
          icon: <Globe className="w-5 h-5" />
        },
        {
          title: 'Pure PostgreSQL Backend',
          description: 'Native JSONB support, no external dependencies',
          icon: <Server className="w-5 h-5" />
        },
        {
          title: 'Production Ready',
          description: 'Enterprise-grade monitoring, logging, and configuration',
          icon: <Shield className="w-5 h-5" />
        },
        {
          title: 'Docker Support',
          description: 'Comprehensive Docker support for dev, test, and production',
          icon: <Settings className="w-5 h-5" />
        }
      ]
    },
    {
      name: 'RALE',
      description: 'Distributed Consensus and Key-Value Store',
      icon: <Network className="w-8 h-8" />,
      color: 'primary',
      features: [
        {
          title: 'RALE Consensus',
          description: 'Reliable leader election and log replication',
          icon: <Crown className="w-5 h-5" />
        },
        {
          title: 'Distributed Store',
          description: 'High-performance replicated key-value storage',
          icon: <Database className="w-5 h-5" />
        },
        {
          title: 'Thread Safety',
          description: 'Full multi-threading support with proper synchronization',
          icon: <Shield className="w-5 h-5" />
        },
        {
          title: 'Network Layer',
          description: 'TCP/UDP communication with automatic failover',
          icon: <Network className="w-5 h-5" />
        },
        {
          title: 'Memory Safety',
          description: 'Safe allocation/deallocation with leak prevention',
          icon: <Activity className="w-5 h-5" />
        },
        {
          title: 'Clean Logging',
          description: 'Professional logging without colors or terminal dependencies',
          icon: <Terminal className="w-5 h-5" />
        }
      ]
    }
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return {
          bg: 'from-primary-500/20 to-primary-600/20',
          border: 'border-primary-400/30',
          icon: 'text-primary-400',
          accent: 'text-primary-300',
          button: 'bg-primary-600 hover:bg-primary-700'
        }
      case 'secondary':
        return {
          bg: 'from-secondary-500/20 to-secondary-600/20',
          border: 'border-secondary-400/30',
          icon: 'text-secondary-400',
          accent: 'text-secondary-300',
          button: 'bg-secondary-600 hover:bg-secondary-700'
        }
      case 'accent':
        return {
          bg: 'from-accent-500/20 to-accent-600/20',
          border: 'border-accent-400/30',
          icon: 'text-accent-400',
          accent: 'text-accent-300',
          button: 'bg-accent-600 hover:bg-accent-700'
        }
      default:
        return {
          bg: 'from-neutral-500/20 to-neutral-600/20',
          border: 'border-neutral-400/30',
          icon: 'text-neutral-400',
          accent: 'text-neutral-300',
          button: 'bg-neutral-600 hover:bg-neutral-700'
        }
    }
  }

  return (
    <section id="features" className="section-padding bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 relative overflow-hidden">
      <div className="container-extra-wide">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-primary-400/10 to-secondary-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-secondary-400/10 to-accent-400/10 rounded-full blur-3xl" />
        </div>

        {/* Section Header */}
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-primary-300/30 rounded-full text-sm font-semibold text-primary-200 mb-6 shadow-sm">
            <Database className="w-4 h-4" />
            Project Features
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
            <span className="text-white">
              Complete Database
            </span>
            <br />
            <span className="text-purple-300 font-heading">
              Solution Suite
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto font-medium">
            Three powerful tools working together to provide everything you need for modern database operations.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-8xl mx-auto relative z-10">
          {projects.map((project, index) => {
            const colors = getColorClasses(project.color)
            
            return (
              <div
                key={project.name}
                className={`bg-gradient-to-br ${colors.bg} backdrop-blur-sm rounded-3xl p-8 border ${colors.border} hover:shadow-2xl transition-all duration-300 hover:scale-105 group`}
              >
                {/* Project Header */}
                <div className="text-center mb-8">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center border ${colors.border} group-hover:scale-110 transition-transform duration-300`}>
                    <div className={colors.icon}>
                      {project.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-white mb-2">
                    {project.name}
                  </h3>
                  <p className={`text-lg font-medium ${colors.accent}`}>
                    {project.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="space-y-6">
                  {project.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200"
                    >
                      <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center ${colors.icon}`}>
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <div className="mt-8 text-center">
                  <button className={`${colors.button} text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto`}>
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center relative z-10">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-400/30 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4 text-white">
              Ready to Get Started?
            </h3>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Choose the right tool for your needs, or use them together for a complete database solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                <Database className="w-5 h-5" />
                Download All Projects
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-slate-800 transition-colors flex items-center justify-center gap-2">
                <Shield className="w-5 h-5" />
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesList
