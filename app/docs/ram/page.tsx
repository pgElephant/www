'use client'

import React from 'react'
import Head from 'next/head'
import { ArrowLeft, BookOpen, Code, Settings, Database, Zap, Shield, Globe, Monitor, Cloud, Lock, GitBranch, Download, FileText, Terminal, Users, ExternalLink, BarChart3 } from 'lucide-react'
import Link from 'next/link'

const RamDocsPage = () => {
  return (
    <>
      <Head>
        <title>RAM Documentation - Complete Guide | pgElephant</title>
        <meta name="description" content="Comprehensive RAM documentation covering installation, configuration, clustering, failover, monitoring, and best practices for PostgreSQL high availability." />
        <meta name="keywords" content="ram, documentation, postgresql, clustering, high availability, failover, raft consensus, monitoring, deployment" />
        <meta property="og:title" content="RAM Documentation - Complete Guide" />
        <meta property="og:description" content="Comprehensive RAM documentation covering clustering, failover, monitoring, and best practices for PostgreSQL high availability." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pgelephant.com/docs/ram" />
        <link rel="canonical" href="https://pgelephant.com/docs/ram" />
      </Head>
      
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
              <Link href="/docs" className="inline-flex items-center text-green-300 hover:text-green-200 mb-8">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Documentation
              </Link>
              
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-green-400/20 rounded-2xl flex items-center justify-center mr-4 border border-green-400/30">
                  <BarChart3 className="w-8 h-8 text-green-400" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-green-200 mb-2">
                    RAM Documentation
                  </h1>
                  <p className="text-xl text-slate-300">
                    Complete guide to PostgreSQL clustering and high availability
                  </p>
                </div>
              </div>

              <p className="text-lg text-slate-300 mb-8">
                Comprehensive documentation covering installation, configuration, clustering, automatic failover, monitoring, and best practices for RAM.
              </p>
            </div>
          </div>
        </div>

        {/* Documentation Sections */}
        <div className="container-custom py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Getting Started */}
              <Link href="/docs/ram/getting-started" className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-slate-400/30 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center mb-4 border border-green-400/30 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Getting Started</h3>
                <p className="text-slate-300 mb-4">Quick setup guide, installation instructions, and your first RAM cluster.</p>
                <div className="flex items-center text-green-300 text-sm font-medium">
                  <span>Start here</span>
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </div>
              </Link>

              {/* Installation */}
              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-slate-400/30">
                <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center mb-4 border border-green-400/30">
                  <Download className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Installation</h3>
                <p className="text-slate-300 mb-4">Install RAM on Linux, macOS, and Windows. Package managers, Docker, and source builds.</p>
                <ul className="text-slate-400 text-sm space-y-1">
                  <li>• Package managers (apt, yum, brew)</li>
                  <li>• Docker containers</li>
                  <li>• Source compilation</li>
                  <li>• System requirements</li>
                </ul>
              </div>

              {/* Configuration */}
              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-slate-400/30">
                <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center mb-4 border border-green-400/30">
                  <Settings className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Configuration</h3>
                <p className="text-slate-300 mb-4">Complete configuration guide for cluster setup, failover, and performance tuning.</p>
                <ul className="text-slate-400 text-sm space-y-1">
                  <li>• Cluster configuration</li>
                  <li>• Node settings</li>
                  <li>• Failover parameters</li>
                  <li>• Security settings</li>
                </ul>
              </div>

              {/* Cluster Setup */}
              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-slate-400/30">
                <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center mb-4 border border-green-400/30">
                  <Database className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Cluster Setup</h3>
                <p className="text-slate-300 mb-4">Step-by-step guide to setting up a PostgreSQL cluster with RAM.</p>
                <ul className="text-slate-400 text-sm space-y-1">
                  <li>• Multi-node setup</li>
                  <li>• Leader election</li>
                  <li>• Replication setup</li>
                  <li>• Cluster validation</li>
                </ul>
              </div>

              {/* Docker */}
              <Link href="/docs/ram/docker" className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-slate-400/30 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center mb-4 border border-green-400/30 group-hover:scale-110 transition-transform">
                  <Cloud className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Docker</h3>
                <p className="text-slate-300 mb-4">Docker deployment guide with development, production, and monitoring setups.</p>
                <div className="flex items-center text-green-300 text-sm font-medium">
                  <span>View guide</span>
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </div>
              </Link>

              {/* Kubernetes */}
              <Link href="/docs/ram/kubernetes" className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-slate-400/30 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center mb-4 border border-green-400/30 group-hover:scale-110 transition-transform">
                  <Globe className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Kubernetes</h3>
                <p className="text-slate-300 mb-4">Deploy RAM on Kubernetes with operators, Helm charts, and production configurations.</p>
                <div className="flex items-center text-green-300 text-sm font-medium">
                  <span>View guide</span>
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </div>
              </Link>

              {/* Monitoring */}
              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-slate-400/30">
                <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center mb-4 border border-green-400/30">
                  <Monitor className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Monitoring</h3>
                <p className="text-slate-300 mb-4">Comprehensive monitoring setup with Prometheus, Grafana, and alerting.</p>
                <ul className="text-slate-400 text-sm space-y-1">
                  <li>• Prometheus metrics</li>
                  <li>• Grafana dashboards</li>
                  <li>• Health checks</li>
                  <li>• Failover monitoring</li>
                </ul>
              </div>

              {/* Production */}
              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-slate-400/30">
                <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center mb-4 border border-green-400/30">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Production</h3>
                <p className="text-slate-300 mb-4">Production deployment best practices, security, and high availability.</p>
                <ul className="text-slate-400 text-sm space-y-1">
                  <li>• Security hardening</li>
                  <li>• Backup strategies</li>
                  <li>• Disaster recovery</li>
                  <li>• Performance optimization</li>
                </ul>
              </div>

              {/* Troubleshooting */}
              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-slate-400/30">
                <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center mb-4 border border-green-400/30">
                  <Terminal className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Troubleshooting</h3>
                <p className="text-slate-300 mb-4">Common issues, debugging techniques, and cluster troubleshooting.</p>
                <ul className="text-slate-400 text-sm space-y-1">
                  <li>• Cluster issues</li>
                  <li>• Failover problems</li>
                  <li>• Performance issues</li>
                  <li>• Log analysis</li>
                </ul>
              </div>
            </div>

            {/* Architecture Overview */}
            <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-slate-400/30">
              <h2 className="text-2xl font-bold text-white mb-6">RAM Architecture</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-400/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-green-400/30">
                    <Database className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">pgraft</h3>
                  <p className="text-slate-300 text-sm">PostgreSQL extension providing distributed consensus and leader election</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-400/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-green-400/30">
                    <Monitor className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">ramd</h3>
                  <p className="text-slate-300 text-sm">Cluster management daemon with monitoring and HTTP API</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-400/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-green-400/30">
                    <Terminal className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">ramctrl</h3>
                  <p className="text-slate-300 text-sm">Command-line utility for cluster management and operations</p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-slate-400/30">
              <h2 className="text-2xl font-bold text-white mb-6">Quick Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-green-300 mb-4">Development</h3>
                  <ul className="space-y-2">
                    <li><a href="/docs/ram/getting-started" className="text-slate-300 hover:text-green-300 transition-colors">Getting Started Guide</a></li>
                    <li><a href="/docs/ram/docker" className="text-slate-300 hover:text-green-300 transition-colors">Docker Development Setup</a></li>
                    <li><a href="https://github.com/pgElephant/ram" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-green-300 transition-colors flex items-center">
                      GitHub Repository <ExternalLink className="w-3 h-3 ml-1" />
                    </a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-300 mb-4">Production</h3>
                  <ul className="space-y-2">
                    <li><a href="/docs/ram/production" className="text-slate-300 hover:text-green-300 transition-colors">Production Deployment</a></li>
                    <li><a href="/docs/ram/monitoring" className="text-slate-300 hover:text-green-300 transition-colors">Monitoring Setup</a></li>
                    <li><a href="/docs/ram/troubleshooting" className="text-slate-300 hover:text-green-300 transition-colors">Troubleshooting Guide</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Community & Support */}
            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold text-white mb-6">Need Help?</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/community" className="inline-flex items-center px-6 py-3 bg-green-400/20 text-green-300 border border-green-400/30 rounded-lg hover:bg-green-400/30 transition-colors">
                  <Users className="w-5 h-5 mr-2" />
                  Community Support
                </a>
                <a href="https://github.com/pgElephant/ram/issues" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/20 transition-colors">
                  <GitBranch className="w-5 h-5 mr-2" />
                  Report Issues
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RamDocsPage
