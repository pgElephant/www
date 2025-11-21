import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'REST API Usage - pgBalancer',
  description: 'Use pgBalancer REST API for cluster management, monitoring, and automation.',
}

const tableOfContents: TocItem[] = [
  { id: 'enable-api-server', title: 'Enable REST API Server' },
  { id: 'authentication-security', title: 'Authentication & Security' },
  { id: 'core-endpoints', title: 'Core API Endpoints' },
  { id: 'pool-management', title: 'Connection Pool Management' },
  { id: 'failover-health', title: 'Failover & Health Checks' },
  { id: 'prometheus-grafana', title: 'Prometheus & Grafana' },
  { id: 'full-api-spec', title: 'Full API Spec' },
]

const prevLink: NavLink = {
  href: '/docs/pgbalancer/load-balancing',
  label: 'AI-Powered Load Balancing',
}

const nextLink: NavLink = {
  href: '/docs/pgbalancer/cli-management',
  label: 'CLI Management (bctl)',
}

export default function RestAPIPage() {
  return (
    <PostgresDocsLayout
      title="REST API Usage"
      version="pgBalancer Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="enable-api-server">
        <h2>Enable REST API Server</h2>
        <p>
          pgBalancer includes an integrated REST API server running as a child process:
        </p>

        <BashCodeBlock
          title="pgbalancer.conf API Configuration"
          code={`# REST API Server Configuration
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
        />

        <BashCodeBlock
          title="Start pgBalancer with API Enabled"
          code={`# Start pgBalancer
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
        />

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-4">
          <p className="text-sm">
            <strong>Tip:</strong> Use the REST server for automation and dashboards. For security, expose it behind an API gateway or VPN.
          </p>
        </div>
      </section>

      <section id="authentication-security">
        <h2>Authentication & Security</h2>
        <p>
          Configure TLS, API keys, and RBAC for REST API access:
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800/60 rounded-lg p-6">
            <h3>Enable TLS</h3>
            <p>
              Secure your API with TLS certificates. Use <code>rest_api_ssl_cert</code> and <code>rest_api_ssl_key</code> in <code>pgbalancer.conf</code>.
            </p>
          </div>
          <div className="bg-gray-800/60 rounded-lg p-6">
            <h3>API Keys</h3>
            <p>
              Generate and manage API keys securely. Use <code>rest_api_auth</code> and <code>rest_api_secret_key</code> in <code>pgbalancer.conf</code>.
            </p>
          </div>
        </div>

        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mt-4">
          <p className="text-sm">
            <strong>Security Reminder:</strong> Always restrict API access with TLS and signed tokens. Rotate keys frequently and audit API usage.
          </p>
        </div>
      </section>

      <section id="core-endpoints">
        <h2>Core API Endpoints</h2>
        <p>
          Use the REST API to manage pools, view metrics, and automate failover:
        </p>

        <BashCodeBlock
          title="List Pools"
          code={`# GET /api/v1/pool/processes
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
    }
  ],
  "total": 32,
  "active": 28,
  "idle": 4
}`}
        />

        <BashCodeBlock
          title="Get Pool Statistics"
          code={`# GET /api/v1/pool/stats
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
        />
      </section>

      <section id="pool-management">
        <h2>Connection Pool Management</h2>
        <p>
          Monitor and manage connection pools:
        </p>

        <BashCodeBlock
          title="Get Pool Processes"
          code={`# GET /api/v1/pool/processes
curl -s http://localhost:8080/api/v1/pool/processes | jq`}
        />

        <BashCodeBlock
          title="Get Pool Statistics"
          code={`# GET /api/v1/pool/stats
curl -s http://localhost:8080/api/v1/pool/stats | jq`}
        />
      </section>

      <section id="failover-health">
        <h2>Failover & Health Checks</h2>
        <p>
          Automate failover and health monitoring:
        </p>

        <BashCodeBlock
          title="Trigger Manual Failover"
          code={`# POST /api/v1/failover/promote
curl -X POST http://localhost:8080/api/v1/failover/promote \\
  -H "Content-Type: application/json" \\
  -d '{"force": true}'

{
  "status": "success",
  "message": "Manual failover initiated"
}`}
        />
      </section>

      <section id="prometheus-grafana">
        <h2>Prometheus & Grafana</h2>
        <p>
          Access real-time metrics and monitoring data:
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <BashCodeBlock
            title="Prometheus Metrics"
            code={`# GET /metrics (Prometheus format)
curl -s http://localhost:8080/metrics

# HELP pgbalancer_up Server status (1=up, 0=down)
# TYPE pgbalancer_up gauge
pgbalancer_up 1

# HELP pgbalancer_backend_up Backend status (1=up, 0=down)
# TYPE pgbalancer_backend_up gauge
pgbalancer_backend_up{node_id="0",hostname="db-primary.internal"} 1`}
          />
          <BashCodeBlock
            title="Status Dashboard Data"
            code={`# GET /api/v1/status
curl -s http://localhost:8080/api/v1/status | jq

{
  "server": {
    "version": "pgbalancer 5.0.0",
    "uptime_seconds": 432000
  },
  "backends": {
    "total": 3,
    "up": 3,
    "down": 0
  }
}`}
          />
        </div>
      </section>

      <section id="full-api-spec">
        <h2>Full API Spec</h2>
        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-2">Endpoint</th>
                <th className="text-left py-2">Method</th>
                <th className="text-left py-2">Description</th>
              </tr>
            </thead>
            <tbody>
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
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400">/metrics</td>
                <td className="py-2">GET</td>
                <td className="py-2">Prometheus metrics</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-green-400">/api/v1/failover/promote</td>
                <td className="py-2">POST</td>
                <td className="py-2">Manual promotion</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </PostgresDocsLayout>
  )
}
