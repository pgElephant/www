import React from 'react'
import { Settings, Database, Code, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'FauxDB Configuration | Documentation',
  description: 'Complete configuration guide for FauxDB - MongoDB and MySQL wire protocol server with PostgreSQL backend',
}

const FauxDBConfigurationPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/docs/fauxdb" 
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-6 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to FauxDB Documentation
          </Link>
          
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-400">
            FauxDB Configuration
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            Complete guide to configuring FauxDB for MongoDB and MySQL wire protocol support with PostgreSQL backend.
          </p>
        </div>

        {/* Configuration File */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Settings className="w-8 h-8 text-emerald-400" />
            Configuration File
          </h2>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-emerald-400/30 mb-6">
            <p className="text-slate-300 mb-4">
              FauxDB uses a TOML configuration file located at <code className="text-emerald-400 bg-slate-900/50 px-2 py-1 rounded">/etc/fauxdb/config.toml</code>
            </p>
            
            <div className="bg-slate-900/50 rounded-lg p-6 overflow-x-auto">
              <pre className="text-sm">
                <code className="text-green-400">{`# FauxDB Configuration File
# /etc/fauxdb/config.toml

[server]
# Server bind address
bind_address = "0.0.0.0"

# MongoDB wire protocol port
mongodb_port = 27017

# MySQL wire protocol port  
mysql_port = 3306

# Number of worker threads
worker_threads = 4

# Maximum concurrent connections
max_connections = 1000

[postgresql]
# PostgreSQL connection string
connection_string = "host=localhost port=5432 user=fauxdb password=secret dbname=fauxdb"

# Connection pool settings
pool_min_size = 10
pool_max_size = 100
pool_timeout = 30

# Statement timeout (seconds)
statement_timeout = 300

[logging]
# Log level: trace, debug, info, warn, error
level = "info"

# Log format: json, text
format = "json"

# Log output: stdout, file
output = "stdout"

# Log file path (when output = "file")
file_path = "/var/log/fauxdb/fauxdb.log"

# Log rotation
rotate_size = "100MB"
rotate_count = 10

[security]
# Enable TLS/SSL
tls_enabled = false

# TLS certificate path
tls_cert = "/etc/fauxdb/certs/server.crt"

# TLS key path
tls_key = "/etc/fauxdb/certs/server.key"

# Require client certificates
require_client_cert = false

# Client certificate CA
client_ca = "/etc/fauxdb/certs/ca.crt"

[mongodb]
# Enable MongoDB wire protocol
enabled = true

# Default authentication database
auth_database = "admin"

# Support MongoDB authentication
auth_enabled = true

# Supported authentication mechanisms
auth_mechanisms = ["SCRAM-SHA-256", "SCRAM-SHA-1"]

[mysql]
# Enable MySQL wire protocol
enabled = true

# Default character set
charset = "utf8mb4"

# MySQL authentication
auth_enabled = true

[performance]
# Query cache size (MB)
query_cache_size = 256

# Enable query optimization
query_optimization = true

# Maximum query complexity
max_query_complexity = 1000

# Statement cache size
statement_cache_size = 1000

[monitoring]
# Enable Prometheus metrics
prometheus_enabled = true

# Prometheus metrics port
prometheus_port = 9090

# Metrics endpoint path
metrics_path = "/metrics"

# Health check endpoint
health_check_path = "/health"`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* PostgreSQL Backend Configuration */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Database className="w-8 h-8 text-cyan-400" />
            PostgreSQL Backend Configuration
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/30">
              <h3 className="text-xl font-bold text-cyan-300 mb-4">Required PostgreSQL Extensions</h3>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <pre className="text-sm">
                  <code className="text-green-400">{`-- Install required extensions
CREATE EXTENSION IF NOT EXISTS hstore;
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS btree_gin;
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- FauxDB uses JSONB for document storage
-- No additional setup required for JSONB`}</code>
                </pre>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/30">
              <h3 className="text-xl font-bold text-cyan-300 mb-4">Database Schema Setup</h3>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <pre className="text-sm">
                  <code className="text-green-400">{`-- Create FauxDB database
CREATE DATABASE fauxdb;

-- Create FauxDB user
CREATE USER fauxdb WITH PASSWORD 'your_secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE fauxdb TO fauxdb;

-- Connect to fauxdb database
\\c fauxdb

-- FauxDB will automatically create required tables
-- But you can pre-create them for better control:

CREATE TABLE IF NOT EXISTS _fauxdb_collections (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  options JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS _fauxdb_indexes (
  id SERIAL PRIMARY KEY,
  collection_name TEXT NOT NULL,
  index_name TEXT NOT NULL,
  index_spec JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(collection_name, index_name)
);`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* MongoDB Protocol Configuration */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">MongoDB Protocol Settings</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
              <h3 className="text-lg font-bold text-purple-300 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Authentication
              </h3>
              <p className="text-slate-300 text-sm mb-4">
                Configure MongoDB authentication mechanisms and security
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">SCRAM-SHA-256:</span>
                  <span className="text-green-400">Recommended</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">SCRAM-SHA-1:</span>
                  <span className="text-yellow-400">Legacy support</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">X.509:</span>
                  <span className="text-slate-400">Not yet supported</span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
              <h3 className="text-lg font-bold text-purple-300 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Compatibility
              </h3>
              <p className="text-slate-300 text-sm mb-4">
                MongoDB wire protocol version compatibility
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Protocol Version:</span>
                  <span className="text-white">6.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">mongosh:</span>
                  <span className="text-green-400">Compatible</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Drivers:</span>
                  <span className="text-green-400">All versions</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MySQL Protocol Configuration */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">MySQL Protocol Settings</h2>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-400/30">
            <h3 className="text-xl font-bold text-blue-300 mb-4">Character Sets & Collations</h3>
            <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
              <pre className="text-sm">
                <code className="text-green-400">{`[mysql]
# Default character set
charset = "utf8mb4"

# Default collation
collation = "utf8mb4_unicode_ci"

# Supported character sets
supported_charsets = ["utf8mb4", "utf8", "latin1", "ascii"]`}</code>
              </pre>
            </div>
            <p className="text-slate-300 text-sm">
              FauxDB automatically handles character set conversions between MySQL protocol and PostgreSQL backend.
            </p>
          </div>
        </section>

        {/* Performance Tuning */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Performance Tuning</h2>
          
          <div className="space-y-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-orange-400/30">
              <h3 className="text-lg font-bold text-orange-300 mb-3">Connection Pooling</h3>
              <p className="text-slate-300 text-sm mb-4">
                Optimize PostgreSQL connection pool for your workload:
              </p>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <pre className="text-sm">
                  <code className="text-green-400">{`# For OLTP workloads (many short queries)
pool_min_size = 20
pool_max_size = 200
pool_timeout = 10

# For OLAP workloads (fewer long queries)
pool_min_size = 5
pool_max_size = 50
pool_timeout = 60`}</code>
                </pre>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-orange-400/30">
              <h3 className="text-lg font-bold text-orange-300 mb-3">Query Optimization</h3>
              <p className="text-slate-300 text-sm mb-4">
                Enable query caching and optimization:
              </p>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <pre className="text-sm">
                  <code className="text-green-400">{`[performance]
# Query cache (increases memory usage but improves performance)
query_cache_size = 512  # MB

# Statement cache (prepared statements)
statement_cache_size = 2000

# Query optimization
query_optimization = true
max_query_complexity = 5000`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Environment Variables */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Environment Variables</h2>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-green-400/30">
            <p className="text-slate-300 mb-4">
              Configuration can be overridden using environment variables:
            </p>
            <div className="bg-slate-900/50 rounded-lg p-4">
              <pre className="text-sm">
                <code className="text-green-400">{`# Server configuration
FAUXDB_BIND_ADDRESS="0.0.0.0"
FAUXDB_MONGODB_PORT=27017
FAUXDB_MYSQL_PORT=3306

# PostgreSQL connection
FAUXDB_PG_CONNECTION_STRING="postgresql://user:pass@localhost/fauxdb"
FAUXDB_PG_POOL_MAX_SIZE=100

# Logging
FAUXDB_LOG_LEVEL="info"
FAUXDB_LOG_FORMAT="json"

# Security
FAUXDB_TLS_ENABLED=false
FAUXDB_TLS_CERT="/path/to/cert.pem"
FAUXDB_TLS_KEY="/path/to/key.pem"

# Monitoring
FAUXDB_PROMETHEUS_ENABLED=true
FAUXDB_PROMETHEUS_PORT=9090`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Related Documentation */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Related Documentation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/docs/fauxdb/getting-started"
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-emerald-400/50 transition-all group"
            >
              <span className="font-semibold">Getting Started Guide</span>
              <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/docs/fauxdb/production"
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-emerald-400/50 transition-all group"
            >
              <span className="font-semibold">Production Deployment</span>
              <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/docs/fauxdb/monitoring"
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-emerald-400/50 transition-all group"
            >
              <span className="font-semibold">Monitoring Setup</span>
              <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/docs/fauxdb/troubleshooting"
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-emerald-400/50 transition-all group"
            >
              <span className="font-semibold">Troubleshooting Guide</span>
              <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default FauxDBConfigurationPage
