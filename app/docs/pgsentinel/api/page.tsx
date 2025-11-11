import React from 'react'
import { Metadata } from 'next'
import DocsContentLayout from '../../../../components/DocsContentLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import { PgSentinelIcon } from '../../../../components/ProductIcons'

export const metadata: Metadata = {
  title: 'pgSentinel API Reference',
  description: 'REST API endpoints for managing pgSentinel, retrieving metrics, and automating alerts.',
}

interface Endpoint {
  method: string
  path: string
  description: string
}

const endpoints: Record<string, Endpoint[]> = {
  'System Health': [
    { method: 'GET', path: '/health', description: 'Return application health, service status, and build metadata.' },
    { method: 'GET', path: '/status', description: 'Detailed runtime stats (uptime, memory usage, connected pools).' },
  ],
  'Pools & Clients': [
    { method: 'GET', path: '/pools', description: 'List pgBouncer pools with current usage, wait queue, and limits.' },
    { method: 'GET', path: '/pools/{pool}/clients', description: 'Active clients within a pool including state, duration, and backend.' },
    { method: 'POST', path: '/pools/{pool}/reload', description: 'Reload pool configuration from pgBouncer admin console.' },
  ],
  Metrics: [
    { method: 'GET', path: '/metrics', description: 'Aggregated metrics per pool (TPS, response time, saturation).' },
    { method: 'GET', path: '/metrics/timeseries', description: 'Time-series data for graphing or external dashboards (Prometheus-friendly).' },
  ],
  Alerts: [
    { method: 'GET', path: '/alerts', description: 'List alert rules currently active in pgSentinel.' },
    { method: 'POST', path: '/alerts', description: 'Create or update an alert rule (queue length, latency, errors).' },
    { method: 'POST', path: '/alerts/test', description: 'Fire a test notification to validate webhook integrations.' },
  ],
}

const curlExample = `curl -H "Authorization: Bearer <token>" \
  https://pgsentinel.example.com/api/v1/pools`;

const tokenSql = `INSERT INTO pgsentinel.api_tokens (name, token_hash, created_by)
VALUES ('terraform', crypt('my-token', gen_salt('bf')), 'admin');`;

const PgSentinelApiPage = () => {
  return (
    <DocsContentLayout
      hero={{
        badgeLabel: 'pgSentinel',
        badgeIcon: <PgSentinelIcon size={20} />, 
        badgeTone: 'emerald',
        title: 'API Reference',
        description:
          'Automate pgBouncer monitoring workflows with pgSentinel’s REST API for pools, metrics, and alerts.',
      }}
      contentWidth="wide"
    >
      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Authentication</h2>
          <p className="text-muted-foreground">
            Obtain a bearer token from the pgSentinel UI or create one via SQL. Include the token in the <code>Authorization</code> header for every request.
          </p>
          <SqlCodeBlock title="Create API token" code={tokenSql} />
          <BashCodeBlock title="Example request" code={curlExample} />
          <p className="text-sm text-muted-foreground">
            Tokens inherit the roles of the issuing user. Rotate credentials regularly and revoke via <code>DELETE /api/v1/tokens/{'{'}id{'}'}</code> when compromised.
          </p>
        </section>

        {Object.entries(endpoints).map(([category, items]) => (
          <section key={category} className="space-y-3">
            <h2 className="text-2xl font-semibold">{category}</h2>
            <div className="border rounded-lg divide-y">
              {items.map((endpoint) => (
                <div key={endpoint.path} className="p-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                      {endpoint.method}
                    </span>
                    <code className="text-sm">{endpoint.path}</code>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{endpoint.description}</p>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Pagination &amp; Query Parameters</h2>
          <p className="text-muted-foreground">
            Collection endpoints support <code>?page=</code>, <code>?page_size=</code>, and <code>?sort=</code> (e.g. <code>sort=-latency</code>). Use <code>?from=&amp;to=</code> for time range filters on metrics endpoints.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Webhooks &amp; Integrations</h2>
          <p className="text-muted-foreground">
            Configure Slack, PagerDuty, or custom webhooks by POSTing to <code>/webhooks</code>. Each webhook can subscribe to alert categories (queue, latency, errors) and includes signed payloads for tamper detection.
          </p>
        </section>
      </div>
    </DocsContentLayout>
  )
}

export default PgSentinelApiPage
