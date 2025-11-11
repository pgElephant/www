import React from 'react'
import { Metadata } from 'next'
import DocsContentLayout from '../../../../components/DocsContentLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import { PgSentinelIcon } from '../../../../components/ProductIcons'

export const metadata: Metadata = {
  title: 'pgSentinel Troubleshooting - Common Issues and Solutions',
  description: 'Diagnose pgSentinel deployments: container issues, pgBouncer connectivity, missing metrics, and alert delivery failures.',
}

const supportBundle = `#!/usr/bin/env bash
DEST=/tmp/pgsentinel-support-$(date +%s)
mkdir -p "$DEST"

docker compose ps > "$DEST/compose_ps.txt"
docker compose logs pgsentinel > "$DEST/pgsentinel.log"

curl -s http://localhost:8080/api/v1/health > "$DEST/health.json"
curl -s http://localhost:8080/api/v1/status > "$DEST/status.json"

pg_dump --schema=pgsentinel --format=custom pgsentinel > "$DEST/metrics.dump"

tar -C /tmp -czf pgsentinel-support.tar.gz "$(basename "$DEST")"`;

const PgSentinelTroubleshootingPage = () => {
  return (
    <DocsContentLayout
      hero={{
        badgeLabel: 'pgSentinel',
        badgeIcon: <PgSentinelIcon size={20} />, 
        badgeTone: 'emerald',
        title: 'Troubleshooting Guide',
        description:
          'Resolve startup failures, connectivity problems, and missing metrics in pgSentinel deployments.',
      }}
      contentWidth="wide"
    >
      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Quick Checks</h2>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li><strong>Health endpoint</strong>: <code>curl http://pgsentinel:8080/api/v1/health</code> should return <code>{`{"status":"healthy"}`}</code>.</li>
            <li><strong>pgBouncer admin</strong>: <code>psql "postgres://admin:secret@pgbouncer:6432/pgbouncer" -c "SHOW STATS"</code> must succeed.</li>
            <li><strong>Storage DB</strong>: Ensure <code>pgsentinel.metrics</code> table grows over time (<code>SELECT count(*) FROM pgsentinel.samples;</code>).</li>
            <li><strong>Prometheus scrape</strong>: <code>curl http://pgsentinel:8080/metrics</code> returns metrics when <code>PGSENTINEL_PROMETHEUS_EXPORT=true</code>.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Containers Fail to Start</h2>
          <p className="text-muted-foreground">Most startup issues stem from missing DSNs or conflicting ports.</p>
          <BashCodeBlock
            title="Diagnostics"
            code={`docker compose ps
docker compose logs pgsentinel | tail -n 50
lsof -i :8080`}
          />
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Verify <code>PGSENTINEL_PGBOUNCER_DSN</code> and <code>PGSENTINEL_STORAGE_DSN</code> are set and reachable.</li>
            <li>Check Docker secrets or Kubernetes secrets mount with correct permissions.</li>
            <li>Free port 8080 or remap via <code>ports:</code> if a reverse proxy already listens there.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">No Metrics or Empty Dashboards</h2>
          <p className="text-muted-foreground">
            When charts show <em>No data</em>, polling may be blocked or retention is misconfigured.
          </p>
          <SqlCodeBlock
            title="Verify samples"
            code={`SELECT now() - max(observed_at) AS last_sample_age
  FROM pgsentinel.samples;`}
          />
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>If <code>last_sample_age</code> exceeds the scrape interval, confirm pgBouncer admin credentials and firewall rules.</li>
            <li>Increase <code>max_client_conn</code> in pgBouncer if pgSentinel cannot obtain an admin connection.</li>
            <li>Ensure <code>PGSENTINEL_METRICS_RETENTION_DAYS</code> is not set to 0; defaults to 30 days.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Alerts Not Firing</h2>
          <p className="text-muted-foreground">
            Webhooks only trigger when alert evaluation succeeds and thresholds are crossed.
          </p>
          <BashCodeBlock
            title="Test alert delivery"
            code={`curl -X POST https://pgsentinel.example.com/api/v1/alerts/test \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"webhook_id":"slack-primary"}'`}
          />
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Confirm <code>PGSENTINEL_ALERT_INTERVAL</code> is set (default 30s).</li>
            <li>Inspect <code>pgsentinel.alert_events</code> for suppressed or muted alerts.</li>
            <li>Check webhook response codes in <code>docker compose logs pgsentinel</code>; retries stop after 5 failures.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Support Bundle</h2>
          <p className="text-muted-foreground">
            Attach a bundle when opening a support ticket to fast-track investigations.
          </p>
          <BashCodeBlock title="Collect bundle" code={supportBundle} />
          <p className="text-sm text-muted-foreground">
            Upload <code>pgsentinel-support.tar.gz</code> along with system information (Docker version, PostgreSQL version, pgBouncer config snippet).
          </p>
        </section>
      </div>
    </DocsContentLayout>
  )
}

export default PgSentinelTroubleshootingPage
