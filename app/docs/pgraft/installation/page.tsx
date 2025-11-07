import { Metadata } from 'next'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'pgraft Installation Guide | Build and Install the Raft Extension',
  description: 'Step-by-step instructions to build pgraft from source, install dependencies, enable the extension, and verify the PostgreSQL Raft cluster setup.',
}

export default function PgraftInstallationPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold mb-4">pgraft Installation Guide</h1>
        <p className="text-lg text-muted-foreground">
          Install pgraft from source on any PostgreSQL 16–18 server. This guide covers dependency setup,
          compilation of the C and Go components, configuration changes, and verification commands.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">1. Install System Dependencies</h2>
        <p className="text-muted-foreground mb-4">
          pgraft links against PostgreSQL server headers and embeds the etcd-io/raft Go library. Install the packages below before building.
        </p>
        <BashCodeBlock
          title="Install prerequisites"
          code={`# Ubuntu / Debian (adjust PostgreSQL version as needed)
sudo apt-get update
sudo apt-get install postgresql-18 postgresql-server-dev-18 golang-go build-essential pkg-config

# RHEL / Rocky Linux / AlmaLinux
sudo yum install postgresql18 postgresql18-devel golang gcc make pkgconfig

# macOS (Homebrew)
brew install postgresql@18 go pkg-config
brew link --overwrite postgresql@18`}
        />
        <p className="text-sm text-muted-foreground mt-2">
          Ensure <code>pg_config</code> resolves to the PostgreSQL instance where you plan to deploy pgraft.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">2. Clone Repository and Build</h2>
        <p className="text-muted-foreground mb-4">
          Compile pgraft using the provided <code>Makefile</code>. The build step compiles both the PostgreSQL extension and the Go Raft worker library.
        </p>
        <BashCodeBlock
          title="Build pgraft"
          code={`git clone https://github.com/pgElephant/pgraft.git
cd pgraft
make clean && make

# Optional: build against a specific PostgreSQL install
# make clean && make PG_CONFIG=/path/to/pg_config`}
        />
        <p className="text-sm text-muted-foreground mt-2">
          On success, the build outputs <code>pgraft.so</code> (SQL extension) and <code>pgraft_go.so</code> (Raft worker library).
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">3. Install the Extension</h2>
        <p className="text-muted-foreground mb-4">
          Install pgraft into PostgreSQL&apos;s extension directory. Root privileges are typically required for system-wide installs.
        </p>
        <BashCodeBlock
          title="Install binaries"
          code={`sudo make install

# Validate artifacts landed in the target libdir
pg_config --libdir
ls -lh $(pg_config --libdir)/pgraft*`}
        />
        <p className="text-sm text-muted-foreground mt-2">
          If you deploy into a custom PostgreSQL build, use <code>make install PG_CONFIG=/path/to/pg_config</code>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">4. Update postgresql.conf</h2>
        <p className="text-muted-foreground mb-4">
          pgraft must be loaded at startup and provided with Raft identity information. Append the following settings to <code>postgresql.conf</code> and restart PostgreSQL.
        </p>
        <BashCodeBlock
          title="postgresql.conf"
          code={`shared_preload_libraries = 'pgraft'

# Node identity (adjust for each server)
pgraft.cluster_id = 'production-cluster'
pgraft.node_id = 1
pgraft.address = '10.0.0.11'
pgraft.port = 7001
pgraft.data_dir = '/var/lib/postgresql/pgraft'

# Recommended durability settings
synchronous_commit = on
wal_level = logical
max_wal_senders = 10`}
        />
        <p className="text-sm text-muted-foreground mt-2">
          Restart PostgreSQL after saving configuration changes:
        </p>
        <BashCodeBlock
          title="Restart PostgreSQL"
          code={`# systemd
sudo systemctl restart postgresql

# Homebrew (macOS)
brew services restart postgresql@18`}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">5. Create the Extension & Verify</h2>
        <p className="text-muted-foreground mb-4">
          Connect with <code>psql</code>, create the extension in your database, and confirm that Raft services are running.
        </p>
        <SqlCodeBlock
          title="Create pgraft extension"
          code={`-- Connect to the target database first
CREATE EXTENSION pgraft;

-- Initialize the Raft metadata store on this node
SELECT pgraft_init();

-- Confirm extension installation
SELECT extversion FROM pg_extension WHERE extname = 'pgraft';`}
        />
        <SqlCodeBlock
          title="Health checks"
          code={`-- Validate worker and leader state
SELECT pgraft_is_leader() AS is_leader,
       pgraft_get_term() AS current_term,
       pgraft_get_worker_state() AS worker_state;

-- List available management functions
\df+ pgraft_*`}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Troubleshooting</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Build failures</h3>
            <p className="text-sm text-muted-foreground">
              Confirm <code>pg_config</code> matches your target PostgreSQL version and verify Go 1.21+ is on the <code>PATH</code>.
              Re-run <code>make clean</code> before rebuilding after dependency changes.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Extension won&apos;t load</h3>
            <p className="text-sm text-muted-foreground">
              Check PostgreSQL logs for shared library errors. Ensure <code>shared_preload_libraries</code> contains pgraft and restart the server.
              If SELinux/AppArmor is enabled, allow the pgraft shared libraries.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Worker not running</h3>
            <p className="text-sm text-muted-foreground">
              Run <code>SELECT pgraft_get_worker_state();</code>. If it returns <code>stopped</code>, confirm that the Go runtime library
              (<code>pgraft_go.so</code>) deployed into PostgreSQL&apos;s library directory.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Network connectivity</h3>
            <p className="text-sm text-muted-foreground">
              Verify that the configured Raft ports are open between nodes. pgraft requires bi-directional TCP connectivity for log replication.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
