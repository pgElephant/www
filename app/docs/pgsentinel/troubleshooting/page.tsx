import { Metadata } from 'next'
import GettingStartedLayout from '../../../../components/GettingStartedLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import { PgSentinelIcon } from '../../../../components/ProductIcons'

export const metadata: Metadata = {
  title: 'pgSentinel Troubleshooting | Common Issues & Fixes',
  description:
    'Diagnose pgSentinel startup failures, pgBouncer connectivity issues, missing metrics, and webhook delivery errors using the guided fixes below.',
}

const requirements = [
  'Ensure pgSentinel containers are running (`docker compose ps` or `kubectl get pods`)',
  'Confirm the admin API responds: `curl http://pgsentinel:8080/api/v1/health` should return `{ "status": "healthy" }`',
  'Verify pgBouncer admin credentials with `psql "postgres://admin:secret@pgbouncer:6432/pgbouncer" -c "SHOW STATS"`',
  'Check that Prometheus can scrape `/metrics` when `PGSENTINEL_PROMETHEUS_EXPORT` is `true`',
]

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
    <GettingStartedLayout
      product="pgSentinel"
      hero={{
        label: 'pgSentinel',
        labelIcon: <PgSentinelIcon size={20} />, 
        labelAccent: 'emerald',
        title: 'Restore pgSentinel Monitoring',
        description:
          'Follow these actionable diagnostics to fix container startup issues, pgBouncer connectivity, missing metrics, and alert delivery in pgSentinel.',
        cta: {
          href: '/docs/pgsentinel/troubleshooting',
          label: 'Bookmark troubleshooting playbook',
        },
      }}
      theme={{
        pageBackground: 'bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-950',
        heroOverlay: 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 dark:from-emerald-500/10 dark:to-teal-500/10',
        requirementsBorder: 'emerald',
        requirementsBackground: 'bg-white/90 dark:bg-slate-900/70',
      }}
      requirements={{
        title: 'Fast triage checklist',
        items: requirements,
        note: 'Collect diagnostics in staging before applying production fixes whenever possible. Roll back temporary settings after validation.',
      }}
      sections={[
        {
          title: 'Containers fail to start',
          description: 'Most startup errors trace back to missing DSNs or conflicting ports.',
          cards: [
            {
              id: 'container-diag',
              title: 'Gather diagnostics',
              accent: 'emerald',
              content: (
                <BashCodeBlock
                  title="Startup checks"
                  code={`docker compose ps
docker compose logs pgsentinel | tail -n 50
lsof -i :8080`}
                />
              ),
            },
            {
              id: 'container-remediation',
              title: 'Common fixes',
              accent: 'slate',
              content: (
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Verify <code>PGSENTINEL_PGBOUNCER_DSN</code> and <code>PGSENTINEL_STORAGE_DSN</code> point to reachable services.</li>
                  <li>Ensure secrets mounted via Docker/Kubernetes have correct permissions.</li>
                  <li>Free port 8080 (or remap) if a reverse proxy is already listening.</li>
                </ul>
              ),
            },
          ],
        },
        {
          title: 'Missing metrics or empty dashboards',
          description: 'Confirm polling succeeds and retention is configured correctly.',
          cards: [
            {
              id: 'metrics-samples',
              title: 'Check last sample age',
              accent: 'blue',
              content: (
                <SqlCodeBlock
                  title="Sample recency"
                  code={`SELECT now() - max(observed_at) AS last_sample_age
  FROM pgsentinel.samples;`}
                />
              ),
            },
            {
              id: 'metrics-remediation',
              title: 'Remediation tips',
              accent: 'emerald',
              content: (
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Confirm pgBouncer admin credentials and IP allowlists.</li>
                  <li>Increase <code>max_client_conn</code> on pgBouncer if the admin console rejects pgSentinel.</li>
                  <li>Set <code>PGSENTINEL_METRICS_RETENTION_DAYS</code> to a positive value (default 30 days).</li>
                </ul>
              ),
            },
          ],
        },
        {
          title: 'Alerts not firing',
          description: 'Webhooks only trigger when alert evaluation runs successfully and thresholds are crossed.',
          cards: [
            {
              id: 'alert-test',
              title: 'Send test notification',
              accent: 'purple',
              content: (
                <BashCodeBlock
                  title="Test webhook"
                  code={`curl -X POST https://pgsentinel.example.com/api/v1/alerts/test \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"webhook_id":"slack-primary"}'`}
                />
              ),
            },
            {
              id: 'alert-remediation',
              title: 'Alert checklist',
              accent: 'slate',
              content: (
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Set <code>PGSENTINEL_ALERT_INTERVAL</code> (default 30s) to enable evaluations.</li>
                  <li>Review <code>pgsentinel.alert_events</code> for muted or suppressed alerts.</li>
                  <li>Inspect webhook responses in <code>docker compose logs pgsentinel</code>; pgSentinel stops retrying after five failures.</li>
                </ul>
              ),
            },
          ],
        },
        {
          title: 'Support bundle',
          description: 'Collect logs and metrics snapshots before opening a support ticket.',
          cards: [
            {
              id: 'support',
              title: 'Generate support bundle',
              accent: 'rose',
              content: <BashCodeBlock title="Support script" code={supportBundle} />,
            },
            {
              id: 'support-note',
              title: 'Share with pgElephant support',
              accent: 'emerald',
              content: (
                <p className="text-sm text-muted-foreground">
                  Upload <code>pgsentinel-support.tar.gz</code> together with Docker version, PostgreSQL version, and relevant pgBouncer configuration snippets.
                </p>
              ),
            },
          ],
        },
      ]}
    />
  )
}
