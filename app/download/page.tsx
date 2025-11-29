'use client'

import React from 'react'
import { Download, ArrowRight, Package, Code, Database, Server, Terminal, Github, FileText, Play, Shield, CheckCircle, Clock, Users, Star, Zap, Globe, Monitor, Smartphone, Tablet, Lock, Briefcase, Award, Globe2, Loader2, Crown, Network, Layers, Activity, Cpu } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Use theme config colors
import { colors } from '@/config/theme'

const palette = {
  iconTeal: colors.secondary[700],
  iconTealLight: colors.secondary[600],
  iconTealMedium: colors.secondary[700],
  iconTealDark: colors.secondary[800],
  // Supporting colors from theme
  navy: colors.cool[800],
  navyDeep: colors.cool[900],
  slate: colors.cool[700],
  cyan: colors.secondary[500],
  cyanDeep: colors.secondary[600],
  teal: colors.accent[500],
  tealDeep: colors.accent[600],
  gray100: colors.cool[50],
  gray300: colors.cool[300],
  white: colors.white,
  orange: '#F97316', // Keep specific orange for download page
  orangeDark: '#EA580C'
}

const trustBadges = [
  { label: 'Open Source', icon: Github, href: 'https://github.com/pgElephant' },
  { label: 'Verified Releases', icon: Shield, href: '/docs/security' },
  { label: 'Enterprise Support', icon: CheckCircle, href: '/contact' },
  { label: 'Secure Downloads', icon: Lock, href: '/docs/security' },
]

const trustBar = [
  { icon: Briefcase, label: 'Production Ready' },
  { icon: Lock, label: 'Cryptographically Signed' },
  { icon: Award, label: 'Verified Releases' },
  { icon: Globe2, label: 'CDN Delivery' },
]

// Use theme gradient
import { gradients } from '@/config/theme'

const unifiedHeroGradient = gradients.hero.css

// Use centralized ProductIcons
import { PgbalancerIcon, PgraftIcon, FauxDbIcon, PgSentinelIcon, PgStatInsightsIcon, NeurondBIcon } from '@/components/ProductIcons'

// Icon wrappers for size compatibility (using centralized ProductIcons)
const PgbalancerIconWrapper = () => <PgbalancerIcon size={48} />
const PgraftIconWrapper = () => <PgraftIcon size={48} />
const FauxDbIconWrapper = () => <FauxDbIcon size={48} />
const NeurondBIconWrapper = () => <NeurondBIcon size={48} />
const PgStatInsightsIconWrapper = () => <PgStatInsightsIcon size={48} />

const DownloadPage = () => {
  // Function to get appropriate icon for download type
  const getDownloadIcon = (type: string) => {
    switch (type) {
      case 'Binary':
        return Package
      case 'Source':
        return Code
      case 'Docker':
        return Server
      case 'Docs':
        return FileText
      case 'Linux':
        return Terminal
      case 'macOS':
        return Monitor
      case 'Windows':
        return Monitor
      default:
        return Download
    }
  }

  // Download statistics
  const downloadStats = [
    { label: 'Total Downloads', value: '200', icon: Download, color: 'text-blue-600' },
    { label: 'Active Users', value: '10', icon: Users, color: 'text-green-600' },
    { label: 'Products Available', value: '5', icon: Package, color: 'text-purple-600' },
    { label: 'Latest Version', value: 'v1.0.0', icon: Star, color: 'text-yellow-500' }
  ]

  // Platform support
  const supportedPlatforms = [
    { name: 'Linux', icon: Terminal, description: 'Ubuntu 22.04+, Rocky Linux 9+' },
    { name: 'macOS', icon: Monitor, description: 'macOS 12.0+ (Intel & Apple Silicon)' },
    { name: 'Docker', icon: Server, description: 'All Docker-supported platforms' },
    { name: 'Kubernetes', icon: Server, description: 'Any K8s cluster (1.24+)' }
  ]

  // Installation methods
  const installationMethods = [
    {
      title: 'Quick Start',
      description: 'Get up and running in minutes with our pre-built binaries',
      icon: Zap,
      steps: ['Download binary', 'Extract archive', 'Run executable', 'Configure']
    },
    {
      title: 'Docker',
      description: 'Deploy with Docker for consistent environments',
      icon: Server,
      steps: ['Pull image', 'Run container', 'Mount volumes', 'Start services']
    },
    {
      title: 'Source Build',
      description: 'Build from source for custom configurations',
      icon: Code,
      steps: ['Clone repository', 'Install dependencies', 'Build project', 'Install']
    }
  ]

  const products = [
    {
      id: 'neurondb',
      name: 'NeuronDB',
      title: 'AI Database Extension for PostgreSQL',
      icon: 'neurondb-custom',
      featured: true,
      isExtension: true,
      features: [
        'Vector Search: High-performance vector similarity search with multiple index types',
        'ML Inference: Built-in machine learning models and embedding generation',
        'GPU Acceleration: CUDA and ROCm support for accelerated operations',
        'Hybrid Search: Combines semantic vector search with full-text search',
        'RAG Pipeline: Complete Retrieval-Augmented Generation implementation',
        'Background Workers: Automated indexing, monitoring, and defragmentation',
      ],
      details: '/docs/neurondb',
      downloads: [
        { title: 'Source Code (tar.gz)', href: 'https://github.com/pgElephant/neurondb/archive/refs/tags/v1.0.0.tar.gz', type: 'Source', available: true },
        { title: 'Source Code (zip)', href: 'https://github.com/pgElephant/neurondb/archive/refs/tags/v1.0.0.zip', type: 'Source', available: true },
        { title: 'Installation Guide', href: '/docs/neurondb/installation', type: 'Docs', available: true },
        { title: 'RPM Package', href: '#', type: 'Binary', available: false, note: 'PostgreSQL Extension' },
        { title: 'DEB Package', href: '#', type: 'Binary', available: false, note: 'PostgreSQL Extension' },
        { title: 'Docker Image', href: '#', type: 'Docker', available: false, note: 'PostgreSQL Extension' }
      ]
    },
    {
      id: 'pg_stat_insights',
      name: 'pg_stat_insights',
      title: 'Performance Analytics Extension',
      icon: 'pg_stat_insights-custom',
      featured: false,
      isExtension: true,
      features: [
        '52 Performance Metrics: Track planning, execution, I/O, WAL, JIT, and parallel execution',
        'Enhanced Analytics: 11 specialized views for comprehensive query analysis',
        'Cache Efficiency: Detailed buffer hit ratios and I/O timing analysis',
        'JIT Analysis: Complete JIT compilation metrics and cost-benefit tracking',
        'Query Patterns: Identify slow queries, cache misses, and optimization opportunities',
        'Zero Overhead Mode: Minimal performance impact with configurable tracking levels',
      ],
      details: '/docs/pg-stat-insights',
      downloads: [
        { title: 'Source Code (tar.gz)', href: 'https://github.com/pgElephant/pg_stat_insights/archive/refs/tags/v1.0.0.tar.gz', type: 'Source', available: true },
        { title: 'Source Code (zip)', href: 'https://github.com/pgElephant/pg_stat_insights/archive/refs/tags/v1.0.0.zip', type: 'Source', available: true },
        { title: 'Installation Guide', href: '/docs/pg-stat-insights/getting-started', type: 'Docs', available: true },
        { title: 'RPM Package', href: '#', type: 'Binary', available: false, note: 'PostgreSQL Extension' },
        { title: 'DEB Package', href: '#', type: 'Binary', available: false, note: 'PostgreSQL Extension' },
        { title: 'Docker Image', href: '#', type: 'Docker', available: false, note: 'PostgreSQL Extension' }
      ]
    },
    {
      id: 'pgraft',
      name: 'pgraft',
      title: 'PostgreSQL Raft Consensus Extension',
      icon: 'pgraft-custom',
      featured: false,
      isExtension: true,
      features: [
        'Raft Consensus Protocol: Implements the Raft algorithm for distributed consensus',
        'Automatic Leader Election: Seamless leader election and failover',
        'Log Replication: Consistent log replication across cluster nodes',
        'High Availability: Fault-tolerant cluster with automatic recovery',
        'Zero-Downtime Operations: Non-disruptive cluster operations',
        "Go Integration: Leverages Go's robust Raft implementation",
      ],
      details: '/pgraft',
      downloads: [
        { title: 'Source Code (tar.gz)', href: 'https://github.com/pgElephant/pgraft/archive/refs/tags/v1.0.0.tar.gz', type: 'Source', available: true },
        { title: 'Source Code (zip)', href: 'https://github.com/pgElephant/pgraft/archive/refs/tags/v1.0.0.zip', type: 'Source', available: true },
        { title: 'Installation Guide', href: '/docs/pgraft/installation', type: 'Docs', available: true },
        { title: 'RPM Package', href: '#', type: 'Binary', available: false, note: 'PostgreSQL Extension' },
        { title: 'DEB Package', href: '#', type: 'Binary', available: false, note: 'PostgreSQL Extension' },
        { title: 'Docker Image', href: '#', type: 'Docker', available: false, note: 'PostgreSQL Extension' }
      ]
    },
    {
      id: 'fauxdb',
      name: 'FauxDB',
      title: 'MongoDB Compatible Document Database',
      icon: 'fauxdb-custom',
      isExtension: false,
      features: [
        '100% MongoDB Compatibility: Full wire protocol support with mongosh compatibility',
        'High Performance: Built in Rust for superior speed and memory efficiency',
        'Advanced Features: Transactions, geospatial, aggregation pipelines',
        'Pure PostgreSQL Backend: Native JSONB support, no external dependencies',
        'Production Ready: Enterprise-grade monitoring, logging, and configuration',
        'Docker Support: Comprehensive Docker support for dev, test, and production',
      ],
      details: '/fauxdb',
      downloads: [
        { title: 'Source Code (tar.gz)', href: 'https://github.com/pgElephant/fauxdb/archive/refs/tags/v1.0.0.tar.gz', type: 'Source', available: true },
        { title: 'Source Code (zip)', href: 'https://github.com/pgElephant/fauxdb/archive/refs/tags/v1.0.0.zip', type: 'Source', available: true },
        { title: 'Linux Binary', href: '/download/fauxdb', type: 'Binary', available: true },
        { title: 'Docker Image', href: '/download/fauxdb', type: 'Docker', available: true }
      ]
    },
    {
      id: 'pgbalancer',
      name: 'pgbalancer',
      title: 'Connection Pooling & Load Balancing for PostgreSQL',
      icon: 'pgbalancer-custom',
      isExtension: false,
      features: [
        'High Performance: Enterprise-grade connection pooling with minimal latency',
        'Load Balancing: Intelligent query distribution across multiple PostgreSQL nodes',
        'YAML Configuration: Modern, human-readable configuration format',
        'REST API: Professional control interface with bctl client utility',
        'Health Monitoring: Real-time backend health checks and failover',
        'Zero Dependencies: Self-contained with no external coordination services',
      ],
      details: '/pgbalancer',
      downloads: [
        { title: 'Source Code (tar.gz)', href: 'https://github.com/pgElephant/pgbalancer/archive/refs/tags/v1.0.0.tar.gz', type: 'Source', available: true },
        { title: 'Source Code (zip)', href: 'https://github.com/pgElephant/pgbalancer/archive/refs/tags/v1.0.0.zip', type: 'Source', available: true },
        { title: 'Linux Binary', href: '/download/pgbalancer', type: 'Binary', available: true },
        { title: 'Docker Image', href: '/download/pgbalancer', type: 'Docker', available: true }
      ]
    },
  ]

  return (
    <div className="pt-0">
      {/* Unified Professional Hero */}
        <section 
          className="relative text-center overflow-hidden bg-hero-gradient min-h-[400px] flex items-center"
          style={{ 
            backgroundColor: '#1f2937',
            position: 'relative'
          }}
        >

        <div className="container-extra-wide mx-auto relative z-10 w-full py-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Image src="/ico/pgElephant_HD.ico" alt="pgElephant" width={80} height={80} className="drop-shadow-2xl" />
            </div>
            <h1 className="text-5xl md:text-6xl font-thin text-white mb-4 tracking-tight drop-shadow-lg">pgElephant Download Center</h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto drop-shadow-lg">
              Official pgElephant releases. Open source PostgreSQL extensions and tools for modern distributed systems.
            </p>
            {/* Trust Bar */}
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {trustBar.map((item, i) => (
                <div key={i} className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white border border-white/20 text-base font-semibold">
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </div>
              ))}
            </div>
            {/* Download Stats */}
            <div className="flex flex-wrap justify-center gap-4">
              {downloadStats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl min-w-[120px] border border-white/20">
                  <stat.icon className={`w-7 h-7 mb-1 ${stat.color}`} />
                  <span className="text-2xl font-thin text-white">{stat.value}</span>
                  <span className="text-xs text-white">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* pgElephant Products - Card-Based Layout */}
      <section className="py-24 relative overflow-hidden" style={{ backgroundColor: '#1f2937' }}>
        <div className="container-wide mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">pgElephant Products</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Production-ready PostgreSQL extensions and tools. Built by developers, for developers.
            </p>
          </div>

          <div className="max-w-7xl mx-auto space-y-8">
            {products.map((product, idx) => (
              <div
                key={product.id}
                className={`bg-gradient-to-r from-slate-800/60 to-slate-900/60 backdrop-blur-sm rounded-2xl p-8 border transition-all hover:shadow-2xl hover:scale-[1.02] ${
                  product.featured 
                    ? 'border-cyan-400/50 shadow-lg shadow-cyan-500/20' 
                    : 'border-white/10'
                }`}
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left: Product Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-6 mb-6">
                      {/* Product Icon */}
                      <div className="flex-shrink-0">
                        {(() => {
                          const iconMap: Record<string, { Icon: React.ComponentType<{ size?: number }>, gradient: string, border: string }> = {
                            'neurondb-custom': { Icon: NeurondBIcon, gradient: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-400/30' },
                            'pg_stat_insights-custom': { Icon: PgStatInsightsIcon, gradient: 'from-teal-500/20 to-cyan-500/20', border: 'border-teal-400/30' },
                            'pgbalancer-custom': { Icon: PgbalancerIcon, gradient: 'from-cyan-500/20 to-blue-500/20', border: 'border-cyan-400/30' },
                            'pgraft-custom': { Icon: PgraftIcon, gradient: 'from-blue-500/20 to-purple-500/20', border: 'border-blue-400/30' },
                            'fauxdb-custom': { Icon: FauxDbIcon, gradient: 'from-emerald-500/20 to-green-500/20', border: 'border-emerald-400/30' },
                          }
                          const iconConfig = iconMap[product.icon || '']
                          if (iconConfig) {
                            const { Icon, gradient, border } = iconConfig
                            return (
                              <div className={`w-20 h-20 flex items-center justify-center rounded-xl border-2 ${border} bg-gradient-to-br ${gradient}`}>
                                <Icon size={80} />
                              </div>
                            )
                          }
                          return <Image src={product.icon || ''} alt={`${product.name} icon`} width={80} height={80} className="w-20 h-20 object-contain rounded-xl border-2 border-white/20" />
                        })()}
                      </div>

                      {/* Product Name & Badges */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-3xl font-bold text-white">{product.name}</h3>
                          {product.featured && (
                            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                              FEATURED
                            </span>
                          )}
                          <span className="bg-green-500/20 border border-green-500/30 text-green-300 text-xs font-bold px-3 py-1 rounded-full">
                            STABLE
                          </span>
                        </div>
                        <p className="text-xl text-cyan-300 font-semibold mb-4">{product.title}</p>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {product.features && product.features.map((feature, i) => {
                            const [title, ...desc] = feature.split(':');
                            return (
                              <div key={i} className="flex items-start gap-2">
                                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                  <span className="text-white font-semibold">{title}</span>
                                  {desc.length > 0 && (
                                    <span className="text-slate-300 text-sm">: {desc.join(':')}</span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Product Details Link */}
                        <Link 
                          href={product.details} 
                          className="inline-flex items-center gap-2 mt-6 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors group"
                        >
                          <FileText className="w-5 h-5" />
                          View Full Documentation
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Right: Download Options */}
                  <div className="lg:w-80 flex-shrink-0">
                    <div className="bg-slate-900/80 rounded-xl p-6 border border-white/10">
                      <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Download className="w-5 h-5 text-cyan-400" />
                        Download Options
                      </h4>
                      
                      {/* Extension Notice */}
                      {product.isExtension && (
                        <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                          <div className="flex items-start gap-2">
                            <FileText className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-blue-300 leading-relaxed">
                              PostgreSQL Extension - Install via source code or follow the installation guide for your PostgreSQL setup.
                            </p>
                          </div>
                        </div>
                      )}
                      
                      <div className="space-y-3">
                        {product.downloads.map((download, index) => {
                          const IconComponent = getDownloadIcon(download.type);
                          const isAvailable = download.available !== false; // Default to true if not specified
                          
                          if (!isAvailable) {
                            // Disabled/Greyed out option for extensions
                            return (
                              <div
                                key={index}
                                className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-slate-800/40 text-slate-500 border border-slate-700/50 cursor-not-allowed opacity-50"
                                title={'note' in download ? download.note : 'Not available for PostgreSQL extensions'}
                              >
                                <div className="flex items-center gap-3">
                                  <IconComponent className="w-5 h-5" />
                                  <div>
                                    <div className="font-bold text-sm">{download.title}</div>
                                    <div className="text-xs opacity-75">{'note' in download ? download.note : 'Extension only'}</div>
                                  </div>
                                </div>
                                <Lock className="w-4 h-4" />
                              </div>
                            );
                          }
                          
                          return (
                            <Link 
                              key={index} 
                              href={download.href}
                              className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white transition-all hover:shadow-lg hover:scale-105 group"
                            >
                              <div className="flex items-center gap-3">
                                <IconComponent className="w-5 h-5" />
                                <div>
                                  <div className="font-bold text-sm">{download.title}</div>
                                  <div className="text-xs opacity-90">{download.type}</div>
                                </div>
                              </div>
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          );
                        })}
                      </div>

                      {/* Release Notes */}
                      <div className="mt-6 pt-6 border-t border-white/10">
                        <a 
                          href={`https://github.com/pgElephant/${product.id}/releases`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 text-slate-300 hover:text-white transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          <span className="text-sm font-semibold">View Release Notes</span>
                        </a>
                      </div>

                      {/* Version Badge */}
                      <div className="mt-4 text-center">
                        <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-slate-300 text-xs px-3 py-1 rounded-full">
                          <Star className="w-3 h-3 text-yellow-400" />
                          Latest: v1.0.0
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-24 border-t border-b border-gray-100 relative overflow-hidden" style={{ backgroundColor: '#1f2937' }}>
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-orange-400/10 rounded-full blur-2xl animate-pulse" />
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-cyan-200/10 to-transparent" />
        </div>
        <div className="container-wide mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-thin text-white mb-6">Quick Start</h2>
            <p className="text-lg text-white mb-12 leading-relaxed">Get up and running with pgElephant in minutes. Choose your preferred installation method below.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {installationMethods.map((method, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center border border-white/20">
                  <method.icon className="w-10 h-10 mb-3 text-cyan-200" />
                  <h3 className="text-lg font-thin text-white mb-2">{method.title}</h3>
                  <p className="text-white text-sm mb-3">{method.description}</p>
                  <ol className="text-left text-xs text-white space-y-1 list-decimal list-inside">
                    {method.steps.map((step, j) => (
                      <li key={j}>{step}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
            <Link href="/docs" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-white transition-all duration-200 text-lg font-thin bg-orange-500 hover:bg-orange-600 focus:bg-orange-600">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#1f2937' }}>
        <div className="container-wide mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-thin text-white mb-4">Why Choose pgElephant?</h2>
            <p className="text-lg text-white mb-8">
              pgElephant is an independent open source project providing enterprise-grade PostgreSQL extensions and tools. 
              All releases are cryptographically signed, verified, and built from source on GitHub Actions.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {trustBar.map((item, i) => (
                <div key={i} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-base font-semibold text-white">
                  <item.icon className="w-6 h-6 text-cyan-400" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DownloadPage