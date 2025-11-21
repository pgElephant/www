import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Metrics & Monitoring | pgBalancer PostgreSQL Load Balancer',
  description:
    'Complete monitoring guide for pgBalancer - REST API metrics, bctl statistics, Prometheus integration, and Grafana dashboards for PostgreSQL cluster management.',
}

const tableOfContents: TocItem[] = [
  { id: 'monitoring-options', title: 'Monitoring Options' },
  { id: 'rest-api-metrics', title: 'REST API Metrics' },
  { id: 'bctl-cli-monitoring', title: 'bctl CLI Monitoring' },
  { id: 'prometheus-integration', title: 'Prometheus Integration' },
  { id: 'grafana-dashboards', title: 'Grafana Dashboards' },
  { id: 'mqtt-events', title: 'MQTT Event Monitoring' },
  { id: 'logging-analysis', title: 'Logging and Log Analysis' },
  { id: 'performance-monitoring', title: 'Performance Monitoring Queries' },
  { id: 'alerting-best-practices', title: 'Alerting Best Practices' },
  { id: 'key-metrics-reference', title: 'Key Metrics Reference' },
]

const prevLink: NavLink = {
  href: '/docs/pgbalancer/high-availability',
  label: 'High Availability & Failover',
}

const nextLink: NavLink = {
  href: '/docs/pgbalancer/monitoring',
  label: 'Monitoring & Metrics',
}

export default function PgBalancerMetricsDocs() {
  return (
    <PostgresDocsLayout
      title="Metrics & Monitoring"
      version="pgBalancer Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="monitoring-options">
        <h2>Monitoring Options</h2>
        <div className="bg-white/5 border border-slate-200/50 rounded-lg p-6 mb-6">
          <h3>📊 Monitoring options</h3>
          <ul className="space-y-1 text-sm">
            <li>✅ <strong>REST API</strong> - Real-time metrics via HTTP/JSON endpoints</li>
            <li>✅ <strong>bctl CLI</strong> - Command-line statistics and status</li>
            <li>✅ <strong>Prometheus</strong> - Time-series metrics collection</li>
            <li>✅ <strong>Grafana</strong> - Visual dashboards and alerting</li>
          </ul>
        </div>
      </section>

      <section id="rest-api-metrics">
        <h2>REST API Metrics</h2>
        <p>
          pgBalancer REST API provides real-time metrics on port 8080 (configurable):
        </p>

        <div className="grid gap-4">
          <BashCodeBlock
            title="Backend Node Statistics"
            code={`curl -s http://localhost:8080/api/v1/backends | jq`}
          />
          <BashCodeBlock
            title="Connection Pool Status"
            code={`curl -s http://localhost:8080/api/v1/pool/summary | jq`}
          />
        </div>
      </section>

      <section id="bctl-cli-monitoring">
        <h2>bctl CLI Monitoring</h2>
        <p>
          Use bctl command-line tool for real-time monitoring and statistics:
        </p>

        <BashCodeBlock
          title="Node Status"
          code={`# View all backend nodes
bctl node-status

# Table format (human-readable)
bctl node-status --format=table

# JSON format (for scripts)
bctl node-status --format=json`}
        />

        <BashCodeBlock
          title="Pool Status"
          code={`# View connection pool status
bctl pool-status --format=table`}
        />

        <BashCodeBlock
          title="Statistics"
          code={`# Get comprehensive statistics
bctl stats --format=table

# Process count
bctl proc-count`}
        />
      </section>

      <section id="prometheus-integration">
        <h2>Prometheus Integration</h2>
        <p>
          Export pgBalancer metrics to Prometheus using postgres_exporter or custom scraping:
        </p>

        <BashCodeBlock
          title="Prometheus Configuration"
          code={`# prometheus.yml
scrape_configs:
  # pgBalancer REST API metrics
  - job_name: 'pgbalancer'
    scrape_interval: 15s
    static_configs:
      - targets: ['localhost:8080']
    metrics_path: '/api/stats'`}
        />
      </section>

      <section id="grafana-dashboards">
        <h2>Grafana Dashboards</h2>
        <p>
          Create Grafana dashboards to visualize pgBalancer metrics:
        </p>

        <div className="p-4 border rounded-lg mb-4">
          <h4>🎯 Key Dashboard Panels</h4>
          <ul className="text-sm space-y-1">
            <li>• <strong>Backend Health Scores</strong> - AI health scoring visualization</li>
            <li>• <strong>Query Distribution</strong> - Queries per backend over time</li>
            <li>• <strong>Connection Pool Usage</strong> - Active vs idle connections</li>
            <li>• <strong>Response Time</strong> - Average query latency by backend</li>
            <li>• <strong>Failover Events</strong> - Backend up/down timeline</li>
            <li>• <strong>Load Balance Efficiency</strong> - Query distribution fairness</li>
          </ul>
        </div>
      </section>

      <section id="mqtt-events">
        <h2>MQTT Event Monitoring</h2>
        <p>
          Monitor pgBalancer events in real-time using MQTT:
        </p>

        <BashCodeBlock
          title="MQTT Event Subscription"
          code={`# Subscribe to all pgBalancer events
mosquitto_sub -h localhost -t 'pgbalancer/#' -v

# Subscribe to specific event types
mosquitto_sub -h localhost -t 'pgbalancer/node/status' -v
mosquitto_sub -h localhost -t 'pgbalancer/failover' -v`}
        />
      </section>

      <section id="logging-analysis">
        <h2>Logging and Log Analysis</h2>
        <BashCodeBlock
          title="Log Monitoring"
          code={`# View pgBalancer logs
tail -f /var/log/pgbalancer/pgbalancer.log

# Filter for errors only
tail -f /var/log/pgbalancer/pgbalancer.log | grep ERROR

# View systemd logs
sudo journalctl -u pgbalancer -f`}
        />
      </section>

      <section id="performance-monitoring">
        <h2>Performance Monitoring Queries</h2>
        <BashCodeBlock
          title="Real-Time Health Monitoring"
          code={`# Monitor AI health scores in real-time
watch -n 5 'curl -s http://localhost:8080/api/backends | jq ".[] | {id, hostname, health_score, avg_response_time_ms}"'`}
        />
      </section>

      <section id="alerting-best-practices">
        <h2>Alerting Best Practices</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4>⚠️ Critical Alerts</h4>
            <ul className="text-sm space-y-1">
              <li>• Backend node down (health_score = 0)</li>
              <li>• All backends unavailable</li>
              <li>• Connection pool exhaustion (utilization &gt; 90%)</li>
              <li>• Failover events</li>
              <li>• Health check failures (&gt; 3 consecutive)</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg">
            <h4>⚡ Warning Alerts</h4>
            <ul className="text-sm space-y-1">
              <li>• Low health score (&lt; 0.5)</li>
              <li>• High response time (&gt; 100ms avg)</li>
              <li>• Connection pool usage (&gt; 70%)</li>
              <li>• Uneven query distribution</li>
              <li>• Increased error rate</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="key-metrics-reference">
        <h2>Key Metrics Reference</h2>
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
            </tbody>
          </table>
        </div>
      </section>
    </PostgresDocsLayout>
  )
}
