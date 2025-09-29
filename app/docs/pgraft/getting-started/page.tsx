import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Terminal, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  Code, 
  Database,
  Settings,
  Play,
  ExternalLink,
  BookOpen
} from 'lucide-react'

export const metadata = {
  title: 'Getting Started with pgraft | pgElephant',
  description: 'Learn how to install and configure pgraft, the PostgreSQL Raft extension for distributed database systems.',
  keywords: 'pgraft getting started, postgresql raft, install pgraft, raft consensus setup'
}

const PgraftGettingStartedPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-50 to-white">
        <div className="container-wide py-16">
          <div className="flex items-center mb-8">
            <Image 
              src="/ico/pgsql_raft_leader_HD.ico" 
              alt="pgraft icon"
              width={48}
              height={48}
              className="w-12 h-12 mr-4 object-contain"
            />
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Getting Started with pgraft
              </h1>
              <p className="text-xl text-slate-600">
                PostgreSQL Raft Extension Setup Guide
              </p>
            </div>
          </div>
          
          <p className="text-lg text-slate-700 mb-8 max-w-3xl leading-relaxed">
            This guide will walk you through installing and configuring pgraft, the PostgreSQL extension that implements the Raft consensus protocol for distributed database systems.
          </p>
        </div>
      </div>

      {/* Prerequisites Section */}
      <div className="py-16">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Prerequisites
          </h2>
          
          <div className="professional-card p-8 mb-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
              <CheckCircle className="w-6 h-6 mr-3 text-green-500" />
              System Requirements
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Software Dependencies</h4>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    PostgreSQL 13+ (recommended 14+)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    GCC or Clang compiler
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Make build system
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    PostgreSQL development headers
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Operating Systems</h4>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Linux (Ubuntu 20.04+, CentOS 8+, RHEL 8+)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    macOS 11+ (Intel and Apple Silicon)
                  </li>
                  <li className="flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2 text-orange-500" />
                    Windows (experimental support)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Installation Section */}
      <div className="py-16 bg-slate-50">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Installation
          </h2>
          
          {/* Method 1: From Source */}
          <div className="professional-card p-8 mb-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
              <Terminal className="w-6 h-6 mr-3 text-blue-500" />
              Build from Source
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">1. Clone the Repository</h4>
                <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                  <code className="text-green-400 text-sm">
                    git clone https://github.com/pgElephant/pgraft.git<br/>
                    cd pgraft
                  </code>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">2. Build the Extension</h4>
                <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                  <code className="text-green-400 text-sm">
                    make clean<br/>
                    make<br/>
                    sudo make install
                  </code>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">3. Install in PostgreSQL</h4>
                <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                  <code className="text-green-400 text-sm">
                    psql -d your_database -c "CREATE EXTENSION pgraft;"
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Method 2: Package Managers */}
          <div className="professional-card p-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
              <Download className="w-6 h-6 mr-3 text-green-500" />
              Package Managers
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Ubuntu/Debian</h4>
                <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                  <code className="text-green-400 text-sm">
                    sudo apt-get install postgresql-14-pgraft
                  </code>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">RHEL/CentOS</h4>
                <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                  <code className="text-green-400 text-sm">
                    sudo yum install postgresql14-pgraft
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Configuration Section */}
      <div className="py-16">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Basic Configuration
          </h2>
          
          <div className="professional-card p-8 mb-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
              <Settings className="w-6 h-6 mr-3 text-purple-500" />
              PostgreSQL Configuration
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">1. Update postgresql.conf</h4>
                <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                  <code className="text-green-400 text-sm">
                    # Add to postgresql.conf<br/>
                    shared_preload_libraries = 'pgraft'<br/>
                    pgraft.node_id = 1<br/>
                    pgraft.cluster_nodes = 'node1:5432,node2:5432,node3:5432'<br/>
                    pgraft.data_dir = '/var/lib/postgresql/pgraft'
                  </code>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">2. Initialize Raft Cluster</h4>
                <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                  <code className="text-green-400 text-sm">
                    SELECT pgraft_init_cluster();<br/>
                    SELECT pgraft_add_node('node2', '192.168.1.102', 5432);<br/>
                    SELECT pgraft_add_node('node3', '192.168.1.103', 5432);
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Section */}
      <div className="py-16 bg-slate-50">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Quick Start Example
          </h2>
          
          <div className="professional-card p-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
              <Play className="w-6 h-6 mr-3 text-green-500" />
              Create Your First Raft Cluster
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">1. Start PostgreSQL with pgraft</h4>
                <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                  <code className="text-green-400 text-sm">
                    sudo systemctl restart postgresql<br/>
                    psql -d postgres -c "CREATE EXTENSION pgraft;"
                  </code>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">2. Check Cluster Status</h4>
                <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                  <code className="text-green-400 text-sm">
                    SELECT * FROM pgraft_cluster_status();<br/>
                    SELECT * FROM pgraft_node_info();
                  </code>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">3. Test Replication</h4>
                <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                  <code className="text-green-400 text-sm">
                    CREATE TABLE test_table (id SERIAL PRIMARY KEY, data TEXT);<br/>
                    INSERT INTO test_table (data) VALUES ('Hello from Raft!');<br/>
                    SELECT * FROM test_table;
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps Section */}
      <div className="py-16">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Next Steps
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/docs/pgraft/configuration" className="professional-card p-6 block hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mr-4">
                  <Settings className="w-5 h-5 text-slate-700" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-slate-700">
                  Configuration
                </h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Learn about advanced configuration options and cluster tuning.
              </p>
            </Link>
            
            <Link href="/docs/pgraft/sql-functions" className="professional-card p-6 block hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mr-4">
                  <Database className="w-5 h-5 text-slate-700" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-slate-700">
                  SQL Functions
                </h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Explore the complete SQL function API for cluster management.
              </p>
            </Link>
            
            <a 
              href="https://github.com/pgElephant/pgraft" 
              target="_blank" 
              rel="noopener noreferrer"
              className="professional-card p-6 block hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mr-4">
                  <ExternalLink className="w-5 h-5 text-slate-700" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 group-hover:text-slate-700">
                  GitHub
                </h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                View source code, report issues, and contribute to development.
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PgraftGettingStartedPage