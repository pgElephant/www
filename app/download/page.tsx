'use client'

import React from 'react'
import { Download, ArrowRight, Package, Code, Database, Server, Terminal, Github, FileText, Play, Shield, CheckCircle, Clock, Users, Star, Zap, Globe, Monitor, Smartphone, Tablet, Lock, Briefcase, Award, Globe2 } from 'lucide-react'
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

const unifiedHeroGradient = 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)'

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
      icon: '/ico/RAM_HD.ico',
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
      icon: '/ico/pgsql_raft_leader_HD.ico',
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
      icon: '/ico/FauxDB_HD.ico',
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
      id: 'rale',
      name: 'RALE',
      title: 'Resilient Adaptive Leader Election',
      icon: '/ico/RALE_HD.ico',
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
      <section className="relative text-center overflow-hidden" style={{ background: unifiedHeroGradient }}>
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-orange-400/10 rounded-full blur-2xl animate-pulse" />
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-cyan-200/10 to-transparent" />
        </div>
        <div className="container-wide mx-auto relative z-10 py-28">
          <h1 className="text-5xl md:text-6xl font-thin text-white mb-4 drop-shadow-lg tracking-tight">Download Center</h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto drop-shadow-md">
            Official, production-grade releases. Secure, fast, and trusted by global enterprises.
          </p>
          {/* Trust Bar */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {trustBar.map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 text-white border border-white/20 text-base font-thin shadow-sm">
                <item.icon className="w-5 h-5" />
                {item.label}
              </div>
            ))}
          </div>
          {/* Download Stats */}
          <div className="flex flex-wrap justify-center gap-4">
            {downloadStats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center bg-white/10 px-6 py-4 rounded-xl min-w-[120px]">
                <stat.icon className={`w-7 h-7 mb-1 ${stat.color}`} />
                <span className="text-2xl font-thin text-white">{stat.value}</span>
                <span className="text-xs text-white/80">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Download Table/List */}
      <section className="bg-white py-24">
        <div className="container-wide mx-auto">
          <div className="max-w-5xl mx-auto">
            <table className="w-full text-left border-separate border-spacing-y-0">
              <thead>
                <tr className="text-gray-700 text-sm uppercase tracking-wider">
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
                      (idx % 2 === 0 ? 'bg-gray-50' : 'bg-white') +
                      (product.featured ? ' ring-2 ring-cyan-400/40' : '') +
                      ' hover:bg-cyan-50'
                    }
                  >
                    <td className="py-3 px-2 align-top whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Image src={product.icon} alt={`${product.name} icon`} width={40} height={40} className="w-10 h-10 object-contain rounded-lg border border-gray-200 shadow-sm" />
                        <div>
                          <div className="font-thin text-lg text-gray-900 flex items-center gap-2">
                            {product.name}
                            {product.featured && (
                              <span className="inline-block bg-cyan-100 text-cyan-700 text-xs font-thin px-2 py-0.5 rounded animate-pulse">New</span>
                            )}
                            <span className="inline-block bg-green-100 text-green-700 text-xs font-thin px-2 py-0.5 rounded">Stable</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 align-top text-sm text-gray-600 max-w-xs">
                      <div className="flex flex-col h-full min-h-[180px]">
                        <div className="flex-1">
                          <div className="font-thin text-base text-gray-900 mb-1">{product.title}</div>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 list-disc list-inside mb-4">
                            {product.features && product.features.map((feature, i) => (
                              <li key={i} className="text-gray-600 text-xs leading-snug">{feature}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex items-end mt-auto">
                          <Link href={product.details} className="inline-block mt-2 text-xs font-thin text-cyan-700 hover:underline hover:text-cyan-900 transition">View Enterprise Details</Link>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 align-top">
                      <div className="flex flex-col gap-2">
                        {product.downloads.map((download, index) => (
                          <Link key={index} href={download.href} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:border-cyan-400 hover:bg-cyan-100 transition-colors text-sm font-thin shadow-sm">
                            {(() => {
                              const IconComponent = getDownloadIcon(download.type)
                              return <IconComponent className="w-4 h-4 text-cyan-600" />
                            })()}
                            {download.title}
                            <span className="ml-2 text-xs text-gray-500">{download.type}</span>
                          </Link>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-2 align-top">
                      <a href={`https://github.com/pgElephant/${product.id}/releases`} target="_blank" rel="noopener" className="text-xs text-cyan-700 hover:underline">View</a>
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
            <h2 className="text-3xl md:text-4xl font-thin text-white mb-6 drop-shadow-lg">Quick Start</h2>
            <p className="text-lg text-white/90 mb-12 leading-relaxed drop-shadow-md">Get up and running with pgElephant in minutes. Choose your preferred installation method below.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {installationMethods.map((method, i) => (
                <div key={i} className="bg-white/10 rounded-xl shadow p-6 flex flex-col items-center border border-white/20 backdrop-blur-sm">
                  <method.icon className="w-10 h-10 mb-3 text-cyan-200" />
                  <h3 className="text-lg font-thin text-white mb-2 drop-shadow">{method.title}</h3>
                  <p className="text-white/80 text-sm mb-3">{method.description}</p>
                  <ol className="text-left text-xs text-white/80 space-y-1 list-decimal list-inside">
                    {method.steps.map((step, j) => (
                      <li key={j}>{step}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
            <Link href="/docs" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-white transition-all duration-200 shadow-lg text-lg font-thin bg-orange-500 hover:bg-orange-600 focus:bg-orange-600">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-gradient-to-br from-cyan-50 to-white border-t border-gray-100">
        <div className="container-wide mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-thin text-gray-900 mb-4">Why Download from pgElephant?</h2>
            <p className="text-lg text-gray-600 mb-8">All downloads are cryptographically signed, verified, and scanned for security. We provide open source, enterprise-grade software trusted by leading organizations worldwide.</p>
            <div className="flex flex-wrap justify-center gap-6">
              {trustBar.map((item, i) => (
                <div key={i} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-gray-200 shadow-sm text-base font-thin text-gray-900">
                  <item.icon className="w-6 h-6 text-cyan-600" />
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