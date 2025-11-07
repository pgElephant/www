import { Metadata } from 'next'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Getting Started with pgraft | PostgreSQL Raft Consensus Extension',
  description: 'Install pgraft, configure Raft consensus, and build a production-ready PostgreSQL cluster with automatic leader election and failover.',
}

export default function GettingStartedPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold mb-4">Getting Started with pgraft</h1>
        <p className="text-lg text-muted-foreground">
          pgraft embeds the Raft consensus protocol directly inside PostgreSQL to deliver deterministic leader election,
          strong consistency, and automated failover. Follow this guide to install the extension, register your first node,
          and form a resilient cluster in minutes.
        </p>
      </div>

      <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900/40 dark:to-blue-900/20 border border-slate-200 dark:border-slate-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-slate-100">✅ Standalone PostgreSQL Extension</h3>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          pgraft requires only PostgreSQL 16, 17, or 18 plus Go 1.21+. No external proxies or sidecars are needed—the Raft implementation runs entirely inside the database server.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Install pgraft in 3 Steps</h2>
        <ol className="space-y-6">
          <li className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-lg font-semibold mb-2">Step 1: Install Build Dependencies</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Install PostgreSQL server headers, Go toolchain, and build essentials on your platform.
            </p>
            <BashCodeBlock
              title="Install prerequisites"
              code={`# Ubuntu / Debian
sudo apt-get update
sudo apt-get install postgresql-18 postgresql-server-dev-18 golang-go build-essential

# RHEL / Rocky / AlmaLinux
sudo yum install postgresql18 postgresql18-devel golang gcc make

# macOS (Homebrew)
brew install postgresql@18 go`}
            />
          </li>
          <li className="border-l-4 border-green-500 pl-4">
            <h3 className="text-lg font-semibold mb-2">Step 2: Build the Extension</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Clone the official repository, compile the C and Go components, and install the shared library into PostgreSQL.
            </p>
            <BashCodeBlock
              title="Build from source"
              code={`git clone https://github.com/pgElephant/pgraft.git
cd pgraft
make clean && make
sudo make install`}
            />
          </li>
          <li className="border-l-4 border-purple-500 pl-4">
            <h3 className="text-lg font-semibold mb-2">Step 3: Enable pgraft in postgresql.conf</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Load pgraft at server startup and set the Raft identity for your first node.
            </p>
            <BashCodeBlock
              title="postgresql.conf"
              code={`shared_preload_libraries = 'pgraft'

# pgraft identity for node 1
pgraft.cluster_id = 'production-cluster'
pgraft.node_id = 1
pgraft.address = '127.0.0.1'
pgraft.port = 7001
pgraft.data_dir = '/var/lib/postgresql/pgraft'

# Optional consensus tuning
pgraft.election_timeout = 1000
pgraft.heartbeat_interval = 100
pgraft.snapshot_interval = 10000`}
            />
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Initialize the First Raft Node</h2>
        <p className="text-muted-foreground mb-4">
          Restart PostgreSQL to load the extension, then create the pgraft schema and bootstrap the node inside your primary database.
        </p>
        <SqlCodeBlock
          title="Initialize pgraft"
          code={`-- Create the extension in your database
CREATE EXTENSION pgraft;

-- Bootstrap the local node (creates Raft metadata)
SELECT pgraft_init();

-- Confirm the worker is running and node is ready
SELECT pgraft_is_leader() AS is_leader,
       pgraft_get_term() AS current_term,
       pgraft_get_worker_state() AS worker_state;`}
        />
        <p className="text-sm text-muted-foreground mt-3">
          The first node elects itself as leader within roughly 10 seconds. Subsequent nodes will join the cluster via the leader.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Scale Out the Cluster</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Repeat the installation and configuration steps on each additional server, adjusting <code>pgraft.node_id</code>, <code>pgraft.port</code>,
            and data directory per node. After each follower has restarted PostgreSQL and created the extension, connect to the leader and register them.
          </p>
          <SqlCodeBlock
            title="Add follower nodes"
            code={`-- Run on the leader node after followers are online
SELECT pgraft_add_node(2, '10.0.0.12', 7002);
SELECT pgraft_add_node(3, '10.0.0.13', 7003);

-- Review replication status and leader assignment
SELECT * FROM pgraft_get_cluster_status();
SELECT * FROM pgraft_get_nodes();`}
          />
          <p className="text-sm text-muted-foreground">
            Nodes become voting members once they catch up to the leader's Raft log. Monitoring functions provide per-node state, match index,
            and commit progress to verify convergence.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Verify Health & Operational Metrics</h2>
        <p className="text-muted-foreground mb-4">
          pgraft exposes comprehensive SQL diagnostics for Raft state, log replication, snapshots, and failover readiness.
          Use these queries to validate the cluster before production rollout.
        </p>
        <SqlCodeBlock
          title="Operational health checks"
          code={`-- Leader / follower roles and commit positions
SELECT * FROM pgraft_get_cluster_status();

-- Detailed Raft log metrics (append, commit, snapshot counts)
SELECT * FROM pgraft_log_get_stats();

-- Verify quorum availability
SELECT pgraft_quorum_met() AS quorum_met,
       pgraft_get_leader() AS leader_node,
       pgraft_get_term() AS current_term;`}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <a href="/docs/pgraft/tutorial" className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
            <h3 className="font-semibold mb-2">📘 End-to-End Tutorial</h3>
            <p className="text-sm text-muted-foreground">Walk through cluster expansion, failover drills, and rolling upgrades.</p>
          </a>
          <a href="/docs/pgraft/sql-functions" className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
            <h3 className="font-semibold mb-2">🧭 SQL Function Reference</h3>
            <p className="text-sm text-muted-foreground">Detailed reference for every management, monitoring, and diagnostic function.</p>
          </a>
          <a href="/docs/pgraft/performance" className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
            <h3 className="font-semibold mb-2">⚙️ Performance Tuning</h3>
            <p className="text-sm text-muted-foreground">Optimize election timeouts, snapshot cadence, and WAL durability for production.</p>
          </a>
          <a href="https://github.com/pgElephant/pgraft/issues" className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
            <h3 className="font-semibold mb-2">💬 Community Support</h3>
            <p className="text-sm text-muted-foreground">Report issues, request features, or collaborate with other operators.</p>
          </a>
        </div>
      </section>
    </div>
  )
}