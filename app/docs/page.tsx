'use client'

import React from 'react'
import { BookOpen, ArrowRight, Code, Download, ExternalLink, Play, Container, FileText } from 'lucide-react'
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
      docs: [
        { title: 'Getting Started', href: '/docs/rale/getting-started', type: 'Guide' },
        { title: 'Docker Setup', href: '/docs/rale/docker', type: 'Tutorial' },
        { title: 'API Reference', href: '/docs/rale/api', type: 'Reference' }
      ]
    },
    {
      id: 'ram',
      name: 'RAM',
      title: 'Resilient Adaptive Manager',
      icon: '/ico/RAM_HD.ico',
      bg: { from: palette.slate, via: palette.navy, to: palette.slate },
      docs: [
        { title: 'Getting Started', href: '/docs/ram/getting-started', type: 'Guide' },
        { title: 'Docker Setup', href: '/docs/ram/docker', type: 'Tutorial' },
        { title: 'API Reference', href: '/docs/ram/api', type: 'Reference' }
      ]
    },
    {
      id: 'fauxdb',
      name: 'FauxDB',
      title: 'MongoDB Compatible Document Database',
      icon: '/ico/FauxDB_HD.ico',
      bg: { from: palette.navyDeep, via: palette.navy, to: palette.slate },
      docs: [
        { title: 'Getting Started', href: '/docs/fauxdb/getting-started', type: 'Guide' },
        { title: 'Docker Setup', href: '/docs/fauxdb/docker', type: 'Tutorial' },
        { title: 'API Reference', href: '/docs/fauxdb/api', type: 'Reference' }
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
            <h1 className="text-4xl md:text-5xl text-white mb-6">
              Documentation
            </h1>
            <p className="text-xl mb-8 leading-relaxed" style={{ color: palette.gray100 }}>
              Complete guides and references for pgElephant products.
            </p>
          </div>
        </div>
      </div>

      {/* Products Documentation */}
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


                  {/* Documentation Links */}
                  <div className="space-y-3">
                    {product.docs.map((doc, index) => (
                      <Link
                        key={index}
                        href={doc.href}
                        className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex items-center">
                          {(() => {
                            const IconComponent = getDocIcon(doc.type)
                            return <IconComponent className="w-4 h-4 mr-3 text-gray-500" />
                          })()}
                          <div>
                            <span className="text-xs text-gray-900">
                              {doc.title}
                            </span>
                            <span className="ml-2 text-xs text-gray-500">
                              {doc.type}
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

export default DocsPage