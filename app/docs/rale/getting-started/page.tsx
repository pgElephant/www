'use client'

import React, { useState } from 'react'
import { ArrowRight, Download, BookOpen, Code, Server, Zap, Shield, Globe, Database, Cpu, Activity, Users, Settings, BarChart3, GitBranch, Crown, Wifi, CheckCircle, AlertTriangle, Terminal, Copy } from 'lucide-react'
import Link from 'next/link'

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

const RaleGettingStartedPage = () => {
  const [copiedCode, setCopiedCode] = useState('')

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(''), 2000)
  }

  const codeBlocks = {
    install: `# Prerequisites
sudo apt-get update
sudo apt-get install -y build-essential cmake libpthread-stubs0-dev git

# Clone and build RALE from source
git clone https://github.com/pgElephant/rale.git
cd rale

# Build all components (always use build script)
./build.sh

# Build creates three main components:
# - librale: Core consensus library (lib/librale.so)
# - raled: Cluster management daemon (bin/raled)
# - ralectrl: Command-line control utility (bin/ralectrl)

# Install system-wide (optional)
sudo make install

# Verify installation
raled --version
ralectrl --help
ldconfig -p | grep librale`,

    config: `# /etc/raled/raled.conf
[cluster]
name = "my-rale-cluster"
nodes = ["127.0.0.1:7400", "127.0.0.1:7401", "127.0.0.1:7402"]
# Node configuration format: "ip:rale_port"
# Each node must have unique ports

[raft]
election_timeout = 150ms          # Leader election timeout
heartbeat_interval = 50ms         # Heartbeat frequency
snapshot_interval = 1000          # Log snapshot frequency
max_log_entries = 10000           # Maximum log entries before snapshot
commit_timeout = 100ms            # Commit operation timeout

[storage]
data_directory = "/var/lib/raled/data"
max_log_size = 100MB              # Maximum log file size
wal_directory = "/var/lib/raled/wal"
snapshot_directory = "/var/lib/raled/snapshots"
compression_enabled = true
compression_level = 6

[network]
rale_port = 7400                  # Consensus protocol port
dstore_port = 7500                # Distributed store port
bind_address = "0.0.0.0"          # Network binding address
connection_timeout = 30s          # Connection timeout
keepalive_interval = 10s          # TCP keepalive interval
max_connections = 100             # Maximum concurrent connections

[logging]
level = "info"                    # Log level: debug, info, warn, error
log_file = "/var/log/raled/raled.log"
max_log_size = 100MB
log_rotation = true
log_retention_days = 30

[security]
tls_enabled = false               # Enable TLS encryption
tls_cert_file = "/etc/ssl/certs/raled.crt"
tls_key_file = "/etc/ssl/private/raled.key"
tls_ca_file = "/etc/ssl/certs/ca.crt"`,

    start: `# Create data directories
sudo mkdir -p /var/lib/raled/{data,wal,snapshots}
sudo mkdir -p /var/log/raled
sudo chown -R $(whoami):$(whoami) /var/lib/raled /var/log/raled

# Start single node (foreground)
raled --config conf/raled1.conf --log-level debug

# Or start as daemon
raled --config conf/raled1.conf --daemon --pid-file /var/run/raled.pid

# Start three-node cluster (separate terminals)
# Terminal 1:
raled --config conf/raled1.conf --daemon

# Terminal 2:
raled --config conf/raled2.conf --daemon

# Terminal 3:
raled --config conf/raled3.conf --daemon

# Use CLI to manage cluster
ralectrl ADD --node-id 1 --node-name "node1" \\
  --node-ip "127.0.0.1" --rale-port 7400 --dstore-port 7500

ralectrl ADD --node-id 2 --node-name "node2" \\
  --node-ip "127.0.0.1" --rale-port 7401 --dstore-port 7501

ralectrl ADD --node-id 3 --node-name "node3" \\
  --node-ip "127.0.0.1" --rale-port 7402 --dstore-port 7502

# Check cluster status
ralectrl STATUS
ralectrl LIST
ralectrl HEALTH

# Monitor cluster in real-time
ralectrl MONITOR --interval 5s`,

    library: `# Example: Advanced librale integration with error handling
#include <librale.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <signal.h>

static volatile int running = 1;

void signal_handler(int sig) {
    printf("Received signal %d, shutting down...\\n", sig);
    running = 0;
}

int main() {
    rale_context_t *ctx;
    char buffer[1024];
    size_t len;
    int result;
    
    /* Set up signal handlers */
    signal(SIGINT, signal_handler);
    signal(SIGTERM, signal_handler);
    
    /* Create RALE context */
    ctx = librale_context_create();
    if (ctx == NULL) {
        fprintf(stderr, "Failed to create RALE context\\n");
        return 1;
    }
    
    /* Initialize cluster */
    result = librale_cluster_init();
    if (result != LIBRALE_SUCCESS) {
        fprintf(stderr, "Failed to initialize cluster: %d\\n", result);
        librale_context_destroy(ctx);
        return 1;
    }
    
    /* Add cluster nodes */
    librale_cluster_add_node(1, "node1", "127.0.0.1", 7400, 7500);
    librale_cluster_add_node(2, "node2", "127.0.0.1", 7401, 7501);
    librale_cluster_add_node(3, "node3", "127.0.0.1", 7402, 7502);
    
    /* Initialize RALE consensus */
    result = librale_rale_init(1, "./rale_data");
    if (result != LIBRALE_SUCCESS) {
        fprintf(stderr, "Failed to initialize RALE: %d\\n", result);
        librale_cleanup();
        librale_context_destroy(ctx);
        return 1;
    }
    
    /* Initialize distributed store */
    result = librale_dstore_init("./rale_data");
    if (result != LIBRALE_SUCCESS) {
        fprintf(stderr, "Failed to initialize DStore: %d\\n", result);
        librale_cleanup();
        librale_context_destroy(ctx);
        return 1;
    }
    
    /* Start services */
    librale_rale_start();
    librale_network_start(7400, 7500);
    
    printf("RALE services started successfully\\n");
    
    /* Store and retrieve data */
    const char *key = "user:123:profile";
    const char *value = "{\\"name\\": \\"John Doe\\", \\"email\\": \\"john@example.com\\"}";
    
    result = librale_dstore_put(key, value, strlen(value));
    if (result == LIBRALE_SUCCESS) {
        printf("Stored: %s = %s\\n", key, value);
    } else {
        fprintf(stderr, "Failed to store data: %d\\n", result);
    }
    
    /* Retrieve data */
    len = sizeof(buffer);
    result = librale_dstore_get(key, buffer, &len);
    if (result == LIBRALE_SUCCESS) {
        buffer[len] = '\\0';
        printf("Retrieved: %s = %s\\n", key, buffer);
    } else {
        fprintf(stderr, "Failed to retrieve data: %d\\n", result);
    }
    
    /* Monitor leadership changes */
    int current_leader = -1;
    while (running) {
        int leader_id;
        if (librale_rale_get_leader(&leader_id) == LIBRALE_SUCCESS) {
            if (leader_id != current_leader) {
                printf("Leadership changed: Node %d is now leader\\n", leader_id);
                current_leader = leader_id;
            }
        }
        sleep(5);
    }
    
    /* Cleanup */
    printf("Shutting down RALE services...\\n");
    librale_cleanup();
    librale_context_destroy(ctx);
    
    return 0;
}

/* Compile with: gcc -o rale_app rale_app.c -lrale -lpthread */`
  }

  const steps = [
    {
      number: 1,
      title: 'Install RALE',
      description: 'Download and install the RALE binary on your system',
      icon: Download,
      color: palette.cyan
    },
    {
      number: 2,
      title: 'Configure Cluster',
      description: 'Set up your RALE consensus cluster configuration',
      icon: Settings,
      color: palette.teal
    },
    {
      number: 3,
      title: 'Start Services',
      description: 'Launch RALE daemon and join the cluster',
      icon: Server,
      color: palette.orange
    },
    {
      number: 4,
      title: 'Verify Setup',
      description: 'Test consensus and monitor cluster health',
      icon: CheckCircle,
      color: palette.teal
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
                <img 
                  src="/ico/RALE_HD.ico" 
                  alt="RALE icon"
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl text-white mb-2">
                  RALE Getting Started
                </h1>
                <p className="text-xl text-gray-300">
                  Set up your first consensus cluster
                </p>
              </div>
            </div>
            <p className="text-xl mb-8 leading-relaxed" style={{ color: palette.gray100 }}>
              Complete guide to setting up RALE distributed consensus and key-value store system for high availability applications.
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
                  Install RALE Binary
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

            {/* Step 2: Configure */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center mr-4 text-sm font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Configure Cluster
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

            {/* Step 3: Start */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center mr-4 text-sm font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Start RALE Daemon
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

            {/* Step 4: Library Integration */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center mr-4 text-sm font-bold">
                  4
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Integrate with Your Application
                </h3>
              </div>
              <div className="bg-gray-900 rounded-lg p-6 relative">
                <pre className="text-gray-100 text-sm overflow-x-auto">
                  <code>{codeBlocks.library}</code>
                </pre>
                <button
                  onClick={() => copyToClipboard(codeBlocks.library, 'library')}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
                >
                  {copiedCode === 'library' ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RALE Architecture */}
      <div className="bg-white py-20">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              RALE Architecture & Components
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {/* librale */}
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Database className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">librale</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Core consensus and distributed store library written in C.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• RALE consensus algorithm for leader election</li>
                  <li>• Distributed key-value storage with replication</li>
                  <li>• Thread-safe API for multi-threaded applications</li>
                  <li>• TCP/UDP communication with automatic failover</li>
                  <li>• Memory-safe allocation/deallocation</li>
                </ul>
              </div>

              {/* raled */}
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <Server className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">raled</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Cluster management daemon for coordination and monitoring.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Cluster membership management</li>
                  <li>• Leader election and failover coordination</li>
                  <li>• Persistent cluster state and configuration</li>
                  <li>• Inter-node communication and client APIs</li>
                  <li>• Health checks and metrics collection</li>
                </ul>
              </div>

              {/* ralectrl */}
              <div className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <Terminal className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">ralectrl</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Command-line interface for cluster management and operations.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Node management (ADD, REMOVE, LIST)</li>
                  <li>• Status queries and cluster health</li>
                  <li>• Runtime configuration updates</li>
                  <li>• Debug information and troubleshooting</li>
                  <li>• JSON output for automation</li>
                </ul>
              </div>
            </div>

            {/* Architecture Diagram */}
            <div className="bg-gray-900 rounded-xl p-8 mb-12">
              <h3 className="text-xl font-semibold text-white mb-6 text-center">
                System Architecture
              </h3>
              <div className="text-center">
                <div className="text-gray-300 text-sm mb-4">
                  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
                </div>
                <div className="text-gray-300 text-sm mb-4">
                  │   Client    │    │   Client    │    │   Client    │
                </div>
                <div className="text-gray-300 text-sm mb-4">
                  │ Application │    │ Application │    │ Application │
                </div>
                <div className="text-gray-300 text-sm mb-4">
                  └──────┬──────┘    └──────┬──────┘    └──────┬──────┘
                </div>
                <div className="text-gray-300 text-sm mb-4">
                         │                  │                  │
                </div>
                <div className="text-gray-300 text-sm mb-4">
                  ┌──────────────────┼──────────────────┐
                </div>
                <div className="text-gray-300 text-sm mb-4">
                  │                  │                  │
                </div>
                <div className="text-gray-300 text-sm mb-4">
                  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
                </div>
                <div className="text-gray-300 text-sm mb-4">
                  │    raled    │    │    raled    │    │    raled    │
                </div>
                <div className="text-gray-300 text-sm mb-4">
                  │   (Node 1)  │◄──►│   (Node 2)  │◄──►│   (Node 3)  │
                </div>
                <div className="text-gray-300 text-sm mb-4">
                  └─────────────┘    └─────────────┘    └─────────────┘
                </div>
                <div className="text-gray-300 text-sm mb-4">
                  ▲                  ▲                  ▲
                </div>
                <div className="text-gray-300 text-sm mb-4">
                  │                  │                  │
                </div>
                <div className="text-gray-300 text-sm mb-4">
                  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
                </div>
                <div className="text-gray-300 text-sm mb-4">
                  │  ralectrl   │    │  ralectrl   │    │  ralectrl   │
                </div>
                <div className="text-gray-300 text-sm mb-4">
                  │    (CLI)    │    │    (CLI)    │    │    (CLI)    │
                </div>
                <div className="text-gray-300 text-sm mb-4">
                  └─────────────┘    └─────────────┘    └─────────────┘
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Consensus Algorithm</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• <strong>Leader Election:</strong> Automatic leader selection with majority voting</li>
                  <li>• <strong>Log Replication:</strong> Consistent state across all cluster nodes</li>
                  <li>• <strong>Split-Brain Prevention:</strong> Quorum-based decisions during network partitions</li>
                  <li>• <strong>Fast Recovery:</strong> Sub-second leader election times</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Distributed Store</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• <strong>Strong Consistency:</strong> All reads return the most recent write</li>
                  <li>• <strong>High Performance:</strong> 10,000+ operations/second per node</li>
                  <li>• <strong>Durability:</strong> Write-ahead logging with periodic snapshots</li>
                  <li>• <strong>Replication:</strong> Automatic replication across cluster nodes</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Network Layer</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• <strong>Fault-Tolerant:</strong> Automatic reconnection with exponential backoff</li>
                  <li>• <strong>Protocol Support:</strong> TCP/UDP with heartbeat keepalives</li>
                  <li>• <strong>Security:</strong> Optional TLS encryption and authentication</li>
                  <li>• <strong>Load Distribution:</strong> Requests distributed across available nodes</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Performance</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• <strong>Consensus:</strong> 1000+ operations/second per cluster</li>
                  <li>• <strong>Write Latency:</strong> &lt;10ms for local cluster writes</li>
                  <li>• <strong>Read Latency:</strong> &lt;1ms for local reads</li>
                  <li>• <strong>Scalability:</strong> Optimized for 3-7 node clusters</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Features & Troubleshooting */}
      <div className="bg-gray-50 py-20">
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Advanced Features & Troubleshooting
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Advanced Features */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Advanced Features</h3>
                
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Database className="w-5 h-5 text-blue-600 mr-2" />
                      Distributed Key-Value Store
                    </h4>
                    <ul className="text-gray-600 space-y-2 text-sm">
                      <li>• <strong>Strong Consistency:</strong> Linearizable reads and writes</li>
                      <li>• <strong>Automatic Replication:</strong> Data replicated across all nodes</li>
                      <li>• <strong>Compression:</strong> Built-in data compression for efficiency</li>
                      <li>• <strong>Snapshots:</strong> Periodic snapshots for fast recovery</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Shield className="w-5 h-5 text-green-600 mr-2" />
                      Security & TLS
                    </h4>
                    <ul className="text-gray-600 space-y-2 text-sm">
                      <li>• <strong>TLS Encryption:</strong> End-to-end encryption for all communications</li>
                      <li>• <strong>Certificate Management:</strong> X.509 certificate support</li>
                      <li>• <strong>Access Control:</strong> Fine-grained permissions system</li>
                      <li>• <strong>Audit Logging:</strong> Complete audit trail for security events</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <BarChart3 className="w-5 h-5 text-purple-600 mr-2" />
                      Monitoring & Metrics
                    </h4>
                    <ul className="text-gray-600 space-y-2 text-sm">
                      <li>• <strong>Prometheus Metrics:</strong> Comprehensive metrics export</li>
                      <li>• <strong>Health Checks:</strong> Built-in health monitoring</li>
                      <li>• <strong>Performance Metrics:</strong> Latency, throughput, and error rates</li>
                      <li>• <strong>Cluster Metrics:</strong> Node status, leadership changes, replication lag</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Troubleshooting */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Troubleshooting Guide</h3>
                
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                      Common Issues
                    </h4>
                    <div className="space-y-4 text-sm">
                      <div>
                        <strong className="text-gray-900">Node Won't Start:</strong>
                        <ul className="text-gray-600 mt-1 ml-4 space-y-1">
                          <li>• Check port availability: <code>netstat -tulpn | grep :7400</code></li>
                          <li>• Verify data directory permissions</li>
                          <li>• Check configuration file syntax</li>
                        </ul>
                      </div>
                      <div>
                        <strong className="text-gray-900">Cluster Split-Brain:</strong>
                        <ul className="text-gray-600 mt-1 ml-4 space-y-1">
                          <li>• Ensure odd number of nodes (3, 5, 7)</li>
                          <li>• Check network connectivity between nodes</li>
                          <li>• Verify firewall rules</li>
                        </ul>
                      </div>
                      <div>
                        <strong className="text-gray-900">High Latency:</strong>
                        <ul className="text-gray-600 mt-1 ml-4 space-y-1">
                          <li>• Monitor network latency between nodes</li>
                          <li>• Check disk I/O performance</li>
                          <li>• Adjust heartbeat intervals</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Terminal className="w-5 h-5 text-blue-600 mr-2" />
                      Debug Commands
                    </h4>
                    <div className="bg-gray-900 rounded-lg p-4 text-sm">
                      <pre className="text-gray-100">
{`# Check cluster status
ralectrl STATUS --verbose

# View detailed logs
raled --config conf/raled1.conf --log-level debug

# Test connectivity
ralectrl PING --node-id 2

# Monitor real-time
ralectrl MONITOR --interval 1s

# Check node health
ralectrl HEALTH --all-nodes

# View configuration
ralectrl CONFIG --show

# List all nodes
ralectrl LIST --detailed`}
                      </pre>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Settings className="w-5 h-5 text-orange-600 mr-2" />
                      Performance Tuning
                    </h4>
                    <ul className="text-gray-600 space-y-2 text-sm">
                      <li>• <strong>Election Timeout:</strong> Adjust based on network latency</li>
                      <li>• <strong>Heartbeat Interval:</strong> Balance between responsiveness and overhead</li>
                      <li>• <strong>Snapshot Frequency:</strong> Optimize for your data growth rate</li>
                      <li>• <strong>Connection Pooling:</strong> Configure max connections per node</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Production Deployment Best Practices */}
            <div className="mt-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                Production Deployment Best Practices
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Server className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Infrastructure</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Use dedicated servers for each node</li>
                    <li>• Ensure low-latency network connections</li>
                    <li>• Use SSDs for data directories</li>
                    <li>• Configure proper firewall rules</li>
                  </ul>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Security</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Enable TLS encryption</li>
                    <li>• Use strong authentication</li>
                    <li>• Regular security updates</li>
                    <li>• Monitor access logs</li>
                  </ul>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Monitoring</h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• Set up Prometheus metrics</li>
                    <li>• Configure alerting rules</li>
                    <li>• Monitor cluster health</li>
                    <li>• Track performance metrics</li>
                  </ul>
                </div>
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
              Your RALE cluster is ready! Explore these next steps.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link
                href="/docs/rale/configuration"
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
                href="/docs/rale/api"
                className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow text-left"
              >
                <Code className="w-8 h-8 text-teal-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  API Reference
                </h3>
                <p className="text-gray-600 text-sm">
                  Explore the REST API for cluster management.
                </p>
              </Link>

              <Link
                href="/docs/rale/examples"
                className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow text-left"
              >
                <BookOpen className="w-8 h-8 text-orange-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Examples
                </h3>
                <p className="text-gray-600 text-sm">
                  See practical usage examples and integrations.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RaleGettingStartedPage