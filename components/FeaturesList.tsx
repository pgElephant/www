'use client'

import React from 'react'
import Link from 'next/link'
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
  BookOpen,
  Search,
  Brain,
  BarChart3
} from 'lucide-react'

const FeaturesList = () => {
  const projects = [
    {
      name: 'NeurondB',
      description: 'AI Database Extension for PostgreSQL',
      icon: <Brain className="w-8 h-8" />,
      color: 'primary',
      link: '/neurondb',
      features: [
        {
          title: 'Vector Search & Indexing',
          description: 'HNSW + IVF indexing, 10+ distance metrics, quantization (FP16/INT8/Binary), up to 32x compression',
          icon: <Search className="w-5 h-5" />
        },
        {
          title: 'ML Inference & Embeddings',
          description: 'ONNX runtime integration, text/image/multimodal embeddings, batch processing, model caching',
          icon: <Cpu className="w-5 h-5" />
        },
        {
          title: 'Hybrid Search & RAG',
          description: 'Semantic + full-text search, cross-encoder reranking, complete in-database RAG pipeline',
          icon: <Database className="w-5 h-5" />
        },
        {
          title: 'GPU Acceleration',
          description: 'CUDA/ROCm support, faster batch operations, automatic CPU fallback',
          icon: <Zap className="w-5 h-5" />
        },
        {
          title: 'ML Analytics Suite',
          description: 'K-means, DBSCAN clustering, PCA, isolation forest, drift detection, quality metrics',
          icon: <BarChart3 className="w-5 h-5" />
        },
        {
          title: 'Background Workers',
          description: 'Async job queue (neuranq), auto-tuner (neuranmon), index maintenance (neurandefrag)',
          icon: <Activity className="w-5 h-5" />
        },
        {
          title: '100+ SQL Functions',
          description: 'PostgreSQL 16-18 compatible, comprehensive SQL API, operator support, views & procedures',
          icon: <Code className="w-5 h-5" />
        },
        {
          title: 'Security',
          description: 'Vector encryption (AES-GCM), differential privacy, RLS integration, audit logging',
          icon: <Shield className="w-5 h-5" />
        }
      ]
    },
    {
      name: 'pgbalancer',
      description: 'PostgreSQL Connection Pooler & Load Balancer',
      icon: <Settings className="w-8 h-8" />,
      color: 'primary',
      link: '/pgbalancer',
      features: [
        {
          title: 'Connection Pooling',
          description: 'Efficient connection management with configurable pool sizes',
          icon: <Database className="w-5 h-5" />
        },
        {
          title: 'Load Balancing',
          description: 'Intelligent query distribution across multiple PostgreSQL servers',
          icon: <Activity className="w-5 h-5" />
        },
        {
          title: 'Failover & Recovery',
          description: 'Automatic failover detection and recovery',
          icon: <Shield className="w-5 h-5" />
        },
        {
          title: 'Health Monitoring',
          description: 'Real-time server health checks and status monitoring',
          icon: <Activity className="w-5 h-5" />
        },
        {
          title: 'Advanced Configuration',
          description: 'Flexible routing rules and connection parameters',
          icon: <Settings className="w-5 h-5" />
        },
        {
          title: 'High Performance',
          description: 'Optimized for high-throughput database workloads',
          icon: <Zap className="w-5 h-5" />
        },
        {
          title: 'REST API Control',
          description: 'Complete programmatic control via RESTful API endpoints',
          icon: <Code className="w-5 h-5" />
        },
        {
          title: 'MQTT Cluster Management',
          description: 'Distributed cluster coordination via MQTT messaging',
          icon: <Globe className="w-5 h-5" />
        }
      ]
    },
    {
      name: 'pgSentinel',
      description: 'Professional pgbalancer Management & Monitoring',
      icon: <Activity className="w-8 h-8" />,
      color: 'primary',
      link: '/pgsentinel',
      features: [
        {
          title: 'Real-Time Dashboard',
          description: 'Live metrics with WebSocket updates every 5 seconds',
          icon: <Activity className="w-5 h-5" />
        },
        {
          title: 'Prometheus Metrics',
          description: '30+ custom metrics for comprehensive monitoring',
          icon: <Network className="w-5 h-5" />
        },
        {
          title: 'Grafana Dashboards',
          description: '22 pre-built visualization panels',
          icon: <BookOpen className="w-5 h-5" />
        },
        {
          title: 'pg_stat_insights',
          description: 'Deep PostgreSQL performance analytics',
          icon: <Database className="w-5 h-5" />
        },
        {
          title: 'REST API',
          description: '25+ endpoints for programmatic control',
          icon: <Code className="w-5 h-5" />
        },
        {
          title: 'Docker Ready',
          description: '8-service stack with one-command deployment',
          icon: <Server className="w-5 h-5" />
        }
      ]
    },
    {
      name: 'pg_stat_insights',
      description: 'Deep PostgreSQL Performance Analytics',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'secondary',
      link: '/pg-stat-insights',
      features: [
        {
          title: 'Query Analytics',
          description: 'Identify slow queries and optimization opportunities',
          icon: <Search className="w-5 h-5" />
        },
        {
          title: 'Table Statistics',
          description: 'Bloat detection and vacuum recommendations',
          icon: <HardDrive className="w-5 h-5" />
        },
        {
          title: 'Index Analysis',
          description: 'Missing and unused index detection',
          icon: <CheckCircle className="w-5 h-5" />
        },
        {
          title: 'Cache Monitoring',
          description: 'Buffer cache hit ratios and optimization',
          icon: <Cpu className="w-5 h-5" />
        },
        {
          title: 'Replication Insights',
          description: 'Real-time lag monitoring across replicas',
          icon: <Network className="w-5 h-5" />
        },
        {
          title: 'Smart Recommendations',
          description: 'Intelligent optimization suggestions',
          icon: <Activity className="w-5 h-5" />
        }
      ]
    },
    {
      name: 'pgraft',
      description: 'PostgreSQL Raft Consensus Extension',
      icon: <Crown className="w-8 h-8" />,
      color: 'secondary',
      link: '/pgraft',
      features: [
        {
          title: 'Raft Consensus Protocol',
          description: 'Implements the Raft algorithm for distributed consensus',
          icon: <Globe className="w-5 h-5" />
        },
        {
          title: 'Automatic Leader Election',
          description: 'Leader election and failover',
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
      link: '/fauxdb',
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
          accent: 'text-white/90',
          button: 'bg-primary-600 hover:bg-primary-700'
        }
      case 'secondary':
        return {
          bg: 'from-secondary-500/20 to-secondary-600/20',
          border: 'border-secondary-400/30',
          icon: 'text-secondary-400',
          accent: 'text-white/90',
          button: 'bg-secondary-600 hover:bg-secondary-700'
        }
      case 'accent':
        return {
          bg: 'from-accent-500/20 to-accent-600/20',
          border: 'border-accent-400/30',
          icon: 'text-accent-400',
          accent: 'text-white/90',
          button: 'bg-accent-600 hover:bg-accent-700'
        }
      default:
        return {
          bg: 'from-neutral-500/20 to-neutral-600/20',
          border: 'border-neutral-400/30',
          icon: 'text-neutral-400',
          accent: 'text-white/90',
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
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-primary-300/30 rounded-full text-sm font-light text-primary-200 mb-6 shadow-sm">
            <Database className="w-4 h-4" />
Enterprise Solutions
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-light mb-6 leading-tight">
            <span className="text-white">
              PostgreSQL Enterprise
            </span>
            <br />
            <span className="text-purple-300 font-heading">
              Platform Suite
            </span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto font-light">
            Database solutions for high availability, distributed consensus, and data migration.
          </p>
        </div>

        {/* Professional Features Overview */}
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Enterprise Solutions Matrix */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-slate-400/20 overflow-hidden mb-12 shadow-xl">
            <div className="p-8 border-b border-slate-400/20">
              <h3 className="text-2xl font-semibold text-white mb-2">Enterprise Database Solutions</h3>
              <p className="text-white/90">Comprehensive platform comparison for enterprise database infrastructure</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-400/20 bg-white/5">
                    <th className="text-left p-4 text-white font-semibold text-sm uppercase tracking-wider w-1/6">Product</th>
                    <th className="text-left p-3 text-white font-semibold text-sm uppercase tracking-wider w-1/8">Focus Area</th>
                    <th className="text-left px-3 py-4 text-white font-semibold text-sm uppercase tracking-wider w-1/5">Key Capabilities</th>
                    <th className="text-left px-3 py-4 text-white font-semibold text-sm uppercase tracking-wider w-1/5">Performance Metrics</th>
                    <th className="text-left px-3 py-4 text-white font-semibold text-sm uppercase tracking-wider w-1/6">Implementation</th>
                    <th className="text-left px-3 py-4 text-white font-semibold text-sm uppercase tracking-wider w-1/8">Enterprise Use</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, index) => {
                    const colors = getColorClasses(project.color)
                    return (
                      <tr key={project.name} className="border-b border-slate-400/10 hover:bg-white/5 transition-all duration-200">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center ${colors.icon}`}>
                              {project.icon}
                            </div>
                            <div>
                              <h3 className="text-base font-light text-white">{project.name}</h3>
                              <p className={`text-xs ${colors.accent}`}>{project.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="space-y-1">
                            {project.name === 'NeurondB' && (
                              <>
                                <span className="block px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-light rounded-full text-center">AI Database</span>
                                <span className="block px-2 py-1 bg-purple-500/20 text-purple-300 text-xs font-light rounded-full text-center">Vector Search</span>
                              </>
                            )}
                            {project.name === 'pgbalancer' && (
                              <>
                                <span className="block px-2 py-1 bg-blue-500/20 text-blue-300 text-xs font-light rounded-full text-center">Pooling</span>
                                <span className="block px-2 py-1 bg-green-500/20 text-green-300 text-xs font-light rounded-full text-center">Load Balance</span>
                              </>
                            )}
                            {project.name === 'pgSentinel' && (
                              <>
                                <span className="block px-2 py-1 bg-blue-500/20 text-blue-300 text-xs font-light rounded-full text-center">Monitoring</span>
                                <span className="block px-2 py-1 bg-purple-500/20 text-purple-300 text-xs font-light rounded-full text-center">Management</span>
                              </>
                            )}
                            {project.name === 'pg_stat_insights' && (
                              <>
                                <span className="block px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-light rounded-full text-center">Analytics</span>
                                <span className="block px-2 py-1 bg-green-500/20 text-green-300 text-xs font-light rounded-full text-center">Performance</span>
                              </>
                            )}
                            {project.name === 'pgraft' && (
                              <>
                                <span className="block px-2 py-1 bg-purple-500/20 text-purple-300 text-xs font-light rounded-full text-center">Consensus</span>
                                <span className="block px-2 py-1 bg-orange-500/20 text-orange-300 text-xs font-light rounded-full text-center">Extension</span>
                              </>
                            )}
                            {project.name === 'FauxDB' && (
                              <>
                                <span className="block px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-light rounded-full text-center">Migration</span>
                                <span className="block px-2 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-light rounded-full text-center">Compatibility</span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-4">
                          <div className="space-y-1">
                            {project.features.slice(0, 4).map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center gap-2 text-white/90">
                                <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                                <span className="text-xs font-light">{feature.title}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-3 py-4">
                          <div className="space-y-1">
                            {project.name === 'NeurondB' && (
                              <>
                                <div className="text-xs text-white/90">• Sub-ms vector search</div>
                                <div className="text-xs text-white/90">• 100+ SQL functions</div>
                                <div className="text-xs text-white/90">• HNSW indexing</div>
                                <div className="text-xs text-white/90">• Native PG integration</div>
                              </>
                            )}
                            {project.name === 'pgbalancer' && (
                              <>
                                <div className="text-xs text-white/90">• 10K+ connections/sec</div>
                                <div className="text-xs text-white/90">• &lt;1ms latency</div>
                                <div className="text-xs text-white/90">• 99.9% uptime</div>
                                <div className="text-xs text-white/90">• C-optimized</div>
                              </>
                            )}
                            {project.name === 'pgSentinel' && (
                              <>
                                <div className="text-xs text-white/90">• 5s update interval</div>
                                <div className="text-xs text-white/90">• &lt;50ms API response</div>
                                <div className="text-xs text-white/90">• 30+ metrics</div>
                                <div className="text-xs text-white/90">• Real-time WebSocket</div>
                              </>
                            )}
                            {project.name === 'pg_stat_insights' && (
                              <>
                                <div className="text-xs text-white/90">• &lt;100ms analysis</div>
                                <div className="text-xs text-white/90">• 50+ tracked metrics</div>
                                <div className="text-xs text-white/90">• 10+ data sources</div>
                                <div className="text-xs text-white/90">• Intelligent recommendations</div>
                              </>
                            )}
                            {project.name === 'pgraft' && (
                              <>
                                <div className="text-xs text-white/90">• Sub-second failover</div>
                                <div className="text-xs text-white/90">• Raft consensus</div>
                                <div className="text-xs text-white/90">• Go reliability</div>
                                <div className="text-xs text-white/90">• Zero config</div>
                              </>
                            )}
                            {project.name === 'FauxDB' && (
                              <>
                                <div className="text-xs text-white/90">• Rust performance</div>
                                <div className="text-xs text-white/90">• MongoDB compatible</div>
                                <div className="text-xs text-white/90">• SQL translation</div>
                                <div className="text-xs text-white/90">• Production ready</div>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-4">
                          <div className="space-y-1">
                            {project.name === 'NeurondB' && (
                              <>
                                <div className="text-xs text-white/90">• PostgreSQL C extension</div>
                                <div className="text-xs text-white/90">• PG 16-18 compatible</div>
                                <div className="text-xs text-white/90">• Background workers</div>
                                <div className="text-xs text-white/90">• Production-ready</div>
                              </>
                            )}
                            {project.name === 'pgbalancer' && (
                              <>
                                <div className="text-xs text-white/90">• C-based high performance</div>
                                <div className="text-xs text-white/90">• PostgreSQL extension</div>
                                <div className="text-xs text-white/90">• Production-ready</div>
                                <div className="text-xs text-white/90">• Zero downtime</div>
                              </>
                            )}
                            {project.name === 'pgSentinel' && (
                              <>
                                <div className="text-xs text-white/90">• Next.js 14 + React 18</div>
                                <div className="text-xs text-white/90">• FastAPI Python backend</div>
                                <div className="text-xs text-white/90">• Docker Compose</div>
                                <div className="text-xs text-white/90">• Production-ready</div>
                              </>
                            )}
                            {project.name === 'pg_stat_insights' && (
                              <>
                                <div className="text-xs text-white/90">• Python asyncpg</div>
                                <div className="text-xs text-white/90">• PostgreSQL extensions</div>
                                <div className="text-xs text-white/90">• API integrated</div>
                                <div className="text-xs text-white/90">• Cloud native</div>
                              </>
                            )}
                            {project.name === 'pgraft' && (
                              <>
                                <div className="text-xs text-white/90">• PostgreSQL extension</div>
                                <div className="text-xs text-white/90">• Go implementation</div>
                                <div className="text-xs text-white/90">• Auto-configuration</div>
                                <div className="text-xs text-white/90">• Container ready</div>
                              </>
                            )}
                            {project.name === 'FauxDB' && (
                              <>
                                <div className="text-xs text-white/90">• Rust-based engine</div>
                                <div className="text-xs text-white/90">• PostgreSQL backend</div>
                                <div className="text-xs text-white/90">• Docker ready</div>
                                <div className="text-xs text-white/90">• Cloud native</div>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-4">
                          <div className="space-y-1">
                            {project.name === 'NeurondB' && (
                              <>
                                <div className="text-xs text-white/90">• Semantic search apps</div>
                                <div className="text-xs text-white/90">• RAG applications</div>
                                <div className="text-xs text-white/90">• AI-powered features</div>
                                <div className="text-xs text-white/90">• Embedding storage</div>
                              </>
                            )}
                            {project.name === 'pgbalancer' && (
                              <>
                                <div className="text-xs text-white/90">• High-traffic apps</div>
                                <div className="text-xs text-white/90">• Multi-tenant systems</div>
                                <div className="text-xs text-white/90">• Load distribution</div>
                                <div className="text-xs text-white/90">• Connection scaling</div>
                              </>
                            )}
                            {project.name === 'pgSentinel' && (
                              <>
                                <div className="text-xs text-white/90">• Production monitoring</div>
                                <div className="text-xs text-white/90">• DevOps automation</div>
                                <div className="text-xs text-white/90">• Performance tuning</div>
                                <div className="text-xs text-white/90">• Capacity planning</div>
                              </>
                            )}
                            {project.name === 'pg_stat_insights' && (
                              <>
                                <div className="text-xs text-white/90">• Query optimization</div>
                                <div className="text-xs text-white/90">• Performance troubleshooting</div>
                                <div className="text-xs text-white/90">• Capacity planning</div>
                                <div className="text-xs text-white/90">• Production analytics</div>
                              </>
                            )}
                            {project.name === 'pgraft' && (
                              <>
                                <div className="text-xs text-white/90">• Distributed clusters</div>
                                <div className="text-xs text-white/90">• Leader election</div>
                                <div className="text-xs text-white/90">• Consensus protocols</div>
                                <div className="text-xs text-white/90">• HA databases</div>
                              </>
                            )}
                            {project.name === 'FauxDB' && (
                              <>
                                <div className="text-xs text-white/90">• MongoDB migration</div>
                                <div className="text-xs text-white/90">• Legacy app support</div>
                                <div className="text-xs text-white/90">• Protocol compatibility</div>
                                <div className="text-xs text-white/90">• Data transformation</div>
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
                <div key={project.name} className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-slate-400/30 h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-16 h-16 rounded-lg bg-white/10 flex items-center justify-center ${colors.icon}`}>
                      {project.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-light text-white">{project.name}</h3>
                      <p className={`text-sm ${colors.accent}`}>{project.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6 flex-grow">
                    {project.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="border-l-2 border-slate-400/30 pl-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-5 h-5 rounded-full bg-white/10 flex items-center justify-center mt-0.5 ${colors.icon}`}>
                            {feature.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-light text-white text-sm mb-2">{feature.title}</h4>
                            <p className="text-xs text-white/90 leading-relaxed">{feature.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-slate-400/20">
                    <Link href={project.link} className={`w-full ${colors.button} text-white px-6 py-3 rounded-lg font-light transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 min-h-[48px]`}>
                      View Enterprise Details
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>


        {/* Enterprise CTA */}
        <div className="mt-20 text-center relative z-10">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-400/30 max-w-5xl mx-auto">
            <h3 className="text-3xl font-light mb-4 text-white">
              Complete Database Solution Suite
            </h3>
            <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto">
              Transform your database infrastructure with enterprise-grade PostgreSQL solutions. 
              Reduce costs, improve reliability, and accelerate your digital transformation.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4">
                <div className="text-2xl font-light text-green-400 mb-2">99.99%</div>
                <div className="text-sm text-white/90">Uptime SLA</div>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl font-light text-blue-400 mb-2">50%</div>
                <div className="text-sm text-white/90">Cost Reduction</div>
              </div>
              <div className="text-center p-4">
                <div className="text-2xl font-light text-purple-400 mb-2">24/7</div>
                <div className="text-sm text-white/90">Enterprise Support</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/download" className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white px-8 py-4 rounded-lg font-light transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                <Database className="w-5 h-5" />
                Download All Projects
              </a>
              <a href="/docs" className="border-2 border-white text-white px-8 py-4 rounded-lg font-light hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                <Shield className="w-5 h-5" />
                View Documentation
              </a>
              <a href="/contact" className="border-2 border-white/40 text-white px-8 py-4 rounded-lg font-light hover:bg-white/20 hover:text-white transition-colors flex items-center justify-center gap-2">
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
