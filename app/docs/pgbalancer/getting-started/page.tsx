import { Metadata } from 'next';
import BashCodeBlock from '../../../../components/BashCodeBlock';

export const metadata: Metadata = {
  title: 'Getting Started with pgBalancer | AI-Powered PostgreSQL Load Balancer',
  description: 'Quick start guide for installing and configuring pgBalancer - AI-powered connection pooler with intelligent load balancing and REST API management.',
};

export default function PgBalancerGettingStarted() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Getting Started with pgBalancer</h1>
        <p className="text-lg text-muted-foreground">
          Install and configure pgBalancer in under 10 minutes. This guide covers installation from source, basic configuration, and running your first pgBalancer instance with AI-powered load balancing.
        </p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2">📦 What You'll Need</h3>
        <ul className="space-y-1 text-sm">
          <li>• PostgreSQL 13, 14, 15, 16, 17, or 18</li>
          <li>• Development tools: gcc/clang, make, autoconf, automake, libtool</li>
          <li>• PostgreSQL development headers (postgresql-devel or postgresql-server-dev)</li>
          <li>• Optional: OpenSSL, PAM, LDAP for advanced features</li>
        </ul>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Installation from Source</h2>

        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-lg font-semibold mb-2">Step 1: Clone Repository</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Clone the pgBalancer repository from GitHub.
            </p>
            <BashCodeBlock
              code={`# Clone pgBalancer repository
git clone https://github.com/pgElephant/pgBalancer.git
cd pgBalancer`}
              title="Clone Repository"
            />
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="text-lg font-semibold mb-2">Step 2: Generate Build Scripts</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Generate the configure script using autotools.
            </p>
            <BashCodeBlock
              code={`# Generate configure script
autoreconf -fi

# This creates the configure script and necessary build files`}
              title="Generate Configure Script"
            />
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="text-lg font-semibold mb-2">Step 3: Configure Build</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Configure pgBalancer with desired options. Enable SSL, PAM, and LDAP as needed.
            </p>
            <BashCodeBlock
              code={`# Basic configuration
./configure

# Or with advanced features
./configure \\
  --with-openssl \\
  --with-pam \\
  --with-ldap \\
  --prefix=/usr/local/pgbalancer

# Check configuration summary
# Look for "REST API support: yes" and "MQTT support: yes"`}
              title="Configure Build Options"
            />
          </div>

          <div className="border-l-4 border-orange-500 pl-4">
            <h3 className="text-lg font-semibold mb-2">Step 4: Compile and Install</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Build and install pgBalancer system-wide.
            </p>
            <BashCodeBlock
              code={`# Compile pgBalancer
make -j$(nproc)

# Install system-wide (requires sudo)
sudo make install

# Verify installation
pgbalancer --version
bctl --version`}
              title="Build and Install"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Quick Start Configuration</h2>

        <div className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h3 className="text-lg font-semibold mb-2">Step 5: Create Configuration Directory</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Set up the configuration directory and copy sample config files.
            </p>
            <BashCodeBlock
              code={`# Create configuration directory
sudo mkdir -p /etc/pgbalancer

# Copy sample configuration files
sudo cp /usr/local/etc/pgbalancer.conf.sample /etc/pgbalancer/pgbalancer.conf
sudo cp /usr/local/etc/pool_hba.conf.sample /etc/pgbalancer/pool_hba.conf
sudo cp /usr/local/etc/pcp.conf.sample /etc/pgbalancer/pcp.conf

# Set proper permissions
sudo chown -R postgres:postgres /etc/pgbalancer
sudo chmod 600 /etc/pgbalancer/pgbalancer.conf`}
              title="Create Configuration Directory"
            />
          </div>

          <div className="border-l-4 border-pink-500 pl-4">
            <h3 className="text-lg font-semibold mb-2">Step 6: Configure Backend Servers</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Edit <code>/etc/pgbalancer/pgbalancer.conf</code> to define your PostgreSQL backend servers.
              pgBalancer uses <strong>.conf file format</strong>, not YAML.
            </p>
            
            <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">Basic Configuration (/etc/pgbalancer/pgbalancer.conf)</h3>
              <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto text-sm">
{`# pgBalancer Configuration File (.conf format)

#------------------------------------------------------------------------------
# CONNECTIONS
#------------------------------------------------------------------------------
listen_addresses = '*'
port = 5432
socket_dir = '/var/run/pgbalancer'
pcp_listen_addresses = '*'
pcp_port = 9898

#------------------------------------------------------------------------------
# BACKEND POSTGRESQL SERVERS
#------------------------------------------------------------------------------
backend_hostname0 = 'localhost'
backend_port0 = 5433
backend_weight0 = 1
backend_data_directory0 = '/var/lib/postgresql/16/main1'
backend_flag0 = 'ALLOW_TO_FAILOVER'

backend_hostname1 = 'localhost'
backend_port1 = 5434
backend_weight1 = 1
backend_data_directory1 = '/var/lib/postgresql/16/main2'
backend_flag1 = 'ALLOW_TO_FAILOVER'

#------------------------------------------------------------------------------
# AI LOAD BALANCING
#------------------------------------------------------------------------------
enable_ai_load_balance = on
ai_learning_rate = 0.01
ai_exploration_rate = 0.1
ai_weight_update_interval = 60

#------------------------------------------------------------------------------
# REST API
#------------------------------------------------------------------------------
enable_rest_api = on
rest_api_port = 8080
rest_api_auth = off
rest_api_secret = 'your-secret-key-here'

#------------------------------------------------------------------------------
# MQTT EVENT STREAMING
#------------------------------------------------------------------------------
enable_mqtt = on
mqtt_broker_address = 'localhost'
mqtt_broker_port = 1883
mqtt_topic_prefix = 'pgbalancer'

#------------------------------------------------------------------------------
# CONNECTION POOLING
#------------------------------------------------------------------------------
num_init_children = 32
max_pool = 4
child_life_time = 300
child_max_connections = 0
connection_life_time = 0
client_idle_limit = 0

#------------------------------------------------------------------------------
# LOAD BALANCING
#------------------------------------------------------------------------------
load_balance_mode = on
ignore_leading_white_space = on

#------------------------------------------------------------------------------
# HEALTH CHECK
#------------------------------------------------------------------------------
health_check_period = 10
health_check_timeout = 5
health_check_user = 'postgres'
health_check_password = ''
health_check_database = 'postgres'

#------------------------------------------------------------------------------
# FAILOVER
#------------------------------------------------------------------------------
failover_command = ''
failback_command = ''
fail_over_on_backend_error = on

#------------------------------------------------------------------------------
# LOGGING
#------------------------------------------------------------------------------
log_destination = 'stderr'
log_line_prefix = '%t: pid %p: '
log_connections = off
log_hostname = off
log_statement = off`}
              </pre>
            </div>
          </div>

          <div className="border-l-4 border-indigo-500 pl-4">
            <h3 className="text-lg font-semibold mb-2">Step 7: Configure Authentication</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Set up pool_hba.conf for client authentication (similar to pg_hba.conf).
            </p>
            
            <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">pool_hba.conf</h3>
              <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto text-sm">
{`# pgBalancer Client Authentication Configuration
# TYPE  DATABASE    USER        CIDR-ADDRESS        METHOD

# Local connections
local   all         all                             trust

# IPv4 local connections
host    all         all         127.0.0.1/32        trust

# IPv4 connections from local network
host    all         all         192.168.1.0/24      md5

# IPv6 local connections
host    all         all         ::1/128             trust`}
              </pre>
            </div>
          </div>

          <div className="border-l-4 border-yellow-500 pl-4">
            <h3 className="text-lg font-semibold mb-2">Step 8: Start pgBalancer</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Launch pgBalancer with your configuration file.
            </p>
            <BashCodeBlock
              code={`# Start pgBalancer in foreground (for testing)
pgbalancer -n -f /etc/pgbalancer/pgbalancer.conf

# Start pgBalancer as daemon (production)
pgbalancer -f /etc/pgbalancer/pgbalancer.conf -D

# Or use systemd service
sudo systemctl start pgbalancer
sudo systemctl enable pgbalancer
sudo systemctl status pgbalancer`}
              title="Start pgBalancer"
            />
          </div>

          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="text-lg font-semibold mb-2">Step 9: Verify Installation</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Test connectivity and check backend status using bctl or REST API.
            </p>
            <BashCodeBlock
              code={`# Check backend nodes status
bctl node-status --format=table

# View pool status
bctl pool-status --format=table

# Check REST API (if enabled)
curl http://localhost:8080/api/health
curl http://localhost:8080/api/backends
curl http://localhost:8080/api/stats

# Test PostgreSQL connection through pgBalancer
psql -h localhost -p 5432 -U postgres -c "SELECT version();"

# Check which backend handled the query
bctl stats --format=table`}
              title="Verify Installation"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Using bctl CLI Tool</h2>
        <p className="text-muted-foreground mb-4">
          bctl is a unified command-line interface for managing pgBalancer. It replaces 10+ pcp_* commands with a single tool.
        </p>

        <BashCodeBlock
          code={`# Display help
bctl --help

# Node management
bctl node-status                    # Show all backend nodes
bctl node-status --format=json      # JSON output
bctl node-attach 1                  # Attach node 1
bctl node-detach 1                  # Detach node 1

# Pool management
bctl pool-status                    # Show connection pools
bctl pool-status --format=table     # Table format

# Statistics
bctl stats                          # Show statistics
bctl proc-count                     # Process count
bctl proc-info 1234                 # Info for PID 1234

# Health monitoring
bctl health-check 0                 # Run health check on node 0
bctl watchdog-info                  # Watchdog status

# Configuration reload
bctl reload                         # Reload configuration`}
          title="bctl Command Examples"
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">REST API Quick Start</h2>
        <p className="text-muted-foreground mb-4">
          If you enabled REST API (port 8080 by default), you can manage pgBalancer using HTTP/JSON endpoints.
        </p>

        <BashCodeBlock
          code={`# Check API health
curl http://localhost:8080/api/health

# Get backend nodes status
curl http://localhost:8080/api/backends | jq

# Get pool statistics
curl http://localhost:8080/api/stats | jq

# Get process information
curl http://localhost:8080/api/processes | jq

# Get configuration info
curl http://localhost:8080/api/config | jq

# With JWT authentication (if enabled)
# First, login to get token
TOKEN=$(curl -X POST http://localhost:8080/api/login \\
  -H "Content-Type: application/json" \\
  -d '{"username":"admin","password":"your-password"}' | jq -r .token)

# Use token for authenticated requests
curl http://localhost:8080/api/backends \\
  -H "Authorization: Bearer $TOKEN" | jq`}
          title="REST API Examples"
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Systemd Service Setup</h2>
        <p className="text-muted-foreground mb-4">
          For production deployments, run pgBalancer as a systemd service.
        </p>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">/etc/systemd/system/pgbalancer.service</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto text-sm">
{`[Unit]
Description=pgBalancer - AI-Powered PostgreSQL Connection Pooler
After=network.target postgresql.service
Wants=postgresql.service

[Service]
Type=forking
User=postgres
Group=postgres

ExecStart=/usr/local/bin/pgbalancer -f /etc/pgbalancer/pgbalancer.conf -D
ExecReload=/bin/kill -HUP $MAINPID
ExecStop=/usr/local/bin/pgbalancer -f /etc/pgbalancer/pgbalancer.conf stop

# Restart on failure
Restart=on-failure
RestartSec=5s

# Security hardening
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/var/run/pgbalancer /var/log/pgbalancer

[Install]
WantedBy=multi-user.target`}
          </pre>
        </div>

        <BashCodeBlock
          code={`# Enable and start the service
sudo systemctl daemon-reload
sudo systemctl enable pgbalancer
sudo systemctl start pgbalancer

# Check status
sudo systemctl status pgbalancer

# View logs
sudo journalctl -u pgbalancer -f`}
          title="Manage Systemd Service"
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Configuration File Options</h2>
        <p className="text-muted-foreground mb-4">
          pgBalancer uses <strong>.conf file format</strong> (not YAML). Here are the key configuration sections:
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">🔌 Connection Settings</h4>
            <ul className="text-sm space-y-1">
              <li>• <code>listen_addresses</code>: Client connections</li>
              <li>• <code>port</code>: PostgreSQL port (default: 5432)</li>
              <li>• <code>pcp_port</code>: PCP admin port (default: 9898)</li>
              <li>• <code>socket_dir</code>: Unix socket directory</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">🤖 AI Load Balancing</h4>
            <ul className="text-sm space-y-1">
              <li>• <code>enable_ai_load_balance</code>: Enable AI routing</li>
              <li>• <code>ai_learning_rate</code>: Learning rate (0.01)</li>
              <li>• <code>ai_exploration_rate</code>: Exploration (0.1)</li>
              <li>• <code>ai_weight_update_interval</code>: Update frequency</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">🌐 REST API</h4>
            <ul className="text-sm space-y-1">
              <li>• <code>enable_rest_api</code>: Enable HTTP API</li>
              <li>• <code>rest_api_port</code>: API port (default: 8080)</li>
              <li>• <code>rest_api_auth</code>: JWT authentication</li>
              <li>• <code>rest_api_secret</code>: Secret key for JWT</li>
            </ul>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">📡 MQTT Events</h4>
            <ul className="text-sm space-y-1">
              <li>• <code>enable_mqtt</code>: Enable MQTT streaming</li>
              <li>• <code>mqtt_broker_address</code>: Broker hostname</li>
              <li>• <code>mqtt_broker_port</code>: Broker port (1883)</li>
              <li>• <code>mqtt_topic_prefix</code>: Event topic prefix</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Testing Your Installation</h2>

        <BashCodeBlock
          code={`# Test basic connectivity
psql -h localhost -p 5432 -U postgres -d postgres -c "SELECT 1;"

# Run some queries to trigger AI learning
for i in {1..100}; do
  psql -h localhost -p 5432 -U postgres -d postgres -c "SELECT pg_sleep(0.01);"
done

# Check AI load balancing statistics
bctl stats --format=table

# View backend health scores
curl http://localhost:8080/api/backends | jq '.[] | {id, hostname, port, health_score, query_count}'

# Check MQTT events (if configured)
mosquitto_sub -h localhost -t 'pgbalancer/#' -v`}
          title="Test Installation"
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Troubleshooting</h2>

        <div className="space-y-4">
          <div className="p-4 border border-yellow-500 rounded-lg">
            <h4 className="font-semibold mb-2">⚠️ Common Issues</h4>
            
            <div className="space-y-3 text-sm">
              <div>
                <strong>pgBalancer won't start:</strong>
                <ul className="ml-4 mt-1 space-y-1">
                  <li>• Check logs: <code>tail -f /var/log/pgbalancer/pgbalancer.log</code></li>
                  <li>• Verify configuration: <code>pgbalancer -f /etc/pgbalancer/pgbalancer.conf -n</code></li>
                  <li>• Check port conflicts: <code>lsof -i :5432</code></li>
                </ul>
              </div>

              <div>
                <strong>Can't connect to backends:</strong>
                <ul className="ml-4 mt-1 space-y-1">
                  <li>• Verify PostgreSQL is running: <code>pg_ctl status</code></li>
                  <li>• Check pg_hba.conf allows pgBalancer connections</li>
                  <li>• Test direct connection: <code>psql -h backend_host -p backend_port</code></li>
                </ul>
              </div>

              <div>
                <strong>REST API not responding:</strong>
                <ul className="ml-4 mt-1 space-y-1">
                  <li>• Verify <code>enable_rest_api = on</code> in config</li>
                  <li>• Check API port: <code>lsof -i :8080</code></li>
                  <li>• Test endpoint: <code>curl http://localhost:8080/api/health</code></li>
                </ul>
              </div>
            </div>
          </div>

          <BashCodeBlock
            code={`# View pgBalancer logs
tail -f /var/log/pgbalancer/pgbalancer.log

# Check process status
ps aux | grep pgbalancer

# Test configuration file syntax
pgbalancer -f /etc/pgbalancer/pgbalancer.conf -n

# Stop pgBalancer gracefully
pgbalancer -f /etc/pgbalancer/pgbalancer.conf stop

# Or with systemd
sudo systemctl stop pgbalancer`}
            title="Troubleshooting Commands"
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <a href="/docs/pgbalancer/configuration" className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
            <h3 className="font-semibold mb-2">⚙️ Complete Configuration Guide</h3>
            <p className="text-sm text-muted-foreground">All configuration parameters, AI tuning, and advanced options</p>
          </a>
          <a href="/docs/pgbalancer/rest-api" className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
            <h3 className="font-semibold mb-2">🌐 REST API Reference</h3>
            <p className="text-sm text-muted-foreground">17 HTTP/JSON endpoints for cluster management</p>
          </a>
          <a href="/docs/pgbalancer/cli-management" className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
            <h3 className="font-semibold mb-2">⌨️ bctl CLI Reference</h3>
            <p className="text-sm text-muted-foreground">Complete command-line interface documentation</p>
          </a>
          <a href="/docs/pgbalancer/load-balancing" className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
            <h3 className="font-semibold mb-2">🤖 AI Load Balancing</h3>
            <p className="text-sm text-muted-foreground">Machine learning algorithms and intelligent routing</p>
          </a>
        </div>
      </section>

      <section className="bg-muted p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Need Help?</h2>
        <p className="text-muted-foreground mb-4">
          Join our community for support and discussion:
        </p>
        <ul className="space-y-2">
          <li>• <a href="https://github.com/pgElephant/pgBalancer/issues" className="text-blue-600 hover:underline">GitHub Issues</a> - Report bugs and request features</li>
          <li>• <a href="https://github.com/pgElephant/pgBalancer/discussions" className="text-blue-600 hover:underline">GitHub Discussions</a> - Ask questions and share experiences</li>
          <li>• <a href="https://pgelephant.github.io/pgBalancer/" className="text-blue-600 hover:underline">Full Documentation</a> - Complete pgBalancer documentation</li>
        </ul>
      </section>
    </div>
  );
}
