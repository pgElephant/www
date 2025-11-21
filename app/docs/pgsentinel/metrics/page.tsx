import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'pgSentinel Metrics Catalog',
  description: 'Reference for pgSentinel time-series metrics collected from pgBouncer and PostgreSQL.',
}

const tableOfContents: TocItem[] = [
  { id: 'pool-capacity', title: 'Pool Capacity' },
  { id: 'throughput-latency', title: 'Throughput & Latency' },
  { id: 'errors-alerts', title: 'Errors & Alerts' },
  { id: 'prometheus-examples', title: 'Prometheus Examples' },
]

const prevLink: NavLink = {
  href: '/docs/pgsentinel/configuration',
  label: 'Configuration Reference',
}

const nextLink: NavLink = {
  href: '/docs/pgsentinel/api',
  label: 'API Reference',
}

const metricGroups = [
  {
    title: 'Pool Capacity',
    metrics: [
      { name: 'pgsentinel_pool_connections', description: 'Active, idle, and max connections per pool and database.' },
      { name: 'pgsentinel_pool_wait_queue', description: 'Number of clients waiting for an available backend connection.' },
      { name: 'pgsentinel_pool_server_usage', description: 'Allocated vs free server connections (backend sockets).' },
    ],
  },
  {
    title: 'Throughput & Latency',
    metrics: [
      { name: 'pgsentinel_query_duration_seconds', description: 'Histogram of query execution time observed by pgBouncer.' },
      { name: 'pgsentinel_transactions_total', description: 'Cumulative transactions per pool.' },
      { name: 'pgsentinel_bytes_transferred_total', description: 'Inbound/outbound bytes proxied.' },
    ],
  },
  {
    title: 'Errors & Alerts',
    metrics: [
      { name: 'pgsentinel_retries_total', description: 'Client retries triggered due to pool saturation.' },
      { name: 'pgsentinel_auth_failures_total', description: 'Authentication failures observed at pgBouncer.' },
      { name: 'pgsentinel_alerts_fired_total', description: 'Number of alerts fired per severity and pool.' },
    ],
  },
]

const prometheusQuery = `# Active client connections vs limits
pgsentinel_pool_connections{state="active"}
  / ignoring(state)
pgsentinel_pool_connections_limit`;

const PgSentinelMetricsPage = () => {
  return (
    <PostgresDocsLayout
      title="Metrics Catalog"
      version="pgSentinel Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      {metricGroups.map((group) => (
        <section key={group.title} id={group.title.toLowerCase().replace(/\s+/g, '-')}>
          <h2>{group.title}</h2>
          <div className="border rounded-lg divide-y">
            {group.metrics.map((metric) => (
              <div key={metric.name} className="p-4">
                <code className="text-sm font-mono">{metric.name}</code>
                <p className="text-sm mt-1">{metric.description}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section id="prometheus-examples">
        <h2>Prometheus Examples</h2>
        <SqlCodeBlock title="Pool saturation" code={prometheusQuery} />
        <SqlCodeBlock
          title="95th percentile latency"
          code={`histogram_quantile(0.95,
  sum(rate(pgsentinel_query_duration_seconds_bucket[5m])) by (le, pool)
)`}
        />
      </section>
    </PostgresDocsLayout>
  )
}

export default PgSentinelMetricsPage
