import { Globe, Lock, Code, Zap, Server } from 'lucide-react'
import DocsContentLayout from '../../../../components/DocsContentLayout'
import { PgbalancerIcon } from '../../../../components/ProductIcons'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata = {
  title: 'REST API Usage - pgBalancer',
  description: 'Use pgBalancer REST API for cluster management, monitoring, and automation.'
};

export default function RestAPIPage() {
  return (
    <DocsContentLayout
      hero={{
        badgeLabel: 'pgBalancer',
        badgeIcon: <PgbalancerIcon size={20} />, 
        badgeTone: 'cyan',
        title: 'REST API Usage',
        description: "Use pgBalancer's HTTP/JSON REST API for cluster management, monitoring, and automation."
      }}
      contentWidth="wide"
    >
      <div className="space-y-12 text-slate-200">
        {/* Step 1: API Server Setup */}
        <section className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Globe className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 1: Enable REST API Server</h2>
        </div>

        <p className="text-slate-300">
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

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <p className="text-sm text-blue-200">
            <strong>Tip:</strong> Use the REST server for automation and dashboards. For security, expose it behind an API gateway or VPN.
          </p>
        </div>
        </section>

        {/* Step 2: Authentication & Security */}
        <section className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Lock className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 2: Authentication & Security</h2>
        </div>

        <p className="text-slate-300">
          Configure TLS, API keys, and RBAC for REST API access:
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800/60 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-300 mb-3">Enable TLS</h3>
            <p className="text-slate-300">
              Secure your API with TLS certificates. Use `rest_api_ssl_cert` and `rest_api_ssl_key` in `pgbalancer.conf`.
            </p>
          </div>
          <div className="bg-gray-800/60 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-300 mb-3">API Keys</h3>
            <p className="text-slate-300">
              Generate and manage API keys securely. Use `rest_api_auth` and `rest_api_secret_key` in `pgbalancer.conf`.
            </p>
          </div>
        </div>

        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
          <p className="text-sm text-purple-200">
            <strong>Security Reminder:</strong> Always restrict API access with TLS and signed tokens. Rotate keys frequently and audit API usage.
          </p>
        </div>
        </section>

        {/* Step 3: Core API Endpoints */}
        <section className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <Code className="w-6 h-6 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 3: Core API Endpoints</h2>
        </div>

        <p className="text-slate-300">
          Use the REST API to manage pools, view metrics, and automate failover:
        </p>

        <div className="space-y-6">
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-300 mb-3">List Pools</h3>
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
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-300 mb-3">Get Pool Statistics</h3>
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
        </div>
        </section>

        {/* Step 4: Pool Management */}
        <section className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-cyan-500/20 rounded-lg">
            <PgbalancerIcon size={24} />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 4: Connection Pool Management</h2>
        </div>

        <p className="text-slate-300">
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

        {/* Step 5: Failover & Health */}
        <section className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-red-500/20 rounded-lg">
            <Server className="w-6 h-6 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 5: Failover & Health Checks</h2>
        </div>

        <p className="text-slate-300">
          Automate failover and health monitoring:
        </p>

        <div className="space-y-6">
          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-300 mb-3">Trigger Manual Failover</h3>
            <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# POST /api/v1/failover/promote
curl -X POST http://localhost:8080/api/v1/failover/promote \
  -H "Content-Type: application/json" \
  -d '{"force": true}'

{
  "status": "success",
  "message": "Manual failover initiated"
}`}
            </pre>
          </div>
        </div>
        </section>

        {/* Step 6: Prometheus & Grafana */}
        <section className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Zap className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 6: Prometheus & Grafana</h2>
        </div>

        <p className="text-slate-300">
          Access real-time metrics and monitoring data:
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800/60 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-300 mb-3">Prometheus Metrics</h3>
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
          <div className="bg-gray-800/60 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-300 mb-3">Status Dashboard Data</h3>
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
        </div>
        </section>

        {/* Appendix: Full API Spec */}
        <section className="space-y-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-slate-500/20 rounded-lg">
            <Code className="w-6 h-6 text-slate-300" />
          </div>
          <h2 className="text-2xl font-bold m-0">Appendix: Full API Spec</h2>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
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
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400">/api/v1/failover/promote</td>
                <td className="py-2">POST</td>
                <td className="py-2">Manual promotion</td>
              </tr>
            </tbody>
          </table>
        </div>
        </section>
      </div>
    </DocsContentLayout>
  )
}
