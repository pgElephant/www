'use client'

import React from 'react'
import { ArrowLeft, Calendar, Clock, User, Tag, ArrowRight, Crown, Zap, Shield, Globe, Database } from 'lucide-react'
import Link from 'next/link'

const RaleBlogPage = () => {
  return (
    <div className="pt-16 bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-yellow-400/20 to-yellow-300/15 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-yellow-500/20 to-yellow-400/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-yellow-300/15 to-yellow-200/10 rounded-full blur-2xl" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #facc15 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-600/30 via-slate-700/20 to-teal-700/30 backdrop-blur-sm" />

        <div className="container-custom py-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-yellow-300 hover:text-yellow-200 mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
            
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-yellow-400/20 rounded-2xl flex items-center justify-center mr-4 border border-yellow-400/30">
                <Crown className="w-8 h-8 text-yellow-400" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-yellow-200 mb-2">
                  RALE - Resilient Adaptive Leader Election
                </h1>
                <p className="text-xl text-slate-300">
                  Enterprise-grade distributed consensus and leader election
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>pgElephant Team</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>January 15, 2024</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>8 min read</span>
              </div>
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                <span>Technical, Consensus, High Availability</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-400/30">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-white mb-6">What is RALE?</h2>
              <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                RALE (Resilient Adaptive Leader Election) is a distributed consensus algorithm designed specifically for PostgreSQL high availability clusters. It provides reliable leader election, automatic failover, and maintains consistency across distributed database nodes.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6 mt-12">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-100/10 rounded-xl p-6 border border-slate-400/30">
                  <div className="flex items-center mb-3">
                    <Zap className="w-6 h-6 text-yellow-400 mr-3" />
                    <h3 className="text-lg font-semibold text-white">Fast Failover</h3>
                  </div>
                  <p className="text-slate-300 text-sm">Automatic failover in under 30 seconds with zero data loss</p>
                </div>
                <div className="bg-slate-100/10 rounded-xl p-6 border border-slate-400/30">
                  <div className="flex items-center mb-3">
                    <Shield className="w-6 h-6 text-yellow-400 mr-3" />
                    <h3 className="text-lg font-semibold text-white">Consensus Algorithm</h3>
                  </div>
                  <p className="text-slate-300 text-sm">Raft-based consensus ensures consistency across all nodes</p>
                </div>
                <div className="bg-slate-100/10 rounded-xl p-6 border border-slate-400/30">
                  <div className="flex items-center mb-3">
                    <Globe className="w-6 h-6 text-yellow-400 mr-3" />
                    <h3 className="text-lg font-semibold text-white">Multi-Zone Support</h3>
                  </div>
                  <p className="text-slate-300 text-sm">Deploy across multiple availability zones for maximum resilience</p>
                </div>
                <div className="bg-slate-100/10 rounded-xl p-6 border border-slate-400/30">
                  <div className="flex items-center mb-3">
                    <Database className="w-6 h-6 text-yellow-400 mr-3" />
                    <h3 className="text-lg font-semibold text-white">PostgreSQL Native</h3>
                  </div>
                  <p className="text-slate-300 text-sm">Built specifically for PostgreSQL with native integration</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-6 mt-12">How RALE Works</h2>
              <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                RALE implements a modified Raft consensus algorithm optimized for database workloads. It maintains a log of all state changes and ensures that all nodes agree on the current leader and cluster state.
              </p>

              <div className="bg-slate-100/10 rounded-xl p-6 border border-slate-400/30 mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Consensus Process</h3>
                <ol className="text-slate-300 space-y-2">
                  <li className="flex items-start">
                    <span className="bg-yellow-400 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                    <span>Nodes participate in leader election when current leader becomes unavailable</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-yellow-400 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                    <span>Consensus is reached through majority voting among healthy nodes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-yellow-400 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                    <span>New leader takes over PostgreSQL primary role and updates cluster state</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-yellow-400 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                    <span>All nodes acknowledge the new leader and update their configurations</span>
                  </li>
                </ol>
              </div>

              <h2 className="text-2xl font-bold text-white mb-6 mt-12">Getting Started</h2>
              <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                RALE is designed to be simple to deploy and configure. It integrates seamlessly with PostgreSQL and provides a clean API for cluster management.
              </p>

              <div className="bg-slate-900 rounded-xl p-6 border border-slate-400/30 mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Quick Start</h3>
                <pre className="text-slate-300 text-sm overflow-x-auto">
{`# Install RALE
curl -sSL https://install.pgelephant.com/rale | bash

# Configure cluster
rale init --nodes=3 --zone=us-west-2

# Start cluster
rale start

# Check status
rale status`}
                </pre>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-12">
                <Link
                  href="/rale"
                  className="inline-flex items-center px-6 py-3 bg-yellow-400/20 text-yellow-300 border border-yellow-400/30 rounded-lg hover:bg-yellow-400/30 transition-colors"
                >
                  <Crown className="w-5 h-5 mr-2" />
                  Learn More About RALE
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  href="/docs/rale/getting-started"
                  className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
                >
                  <Database className="w-5 h-5 mr-2" />
                  View Documentation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RaleBlogPage
