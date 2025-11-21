import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'Getting Started with pgBalancer | AI-Powered PostgreSQL Load Balancer',
  description: 'Install, configure, and launch pgBalancer in minutes. Includes build instructions, configuration samples, REST API usage, and verification steps.',
}

const tableOfContents: TocItem[] = [
  { id: 'requirements', title: 'Requirements' },
  { id: 'build-install', title: 'Build and Install' },
  { id: 'configure', title: 'Configure pgBalancer' },
  { id: 'start-verify', title: 'Start and Verify' },
]

const prevLink: NavLink = {
  href: '/docs/pgbalancer',
  label: 'pgBalancer Documentation',
}

const nextLink: NavLink = {
  href: '/docs/pgbalancer/configuration',
  label: 'Configuration Reference',
}

export default function PgBalancerGettingStarted() {
  return (
    <PostgresDocsLayout
      title="Getting Started with pgBalancer"
      version="pgBalancer Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <p>
        Deploy the AI-powered PostgreSQL load balancer with intelligent routing, REST API management, and MQTT event streaming. Follow this step-by-step guide to build from source, configure pools, and verify your installation.
      </p>

      <section id="requirements">
        <h2>Requirements</h2>
        <ul>
          <li>PostgreSQL 13–18 (server + development headers)</li>
          <li>Build toolchain: gcc/clang, make, autoconf, automake, libtool</li>
          <li>Optional: OpenSSL, PAM, LDAP for advanced authentication</li>
          <li>System access to manage <code>/etc/pgbalancer</code> configuration directory</li>
        </ul>
      </section>

      <section id="build-install">
        <h2>Build and Install</h2>
        <p>
          Compile pgBalancer from source using autotools, then install binaries and CLI utilities.
        </p>

        <h3>Step 1 · Clone Repository</h3>
        <BashCodeBlock
          title="Clone pgBalancer"
          code={`git clone https://github.com/pgElephant/pgBalancer.git
cd pgBalancer`}
        />

        <h3>Step 2 · Generate Build Scripts</h3>
        <BashCodeBlock
          title="Autotools"
          code={`autoreconf -fi
# Generates configure script and build files`}
        />

        <h3>Step 3 · Configure Options</h3>
        <BashCodeBlock
          title="Configure build"
          code={`# Basic configure
./configure

# Enable SSL, PAM, LDAP, custom prefix
./configure \\
  --with-openssl \\
  --with-pam \\
  --with-ldap \\
  --prefix=/usr/local/pgbalancer`}
        />

        <h3>Step 4 · Compile and Install</h3>
        <BashCodeBlock
          title="Build & deploy"
          code={`make -j$(nproc)
sudo make install

# Verify binaries
pgbalancer --version
bctl --version`}
        />
      </section>

      <section id="configure">
        <h2>Configure pgBalancer</h2>
        <p>
          pgBalancer uses .conf files (not YAML). Set up configuration, authentication, and directories as shown below.
        </p>

        <h3>Step 5 · Create Config Directory</h3>
        <BashCodeBlock
          title="Config directory"
          code={`sudo mkdir -p /etc/pgbalancer
sudo cp /usr/local/etc/pgbalancer.conf.sample /etc/pgbalancer/pgbalancer.conf
sudo cp /usr/local/etc/pool_hba.conf.sample /etc/pgbalancer/pool_hba.conf
sudo cp /usr/local/etc/pcp.conf.sample /etc/pgbalancer/pcp.conf
sudo chown -R postgres:postgres /etc/pgbalancer
sudo chmod 600 /etc/pgbalancer/pgbalancer.conf`}
        />

        <h3>Step 6 · Edit pgbalancer.conf</h3>
        <p>
          Configure listeners, backend servers, AI policies, and observability features.
        </p>
        <BashCodeBlock
          title="Sample configuration"
          code={`# Connection settings
listen_addresses = '*'
port = 5432
pcp_port = 9898

# Backend servers
backend_hostname0 = 'localhost'
backend_port0 = 5433
backend_flag0 = 'ALLOW_TO_FAILOVER'

backend_hostname1 = 'localhost'
backend_port1 = 5434
backend_flag1 = 'ALLOW_TO_FAILOVER'

# AI load balancing
enable_ai_load_balance = on
ai_learning_rate = 0.01
ai_exploration_rate = 0.1

# REST API
enable_rest_api = on
rest_api_port = 8080
rest_api_auth = off

# MQTT events
enable_mqtt = on
mqtt_broker_address = 'localhost'

# Pool settings
num_init_children = 32
max_pool = 4`}
        />

        <h3>Step 7 · Configure Authentication (pool_hba.conf)</h3>
        <BashCodeBlock
          title="pool_hba.conf"
          code={`# TYPE  DATABASE    USER        CIDR-ADDRESS        METHOD
local   all         all                               trust
host    all         all         127.0.0.1/32         trust
host    all         all         192.168.1.0/24       md5
host    all         all         ::1/128              trust`}
        />
      </section>

      <section id="start-verify">
        <h2>Start and Verify</h2>
        <p>
          Launch pgBalancer as a service, then validate health via CLI and REST API diagnostics.
        </p>

        <h3>Step 8 · Launch pgBalancer</h3>
        <BashCodeBlock
          title="Start service"
          code={`# Foreground (testing)
pgbalancer -n -f /etc/pgbalancer/pgbalancer.conf

# Background daemon
pgbalancer -f /etc/pgbalancer/pgbalancer.conf -D

# systemd
sudo systemctl start pgbalancer
sudo systemctl enable pgbalancer`}
        />

        <h3>Step 9 · Verify Health</h3>
        <BashCodeBlock
          title="Verification"
          code={`# CLI checks
bctl node-status --format=table
bctl pool-status --format=table

# REST API (if enabled)
curl http://localhost:8080/api/health
curl http://localhost:8080/api/backends | jq

# Test connection through pgBalancer
psql -h localhost -p 5432 -U postgres -c "SELECT version();"`}
        />
      </section>

      <section>
        <h2>Next Steps</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <a href="/docs/pgbalancer/configuration" className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
            <h3 className="font-semibold mb-2">⚙️ Configuration Guide</h3>
            <p className="text-sm">Full reference for AI tuning, routing policies, and security settings.</p>
          </a>
          <a href="/docs/pgbalancer/rest-api" className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
            <h3 className="font-semibold mb-2">🌐 REST API Reference</h3>
            <p className="text-sm">17 HTTP/JSON endpoints for cluster management.</p>
          </a>
          <a href="/docs/pgbalancer/cli-management" className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
            <h3 className="font-semibold mb-2">⌨️ bctl CLI Reference</h3>
            <p className="text-sm">Complete command-line interface documentation.</p>
          </a>
          <a href="/docs/pgbalancer/load-balancing" className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
            <h3 className="font-semibold mb-2">🤖 AI Load Balancing</h3>
            <p className="text-sm">Machine learning algorithms and intelligent routing.</p>
          </a>
        </div>
      </section>

      <section>
        <h2>Support Resources</h2>
        <ul>
          <li>
            <a href="https://github.com/pgElephant/pgBalancer/issues" target="_blank" rel="noopener noreferrer">
              GitHub Issues
            </a> - Report bugs and request features
          </li>
          <li>
            <a href="https://github.com/pgElephant/pgBalancer/discussions" target="_blank" rel="noopener noreferrer">
              GitHub Discussions
            </a> - Ask questions and share experiences
          </li>
          <li>
            <a href="https://pgelephant.github.io/pgBalancer/" target="_blank" rel="noopener noreferrer">
              Full Documentation
            </a> - Complete pgBalancer documentation site
          </li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
