import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'

export const metadata: Metadata = {
  title: 'pgraft Architecture | Raft-Backed PostgreSQL Design',
  description: 'Deep dive into the components, background workers, and replication flow that power pgraft Raft consensus for PostgreSQL.',
}

const tableOfContents: TocItem[] = [
  { id: 'core-components', title: 'Core Components' },
  { id: 'replication-flow', title: 'Replication & Consensus Flow' },
  { id: 'background-workers', title: 'Background Workers' },
  { id: 'metadata-persistence', title: 'Metadata & Persistence' },
  { id: 'networking-model', title: 'Networking Model' },
  { id: 'observability', title: 'Observability & Alerting' },
  { id: 'failure-handling', title: 'Failure Handling' },
]

const prevLink: NavLink = {
  href: '/docs/pgraft/installation',
  label: 'Installation',
}

const nextLink: NavLink = {
  href: '/docs/pgraft/sql-functions',
  label: 'SQL Functions',
}

export default function PgraftArchitecturePage() {
  return (
    <PostgresDocsLayout
      title="pgraft Architecture"
      version="pgraft Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="core-components">
        <h2>Core Components</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Extension Layer (C)</h3>
              <p>
                Hooks into PostgreSQL shared memory, background worker registration, and WAL APIs. Exposes SQL functions and views for cluster management. Responsible for bridging the executor with Raft state transitions.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Raft Worker (Go)</h3>
              <p>
                Compiled as <code>pgraft_go.so</code>, it runs inside PostgreSQL&apos;s background worker framework. Implements Raft log replication, leader election, snapshotting, and network RPCs. Communicates with the C layer through shared memory rings.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Shared Metadata Store</h3>
              <p>
                Stores durable Raft information inside PostgreSQL catalogs (<code>pg_catalog.pgraft_*</code>) for node identity, membership, and configuration parameters. Ensures DDL-like persistence across restarts.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">SQL Management API</h3>
              <p>
                Functions such as <code>pgraft_add_node</code>, <code>pgraft_get_cluster_status</code>, and <code>pgraft_log_get_stats</code> provide a single control surface for DBAs and automation pipelines.
              </p>
            </div>
          </div>
      </section>

      <section id="replication-flow">
        <h2>Replication & Consensus Flow</h2>
          <ol>
            <li>
              <strong>1. Command submission.</strong> Application writes are accepted by the leader through standard SQL. pgraft intercepts commit records and enqueues them for Raft replication before acknowledging the transaction.
            </li>
            <li>
              <strong>2. Raft log append.</strong> The Go worker packages WAL descriptions into Raft log entries and sends AppendEntries RPCs to followers. Followers persist entries to disk and respond with acknowledgement and match indexes.
            </li>
            <li>
              <strong>3. Commit acknowledgement.</strong> Once a quorum confirms persistence, the leader marks the entry as committed and unblocks SQL backends. Followers apply committed entries to the local database.
            </li>
            <li>
              <strong>4. Snapshotting.</strong> When the log reaches the configured threshold, pgraft creates base backups of Raft state to allow log truncation. Followers that fall far behind can install snapshots instead of replaying every entry.
            </li>
            <li>
              <strong>5. Failure detection.</strong> Followers monitor leader heartbeats. Missing heartbeats beyond <code>pgraft.election_timeout</code> triggers a new election and leadership handoff.
            </li>
          </ol>
      </section>

      <section id="background-workers">
        <h2>Background Workers</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-1">Raft Coordinator</h3>
              <p>
                Primary Go worker that hosts the Raft state machine, handles RPC scheduling, and drives elections. Runs exactly once per Postgres instance.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-1">Apply Dispatcher</h3>
              <p>
                Lightweight C worker that reads committed log entries from shared queues and applies them to the local database using SPI.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-1">Health Monitor</h3>
              <p>
                Periodically samples metrics (latency, lag, quorum) and updates <code>pgraft_get_cluster_status()</code>. Emits NOTIFY events for alerting systems.
              </p>
            </div>
          </div>
      </section>

      <section id="metadata-persistence">
        <h2>Metadata & Persistence</h2>
        <p>
            pgraft stores cluster metadata inside PostgreSQL to remain consistent with regular backups and point-in-time recovery:
          </p>
          <ul>
            <li><code>pg_catalog.pgraft_nodes</code>: Node identity, current state, Raft match indexes, and networking endpoints.</li>
            <li><code>pg_catalog.pgraft_config</code>: Persisted configuration overrides saved via <code>pgraft_set_config</code>.</li>
            <li><code>pg_catalog.pgraft_events</code>: Append-only log of elections, membership changes, and snapshots for audit trails.</li>
            <li><code>pg_catalog.pgraft_stats</code>: Rolling aggregates for log throughput, RPC success rates, and latency histograms.</li>
          </ul>
      </section>

      <section id="networking-model">
        <h2>Networking Model</h2>
        <p>
            Every node listens on a dedicated Raft port specified by <code>pgraft.port</code>. Communication uses protobuf-encoded RPCs over TLS (optional) and is independent from client connections on port 5432. This separation avoids interference between OLTP traffic and consensus messages.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Leader Responsibilities</h3>
              <ul>
                <li>Accepts SQL writes and appends Raft entries.</li>
                <li>Broadcasts heartbeats every <code>pgraft.heartbeat_interval</code> ms.</li>
                <li>Tracks follower match indexes to decide commit progress.</li>
                <li>Serves <code>pgraft_get_cluster_status()</code> responses to operators.</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Follower Responsibilities</h3>
              <ul>
                <li>Persist incoming entries to the Raft log and acknowledge to the leader.</li>
                <li>Apply committed entries to the local database through the dispatcher worker.</li>
                <li>Participate in elections and campaign when leadership is lost.</li>
                <li>Optionally accept read traffic when <code>pgraft.read_consistency</code> permits.</li>
              </ul>
            </div>
          </div>
      </section>

      <section id="observability">
        <h2>Observability & Alerting</h2>
        <p>
            pgraft emits metrics via SQL views and optional Prometheus exporters. Recommended alerts include:
          </p>
          <ul>
            <li><strong>Leader loss:</strong> <code>pgraft_get_leader()</code> returns NULL for more than 15 seconds.</li>
            <li><strong>Replication lag:</strong> <code>replication_lag_bytes</code> exceeds 64MB for any node.</li>
            <li><strong>Election churn:</strong> More than three leadership changes within 10 minutes.</li>
            <li><strong>Snapshot backlog:</strong> <code>pgraft_log_get_stats().pending_snapshots</code> stays non-zero for 5 minutes.</li>
          </ul>
      </section>

      <section id="failure-handling">
        <h2>Failure Handling</h2>
        <p>pgraft adheres to Raft's safety properties:</p>
        <ul>
            <li><strong>Deterministic elections:</strong> Randomized timeouts avoid split brain even under network partitions.</li>
            <li><strong>Log matching:</strong> Followers reject inconsistent entries to guarantee the prefix property.</li>
            <li><strong>Commit safety:</strong> Only log entries replicated to a majority are acknowledged to clients.</li>
            <li><strong>Snapshot installation:</strong> Slow nodes receive state snapshots to rejoin without replaying the full log.</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
