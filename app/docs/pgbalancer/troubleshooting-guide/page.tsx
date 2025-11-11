import GettingStartedLayout from '../../../../components/GettingStartedLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import { PgbalancerIcon } from '../../../../components/ProductIcons'

export const metadata = {
  title: 'pgBalancer Troubleshooting Guide',
  description: 'Diagnose connection errors, wait queues, failovers, and routing anomalies in pgBalancer deployments.',
}

const requirements = [
  'Confirm the pgBalancer service is running (`systemctl status pgbalancer` or `docker ps`)',
  'Validate the admin API: `curl http://pgbalancer:8081/api/v1/health` should respond with `{ "status": "ok" }`',
  'Capture `journalctl -u pgbalancer` output and recent Prometheus metrics when issues occur',
  'Document pool configuration (`pgbalancer admin pools stats --format table`) before applying changes',
]

export default function PgBalancerTroubleshootingGuidePage() {
  return (
    <GettingStartedLayout
      product="pgBalancer"
      hero={{
        label: 'pgBalancer',
        labelIcon: <PgbalancerIcon size={20} />, 
        labelAccent: 'cyan',
        title: 'Restore pgBalancer Health',
        description:
          'Use the cards below to resolve connectivity issues, saturated pools, failover drift, and alert noise. Each step includes the exact CLI or SQL needed to validate and fix the problem.',
        cta: {
          href: '/docs/pgbalancer/troubleshooting',
          label: 'Bookmark troubleshooting playbook',
        },
      }}
      theme={{
        pageBackground: 'bg-gradient-to-br from-slate-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-cyan-950',
        heroOverlay: 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 dark:from-cyan-500/10 dark:to-blue-500/10',
        requirementsBorder: 'cyan',
        requirementsBackground: 'bg-white/90 dark:bg-slate-900/70',
      }}
      requirements={{
        title: 'Fast triage checklist',
        items: requirements,
        note: 'Collect diagnostics in staging first when possible. Roll back temporary settings after the incident is resolved.',
      }}
      sections={[
        {
          title: 'Connection problems',
          description: 'Troubleshoot listeners, TLS, and authentication mappings that block client sessions.',
          cards: [
            {
              id: 'conn-diagnostics',
              title: 'Run connection diagnostics',
              accent: 'cyan',
              content: (
                <BashCodeBlock
                  title="Connection commands"
                  code={`ss -ltn | grep 6432
journalctl -u pgbalancer -n 100
psql "postgres://appuser:secret@pgbalancer:6432/appdb" -c 'SELECT 1;'`}
                />
              ),
            },
            {
              id: 'conn-remediation',
              title: 'Common fixes',
              accent: 'emerald',
              content: (
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Expose the listener on <code>0.0.0.0</code> (or the appropriate subnet) when running inside containers.</li>
                  <li>Align TLS expectations between clients and pgBalancer; disable <code>require_client_tls</code> temporarily during debugging.</li>
                  <li>Regenerate credentials with <code>pgbalancer admin users set</code> if authentication fails.</li>
                </ul>
              ),
            },
          ],
        },
        {
          title: 'Wait queues & saturation',
          description: 'Address exhausted pools and keep query latency predictable.',
          cards: [
            {
              id: 'pool-stats',
              title: 'Inspect pool utilisation',
              accent: 'blue',
              content: (
                <BashCodeBlock
                  title="Pool statistics"
                  code={`pgbalancer admin pools stats --format table
pgbalancer admin pools resize primary --max-clients 400 --max-servers 50`}
                />
              ),
            },
            {
              id: 'backend-util',
              title: 'Check backend database load',
              accent: 'indigo',
              content: (
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
              ),
            },
            {
              id: 'queue-remediation',
              title: 'Relief strategies',
              accent: 'amber',
              content: (
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Raise <code>max_servers</code> only if upstream PostgreSQL hosts can accept more backends.</li>
                  <li>Enable AI routing with <code>policy = adaptive</code> to spread hot shards automatically.</li>
                  <li>Throttle chatty tenants via <code>max_client_rate</code> or <code>max_query_rate</code> rules.</li>
                </ul>
              ),
            },
          ],
        },
        {
          title: 'Failover & node health',
          description: 'Ensure unhealthy replicas are demoted quickly and automation callbacks succeed.',
          cards: [
            {
              id: 'node-probes',
              title: 'Probe node status',
              accent: 'purple',
              content: (
                <BashCodeBlock
                  title="Node commands"
                  code={`pgbalancer admin nodes list
pgbalancer admin nodes check replica-2
pgbalancer admin nodes promote replica-3`}
                />
              ),
            },
            {
              id: 'health-tips',
              title: 'Health check guidance',
              accent: 'slate',
              content: (
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Set <code>health_check_query</code> per pool and keep <code>health_check_interval</code> low for timely demotions.</li>
                  <li>Quarantine nodes during maintenance with <code>pgbalancer admin nodes quarantine</code>.</li>
                  <li>Verify failover webhooks respond with <code>200</code>; pgBalancer retries five times before dropping an alert.</li>
                </ul>
              ),
            },
          ],
        },
        {
          title: 'Prometheus & alert tuning',
          description: 'Reduce alert noise by calibrating thresholds once baselines are known.',
          cards: [
            {
              id: 'alert-rules',
              title: 'Example alert rule',
              accent: 'rose',
              content: (
                <BashCodeBlock
                  title="Alertmanager rule"
                  code={`- alert: PgBalancerHighLatency
  expr: histogram_quantile(0.95, sum(rate(pgbalancer_query_duration_seconds_bucket[5m])) by (le,pool)) > 0.2
  for: 3m
  labels:
    severity: warning`}
                />
              ),
            },
            {
              id: 'alert-tips',
              title: 'Alerting tips',
              accent: 'emerald',
              content: (
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Scrape <code>/metrics</code> every 15 seconds for accurate percentiles.</li>
                  <li>Set <code>threshold_wait_queue</code> and <code>threshold_latency_ms</code> in configuration to match SLAs.</li>
                  <li>Correlate pgBalancer alerts with <code>pg_stat_activity</code> and infrastructure telemetry before paging engineers.</li>
                </ul>
              ),
            },
          ],
        },
      ]}
    />
  )
}
