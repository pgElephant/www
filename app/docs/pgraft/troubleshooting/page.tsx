import { Metadata } from 'next'
import DocsContentLayout from '../../../../components/DocsContentLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import { PgraftIcon } from '../../../../components/ProductIcons'

export const metadata: Metadata = {
  title: 'pgraft Troubleshooting - Common Issues & Solutions | pgElephant',
  description: 'Diagnose and resolve pgraft Raft consensus issues: quorum loss, replication lag, elections, and KV store errors inside PostgreSQL.',
}

const quickChecks = `-- Verify cluster health from any node
SELECT * FROM pgraft_get_cluster_status();
SELECT * FROM pgraft_log_get_replication_status();
SELECT * FROM pgraft_get_nodes();`

const electionDrift = `SELECT node_id,
       current_term,
       elections_triggered,
       elections_triggered::float / GREATEST(current_term, 1) AS elections_per_term
  FROM pgraft_get_cluster_status()
 WHERE elections_triggered::float / GREATEST(current_term, 1) > 2.0;`

const lagScript = `#!/usr/bin/env bash
LAG=$(psql -t -c "SELECT COALESCE(MAX(lag_entries), 0) FROM pgraft_log_get_replication_status();")
if [[ "$LAG" -gt 1000 ]]; then
  echo "$(date --iso-8601=seconds) CRITICAL replication lag: $LAG entries" >> /var/log/pgraft-alerts.log
fi`

const supportScript = String.raw`#!/usr/bin/env bash
DEST=/tmp/pgraft-support-$(date +%s)
mkdir -p "$DEST"

psql -f - <<'SQL'
\o \${DEST}/cluster_status.txt
SELECT * FROM pgraft_get_cluster_status();
SELECT * FROM pgraft_log_get_replication_status();
SELECT * FROM pgraft_get_nodes();
SELECT * FROM pgraft_log_get_stats();
SQL

cp /var/log/postgresql/postgresql-*-main.log "$DEST"/
tar -C /tmp -czf pgraft-support.tar.gz "$(basename "$DEST")"
`

export default function PgraftTroubleshootingPage() {
  return (
    <DocsContentLayout
      hero={{
        badgeLabel: 'pgRaft',
        badgeIcon: <PgraftIcon size={20} />, 
        badgeTone: 'blue',
        title: 'pgraft Troubleshooting',
        description:
          'Use these diagnostics, SQL helpers, and remediation steps to restore Raft consensus health across your PostgreSQL cluster.',
      }}
      contentWidth="wide"
    >
      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Quick Health Checklist</h2>
          <p className="text-muted-foreground">
            Run these queries immediately when you suspect cluster drift. They expose leadership, quorum size, replication backlog, and heartbeat timings without leaving psql.
          </p>
          <SqlCodeBlock title="Baseline diagnostics" code={quickChecks} />
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 space-y-2">
              <h3 className="font-semibold">Interpretation</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>
                  <code>state</code> should include exactly one leader; followers should show low <code>last_heartbeat_ms</code> values.
                </li>
                <li>
                  <code>lag_entries</code> above 100 indicates a lagging follower. Above 1000 requires immediate action.
                </li>
                <li>
                  Check <code>messages_processed</code> for sudden drops, which can indicate stalled workers.
                </li>
              </ul>
            </div>
            <div className="border rounded-lg p-4 space-y-2">
              <h3 className="font-semibold">When to escalate</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>No leader for longer than the election timeout.</li>
                <li>Quorum count lower than expected cluster size.</li>
                <li>Replication lag grows continuously after remedial steps.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Connection &amp; Identity Failures</h2>
          <p className="text-muted-foreground">
            Membership issues usually stem from incorrect GUC identity or blocked network routes. Inspect the catalog to verify identity and restart nodes with corrected configuration.
          </p>
          <SqlCodeBlock
            title="Validate node identity"
            code={`SELECT node_id,
       cluster_id,
       address,
       port,
       data_dir
  FROM pgraft_nodes_catalog
 ORDER BY node_id;`}
          />
          <BashCodeBlock
            title="Network health"
            code={`# Check Raft TCP port reachability
nc -vz 10.0.0.12 7002

# Ensure pg_hba allows replication user
psql -c "SELECT * FROM pg_hba_file_rules WHERE user_name = 'pgraft_cluster';"`}
          />
          <div className="border-l-4 border-blue-500 bg-blue-50/40 dark:bg-blue-500/10 rounded-r-lg p-4">
            <h3 className="font-semibold mb-2">Remediation</h3>
            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
              <li>Confirm <code>pgraft.cluster_id</code> is identical on every node.</li>
              <li>Assign unique <code>pgraft.node_id</code> values; duplicates cause vote conflicts.</li>
              <li>Restart PostgreSQL if you adjusted <code>shared_preload_libraries</code> or identity GUCs.</li>
            </ol>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Replication Lag &amp; Stalled Followers</h2>
          <p className="text-muted-foreground">
            Lagging followers threaten quorum and can block synchronous commits. Use the following SQL and shell tooling to triage and recover.
          </p>
          <SqlCodeBlock
            title="Inspect lagging followers"
            code={`SELECT node_id,
       state,
       lag_entries,
       replication_lag_bytes,
       last_apply_lsn
  FROM pgraft_log_get_replication_status()
 ORDER BY lag_entries DESC;`}
          />
          <SqlCodeBlock
            title="Force resync of a follower"
            code={`-- Run on the lagging follower after network issues resolve
SELECT pgraft_log_sync_with_leader();`}
          />
          <div className="grid md:grid-cols-2 gap-4">
            <BashCodeBlock title="Lag alert script" code={lagScript} />
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Common causes</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Saturated disks or CPU throttling on followers.</li>
                <li>Network jitter causing packet loss on the Raft port.</li>
                <li>Followers paused for maintenance without demoting them first.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Leadership Churn</h2>
          <p className="text-muted-foreground">
            Frequent elections introduce commit latency spikes and may indicate that heartbeats cannot reach a majority fast enough.
          </p>
          <SqlCodeBlock title="Election drift" code={electionDrift} />
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 space-y-2">
              <h3 className="font-semibold">Stabilization tactics</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Increase <code>pgraft.election_timeout</code> by 200–300 ms to absorb spikes.</li>
                <li>Lower heartbeat interval temporarily when you expect bursty workloads.</li>
                <li>Verify leader CPU is not saturated; busy loops delay heartbeat dispatch.</li>
              </ul>
            </div>
            <BashCodeBlock
              title="Adjust timing"
              code={`psql -c "SELECT pgraft_set_config('election_timeout', '1200ms');"
psql -c "SELECT pgraft_set_config('heartbeat_interval', '60ms');"
psql -c "SELECT pgraft_save_config();"`}
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Snapshot &amp; Storage Problems</h2>
          <p className="text-muted-foreground">
            Snapshot backlogs usually appear when disk space is constrained or snapshot intervals are tuned too high for the workload.
          </p>
          <SqlCodeBlock
            title="Snapshot backlog"
            code={`SELECT total_entries,
       pending_snapshots,
       last_snapshot_term,
       last_snapshot_index
  FROM pgraft_log_get_stats();`}
          />
          <div className="grid md:grid-cols-2 gap-4">
            <BashCodeBlock
              title="Snapshot directory usage"
              code={`du -sh /var/lib/postgresql/pgraft/snapshots
ls -lh /var/lib/postgresql/pgraft/snapshots | tail -10`}
            />
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Resolution</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Lower <code>pgraft.snapshot_threshold</code> to cut the log sooner.</li>
                <li>Ensure snapshots reside on high-throughput SSD storage.</li>
                <li>Archive old snapshots after verifying fresh copies exist on secondary storage.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Replicated KV Store Issues</h2>
          <p className="text-muted-foreground">
            pgraft’s KV store shares consensus semantics with SQL writes. Use the helpers below to confirm writes propagate and detect stuck values.
          </p>
          <SqlCodeBlock
            title="End-to-end integrity"
            code={`DO $$
DECLARE
  k TEXT := 'troubleshoot_' || extract(epoch FROM now());
  v JSONB := jsonb_build_object('status', 'probe');
  roundtrip JSONB;
BEGIN
  PERFORM pgraft_kv_put(k, v);
  SELECT pgraft_kv_get(k) INTO roundtrip;
  IF roundtrip IS DISTINCT FROM v THEN
    RAISE EXCEPTION 'KV roundtrip failed: %', roundtrip;
  END IF;
  PERFORM pgraft_kv_delete(k);
END;
$$;`}
          />
          <SqlCodeBlock
            title="Detect skew"
            code={`SELECT key,
       pg_column_size(value) AS value_bytes,
       updated_at
  FROM pgraft.kv
 ORDER BY updated_at DESC
 LIMIT 20;`}
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Collecting Support Bundles</h2>
          <p className="text-muted-foreground">
            When opening a support ticket, attach a recent bundle containing cluster status, snapshots of key views, and relevant PostgreSQL logs.
          </p>
          <BashCodeBlock
            title="Support bundle script"
            code={supportScript}
          />
        </section>
      </div>
    </DocsContentLayout>
  )
}