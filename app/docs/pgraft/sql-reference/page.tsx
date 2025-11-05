import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SQL Functions Reference | pgraft',
  description: 'Complete SQL API reference for pgraft Raft consensus functions, views, and key-value store operations.'
};

export default function PgraftSqlFunctionsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">SQL Functions Reference</h1>
        <p className="text-lg text-muted-foreground">
          Complete reference for all pgraft SQL functions, views, and operations for distributed consensus and cluster management.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Core Cluster Functions</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft_init()</code></h3>
            <p className="mb-2">Initialize pgraft cluster using GUC configuration variables.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Returns:</strong> boolean
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Initialize cluster (automatic on CREATE EXTENSION)
SELECT pgraft_init();

-- Returns: true if successful, false otherwise`}</code>
            </pre><div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-sm">
              <strong>Note:</strong> Typically called automatically when <code>CREATE EXTENSION pgraft</code> runs. 
              Reads configuration from <code>pgraft.*</code> GUC variables.
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft_add_node(node_id, address, port)</code></h3>
            <p className="mb-2">Add a new node to the Raft cluster.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Parameters:</strong> node_id (integer), address (text), port (integer)
              <br />
              <strong>Returns:</strong> boolean
              <br />
              <strong>Requires:</strong> Leader node
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Must run on leader
SELECT pgraft_add_node(4, '10.0.1.14', 7004);

-- With leader check
DO $$
BEGIN
    IF NOT pgraft_is_leader() THEN
        RAISE EXCEPTION 'Must run on leader node';
    END IF;
    PERFORM pgraft_add_node(4, '10.0.1.14', 7004);
END $$;`}</code>
            </pre></div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft_remove_node(node_id)</code></h3>
            <p className="mb-2">Remove a node from the Raft cluster.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Parameters:</strong> node_id (integer)
              <br />
              <strong>Returns:</strong> boolean
              <br />
              <strong>Requires:</strong> Leader node
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Remove node 4
SELECT pgraft_remove_node(4);

-- Verify removal
SELECT * FROM pgraft_get_nodes();`}</code>
            </pre></div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft_get_cluster_status()</code></h3>
            <p className="mb-2">Get comprehensive cluster status information.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Returns:</strong> TABLE(node_id int, current_term bigint, leader_id bigint, state text, num_nodes int, messages_processed bigint, heartbeats_sent bigint, elections_triggered bigint)
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Full cluster status
SELECT * FROM pgraft_get_cluster_status();

-- Example output:
-- node_id | current_term | leader_id | state      | num_nodes | messages_processed | heartbeats_sent | elections_triggered
-- --------|--------------|-----------|------------|-----------|-------------------|----------------|--------------------
--       1 |            5 |         1 | StateLeader|         3 |               1234 |            567 |                   2

-- Check specific fields
SELECT 
    node_id,
    state,
    CASE WHEN leader_id = node_id THEN 'LEADER' ELSE 'FOLLOWER' END AS role
FROM pgraft_get_cluster_status();`}</code>
            </pre></div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft_get_nodes()</code></h3>
            <p className="mb-2">List all nodes in the cluster with their connection details.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Returns:</strong> TABLE(node_id int, address text, port int, is_leader boolean)
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`SELECT * FROM pgraft_get_nodes();

-- Example output:
-- node_id |   address   | port  | is_leader
-- --------|-------------|-------|----------
--       1 | 10.0.1.11   | 7001  | t
--       2 | 10.0.1.12   | 7002  | f
--       3 | 10.0.1.13   | 7003  | f

-- Find leader node
SELECT node_id, address, port 
FROM pgraft_get_nodes() 
WHERE is_leader;`}</code>
            </pre></div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft_get_nodes_from_raft()</code></h3>
            <p className="mb-2">Get nodes directly from Raft cluster state (works on replicas, returns JSON).</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Returns:</strong> text (JSON array)
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Get nodes as JSON
SELECT pgraft_get_nodes_from_raft();

-- Parse JSON output
SELECT 
    (node->>'id')::int AS node_id,
    (node->>'address')::text AS address,
    (node->>'active')::boolean AS is_active
FROM json_array_elements(pgraft_get_nodes_from_raft()::json) AS node;`}</code>
            </pre></div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft_is_leader()</code></h3>
            <p className="mb-2">Check if the current node is the Raft leader.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Returns:</strong> boolean
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Check leadership status
SELECT pgraft_is_leader();

-- Conditional logic
DO $$
BEGIN
    IF pgraft_is_leader() THEN
        RAISE NOTICE 'This node is the leader';
    ELSE
        RAISE NOTICE 'This node is a follower';
    END IF;
END $$;`}</code>
            </pre></div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft_get_leader()</code></h3>
            <p className="mb-2">Get the current leader node ID.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Returns:</strong> bigint
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`SELECT pgraft_get_leader();

-- Find leader details
SELECT n.* 
FROM pgraft_get_nodes() n
WHERE n.node_id = pgraft_get_leader();`}</code>
            </pre></div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft_get_term()</code></h3>
            <p className="mb-2">Get the current Raft term number.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Returns:</strong> bigint
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Current term
SELECT pgraft_get_term();

-- Track term changes over time
SELECT 
    pgraft_get_term() AS current_term,
    pgraft_get_leader() AS leader_id,
    NOW() AS timestamp;`}</code>
            </pre></div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft_get_worker_state()</code></h3>
            <p className="mb-2">Get background worker state (RUNNING, STOPPED, etc.).</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Returns:</strong> text
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`SELECT pgraft_get_worker_state();

-- Returns: 'RUNNING', 'STOPPED', 'INITIALIZING', etc.`}</code>
            </pre></div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft_get_version()</code></h3>
            <p className="mb-2">Get pgraft extension version.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Returns:</strong> text
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`SELECT pgraft_get_version();`}</code>
            </pre></div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft_set_debug(enabled)</code></h3>
            <p className="mb-2">Enable or disable debug logging.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Parameters:</strong> enabled (boolean)
              <br />
              <strong>Returns:</strong> boolean
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Enable debug logging
SELECT pgraft_set_debug(true);

-- Disable debug logging
SELECT pgraft_set_debug(false);`}</code>
            </pre></div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft_test()</code></h3>
            <p className="mb-2">Test pgraft functionality (diagnostic function).</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Returns:</strong> boolean
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`SELECT pgraft_test();`}</code>
            </pre></div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Log Replication Functions</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft_log_get_stats()</code></h3>
            <p className="mb-2">Get detailed Raft log statistics.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Returns:</strong> TABLE(log_size bigint, last_index bigint, commit_index bigint, last_applied bigint, replicated bigint, committed bigint, applied bigint, errors bigint)
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`SELECT * FROM pgraft_log_get_stats();

-- Monitor replication lag
SELECT 
    last_index - last_applied AS replication_lag,
    last_index - commit_index AS commit_lag
FROM pgraft_log_get_stats();`}</code>
            </pre></div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft_log_get_replication_status()</code></h3>
            <p className="mb-2">Get replication status (similar to log stats).</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Returns:</strong> TABLE(log_size bigint, last_index bigint, commit_index bigint, last_applied bigint, replicated bigint, committed bigint, applied bigint, errors bigint)
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`SELECT * FROM pgraft_log_get_replication_status();`}</code>
            </pre></div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft_log_sync_with_leader()</code></h3>
            <p className="mb-2">Manually sync log with leader (for debugging).</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Returns:</strong> boolean
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Force sync with leader
SELECT pgraft_log_sync_with_leader();`}</code>
            </pre></div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft_log_get_entry(index)</code></h3>
            <p className="mb-2">Retrieve a specific log entry by index.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Parameters:</strong> index (bigint)
              <br />
              <strong>Returns:</strong> text (JSON)
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Get log entry at index 42
SELECT pgraft_log_get_entry(42);`}</code>
            </pre></div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft_replicate_entry(entry_data)</code></h3>
            <p className="mb-2">Replicate a log entry via the Raft leader.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Parameters:</strong> entry_data (text)
              <br />
              <strong>Returns:</strong> boolean
              <br />
              <strong>Requires:</strong> Leader node
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Replicate custom entry
SELECT pgraft_replicate_entry('{"type":"custom","data":"value"}');`}</code>
            </pre></div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Key-Value Store Functions</h2>
        <p className="mb-4 text-muted-foreground">
          pgraft includes an etcd-compatible Raft-replicated key-value store for configuration and coordination.
        </p>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft_kv_put(key, value)</code></h3>
            <p className="mb-2">Store a key-value pair (replicated via Raft).</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Parameters:</strong> key (text), value (text)
              <br />
              <strong>Returns:</strong> boolean
              <br />
              <strong>Requires:</strong> Leader node
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Store configuration
SELECT pgraft_kv_put('app/config', '{"timeout":30,"retries":3}');

-- Store feature flag
SELECT pgraft_kv_put('feature/new_ui', 'enabled');

-- Batch put
DO $$
BEGIN
    PERFORM pgraft_kv_put('db/host', '10.0.1.100');
    PERFORM pgraft_kv_put('db/port', '5432');
    PERFORM pgraft_kv_put('db/name', 'myapp');
END $$;`}</code>
            </pre></div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft_kv_get(key)</code></h3>
            <p className="mb-2">Retrieve value for a key (reads from local state, works on any node).</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Parameters:</strong> key (text)
              <br />
              <strong>Returns:</strong> text
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Get configuration
SELECT pgraft_kv_get('app/config');

-- Parse JSON value
SELECT (pgraft_kv_get('app/config')::jsonb)->>'timeout' AS timeout;

-- Check for NULL (key not found)
SELECT COALESCE(pgraft_kv_get('missing/key'), 'default_value');`}</code>
            </pre></div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft_kv_delete(key)</code></h3>
            <p className="mb-2">Delete a key (replicated via Raft).</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Parameters:</strong> key (text)
              <br />
              <strong>Returns:</strong> boolean
              <br />
              <strong>Requires:</strong> Leader node
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Delete key
SELECT pgraft_kv_delete('app/config');

-- Conditional delete
DO $$
BEGIN
    IF pgraft_kv_exists('temp/data') THEN
        PERFORM pgraft_kv_delete('temp/data');
    END IF;
END $$;`}</code>
            </pre></div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft_kv_exists(key)</code></h3>
            <p className="mb-2">Check if a key exists.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Parameters:</strong> key (text)
              <br />
              <strong>Returns:</strong> boolean
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Check if key exists
SELECT pgraft_kv_exists('app/config');

-- Conditional logic
IF pgraft_kv_exists('feature/enabled') AND 
   pgraft_kv_get('feature/enabled') = 'true' THEN
    -- Feature is enabled
END IF;`}</code>
            </pre></div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft_kv_list_keys()</code></h3>
            <p className="mb-2">List all keys in the KV store (returns JSON array).</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Returns:</strong> text (JSON array)
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- List all keys
SELECT pgraft_kv_list_keys();

-- Parse and iterate keys
SELECT jsonb_array_elements_text(pgraft_kv_list_keys()::jsonb) AS key;

-- Filter keys by prefix
SELECT key 
FROM jsonb_array_elements_text(pgraft_kv_list_keys()::jsonb) AS key
WHERE key LIKE 'app/%';`}</code>
            </pre></div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft_kv_get_stats()</code></h3>
            <p className="mb-2">Get key-value store statistics.</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Returns:</strong> TABLE(num_entries int, total_operations bigint, last_applied_index bigint, puts bigint, deletes bigint, gets bigint, active_entries int, deleted_entries int)
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`SELECT * FROM pgraft_kv_get_stats();

-- Monitor KV usage
SELECT 
    active_entries,
    deleted_entries,
    puts,
    gets,
    deletes
FROM pgraft_kv_get_stats();`}</code>
            </pre></div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft_kv_compact()</code></h3>
            <p className="mb-2">Compact the KV store (remove deleted entries, optimize storage).</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Returns:</strong> boolean
              <br />
              <strong>Requires:</strong> Leader node
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Compact KV store
SELECT pgraft_kv_compact();

-- Compact when needed
DO $$
DECLARE
    stats RECORD;
BEGIN
    SELECT * INTO stats FROM pgraft_kv_get_stats();
    IF stats.deleted_entries > stats.active_entries THEN
        RAISE NOTICE 'Compacting KV store...';
        PERFORM pgraft_kv_compact();
    END IF;
END $$;`}</code>
            </pre></div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft_kv_reset()</code></h3>
            <p className="mb-2">Clear all data from KV store (use with caution!).</p>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Returns:</strong> boolean
              <br />
              <strong>Requires:</strong> Leader node
              <br />
              <strong>Warning:</strong> Irreversible operation
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- DANGER: Clear all KV data
SELECT pgraft_kv_reset();`}</code>
            </pre></div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Monitoring Views</h2>
        <p className="mb-4 text-muted-foreground">
          pgraft provides etcd-compatible views for cluster monitoring and status inspection.
        </p>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft.member_list</code></h3>
            <p className="mb-2">View matching <code>etcdctl member list</code> output format.</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`SELECT * FROM pgraft.member_list;

-- Example output:
-- memberID | peerURLs        | clientURLs      | status
-- ---------|-----------------|-----------------|----------
--        1 | 10.0.1.11:7001  | 10.0.1.11:7001  | leader
--        2 | 10.0.1.12:7002  | 10.0.1.12:7002  | follower
--        3 | 10.0.1.13:7003  | 10.0.1.13:7003  | follower`}</code>
            </pre></div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft.endpoint_health</code></h3>
            <p className="mb-2">View matching <code>etcdctl endpoint health</code> output.</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`SELECT * FROM pgraft.endpoint_health;`}</code>
            </pre></div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft.cluster_health</code></h3>
            <p className="mb-2">View matching <code>etcdctl cluster-health</code> output.</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`SELECT * FROM pgraft.cluster_health;`}</code>
            </pre></div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft.cluster_info</code></h3>
            <p className="mb-2">View providing etcd-style cluster information.</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`SELECT * FROM pgraft.cluster_info;`}</code>
            </pre></div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft_cluster_state</code></h3>
            <p className="mb-2">Core cluster state view (reads from shared memory).</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`SELECT * FROM pgraft_cluster_state;

-- Monitor key metrics
SELECT 
    leader_id,
    current_term,
    state,
    is_leader,
    messages_processed,
    heartbeats_sent
FROM pgraft_cluster_state;`}</code>
            </pre></div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft_worker_status</code></h3>
            <p className="mb-2">Background worker status view.</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`SELECT * FROM pgraft_worker_status;

-- Check if worker is running
SELECT is_running FROM pgraft_worker_status;`}</code>
            </pre></div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft_kv_status</code></h3>
            <p className="mb-2">Key-value store status and health view.</p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`SELECT * FROM pgraft_kv_status;

-- Check if compaction is needed
SELECT status FROM pgraft_kv_status;
-- Returns: 'HEALTHY', 'NEEDS_COMPACTION', or 'EMPTY'`}</code>
            </pre></div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Usage Examples</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Complete Health Check</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Comprehensive cluster health check
DO $$
DECLARE
    status RECORD;
    leader_id BIGINT;
    is_leader BOOLEAN;
BEGIN
    -- Get cluster status
    SELECT * INTO status FROM pgraft_get_cluster_status();
    
    leader_id := pgraft_get_leader();
    is_leader := pgraft_is_leader();
    
    RAISE NOTICE 'Node ID: %, Role: %', 
        status.node_id, 
        CASE WHEN is_leader THEN 'LEADER' ELSE 'FOLLOWER' END;
    RAISE NOTICE 'Leader ID: %, Term: %', leader_id, status.current_term;
    RAISE NOTICE 'Cluster size: %, State: %', status.num_nodes, status.state;
    RAISE NOTICE 'Messages processed: %, Heartbeats: %', 
        status.messages_processed, 
        status.heartbeats_sent;
    
    -- Check log replication
    RAISE NOTICE 'Log replication status:';
    FOR status IN SELECT * FROM pgraft_log_get_stats() LOOP
        RAISE NOTICE '  Last index: %, Committed: %, Applied: %',
            status.last_index, status.commit_index, status.last_applied;
    END LOOP;
END $$;`}</code>
            </pre></div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Application Configuration with KV Store</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Store application configuration (on leader)
SELECT pgraft_kv_put('app/db/pool_size', '20');
SELECT pgraft_kv_put('app/db/timeout', '30');
SELECT pgraft_kv_put('app/cache/ttl', '3600');
SELECT pgraft_kv_put('app/features/beta', 'enabled');

-- Read configuration (on any node)
CREATE OR REPLACE FUNCTION get_app_config()
RETURNS jsonb
LANGUAGE plpgsql
AS $$
DECLARE
    config jsonb := '{}'::jsonb;
    keys text[];
    k text;
BEGIN
    -- Get all app/* keys
    SELECT array_agg(key) INTO keys
    FROM jsonb_array_elements_text(pgraft_kv_list_keys()::jsonb) AS key
    WHERE key LIKE 'app/%';
    
    -- Build config object
    FOREACH k IN ARRAY keys LOOP
        config := config || jsonb_build_object(
            replace(k, 'app/', ''),
            pgraft_kv_get(k)
        );
    END LOOP;
    
    RETURN config;
END $$;

-- Use configuration
SELECT get_app_config();

-- Update specific setting
SELECT pgraft_kv_put('app/features/beta', 'disabled');`}</code>
            </pre></div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Monitoring Dashboard Query</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Single query for monitoring dashboard
SELECT 
    -- Cluster info
    cs.node_id,
    cs.current_term,
    cs.leader_id,
    cs.state,
    cs.num_nodes,
    
    -- Leader check
    (cs.leader_id = cs.node_id) AS is_leader,
    
    -- Worker status
    ws.worker_state,
    ws.is_running,
    
    -- Log replication
    ls.last_index,
    ls.commit_index,
    ls.last_applied,
    (ls.last_index - ls.last_applied) AS replication_lag,
    
    -- KV store
    kvs.active_entries AS kv_entries,
    kvs.status AS kv_status,
    
    -- Activity metrics
    cs.messages_processed,
    cs.heartbeats_sent,
    cs.elections_triggered
FROM pgraft_get_cluster_status() cs
CROSS JOIN pgraft_worker_status ws
CROSS JOIN pgraft_log_get_stats() ls
CROSS JOIN pgraft_kv_status kvs;`}</code>
            </pre></div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">1. Always Check Leadership</h4>
            <p className="text-sm text-muted-foreground">
              Before calling write operations (<code>pgraft_kv_put</code>, <code>pgraft_add_node</code>, etc.), 
              check <code>pgraft_is_leader()</code> to ensure the current node can accept writes.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">2. Monitor Replication Lag</h4>
            <p className="text-sm text-muted-foreground">
              Use <code>pgraft_log_get_stats()</code> to track <code>last_index - last_applied</code> for replication lag monitoring.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">3. Use KV Store for Cluster-Wide Config</h4>
            <p className="text-sm text-muted-foreground">
              Leverage the Raft-replicated KV store for configuration that must be consistent across all nodes.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">4. Compact KV Store Periodically</h4>
            <p className="text-sm text-muted-foreground">
              Monitor <code>pgraft_kv_status</code> and run <code>pgraft_kv_compact()</code> when 
              status shows <code>NEEDS_COMPACTION</code>.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
        <ul className="space-y-2">
          <li>
            <a href="/docs/pgraft/configuration" className="text-blue-600 hover:underline">
              Configuration Reference
            </a> - Learn about all GUC configuration parameters
          </li>
          <li>
            <a href="/docs/pgraft/cluster-management" className="text-blue-600 hover:underline">
              Cluster Management
            </a> - Node operations and topology changes
          </li>
          <li>
            <a href="/docs/pgraft/troubleshooting" className="text-blue-600 hover:underline">
              Troubleshooting
            </a> - Common issues and debugging techniques
          </li>
        </ul>
      </section>
    </div>
  );
}
