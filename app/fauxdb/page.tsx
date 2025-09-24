import React from 'react'
import Head from 'next/head'
import { FileText, Zap, Database, Shield, Cloud, Lock, GitBranch, Settings, Monitor, Globe } from 'lucide-react'

export default function FauxDBPage() {
  return (
    <>
      <Head>
        <title>FauxDB - Production-Ready MongoDB Alternative | pgElephant</title>
        <meta name="description" content="FauxDB is a high-performance, production-ready MongoDB-compatible database server built in Rust with full wire protocol compatibility and PostgreSQL backend." />
        <meta name="keywords" content="fauxdb, mongodb, mongo, document database, postgresql, postgres, compatible, rust, production, enterprise, pgelephant, jsonb, wire protocol" />
        <meta property="og:title" content="FauxDB - Production-Ready MongoDB Alternative" />
        <meta property="og:description" content="High-performance MongoDB-compatible database with full wire protocol support and PostgreSQL backend." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pgelephant.com/fauxdb" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FauxDB - Production-Ready MongoDB Alternative" />
        <meta name="twitter:description" content="High-performance MongoDB-compatible database with full wire protocol support and PostgreSQL backend." />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="canonical" href="https://pgelephant.com/fauxdb" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700">
        <section className="pt-16 md:pt-20 bg-gradient-to-br from-slate-600 via-slate-700 to-teal-700 relative overflow-hidden">
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
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-blue-400/20 rounded-2xl flex items-center justify-center mr-4 border border-blue-400/30">
                  <FileText className="w-10 h-10 text-blue-400" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-blue-200 mb-2">
                    FauxDB
                  </h1>
                  <p className="text-xl text-slate-300">
                    MongoDB Compatible Document Database
                  </p>
                </div>
              </div>
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                High-performance, production-ready MongoDB-compatible database server built in Rust with full wire protocol compatibility and pure PostgreSQL backend.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <span className="px-4 py-2 bg-blue-400/20 text-blue-300 rounded-full text-sm font-medium border border-blue-400/30">
                  100% MongoDB Compatible
                </span>
                <span className="px-4 py-2 bg-blue-400/20 text-blue-300 rounded-full text-sm font-medium border border-blue-400/30">
                  Built in Rust
                </span>
                <span className="px-4 py-2 bg-blue-400/20 text-blue-300 rounded-full text-sm font-medium border border-blue-400/30">
                  Production Ready
                </span>
                <span className="px-4 py-2 bg-blue-400/20 text-blue-300 rounded-full text-sm font-medium border border-blue-400/30">
                  PostgreSQL Backend
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
                  <div className="w-16 h-16 bg-blue-400/20 rounded-xl flex items-center justify-center mx-auto border border-blue-400/30">
                    <Globe className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-300">MongoDB Client</h3>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="bg-slate-700/50 rounded-lg p-3">mongosh</div>
                    <div className="bg-slate-700/50 rounded-lg p-3">MongoDB Drivers</div>
                    <div className="bg-slate-700/50 rounded-lg p-3">Wire Protocol</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-blue-400/20 rounded-xl flex items-center justify-center mx-auto border border-blue-400/30">
                    <Zap className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-300">FauxDB (Rust Core)</h3>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="bg-slate-700/50 rounded-lg p-3">Wire Protocol</div>
                    <div className="bg-slate-700/50 rounded-lg p-3">Command Processing</div>
                    <div className="bg-slate-700/50 rounded-lg p-3">Connection Pool</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-blue-400/20 rounded-xl flex items-center justify-center mx-auto border border-blue-400/30">
                    <Database className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-blue-300">PostgreSQL + JSONB</h3>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="bg-slate-700/50 rounded-lg p-3">Native JSONB</div>
                    <div className="bg-slate-700/50 rounded-lg p-3">Document Storage</div>
                    <div className="bg-slate-700/50 rounded-lg p-3">Indexing</div>
                  </div>
                </div>
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
                <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center mb-4 border border-blue-400/30">
                  <Globe className="w-6 h-6 text-blue-400" />
                </div>
                <h4 className="text-lg font-semibold text-blue-300 mb-2">100% MongoDB Compatibility</h4>
                <p className="text-slate-300 text-sm">Full wire protocol support with mongosh compatibility and all MongoDB 5.0+ features</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center mb-4 border border-blue-400/30">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <h4 className="text-lg font-semibold text-blue-300 mb-2">High Performance</h4>
                <p className="text-slate-300 text-sm">Built in Rust for superior speed, memory efficiency, and concurrent processing</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center mb-4 border border-blue-400/30">
                  <Database className="w-6 h-6 text-blue-400" />
                </div>
                <h4 className="text-lg font-semibold text-blue-300 mb-2">Pure PostgreSQL Backend</h4>
                <p className="text-slate-300 text-sm">Native JSONB support with no external dependencies, leveraging PostgreSQL's robustness</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center mb-4 border border-blue-400/30">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <h4 className="text-lg font-semibold text-blue-300 mb-2">Advanced Features</h4>
                <p className="text-slate-300 text-sm">Transactions, geospatial queries, aggregation pipelines, and change streams</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center mb-4 border border-blue-400/30">
                  <Monitor className="w-6 h-6 text-blue-400" />
                </div>
                <h4 className="text-lg font-semibold text-blue-300 mb-2">Production Ready</h4>
                <p className="text-slate-300 text-sm">Enterprise-grade monitoring, logging, metrics, and comprehensive configuration</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center mb-4 border border-blue-400/30">
                  <Cloud className="w-6 h-6 text-blue-400" />
                </div>
                <h4 className="text-lg font-semibold text-blue-300 mb-2">Docker & Kubernetes</h4>
                <p className="text-slate-300 text-sm">Complete Docker support with development, production, and monitoring environments</p>
              </div>
            </div>
          </div>
        </section>

        {/* MongoDB Compatibility Section */}
        <section className="py-16 px-8">
          <div className="container-wide">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">MongoDB Compatibility</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-blue-300 mb-4">Core Operations</h3>
                <ul className="text-slate-300 space-y-2">
                  <li>• find, findOne, insertOne, insertMany</li>
                  <li>• updateOne, updateMany, deleteOne, deleteMany</li>
                  <li>• count, distinct, aggregate</li>
                  <li>• createIndex, dropIndex, listIndexes</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-blue-300 mb-4">Advanced Operations</h3>
                <ul className="text-slate-300 space-y-2">
                  <li>• Transactions with startTransaction, commitTransaction</li>
                  <li>• Geospatial: $geoNear, $geoWithin, $geoIntersects</li>
                  <li>• Aggregation: 40+ pipeline stages</li>
                  <li>• Change Streams: Real-time notifications</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-blue-300 mb-4">Enterprise Features</h3>
                <ul className="text-slate-300 space-y-2">
                  <li>• Authentication: SCRAM, X.509, LDAP</li>
                  <li>• Authorization: Role-based access control</li>
                  <li>• Auditing: Comprehensive audit logging</li>
                  <li>• Monitoring: Prometheus metrics, health checks</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-blue-300 mb-4">Wire Protocol</h3>
                <ul className="text-slate-300 space-y-2">
                  <li>• Full MongoDB 5.0+ protocol support</li>
                  <li>• BSON serialization/deserialization</li>
                  <li>• Connection pooling and management</li>
                  <li>• SSL/TLS encryption support</li>
                </ul>
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
                  <h3 className="text-xl font-semibold text-blue-300 mb-3">1. Docker Quick Start</h3>
                  <div className="bg-slate-800/50 rounded-lg p-4 font-mono text-sm text-slate-300">
                    <div className="text-blue-400"># Clone and setup</div>
                    <div>git clone https://github.com/fauxdb/fauxdb.git</div>
                    <div>cd fauxdb</div>
                    <div>make setup</div>
                    <div>docker-compose up -d</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-300 mb-3">2. Connect with MongoDB Client</h3>
                  <div className="bg-slate-800/50 rounded-lg p-4 font-mono text-sm text-slate-300">
                    <div className="text-blue-400"># Connect with mongosh</div>
                    <div>mongosh mongodb://localhost:27018</div>
                    <div></div>
                    <div className="text-blue-400"># Test connection</div>
                    <div>db.runCommand(&#123;ping: 1&#125;)</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-300 mb-3">3. Build from Source</h3>
                  <div className="bg-slate-800/50 rounded-lg p-4 font-mono text-sm text-slate-300">
                    <div className="text-blue-400"># Build with optimizations</div>
                    <div>cargo build --release</div>
                    <div>./target/release/fauxdb</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Docker Support Section */}
        <section className="py-16 px-8">
          <div className="container-wide">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Docker Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center mb-4 border border-blue-400/30">
                  <Settings className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-blue-300 mb-3">Development</h3>
                <p className="text-slate-300 mb-4">Hot reload environment with debugging tools</p>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• make dev - Start development environment</li>
                  <li>• make dev-logs - View development logs</li>
                  <li>• make dev-shell - Open shell in container</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center mb-4 border border-blue-400/30">
                  <Cloud className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-blue-300 mb-3">Production</h3>
                <p className="text-slate-300 mb-4">Optimized setup with monitoring stack</p>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• make prod - Start production environment</li>
                  <li>• make monitor - Start with monitoring</li>
                  <li>• make prod-logs - View production logs</li>
                </ul>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center mb-4 border border-blue-400/30">
                  <Monitor className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-blue-300 mb-3">Testing</h3>
                <p className="text-slate-300 mb-4">Comprehensive testing with MongoDB clients</p>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• make test - Run tests with Docker</li>
                  <li>• make test-mongosh - Test with mongosh</li>
                  <li>• make perf-test - Run performance tests</li>
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
              Experience the power of MongoDB compatibility with PostgreSQL reliability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://github.com/pgElephant/fauxdb" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-8 py-4 bg-blue-400/80 text-slate-900 font-semibold rounded-xl hover:bg-blue-500 transition-all duration-200">
                <GitBranch className="w-5 h-5 mr-2" />
                View on GitHub
              </a>
              <a href="/docs/fauxdb/getting-started" className="inline-flex items-center px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-200 border border-white/20">
                <Settings className="w-5 h-5 mr-2" />
                Documentation
              </a>
            </div>
            <div className="mt-8 text-slate-400">
              <p><strong>License:</strong> MIT</p>
              <p><strong>Languages:</strong> Rust (100%)</p>
              <p><strong>MongoDB:</strong> 5.0+ Compatible</p>
              <p><strong>PostgreSQL:</strong> 17+</p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
