import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'pgRaft Installation Guide | Build and Install the Raft Extension',
  description:
    'Install pgRaft on PostgreSQL 16–18. Set up dependencies, compile the C and Go components, update postgresql.conf, and verify cluster readiness.',
}

const tableOfContents: TocItem[] = [
  { id: 'prerequisites', title: 'Prerequisites' },
  { id: 'system-dependencies', title: 'Install system dependencies' },
  { id: 'build', title: 'Clone repository and build' },
  { id: 'install', title: 'Install pgRaft into PostgreSQL' },
  { id: 'configure', title: 'Update postgresql.conf and restart' },
  { id: 'verify', title: 'Create extension and verify' },
]

const prevLink: NavLink = {
  href: '/docs/pgraft/getting-started',
  label: 'Getting Started',
}

const nextLink: NavLink = {
  href: '/docs/pgraft/configuration',
  label: 'Configuration',
}

export default function PgraftInstallationPage() {
  return (
    <PostgresDocsLayout
      title="Install pgRaft on PostgreSQL 16–18"
      version="pgraft Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="prerequisites">
        <h2>Prerequisites</h2>
        <p>Before installing pgRaft, ensure you have:</p>
        <ul>
          <li>PostgreSQL 16, 17, or 18 installed with development headers</li>
          <li>Go toolchain 1.21+ available on PATH</li>
          <li>gcc/clang, make, and pkg-config installed on build host</li>
          <li>Ability to restart PostgreSQL after updating postgresql.conf</li>
        </ul>
        <p>Run <code>which pg_config</code> to confirm it points to the target PostgreSQL installation before compiling.</p>
      </section>

      <section id="system-dependencies">
        <h2>Install system dependencies</h2>
        <p>Install PostgreSQL packages and build prerequisites on your operating system.</p>

        <h3>Ubuntu / Debian</h3>
        <BashCodeBlock
          title="Install packages"
          code={`sudo apt-get update
sudo apt-get install -y postgresql-18 postgresql-server-dev-18 \
    postgresql-contrib-18 golang-go build-essential pkg-config`}
        />

        <h3>RHEL / Rocky / AlmaLinux</h3>
        <BashCodeBlock
          title="Install packages"
          code={`sudo yum install -y postgresql18 postgresql18-devel \
    postgresql18-contrib golang gcc make pkgconfig`}
        />

        <h3>macOS (Homebrew)</h3>
        <BashCodeBlock
          title="Install packages"
          code={`brew install postgresql@18 go pkg-config
brew link --overwrite postgresql@18`}
        />
      </section>

      <section id="build">
        <h2>Clone repository and build</h2>
        <p>Compile the PostgreSQL extension plus the Go-based Raft worker library.</p>

        <h3>Build pgRaft binaries</h3>
        <BashCodeBlock
          title="Compile"
          code={`git clone https://github.com/pgElephant/pgraft.git
cd pgraft
make clean && make

# Override PostgreSQL location as needed
# make clean && make PG_CONFIG=/path/to/pg_config`}
        />

        <h3>Expected artifacts</h3>
        <BashCodeBlock
          title="Validate output"
          code={`ls -lh ./dist
# pgraft.so      (SQL extension)
# pgraft_go.so   (embedded Raft worker)`}
        />
      </section>

      <section id="install">
        <h2>Install pgRaft into PostgreSQL</h2>
        <p>Install the compiled shared libraries and SQL files into PostgreSQL's extension directories.</p>
        <BashCodeBlock
          title="make install"
          code={`sudo make install

# Validate install directories
pg_config --libdir
ls -lh $(pg_config --libdir)/pgraft*`}
        />
      </section>

      <section id="configure">
        <h2>Update postgresql.conf and restart</h2>
        <p>Load pgRaft at startup and define node identity for your cluster.</p>

        <h3>Configure Raft identity</h3>
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

        <h3>Restart PostgreSQL</h3>
        <BashCodeBlock
          title="Apply configuration"
          code={`sudo systemctl restart postgresql   # systemd
# or
brew services restart postgresql@18  # macOS`}
        />
      </section>

      <section id="verify">
        <h2>Create extension and verify</h2>
        <p>Register pgRaft in your database, initialize metadata, and confirm worker health.</p>

        <h3>Enable pgRaft</h3>
        <SqlCodeBlock
          title="Initialize node"
          code={`CREATE EXTENSION pgraft;
SELECT pgraft_init();
SELECT extversion
FROM   pg_extension
WHERE  extname = 'pgraft';`}
        />

        <h3>Verify worker state</h3>
        <SqlCodeBlock
          title="Diagnostics"
          code={`SELECT pgraft_is_leader()  AS is_leader,
       pgraft_get_term()   AS current_term,
       pgraft_get_worker_state() AS worker_state;

\df+ pgraft_*`}
        />
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/pgraft/getting-started">Cluster bootstrap</a> - Promote the first leader and add followers to your Raft cluster.</li>
          <li><a href="/docs/pgraft/configuration">Configuration reference</a> - Tune Raft timeouts, log retention, and networking once installation is complete.</li>
          <li><a href="/docs/pgraft/troubleshooting">Troubleshooting playbooks</a> - Resolve build failures, worker startup issues, and connectivity errors.</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
