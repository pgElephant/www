import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Database, 
  Shield, 
  Zap, 
  Code, 
  Download, 
  BookOpen, 
  ExternalLink, 
  CheckCircle,
  ArrowRight,
  Users,
  Star,
  Github
} from 'lucide-react'

export const metadata = {
  title: 'pgraft - PostgreSQL Raft Extension Documentation',
  description: 'Complete documentation for pgraft, the PostgreSQL extension implementing Raft consensus protocol for distributed database systems.',
  keywords: 'pgraft, postgresql, raft, consensus, distributed database, replication, clustering'
}

const PgraftDocsPage = () => {
  const features = [
    {
      icon: Database,
      title: 'Raft Consensus',
      description: 'Industry-standard Raft consensus protocol implementation for PostgreSQL'
    },
    {
      icon: Shield,
      title: 'High Availability',
      description: 'Automatic leader election and failover for mission-critical applications'
    },
    {
      icon: Zap,
      title: 'Low Latency',
      description: 'Optimized for high-performance distributed PostgreSQL clusters'
    },
    {
      icon: Code,
      title: 'SQL Integration',
      description: 'Native PostgreSQL extension with SQL function interface'
    }
  ]

  const quickLinks = [
    {
      title: 'Getting Started',
      href: '/docs/pgraft/getting-started',
      description: 'Install and configure pgraft extension',
      icon: BookOpen
    },
    {
      title: 'Installation Guide',
      href: '/docs/pgraft/installation',
      description: 'Build and install from source',
      icon: Download
    },
    {
      title: 'GitHub Repository',
      href: 'https://github.com/pgElephant/pgraft',
      description: 'View source code and contribute',
      icon: Github,
      external: true
    }
  ]

  return (
    <div className="min-h-screen bg-white/10 backdrop-blur-sm">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-50 to-white">
        <div className="container-wide py-16">
          <div className="flex items-center mb-8">
            <Image 
              src="/ico/pgsql_raft_leader_HD.ico" 
              alt="pgraft icon"
              width={64}
              height={64}
              className="w-16 h-16 mr-6 object-contain"
            />
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                pgraft Documentation
              </h1>
              <p className="text-xl text-slate-600">
                PostgreSQL Raft Extension
              </p>
            </div>
          </div>
          
          <p className="text-lg text-slate-700 mb-8 max-w-3xl leading-relaxed">
            pgraft is a PostgreSQL extension that implements the Raft consensus protocol, enabling distributed database systems with automatic leader election, log replication, and fault tolerance. Built for high-performance PostgreSQL clusters requiring strong consistency guarantees.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link 
              href="/docs/pgraft/getting-started" 
              className="professional-button"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Get Started
            </Link>
            <a 
              href="https://github.com/pgElephant/pgraft" 
              target="_blank" 
              rel="noopener noreferrer"
              className="professional-button-outline"
            >
              <Github className="w-5 h-5 mr-2" />
              View on GitHub
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Key Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="professional-card p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-slate-700" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="bg-slate-50 py-16">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Quick Links
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickLinks.map((link, index) => (
              <div key={index}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="professional-card p-6 block hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mr-4">
                        <link.icon className="w-5 h-5 text-slate-700" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-slate-700">
                        {link.title}
                      </h3>
                      <ExternalLink className="w-4 h-4 ml-auto text-slate-400 group-hover:text-slate-600" />
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {link.description}
                    </p>
                  </a>
                ) : (
                  <Link
                    href={link.href}
                    className="professional-card p-6 block hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mr-4">
                        <link.icon className="w-5 h-5 text-slate-700" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 group-hover:text-slate-700">
                        {link.title}
                      </h3>
                      <ArrowRight className="w-4 h-4 ml-auto text-slate-400 group-hover:text-slate-600" />
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {link.description}
                    </p>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Documentation Sections */}
      <div className="py-16">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Documentation Sections
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="professional-card p-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Guides & Tutorials
              </h3>
              <div className="space-y-3">
                <Link href="/docs/pgraft/getting-started" className="flex items-center text-slate-700 hover:text-slate-900 transition-colors">
                  <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                  Getting Started
                </Link>
                <Link href="/docs/pgraft/installation" className="flex items-center text-slate-700 hover:text-slate-900 transition-colors">
                  <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                  Installation Guide
                </Link>
                <Link href="/docs/pgraft/configuration" className="flex items-center text-slate-700 hover:text-slate-900 transition-colors">
                  <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                  Configuration
                </Link>
                <Link href="/docs/pgraft/cluster-management" className="flex items-center text-slate-700 hover:text-slate-900 transition-colors">
                  <CheckCircle className="w-4 h-4 mr-3 text-green-500" />
                  Cluster Management
                </Link>
              </div>
            </div>
            
            <div className="professional-card p-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Reference & Advanced
              </h3>
              <div className="space-y-3">
                <Link href="/docs/pgraft/sql-functions" className="flex items-center text-slate-700 hover:text-slate-900 transition-colors">
                  <CheckCircle className="w-4 h-4 mr-3 text-blue-500" />
                  SQL Functions
                </Link>
                <Link href="/docs/pgraft/raft-protocol" className="flex items-center text-slate-700 hover:text-slate-900 transition-colors">
                  <CheckCircle className="w-4 h-4 mr-3 text-blue-500" />
                  Raft Protocol
                </Link>
                <Link href="/docs/pgraft/performance" className="flex items-center text-slate-700 hover:text-slate-900 transition-colors">
                  <CheckCircle className="w-4 h-4 mr-3 text-blue-500" />
                  Performance Tuning
                </Link>
                <Link href="/docs/pgraft/troubleshooting" className="flex items-center text-slate-700 hover:text-slate-900 transition-colors">
                  <CheckCircle className="w-4 h-4 mr-3 text-blue-500" />
                  Troubleshooting
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PgraftDocsPage