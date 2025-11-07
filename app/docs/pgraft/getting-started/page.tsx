import { Metadata } from 'next'
import { Database } from 'lucide-react'
import GettingStartedLayout from '../../../../components/GettingStartedLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Getting Started with pgraft | PostgreSQL Raft Consensus Extension',
  description: 'Install pgraft, configure Raft consensus, and build a production-ready PostgreSQL cluster with automatic leader election and failover.',
}

export default function GettingStartedPage() {
  return (
    <GettingStartedLayout
      product="pgraft"
      hero={{
        label: 'pgraft',
        labelIcon: <Database className="h-4 w-4" />, 
        labelAccent: 'blue',
        title: 'Getting Started with pgraft',
        description:
          'Embed the Raft consensus protocol inside PostgreSQL. Follow this guide to install pgraft, promote your first leader, and scale out a resilient cluster in minutes.',
        cta: {
          href: '/docs/pgraft',
          label: 'View documentation hub',
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
        title: 'Standalone PostgreSQL Extension',
        items: [
          'PostgreSQL 16, 17, or 18 plus development headers',
          'Go toolchain 1.21+ and standard build essentials (gcc/clang, make)',
          'Network reachability between nodes for Raft replication traffic',
          'systemd or process supervisor for production deployments',
        ],
      }}
      sections={[
        {
          title: 'Install pgraft in 3 Steps',
          cards: [
            {
              id: 'dependencies',
              title: 'Step 1 · Install Build Dependencies',
              accent: 'blue',
              description: 'Install PostgreSQL server headers, the Go toolchain, and build essentials on your platform.',
              content: (
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
              ),
            },
            {
              id: 'build',
              title: 'Step 2 · Build the Extension',
              accent: 'emerald',
              description: 'Clone the official repository, compile the C and Go components, and install the shared library into PostgreSQL.',
              content: (
                <BashCodeBlock
                  title="Build from source"
                  code={`git clone https://github.com/pgElephant/pgraft.git
cd pgraft
make clean && make
sudo make install`}
                />
              ),
            },
            {
              id: 'configure',
              title: 'Step 3 · Enable pgraft in postgresql.conf',
              accent: 'purple',
              description: 'Load pgraft at startup and set the Raft identity for your first node.',
              content: (
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
              ),
            },
          ],
        },
        {
          title: 'Initialize the First Raft Node',
          description:
            'Restart PostgreSQL to load the extension, then create the pgraft schema and bootstrap the node inside your primary database.',
          content: [
            <SqlCodeBlock
              key="initialize-node"
              title="Initialize pgraft"
              code={`-- Create the extension in your database
CREATE EXTENSION pgraft;

-- Bootstrap the local node (creates Raft metadata)
SELECT pgraft_init();

-- Confirm the worker is running and node is ready
SELECT pgraft_is_leader() AS is_leader,
       pgraft_get_term() AS current_term,
       pgraft_get_worker_state() AS worker_state;`}
            />,
            <p key="init-note" className="text-xs text-slate-500 dark:text-slate-400">
              The first node elects itself as leader within roughly 10 seconds. Additional nodes will join the cluster via the leader.
            </p>,
          ],
        },
        {
          title: 'Scale Out the Cluster',
          description:
            'Repeat installation on each follower, adjusting pgraft.node_id, pgraft.port, and data directories. Register followers from the leader once they are online and the extension is created.',
          content: [
            <SqlCodeBlock
              key="add-followers"
              title="Add follower nodes"
              code={`-- Run on the leader node after followers are online
SELECT pgraft_add_node(2, '10.0.0.12', 7002);
SELECT pgraft_add_node(3, '10.0.0.13', 7003);

-- Review replication status and leader assignment
SELECT * FROM pgraft_get_cluster_status();
SELECT * FROM pgraft_get_nodes();`}
            />,
          ],
        },
        {
          title: 'Verify Health & Operational Metrics',
          description:
            'Use these diagnostics to confirm Raft health, replication progress, and quorum availability before production rollout.',
          content: [
            <SqlCodeBlock
              key="verify-health"
              title="Operational health checks"
              code={`-- Leader / follower roles and commit positions
SELECT * FROM pgraft_get_cluster_status();

-- Detailed Raft log metrics (append, commit, snapshot counts)
SELECT * FROM pgraft_log_get_stats();

-- Verify quorum availability
SELECT pgraft_quorum_met() AS quorum_met,
       pgraft_get_leader() AS leader_node,
       pgraft_get_term() AS current_term;`}
            />,
          ],
        },
      ]}
      nextSteps={[
        {
          href: '/docs/pgraft/tutorial',
          title: '📘 End-to-End Tutorial',
          description: 'Walk through cluster expansion, failover drills, and rolling upgrades.',
        },
        {
          href: '/docs/pgraft/sql-functions',
          title: '🧭 SQL Function Reference',
          description: 'Detailed reference for every management, monitoring, and diagnostic function.',
        },
        {
          href: '/docs/pgraft/performance',
          title: '⚙️ Performance Tuning',
          description: 'Optimize election timeouts, snapshot cadence, and WAL durability.',
        },
        {
          href: 'https://github.com/pgElephant/pgraft/issues',
          title: '💬 Community Support',
          description: 'Report issues, request features, or collaborate with other operators.',
          external: true,
        },
      ]}
      supportLinks={[
        {
          href: 'https://github.com/pgElephant/pgraft/issues',
          label: 'GitHub Issues',
          description: 'Report bugs, request features, or share feedback',
          external: true,
        },
        {
          href: 'https://github.com/pgElephant/pgraft/discussions',
          label: 'GitHub Discussions',
          description: 'Ask questions and collaborate with other operators',
          external: true,
        },
        {
          href: 'https://github.com/pgElephant/pgraft',
          label: 'Repository README',
          description: 'Latest release notes, roadmap, and developer setup',
          external: true,
        },
      ]}
    />
  )
}