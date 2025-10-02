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
  Activity,
  BookOpen
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
      description: 'MongoDB Wire Protocol Proxy & Query Translator',
      icon: <Globe className="w-8 h-8" />,
      color: 'accent',
      features: [
        {
          title: 'MongoDB Wire Protocol Proxy',
          description: 'Full MongoDB wire protocol support with mongosh compatibility',
          icon: <Database className="w-5 h-5" />
        },
        {
          title: 'Query Translation Engine',
          description: 'Real-time MongoDB queries translated to PostgreSQL SQL',
          icon: <Code className="w-5 h-5" />
        },
        {
          title: 'Rust-Powered Performance',
          description: 'High-performance, safe, and modern proxy engine',
          icon: <Zap className="w-5 h-5" />
        },
        {
          title: 'PostgreSQL Backend',
          description: 'Pure PostgreSQL storage with native JSONB support',
          icon: <HardDrive className="w-5 h-5" />
        },
        {
          title: 'Advanced Features',
          description: 'Transactions, geospatial, aggregation pipelines',
          icon: <Globe className="w-5 h-5" />
        },
        {
          title: 'Production Ready',
          description: 'Enterprise-grade monitoring, logging, and configuration',
          icon: <Shield className="w-5 h-5" />
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
        background: `linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)`,
        position: 'relative'
      }}
    >
      {/* Elegant overlay gradient - same as Hero */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(6, 182, 212, 0.15) 50%, rgba(16, 185, 129, 0.15) 100%)'
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
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-primary-300/30 rounded-full text-sm font-thin text-primary-200 mb-6 shadow-sm">
            <Database className="w-4 h-4" />
            Enterprise Solutions
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-thin mb-6 leading-tight">
            <span className="text-white">
              PostgreSQL Enterprise
            </span>
            <br />
            <span className="text-purple-300 font-heading">
              Platform Suite
            </span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto font-thin">
            Comprehensive database solutions for enterprise-grade high availability, distributed consensus, and seamless data migration.
          </p>
        </div>

        {/* Professional Features Overview */}
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Enterprise Solutions Matrix */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 overflow-hidden mb-12">
            <div className="p-8 border-b border-slate-400/30">
              <h3 className="text-2xl font-thin text-white mb-2">Enterprise Database Solutions</h3>
              <p className="text-white/90">Comprehensive platform comparison for enterprise database infrastructure</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-400/30 bg-white/5">
                    <th className="text-left p-6 text-white font-thin text-sm uppercase tracking-wider w-1/4">Solution</th>
                    <th className="text-left p-4 text-white font-thin text-sm uppercase tracking-wider w-1/6">Category</th>
                    <th className="text-left px-4 py-6 text-white font-thin text-sm uppercase tracking-wider w-1/4">Enterprise Features</th>
                    <th className="text-left px-8 py-6 text-white font-thin text-sm uppercase tracking-wider w-1/3">Deployment</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, index) => {
                    const colors = getColorClasses(project.color)
                    return (
                      <tr key={project.name} className="border-b border-slate-400/20 hover:bg-white/5 transition-colors">
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center ${colors.icon}`}>
                              {project.icon}
                            </div>
                            <div>
                              <h3 className="text-lg font-thin text-white">{project.name}</h3>
                              <p className={`text-sm ${colors.accent}`}>{project.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-2">
                            {project.name === 'RAM' && (
                              <>
                                <span className="block px-2 py-1 bg-blue-500/20 text-blue-300 text-xs font-thin rounded-full text-center">High Availability</span>
                                <span className="block px-2 py-1 bg-green-500/20 text-green-300 text-xs font-thin rounded-full text-center">Clustering</span>
                              </>
                            )}
                            {project.name === 'pgraft' && (
                              <>
                                <span className="block px-2 py-1 bg-purple-500/20 text-purple-300 text-xs font-thin rounded-full text-center">Consensus Protocol</span>
                                <span className="block px-2 py-1 bg-orange-500/20 text-orange-300 text-xs font-thin rounded-full text-center">Extension</span>
                              </>
                            )}
                            {project.name === 'FauxDB' && (
                              <>
                                <span className="block px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-thin rounded-full text-center">Migration Tool</span>
                                <span className="block px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-thin rounded-full text-center">Compatibility</span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-6">
                          <div className="space-y-2">
                            {project.features.slice(0, 3).map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center gap-2 text-white/90">
                                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                <span className="text-sm font-thin">{feature.title}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="space-y-2">
                            {project.name === 'RAM' && (
                              <>
                                <div className="text-sm text-white/90">• Docker & Kubernetes</div>
                                <div className="text-sm text-white/90">• Cloud-native architecture</div>
                                <div className="text-sm text-white/90">• Enterprise monitoring</div>
                              </>
                            )}
                            {project.name === 'pgraft' && (
                              <>
                                <div className="text-sm text-white/90">• PostgreSQL extension</div>
                                <div className="text-sm text-white/90">• Go-based implementation</div>
                                <div className="text-sm text-white/90">• Zero-configuration setup</div>
                              </>
                            )}
                            {project.name === 'FauxDB' && (
                              <>
                                <div className="text-sm text-white/90">• Rust-based performance</div>
                                <div className="text-sm text-white/90">• PostgreSQL backend</div>
                                <div className="text-sm text-white/90">• Container-ready</div>
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
                    <div className={`w-16 h-16 rounded-lg bg-white/10 flex items-center justify-center ${colors.icon}`}>
                      {project.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-thin text-white">{project.name}</h3>
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
                            <h4 className="font-thin text-white text-sm mb-2">{feature.title}</h4>
                            <p className="text-xs text-white/90 leading-relaxed">{feature.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-slate-400/20">
                    <button className={`w-full ${colors.button} text-white px-6 py-3 rounded-lg font-thin transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2`}>
                      View Enterprise Details
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Internal Navigation Links for SEO */}
        <div className="mt-16 relative z-10">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-slate-400/30 max-w-6xl mx-auto">
            <h3 className="text-2xl font-thin mb-6 text-white text-center">
              Explore Our Enterprise Solutions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <a href="/ram" className="group block p-6 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-slate-400/20 hover:border-primary-400/40">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-primary-400">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-thin text-white group-hover:text-primary-300 transition-colors">RAM</h4>
                </div>
                <p className="text-sm text-white/90 mb-3">PostgreSQL clustering solution with automatic failover and Raft consensus for enterprise high availability.</p>
                <div className="flex items-center text-primary-400 text-sm font-thin">
                  Learn More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
              
              <a href="/pgraft" className="group block p-6 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-slate-400/20 hover:border-secondary-400/40">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-secondary-400">
                    <Crown className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-thin text-white group-hover:text-secondary-300 transition-colors">pgraft</h4>
                </div>
                <p className="text-sm text-white/90 mb-3">PostgreSQL extension implementing Raft consensus protocol for distributed database coordination.</p>
                <div className="flex items-center text-secondary-400 text-sm font-thin">
                  Learn More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
              
              <a href="/fauxdb" className="group block p-6 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-slate-400/20 hover:border-accent-400/40">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-accent-400">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-thin text-white group-hover:text-accent-300 transition-colors">FauxDB</h4>
                </div>
                <p className="text-sm text-white/90 mb-3">MongoDB-compatible document database built in Rust with PostgreSQL backend for seamless migration.</p>
                <div className="flex items-center text-accent-400 text-sm font-thin">
                  Learn More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            </div>
            
            <div className="text-center">
              <a href="/docs" className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors text-sm">
                <BookOpen className="w-4 h-4" />
                View Complete Documentation
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Enterprise CTA */}
        <div className="mt-20 text-center relative z-10">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-400/30 max-w-5xl mx-auto">
            <h3 className="text-3xl font-thin mb-4 text-white">
              Complete Database Solution Suite
            </h3>
            <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto">
              Transform your database infrastructure with enterprise-grade PostgreSQL solutions. 
              Reduce costs, improve reliability, and accelerate your digital transformation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4">
                <div className="text-2xl font-thin text-green-400 mb-2">99.99%</div>
                <div className="text-sm text-white/90">Uptime SLA</div>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl font-thin text-blue-400 mb-2">50%</div>
                <div className="text-sm text-white/90">Cost Reduction</div>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl font-thin text-purple-400 mb-2">24/7</div>
                <div className="text-sm text-white/90">Enterprise Support</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/download" className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white px-8 py-4 rounded-lg font-thin transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                <Database className="w-5 h-5" />
                Download All Projects
              </a>
              <a href="/docs" className="border-2 border-white text-white px-8 py-4 rounded-lg font-thin hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                <Shield className="w-5 h-5" />
                View Documentation
              </a>
              <a href="/contact" className="border-2 border-white/40 text-white px-8 py-4 rounded-lg font-thin hover:bg-white/20 hover:text-white transition-colors flex items-center justify-center gap-2">
                <Users className="w-5 h-5" />
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesList
