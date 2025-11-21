import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'High Availability & Failover - pgBalancer',
  description: 'Configure watchdog, health checks, and automatic failover for PostgreSQL high availability.',
}

const tableOfContents: TocItem[] = [
  { id: 'health-checks', title: 'Configure Health Checks' },
  { id: 'watchdog-failover', title: 'Configure Watchdog Failover' },
  { id: 'automatic-failover', title: 'Automatic Failover' },
  { id: 'replication-lag', title: 'Replication Lag Monitoring' },
  { id: 'chaos-testing', title: 'Chaos Testing & Validation' },
  { id: 'operational-checklist', title: 'Operational Checklist' },
]

const prevLink: NavLink = {
  href: '/docs/pgbalancer/cli-management',
  label: 'CLI Management (bctl)',
}

const nextLink: NavLink = {
  href: '/docs/pgbalancer/metrics',
  label: 'Metrics & Monitoring',
}

export default function HighAvailabilityPage() {
  return (
    <PostgresDocsLayout
      title="High Availability & Failover"
      version="pgBalancer Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="health-checks">
        <h2>Configure Health Checks</h2>
        <p>pgBalancer performs continuous health monitoring of backend PostgreSQL servers:</p>

        <BashCodeBlock
          title="pgbalancer.conf Health Check Settings"
          code={`# Health Check Configuration
health_check_period = 5             # Run every 5 seconds
health_check_timeout = 3            # Timeout per check
health_check_user = 'pgbalancer'
health_check_password = 'HealthPass123'
health_check_database = 'postgres'

# Connection retry policy
connect_timeout = 3
connect_retries = 5
retry_interval = 2

# Health check query
health_check_query = 'SELECT 1'

# Enable TCP keepalives
backend_tcp_keepalive = on`}
        />
      </section>

      <section id="watchdog-failover">
        <h2>Configure Watchdog Failover</h2>
        <p>Watchdog coordinates pgBalancer instances for cluster-wide failover:</p>

        <BashCodeBlock
          title="Watchdog settings"
          code={`# Watchdog configuration
watchdog_enabled = on
watchdog_port = 9996
watchdog_monitoring_user = 'pgbalancer_watchdog'
watchdog_monitoring_password = 'WatchdogPass!'

# Node configuration
wd_hostname = 'balancer-01'
wd_port = 9000
wd_priority = 100
wd_authkey = 'supersecret'

# Partner nodes
other_wd_nodes = 'balancer-02:9000,balancer-03:9000'
quorum = 2

# Virtual IP management
delegate_ip = '10.0.0.50'
delegate_ip_interface = 'eth0'`}
        />
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 text-sm mt-4">
          <strong>Tip:</strong> Set <code>wd_priority</code> higher on the node that should become the primary during normal operation.
        </div>
      </section>

      <section id="automatic-failover">
        <h2>Automatic Failover</h2>
        <p>Customize automatic failover thresholds and promotion strategy:</p>

        <div className="grid gap-4 md:grid-cols-2">
          <BashCodeBlock
            title="Failover policy"
            code={`# Automatic failover
failover_on_backend_error = on
failover_timeout = 10
failover_wait_time = 5
failover_when_quorum_lost = off

# Promotion script
failover_command = '/usr/local/bin/pgbalancer-promote.sh %d'

# Fallback script for demoted primary
failback_command = '/usr/local/bin/pgbalancer-failback.sh %d'`}
          />
          <div className="bg-slate-900/60 rounded-lg p-6">
            <h3>Failover script example</h3>
            <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto text-sm">
{`#!/bin/bash
NODE_ID=$1
/usr/bin/ssh postgres@db\${NODE_ID} "touch /tmp/promoted"
/usr/local/bin/pg_ctlcluster 16 main promote`}
            </pre>
          </div>
        </div>
      </section>

      <section id="replication-lag">
        <h2>Replication Lag Monitoring</h2>
        <p>Monitor downstream replication lag to avoid cascading failures:</p>

        <SqlCodeBlock
          title="Lag monitoring query"
          code={`SELECT
  backend_hostname,
  state,
  sent_lsn::text,
  write_lsn::text,
  flush_lsn::text,
  replay_lag
FROM pgbalancer_replication_lag
ORDER BY replay_lag DESC;`}
        />
      </section>

      <section id="chaos-testing">
        <h2>Chaos Testing & Validation</h2>
        <p>Verify failover behavior with automated chaos testing:</p>

        <BashCodeBlock
          title="Simulate failure"
          code={`# Simulate primary outage
sudo systemctl stop postgresql@16-main

# Observe failover logs
journalctl -u pgbalancer -f`}
        />
      </section>

      <section id="operational-checklist">
        <h2>Operational Checklist</h2>
        <ul className="space-y-2">
          <li>• Confirm health check users exist on every backend</li>
          <li>• Validate virtual IP failover works across nodes</li>
          <li>• Monitor watchdog logs for quorum changes</li>
          <li>• Document manual failover procedure for on-call teams</li>
          <li>• Rehearse failback after maintenance</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
