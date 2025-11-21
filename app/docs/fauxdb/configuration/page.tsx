import { Metadata } from 'next'
import Link from 'next/link'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'FauxDB Configuration | Complete Configuration Guide',
  description:
    'Complete configuration guide for FauxDB - MongoDB and MySQL wire protocol server with PostgreSQL backend. Configuration files, environment variables, and performance tuning.',
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/fauxdb/configuration',
  },
}

const tableOfContents: TocItem[] = [
  { id: 'configuration-file', title: 'Configuration File' },
  { id: 'postgresql-backend', title: 'PostgreSQL Backend Configuration' },
  { id: 'mongodb-protocol', title: 'MongoDB Protocol Settings' },
  { id: 'mysql-protocol', title: 'MySQL Protocol Settings' },
  { id: 'performance-tuning', title: 'Performance Tuning' },
  { id: 'environment-variables', title: 'Environment Variables' },
]

const prevLink: NavLink = {
  href: '/docs/fauxdb/docker',
  label: 'Docker',
}

const nextLink: NavLink = {
  href: '/docs/fauxdb/monitoring',
  label: 'Monitoring',
}

export default function FauxDBConfigurationPage() {
  return (
    <PostgresDocsLayout
      title="FauxDB Configuration"
      version="FauxDB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="configuration-file">
        <h2>Configuration File</h2>
        <p>
          FauxDB uses a TOML configuration file located at <code>/etc/fauxdb/config.toml</code>
        </p>

        <BashCodeBlock
          title="Complete configuration example"
          code={`# FauxDB Configuration File
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
health_check_path = "/health"`}
        />
      </section>

      <section id="postgresql-backend">
        <h2>PostgreSQL Backend Configuration</h2>
        <p>Configure PostgreSQL connection and required extensions.</p>

        <h3>Required PostgreSQL Extensions</h3>
        <SqlCodeBlock
          title="Install extensions"
          code={`-- Install required extensions
CREATE EXTENSION IF NOT EXISTS hstore;
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS btree_gin;
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- FauxDB uses JSONB for document storage
-- No additional setup required for JSONB`}
        />

        <h3>Database Schema Setup</h3>
        <SqlCodeBlock
          title="Create database and user"
          code={`-- Create FauxDB database
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
);`}
        />
      </section>

      <section id="mongodb-protocol">
        <h2>MongoDB Protocol Settings</h2>
        <p>Configure MongoDB wire protocol compatibility and authentication.</p>

        <h3>Authentication</h3>
        <ul>
          <li><strong>SCRAM-SHA-256:</strong> Recommended</li>
          <li><strong>SCRAM-SHA-1:</strong> Legacy support</li>
          <li><strong>X.509:</strong> Not yet supported</li>
        </ul>

        <h3>Compatibility</h3>
        <ul>
          <li><strong>Protocol Version:</strong> 6.0</li>
          <li><strong>mongosh:</strong> Compatible</li>
          <li><strong>Drivers:</strong> All versions</li>
        </ul>
      </section>

      <section id="mysql-protocol">
        <h2>MySQL Protocol Settings</h2>
        <p>Configure MySQL wire protocol character sets and collations.</p>

        <BashCodeBlock
          title="MySQL configuration"
          code={`[mysql]
# Default character set
charset = "utf8mb4"

# Default collation
collation = "utf8mb4_unicode_ci"

# Supported character sets
supported_charsets = ["utf8mb4", "utf8", "latin1", "ascii"]`}
        />
        <p>
          FauxDB automatically handles character set conversions between MySQL protocol and PostgreSQL backend.
        </p>
      </section>

      <section id="performance-tuning">
        <h2>Performance Tuning</h2>
        <p>Optimize FauxDB for your workload.</p>

        <h3>Connection Pooling</h3>
        <BashCodeBlock
          title="Connection pool settings"
          code={`# For OLTP workloads (many short queries)
pool_min_size = 20
pool_max_size = 200
pool_timeout = 10

# For OLAP workloads (fewer long queries)
pool_min_size = 5
pool_max_size = 50
pool_timeout = 60`}
        />

        <h3>Query Optimization</h3>
        <BashCodeBlock
          title="Query cache and optimization"
          code={`[performance]
# Query cache (increases memory usage but improves performance)
query_cache_size = 512  # MB

# Statement cache (prepared statements)
statement_cache_size = 2000

# Query optimization
query_optimization = true
max_query_complexity = 5000`}
        />
      </section>

      <section id="environment-variables">
        <h2>Environment Variables</h2>
        <p>Configuration can be overridden using environment variables.</p>

        <BashCodeBlock
          title="Environment variables"
          code={`# Server configuration
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
FAUXDB_PROMETHEUS_PORT=9090`}
        />
      </section>

      <section>
        <h2>Related Documentation</h2>
        <ul>
          <li><Link href="/docs/fauxdb/getting-started">Getting Started Guide</Link></li>
          <li><Link href="/docs/fauxdb/production">Production Deployment</Link></li>
          <li><Link href="/docs/fauxdb/monitoring">Monitoring Setup</Link></li>
          <li><Link href="/docs/fauxdb/troubleshooting">Troubleshooting Guide</Link></li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
