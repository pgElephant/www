'use client'

import React, { useState } from 'react'
import { ArrowRight, Download, BookOpen, Code, Server, Zap, Shield, Globe, Database, Cpu, Activity, Layers, Rocket, Settings, Play, Terminal, Monitor, CheckCircle, Users, Star, Clock, BarChart3 } from 'lucide-react'
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

const FauxDbPage = () => {
  const [currentQuery, setCurrentQuery] = useState('')
  const [queryResults, setQueryResults] = useState<any[]>([])
  const [isExecuting, setIsExecuting] = useState(false)
  const [demoData, setDemoData] = useState([
    { _id: 'user1', name: 'John Doe', age: 30, email: 'john@example.com' },
    { _id: 'user2', name: 'Jane Smith', age: 25, email: 'jane@example.com' },
    { _id: 'user3', name: 'Bob Johnson', age: 35, email: 'bob@example.com' }
  ])

  // Demo statistics
  const demoStats = [
    { label: 'Active Demos', value: '15', icon: Play, color: 'text-blue-600' },
    { label: 'Demo Users', value: '47', icon: Users, color: 'text-green-600' },
    { label: 'Queries/sec', value: '2.1k', icon: BarChart3, color: 'text-purple-600' },
    { label: 'Uptime', value: '99.9%', icon: Clock, color: 'text-yellow-500' }
  ]

  // Execute demo query
  const executeQuery = async (query: string) => {
    setIsExecuting(true)
    setCurrentQuery(query)
    
    // Simulate query execution delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    let results: any[] = []
    
    if (query.includes('insertOne')) {
      const newUser = { _id: `user${Date.now()}`, name: 'New User', age: 28, email: 'new@example.com' }
      setDemoData(prev => [...prev, newUser])
      results = [{ acknowledged: true, insertedId: newUser._id }]
    } else if (query.includes('find')) {
      if (query.includes('age: {$gte: 25}')) {
        results = demoData.filter(user => user.age >= 25)
      } else {
        results = demoData
      }
    } else if (query.includes('updateOne')) {
      const updatedData = demoData.map(user => 
        user.name === 'John Doe' ? { ...user, age: 31 } : user
      )
      setDemoData(updatedData)
      results = [{ acknowledged: true, modifiedCount: 1 }]
    } else if (query.includes('count')) {
      results = [{ count: demoData.length }]
    }
    
    setQueryResults(results)
    setIsExecuting(false)
  }

  // Quick demo commands
  const quickCommands = [
    { label: 'Find All Users', query: 'db.users.find({})' },
    { label: 'Find Adults', query: 'db.users.find({age: {$gte: 25}})' },
    { label: 'Count Users', query: 'db.users.countDocuments()' },
    { label: 'Add User', query: 'db.users.insertOne({name: "Alice", age: 27, email: "alice@example.com"})' }
  ]

  // Demo features
  const demoFeatures = [
    {
      title: 'MongoDB API Explorer',
      description: 'Test MongoDB wire protocol compatibility with real queries on FauxDB.',
      icon: Terminal,
      status: 'Live',
      users: '18 users now'
    },
    {
      title: 'Rust Engine Profiler',
      description: 'See how FauxDB’s Rust-powered backend handles complex workloads.',
      icon: BarChart3,
      status: 'Benchmarking',
      users: '9 running'
    },
    {
      title: 'Migration Playground',
      description: 'Try migrating sample MongoDB data into FauxDB and inspect results.',
      icon: Database,
      status: 'Ready',
      users: '5 active'
    },
    {
      title: 'Transaction Validator',
      description: 'Experiment with multi-document ACID transactions and rollback scenarios.',
      icon: Shield,
      status: 'Stable',
      users: '11 testing'
    }
  ]

  // Live demo commands
  const demoCommands = [
    {
      command: 'db.users.insertOne({name: "John", age: 30})',
      description: 'Insert a document into users collection',
      result: '{ "acknowledged": true, "insertedId": ObjectId("...") }'
    },
    {
      command: 'db.users.find({age: {$gte: 25}})',
      description: 'Find users with age >= 25',
      result: '[{ "_id": ObjectId("..."), "name": "John", "age": 30 }]'
    },
    {
      command: 'db.users.updateOne({name: "John"}, {$set: {age: 31}})',
      description: 'Update user document',
      result: '{ "acknowledged": true, "modifiedCount": 1 }'
    }
  ]
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
      {/* Hero Section with demo terminal */}
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
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-4">
                <Image
                  src="/ico/FauxDB_HD.ico"
                  alt="FauxDB icon"
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain"
                  priority
                />
              </div>
              <h1 className="text-5xl font-bold mb-5 tracking-tight text-white drop-shadow-lg">FauxDB: MongoDB Compatible Document Database</h1>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed text-white/80 drop-shadow-sm max-w-4xl">
                High-performance MongoDB-compatible database built in Rust with PostgreSQL backend. Try our live demo below!
              </p>
            </div>

            {/* Demo Terminal (centered, like pgraft) */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-gray-900 rounded-xl p-8 text-white">
                <div className="flex items-center mb-6">
                  <div className="flex gap-2 mr-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-300">FauxDB Interactive Demo</span>
                  {isExecuting && <div className="ml-4 text-yellow-400 text-sm">Executing...</div>}
                </div>
                {/* Quick Commands */}
                <div className="mb-6">
                  <h4 className="text-gray-300 text-sm mb-3">Quick Commands:</h4>
                  <div className="flex flex-wrap gap-2">
                    {quickCommands.map((cmd, index) => (
                      <button
                        key={index}
                        onClick={() => executeQuery(cmd.query)}
                        disabled={isExecuting}
                        className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white px-3 py-1 rounded text-xs font-mono transition-colors"
                      >
                        {cmd.label}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Query Input */}
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <span className="text-green-400 text-sm">$</span>
                    <input
                      type="text"
                      value={currentQuery}
                      onChange={(e) => setCurrentQuery(e.target.value)}
                      placeholder="db.users.find({})"
                      className="bg-gray-800 text-blue-400 ml-2 flex-1 px-3 py-1 rounded text-sm font-mono border-none outline-none"
                      onKeyPress={(e) => e.key === 'Enter' && executeQuery(currentQuery)}
                      disabled={isExecuting}
                    />
                    <button
                      onClick={() => executeQuery(currentQuery)}
                      disabled={isExecuting || !currentQuery.trim()}
                      className="ml-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-1 rounded text-sm transition-colors"
                    >
                      {isExecuting ? '...' : 'Execute'}
                    </button>
                  </div>
                </div>
                {/* Results */}
                {queryResults.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-gray-300 text-sm mb-2">Results:</h4>
                    <div className="bg-gray-800 rounded-lg p-4">
                      <pre className="text-gray-200 text-xs font-mono whitespace-pre-wrap">
                        {JSON.stringify(queryResults, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
                {/* Current Data */}
                <div className="mb-6">
                  <h4 className="text-gray-300 text-sm mb-2">Current Data ({demoData.length} documents):</h4>
                  <div className="bg-gray-800 rounded-lg p-4 max-h-40 overflow-y-auto">
                    <pre className="text-gray-200 text-xs font-mono">
                      {JSON.stringify(demoData, null, 2)}
                    </pre>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      setDemoData([
                        { _id: 'user1', name: 'John Doe', age: 30, email: 'john@example.com' },
                        { _id: 'user2', name: 'Jane Smith', age: 25, email: 'jane@example.com' },
                        { _id: 'user3', name: 'Bob Johnson', age: 35, email: 'bob@example.com' }
                      ])
                      setQueryResults([])
                      setCurrentQuery('')
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Reset Demo
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    <Terminal className="w-4 h-4 mr-2 inline" />
                    Copy Connection String
                  </button>
                </div>
              </div>
            </div>

            {/* Badges (like pgraft) */}
            <div className="mt-8 flex flex-wrap justify-center">
              <span className="inline-block bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-md border border-slate-200 mr-2 mb-2">PostgreSQL Backend</span>
              <span className="inline-block bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-md border border-slate-200 mr-2 mb-2">Rust Engine</span>
              <span className="inline-block bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-md border border-slate-200 mr-2 mb-2">MongoDB API</span>
              <span className="inline-block bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-md border border-slate-200 mr-2 mb-2">ACID Transactions</span>
              <span className="inline-block bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-md border border-slate-200 mr-2 mb-2">JSONB Storage</span>
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


      {/* Feature Matrix Section (Table) */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.25),transparent_60%)]" />
        <div className="container-wide relative z-10">
          <div className="text-center mb-14">
            <div className="text-xs tracking-wider font-semibold text-indigo-500 uppercase mb-2">Depth</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Feature Matrix</h2>
            <div className="mx-auto h-1 w-28 bg-gradient-to-r from-indigo-500 to-sky-500 rounded" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-slate-700 rounded-lg overflow-hidden">
              <thead className="bg-slate-800/60">
                <tr className="text-left">
                  <th className="px-4 py-3 font-semibold text-white">Capability</th>
                  <th className="px-4 py-3 font-semibold text-white">Description</th>
                  <th className="px-4 py-3 font-semibold text-white">Operational Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700 bg-slate-800/40">
                <tr>
                  <td className="px-4 py-3 font-medium text-cyan-300">MongoDB Compatibility</td>
                  <td className="px-4 py-3 text-slate-300">Wire protocol, BSON, and API compatibility.</td>
                  <td className="px-4 py-3 text-slate-300">Drop-in replacement for MongoDB apps.</td>
                </tr>
                <tr className="bg-slate-800/60">
                  <td className="px-4 py-3 font-medium text-cyan-300">Rust Engine</td>
                  <td className="px-4 py-3 text-slate-300">High-performance, memory-safe backend.</td>
                  <td className="px-4 py-3 text-slate-300">Fast queries, low resource usage.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-cyan-300">PostgreSQL Storage</td>
                  <td className="px-4 py-3 text-slate-300">JSONB, ACID transactions, and indexing.</td>
                  <td className="px-4 py-3 text-slate-300">Reliable, consistent data storage.</td>
                </tr>
                <tr className="bg-slate-800/60">
                  <td className="px-4 py-3 font-medium text-cyan-300">Advanced Features</td>
                  <td className="px-4 py-3 text-slate-300">Geospatial, full-text search, backup/restore.</td>
                  <td className="px-4 py-3 text-slate-300">Enterprise-grade capabilities.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-cyan-300">Migration Tools</td>
                  <td className="px-4 py-3 text-slate-300">Import/export and schema adaptation.</td>
                  <td className="px-4 py-3 text-slate-300">Easy transition from MongoDB.</td>
                </tr>
                <tr className="bg-slate-800/60">
                  <td className="px-4 py-3 font-medium text-cyan-300">Observability</td>
                  <td className="px-4 py-3 text-slate-300">Monitoring hooks and diagnostics.</td>
                  <td className="px-4 py-3 text-slate-300">Simplifies operations and troubleshooting.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-slate-400">Full reference: <Link href="/docs/fauxdb/user-guide/api" className="text-indigo-400 hover:underline">API Reference</Link></p>
        </div>
      </section>


    </div>
  );
}

export default FauxDbPage