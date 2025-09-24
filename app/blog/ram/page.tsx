'use client'

import React from 'react'
import { ArrowLeft, Calendar, Clock, User, Tag, ArrowRight, Settings, BarChart3, Shield, Globe, Database } from 'lucide-react'
import Link from 'next/link'

const RamBlogPage = () => {
  return (
    <div className="pt-16 bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-green-400/20 to-green-300/15 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-green-500/20 to-green-400/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-green-300/15 to-green-200/10 rounded-full blur-2xl" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #22c55e 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-600/30 via-slate-700/20 to-teal-700/30 backdrop-blur-sm" />

        <div className="container-custom py-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-green-300 hover:text-green-200 mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
            
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-green-400/20 rounded-2xl flex items-center justify-center mr-4 border border-green-400/30">
                <Settings className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-green-200 mb-2">
                  RAM - Resilient Adaptive Manager
                </h1>
                <p className="text-xl text-slate-300">
                  Automated PostgreSQL failover and cluster management
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
                <span>January 12, 2024</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>6 min read</span>
              </div>
              <div className="flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                <span>Management, Monitoring, PostgreSQL</span>
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
              <h2 className="text-2xl font-bold text-white mb-6">What is RAM?</h2>
              <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                RAM (Resilient Adaptive Manager) is the management layer that orchestrates PostgreSQL clusters using RALE consensus. It provides automated failover, resource monitoring, and cluster health management for production PostgreSQL deployments.
              </p>

              <h2 className="text-2xl font-bold text-white mb-6 mt-12">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-slate-100/10 rounded-xl p-6 border border-slate-400/30">
                  <div className="flex items-center mb-3">
                    <BarChart3 className="w-6 h-6 text-green-400 mr-3" />
                    <h3 className="text-lg font-semibold text-white">Resource Monitoring</h3>
                  </div>
                  <p className="text-slate-300 text-sm">Real-time monitoring of CPU, memory, disk, and network usage</p>
                </div>
                <div className="bg-slate-100/10 rounded-xl p-6 border border-slate-400/30">
                  <div className="flex items-center mb-3">
                    <Shield className="w-6 h-6 text-green-400 mr-3" />
                    <h3 className="text-lg font-semibold text-white">Health Checks</h3>
                  </div>
                  <p className="text-slate-300 text-sm">Continuous health monitoring with automatic recovery actions</p>
                </div>
                <div className="bg-slate-100/10 rounded-xl p-6 border border-slate-400/30">
                  <div className="flex items-center mb-3">
                    <Globe className="w-6 h-6 text-green-400 mr-3" />
                    <h3 className="text-lg font-semibold text-white">Multi-Zone Management</h3>
                  </div>
                  <p className="text-slate-300 text-sm">Manage clusters across multiple availability zones</p>
                </div>
                <div className="bg-slate-100/10 rounded-xl p-6 border border-slate-400/30">
                  <div className="flex items-center mb-3">
                    <Database className="w-6 h-6 text-green-400 mr-3" />
                    <h3 className="text-lg font-semibold text-white">PostgreSQL Integration</h3>
                  </div>
                  <p className="text-slate-300 text-sm">Native PostgreSQL integration with automatic configuration</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-6 mt-12">RAM Architecture</h2>
              <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                RAM acts as the control plane for your PostgreSQL cluster, managing failover decisions, resource allocation, and cluster state. It integrates with RALE for consensus and provides a unified management interface.
              </p>

              <div className="bg-slate-100/10 rounded-xl p-6 border border-slate-400/30 mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Management Components</h3>
                <ul className="text-slate-300 space-y-2">
                  <li className="flex items-start">
                    <span className="bg-green-400 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">•</span>
                    <span><strong>Cluster Manager:</strong> Orchestrates failover and manages cluster state</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-400 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">•</span>
                    <span><strong>Resource Monitor:</strong> Tracks system resources and performance metrics</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-400 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">•</span>
                    <span><strong>Health Checker:</strong> Performs continuous health assessments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-400 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">•</span>
                    <span><strong>Configuration Manager:</strong> Manages PostgreSQL and cluster configurations</span>
                  </li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-white mb-6 mt-12">Monitoring & Alerting</h2>
              <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                RAM provides comprehensive monitoring capabilities with built-in alerting and integration with popular monitoring systems like Prometheus and Grafana.
              </p>

              <div className="bg-slate-900 rounded-xl p-6 border border-slate-400/30 mb-8">
                <h3 className="text-lg font-semibold text-white mb-4">Key Metrics</h3>
                <pre className="text-slate-300 text-sm overflow-x-auto">
{`# Cluster Health
ramctl status --detailed

# Resource Usage
ramctl metrics --resource

# Performance Stats
ramctl metrics --performance

# Alert Configuration
ramctl alerts --configure`}
                </pre>
              </div>

              <h2 className="text-2xl font-bold text-white mb-6 mt-12">Getting Started</h2>
              <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                RAM is designed to work seamlessly with RALE and provides simple commands for cluster management. It's production-ready and battle-tested in high-availability environments.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-12">
                <Link
                  href="/ram"
                  className="inline-flex items-center px-6 py-3 bg-green-400/20 text-green-300 border border-green-400/30 rounded-lg hover:bg-green-400/30 transition-colors"
                >
                  <Settings className="w-5 h-5 mr-2" />
                  Learn More About RAM
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  href="/docs/ram/getting-started"
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

export default RamBlogPage
