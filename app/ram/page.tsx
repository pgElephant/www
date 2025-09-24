import React from 'react'
import Head from 'next/head'
import { Settings, Shield, Zap, Database, Monitor, GitBranch, Cloud, Lock } from 'lucide-react'

export default function RamPage() {
  return (
    <>
      <Head>
        <title>RAM - Enterprise PostgreSQL High Availability & Clustering | pgElephant</title>
        <meta name="description" content="RAM is a production-ready PostgreSQL clustering solution providing automatic failover, leader election, and distributed consensus using Raft algorithm. Enterprise-grade high availability." />
        <meta name="keywords" content="ram, postgresql, postgres, cluster management, failover, high availability, distributed consensus, raft, enterprise, pgelephant, pgraft, ramd, ramctrl" />
        <meta property="og:title" content="RAM - Enterprise PostgreSQL High Availability & Clustering" />
        <meta property="og:description" content="Production-ready PostgreSQL clustering with automatic failover and Raft consensus." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pgelephant.com/ram" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RAM - Enterprise PostgreSQL High Availability & Clustering" />
        <meta name="twitter:description" content="Production-ready PostgreSQL clustering with automatic failover and Raft consensus." />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="canonical" href="https://pgelephant.com/ram" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700">
        <section className="pt-16 md:pt-20 bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700 relative overflow-hidden">
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
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-green-400/20 rounded-2xl flex items-center justify-center mr-4 border border-green-400/30">
                  <Settings className="w-10 h-10 text-green-400" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-green-200 mb-2">
                    RAM
                  </h1>
                  <p className="text-xl text-slate-300">
                    Resilient Adaptive Manager
                  </p>
                </div>
              </div>
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                Enterprise-grade PostgreSQL clustering solution with automatic failover, leader election, and distributed consensus using Raft algorithm. Built with 100% PostgreSQL C coding standards.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <span className="px-4 py-2 bg-green-400/20 text-green-300 rounded-full text-sm font-medium border border-green-400/30">
                  Production Ready
                </span>
                <span className="px-4 py-2 bg-green-400/20 text-green-300 rounded-full text-sm font-medium border border-green-400/30">
                  Zero Downtime
                </span>
                <span className="px-4 py-2 bg-green-400/20 text-green-300 rounded-full text-sm font-medium border border-green-400/30">
                  Raft Consensus
                </span>
                <span className="px-4 py-2 bg-green-400/20 text-green-300 rounded-full text-sm font-medium border border-green-400/30">
                  Enterprise Security
                </span>
              </div>
            </div>
          </div>
        </section>
        {/* Architecture Section */}
        <section className="py-16 px-8">
          <div className="container-wide">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Architecture</h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-green-400/20 rounded-xl flex items-center justify-center mx-auto border border-green-400/30">
                    <Database className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-300">Primary Node</h3>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="bg-slate-700/50 rounded-lg p-3">PostgreSQL</div>
                    <div className="bg-slate-700/50 rounded-lg p-3">pgraft</div>
                    <div className="bg-slate-700/50 rounded-lg p-3">ramd</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-green-400/20 rounded-xl flex items-center justify-center mx-auto border border-green-400/30">
                    <GitBranch className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-300">Standby Nodes</h3>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="bg-slate-700/50 rounded-lg p-3">PostgreSQL</div>
                    <div className="bg-slate-700/50 rounded-lg p-3">pgraft</div>
                    <div className="bg-slate-700/50 rounded-lg p-3">ramd</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-green-400/20 rounded-xl flex items-center justify-center mx-auto border border-green-400/30">
                    <Settings className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-300">Raft Consensus</h3>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="bg-slate-700/50 rounded-lg p-3">Leader Election</div>
                    <div className="bg-slate-700/50 rounded-lg p-3">Log Replication</div>
                    <div className="bg-slate-700/50 rounded-lg p-3">Split-brain Prevention</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Components Section */}
        <section className="py-16 px-8">
          <div className="container-wide">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center mb-4 border border-green-400/30">
                  <Database className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-green-300 mb-3">pgraft</h3>
                <p className="text-slate-300 mb-4">PostgreSQL extension providing distributed consensus</p>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• Custom Raft consensus algorithm</li>
                  <li>• High availability and failover</li>
                  <li>• Log replication across nodes</li>
                  <li>• Background worker integration</li>
                  <li>• Shared memory integration</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center mb-4 border border-green-400/30">
                  <Monitor className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-green-300 mb-3">ramd</h3>
                <p className="text-slate-300 mb-4">Enterprise-grade cluster management daemon</p>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• Cluster node coordination</li>
                  <li>• Health monitoring</li>
                  <li>• HTTP REST API (port 8080)</li>
                  <li>• Prometheus metrics</li>
                  <li>• Security and authentication</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center mb-4 border border-green-400/30">
                  <Settings className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-green-300 mb-3">ramctrl</h3>
                <p className="text-slate-300 mb-4">Professional command-line utility</p>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• Professional CLI interface</li>
                  <li>• Cluster management commands</li>
                  <li>• Status monitoring</li>
                  <li>• JSON and table output</li>
                  <li>• Maintenance operations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-16 px-8">
          <div className="container-wide">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center mb-4 border border-green-400/30">
                  <Zap className="w-6 h-6 text-green-400" />
                </div>
                <h4 className="text-lg font-semibold text-green-300 mb-2">Automatic Failover</h4>
                <p className="text-slate-300 text-sm">Zero-downtime failover with sub-second detection and seamless transition</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center mb-4 border border-green-400/30">
                  <GitBranch className="w-6 h-6 text-green-400" />
                </div>
                <h4 className="text-lg font-semibold text-green-300 mb-2">Leader Election</h4>
                <p className="text-slate-300 text-sm">Raft-based consensus for reliable leader selection and split-brain prevention</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center mb-4 border border-green-400/30">
                  <Monitor className="w-6 h-6 text-green-400" />
                </div>
                <h4 className="text-lg font-semibold text-green-300 mb-2">Real-time Monitoring</h4>
                <p className="text-slate-300 text-sm">Prometheus metrics, Grafana dashboards, and comprehensive health checks</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center mb-4 border border-green-400/30">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <h4 className="text-lg font-semibold text-green-300 mb-2">Enterprise Security</h4>
                <p className="text-slate-300 text-sm">Token-based auth, SSL/TLS, rate limiting, and comprehensive audit logging</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center mb-4 border border-green-400/30">
                  <Cloud className="w-6 h-6 text-green-400" />
                </div>
                <h4 className="text-lg font-semibold text-green-300 mb-2">Cloud-Native</h4>
                <p className="text-slate-300 text-sm">Docker, Kubernetes, and Helm chart support for modern deployments</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="w-12 h-12 bg-green-400/20 rounded-xl flex items-center justify-center mb-4 border border-green-400/30">
                  <Lock className="w-6 h-6 text-green-400" />
                </div>
                <h4 className="text-lg font-semibold text-green-300 mb-2">High Performance</h4>
                <p className="text-slate-300 text-sm">Optimized for minimal latency and maximum throughput with enterprise-grade reliability</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Start Section */}
        <section className="py-16 px-8">
          <div className="container-narrow">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Quick Start</h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-green-300 mb-3">1. Installation</h3>
                  <div className="bg-slate-800/50 rounded-lg p-4 font-mono text-sm text-slate-300">
                    <div className="text-green-400"># Clone and build</div>
                    <div>git clone https://github.com/pgElephant/ram.git</div>
                    <div>cd ram</div>
                    <div>make clean && make all</div>
                    <div>sudo make install</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-300 mb-3">2. Configuration</h3>
                  <div className="bg-slate-800/50 rounded-lg p-4 font-mono text-sm text-slate-300">
                    <div className="text-green-400"># Load environment and setup</div>
                    <div>source conf/environment.conf</div>
                    <div>psql -d postgres -c "CREATE EXTENSION pgraft;"</div>
                    <div>psql -d postgres -c "SELECT pgraft_init();"</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-300 mb-3">3. Start Cluster</h3>
                  <div className="bg-slate-800/50 rounded-lg p-4 font-mono text-sm text-slate-300">
                    <div className="text-green-400"># Start daemon and create cluster</div>
                    <div>ramd start</div>
                    <div>ramctrl status</div>
                    <div>python3 scripts/cluster.py create cluster --num_nodes=3</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise Features Section */}
        <section className="py-16 px-8">
          <div className="container-wide">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Enterprise Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-green-300 mb-4">Production Readiness</h3>
                <ul className="text-slate-300 space-y-2">
                  <li>• Zero-downtime deployments</li>
                  <li>• Rolling updates</li>
                  <li>• Disaster recovery</li>
                  <li>• Backup and restore</li>
                  <li>• Performance optimization</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-green-300 mb-4">Cloud-Native Support</h3>
                <ul className="text-slate-300 space-y-2">
                  <li>• Docker containerization</li>
                  <li>• Kubernetes operator</li>
                  <li>• Helm charts</li>
                  <li>• Custom Resource Definitions</li>
                  <li>• Service mesh integration</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-green-300 mb-4">Backup & Restore</h3>
                <ul className="text-slate-300 space-y-2">
                  <li>• pgBackRest integration</li>
                  <li>• Custom backup hooks</li>
                  <li>• Automated backup scheduling</li>
                  <li>• Point-in-time recovery</li>
                  <li>• Cross-region replication</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-green-300 mb-4">Quality Assurance</h3>
                <ul className="text-slate-300 space-y-2">
                  <li>• 100% test coverage</li>
                  <li>• Zero compilation warnings</li>
                  <li>• Zero memory leaks</li>
                  <li>• Security scan passing</li>
                  <li>• Performance benchmarks</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-8">
          <div className="container-narrow text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Ready to Get Started?</h2>
            <p className="text-xl text-slate-300 mb-8">
              Join the PostgreSQL community using RAM for enterprise-grade high availability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://github.com/pgElephant/ram" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-8 py-4 bg-green-400/80 text-slate-900 font-semibold rounded-xl hover:bg-green-500 transition-all duration-200">
                <GitBranch className="w-5 h-5 mr-2" />
                View on GitHub
              </a>
              <a href="/docs/ram/getting-started" className="inline-flex items-center px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-200 border border-white/20">
                <Settings className="w-5 h-5 mr-2" />
                Documentation
              </a>
            </div>
            <div className="mt-8 text-slate-400">
              <p><strong>License:</strong> MIT</p>
              <p><strong>Languages:</strong> C (99.0%), Other (1.0%)</p>
              <p><strong>PostgreSQL:</strong> 12+</p>
              <p><strong>Platform:</strong> Linux, macOS</p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
