import { Metadata } from 'next'
import Link from 'next/link'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'FauxDB Monitoring | Prometheus & Grafana Setup',
  description:
    'Monitor FauxDB with Prometheus, Grafana, and custom metrics. Complete observability setup for production deployments.',
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/fauxdb/monitoring',
  },
}

const tableOfContents: TocItem[] = [
  { id: 'prometheus-metrics', title: 'Prometheus Metrics' },
  { id: 'available-metrics', title: 'Available Metrics' },
  { id: 'grafana-dashboard', title: 'Grafana Dashboard' },
  { id: 'health-checks', title: 'Health Checks' },
]

const prevLink: NavLink = {
  href: '/docs/fauxdb/configuration',
  label: 'Configuration',
}

const nextLink: NavLink = {
  href: '/docs/fauxdb/examples',
  label: 'Examples',
}

export default function FauxDBMonitoringPage() {
  return (
    <PostgresDocsLayout
      title="FauxDB Monitoring & Observability"
      version="FauxDB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="prometheus-metrics">
        <h2>Prometheus Metrics</h2>
        <p>Enable and configure Prometheus metrics for FauxDB.</p>

        <BashCodeBlock
          title="Enable metrics in configuration"
          code={`[monitoring]
prometheus_enabled = true
prometheus_port = 9090
metrics_path = "/metrics"`}
        />
        <p>
          Access metrics at: <code>http://localhost:9090/metrics</code>
        </p>
      </section>

      <section id="available-metrics">
        <h2>Available Metrics</h2>
        <p>FauxDB exposes the following Prometheus metrics:</p>

        <h3>Connection Metrics</h3>
        <ul>
          <li><code>fauxdb_connections_total</code> - Total number of connections (Counter)</li>
          <li><code>fauxdb_connections_active</code> - Active connections (Gauge)</li>
        </ul>

        <h3>Query Metrics</h3>
        <ul>
          <li><code>fauxdb_queries_total</code> - Total queries executed (Counter)</li>
          <li><code>fauxdb_query_duration_seconds</code> - Query execution time (Histogram)</li>
        </ul>

        <h3>PostgreSQL Pool Metrics</h3>
        <ul>
          <li><code>fauxdb_pg_pool_size</code> - PostgreSQL connection pool size (Gauge)</li>
          <li><code>fauxdb_pg_pool_idle</code> - Idle connections in pool (Gauge)</li>
        </ul>

        <h3>Transaction Metrics</h3>
        <ul>
          <li><code>fauxdb_transactions_total</code> - Total transactions (Counter)</li>
          <li><code>fauxdb_transaction_duration_seconds</code> - Transaction duration (Histogram)</li>
        </ul>
      </section>

      <section id="grafana-dashboard">
        <h2>Grafana Dashboard</h2>
        <p>Import the official FauxDB Grafana dashboard for visualization.</p>

        <BashCodeBlock
          title="Import dashboard"
          code={`# Dashboard ID: fauxdb-overview
# Download from: https://grafana.com/dashboards/fauxdb

# Or manually configure:
1. Add Prometheus data source
2. Import dashboard JSON from /monitoring/grafana-dashboard.json
3. Configure variables for your environment`}
        />
      </section>

      <section id="health-checks">
        <h2>Health Checks</h2>
        <p>Monitor FauxDB health and status endpoints.</p>

        <BashCodeBlock
          title="Health check endpoints"
          code={`# Basic health check
curl http://localhost:9090/health

# Detailed status
curl http://localhost:9090/status

# Database connectivity
curl http://localhost:9090/db/health`}
        />
      </section>

      <section>
        <h2>Related Documentation</h2>
        <ul>
          <li><Link href="/docs/fauxdb/configuration">Configuration Guide</Link></li>
          <li><Link href="/docs/fauxdb/production">Production Deployment</Link></li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
