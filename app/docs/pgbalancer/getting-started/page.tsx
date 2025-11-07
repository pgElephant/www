import { Metadata } from 'next'
import { Gauge } from 'lucide-react'
import GettingStartedLayout from '../../../../components/GettingStartedLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'Getting Started with pgBalancer | AI-Powered PostgreSQL Load Balancer',
  description: 'Install, configure, and launch pgBalancer in minutes. Includes build instructions, configuration samples, REST API usage, and verification steps.',
}

export default function PgBalancerGettingStarted() {
  return (
    <GettingStartedLayout
      product="pgBalancer"
      hero={{
        label: 'pgBalancer',
        labelIcon: <Gauge className="h-4 w-4" />, 
        labelAccent: 'purple',
        title: 'Getting Started with pgBalancer',
        description:
          'Deploy the AI-powered PostgreSQL load balancer with intelligent routing, REST API management, and MQTT event streaming. Follow this step-by-step guide to build from source, configure pools, and verify your installation.',
        cta: {
          href: '/docs/pgbalancer',
          label: 'View documentation hub',
        },
      }}
      theme={{
        pageBackground:
          'bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900',
        heroOverlay:
          'bg-gradient-to-r from-purple-600/20 to-pink-500/20 dark:from-purple-500/10 dark:to-pink-500/10',
        requirementsBorder: 'purple',
        requirementsBackground: 'bg-white/90 dark:bg-slate-900/60',
      }}
      requirements={{
        title: 'Requirements',
        items: [
          'PostgreSQL 13–18 (server + development headers)',
          'Build toolchain: gcc/clang, make, autoconf, automake, libtool',
          'Optional: OpenSSL, PAM, LDAP for advanced authentication',
          'System access to manage `/etc/pgbalancer` configuration directory',
        ],
      }}
      sections={[
        {
          title: 'Build and Install',
          description: 'Compile pgBalancer from source using autotools, then install binaries and CLI utilities.',
          cards: [
            {
              id: 'clone',
              title: 'Step 1 · Clone Repository',
              accent: 'purple',
              content: (
                <BashCodeBlock
                  title="Clone pgBalancer"
                  code={`git clone https://github.com/pgElephant/pgBalancer.git
cd pgBalancer`}
                />
              ),
            },
            {
              id: 'autotools',
              title: 'Step 2 · Generate Build Scripts',
              accent: 'emerald',
              content: (
                <BashCodeBlock
                  title="Autotools"
                  code={`autoreconf -fi
# Generates configure script and build files`}
                />
              ),
            },
            {
              id: 'configure',
              title: 'Step 3 · Configure Options',
              accent: 'blue',
              content: (
                <BashCodeBlock
                  title="Configure build"
                  code={`# Basic configure
./configure

# Enable SSL, PAM, LDAP, custom prefix
./configure \
  --with-openssl \
  --with-pam \
  --with-ldap \
  --prefix=/usr/local/pgbalancer`}
                />
              ),
            },
            {
              id: 'build',
              title: 'Step 4 · Compile and Install',
              accent: 'pink',
              content: (
                <BashCodeBlock
                  title="Build & deploy"
                  code={`make -j$(nproc)
sudo make install

# Verify binaries
pgbalancer --version
bctl --version`}
                />
              ),
            },
          ],
        },
        {
          title: 'Configure pgBalancer',
          description:
            'pgBalancer uses .conf files (not YAML). Set up configuration, authentication, and directories as shown below.',
          cards: [
            {
              id: 'config-dir',
              title: 'Step 5 · Create Config Directory',
              accent: 'indigo',
              content: (
                <BashCodeBlock
                  title="Config directory"
                  code={`sudo mkdir -p /etc/pgbalancer
sudo cp /usr/local/etc/pgbalancer.conf.sample /etc/pgbalancer/pgbalancer.conf
sudo cp /usr/local/etc/pool_hba.conf.sample /etc/pgbalancer/pool_hba.conf
sudo cp /usr/local/etc/pcp.conf.sample /etc/pgbalancer/pcp.conf
sudo chown -R postgres:postgres /etc/pgbalancer
sudo chmod 600 /etc/pgbalancer/pgbalancer.conf`}
                />
              ),
            },
            {
              id: 'config-file',
              title: 'Step 6 · Edit pgbalancer.conf',
              accent: 'purple',
              description: 'Configure listeners, backend servers, AI policies, and observability features.',
              content: (
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
              ),
            },
            {
              id: 'pool-hba',
              title: 'Step 7 · Configure Authentication (pool_hba.conf)',
              accent: 'amber',
              content: (
                <BashCodeBlock
                  title="pool_hba.conf"
                  code={`# TYPE  DATABASE    USER        CIDR-ADDRESS        METHOD
local   all         all                               trust
host    all         all         127.0.0.1/32         trust
host    all         all         192.168.1.0/24       md5
host    all         all         ::1/128              trust`}
                />
              ),
            },
          ],
        },
        {
          title: 'Start and Verify',
          description: 'Launch pgBalancer as a service, then validate health via CLI and REST API diagnostics.',
          cards: [
            {
              id: 'start',
              title: 'Step 8 · Launch pgBalancer',
              accent: 'rose',
              content: (
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
              ),
            },
            {
              id: 'verify',
              title: 'Step 9 · Verify Health',
              accent: 'cyan',
              content: (
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
              ),
            },
          ],
        },
      ]}
      nextSteps={[
        {
          href: '/docs/pgbalancer/configuration',
          title: '⚙️ Configuration Guide',
          description: 'Full reference for AI tuning, routing policies, and security settings.',
        },
        {
          href: '/docs/pgbalancer/rest-api',
          title: '🌐 REST API Reference',
          description: '17 HTTP/JSON endpoints for cluster management.',
        },
        {
          href: '/docs/pgbalancer/cli-management',
          title: '⌨️ bctl CLI Reference',
          description: 'Complete command-line interface documentation.',
        },
        {
          href: '/docs/pgbalancer/load-balancing',
          title: '🤖 AI Load Balancing',
          description: 'Machine learning algorithms and intelligent routing.',
        },
      ]}
      supportLinks={[
        {
          href: 'https://github.com/pgElephant/pgBalancer/issues',
          label: 'GitHub Issues',
          description: 'Report bugs and request features',
          external: true,
        },
        {
          href: 'https://github.com/pgElephant/pgBalancer/discussions',
          label: 'GitHub Discussions',
          description: 'Ask questions and share experiences',
          external: true,
        },
        {
          href: 'https://pgelephant.github.io/pgBalancer/',
          label: 'Full Documentation',
          description: 'Complete pgBalancer documentation site',
          external: true,
        },
      ]}
    />
  )
}
