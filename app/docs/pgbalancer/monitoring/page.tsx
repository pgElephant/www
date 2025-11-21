import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'Monitoring & Metrics - pgBalancer',
  description: 'Configure Prometheus metrics, Grafana dashboards, and alerting for pgBalancer monitoring.',
}

const tableOfContents: TocItem[] = [
  { id: 'prometheus-setup', title: 'Configure Prometheus Scraping' },
  { id: 'key-metrics', title: 'Monitor Key Metrics' },
  { id: 'alert-rules', title: 'Configure Alert Rules' },
  { id: 'grafana-dashboard', title: 'Grafana Dashboard' },
  { id: 'alertmanager', title: 'Alertmanager Notifications' },
  { id: 'best-practices', title: 'Monitoring Best Practices' },
  { id: 'metrics-reference', title: 'Metrics Reference' },
]

const prevLink: NavLink = {
  href: '/docs/pgbalancer/high-availability',
  label: 'High Availability & Failover',
}

const nextLink: NavLink = {
  href: '/docs/pgbalancer/internals',
  label: 'Architecture & Internals',
}

export default function MonitoringMetricsPage() {
  return (
    <PostgresDocsLayout
      title="Monitoring & Metrics"
      version="pgBalancer Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="prometheus-setup">
        <h2>Configure Prometheus Scraping</h2>
        <p>
          pgBalancer exposes Prometheus metrics on the <code>/metrics</code> endpoint:
        </p>

        <BashCodeBlock
          title="Prometheus Configuration"
          code={`# prometheus.yml configuration
global:
  scrape_interval: 15s      # Scrape every 15 seconds
  evaluation_interval: 15s  # Evaluate rules every 15 seconds

scrape_configs:
  # pgBalancer metrics
  - job_name: 'pgbalancer'
    static_configs:
      - targets:
          - 'pgbalancer1.internal:8080'
          - 'pgbalancer2.internal:8080'
          - 'pgbalancer3.internal:8080'
    metrics_path: '/metrics'
    scrape_interval: 15s
    scrape_timeout: 10s

# Load alert rules
rule_files:
  - 'pgbalancer-alerts.yml'`}
        />

        <BashCodeBlock
          title="Verify Metrics Endpoint"
          code={`# Test metrics endpoint
curl -s http://localhost:8080/metrics

# Reload Prometheus configuration
curl -X POST http://localhost:9090/-/reload`}
        />
      </section>

      <section id="key-metrics">
        <h2>Monitor Key Metrics</h2>
        <p>
          Track critical pgBalancer metrics:
        </p>

        <BashCodeBlock
          title="Backend Health Metrics"
          code={`# Number of backends currently up
sum(pgbalancer_backend_up)

# Backend uptime percentage (last 24 hours)
avg_over_time(pgbalancer_backend_up[24h]) * 100

# Backends currently down (for alerting)
pgbalancer_backend_up == 0`}
        />

        <BashCodeBlock
          title="Load Distribution Metrics"
          code={`# Queries per second by backend
rate(pgbalancer_backend_queries_total[5m])

# Total cluster queries per second
sum(rate(pgbalancer_backend_queries_total[5m]))`}
        />
      </section>

      <section id="alert-rules">
        <h2>Configure Alert Rules</h2>
        <p>
          Set up critical alerts for pgBalancer monitoring:
        </p>

        <BashCodeBlock
          title="pgbalancer-alerts.yml"
          code={`groups:
  - name: pgbalancer_alerts
    interval: 30s
    rules:
      # Critical: pgBalancer server down
      - alert: PgbalancerDown
        expr: pgbalancer_up == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "pgBalancer server is down"
          description: "pgBalancer instance {{ $labels.instance }} is down"

      # Critical: Backend node down
      - alert: PgbalancerBackendDown
        expr: pgbalancer_backend_up == 0
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "Backend node {{ $labels.node_id }} is down"
          description: "Backend {{ $labels.hostname }}:{{ $labels.port }} (node {{ $labels.node_id }}) has been down for 2 minutes"`}
        />
      </section>

      <section id="grafana-dashboard">
        <h2>Grafana Dashboard</h2>
        <p>
          Import the pre-built pgBalancer Grafana dashboard:
        </p>

        <BashCodeBlock
          title="Import Dashboard"
          code={`# Download dashboard JSON
wget https://raw.githubusercontent.com/pgElephant/pgbalancer/main/monitoring/grafana/pgbalancer-dashboard.json

# Import via Grafana UI
# 1. Go to: http://localhost:3000/dashboard/import
# 2. Upload pgbalancer-dashboard.json
# 3. Select Prometheus data source
# 4. Click "Import"`}
        />
      </section>

      <section id="alertmanager">
        <h2>Alertmanager Notifications</h2>
        <p>
          Configure alert notifications via Slack, email, or PagerDuty:
        </p>

        <BashCodeBlock
          title="Alertmanager Configuration"
          code={`# alertmanager.yml
global:
  resolve_timeout: 5m
  slack_api_url: 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK'

route:
  receiver: 'pgbalancer-alerts'
  group_by: ['alertname', 'instance']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h`}
        />
      </section>

      <section id="best-practices">
        <h2>Monitoring Best Practices</h2>
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-4">
          <h3>✓ DO</h3>
          <ul className="space-y-2">
            <li>• Scrape metrics every <strong>15-30 seconds</strong> (balance freshness vs load)</li>
            <li>• Retain metrics for <strong>30+ days</strong> for trend analysis</li>
            <li>• Use <strong>recording rules</strong> for expensive queries in dashboards</li>
            <li>• Configure <strong>Alertmanager</strong> for critical alerts</li>
            <li>• Test failover and alert pipelines regularly</li>
          </ul>
        </div>

        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
          <h3>✗ DON'T</h3>
          <ul className="space-y-2">
            <li>• Don't scrape faster than 10 seconds (adds unnecessary load)</li>
            <li>• Don't set alert <code>for</code> duration too low (avoid flapping)</li>
            <li>• Don't create high-cardinality metrics (per-connection labels)</li>
            <li>• Don't ignore warning alerts for extended periods</li>
            <li>• Don't rely only on metrics - monitor logs too</li>
          </ul>
        </div>
      </section>

      <section id="metrics-reference">
        <h2>Metrics Reference</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700 text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="border border-gray-300 dark:border-gray-700 p-3 text-left">Metric</th>
                <th className="border border-gray-300 dark:border-gray-700 p-3 text-left">Type</th>
                <th className="border border-gray-300 dark:border-gray-700 p-3 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 p-3"><code>pgbalancer_up</code></td>
                <td className="border border-gray-300 dark:border-gray-700 p-3">Gauge</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3">Server status (1=up)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 p-3"><code>pgbalancer_backend_up</code></td>
                <td className="border border-gray-300 dark:border-gray-700 p-3">Gauge</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3">Backend status by node_id</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 p-3"><code>pgbalancer_backend_queries_total</code></td>
                <td className="border border-gray-300 dark:border-gray-700 p-3">Counter</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3">Total queries per backend</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 p-3"><code>pgbalancer_pool_utilization_percent</code></td>
                <td className="border border-gray-300 dark:border-gray-700 p-3">Gauge</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3">Pool utilization (0-100)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </PostgresDocsLayout>
  )
}
