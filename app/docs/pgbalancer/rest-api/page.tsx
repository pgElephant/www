import React from 'react';
import { Globe, Lock, Code, Zap, Database, Server } from 'lucide-react';
import BashCodeBlock from '../../../../components/BashCodeBlock';

export const metadata = {
  title: 'REST API Usage - pgBalancer',
  description: 'Use pgBalancer REST API for cluster management, monitoring, and automation.'
};

export default function RestAPIPage() {
  return (
    <div className="prose dark:prose-invert max-w-4xl mx-auto py-12 px-6">
      {/* Header */}
      <div className="not-prose mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">
          REST API Usage
        </h1>
        <p className="text-xl text-gray-300">
          Use pgBalancer's HTTP/JSON REST API for cluster management, monitoring, and automation
        </p>
      </div>

      {/* Step 1: API Server Setup */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Globe className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 1: Enable REST API Server</h2>
        </div>

        <p className="text-gray-300 mb-4">
          pgBalancer includes an integrated REST API server running as a child process:
        </p>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">pgbalancer.conf API Configuration</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# REST API Server Configuration
enable_rest_api = on                # Enable HTTP API server
rest_api_port = 8080                # API listens on this port
rest_api_hostname = '0.0.0.0'       # Listen on all interfaces
rest_api_timeout = 30               # Request timeout (seconds)

# Authentication (optional)
rest_api_auth = on                  # Enable JWT authentication
rest_api_secret_key = 'your-secret-key-here'  # HMAC-SHA256 secret
rest_api_token_expiry = 3600        # Token expiry (seconds)

# CORS settings
rest_api_cors_enabled = on          # Enable CORS
rest_api_cors_origins = '*'         # Allowed origins

# Enable detailed logging
rest_api_log_requests = on          # Log all API requests
rest_api_log_level = 'info'         # info, debug, warn, error`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Start pgBalancer with API Enabled</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Start pgBalancer
pgbalancer -f /etc/pgbalancer/pgbalancer.conf

# Verify API is running
curl -s http://localhost:8080/api/v1/health

# Response:
{
  "status": "ok",
  "version": "pgbalancer 5.0.0",
  "uptime_seconds": 12345,
  "timestamp": "2025-11-06T12:00:00Z"
}`}
          </pre>
        </div>

        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-4">
          <p className="text-sm text-blue-200 m-0">
            <strong>💡 Tip:</strong> The REST API runs on port 8080 by default. All endpoints return JSON and support 
            standard HTTP methods (GET, POST, PUT, DELETE).
          </p>
        </div>
      </section>

      {/* Step 2: Authentication */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <Lock className="w-6 h-6 text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 2: API Authentication (Optional)</h2>
        </div>

        <p className="text-gray-300 mb-4">
          Secure your API with JWT authentication:
        </p>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Login and Get Token</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Login with username and password
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "your-password"
  }'

# Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 3600,
  "token_type": "Bearer"
}

# Save token for subsequent requests
export TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Use Token in Requests</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Include token in Authorization header
curl -s http://localhost:8080/api/v1/nodes \
  -H "Authorization: Bearer $TOKEN" | jq

# Without token (if auth enabled):
curl -s http://localhost:8080/api/v1/nodes
# Response:
{
  "error": "Unauthorized",
  "message": "Missing or invalid authentication token",
  "status": 401
}`}
          </pre>
        </div>
      </section>

      {/* Step 3: Node Management Endpoints */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Server className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 3: Node Management</h2>
        </div>

        <p className="text-gray-300 mb-4">
          Manage backend nodes via API:
        </p>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">List All Nodes</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# GET /api/v1/nodes
curl -s http://localhost:8080/api/v1/nodes | jq

{
  "nodes": [
    {
      "node_id": 0,
      "hostname": "db-primary.internal",
      "port": 5432,
      "status": "up",
      "role": "primary",
      "weight": 1,
      "select_cnt": 1523,
      "replication_delay": 0,
      "replication_state": "streaming",
      "last_status_change": "2025-11-06T10:00:00Z"
    },
    {
      "node_id": 1,
      "hostname": "db-replica1.internal",
      "port": 5432,
      "status": "up",
      "role": "standby",
      "weight": 2,
      "select_cnt": 4501,
      "replication_delay": 0,
      "replication_state": "streaming",
      "last_status_change": "2025-11-06T10:00:00Z"
    }
  ],
  "total": 2
}`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Get Single Node Info</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# GET /api/v1/nodes/{node_id}
curl -s http://localhost:8080/api/v1/nodes/0 | jq

{
  "node_id": 0,
  "hostname": "db-primary.internal",
  "port": 5432,
  "status": "up",
  "role": "primary",
  "weight": 1,
  "connections": {
    "active": 15,
    "idle": 5,
    "total": 20
  },
  "stats": {
    "queries_total": 15234,
    "queries_per_second": 25.4,
    "avg_response_time_ms": 12.5,
    "error_rate": 0.001
  },
  "health": {
    "last_check": "2025-11-06T12:00:55Z",
    "consecutive_failures": 0,
    "uptime_seconds": 432000
  }
}`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Update Node Weight</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# POST /api/v1/nodes/{node_id}/weight
curl -X POST http://localhost:8080/api/v1/nodes/1/weight \
  -H "Content-Type: application/json" \
  -d '{"weight": 0}'

# Response:
{
  "node_id": 1,
  "hostname": "db-replica1.internal",
  "old_weight": 2,
  "new_weight": 0,
  "message": "Weight updated successfully - node will drain connections"
}

# Restore weight
curl -X POST http://localhost:8080/api/v1/nodes/1/weight \
  -d '{"weight": 2}'`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Detach and Attach Nodes</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# POST /api/v1/nodes/{node_id}/detach
curl -X POST http://localhost:8080/api/v1/nodes/2/detach

{
  "node_id": 2,
  "status": "detaching",
  "message": "Node detached from pool"
}

# POST /api/v1/nodes/{node_id}/attach
curl -X POST http://localhost:8080/api/v1/nodes/2/attach

{
  "node_id": 2,
  "status": "up",
  "message": "Node attached to pool"
}`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Promote Standby to Primary</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# POST /api/v1/nodes/{node_id}/promote
curl -X POST http://localhost:8080/api/v1/nodes/1/promote \
  -H "Content-Type: application/json" \
  -d '{"force": true}'

{
  "status": "success",
  "old_primary": 0,
  "new_primary": 1,
  "failover_duration_seconds": 2,
  "timestamp": "2025-11-06T13:00:00Z"
}`}
          </pre>
        </div>
      </section>

      {/* Step 4: Pool Management */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-cyan-500/20 rounded-lg">
            <Database className="w-6 h-6 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 4: Connection Pool Management</h2>
        </div>

        <p className="text-gray-300 mb-4">
          Monitor and manage connection pools:
        </p>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Get Pool Processes</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# GET /api/v1/pool/processes
curl -s http://localhost:8080/api/v1/pool/processes | jq

{
  "processes": [
    {
      "pool_pid": 12345,
      "start_time": "2025-11-06T10:30:00Z",
      "database": "testdb",
      "username": "appuser",
      "create_time": "2025-11-06T10:30:01Z",
      "pool_counter": 150,
      "backend_id": 0,
      "connected": true
    },
    {
      "pool_pid": 12346,
      "start_time": "2025-11-06T10:30:00Z",
      "database": "testdb",
      "username": "appuser",
      "create_time": "2025-11-06T10:30:01Z",
      "pool_counter": 89,
      "backend_id": 1,
      "connected": true
    }
  ],
  "total": 32,
  "active": 28,
  "idle": 4
}`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Get Pool Statistics</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# GET /api/v1/pool/stats
curl -s http://localhost:8080/api/v1/pool/stats | jq

{
  "total_capacity": 128,
  "active_connections": 45,
  "idle_connections": 83,
  "utilization_percent": 35.16,
  "cache_hits": 15420,
  "cache_misses": 89,
  "cache_hit_rate": 99.42,
  "mode": "transaction",
  "num_init_children": 32,
  "max_pool": 4
}`}
          </pre>
        </div>
      </section>

      {/* Step 5: Monitoring Endpoints */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-yellow-500/20 rounded-lg">
            <Zap className="w-6 h-6 text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 5: Monitoring and Metrics</h2>
        </div>

        <p className="text-gray-300 mb-4">
          Access real-time metrics and monitoring data:
        </p>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Health Check Endpoint</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# GET /api/v1/health
curl -s http://localhost:8080/api/v1/health | jq

{
  "status": "healthy",
  "version": "pgbalancer 5.0.0",
  "uptime_seconds": 432000,
  "total_nodes": 3,
  "nodes_up": 3,
  "nodes_down": 0,
  "primary_node": 0,
  "load_balance_enabled": true,
  "watchdog_enabled": true,
  "watchdog_quorum": true,
  "timestamp": "2025-11-06T12:00:00Z"
}`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Prometheus Metrics</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# GET /metrics (Prometheus format)
curl -s http://localhost:8080/metrics

# HELP pgbalancer_up Server status (1=up, 0=down)
# TYPE pgbalancer_up gauge
pgbalancer_up 1

# HELP pgbalancer_backend_up Backend status (1=up, 0=down)
# TYPE pgbalancer_backend_up gauge
pgbalancer_backend_up{node_id="0",hostname="db-primary.internal"} 1
pgbalancer_backend_up{node_id="1",hostname="db-replica1.internal"} 1
pgbalancer_backend_up{node_id="2",hostname="db-replica2.internal"} 1

# HELP pgbalancer_backend_queries_total Total queries sent to backend
# TYPE pgbalancer_backend_queries_total counter
pgbalancer_backend_queries_total{node_id="0"} 1523
pgbalancer_backend_queries_total{node_id="1"} 4501
pgbalancer_backend_queries_total{node_id="2"} 4389

# HELP pgbalancer_pool_utilization_percent Pool utilization percentage
# TYPE pgbalancer_pool_utilization_percent gauge
pgbalancer_pool_utilization_percent 35.16`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Status Dashboard Data</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# GET /api/v1/status
curl -s http://localhost:8080/api/v1/status | jq

{
  "server": {
    "version": "pgbalancer 5.0.0",
    "uptime_seconds": 432000,
    "start_time": "2025-11-01T10:00:00Z"
  },
  "backends": {
    "total": 3,
    "up": 3,
    "down": 0,
    "primary": 0,
    "standby": 2
  },
  "pool": {
    "mode": "transaction",
    "processes": 32,
    "active_connections": 45,
    "idle_connections": 83,
    "utilization": 35.16
  },
  "performance": {
    "queries_per_second": 85.3,
    "avg_response_time_ms": 11.8,
    "error_rate": 0.0012
  },
  "watchdog": {
    "enabled": true,
    "state": "MASTER",
    "quorum": true,
    "alive_nodes": 3
  }
}`}
          </pre>
        </div>
      </section>

      {/* Step 6: Automation Examples */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <Code className="w-6 h-6 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 6: Automation with API</h2>
        </div>

        <p className="text-gray-300 mb-4">
          Automate common operations using the REST API:
        </p>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Python Monitoring Script</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`#!/usr/bin/env python3
import requests
import json
import time

PGBALANCER_API = "http://localhost:8080"

def check_cluster_health():
    """Monitor cluster health and alert on issues"""
    response = requests.get(f"{PGBALANCER_API}/api/v1/health")
    health = response.json()
    
    if health['nodes_down'] > 0:
        print(f"⚠️  ALERT: {health['nodes_down']} nodes are down!")
        # Send alert to monitoring system
        send_alert(f"pgBalancer: {health['nodes_down']} backends down")
    
    if not health['watchdog_quorum']:
        print("⚠️  ALERT: Watchdog quorum lost!")
        send_alert("pgBalancer: Watchdog quorum lost")
    
    return health

def monitor_pool_utilization():
    """Alert if pool utilization exceeds threshold"""
    response = requests.get(f"{PGBALANCER_API}/api/v1/pool/stats")
    stats = response.json()
    
    if stats['utilization_percent'] > 90:
        print(f"⚠️  ALERT: Pool utilization at {stats['utilization_percent']}%")
        send_alert(f"pgBalancer: High pool utilization ({stats['utilization_percent']}%)")
    
    return stats

def drain_node_for_maintenance(node_id):
    """Gracefully drain a node for maintenance"""
    print(f"Draining node {node_id}...")
    
    # Set weight to 0 to stop new connections
    response = requests.post(
        f"{PGBALANCER_API}/api/v1/nodes/{node_id}/weight",
        json={"weight": 0}
    )
    
    # Wait for connections to drain
    while True:
        node_info = requests.get(f"{PGBALANCER_API}/api/v1/nodes/{node_id}").json()
        active = node_info['connections']['active']
        
        if active == 0:
            print(f"✓ Node {node_id} fully drained")
            break
        
        print(f"  Waiting for {active} connections to close...")
        time.sleep(5)
    
    # Detach node
    requests.post(f"{PGBALANCER_API}/api/v1/nodes/{node_id}/detach")
    print(f"✓ Node {node_id} detached - safe for maintenance")

# Run monitoring loop
while True:
    health = check_cluster_health()
    stats = monitor_pool_utilization()
    print(f"Cluster OK - {health['nodes_up']}/{health['total_nodes']} nodes up, "
          f"pool {stats['utilization_percent']:.1f}% utilized")
    time.sleep(30)`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Bash Automation Script</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`#!/bin/bash
# Automated failover testing script

API="http://localhost:8080/api/v1"

# Get current primary
PRIMARY=$(curl -s $API/nodes | jq -r '.nodes[] | select(.role=="primary") | .node_id')
echo "Current primary: Node $PRIMARY"

# Promote standby node 1
echo "Promoting node 1 to primary..."
curl -X POST $API/nodes/1/promote -d '{"force": true}'

# Wait for failover to complete
sleep 5

# Verify new primary
NEW_PRIMARY=$(curl -s $API/nodes | jq -r '.nodes[] | select(.role=="primary") | .node_id')
echo "New primary: Node $NEW_PRIMARY"

if [ "$NEW_PRIMARY" = "1" ]; then
    echo "✓ Failover successful"
else
    echo "✗ Failover failed"
    exit 1
fi`}
          </pre>
        </div>
      </section>

      {/* API Reference */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">API Endpoints Reference</h2>
        
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-2 text-cyan-400">Endpoint</th>
                <th className="text-left py-2 text-cyan-400">Method</th>
                <th className="text-left py-2 text-cyan-400">Description</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400">/api/v1/health</td>
                <td className="py-2">GET</td>
                <td className="py-2">Cluster health status</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400">/api/v1/status</td>
                <td className="py-2">GET</td>
                <td className="py-2">Detailed cluster status</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400">/api/v1/nodes</td>
                <td className="py-2">GET</td>
                <td className="py-2">List all backend nodes</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400">/api/v1/nodes/:id</td>
                <td className="py-2">GET</td>
                <td className="py-2">Get single node info</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400">/api/v1/nodes/:id/weight</td>
                <td className="py-2">POST</td>
                <td className="py-2">Update node weight</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400">/api/v1/nodes/:id/detach</td>
                <td className="py-2">POST</td>
                <td className="py-2">Detach node from pool</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400">/api/v1/nodes/:id/attach</td>
                <td className="py-2">POST</td>
                <td className="py-2">Attach node to pool</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400">/api/v1/nodes/:id/promote</td>
                <td className="py-2">POST</td>
                <td className="py-2">Promote to primary</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400">/api/v1/pool/processes</td>
                <td className="py-2">GET</td>
                <td className="py-2">Pool process list</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400">/api/v1/pool/stats</td>
                <td className="py-2">GET</td>
                <td className="py-2">Pool statistics</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400">/api/v1/watchdog</td>
                <td className="py-2">GET</td>
                <td className="py-2">Watchdog status</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-green-400">/metrics</td>
                <td className="py-2">GET</td>
                <td className="py-2">Prometheus metrics</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Resources */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Additional Resources</h2>
        <div className="bg-gray-800/50 rounded-lg p-6">
          <ul className="space-y-2 text-gray-300 mb-0">
            <li>
              • <a href="https://github.com/pgElephant/pgbalancer#rest-api" className="text-cyan-400 hover:text-cyan-300">
                Complete REST API Documentation
              </a>
            </li>
            <li>
              • <a href="/docs/pgbalancer/cli-management" className="text-cyan-400 hover:text-cyan-300">
                CLI Management (bctl)
              </a>
            </li>
            <li>
              • <a href="/docs/pgbalancer/monitoring" className="text-cyan-400 hover:text-cyan-300">
                Monitoring & Metrics Guide
              </a>
            </li>
            <li>
              • <a href="https://github.com/pgElephant/pgbalancer/tree/main/cluster/examples" className="text-cyan-400 hover:text-cyan-300">
                Example Scripts
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
