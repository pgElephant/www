import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'pgRaft Troubleshooting | Common Issues & Fixes',
  description:
    'Diagnose and resolve pgRaft consensus issues including quorum loss, replication lag, election churn, snapshot backlogs, and KV store anomalies.',
}

const tableOfContents: TocItem[] = [
  { id: 'fast-triage', title: 'Fast Triage Checklist' },
  { id: 'cluster-health', title: 'Cluster Health Baseline' },
  { id: 'connectivity', title: 'Connectivity & Identity' },
  { id: 'replication-lag', title: 'Replication Lag & Follower Recovery' },
  { id: 'leadership-stability', title: 'Leadership Stability' },
  { id: 'snapshots', title: 'Snapshots & Storage' },
  { id: 'kv-store', title: 'KV Store Integrity' },
  { id: 'support-bundle', title: 'Support Bundle' },
]

const prevLink: NavLink = {
  href: '/docs/pgraft/config-reference',
  label: 'Config Reference',
}

const nextLink: NavLink | undefined = undefined

const quickSql = `-- Verify cluster health from any node
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

const supportScript = [
  '#!/usr/bin/env bash',
  'DEST=/tmp/pgraft-support-$(date +%s)',
  'mkdir -p "$DEST"',
  '',
  "psql -f - <<'SQL'",
  '\\o ${DEST}/cluster_status.txt',
  'SELECT * FROM pgraft_get_cluster_status();',
  'SELECT * FROM pgraft_log_get_replication_status();',
  'SELECT * FROM pgraft_get_nodes();',
  'SELECT * FROM pgraft_log_get_stats();',
  'SQL',
  '',
  'cp /var/log/postgresql/postgresql-*-main.log "$DEST"/',
  'tar -C /tmp -czf pgraft-support.tar.gz "$(basename "$DEST")"',
].join('\n')

export default function PgraftTroubleshootingPage() {
  return (
    <PostgresDocsLayout
      title="Restore pgRaft Cluster Health"
      version="pgraft Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="fast-triage">
        <h2>Fast Triage Checklist</h2>
        <p>Before making changes, follow these steps:</p>
        <ul>
          <li>Run the cluster health SQL below on the leader before making changes</li>
          <li>Confirm only one node reports <code>state = leader</code> in <code>pgraft_cluster_state</code></li>
          <li>Capture <code>journalctl -u postgresql</code> output from leaders and lagging followers</li>
          <li>Back up <code>pgraft.data_dir</code> contents prior to aggressive snapshot cleanup</li>
        </ul>
        <p>Perform remediation in a staging or maintenance window whenever possible. Revert temporary settings after the incident.</p>
      </section>

      <section id="cluster-health">
        <h2>Cluster Health Baseline</h2>
        <p>Collect cluster state, replication backlog, and heartbeat metrics before applying fixes.</p>

        <h3>Gather health snapshot</h3>
        <SqlCodeBlock title="Baseline diagnostics" code={quickSql} />
        <p>Look for exactly one leader, low <code>lag_entries</code>, and matching <code>current_term</code> across nodes.</p>

        <h3>Interpretation cues</h3>
        <ul>
          <li>If <code>lag_entries</code> exceeds 100, start recovery on the slow follower.</li>
          <li>Quorum must equal the expected cluster size; fewer nodes indicate connectivity or identity drift.</li>
          <li>Large gaps between <code>messages_processed</code> on leader vs followers highlight stalled workers.</li>
        </ul>
      </section>

      <section id="connectivity">
        <h2>Connectivity & Identity</h2>
        <p>Resolve node identity mismatches and network blocks that prevent Raft replication.</p>

        <h3>Validate node identity</h3>
        <SqlCodeBlock
          title="Catalog review"
          code={`SELECT node_id,
       cluster_id,
       address,
       port,
       data_dir
  FROM pgraft_nodes_catalog
 ORDER BY node_id;`}
        />

        <h3>Network reachability</h3>
        <BashCodeBlock
          title="Connectivity commands"
          code={`# Verify Raft ports
nc -vz 10.0.0.12 7002

# Confirm pg_hba allows replication connections
psql -c "SELECT * FROM pg_hba_file_rules WHERE user_name = 'pgraft_cluster';"`}
        />

        <h3>Remediation steps</h3>
        <ul>
          <li>Ensure <code>pgraft.cluster_id</code> matches on every node; mismatched IDs form separate quorums.</li>
          <li>Assign unique <code>pgraft.node_id</code> values and restart nodes after updates.</li>
          <li>Reload PostgreSQL when altering <code>pg_hba.conf</code> or replication credentials.</li>
        </ul>
      </section>

      <section id="replication-lag">
        <h2>Replication Lag & Follower Recovery</h2>
        <p>Bring slow followers back into quorum and alert on backlogs before they become critical.</p>

        <h3>Inspect lagging followers</h3>
        <SqlCodeBlock
          title="Lag diagnostics"
          code={`SELECT node_id,
       state,
       lag_entries,
       replication_lag_bytes,
       last_apply_lsn
  FROM pgraft_log_get_replication_status()
 ORDER BY lag_entries DESC;`}
        />

        <h3>Force follower resync</h3>
        <SqlCodeBlock
          title="Follower catch-up"
          code={`-- Run on lagging follower once connectivity is restored
SELECT pgraft_log_sync_with_leader();`}
        />

        <h3>Alert on backlog</h3>
        <BashCodeBlock title="Lag alert script" code={lagScript} />
      </section>

      <section id="leadership-stability">
        <h2>Leadership Stability</h2>
        <p>Reduce election churn and heartbeat noise that introduce latency spikes.</p>

        <h3>Detect election drift</h3>
        <SqlCodeBlock title="Election analysis" code={electionDrift} />

        <h3>Tune timing parameters</h3>
        <BashCodeBlock
          title="Adjust timers"
          code={`psql -c "SELECT pgraft_set_config('election_timeout', '1200ms');"
psql -c "SELECT pgraft_set_config('heartbeat_interval', '60ms');"
psql -c "SELECT pgraft_save_config();"`}
        />

        <h3>Stabilization tips</h3>
        <ul>
          <li>Increase <code>election_timeout</code> during heavy write bursts.</li>
          <li>Ensure leaders have sufficient CPU headroom for heartbeats.</li>
          <li>Temporarily disable aggressive failover automation during maintenance.</li>
        </ul>
      </section>

      <section id="snapshots">
        <h2>Snapshots & Storage</h2>
        <p>Clear snapshot backlogs and monitor disk usage for Raft metadata.</p>

        <h3>Check snapshot backlog</h3>
        <SqlCodeBlock
          title="Snapshot metrics"
          code={`SELECT total_entries,
       pending_snapshots,
       last_snapshot_term,
       last_snapshot_index
  FROM pgraft_log_get_stats();`}
        />

        <h3>Inspect snapshot directory</h3>
        <BashCodeBlock
          title="Disk usage"
          code={`du -sh /var/lib/postgresql/pgraft/snapshots
ls -lh /var/lib/postgresql/pgraft/snapshots | tail -10`}
        />

        <h3>Remediation tips</h3>
        <ul>
          <li>Lower <code>pgraft.snapshot_threshold</code> to shorten log retention during churn.</li>
          <li>Move snapshot storage to SSD tiers for faster compaction.</li>
          <li>Archive old snapshots after confirming recent copies exist elsewhere.</li>
        </ul>
      </section>

      <section id="kv-store">
        <h2>KV Store Integrity</h2>
        <p>Validate replicated KV operations and watch for oversized payloads.</p>

        <h3>Roundtrip test</h3>
        <SqlCodeBlock
          title="Health probe"
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

        <h3>Detect skewed entries</h3>
        <SqlCodeBlock
          title="Large value audit"
          code={`SELECT key,
       pg_column_size(value) AS value_bytes,
       updated_at
  FROM pgraft.kv
 ORDER BY updated_at DESC
 LIMIT 20;`}
        />
      </section>

      <section id="support-bundle">
        <h2>Support Bundle</h2>
        <p>Collect logs and catalog snapshots before contacting pgElephant support.</p>
        <BashCodeBlock title="Generate support bundle" code={supportScript} />
      </section>
    </PostgresDocsLayout>
  )
}
