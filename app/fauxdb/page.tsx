'use client'

import React, { useState } from 'react'
import { ArrowRight, Download, BookOpen, Code, Server, Zap, Shield, Globe, Database, Cpu, Activity, Layers, Rocket, Settings, Play, Terminal, Monitor, CheckCircle, Users, Star, Clock, BarChart3 } from 'lucide-react'
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
      title: 'Live Query Demo',
      description: 'Execute MongoDB queries in real-time and see the results',
      icon: Terminal,
      status: 'Active',
      users: '23 online'
    },
    {
      title: 'Performance Benchmark',
      description: 'Compare FauxDB performance against native MongoDB',
      icon: BarChart3,
      status: 'Running',
      users: '12 online'
    },
    {
      title: 'Migration Tool',
      description: 'Live demo of migrating data from MongoDB to FauxDB',
      icon: Database,
      status: 'Available',
      users: '8 online'
    },
    {
      title: 'ACID Compliance Test',
      description: 'Demonstrate ACID transactions and consistency guarantees',
      icon: Shield,
      status: 'Active',
      users: '15 online'
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
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center mb-8">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mr-6">
                <img 
                  src="/ico/FauxDB_HD.ico" 
                  alt="FauxDB icon"
                  className="w-16 h-16 object-contain"
                />
                </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-6xl text-white mb-2 drop-shadow-lg font-bold">
                    FauxDB
                  </h1>
                <p className="text-xl md:text-2xl text-white/90 drop-shadow-md">
                    MongoDB Compatible Document Database
                  </p>
                </div>
              </div>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed text-white/80 drop-shadow-sm max-w-4xl">
              High-performance MongoDB-compatible database built in Rust with PostgreSQL backend. Try our live demos below!
            </p>

            {/* Demo Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl">
              {demoStats.map((stat, index) => (
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

      {/* Live Demo Section */}
      <div className="bg-gray-50 py-20">
        <div className="container-wide">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Live Demo</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Experience FauxDB in action with our interactive demos. Try MongoDB queries and see real-time results.
              </p>
            </div>

            {/* Demo Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {demoFeatures.map((demo, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                      <demo.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{demo.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={`w-2 h-2 rounded-full ${demo.status === 'Active' ? 'bg-green-500' : demo.status === 'Running' ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                        <span className="text-xs text-gray-500">{demo.status}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{demo.description}</p>
                  <div className="flex items-center text-blue-600 text-sm font-medium">
                    <Users className="w-4 h-4 mr-1" />
                    {demo.users}
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Demo Terminal */}
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