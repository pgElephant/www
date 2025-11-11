import React from 'react'
import DocsContentLayout from '../../../../components/DocsContentLayout'
import { PgSentinelIcon } from '../../../../components/ProductIcons'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata = {
  title: 'pgSentinel Dashboard | Documentation',
  description: 'Tour the pgSentinel dashboards, filters, and alert workflows for pgBouncer monitoring.',
}

const PgSentinelDashboardPage = () => {
  return (
    <DocsContentLayout
      hero={{
        badgeLabel: 'pgSentinel',
        badgeIcon: <PgSentinelIcon size={20} />, 
        badgeTone: 'emerald',
        title: 'pgSentinel Dashboard',
        description:
          'Navigate pgSentinel’s live dashboards to monitor pool saturation, query throughput, and latency across pgBouncer instances.',
      }}
      contentWidth="wide"
    >
      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Overview Panels</h2>
          <p className="text-muted-foreground">
            The landing dashboard surfaces pool health, client concurrency, and wait queues. Use the time picker (top-right) to zoom into spikes and set the refresh interval to 5s for live troubleshooting.
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li><strong>Pool Saturation</strong>: Total connections vs configured limits per pool.</li>
            <li><strong>Wait Queue Depth</strong>: Number of clients waiting for a free backend.</li>
            <li><strong>Latency Heatmap</strong>: 95th percentile response time by pool.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Filtering &amp; Drilldowns</h2>
          <p className="text-muted-foreground">
            Use the global filters (instance, pool, database) to narrow down to a specific tenant. Each panel supports click-to-drill, opening detailed views with raw metrics and recent events.
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Click on a pool in <em>Pool Saturation</em> to open the pool detail view (connections, transactions/s, errors).</li>
            <li>Select a row in the <em>Wait Queue</em> table to list blocked clients and current queries.</li>
            <li>Toggle <em>Show system metrics</em> to overlay host CPU/RAM metrics alongside pool stats.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Alert Configuration</h2>
          <p className="text-muted-foreground">
            Alerts configured in the UI write to Prometheus-compatible rules and trigger Slack/PagerDuty webhooks.
          </p>
          <BashCodeBlock
            title="Alert thresholds"
            code={`pgsentinel alerts create \
  --name high_wait_queue \
  --pool primary \
  --expression 'wait_queue_size > 5' \
  --severity warning \
  --webhook https://hooks.slack.com/services/T000/B000/XXXXX`}
          />
          <p className="text-sm text-muted-foreground">
            Alert definitions are stored in <code>pgsentinel.alert_rules</code>; export them to version control with the REST API for reproducible configuration.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Exporting &amp; Embedding Panels</h2>
          <p className="text-muted-foreground">
            Every chart can be exported as JSON or embedded in external dashboards.
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Use the panel menu → <em>Export data</em> to download CSV snapshots.</li>
            <li>Copy the <em>Embed</em> link to display charts in Confluence, Statuspage, or custom portals.</li>
            <li>Enable <code>PGSENTINEL_EMBED_TOKEN</code> to protect embedded panels with signed URLs.</li>
          </ul>
        </section>
      </div>
    </DocsContentLayout>
  )
}

export default PgSentinelDashboardPage
