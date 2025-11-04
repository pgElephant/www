export const metadata = {
  title: 'NeuronDB · Getting Started',
  description: 'Create the extension, define a table with vectors, run first ANN queries, and understand the basic vector types.',
}


import React from 'react'
import Link from 'next/link'
import { Terminal, Download, BookOpen, Play, CheckCircle, AlertCircle, Code, Database, Zap } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)' }}>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.15),transparent_60%)]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Terminal className="w-4 h-4" />
              Getting Started
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                NeurondB
              </span>
              <br />
              <span className="text-3xl md:text-4xl text-white/90">
                Quick Start Guide
              </span>
            </h1>
            
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Get NeurondB up and running in minutes. NeurondB is a production-ready PostgreSQL extension that transforms your database into an AI platform with vector search, ML inference, and hybrid retrieval.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link href="#installation" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                <Download className="w-5 h-5" />
                Installation
              </Link>
              <Link href="#quick-start" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                <Play className="w-5 h-5" />
                Quick Start
              </Link>
              <Link href="/docs/neurondb/installation" className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                <BookOpen className="w-5 h-5" />
                Full Installation Guide
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
              <p className="text-xl text-white/70">Install NeurondB on your system with these simple steps</p>
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
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                    PostgreSQL 16, 17, or 18
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                    PostgreSQL development headers
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                    GCC C compiler
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                    Build tools (make, autoconf)
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
                    Minimum 4GB RAM recommended
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    SSD storage for index performance
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    Network access for model downloads
                  </li>
                </ul>
              </div>
            </div>

            {/* Ubuntu/Debian Installation */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="w-6 h-6 text-indigo-400" />
                <h3 className="text-2xl font-bold text-white">Ubuntu/Debian</h3>
              </div>
              
              <div className="bg-slate-900/80 rounded-lg p-6 mb-6">
                <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`
# Install PostgreSQL development packages
sudo apt-get update
sudo apt-get install -y postgresql-17 \\
    postgresql-server-dev-17 \\
    build-essential \\
    libcurl4-openssl-dev \\
    libssl-dev \\
    zlib1g-dev

# Clone and build NeurondB
git clone https://github.com/pgElephant/NeurondB.git
cd NeurondB
make PG_CONFIG=/usr/lib/postgresql/17/bin/pg_config
sudo make install PG_CONFIG=/usr/lib/postgresql/17/bin/pg_config`}
                </pre>
              </div>
            </div>

            {/* macOS Installation */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="w-6 h-6 text-indigo-400" />
                <h3 className="text-2xl font-bold text-white">macOS</h3>
              </div>
              
              <div className="bg-slate-900/80 rounded-lg p-6 mb-6">
                <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`
# Install PostgreSQL via Homebrew
brew install postgresql@17

# Clone and build NeurondB
git clone https://github.com/pgElephant/NeurondB.git
cd NeurondB
make PG_CONFIG=/opt/homebrew/opt/postgresql@17/bin/pg_config
sudo make install PG_CONFIG=/opt/homebrew/opt/postgresql@17/bin/pg_config`}
                </pre>
              </div>
            </div>

            {/* Rocky Linux Installation */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="w-6 h-6 text-indigo-400" />
                <h3 className="text-2xl font-bold text-white">Rocky Linux / RHEL</h3>
              </div>
              
              <div className="bg-slate-900/80 rounded-lg p-6 mb-6">
                <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`
# Install PostgreSQL development packages
sudo dnf install -y postgresql17-server \\
    postgresql17-devel \\
    gcc \\
    make \\
    curl-devel \\
    openssl-devel \\
    zlib-devel

# Clone and build NeurondB
git clone https://github.com/pgElephant/NeurondB.git
cd NeurondB
make PG_CONFIG=/usr/pgsql-17/bin/pg_config
sudo make install PG_CONFIG=/usr/pgsql-17/bin/pg_config`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section id="quick-start" className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Quick Start</h2>
              <p className="text-xl text-white/70">Create your first vector search in minutes</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Database className="w-6 h-6 text-indigo-400" />
                Step 1: Create Extension
              </h3>
              
              <div className="bg-slate-900/80 rounded-lg p-6 mb-4">
                <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`
CREATE EXTENSION neurondb;`}
                </pre>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Code className="w-6 h-6 text-indigo-400" />
                Step 2: Create Table with Vector Column
              </h3>
              
              <div className="bg-slate-900/80 rounded-lg p-6 mb-4">
                <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    title TEXT,
    content TEXT,
    embedding vector(384)
);`}
                </pre>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Zap className="w-6 h-6 text-indigo-400" />
                Step 3: Generate Embeddings and Search
              </h3>
              
              <div className="bg-slate-900/80 rounded-lg p-6 mb-4">
                <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`
-- Insert document with embedding
INSERT INTO documents (title, content, embedding) VALUES
    ('Machine Learning', 'Introduction to ML', 
     embed_text('Introduction to Machine Learning'));

-- Semantic search
SELECT title, content,
       embedding <-> embed_text('artificial intelligence') AS distance
FROM documents
ORDER BY distance
LIMIT 10;`}
                </pre>
              </div>
            </div>

            <div className="bg-indigo-500/20 backdrop-blur-sm rounded-xl border border-indigo-400/30 p-8">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">You're Ready!</h3>
                  <p className="text-white/80 mb-4">
                    NeurondB is now installed and ready to use. Explore advanced features like HNSW indexing, 
                    hybrid search, and RAG pipelines in our comprehensive documentation.
                  </p>
                  <div className="flex gap-4">
                    <Link 
                      href="/docs/neurondb/features/vector-types"
                      className="text-indigo-300 hover:text-indigo-200 font-semibold"
                    >
                      Learn about Vector Types →
                    </Link>
                    <Link 
                      href="/docs/neurondb/ml/embeddings"
                      className="text-indigo-300 hover:text-indigo-200 font-semibold"
                    >
                      Understanding Embeddings →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

