'use client'

import React from 'react'
import { ArrowRight, Download, BookOpen, Code, Server, Zap, Shield, Globe, Database, Cpu, Activity, Users, Settings, BarChart3, GitBranch, Crown, Wifi, RefreshCw, Network, BarChart } from 'lucide-react'
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

const RamPage = () => {
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
      id: 'failover',
      name: 'Auto Failover',
      title: 'Zero-Downtime Failover',
      icon: RefreshCw,
      iconColor: '#EF4444', // red-500
      bg: { from: palette.navy, via: palette.slate, to: palette.navy },
      links: [
        { title: 'Getting Started', href: '/docs/ram/getting-started', type: 'Getting Started' },
        { title: 'Download', href: '/download', type: 'Download' },
        { title: 'Docker Setup', href: '/docs/ram/docker', type: 'Docker' }
      ]
    },
    {
      id: 'consensus',
      name: 'Raft Consensus',
      title: 'Leader Election & Coordination',
      icon: Network,
      iconColor: '#8B5CF6', // violet-500
      bg: { from: palette.slate, via: palette.navy, to: palette.slate },
      links: [
        { title: 'Getting Started', href: '/docs/ram/getting-started', type: 'Getting Started' },
        { title: 'Kubernetes', href: '/docs/ram/kubernetes', type: 'Docker' },
        { title: 'Configuration', href: '/docs/ram/config', type: 'API Reference' }
      ]
    },
    {
      id: 'monitoring',
      name: 'Monitoring',
      title: 'Real-time Metrics & Alerts',
      icon: BarChart,
      iconColor: '#06B6D4', // cyan-500
      bg: { from: palette.navyDeep, via: palette.navy, to: palette.slate },
      links: [
        { title: 'Getting Started', href: '/docs/ram/getting-started', type: 'Getting Started' },
        { title: 'Prometheus', href: '/docs/ram/monitoring', type: 'API Reference' },
        { title: 'Grafana', href: '/docs/ram/grafana', type: 'API Reference' }
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
                  src="/ico/RAM_HD.ico" 
                  alt="RAM icon"
                  className="w-16 h-16 object-contain"
                />
                </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl text-white mb-2">
                    RAM
                  </h1>
                <p className="text-xl text-gray-300">
                    Resilient Adaptive Manager
                  </p>
                </div>
              </div>
            <p className="text-xl mb-8 leading-relaxed" style={{ color: palette.gray100 }}>
              Enterprise-grade PostgreSQL clustering with automatic failover.
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
                        href="/docs/ram"
                        className="flex-1 text-center py-2 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-xs font-medium"
                      >
                        Learn More
                      </Link>
                      <Link
                        href="/download"
                        className="flex-1 text-center py-2 px-4 rounded-lg text-white transition-colors text-xs font-medium"
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

      {/* Architecture Diagram */}
      <div className="bg-gray-50 py-20">
          <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl text-gray-900 mb-6 text-center">
              RAM Architecture
            </h2>
            <p className="text-lg text-gray-600 mb-12 leading-relaxed text-center">
              PostgreSQL Auto-Failover Daemon with Raft Consensus.
            </p>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              {/* PostgreSQL Cluster */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">PostgreSQL Cluster</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 mb-4">
                      <h4 className="text-base font-semibold text-green-900 mb-2">Primary</h4>
                      <div className="space-y-2 text-sm text-green-800">
                        <div className="bg-white rounded p-2">PostgreSQL Server</div>
                        <div className="bg-white rounded p-2">WAL Streaming</div>
                        <div className="bg-white rounded p-2">Port 5432</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 mb-4">
                      <h4 className="text-base font-semibold text-blue-900 mb-2">Standby 1</h4>
                      <div className="space-y-2 text-sm text-blue-800">
                        <div className="bg-white rounded p-2">PostgreSQL Server</div>
                        <div className="bg-white rounded p-2">WAL Replay</div>
                        <div className="bg-white rounded p-2">Port 5432</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 mb-4">
                      <h4 className="text-base font-semibold text-purple-900 mb-2">Standby 2</h4>
                      <div className="space-y-2 text-sm text-purple-800">
                        <div className="bg-white rounded p-2">PostgreSQL Server</div>
                        <div className="bg-white rounded p-2">WAL Replay</div>
                        <div className="bg-white rounded p-2">Port 5432</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RAM Daemon Layer */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">RAM Daemon Layer</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 mb-4">
                      <h4 className="text-base font-semibold text-orange-900 mb-2">ramd (Leader)</h4>
                      <div className="space-y-2 text-sm text-orange-800">
                        <div className="bg-white rounded p-2">Raft Consensus</div>
                        <div className="bg-white rounded p-2">Monitor Service</div>
                        <div className="bg-white rounded p-2">HTTP API</div>
                        <div className="bg-white rounded p-2">Port 7400</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6 mb-4">
                      <h4 className="text-base font-semibold text-red-900 mb-2">ramd (Follower)</h4>
                      <div className="space-y-2 text-sm text-red-800">
                        <div className="bg-white rounded p-2">Raft Consensus</div>
                        <div className="bg-white rounded p-2">Monitor Service</div>
                        <div className="bg-white rounded p-2">HTTP API</div>
                        <div className="bg-white rounded p-2">Port 7400</div>
                  </div>
                </div>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6 mb-4">
                      <h4 className="text-base font-semibold text-yellow-900 mb-2">ramd (Follower)</h4>
                      <div className="space-y-2 text-sm text-yellow-800">
                        <div className="bg-white rounded p-2">Raft Consensus</div>
                        <div className="bg-white rounded p-2">Monitor Service</div>
                        <div className="bg-white rounded p-2">HTTP API</div>
                        <div className="bg-white rounded p-2">Port 7400</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RAM Components */}
              <div className="pt-8 border-t border-gray-200">
                <div className="text-center mb-6">
                  <h4 className="text-base font-semibold text-gray-900 mb-4">RAM Components</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                      <div className="flex items-center justify-center mb-3">
                        <GitBranch className="w-6 h-6 text-blue-600" />
                      </div>
                      <h5 className="font-semibold text-blue-900 mb-2">Consensus</h5>
                      <p className="text-sm text-blue-800 mb-3">Distributed Consensus Algorithm</p>
                      <div className="space-y-2">
                        <Link href="/docs/ram/getting-started" className="block text-xs text-blue-700 hover:text-blue-900">Getting Started</Link>
                        <Link href="/download" className="block text-xs text-blue-700 hover:text-blue-900">Download</Link>
                        <Link href="/docs/ram/api" className="block text-xs text-blue-700 hover:text-blue-900">API Reference</Link>
                        <Link href="/docs/ram" className="block text-xs text-blue-700 hover:text-blue-900">Learn More</Link>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                      <div className="flex items-center justify-center mb-3">
                        <Crown className="w-6 h-6 text-green-600" />
                      </div>
                      <h5 className="font-semibold text-green-900 mb-2">Leader Election</h5>
                      <p className="text-sm text-green-800 mb-3">Automated Leader Selection</p>
                      <div className="space-y-2">
                        <Link href="/docs/ram/getting-started" className="block text-xs text-green-700 hover:text-green-900">Getting Started</Link>
                        <Link href="/docs/ram/docker" className="block text-xs text-green-700 hover:text-green-900">Docker Setup</Link>
                        <Link href="/docs/ram/config" className="block text-xs text-green-700 hover:text-green-900">Configuration</Link>
                        <Link href="/docs/ram/api" className="block text-xs text-green-700 hover:text-green-900">API Reference</Link>
                        <Link href="/docs/ram" className="block text-xs text-green-700 hover:text-green-900">Learn More</Link>
            </div>
          </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                      <div className="flex items-center justify-center mb-3">
                        <Wifi className="w-6 h-6 text-purple-600" />
                </div>
                      <h5 className="font-semibold text-purple-900 mb-2">High Availability</h5>
                      <p className="text-sm text-purple-800 mb-3">Fault-Tolerant Operations</p>
                      <div className="space-y-2">
                        <Link href="/docs/ram/getting-started" className="block text-xs text-purple-700 hover:text-purple-900">Getting Started</Link>
                        <Link href="/docs/ram/monitoring" className="block text-xs text-purple-700 hover:text-purple-900">Monitoring</Link>
                        <Link href="/docs/ram/api" className="block text-xs text-purple-700 hover:text-purple-900">API Reference</Link>
                        <Link href="/docs/ram/troubleshooting" className="block text-xs text-purple-700 hover:text-purple-900">Troubleshooting</Link>
                        <Link href="/docs/ram" className="block text-xs text-purple-700 hover:text-purple-900">Learn More</Link>
              </div>
                </div>
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
            <h2 className="text-2xl text-gray-900 mb-6">
              Enterprise Features
            </h2>
            <p className="text-lg text-gray-600 mb-12 leading-relaxed">
              Production-ready PostgreSQL clustering solution.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4">
                  <Database className="w-8 h-8" style={{ color: palette.cyan }} />
                </div>
                <h3 className="text-lg text-gray-900 mb-2">
                  PostgreSQL Native
                </h3>
                <p className="text-gray-600">
                  Built with 100% PostgreSQL C coding standards.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8" style={{ color: palette.teal }} />
                </div>
                <h3 className="text-lg text-gray-900 mb-2">
                  Real-time Monitoring
                </h3>
                <p className="text-gray-600">
                  Prometheus metrics and Grafana dashboards.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8" style={{ color: palette.orange }} />
                </div>
                <h3 className="text-lg text-gray-900 mb-2">
                  Enterprise Security
                </h3>
                <p className="text-gray-600">
                  Token-based auth, SSL/TLS, rate limiting.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <Link
                href="/docs/ram"
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

      {/* Features Comparison Table */}
      <div className="bg-white py-20">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl text-gray-900 mb-6 text-center">
              RAM vs Other PostgreSQL Solutions
            </h2>
            <p className="text-lg text-gray-600 mb-12 leading-relaxed text-center">
              Compare RAM with popular PostgreSQL clustering solutions.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-6 py-4 text-left font-semibold text-gray-900">Feature</th>
                    <th className="border border-gray-300 px-6 py-4 text-center font-semibold text-teal-900 bg-teal-50">RAM</th>
                    <th className="border border-gray-300 px-6 py-4 text-center font-semibold text-gray-900">Patroni</th>
                    <th className="border border-gray-300 px-6 py-4 text-center font-semibold text-gray-900">pg_auto_failover</th>
                    <th className="border border-gray-300 px-6 py-4 text-center font-semibold text-gray-900">PgPool-II</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-6 py-4 font-medium text-gray-900">Consensus Algorithm</td>
                    <td className="border border-gray-300 px-6 py-4 text-center text-teal-900 bg-teal-50">Raft (Native)</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">DCS (etcd/Consul)</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">Monitor-based</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">None</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-6 py-4 font-medium text-gray-900">Auto-Failover Speed</td>
                    <td className="border border-gray-300 px-6 py-4 text-center text-teal-900 bg-teal-50">Sub-second</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">5-30 seconds</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">30+ seconds</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">Manual</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-6 py-4 font-medium text-gray-900">Setup Complexity</td>
                    <td className="border border-gray-300 px-6 py-4 text-center text-teal-900 bg-teal-50">Simple</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">Complex</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">Medium</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">Medium</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-6 py-4 font-medium text-gray-900">Monitoring Integration</td>
                    <td className="border border-gray-300 px-6 py-4 text-center text-teal-900 bg-teal-50">Prometheus Native</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">External</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">Basic</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">Limited</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-6 py-4 font-medium text-gray-900">Split-brain Prevention</td>
                    <td className="border border-gray-300 px-6 py-4 text-center text-teal-900 bg-teal-50">✅ Built-in</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">✅ With DCS</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">⚠️ Limited</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">❌ None</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-6 py-4 font-medium text-gray-900">Backup Management</td>
                    <td className="border border-gray-300 px-6 py-4 text-center text-teal-900 bg-teal-50">✅ Integrated</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">External</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">External</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">External</td>
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
            <h2 className="text-2xl text-gray-900 mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 mb-12 leading-relaxed text-center">
              Common questions about RAM PostgreSQL clustering.
            </p>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                  How does RAM differ from other PostgreSQL clustering solutions?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  RAM (Resilient Adaptive Manager) is built from the ground up with native Raft consensus, 
                  providing sub-second failover times and built-in split-brain prevention. Unlike other solutions 
                  that rely on external coordination services, RAM includes everything needed for PostgreSQL clustering in one package.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                  What is the minimum cluster size for RAM?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  RAM requires a minimum of 3 nodes for fault tolerance - 1 primary and 2 standby servers. 
                  This configuration allows you to tolerate 1 node failure while maintaining high availability. 
                  For production environments, we recommend 5+ nodes for optimal performance and fault tolerance.
                </p>
          </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                  How fast is the failover process with RAM?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  RAM provides sub-second failover times, typically under 500ms. The Raft consensus algorithm 
                  ensures immediate detection of node failures and rapid election of a new primary. 
                  This is significantly faster than traditional solutions that can take 30+ seconds.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                  Does RAM support synchronous replication?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes! RAM includes comprehensive support for synchronous replication with automatic standby management. 
                  It handles both synchronous and asynchronous replicas, with built-in logic for managing sync standbys 
                  and ensuring data consistency across the cluster.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                  What monitoring and observability features are available?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  RAM includes native Prometheus metrics export, comprehensive logging, and an HTTP API for cluster management. 
                  You get real-time visibility into cluster health, replication lag, failover events, and performance metrics 
                  without requiring additional monitoring tools.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                  Can I migrate from existing PostgreSQL clustering solutions?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes! RAM is designed to work with standard PostgreSQL installations. You can migrate from Patroni, 
                  pg_auto_failover, or manual setups. The migration process involves installing RAM daemons, 
                  configuring the cluster, and updating your application connection strings.
                </p>
              </div>
            </div>
          </div>
            </div>
            </div>
          </div>
  )
}

export default RamPage