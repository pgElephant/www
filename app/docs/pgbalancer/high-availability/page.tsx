import { Shield, Heart, Zap, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react'
import DocsContentLayout from '../../../../components/DocsContentLayout'
import { PgbalancerIcon } from '../../../../components/ProductIcons'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata = {
  title: 'High Availability & Failover - pgBalancer',
  description: 'Configure watchdog, health checks, and automatic failover for PostgreSQL high availability.'
}

export default function HighAvailabilityPage() {
  return (
    <DocsContentLayout
      hero={{
        badgeLabel: 'pgBalancer',
        badgeIcon: <PgbalancerIcon size={20} />, 
        badgeTone: 'emerald',
        title: 'High Availability & Failover',
        description: 'Configure watchdog, health checks, and automatic failover for PostgreSQL high availability.'
      }}
      contentWidth="wide"
    >
      <div className="space-y-12 text-slate-200">
        {/* Step 1: Health Check Configuration */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <Heart className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Step 1: Configure Health Checks</h2>
          </div>

          <p>pgBalancer performs continuous health monitoring of backend PostgreSQL servers:</p>

          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-cyan-300 mb-3">pgbalancer.conf Health Check Settings</h3>
            <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto text-sm">
{`# Health Check Configuration
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
            </pre>
          </div>
        </section>

        {/* Step 2: Watchdog Failover */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Step 2: Configure Watchdog Failover</h2>
          </div>

          <p>Watchdog coordinates pgBalancer instances for cluster-wide failover:</p>

          <div className="bg-gray-800/50 rounded-lg p-6 space-y-4">
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
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 text-sm text-emerald-100">
              <strong>Tip:</strong> Set <code>wd_priority</code> higher on the node that should become the primary during normal operation.
            </div>
          </div>
        </section>

        {/* Step 3: Automatic Failover */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Zap className="w-6 h-6 text-cyan-300" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Step 3: Automatic Failover</h2>
          </div>

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
              <h3 className="text-lg font-semibold text-white mb-3">Failover script example</h3>
              <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto text-sm">
{`#!/bin/bash
NODE_ID=$1
/usr/bin/ssh postgres@db\${NODE_ID} "touch /tmp/promoted"
/usr/local/bin/pg_ctlcluster 16 main promote`}
              </pre>
            </div>
          </div>
        </section>

        {/* Step 4: Replication Lag & Heartbeats */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-500/20 rounded-lg">
              <RefreshCw className="w-6 h-6 text-sky-300" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Step 4: Replication Lag Monitoring</h2>
          </div>

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

        {/* Step 5: Chaos Testing */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <AlertCircle className="w-6 h-6 text-amber-300" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Step 5: Chaos Testing & Validation</h2>
          </div>

          <p>Verify failover behavior with automated chaos testing:</p>

          <BashCodeBlock
            title="Simulate failure"
            code={`# Simulate primary outage
sudo systemctl stop postgresql@16-main

# Observe failover logs
journalctl -u pgbalancer -f`}
          />
        </section>

        {/* Checklist */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-emerald-300" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Operational checklist</h2>
          </div>

          <ul className="space-y-2 text-sm text-slate-200">
            <li>• Confirm health check users exist on every backend</li>
            <li>• Validate virtual IP failover works across nodes</li>
            <li>• Monitor watchdog logs for quorum changes</li>
            <li>• Document manual failover procedure for on-call teams</li>
            <li>• Rehearse failback after maintenance</li>
          </ul>
        </section>
      </div>
    </DocsContentLayout>
  )
}
