import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'pgraft Configuration Reference | GUC Parameters',
  description: 'Reference guide for pgraft configuration parameters, including cluster identity, consensus tuning, storage, and runtime changes.',
}

const tableOfContents: TocItem[] = [
  { id: 'key-requirements', title: 'Key Requirements' },
  { id: 'cluster-identity', title: 'Cluster Identity & Networking' },
  { id: 'consensus-timing', title: 'Consensus Timing & Batching' },
  { id: 'storage-snapshot', title: 'Storage & Snapshot Settings' },
  { id: 'runtime-config', title: 'Runtime Configuration API' },
  { id: 'validation', title: 'Validation Checklist' },
]

const prevLink: NavLink = {
  href: '/docs/pgraft/sql-reference',
  label: 'SQL Reference',
}

const nextLink: NavLink = {
  href: '/docs/pgraft/troubleshooting',
  label: 'Troubleshooting',
}

export default function PgraftConfigReferencePage() {
  return (
    <PostgresDocsLayout
      title="pgraft Configuration Reference"
      version="pgraft Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="key-requirements" className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h2>Key Requirements</h2>
        <ul>
            <li><code>shared_preload_libraries = 'pgraft'</code> on every server.</li>
            <li>Identical cluster-wide settings for consensus and membership; only node identity differs.</li>
            <li>Create and secure <code>pgraft.data_dir</code> manually before starting PostgreSQL.</li>
            <li>Use the same <code>pgraft.cluster_id</code> across the deployment to prevent accidental partitioning.</li>
          </ul>
      </section>

      <section id="cluster-identity">
        <h2>Cluster Identity & Networking</h2>
        <p>
            Define the Raft cluster name and per-node identifiers. All nodes must agree on <code>pgraft.cluster_id</code>; each node receives a unique <code>pgraft.node_id</code> and port.
          </p>
          <BashCodeBlock
            title="postgresql.conf identity block"
            code={`shared_preload_libraries = 'pgraft'

# Cluster-wide identity
pgraft.cluster_id = 'production-cluster'

# Node-specific identity
pgraft.node_id = 1
pgraft.address = '10.0.0.11'
pgraft.port = 7001
pgraft.data_dir = '/var/lib/postgresql/pgraft'

# Optional descriptive metadata
pgraft.node_role = 'leader'
pgraft.zone = 'us-east-1a'`}
          />
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Identity Parameters</h3>
              <ul>
                <li><code>pgraft.cluster_id</code> — Shared string that uniquely names the cluster.</li>
                <li><code>pgraft.node_id</code> — Integer ID (1-indexed). Do not reuse until a node is fully removed.</li>
                <li><code>pgraft.address</code> / <code>pgraft.port</code> — Host and port used for Raft RPCs.</li>
                <li><code>pgraft.data_dir</code> — Filesystem path for Raft log and snapshots.</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Access Control</h3>
              <BashCodeBlock
                title="pg_hba.conf snippet"
                code={`# Allow Raft communication within the cluster
host    replication     pgraft_cluster  10.0.0.0/24      md5
host    all             pgraft_cluster  10.0.0.0/24      md5

# Local management connections
local   all             postgres        trust`}
              />
            </div>
          </div>
      </section>

      <section id="consensus-timing">
        <h2>Consensus Timing & Batching</h2>
        <p>
            Tune election behaviour to balance availability and stability. Maintain the rule of thumb <code>election_timeout = 10 × heartbeat_interval</code>.
          </p>
          <BashCodeBlock
            title="Consensus defaults"
            code={`# Milliseconds
pgraft.heartbeat_interval = 100
pgraft.election_timeout = 1000
pgraft.append_batch_size = 512
pgraft.max_inflight_batches = 4
pgraft.quorum_required = 3`}
          />
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-1">Low Latency</h3>
              <p>Set heartbeat to 40 ms, election to 400 ms, and batch size to 256. Ideal for single data centre deployments.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-1">Balanced (Default)</h3>
              <p>Heartbeat 100 ms, election 1000 ms, batch size 512. Works for most regional clusters.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-1">Geo-Distributed</h3>
              <p>Heartbeat 180 ms, election 2200 ms, batch size 1024 to absorb WAN latency.</p>
            </div>
          </div>
      </section>

      <section id="storage-snapshot">
        <h2>Storage & Snapshot Settings</h2>
        <p>
            Snapshots prevent log growth by periodically materializing cluster state. Adjust thresholds to control disk usage and recovery time.
          </p>
          <BashCodeBlock
            title="Snapshot configuration"
            code={`pgraft.snapshot_interval = 10000   # Entries between snapshot checks
pgraft.snapshot_threshold = 8000   # Entries before forcing snapshot
pgraft.snapshot_retention = 3      # Number of snapshots retained per node
pgraft.log_retention_mb = 256      # Keep additional log for diagnostics`}
          />
          <p>
            Keep <code>snapshot_threshold</code> lower than the volume of writes generated during maintenance windows so followers can recover using snapshots instead of full log replay.
          </p>
      </section>

      <section id="runtime-config">
        <h2>Runtime Configuration API</h2>
        <p>
            Apply live changes without restarting PostgreSQL using SQL helper functions exposed by pgraft.
          </p>
          <SqlCodeBlock
            title="Inspect and modify configuration"
            code={`-- Show current values (includes default + overrides)
SELECT * FROM pgraft_get_config();

-- Adjust heartbeat interval at runtime
SELECT pgraft_set_config('heartbeat_interval', '75');

-- Persist changes to disk so they survive restart
SELECT pgraft_save_config();`}
          />
          <SqlCodeBlock
            title="Rolling configuration across nodes"
            code={`-- Example: raise quorum requirement to 5
BEGIN;
  SELECT pgraft_set_config('quorum_required', '5');
  SELECT pgraft_save_config();
COMMIT;

-- Repeat on each node or automate via Ansible/Terraform`}
          />
      </section>

      <section id="validation">
        <h2>Validation Checklist</h2>
        <ul>
            <li>Run <code>SELECT * FROM pgraft_get_cluster_status();</code> to confirm leader identity and quorum.</li>
            <li>Verify file permissions on <code>pgraft.data_dir</code> (<code>chown postgres:postgres</code>, mode 700).</li>
            <li>Ensure firewall rules allow TCP traffic on every configured <code>pgraft.port</code>.</li>
            <li>Monitor <code>pgraft_log_get_stats()</code> for unexpected increases in <code>pending_snapshots</code> after tuning thresholds.</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
