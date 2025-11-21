import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'CLI Management (bctl) - pgBalancer',
  description: 'Use bctl command-line tool for pgBalancer cluster management and monitoring.',
}

const tableOfContents: TocItem[] = [
  { id: 'install-configure', title: 'Install and Configure bctl' },
  { id: 'cluster-status', title: 'Check Cluster Status' },
  { id: 'node-management', title: 'Node Management' },
  { id: 'pool-management', title: 'Pool Management' },
  { id: 'watchdog-management', title: 'Watchdog Management' },
  { id: 'configuration-logs', title: 'Configuration and Logs' },
  { id: 'command-reference', title: 'Command Reference' },
  { id: 'automation-scripts', title: 'Automation Scripts' },
  { id: 'best-practices', title: 'Best Practices' },
]

const prevLink: NavLink = {
  href: '/docs/pgbalancer/rest-api',
  label: 'REST API Usage',
}

const nextLink: NavLink = {
  href: '/docs/pgbalancer/high-availability',
  label: 'High Availability & Failover',
}

export default function CLIManagementPage() {
  return (
    <PostgresDocsLayout
      title="CLI Management (bctl)"
      version="pgBalancer Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="install-configure">
        <h2>Install and Configure bctl</h2>
        <p>bctl is the unified CLI tool that replaces multiple pcp_* commands:</p>

        <BashCodeBlock
          title="Install bctl"
          code={`# bctl is included with pgBalancer
# After installing pgbalancer, bctl is in /usr/local/bin

# Verify installation
which bctl
bctl --version

# Configuration file location
~/.config/pgbalancer/bctl.conf`}
        />
      </section>

      <section id="cluster-status">
        <h2>Check Cluster Status</h2>
        <p>View overall cluster status and health:</p>

        <BashCodeBlock
          title="Overall Status"
          code={`# Show cluster status (table format - default)
bctl status

# JSON format for scripting
bctl status --format json | jq`}
        />

        <BashCodeBlock
          title="Health Check"
          code={`# Quick health check
bctl health

# Exit code 0 = healthy, non-zero = unhealthy
# Useful in monitoring scripts

if bctl health --quiet; then
    echo "Cluster is healthy"
else
    echo "Cluster has issues!"
    bctl health --verbose
fi`}
        />
      </section>

      <section id="node-management">
        <h2>Node Management</h2>
        <p>Manage backend nodes using bctl:</p>

        <BashCodeBlock
          title="List Nodes"
          code={`# List all backend nodes (table format)
bctl nodes list

# Get detailed info about node 0
bctl nodes info 0`}
        />

        <BashCodeBlock
          title="Node Operations"
          code={`# Detach node for maintenance
bctl nodes detach 2

# Attach node back
bctl nodes attach 2

# Promote standby to primary
bctl nodes promote 1 --force`}
        />
      </section>

      <section id="pool-management">
        <h2>Pool Management</h2>
        <p>Monitor and manage connection pools:</p>

        <BashCodeBlock
          title="View Pool Processes"
          code={`# List all pool processes
bctl pool processes`}
        />

        <BashCodeBlock
          title="Pool Statistics"
          code={`# Get pool statistics
bctl pool stats`}
        />
      </section>

      <section id="watchdog-management">
        <h2>Watchdog Management</h2>
        <p>Monitor watchdog status and coordination:</p>

        <BashCodeBlock
          title="Watchdog Status"
          code={`# View watchdog status
bctl watchdog status`}
        />
      </section>

      <section id="configuration-logs">
        <h2>Configuration and Logs</h2>
        <p>View configuration and logs:</p>

        <BashCodeBlock
          title="View Configuration"
          code={`# Show current configuration
bctl config show

# Get specific parameter
bctl config get pool_mode`}
        />

        <BashCodeBlock
          title="View Logs"
          code={`# Tail pgBalancer logs
bctl logs --follow

# Filter by level
bctl logs --level error --tail 50

# Search logs
bctl logs --grep "failover" --tail 100`}
        />
      </section>

      <section id="command-reference">
        <h2>Command Reference</h2>
        <div className="bg-gray-800/50 rounded-lg p-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-2">Command</th>
                <th className="text-left py-2">Description</th>
                <th className="text-left py-2">Example</th>
              </tr>
            </thead>
            <tbody>
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

      <section id="automation-scripts">
        <h2>Automation Scripts</h2>

        <BashCodeBlock
          title="Health Check Script"
          code={`#!/bin/bash
# Monitor cluster health

if ! bctl health --quiet; then
    echo "⚠️  Cluster unhealthy!"
    
    # Get node status
    bctl nodes list --format json | jq -r '.nodes[] | select(.status=="down") | "Node \\(.node_id) DOWN: \\(.hostname)"'
    
    # Send alert
    curl -X POST https://alerts.example.com/webhook \\
      -d '{"text": "pgBalancer cluster has issues"}'
    
    exit 1
fi

echo "✓ Cluster healthy"
exit 0`}
        />

        <BashCodeBlock
          title="Pool Utilization Alert"
          code={`#!/bin/bash
# Alert on high pool utilization

UTILIZATION=$(bctl pool stats --format json | jq -r '.utilization_percent')

if (( \${UTILIZATION%.*} > 90 )); then
    echo "⚠️  High pool utilization: $UTILIZATION%"
    # Send alert
fi`}
        />
      </section>

      <section id="best-practices">
        <h2>Best Practices</h2>
        
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mb-4">
          <h3>✓ DO</h3>
          <ul className="space-y-2">
            <li>• Use <code>--format json</code> for scripting and automation</li>
            <li>• Use <code>--format table</code> for human-readable output</li>
            <li>• Check exit codes in scripts (<code>bctl health --quiet</code>)</li>
            <li>• Use <code>--verbose</code> for troubleshooting</li>
            <li>• Set environment variables for default host/port</li>
          </ul>
        </div>

        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
          <h3>✗ DON'T</h3>
          <ul className="space-y-2">
            <li>• Don't parse table format output in scripts (use JSON)</li>
            <li>• Don't run <code>promote</code> without understanding impact</li>
            <li>• Don't detach nodes during peak traffic</li>
            <li>• Don't ignore error messages and exit codes</li>
          </ul>
        </div>
      </section>
    </PostgresDocsLayout>
  )
}
