'use client'

import React, { useState } from 'react'
import { ArrowRight, Download, BookOpen, Code, Server, Zap, Shield, Globe, Database, Cpu, Activity, Users, Settings, BarChart3, GitBranch, Crown, Wifi, CheckCircle, AlertTriangle, Terminal, Copy } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Colors from pgElephant icon (darker variants)
const palette = {
  iconTeal: '#025A6B',
  iconTealLight: '#036B7D',
  iconTealMedium: '#045E70',
  iconTealDark: '#054A56',
  // Supporting colors
  navy: '#1E293B',
  navyDeep: '#0F172A',
  slate: '#334155',
  cyan: '#0EA5E9',
  cyanDeep: '#0284C7',
  teal: '#14B8A6',
  tealDeep: '#0D9488',
  gray100: '#F8FAFC',
  gray300: '#CBD5E1',
  white: '#FFFFFF',
  orange: '#F97316',
  orangeDark: '#EA580C'
}

const RamGettingStartedPage = () => {
  const [copiedCode, setCopiedCode] = useState('')

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(''), 2000)
  }

  const codeBlocks = {
    install: `# Prerequisites
sudo apt-get update
sudo apt-get install -y build-essential cmake libpq-dev postgresql-server-dev-17 git golang-go

# Clone and build RAM from source
git clone https://github.com/pgElephant/ram.git
cd ram

# Build all components
make clean
make all

# Install components system-wide
sudo make install

# Build creates three main components:
# - pgraft: PostgreSQL extension (lib/pgraft.so)
# - ramd: Cluster management daemon (bin/ramd)
# - ramctrl: Command-line control utility (bin/ramctrl)

# Verify installation
ramd --version
ramctrl --help
psql -d postgres -c "SELECT * FROM pg_extension WHERE extname = 'pgraft';"`,

    config: `# /etc/ramd/ramd.conf
[cluster]
name = "my-postgres-cluster"
nodes = ["127.0.0.1:7400", "127.0.0.1:7401", "127.0.0.1:7402"]
auto_failover = true
failover_timeout = 30s
max_nodes = 7

[postgresql]
primary_host = "127.0.0.1"
primary_port = 5432
replica_ports = [5433, 5434]
data_directory = "/var/lib/postgresql/data"
log_directory = "/var/log/postgresql"
user = "postgres"
password = "your_secure_password"

[raft]
election_timeout = 150ms
heartbeat_interval = 50ms
snapshot_interval = 1000
max_log_entries = 10000
commit_timeout = 100ms

[replication]
synchronous_standby_names = "ANY 2 (replica1, replica2)"
synchronous_commit = on
wal_level = replica
max_wal_senders = 10
max_replication_slots = 10

[backup]
enabled = true
backup_directory = "/var/backups/postgresql"
retention_days = 7
compression = true
schedule = "0 2 * * *"  # Daily at 2 AM

[monitoring]
prometheus_port = 9090
grafana_enabled = true
health_check_interval = 5s
metrics_interval = 10s
log_level = "info"

[security]
tls_enabled = false
tls_cert_file = "/etc/ssl/certs/ramd.crt"
tls_key_file = "/etc/ssl/private/ramd.key"
auth_enabled = true
auth_token = "your_auth_token"

[api]
http_port = 8080
enable_cors = true
rate_limit = 1000  # requests per minute`,

    start: `# Configure PostgreSQL for pgraft extension
sudo -u postgres psql -c "CREATE EXTENSION IF NOT EXISTS pgraft;"
sudo -u postgres psql -c "SELECT pgraft_init();"

# Create cluster configuration
sudo mkdir -p /etc/ramd
sudo cp ramd.conf /etc/ramd/

# Start RAM daemon
sudo systemctl start ramd

# Check status
sudo systemctl status ramd
ramctrl status

# View logs
sudo journalctl -u ramd -f

# Create a 3-node PostgreSQL cluster
ramctrl cluster create --num-nodes=3 --primary-port=5432 --replica-ports=5433,5434

# Verify cluster creation
ramctrl cluster status
ramctrl nodes list

# Test failover
ramctrl cluster failover --target-node=replica1

# Monitor cluster health
ramctrl monitor --interval 5s

# Access REST API
curl -H "Authorization: Bearer your_auth_token" \\
  http://localhost:8080/api/v1/cluster/status`
  }

  const steps = [
    {
      number: 1,
      title: 'Install RAM',
      description: 'Download and install all RAM components (pgraft, ramd, ramctrl)',
      icon: Download,
      color: palette.cyan
    },
    {
      number: 2,
      title: 'Setup pgraft Extension',
      description: 'Install and configure the pgraft PostgreSQL extension',
      icon: Database,
      color: palette.teal
    },
    {
      number: 3,
      title: 'Configure ramd Daemon',
      description: 'Set up and start the RAM cluster management daemon',
      icon: Settings,
      color: palette.navy
    },
    {
      number: 4,
      title: 'Control with ramctrl',
      description: 'Manage cluster operations using the command-line interface',
      icon: Terminal,
      color: palette.slate
    }
  ]

  return (
    <div className="pt-16">
      {/* Header */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${palette.iconTealDark}, ${palette.iconTeal}, ${palette.iconTealLight})`
        }}
      >
        <div className="container-wide py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mr-6">
                <Image
                  src="/ico/RAM_HD.ico"
                  alt="RAM icon"
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain"
                  priority
                />
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl text-white mb-2">
                  RAM Getting Started
                </h1>
                <p className="text-xl text-gray-300">
                  Set up your first PostgreSQL cluster
                </p>
              </div>
            </div>
            <p className="text-xl mb-8 leading-relaxed" style={{ color: palette.gray100 }}>
              Get RAM up and running in minutes with automatic failover for PostgreSQL.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Start Steps */}
      <div className="bg-white py-20">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl text-gray-900 mb-12 text-center">
              Quick Start Guide
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {steps.map((step) => (
                <div key={step.number} className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${step.color}15` }}
                  >
                    <step.icon className="w-8 h-8" style={{ color: step.color }} />
                  </div>
                  <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Installation Steps */}
      <div className="bg-gray-50 py-20">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl text-gray-900 mb-8 text-center">
              Installation Steps
            </h2>

            {/* Step 1: Install */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center mr-4 text-sm font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Install RAM Binary
                </h3>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 relative">
                <pre className="text-gray-100 text-sm overflow-x-auto">
                  <code>{codeBlocks.install}</code>
                </pre>
                <button
                  onClick={() => copyToClipboard(codeBlocks.install, 'install')}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
                >
                  {copiedCode === 'install' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Step 2: Setup pgraft Extension */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center mr-4 text-sm font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Setup pgraft PostgreSQL Extension
                </h3>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 relative">
                <pre className="text-gray-100 text-sm overflow-x-auto">
                  <code>{codeBlocks.config}</code>
                </pre>
                <button
                  onClick={() => copyToClipboard(codeBlocks.config, 'config')}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
                >
                  {copiedCode === 'config' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Step 3: Configure ramd Daemon */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center mr-4 text-sm font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Configure and Start ramd Daemon
                </h3>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 relative">
                <pre className="text-gray-100 text-sm overflow-x-auto">
                  <code>{codeBlocks.start}</code>
                </pre>
                <button
                  onClick={() => copyToClipboard(codeBlocks.start, 'start')}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
                >
                  {copiedCode === 'start' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Step 4: Control with ramctrl */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-4 text-sm font-bold">
                  4
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Control Cluster with ramctrl
                </h3>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 relative">
                <pre className="text-gray-100 text-sm overflow-x-auto">
                  <code>{codeBlocks.start}</code>
                </pre>
                <button
                  onClick={() => copyToClipboard(codeBlocks.start, 'start')}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
                >
                  {copiedCode === 'start' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white py-20">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl text-gray-900 mb-6">
              What's Next?
            </h2>
            <p className="text-lg text-gray-600 mb-12 leading-relaxed">
              Your RAM cluster is ready! Explore these next steps.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link
                href="/docs/ram/configuration"
                className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow text-left"
              >
                <Settings className="w-8 h-8 text-cyan-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Configuration
                </h3>
                <p className="text-gray-600 text-sm">
                  Learn about advanced configuration options.
                </p>
              </Link>

              <Link
                href="/docs/ram/monitoring"
                className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow text-left"
              >
                <BarChart3 className="w-8 h-8 text-teal-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Monitoring
                </h3>
                <p className="text-gray-600 text-sm">
                  Set up Prometheus metrics and dashboards.
                </p>
              </Link>

              <Link
                href="/docs/ram/api"
                className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow text-left"
              >
                <Code className="w-8 h-8 text-orange-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  API Reference
                </h3>
                <p className="text-gray-600 text-sm">
                  Explore the REST API for cluster management.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RamGettingStartedPage