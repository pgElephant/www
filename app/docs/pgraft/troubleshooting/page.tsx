import { Metadata } from 'next'
import GettingStartedLayout from '../../../../components/GettingStartedLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import { PgraftIcon } from '../../../../components/ProductIcons'

export const metadata: Metadata = {
  title: 'pgRaft Troubleshooting | Common Issues & Fixes',
  description:
    'Diagnose and resolve pgRaft consensus issues including quorum loss, replication lag, election churn, snapshot backlogs, and KV store anomalies.',
}

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
    <GettingStartedLayout
      product="pgRaft"
      hero={{
        label: 'pgRaft',
        labelIcon: <PgraftIcon size={20} />, 
        labelAccent: 'blue',
        title: 'Restore pgRaft Cluster Health',
        description:
          'Follow these diagnostic cards to recover from quorum loss, replication lag, leadership churn, and storage backlogs. Each step includes SQL and Bash commands you can run immediately.',
        cta: {
          href: '/docs/pgraft/troubleshooting',
          label: 'Bookmark troubleshooting playbook',
        },
      }}
      theme={{
        pageBackground: 'bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-950',
        heroOverlay: 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 dark:from-blue-500/10 dark:to-cyan-500/10',
        requirementsBorder: 'blue',
        requirementsBackground: 'bg-white/90 dark:bg-slate-900/70',
      }}
      requirements={{
        title: 'Fast triage checklist',
        items: [
          'Run the cluster health SQL below on the leader before making changes',
          'Confirm only one node reports `state = leader` in `pgraft_cluster_state`',
          'Capture `journalctl -u postgresql` output from leaders and lagging followers',
          'Back up `pgraft.data_dir` contents prior to aggressive snapshot cleanup',
        ],
        note: 'Perform remediation in a staging or maintenance window whenever possible. Revert temporary settings after the incident.',
      }}
      sections={[
        {
          title: 'Cluster health baseline',
          description: 'Collect cluster state, replication backlog, and heartbeat metrics before applying fixes.',
          cards: [
            {
              id: 'baseline-sql',
              title: 'Gather health snapshot',
              accent: 'blue',
              content: (
                <>
                  <SqlCodeBlock title="Baseline diagnostics" code={quickSql} />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Look for exactly one leader, low <code>lag_entries</code>, and matching <code>current_term</code> across nodes.
                  </p>
                </>
              ),
            },
            {
              id: 'baseline-interpret',
              title: 'Interpretation cues',
              accent: 'slate',
              content: (
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>If <code>lag_entries</code> exceeds 100, start recovery on the slow follower.</li>
                  <li>Quorum must equal the expected cluster size; fewer nodes indicate connectivity or identity drift.</li>
                  <li>Large gaps between <code>messages_processed</code> on leader vs followers highlight stalled workers.</li>
                </ul>
              ),
            },
          ],
        },
        {
          title: 'Connectivity & identity',
          description: 'Resolve node identity mismatches and network blocks that prevent Raft replication.',
          cards: [
            {
              id: 'identity',
              title: 'Validate node identity',
              accent: 'cyan',
              content: (
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
              ),
            },
            {
              id: 'network',
              title: 'Network reachability',
              accent: 'emerald',
              content: (
                <BashCodeBlock
                  title="Connectivity commands"
                  code={`# Verify Raft ports
nc -vz 10.0.0.12 7002

# Confirm pg_hba allows replication connections
psql -c "SELECT * FROM pg_hba_file_rules WHERE user_name = 'pgraft_cluster';"`}
                />
              ),
            },
            {
              id: 'connect-remediation',
              title: 'Remediation steps',
              accent: 'blue',
              content: (
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Ensure <code>pgraft.cluster_id</code> matches on every node; mismatched IDs form separate quorums.</li>
                  <li>Assign unique <code>pgraft.node_id</code> values and restart nodes after updates.</li>
                  <li>Reload PostgreSQL when altering <code>pg_hba.conf</code> or replication credentials.</li>
                </ul>
              ),
            },
          ],
        },
        {
          title: 'Replication lag & follower recovery',
          description: 'Bring slow followers back into quorum and alert on backlogs before they become critical.',
          cards: [
            {
              id: 'lag-inspect',
              title: 'Inspect lagging followers',
              accent: 'blue',
              content: (
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
              ),
            },
            {
              id: 'lag-recover',
              title: 'Force follower resync',
              accent: 'purple',
              content: (
                <SqlCodeBlock
                  title="Follower catch-up"
                  code={`-- Run on lagging follower once connectivity is restored
SELECT pgraft_log_sync_with_leader();`}
                />
              ),
            },
            {
              id: 'lag-alerting',
              title: 'Alert on backlog',
              accent: 'rose',
              content: <BashCodeBlock title="Lag alert script" code={lagScript} />,
            },
          ],
        },
        {
          title: 'Leadership stability',
          description: 'Reduce election churn and heartbeat noise that introduce latency spikes.',
          cards: [
            {
              id: 'election-drift',
              title: 'Detect election drift',
              accent: 'indigo',
              content: <SqlCodeBlock title="Election analysis" code={electionDrift} />,
            },
            {
              id: 'timing',
              title: 'Tune timing parameters',
              accent: 'amber',
              content: (
                <BashCodeBlock
                  title="Adjust timers"
                  code={`psql -c "SELECT pgraft_set_config('election_timeout', '1200ms');"
psql -c "SELECT pgraft_set_config('heartbeat_interval', '60ms');"
psql -c "SELECT pgraft_save_config();"`}
                />
              ),
            },
            {
              id: 'stability-tips',
              title: 'Stabilization tips',
              accent: 'slate',
              content: (
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Increase <code>election_timeout</code> during heavy write bursts.</li>
                  <li>Ensure leaders have sufficient CPU headroom for heartbeats.</li>
                  <li>Temporarily disable aggressive failover automation during maintenance.</li>
                </ul>
              ),
            },
          ],
        },
        {
          title: 'Snapshots & storage',
          description: 'Clear snapshot backlogs and monitor disk usage for Raft metadata.',
          cards: [
            {
              id: 'snapshot-sql',
              title: 'Check snapshot backlog',
              accent: 'cyan',
              content: (
                <SqlCodeBlock
                  title="Snapshot metrics"
                  code={`SELECT total_entries,
       pending_snapshots,
       last_snapshot_term,
       last_snapshot_index
  FROM pgraft_log_get_stats();`}
                />
              ),
            },
            {
              id: 'snapshot-disk',
              title: 'Inspect snapshot directory',
              accent: 'emerald',
              content: (
                <BashCodeBlock
                  title="Disk usage"
                  code={`du -sh /var/lib/postgresql/pgraft/snapshots
ls -lh /var/lib/postgresql/pgraft/snapshots | tail -10`}
                />
              ),
            },
            {
              id: 'snapshot-remediation',
              title: 'Remediation tips',
              accent: 'blue',
              content: (
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Lower <code>pgraft.snapshot_threshold</code> to shorten log retention during churn.</li>
                  <li>Move snapshot storage to SSD tiers for faster compaction.</li>
                  <li>Archive old snapshots after confirming recent copies exist elsewhere.</li>
                </ul>
              ),
            },
          ],
        },
        {
          title: 'KV store integrity',
          description: 'Validate replicated KV operations and watch for oversized payloads.',
          cards: [
            {
              id: 'kv-roundtrip',
              title: 'Roundtrip test',
              accent: 'purple',
              content: (
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
              ),
            },
            {
              id: 'kv-skew',
              title: 'Detect skewed entries',
              accent: 'indigo',
              content: (
                <SqlCodeBlock
                  title="Large value audit"
                  code={`SELECT key,
       pg_column_size(value) AS value_bytes,
       updated_at
  FROM pgraft.kv
 ORDER BY updated_at DESC
 LIMIT 20;`}
                />
              ),
            },
          ],
        },
        {
          title: 'Support bundle',
          description: 'Collect logs and catalog snapshots before contacting pgElephant support.',
          cards: [
            {
              id: 'support-bundle',
              title: 'Generate support bundle',
              accent: 'rose',
              content: <BashCodeBlock title="Support script" code={supportScript} />,
            },
          ],
        },
      ]}
    />
  )
}