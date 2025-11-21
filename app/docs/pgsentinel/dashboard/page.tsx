import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'pgSentinel Dashboard | Documentation',
  description: 'Tour the pgSentinel dashboards, filters, and alert workflows for pgBouncer monitoring.',
}

const tableOfContents: TocItem[] = [
  { id: 'overview-panels', title: 'Overview Panels' },
  { id: 'filtering-drilldowns', title: 'Filtering & Drilldowns' },
  { id: 'alert-configuration', title: 'Alert Configuration' },
  { id: 'exporting-embedding', title: 'Exporting & Embedding Panels' },
]

const prevLink: NavLink = {
  href: '/docs/pgsentinel/api',
  label: 'API Reference',
}

const nextLink: NavLink = {
  href: '/docs/pgsentinel/grafana',
  label: 'Grafana Integration',
}

const PgSentinelDashboardPage = () => {
  return (
    <PostgresDocsLayout
      title="pgSentinel Dashboard"
      version="pgSentinel Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview-panels">
        <h2>Overview Panels</h2>
        <p>
          The landing dashboard surfaces pool health, client concurrency, and wait queues. Use the time picker (top-right) to zoom into spikes and set the refresh interval to 5s for live troubleshooting.
        </p>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li><strong>Pool Saturation</strong>: Total connections vs configured limits per pool.</li>
          <li><strong>Wait Queue Depth</strong>: Number of clients waiting for a free backend.</li>
          <li><strong>Latency Heatmap</strong>: 95th percentile response time by pool.</li>
        </ul>
      </section>

      <section id="filtering-drilldowns">
        <h2>Filtering &amp; Drilldowns</h2>
        <p>
          Use the global filters (instance, pool, database) to narrow down to a specific tenant. Each panel supports click-to-drill, opening detailed views with raw metrics and recent events.
        </p>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Click on a pool in <em>Pool Saturation</em> to open the pool detail view (connections, transactions/s, errors).</li>
          <li>Select a row in the <em>Wait Queue</em> table to list blocked clients and current queries.</li>
          <li>Toggle <em>Show system metrics</em> to overlay host CPU/RAM metrics alongside pool stats.</li>
        </ul>
      </section>

      <section id="alert-configuration">
        <h2>Alert Configuration</h2>
        <p>
          Alerts configured in the UI write to Prometheus-compatible rules and trigger Slack/PagerDuty webhooks.
        </p>
        <BashCodeBlock
          title="Alert thresholds"
          code={`pgsentinel alerts create \\
  --name high_wait_queue \\
  --pool primary \\
  --expression 'wait_queue_size > 5' \\
  --severity warning \\
  --webhook https://hooks.slack.com/services/T000/B000/XXXXX`}
        />
        <p className="text-sm">
          Alert definitions are stored in <code>pgsentinel.alert_rules</code>; export them to version control with the REST API for reproducible configuration.
        </p>
      </section>

      <section id="exporting-embedding">
        <h2>Exporting &amp; Embedding Panels</h2>
        <p>
          Every chart can be exported as JSON or embedded in external dashboards.
        </p>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Use the panel menu → <em>Export data</em> to download CSV snapshots.</li>
          <li>Copy the <em>Embed</em> link to display charts in Confluence, Statuspage, or custom portals.</li>
          <li>Enable <code>PGSENTINEL_EMBED_TOKEN</code> to protect embedded panels with signed URLs.</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

export default PgSentinelDashboardPage
