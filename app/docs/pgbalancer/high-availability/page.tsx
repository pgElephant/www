import React from 'react';
import { Shield, Heart, Zap, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'High Availability & Failover - pgBalancer',
  description: 'Configure watchdog, health checks, and automatic failover for PostgreSQL high availability.'
};

export default function HighAvailabilityPage() {
  return (
    <div className="prose dark:prose-invert max-w-4xl mx-auto py-12 px-6">
      {/* Header */}
      <div className="not-prose mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent mb-4">
          High Availability & Failover
        </h1>
        <p className="text-xl text-gray-300">
          Configure watchdog, health checks, and automatic failover for PostgreSQL high availability
        </p>
      </div>

      {/* Step 1: Health Check Configuration */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-500/20 rounded-lg">
            <Heart className="w-6 h-6 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 1: Configure Health Checks</h2>
        </div>

        <p className="text-gray-300 mb-4">
          pgBalancer performs continuous health monitoring of backend PostgreSQL servers:
        </p>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">pgbalancer.conf Health Check Settings</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Health Check Configuration
health_check_period = 10             # Health check interval (seconds)
health_check_timeout = 20            # Health check timeout (seconds)
health_check_user = 'pgbalancer'     # User for health checks
health_check_password = 'secret'     # Password for health checks
health_check_database = 'postgres'   # Database to connect for checks
health_check_max_retries = 3         # Retries before marking down
health_check_retry_delay = 1         # Delay between retries (seconds)

# Connect timeout for health checks
connect_timeout = 10000              # Connection timeout (ms)

# SR (Streaming Replication) Check
sr_check_period = 10                 # Replication check interval (seconds)
sr_check_user = 'replicator'         # Replication monitoring user
sr_check_password = 'replpass'       # Replication password
sr_check_database = 'postgres'       # Database for replication checks

# Failover settings
failover_on_backend_error = off      # Auto failover on backend error
failover_command = ''                # Script to run on failover
fail_over_on_backend_shutdown = on   # Failover when backend shuts down
detach_false_primary = off           # Detach split-brain primary

# Backend health monitoring
backend_flag0 = 'ALLOW_TO_FAILOVER'  # Primary can trigger failover
backend_flag1 = 'ALLOW_TO_FAILOVER'  # Standby 1 participates in failover
backend_flag2 = 'ALLOW_TO_FAILOVER'  # Standby 2 participates in failover`}
          </pre>
        </div>

        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-4">
          <p className="text-sm text-blue-200 m-0">
            <strong>💡 Tip:</strong> Health checks run every <code>health_check_period</code> seconds. 
            If 3 consecutive checks fail, the backend is marked as <code>down</code> and removed from the pool.
          </p>
        </div>
      </section>

      {/* Step 2: Monitor Backend Health */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <Shield className="w-6 h-6 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 2: Monitor Backend Health Status</h2>
        </div>

        <p className="text-gray-300 mb-4">
          Track backend health and detect failures in real-time:
        </p>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Check Backend Status via SQL</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`-- Connect to pgBalancer
psql -h localhost -p 9999 -U postgres

-- View backend node status
SHOW POOL_NODES;

-- Output:
-- node_id | hostname              | port | status | role    | select_cnt | load_balance_node | replication_delay | replication_state | replication_sync_state | last_status_change
-- --------+-----------------------+------+--------+---------+------------+-------------------+-------------------+-------------------+------------------------+--------------------
-- 0       | db-primary.internal   | 5432 | up     | primary | 1523       | false             | 0                 | streaming         | async                  | 2025-11-06 10:00:00
-- 1       | db-replica1.internal  | 5432 | up     | standby | 4501       | true              | 0                 | streaming         | async                  | 2025-11-06 10:00:00
-- 2       | db-replica2.internal  | 5432 | down   | standby | 0          | false             | 0                 | -                 | -                      | 2025-11-06 11:30:15

-- Status meanings:
-- up     = Backend is healthy and accepting connections
-- down   = Backend failed health checks and is excluded
-- waiting = Backend is being drained (weight = 0)
-- quarantine = Backend marked for investigation`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Health Check History via REST API</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Get backend health status
curl -s http://localhost:8080/api/v1/nodes | jq

{
  "nodes": [
    {
      "node_id": 0,
      "hostname": "db-primary.internal",
      "status": "up",
      "role": "primary",
      "last_health_check": "2025-11-06T11:35:00Z",
      "health_check_failures": 0,
      "uptime_seconds": 432000
    },
    {
      "node_id": 2,
      "hostname": "db-replica2.internal",
      "status": "down",
      "role": "standby",
      "last_health_check": "2025-11-06T11:30:15Z",
      "health_check_failures": 3,
      "downtime_seconds": 285,
      "last_error": "connection refused"
    }
  ]
}`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Prometheus Health Metrics</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Query health check metrics
curl -s http://localhost:8080/metrics | grep health_check

pgbalancer_backend_up{node_id="0"} 1           # Primary is up
pgbalancer_backend_up{node_id="1"} 1           # Replica1 is up
pgbalancer_backend_up{node_id="2"} 0           # Replica2 is down ⚠️

pgbalancer_health_check_total{node_id="0",result="success"} 25920
pgbalancer_health_check_total{node_id="2",result="failure"} 3

pgbalancer_health_check_duration_seconds{node_id="0"} 0.005  # 5ms check time
pgbalancer_health_check_duration_seconds{node_id="1"} 0.007  # 7ms check time

# Alert on consecutive failures
pgbalancer_health_check_failures_total{node_id="2"} 3  # Threshold reached!`}
          </pre>
        </div>
      </section>

      {/* Step 3: Watchdog Configuration */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-teal-500/20 rounded-lg">
            <Zap className="w-6 h-6 text-teal-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 3: Configure Watchdog (Optional)</h2>
        </div>

        <p className="text-gray-300 mb-4">
          Watchdog provides distributed consensus for automatic failover coordination:
        </p>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Watchdog Configuration</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Enable Watchdog
use_watchdog = on                        # Enable watchdog coordination
wd_hostname = 'pgbalancer1.internal'     # This pgbalancer node hostname
wd_port = 9000                           # Watchdog communication port
wd_authkey = 'shared-secret-key'         # Shared authentication key

# Watchdog heartbeat
wd_interval = 10                         # Heartbeat interval (seconds)
wd_life_point = 3                        # Missed heartbeats before failure
wd_heartbeat_port = 9694                 # UDP port for heartbeats
wd_heartbeat_keepalive = 2               # Keepalive interval

# Virtual IP (VIP) for automatic failover
delegate_IP = '192.168.1.100'            # Virtual IP address
if_cmd_path = '/sbin'                    # Path to ip/ifconfig command
if_up_cmd = 'ip addr add $_IP_$/24 dev eth0 label eth0:0'
if_down_cmd = 'ip addr del $_IP_$/24 dev eth0'
arping_path = '/usr/sbin/arping'
arping_cmd = 'arping -U $_IP_$ -w 1 -I eth0'

# Watchdog nodes (other pgbalancer instances)
other_pgbalancer_hostname0 = 'pgbalancer2.internal'
other_pgbalancer_port0 = 9999
other_wd_port0 = 9000

other_pgbalancer_hostname1 = 'pgbalancer3.internal'
other_pgbalancer_port1 = 9999
other_wd_port1 = 9000`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Monitor Watchdog Status</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Check watchdog status via SQL
SHOW POOL_WATCHDOG_NODES;

-- Output:
-- wd_node_id | hostname                  | port | status | master | priority
-- -----------+---------------------------+------+--------+--------+---------
-- 0          | pgbalancer1.internal      | 9000 | up     | YES    | 1
-- 1          | pgbalancer2.internal      | 9000 | up     | NO     | 1
-- 2          | pgbalancer3.internal      | 9000 | up     | NO     | 1

-- master = YES indicates this node holds the VIP

# Via REST API
curl -s http://localhost:8080/api/v1/watchdog | jq

{
  "enabled": true,
  "state": "MASTER",
  "quorum": true,
  "nodes": [
    {"hostname": "pgbalancer1.internal", "status": "up", "is_master": true},
    {"hostname": "pgbalancer2.internal", "status": "up", "is_master": false},
    {"hostname": "pgbalancer3.internal", "status": "up", "is_master": false}
  ],
  "virtual_ip": "192.168.1.100",
  "vip_active": true
}

# Prometheus watchdog metrics
curl -s http://localhost:8080/metrics | grep watchdog

pgbalancer_watchdog_state 4                    # 4 = MASTER state
pgbalancer_watchdog_quorum 1                   # Quorum achieved
pgbalancer_watchdog_alive_nodes 3              # All 3 nodes alive
pgbalancer_watchdog_total_nodes 3`}
          </pre>
        </div>
      </section>

      {/* Step 4: Test Failover */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-yellow-500/20 rounded-lg">
            <RefreshCw className="w-6 h-6 text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 4: Test Automatic Failover</h2>
        </div>

        <p className="text-gray-300 mb-4">
          Simulate failures and verify automatic failover behavior:
        </p>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Test 1: Primary Database Failure</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# On primary PostgreSQL server (db-primary.internal)
# Simulate failure by stopping PostgreSQL
sudo systemctl stop postgresql

# Monitor pgBalancer response
# Within 10 seconds (health_check_period), pgBalancer detects failure:

# pgbalancer.log shows:
# [2025-11-06 11:30:15] ERROR: health check failed for node 0 (db-primary.internal:5432)
# [2025-11-06 11:30:25] ERROR: health check failed for node 0 (retry 2/3)
# [2025-11-06 11:30:35] ERROR: health check failed for node 0 (retry 3/3)
# [2025-11-06 11:30:35] FATAL: backend 0 is down, marking as quarantine
# [2025-11-06 11:30:36] INFO: promoting standby node 1 to primary
# [2025-11-06 11:30:37] INFO: failover completed, node 1 is new primary

# Check new topology
psql -h localhost -p 9999 -U postgres -c "SHOW POOL_NODES;"

-- node_id | status | role    | last_status_change
-- --------+--------+---------+--------------------
-- 0       | down   | standby | 2025-11-06 11:30:35  ← Old primary DOWN
-- 1       | up     | primary | 2025-11-06 11:30:37  ← Promoted to PRIMARY ✓
-- 2       | up     | standby | 2025-11-06 10:00:00  ← Still standby

# Verify writes go to new primary
psql -h localhost -p 9999 -U postgres testdb -c "INSERT INTO test (val) VALUES ('after_failover');"
-- ✓ Success - writes now go to node 1`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Test 2: Replica Failure (No Failover)</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Simulate replica failure
# On db-replica2.internal:
sudo systemctl stop postgresql

# pgBalancer response:
# [2025-11-06 12:00:00] ERROR: health check failed for node 2
# [2025-11-06 12:00:10] ERROR: health check failed for node 2 (retry 2/3)
# [2025-11-06 12:00:20] ERROR: health check failed for node 2 (retry 3/3)
# [2025-11-06 12:00:20] INFO: backend 2 is down, removing from load balancer
# [2025-11-06 12:00:20] INFO: no failover needed - primary still healthy

# Check status
SHOW POOL_NODES;
-- node_id | status | role    | load_balance_node
-- --------+--------+---------+------------------
-- 0       | up     | primary | false             ← Primary healthy
-- 1       | up     | standby | true              ← Replica1 still balancing
-- 2       | down   | standby | false             ← Replica2 DOWN, excluded

# Queries automatically route to remaining healthy backends
SELECT * FROM users WHERE active = true;
-- ✓ Routed to node 1 (db-replica1) - node 2 excluded from load balancing`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Test 3: Monitor Failover Events</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Track failover events via Prometheus
curl -s http://localhost:8080/metrics | grep failover

pgbalancer_failover_total{reason="primary_down"} 1
pgbalancer_failback_total 0
pgbalancer_backend_detach_total{node_id="0"} 1
pgbalancer_backend_attach_total{node_id="1"} 1

# Query failover history (last 24 hours)
increase(pgbalancer_failover_total[24h])

# Via REST API
curl -s http://localhost:8080/api/v1/failover/history | jq

{
  "events": [
    {
      "timestamp": "2025-11-06T11:30:35Z",
      "type": "failover",
      "old_primary": 0,
      "new_primary": 1,
      "reason": "health_check_failure",
      "duration_seconds": 2
    }
  ]
}`}
          </pre>
        </div>
      </section>

      {/* Step 5: Manual Failover */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-orange-500/20 rounded-lg">
            <AlertCircle className="w-6 h-6 text-orange-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 5: Manual Failover Operations</h2>
        </div>

        <p className="text-gray-300 mb-4">
          Perform planned failovers for maintenance:
        </p>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Promote Standby to Primary</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Using bctl CLI
bctl nodes promote 1 --force

# Response:
Promoting node 1 (db-replica1.internal) to primary...
Detaching old primary node 0...
Updating cluster topology...
Failover completed successfully.
New primary: node 1

# Using REST API
curl -X POST http://localhost:8080/api/v1/nodes/1/promote \
  -H "Content-Type: application/json" \
  -d '{"force": true}'

# Response:
{
  "status": "success",
  "old_primary": 0,
  "new_primary": 1,
  "timestamp": "2025-11-06T13:00:00Z"
}`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Detach and Reattach Backend</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Detach backend for maintenance (graceful drain)
bctl nodes detach 2

# Backend stops receiving new connections
# Existing connections complete naturally

# Check status
SHOW POOL_NODES;
-- node 2 status = waiting (draining)

# After maintenance, reattach backend
bctl nodes attach 2

# pgBalancer performs health check and marks node up
-- node 2 status = up

# Or use SQL commands
-- Detach node
pcp_detach_node -h localhost -p 9898 -U pgbalancer 2

-- Attach node
pcp_attach_node -h localhost -p 9898 -U pgbalancer 2`}
          </pre>
        </div>
      </section>

      {/* Step 6: Recovery Procedures */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <CheckCircle className="w-6 h-6 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 6: Backend Recovery</h2>
        </div>

        <p className="text-gray-300 mb-4">
          Recover failed backends and restore cluster health:
        </p>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Automatic Recovery (After Repair)</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# After fixing the failed backend (e.g., restarting PostgreSQL)
# pgBalancer automatically detects recovery:

# On db-replica2.internal (previously down)
sudo systemctl start postgresql

# pgBalancer health check log:
# [2025-11-06 13:15:00] INFO: health check succeeded for node 2
# [2025-11-06 13:15:00] INFO: backend 2 recovered, attaching to pool
# [2025-11-06 13:15:01] INFO: node 2 added to load balancer

# Verify recovery
SHOW POOL_NODES;
-- node_id | status | role    | last_status_change
-- --------+--------+---------+--------------------
-- 0       | up     | primary | 2025-11-06 13:00:00
-- 1       | up     | standby | 2025-11-06 10:00:00
-- 2       | up     | standby | 2025-11-06 13:15:01  ← RECOVERED ✓

# Backend automatically rejoins load balancing
SELECT * FROM users LIMIT 1;
-- May be routed to node 2 again`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Failback to Original Primary</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# After original primary (node 0) is repaired
# Re-sync it as a standby first

# On db-primary.internal (node 0)
# Use pg_rewind to sync from new primary (node 1)
pg_rewind --target-pgdata=/var/lib/postgresql/data \
  --source-server='host=db-replica1.internal port=5432 user=replicator'
sudo systemctl start postgresql

# Node 0 joins as standby
SHOW POOL_NODES;
-- node 0 status = up, role = standby

# Perform planned failback to restore original topology
bctl nodes promote 0 --force

# Cluster returns to original configuration:
-- node 0 = primary (restored)
-- node 1 = standby
-- node 2 = standby`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Split-Brain Detection</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# If multiple nodes think they're primary (split-brain)
# pgBalancer detects this via replication state queries

# Enable split-brain detection
detach_false_primary = on

# pgBalancer queries each backend:
SELECT pg_is_in_recovery();
-- Primary returns: false
-- Standby returns: true

# If multiple backends return false (both primary):
# [2025-11-06 14:00:00] ERROR: split-brain detected!
# [2025-11-06 14:00:00] ERROR: node 0 claims primary, node 1 claims primary
# [2025-11-06 14:00:01] INFO: detaching node 1 (false primary)

# Manual resolution required - fix PostgreSQL replication
# Then reattach backends after confirming roles`}
          </pre>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">High Availability Best Practices</h2>
        
        <div className="space-y-4">
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-400 mb-2">✓ DO</h3>
            <ul className="text-gray-300 space-y-2 mb-0">
              <li>• Enable <code>health_check_period</code> for continuous monitoring (10-30 seconds)</li>
              <li>• Use <strong>watchdog</strong> for multi-pgbalancer deployments</li>
              <li>• Set <code>health_check_max_retries = 3</code> to avoid false positives</li>
              <li>• Configure <code>failover_on_backend_error = off</code> (prevent unnecessary failovers)</li>
              <li>• Test failover regularly in staging environment</li>
              <li>• Monitor <code>pgbalancer_failover_total</code> metric for unexpected events</li>
            </ul>
          </div>

          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-red-400 mb-2">✗ DON'T</h3>
            <ul className="text-gray-300 space-y-2 mb-0">
              <li>• Don't disable health checks (<code>health_check_period = 0</code>)</li>
              <li>• Don't set <code>health_check_timeout</code> too low (&lt;5 seconds)</li>
              <li>• Don't ignore replication lag in <code>sr_check_period</code></li>
              <li>• Don't perform failover during peak traffic without testing</li>
              <li>• Don't forget to configure <code>backend_flag = ALLOW_TO_FAILOVER</code></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Failover Scenarios */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Failover Scenarios Summary</h2>
        
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-2 text-cyan-400">Failure Type</th>
                <th className="text-left py-2 text-cyan-400">pgBalancer Action</th>
                <th className="text-left py-2 text-cyan-400">Recovery</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-2">Primary down</td>
                <td className="py-2">Promote standby to primary</td>
                <td className="py-2">Repair and rejoin as standby</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2">Standby down</td>
                <td className="py-2">Exclude from load balancing</td>
                <td className="py-2">Auto-reattach when healthy</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2">Replication lag</td>
                <td className="py-2">Remove from load balancer</td>
                <td className="py-2">Rejoin when lag &lt; threshold</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2">Split-brain</td>
                <td className="py-2">Detach false primary</td>
                <td className="py-2">Manual intervention required</td>
              </tr>
              <tr>
                <td className="py-2">Network partition</td>
                <td className="py-2">Watchdog quorum decision</td>
                <td className="py-2">Auto-recover when network restored</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Resources */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Additional Resources</h2>
        <div className="bg-gray-800/50 rounded-lg p-6">
          <ul className="space-y-2 text-gray-300 mb-0">
            <li>
              • <a href="https://github.com/pgElephant/pgbalancer/tree/main/cluster" className="text-cyan-400 hover:text-cyan-300">
                pgBalancer Docker Cluster Example
              </a>
            </li>
            <li>
              • <a href="/docs/pgbalancer/connection-pooling" className="text-cyan-400 hover:text-cyan-300">
                Connection Pooling Guide
              </a>
            </li>
            <li>
              • <a href="/docs/pgbalancer/load-balancing" className="text-cyan-400 hover:text-cyan-300">
                Load Balancing Configuration
              </a>
            </li>
            <li>
              • <a href="/docs/pgbalancer/monitoring" className="text-cyan-400 hover:text-cyan-300">
                Monitoring & Alerting
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
