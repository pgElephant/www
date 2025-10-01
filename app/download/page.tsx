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
    { name: 'Linux', icon: Terminal, description: 'Ubuntu 20.04+, CentOS 8+, Debian 11+' },
    { name: 'macOS', icon: Monitor, description: 'macOS 11.0+ (Intel & Apple Silicon)' },
    { name: 'Windows', icon: Monitor, description: 'Windows 10+ (WSL2 recommended)' },
    { name: 'Docker', icon: Server, description: 'All Docker-supported platforms' },
    { name: 'Kubernetes', icon: Server, description: 'Any K8s cluster (1.20+)' }
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
      id: 'rale',
      name: 'RALE',
      title: 'Resilient Adaptive Leader Election',
      icon: '/ico/RALE_HD.ico',
      bg: { from: palette.navy, via: palette.slate, to: palette.navy },
      downloads: [
        { title: 'Linux Binary', href: '/download/rale', type: 'Binary' },
        { title: 'Source Code', href: 'https://github.com/pgelephant/rale', type: 'Source' },
        { title: 'Docker Image', href: '/download/rale', type: 'Docker' }
      ]
    },
    {
      id: 'ram',
      name: 'RAM',
      title: 'Resilient Adaptive Manager',
      icon: '/ico/RAM_HD.ico',
      bg: { from: palette.slate, via: palette.navy, to: palette.slate },
      downloads: [
        { title: 'Linux Binary', href: '/download/ram', type: 'Binary' },
        { title: 'Source Code', href: 'https://github.com/pgelephant/ram', type: 'Source' },
        { title: 'Docker Image', href: '/download/ram', type: 'Docker' }
      ]
    },
    {
      id: 'fauxdb',
      name: 'FauxDB',
      title: 'MongoDB Compatible Document Database',
      icon: '/ico/FauxDB_HD.ico',
      bg: { from: palette.navyDeep, via: palette.navy, to: palette.slate },
      downloads: [
        { title: 'Linux Binary', href: '/download/fauxdb', type: 'Binary' },
        { title: 'Source Code', href: 'https://github.com/pgelephant/fauxdb', type: 'Source' },
        { title: 'Docker Image', href: '/download/fauxdb', type: 'Docker' }
      ]
    }
  ]

  return (
    <div className="pt-0">
      {/* Animated Professional Hero */}
      <section className="relative bg-gradient-to-br from-navy via-slate to-gray-900 py-28 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-orange-400/10 rounded-full blur-2xl animate-pulse" />
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-cyan-200/10 to-transparent" />
        </div>
        <div className="container-wide mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg tracking-tight">Download Center</h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto drop-shadow-md">
            Official, production-grade releases. Secure, fast, and trusted by global enterprises.
          </p>
          {/* Trust Bar */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {trustBar.map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 text-white border border-white/20 text-base font-medium shadow-sm">
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
                <span className="text-2xl font-bold text-white">{stat.value}</span>
                <span className="text-xs text-white/80">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Download Cards with Highlights and Release Notes */}
      <section className="bg-white py-24">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product) => (
              <div key={product.id} className="relative bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition p-8 flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 flex items-center justify-center mr-4 bg-gray-50 rounded-lg border border-gray-100">
                    <Image src={product.icon} alt={`${product.name} icon`} width={56} height={56} className="w-14 h-14 object-contain" priority />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                      {product.name}
                      <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded ml-2">Stable</span>
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">{product.title}</p>
                  </div>
                </div>
                {/* Product Highlights */}
                <ul className="mb-4 text-xs text-gray-700 space-y-1 list-disc list-inside">
                  <li>Open Source & Audited</li>
                  <li>Production-Ready</li>
                  <li>Multi-Platform Support</li>
                  <li>Enterprise Documentation</li>
                </ul>
                <div className="space-y-3 mb-4">
                  {product.downloads.map((download, index) => (
                    <Link key={index} href={download.href} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-cyan-400 hover:bg-cyan-50 transition-colors group">
                      <div className="flex items-center">
                        {(() => {
                          const IconComponent = getDownloadIcon(download.type)
                          return <IconComponent className="w-4 h-4 mr-3 text-cyan-600" />
                        })()}
                        <span className="text-sm text-gray-900 font-medium whitespace-nowrap">{download.title}</span>
                        <span className="ml-2 text-xs text-gray-500">{download.type}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-cyan-600 transition-colors" />
                    </Link>
                  ))}
                </div>
                <div className="flex gap-2 mt-auto">
                  <Link href={`/${product.id}`} className="flex-1 text-center py-2 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-xs font-semibold">Learn More</Link>
                  <Link href="/docs" className="flex-1 text-center py-2 px-4 rounded-lg text-white transition-colors text-xs font-semibold" style={{ backgroundColor: palette.cyan }} onMouseEnter={e => e.currentTarget.style.backgroundColor = palette.cyanDeep} onMouseLeave={e => e.currentTarget.style.backgroundColor = palette.cyan}>Documentation</Link>
                </div>
                {/* Release Notes Link */}
                <div className="mt-4 text-right">
                  <a href={`https://github.com/pgElephant/${product.id}/releases`} target="_blank" rel="noopener" className="text-xs text-cyan-700 hover:underline">View Release Notes</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white border-t border-b border-gray-100">
        <div className="container-wide mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Quick Start</h2>
            <p className="text-lg text-gray-600 mb-12 leading-relaxed">Get up and running with pgElephant in minutes. Choose your preferred installation method below.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {installationMethods.map((method, i) => (
                <div key={i} className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
                  <method.icon className="w-10 h-10 mb-3 text-cyan-600" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-500 text-sm mb-3">{method.description}</p>
                  <ol className="text-left text-xs text-gray-700 space-y-1 list-decimal list-inside">
                    {method.steps.map((step, j) => (
                      <li key={j}>{step}</li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
            <Link href="/docs" className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-white transition-all duration-200 shadow-lg text-lg font-semibold" style={{ backgroundColor: palette.orange }} onMouseEnter={e => e.currentTarget.style.backgroundColor = palette.orangeDark} onMouseLeave={e => e.currentTarget.style.backgroundColor = palette.orange}>
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
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Why Download from pgElephant?</h2>
            <p className="text-lg text-gray-600 mb-8">All downloads are cryptographically signed, verified, and scanned for security. We provide open source, enterprise-grade software trusted by leading organizations worldwide.</p>
            <div className="flex flex-wrap justify-center gap-6">
              {trustBar.map((item, i) => (
                <div key={i} className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-gray-200 shadow-sm text-base font-medium text-gray-900">
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