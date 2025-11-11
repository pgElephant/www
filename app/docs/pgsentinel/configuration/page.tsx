import React from 'react'
import { Metadata } from 'next'
import DocsContentLayout from '../../../../components/DocsContentLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import { PgSentinelIcon } from '../../../../components/ProductIcons'

export const metadata: Metadata = {
  title: 'pgSentinel Configuration Guide',
  description: 'Configure pgSentinel environment variables, secrets, and integrations for pgBouncer monitoring.',
}

const envGroups = [
  {
    title: 'Core Services',
    variables: [
      { name: 'PGSENTINEL_PGBOUNCER_DSN', required: true, description: 'Admin DSN for pgBouncer (postgres URI including pooler port).' },
      { name: 'PGSENTINEL_STORAGE_DSN', required: true, description: 'PostgreSQL DSN for metrics/time-series storage.' },
      { name: 'PGSENTINEL_PROMETHEUS_EXPORT', required: false, description: 'Enable `/metrics` endpoint (true|false).' },
    ],
  },
  {
    title: 'Authentication & Security',
    variables: [
      { name: 'PGSENTINEL_ADMIN_PASSWORD', required: true, description: 'Initial admin password for the web UI.' },
      { name: 'PGSENTINEL_JWT_SECRET', required: true, description: 'Secret used to sign API tokens.' },
      { name: 'PGSENTINEL_DISABLE_SIGNUP', required: false, description: 'Disallow new UI accounts (true|false).' },
    ],
  },
  {
    title: 'Retention & Sampling',
    variables: [
      { name: 'PGSENTINEL_METRICS_RETENTION_DAYS', required: false, description: 'Historical data retention window.' },
      { name: 'PGSENTINEL_SCRAPE_INTERVAL', required: false, description: 'Frequency for pgBouncer polling (e.g. 5s).' },
      { name: 'PGSENTINEL_ALERT_INTERVAL', required: false, description: 'How often alert rules evaluate (e.g. 30s).' },
    ],
  },
]

const dockerExample = `services:
  pgsentinel:
    image: ghcr.io/pgelephant/pgsentinel:latest
    environment:
      PGSENTINEL_PGBOUNCER_DSN: postgres://admin:secret@pgbouncer:6432/pgbouncer
      PGSENTINEL_STORAGE_DSN: postgres://pgsentinel:pass@postgres:5432/pgsentinel
      PGSENTINEL_PROMETHEUS_EXPORT: 'true'
      PGSENTINEL_ADMIN_PASSWORD: changeme
      PGSENTINEL_JWT_SECRET: supersecret
    ports:
      - '8080:8080'`

const roleSql = `CREATE ROLE pgsentinel WITH LOGIN PASSWORD 'pass';
CREATE DATABASE pgsentinel OWNER pgsentinel;
GRANT ALL PRIVILEGES ON DATABASE pgsentinel TO pgsentinel;`

export default function PgSentinelConfigurationPage() {
  return (
    <DocsContentLayout
      hero={{
        badgeLabel: 'pgSentinel',
        badgeIcon: <PgSentinelIcon size={20} />, 
        badgeTone: 'emerald',
        title: 'Configuration Reference',
        description:
          'Set secure credentials, connect to pgBouncer and PostgreSQL storage, and tune retention for pgSentinel deployments.',
      }}
      contentWidth="wide"
    >
      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Required Services</h2>
          <p className="text-muted-foreground">
            pgSentinel needs read access to pgBouncer’s admin console and a PostgreSQL database for persistent metrics. Provide DSNs via environment variables or Helm chart values.
          </p>
          <BashCodeBlock title="docker-compose" code={dockerExample} />
          <SqlCodeBlock title="Create metrics database" code={roleSql} />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Environment Variables</h2>
          <p className="text-muted-foreground">
            Grouped variables below can be injected with Docker, systemd units, or Kubernetes secrets. All secrets should be stored in a vault or encrypted store.
          </p>
          <div className="grid lg:grid-cols-3 gap-4">
            {envGroups.map((group) => (
              <div key={group.title} className="border rounded-lg p-4 space-y-3">
                <h3 className="font-semibold">{group.title}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {group.variables.map((variable) => (
                    <li key={variable.name}>
                      <code className="font-mono text-xs">{variable.name}</code>
                      {variable.required ? ' · required' : ' · optional'}
                      <div>{variable.description}</div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Security Controls</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Web UI hardening</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Set <code>PGSENTINEL_DISABLE_SIGNUP=true</code> and create accounts via CLI or admin API.</li>
                <li>Run behind a TLS-enabled reverse proxy (Traefik, Nginx) with basic auth or SSO.</li>
                <li>Rotate <code>PGSENTINEL_JWT_SECRET</code> regularly and invalidate tokens via the admin panel.</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Network & secrets</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Use Kubernetes secrets / Docker secrets to mount DSNs instead of plain env vars where possible.</li>
                <li>Restrict pgBouncer admin console to the pgSentinel network CIDR.</li>
                <li>Limit database role privileges to INSERT/SELECT/DELETE on pgSentinel schemas.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Observability & Integrations</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Prometheus & Grafana</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Expose `/metrics` by setting <code>PGSENTINEL_PROMETHEUS_EXPORT=true</code>.</li>
                <li>Scrape the endpoint every 15s and import the official Grafana dashboard from the docs.</li>
                <li>Use recording rules for pool saturation and queue depth.</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Alerting</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Configure <code>PGSENTINEL_ALERT_WEBHOOK</code> for Slack/Teams notifications.</li>
                <li>Set <code>PGSENTINEL_ALERT_THRESHOLD_QUEUE</code> and <code>PGSENTINEL_ALERT_THRESHOLD_LATENCY</code> to match SLAs.</li>
                <li>Integrate with PagerDuty via the REST API’s incident endpoints.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </DocsContentLayout>
  )
}
