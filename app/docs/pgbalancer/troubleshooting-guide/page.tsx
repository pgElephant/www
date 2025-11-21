import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'pgBalancer Troubleshooting Guide',
  description: 'Diagnose connection errors, wait queues, failovers, and routing anomalies in pgBalancer deployments.',
}

const tableOfContents: TocItem[] = [
  { id: 'connection-problems', title: 'Connection Problems' },
  { id: 'wait-queues-saturation', title: 'Wait Queues & Saturation' },
  { id: 'failover-node-health', title: 'Failover & Node Health' },
  { id: 'prometheus-alert-tuning', title: 'Prometheus & Alert Tuning' },
]

const prevLink: NavLink = {
  href: '/docs/pgbalancer/monitoring',
  label: 'Monitoring & Metrics',
}

const nextLink: NavLink = {
  href: '/docs/pgbalancer/getting-started',
  label: 'Getting Started',
}

export default function PgBalancerTroubleshootingGuidePage() {
  return (
    <PostgresDocsLayout
      title="Restore pgBalancer Health"
      version="pgBalancer Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <p>
        Use the sections below to resolve connectivity issues, saturated pools, failover drift, and alert noise. Each step includes the exact CLI or SQL needed to validate and fix the problem.
      </p>

      <section id="connection-problems">
        <h2>Connection Problems</h2>
        <p>
          Troubleshoot listeners, TLS, and authentication mappings that block client sessions.
        </p>

        <BashCodeBlock
          title="Run connection diagnostics"
          code={`ss -ltn | grep 6432
journalctl -u pgbalancer -n 100
psql "postgres://appuser:secret@pgbalancer:6432/appdb" -c 'SELECT 1;'`}
        />

        <div className="mt-4">
          <h3>Common fixes</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Expose the listener on <code>0.0.0.0</code> (or the appropriate subnet) when running inside containers.</li>
            <li>Align TLS expectations between clients and pgBalancer; disable <code>require_client_tls</code> temporarily during debugging.</li>
            <li>Regenerate credentials with <code>pgbalancer admin users set</code> if authentication fails.</li>
          </ul>
        </div>
      </section>

      <section id="wait-queues-saturation">
        <h2>Wait Queues & Saturation</h2>
        <p>
          Address exhausted pools and keep query latency predictable.
        </p>

        <BashCodeBlock
          title="Inspect pool utilisation"
          code={`pgbalancer admin pools stats --format table
pgbalancer admin pools resize primary --max-clients 400 --max-servers 50`}
        />

        <SqlCodeBlock
          title="Check backend database load"
          code={`SELECT datname,
       numbackends,
       xact_commit,
       blks_read,
       blks_hit
  FROM pg_stat_database
 ORDER BY numbackends DESC;`}
        />

        <div className="mt-4">
          <h3>Relief strategies</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Raise <code>max_servers</code> only if upstream PostgreSQL hosts can accept more backends.</li>
            <li>Enable AI routing with <code>policy = adaptive</code> to spread hot shards automatically.</li>
            <li>Throttle chatty tenants via <code>max_client_rate</code> or <code>max_query_rate</code> rules.</li>
          </ul>
        </div>
      </section>

      <section id="failover-node-health">
        <h2>Failover & Node Health</h2>
        <p>
          Ensure unhealthy replicas are demoted quickly and automation callbacks succeed.
        </p>

        <BashCodeBlock
          title="Probe node status"
          code={`pgbalancer admin nodes list
pgbalancer admin nodes check replica-2
pgbalancer admin nodes promote replica-3`}
        />

        <div className="mt-4">
          <h3>Health check guidance</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Set <code>health_check_query</code> per pool and keep <code>health_check_interval</code> low for timely demotions.</li>
            <li>Quarantine nodes during maintenance with <code>pgbalancer admin nodes quarantine</code>.</li>
            <li>Verify failover webhooks respond with <code>200</code>; pgBalancer retries five times before dropping an alert.</li>
          </ul>
        </div>
      </section>

      <section id="prometheus-alert-tuning">
        <h2>Prometheus & Alert Tuning</h2>
        <p>
          Reduce alert noise by calibrating thresholds once baselines are known.
        </p>

        <BashCodeBlock
          title="Example alert rule"
          code={`- alert: PgBalancerHighLatency
  expr: histogram_quantile(0.95, sum(rate(pgbalancer_query_duration_seconds_bucket[5m])) by (le,pool)) > 0.2
  for: 3m
  labels:
    severity: warning`}
        />

        <div className="mt-4">
          <h3>Alerting tips</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Scrape <code>/metrics</code> every 15 seconds for accurate percentiles.</li>
            <li>Set <code>threshold_wait_queue</code> and <code>threshold_latency_ms</code> in configuration to match SLAs.</li>
            <li>Correlate pgBalancer alerts with <code>pg_stat_activity</code> and infrastructure telemetry before paging engineers.</li>
          </ul>
        </div>
      </section>
    </PostgresDocsLayout>
  )
}
