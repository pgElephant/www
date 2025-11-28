import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Getting Started with pgraft | PostgreSQL Raft Consensus Extension',
  description: 'Install pgraft, configure Raft consensus, and build a production-ready PostgreSQL cluster with automatic leader election and failover.',
}

const tableOfContents: TocItem[] = [
  { id: 'requirements', title: 'Requirements' },
  { id: 'installation', title: 'Install pgraft in 3 Steps' },
  { id: 'initialize', title: 'Initialize the First Raft Node' },
  { id: 'scale-out', title: 'Scale Out the Cluster' },
  { id: 'verify-health', title: 'Verify Health & Operational Metrics' },
]

const prevLink: NavLink | undefined = undefined
const nextLink: NavLink = {
  href: '/docs/pgraft/installation',
  label: 'Installation',
}

export default function GettingStartedPage() {
  return (
    <PostgresDocsLayout
      title="Getting Started with pgraft"
      version="pgraft Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="requirements">
        <h2>Requirements</h2>
        <p>Before installing pgraft, ensure you have:</p>
        <ul>
          <li>PostgreSQL 16, 17, or 18 plus development headers</li>
          <li>Go toolchain 1.21+ and standard build essentials (gcc/clang, make)</li>
          <li>Network reachability between nodes for Raft replication traffic</li>
          <li>systemd or process supervisor for production deployments</li>
        </ul>
      </section>

      <section id="installation">
        <h2>Install pgraft in 3 Steps</h2>
        <p>Embed the Raft consensus protocol inside PostgreSQL. Follow this guide to install pgraft, promote your first leader, and scale out a cluster.</p>

        <h3>Step 1 · Install Build Dependencies</h3>
        <p>Install PostgreSQL server headers, the Go toolchain, and build essentials on your platform.</p>
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

        <h3>Step 2 · Build the Extension</h3>
        <p>Clone the official repository, compile the C and Go components, and install the shared library into PostgreSQL.</p>
        <BashCodeBlock
          title="Build from source"
          code={`git clone https://github.com/pgElephant/pgraft.git
cd pgraft
make clean && make
sudo make install`}
        />

        <h3>Step 3 · Enable pgraft in postgresql.conf</h3>
        <p>Load pgraft at startup and set the Raft identity for your first node.</p>
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
      </section>

      <section id="initialize">
        <h2>Initialize the First Raft Node</h2>
        <p>Restart PostgreSQL to load the extension, then create the pgraft schema and bootstrap the node inside your primary database.</p>
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
        <p>The first node elects itself as leader within roughly 10 seconds. Additional nodes will join the cluster via the leader.</p>
      </section>

      <section id="scale-out">
        <h2>Scale Out the Cluster</h2>
        <p>Repeat installation on each follower, adjusting pgraft.node_id, pgraft.port, and data directories. Register followers from the leader once they are online and the extension is created.</p>
        <SqlCodeBlock
          title="Add follower nodes"
          code={`-- Run on the leader node after followers are online
SELECT pgraft_add_node(2, '10.0.0.12', 7002);
SELECT pgraft_add_node(3, '10.0.0.13', 7003);

-- Review replication status and leader assignment
SELECT * FROM pgraft_get_cluster_status();
SELECT * FROM pgraft_get_nodes();`}
        />
      </section>

      <section id="verify-health">
        <h2>Verify Health & Operational Metrics</h2>
        <p>Use these diagnostics to confirm Raft health, replication progress, and quorum availability before production rollout.</p>
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
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/pgraft/tutorial">End-to-End Tutorial</a> - Walk through cluster expansion, failover drills, and rolling upgrades.</li>
          <li><a href="/docs/pgraft/sql-functions">SQL Function Reference</a> - Detailed reference for every management, monitoring, and diagnostic function.</li>
          <li><a href="/docs/pgraft/performance">Performance Tuning</a> - Optimize election timeouts, snapshot cadence, and WAL durability.</li>
          <li><a href="https://github.com/pgElephant/pgraft/issues">Community Support</a> - Report issues, request features, or collaborate with other operators.</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}