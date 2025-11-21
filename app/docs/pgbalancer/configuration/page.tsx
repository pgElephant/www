import { Metadata } from 'next';
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout';
import BashCodeBlock from '../../../../components/BashCodeBlock';

export const metadata: Metadata = {
  title: 'Configuration Reference | pgBalancer PostgreSQL Load Balancer',
  description: 'Complete configuration reference for pgBalancer - all .conf file parameters, AI load balancing settings, REST API, MQTT, and connection pooling options.',
};

const tableOfContents: TocItem[] = [
  { id: 'connection-settings', title: 'Connection Settings' },
  { id: 'backend-servers', title: 'Backend Server Configuration' },
  { id: 'ai-load-balancing', title: 'AI Load Balancing Configuration' },
  { id: 'rest-api', title: 'REST API Configuration' },
  { id: 'mqtt-events', title: 'MQTT Event Streaming Configuration' },
  { id: 'load-balancing', title: 'Load Balancing Configuration' },
  { id: 'health-check', title: 'Health Check Configuration' },
  { id: 'failover-watchdog', title: 'Failover and Watchdog Configuration' },
  { id: 'logging', title: 'Logging Configuration' },
  { id: 'authentication', title: 'Authentication Configuration' },
  { id: 'advanced-features', title: 'Advanced Features' },
  { id: 'complete-example', title: 'Complete Configuration Example' },
  { id: 'validation', title: 'Configuration Validation' },
  { id: 'parameters-reference', title: 'Configuration Parameters Reference' },
];

const prevLink: NavLink = {
  href: '/docs/pgbalancer/getting-started',
  label: 'Getting Started',
};

const nextLink: NavLink = {
  href: '/docs/pgbalancer/connection-pooling',
  label: 'Connection Pooling Setup',
};

export default function PgBalancerConfigDocs() {
  return (
    <PostgresDocsLayout
      title="Configuration Reference"
      version="pgBalancer Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <div className="bg-white/5 border border-slate-200/50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-yellow-200 mb-2">⚙️ Configuration File Format</h3>
        <p className="text-sm text-yellow-100">
          pgBalancer uses <strong>.conf file format</strong> (same as pgpool-II and PostgreSQL). Configuration file location:
          <code>/etc/pgbalancer/pgbalancer.conf</code>
        </p>
      </div>

      <section id="connection-settings">
        <h2>Connection Settings</h2>

          <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-cyan-300 mb-3">Basic Connection Configuration</h3>
            <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto text-sm">
{`#------------------------------------------------------------------------------
# CONNECTION SETTINGS
#------------------------------------------------------------------------------

# Listen address for client connections
listen_addresses = '*'
# * = all interfaces, localhost = local only, or specific IP

# Listen port
port = 9999

# Upstream Postgres primary/backup nodes
backend_hostname0 = 'postgres-primary'
backend_port0 = 5432
backend_weight0 = 1

backend_hostname1 = 'postgres-standby'
backend_port1 = 5432
backend_weight1 = 1
backend_status1 = 'standby'

# Authentication to PostgreSQL
backend_user = 'pgbalancer'
backend_password = 'StrongPassword123!'`}
            </pre>
          </div>
      </section>

      <section id="backend-servers">
        <h2>Backend Server Configuration</h2>

          <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-cyan-400 mb-3">Defining PostgreSQL Backends</h3>
            <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto text-sm">
{`#------------------------------------------------------------------------------
# BACKEND SERVERS (0-indexed)
#------------------------------------------------------------------------------

# Backend 0 - Primary
backend_hostname0 = 'db1.example.com'
backend_port0 = 5432
backend_weight0 = 1
backend_data_directory0 = '/var/lib/postgresql/16/main'
backend_flag0 = 'ALLOW_TO_FAILOVER'
backend_application_name0 = 'primary_db'

# Backend 1 - Replica
backend_hostname1 = 'db2.example.com'
backend_port1 = 5432
backend_weight1 = 1
backend_data_directory1 = '/var/lib/postgresql/16/replica1'
backend_flag1 = 'ALLOW_TO_FAILOVER'
backend_application_name1 = 'replica1_db'

# Backend 2 - Replica
backend_hostname2 = 'db3.example.com'
backend_port2 = 5432
backend_weight2 = 1
backend_data_directory2 = '/var/lib/postgresql/16/replica2'
backend_flag2 = 'ALLOW_TO_FAILOVER'
backend_application_name2 = 'replica2_db'

# Add more backends as needed (up to 128 backends supported)`}
            </pre>
          </div>

          <div className="space-y-2 text-sm">
            <p><strong>Backend Parameters:</strong></p>
            <ul className="list-disc ml-6 space-y-1">
              <li><code>backend_hostname</code>: Server hostname or IP address</li>
              <li><code>backend_port</code>: PostgreSQL port number</li>
              <li><code>backend_weight</code>: Load balancing weight (higher = more queries)</li>
              <li><code>backend_data_directory</code>: PostgreSQL data directory path</li>
              <li><code>backend_flag</code>: ALLOW_TO_FAILOVER or ALWAYS_PRIMARY or DISALLOW_TO_FAILOVER</li>
              <li><code>backend_application_name</code>: Identifier for monitoring</li>
            </ul>
          </div>
      </section>

      <section id="ai-load-balancing">
        <h2>AI Load Balancing Configuration</h2>

          <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-cyan-400 mb-3">Machine Learning Routing Settings</h3>
            <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto text-sm">
{`#------------------------------------------------------------------------------
# AI LOAD BALANCING (Machine Learning Routing)
#------------------------------------------------------------------------------

# Enable AI-based load balancing
enable_ai_load_balance = on

# Learning rate for weight updates (0.0 to 1.0)
# Higher = faster adaptation, Lower = more stable
ai_learning_rate = 0.01

# Exploration rate for trying different backends (0.0 to 1.0)
# Higher = more exploration, Lower = more exploitation
ai_exploration_rate = 0.1

# Weight update interval in seconds
# How often AI updates backend weights based on performance
ai_weight_update_interval = 60

# Minimum sample size before AI routing kicks in
ai_min_sample_size = 100

# Performance metric to optimize
# Options: response_time, throughput, error_rate
ai_optimization_metric = 'response_time'`}
            </pre>
          </div>

          <div className="p-4 border border-blue-500 rounded-lg">
            <h4 className="font-semibold mb-2">🎯 AI Tuning Guidelines</h4>
            <ul className="text-sm space-y-1">
              <li>• <strong>Conservative</strong>: learning_rate=0.005, exploration_rate=0.05 (stable production)</li>
              <li>• <strong>Balanced</strong>: learning_rate=0.01, exploration_rate=0.1 (recommended)</li>
              <li>• <strong>Aggressive</strong>: learning_rate=0.05, exploration_rate=0.2 (fast adaptation)</li>
              <li>• <strong>Update interval</strong>: 60s for production, 10s for testing</li>
            </ul>
          </div>
      </section>

      <section id="rest-api">
        <h2>REST API Configuration</h2>

          <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-cyan-400 mb-3">HTTP/JSON API Settings</h3>
            <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto text-sm">
{`#------------------------------------------------------------------------------
# REST API CONFIGURATION
#------------------------------------------------------------------------------

# Enable REST API server
enable_rest_api = on

# API server port (default: 8080)
rest_api_port = 8080

# Enable JWT authentication
rest_api_auth = on

# Secret key for JWT signing (change this!)
rest_api_secret = 'your-very-long-random-secret-key-here'

# JWT token expiration time in seconds (default: 3600 = 1 hour)
rest_api_token_expiry = 3600

# CORS settings for web applications
rest_api_cors_enabled = on
rest_api_cors_origins = '*'

# API request logging
rest_api_log_requests = on`}
            </pre>
          </div>

          <div className="space-y-2 text-sm">
            <p><strong>Available API Endpoints (17 total):</strong></p>
            <ul className="list-disc ml-6 space-y-1">
              <li><code>GET /api/health</code> - Health check</li>
              <li><code>GET /api/backends</code> - Backend status with AI health scores</li>
              <li><code>GET /api/stats</code> - Pool statistics</li>
              <li><code>GET /api/processes</code> - Active processes</li>
              <li><code>GET /api/config</code> - Configuration info</li>
              <li><code>POST /api/login</code> - JWT authentication</li>
              <li><code>POST /api/node/{'{'}id{'}'}/attach</code> - Attach backend node</li>
              <li><code>POST /api/node/{'{'}id{'}'}/detach</code> - Detach backend node</li>
              <li>... and 9 more endpoints for cluster management</li>
            </ul>
          </div>
      </section>

      <section id="mqtt-events">
        <h2>MQTT Event Streaming Configuration</h2>

          <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-cyan-400 mb-3">Real-Time Event Publishing</h3>
            <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto text-sm">
{`#------------------------------------------------------------------------------
# MQTT EVENT STREAMING
#------------------------------------------------------------------------------

# Enable MQTT event publishing
enable_mqtt = on

# MQTT broker connection
mqtt_broker_address = 'localhost'
mqtt_broker_port = 1883
mqtt_client_id = 'pgbalancer_01'

# MQTT authentication (if broker requires)
mqtt_username = ''
mqtt_password = ''

# Topic prefix for all events
mqtt_topic_prefix = 'pgbalancer'

# QoS level (0, 1, or 2)
mqtt_qos = 1

# Events to publish
mqtt_publish_node_status = on      # Node up/down events
mqtt_publish_failover = on         # Failover events
mqtt_publish_health_check = on     # Health check results
mqtt_publish_connection = off      # Connection events (verbose)

# Publish interval for status updates (seconds)
mqtt_publish_interval = 30`}
            </pre>
          </div>

          <div className="p-4 border border-purple-500 rounded-lg">
            <h4 className="font-semibold mb-2">📡 Event Topics</h4>
            <ul className="text-sm space-y-1">
              <li>• <code>pgbalancer/node/status</code> - Node status changes</li>
              <li>• <code>pgbalancer/failover</code> - Failover events</li>
              <li>• <code>pgbalancer/health</code> - Health check results</li>
              <li>• <code>pgbalancer/stats</code> - Periodic statistics</li>
            </ul>
          </div>
      </section>

      <section id="load-balancing">
        <h2>Load Balancing Configuration</h2>

          <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-cyan-400 mb-3">Load Balancing Modes and Settings</h3>
            <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto text-sm">
{`#------------------------------------------------------------------------------
# LOAD BALANCING
#------------------------------------------------------------------------------

# Enable load balancing mode
load_balance_mode = on

# Ignore leading whitespace in queries
ignore_leading_white_space = on

# Read query routing to replicas
black_function_list = ''
white_function_list = ''

# Database and table white/black lists
black_query_pattern_list = ''
white_query_pattern_list = ''

# Statement level load balancing
statement_level_load_balance = off

# Primary routing query patterns
primary_routing_query_pattern_list = 'COPY;LOCK'

# Disable load balancing on specific queries
disable_load_balance_on_write = 'transaction'

# Database redirect preferences
database_redirect_preference_list = ''
app_name_redirect_preference_list = ''`}
            </pre>
          </div>
      </section>

      <section id="health-check">
        <h2>Health Check Configuration</h2>

          <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-cyan-400 mb-3">Backend Health Monitoring</h3>
            <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto text-sm">
{`#------------------------------------------------------------------------------
# HEALTH CHECK
#------------------------------------------------------------------------------

# Health check period in seconds (0 = disable)
health_check_period = 10

# Health check timeout in seconds
health_check_timeout = 5

# Health check max retries before marking backend down
health_check_max_retries = 3

# Health check retry delay in seconds
health_check_retry_delay = 1

# Database user for health checks
health_check_user = 'postgres'
health_check_password = ''

# Database for health checks
health_check_database = 'postgres'

# Connect timeout for health check (milliseconds)
connect_timeout = 10000

# Log health check errors
log_health_check = off`}
            </pre>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Health Check Best Practices</h4>
              <ul className="text-sm space-y-1">
                <li>• Set <code>health_check_period</code> between 5-30 seconds</li>
                <li>• Use dedicated health check user with minimal permissions</li>
                <li>• Set timeout shorter than period to avoid overlap</li>
                <li>• Enable <code>log_health_check</code> for debugging only</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Recommended Settings</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>Production</strong>: period=10, timeout=5, retries=3</li>
                <li>• <strong>Testing</strong>: period=5, timeout=2, retries=1</li>
                <li>• <strong>High latency</strong>: period=30, timeout=10, retries=5</li>
              </ul>
            </div>
          </div>
      </section>

      <section id="failover-watchdog">
        <h2>Failover and Watchdog Configuration</h2>

          <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-cyan-400 mb-3">High Availability Settings</h3>
            <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto text-sm">
{`#------------------------------------------------------------------------------
# FAILOVER
#------------------------------------------------------------------------------

# Failover on backend error
fail_over_on_backend_error = on

# Search primary node timeout (seconds)
search_primary_node_timeout = 300

# Failover command (executed when backend fails)
failover_command = '/usr/local/bin/failover.sh %d %h %p %D %m %H %M %P %r %R %N %S'

# Failback command (executed when failed backend comes back)
failback_command = ''

# Follow primary command
follow_primary_command = ''

# Detach false primary
detach_false_primary = off

#------------------------------------------------------------------------------
# WATCHDOG (Cluster Manager)
#------------------------------------------------------------------------------

# Enable watchdog for virtual IP failover
use_watchdog = on

# Watchdog communication settings
wd_hostname = 'localhost'
wd_port = 9000
wd_authkey = ''

# Virtual IP settings
delegate_ip = '192.168.1.100'
if_up_cmd = '/usr/bin/ip addr add $_IP_$/24 dev eth0 label eth0:0'
if_down_cmd = '/usr/bin/ip addr del $_IP_$/24 dev eth0'
arping_cmd = '/usr/bin/arping -U $_IP_$ -w 1 -I eth0'

# Watchdog monitoring
wd_monitoring_interfaces_list = ''
wd_interval = 10
wd_priority = 1`}
            </pre>
          </div>
      </section>

      <section id="logging">
        <h2>Logging Configuration</h2>

          <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-cyan-400 mb-3">Logging and Debug Settings</h3>
            <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto text-sm">
{`#------------------------------------------------------------------------------
# LOGGING
#------------------------------------------------------------------------------

# Where to send logs
log_destination = 'stderr'
# Options: stderr, syslog

# Log directory (if using file logging)
logdir = '/var/log/pgbalancer'

# Log filename pattern
log_filename = 'pgbalancer-%Y-%m-%d_%H%M%S.log'

# Log line prefix
log_line_prefix = '%t: pid %p: '

# Rotation settings
log_rotation_age = 1d
log_rotation_size = 10MB

# What to log
log_connections = off
log_hostname = off
log_statement = off
log_per_node_statement = off
log_client_messages = off

# Syslog settings
syslog_facility = 'LOCAL0'
syslog_ident = 'pgbalancer'

# Debug level (0 = off, higher = more verbose)
log_min_messages = warning
client_min_messages = notice
log_error_verbosity = default`}
            </pre>
          </div>
      </section>

      <section id="authentication">
        <h2>Authentication Configuration</h2>

          <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-cyan-400 mb-3">Client and PCP Authentication</h3>
            <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto text-sm">
{`#------------------------------------------------------------------------------
# AUTHENTICATION
#------------------------------------------------------------------------------

# Enable pool_hba for client authentication
enable_pool_hba = on
pool_passwd = 'pool_passwd'

# Authentication method
authentication_timeout = 60

# SSL/TLS settings
ssl = off
ssl_cert = '/etc/pgbalancer/server.crt'
ssl_key = '/etc/pgbalancer/server.key'
ssl_ca_cert = '/etc/pgbalancer/ca.crt'
ssl_ca_cert_dir = ''

# PCP authentication file
pcp_socket_dir = '/var/run/pgbalancer'`}
            </pre>
          </div>

          <div className="space-y-2 text-sm">
            <p><strong>Setting up pool_passwd file:</strong></p>
            <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
              <pre className="bg-black text-green-400 p-3 rounded overflow-x-auto text-xs">
{`# Format: username:md5password
# Generate MD5 password hash
pg_md5 your_password

# Add to /etc/pgbalancer/pool_passwd
postgres:md5d8578edf8458ce06fbc5bb76a58c5ca4
appuser:md5a1b2c3d4e5f6789012345678901234`}
              </pre>
            </div>
          </div>
      </section>

      <section id="advanced-features">
        <h2>Advanced Features</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Query Cache</h3>
              <div className="bg-gray-800/50 rounded-lg p-6">
                <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto text-sm">
{`# Memory query cache
memory_cache_enabled = on
memqcache_method = 'shmem'
memqcache_total_size = 64MB
memqcache_max_num_cache = 1000000
memqcache_expire = 0
memqcache_auto_cache_invalidation = on
memqcache_maxcache = 400KB`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Replication Mode</h3>
              <div className="bg-gray-800/50 rounded-lg p-6">
                <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto text-sm">
{`# Replication mode settings
replication_mode = off
replicate_select = off
insert_lock = off
lobj_lock_table = ''

# Streaming replication
sr_check_period = 10
sr_check_user = 'postgres'
delay_threshold = 10000000`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">In-Memory Query Cache</h3>
              <div className="bg-gray-800/50 rounded-lg p-6">
                <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto text-sm">
{`# Enable in-memory query result caching
memory_cache_enabled = on

# Cache storage method
memqcache_method = 'shmem'
# Options: shmem (shared memory) or memcached

# Cache size limit
memqcache_total_size = 64MB

# Maximum number of cached entries
memqcache_max_num_cache = 1000000

# Cache expiration time (0 = no expiration)
memqcache_expire = 0

# Auto invalidation on table updates
memqcache_auto_cache_invalidation = on`}
                </pre>
              </div>
            </div>
          </div>
      </section>

      <section id="complete-example">
        <h2>Complete Configuration Example</h2>

          <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-cyan-400 mb-3">Production-Ready Configuration</h3>
            <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto text-sm">
{`#==============================================================================
# pgBalancer Production Configuration
# Modern AI-Powered PostgreSQL Connection Pooler
#==============================================================================

#------------------------------------------------------------------------------
# CONNECTIONS
#------------------------------------------------------------------------------
listen_addresses = '*'
port = 5432
socket_dir = '/var/run/pgbalancer'
pcp_listen_addresses = 'localhost'
pcp_port = 9898
num_init_children = 64
max_pool = 4
child_life_time = 300

#------------------------------------------------------------------------------
# BACKENDS (3-node cluster: 1 primary + 2 replicas)
#------------------------------------------------------------------------------
backend_hostname0 = 'db-primary.prod.local'
backend_port0 = 5432
backend_weight0 = 1
backend_flag0 = 'ALWAYS_PRIMARY'

backend_hostname1 = 'db-replica1.prod.local'
backend_port1 = 5432
backend_weight1 = 1
backend_flag1 = 'ALLOW_TO_FAILOVER'

backend_hostname2 = 'db-replica2.prod.local'
backend_port2 = 5432
backend_weight2 = 1
backend_flag2 = 'ALLOW_TO_FAILOVER'

#------------------------------------------------------------------------------
# AI LOAD BALANCING
#------------------------------------------------------------------------------
enable_ai_load_balance = on
ai_learning_rate = 0.01
ai_exploration_rate = 0.1
ai_weight_update_interval = 60
ai_optimization_metric = 'response_time'

#------------------------------------------------------------------------------
# REST API (Port 8080)
#------------------------------------------------------------------------------
enable_rest_api = on
rest_api_port = 8080
rest_api_auth = on
rest_api_secret = 'change-this-to-a-long-random-string'
rest_api_token_expiry = 3600

#------------------------------------------------------------------------------
# MQTT EVENTS
#------------------------------------------------------------------------------
enable_mqtt = on
mqtt_broker_address = 'mqtt.prod.local'
mqtt_broker_port = 1883
mqtt_topic_prefix = 'pgbalancer/prod'
mqtt_publish_node_status = on
mqtt_publish_failover = on

#------------------------------------------------------------------------------
# LOAD BALANCING
#------------------------------------------------------------------------------
load_balance_mode = on
ignore_leading_white_space = on
statement_level_load_balance = off

#------------------------------------------------------------------------------
# HEALTH CHECK
#------------------------------------------------------------------------------
health_check_period = 10
health_check_timeout = 5
health_check_max_retries = 3
health_check_user = 'health_check'
health_check_database = 'postgres'

#------------------------------------------------------------------------------
# FAILOVER
#------------------------------------------------------------------------------
fail_over_on_backend_error = on
failover_command = '/etc/pgbalancer/scripts/failover.sh %d %h %p'
search_primary_node_timeout = 300

#------------------------------------------------------------------------------
# AUTHENTICATION
#------------------------------------------------------------------------------
enable_pool_hba = on
pool_passwd = 'pool_passwd'
authentication_timeout = 60

#------------------------------------------------------------------------------
# LOGGING
#------------------------------------------------------------------------------
log_destination = 'stderr'
logdir = '/var/log/pgbalancer'
log_line_prefix = '%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h '
log_connections = on
log_min_messages = info`}
            </pre>
          </div>
      </section>

      <section id="validation">
        <h2>Configuration Validation</h2>

          <BashCodeBlock
            code={`# Test configuration file syntax (dry-run)
pgbalancer -f /etc/pgbalancer/pgbalancer.conf -n

# Check for configuration errors
pgbalancer -f /etc/pgbalancer/pgbalancer.conf -n -d 2>&1 | grep -i error

# Reload configuration without restart
pgbalancer reload

# Or using bctl
bctl reload

# Or via systemd
sudo systemctl reload pgbalancer`}
            title="Validate and Reload Configuration"
          />
      </section>

      <section id="parameters-reference">
        <h2>Configuration Parameters Reference</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700 text-sm">
              <thead className="bg-muted">
                <tr>
                  <th className="border border-gray-300 dark:border-gray-700 p-3 text-left">Category</th>
                  <th className="border border-gray-300 dark:border-gray-700 p-3 text-left">Key Parameters</th>
                  <th className="border border-gray-300 dark:border-gray-700 p-3 text-left">Default</th>
                  <th className="border border-gray-300 dark:border-gray-700 p-3 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 p-3 font-semibold">Connections</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3"><code>num_init_children</code></td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3">32</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3">Pre-forked child processes</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 p-3 font-semibold">AI Routing</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3"><code>enable_ai_load_balance</code></td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3">off</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3">Enable machine learning routing</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 p-3 font-semibold">AI Routing</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3"><code>ai_learning_rate</code></td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3">0.01</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3">Learning rate for weight updates</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 p-3 font-semibold">REST API</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3"><code>enable_rest_api</code></td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3">off</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3">Enable HTTP/JSON API server</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 p-3 font-semibold">REST API</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3"><code>rest_api_port</code></td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3">8080</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3">API server port</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 p-3 font-semibold">MQTT</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3"><code>enable_mqtt</code></td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3">off</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3">Enable MQTT event publishing</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 p-3 font-semibold">Health Check</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3"><code>health_check_period</code></td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3">0</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3">Health check interval (seconds)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 p-3 font-semibold">Load Balancing</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3"><code>load_balance_mode</code></td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3">off</td>
                  <td className="border border-gray-300 dark:border-gray-700 p-3">Distribute SELECT queries to replicas</td>
                </tr>
              </tbody>
            </table>
          </div>
      </section>
    </PostgresDocsLayout>
  );
}
