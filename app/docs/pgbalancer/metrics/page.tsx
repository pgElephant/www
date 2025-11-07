import { Metadata } from 'next';
import BashCodeBlock from '../../../../components/BashCodeBlock';
import SqlCodeBlock from '../../../../components/SqlCodeBlock';

export const metadata: Metadata = {
  title: 'Metrics & Monitoring | pgBalancer PostgreSQL Load Balancer',
  description: 'Complete monitoring guide for pgBalancer - REST API metrics, bctl statistics, Prometheus integration, and Grafana dashboards for PostgreSQL cluster management.',
};

export default function PgBalancerMetricsDocs() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">pgBalancer Metrics & Monitoring</h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive monitoring guide for pgBalancer using REST API metrics, bctl CLI tools, and integration with Prometheus and Grafana for PostgreSQL cluster observability.
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2">📊 Monitoring Options</h3>
        <ul className="space-y-1 text-sm">
          <li>✅ <strong>REST API</strong> - Real-time metrics via HTTP/JSON endpoints</li>
          <li>✅ <strong>bctl CLI</strong> - Command-line statistics and status</li>
          <li>✅ <strong>Prometheus</strong> - Time-series metrics collection</li>
          <li>✅ <strong>Grafana</strong> - Visual dashboards and alerting</li>
        </ul>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">REST API Metrics</h2>

        <p className="text-muted-foreground mb-4">
          pgBalancer REST API provides real-time metrics on port 8080 (configurable):
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Backend Node Statistics</h3>
            <BashCodeBlock
              code={`# Get all backend nodes with health scores
curl http://localhost:8080/api/backends | jq

# Example response:
# [
#   {
#     "id": 0,
#     "hostname": "db-primary.local",
#     "port": 5432,
#     "status": "up",
#     "health_score": 0.95,
#     "query_count": 15234,
#     "avg_response_time_ms": 12.5,
#     "error_count": 0,
#     "role": "primary"
#   },
#   {
#     "id": 1,
#     "hostname": "db-replica1.local",
#     "port": 5432,
#     "status": "up",
#     "health_score": 0.88,
#     "query_count": 8421,
#     "avg_response_time_ms": 18.2,
#     "error_count": 2,
#     "role": "replica"
#   }
# ]`}
              title="GET /api/backends - Backend Statistics"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Pool Statistics</h3>
            <BashCodeBlock
              code={`# Get connection pool statistics
curl http://localhost:8080/api/stats | jq

# Example response:
# {
#   "total_connections": 128,
#   "active_connections": 45,
#   "idle_connections": 83,
#   "waiting_clients": 3,
#   "total_queries": 1234567,
#   "queries_per_second": 542.3,
#   "avg_query_time_ms": 15.7,
#   "cache_hit_ratio": 0.94,
#   "pool_utilization": 0.35
# }`}
              title="GET /api/stats - Pool Statistics"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Process Information</h3>
            <BashCodeBlock
              code={`# Get active process information
curl http://localhost:8080/api/processes | jq

# Example response shows all child processes with:
# - PID, database, user, client address
# - Connection state, query being executed
# - Start time, duration`}
              title="GET /api/processes - Active Processes"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Health Check Status</h3>
            <BashCodeBlock
              code={`# Simple health check
curl http://localhost:8080/api/health

# Response: {"status": "ok", "uptime_seconds": 86400, "version": "4.5.0"}

# Detailed health with backend info
curl http://localhost:8080/api/backends | jq '.[] | {id, hostname, status, health_score}'`}
              title="GET /api/health - Health Status"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">bctl CLI Monitoring</h2>

        <p className="text-muted-foreground mb-4">
          Use bctl command-line tool for real-time monitoring and statistics:
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Node Status</h3>
            <BashCodeBlock
              code={`# View all backend nodes
bctl node-status

# Table format (human-readable)
bctl node-status --format=table

# JSON format (for scripts)
bctl node-status --format=json

# Example output (table format):
# +----+------------------+------+--------+--------------+------------+
# | ID | Hostname         | Port | Status | Health Score | Queries    |
# +----+------------------+------+--------+--------------+------------+
# | 0  | db-primary.local | 5432 | up     | 0.95         | 15234      |
# | 1  | db-replica1.local| 5432 | up     | 0.88         | 8421       |
# | 2  | db-replica2.local| 5432 | down   | 0.00         | 0          |
# +----+------------------+------+--------+--------------+------------+`}
              title="bctl node-status - Backend Nodes"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Pool Status</h3>
            <BashCodeBlock
              code={`# View connection pool status
bctl pool-status --format=table

# Example output:
# +----------+----------------+---------+-------------+
# | Database | Total Conns    | Active  | Idle        |
# +----------+----------------+---------+-------------+
# | postgres | 64             | 23      | 41          |
# | appdb    | 32             | 15      | 17          |
# +----------+----------------+---------+-------------+`}
              title="bctl pool-status - Connection Pools"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Statistics</h3>
            <BashCodeBlock
              code={`# Get comprehensive statistics
bctl stats --format=table

# Process count
bctl proc-count

# Detailed process information
bctl proc-info 1234  # Replace with actual PID

# Query statistics by backend
bctl stats --format=json | jq '.backends[] | {id, queries, avg_time}'`}
              title="bctl stats - Query Statistics"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Watchdog Status</h3>
            <BashCodeBlock
              code={`# Check watchdog configuration and status
bctl watchdog-info --format=table

# Example output shows:
# - Virtual IP status
# - Watchdog nodes
# - Leader/follower status
# - Last heartbeat time`}
              title="bctl watchdog-info - Cluster Status"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Prometheus Integration</h2>

        <p className="text-muted-foreground mb-4">
          Export pgBalancer metrics to Prometheus using postgres_exporter or custom scraping:
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Custom Metrics Exporter</h3>
            <BashCodeBlock
              code={`# Install postgres_exporter
wget https://github.com/prometheus-community/postgres_exporter/releases/download/v0.15.0/postgres_exporter-0.15.0.linux-amd64.tar.gz
tar xzf postgres_exporter-0.15.0.linux-amd64.tar.gz
sudo mv postgres_exporter-0.15.0.linux-amd64/postgres_exporter /usr/local/bin/

# Create custom queries file for pgBalancer metrics
cat > /etc/prometheus/pgbalancer_queries.yaml <<'EOF'
pg_balancer_backends:
  query: "SELECT backend_id, hostname, port, status, health_score, query_count FROM pgbalancer_backends"
  metrics:
    - backend_id:
        usage: "LABEL"
        description: "Backend node ID"
    - hostname:
        usage: "LABEL"  
        description: "Backend hostname"
    - status:
        usage: "GAUGE"
        description: "Backend status (1=up, 0=down)"
    - health_score:
        usage: "GAUGE"
        description: "AI health score"
    - query_count:
        usage: "COUNTER"
        description: "Total queries processed"
EOF

# Run postgres_exporter with custom queries
postgres_exporter \\
  --web.listen-address=:9187 \\
  --extend.query-path=/etc/prometheus/pgbalancer_queries.yaml`}
              title="Prometheus Exporter Setup"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Prometheus Configuration</h3>
            <div className="bg-gray-800/50 rounded-lg p-6">
              <h4 className="text-base font-semibold text-cyan-400 mb-3">prometheus.yml</h4>
              <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto text-sm">
{`scrape_configs:
  # pgBalancer REST API metrics
  - job_name: 'pgbalancer'
    scrape_interval: 15s
    static_configs:
      - targets: ['localhost:8080']
    metrics_path: '/api/stats'
    
  # PostgreSQL via postgres_exporter
  - job_name: 'postgres'
    scrape_interval: 30s
    static_configs:
      - targets: ['localhost:9187']`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Prometheus Queries</h3>
            <div className="bg-gray-800/50 rounded-lg p-6">
              <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto text-sm">
{`# Backend health score over time
avg(pgbalancer_backend_health_score) by (backend_id)

# Query throughput (queries per second)
rate(pgbalancer_total_queries[5m])

# Connection pool utilization
pgbalancer_active_connections / pgbalancer_max_connections

# Average query latency
rate(pgbalancer_query_time_total[5m]) / rate(pgbalancer_total_queries[5m])

# Backend availability
count(pgbalancer_backend_status == 1)

# Failed backend detection
changes(pgbalancer_backend_status[5m]) > 0`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Grafana Dashboards</h2>

        <p className="text-muted-foreground mb-4">
          Create Grafana dashboards to visualize pgBalancer metrics:
        </p>

        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">🎯 Key Dashboard Panels</h4>
            <ul className="text-sm space-y-1">
              <li>• <strong>Backend Health Scores</strong> - AI health scoring visualization</li>
              <li>• <strong>Query Distribution</strong> - Queries per backend over time</li>
              <li>• <strong>Connection Pool Usage</strong> - Active vs idle connections</li>
              <li>• <strong>Response Time</strong> - Average query latency by backend</li>
              <li>• <strong>Failover Events</strong> - Backend up/down timeline</li>
              <li>• <strong>Load Balance Efficiency</strong> - Query distribution fairness</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Sample Grafana Panel Queries</h3>
            <div className="bg-gray-800/50 rounded-lg p-6">
              <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto text-sm">
{`# Panel 1: Backend Health Scores (Gauge)
Query: pgbalancer_backend_health_score
Legend: {{hostname}}:{{port}}

# Panel 2: Queries Per Second (Graph)
Query: rate(pgbalancer_total_queries[5m])
Legend: Total QPS

# Panel 3: Backend Query Distribution (Stacked Area)
Query: rate(pgbalancer_backend_queries[5m])
Legend: Backend {{backend_id}}

# Panel 4: Connection Pool Usage (Graph)
Query: pgbalancer_active_connections
Query: pgbalancer_idle_connections
Legend: Active | Idle

# Panel 5: Average Response Time (Graph)
Query: rate(pgbalancer_query_time_total[5m]) / rate(pgbalancer_total_queries[5m])
Legend: Avg Latency (ms)

# Panel 6: Backend Availability (Stat)
Query: count(pgbalancer_backend_status == 1)
Legend: Available Backends`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">MQTT Event Monitoring</h2>

        <p className="text-muted-foreground mb-4">
          Monitor pgBalancer events in real-time using MQTT:
        </p>

        <BashCodeBlock
          code={`# Subscribe to all pgBalancer events
mosquitto_sub -h localhost -t 'pgbalancer/#' -v

# Subscribe to specific event types
mosquitto_sub -h localhost -t 'pgbalancer/node/status' -v
mosquitto_sub -h localhost -t 'pgbalancer/failover' -v
mosquitto_sub -h localhost -t 'pgbalancer/health' -v

# Example MQTT messages:

# Node status change:
# pgbalancer/node/status {"node_id": 1, "hostname": "db-replica1", "status": "down", "timestamp": "2025-11-06T21:30:00Z"}

# Failover event:
# pgbalancer/failover {"old_primary": 0, "new_primary": 1, "reason": "health_check_failed", "timestamp": "2025-11-06T21:30:05Z"}

# Health check result:
# pgbalancer/health {"node_id": 0, "status": "ok", "response_time_ms": 2.5, "timestamp": "2025-11-06T21:30:10Z"}`}
          title="MQTT Event Subscription"
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Logging and Log Analysis</h2>

        <BashCodeBlock
          code={`# View pgBalancer logs
tail -f /var/log/pgbalancer/pgbalancer.log

# Filter for errors only
tail -f /var/log/pgbalancer/pgbalancer.log | grep ERROR

# Filter for health check failures
tail -f /var/log/pgbalancer/pgbalancer.log | grep "health check failed"

# View systemd logs
sudo journalctl -u pgbalancer -f

# Search for specific events
sudo journalctl -u pgbalancer --since "1 hour ago" | grep failover

# Export logs for analysis
sudo journalctl -u pgbalancer --since "1 day ago" > pgbalancer_logs.txt`}
          title="Log Monitoring"
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Performance Monitoring Queries</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">AI Health Score Tracking</h3>
            <BashCodeBlock
              code={`# Monitor AI health scores in real-time
watch -n 5 'curl -s http://localhost:8080/api/backends | jq ".[] | {id, hostname, health_score, avg_response_time_ms}"'

# Track health score changes over time
while true; do
  curl -s http://localhost:8080/api/backends | \\
    jq -r '.[] | "\\(.timestamp) Backend \\(.id) health=\\(.health_score)"'
  sleep 10
done`}
              title="Real-Time Health Monitoring"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Query Distribution Analysis</h3>
            <BashCodeBlock
              code={`# Check query distribution across backends
bctl stats --format=json | \\
  jq '.backends[] | {id, queries, percentage: (.queries / ($total_queries | tonumber) * 100)}'

# Monitor queries per second by backend
watch -n 5 'bctl stats --format=table'

# Track load balancing efficiency
curl -s http://localhost:8080/api/backends | \\
  jq '[.[] | .query_count] | add / length as $avg | map({id, queries: .query_count, deviation: ((.query_count - $avg) / $avg * 100)})'`}
              title="Query Distribution Tracking"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Alerting Best Practices</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">⚠️ Critical Alerts</h4>
            <ul className="text-sm space-y-1">
              <li>• Backend node down (health_score = 0)</li>
              <li>• All backends unavailable</li>
              <li>• Connection pool exhaustion (utilization &gt; 90%)</li>
              <li>• Failover events</li>
              <li>• Health check failures (&gt; 3 consecutive)</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">⚡ Warning Alerts</h4>
            <ul className="text-sm space-y-1">
              <li>• Low health score (&lt; 0.5)</li>
              <li>• High response time (&gt; 100ms avg)</li>
              <li>• Connection pool usage (&gt; 70%)</li>
              <li>• Uneven query distribution</li>
              <li>• Increased error rate</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mt-6">
          <h4 className="text-base font-semibold text-cyan-400 mb-3">Example Prometheus Alert Rules</h4>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto text-sm">
{`groups:
  - name: pgbalancer_alerts
    interval: 30s
    rules:
      # Critical: Backend down
      - alert: PgBalancerBackendDown
        expr: pgbalancer_backend_status == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Backend {{ $labels.backend_id }} is down"
          description: "Backend {{ $labels.hostname }}:{{ $labels.port }} has been down for more than 1 minute"

      # Critical: All backends down
      - alert: PgBalancerAllBackendsDown
        expr: count(pgbalancer_backend_status == 1) == 0
        for: 30s
        labels:
          severity: critical
        annotations:
          summary: "All pgBalancer backends are down"

      # Warning: Low health score
      - alert: PgBalancerLowHealthScore
        expr: pgbalancer_backend_health_score < 0.5
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Backend {{ $labels.backend_id }} has low health score"
          description: "Health score: {{ $value }}"

      # Warning: High response time
      - alert: PgBalancerHighLatency
        expr: rate(pgbalancer_query_time_total[5m]) / rate(pgbalancer_total_queries[5m]) > 100
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High average query latency detected"
          description: "Average latency: {{ $value }}ms"

      # Warning: Connection pool saturation
      - alert: PgBalancerPoolSaturation
        expr: pgbalancer_active_connections / pgbalancer_max_connections > 0.9
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Connection pool nearly exhausted"
          description: "Pool utilization: {{ $value | humanizePercentage }}"`}
          </pre>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Monitoring Dashboard Setup</h2>

        <BashCodeBlock
          code={`# Create monitoring directory
mkdir -p /etc/pgbalancer/monitoring

# Download Grafana dashboard template
curl -o /etc/pgbalancer/monitoring/grafana-dashboard.json \\
  https://raw.githubusercontent.com/pgElephant/pgBalancer/main/monitoring/grafana-dashboard.json

# Import dashboard to Grafana
# 1. Open Grafana UI
# 2. Go to Dashboards → Import
# 3. Upload grafana-dashboard.json
# 4. Select your Prometheus data source
# 5. Click Import

# Or use Grafana API
curl -X POST http://admin:admin@localhost:3000/api/dashboards/db \\
  -H "Content-Type: application/json" \\
  -d @/etc/pgbalancer/monitoring/grafana-dashboard.json`}
          title="Grafana Dashboard Import"
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Key Metrics Reference</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700 text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="border border-gray-300 dark:border-gray-700 p-3 text-left">Metric</th>
                <th className="border border-gray-300 dark:border-gray-700 p-3 text-left">Type</th>
                <th className="border border-gray-300 dark:border-gray-700 p-3 text-left">Description</th>
                <th className="border border-gray-300 dark:border-gray-700 p-3 text-left">Source</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 p-3"><code>backend_status</code></td>
                <td className="border border-gray-300 dark:border-gray-700 p-3">Gauge</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3">Backend up (1) or down (0)</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3">REST API, bctl</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 p-3"><code>health_score</code></td>
                <td className="border border-gray-300 dark:border-gray-700 p-3">Gauge</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3">AI health score (0.0 to 1.0)</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3">REST API</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 p-3"><code>total_queries</code></td>
                <td className="border border-gray-300 dark:border-gray-700 p-3">Counter</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3">Total queries processed</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3">REST API, bctl</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 p-3"><code>active_connections</code></td>
                <td className="border border-gray-300 dark:border-gray-700 p-3">Gauge</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3">Currently active connections</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3">REST API, bctl</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 p-3"><code>avg_response_time</code></td>
                <td className="border border-gray-300 dark:border-gray-700 p-3">Gauge</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3">Average query latency (ms)</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3">REST API</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 p-3"><code>error_count</code></td>
                <td className="border border-gray-300 dark:border-gray-700 p-3">Counter</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3">Query errors by backend</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3">REST API</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <a href="/docs/pgbalancer/rest-api" className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
            <h3 className="font-semibold mb-2">🌐 REST API Reference</h3>
            <p className="text-sm text-muted-foreground">Complete API documentation with all 17 endpoints</p>
          </a>
          <a href="/docs/pgbalancer/cli-management" className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
            <h3 className="font-semibold mb-2">⌨️ bctl CLI Tool</h3>
            <p className="text-sm text-muted-foreground">Command-line monitoring and management</p>
          </a>
          <a href="/docs/pgbalancer/monitoring" className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
            <h3 className="font-semibold mb-2">📊 Monitoring Integration</h3>
            <p className="text-sm text-muted-foreground">External monitoring system integration</p>
          </a>
          <a href="/docs/pgbalancer/configuration" className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
            <h3 className="font-semibold mb-2">⚙️ Configuration Reference</h3>
            <p className="text-sm text-muted-foreground">All .conf file parameters</p>
          </a>
        </div>
      </section>
    </div>
  );
}
