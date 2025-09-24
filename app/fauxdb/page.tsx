import React from 'react'
import { Metadata } from 'next'
import { ArrowRight, Download, BookOpen, Code, Server, Zap, Shield, Globe, Database, Cpu, Activity, Layers, Rocket, Settings } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FauxDB - MongoDB Compatible Document Database | PostgreSQL Backend',
  description: 'High-performance MongoDB-compatible document database built in Rust with PostgreSQL backend. 100% wire protocol support with ACID compliance and better reliability.',
  keywords: [
    'MongoDB compatible', 'document database', 'PostgreSQL backend', 'Rust database',
    'FauxDB', 'MongoDB alternative', 'wire protocol', 'ACID compliance',
    'document store', 'NoSQL database', 'MongoDB API', 'database compatibility'
  ],
  openGraph: {
    title: 'FauxDB - MongoDB Compatible Document Database | PostgreSQL Backend',
    description: 'High-performance MongoDB-compatible document database built in Rust with PostgreSQL backend. 100% wire protocol support with ACID compliance.',
    type: 'website',
    url: 'https://www.pgelephant.com/fauxdb',
    images: [
      {
        url: '/ico/FauxDB_HD.ico',
        width: 512,
        height: 512,
        alt: 'FauxDB - MongoDB Compatible Database',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FauxDB - MongoDB Compatible Document Database | PostgreSQL Backend',
    description: 'High-performance MongoDB-compatible document database built in Rust with PostgreSQL backend.',
    images: ['/ico/FauxDB_HD.ico'],
  },
  alternates: {
    canonical: '/fauxdb',
  },
}

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

const FauxDbPage = () => {
  // Structured data for FauxDB
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "FauxDB - MongoDB Compatible Document Database",
    "description": "High-performance MongoDB-compatible document database built in Rust with PostgreSQL backend. 100% wire protocol support with ACID compliance and better reliability.",
    "applicationCategory": "DatabaseApplication",
    "operatingSystem": "Linux, macOS, Windows",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "MongoDB Compatibility",
      "100% Wire Protocol",
      "High Performance",
      "Rust-Powered Engine",
      "Advanced Features",
      "Transactions & Geospatial"
    ],
    "screenshot": "/ico/FauxDB_HD.ico",
    "author": {
      "@type": "Organization",
      "name": "pgElephant"
    },
    "url": "https://www.pgelephant.com/fauxdb"
  }

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
      icon: Layers,
      iconColor: '#10B981', // emerald-500
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
      icon: Rocket,
      iconColor: '#F59E0B', // amber-500
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
      icon: Settings,
      iconColor: '#8B5CF6', // violet-500
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
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mr-6">
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
                  className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow duration-200 flex flex-col h-full"
                >
                  {/* Feature Header */}
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 flex items-center justify-center mr-4 bg-gray-50 rounded-lg flex-shrink-0">
                      <feature.icon 
                        className="w-8 h-8" 
                        style={{ color: feature.iconColor }} 
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl text-gray-900 mb-1 font-semibold">
                        {feature.name}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {feature.title}
                      </p>
                    </div>
                  </div>

                  {/* Feature Links */}
                  <div className="space-y-3 flex-1 mb-6">
                    {feature.links.map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors group"
                      >
                        <div className="flex items-center min-w-0 flex-1">
                          {(() => {
                            const IconComponent = getFeatureIcon(link.type)
                            return <IconComponent className="w-4 h-4 mr-3 text-gray-500 flex-shrink-0" />
                          })()}
                          <div className="min-w-0 flex-1">
                            <span className="text-xs text-gray-900 block truncate">
                              {link.title}
                </span>
                            <span className="text-xs text-gray-500">
                              {link.type}
                </span>
              </div>
            </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0 ml-2" />
                      </Link>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="pt-6 border-t border-gray-200 mt-auto">
                    <div className="flex gap-2">
                      <Link
                        href="/docs/fauxdb"
                        className="flex-1 text-center py-2 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-xs font-medium"
                      >
                        Learn More
                      </Link>
                      <Link
                        href="/download"
                        className="flex-1 text-center py-2 px-4 rounded-lg text-white transition-colors text-xs font-medium hover:opacity-90"
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

      {/* Architecture Diagram */}
      <div className="bg-gray-50 py-20">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl text-gray-900 mb-6 text-center">
              FauxDB Architecture
            </h2>
            <p className="text-lg text-gray-600 mb-12 leading-relaxed text-center">
              MongoDB-compatible API with PostgreSQL backend and Rust-powered engine.
            </p>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              {/* Client Layer */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">MongoDB Client Layer</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 mb-4">
                      <h4 className="text-lg font-semibold text-blue-900 mb-2">MongoDB Drivers</h4>
                      <div className="space-y-2 text-sm text-blue-800">
                        <div className="bg-white rounded p-2">Node.js Driver</div>
                        <div className="bg-white rounded p-2">Python PyMongo</div>
                        <div className="bg-white rounded p-2">Java Driver</div>
                        <div className="bg-white rounded p-2">C# Driver</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 mb-4">
                      <h4 className="text-lg font-semibold text-green-900 mb-2">MongoDB Tools</h4>
                      <div className="space-y-2 text-sm text-green-800">
                        <div className="bg-white rounded p-2">mongosh</div>
                        <div className="bg-white rounded p-2">MongoDB Compass</div>
                        <div className="bg-white rounded p-2">Studio 3T</div>
                        <div className="bg-white rounded p-2">MongoDB Atlas</div>
                  </div>
                </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 mb-4">
                      <h4 className="text-lg font-semibold text-purple-900 mb-2">Applications</h4>
                      <div className="space-y-2 text-sm text-purple-800">
                        <div className="bg-white rounded p-2">Web Apps</div>
                        <div className="bg-white rounded p-2">Microservices</div>
                        <div className="bg-white rounded p-2">Analytics</div>
                        <div className="bg-white rounded p-2">IoT Systems</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FauxDB Server Layer */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">FauxDB Server Layer</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 mb-4">
                      <h4 className="text-lg font-semibold text-orange-900 mb-2">Wire Protocol Handler</h4>
                      <div className="space-y-2 text-sm text-orange-800">
                        <div className="bg-white rounded p-2">BSON Parser</div>
                        <div className="bg-white rounded p-2">Command Router</div>
                        <div className="bg-white rounded p-2">Session Manager</div>
                        <div className="bg-white rounded p-2">Authentication</div>
              </div>
            </div>
          </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6 mb-4">
                      <h4 className="text-lg font-semibold text-red-900 mb-2">Query Engine (Rust)</h4>
                      <div className="space-y-2 text-sm text-red-800">
                        <div className="bg-white rounded p-2">Query Parser</div>
                        <div className="bg-white rounded p-2">Aggregation Pipeline</div>
                        <div className="bg-white rounded p-2">Index Manager</div>
                        <div className="bg-white rounded p-2">Transaction Handler</div>
                </div>
              </div>
                </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6 mb-4">
                      <h4 className="text-lg font-semibold text-yellow-900 mb-2">SQL Translator</h4>
                      <div className="space-y-2 text-sm text-yellow-800">
                        <div className="bg-white rounded p-2">MongoDB → SQL</div>
                        <div className="bg-white rounded p-2">Result Mapper</div>
                        <div className="bg-white rounded p-2">Schema Adapter</div>
                        <div className="bg-white rounded p-2">Type Converter</div>
              </div>
                </div>
              </div>
                </div>
              </div>

              {/* PostgreSQL Backend */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">PostgreSQL Backend</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-6 mb-4">
                      <h4 className="text-lg font-semibold text-teal-900 mb-2">JSONB Storage</h4>
                      <div className="space-y-2 text-sm text-teal-800">
                        <div className="bg-white rounded p-2">Document Storage</div>
                        <div className="bg-white rounded p-2">JSON Indexing</div>
                        <div className="bg-white rounded p-2">Schema Validation</div>
                        <div className="bg-white rounded p-2">Version Control</div>
                </div>
              </div>
                </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-6 mb-4">
                      <h4 className="text-lg font-semibold text-indigo-900 mb-2">ACID Transactions</h4>
                      <div className="space-y-2 text-sm text-indigo-800">
                        <div className="bg-white rounded p-2">Multi-Document</div>
                        <div className="bg-white rounded p-2">Isolation Levels</div>
                        <div className="bg-white rounded p-2">Rollback Support</div>
                        <div className="bg-white rounded p-2">Consistency</div>
              </div>
            </div>
          </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-6 mb-4">
                      <h4 className="text-lg font-semibold text-pink-900 mb-2">Advanced Features</h4>
                      <div className="space-y-2 text-sm text-pink-800">
                        <div className="bg-white rounded p-2">Geospatial</div>
                        <div className="bg-white rounded p-2">Full-Text Search</div>
                        <div className="bg-white rounded p-2">Replication</div>
                        <div className="bg-white rounded p-2">Backup/Restore</div>
                      </div>
                    </div>
              </div>
              </div>
              </div>

              {/* Communication Flow */}
              <div className="pt-8 border-t border-gray-200">
                <div className="text-center mb-6">
                  <h4 className="text-base font-semibold text-gray-900 mb-2">Data Flow</h4>
                  <div className="flex items-center justify-center space-x-4 text-xs text-gray-600">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                      MongoDB Protocol
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-1"></div>
                      Rust Engine
              </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                      SQL Translation
            </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-1"></div>
                      PostgreSQL
          </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h5 className="font-semibold text-blue-900 mb-2">1. Client Request</h5>
                    <ul className="text-blue-800 space-y-1">
                      <li>• MongoDB wire protocol</li>
                      <li>• BSON serialization</li>
                      <li>• TCP connection</li>
                      <li>• Authentication</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h5 className="font-semibold text-orange-900 mb-2">2. Protocol Handler</h5>
                    <ul className="text-orange-800 space-y-1">
                      <li>• Command parsing</li>
                      <li>• Session management</li>
                      <li>• Request validation</li>
                      <li>• Error handling</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <h5 className="font-semibold text-red-900 mb-2">3. Query Engine</h5>
                    <ul className="text-red-800 space-y-1">
                      <li>• MongoDB → SQL</li>
                      <li>• Aggregation pipeline</li>
                      <li>• Index optimization</li>
                      <li>• Transaction support</li>
                    </ul>
                </div>
                  <div className="bg-teal-50 rounded-lg p-4">
                    <h5 className="font-semibold text-teal-900 mb-2">4. PostgreSQL</h5>
                    <ul className="text-teal-800 space-y-1">
                      <li>• JSONB operations</li>
                      <li>• ACID transactions</li>
                      <li>• Index execution</li>
                      <li>• Result processing</li>
                    </ul>
                  </div>
                </div>
              </div>
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
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-white transition-all duration-200 shadow-lg hover:opacity-90"
                style={{ backgroundColor: palette.orange }}
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