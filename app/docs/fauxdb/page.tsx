'use client'

import React from 'react'
import Head from 'next/head'
import { ArrowLeft, BookOpen, Code, Settings, Database, Zap, Shield, Globe, Monitor, Cloud, Lock, GitBranch, Download, FileText, Terminal, Users, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const FauxDBDocsPage = () => {
  return (
    <>
      <Head>
        <title>FauxDB Documentation - Complete Guide | pgElephant</title>
        <meta name="description" content="Comprehensive FauxDB documentation covering installation, configuration, API reference, deployment, and best practices for MongoDB-compatible document database." />
        <meta name="keywords" content="fauxdb, documentation, mongodb, postgresql, document database, api reference, installation, configuration, deployment" />
        <meta property="og:title" content="FauxDB Documentation - Complete Guide" />
        <meta property="og:description" content="Comprehensive FauxDB documentation covering installation, configuration, API reference, deployment, and best practices." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pgelephant.com/docs/fauxdb" />
        <link rel="canonical" href="https://pgelephant.com/docs/fauxdb" />
      </Head>
      
      <div className="pt-16 bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700">
        {/* Header */}
        <div className="bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700 text-white relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-blue-300/15 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-blue-400/15 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-blue-300/15 to-blue-200/10 rounded-full blur-2xl" />
          </div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)`,
              backgroundSize: '50px 50px'
            }} />
          </div>

          {/* Glassmorphism Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-600/30 via-slate-700/20 to-teal-700/30 backdrop-blur-sm" />

          <div className="container-custom py-16 relative z-10">
            <div className="max-w-4xl mx-auto">
              <Link href="/docs" className="inline-flex items-center text-blue-300 hover:text-blue-200 mb-8">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Documentation
              </Link>
              
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-400/20 rounded-2xl flex items-center justify-center mr-4 border border-blue-400/30">
                  <FileText className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-blue-200 mb-2">
                    FauxDB Documentation
                  </h1>
                  <p className="text-xl text-slate-300">
                    Complete guide to MongoDB-compatible document database
                  </p>
                </div>
              </div>

              <p className="text-lg text-slate-300 mb-8">
                Comprehensive documentation covering installation, configuration, API reference, deployment strategies, and best practices for FauxDB.
              </p>
            </div>
          </div>
        </div>

        {/* Documentation Sections */}
        <div className="container-custom py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Getting Started */}
              <Link href="/docs/fauxdb/getting-started" className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-slate-400/30 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center mb-4 border border-blue-400/30 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Getting Started</h3>
                <p className="text-slate-300 mb-4">Quick setup guide, installation instructions, and your first FauxDB application.</p>
                <div className="flex items-center text-blue-300 text-sm font-medium">
                  <span>Start here</span>
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </div>
              </Link>

              {/* Installation */}
              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-slate-400/30">
                <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center mb-4 border border-blue-400/30">
                  <Download className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Installation</h3>
                <p className="text-slate-300 mb-4">Install FauxDB on Linux, macOS, and Windows. Package managers, Docker, and source builds.</p>
                <ul className="text-slate-400 text-sm space-y-1">
                  <li>• Package managers (apt, yum, brew)</li>
                  <li>• Docker containers</li>
                  <li>• Source compilation</li>
                  <li>• System requirements</li>
                </ul>
              </div>

              {/* Configuration */}
              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-slate-400/30">
                <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center mb-4 border border-blue-400/30">
                  <Settings className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Configuration</h3>
                <p className="text-slate-300 mb-4">Complete configuration guide for production deployments and performance tuning.</p>
                <ul className="text-slate-400 text-sm space-y-1">
                  <li>• Configuration files</li>
                  <li>• Environment variables</li>
                  <li>• Performance tuning</li>
                  <li>• Security settings</li>
                </ul>
              </div>

              {/* API Reference */}
              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-slate-400/30">
                <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center mb-4 border border-blue-400/30">
                  <Code className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">API Reference</h3>
                <p className="text-slate-300 mb-4">Complete MongoDB API compatibility reference with examples and best practices.</p>
                <ul className="text-slate-400 text-sm space-y-1">
                  <li>• CRUD operations</li>
                  <li>• Aggregation pipelines</li>
                  <li>• Index management</li>
                  <li>• Transactions</li>
                </ul>
              </div>

              {/* Docker */}
              <Link href="/docs/fauxdb/docker" className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-slate-400/30 hover:bg-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center mb-4 border border-blue-400/30 group-hover:scale-110 transition-transform">
                  <Cloud className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Docker</h3>
                <p className="text-slate-300 mb-4">Docker deployment guide with development, production, and monitoring setups.</p>
                <div className="flex items-center text-blue-300 text-sm font-medium">
                  <span>View guide</span>
                  <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                </div>
              </Link>

              {/* Kubernetes */}
              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-slate-400/30">
                <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center mb-4 border border-blue-400/30">
                  <Globe className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Kubernetes</h3>
                <p className="text-slate-300 mb-4">Deploy FauxDB on Kubernetes with operators, Helm charts, and production configurations.</p>
                <ul className="text-slate-400 text-sm space-y-1">
                  <li>• Kubernetes operators</li>
                  <li>• Helm charts</li>
                  <li>• StatefulSets</li>
                  <li>• Service mesh</li>
                </ul>
              </div>

              {/* Monitoring */}
              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-slate-400/30">
                <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center mb-4 border border-blue-400/30">
                  <Monitor className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Monitoring</h3>
                <p className="text-slate-300 mb-4">Comprehensive monitoring setup with Prometheus, Grafana, and alerting.</p>
                <ul className="text-slate-400 text-sm space-y-1">
                  <li>• Prometheus metrics</li>
                  <li>• Grafana dashboards</li>
                  <li>• Health checks</li>
                  <li>• Performance monitoring</li>
                </ul>
              </div>

              {/* Production */}
              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-slate-400/30">
                <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center mb-4 border border-blue-400/30">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Production</h3>
                <p className="text-slate-300 mb-4">Production deployment best practices, security, and high availability.</p>
                <ul className="text-slate-400 text-sm space-y-1">
                  <li>• Security hardening</li>
                  <li>• Backup strategies</li>
                  <li>• High availability</li>
                  <li>• Performance optimization</li>
                </ul>
              </div>

              {/* Troubleshooting */}
              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-slate-400/30">
                <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center mb-4 border border-blue-400/30">
                  <Terminal className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Troubleshooting</h3>
                <p className="text-slate-300 mb-4">Common issues, debugging techniques, and performance troubleshooting.</p>
                <ul className="text-slate-400 text-sm space-y-1">
                  <li>• Common issues</li>
                  <li>• Debug logging</li>
                  <li>• Performance issues</li>
                  <li>• Error codes</li>
                </ul>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-slate-400/30">
              <h2 className="text-2xl font-bold text-white mb-6">Quick Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-300 mb-4">Development</h3>
                  <ul className="space-y-2">
                    <li><a href="/docs/fauxdb/getting-started" className="text-slate-300 hover:text-blue-300 transition-colors">Getting Started Guide</a></li>
                    <li><a href="/docs/fauxdb/docker" className="text-slate-300 hover:text-blue-300 transition-colors">Docker Development Setup</a></li>
                    <li><a href="https://github.com/pgElephant/fauxdb" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-blue-300 transition-colors flex items-center">
                      GitHub Repository <ExternalLink className="w-3 h-3 ml-1" />
                    </a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-300 mb-4">Production</h3>
                  <ul className="space-y-2">
                    <li><a href="/docs/fauxdb/production" className="text-slate-300 hover:text-blue-300 transition-colors">Production Deployment</a></li>
                    <li><a href="/docs/fauxdb/monitoring" className="text-slate-300 hover:text-blue-300 transition-colors">Monitoring Setup</a></li>
                    <li><a href="/docs/fauxdb/troubleshooting" className="text-slate-300 hover:text-blue-300 transition-colors">Troubleshooting Guide</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Community & Support */}
            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold text-white mb-6">Need Help?</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/community" className="inline-flex items-center px-6 py-3 bg-blue-400/20 text-blue-300 border border-blue-400/30 rounded-lg hover:bg-blue-400/30 transition-colors">
                  <Users className="w-5 h-5 mr-2" />
                  Community Support
                </a>
                <a href="https://github.com/pgElephant/fauxdb/issues" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/20 transition-colors">
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

export default FauxDBDocsPage
