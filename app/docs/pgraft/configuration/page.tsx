import { Metadata } from 'next'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import DocsContentLayout from '../../../../components/DocsContentLayout'
import { PgraftIcon } from '../../../../components/ProductIcons'

export const metadata: Metadata = {
  title: 'pgraft Configuration Guide | PostgreSQL Raft Settings',
  description: 'Tune PostgreSQL and pgraft settings for Raft consensus. Includes postgresql.conf changes, pg_hba rules, runtime management, and performance profiles.',
}

export default function PgraftConfigurationPage() {
  return (
    <DocsContentLayout
      hero={{
        badgeLabel: 'pgRaft',
        badgeIcon: <PgraftIcon size={20} />, 
        badgeTone: 'blue',
        title: 'pgraft Configuration',
        description:
          'Configure PostgreSQL and pgraft to operate as a reliable Raft cluster. This guide covers baseline server settings, pgraft GUC parameters, runtime management functions, and performance profiles for different workloads.',
      }}
      contentWidth="wide"
    >
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Baseline postgresql.conf Settings</h2>
          <p className="text-muted-foreground mb-4">
            Add these settings to <code>postgresql.conf</code> on every node. Adjust values to match your deployment size and performance goals.
          </p>
          <BashCodeBlock
            title="postgresql.conf"
            code={`# Load pgraft and enable WAL information for Raft replication
shared_preload_libraries = 'pgraft'
wal_level = logical
max_wal_senders = 16
max_replication_slots = 16
synchronous_commit = on

# Connection limits sized for Raft background workers
max_connections = 200
max_worker_processes = 32

# Recommended durability defaults
shared_buffers = 1GB
wal_keep_size = '4GB'`}
          />
          <p className="text-sm text-muted-foreground mt-2">
            Restart PostgreSQL after updating shared_preload_libraries or WAL parameters.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">pgraft GUC Parameters</h2>
          <p className="text-muted-foreground mb-4">
            GUC parameters can be defined in <code>postgresql.conf</code> or set dynamically with <code>ALTER SYSTEM</code>. At minimum, set the identity for each node.
          </p>
          <BashCodeBlock
            title="Identity and networking"
            code={`# Unique identity per node
pgraft.cluster_id = 'production-cluster'
pgraft.node_id = 1
pgraft.address = '10.0.0.11'
pgraft.port = 7001

# Storage and snapshot configuration
pgraft.data_dir = '/var/lib/postgresql/pgraft'
pgraft.snapshot_interval = 10000
pgraft.snapshot_threshold = 5000

# Consensus timing (milliseconds)
pgraft.heartbeat_interval = 100
pgraft.election_timeout = 1000`}
          />
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Availability</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><code>pgraft.quorum_required</code>: Minimum voting nodes (default 3)</li>
                <li><code>pgraft.failover_enabled</code>: Enable automatic leadership transfer</li>
                <li><code>pgraft.max_election_retries</code>: Additional retries before alerting</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Performance</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><code>pgraft.append_batch_size</code>: WAL entries replicated per RPC</li>
                <li><code>pgraft.replay_parallelism</code>: Apply log entries concurrently</li>
                <li><code>pgraft.log_retention_mb</code>: Retain additional Raft log for diagnostics</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">pg_hba.conf Access Control</h2>
          <p className="text-muted-foreground mb-4">
            Allow pgraft nodes to exchange Raft traffic and standard replication data. Apply these rules on every server.
          </p>
          <BashCodeBlock
            title="pg_hba.conf"
            code={`# Local Raft + replication control connections
local   replication     postgres                                trust
host    replication     postgres        10.0.0.0/24             md5
host    all             pgraft_cluster  10.0.0.0/24             md5`}
          />
          <p className="text-sm text-muted-foreground mt-2">
            Reload PostgreSQL after editing <code>pg_hba.conf</code> (<code>SELECT pg_reload_conf();</code>).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Runtime Configuration &amp; Introspection</h2>
          <p className="text-muted-foreground mb-4">
            Tune pgraft on the fly and inspect the current Raft state without restarting the cluster.
          </p>
          <SqlCodeBlock
            title="Runtime commands"
            code={`-- Inspect the current configuration values
SELECT * FROM pgraft_get_config();

-- Change consensus timing at runtime
SELECT pgraft_set_config('heartbeat_interval', '50ms');
SELECT pgraft_set_config('election_timeout', '750ms');

-- Persist changes to disk
do $$
BEGIN
  PERFORM pgraft_set_config('snapshot_threshold', '8000');
  PERFORM pgraft_save_config();
END;
$$;`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Cluster Management Commands</h2>
          <p className="text-muted-foreground mb-4">
            Use these SQL helpers to initialize, expand, and validate Raft clusters. Execute them from the elected leader node.
          </p>
          <SqlCodeBlock
            title="Create and expand cluster"
            code={`-- Bootstrap the leader after CREATE EXTENSION
dO $$ BEGIN PERFORM pgraft_init(); END $$;

-- Register follower nodes by ID, address, and Raft port
SELECT pgraft_add_node(2, '10.0.0.12', 7002);
SELECT pgraft_add_node(3, '10.0.0.13', 7003);

-- Remove a node gracefully
SELECT pgraft_remove_node(3);`}
          />
          <SqlCodeBlock
            title="Status and diagnostics"
            code={`-- Current leader, term, and quorum health
SELECT * FROM pgraft_get_cluster_status();

-- Per-node replication metrics and lag
SELECT * FROM pgraft_get_nodes();

-- Log, snapshot, and apply statistics
SELECT * FROM pgraft_log_get_stats();`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Performance Profiles</h2>
          <p className="text-muted-foreground mb-4">
            Choose a profile matching your workload characteristics. Apply settings across all nodes to maintain symmetry.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">High Throughput</h3>
              <BashCodeBlock
                title="High-throughput profile"
                code={`pgraft.heartbeat_interval = 75
pgraft.election_timeout = 900
pgraft.append_batch_size = 1024
pgraft.replay_parallelism = 8
pgraft.snapshot_threshold = 12000`}
              />
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Low Latency</h3>
              <BashCodeBlock
                title="Low-latency profile"
                code={`pgraft.heartbeat_interval = 40
pgraft.election_timeout = 400
pgraft.append_batch_size = 256
pgraft.replay_parallelism = 4
pgraft.snapshot_threshold = 6000`}
              />
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Geo-Distributed</h3>
              <BashCodeBlock
                title="Geo profile"
                code={`pgraft.heartbeat_interval = 150
pgraft.election_timeout = 1800
pgraft.append_batch_size = 512
pgraft.replay_parallelism = 6
pgraft.quorum_required = 3`}
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Troubleshooting Configuration</h2>
          <p className="text-muted-foreground mb-4">
            Use these diagnostics when configuration issues arise.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Common Issues</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Verify <code>pgraft.node_id</code> uniqueness; duplicates prevent leaders from forming.</li>
                <li>Ensure <code>pg_hba.conf</code> grants replication access to every Raft node.</li>
                <li>Restart PostgreSQL when changing <code>shared_preload_libraries</code> or shared memory sizing.</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Logs &amp; metrics</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Check <code>pg_log</code> for messages tagged <code>pgraft</code> to trace background worker status.</li>
                <li>Use <code>SELECT * FROM pgraft_log_get_replication_status()</code> to confirm lag after tuning.</li>
                <li>Expose pgraft metrics to Prometheus to alert on election churn and replication backlog.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </DocsContentLayout>
  )
}
