export const metadata = {
  title: 'Install NeuronDB PostgreSQL Vector Database | Step-by-Step Guide',
  description: 'Complete installation guide for NeuronDB - PostgreSQL AI vector database extension. Supports PostgreSQL 12-17, Ubuntu, Debian, RHEL, macOS. Includes GPU setup (CUDA/ROCm), dependencies, and configuration. Get started in 5 minutes.',
  keywords: [
    'install NeuronDB',
    'NeuronDB installation',
    'PostgreSQL vector database setup',
    'pgvector alternative',
    'vector database installation',
    'PostgreSQL AI extension',
    'NeuronDB Ubuntu',
    'NeuronDB Docker',
    'GPU database setup',
    'CUDA PostgreSQL',
    'install pgvector alternative'
  ],
  openGraph: {
    title: 'Install NeuronDB - PostgreSQL Vector Database Extension',
    description: 'Step-by-step guide to install NeuronDB on PostgreSQL 12-17. Supports Ubuntu, Debian, RHEL, macOS with optional GPU acceleration.',
    url: 'https://www.pgelephant.com/docs/neurondb/installation',
  },
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/neurondb/installation',
  },
}

import React from 'react'
import Link from 'next/link'
import { Terminal, CheckCircle, AlertCircle, Download, BookOpen, ExternalLink } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)' }}>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-white mb-4">
                NeurondB Installation Guide
              </h1>
              <p className="text-xl text-white/70">
                Complete installation instructions for all supported platforms
              </p>
            </div>

            {/* Prerequisites */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6">Prerequisites</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    System Requirements
                  </h3>
                  <ul className="space-y-2 text-white/80">
                    <li>• PostgreSQL 16, 17, or 18</li>
                    <li>• Minimum 4GB RAM (8GB+ recommended)</li>
                    <li>• SSD storage for optimal index performance</li>
                    <li>• Network access for model downloads</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                    Build Dependencies
                  </h3>
                  <ul className="space-y-2 text-white/80">
                    <li>• GCC 7.0+ or Clang 10.0+</li>
                    <li>• PostgreSQL development headers</li>
                    <li>• libcurl (for ML model runtime)</li>
                    <li>• OpenSSL (for encryption)</li>
                    <li>• zlib (for compression)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Ubuntu/Debian */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Terminal className="w-8 h-8 text-indigo-400" />
                Ubuntu / Debian
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Step 1: Install PostgreSQL</h3>
                  <div className="bg-slate-900/80 rounded-lg p-4">
                    <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`
sudo apt-get update
sudo apt-get install -y postgresql-17 \\
    postgresql-server-dev-17 \\
    postgresql-contrib-17`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Step 2: Install Build Dependencies</h3>
                  <div className="bg-slate-900/80 rounded-lg p-4">
                    <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`
sudo apt-get install -y \\
    build-essential \\
    libcurl4-openssl-dev \\
    libssl-dev \\
    zlib1g-dev \\
    pkg-config`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Step 3: Build and Install</h3>
                  <div className="bg-slate-900/80 rounded-lg p-4">
                    <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`
git clone https://github.com/pgElephant/NeurondB.git
cd NeurondB
make PG_CONFIG=/usr/lib/postgresql/17/bin/pg_config
sudo make install PG_CONFIG=/usr/lib/postgresql/17/bin/pg_config`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Step 4: Verify Installation</h3>
                  <div className="bg-slate-900/80 rounded-lg p-4">
                    <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`
ls -lh /usr/lib/postgresql/17/lib/neurondb.so
ls -lh /usr/share/postgresql/17/extension/neurondb*`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* macOS */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Terminal className="w-8 h-8 text-indigo-400" />
                macOS
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Step 1: Install PostgreSQL via Homebrew</h3>
                  <div className="bg-slate-900/80 rounded-lg p-4">
                    <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`
brew install postgresql@17
brew services start postgresql@17`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Step 2: Build and Install</h3>
                  <div className="bg-slate-900/80 rounded-lg p-4">
                    <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`
git clone https://github.com/pgElephant/NeurondB.git
cd NeurondB
make PG_CONFIG=/opt/homebrew/opt/postgresql@17/bin/pg_config
sudo make install PG_CONFIG=/opt/homebrew/opt/postgresql@17/bin/pg_config`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Rocky Linux */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Terminal className="w-8 h-8 text-indigo-400" />
                Rocky Linux / RHEL
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Step 1: Install PostgreSQL</h3>
                  <div className="bg-slate-900/80 rounded-lg p-4">
                    <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`
sudo dnf install -y \\
    postgresql17-server \\
    postgresql17-devel \\
    postgresql17-contrib`}
                        </pre>
                      </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Step 2: Install Build Dependencies</h3>
                  <div className="bg-slate-900/80 rounded-lg p-4">
                    <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`
sudo dnf install -y \\
    gcc \\
    make \\
    curl-devel \\
    openssl-devel \\
    zlib-devel`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Step 3: Build and Install</h3>
                  <div className="bg-slate-900/80 rounded-lg p-4">
                    <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`
git clone https://github.com/pgElephant/NeurondB.git
cd NeurondB
make PG_CONFIG=/usr/pgsql-17/bin/pg_config
sudo make install PG_CONFIG=/usr/pgsql-17/bin/pg_config`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Post-Installation */}
            <div className="bg-indigo-500/20 backdrop-blur-sm rounded-xl border border-indigo-400/30 p-8 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6">Post-Installation</h2>
              
              <div className="bg-slate-900/80 rounded-lg p-4 mb-6">
                <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`
-- Connect to your database
psql -d mydb

-- Create extension
CREATE EXTENSION neurondb;

-- Verify installation
SELECT extversion FROM pg_extension WHERE extname = 'neurondb';`}
                </pre>
              </div>

              <div className="flex gap-4">
                <Link 
                  href="/docs/neurondb/getting-started"
                  className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <BookOpen className="w-5 h-5" />
                  Getting Started Guide
                </Link>
                <Link 
                  href="/docs/neurondb/features/vector-types"
                  className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  Learn Vector Types
                </Link>
              </div>
            </div>

            {/* Troubleshooting */}
            <div className="bg-yellow-500/20 backdrop-blur-sm rounded-xl border border-yellow-400/30 p-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-yellow-400" />
                Troubleshooting
              </h2>
              <ul className="space-y-2 text-white/80">
                <li>• <strong>Build fails:</strong> Ensure PostgreSQL development headers are installed</li>
                <li>• <strong>Extension not found:</strong> Verify PG_CONFIG path points to correct PostgreSQL version</li>
                <li>• <strong>Permission denied:</strong> Use sudo for make install step</li>
                <li>• <strong>Missing libraries:</strong> Install all build dependencies listed above</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

