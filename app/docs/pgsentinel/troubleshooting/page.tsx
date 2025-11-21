import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'pgSentinel Troubleshooting | Common Issues & Fixes',
  description:
    'Diagnose pgSentinel startup failures, pgBouncer connectivity issues, missing metrics, and webhook delivery errors using the guided fixes below.',
}

const tableOfContents: TocItem[] = [
  { id: 'fast-triage', title: 'Fast Triage Checklist' },
  { id: 'containers-fail', title: 'Containers Fail to Start' },
  { id: 'missing-metrics', title: 'Missing Metrics or Empty Dashboards' },
  { id: 'alerts-not-firing', title: 'Alerts Not Firing' },
  { id: 'support-bundle', title: 'Support Bundle' },
]

const prevLink: NavLink = {
  href: '/docs/pgsentinel/grafana',
  label: 'Grafana Integration',
}

const nextLink: NavLink = {
  href: '/docs/pgsentinel/getting-started',
  label: 'Getting Started',
}

const supportBundle = `#!/usr/bin/env bash
DEST=/tmp/pgsentinel-support-$(date +%s)
mkdir -p "$DEST"

docker compose ps > "$DEST/compose_ps.txt"
docker compose logs pgsentinel > "$DEST/pgsentinel.log"

curl -s http://localhost:8080/api/v1/health > "$DEST/health.json"
curl -s http://localhost:8080/api/v1/status > "$DEST/status.json"

pg_dump --schema=pgsentinel --format=custom pgsentinel > "$DEST/metrics.dump"

tar -C /tmp -czf pgsentinel-support.tar.gz "$(basename "$DEST")"`

export default function PgSentinelTroubleshootingPage() {
  return (
    <PostgresDocsLayout
      title="Troubleshooting"
      version="pgSentinel Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="fast-triage">
        <h2>Fast Triage Checklist</h2>
        <p>
          Follow these actionable diagnostics to fix container startup issues, pgBouncer connectivity, missing metrics, and alert delivery in pgSentinel.
        </p>
        <ul>
          <li>Ensure pgSentinel containers are running (<code>docker compose ps</code> or <code>kubectl get pods</code>)</li>
          <li>Confirm the admin API responds: <code>curl http://pgsentinel:8080/api/v1/health</code> should return <code>{'{'} "status": "healthy" {'}'}</code></li>
          <li>Verify pgBouncer admin credentials with <code>psql "postgres://admin:secret@pgbouncer:6432/pgbouncer" -c "SHOW STATS"</code></li>
          <li>Check that Prometheus can scrape <code>/metrics</code> when <code>PGSENTINEL_PROMETHEUS_EXPORT</code> is <code>true</code></li>
        </ul>
        <p className="text-sm">
          Collect diagnostics in staging before applying production fixes whenever possible. Roll back temporary settings after validation.
        </p>
      </section>

      <section id="containers-fail">
        <h2>Containers Fail to Start</h2>
        <p>Most startup errors trace back to missing DSNs or conflicting ports.</p>
        
        <h3>Gather diagnostics</h3>
        <BashCodeBlock
          title="Startup checks"
          code={`docker compose ps
docker compose logs pgsentinel | tail -n 50
lsof -i :8080`}
        />

        <h3>Common fixes</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Verify <code>PGSENTINEL_PGBOUNCER_DSN</code> and <code>PGSENTINEL_STORAGE_DSN</code> point to reachable services.</li>
          <li>Ensure secrets mounted via Docker/Kubernetes have correct permissions.</li>
          <li>Free port 8080 (or remap) if a reverse proxy is already listening.</li>
        </ul>
      </section>

      <section id="missing-metrics">
        <h2>Missing Metrics or Empty Dashboards</h2>
        <p>Confirm polling succeeds and retention is configured correctly.</p>

        <h3>Check last sample age</h3>
        <SqlCodeBlock
          title="Sample recency"
          code={`SELECT now() - max(observed_at) AS last_sample_age
  FROM pgsentinel.samples;`}
        />

        <h3>Remediation tips</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Confirm pgBouncer admin credentials and IP allowlists.</li>
          <li>Increase <code>max_client_conn</code> on pgBouncer if the admin console rejects pgSentinel.</li>
          <li>Set <code>PGSENTINEL_METRICS_RETENTION_DAYS</code> to a positive value (default 30 days).</li>
        </ul>
      </section>

      <section id="alerts-not-firing">
        <h2>Alerts Not Firing</h2>
        <p>Webhooks only trigger when alert evaluation runs successfully and thresholds are crossed.</p>

        <h3>Send test notification</h3>
        <BashCodeBlock
          title="Test webhook"
          code={`curl -X POST https://pgsentinel.example.com/api/v1/alerts/test \\
  -H "Authorization: Bearer <token>" \\
  -H "Content-Type: application/json" \\
  -d '{"webhook_id":"slack-primary"}'`}
        />

        <h3>Alert checklist</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Set <code>PGSENTINEL_ALERT_INTERVAL</code> (default 30s) to enable evaluations.</li>
          <li>Review <code>pgsentinel.alert_events</code> for muted or suppressed alerts.</li>
          <li>Inspect webhook responses in <code>docker compose logs pgsentinel</code>; pgSentinel stops retrying after five failures.</li>
        </ul>
      </section>

      <section id="support-bundle">
        <h2>Support Bundle</h2>
        <p>Collect logs and metrics snapshots before opening a support ticket.</p>

        <h3>Generate support bundle</h3>
        <BashCodeBlock title="Support script" code={supportBundle} />

        <h3>Share with pgElephant support</h3>
        <p className="text-sm">
          Upload <code>pgsentinel-support.tar.gz</code> together with Docker version, PostgreSQL version, and relevant pgBouncer configuration snippets.
        </p>
      </section>
    </PostgresDocsLayout>
  )
}
