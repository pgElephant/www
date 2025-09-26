'use client'

import React from 'react'
import { BookOpen, ArrowRight, Code, Download, ExternalLink, Play, Container, FileText } from 'lucide-react'
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

const DocsPage = () => {
  // Function to get appropriate icon for documentation type
  const getDocIcon = (type: string) => {
    switch (type) {
      case 'Guide':
        return BookOpen
      case 'Tutorial':
        return Container
      case 'Reference':
        return FileText
      default:
        return BookOpen
    }
  }

  const products = [
    {
      id: 'rale',
      name: 'RALE',
      title: 'Resilient Adaptive Leader Election',
      icon: '/ico/RALE_HD.ico',
      bg: { from: palette.navy, via: palette.slate, to: palette.navy },
      description: 'Distributed consensus and key-value store system for high availability',
      docs: [
        { title: 'Getting Started', href: '/docs/rale/getting-started', type: 'Guide', description: 'Install and configure RALE components' },
        { title: 'librale Documentation', href: '/docs/rale/librale', type: 'Reference', description: 'Core C library API reference' },
        { title: 'raled Documentation', href: '/docs/rale/raled', type: 'Reference', description: 'Daemon process configuration and management' },
        { title: 'ralectrl Documentation', href: '/docs/rale/ralectrl', type: 'Reference', description: 'Command-line interface reference' },
        { title: 'Architecture Guide', href: '/docs/rale/architecture', type: 'Guide', description: 'Understanding RALE architecture and design' },
        { title: 'API Reference', href: '/docs/rale/api', type: 'Reference', description: 'Complete API documentation' },
        { title: 'Examples', href: '/docs/rale/examples', type: 'Tutorial', description: 'Code examples and use cases' },
        { title: 'Troubleshooting', href: '/docs/rale/troubleshooting', type: 'Guide', description: 'Common issues and solutions' }
      ]
    },
    {
      id: 'ram',
      name: 'RAM',
      title: 'Resilient Adaptive Manager',
      icon: '/ico/RAM_HD.ico',
      bg: { from: palette.slate, via: palette.navy, to: palette.slate },
      description: 'PostgreSQL clustering solution with automatic failover and Raft consensus',
      docs: [
        { title: 'Getting Started', href: '/docs/ram/getting-started', type: 'Guide', description: 'Install and configure RAM components' },
        { title: 'pgraft Documentation', href: '/docs/ram/pgraft', type: 'Reference', description: 'PostgreSQL extension for Raft consensus' },
        { title: 'ramd Documentation', href: '/docs/ram/ramd', type: 'Reference', description: 'Cluster management daemon' },
        { title: 'ramctrl Documentation', href: '/docs/ram/ramctrl', type: 'Reference', description: 'Command-line control utility' },
        { title: 'Docker Setup', href: '/docs/ram/docker', type: 'Tutorial', description: 'Containerized deployment guide' },
        { title: 'Kubernetes', href: '/docs/ram/kubernetes', type: 'Tutorial', description: 'Kubernetes deployment with Helm' },
        { title: 'Configuration', href: '/docs/ram/configuration', type: 'Guide', description: 'Advanced configuration options' },
        { title: 'Monitoring', href: '/docs/ram/monitoring', type: 'Guide', description: 'Prometheus metrics and monitoring' },
        { title: 'API Reference', href: '/docs/ram/api', type: 'Reference', description: 'REST API documentation' },
        { title: 'Troubleshooting', href: '/docs/ram/troubleshooting', type: 'Guide', description: 'Common issues and solutions' }
      ]
    },
    {
      id: 'fauxdb',
      name: 'FauxDB',
      title: 'MongoDB Compatible Document Database',
      icon: '/ico/FauxDB_HD.ico',
      bg: { from: palette.navyDeep, via: palette.navy, to: palette.slate },
      description: 'MongoDB-compatible document database built in Rust with PostgreSQL backend',
      docs: [
        { title: 'Getting Started', href: '/docs/fauxdb/getting-started', type: 'Guide', description: 'Install and configure FauxDB' },
        { title: 'Docker Setup', href: '/docs/fauxdb/docker', type: 'Tutorial', description: 'Containerized deployment guide' },
        { title: 'Configuration', href: '/docs/fauxdb/configuration', type: 'Guide', description: 'Configuration file reference' },
        { title: 'MongoDB Compatibility', href: '/docs/fauxdb/mongodb-compatibility', type: 'Guide', description: 'MongoDB wire protocol support' },
        { title: 'API Reference', href: '/docs/fauxdb/api', type: 'Reference', description: 'Complete API documentation' },
        { title: 'Performance Tuning', href: '/docs/fauxdb/performance', type: 'Guide', description: 'Optimization and tuning guide' },
        { title: 'Security', href: '/docs/fauxdb/security', type: 'Guide', description: 'Authentication and authorization' },
        { title: 'Troubleshooting', href: '/docs/fauxdb/troubleshooting', type: 'Guide', description: 'Common issues and solutions' }
      ]
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section with gradient background */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${palette.iconTealDark}, ${palette.iconTeal}, ${palette.iconTealLight})`
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
            <h1 className="text-4xl md:text-5xl text-white mb-6">
              Documentation
            </h1>
            <p className="text-xl mb-8 leading-relaxed" style={{ color: palette.gray100 }}>
              Complete guides and references for pgElephant products. Professional documentation following enterprise standards.
            </p>
            
            {/* Documentation Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">3</div>
                <div className="text-sm" style={{ color: palette.gray100 }}>Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">26</div>
                <div className="text-sm" style={{ color: palette.gray100 }}>Documentation Pages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-sm" style={{ color: palette.gray100 }}>Open Source</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Overview */}
      <div 
        className="py-16"
        style={{ 
          background: `linear-gradient(135deg, ${palette.gray100}, ${palette.white})`
        }}
      >
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Documentation Structure
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Our documentation follows enterprise standards with comprehensive guides, API references, and tutorials for each product.
            </p>
            
            {/* Documentation Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8" style={{ color: palette.cyan }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Guides</h3>
                <p className="text-gray-600 text-sm">
                  Step-by-step guides for installation, configuration, and getting started
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8" style={{ color: palette.teal }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Reference</h3>
                <p className="text-gray-600 text-sm">
                  Complete API documentation, function references, and configuration options
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4">
                  <Container className="w-8 h-8" style={{ color: palette.orange }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Tutorials</h3>
                <p className="text-gray-600 text-sm">
                  Hands-on tutorials for Docker, Kubernetes, and advanced deployment scenarios
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Documentation */}
      <div className="bg-white py-20">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Product Documentation
            </h2>
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


                  {/* Product Description */}
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Documentation Links */}
                  <div className="space-y-3">
                    {product.docs.map((doc, index) => (
                      <Link
                        key={index}
                        href={doc.href}
                        className="block p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start">
                            {(() => {
                              const IconComponent = getDocIcon(doc.type)
                              return <IconComponent className="w-4 h-4 mr-3 text-gray-500 mt-0.5 flex-shrink-0" />
                            })()}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-gray-900">
                                  {doc.title}
                                </span>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                                  {doc.type}
                                </span>
                              </div>
                              <p className="text-xs text-gray-600 leading-relaxed">
                                {doc.description}
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0 ml-2" />
                        </div>
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
                        href="/download"
                        className="flex-1 text-center py-2 px-4 rounded-lg text-white transition-colors text-xs"
                        style={{ backgroundColor: palette.cyan }}
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

      {/* Quick Start Section */}
      <div 
        className="py-20"
        style={{ 
          background: `linear-gradient(135deg, ${palette.gray100}, ${palette.white})`
        }}
      >
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Download
                </h3>
                <p className="text-gray-600">
                  Get the latest version of pgElephant products.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8" style={{ color: palette.teal }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Install
                </h3>
                <p className="text-gray-600">
                  Follow our installation guides for your platform.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="w-8 h-8" style={{ color: palette.orange }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Deploy
                </h3>
                <p className="text-gray-600">
                  Deploy to production with confidence.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <Link
                href="/download"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-white transition-all duration-200 shadow-lg"
                style={{ backgroundColor: palette.orange }}
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="bg-white py-20 border-t border-gray-200">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Additional Resources
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">GitHub</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Source code, issues, and contributions
                </p>
                <Link
                  href="https://github.com/pgElephant"
                  className="text-sm font-medium"
                  style={{ color: palette.cyan }}
                >
                  View on GitHub →
                </Link>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Community</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Join our community for support
                </p>
                <Link
                  href="/community"
                  className="text-sm font-medium"
                  style={{ color: palette.cyan }}
                >
                  Join Community →
                </Link>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Blog</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Latest updates and tutorials
                </p>
                <Link
                  href="/blog"
                  className="text-sm font-medium"
                  style={{ color: palette.cyan }}
                >
                  Read Blog →
                </Link>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Support</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get help and technical support
                </p>
                <Link
                  href="/contact"
                  className="text-sm font-medium"
                  style={{ color: palette.cyan }}
                >
                  Contact Support →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocsPage