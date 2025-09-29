'use client'

import React from 'react'
import { Download, ArrowRight, Package, Code, Database, Server, Terminal, Github, FileText, Play, Shield, CheckCircle, Clock, Users, Star, Zap, Globe, Monitor, Smartphone, Tablet } from 'lucide-react'
import Link from 'next/link'

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
    <div className="pt-16">
      {/* Hero Section with elegant gradient background - same as main page */}
      <div 
        className="relative overflow-hidden"
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
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)',
              backgroundSize: '48px 48px'
            }}
          />
        </div>

        <div className="container-wide py-20 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl text-white mb-6 drop-shadow-lg font-bold">
              Download
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed text-white/90 drop-shadow-md max-w-4xl mx-auto">
              Get the latest versions of pgElephant products for your platform. Professional-grade PostgreSQL solutions ready for production.
            </p>
            
            {/* Download Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
              {downloadStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-white drop-shadow-sm">{stat.value}</div>
                  <div className="text-sm text-white/80 drop-shadow-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Download Options */}
      <div className="bg-white py-20">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow duration-200"
                >
                  {/* Product Header */}
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 flex items-center justify-center mr-4 bg-gray-50 rounded-lg">
                      <img 
                        src={product.icon} 
                        alt={`${product.name} icon`}
                        className="w-14 h-14 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl text-gray-900 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {product.title}
                      </p>
                    </div>
                  </div>

                  {/* Download Links */}
                  <div className="space-y-3">
                    {product.downloads.map((download, index) => (
                      <Link
                        key={index}
                        href={download.href}
                        className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex items-center">
                          {(() => {
                            const IconComponent = getDownloadIcon(download.type)
                            return <IconComponent className="w-4 h-4 mr-3 text-gray-500" />
                          })()}
                          <div>
                            <span className="text-xs text-gray-900 whitespace-nowrap">
                              {download.title}
                            </span>
                            <span className="ml-2 text-xs text-gray-500">
                              {download.type}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </Link>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex gap-2">
                      <Link
                        href={`/${product.id}`}
                        className="flex-1 text-center py-2 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-xs"
                      >
                        Learn More
                      </Link>
                      <Link
                        href="/docs"
                        className="flex-1 text-center py-2 px-4 rounded-lg text-white transition-colors text-xs"
                        style={{ backgroundColor: palette.cyan }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = palette.cyanDeep}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = palette.cyan}
                      >
                        Documentation
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Section */}
      <div 
        className="py-20"
        style={{ 
          background: `linear-gradient(135deg, ${palette.gray100}, ${palette.white})`
        }}
      >
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl text-gray-900 mb-6">
              Quick Start
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Get up and running with pgElephant in minutes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8" style={{ color: palette.cyan }} />
                </div>
                <h3 className="text-lg text-gray-900 mb-2">
                  Download
                </h3>
                <p className="text-gray-600">
                  Get the latest binaries or source code.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4">
                  <Terminal className="w-8 h-8" style={{ color: palette.teal }} />
                </div>
                <h3 className="text-lg text-gray-900 mb-2">
                  Install
                </h3>
                <p className="text-gray-600">
                  Follow our installation guides.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8" style={{ color: palette.orange }} />
                </div>
                <h3 className="text-lg text-gray-900 mb-2">
                  Run
                </h3>
                <p className="text-gray-600">
                  Start using pgElephant products.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-white transition-all duration-200 shadow-lg"
                style={{ backgroundColor: palette.orange }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = palette.orangeDark}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = palette.orange}
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DownloadPage