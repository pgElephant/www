'use client'

import React from 'react'
import { Download, ArrowRight, Package, Code, Database, Server, Terminal, Github, FileText, Play, Shield, CheckCircle, Clock, Users, Star, Zap, Globe, Monitor, Smartphone, Tablet, Lock, Briefcase, Award, Globe2, Loader2, Crown, Network, Layers, Activity, Cpu } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Colors from pgElephant icon (darker variants)
const palette = {
  iconTeal: '#025A6B',
  iconTealLight: '#036B7D',
  iconTealMedium: '#045E70',
  iconTealDark: '#054A56',
  // Supporting colors
  navy: '#1E293B',
  navyDeep: '#0F172A',
  slate: '#334155',
  cyan: '#0EA5E9',
  cyanDeep: '#0284C7',
  teal: '#14B8A6',
  tealDeep: '#0D9488',
  gray100: '#F8FAFC',
  gray300: '#CBD5E1',
  white: '#FFFFFF',
  orange: '#F97316',
  orangeDark: '#EA580C'
}

const trustBadges = [
  { label: 'Open Source', icon: Github, href: 'https://github.com/pgElephant' },
  { label: 'Verified Releases', icon: Shield, href: '/docs/security' },
  { label: 'Enterprise Support', icon: CheckCircle, href: '/contact' },
  { label: 'Secure Downloads', icon: Lock, href: '/docs/security' },
]

const trustBar = [
  { icon: Briefcase, label: 'Enterprise-Ready' },
  { icon: Lock, label: 'Cryptographically Signed' },
  { icon: Award, label: 'Verified Releases' },
  { icon: Globe2, label: 'Global CDN Delivery' },
]

const unifiedHeroGradient = 'linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)'

// Custom icon components
const PgbalancerIcon = () => (
  <div className="relative w-12 h-12 flex items-center justify-center">
    <Database className="w-8 h-8 text-cyan-400" />
    <Loader2 className="w-4 h-4 text-green-400 absolute -top-1 -right-1 animate-spin" />
    <Zap className="w-3 h-3 text-yellow-400 absolute -bottom-1 -left-1" />
  </div>
)

const PgraftIcon = () => (
  <div className="relative w-12 h-12 flex items-center justify-center">
    <Database className="w-7 h-7 text-blue-400" />
    <Crown className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1" />
    <Network className="w-3 h-3 text-green-400 absolute -bottom-1 -left-1" />
    <Shield className="w-3 h-3 text-purple-400 absolute -bottom-1 -right-1" />
  </div>
)

const FauxDbIcon = () => (
  <div className="relative w-12 h-12 flex items-center justify-center">
    <Database className="w-7 h-7 text-emerald-400" />
    <FileText className="w-4 h-4 text-orange-400 absolute -top-1 -right-1" />
    <Layers className="w-3 h-3 text-blue-400 absolute -bottom-1 -left-1" />
    <Activity className="w-3 h-3 text-red-400 absolute -bottom-1 -right-1" />
  </div>
)

const RaleIcon = () => (
  <div className="relative w-12 h-12 flex items-center justify-center">
    <Users className="w-7 h-7 text-indigo-400" />
    <Crown className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1" />
    <Network className="w-3 h-3 text-green-400 absolute -bottom-1 -left-1" />
    <Activity className="w-3 h-3 text-cyan-400 absolute -bottom-1 -right-1" />
  </div>
)

const RamIcon = () => (
  <div className="relative w-12 h-12 flex items-center justify-center">
    <Server className="w-7 h-7 text-cyan-400" />
    <Cpu className="w-4 h-4 text-green-400 absolute -top-1 -right-1" />
    <Activity className="w-3 h-3 text-orange-400 absolute -bottom-1 -left-1" />
    <Shield className="w-3 h-3 text-purple-400 absolute -bottom-1 -right-1" />
  </div>
)

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
    { label: 'Supported Platforms', value: '5', icon: Globe, color: 'text-purple-600' },
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
      id: 'ram',
      name: 'RAM',
      title: 'Resilient Adaptive Manager',
      icon: 'ram-custom',
      features: [
        'Automatic Failover: Zero-downtime failover with sub-second detection',
        'Leader Election: Raft-based consensus for reliable leader selection',
        'Distributed Consensus: Multi-node coordination with split-brain prevention',
        'Real-time Monitoring: Prometheus metrics and Grafana dashboards',
        'Enterprise Security: Token-based auth, SSL/TLS, rate limiting',
        'Cloud-Native: Docker, Kubernetes, and Helm chart support',
      ],
      details: '/ram/enterprise',
      downloads: [
        { title: 'Linux Binary', href: '/download/ram', type: 'Binary' },
        { title: 'Source Code', href: 'https://github.com/pgelephant/ram', type: 'Source' },
        { title: 'Docker Image', href: '/download/ram', type: 'Docker' }
      ]
    },
    {
      id: 'pgraft',
      name: 'pgraft',
      title: 'PostgreSQL Raft Consensus Extension',
      icon: 'pgraft-custom',
      featured: true,
      features: [
        'Raft Consensus Protocol: Implements the Raft algorithm for distributed consensus',
        'Automatic Leader Election: Seamless leader election and failover',
        'Log Replication: Consistent log replication across cluster nodes',
        'High Availability: Fault-tolerant cluster with automatic recovery',
        'Zero-Downtime Operations: Non-disruptive cluster operations',
        "Go Integration: Leverages Go's robust Raft implementation",
      ],
      details: '/pgraft/enterprise',
      downloads: [
        { title: 'Linux Binary', href: '/download/pgraft', type: 'Binary' },
        { title: 'Source Code', href: 'https://github.com/pgelephant/pgraft', type: 'Source' },
        { title: 'Docker Image', href: '/download/pgraft', type: 'Docker' }
      ]
    },
    {
      id: 'fauxdb',
      name: 'FauxDB',
      title: 'MongoDB Compatible Document Database',
      icon: 'fauxdb-custom',
      features: [
        '100% MongoDB Compatibility: Full wire protocol support with mongosh compatibility',
        'High Performance: Built in Rust for superior speed and memory efficiency',
        'Advanced Features: Transactions, geospatial, aggregation pipelines',
        'Pure PostgreSQL Backend: Native JSONB support, no external dependencies',
        'Production Ready: Enterprise-grade monitoring, logging, and configuration',
        'Docker Support: Comprehensive Docker support for dev, test, and production',
      ],
      details: '/fauxdb/enterprise',
      downloads: [
        { title: 'Linux Binary', href: '/download/fauxdb', type: 'Binary' },
        { title: 'Source Code', href: 'https://github.com/pgelephant/fauxdb', type: 'Source' },
        { title: 'Docker Image', href: '/download/fauxdb', type: 'Docker' }
      ]
    },
    {
      id: 'pgbalancer',
      name: 'pgbalancer',
      title: 'Connection Pooling & Load Balancing for PostgreSQL',
      icon: 'pgbalancer-custom',
      features: [
        'High Performance: Enterprise-grade connection pooling with minimal latency',
        'Load Balancing: Intelligent query distribution across multiple PostgreSQL nodes',
        'YAML Configuration: Modern, human-readable configuration format',
        'REST API: Professional control interface with bctl client utility',
        'Health Monitoring: Real-time backend health checks and failover',
        'Zero Dependencies: Self-contained with no external coordination services',
      ],
      details: '/pgbalancer/enterprise',
      downloads: [
        { title: 'Linux Binary', href: '/download/pgbalancer', type: 'Binary' },
        { title: 'Source Code', href: 'https://github.com/pgelephant/pgbalancer', type: 'Source' },
        { title: 'Docker Image', href: '/download/pgbalancer', type: 'Docker' }
      ]
    },
    {
      id: 'rale',
      name: 'RALE',
      title: 'Resilient Adaptive Leader Election',
      icon: 'rale-custom',
      features: [
        'Distributed Leader Election: Reliable, adaptive leader selection',
        'Split-Brain Prevention: Ensures cluster consistency',
        'Production Proven: Used in mission-critical deployments',
      ],
      details: '/rale/enterprise',
      downloads: [
        { title: 'Linux Binary', href: '/download/rale', type: 'Binary' },
        { title: 'Source Code', href: 'https://github.com/pgelephant/rale', type: 'Source' },
        { title: 'Docker Image', href: '/download/rale', type: 'Docker' }
      ]
    },
  ]

  return (
    <div className="pt-0">
      {/* Unified Professional Hero */}
      <section 
        className="relative text-center overflow-hidden"
        style={{ 
          backgroundImage: 'url(/hero-bg-technical.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative'
        }}
      >
        {/* Additional overlay for better text contrast */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(15, 15, 35, 0.3) 0%, rgba(26, 26, 46, 0.4) 50%, rgba(83, 52, 131, 0.2) 100%)'
          }}
        />

        <div className="container-extra-wide mx-auto relative z-10 pt-20 pb-16">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-thin text-white mb-4 tracking-tight drop-shadow-lg">Download Center</h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto drop-shadow-lg">
              Official, production-grade releases. Secure, fast, and trusted by global enterprises.
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

      {/* Professional Download Table/List */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)' }}>
        <div className="container-wide mx-auto">
          <div className="max-w-5xl mx-auto">
            <table className="w-full text-left border-separate border-spacing-y-0">
              <thead>
                <tr className="text-white text-sm uppercase tracking-wider font-semibold">
                  <th className="py-2">Product</th>
                  <th className="py-2">Description</th>
                  <th className="py-2">Downloads</th>
                  <th className="py-2">Release Notes</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, idx) => (
                  <tr
                    key={product.id}
                    className={
                      `transition ` +
                      (idx % 2 === 0 ? 'bg-white/10 backdrop-blur-sm' : 'bg-white/5 backdrop-blur-sm') +
                      (product.featured ? ' ring-2 ring-cyan-400/40' : '') +
                      ' hover:bg-white/20'
                    }
                  >
                    <td className="py-3 px-2 align-top whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {product.icon === 'pgbalancer-custom' ? (
                          <div className="w-12 h-12 flex items-center justify-center rounded-lg border border-white/20 bg-white/5">
                            <PgbalancerIcon />
                          </div>
                        ) : product.icon === 'pgraft-custom' ? (
                          <div className="w-12 h-12 flex items-center justify-center rounded-lg border border-white/20 bg-white/5">
                            <PgraftIcon />
                          </div>
                        ) : product.icon === 'fauxdb-custom' ? (
                          <div className="w-12 h-12 flex items-center justify-center rounded-lg border border-white/20 bg-white/5">
                            <FauxDbIcon />
                          </div>
                        ) : product.icon === 'rale-custom' ? (
                          <div className="w-12 h-12 flex items-center justify-center rounded-lg border border-white/20 bg-white/5">
                            <RaleIcon />
                          </div>
                        ) : product.icon === 'ram-custom' ? (
                          <div className="w-12 h-12 flex items-center justify-center rounded-lg border border-white/20 bg-white/5">
                            <RamIcon />
                          </div>
                        ) : (
                          <Image src={product.icon} alt={`${product.name} icon`} width={48} height={48} className="w-12 h-12 object-contain rounded-lg border border-white/20" />
                        )}
                        <div>
                          <div className="font-bold text-lg text-white flex items-center gap-2">
                            {product.name}
                            {product.featured && (
                              <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-thin px-2 py-0.5 rounded animate-pulse border border-white/30">New</span>
                            )}
                            <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-thin px-2 py-0.5 rounded border border-white/30">Stable</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 align-top text-sm text-white max-w-xs">
                      <div className="flex flex-col h-full min-h-[180px]">
                        <div className="flex-1">
                          <div className="font-semibold text-base text-white mb-1">{product.title}</div>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 list-disc list-inside mb-4">
                            {product.features && product.features.map((feature, i) => (
                              <li key={i} className="text-white text-xs leading-snug font-medium">{feature}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex items-end mt-auto">
                          <Link href={product.details} className="inline-block mt-2 text-xs font-semibold text-blue-400 hover:underline hover:text-blue-300 transition">View Enterprise Details</Link>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 align-top">
                      <div className="flex flex-col gap-2">
                        {product.downloads.map((download, index) => (
                          <Link key={index} href={download.href} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 hover:border-blue-400 hover:bg-white/10 transition-colors text-sm font-bold">
                            {(() => {
                              const IconComponent = getDownloadIcon(download.type)
                              return <IconComponent className="w-4 h-4 text-blue-400" />
                            })()}
                            {download.title}
                            <span className="ml-2 text-xs text-blue-400 font-bold">{download.type}</span>
                          </Link>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-2 align-top">
                      <a href={`https://github.com/pgElephant/${product.id}/releases`} target="_blank" rel="noopener" className="text-xs text-blue-400 hover:underline font-semibold">View</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-24 border-t border-b border-gray-100 relative overflow-hidden" style={{ background: unifiedHeroGradient }}>
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
      <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)' }}>
        <div className="container-wide mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-thin text-white mb-4">Why Download from pgElephant?</h2>
            <p className="text-lg text-white mb-8">All downloads are cryptographically signed, verified, and scanned for security. We provide open source, enterprise-grade software trusted by leading organizations worldwide.</p>
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