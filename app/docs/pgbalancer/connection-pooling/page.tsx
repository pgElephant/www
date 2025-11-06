import React from 'react';
import { Database, Activity, TrendingUp, Settings, Users, Gauge } from 'lucide-react';
import SqlCodeBlock from '@/components/SqlCodeBlock';

export const metadata = {
  title: 'Connection Pooling Setup - pgBalancer',
  description: 'Configure and monitor connection pooling with pgBalancer for optimal database performance.'
};

export default function ConnectionPoolingPage() {
  return (
    <div className="prose dark:prose-invert max-w-4xl mx-auto py-12 px-6">
      {/* Header */}
      <div className="not-prose mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent mb-4">
          Connection Pooling Setup
        </h1>
        <p className="text-xl text-gray-300">
          Configure and monitor connection pooling with pgBalancer for optimal database performance
        </p>
      </div>

      {/* Step 1: Pool Configuration */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Database className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 1: Configure Connection Pools</h2>
        </div>

        <p className="text-gray-300 mb-4">
          pgBalancer supports three pooling modes with different connection behaviors:
        </p>

        <SqlCodeBlock
          title="pgbalancer.conf Configuration"
          language="bash"
          code={`# Connection Pooling Configuration

# Pool mode: session, transaction, or statement
# - session: Connection held for entire client session (default)
# - transaction: Connection returned after each transaction
# - statement: Connection returned after each statement
pool_mode = transaction

# Maximum client connections (per process)
num_init_children = 32
max_pool = 4

# Connection limits
max_connections = 100
reserved_connections = 1

# Connection lifecycle
connection_life_time = 600      # Disconnect pooled connections after 10 minutes
client_idle_limit = 0           # Disconnect idle clients (0 = disabled)

# Authentication timeout
authentication_timeout = 60

# Child process management
child_life_time = 300           # Child process lifetime (seconds)
child_max_connections = 0       # Max connections per child (0 = unlimited)

# Connection cache
connection_cache = on           # Enable connection caching`}
        />

        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-4">
          <p className="text-sm text-blue-200 m-0">
            <strong>💡 Tip:</strong> Use <code>transaction</code> mode for web applications with short-lived requests. 
            Use <code>session</code> mode for long-running analytical queries or applications requiring session state.
          </p>
        </div>
      </section>

      {/* Step 2: Monitor Pool Utilization */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-cyan-500/20 rounded-lg">
            <Activity className="w-6 h-6 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 2: Monitor Pool Utilization</h2>
        </div>

                <p className="text-gray-300 mb-4">
          Query pgBalancer to monitor connection pool usage and identify bottlenecks:
        </p>

        <SqlCodeBlock
          title="Check Pool Status via SHOW POOL_PROCESSES"
          code={`-- Connect to pgBalancer
psql -h localhost -p 9999 -U postgres

-- View all pool processes and their connections
SHOW POOL_PROCESSES;

-- Output shows:
-- pool_pid | start_time | database | username | create_time | pool_counter`}
        />

        <SqlCodeBlock
          title="Pool Statistics Query"
          code={`-- Get pool utilization metrics
SELECT 
    database,
    username,
    COUNT(*) as active_connections,
    MAX(pool_counter) as max_reuse
FROM pool_processes
GROUP BY database, username;

-- Check for pool exhaustion
SELECT 
    CASE 
        WHEN COUNT(*) >= 32 THEN 'WARNING: Pool exhausted'
        ELSE 'OK'
    END as pool_status,
    COUNT(*) as used_connections,
    32 as max_connections
FROM pool_processes;`}
        />

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Pool Statistics via SHOW POOL_POOLS</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`-- View backend connection pools
SHOW POOL_POOLS;

-- Output shows connection state per backend:
-- pool_pid | pool_id | backend_id | database | username | create_time | pool_backendpid | pool_connected
-- ---------+---------+------------+----------+----------+-------------+-----------------+---------------
-- 12345    | 0       | 0          | testdb   | appuser  | 2025-11-06  | 67890          | 1
-- 12345    | 0       | 1          | testdb   | appuser  | 2025-11-06  | 67891          | 1`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Calculate Pool Utilization Rate</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`-- Query pool utilization (requires pg_stat_statements)
SELECT 
    count(*) FILTER (WHERE pool_connected = 1) as active_connections,
    count(*) as total_pool_slots,
    round(100.0 * count(*) FILTER (WHERE pool_connected = 1) / count(*), 2) as utilization_pct
FROM (
    -- This would come from SHOW POOL_POOLS parsed data
    -- In practice, use REST API or bctl for programmatic access
    SELECT pool_connected FROM pool_pools_view
) pools;

-- Example output:
-- active_connections | total_pool_slots | utilization_pct
-- -------------------+------------------+----------------
-- 45                | 128              | 35.16`}
          </pre>
        </div>
      </section>

      {/* Step 3: REST API Monitoring */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-teal-500/20 rounded-lg">
            <TrendingUp className="w-6 h-6 text-teal-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 3: REST API Pool Monitoring</h2>
        </div>

        <p className="text-gray-300 mb-4">
          Use pgBalancer's REST API to programmatically monitor pool statistics:
        </p>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Get Pool Status (HTTP API)</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Get pool process information
curl -s http://localhost:8080/api/v1/pool/processes | jq

# Response:
{
  "processes": [
    {
      "pool_pid": 12345,
      "start_time": "2025-11-06 10:30:00",
      "database": "testdb",
      "username": "appuser",
      "create_time": "2025-11-06 10:30:01",
      "pool_counter": 150
    }
  ],
  "total": 32
}`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Monitor Pool Utilization Metrics</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Get Prometheus metrics
curl -s http://localhost:8080/metrics | grep pgbalancer_pool

# Key metrics:
pgbalancer_pool_connections_total 128        # Total pool capacity
pgbalancer_pool_connections_active 45        # Active connections
pgbalancer_pool_connections_idle 83          # Idle connections
pgbalancer_pool_utilization_percent 35.16    # Utilization percentage
pgbalancer_pool_hits_total 15420             # Pool cache hits
pgbalancer_pool_misses_total 89              # Pool cache misses`}
          </pre>
        </div>
      </section>

      {/* Step 4: bctl CLI Monitoring */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Settings className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 4: CLI Monitoring with bctl</h2>
        </div>

        <p className="text-gray-300 mb-4">
          Use the <code>bctl</code> command-line tool for human-readable pool statistics:
        </p>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">View Pool Status</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Show pool processes (table format)
bctl --host localhost --port 8080 pool processes --format table

# Output:
┌──────────┬─────────────────────┬──────────┬──────────┬─────────────────────┬──────────────┐
│ Pool PID │ Start Time          │ Database │ Username │ Create Time         │ Pool Counter │
├──────────┼─────────────────────┼──────────┼──────────┼─────────────────────┼──────────────┤
│ 12345    │ 2025-11-06 10:30:00 │ testdb   │ appuser  │ 2025-11-06 10:30:01 │ 150          │
│ 12346    │ 2025-11-06 10:30:00 │ testdb   │ appuser  │ 2025-11-06 10:30:01 │ 89           │
│ 12347    │ 2025-11-06 10:30:00 │ testdb   │ readonly │ 2025-11-06 10:30:01 │ 45           │
└──────────┴─────────────────────┴──────────┴──────────┴─────────────────────┴──────────────┘

# JSON format for scripting
bctl pool processes --format json | jq '.processes | length'`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Check Overall Status</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Get pgBalancer status with pool information
bctl status --format table

# Output:
┌────────────────────────────┬───────────────────────────────────┐
│ Metric                     │ Value                             │
├────────────────────────────┼───────────────────────────────────┤
│ Version                    │ pgbalancer 5.0.0 (pgpool-II 4.5)  │
│ Uptime                     │ 5 days, 3 hours                   │
│ Total Processes            │ 32                                │
│ Active Connections         │ 45                                │
│ Idle Connections           │ 83                                │
│ Pool Utilization           │ 35.16%                            │
└────────────────────────────┴───────────────────────────────────┘`}
          </pre>
        </div>
      </section>

      {/* Step 5: Pool Optimization */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-yellow-500/20 rounded-lg">
            <Users className="w-6 h-6 text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 5: Pool Size Optimization</h2>
        </div>

        <p className="text-gray-300 mb-4">
          Optimize pool sizing based on workload characteristics:
        </p>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Calculate Optimal Pool Size</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`-- Formula for optimal pool size:
-- pool_size = (core_count * 2) + effective_spindle_count

-- For web applications (high connection count, short queries):
num_init_children = 50          # Number of pgBalancer child processes
max_pool = 4                    # Connections per child to each backend
-- Total capacity: 50 * 4 = 200 backend connections

-- For analytical workloads (fewer connections, long queries):
num_init_children = 10          # Fewer processes
max_pool = 2                    # Fewer connections per child
-- Total capacity: 10 * 2 = 20 backend connections

-- Monitor and adjust based on metrics:
-- - If utilization consistently > 80%: Increase num_init_children
-- - If pool_misses_total high: Increase max_pool
-- - If backend connections maxed out: Check backend max_connections`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Connection Lifecycle Tuning</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Tune connection lifetime to prevent stale connections
connection_life_time = 600      # Reset connections every 10 minutes

# For long-running applications:
connection_life_time = 3600     # 1 hour

# For microservices with frequent deployments:
connection_life_time = 300      # 5 minutes

# Disconnect idle clients to free resources
client_idle_limit = 300         # Disconnect after 5 minutes idle

# Child process recycling
child_life_time = 300           # Recycle child process every 5 minutes
child_max_connections = 1000    # Or after 1000 connections`}
          </pre>
        </div>
      </section>

      {/* Step 6: Troubleshooting */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-red-500/20 rounded-lg">
            <Gauge className="w-6 h-6 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 6: Troubleshooting Pool Issues</h2>
        </div>

        <p className="text-gray-300 mb-4">
          Common pooling issues and their solutions:
        </p>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Pool Exhaustion Detection</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Check for pool exhaustion (utilization near 100%)
curl -s http://localhost:8080/metrics | grep pgbalancer_pool_utilization
# pgbalancer_pool_utilization_percent 98.5  # ⚠️ Pool nearly exhausted

# Check client wait time (high = pool exhaustion)
# Look for "waiting for connection" in logs
tail -f /var/log/pgbalancer/pgbalancer.log | grep "waiting"

# Solutions:
# 1. Increase num_init_children in pgbalancer.conf
# 2. Use transaction pooling instead of session pooling
# 3. Reduce connection_life_time to recycle faster
# 4. Add more backend nodes for horizontal scaling`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Connection Leak Detection</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Identify long-running connections that may be leaked
SHOW POOL_PROCESSES;

# Look for connections with high pool_counter values
# High counter = connection used many times (possibly leaked)

# Force disconnect specific process
# bctl pool disconnect <pool_pid>
bctl pool disconnect 12345

# Enable automatic connection cleanup
client_idle_limit = 300         # Disconnect idle clients after 5 minutes
connection_life_time = 600      # Recycle connections every 10 minutes`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Backend Connection Limits</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`-- Check PostgreSQL backend connection limit
SHOW max_connections;
-- max_connections = 100

-- Calculate pgBalancer total connection potential
-- num_init_children * max_pool * num_backends = total
-- Example: 32 * 4 * 2 = 256 potential connections

-- ⚠️ Problem: pgBalancer can create more connections than backend allows!

-- Solutions:
-- 1. Ensure backend max_connections > pgBalancer capacity
ALTER SYSTEM SET max_connections = 300;
SELECT pg_reload_conf();

-- 2. Reduce pgBalancer pool size
-- Edit pgbalancer.conf:
num_init_children = 20
max_pool = 3
-- New total: 20 * 3 * 2 = 120 connections`}
          </pre>
        </div>
      </section>

      {/* Configuration Reference */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Configuration Parameters Reference</h2>
        
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-2 text-cyan-400">Parameter</th>
                <th className="text-left py-2 text-cyan-400">Default</th>
                <th className="text-left py-2 text-cyan-400">Description</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400">pool_mode</td>
                <td className="py-2">session</td>
                <td className="py-2">session, transaction, or statement</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400">num_init_children</td>
                <td className="py-2">32</td>
                <td className="py-2">Number of pre-forked child processes</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400">max_pool</td>
                <td className="py-2">4</td>
                <td className="py-2">Connections per child to each backend</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400">connection_life_time</td>
                <td className="py-2">0</td>
                <td className="py-2">Connection lifetime in seconds (0=unlimited)</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400">client_idle_limit</td>
                <td className="py-2">0</td>
                <td className="py-2">Disconnect idle clients (0=disabled)</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400">child_life_time</td>
                <td className="py-2">300</td>
                <td className="py-2">Child process lifetime in seconds</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-green-400">connection_cache</td>
                <td className="py-2">on</td>
                <td className="py-2">Enable connection caching</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Best Practices</h2>
        
        <div className="space-y-4">
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-400 mb-2">✓ DO</h3>
            <ul className="text-gray-300 space-y-2 mb-0">
              <li>• Use <strong>transaction pooling</strong> for web applications</li>
              <li>• Monitor pool utilization and adjust <code>num_init_children</code> accordingly</li>
              <li>• Set <code>connection_life_time</code> to prevent stale connections</li>
              <li>• Configure <code>client_idle_limit</code> to cleanup leaked connections</li>
              <li>• Ensure backend <code>max_connections</code> exceeds pool capacity</li>
            </ul>
          </div>

          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-red-400 mb-2">✗ DON'T</h3>
            <ul className="text-gray-300 space-y-2 mb-0">
              <li>• Don't use session pooling for high-concurrency applications</li>
              <li>• Don't set pool size larger than backend can handle</li>
              <li>• Don't ignore pool utilization metrics above 80%</li>
              <li>• Don't disable connection caching in production</li>
              <li>• Don't set <code>connection_life_time = 0</code> (unlimited) in production</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Additional Resources</h2>
        <div className="bg-gray-800/50 rounded-lg p-6">
          <ul className="space-y-2 text-gray-300 mb-0">
            <li>
              • <a href="https://github.com/pgElephant/pgbalancer" className="text-cyan-400 hover:text-cyan-300">
                pgBalancer GitHub Repository
              </a>
            </li>
            <li>
              • <a href="/docs/pgbalancer/configuration" className="text-cyan-400 hover:text-cyan-300">
                Configuration Reference
              </a>
            </li>
            <li>
              • <a href="/docs/pgbalancer/rest-api" className="text-cyan-400 hover:text-cyan-300">
                REST API Documentation
              </a>
            </li>
            <li>
              • <a href="/docs/pgbalancer/monitoring" className="text-cyan-400 hover:text-cyan-300">
                Monitoring & Metrics Guide
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
