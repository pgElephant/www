import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'Monitoring and Observability | pgraft',
  description:
    'Complete monitoring guide for pgraft: metrics, health checks, status views, alerting, performance tracking, and operational insights.',
}

const tableOfContents: TocItem[] = [
  { id: 'status-views', title: 'Status Views and Health Functions' },
  { id: 'log-replication', title: 'Log Replication Monitoring' },
  { id: 'kv-monitoring', title: 'Key-Value Store Monitoring' },
  { id: 'performance-metrics', title: 'Performance & Election Metrics' },
  { id: 'system-views', title: 'System Monitoring Views' },
  { id: 'alerting', title: 'Alerting & Automation' },
  { id: 'dashboards', title: 'Dashboards & Visualization' },
  { id: 'log-analysis', title: 'Log Analysis & Debugging' },
  { id: 'best-practices', title: 'Best Practices Checklist' },
]

const prevLink: NavLink = {
  href: '/docs/pgraft/tutorial',
  label: 'Tutorial',
}

const nextLink: NavLink = {
  href: '/docs/pgraft/raft-protocol',
  label: 'Raft Protocol',
}

export default function PgraftMonitoringPage() {
  return (
    <PostgresDocsLayout
      title="Monitoring and Observability"
      version="pgraft Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
        <section className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Monitoring Fundamentals</h3>
            <ul>
            <li>
              <strong>Cluster health:</strong> Track leader election, node connectivity, and quorum status.
            </li>
            <li>
              <strong>Replication lag:</strong> Monitor Raft log replication and corrective actions.
            </li>
            <li>
              <strong>Performance metrics:</strong> Heartbeats, elections, message throughput, worker uptime.
            </li>
            <li>
              <strong>Resource usage:</strong> Disk availability for WAL/logs, memory pressure, snapshot retention.
            </li>
            <li>
              <strong>Operational events:</strong> Node additions/removals, failovers, configuration changes.
            </li>
          </ul>
        </section>

      <section id="status-views">
        <h2>Status Views and Health Functions</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold">Cluster Overview</h3>
              <p>
                Primary function for monitoring leadership, quorum, and message counters from any node.
              </p>
              <SqlCodeBlock
                title="Cluster status snapshot"
                code={`-- Comprehensive cluster status
SELECT * FROM pgraft_get_cluster_status();

-- Columns include:
-- node_id, current_term, leader_id, state, num_nodes,
-- messages_processed, heartbeats_sent, elections_triggered`}
              />
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-3">
                <strong>Health indicators:</strong> All nodes should agree on <code>leader_id</code> and <code>current_term</code>, only one
                node reports <code>state = 'leader'</code>, and <code>elections_triggered</code> should rarely increase.
              </div>
            </div>
            <div className="border rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold">Node &amp; Worker Visibility</h3>
              <SqlCodeBlock
                title="Registered members"
                code={`-- View cluster membership
SELECT * FROM pgraft_get_nodes();

-- During partitions use Raft source of truth
SELECT pgraft_get_nodes_from_raft();`}
              />
              <SqlCodeBlock
                title="Leader detection"
                code={`SELECT pgraft_get_leader() AS leader_id,
       pgraft_is_leader() AS am_i_leader,
       pgraft_get_term() AS current_term;`}
              />
              <SqlCodeBlock
                title="Worker status"
                code={`SELECT * FROM pgraft_worker_status;
-- Columns: state, last_tick, uptime_seconds`}
              />
            </div>
          </div>
      </section>

      <section id="log-replication">
        <h2>Log Replication Monitoring</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold">Replication Status</h3>
              <p>
                Track follower lag and match indexes to keep quorum healthy under load.
              </p>
              <SqlCodeBlock
                title="Follower replication health"
                code={`SELECT node_id,
       match_index,
       commit_index,
       lag_entries,
       state
  FROM pgraft_log_get_replication_status();`}
              />
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md p-3">
                <strong>Alert guidance:</strong> <code>lag_entries &gt; 100</code> (warning), <code>&gt; 1000</code> (critical), or
                <code>state = 'stalled'</code> requires immediate remediation.
              </div>
            </div>
            <div className="border rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold">Log &amp; Snapshot Metrics</h3>
              <SqlCodeBlock
                title="Log volume"
                code={`SELECT first_index,
       last_index,
       commit_index,
       applied_index,
       total_entries,
       disk_usage_mb
  FROM pgraft_log_get_stats();`}
              />
              <SqlCodeBlock
                title="Growth analysis"
                code={`SELECT total_entries,
       disk_usage_mb,
       (disk_usage_mb::float / NULLIF(total_entries, 0)) * 1024 AS avg_entry_kb
  FROM pgraft_log_get_stats();`}
              />
              <SqlCodeBlock
                title="Force follower resync"
                code={`-- Execute on lagging follower
SELECT pgraft_log_sync_with_leader();`}
              />
            </div>
          </div>
      </section>

      <section id="kv-monitoring">
        <h2>Key-Value Store Monitoring</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold">Usage &amp; Capacity</h3>
              <SqlCodeBlock
                title="KV statistics"
                code={`SELECT total_keys,
       total_size_bytes,
       oldest_key_age,
       newest_key_age,
       avg_value_size
  FROM pgraft_kv_get_stats();`}
              />
              <SqlCodeBlock
                title="KV status"
                code={`SELECT keys_count,
       values_size_mb,
       compaction_count,
       last_compact_at
  FROM pgraft_kv_status;`}
              />
            </div>
            <div className="border rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold">Health &amp; Trend Checks</h3>
              <SqlCodeBlock
                title="End-to-end KV health"
                code={`DO $$
DECLARE
  test_key TEXT := 'health_check_' || extract(epoch FROM now());
  test_value TEXT := 'test_value_' || md5(random()::text);
  roundtrip TEXT;
BEGIN
  PERFORM pgraft_kv_put(test_key, test_value);
  SELECT pgraft_kv_get(test_key) INTO roundtrip;
  IF roundtrip != test_value THEN
    RAISE EXCEPTION 'KV health check failed';
  END IF;
  PERFORM pgraft_kv_delete(test_key);
END;
$$;`}
              />
              <SqlCodeBlock
                title="30-day growth trend"
                code={`WITH daily_growth AS (
  SELECT date_trunc('day', created_at) AS day,
         COUNT(*) AS keys_added,
         SUM(pg_column_size(value)) AS bytes_added
    FROM pgraft.kv
   WHERE created_at > now() - interval '30 days'
   GROUP BY 1
)
SELECT day,
       keys_added,
       bytes_added / 1024 / 1024 AS mb_added,
       SUM(keys_added) OVER (ORDER BY day) AS cumulative_keys,
       SUM(bytes_added) OVER (ORDER BY day) / 1024 / 1024 AS cumulative_mb
  FROM daily_growth
 ORDER BY day DESC;`}
              />
            </div>
          </div>
      </section>

      <section id="performance-metrics">
        <h2>Performance & Election Metrics</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold">Message Throughput</h3>
              <SqlCodeBlock
                title="Messages per heartbeat"
                code={`SELECT node_id,
       messages_processed,
       heartbeats_sent,
       messages_processed / GREATEST(heartbeats_sent, 1) AS msg_per_heartbeat
  FROM pgraft_get_cluster_status();`}
              />
              <SqlCodeBlock
                title="Historical rate (requires sampling)"
                code={`WITH current AS (
  SELECT *
    FROM pgraft_metrics_history
   ORDER BY recorded_at DESC
   LIMIT 1
),
previous AS (
  SELECT *
    FROM pgraft_metrics_history
   WHERE recorded_at <= now() - interval '1 hour'
   ORDER BY recorded_at DESC
   LIMIT 1
)
SELECT c.node_id,
       (c.messages_processed - p.messages_processed)
         / EXTRACT(EPOCH FROM (c.recorded_at - p.recorded_at)) AS messages_per_second,
       (c.heartbeats_sent - p.heartbeats_sent)
         / EXTRACT(EPOCH FROM (c.recorded_at - p.recorded_at)) AS heartbeats_per_second
  FROM current c
  JOIN previous p USING (node_id);`}
              />
            </div>
            <div className="border rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold">Election Stability</h3>
              <SqlCodeBlock
                title="Election rate"
                code={`SELECT node_id,
       state,
       elections_triggered,
       current_term,
       elections_triggered::float / GREATEST(current_term, 1) AS elections_per_term
  FROM pgraft_get_cluster_status();`}
              />
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
                <strong>Investigate immediately when:</strong> <code>elections_per_term &gt; 2</code>,
                <code>current_term</code> spikes unexpectedly, or multiple nodes report <code>state = 'candidate'</code>.
              </div>
              <BashCodeBlock
                title="Snapshot hygiene"
                code={`# Inspect snapshot directory for growth and cadence
ls -lh /var/lib/postgresql/pgraft/snapshots/ | tail -10

# Check configured snapshot threshold
psql -c "SHOW pgraft.snapshot_threshold;"`}
              />
            </div>
          </div>
      </section>

      <section id="system-views">
        <h2>System Monitoring Views</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold">etcd-Compatible Views</h3>
              <SqlCodeBlock
                title="Endpoints &amp; health"
                code={`SELECT * FROM pgraft.member_list;
SELECT * FROM pgraft.endpoint_health;
SELECT * FROM pgraft.cluster_health;
SELECT * FROM pgraft.cluster_info;`}
              />
            </div>
            <div className="border rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold">Cluster State Summary</h3>
              <SqlCodeBlock
                title="Create summary view"
                code={`CREATE OR REPLACE VIEW pgraft_health_summary AS
SELECT CURRENT_TIMESTAMP AS checked_at,
       COUNT(*) AS total_nodes,
       COUNT(*) FILTER (WHERE state = 'leader') AS num_leaders,
       COUNT(*) FILTER (WHERE state = 'follower') AS num_followers,
       COUNT(*) FILTER (WHERE state = 'candidate') AS num_candidates,
       MAX(term) AS current_term,
       BOOL_AND(leader) AS has_leader
  FROM pgraft_cluster_state;`}
              />
              <SqlCodeBlock title="Query summary" code={`SELECT * FROM pgraft_health_summary;`} />
            </div>
          </div>
      </section>

      <section id="alerting">
        <h2>Alerting & Automation</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold">Database Health Check</h3>
              <SqlCodeBlock
                title="Comprehensive PL/pgSQL check"
                code={`CREATE OR REPLACE FUNCTION pgraft_health_check()
RETURNS TABLE(check_name TEXT, status TEXT, message TEXT, severity TEXT) AS $$
DECLARE
  v_status pgraft_get_cluster_status%ROWTYPE;
BEGIN
  SELECT * INTO v_status FROM pgraft_get_cluster_status() LIMIT 1;

  RETURN QUERY
    SELECT 'leader_election',
           CASE
             WHEN (SELECT COUNT(*) FROM pgraft_cluster_state WHERE state = 'leader') = 0 THEN 'CRITICAL'
             WHEN (SELECT COUNT(*) FROM pgraft_cluster_state WHERE state = 'leader') > 1 THEN 'CRITICAL'
             ELSE 'OK'
           END,
           format('Leader ID %s', v_status.leader_id),
           'info';

  RETURN QUERY
    SELECT 'quorum',
           CASE WHEN v_status.num_nodes < 3 THEN 'WARNING' ELSE 'OK' END,
           format('%s nodes in cluster', v_status.num_nodes),
           CASE WHEN v_status.num_nodes < 3 THEN 'warning' ELSE 'info' END;

  RETURN QUERY
    SELECT 'election_stability',
           CASE WHEN v_status.elections_triggered::float / GREATEST(v_status.current_term, 1) > 2 THEN 'WARNING' ELSE 'OK' END,
           format('%s elections across %s terms', v_status.elections_triggered, v_status.current_term),
           CASE WHEN v_status.elections_triggered::float / GREATEST(v_status.current_term, 1) > 2 THEN 'warning' ELSE 'info' END;

  RETURN QUERY
    SELECT 'replication_lag',
           CASE WHEN EXISTS (SELECT 1 FROM pgraft_log_get_replication_status() WHERE lag_entries > 100) THEN 'WARNING' ELSE 'OK' END,
           CASE WHEN EXISTS (SELECT 1 FROM pgraft_log_get_replication_status() WHERE lag_entries > 100) THEN 'Followers lagging > 100 entries' ELSE 'All followers up to date' END,
           CASE WHEN EXISTS (SELECT 1 FROM pgraft_log_get_replication_status() WHERE lag_entries > 100) THEN 'warning' ELSE 'info' END;
END;
$$ LANGUAGE plpgsql;`}
              />
              <SqlCodeBlock title="Execute health check" code={`SELECT * FROM pgraft_health_check();`} />
            </div>
            <div className="border rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold">Automation Scripts</h3>
              <BashCodeBlock
                title="Prometheus exporter"
                code={`#!/usr/bin/env bash
cat <<'EOF'
# HELP pgraft_cluster_nodes Total number of nodes in cluster
# TYPE pgraft_cluster_nodes gauge
pgraft_cluster_nodes $(psql -t -c "SELECT num_nodes FROM pgraft_get_cluster_status();")

# HELP pgraft_is_leader Whether this node is the leader (1=yes, 0=no)
# TYPE pgraft_is_leader gauge
pgraft_is_leader $(psql -t -c "SELECT CASE WHEN pgraft_is_leader() THEN 1 ELSE 0 END;")

# HELP pgraft_current_term Current Raft election term
# TYPE pgraft_current_term counter
pgraft_current_term $(psql -t -c "SELECT pgraft_get_term();")

# HELP pgraft_messages_processed Total Raft messages processed
# TYPE pgraft_messages_processed counter
pgraft_messages_processed $(psql -t -c "SELECT messages_processed FROM pgraft_get_cluster_status();")

# HELP pgraft_elections_triggered Total elections triggered
# TYPE pgraft_elections_triggered counter
pgraft_elections_triggered $(psql -t -c "SELECT elections_triggered FROM pgraft_get_cluster_status();")

# HELP pgraft_log_entries Total log entries
# TYPE pgraft_log_entries gauge
pgraft_log_entries $(psql -t -c "SELECT total_entries FROM pgraft_log_get_stats();")

# HELP pgraft_log_disk_mb Log disk usage in megabytes
# TYPE pgraft_log_disk_mb gauge
pgraft_log_disk_mb $(psql -t -c "SELECT disk_usage_mb FROM pgraft_log_get_stats();")

# HELP pgraft_kv_keys Total KV store keys
# TYPE pgraft_kv_keys gauge
pgraft_kv_keys $(psql -t -c "SELECT total_keys FROM pgraft_kv_get_stats();")
EOF`}
              />
              <BashCodeBlock
                title="Email alert driver"
                code={`#!/usr/bin/env bash
ALERT_EMAIL="ops@example.com"
LOG_FILE="/var/log/pgraft-alerts.log"

HEALTH_CHECK=$(psql -t -c "
SELECT string_agg(
  check_name || ': ' || status || ' - ' || message,
  E'\\n'
)
FROM pgraft_health_check()
WHERE severity IN ('warning', 'critical');
")

if [[ -n "$HEALTH_CHECK" ]]; then
  echo "$(date --iso-8601=seconds): ALERT - $HEALTH_CHECK" >> "$LOG_FILE"
  printf '%s\n' "$HEALTH_CHECK" | mail -s "pgraft Cluster Alert" "$ALERT_EMAIL"
fi

MAX_LAG=$(psql -t -c "SELECT COALESCE(MAX(lag_entries), 0) FROM pgraft_log_get_replication_status();")
if [[ "$MAX_LAG" -gt 1000 ]]; then
  echo "$(date --iso-8601=seconds): ALERT - Replication lag: $MAX_LAG entries" >> "$LOG_FILE"
  printf 'Critical replication lag: %s entries\n' "$MAX_LAG" | mail -s "pgraft Replication Lag Alert" "$ALERT_EMAIL"
fi`}
              />
            </div>
          </div>
      </section>

      <section id="dashboards">
        <h2>Dashboards & Visualization</h2>
          <SqlCodeBlock
            title="Sample Grafana queries"
            code={`-- Cluster overview
SELECT num_nodes AS "Total Nodes",
       (SELECT COUNT(*) FROM pgraft_cluster_state WHERE state = 'leader') AS "Leaders",
       (SELECT COUNT(*) FROM pgraft_cluster_state WHERE state = 'follower') AS "Followers",
       current_term AS "Current Term"
  FROM pgraft_get_cluster_status();

-- Replication lag panel
SELECT node_id AS "Node",
       lag_entries AS "Lag (entries)",
       state AS "Status"
  FROM pgraft_log_get_replication_status()
 ORDER BY lag_entries DESC;

-- KV store growth
SELECT total_keys AS "Total Keys",
       total_size_bytes / 1024 / 1024 AS "Size (MB)",
       avg_value_size / 1024 AS "Avg Value (KB)"
  FROM pgraft_kv_get_stats();`}
          />
      </section>

      <section id="log-analysis">
        <h2>Log Analysis & Debugging</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold">PostgreSQL Logs</h3>
              <BashCodeBlock
                title="Tail and filter"
                code={`sudo tail -f /var/log/postgresql/postgresql-17-main.log | grep -i pgraft
sudo grep -i "pgraft.*error" /var/log/postgresql/postgresql-17-main.log
sudo grep -i "pgraft.*election" /var/log/postgresql/postgresql-17-main.log | tail -20
sudo grep -E "pgraft.*(add_node|remove_node)" /var/log/postgresql/postgresql-17-main.log`}
              />
            </div>
            <div className="border rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold">Debug Mode</h3>
              <SqlCodeBlock
                title="Toggle verbose tracing"
                code={`SELECT pgraft_set_debug(true);
-- Perform operations requiring deep tracing
SELECT pgraft_set_debug(false);`}
              />
              <BashCodeBlock
                title="Inspect debug output"
                code={`sudo tail -100 /var/log/postgresql/postgresql-17-main.log | grep "DEBUG.*pgraft"`}
              />
            </div>
          </div>
      </section>

      <section id="best-practices">
        <h2>Best Practices Checklist</h2>
        <ul>
            <li>
              <strong>Continuous monitoring:</strong> Execute health checks every 1–5 minutes via cron or agents.
            </li>
            <li>
              <strong>Historical retention:</strong> Store metrics in a time-series database for capacity planning and regression detection.
            </li>
            <li>
              <strong>Alert thresholds:</strong> Leader absence (critical), replication lag &gt; 100 entries (warning) / &gt; 1000 (critical), rising election rates, node count mismatches.
            </li>
            <li>
              <strong>Dashboard coverage:</strong> Visualize leadership, replication health, log throughput, and KV growth trends.
            </li>
            <li>
              <strong>Log hygiene:</strong> Retain PostgreSQL logs for at least seven days and forward them to centralized logging.
            </li>
            <li>
              <strong>Capacity planning:</strong> Track disk usage for WAL, snapshots, and KV state to avoid emergency pruning.
            </li>
            <li>
              <strong>Regular rehearsal:</strong> Test failover and replica catch-up quarterly to validate tooling and runbooks.
            </li>
        </ul>
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
            <li>
              <a href="/docs/pgraft/troubleshooting" className="text-blue-500 hover:underline">
                Troubleshooting Guide
              </a>{' '}
              – Diagnose and resolve common incidents.
            </li>
            <li>
              <a href="/docs/pgraft/config-reference" className="text-blue-500 hover:underline">
                Configuration Reference
              </a>{' '}
              – Review every pgraft GUC and tuning option.
            </li>
            <li>
              <a href="/docs/pgraft/cluster-management" className="text-blue-500 hover:underline">
                Cluster Management
              </a>{' '}
              – Node lifecycle, rolling maintenance, and failovers.
            </li>
            <li>
              <a href="/docs/pgraft/sql-reference" className="text-blue-500 hover:underline">
                SQL API Reference
              </a>{' '}
              – Complete catalog of functions and views.
            </li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
