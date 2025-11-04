import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Troubleshooting Guide | pgraft',
  description: 'Comprehensive troubleshooting guide for pgraft: common issues, diagnostic procedures, recovery strategies, and solutions.'
};

export default function PgraftTroubleshootingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Troubleshooting Guide</h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive guide to diagnosing and resolving pgraft issues: cluster problems, replication issues, performance degradation, and recovery procedures.
        </p>
      </div>

      <section className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Quick Diagnostic Checklist</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Check cluster status: <code>SELECT * FROM pgraft_get_cluster_status();</code></li>
          <li>Verify leader elected: <code>SELECT pgraft_get_leader();</code></li>
          <li>Inspect PostgreSQL logs: <code>sudo tail -100 /var/log/postgresql/*.log | grep pgraft</code></li>
          <li>Test network connectivity between nodes</li>
          <li>Verify pgraft configuration matches across nodes</li>
          <li>Check disk space for data directory and Raft logs</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Extension Installation Issues</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-red-700 dark:text-red-400">
              Problem: Extension fails to load
            </h3>
            <p className="mb-3 text-sm"><strong>Error:</strong> "could not load library pgraft.so"</p>
            
            <h4 className="font-semibold mt-4 mb-2">Diagnostic Steps:</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`# 1. Verify pgraft is installed
ls -l /usr/lib/postgresql/17/lib/pgraft.so
# Should show file exists with proper permissions

# 2. Check shared_preload_libraries
psql -U postgres -c "SHOW shared_preload_libraries;"
# Should include 'pgraft'

# 3. Check PostgreSQL error log
sudo tail -50 /var/log/postgresql/postgresql-17-main.log | grep -i error

# 4. Verify Go library is accessible
ls -l /usr/lib/postgresql/17/lib/libpgraft_core.so
# Or check path specified in pgraft.go_library_path`}</code>
            </pre>

            <h4 className="font-semibold mt-4 mb-2">Solutions:</h4>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>
                <strong>Missing shared library:</strong>
                <pre className="bg-muted p-2 rounded mt-1 overflow-x-auto">
                  <code>{`# Reinstall pgraft
sudo apt-get install --reinstall pgraft
# or
sudo yum reinstall pgraft`}</code>
                </pre>
              </li>
              <li>
                <strong>shared_preload_libraries not set:</strong>
                <pre className="bg-muted p-2 rounded mt-1 overflow-x-auto">
                  <code>{`# Edit postgresql.conf
sudo nano /etc/postgresql/17/main/postgresql.conf

# Add line:
shared_preload_libraries = 'pgraft'

# Restart PostgreSQL (required!)
sudo systemctl restart postgresql`}</code>
                </pre>
              </li>
              <li>
                <strong>Wrong PostgreSQL version:</strong> Ensure pgraft version matches PostgreSQL version (e.g., pgraft-17 for PostgreSQL 17)
              </li>
              <li>
                <strong>Library permissions:</strong>
                <pre className="bg-muted p-2 rounded mt-1 overflow-x-auto">
                  <code>sudo chmod 755 /usr/lib/postgresql/17/lib/pgraft.so</code>
                </pre>
              </li>
            </ul>
          </div>

          <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-red-700 dark:text-red-400">
              Problem: CREATE EXTENSION fails
            </h3>
            <p className="mb-3 text-sm"><strong>Error:</strong> "pgraft extension not available" or "control file missing"</p>
            
            <h4 className="font-semibold mt-4 mb-2">Solutions:</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`# 1. Verify extension files exist
ls -l /usr/share/postgresql/17/extension/pgraft*

# Should show:
# pgraft.control
# pgraft--1.0.sql

# 2. Check extension is visible to PostgreSQL
psql -U postgres -c "SELECT * FROM pg_available_extensions WHERE name = 'pgraft';"

# 3. If missing, reinstall extension files
sudo apt-get install --reinstall pgraft

# 4. Verify database ownership
psql -U postgres -c "\\l"
# Ensure you have CREATE permission on database`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Cluster Formation Issues</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-yellow-700 dark:text-yellow-400">
              Problem: Cluster won't form / No leader elected
            </h3>
            <p className="mb-3 text-sm"><strong>Symptom:</strong> All nodes remain in 'follower' or 'candidate' state</p>
            
            <h4 className="font-semibold mt-4 mb-2">Diagnostic Steps:</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`# On each node, check cluster status
psql -U postgres -c "SELECT * FROM pgraft_get_cluster_status();"

# Check configuration matches
psql -U postgres -c "SELECT name, setting FROM pg_settings WHERE name LIKE 'pgraft.%' ORDER BY name;"

# Test network connectivity
# From Node 1 to Node 2:
telnet 10.0.1.12 7002

# Check PostgreSQL logs for Raft messages
sudo grep -i "pgraft.*raft" /var/log/postgresql/*.log | tail -50`}</code>
            </pre>

            <h4 className="font-semibold mt-4 mb-2">Common Causes and Solutions:</h4>
            <ul className="list-disc list-inside space-y-3 text-sm text-muted-foreground">
              <li>
                <strong>Mismatched initial_cluster configuration:</strong>
                <pre className="bg-muted p-2 rounded mt-1 overflow-x-auto">
                  <code>{`# Verify initial_cluster is IDENTICAL on all nodes
# Node 1, 2, 3 must all have:
pgraft.initial_cluster = 'node1=10.0.1.11:7001,node2=10.0.1.12:7002,node3=10.0.1.13:7003'

# Check each node:
ssh node1 "grep initial_cluster /etc/postgresql/17/main/postgresql.conf"
ssh node2 "grep initial_cluster /etc/postgresql/17/main/postgresql.conf"
ssh node3 "grep initial_cluster /etc/postgresql/17/main/postgresql.conf"

# If different, fix and restart PostgreSQL on all nodes`}</code>
                </pre>
              </li>
              <li>
                <strong>Node name doesn't match initial_cluster:</strong>
                <pre className="bg-muted p-2 rounded mt-1 overflow-x-auto">
                  <code>{`# Each node's pgraft.name must appear in initial_cluster
# Node 1: pgraft.name = 'node1' (must match 'node1=' in initial_cluster)
# Node 2: pgraft.name = 'node2' (must match 'node2=' in initial_cluster)

# Verify:
SHOW pgraft.name;  -- Run on each node`}</code>
                </pre>
              </li>
              <li>
                <strong>Network connectivity issues:</strong>
                <pre className="bg-muted p-2 rounded mt-1 overflow-x-auto">
                  <code>{`# Test full mesh connectivity (all nodes to all other nodes)
# From each node, test to others:
nc -zv 10.0.1.11 7001
nc -zv 10.0.1.12 7002
nc -zv 10.0.1.13 7003

# Check firewall rules
sudo ufw status
sudo iptables -L -n | grep 700[123]

# Allow Raft ports if blocked
sudo ufw allow 7001/tcp
sudo ufw allow 7002/tcp
sudo ufw allow 7003/tcp`}</code>
                </pre>
              </li>
              <li>
                <strong>Data directory issues:</strong>
                <pre className="bg-muted p-2 rounded mt-1 overflow-x-auto">
                  <code>{`# Verify data directory exists and is writable
ls -ld /var/lib/postgresql/pgraft
# Should show: drwx------ postgres postgres

# If wrong permissions:
sudo chown -R postgres:postgres /var/lib/postgresql/pgraft
sudo chmod 700 /var/lib/postgresql/pgraft

# If directory has old state, consider clearing it:
sudo systemctl stop postgresql
sudo rm -rf /var/lib/postgresql/pgraft/*
sudo systemctl start postgresql`}</code>
                </pre>
              </li>
            </ul>
          </div>

          <div className="p-4 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-yellow-700 dark:text-yellow-400">
              Problem: Node can't join existing cluster
            </h3>
            <p className="mb-3 text-sm"><strong>Symptom:</strong> New node added via pgraft_add_node() but remains disconnected</p>
            
            <h4 className="font-semibold mt-4 mb-2">Solutions:</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`# 1. Verify node was added to cluster
# On leader:
SELECT * FROM pgraft_get_nodes();
# New node should appear in list

# 2. Check new node has correct initial_cluster_state
# On new node:
SHOW pgraft.initial_cluster_state;
# Must be: 'existing'

# 3. Verify PostgreSQL is running on new node
ssh new-node "sudo systemctl status postgresql"

# 4. Check new node can reach cluster
# From new node:
nc -zv <leader-ip> <raft-port>

# 5. Review logs on new node for connection errors
ssh new-node "sudo tail -100 /var/log/postgresql/*.log | grep pgraft"`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Leader Election Problems</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-yellow-700 dark:text-yellow-400">
              Problem: Frequent leader elections / Unstable leader
            </h3>
            <p className="mb-3 text-sm"><strong>Symptom:</strong> Leader changes frequently, current_term increases rapidly</p>
            
            <h4 className="font-semibold mt-4 mb-2">Diagnostic Steps:</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`# Monitor election frequency
SELECT 
    current_term,
    elections_triggered,
    elections_triggered::float / GREATEST(current_term, 1) AS elections_per_term
FROM pgraft_get_cluster_status();
# elections_per_term > 2.0 indicates instability

# Check network latency between nodes
ping -c 10 10.0.1.12
ping -c 10 10.0.1.13

# Monitor system load
top
# Check CPU usage, load average

# Review election events in logs
sudo grep -i "election" /var/log/postgresql/*.log | tail -20`}</code>
            </pre>

            <h4 className="font-semibold mt-4 mb-2">Solutions:</h4>
            <ul className="list-disc list-inside space-y-3 text-sm text-muted-foreground">
              <li>
                <strong>High network latency:</strong> Increase timeouts
                <pre className="bg-muted p-2 rounded mt-1 overflow-x-auto">
                  <code>{`# Edit postgresql.conf on all nodes:
pgraft.election_timeout = 3000  # 3 seconds (was 1000)
pgraft.heartbeat_interval = 300  # 300ms (was 100)

# Restart PostgreSQL on all nodes
sudo systemctl restart postgresql`}</code>
                </pre>
              </li>
              <li>
                <strong>System overload:</strong> Check CPU and I/O
                <pre className="bg-muted p-2 rounded mt-1 overflow-x-auto">
                  <code>{`# Check load average
uptime

# Check I/O wait
iostat -x 1 5

# If high load, reduce PostgreSQL workload or add resources`}</code>
                </pre>
              </li>
              <li>
                <strong>Clock skew:</strong> Ensure time synchronization
                <pre className="bg-muted p-2 rounded mt-1 overflow-x-auto">
                  <code>{`# Check NTP status on all nodes
timedatectl status

# Enable NTP if not running
sudo timedatectl set-ntp true

# Verify time matches across nodes
date`}</code>
                </pre>
              </li>
            </ul>
          </div>

          <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-red-700 dark:text-red-400">
              Problem: Split-brain (multiple leaders)
            </h3>
            <p className="mb-3 text-sm"><strong>Note:</strong> Raft algorithm prevents split-brain by design, but misconfiguration can cause issues</p>
            
            <h4 className="font-semibold mt-4 mb-2">Diagnostic:</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`# Check leader status on ALL nodes
# Node 1:
psql -h 10.0.1.11 -U postgres -c "SELECT pgraft_is_leader(), pgraft_get_leader(), pgraft_get_term();"

# Node 2:
psql -h 10.0.1.12 -U postgres -c "SELECT pgraft_is_leader(), pgraft_get_leader(), pgraft_get_term();"

# Node 3:
psql -h 10.0.1.13 -U postgres -c "SELECT pgraft_is_leader(), pgraft_get_leader(), pgraft_get_term();"

# All should agree on leader_id and term
# If multiple nodes report is_leader=true, you may have network partition`}</code>
            </pre>

            <h4 className="font-semibold mt-4 mb-2">Recovery:</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`# 1. Fix network connectivity first
# Ensure all nodes can communicate

# 2. Identify which "leader" has higher term
# Keep that node running, restart others

# 3. Restart follower nodes
sudo systemctl restart postgresql  # on followers

# 4. Verify cluster converged to single leader
psql -U postgres -c "SELECT * FROM pgraft_get_cluster_status();"`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Replication Issues</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-yellow-700 dark:text-yellow-400">
              Problem: Follower lagging behind leader
            </h3>
            <p className="mb-3 text-sm"><strong>Symptom:</strong> High lag_entries in replication status</p>
            
            <h4 className="font-semibold mt-4 mb-2">Diagnostic:</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`# Check replication lag (run on leader)
SELECT * FROM pgraft_log_get_replication_status();
--  node_id | match_index | next_index | commit_index | lag_entries | state 
-- ---------+-------------+------------+--------------+-------------+--------
--        2 |        1250 |       1251 |         1250 |           0 | ok
--        3 |         800 |        801 |         1250 |         450 | slow

# Check log stats
SELECT * FROM pgraft_log_get_stats();

# Monitor follower performance
# On follower node:
SELECT * FROM pg_stat_bgwriter;
SELECT * FROM pg_stat_database WHERE datname = current_database();`}</code>
            </pre>

            <h4 className="font-semibold mt-4 mb-2">Solutions:</h4>
            <ul className="list-disc list-inside space-y-3 text-sm text-muted-foreground">
              <li>
                <strong>Network congestion:</strong> Check bandwidth between leader and follower
                <pre className="bg-muted p-2 rounded mt-1 overflow-x-auto">
                  <code>{`# Test network throughput
iperf3 -s  # on follower
iperf3 -c <follower-ip> -t 30  # on leader`}</code>
                </pre>
              </li>
              <li>
                <strong>Follower disk I/O bottleneck:</strong>
                <pre className="bg-muted p-2 rounded mt-1 overflow-x-auto">
                  <code>{`# Check disk I/O on follower
iostat -x 1 10

# If high await/svctm, consider:
# - Faster storage (SSD instead of HDD)
# - Reduce other I/O load on follower`}</code>
                </pre>
              </li>
              <li>
                <strong>Force synchronization:</strong>
                <pre className="bg-muted p-2 rounded mt-1 overflow-x-auto">
                  <code>{`# On lagging follower, force sync
SELECT pgraft_log_sync_with_leader();
-- Returns number of entries synchronized`}</code>
                </pre>
              </li>
              <li>
                <strong>Increase batch size (trade-off: higher latency):</strong>
                <pre className="bg-muted p-2 rounded mt-1 overflow-x-auto">
                  <code>{`# Edit postgresql.conf:
pgraft.batch_size = 500  # Increase from default 100
pgraft.max_batch_delay = 50  # ms

# Restart PostgreSQL
sudo systemctl restart postgresql`}</code>
                </pre>
              </li>
            </ul>
          </div>

          <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-red-700 dark:text-red-400">
              Problem: Replication completely stalled
            </h3>
            <p className="mb-3 text-sm"><strong>Symptom:</strong> Follower state = 'stalled' or 'error' in replication status</p>
            
            <h4 className="font-semibold mt-4 mb-2">Recovery Steps:</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`# 1. Check if follower is still running
ssh follower-node "sudo systemctl status postgresql"

# 2. Review follower logs for errors
ssh follower-node "sudo tail -100 /var/log/postgresql/*.log | grep -E '(ERROR|FATAL)'"

# 3. If follower is corrupted, rebuild from snapshot
# On follower:
sudo systemctl stop postgresql
sudo rm -rf /var/lib/postgresql/pgraft/*
sudo systemctl start postgresql

# Extension will auto-sync from leader snapshot`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Performance Issues</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-yellow-700 dark:text-yellow-400">
              Problem: High latency for KV store operations
            </h3>
            
            <h4 className="font-semibold mt-4 mb-2">Diagnostic:</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`# Measure KV operation latency
\\timing on
SELECT pgraft_kv_put('test_key', 'test_value');
-- Time: 150.234 ms  (should be < 50ms for local cluster)

SELECT pgraft_kv_get('test_key');
-- Time: 5.123 ms  (should be < 10ms)

# Check log stats
SELECT disk_usage_mb, total_entries FROM pgraft_log_get_stats();
# High disk usage may slow writes`}</code>
            </pre>

            <h4 className="font-semibold mt-4 mb-2">Solutions:</h4>
            <ul className="list-disc list-inside space-y-3 text-sm text-muted-foreground">
              <li>
                <strong>Trigger snapshot to compact log:</strong>
                <pre className="bg-muted p-2 rounded mt-1 overflow-x-auto">
                  <code>{`# Reduce snapshot_count for more frequent compaction
# postgresql.conf:
pgraft.snapshot_count = 5000  # from 10000

# Or manually compact KV store
SELECT pgraft_kv_compact();`}</code>
                </pre>
              </li>
              <li>
                <strong>Optimize batch settings for lower latency:</strong>
                <pre className="bg-muted p-2 rounded mt-1 overflow-x-auto">
                  <code>{`pgraft.batch_size = 10  # Reduce batch size
pgraft.max_batch_delay = 1  # 1ms max delay`}</code>
                </pre>
              </li>
              <li>
                <strong>Use faster storage for pgraft.data_dir:</strong> Move to SSD/NVMe
              </li>
            </ul>
          </div>

          <div className="p-4 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-yellow-700 dark:text-yellow-400">
              Problem: Excessive disk space usage
            </h3>
            
            <h4 className="font-semibold mt-4 mb-2">Diagnostic:</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`# Check disk usage
du -sh /var/lib/postgresql/pgraft/
# Example: 2.5G

# Breakdown by component
du -sh /var/lib/postgresql/pgraft/snapshots/
du -sh /var/lib/postgresql/pgraft/wal/

# Count snapshots
ls -1 /var/lib/postgresql/pgraft/snapshots/ | wc -l`}</code>
            </pre>

            <h4 className="font-semibold mt-4 mb-2">Solutions:</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`# Reduce snapshot retention
# postgresql.conf:
max_snapshots = 2  # Keep only 2 snapshots (was 5)
max_wals = 2  # Keep only 2 WAL files

# Compact KV store (removes deleted keys)
SELECT pgraft_kv_compact();

# Manually clean old snapshots (if safe to do so)
sudo ls -t /var/lib/postgresql/pgraft/snapshots/ | tail -n +3 | xargs -I {} sudo rm -f /var/lib/postgresql/pgraft/snapshots/{}`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Quorum and Availability Issues</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-red-700 dark:text-red-400">
              Problem: Lost quorum (cluster read-only)
            </h3>
            <p className="mb-3 text-sm"><strong>Symptom:</strong> Writes fail with "no leader" or "not enough nodes"</p>
            
            <h4 className="font-semibold mt-4 mb-2">Diagnostic:</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`# Check cluster status
SELECT num_nodes FROM pgraft_get_cluster_status();
# If num_nodes < majority (e.g., 1 out of 3), quorum lost

# Identify which nodes are down
SELECT * FROM pgraft_get_nodes();
-- Try connecting to each node`}</code>
            </pre>

            <h4 className="font-semibold mt-4 mb-2">Recovery Options:</h4>
            <ul className="list-decimal list-inside space-y-3 text-sm text-muted-foreground">
              <li>
                <strong>Restore failed nodes (preferred):</strong>
                <pre className="bg-muted p-2 rounded mt-1 overflow-x-auto">
                  <code>{`# Fix and restart downed nodes
ssh failed-node1 "sudo systemctl start postgresql"
ssh failed-node2 "sudo systemctl start postgresql"

# Verify quorum restored
SELECT * FROM pgraft_get_cluster_status();`}</code>
                </pre>
              </li>
              <li>
                <strong>If nodes permanently lost, rebuild cluster:</strong>
                <pre className="bg-muted p-2 rounded mt-1 overflow-x-auto">
                  <code>{`# This is a destructive operation!
# Only if majority of nodes are permanently gone

# 1. On surviving node, backup data
pg_dump -U postgres database_name > backup.sql

# 2. Reconfigure for new cluster
# Edit postgresql.conf:
pgraft.initial_cluster = 'node1=10.0.1.11:7001,node4=10.0.1.14:7004,node5=10.0.1.15:7005'

# 3. Clear old Raft state
sudo systemctl stop postgresql
sudo rm -rf /var/lib/postgresql/pgraft/*
sudo systemctl start postgresql

# 4. Recreate extension
psql -U postgres -c "CREATE EXTENSION pgraft;"

# 5. Add new nodes to rebuild quorum`}</code>
                </pre>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Debugging Techniques</h2>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-2">Enable Debug Logging</h3>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`-- Enable verbose pgraft logging
SELECT pgraft_set_debug(true);

-- Change log level in postgresql.conf
pgraft.log_level = 'debug';
# Restart PostgreSQL

-- Perform problematic operation
-- ...

-- Review debug logs
sudo tail -200 /var/log/postgresql/*.log | grep pgraft | grep DEBUG

-- Disable debug mode
SELECT pgraft_set_debug(false);`}</code>
          </pre>

          <h3 className="text-xl font-semibold mt-6 mb-2">Test Mode</h3>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`-- Run internal test function
SELECT pgraft_test();
-- Returns diagnostic information about cluster state`}</code>
          </pre>

          <h3 className="text-xl font-semibold mt-6 mb-2">Log Entry Inspection</h3>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`-- Get specific log entry details
SELECT * FROM pgraft_log_get_entry(1250);
-- Returns: index, term, type, data for entry 1250

-- Manually replicate single entry (advanced)
SELECT pgraft_replicate_entry(1250);`}</code>
          </pre>

          <h3 className="text-xl font-semibold mt-6 mb-2">Network Diagnostics</h3>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`# Test connectivity matrix
for node in 10.0.1.11:7001 10.0.1.12:7002 10.0.1.13:7003; do
    echo "Testing $node"
    nc -zv $(echo $node | cut -d: -f1) $(echo $node | cut -d: -f2)
done

# Measure latency
for ip in 10.0.1.11 10.0.1.12 10.0.1.13; do
    echo "Ping $ip:"
    ping -c 5 $ip | tail -1
done

# Check packet loss
mtr -r -c 100 10.0.1.12`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Emergency Recovery Procedures</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Complete Cluster Rebuild</h3>
            <p className="mb-3 text-sm text-muted-foreground">
              Last resort when cluster is completely broken and cannot be recovered.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`# 1. Backup data from any accessible node
pg_dump -U postgres -h <any-node> database_name > emergency_backup.sql

# 2. On all nodes, stop PostgreSQL
sudo systemctl stop postgresql

# 3. On all nodes, clear pgraft state
sudo rm -rf /var/lib/postgresql/pgraft/*

# 4. Verify postgresql.conf is correct on all nodes
# Ensure initial_cluster, listen_address, etc. are properly configured

# 5. Start PostgreSQL on all nodes
sudo systemctl start postgresql

# 6. On each node, recreate extension
psql -U postgres -c "CREATE EXTENSION pgraft;"

# 7. Verify cluster formed
psql -U postgres -c "SELECT * FROM pgraft_get_cluster_status();"

# 8. Restore data if needed
psql -U postgres database_name < emergency_backup.sql`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Data Corruption Recovery</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`# If KV store is corrupted
SELECT pgraft_kv_reset();
-- WARNING: Deletes all KV store data!

# If log is corrupted on one node
# On affected node:
sudo systemctl stop postgresql
sudo rm -rf /var/lib/postgresql/pgraft/*
sudo systemctl start postgresql
# Node will re-sync from cluster`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Getting Help</h2>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">
            When seeking help, gather the following information:
          </p>
          
          <h3 className="text-lg font-semibold">Diagnostic Information to Collect</h3>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`# 1. pgraft version
SELECT pgraft_get_version();

# 2. PostgreSQL version
SELECT version();

# 3. Cluster status (from all nodes)
SELECT * FROM pgraft_get_cluster_status();

# 4. Configuration (from all nodes)
SELECT name, setting FROM pg_settings WHERE name LIKE 'pgraft.%';

# 5. Recent logs (from all nodes)
sudo tail -500 /var/log/postgresql/*.log | grep pgraft > pgraft_logs.txt

# 6. Node information
SELECT * FROM pgraft_get_nodes();

# 7. Replication status (if available)
SELECT * FROM pgraft_log_get_replication_status();

# 8. System information
uname -a
cat /etc/os-release`}</code>
          </pre>

          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h4 className="font-semibold mb-2">Support Channels</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>GitHub Issues: <a href="https://github.com/pgedge/pgraft/issues" className="text-blue-600 hover:underline">github.com/pgedge/pgraft/issues</a></li>
              <li>Community Forum: <a href="https://community.pgedge.com" className="text-blue-600 hover:underline">community.pgedge.com</a></li>
              <li>Documentation: <a href="/docs/pgraft" className="text-blue-600 hover:underline">pgraft documentation</a></li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Prevention Best Practices</h2>
        
        <ul className="space-y-3 text-muted-foreground">
          <li><strong>Regular Monitoring:</strong> Set up automated health checks and alerting (see Monitoring guide)</li>
          <li><strong>Configuration Management:</strong> Use infrastructure-as-code to ensure consistent configuration</li>
          <li><strong>Testing:</strong> Regularly test failover procedures in staging environment</li>
          <li><strong>Backups:</strong> Maintain regular PostgreSQL database backups separate from Raft logs</li>
          <li><strong>Documentation:</strong> Keep runbooks for common operational procedures</li>
          <li><strong>Capacity Planning:</strong> Monitor disk usage trends, plan for growth</li>
          <li><strong>Network Redundancy:</strong> Use multiple network paths between nodes where possible</li>
          <li><strong>Time Sync:</strong> Ensure NTP is running and synchronized on all nodes</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Related Documentation</h2>
        <ul className="space-y-2">
          <li>
            <a href="/docs/pgraft/monitoring" className="text-blue-600 hover:underline">
              Monitoring and Observability
            </a> - Set up proactive monitoring
          </li>
          <li>
            <a href="/docs/pgraft/cluster-management" className="text-blue-600 hover:underline">
              Cluster Management
            </a> - Operational procedures
          </li>
          <li>
            <a href="/docs/pgraft/config-reference" className="text-blue-600 hover:underline">
              Configuration Reference
            </a> - All GUC parameters
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
