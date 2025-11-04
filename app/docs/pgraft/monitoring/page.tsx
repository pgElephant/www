import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Monitoring and Observability | pgraft',
  description: 'Complete monitoring guide for pgraft: metrics, health checks, status views, alerting, performance tracking, and operational insights.'
};

export default function PgraftMonitoringPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Monitoring and Observability</h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive guide to monitoring pgraft clusters: status views, metrics, health checks, log analysis, and alerting strategies.
        </p>
      </div>

      <section className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Monitoring Fundamentals</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>Cluster Health:</strong> Track leader election, node connectivity, and quorum status</li>
          <li><strong>Replication Lag:</strong> Monitor Raft log replication across followers</li>
          <li><strong>Performance Metrics:</strong> Heartbeats, elections, message processing rates</li>
          <li><strong>Resource Usage:</strong> Disk space for logs/snapshots, memory consumption</li>
          <li><strong>Operational Events:</strong> Node additions/removals, failovers, configuration changes</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Status Views and Functions</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Cluster Status Overview</h3>
            <p className="mb-2 text-muted-foreground">
              Primary function for monitoring overall cluster health:
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Get comprehensive cluster status
SELECT * FROM pgraft_get_cluster_status();

-- Returns:
--  node_id | current_term | leader_id | state    | num_nodes | messages_processed | heartbeats_sent | elections_triggered
-- ---------+--------------+-----------+----------+-----------+--------------------+-----------------+--------------------
--        1 |           15 |         1 | leader   |         3 |              45203 |           12450 |                   2

-- Columns explained:
-- node_id              : ID of this node (1, 2, 3, etc.)
-- current_term         : Current Raft election term
-- leader_id            : ID of current leader node
-- state                : Node state (leader, follower, candidate)
-- num_nodes            : Total nodes in cluster
-- messages_processed   : Total Raft messages processed
-- heartbeats_sent      : Heartbeats sent (leader only)
-- elections_triggered  : Number of elections this node participated in`}</code>
            </pre>
            
            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-sm">
              <strong>Health Indicators:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><code>num_nodes</code> should match expected cluster size</li>
                <li>All nodes should see same <code>leader_id</code> and <code>current_term</code></li>
                <li>Exactly one node should have <code>state = 'leader'</code></li>
                <li>High <code>elections_triggered</code> indicates instability</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Node Information</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- View all nodes in cluster
SELECT * FROM pgraft_get_nodes();

-- Returns:
--  node_id | address     | port | is_leader 
-- ---------+-------------+------+-----------
--        1 | 10.0.1.11   | 7001 | t
--        2 | 10.0.1.12   | 7002 | f
--        3 | 10.0.1.13   | 7003 | f

-- Alternative: Get nodes directly from Raft (works even on disconnected replicas)
SELECT pgraft_get_nodes_from_raft();
-- Returns: JSON string with node details`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Leader Detection</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Check if current node is the leader
SELECT pgraft_is_leader();
-- Returns: true or false

-- Get current leader node ID
SELECT pgraft_get_leader();
-- Returns: 1, 2, or 3 (node ID)

-- Get current Raft term
SELECT pgraft_get_term();
-- Returns: 15 (term number)

-- Combined leadership check
SELECT 
    pgraft_get_leader() AS leader_id,
    pgraft_is_leader() AS am_i_leader,
    pgraft_get_term() AS current_term;
--  leader_id | am_i_leader | current_term 
-- -----------+-------------+--------------
--          1 | f           |           15`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Worker State</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Check pgraft background worker status
SELECT pgraft_get_worker_state();
-- Returns: 'running', 'stopped', 'error', etc.

-- Alternative: View worker status via system view
SELECT * FROM pgraft_worker_status;
--  state   | last_tick           | uptime_seconds 
-- ---------+---------------------+----------------
--  running | 2024-11-04 10:15:32 |          18445`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Version Information</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Get pgraft version
SELECT pgraft_get_version();
-- Returns: '1.0.0'

-- Detailed extension info
SELECT * FROM pg_extension WHERE extname = 'pgraft';
--  oid  | extname | extowner | extnamespace | ... 
-- ------+---------+----------+--------------+-----`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Log Replication Monitoring</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Replication Status</h3>
            <p className="mb-2 text-muted-foreground">
              Monitor log replication lag across follower nodes:
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Get replication status for all followers
SELECT * FROM pgraft_log_get_replication_status();

-- Returns (when run on leader):
--  node_id | match_index | next_index | commit_index | lag_entries | state 
-- ---------+-------------+------------+--------------+-------------+--------
--        2 |        1250 |       1251 |         1250 |           0 | ok
--        3 |        1248 |       1249 |         1250 |           2 | slow

-- Columns explained:
-- node_id      : Follower node ID
-- match_index  : Last index confirmed replicated
-- next_index   : Next index to send to follower
-- commit_index : Latest committed index (same for all nodes)
-- lag_entries  : Replication lag in log entries
-- state        : Replication health (ok, slow, stalled, error)`}</code>
            </pre>
            
            <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-sm">
              <strong>Alert Thresholds:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><code>lag_entries &gt; 100</code>: Warning (follower falling behind)</li>
                <li><code>lag_entries &gt; 1000</code>: Critical (significant lag)</li>
                <li><code>state = 'stalled'</code>: Critical (replication stopped)</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Log Statistics</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Get Raft log statistics
SELECT * FROM pgraft_log_get_stats();

-- Returns:
--  first_index | last_index | commit_index | applied_index | total_entries | disk_usage_mb 
-- -------------+------------+--------------+---------------+---------------+---------------
--          100 |       1250 |         1250 |          1248 |          1151 |            45

-- Columns explained:
-- first_index    : Oldest entry in log (before this are snapshots)
-- last_index     : Most recent entry in log
-- commit_index   : Latest committed (replicated to majority)
-- applied_index  : Latest applied to PostgreSQL state machine
-- total_entries  : Number of entries in log
-- disk_usage_mb  : Disk space used by log files

-- Calculate log growth rate
SELECT 
    total_entries,
    disk_usage_mb,
    (disk_usage_mb::float / total_entries) * 1024 AS avg_entry_kb
FROM pgraft_log_get_stats();`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Manual Log Synchronization</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Force log sync from leader (run on follower that's lagging)
SELECT pgraft_log_sync_with_leader();
-- Returns: number of entries synchronized

-- Useful when:
-- - Follower fell far behind and needs catch-up
-- - After network partition recovery
-- - During controlled maintenance windows`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Key-Value Store Monitoring</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">KV Store Statistics</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Get KV store usage statistics
SELECT * FROM pgraft_kv_get_stats();

-- Returns:
--  total_keys | total_size_bytes | oldest_key_age | newest_key_age | avg_value_size 
-- ------------+------------------+----------------+----------------+----------------
--        1523 |          4582912 | 45 days        | 2 minutes      |           3009

-- Monitor KV store status
SELECT * FROM pgraft_kv_status;
--  keys_count | values_size_mb | compaction_count | last_compact_at 
-- ------------+----------------+------------------+-----------------
--        1523 |           4.37 |               12 | 2024-11-03 10:00

-- Check individual key sizes
SELECT 
    key,
    pg_column_size(value) AS value_bytes,
    created_at,
    updated_at
FROM pgraft.kv
ORDER BY pg_column_size(value) DESC
LIMIT 10;`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">KV Store Health Checks</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Test KV store write/read operations
DO $$
DECLARE
    test_key TEXT := 'health_check_' || extract(epoch from now());
    test_value TEXT := 'test_value_' || md5(random()::text);
    retrieved_value TEXT;
BEGIN
    -- Write test
    PERFORM pgraft_kv_put(test_key, test_value);
    
    -- Read test
    SELECT pgraft_kv_get(test_key) INTO retrieved_value;
    
    IF retrieved_value = test_value THEN
        RAISE NOTICE 'KV store health check: PASSED';
    ELSE
        RAISE EXCEPTION 'KV store health check: FAILED (value mismatch)';
    END IF;
    
    -- Cleanup
    PERFORM pgraft_kv_delete(test_key);
END $$;`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">KV Store Capacity Planning</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Analyze KV store growth trends
WITH daily_growth AS (
    SELECT 
        DATE_TRUNC('day', created_at) AS day,
        COUNT(*) AS keys_added,
        SUM(pg_column_size(value)) AS bytes_added
    FROM pgraft.kv
    WHERE created_at > NOW() - INTERVAL '30 days'
    GROUP BY DATE_TRUNC('day', created_at)
)
SELECT 
    day,
    keys_added,
    bytes_added / 1024 / 1024 AS mb_added,
    SUM(keys_added) OVER (ORDER BY day) AS cumulative_keys,
    SUM(bytes_added) OVER (ORDER BY day) / 1024 / 1024 AS cumulative_mb
FROM daily_growth
ORDER BY day DESC;`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Performance Metrics</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Raft Message Processing</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Track message processing over time
SELECT 
    node_id,
    messages_processed,
    heartbeats_sent,
    messages_processed / GREATEST(heartbeats_sent, 1) AS msg_per_heartbeat
FROM pgraft_get_cluster_status();

-- Monitor message rate (requires periodic sampling)
CREATE TABLE IF NOT EXISTS pgraft_metrics_history (
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    node_id INTEGER,
    messages_processed BIGINT,
    heartbeats_sent BIGINT,
    elections_triggered BIGINT
);

-- Insert current metrics
INSERT INTO pgraft_metrics_history (node_id, messages_processed, heartbeats_sent, elections_triggered)
SELECT node_id, messages_processed, heartbeats_sent, elections_triggered
FROM pgraft_get_cluster_status();

-- Calculate message rate over last hour
WITH current AS (
    SELECT * FROM pgraft_metrics_history 
    WHERE recorded_at > NOW() - INTERVAL '1 hour'
    ORDER BY recorded_at DESC LIMIT 1
),
previous AS (
    SELECT * FROM pgraft_metrics_history 
    WHERE recorded_at <= NOW() - INTERVAL '1 hour'
    ORDER BY recorded_at DESC LIMIT 1
)
SELECT 
    c.node_id,
    (c.messages_processed - p.messages_processed) / 
        EXTRACT(EPOCH FROM (c.recorded_at - p.recorded_at)) AS messages_per_second,
    (c.heartbeats_sent - p.heartbeats_sent) /
        EXTRACT(EPOCH FROM (c.recorded_at - p.recorded_at)) AS heartbeats_per_second
FROM current c JOIN previous p ON c.node_id = p.node_id;`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Election Frequency</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Monitor election frequency (high rate indicates instability)
SELECT 
    node_id,
    state,
    elections_triggered,
    current_term,
    elections_triggered::float / GREATEST(current_term, 1) AS elections_per_term
FROM pgraft_get_cluster_status();

-- Healthy cluster: elections_triggered ≈ current_term (one election per term)
-- Unhealthy: elections_triggered >> current_term (many failed elections)`}</code>
            </pre>
            
            <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-sm">
              <strong>Alert if:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><code>elections_per_term &gt; 2.0</code>: Frequent election failures</li>
                <li><code>current_term</code> increases rapidly: Leader instability</li>
                <li>Multiple nodes in <code>state = 'candidate'</code>: Split vote</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Snapshot Metrics</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Monitor snapshot creation and size
-- (Requires file system monitoring)

-- Check snapshot directory
\\! ls -lh /var/lib/postgresql/pgraft/snapshots/ | tail -10

-- Expected output:
-- -rw------- 1 postgres postgres 12M Nov  3 10:00 snapshot-0000000000001000-15.db
-- -rw------- 1 postgres postgres 15M Nov  4 02:00 snapshot-0000000000002000-18.db

-- Monitor snapshot frequency
-- Should align with pgraft.snapshot_count setting
-- Example: snapshot_count=10000 → new snapshot every ~10K entries

-- Verify snapshot count setting
SHOW pgraft.snapshot_count;`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">System Monitoring Views</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">etcd-Compatible Views</h3>
            <p className="mb-2 text-muted-foreground">
              pgraft provides etcd-compatible monitoring views:
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Cluster member list
SELECT * FROM pgraft.member_list;
--  id | name  | peer_urls                | client_urls              | is_learner 
-- ----+-------+--------------------------+--------------------------+------------
--   1 | node1 | http://10.0.1.11:7001    | http://10.0.1.11:2379   | false

-- Endpoint health status
SELECT * FROM pgraft.endpoint_health;
--  endpoint              | health | took_ms | error 
-- -----------------------+--------+---------+-------
--  http://10.0.1.11:7001 | true   |       2 | 
--  http://10.0.1.12:7002 | true   |       3 | 
--  http://10.0.1.13:7003 | false  |     null | timeout

-- Overall cluster health
SELECT * FROM pgraft.cluster_health;
--  status  | num_members | num_healthy | quorum 
-- ---------+-------------+-------------+--------
--  healthy |           3 |           3 | true

-- Cluster information
SELECT * FROM pgraft.cluster_info;
--  cluster_id | member_id | revision | raft_term | raft_index 
-- ------------+-----------+----------+-----------+------------
--  prod-01    |         1 |     1250 |        15 |       1250`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Cluster State View</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Comprehensive cluster state
SELECT * FROM pgraft_cluster_state;
--  node_id | state    | leader | term | commit_idx | applied_idx | num_nodes 
-- ---------+----------+--------+------+------------+-------------+-----------
--        1 | leader   | t      |   15 |       1250 |        1248 |         3

-- Monitor over time to detect issues
CREATE VIEW pgraft_health_summary AS
SELECT 
    CURRENT_TIMESTAMP AS checked_at,
    COUNT(*) AS total_nodes,
    COUNT(*) FILTER (WHERE state = 'leader') AS num_leaders,
    COUNT(*) FILTER (WHERE state = 'follower') AS num_followers,
    COUNT(*) FILTER (WHERE state = 'candidate') AS num_candidates,
    MAX(term) AS current_term,
    BOOL_AND(leader) AS has_leader
FROM pgraft_cluster_state;

SELECT * FROM pgraft_health_summary;`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Alerting and Automated Monitoring</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Health Check Function</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Create comprehensive health check function
CREATE OR REPLACE FUNCTION pgraft_health_check()
RETURNS TABLE(
    check_name TEXT,
    status TEXT,
    message TEXT,
    severity TEXT
) AS $$
DECLARE
    v_num_nodes INT;
    v_num_leaders INT;
    v_num_followers INT;
    v_leader_id BIGINT;
    v_elections BIGINT;
    v_term BIGINT;
BEGIN
    -- Check cluster status
    SELECT 
        num_nodes,
        (SELECT COUNT(*) FROM pgraft_cluster_state WHERE state = 'leader'),
        (SELECT COUNT(*) FROM pgraft_cluster_state WHERE state = 'follower'),
        leader_id,
        elections_triggered,
        current_term
    INTO v_num_nodes, v_num_leaders, v_num_followers, v_leader_id, v_elections, v_term
    FROM pgraft_get_cluster_status()
    LIMIT 1;
    
    -- Check 1: Leader exists
    IF v_num_leaders = 0 THEN
        RETURN QUERY SELECT 
            'leader_election'::TEXT,
            'CRITICAL'::TEXT,
            'No leader elected'::TEXT,
            'critical'::TEXT;
    ELSIF v_num_leaders > 1 THEN
        RETURN QUERY SELECT 
            'leader_election'::TEXT,
            'CRITICAL'::TEXT,
            format('Multiple leaders detected: %s', v_num_leaders)::TEXT,
            'critical'::TEXT;
    ELSE
        RETURN QUERY SELECT 
            'leader_election'::TEXT,
            'OK'::TEXT,
            format('Leader ID %s', v_leader_id)::TEXT,
            'info'::TEXT;
    END IF;
    
    -- Check 2: Quorum
    IF v_num_nodes < 3 THEN
        RETURN QUERY SELECT 
            'quorum'::TEXT,
            'WARNING'::TEXT,
            format('Only %s nodes (recommend 3+)', v_num_nodes)::TEXT,
            'warning'::TEXT;
    ELSE
        RETURN QUERY SELECT 
            'quorum'::TEXT,
            'OK'::TEXT,
            format('%s nodes in cluster', v_num_nodes)::TEXT,
            'info'::TEXT;
    END IF;
    
    -- Check 3: Election stability
    IF v_elections::float / GREATEST(v_term, 1) > 2.0 THEN
        RETURN QUERY SELECT 
            'election_stability'::TEXT,
            'WARNING'::TEXT,
            format('High election rate: %s elections in %s terms', v_elections, v_term)::TEXT,
            'warning'::TEXT;
    ELSE
        RETURN QUERY SELECT 
            'election_stability'::TEXT,
            'OK'::TEXT,
            format('%s elections across %s terms', v_elections, v_term)::TEXT,
            'info'::TEXT;
    END IF;
    
    -- Check 4: Replication lag
    IF EXISTS (
        SELECT 1 FROM pgraft_log_get_replication_status()
        WHERE lag_entries > 100
    ) THEN
        RETURN QUERY SELECT 
            'replication_lag'::TEXT,
            'WARNING'::TEXT,
            'One or more followers lagging > 100 entries'::TEXT,
            'warning'::TEXT;
    ELSE
        RETURN QUERY SELECT 
            'replication_lag'::TEXT,
            'OK'::TEXT,
            'All followers up to date'::TEXT,
            'info'::TEXT;
    END IF;
    
    RETURN;
END;
$$ LANGUAGE plpgsql;

-- Run health check
SELECT * FROM pgraft_health_check();
--  check_name          | status   | message                         | severity 
-- ---------------------+----------+---------------------------------+----------
--  leader_election     | OK       | Leader ID 1                     | info
--  quorum              | OK       | 3 nodes in cluster              | info
--  election_stability  | OK       | 2 elections across 15 terms     | info
--  replication_lag     | OK       | All followers up to date        | info`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Prometheus Metrics Exporter (Shell Script)</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`#!/bin/bash
# pgraft-prometheus-exporter.sh
# Export pgraft metrics in Prometheus format

cat <<EOF
# HELP pgraft_cluster_nodes Total number of nodes in cluster
# TYPE pgraft_cluster_nodes gauge
pgraft_cluster_nodes $(psql -U postgres -t -c "SELECT num_nodes FROM pgraft_get_cluster_status();")

# HELP pgraft_is_leader Whether this node is the leader (1=yes, 0=no)
# TYPE pgraft_is_leader gauge
pgraft_is_leader $(psql -U postgres -t -c "SELECT CASE WHEN pgraft_is_leader() THEN 1 ELSE 0 END;")

# HELP pgraft_current_term Current Raft election term
# TYPE pgraft_current_term counter
pgraft_current_term $(psql -U postgres -t -c "SELECT pgraft_get_term();")

# HELP pgraft_messages_processed Total Raft messages processed
# TYPE pgraft_messages_processed counter
pgraft_messages_processed $(psql -U postgres -t -c "SELECT messages_processed FROM pgraft_get_cluster_status();")

# HELP pgraft_elections_triggered Total elections triggered
# TYPE pgraft_elections_triggered counter
pgraft_elections_triggered $(psql -U postgres -t -c "SELECT elections_triggered FROM pgraft_get_cluster_status();")

# HELP pgraft_log_entries Total log entries
# TYPE pgraft_log_entries gauge
pgraft_log_entries $(psql -U postgres -t -c "SELECT total_entries FROM pgraft_log_get_stats();")

# HELP pgraft_log_disk_mb Log disk usage in megabytes
# TYPE pgraft_log_disk_mb gauge
pgraft_log_disk_mb $(psql -U postgres -t -c "SELECT disk_usage_mb FROM pgraft_log_get_stats();")

# HELP pgraft_kv_keys Total KV store keys
# TYPE pgraft_kv_keys gauge
pgraft_kv_keys $(psql -U postgres -t -c "SELECT total_keys FROM pgraft_kv_get_stats();")
EOF

# Run via cron or monitoring agent:
# */1 * * * * /usr/local/bin/pgraft-prometheus-exporter.sh > /var/lib/node_exporter/pgraft.prom`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Email Alerting Script</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`#!/bin/bash
# pgraft-alerts.sh
# Check pgraft health and send email alerts

ALERT_EMAIL="ops@example.com"
LOG_FILE="/var/log/pgraft-alerts.log"

# Run health check
HEALTH_CHECK=$(psql -U postgres -t -c "
SELECT string_agg(
    check_name || ': ' || status || ' - ' || message, 
    E'\\n'
) 
FROM pgraft_health_check() 
WHERE severity IN ('warning', 'critical');
")

if [ -n "$HEALTH_CHECK" ]; then
    echo "$(date): ALERT - $HEALTH_CHECK" >> "$LOG_FILE"
    
    echo "$HEALTH_CHECK" | mail -s "pgraft Cluster Alert" "$ALERT_EMAIL"
fi

# Check replication lag
MAX_LAG=$(psql -U postgres -t -c "
SELECT COALESCE(MAX(lag_entries), 0) 
FROM pgraft_log_get_replication_status();
")

if [ "$MAX_LAG" -gt 1000 ]; then
    echo "$(date): ALERT - Replication lag: $MAX_LAG entries" >> "$LOG_FILE"
    
    echo "Critical replication lag: $MAX_LAG entries" | \
        mail -s "pgraft Replication Lag Alert" "$ALERT_EMAIL"
fi

# Run every 5 minutes via cron:
# */5 * * * * /usr/local/bin/pgraft-alerts.sh`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Monitoring Dashboard Queries</h2>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-2">Sample Grafana/Monitoring Queries</h3>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>{`-- Cluster Overview Panel
SELECT 
    num_nodes AS "Total Nodes",
    (SELECT COUNT(*) FROM pgraft_cluster_state WHERE state = 'leader') AS "Leaders",
    (SELECT COUNT(*) FROM pgraft_cluster_state WHERE state = 'follower') AS "Followers",
    current_term AS "Current Term"
FROM pgraft_get_cluster_status();

-- Replication Lag Panel
SELECT 
    node_id AS "Node",
    lag_entries AS "Lag (entries)",
    state AS "Status"
FROM pgraft_log_get_replication_status()
ORDER BY lag_entries DESC;

-- Message Rate Panel (time series)
SELECT 
    recorded_at AS "Time",
    messages_per_second AS "Messages/sec",
    heartbeats_per_second AS "Heartbeats/sec"
FROM (
    -- Assumes pgraft_metrics_history table from earlier examples
    SELECT 
        recorded_at,
        node_id,
        (messages_processed - LAG(messages_processed) OVER (PARTITION BY node_id ORDER BY recorded_at)) /
            EXTRACT(EPOCH FROM (recorded_at - LAG(recorded_at) OVER (PARTITION BY node_id ORDER BY recorded_at))) AS messages_per_second,
        (heartbeats_sent - LAG(heartbeats_sent) OVER (PARTITION BY node_id ORDER BY recorded_at)) /
            EXTRACT(EPOCH FROM (recorded_at - LAG(recorded_at) OVER (PARTITION BY node_id ORDER BY recorded_at))) AS heartbeats_per_second
    FROM pgraft_metrics_history
    WHERE recorded_at > NOW() - INTERVAL '1 hour'
) subq
WHERE messages_per_second IS NOT NULL
ORDER BY recorded_at;

-- KV Store Growth Panel
SELECT 
    total_keys AS "Total Keys",
    total_size_bytes / 1024 / 1024 AS "Size (MB)",
    avg_value_size / 1024 AS "Avg Value (KB)"
FROM pgraft_kv_get_stats();`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Log Analysis</h2>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-2">PostgreSQL Log Monitoring</h3>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>{`# Monitor pgraft activity in PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql-17-main.log | grep -i pgraft

# Filter for errors only
sudo grep -i "pgraft.*error" /var/log/postgresql/postgresql-17-main.log

# Monitor elections
sudo grep -i "pgraft.*election" /var/log/postgresql/postgresql-17-main.log | tail -20

# Track leader changes
sudo grep -i "pgraft.*leader" /var/log/postgresql/postgresql-17-main.log | tail -20

# Monitor node additions/removals
sudo grep -E "pgraft.*(add_node|remove_node)" /var/log/postgresql/postgresql-17-main.log`}</code>
          </pre>
          
          <h3 className="text-xl font-semibold mt-4 mb-2">Debug Logging</h3>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>{`-- Enable debug logging temporarily
SELECT pgraft_set_debug(true);

-- Monitor specific operations with verbose output
-- ... perform operations ...

-- Disable debug logging
SELECT pgraft_set_debug(false);

-- Review debug logs
sudo tail -100 /var/log/postgresql/postgresql-17-main.log | grep "DEBUG.*pgraft"`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        
        <ul className="space-y-3 text-muted-foreground">
          <li>
            <strong>Continuous Monitoring:</strong> Run health checks every 1-5 minutes via cron or monitoring agent
          </li>
          <li>
            <strong>Historical Data:</strong> Store metrics in time-series database for trend analysis and capacity planning
          </li>
          <li>
            <strong>Alert Thresholds:</strong> Configure alerts for:
            <ul className="list-disc list-inside ml-6 mt-1">
              <li>No leader elected (critical)</li>
              <li>Replication lag &gt; 100 entries (warning), &gt; 1000 (critical)</li>
              <li>Frequent elections (warning)</li>
              <li>Node count mismatch (critical)</li>
            </ul>
          </li>
          <li>
            <strong>Dashboard Visibility:</strong> Create dashboards showing cluster health, replication status, performance metrics
          </li>
          <li>
            <strong>Log Retention:</strong> Keep PostgreSQL logs for at least 7 days for troubleshooting
          </li>
          <li>
            <strong>Capacity Planning:</strong> Monitor disk usage for Raft logs/snapshots, plan for growth
          </li>
          <li>
            <strong>Regular Testing:</strong> Test failover procedures, verify monitoring detects issues
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
        <ul className="space-y-2">
          <li>
            <a href="/docs/pgraft/troubleshooting" className="text-blue-600 hover:underline">
              Troubleshooting Guide
            </a> - Diagnose and resolve common issues
          </li>
          <li>
            <a href="/docs/pgraft/config-reference" className="text-blue-600 hover:underline">
              Configuration Reference
            </a> - All GUC parameters and tuning
          </li>
          <li>
            <a href="/docs/pgraft/cluster-management" className="text-blue-600 hover:underline">
              Cluster Management
            </a> - Node operations and topology changes
          </li>
          <li>
            <a href="/docs/pgraft/sql-reference" className="text-blue-600 hover:underline">
              SQL Functions Reference
            </a> - Complete API documentation
          </li>
        </ul>
      </section>
    </div>
  );
}
