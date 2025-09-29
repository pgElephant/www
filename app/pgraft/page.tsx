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
  Github,
  Terminal,
  Settings,
  Cpu,
  Network
} from 'lucide-react'

export const metadata = {
  title: 'pgraft - PostgreSQL Raft Extension | pgElephant',
  description: 'pgraft is a PostgreSQL extension implementing the Raft consensus protocol for distributed database systems with automatic leader election and fault tolerance.',
  keywords: 'pgraft, postgresql, raft, consensus, distributed database, replication, clustering, leader election, fault tolerance'
}

const PgraftPage = () => {
  const features = [
    {
      icon: Database,
      title: 'Raft Consensus',
      description: 'Industry-standard Raft consensus protocol implementation ensuring strong consistency across distributed PostgreSQL nodes.'
    },
    {
      icon: Shield,
      title: 'Fault Tolerance',
      description: 'Automatic leader election and failover capabilities to maintain high availability even during node failures.'
    },
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Optimized for high-throughput PostgreSQL clusters with minimal latency overhead for consensus operations.'
    },
    {
      icon: Code,
      title: 'SQL Integration',
      description: 'Native PostgreSQL extension with SQL function interface for seamless integration with existing applications.'
    },
    {
      icon: Network,
      title: 'Distributed',
      description: 'Support for multi-node PostgreSQL clusters with configurable quorum sizes and network topologies.'
    },
    {
      icon: Settings,
      title: 'Configurable',
      description: 'Extensive configuration options for tuning performance, timeouts, and cluster behavior to match your needs.'
    }
  ]

  const useCases = [
    {
      title: 'High Availability Clusters',
      description: 'Deploy mission-critical PostgreSQL clusters with automatic failover and zero-downtime maintenance.',
      icon: Shield
    },
    {
      title: 'Distributed Applications',
      description: 'Build distributed applications requiring strong consistency guarantees across multiple database nodes.',
      icon: Network
    },
    {
      title: 'Multi-Region Deployments',
      description: 'Synchronize PostgreSQL data across multiple geographic regions with Raft consensus.',
      icon: Database
    }
  ]

  const stats = [
    { label: 'Consensus Latency', value: '<5ms', description: 'Average consensus round-trip time' },
    { label: 'Fault Tolerance', value: '50%+1', description: 'Nodes can fail while maintaining availability' },
    { label: 'Throughput', value: '10K+ TPS', description: 'Transactions per second with consensus' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Elegant theme same as main page */}
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
        <div className="container-wide py-24 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <Image 
                src="/ico/pgsql_raft_leader_HD.ico" 
                alt="pgraft icon"
                width={96}
                height={96}
                className="w-24 h-24 object-contain"
              />
            </div>
            
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              pgraft
            </h1>
            
            <p className="text-2xl text-white/90 mb-8 leading-relaxed drop-shadow-md">
              PostgreSQL Raft Extension
            </p>
            
            <p className="text-lg text-white/80 mb-12 leading-relaxed max-w-3xl mx-auto drop-shadow-sm">
              pgraft is a PostgreSQL extension that implements the Raft consensus protocol, enabling distributed database systems with automatic leader election, log replication, and fault tolerance. Built for high-performance PostgreSQL clusters requiring strong consistency guarantees.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Link href="/docs/pgraft/getting-started" className="professional-button text-lg px-8 py-4">
                <BookOpen className="w-5 h-5 mr-2" />
                Get Started
              </Link>
              <a 
                href="https://github.com/pgElephant/pgraft" 
                target="_blank" 
                rel="noopener noreferrer"
                className="professional-button-outline text-lg px-8 py-4"
              >
                <Github className="w-5 h-5 mr-2" />
                View on GitHub
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-slate-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-slate-600 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-slate-500">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-slate-50">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Key Features
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              pgraft provides enterprise-grade consensus capabilities for PostgreSQL clusters
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="premium-card p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-slate-700" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="py-24">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Use Cases
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Perfect for applications requiring distributed consensus and high availability
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="premium-card p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mr-4">
                    <useCase.icon className="w-6 h-6 text-slate-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {useCase.title}
                  </h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-24 bg-slate-50">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              pgraft implements the Raft consensus algorithm directly in PostgreSQL
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mr-4 mt-1">
                  <span className="text-blue-700 font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Leader Election
                  </h3>
                  <p className="text-slate-600">
                    Nodes automatically elect a leader using the Raft algorithm, ensuring only one node accepts writes at a time.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mr-4 mt-1">
                  <span className="text-green-700 font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Log Replication
                  </h3>
                  <p className="text-slate-600">
                    The leader replicates all changes to follower nodes, ensuring consistency across the cluster.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mr-4 mt-1">
                  <span className="text-purple-700 font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Consensus & Commit
                  </h3>
                  <p className="text-slate-600">
                    Changes are committed only after a majority of nodes acknowledge receipt, guaranteeing durability.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="premium-card p-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">
                Quick Start
              </h3>
              <div className="space-y-4">
                <div className="bg-slate-900 rounded-lg p-4">
                  <code className="text-green-400 text-sm">
                    # Install pgraft extension<br/>
                    CREATE EXTENSION pgraft;
                  </code>
                </div>
                <div className="bg-slate-900 rounded-lg p-4">
                  <code className="text-green-400 text-sm">
                    # Initialize cluster<br/>
                    SELECT pgraft_init_cluster();
                  </code>
                </div>
                <div className="bg-slate-900 rounded-lg p-4">
                  <code className="text-green-400 text-sm">
                    # Check status<br/>
                    SELECT * FROM pgraft_cluster_status();
                  </code>
                </div>
              </div>
              <Link href="/docs/pgraft/getting-started" className="professional-button w-full mt-6 justify-center">
                <BookOpen className="w-4 h-4 mr-2" />
                Full Getting Started Guide
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24">
        <div className="container-wide">
          <div className="premium-cta text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Build Distributed PostgreSQL Clusters?
            </h2>
            <p className="text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
              Get started with pgraft today and build highly available, fault-tolerant PostgreSQL systems.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/docs/pgraft/getting-started" className="bg-white text-slate-900 hover:bg-slate-100 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 inline-flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Get Started
              </Link>
              <a 
                href="https://github.com/pgElephant/pgraft" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 inline-flex items-center"
              >
                <Github className="w-5 h-5 mr-2" />
                View Source
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PgraftPage