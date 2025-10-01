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
    <section 
      id="features" 
      className="section-padding relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)`,
        position: 'relative'
      }}
    >
      {/* Elegant overlay gradient - same as Hero */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(6, 182, 212, 0.1) 50%, rgba(16, 185, 129, 0.1) 100%)'
        }}
      />
      
      {/* Elegant floating elements - same as Hero */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-secondary-500/15 to-accent-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-r from-accent-500/10 to-primary-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className="container-extra-wide relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-primary-300/30 rounded-full text-sm font-semibold text-primary-200 mb-6 shadow-sm">
            <Database className="w-4 h-4" />
            Enterprise Solutions
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight">
            <span className="text-white">
              PostgreSQL Enterprise
            </span>
            <br />
            <span className="text-purple-300 font-heading">
              Platform Suite
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto font-medium">
            Comprehensive database solutions for enterprise-grade high availability, distributed consensus, and seamless data migration.
          </p>
        </div>

        {/* Professional Features Overview */}
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Enterprise Solutions Matrix */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 overflow-hidden mb-12">
            <div className="p-8 border-b border-slate-400/30">
              <h3 className="text-2xl font-bold text-white mb-2">Enterprise Database Solutions</h3>
              <p className="text-slate-300">Comprehensive platform comparison for enterprise database infrastructure</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-400/30 bg-white/5">
                    <th className="text-left p-6 text-slate-200 font-semibold text-sm uppercase tracking-wider">Solution</th>
                    <th className="text-left p-6 text-slate-200 font-semibold text-sm uppercase tracking-wider">Category</th>
                    <th className="text-left p-6 text-slate-200 font-semibold text-sm uppercase tracking-wider">Enterprise Features</th>
                    <th className="text-left p-6 text-slate-200 font-semibold text-sm uppercase tracking-wider">Deployment</th>
                    <th className="text-left p-6 text-slate-200 font-semibold text-sm uppercase tracking-wider">ROI Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, index) => {
                    const colors = getColorClasses(project.color)
                    return (
                      <tr key={project.name} className="border-b border-slate-400/20 hover:bg-white/5 transition-colors">
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center ${colors.icon}`}>
                              {project.icon}
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-white">{project.name}</h3>
                              <p className={`text-sm ${colors.accent}`}>{project.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="space-y-1">
                            {project.name === 'RAM' && (
                              <>
                                <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full">High Availability</span>
                                <span className="inline-block px-3 py-1 bg-green-500/20 text-green-300 text-xs font-medium rounded-full ml-2">Clustering</span>
                              </>
                            )}
                            {project.name === 'pgraft' && (
                              <>
                                <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-medium rounded-full">Consensus Protocol</span>
                                <span className="inline-block px-3 py-1 bg-orange-500/20 text-orange-300 text-xs font-medium rounded-full ml-2">Extension</span>
                              </>
                            )}
                            {project.name === 'FauxDB' && (
                              <>
                                <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-medium rounded-full">Migration Tool</span>
                                <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-medium rounded-full ml-2">Compatibility</span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="space-y-2">
                            {project.features.slice(0, 3).map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center gap-2 text-slate-300">
                                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                <span className="text-sm font-medium">{feature.title}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="space-y-2">
                            {project.name === 'RAM' && (
                              <>
                                <div className="text-sm text-slate-300">• Docker & Kubernetes</div>
                                <div className="text-sm text-slate-300">• Cloud-native architecture</div>
                                <div className="text-sm text-slate-300">• Enterprise monitoring</div>
                              </>
                            )}
                            {project.name === 'pgraft' && (
                              <>
                                <div className="text-sm text-slate-300">• PostgreSQL extension</div>
                                <div className="text-sm text-slate-300">• Go-based implementation</div>
                                <div className="text-sm text-slate-300">• Zero-configuration setup</div>
                              </>
                            )}
                            {project.name === 'FauxDB' && (
                              <>
                                <div className="text-sm text-slate-300">• Rust-based performance</div>
                                <div className="text-sm text-slate-300">• PostgreSQL backend</div>
                                <div className="text-sm text-slate-300">• Container-ready</div>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="space-y-2">
                            {project.name === 'RAM' && (
                              <>
                                <div className="text-sm text-slate-300">• 99.99% uptime SLA</div>
                                <div className="text-sm text-slate-300">• Reduced operational costs</div>
                                <div className="text-sm text-slate-300">• Faster disaster recovery</div>
                              </>
                            )}
                            {project.name === 'pgraft' && (
                              <>
                                <div className="text-sm text-slate-300">• Eliminates split-brain</div>
                                <div className="text-sm text-slate-300">• Simplified management</div>
                                <div className="text-sm text-slate-300">• Reduced complexity</div>
                              </>
                            )}
                            {project.name === 'FauxDB' && (
                              <>
                                <div className="text-sm text-slate-300">• Zero migration downtime</div>
                                <div className="text-sm text-slate-300">• Unified database platform</div>
                                <div className="text-sm text-slate-300">• Lower licensing costs</div>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Enterprise Capabilities Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const colors = getColorClasses(project.color)
              return (
                <div key={project.name} className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-slate-400/30">
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center ${colors.icon}`}>
                      {project.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{project.name}</h3>
                      <p className={`text-sm ${colors.accent}`}>{project.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {project.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="border-l-2 border-slate-400/30 pl-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-full bg-white/10 flex items-center justify-center mt-0.5 ${colors.icon}`}>
                            {feature.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-white text-sm mb-2">{feature.title}</h4>
                            <p className="text-xs text-slate-300 leading-relaxed">{feature.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-slate-400/20">
                    <button className={`w-full ${colors.button} text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2`}>
                      View Enterprise Details
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="mt-20 text-center relative z-10">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-400/30 max-w-5xl mx-auto">
            <h3 className="text-3xl font-bold mb-4 text-white">
              Enterprise Database Solutions
            </h3>
            <p className="text-lg text-slate-300 mb-8 max-w-3xl mx-auto">
              Transform your database infrastructure with enterprise-grade PostgreSQL solutions. 
              Reduce costs, improve reliability, and accelerate your digital transformation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-green-400 mb-2">99.99%</div>
                <div className="text-sm text-slate-300">Uptime SLA</div>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-blue-400 mb-2">50%</div>
                <div className="text-sm text-slate-300">Cost Reduction</div>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-purple-400 mb-2">24/7</div>
                <div className="text-sm text-slate-300">Enterprise Support</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                <Database className="w-5 h-5" />
                Request Enterprise Demo
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-slate-800 transition-colors flex items-center justify-center gap-2">
                <Shield className="w-5 h-5" />
                Download Whitepaper
              </button>
              <button className="border-2 border-slate-400 text-slate-300 px-8 py-4 rounded-lg font-semibold hover:bg-slate-400 hover:text-slate-800 transition-colors flex items-center justify-center gap-2">
                <Users className="w-5 h-5" />
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesList
