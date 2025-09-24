'use client'

import React from 'react'
import { ArrowRight, Download, BookOpen, Code, Server, Zap, Shield, Globe, Database, Cpu, Activity } from 'lucide-react'
import Link from 'next/link'

// Same palette as home page
const palette = {
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

const FauxDbPage = () => {
  // Function to get appropriate icon for feature type
  const getFeatureIcon = (type: string) => {
    switch (type) {
      case 'Getting Started':
        return BookOpen
      case 'Download':
        return Download
      case 'API Reference':
        return Code
      case 'Docker':
        return Server
      default:
        return BookOpen
    }
  }

  const features = [
    {
      id: 'compatibility',
      name: 'MongoDB Compatible',
      title: '100% Wire Protocol Support',
      icon: '/ico/FauxDB_HD.ico',
      bg: { from: palette.navy, via: palette.slate, to: palette.navy },
      links: [
        { title: 'Getting Started', href: '/docs/fauxdb/getting-started', type: 'Getting Started' },
        { title: 'Download', href: '/download', type: 'Download' },
        { title: 'Docker Setup', href: '/docs/fauxdb/docker', type: 'Docker' }
      ]
    },
    {
      id: 'performance',
      name: 'High Performance',
      title: 'Rust-Powered Database Engine',
      icon: '/ico/FauxDB_HD.ico',
      bg: { from: palette.slate, via: palette.navy, to: palette.slate },
      links: [
        { title: 'Getting Started', href: '/docs/fauxdb/getting-started', type: 'Getting Started' },
        { title: 'Configuration', href: '/docs/fauxdb/config', type: 'API Reference' },
        { title: 'Benchmarks', href: '/docs/fauxdb/benchmarks', type: 'API Reference' }
      ]
    },
    {
      id: 'features',
      name: 'Advanced Features',
      title: 'Transactions & Geospatial',
      icon: '/ico/FauxDB_HD.ico',
      bg: { from: palette.navyDeep, via: palette.navy, to: palette.slate },
      links: [
        { title: 'Getting Started', href: '/docs/fauxdb/getting-started', type: 'Getting Started' },
        { title: 'Transactions', href: '/docs/fauxdb/transactions', type: 'API Reference' },
        { title: 'Aggregation', href: '/docs/fauxdb/aggregation', type: 'API Reference' }
      ]
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section with gradient background */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${palette.navy}, ${palette.slate}, ${palette.navy})`
        }}
      >
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
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mr-6">
                <img 
                  src="/ico/FauxDB_HD.ico" 
                  alt="FauxDB icon"
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl text-white mb-2">
                  FauxDB
                </h1>
                <p className="text-xl text-gray-300">
                  MongoDB Compatible Document Database
                </p>
              </div>
            </div>
            <p className="text-xl mb-8 leading-relaxed" style={{ color: palette.gray100 }}>
              High-performance MongoDB-compatible database built in Rust.
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-20">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow duration-200"
                >
                  {/* Feature Header */}
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 flex items-center justify-center mr-4 bg-gray-50 rounded-lg">
                      <img 
                        src={feature.icon} 
                        alt={`${feature.name} icon`}
                        className="w-14 h-14 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl text-gray-900 mb-1">
                        {feature.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {feature.title}
                      </p>
                    </div>
                  </div>

                  {/* Feature Links */}
                  <div className="space-y-3">
                    {feature.links.map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex items-center">
                          {(() => {
                            const IconComponent = getFeatureIcon(link.type)
                            return <IconComponent className="w-4 h-4 mr-3 text-gray-500" />
                          })()}
                          <div>
                            <span className="text-xs text-gray-900 whitespace-nowrap">
                              {link.title}
                            </span>
                            <span className="ml-2 text-xs text-gray-500">
                              {link.type}
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
                        href="/docs/fauxdb"
                        className="flex-1 text-center py-2 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-xs"
                      >
                        Learn More
                      </Link>
                      <Link
                        href="/download"
                        className="flex-1 text-center py-2 px-4 rounded-lg text-white transition-colors text-xs"
                        style={{ backgroundColor: palette.cyan }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = palette.cyanDeep}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = palette.cyan}
                      >
                        Download
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div 
        className="py-20"
        style={{ 
          background: `linear-gradient(135deg, ${palette.gray100}, ${palette.white})`
        }}
      >
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl text-gray-900 mb-6">
              Production Ready
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Enterprise-grade MongoDB alternative with PostgreSQL reliability.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4">
                  <Database className="w-8 h-8" style={{ color: palette.cyan }} />
                </div>
                <h3 className="text-lg text-gray-900 mb-2">
                  PostgreSQL Backend
                </h3>
                <p className="text-gray-600">
                  Native JSONB support with ACID guarantees.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4">
                  <Cpu className="w-8 h-8" style={{ color: palette.teal }} />
                </div>
                <h3 className="text-lg text-gray-900 mb-2">
                  Rust Performance
                </h3>
                <p className="text-gray-600">
                  Memory-safe, high-performance database engine.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8" style={{ color: palette.orange }} />
                </div>
                <h3 className="text-lg text-gray-900 mb-2">
                  Full Compatibility
                </h3>
                <p className="text-gray-600">
                  Drop-in replacement with mongosh support.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <Link
                href="/docs/fauxdb"
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

export default FauxDbPage