import DocsContentLayout from '../../../../components/DocsContentLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import { PgbalancerIcon } from '../../../../components/ProductIcons'

export const metadata = {
  title: 'pgBalancer Troubleshooting Guide',
  description: 'Diagnose connection errors, wait queues, failovers, and routing anomalies in pgBalancer deployments.',
}

export default function PgBalancerTroubleshootingGuidePage() {
  return (
    <DocsContentLayout
      hero={{
        badgeLabel: 'pgBalancer',
        badgeIcon: <PgbalancerIcon size={20} />, 
        badgeTone: 'cyan',
        title: 'pgBalancer Troubleshooting',
        description:
          'Use these diagnostics and remediation steps to restore healthy routing, pool capacity, and failover automation for pgBalancer clusters.',
      }}
      contentWidth="wide"
    >
      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Quick Checks</h2>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li><strong>Service status:</strong> <code>systemctl status pgbalancer</code> (or <code>docker ps</code>) should show the proxy running.</li>
            <li><strong>Admin API:</strong> <code>curl http://pgbalancer:8081/api/v1/health</code> returns <code>{'{"status":"ok"}'}</code>.</li>
            <li><strong>Pool metrics:</strong> <code>curl http://pgbalancer:8081/api/v1/pools</code> lists pools with <code>connected</code> status.</li>
            <li><strong>Prometheus scrape:</strong> <code>curl http://pgbalancer:9100/metrics</code> exposes metric families when monitoring is enabled.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Connection Errors</h2>
          <p className="text-muted-foreground">
            Most connection failures stem from listener configuration, TLS negotiation, or authentication mapping.
          </p>
          <BashCodeBlock
            title="Connection diagnostics"
            code={`ss -ltn | grep 6432
journalctl -u pgbalancer -n 100
psql "postgres://appuser:secret@pgbalancer:6432/appdb" -c 'SELECT 1;'`}
          />
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Ensure <code>listen_addr</code> includes the IP clients use (e.g. <code>0.0.0.0</code> for container environments).</li>
            <li>Match TLS modes between clients and pgBalancer; set <code>require_client_tls = false</code> temporarily when debugging.</li>
            <li>Validate user/password mappings in <code>pgbalancer.conf</code> or sync credentials via <code>pgbalancer admin users set</code>.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Queue Backlog &amp; Saturation</h2>
          <p className="text-muted-foreground">
            Large wait queues indicate exhausted server slots. Scale capacity or redistribute workloads to keep latency predictable.
          </p>
          <BashCodeBlock
            title="Pool saturation"
            code={`pgbalancer admin pools stats --format table
pgbalancer admin pools resize primary --max-clients 400 --max-servers 50`}
          />
          <SqlCodeBlock
            title="Backend utilisation"
            code={`SELECT datname,
       numbackends,
       xact_commit,
       blks_read,
       blks_hit
  FROM pg_stat_database
 ORDER BY numbackends DESC;`}
          />
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Increase <code>max_servers</code> only if upstream PostgreSQL can handle additional connections.</li>
            <li>Enable adaptive AI routing (<code>policy = adaptive</code>) to move hot traffic automatically.</li>
            <li>Throttle chatty tenants with <code>max_client_rate</code> or <code>max_query_rate</code> limits.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Failover &amp; Node Health</h2>
          <p className="text-muted-foreground">
            Verify health checks and automation callbacks demote unhealthy replicas before they impact clients.
          </p>
          <BashCodeBlock
            title="Node probes"
            code={`pgbalancer admin nodes list
pgbalancer admin nodes check replica-2
pgbalancer admin nodes promote replica-3`}
          />
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Set <code>health_check_query</code> per pool and keep <code>health_check_interval</code> low enough for timely demotion.</li>
            <li>Confirm failover webhooks return <code>200</code>; pgBalancer retries five times before dropping an alert.</li>
            <li>Use <code>pgbalancer admin nodes quarantine</code> for replicas undergoing maintenance.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Prometheus Alerts &amp; Noise</h2>
          <p className="text-muted-foreground">
            Tune alert thresholds once baseline traffic patterns are known to avoid noisy pages.
          </p>
          <BashCodeBlock
            title="Sample alert rules"
            code={`- alert: PgBalancerHighLatency
  expr: histogram_quantile(0.95, sum(rate(pgbalancer_query_duration_seconds_bucket[5m])) by (le,pool)) > 0.2
  for: 3m
  labels:
    severity: warning`}
          />
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Scrape <code>/metrics</code> at least every 15s and keep retention long enough for SLO audits.</li>
            <li>Adjust <code>threshold_wait_queue</code> / <code>threshold_latency_ms</code> in config to align with your SLAs.</li>
            <li>Correlate pgBalancer alerts with PostgreSQL <code>pg_stat_activity</code> and infrastructure metrics before paging the team.</li>
          </ul>
        </section>
      </div>
    </DocsContentLayout>
  )
}
