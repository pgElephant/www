import { Metadata } from 'next'
import DocsContentLayout from '../../../../components/DocsContentLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import { PgraftIcon } from '../../../../components/ProductIcons'

export const metadata: Metadata = {
  title: 'Troubleshooting Guide | pgraft',
  description: 'Comprehensive troubleshooting playbook for pgraft, covering installation errors, leadership failures, replication lag, and recovery procedures.',
}

const installChecks = `# Confirm shared library is installed
ls $(pg_config --pkglibdir)/pgraft*

# Ensure extension control file exists
ls $(pg_config --sharedir)/extension/pgraft*`

const rebuildExtension = `sudo make uninstall
make clean
make all
sudo make install

psql -c "DROP EXTENSION IF EXISTS pgraft CASCADE;"
psql -c "CREATE EXTENSION pgraft;"`

const quorumSQL = `SELECT pgraft_quorum_met() AS quorum_ok,
       pgraft_get_leader() AS leader_id,
       num_nodes,
       state
  FROM pgraft_get_cluster_status()
 CROSS JOIN LATERAL (SELECT state FROM pgraft_cluster_state LIMIT 1) AS s;`

const lagSQL = `SELECT node_id,
       lag_entries,
       replication_lag_bytes,
       state
  FROM pgraft_log_get_replication_status()
 ORDER BY lag_entries DESC;`

const vacuumImpact = `SELECT datname,
       schemaname,
       relname,
       n_live_tup,
       autovacuum_count,
       last_autovacuum
  FROM pg_stat_user_tables
 ORDER BY autovacuum_count DESC
 LIMIT 20;`

export default function PgraftTroubleshootingGuidePage() {
  return (
    <DocsContentLayout
      hero={{
        badgeLabel: 'pgRaft',
        badgeIcon: <PgraftIcon size={20} />, 
        badgeTone: 'blue',
        title: 'Troubleshooting Guide',
        description:
          'Follow this playbook to diagnose pgraft installation issues, consensus disruptions, replication lag, and performance regressions.',
      }}
      contentWidth="wide"
    >
      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Quick Diagnostic Checklist</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Confirm a leader exists and quorum is healthy (<code>pgraft_get_cluster_status()</code>).</li>
            <li>Inspect replication lag metrics (<code>pgraft_log_get_replication_status()</code>).</li>
            <li>Tail PostgreSQL logs for Raft warnings (<code>grep -i pgraft</code>).</li>
            <li>Verify network reachability on the Raft port and replication roles.</li>
            <li>Check disk space for WAL, pgraft data directory, and snapshot volumes.</li>
            <li>Ensure configuration matches across nodes (identity GUCs, timeouts, quorum).</li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Extension Fails to Load</h2>
          <p className="text-muted-foreground">
            Errors such as <em>“could not load library pgraft.so”</em> or missing control files indicate installation path issues.
          </p>
          <BashCodeBlock title="Validate installation" code={installChecks} />
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 space-y-2">
              <h3 className="font-semibold">Common Causes</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Extension compiled against a different PostgreSQL version.</li>
                <li><code>shared_preload_libraries</code> missing pgraft entry or PostgreSQL not restarted.</li>
                <li>Custom <code>libdir</code> path overriding default installation directory.</li>
              </ul>
            </div>
            <BashCodeBlock title="Rebuild extension" code={rebuildExtension} />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">No Leader / Quorum Loss</h2>
          <p className="text-muted-foreground">
            Quorum failures prevent commits and may result from network partitions, identity mismatches, or nodes stuck in candidate mode.
          </p>
          <SqlCodeBlock title="Check quorum" code={quorumSQL} />
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 space-y-2">
              <h3 className="font-semibold">Recovery Steps</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Resolve network partitions; verify firewalls allow the Raft port.</li>
                <li>Restart nodes with duplicate <code>pgraft.node_id</code> values after correcting identity.</li>
                <li>Temporarily increase <code>pgraft.election_timeout</code> to reduce simultaneous campaigns.</li>
              </ul>
            </div>
            <SqlCodeBlock
              title="Re-elect leader"
              code={`SELECT pgraft_transfer_leadership(2);
SELECT pgraft_get_leader();`}
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Replication Lag</h2>
          <p className="text-muted-foreground">
            Persistent lag reduces HA guarantees and can eventually force snapshot-based resyncs. Inspect backlog statistics and remediate system bottlenecks.
          </p>
          <SqlCodeBlock title="Lag analysis" code={lagSQL} />
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 space-y-2">
              <h3 className="font-semibold">Remediation Checklist</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Confirm follower disk I/O throughput with <code>iostat</code> or <code>pg_stat_io</code>.</li>
                <li>Reduce <code>pgraft.append_batch_size</code> temporarily to minimise follower catch-up bursts.</li>
                <li>Pause noisy maintenance tasks (vacuum, backups) until backlog clears.</li>
              </ul>
            </div>
            <SqlCodeBlock
              title="Force catch-up"
              code={`-- Run on impacted follower
SELECT pgraft_log_sync_with_leader();`}
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Performance Regression</h2>
          <p className="text-muted-foreground">
            Elevated latency often stems from heavy autovacuum workloads, oversized snapshots, or synchronous commit waits.
          </p>
          <SqlCodeBlock title="Autovacuum impact" code={vacuumImpact} />
          <div className="grid md:grid-cols-2 gap-4">
            <BashCodeBlock
              title="Monitor background writer"
              code={`psql -c "SELECT * FROM pg_stat_bgwriter;"
psql -c "SELECT * FROM pg_stat_io ORDER BY blks_read DESC LIMIT 10;"`}
            />
            <div className="border rounded-lg p-4 space-y-2">
              <h3 className="font-semibold">Tuning Tips</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Adjust <code>pgraft.heartbeat_interval</code> and <code>pgraft.append_batch_size</code> to balance throughput vs latency.</li>
                <li>Ensure WAL and pgraft data directories sit on dedicated SSD volumes.</li>
                <li>Use <code>pg_stat_statements</code> to detect query regressions post-upgrade.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Snapshot Failures</h2>
          <p className="text-muted-foreground">
            Snapshot creation errors can halt log compaction and inflate disk usage. Inspect snapshot directories and adjust thresholds.
          </p>
          <SqlCodeBlock
            title="Pending snapshots"
            code={`SELECT pending_snapshots,
       last_snapshot_term,
       last_snapshot_index
  FROM pgraft_log_get_stats();`}
          />
          <BashCodeBlock
            title="Snapshot directory"
            code={`ls -lh /var/lib/postgresql/pgraft/snapshots
sudo du -sh /var/lib/postgresql/pgraft/snapshots`}
          />
          <p className="text-sm text-muted-foreground">
            Lower <code>pgraft.snapshot_threshold</code> or prune stalled snapshots before restarting Raft workers. Ensure the pgraft superuser owns the snapshot directory and has read/write permissions.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Disaster Recovery</h2>
          <p className="text-muted-foreground">
            When a node cannot catch up via log shipping, resynchronize using base backups or rebootstrap membership while preserving quorum.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <SqlCodeBlock
              title="Remove &amp; rejoin node"
              code={`-- From leader
dO $$ BEGIN PERFORM pgraft_remove_node(3); END $$;

-- After base backup restore
SELECT pgraft_add_node(3, '10.0.0.13', 7003);`}
            />
            <BashCodeBlock
              title="Base backup"
              code={`pg_basebackup -h 10.0.0.11 -D /var/lib/postgresql/16/main -X stream -P`}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Always maintain majority quorum during DR: remove a failed node only after confirming at least two healthy replicas remain.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Escalation Path</h2>
          <p className="text-muted-foreground">
            If issues persist, gather a support bundle (see <a href="/docs/pgraft/troubleshooting" className="text-blue-500 hover:underline">troubleshooting playbook</a>) and contact pgElephant support with PostgreSQL version, pgraft commit SHA, cluster topology, and recent log excerpts.
          </p>
        </section>
      </div>
    </DocsContentLayout>
  )
}
