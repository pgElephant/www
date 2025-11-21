import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'pgSentinel Getting Started - Quick Setup Guide',
  description:
    'Install pgSentinel, connect to pgBouncer, and ship metrics to Prometheus/Grafana in minutes.',
}

const tableOfContents: TocItem[] = [
  { id: 'prerequisites', title: 'Prerequisites' },
  { id: 'step1-launch', title: 'Step 1 · Launch pgSentinel' },
  { id: 'step2-connect', title: 'Step 2 · Connect to pgBouncer & PostgreSQL' },
  { id: 'step3-prometheus', title: 'Step 3 · Enable Prometheus/Grafana' },
  { id: 'next-steps', title: 'Next Steps' },
]

const prevLink: NavLink = {
  href: '/docs/pgsentinel/troubleshooting',
  label: 'Troubleshooting',
}

const nextLink: NavLink = {
  href: '/docs/pgsentinel/configuration',
  label: 'Configuration Reference',
}

const PgSentinelGettingStartedPage = () => {
  return (
    <PostgresDocsLayout
      title="Getting Started with pgSentinel"
      version="pgSentinel Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="prerequisites">
        <h2>Prerequisites</h2>
        <p>
          Spin up pgSentinel with Docker, connect to pgBouncer, and start visualising pool metrics using the built-in dashboards.
        </p>
        <ul>
          <li>pgBouncer 1.18+ with admin console enabled</li>
          <li>PostgreSQL 14+ for metrics storage (optional external DB)</li>
          <li>Docker or Kubernetes runtime for container deployment</li>
          <li>Prometheus (optional) for long-term metric retention</li>
        </ul>
      </section>

      <section id="step1-launch">
        <h2>Step 1 · Launch pgSentinel</h2>
        <p>Run the official container image or helm chart.</p>
        
        <h3>Docker compose</h3>
        <BashCodeBlock
          title="docker-compose.yml"
          code={`version: '3.9'
services:
  pgsentinel:
    image: ghcr.io/pgelephant/pgsentinel:latest
    ports:
      - '8080:8080'
    environment:
      - PGSENTINEL_PGBOUNCER_DSN=postgres://admin:secret@pgbouncer:6432/pgbouncer
      - PGSENTINEL_STORAGE_DSN=postgres://pgsentinel:pass@postgres:5432/pgsentinel
      - PGSENTINEL_PROMETHEUS_EXPORT=true`}
        />

        <h3>Kubernetes (Helm)</h3>
        <BashCodeBlock
          title="Install chart"
          code={`helm repo add pgelephant https://charts.pgelephant.com
helm install pgsentinel pgelephant/pgsentinel \\
  --set pgbouncer.dsn=postgres://admin:secret@pgbouncer:6432/pgbouncer \\
  --set storage.dsn=postgres://pgsentinel:pass@postgres:5432/pgsentinel`}
        />
      </section>

      <section id="step2-connect">
        <h2>Step 2 · Connect to pgBouncer & PostgreSQL</h2>
        <p>Provide connection strings for pgBouncer admin console and the metrics store.</p>

        <h3>pgBouncer credentials</h3>
        <BashCodeBlock
          title="pgbouncer.ini"
          code={`[pgbouncer]
listen_port = 6432
admin_users = admin
stats_users = admin

[databases]
pgbouncer = host=postgres port=5432 dbname=pgbouncer user=admin password=secret`}
        />

        <h3>Metrics schema</h3>
        <SqlCodeBlock
          title="Create pgSentinel role"
          code={`CREATE ROLE pgsentinel WITH LOGIN PASSWORD 'pass';
CREATE DATABASE pgsentinel OWNER pgsentinel;
GRANT ALL PRIVILEGES ON DATABASE pgsentinel TO pgsentinel;`}
        />
      </section>

      <section id="step3-prometheus">
        <h2>Step 3 · Enable Prometheus/Grafana</h2>
        <p>Expose metrics via /metrics and import the starter Grafana dashboard.</p>

        <h3>Prometheus scrape config</h3>
        <BashCodeBlock
          title="prometheus.yml"
          code={`scrape_configs:
  - job_name: 'pgsentinel'
    static_configs:
      - targets: ['pgsentinel:8080']`}
        />

        <h3>Grafana import</h3>
        <BashCodeBlock
          title="Dashboard provisioning"
          code={`curl -L https://raw.githubusercontent.com/pgElephant/pgsentinel/main/grafana/pgsentinel.json \\
  -o /var/lib/grafana/dashboards/pgsentinel.json`}
        />
      </section>

      <section id="next-steps">
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/pgsentinel/configuration">Configuration reference</a> - Tweak retention, authentication, and alert routing.</li>
          <li><a href="/docs/pgsentinel/metrics">Metrics catalog</a> - Understand every pgSentinel metric for dashboards and alerts.</li>
          <li><a href="/docs/pgsentinel/api">REST API</a> - Automate pool actions and integrate with runbooks.</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

export default PgSentinelGettingStartedPage
