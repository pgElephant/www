'use client'

import React from 'react'
import Link from 'next/link'
import { Terminal, Download, BookOpen, Play, CheckCircle, AlertCircle } from 'lucide-react'

export default function PgraftGettingStarted() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)' }}>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.15),transparent_60%)]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Terminal className="w-4 h-4" />
              Getting Started
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                pgraft
              </span>
              <br />
              <span className="text-3xl md:text-4xl text-white/90">
                Quick Start Guide
              </span>
            </h1>
            
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Get your first pgraft cluster up and running in minutes with this comprehensive quick start guide.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link href="#installation" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                <Download className="w-5 h-5" />
                Installation
              </Link>
              <Link href="#quick-start" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                <Play className="w-5 h-5" />
                Quick Start
              </Link>
              <Link href="/docs/pgraft/tutorial" className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                <BookOpen className="w-5 h-5" />
                Full Tutorial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section id="installation" className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Installation</h2>
              <p className="text-xl text-white/70">Install pgraft on your system with these simple steps</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Prerequisites */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  Prerequisites
                </h3>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    PostgreSQL 16, 17, or 18
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    Go 1.21 or higher
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    GCC C compiler
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    PostgreSQL development headers
                  </li>
                </ul>
              </div>

              {/* System Requirements */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-yellow-400" />
                  System Requirements
                </h3>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    Minimum 2GB RAM per node
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    10GB free disk space
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    Network connectivity between nodes
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    Linux, macOS, or Windows
                  </li>
                </ul>
              </div>
            </div>

            {/* Installation Steps */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Installation Steps</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">1. Install Dependencies</h4>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 font-mono text-sm">
                    <div className="text-green-400 mb-2"># Ubuntu/Debian</div>
                    <div className="text-white">sudo apt-get install postgresql-17 postgresql-server-dev-17 golang-go build-essential</div>
                    <div className="text-green-400 mt-4 mb-2"># CentOS/RHEL</div>
                    <div className="text-white">sudo yum install postgresql17 postgresql17-devel golang gcc make</div>
                    <div className="text-green-400 mt-4 mb-2"># macOS</div>
                    <div className="text-white">brew install postgresql@17 go</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">2. Clone and Build</h4>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 font-mono text-sm">
                    <div className="text-green-400 mb-2">git clone https://github.com/pgelephant/pgraft.git</div>
                    <div className="text-white">cd pgraft</div>
                    <div className="text-white">make clean && make</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">3. Install Extension</h4>
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 font-mono text-sm">
                    <div className="text-white">sudo make install</div>
                    <div className="text-green-400 mt-2"># Verify installation</div>
                    <div className="text-white">ls -la $(pg_config --libdir)/pgraft*</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section id="quick-start" className="py-20 bg-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Quick Start</h2>
              <p className="text-xl text-white/70">Get your first cluster running in 5 minutes</p>
            </div>

            <div className="space-y-8">
              {/* Step 1: Configuration */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Step 1: Configure PostgreSQL</h3>
                <p className="text-white/80 mb-4">Add these settings to your <code className="bg-white/10 backdrop-blur-sm px-2 py-1 rounded text-blue-300">postgresql.conf</code>:</p>
                
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 font-mono text-sm">
                  <div className="text-green-400 mb-2"># Load pgraft extension</div>
                  <div className="text-white">shared_preload_libraries = 'pgraft'</div>
                  <div className="text-green-400 mt-4 mb-2"># Core cluster configuration</div>
                  <div className="text-white">pgraft.cluster_id = 'production-cluster'</div>
                  <div className="text-white">pgraft.node_id = 1</div>
                  <div className="text-white">pgraft.address = '127.0.0.1'</div>
                  <div className="text-white">pgraft.port = 7001</div>
                  <div className="text-white">pgraft.data_dir = '/var/lib/postgresql/pgraft'</div>
                </div>
              </div>

              {/* Step 2: Initialize */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Step 2: Initialize pgraft</h3>
                <p className="text-white/80 mb-4">Connect to PostgreSQL and create the extension:</p>
                
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 font-mono text-sm">
                  <div className="text-green-400 mb-2"># Create extension</div>
                  <div className="text-white">CREATE EXTENSION pgraft;</div>
                  <div className="text-green-400 mt-4 mb-2"># Initialize node</div>
                  <div className="text-white">SELECT pgraft_init();</div>
                </div>
              </div>

              {/* Step 3: Add Nodes */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Step 3: Add Additional Nodes</h3>
                <p className="text-white/80 mb-4">Repeat steps 1-2 on other nodes, then add them to the cluster:</p>
                
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 font-mono text-sm">
                  <div className="text-green-400 mb-2"># Wait 10 seconds for leader election, then add nodes</div>
                  <div className="text-white">SELECT pgraft_add_node(2, '127.0.0.1', 7002);</div>
                  <div className="text-white">SELECT pgraft_add_node(3, '127.0.0.1', 7003);</div>
                </div>
              </div>

              {/* Step 4: Verify */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Step 4: Verify Cluster Status</h3>
                <p className="text-white/80 mb-4">Check that your cluster is healthy:</p>
                
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 font-mono text-sm">
                  <div className="text-green-400 mb-2"># Get cluster status</div>
                  <div className="text-white">SELECT * FROM pgraft_get_cluster_status();</div>
                  <div className="text-green-400 mt-4 mb-2"># Get all nodes</div>
                  <div className="text-white">SELECT * FROM pgraft_get_nodes();</div>
                  <div className="text-green-400 mt-4 mb-2"># Quick health check</div>
                  <div className="text-white">SELECT pgraft_is_leader(), pgraft_get_term(), pgraft_get_leader();</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-8">What's Next?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Link href="/docs/pgraft/tutorial" className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8 hover:border-blue-400/50 transition-colors group">
                <BookOpen className="w-12 h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-3">Complete Tutorial</h3>
                <p className="text-white/70">Follow our comprehensive tutorial to master pgraft cluster management.</p>
              </Link>
              
              <Link href="/docs/pgraft/sql-functions" className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8 hover:border-purple-400/50 transition-colors group">
                <Terminal className="w-12 h-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-3">SQL Functions</h3>
                <p className="text-white/70">Explore the complete API reference for all pgraft SQL functions.</p>
              </Link>
              
              <Link href="/docs/pgraft/architecture" className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8 hover:border-cyan-400/50 transition-colors group">
                <CheckCircle className="w-12 h-12 text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-white mb-3">Architecture</h3>
                <p className="text-white/70">Understand how pgraft works under the hood with detailed architecture docs.</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}