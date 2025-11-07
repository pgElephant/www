import { Metadata } from 'next'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'pgraft Performance Tuning | PostgreSQL Raft Optimization',
  description: 'Guidance for sizing hardware, tuning Raft timeouts, optimizing log replication, and benchmarking pgraft clusters.',
}

export default function PgraftPerformancePage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold mb-4">pgraft Performance Tuning</h1>
        <p className="text-lg text-muted-foreground">
          Achieve predictable throughput and low latency with pgraft by tuning the Raft consensus parameters, WAL pipeline,
          and system resources. This guide highlights practical configuration profiles and monitoring signals for production.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Resource Sizing</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">CPU</h3>
            <p className="text-sm text-muted-foreground">
              Assign at least 4 CPU cores per node. pgraft leverages PostgreSQL background workers plus the Go Raft process, so reserve
              dedicated cores for Raft RPC handling under sustained write loads.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Memory</h3>
            <p className="text-sm text-muted-foreground">
              Allocate <code>shared_buffers</code> at 25% of RAM with a minimum of 1&nbsp;GB. Additional memory keeps snapshots and replication buffers hot and
              reduces disk churn during catch-up.
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Storage</h3>
            <p className="text-sm text-muted-foreground">
              Prefer NVMe SSDs for WAL and Raft logs. Configure <code>wal_keep_size</code> large enough to withstand follower outages (&ge; 4&nbsp;GB recommended).
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Consensus Timing Profiles</h2>
        <p className="text-muted-foreground mb-4">
          Select heartbeat and election timeouts that balance failure detection with leader stability.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <BashCodeBlock
            title="Low latency (LAN)"
            code={`pgraft.heartbeat_interval = 40
pgraft.election_timeout = 400
pgraft.append_batch_size = 256
pgraft.replay_parallelism = 4`}
          />
          <BashCodeBlock
            title="Balanced (default)"
            code={`pgraft.heartbeat_interval = 100
pgraft.election_timeout = 1000
pgraft.append_batch_size = 512
pgraft.replay_parallelism = 6`}
          />
          <BashCodeBlock
            title="Geo-distributed"
            code={`pgraft.heartbeat_interval = 180
pgraft.election_timeout = 2200
pgraft.append_batch_size = 1024
pgraft.replay_parallelism = 8`}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Set these values in <code>postgresql.conf</code> or persist them using <code>SELECT pgraft_set_config(...)</code> followed by <code>pgraft_save_config()</code>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Batching & Log Throughput</h2>
        <p className="text-muted-foreground mb-4">
          Adjust batching parameters to match transaction volume. Larger batches increase throughput at the expense of latency.
        </p>
        <BashCodeBlock
          title="Recommended batching settings"
          code={`# Control the size of each AppendEntries RPC (entries)
pgraft.append_batch_size = 512

# Allow pipelining multiple AppendEntries in flight
pgraft.max_inflight_batches = 4

# Commit when a majority acknowledges (default) -- keep enabled
pgraft.strict_quorum_commit = on`}
        />
        <SqlCodeBlock
          title="Monitor batching efficiency"
          code={`SELECT avg_batch_size,
       avg_append_latency_ms,
       pending_batches
  FROM pgraft_log_get_stats();`}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Disk & WAL Optimization</h2>
        <p className="text-muted-foreground mb-4">
          Ensure WAL and Raft logs are flushed efficiently:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Enable <code>wal_compression = on</code> to reduce network bandwidth for AppendEntries.</li>
          <li>Consider <code>wal_recycle = on</code> to reuse WAL files and mitigate filesystem fragmentation.</li>
          <li>Use dedicated WAL storage or <code>wal_keep_size</code> to buffer follower downtime without forcing snapshot installs.</li>
          <li>Monitor <code>pg_stat_bgwriter</code> for checkpoints that could stall Raft application.</li>
        </ul>
        <BashCodeBlock
          title="Checkpoint tuning"
          code={`# Write smaller checkpoints more frequently to avoid bursts
checkpoint_timeout = '5min'
max_wal_size = '8GB'
min_wal_size = '2GB'`}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Read Scaling & Consistency</h2>
        <p className="text-muted-foreground mb-4">
          pgraft allows follower reads when configured appropriately. Adjust staleness tolerances to satisfy query requirements.
        </p>
        <BashCodeBlock
          title="Follower read configuration"
          code={`# Permit follower reads with bounded staleness
pgraft.read_consistency = 'bounded_staleness'
pgraft.read_staleness_max_ms = 500

# Optional: strongly consistent reads (leader only)
# pgraft.read_consistency = 'leader'`}
        />
        <SqlCodeBlock
          title="Check read routing"
          code={`SELECT node_id,
       read_role,
       last_apply_lsn
  FROM pgraft_get_nodes();`}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Benchmarking & Observability</h2>
        <p className="text-muted-foreground mb-4">
          Use built-in metrics to validate tuning changes and detect regressions.
        </p>
        <SqlCodeBlock
          title="Key metrics queries"
          code={`-- Throughput (transactions committed per second)
SELECT date_trunc('minute', event_time) AS minute,
       SUM(committed_entries) AS entries_committed
  FROM pgraft_metrics_rolling
 GROUP BY 1
 ORDER BY 1 DESC
 LIMIT 10;

-- Latency distribution for AppendEntries RPCs
SELECT percentile_bucket,
       avg_latency_ms,
       count
  FROM pgraft_rpc_latency_histogram;`}
        />
        <BashCodeBlock
          title="Recommended alert thresholds"
          code={`# Lag warning
SELECT node_id, replication_lag_bytes
  FROM pgraft_get_nodes()
 WHERE replication_lag_bytes > 67108864;  -- 64 MB

# Leadership churn
SELECT COUNT(*)
  FROM pgraft_get_events()
 WHERE event_type = 'election'
   AND event_timestamp > now() - interval '10 minutes';`}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Troubleshooting Performance</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">High replication lag</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Verify network RTT; consider increasing <code>pgraft.append_batch_size</code>.</li>
              <li>Ensure followers have sufficient I/O bandwidth—watch <code>pg_stat_io</code> counters.</li>
              <li>Check for slow checkpoints or autovacuum activity on followers.</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Frequent elections</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Increase <code>pgraft.election_timeout</code> to account for busy leader workloads.</li>
              <li>Inspect <code>pgraft_log_get_stats()</code> for RPC failures indicating network issues.</li>
              <li>Confirm CPU saturation is not preventing timely heartbeat processing.</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Slow snapshot installs</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Upgrade follower disk throughput or reduce snapshot size via <code>pgraft.snapshot_threshold</code>.</li>
              <li>Take manual base backups and use <code>pg_basebackup</code> for extremely large datasets.</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Write latency spikes</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Inspect <code>avg_append_latency_ms</code> via <code>pgraft_log_get_stats()</code>.</li>
              <li>Verify synchronous replication is not waiting on a failed follower (consider temporarily demoting it).</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
