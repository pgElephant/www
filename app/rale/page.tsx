import React from 'react'
import { Metadata } from 'next'
import { ArrowRight, Download, BookOpen, Code, Server, Zap, Shield, Globe, CheckCircle, UserCheck, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'RALE - Resilient Adaptive Leader Election | Distributed Consensus',
  description: 'General-purpose distributed consensus and leader election system for high availability. Raft-based consensus algorithm for distributed systems beyond PostgreSQL.',
  keywords: [
    'distributed consensus', 'leader election', 'Raft algorithm', 'high availability',
    'RALE', 'Resilient Adaptive Leader Election', 'distributed systems', 'consensus protocol',
    'fault tolerance', 'distributed key-value store', 'network coordination'
  ],
  openGraph: {
    title: 'RALE - Resilient Adaptive Leader Election | Distributed Consensus',
    description: 'General-purpose distributed consensus and leader election system for high availability. Raft-based consensus algorithm for distributed systems.',
    type: 'website',
    url: 'https://www.pgelephant.com/rale',
    images: [
      {
        url: '/ico/RALE_HD.ico',
        width: 512,
        height: 512,
        alt: 'RALE - Distributed Consensus System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RALE - Resilient Adaptive Leader Election | Distributed Consensus',
    description: 'General-purpose distributed consensus and leader election system for high availability.',
    images: ['/ico/RALE_HD.ico'],
  },
  alternates: {
    canonical: '/rale',
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

const RalePage = () => {
  // Structured data for RALE
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "RALE - Resilient Adaptive Leader Election",
    "description": "General-purpose distributed consensus and leader election system for high availability. Raft-based consensus algorithm for distributed systems beyond PostgreSQL.",
    "applicationCategory": "DatabaseApplication",
    "operatingSystem": "Linux, macOS",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Distributed Consensus",
      "Leader Election",
      "High Availability",
      "Fault Tolerance",
      "Key-Value Store",
      "Network Coordination"
    ],
    "screenshot": "/ico/RALE_HD.ico",
    "author": {
      "@type": "Organization",
      "name": "pgElephant"
    },
    "url": "https://www.pgelephant.com/rale"
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
      id: 'consensus',
      name: 'Consensus',
      title: 'Distributed Consensus Algorithm',
      icon: CheckCircle,
      iconColor: '#10B981', // emerald-500
      bg: { from: palette.navy, via: palette.slate, to: palette.navy },
      links: [
        { title: 'Getting Started', href: '/docs/rale/getting-started', type: 'Getting Started' },
        { title: 'Download', href: '/download', type: 'Download' },
        { title: 'API Reference', href: '/docs/rale/api', type: 'API Reference' }
      ]
    },
    {
      id: 'leader',
      name: 'Leader Election',
      title: 'Automated Leader Selection',
      icon: UserCheck,
      iconColor: '#3B82F6', // blue-500
      bg: { from: palette.slate, via: palette.navy, to: palette.slate },
      links: [
        { title: 'Getting Started', href: '/docs/rale/getting-started', type: 'Getting Started' },
        { title: 'Docker Setup', href: '/docs/rale/docker', type: 'Docker' },
        { title: 'Configuration', href: '/docs/rale/config', type: 'API Reference' }
      ]
    },
    {
      id: 'availability',
      name: 'High Availability',
      title: 'Fault-Tolerant Operations',
      icon: ShieldCheck,
      iconColor: '#F59E0B', // amber-500
      bg: { from: palette.navyDeep, via: palette.navy, to: palette.slate },
      links: [
        { title: 'Getting Started', href: '/docs/rale/getting-started', type: 'Getting Started' },
        { title: 'Monitoring', href: '/docs/rale/monitoring', type: 'API Reference' },
        { title: 'Troubleshooting', href: '/docs/rale/troubleshooting', type: 'API Reference' }
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
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mr-6">
                <img 
                  src="/ico/RALE_HD.ico" 
                  alt="RALE icon"
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl text-white mb-2 drop-shadow-lg">
                  RALE
                </h1>
                <p className="text-xl text-white/90 drop-shadow-md">
                  Resilient Adaptive Leader Election
                </p>
              </div>
            </div>
            <p className="text-xl mb-8 leading-relaxed text-white/80 drop-shadow-sm">
              Distributed consensus for high availability in distributed systems.
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
                      {typeof feature.icon === 'string' ? (
                        <img 
                          src={feature.icon} 
                          alt={`${feature.name} icon`}
                          className="w-14 h-14 object-contain"
                        />
                      ) : (
                        <feature.icon 
                          className="w-8 h-8" 
                          style={{ color: feature.iconColor }} 
                        />
                      )}
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
                        href="/docs/rale"
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
            <h2 className="text-3xl text-gray-900 mb-6 text-center">
              RALE Architecture
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed text-center">
              Distributed consensus and key-value store system.
            </p>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Node 1 */}
                <div className="text-center">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 mb-4">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Node 1 (Leader)</h3>
                    <div className="space-y-2 text-sm text-blue-800">
                      <div className="bg-white rounded p-2">raled daemon</div>
                      <div className="bg-white rounded p-2">librale core</div>
                      <div className="bg-white rounded p-2">cluster_db (Distributed KV Store)</div>
                      <div className="bg-white rounded p-2">tcp_server (Network Layer)</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600">Port 7400/7401</div>
                </div>

                {/* Node 2 */}
                <div className="text-center">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 mb-4">
                    <h3 className="text-lg font-semibold text-green-900 mb-2">Node 2 (Follower)</h3>
                    <div className="space-y-2 text-sm text-green-800">
                      <div className="bg-white rounded p-2">raled daemon</div>
                      <div className="bg-white rounded p-2">librale core</div>
                      <div className="bg-white rounded p-2">cluster_db (Distributed KV Store)</div>
                      <div className="bg-white rounded p-2">tcp_client (Network Layer)</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600">Port 7400/7401</div>
                </div>

                {/* Node 3 */}
                <div className="text-center">
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 mb-4">
                    <h3 className="text-lg font-semibold text-purple-900 mb-2">Node 3 (Follower)</h3>
                    <div className="space-y-2 text-sm text-purple-800">
                      <div className="bg-white rounded p-2">raled daemon</div>
                      <div className="bg-white rounded p-2">librale core</div>
                      <div className="bg-white rounded p-2">cluster_db (Distributed KV Store)</div>
                      <div className="bg-white rounded p-2">tcp_client (Network Layer)</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600">Port 7400/7401</div>
                </div>
              </div>

              {/* Communication Flow */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="text-center mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Consensus Protocol</h4>
                  <div className="flex items-center justify-center space-x-6 text-xs text-gray-600">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      Consensus
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      Leader Election
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                      High Availability
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h5 className="font-semibold text-blue-900 mb-2">RALE Consensus</h5>
                    <ul className="text-blue-800 space-y-1">
                      <li>• Reliable leader election</li>
                      <li>• Log replication</li>
                      <li>• Split-brain prevention</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h5 className="font-semibold text-green-900 mb-2">Distributed Store</h5>
                    <ul className="text-green-800 space-y-1">
                      <li>• High-performance KV storage</li>
                      <li>• Thread-safe operations</li>
                      <li>• Memory leak prevention</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h5 className="font-semibold text-purple-900 mb-2">Network Layer</h5>
                    <ul className="text-purple-800 space-y-1">
                      <li>• TCP/UDP communication</li>
                      <li>• Automatic failover</li>
                      <li>• Watchdog monitoring</li>
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
              Key Features
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              Built for high-performance distributed systems.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8" style={{ color: palette.cyan }} />
                </div>
                <h3 className="text-lg text-gray-900 mb-2">
                  Fast Consensus
                </h3>
                <p className="text-gray-600">
                  Optimized algorithms for rapid consensus decisions.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8" style={{ color: palette.teal }} />
                </div>
                <h3 className="text-lg text-gray-900 mb-2">
                  Fault Tolerant
                </h3>
                <p className="text-gray-600">
                  Handles node failures with automatic recovery.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8" style={{ color: palette.orange }} />
                </div>
                <h3 className="text-lg text-gray-900 mb-2">
                  Scalable
                </h3>
                <p className="text-gray-600">
                  Designed to scale with your infrastructure.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <Link
                href="/docs/rale"
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

      {/* Features Comparison Table */}
      <div className="bg-white py-20">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl text-gray-900 mb-6 text-center">
              RALE vs Other Consensus Systems
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed text-center">
              Compare RALE with popular distributed consensus solutions.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-6 py-4 text-left font-semibold text-gray-900">Feature</th>
                    <th className="border border-gray-300 px-6 py-4 text-center font-semibold text-blue-900 bg-blue-50">RALE</th>
                    <th className="border border-gray-300 px-6 py-4 text-center font-semibold text-gray-900">etcd</th>
                    <th className="border border-gray-300 px-6 py-4 text-center font-semibold text-gray-900">Consul</th>
                    <th className="border border-gray-300 px-6 py-4 text-center font-semibold text-gray-900">Zookeeper</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-6 py-4 font-medium text-gray-900">Consensus Algorithm</td>
                    <td className="border border-gray-300 px-6 py-4 text-center text-blue-900 bg-blue-50">RALE (Raft-based)</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">Raft</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">Raft</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">ZAB</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-6 py-4 font-medium text-gray-900">Performance</td>
                    <td className="border border-gray-300 px-6 py-4 text-center text-blue-900 bg-blue-50">High (C implementation)</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">Good (Go)</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">Good (Go)</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">Medium (Java)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-6 py-4 font-medium text-gray-900">Memory Usage</td>
                    <td className="border border-gray-300 px-6 py-4 text-center text-blue-900 bg-blue-50">Low</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">Medium</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">Medium</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">High</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-6 py-4 font-medium text-gray-900">PostgreSQL Integration</td>
                    <td className="border border-gray-300 px-6 py-4 text-center text-blue-900 bg-blue-50">Native</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">External</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">External</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">External</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-6 py-4 font-medium text-gray-900">Setup Complexity</td>
                    <td className="border border-gray-300 px-6 py-4 text-center text-blue-900 bg-blue-50">Simple</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">Medium</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">Complex</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">Complex</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-6 py-4 font-medium text-gray-900">Split-brain Prevention</td>
                    <td className="border border-gray-300 px-6 py-4 text-center text-blue-900 bg-blue-50">✅ Built-in</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">✅ Built-in</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">✅ Built-in</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">✅ Built-in</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div 
        className="py-20"
        style={{ 
          background: `linear-gradient(135deg, ${palette.gray100}, ${palette.white})`
        }}
      >
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl text-gray-900 mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed text-center">
              Common questions about RALE distributed consensus.
            </p>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What is RALE and how does it differ from other consensus algorithms?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  RALE (Resilient Adaptive Leader Election) is our custom consensus algorithm built specifically for PostgreSQL environments. 
                  It's based on Raft but optimized for database workloads with features like split-brain prevention, 
                  automatic failover, and seamless integration with PostgreSQL clustering solutions.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How many nodes do I need for a RALE cluster?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  RALE requires a minimum of 3 nodes for fault tolerance. With 3 nodes, you can tolerate 1 node failure. 
                  For production environments, we recommend 5 nodes for better performance and fault tolerance. 
                  RALE supports up to 64 nodes in a single cluster.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What happens during a network partition?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  RALE implements strong consistency guarantees. During a network partition, only the majority partition 
                  can elect a leader and continue operations. The minority partition will remain in follower state, 
                  preventing split-brain scenarios and ensuring data consistency.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Can I use RALE with existing PostgreSQL setups?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes! RALE is designed to integrate seamlessly with existing PostgreSQL deployments. 
                  It provides a distributed key-value store that can be used for cluster coordination, 
                  configuration management, and metadata storage without requiring changes to your PostgreSQL setup.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What monitoring and observability features does RALE provide?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  RALE includes comprehensive monitoring with metrics for leader election, log replication, 
                  network latency, and cluster health. It integrates with Prometheus for metrics collection 
                  and provides detailed logging for troubleshooting cluster issues.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How do I get started with RALE?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Getting started is simple! Download the RALE binary, configure your cluster nodes, 
                  and start the raled daemon on each node. Check our documentation for detailed installation 
                  guides, configuration examples, and best practices for production deployments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RalePage