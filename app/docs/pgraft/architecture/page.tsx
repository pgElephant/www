import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'pgraft Architecture | Raft-Backed PostgreSQL Design',
  description: 'Deep dive into the components, background workers, and replication flow that power pgraft Raft consensus for PostgreSQL.',
}

export default function PgraftArchitecturePage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold mb-4">pgraft Architecture</h1>
        <p className="text-lg text-muted-foreground">
          pgraft embeds the Raft consensus algorithm inside PostgreSQL using a mix of C hooks and a Go replication worker.
          The architecture keeps data durability guarantees aligned with PostgreSQL while adding deterministic leader election,
          quorum-based writes, and automatic failover.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Core Components</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Extension Layer (C)</h3>
            <p className="text-sm text-muted-foreground">
              Hooks into PostgreSQL shared memory, background worker registration, and WAL APIs. Exposes SQL functions and views for
              cluster management. Responsible for bridging the executor with Raft state transitions.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Raft Worker (Go)</h3>
            <p className="text-sm text-muted-foreground">
              Compiled as <code>pgraft_go.so</code>, it runs inside PostgreSQL&apos;s background worker framework. Implements Raft log
              replication, leader election, snapshotting, and network RPCs. Communicates with the C layer through shared memory rings.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Shared Metadata Store</h3>
            <p className="text-sm text-muted-foreground">
              Stores durable Raft information inside PostgreSQL catalogs (<code>pg_catalog.pgraft_*</code>) for node identity,
              membership, and configuration parameters. Ensures DDL-like persistence across restarts.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">SQL Management API</h3>
            <p className="text-sm text-muted-foreground">
              Functions such as <code>pgraft_add_node</code>, <code>pgraft_get_cluster_status</code>, and <code>pgraft_log_get_stats</code>
              provide a single control surface for DBAs and automation pipelines.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Replication & Consensus Flow</h2>
        <ol className="space-y-3 text-muted-foreground">
          <li>
            <strong>1. Command submission.</strong> Application writes are accepted by the leader through standard SQL. pgraft intercepts
            commit records and enqueues them for Raft replication before acknowledging the transaction.
          </li>
          <li>
            <strong>2. Raft log append.</strong> The Go worker packages WAL descriptions into Raft log entries and sends AppendEntries RPCs to followers.
            Followers persist entries to disk and respond with acknowledgement and match indexes.
          </li>
          <li>
            <strong>3. Commit acknowledgement.</strong> Once a quorum confirms persistence, the leader marks the entry as committed and
            unblocks SQL backends. Followers apply committed entries to the local database.
          </li>
          <li>
            <strong>4. Snapshotting.</strong> When the log reaches the configured threshold, pgraft creates base backups of Raft state to allow log truncation.
            Followers that fall far behind can install snapshots instead of replaying every entry.
          </li>
          <li>
            <strong>5. Failure detection.</strong> Followers monitor leader heartbeats. Missing heartbeats beyond <code>pgraft.election_timeout</code>
            triggers a new election and leadership handoff.
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Background Workers</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-1">Raft Coordinator</h3>
            <p className="text-sm text-muted-foreground">
              Primary Go worker that hosts the Raft state machine, handles RPC scheduling, and drives elections. Runs exactly once per Postgres instance.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-1">Apply Dispatcher</h3>
            <p className="text-sm text-muted-foreground">
              Lightweight C worker that reads committed log entries from shared queues and applies them to the local database using SPI.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-1">Health Monitor</h3>
            <p className="text-sm text-muted-foreground">
              Periodically samples metrics (latency, lag, quorum) and updates <code>pgraft_get_cluster_status()</code>. Emits NOTIFY events for alerting systems.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Metadata & Persistence</h2>
        <p className="text-muted-foreground mb-4">
          pgraft stores cluster metadata inside PostgreSQL to remain consistent with regular backups and point-in-time recovery:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><code>pg_catalog.pgraft_nodes</code>: Node identity, current state, Raft match indexes, and networking endpoints.</li>
          <li><code>pg_catalog.pgraft_config</code>: Persisted configuration overrides saved via <code>pgraft_set_config</code>.</li>
          <li><code>pg_catalog.pgraft_events</code>: Append-only log of elections, membership changes, and snapshots for audit trails.</li>
          <li><code>pg_catalog.pgraft_stats</code>: Rolling aggregates for log throughput, RPC success rates, and latency histograms.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Networking Model</h2>
        <p className="text-muted-foreground mb-4">
          Every node listens on a dedicated Raft port specified by <code>pgraft.port</code>. Communication uses protobuf-encoded RPCs over TLS (optional)
          and is independent from client connections on port 5432. This separation avoids interference between OLTP traffic and consensus messages.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Leader Responsibilities</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Accepts SQL writes and appends Raft entries.</li>
              <li>Broadcasts heartbeats every <code>pgraft.heartbeat_interval</code> ms.</li>
              <li>Tracks follower match indexes to decide commit progress.</li>
              <li>Serves <code>pgraft_get_cluster_status()</code> responses to operators.</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Follower Responsibilities</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Persist incoming entries to the Raft log and acknowledge to the leader.</li>
              <li>Apply committed entries to the local database through the dispatcher worker.</li>
              <li>Participate in elections and campaign when leadership is lost.</li>
              <li>Optionally accept read traffic when <code>pgraft.read_consistency</code> permits.</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Observability & Alerting</h2>
        <p className="text-muted-foreground mb-4">
          pgraft emits metrics via SQL views and optional Prometheus exporters. Recommended alerts include:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>Leader loss:</strong> <code>pgraft_get_leader()</code> returns NULL for more than 15 seconds.</li>
          <li><strong>Replication lag:</strong> <code>replication_lag_bytes</code> exceeds 64MB for any node.</li>
          <li><strong>Election churn:</strong> More than three leadership changes within 10 minutes.</li>
          <li><strong>Snapshot backlog:</strong> <code>pgraft_log_get_stats().pending_snapshots</code> stays non-zero for 5 minutes.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Failure Handling</h2>
        <p className="text-muted-foreground mb-4">
          pgraft adheres to Raft&apos;s safety properties:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li><strong>Deterministic elections:</strong> Randomized timeouts avoid split brain even under network partitions.</li>
          <li><strong>Log matching:</strong> Followers reject inconsistent entries to guarantee the prefix property.</li>
          <li><strong>Commit safety:</strong> Only log entries replicated to a majority are acknowledged to clients.</li>
          <li><strong>Snapshot installation:</strong> Slow nodes receive state snapshots to rejoin without replaying the full log.</li>
        </ul>
      </section>
    </div>
  )
}
