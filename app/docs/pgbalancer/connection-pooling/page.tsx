import { Activity, TrendingUp, Settings, Users, Gauge } from 'lucide-react'
import DocsContentLayout from '../../../../components/DocsContentLayout'
import { PgbalancerIcon } from '../../../../components/ProductIcons'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata = {
  title: 'Connection Pooling Setup - pgBalancer',
  description: 'Configure and monitor connection pooling with pgBalancer for optimal database performance.'
}

export default function ConnectionPoolingPage() {
  return (
    <DocsContentLayout
      hero={{
        badgeLabel: 'pgBalancer',
        badgeIcon: <PgbalancerIcon size={20} />, 
        badgeTone: 'cyan',
        title: 'Connection Pooling Setup',
        description: 'Configure and monitor connection pooling with pgBalancer for optimal database performance.'
      }}
      contentWidth="wide"
    >
      <div className="space-y-12 text-slate-200">
        <section className="space-y-4">
          <p>
            pgBalancer supports three pooling modes with different connection behaviors and tuning knobs. Use the configuration snippet below as a starting point, then adjust limits based on concurrency and SLA targets.
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

          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 text-sm text-cyan-100">
            <strong>Tip:</strong> Use <code>transaction</code> mode for web applications with short-lived requests. Use <code>session</code> mode for long-running analytical queries or applications requiring session state.
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Activity className="w-6 h-6 text-cyan-300" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Monitor Pool Utilization</h2>
          </div>

          <p>
            Query pgBalancer to monitor connection pool usage and identify bottlenecks.
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
    database
FROM pool_processes
GROUP BY database;`}
          />
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-300" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Tune Pool Limits</h2>
          </div>

          <p>
            Adjust max connections and pool sizes based on observed workload patterns. Use structured experiments to determine the right settings.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3 rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
              <h3 className="text-lg font-semibold text-blue-200">Growth plan</h3>
              <BashCodeBlock
                title="Scaled limits"
                code={`# Increase simultaneous clients
num_init_children = 48
max_pool = 6

# Add reserve for admin connections
reserved_connections = 3`}
              />
            </div>
            <div className="space-y-3 rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">
              <h3 className="text-lg font-semibold text-blue-200">Connection cleanup</h3>
              <BashCodeBlock
                title="Lifecycle tuning"
                code={`connection_life_time = 300
client_idle_limit = 120
child_life_time = 180`}
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-500/20 rounded-lg">
              <Settings className="w-6 h-6 text-slate-200" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Authentication, Limits & Health Checks</h2>
          </div>

          <SqlCodeBlock
            title="Authentication & Limits"
            code={`# Authentication options
# auth_type = md5 | pam | cert
# auth_file = '/etc/pgbalancer/userlist.txt'
# authentication_query = 'SELECT usename, passwd FROM pgbalancer_users'

# Connection limits
max_connections = 100
reserved_connections = 5
max_pool = 4

# Health checks
health_check_period = 15               # seconds
health_check_timeout = 10
health_check_user = 'pgbalancer_health'
health_check_password = 'SecureHealthPass!'
health_check_database = 'postgres'`}
          />

          <BashCodeBlock
            title="Create health check role"
            code={`psql -d postgres -c "CREATE ROLE pgbalancer_health LOGIN PASSWORD 'SecureHealthPass!'"`}
          />
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <Users className="w-6 h-6 text-emerald-300" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Multi-tenant Pools</h2>
          </div>

          <p>
            Allocate pools per tenant or service by defining user/database pairs. This avoids noisy neighbors and allows granular tuning.
          </p>

          <SqlCodeBlock
            title="Multi-tenant pgbalancer.conf"
            code={`# Tenant A pool
user1_database = 'tenant_a'
user1_pool_mode = statement
user1_max_pool = 8

# Tenant B pool
user2_database = 'tenant_b'
user2_pool_mode = transaction
user2_max_pool = 6`}
          />
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <Gauge className="w-6 h-6 text-amber-300" />
            </div>
            <h2 className="text-2xl font-semibold text-white">Metrics & Dashboards</h2>
          </div>

          <p className="text-slate-300">
            Integrate with Prometheus and Grafana to visualize pool usage, wait times, and failover events. The REST API exposes counters for automation and alerting.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <SqlCodeBlock
              title="Pool wait time histogram"
              code={`SELECT histogram(bucket_ms, wait_event) AS histogram
FROM pgbalancer_wait_times
WHERE bucket_ms <= 500;`}
            />
            <SqlCodeBlock
              title="REST API snippet"
              code={`curl -s http://localhost:8080/api/v1/pool/summary | jq`}
            />
          </div>
        </section>
      </div>
    </DocsContentLayout>
  )
}
