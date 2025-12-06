import { BlogMarkdown } from '../../_components/BlogMarkdown';
import ShareOnLinkedIn from '../../../components/ShareOnLinkedIn';
import BlogPageTracker from '../../../components/BlogPageTracker';

export const metadata = {
  title: 'pgraft: Raft-Based PostgreSQL Extension',
  description: 'How pgraft brings automatic leader election, split-brain prevention, and high availability to PostgreSQL clusters with mathematical guarantees.',
  openGraph: {
    title: 'pgraft: Raft-Based PostgreSQL Extension',
    description: 'Raft Consensus for PostgreSQL - Auto Leader Election, Zero Split-Brain, Crash-Safe Replication',
    images: ['/blog/pgraft/og-image.jpg?v=8'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'pgraft: Raft-Based PostgreSQL Extension',
    description: 'Raft Consensus for PostgreSQL - Auto Leader Election, Zero Split-Brain, Crash-Safe Replication',
    images: ['/blog/pgraft/og-image.jpg?v=8'],
  },
};

const markdown = `![pgraft blog header](/blog/pgraft/header.svg?v=6)

# pgraft: Raft-Based PostgreSQL Extension

📦 **[View on GitHub](https://github.com/pgElephant/pgraft)** | 📥 **[Download Latest Release](https://github.com/pgElephant/pgraft/releases)** | 📖 **[Documentation](https://www.pgelephant.com/docs/pgraft)**

## Executive Summary

PostgreSQL clusters need reliable consensus to prevent data corruption and split-brain scenarios. **pgraft** solves this by implementing the Raft consensus protocol as a PostgreSQL extension. It uses the same etcd-io/raft library that powers Kubernetes, providing automatic leader election, log replication, and split-brain prevention without external dependencies.

## Introduction: The High Availability Challenge

Applications need databases that stay available when nodes fail. Most PostgreSQL HA solutions require external tools or manual failover steps, adding complexity and failure points.

pgraft brings consensus directly into PostgreSQL. It works as an extension for PostgreSQL 16, 17, and 18, providing cluster coordination without external dependencies. It's part of the pgElephant suite for PostgreSQL high availability.

## What Makes pgraft Different?

### Native PostgreSQL Integration

pgraft runs as a PostgreSQL extension using background workers, not as a separate process. This integration provides:

- No additional processes to manage
- Direct access to PostgreSQL's shared memory and storage
- Integration with existing PostgreSQL security and monitoring
- Zero network hops between consensus and database operations

### Proven Consensus Algorithm

pgraft uses etcd-io/raft, the same Raft implementation used by etcd in Kubernetes clusters. This gives you:

- Years of production hardening
- Well-understood failure modes
- Extensive testing and validation
- Active maintenance by the etcd community

### Mathematical Guarantees

Split-brain happens when multiple nodes think they're the leader, causing data corruption. pgraft prevents this with mathematical guarantees:

- **Quorum Requirement**: A leader must receive votes from the majority of nodes (N/2 + 1)
- **Term Monotonicity**: Each election increases the term number; higher terms always win
- **Single Leader Per Term**: The Raft algorithm mathematically ensures only one leader can exist in any given term

For a three-node cluster, at least two nodes must agree before any leadership change. In a network partition, only the partition containing the majority elects a leader. This makes split-brain mathematically impossible.

## Core Architecture

### The Hybrid C/Go Design

pgraft combines PostgreSQL's C extension system with Go's concurrency model:

\`\`\`
┌─────────────────────────────────────────┐
│     PostgreSQL Background Worker (C)    │
│  ┌────────────────────────────────────┐ │
│  │  Every 100ms: Tick & State Update  │ │
│  └────────────────────────────────────┘ │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│      Raft Consensus Engine (Go)         │
│         (etcd-io/raft library)          │
│  ┌────────────────────────────────────┐ │
│  │ Persist → Replicate → Apply → Tick │ │
│  └────────────────────────────────────┘ │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│    Persistent Storage & Network I/O     │
│  • HardState (term, vote, commit)       │
│  • Log Entries (replicated operations)  │
│  • Snapshots (compacted state)          │
│  • TCP Communication (inter-node)       │
└─────────────────────────────────────────┘
\`\`\`

**C Layer**: Handles the PostgreSQL integration through background workers and SQL functions. This layer manages shared memory state, exposes cluster operations through SQL, and drives the Raft engine's tick mechanism.

**Go Layer**: Implements the Raft state machine using etcd-io/raft. Handles leader election, log replication, snapshot management, and all consensus protocol details.

**Storage Layer**: Ensures durability by persisting Raft state to disk. All state changes are written to durable storage before being acknowledged, ensuring consistency across crashes and restarts.

**Network Layer**: Manages TCP communication between nodes for leader elections, heartbeats, and log replication.

### How It Works: The Raft Lifecycle

Every 100 milliseconds, the PostgreSQL background worker advances the Raft state machine:

1. **Tick**: Advances internal timers for elections and heartbeats
2. **Process Messages**: Handles incoming votes, heartbeats, and log entries
3. **Persist State**: Writes any state changes to disk
4. **Replicate Logs**: Sends new log entries to follower nodes
5. **Apply Committed**: Applies committed entries to the application state
6. **Send Messages**: Transmits responses and heartbeats to other nodes

This continuous cycle ensures the cluster maintains consensus even in the presence of failures.

## Installation and Configuration

### Prerequisites

- PostgreSQL 16, 17, or 18
- PostgreSQL development headers
- Standard build tools (make, gcc/clang)

### Installation Steps

\`\`\`bash
# Clone the repository
git clone https://github.com/pgElephant/pgraft.git
cd pgraft

# Build and install
make clean && make
sudo make install
\`\`\`

### Configuration

Each node requires unique configuration in \`postgresql.conf\`:

**Node 1 Configuration:**
\`\`\`ini
# Load the extension
shared_preload_libraries = 'pgraft'

# Cluster identification and networking
pgraft.name = 'node1'                        # Unique node name
pgraft.listen_address = '0.0.0.0:7001'       # Raft communication port
pgraft.initial_cluster = 'node1=10.0.1.11:7001,node2=10.0.1.12:7002,node3=10.0.1.13:7003'

# Storage location
pgraft.data_dir = '/var/lib/postgresql/pgraft'

# Timing parameters (optional)
pgraft.election_timeout = 1000    # milliseconds
pgraft.heartbeat_interval = 100   # milliseconds
\`\`\`

**Node 2 Configuration:**
\`\`\`ini
shared_preload_libraries = 'pgraft'

# Only change: unique node name
pgraft.name = 'node2'                        # Must match initial_cluster
pgraft.listen_address = '0.0.0.0:7002'       # Different port
pgraft.initial_cluster = 'node1=10.0.1.11:7001,node2=10.0.1.12:7002,node3=10.0.1.13:7003'

pgraft.data_dir = '/var/lib/postgresql/pgraft'
pgraft.election_timeout = 1000
pgraft.heartbeat_interval = 100
\`\`\`

**Node 3 Configuration:**
\`\`\`ini
shared_preload_libraries = 'pgraft'

pgraft.name = 'node3'                        # Must match initial_cluster
pgraft.listen_address = '0.0.0.0:7003'       # Different port
pgraft.initial_cluster = 'node1=10.0.1.11:7001,node2=10.0.1.12:7002,node3=10.0.1.13:7003'

pgraft.data_dir = '/var/lib/postgresql/pgraft'
pgraft.election_timeout = 1000
pgraft.heartbeat_interval = 100
\`\`\`

**Important Notes:**
- Node IDs are automatically assigned based on position in \`initial_cluster\` (node1=1, node2=2, node3=3)
- \`pgraft.name\` must be unique and match a name in \`initial_cluster\`
- \`initial_cluster\` must be **identical** on all nodes

### Bootstrap Process

After configuration, restart PostgreSQL on all nodes and initialize the cluster:

\`\`\`sql
-- On each node, create the extension
CREATE EXTENSION pgraft;
SELECT pgraft_init();

Output:
 pgraft_init 
-------------
 t
(1 row)
\`\`\`

Wait approximately 10 seconds for leader election to complete. Check the leader:

\`\`\`sql
SELECT pgraft_is_leader();

Output on Leader:
 pgraft_is_leader 
------------------
 t
(1 row)

Output on Followers:
 pgraft_is_leader 
------------------
 f
(1 row)
\`\`\`

On the leader node, add the other nodes to the cluster:

\`\`\`sql
SELECT pgraft_add_node(2, '192.168.1.11', 7002);
SELECT pgraft_add_node(3, '192.168.1.12', 7003);

Output:
 pgraft_add_node 
-----------------
 t
(1 row)

 pgraft_add_node 
-----------------
 t
(1 row)
\`\`\`

Verify the cluster is healthy:

\`\`\`sql
SELECT * FROM pgraft_get_cluster_status();

Output:
 node_id |   address    | port | is_leader |  state   | term | commit_index | last_log_index 
---------+--------------+------+-----------+----------+------+--------------+----------------
       1 | 192.168.1.10 | 7001 | t         | Leader   |    1 |           15 |             15
       2 | 192.168.1.11 | 7002 | f         | Follower |    1 |           15 |             15
       3 | 192.168.1.12 | 7003 | f         | Follower |    1 |           15 |             15
(3 rows)
\`\`\`

## SQL Function Reference

### Cluster Management Functions

#### pgraft_init()

Initialize pgraft on the current node.

\`\`\`sql
SELECT pgraft_init();
\`\`\`

This function must be called once after creating the extension on each node. It initializes internal state and starts the Raft node.

#### pgraft_add_node(node_id, address, port)

Add a new node to the cluster. **Must be executed on the leader.**

\`\`\`sql
SELECT pgraft_add_node(4, '192.168.1.13', 7004);

Output:
 pgraft_add_node 
-----------------
 t
(1 row)
\`\`\`

#### pgraft_remove_node(node_id)

Remove a node from the cluster. **Must be executed on the leader.**

\`\`\`sql
SELECT pgraft_remove_node(4);

Output:
 pgraft_remove_node 
--------------------
 t
(1 row)
\`\`\`

### State Query Functions

#### pgraft_is_leader()

Check if the current node is the cluster leader.

\`\`\`sql
SELECT pgraft_is_leader();

Output:
 pgraft_is_leader 
------------------
 t
(1 row)
\`\`\`

#### pgraft_get_leader()

Get the node ID of the current leader.

\`\`\`sql
SELECT pgraft_get_leader();

Output:
 pgraft_get_leader 
-------------------
                 1
(1 row)
\`\`\`

#### pgraft_get_term()

Get the current Raft term number.

\`\`\`sql
SELECT pgraft_get_term();

Output:
 pgraft_get_term 
-----------------
               3
(1 row)
\`\`\`

The term number increases with each leader election. Monotonically increasing terms are a core mechanism of split-brain prevention.

#### pgraft_get_nodes()

List all nodes in the cluster.

\`\`\`sql
SELECT * FROM pgraft_get_nodes();

Output:
 node_id |   address    | port | is_leader 
---------+--------------+------+-----------
       1 | 192.168.1.10 | 7001 | t
       2 | 192.168.1.11 | 7002 | f
       3 | 192.168.1.12 | 7003 | f
(3 rows)
\`\`\`

#### pgraft_get_cluster_status()

Get cluster status information.

\`\`\`sql
SELECT * FROM pgraft_get_cluster_status();

Output:
 node_id |   address    | port | is_leader |  state   | term | commit_index | last_log_index | last_heartbeat 
---------+--------------+------+-----------+----------+------+--------------+----------------+----------------
       1 | 192.168.1.10 | 7001 | t         | Leader   |    3 |          247 |            247 | 0.042s
       2 | 192.168.1.11 | 7002 | f         | Follower |    3 |          247 |            247 | 0.038s
       3 | 192.168.1.12 | 7003 | f         | Follower |    3 |          247 |            247 | 0.035s
(3 rows)
\`\`\`

**Column Descriptions:**
- **node_id**: Unique identifier for each node
- **address/port**: Network location of the node
- **is_leader**: Boolean indicating leader status
- **state**: Current Raft state (Leader, Follower, or Candidate)
- **term**: Current election term
- **commit_index**: Highest log entry known to be committed
- **last_log_index**: Index of the most recent log entry
- **last_heartbeat**: Time since last heartbeat (leader only)

### Log Replication Functions

#### pgraft_replicate_entry(data)

Replicate a log entry through the Raft consensus protocol.

\`\`\`sql
SELECT pgraft_replicate_entry('{"action": "update", "table": "users", "id": 123}');

Output:
 pgraft_replicate_entry 
------------------------
 t
(1 row)
\`\`\`

This function blocks until the entry is committed to a majority of nodes, ensuring durability and consistency.

#### pgraft_log_get_stats()

Get statistics about the Raft log.

\`\`\`sql
SELECT * FROM pgraft_log_get_stats();

Output:
 log_size | last_index | commit_index | last_applied 
----------+------------+--------------+--------------
     2048 |        247 |          247 |          247
(1 row)
\`\`\`

**Column Descriptions:**
- **log_size**: Total size of the log in bytes
- **last_index**: Index of the most recent log entry
- **commit_index**: Index of the highest committed entry
- **last_applied**: Index of the last entry applied to state machine

#### pgraft_log_get_entry(index)

Retrieve a specific log entry by its index.

\`\`\`sql
SELECT pgraft_log_get_entry(15);

Output:
                    pgraft_log_get_entry                     
-------------------------------------------------------------
 {"action": "update", "table": "users", "id": 123}
(1 row)
\`\`\`

#### pgraft_log_get_replication_status()

Get replication status for all follower nodes.

\`\`\`sql
SELECT * FROM pgraft_log_get_replication_status();

Output:
 node_id | match_index | next_index | is_replicating | last_heartbeat 
---------+-------------+------------+----------------+----------------
       2 |         247 |        248 | t              | 0.041s
       3 |         247 |        248 | t              | 0.038s
(2 rows)
\`\`\`

**Column Descriptions:**
- **match_index**: Highest log entry known to be replicated on this follower
- **next_index**: Next log entry to send to this follower
- **is_replicating**: Whether replication is currently active
- **last_heartbeat**: Time since last successful heartbeat

### Monitoring Functions

#### pgraft_get_worker_state()

Get the background worker's current state.

\`\`\`sql
SELECT pgraft_get_worker_state();

Output:
 pgraft_get_worker_state 
-------------------------
 running
(1 row)
\`\`\`

Possible states: \`running\`, \`stopped\`, \`initializing\`, \`error\`

#### pgraft_get_version()

Get the pgraft extension version.

\`\`\`sql
SELECT pgraft_get_version();

Output:
 pgraft_get_version 
--------------------
 1.0.0
(1 row)
\`\`\`

#### pgraft_set_debug(enabled)

Enable or disable debug logging.

\`\`\`sql
SELECT pgraft_set_debug(true);   -- Enable
SELECT pgraft_set_debug(false);  -- Disable

Output:
 pgraft_set_debug 
------------------
 t
(1 row)
\`\`\`

## Building Distributed Applications with pgraft

While pgraft does not include a built-in key-value store API, it gives you the fundamental Raft consensus primitives to build distributed applications with strong consistency guarantees.

### Example: Distributed Configuration Store

Here is an example of building a distributed configuration management system:

\`\`\`sql
-- Create schema for configuration store
CREATE TABLE IF NOT EXISTS config_store (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    version BIGINT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS config_history (
    key TEXT,
    value JSONB,
    version BIGINT,
    changed_at TIMESTAMP,
    changed_by TEXT,
    operation TEXT
);

-- Function to set a configuration value with Raft replication
CREATE OR REPLACE FUNCTION config_set(
    p_key TEXT,
    p_value JSONB,
    p_user TEXT DEFAULT current_user
)
RETURNS JSONB AS $$
DECLARE
    v_version BIGINT;
    v_log_entry JSONB;
    v_result JSONB;
BEGIN
    -- Only leader can process writes
    IF NOT pgraft_is_leader() THEN
        RAISE EXCEPTION 
            'Configuration changes must be performed on the leader node. Current leader: %', 
            pgraft_get_leader();
    END IF;
    
    -- Get current version
    SELECT version INTO v_version FROM config_store WHERE key = p_key;
    
    IF v_version IS NULL THEN
        v_version := 1;
    ELSE
        v_version := v_version + 1;
    END IF;
    
    -- Create log entry for replication
    v_log_entry := jsonb_build_object(
        'operation', 'config_set',
        'key', p_key,
        'value', p_value,
        'version', v_version,
        'user', p_user,
        'timestamp', NOW()
    );
    
    -- Replicate through Raft consensus
    IF NOT pgraft_replicate_entry(v_log_entry::text) THEN
        RAISE EXCEPTION 'Failed to replicate configuration change';
    END IF;
    
    -- Apply the change locally
    INSERT INTO config_store (key, value, version, updated_at)
    VALUES (p_key, p_value, v_version, NOW())
    ON CONFLICT (key) DO UPDATE SET
        value = EXCLUDED.value,
        version = EXCLUDED.version,
        updated_at = EXCLUDED.updated_at;
    
    -- Record in history
    INSERT INTO config_history (key, value, version, changed_at, changed_by, operation)
    VALUES (p_key, p_value, v_version, NOW(), p_user, 'SET');
    
    -- Return result
    v_result := jsonb_build_object(
        'success', true,
        'key', p_key,
        'version', v_version,
        'replicated', true
    );
    
    RETURN v_result;
END;
$$ LANGUAGE plpgsql;

-- Function to get a configuration value
CREATE OR REPLACE FUNCTION config_get(p_key TEXT)
RETURNS JSONB AS $$
DECLARE
    v_result JSONB;
BEGIN
    SELECT jsonb_build_object(
        'key', key,
        'value', value,
        'version', version,
        'updated_at', updated_at
    ) INTO v_result
    FROM config_store
    WHERE key = p_key;
    
    IF v_result IS NULL THEN
        RETURN jsonb_build_object('error', 'Key not found');
    END IF;
    
    RETURN v_result;
END;
$$ LANGUAGE plpgsql;

-- Function to delete a configuration value
CREATE OR REPLACE FUNCTION config_delete(
    p_key TEXT,
    p_user TEXT DEFAULT current_user
)
RETURNS JSONB AS $$
DECLARE
    v_log_entry JSONB;
BEGIN
    IF NOT pgraft_is_leader() THEN
        RAISE EXCEPTION 'Configuration changes must be performed on the leader node';
    END IF;
    
    v_log_entry := jsonb_build_object(
        'operation', 'config_delete',
        'key', p_key,
        'user', p_user,
        'timestamp', NOW()
    );
    
    IF NOT pgraft_replicate_entry(v_log_entry::text) THEN
        RAISE EXCEPTION 'Failed to replicate configuration deletion';
    END IF;
    
    DELETE FROM config_store WHERE key = p_key;
    
    INSERT INTO config_history (key, version, changed_at, changed_by, operation)
    VALUES (p_key, NULL, NOW(), p_user, 'DELETE');
    
    RETURN jsonb_build_object('success', true, 'key', p_key, 'operation', 'deleted');
END;
$$ LANGUAGE plpgsql;
\`\`\`

### Using the Distributed Configuration Store

\`\`\`sql
-- Set configuration values (on leader)
SELECT config_set('database.max_connections', '{"value": 100}'::jsonb);

Output:
                          config_set                           
---------------------------------------------------------------
 {"key": "database.max_connections", "success": true, 
  "version": 1, "replicated": true}
(1 row)
\`\`\`

\`\`\`sql
SELECT config_set('cache.ttl_seconds', '{"value": 3600}'::jsonb);

Output:
                          config_set                           
---------------------------------------------------------------
 {"key": "cache.ttl_seconds", "success": true, 
  "version": 1, "replicated": true}
(1 row)
\`\`\`

\`\`\`sql
-- Retrieve configuration (can be done on any node)
SELECT config_get('database.max_connections');

Output:
                              config_get                               
-----------------------------------------------------------------------
 {"key": "database.max_connections", "value": {"value": 100}, 
  "version": 1, "updated_at": "2025-10-05T10:30:45.123456"}
(1 row)
\`\`\`

\`\`\`sql
-- View all configurations
SELECT key, value, version, updated_at FROM config_store ORDER BY key;

Output:
          key           |     value      | version |       updated_at        
------------------------+----------------+---------+-------------------------
 cache.ttl_seconds      | {"value": 3600}|       1 | 2025-10-05 10:31:12.456
 database.max_connections| {"value": 100} |       1 | 2025-10-05 10:30:45.123
(2 rows)
\`\`\`

\`\`\`sql
-- Check replication status
SELECT * FROM pgraft_log_get_stats();

Output:
 log_size | last_index | commit_index | last_applied 
----------+------------+--------------+--------------
     3072 |         52 |           52 |           52
(1 row)
\`\`\`

## Monitoring and Operations

### Health Check Queries

Create a health check function:

\`\`\`sql
CREATE OR REPLACE FUNCTION pgraft_health_check()
RETURNS TABLE(
    metric TEXT,
    value TEXT,
    status TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 'Leader Status'::TEXT, 
           CASE WHEN pgraft_is_leader() THEN 'LEADER' ELSE 'FOLLOWER' END,
           'OK'::TEXT;
    
    RETURN QUERY
    SELECT 'Current Term'::TEXT,
           pgraft_get_term()::TEXT,
           'OK'::TEXT;
    
    RETURN QUERY
    SELECT 'Leader Node'::TEXT,
           pgraft_get_leader()::TEXT,
           CASE WHEN pgraft_get_leader() > 0 THEN 'OK' ELSE 'NO LEADER' END;
    
    RETURN QUERY
    SELECT 'Worker State'::TEXT,
           pgraft_get_worker_state(),
           CASE WHEN pgraft_get_worker_state() = 'running' THEN 'OK' ELSE 'ERROR' END;
    
    RETURN QUERY
    SELECT 'Log Commit Status'::TEXT,
           format('Committed: %s, Last: %s', 
                  (SELECT commit_index FROM pgraft_log_get_stats()),
                  (SELECT last_index FROM pgraft_log_get_stats())),
           CASE WHEN (SELECT commit_index FROM pgraft_log_get_stats()) = 
                     (SELECT last_index FROM pgraft_log_get_stats())
                THEN 'OK' ELSE 'SYNCING' END;
END;
$$ LANGUAGE plpgsql;
\`\`\`

**Usage:**

\`\`\`sql
SELECT * FROM pgraft_health_check();

Output:
       metric        |          value          | status  
---------------------+-------------------------+---------
 Leader Status       | LEADER                  | OK
 Current Term        | 3                       | OK
 Leader Node         | 1                       | OK
 Worker State        | running                 | OK
 Log Commit Status   | Committed: 247, Last: 247 | OK
(5 rows)
\`\`\`

## Performance Characteristics and Tuning

### Default Performance Profile

pgraft is designed for efficiency with sensible defaults:

| Metric | Default Value | Description |
|--------|---------------|-------------|
| Tick Interval | 100ms | Background worker update frequency |
| Election Timeout | 1000ms | Time before triggering new election |
| Heartbeat Interval | 100ms | Leader heartbeat frequency |
| Memory Usage | ~50MB | Per node memory footprint |
| CPU Usage (Idle) | <1% | CPU usage with no activity |
| CPU Usage (Election) | <5% | CPU usage during leader election |

### Tuning for Different Scenarios

#### Low-Latency Networks (Data Center)

For deployments in the same data center with low network latency:

\`\`\`ini
pgraft.election_timeout = 500      # Faster failure detection
pgraft.heartbeat_interval = 50     # More frequent heartbeats
\`\`\`

This configuration provides sub-second failover but increases network traffic.

#### High-Latency Networks (Multi-Region)

For geographically distributed deployments:

\`\`\`ini
pgraft.election_timeout = 3000     # Tolerate higher latency
pgraft.heartbeat_interval = 300    # Reduce network traffic
\`\`\`

This prevents spurious elections due to network delays.

## Security Considerations

### Network Security

pgraft communicates between nodes using TCP. Secure your deployment:

**1. Use SSL/TLS for Inter-Node Communication**

\`\`\`ini
pgraft.ssl_enabled = true
pgraft.ssl_cert_file = '/etc/postgresql/certs/server.crt'
pgraft.ssl_key_file = '/etc/postgresql/certs/server.key'
pgraft.ssl_ca_file = '/etc/postgresql/certs/ca.crt'
\`\`\`

**2. Firewall Configuration**

Only allow pgraft port access between cluster nodes:

\`\`\`bash
# Allow pgraft port from cluster nodes only
iptables -A INPUT -p tcp --dport 7001 -s 192.168.1.11 -j ACCEPT
iptables -A INPUT -p tcp --dport 7001 -s 192.168.1.12 -j ACCEPT
iptables -A INPUT -p tcp --dport 7001 -j DROP
\`\`\`

### Access Control

Restrict SQL function access using PostgreSQL roles:

\`\`\`sql
-- Create a role for cluster administrators
CREATE ROLE pgraft_admin;

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION pgraft_add_node TO pgraft_admin;
GRANT EXECUTE ON FUNCTION pgraft_remove_node TO pgraft_admin;
GRANT EXECUTE ON FUNCTION pgraft_replicate_entry TO pgraft_admin;

-- Create read-only monitoring role
CREATE ROLE pgraft_monitor;

GRANT EXECUTE ON FUNCTION pgraft_is_leader TO pgraft_monitor;
GRANT EXECUTE ON FUNCTION pgraft_get_leader TO pgraft_monitor;
GRANT EXECUTE ON FUNCTION pgraft_get_cluster_status TO pgraft_monitor;
GRANT SELECT ON pgraft_get_nodes TO pgraft_monitor;
\`\`\`

## Production Deployment Best Practices

### 1. Cluster Sizing

**Three-Node Cluster (Recommended Minimum)**
- Tolerates 1 node failure
- Requires 2 nodes for quorum
- Works for most production deployments

**Five-Node Cluster (High Availability)**
- Tolerates 2 node failures
- Requires 3 nodes for quorum
- Recommended for mission-critical applications

**Seven-Node Cluster (Maximum Recommended)**
- Tolerates 3 node failures
- Requires 4 nodes for quorum
- Only for extreme availability requirements
- Note: More nodes = higher replication overhead

### 2. Hardware Recommendations

**Minimum Production Specs (per node):**
- CPU: 4 cores
- RAM: 8GB (4GB for PostgreSQL, 2GB for OS, 2GB buffer)
- Disk: SSD with at least 500 IOPS
- Network: 1 Gbps with <5ms latency between nodes

**Recommended Production Specs (per node):**
- CPU: 8 cores
- RAM: 16GB
- Disk: NVMe SSD with 5000+ IOPS
- Network: 10 Gbps with <1ms latency between nodes

## Why pgraft Over Traditional Solutions

Traditional PostgreSQL high availability solutions like Patroni require external coordination services such as etcd, Consul, or Zookeeper to manage cluster consensus and failover decisions. These external dependencies introduce significant operational complexity and additional points of failure. etcd, for example, is a standalone application that operates independently of PostgreSQL, requiring separate installation, configuration, and maintenance. This architectural separation means that cluster coordination happens outside the database, creating network hops and potential synchronization issues between the coordination layer and the actual database state.

pgraft eliminates these external dependencies by embedding the Raft consensus protocol directly within PostgreSQL as a native extension. Unlike Patroni's approach of relying on external tools like etcd, pgraft includes built-in consensus capabilities without requiring any standalone applications or additional infrastructure components. The consensus engine runs as part of PostgreSQL's background worker architecture, ensuring tight integration with the database's internal state and operations.

pgraft operates as a single component within PostgreSQL. It does not require multiple separate systems to coordinate cluster behavior. Patroni and etcd communicate over the network to maintain cluster state. pgraft's consensus operations happen within the same process space as PostgreSQL. This provides faster failover detection and more reliable cluster coordination. The result is a simpler deployment model with fewer moving parts, reduced resource overhead, and stronger guarantees about cluster consistency and availability.

## Conclusion

pgraft adds consensus to PostgreSQL for high availability. It combines native integration, Raft implementation, and split-brain prevention. It works for organizations that need reliable, highly available PostgreSQL deployments.

### Key Points

1. **Native Integration**: No external dependencies or coordination services required
2. **Production Ready**: Built on etcd-io/raft with testing
3. **Strong Guarantees**: Mathematical prevention of split-brain conditions
4. **Operations**: Unified management through SQL functions
5. **Flexible**: Build custom distributed applications on top of Raft primitives
6. **Documentation**: Documentation and community support

Whether you run PostgreSQL in the cloud, on-premises, or on Kubernetes, pgraft builds resilient database infrastructure. Its zero-dependency architecture, sub-second failover, and consistency guarantees work for mission-critical applications where data integrity and availability matter.

## Getting Started

Quickstart:

\`\`\`bash
# 1. Clone and install
git clone https://github.com/pgElephant/pgraft.git
cd pgraft && make && sudo make install

# 2. Configure postgresql.conf
echo "shared_preload_libraries = 'pgraft'" >> postgresql.conf
echo "pgraft.cluster_id = 'my-cluster'" >> postgresql.conf
echo "pgraft.node_id = 1" >> postgresql.conf

# 3. Restart and initialize
sudo systemctl restart postgresql
psql -c "CREATE EXTENSION pgraft; SELECT pgraft_init();"

# 4. Verify
psql -c "SELECT * FROM pgraft_get_cluster_status();"
\`\`\`

## Resources and Community

- **Documentation**: https://pgelephant.github.io/pgraft/
- **GitHub Repository**: https://github.com/pgElephant/pgraft
- **Issue Tracker**: https://github.com/pgElephant/pgraft/issues
- **Website**: https://pgelephant.com
- **License**: MIT (Open Source)

Join the community and start building more reliable PostgreSQL infrastructure today!

---

*pgraft is developed with care for the PostgreSQL community. Version 1.0.0 | PostgreSQL 16, 17, 18 supported*

## Related Blog Posts

- [pgbalancer: AI-Powered PostgreSQL Connection Pooler](/blog/pgbalancer) - Learn about AI-powered connection pooling with machine learning load balancing, REST API management, and distributed MQTT coordination for PostgreSQL clusters.
- [pg_stat_insights: PostgreSQL Performance Monitoring Extension](/blog/pg-stat-insights) - Comprehensive guide to PostgreSQL performance monitoring with 52 metrics across 42 pre-built views for query analysis, replication monitoring, and index optimization.

## Support

For questions, issues, or commercial support, contact [admin@pgelephant.com](mailto:admin@pgelephant.com)`;

export default function PgraftBlogPost() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'pgraft: Raft-Based PostgreSQL Extension',
    description: 'How pgraft brings automatic leader election, split-brain prevention, and high availability to PostgreSQL clusters with mathematical guarantees.',
    image: 'https://www.pgelephant.com/blog/pgraft/og-image.jpg',
    datePublished: '2024-12-01',
    dateModified: '2024-12-01',
    author: {
      '@type': 'Organization',
      name: 'pgElephant',
      url: 'https://www.pgelephant.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'pgElephant',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.pgelephant.com/favicon-512.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.pgelephant.com/blog/pgraft',
    },
    keywords: 'PostgreSQL, Raft Consensus, High Availability, Database Clustering, Distributed Systems, pgraft',
  };

  return (
    <div className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BlogPageTracker
        slug="pgraft"
        title="pgraft: Raft-Based PostgreSQL Extension"
      />
      {/* Blog Content */}
      <div style={{ backgroundColor: '#1f2937' }}>
        <BlogMarkdown>{markdown}</BlogMarkdown>
        
        {/* Share Section */}
        <div className="max-w-7xl mx-auto px-6 pb-12">
          <div className="border-t border-white/10 pt-8">
            <h3 className="text-2xl font-bold text-white mb-4">Share This Article</h3>
            <ShareOnLinkedIn
              url="https://pgelephant.com/blog/pgraft"
              title="🚀 Introducing pgraft: Raft Consensus Protocol for PostgreSQL"
              summary="Achieve true high availability with automatic leader election, zero split-brain scenarios, and crash-safe replication. Built on the same etcd-io/raft engine that powers Kubernetes. Production-ready for PostgreSQL 16, 17, and 18."
              hashtags={[
                'PostgreSQL',
                'HighAvailability',
                'RaftConsensus',
                'DatabaseClustering',
                'DistributedSystems',
                'pgElephant',
                'DevOps',
                'SRE',
                'DatabaseEngineering',
                'OpenSource',
                'CloudNative',
                'Kubernetes'
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
