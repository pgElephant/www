import { Metadata } from 'next'
import { Database } from 'lucide-react'
import GettingStartedLayout from '../../../../components/GettingStartedLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'pgRaft Installation Guide | Build and Install the Raft Extension',
  description:
    'Install pgRaft on PostgreSQL 16–18. Set up dependencies, compile the C and Go components, update postgresql.conf, and verify cluster readiness.',
}

export default function PgraftInstallationPage() {
  return (
    <GettingStartedLayout
      product="pgRaft"
      hero={{
        label: 'pgRaft',
        labelIcon: <Database className="h-4 w-4" />, 
        labelAccent: 'blue',
        title: 'Install pgRaft on PostgreSQL 16–18',
        description:
          'Install prerequisites, compile pgRaft from source, and configure Raft node identity. Follow the cards below for Ubuntu/Debian, RHEL, and macOS builds.',
        cta: {
          href: '/docs/pgraft/getting-started',
          label: 'Continue to getting started guide',
        },
      }}
      theme={{
        pageBackground:
          'bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900',
        heroOverlay:
          'bg-gradient-to-r from-blue-600/20 to-purple-600/20 dark:from-blue-500/10 dark:to-purple-500/10',
        requirementsBorder: 'blue',
        requirementsBackground: 'bg-white/90 dark:bg-slate-900/60',
      }}
      requirements={{
        title: 'Prerequisites',
        items: [
          'PostgreSQL 16, 17, or 18 installed with development headers',
          'Go toolchain 1.21+ available on PATH',
          'gcc/clang, make, and pkg-config installed on build host',
          'Ability to restart PostgreSQL after updating postgresql.conf',
        ],
        note: 'Run `which pg_config` to confirm it points to the target PostgreSQL installation before compiling.',
      }}
      sections={[
        {
          title: 'Install system dependencies',
          description: 'Install PostgreSQL packages and build prerequisites on your operating system.',
          cards: [
            {
              id: 'deps-ubuntu',
              title: 'Ubuntu / Debian',
              accent: 'blue',
              content: (
                <BashCodeBlock
                  title="Install packages"
                  code={`sudo apt-get update
sudo apt-get install -y postgresql-18 postgresql-server-dev-18 \
    postgresql-contrib-18 golang-go build-essential pkg-config`}
                />
              ),
            },
            {
              id: 'deps-rhel',
              title: 'RHEL / Rocky / AlmaLinux',
              accent: 'purple',
              content: (
                <BashCodeBlock
                  title="Install packages"
                  code={`sudo yum install -y postgresql18 postgresql18-devel \
    postgresql18-contrib golang gcc make pkgconfig`}
                />
              ),
            },
            {
              id: 'deps-macos',
              title: 'macOS (Homebrew)',
              accent: 'cyan',
              content: (
                <BashCodeBlock
                  title="Install packages"
                  code={`brew install postgresql@18 go pkg-config
brew link --overwrite postgresql@18`}
                />
              ),
            },
          ],
        },
        {
          title: 'Clone repository and build',
          description: 'Compile the PostgreSQL extension plus the Go-based Raft worker library.',
          cards: [
            {
              id: 'build-source',
              title: 'Build pgRaft binaries',
              accent: 'emerald',
              content: (
                <BashCodeBlock
                  title="Compile"
                  code={`git clone https://github.com/pgElephant/pgraft.git
cd pgraft
make clean && make

# Override PostgreSQL location as needed
# make clean && make PG_CONFIG=/path/to/pg_config`}
                />
              ),
            },
            {
              id: 'build-output',
              title: 'Expected artifacts',
              accent: 'indigo',
              content: (
                <BashCodeBlock
                  title="Validate output"
                  code={`ls -lh ./dist
# pgraft.so      (SQL extension)
# pgraft_go.so   (embedded Raft worker)`}
                />
              ),
            },
          ],
        },
        {
          title: 'Install pgRaft into PostgreSQL',
          description: 'Install the compiled shared libraries and SQL files into PostgreSQL’s extension directories.',
          cards: [
            {
              id: 'install-system',
              title: 'Install binaries',
              accent: 'rose',
              content: (
                <BashCodeBlock
                  title="make install"
                  code={`sudo make install

# Validate install directories
pg_config --libdir
ls -lh $(pg_config --libdir)/pgraft*`}
                />
              ),
            },
          ],
        },
        {
          title: 'Update postgresql.conf and restart',
          description: 'Load pgRaft at startup and define node identity for your cluster.',
          cards: [
            {
              id: 'postgres-conf',
              title: 'Configure Raft identity',
              accent: 'blue',
              content: (
                <BashCodeBlock
                  title="postgresql.conf"
                  code={`shared_preload_libraries = 'pgraft'

# Node identity (adjust per node)
pgraft.cluster_id = 'production-cluster'
pgraft.node_id = 1
pgraft.address = '10.0.0.11'
pgraft.port = 7001
pgraft.data_dir = '/var/lib/postgresql/pgraft'

# Recommended WAL settings
synchronous_commit = on
wal_level = logical
max_wal_senders = 10`}
                />
              ),
            },
            {
              id: 'restart-postgres',
              title: 'Restart PostgreSQL',
              accent: 'emerald',
              content: (
                <BashCodeBlock
                  title="Apply configuration"
                  code={`sudo systemctl restart postgresql   # systemd
# or
brew services restart postgresql@18  # macOS`}
                />
              ),
            },
          ],
        },
        {
          title: 'Create extension and verify',
          description: 'Register pgRaft in your database, initialize metadata, and confirm worker health.',
          cards: [
            {
              id: 'create-extension',
              title: 'Enable pgRaft',
              accent: 'cyan',
              content: (
                <SqlCodeBlock
                  title="Initialize node"
                  code={`CREATE EXTENSION pgraft;
SELECT pgraft_init();
SELECT extversion
FROM   pg_extension
WHERE  extname = 'pgraft';`}
                />
              ),
            },
            {
              id: 'health-checks',
              title: 'Verify worker state',
              accent: 'purple',
              content: (
                <SqlCodeBlock
                  title="Diagnostics"
                  code={`SELECT pgraft_is_leader()  AS is_leader,
       pgraft_get_term()   AS current_term,
       pgraft_get_worker_state() AS worker_state;

\df+ pgraft_*`}
                />
              ),
            },
          ],
        },
      ]}
      nextSteps={[
        {
          href: '/docs/pgraft/getting-started',
          title: '📘 Cluster bootstrap',
          description: 'Promote the first leader and add followers to your Raft cluster.',
        },
        {
          href: '/docs/pgraft/configuration',
          title: '⚙️ Configuration reference',
          description: 'Tune Raft timeouts, log retention, and networking once installation is complete.',
        },
        {
          href: '/docs/pgraft/troubleshooting',
          title: '🛠 Troubleshooting playbooks',
          description: 'Resolve build failures, worker startup issues, and connectivity errors.',
        },
      ]}
      supportLinks={[
        {
          href: 'https://github.com/pgElephant/pgraft/issues',
          label: 'GitHub Issues',
          description: 'Report installation bugs or request platform support.',
          external: true,
        },
        {
          href: 'https://github.com/pgElephant/pgraft/discussions',
          label: 'GitHub Discussions',
          description: 'Share install experiences and ask community questions.',
          external: true,
        },
      ]}
    />
  )
}
