import { Terminal, List, Info, Play, Settings, FileText } from 'lucide-react'
import DocsContentLayout from '../../../../components/DocsContentLayout'
import { PgbalancerIcon } from '../../../../components/ProductIcons'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata = {
  title: 'CLI Management (bctl) - pgBalancer',
  description: 'Use bctl command-line tool for pgBalancer cluster management and monitoring.'
}

export default function CLIManagementPage() {
  return (
    <DocsContentLayout
      hero={{
        badgeLabel: 'pgBalancer',
        badgeIcon: <PgbalancerIcon size={20} />, 
        badgeTone: 'cyan',
        title: 'CLI Management (bctl)',
        description: 'Use the bctl command-line tool for pgBalancer cluster management and monitoring.'
      }}
      contentWidth="wide"
    >
      <div className="space-y-12 text-slate-200">
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Terminal className="w-6 h-6 text-cyan-400" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Step 1: Install and Configure bctl</h2>
          </div>

          <p>bctl is the unified CLI tool that replaces multiple pcp_* commands:</p>

          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-cyan-300 mb-3">Install bctl</h3>
            <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# bctl is included with pgBalancer
# After installing pgbalancer, bctl is in /usr/local/bin

# Verify installation
which bctl
bctl --version

# Configuration file location
~/.config/pgbalancer/bctl.conf`}
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Info className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Step 2: Check Cluster Status</h2>
          </div>

          <p>View overall cluster status and health:</p>

          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-cyan-300 mb-3">Overall Status</h3>
            <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Show cluster status (table format - default)
bctl status

┌────────────────────────────┬───────────────────────────────────┐
│ Metric                     │ Value                             │
├────────────────────────────┼───────────────────────────────────┤
│ Version                    │ pgbalancer 5.0.0 (pgpool-II 4.5)  │
│ Uptime                     │ 5 days, 3 hours, 25 minutes       │
│ Total Backends             │ 3                                 │
│ Backends Up                │ 3                                 │
│ Backends Down              │ 0                                 │
│ Primary Node               │ 0 (db-primary.internal)           │
│ Load Balance Enabled       │ Yes                               │
│ Pool Mode                  │ transaction                       │
│ Total Processes            │ 32                                │
│ Active Connections         │ 45                                │
│ Idle Connections           │ 83                                │
│ Pool Utilization           │ 35.16%                            │
│ Queries Per Second         │ 85.3                              │
│ Avg Response Time          │ 11.8 ms                           │
│ Watchdog Enabled           │ Yes                               │
│ Watchdog State             │ MASTER                            │
│ Watchdog Quorum            │ Yes (3/3 nodes)                   │
└────────────────────────────┴───────────────────────────────────┘

# JSON format for scripting
bctl status --format json | jq

{
  "version": "pgbalancer 5.0.0",
  "uptime_seconds": 453900,
  "backends": {
    "total": 3,
    "up": 3,
    "down": 0,
    "primary": 0
  },
  "pool": {
    "mode": "transaction",
    "processes": 32,
    "active_connections": 45,
    "idle_connections": 83,
    "utilization": 35.16
  }
}`}
            </pre>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-cyan-300 mb-3">Health Check</h3>
            <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Quick health check
bctl health

✓ pgBalancer is healthy
✓ All backends are up (3/3)
✓ Primary node is healthy (node 0)
✓ Watchdog quorum achieved (3/3 nodes)
✓ Pool utilization: 35% (healthy)

# Exit code 0 = healthy, non-zero = unhealthy
# Useful in monitoring scripts

if bctl health --quiet; then
    echo "Cluster is healthy"
else
    echo "Cluster has issues!"
    bctl health --verbose
fi`}
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <List className="w-6 h-6 text-indigo-400" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Step 3: Node Management</h2>
          </div>

          <p>Manage backend nodes using bctl:</p>

          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-cyan-300 mb-3">List Nodes</h3>
            <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# List all backend nodes (table format)
bctl nodes list

┌─────────┬────────────────────────┬──────┬────────┬─────────┬────────────┬────────┬──────┬───────────────┐
│ Node ID │ Hostname               │ Port │ Status │ Role    │ Select Cnt │ Weight │ QPS  │ Repl Lag (MB) │
├─────────┼────────────────────────┼──────┼────────┼─────────┼────────────┼────────┼──────┼───────────────┤
│ 0       │ db-primary.internal    │ 5432 │ up     │ primary │ 1,523      │ 1      │ 15.2 │ 0             │
│ 1       │ db-replica1.internal   │ 5432 │ up     │ standby │ 4,501      │ 2      │ 45.8 │ 0             │
│ 2       │ db-replica2.internal   │ 5432 │ up     │ standby │ 4,389      │ 2      │ 44.1 │ 0             │
└─────────┴────────────────────────┴──────┴────────┴─────────┴────────────┴────────┴──────┴───────────────┘

# Compact format (default)
bctl nodes list --format default

Node 0: db-primary.internal:5432 [up] primary weight=1 select_cnt=1523 qps=15.2
Node 1: db-replica1.internal:5432 [up] standby weight=2 select_cnt=4501 qps=45.8
Node 2: db-replica2.internal:5432 [up] standby weight=2 select_cnt=4389 qps=44.1`}
            </pre>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-cyan-300 mb-3">Get Node Information</h3>
            <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Get detailed info about node 0
bctl nodes info 0

Node ID: 0
Hostname: db-primary.internal
Port: 5432
Status: up
Role: primary
Weight: 1

Connections:
  Active: 15
  Idle: 5
  Total: 20

Statistics:
  Total Queries: 15,234
  Queries Per Second: 25.4
  Avg Response Time: 12.5 ms
  Error Rate: 0.1%

Health:
  Last Check: 2025-11-06 12:30:00
  Consecutive Failures: 0
  Uptime: 5 days

Replication:
  State: streaming
  Lag: 0 bytes
  Sync State: async

# JSON format
bctl nodes info 0 --format json | jq '.stats'

{
  "queries_total": 15234,
  "queries_per_second": 25.4,
  "avg_response_time_ms": 12.5,
  "error_rate": 0.001
}`}
            </pre>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-cyan-300 mb-3">Node Operations</h3>
            <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Detach node for maintenance
bctl nodes detach 2

Detaching node 2 (db-replica2.internal)...
✓ Node 2 detached successfully
  Status: waiting (draining connections)

# Check status
bctl nodes list
# Node 2 shows status: waiting

# Attach node back
bctl nodes attach 2

Attaching node 2 (db-replica2.internal)...
✓ Node 2 attached successfully
  Status: up

# Promote standby to primary
bctl nodes promote 1 --force

Promoting node 1 (db-replica1.internal) to primary...
Detaching old primary (node 0)...
Updating cluster topology...
✓ Failover completed successfully
  New primary: node 1
  Old primary: node 0 (now standby)
  Duration: 2.3 seconds`}
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Play className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Step 4: Pool Management</h2>
          </div>

          <p>Monitor and manage connection pools:</p>

          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-cyan-300 mb-3">View Pool Processes</h3>
            <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# List all pool processes
bctl pool processes

┌──────────┬─────────────────────┬──────────┬──────────┬──────────────┬────────────┐
│ Pool PID │ Start Time          │ Database │ Username │ Backend Node │ Pool Count │
├──────────┼─────────────────────┼──────────┼──────────┼──────────────┼────────────┤
│ 12345    │ 2025-11-06 10:30:00 │ testdb   │ appuser  │ 0            │ 150        │
│ 12346    │ 2025-11-06 10:30:00 │ testdb   │ appuser  │ 1            │ 89         │
│ 12347    │ 2025-11-06 10:30:00 │ testdb   │ readonly │ 1            │ 45         │
│ 12348    │ 2025-11-06 10:30:01 │ analytics│ analyst  │ 2            │ 23         │
└──────────┴─────────────────────┴──────────┴──────────┴──────────────┴────────────┘

Total processes: 32
Active: 28
Idle: 4`}
            </pre>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-cyan-300 mb-3">Pool Statistics</h3>
            <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Get pool statistics
bctl pool stats

┌──────────────────────────┬─────────┐
│ Metric                   │ Value   │
├──────────────────────────┼─────────┤
│ Pool Mode                │ transaction │
│ Total Capacity           │ 128     │
│ Active Connections       │ 45      │
│ Idle Connections         │ 83      │
│ Utilization              │ 35.16%  │
│ Cache Hits               │ 15,420  │
│ Cache Misses             │ 89      │
│ Cache Hit Rate           │ 99.42%  │
│ Child Processes          │ 32      │
│ Max Pool per Child       │ 4       │
└──────────────────────────┴─────────┘`}
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Settings className="w-6 h-6 text-yellow-400" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Step 5: Watchdog Management</h2>
          </div>

          <p>Monitor watchdog status and coordination:</p>

          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-cyan-300 mb-3">Watchdog Status</h3>
            <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# View watchdog status
bctl watchdog status

┌───────────┬──────────────────────────┬──────┬────────┬──────────┐
│ Node ID   │ Hostname                 │ Port │ Status │ Is Master│
├───────────┼──────────────────────────┼──────┼────────┼──────────┤
│ 0         │ pgbalancer1.internal     │ 9000 │ up     │ YES      │
│ 1         │ pgbalancer2.internal     │ 9000 │ up     │ NO       │
│ 2         │ pgbalancer3.internal     │ 9000 │ up     │ NO       │
└───────────┴──────────────────────────┴──────┴────────┴──────────┘

Watchdog State: MASTER
Quorum: Yes (3/3 nodes alive)
Virtual IP: 192.168.1.100
VIP Active: Yes`}
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <FileText className="w-6 h-6 text-green-400" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Step 6: Configuration and Logs</h2>
          </div>

          <p>View configuration and logs:</p>

          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-cyan-300 mb-3">View Configuration</h3>
            <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Show current configuration
bctl config show

Configuration:
  listen_addresses: '*'
  port: 9999
  pool_mode: transaction
  num_init_children: 32
  max_pool: 4
  load_balance_mode: on
  health_check_period: 10
  sr_check_period: 10
  use_watchdog: on
  enable_rest_api: on
  rest_api_port: 8080

# Get specific parameter
bctl config get pool_mode
transaction

# Show all parameters (JSON)
bctl config show --format json | jq '.pool'

{
  "mode": "transaction",
  "num_init_children": 32,
  "max_pool": 4,
  "connection_life_time": 600
}`}
            </pre>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-cyan-300 mb-3">View Logs</h3>
            <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Tail pgBalancer logs
bctl logs --follow

2025-11-06 12:30:00 [INFO] health check succeeded for node 0
2025-11-06 12:30:00 [INFO] health check succeeded for node 1
2025-11-06 12:30:00 [INFO] health check succeeded for node 2
2025-11-06 12:30:05 [INFO] connection accepted from 192.168.1.50
2025-11-06 12:30:10 [INFO] health check succeeded for node 0

# Filter by level
bctl logs --level error --tail 50

# Search logs
bctl logs --grep "failover" --tail 100`}
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Command Reference</h2>
          
          <div className="bg-gray-800/50 rounded-lg p-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-2 text-cyan-400">Command</th>
                  <th className="text-left py-2 text-cyan-400">Description</th>
                  <th className="text-left py-2 text-cyan-400">Example</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-700">
                  <td className="py-2 font-mono text-green-400">status</td>
                  <td className="py-2">Show cluster status</td>
                  <td className="py-2 font-mono text-xs">bctl status</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 font-mono text-green-400">health</td>
                  <td className="py-2">Quick health check</td>
                  <td className="py-2 font-mono text-xs">bctl health</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 font-mono text-green-400">nodes list</td>
                  <td className="py-2">List all nodes</td>
                  <td className="py-2 font-mono text-xs">bctl nodes list</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 font-mono text-green-400">nodes info</td>
                  <td className="py-2">Get node details</td>
                  <td className="py-2 font-mono text-xs">bctl nodes info 0</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 font-mono text-green-400">nodes detach</td>
                  <td className="py-2">Detach node</td>
                  <td className="py-2 font-mono text-xs">bctl nodes detach 2</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 font-mono text-green-400">nodes attach</td>
                  <td className="py-2">Attach node</td>
                  <td className="py-2 font-mono text-xs">bctl nodes attach 2</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 font-mono text-green-400">nodes promote</td>
                  <td className="py-2">Promote to primary</td>
                  <td className="py-2 font-mono text-xs">bctl nodes promote 1</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 font-mono text-green-400">pool processes</td>
                  <td className="py-2">List pool processes</td>
                  <td className="py-2 font-mono text-xs">bctl pool processes</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 font-mono text-green-400">pool stats</td>
                  <td className="py-2">Pool statistics</td>
                  <td className="py-2 font-mono text-xs">bctl pool stats</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 font-mono text-green-400">watchdog status</td>
                  <td className="py-2">Watchdog status</td>
                  <td className="py-2 font-mono text-xs">bctl watchdog status</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 font-mono text-green-400">config show</td>
                  <td className="py-2">Show configuration</td>
                  <td className="py-2 font-mono text-xs">bctl config show</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono text-green-400">logs</td>
                  <td className="py-2">View logs</td>
                  <td className="py-2 font-mono text-xs">bctl logs --follow</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Automation Scripts</h2>

          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-cyan-300 mb-3">Health Check Script</h3>
            <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`#!/bin/bash
# Monitor cluster health

if ! bctl health --quiet; then
    echo "⚠️  Cluster unhealthy!"
    
    # Get node status
    bctl nodes list --format json | jq -r '.nodes[] | select(.status=="down") | "Node \\(.node_id) DOWN: \\(.hostname)"'
    
    # Send alert
    curl -X POST https://alerts.example.com/webhook \
      -d '{"text": "pgBalancer cluster has issues"}'
    
    exit 1
fi

echo "✓ Cluster healthy"
exit 0`}
            </pre>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-cyan-300 mb-3">Pool Utilization Alert</h3>
            <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`#!/bin/bash
# Alert on high pool utilization

UTILIZATION=$(bctl pool stats --format json | jq -r '.utilization_percent')

if (( \${UTILIZATION%.*} > 90 )); then
    echo "⚠️  High pool utilization: $UTILIZATION%"
    # Send alert
fi`}
            </pre>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Best Practices</h2>
          
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-400 mb-2">✓ DO</h3>
            <ul className="text-gray-300 space-y-2 mb-0">
              <li>• Use <code>--format json</code> for scripting and automation</li>
              <li>• Use <code>--format table</code> for human-readable output</li>
              <li>• Check exit codes in scripts (<code>bctl health --quiet</code>)</li>
              <li>• Use <code>--verbose</code> for troubleshooting</li>
              <li>• Set environment variables for default host/port</li>
            </ul>
          </div>

          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-red-400 mb-2">✗ DON'T</h3>
            <ul className="text-gray-300 space-y-2 mb-0">
              <li>• Don't parse table format output in scripts (use JSON)</li>
              <li>• Don't run <code>promote</code> without understanding impact</li>
              <li>• Don't detach nodes during peak traffic</li>
              <li>• Don't ignore error messages and exit codes</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Additional Resources</h2>
          <div className="bg-gray-800/50 rounded-lg p-6">
            <ul className="space-y-2 text-gray-300 mb-0">
              <li>
                • <a href="https://github.com/pgElephant/pgbalancer/tree/main/bctl" className="text-cyan-400 hover:text-cyan-300">
                  bctl GitHub Repository
                </a>
              </li>
              <li>
                • <a href="/docs/pgbalancer/rest-api" className="text-cyan-400 hover:text-cyan-300">
                  REST API Documentation
                </a>
              </li>
              <li>
                • <a href="/docs/pgbalancer/high-availability" className="text-cyan-400 hover:text-cyan-300">
                  High Availability Guide
                </a>
              </li>
              <li>
                • <a href="https://github.com/pgElephant/pgbalancer/tree/main/cluster/examples/basic-usage.sh" className="text-cyan-400 hover:text-cyan-300">
                  Example Usage Scripts
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </DocsContentLayout>
  );
}
