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

Modern applications demand databases that maintain continuous availability even when individual nodes experience failures. Traditional PostgreSQL high availability solutions typically rely on external coordination services such as etcd, Consul, or Zookeeper to manage cluster consensus and failover decisions. These external dependencies introduce significant operational complexity, additional points of failure, and network latency between the coordination layer and the database itself. Manual failover procedures further compound these challenges by requiring human intervention during critical moments when automated recovery would be preferable.

pgraft fundamentally changes this paradigm by embedding the Raft consensus protocol directly within PostgreSQL as a native extension. This architectural approach eliminates external dependencies entirely, providing cluster coordination without requiring separate infrastructure components. The extension operates seamlessly with PostgreSQL 16, 17, and 18, integrating consensus capabilities directly into the database process through background workers. This tight integration ensures that cluster coordination happens within the same process space as database operations, reducing latency and eliminating network hops between consensus decisions and database state changes. As part of the pgElephant suite for PostgreSQL high availability, pgraft represents a modern approach to building resilient database infrastructure.

## What Makes pgraft Different?

### Native PostgreSQL Integration

pgraft operates as a PostgreSQL extension utilizing background workers rather than running as a separate process. This architectural choice provides several critical advantages that distinguish it from traditional high availability solutions. The extension leverages PostgreSQL's background worker infrastructure to execute the Raft consensus engine within the same process space as the database server itself. This eliminates the need to manage additional processes, reducing operational overhead and simplifying deployment architectures.

The native integration provides direct access to PostgreSQL's shared memory, enabling efficient state sharing between the consensus layer and database operations without serialization overhead. This shared memory interface allows the background worker to maintain cluster state, process commands, and track worker status using PostgreSQL's built-in memory management facilities. The extension seamlessly integrates with existing PostgreSQL security mechanisms, respecting role-based access control and leveraging the database's authentication and authorization systems. Monitoring capabilities integrate directly with PostgreSQL's logging infrastructure, allowing administrators to track cluster operations through familiar PostgreSQL log files and monitoring tools.

Perhaps most importantly, this integration eliminates network hops between consensus decisions and database operations. When the Raft engine makes a consensus decision, that decision is immediately available to the database through shared memory, without requiring network communication or inter-process communication overhead. This zero-hop architecture provides faster failover detection, more reliable cluster coordination, and stronger consistency guarantees compared to solutions that rely on external coordination services.

### Proven Consensus Algorithm

pgraft leverages etcd-io/raft, the identical Raft consensus library that powers etcd in production Kubernetes clusters worldwide. This library choice provides pgraft with battle-tested reliability derived from years of production deployment across thousands of Kubernetes clusters managing mission-critical workloads. The etcd-io/raft implementation has been hardened through extensive real-world usage, handling millions of consensus operations daily in some of the world's largest container orchestration environments.

The library's production history means that failure modes are well-documented and thoroughly understood. Edge cases, network partition scenarios, and recovery procedures have been tested and validated across diverse deployment environments, from small development clusters to massive production systems spanning multiple data centers. The extensive testing includes stress testing under various failure conditions, performance benchmarking under high load, and validation of correctness properties through formal verification techniques.

Active maintenance by the etcd community ensures that pgraft benefits from ongoing improvements, security patches, and performance optimizations. The library receives regular updates that address newly discovered edge cases, incorporate performance improvements, and maintain compatibility with evolving system requirements. This community-driven development model provides confidence that the consensus engine will continue to evolve and improve over time, benefiting all systems that depend on it.

### Mathematical Guarantees

Split-brain scenarios represent one of the most dangerous failure modes in distributed systems, occurring when multiple nodes simultaneously believe they are the cluster leader. This condition can lead to data corruption, inconsistent state, and irrecoverable data loss as conflicting writes are accepted by different nodes. pgraft prevents split-brain conditions through mathematical guarantees embedded in the Raft consensus protocol itself, making such scenarios not merely unlikely but mathematically impossible.

The quorum requirement ensures that a leader must receive votes from a majority of nodes (N/2 + 1) before assuming leadership. In a three-node cluster, this means at least two nodes must agree on leadership before any node can become the leader. This majority requirement creates a fundamental constraint that prevents split-brain: even if network partitions occur, only the partition containing the majority of nodes can elect a leader. The minority partition, lacking sufficient votes to form a quorum, cannot elect a leader and will not accept writes, preventing conflicting state changes.

Term monotonicity provides another critical guarantee: each election increases the term number, and higher terms always win over lower terms. This means that if a network partition heals and nodes with different term numbers reconnect, the nodes with higher terms automatically take precedence. The term number acts as a logical clock that orders leadership elections, ensuring that newer elections always supersede older ones regardless of when nodes actually communicate.

The single leader per term guarantee ensures that the Raft algorithm mathematically enforces that only one leader can exist in any given term. This property is proven through formal verification of the Raft algorithm itself, not merely through testing or empirical observation. The combination of these three guarantees—quorum requirement, term monotonicity, and single leader per term—creates a mathematical proof that split-brain conditions cannot occur under the Raft protocol, regardless of network conditions, timing, or failure scenarios.

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

Installing pgraft requires PostgreSQL 16, 17, or 18 with development headers and standard build tools. The extension is built from source code and integrates directly into the PostgreSQL installation, requiring no external runtime dependencies beyond the PostgreSQL server itself.

### Prerequisites

Before building pgraft, ensure that your system has the necessary development tools and PostgreSQL headers installed. On Ubuntu or Debian systems, install the required packages using the package manager. On Red Hat-based systems such as Rocky Linux or CentOS, use the appropriate package manager commands. macOS users can install dependencies through Homebrew, while other Unix-like systems may require manual compilation of dependencies.

The build process requires standard C and Go development tools, including a C compiler (gcc or clang), the Go programming language compiler, make utility, and PostgreSQL development headers that match your PostgreSQL installation version. The extension links against PostgreSQL's internal APIs, so the development headers must exactly match the PostgreSQL version you intend to use.

### Installation Steps

The installation process begins by cloning the pgraft repository from GitHub. The repository contains both the C extension code that integrates with PostgreSQL and the Go code that implements the Raft consensus engine:

\`\`\`bash
# Clone the repository
git clone https://github.com/pgElephant/pgraft.git
cd pgraft

# Build and install
make clean && make
sudo make install
\`\`\`

The build process compiles both the C extension components and the Go Raft library, creating shared libraries that PostgreSQL will load at runtime. The make install step copies the compiled extension files to PostgreSQL's extension directory, typically located in the PostgreSQL installation's share/extension and lib directories. After installation, the extension files are available for use in any PostgreSQL database, though the extension must be explicitly created in each database where you want to use it.

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

After completing the configuration on all nodes, restart PostgreSQL on each node to load the pgraft extension. The extension automatically initializes when PostgreSQL starts, reading configuration parameters from postgresql.conf. On each node, create the extension in your target database to enable pgraft functionality:

\`\`\`sql
-- On each node, create the extension
CREATE EXTENSION pgraft;
SELECT pgraft_init();

 pgraft_init 
-------------
 t
(1 row)
\`\`\`

The initialization process starts the background worker, establishes network connections to other cluster members, and begins participating in the Raft consensus protocol. Wait approximately 10 seconds for the leader election process to complete. During this time, nodes exchange messages, vote for leadership, and establish the initial cluster state. Check which node has been elected as the leader:

\`\`\`sql
-- Check if current node is the leader
SELECT pgraft_is_leader();

-- On the leader node, this returns:
 pgraft_is_leader 
------------------
 t
(1 row)

-- On follower nodes, this returns:
 pgraft_is_leader 
------------------
 f
(1 row)
\`\`\`

Once a leader has been elected, you can add additional nodes to the cluster. Node addition must be performed on the leader node, as only the leader can modify cluster membership. The leader replicates membership changes through the Raft log, ensuring all nodes maintain consistent cluster state:

\`\`\`sql
-- On the leader node, add other nodes to the cluster
SELECT pgraft_add_node(2, '192.168.1.11', 7002);
SELECT pgraft_add_node(3, '192.168.1.12', 7003);

 pgraft_add_node 
-----------------
 t
(1 row)

 pgraft_add_node 
-----------------
 t
(1 row)
\`\`\`

After adding nodes, verify that the cluster is healthy and all nodes are properly connected. The cluster status view provides comprehensive information about each node's role, state, and synchronization status:

\`\`\`sql
-- Verify cluster health and node status
SELECT * FROM pgraft_get_cluster_status();

 node_id |   address    | port | is_leader |  state   | term | commit_index | last_log_index 
---------+--------------+------+-----------+----------+------+--------------+----------------
       1 | 192.168.1.10 | 7001 | t         | Leader   |    1 |           15 |             15
       2 | 192.168.1.11 | 7002 | f         | Follower |    1 |           15 |             15
       3 | 192.168.1.12 | 7003 | f         | Follower |    1 |           15 |             15
(3 rows)
\`\`\`

This output confirms that all three nodes are active, the leader is properly identified, and all nodes have synchronized their log indices, indicating that the cluster is operating correctly and ready to handle production workloads.

## SQL Function Reference

### Cluster Management Functions

#### pgraft_init()

Initialize pgraft on the current node using configuration parameters from postgresql.conf. This function starts the background worker, establishes network connections to other cluster members, and begins participating in the Raft consensus protocol.

\`\`\`sql
SELECT pgraft_init();

 pgraft_init 
-------------
 t
(1 row)
\`\`\`

This function must be called once after creating the extension on each node. It initializes internal state structures in shared memory, starts the background worker process that drives the Raft state machine, establishes TCP connections to other nodes specified in the initial_cluster configuration, and begins the leader election process. The function returns true on success, indicating that the node has successfully joined the cluster and is ready to participate in consensus operations.

#### pgraft_add_node(node_id, address, port)

Add a new node to the cluster. This function must be executed on the leader node, as only the leader can modify cluster membership. The membership change is replicated through the Raft log, ensuring all nodes maintain consistent cluster state.

\`\`\`sql
-- Add a fourth node to the cluster (must run on leader)
SELECT pgraft_add_node(4, '192.168.1.13', 7004);

 pgraft_add_node 
-----------------
 t
(1 row)
\`\`\`

The function takes three parameters: a unique node identifier, the IP address or hostname where the new node can be reached, and the Raft communication port. The leader replicates this membership change to all existing nodes through the Raft consensus protocol, ensuring that every node in the cluster learns about the new member. The new node must have pgraft configured with matching cluster settings and must be able to accept connections on the specified address and port.

#### pgraft_remove_node(node_id)

Remove a node from the cluster. This operation must be executed on the leader node and is replicated to all cluster members through the Raft log. Removing a node gracefully handles the departure, allowing the cluster to continue operating with the remaining nodes.

\`\`\`sql
-- Remove node 4 from the cluster (must run on leader)
SELECT pgraft_remove_node(4);

 pgraft_remove_node 
--------------------
 t
(1 row)
\`\`\`

After removal, the cluster adjusts its quorum requirements based on the new node count. For example, removing a node from a five-node cluster reduces it to four nodes, which still requires three nodes for a quorum. The removed node will no longer receive heartbeats or log entries, and attempts to reconnect will be rejected until the node is explicitly added back to the cluster.

### State Query Functions

#### pgraft_is_leader()

Check if the current node is the cluster leader. This function returns true if the node is currently serving as the Raft leader, false otherwise. Only the leader can accept write operations and modify cluster membership.

\`\`\`sql
-- Check if current node is the leader
SELECT pgraft_is_leader();

 pgraft_is_leader 
------------------
 t
(1 row)
\`\`\`

Applications should check leader status before performing write operations or cluster management tasks. If a node is not the leader, applications can either redirect operations to the leader node or wait for leadership to be established. This check is lightweight and can be performed frequently without significant performance impact.

#### pgraft_get_leader()

Get the node ID of the current cluster leader. This function returns the numeric identifier of the node currently serving as the Raft leader, or zero if no leader exists (which indicates a cluster health issue).

\`\`\`sql
-- Get the current leader's node ID
SELECT pgraft_get_leader();

 pgraft_get_leader 
-------------------
                 1
(1 row)
\`\`\`

This function is useful for monitoring cluster health and for applications that need to route write operations to the leader node. A return value of zero indicates that no leader has been elected, which typically occurs during cluster initialization or after a leader failure before a new leader is elected. In healthy clusters, this value should always be greater than zero.

#### pgraft_get_term()

Get the current Raft term number. The term represents the current election cycle and increases monotonically with each leader election. This value is crucial for understanding cluster stability and detecting leadership changes.

\`\`\`sql
-- Get the current Raft term
SELECT pgraft_get_term();

 pgraft_get_term 
-----------------
               3
(1 row)
\`\`\`

The term number increases with each leader election, providing a logical clock that orders leadership changes. Monotonically increasing terms are a core mechanism of split-brain prevention, as nodes with higher terms always take precedence over nodes with lower terms. In stable clusters, the term should remain constant for extended periods. Frequent term increases indicate cluster instability, network issues, or frequent leader failures that require investigation.

#### pgraft_get_nodes()

List all nodes currently registered in the cluster. This view provides a comprehensive overview of cluster membership, showing each node's identifier, network address, communication port, and leadership status.

\`\`\`sql
-- List all cluster nodes
SELECT * FROM pgraft_get_nodes();

 node_id |   address    | port | is_leader 
---------+--------------+------+-----------
       1 | 192.168.1.10 | 7001 | t
       2 | 192.168.1.11 | 7002 | f
       3 | 192.168.1.12 | 7003 | f
(3 rows)
\`\`\`

This view is useful for monitoring cluster topology, verifying that all expected nodes are present, and identifying which node is currently serving as the leader. The is_leader column indicates leadership status, with exactly one node showing true in healthy clusters. Applications can use this view to discover cluster members and route operations appropriately.

#### pgraft_get_cluster_status()

Get comprehensive cluster status information including node roles, Raft state, synchronization status, and operational metrics. This view provides the most detailed insight into cluster health and is essential for monitoring and troubleshooting.

\`\`\`sql
-- Get detailed cluster status
SELECT * FROM pgraft_get_cluster_status();

 node_id |   address    | port | is_leader |  state   | term | commit_index | last_log_index | last_heartbeat 
---------+--------------+------+-----------+----------+------+--------------+----------------+----------------
       1 | 192.168.1.10 | 7001 | t         | Leader   |    3 |          247 |            247 | 0.042s
       2 | 192.168.1.11 | 7002 | f         | Follower |    3 |          247 |            247 | 0.038s
       3 | 192.168.1.12 | 7003 | f         | Follower |    3 |          247 |            247 | 0.035s
(3 rows)
\`\`\`

**Column Descriptions:**
- **node_id**: Unique numeric identifier for each node in the cluster
- **address/port**: Network location where the node accepts Raft protocol communication
- **is_leader**: Boolean indicating whether this node is currently serving as the Raft leader
- **state**: Current Raft state machine state, which can be Leader, Follower, or Candidate
- **term**: Current election term number, which increases with each leader election
- **commit_index**: Highest log entry index known to be committed to a majority of nodes
- **last_log_index**: Index of the most recent log entry on this node
- **last_heartbeat**: Time elapsed since the last heartbeat was sent (only meaningful on leader nodes)

In healthy clusters, all nodes should show the same term, commit_index, and last_log_index values, indicating that log replication is synchronized. Differences in these values suggest replication lag or synchronization issues that require investigation.

### Log Replication Functions

#### pgraft_replicate_entry(data)

Replicate a log entry through the Raft consensus protocol. This function provides the fundamental mechanism for ensuring that state changes are consistently applied across all cluster nodes. The function accepts arbitrary text data that represents the operation to be replicated.

\`\`\`sql
-- Replicate a state change through Raft consensus
SELECT pgraft_replicate_entry('{"action": "update", "table": "users", "id": 123}');

 pgraft_replicate_entry 
------------------------
 t
(1 row)
\`\`\`

This function blocks until the entry is committed to a majority of nodes, ensuring durability and consistency. The leader appends the entry to its local log, replicates it to all followers, waits for acknowledgments from a majority, and then commits the entry. Only after this process completes does the function return, guaranteeing that the operation has been durably recorded and will survive node failures. This blocking behavior ensures strong consistency but may introduce latency proportional to network round-trip times and disk I/O performance.

#### pgraft_log_get_stats()

Get comprehensive statistics about the Raft log, including size, synchronization status, and application progress. This view is essential for monitoring log health and detecting replication issues.

\`\`\`sql
-- Get Raft log statistics
SELECT * FROM pgraft_log_get_stats();

 log_size | last_index | commit_index | last_applied 
----------+------------+--------------+--------------
     2048 |        247 |          247 |          247
(1 row)
\`\`\`

**Column Descriptions:**
- **log_size**: Total size of the Raft log in bytes, useful for monitoring disk usage and log growth trends
- **last_index**: Index of the most recent log entry appended to the local log
- **commit_index**: Index of the highest log entry known to be committed to a majority of nodes
- **last_applied**: Index of the last log entry that has been applied to the local state machine

In healthy clusters, commit_index and last_applied should equal last_index, indicating that all log entries have been committed and applied. Differences between these values indicate replication lag or application delays that may require investigation. The log_size metric helps administrators plan for disk space requirements and identify when log compaction may be necessary.

#### pgraft_log_get_entry(index)

Retrieve a specific log entry by its index. This function is useful for debugging, auditing, and understanding the sequence of operations that have been applied to the cluster.

\`\`\`sql
-- Retrieve a specific log entry by index
SELECT pgraft_log_get_entry(15);

                    pgraft_log_get_entry                     
-------------------------------------------------------------
 {"action": "update", "table": "users", "id": 123}
(1 row)
\`\`\`

The function returns the data payload of the log entry at the specified index. This is particularly useful for auditing purposes, understanding the sequence of state changes, and debugging issues where you need to examine what operations were applied at specific points in the cluster's history. The returned data is the exact text that was passed to pgraft_replicate_entry when the entry was created.

#### pgraft_log_get_replication_status()

Get detailed replication status for all follower nodes. This view is essential for monitoring cluster synchronization and identifying nodes that may be lagging behind the leader.

\`\`\`sql
-- Get replication status for all followers
SELECT * FROM pgraft_log_get_replication_status();

 node_id | match_index | next_index | is_replicating | last_heartbeat 
---------+-------------+------------+----------------+----------------
       2 |         247 |        248 | t              | 0.041s
       3 |         247 |        248 | t              | 0.038s
(2 rows)
\`\`\`

**Column Descriptions:**
- **match_index**: Highest log entry index known to be successfully replicated on this follower node
- **next_index**: The next log entry index that the leader will attempt to send to this follower
- **is_replicating**: Boolean indicating whether active replication is currently in progress to this follower
- **last_heartbeat**: Time elapsed since the last successful heartbeat or log replication message was received from this follower

When match_index equals the leader's last_log_index, the follower is fully synchronized. Differences indicate replication lag, which may be caused by network issues, slow disk I/O on the follower, or high write load on the leader. The is_replicating flag helps identify followers that have stopped receiving updates, which may indicate network connectivity problems or follower node issues.

### Monitoring Functions

#### pgraft_get_worker_state()

Get the background worker's current operational state. The background worker is responsible for driving the Raft state machine, processing consensus operations, and maintaining cluster connectivity.

\`\`\`sql
-- Check background worker state
SELECT pgraft_get_worker_state();

 pgraft_get_worker_state 
-------------------------
 running
(1 row)
\`\`\`

Possible states include \`running\` (normal operation), \`stopped\` (worker has been stopped), \`initializing\` (worker is starting up and establishing cluster connections), and \`error\` (worker has encountered an error condition). The running state indicates that the worker is actively processing Raft operations, sending heartbeats, and maintaining cluster connectivity. Any state other than running requires investigation, as it indicates that the node is not fully participating in cluster operations.

#### pgraft_get_version()

Get the pgraft extension version number. This function is useful for verifying that all cluster nodes are running compatible versions and for troubleshooting version-related issues.

\`\`\`sql
-- Get pgraft version
SELECT pgraft_get_version();

 pgraft_get_version 
--------------------
 1.0.0
(1 row)
\`\`\`

All nodes in a cluster should run the same pgraft version to ensure compatibility and prevent protocol mismatches. Version differences can lead to communication failures, replication issues, or consensus protocol errors. Administrators should verify version consistency across all cluster nodes during deployment and upgrades.

#### pgraft_set_debug(enabled)

Enable or disable detailed debug logging for troubleshooting cluster issues. When enabled, the extension logs extensive information about Raft protocol operations, network communication, and internal state transitions.

\`\`\`sql
-- Enable debug logging for troubleshooting
SELECT pgraft_set_debug(true);

 pgraft_set_debug 
------------------
 t
(1 row)

-- Disable debug logging to reduce log verbosity
SELECT pgraft_set_debug(false);

 pgraft_set_debug 
------------------
 t
(1 row)
\`\`\`

Debug logging generates detailed output in PostgreSQL's log files, including Raft message exchanges, election events, log replication operations, and error conditions. This information is invaluable for diagnosing cluster issues but should be disabled in production environments to avoid excessive log volume. Enable debug logging only when actively troubleshooting problems or during initial cluster setup and testing.

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

The distributed configuration store provides a practical example of building applications on top of pgraft's Raft primitives. Configuration values are stored with automatic replication across all cluster nodes, ensuring that configuration changes are consistently applied and available on every node.

Setting configuration values must be performed on the leader node, as these operations modify cluster state and require consensus:

\`\`\`sql
-- Set configuration values (must run on leader)
SELECT config_set('database.max_connections', '{"value": 100}'::jsonb);

                          config_set                           
---------------------------------------------------------------
 {"key": "database.max_connections", "success": true, 
  "version": 1, "replicated": true}
(1 row)
\`\`\`

Each configuration change is automatically replicated through the Raft log, ensuring that all nodes receive the update. The function returns a JSON object confirming the operation's success, the new version number, and replication status:

\`\`\`sql
SELECT config_set('cache.ttl_seconds', '{"value": 3600}'::jsonb);

                          config_set                           
---------------------------------------------------------------
 {"key": "cache.ttl_seconds", "success": true, 
  "version": 1, "replicated": true}
(1 row)
\`\`\`

Retrieving configuration values can be performed on any node, whether leader or follower, as read operations do not require consensus:

\`\`\`sql
-- Retrieve configuration (can be done on any node)
SELECT config_get('database.max_connections');

                              config_get                               
-----------------------------------------------------------------------
 {"key": "database.max_connections", "value": {"value": 100}, 
  "version": 1, "updated_at": "2025-10-05T10:30:45.123456"}
(1 row)
\`\`\`

The configuration store maintains a complete history of all configuration values, allowing administrators to view all settings and track when they were last modified:

\`\`\`sql
-- View all configurations
SELECT key, value, version, updated_at FROM config_store ORDER BY key;

          key           |     value      | version |       updated_at        
------------------------+----------------+---------+-------------------------
 cache.ttl_seconds      | {"value": 3600}|       1 | 2025-10-05 10:31:12.456
 database.max_connections| {"value": 100} |       1 | 2025-10-05 10:30:45.123
(2 rows)
\`\`\`

Monitoring the Raft log statistics confirms that configuration changes have been properly replicated and committed across the cluster:

\`\`\`sql
-- Check replication status to verify configuration changes are committed
SELECT * FROM pgraft_log_get_stats();

 log_size | last_index | commit_index | last_applied 
----------+------------+--------------+--------------
     3072 |         52 |           52 |           52
(1 row)
\`\`\`

The matching values for commit_index and last_applied indicate that all log entries have been successfully replicated and applied, confirming that configuration changes are fully synchronized across all cluster nodes.

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

The health check function provides a comprehensive overview of cluster health in a single query, making it ideal for monitoring dashboards and automated alerting systems:

\`\`\`sql
-- Run comprehensive health check
SELECT * FROM pgraft_health_check();

       metric        |          value          | status  
---------------------+-------------------------+---------
 Leader Status       | LEADER                  | OK
 Current Term        | 3                       | OK
 Leader Node         | 1                       | OK
 Worker State        | running                 | OK
 Log Commit Status   | Committed: 247, Last: 247 | OK
(5 rows)
\`\`\`

Each metric provides specific insight into cluster health. The Leader Status confirms that a leader exists and is functioning. The Current Term should remain stable in healthy clusters; frequent term increases indicate instability. The Leader Node identifier helps verify that leadership is properly established. The Worker State confirms that the background worker is operational. The Log Commit Status verifies that log replication is synchronized, with matching commit and last indices indicating that all entries have been successfully replicated and applied.

## Performance Characteristics and Tuning

Understanding pgraft's performance characteristics is essential for planning deployments, sizing infrastructure, and optimizing cluster behavior for specific workload requirements. The extension is designed to operate efficiently with minimal resource overhead while providing strong consistency guarantees.

### Default Performance Profile

pgraft operates with carefully tuned default parameters that balance performance, reliability, and resource consumption. These defaults work well for most deployment scenarios, but can be adjusted based on specific network conditions, workload patterns, and availability requirements.

| Metric | Default Value | Description |
|--------|---------------|-------------|
| Tick Interval | 100ms | Background worker update frequency that drives the Raft state machine |
| Election Timeout | 1000ms | Maximum time before triggering a new leader election when heartbeats are missed |
| Heartbeat Interval | 100ms | Frequency at which the leader sends heartbeat messages to followers |
| Memory Usage | ~50MB | Per node memory footprint including shared memory and Go runtime |
| CPU Usage (Idle) | <1% | CPU usage when cluster is idle with no active operations |
| CPU Usage (Election) | <5% | CPU usage during leader election processes |

The tick interval determines how frequently the background worker advances the Raft state machine, processing messages, updating timers, and handling consensus operations. A 100ms interval provides responsive failure detection while maintaining reasonable CPU usage. The election timeout of 1000ms allows the cluster to detect leader failures within one second under normal network conditions, providing sub-second failover capabilities in most scenarios.

Memory usage remains relatively constant regardless of cluster activity, as the extension maintains fixed-size data structures for cluster state, message queues, and log metadata. The Go runtime adds approximately 20-30MB of overhead, while PostgreSQL shared memory structures consume the remainder. CPU usage scales with cluster activity, with idle clusters consuming minimal resources and active clusters experiencing higher CPU usage during leader elections, log replication, and state synchronization operations.

### Tuning for Different Scenarios

Network latency and reliability characteristics vary significantly across deployment environments, requiring different configuration strategies to optimize performance and prevent spurious leader elections.

#### Low-Latency Networks (Data Center)

For deployments within the same data center where network latency is consistently below 5 milliseconds, you can use more aggressive timing parameters to achieve faster failure detection and recovery:

\`\`\`ini
pgraft.election_timeout = 500      # Faster failure detection (500ms)
pgraft.heartbeat_interval = 50     # More frequent heartbeats (50ms)
\`\`\`

This configuration provides sub-second failover capabilities, detecting leader failures within 500 milliseconds and maintaining tighter synchronization through more frequent heartbeat messages. The trade-off is increased network traffic, as heartbeats are sent twice as frequently. However, in data center environments with abundant network bandwidth, this overhead is typically negligible compared to the benefits of faster failure detection.

#### High-Latency Networks (Multi-Region)

For geographically distributed deployments where network latency between regions may exceed 50 milliseconds, more conservative timing parameters prevent spurious leader elections caused by normal network delays:

\`\`\`ini
pgraft.election_timeout = 3000     # Tolerate higher latency (3 seconds)
pgraft.heartbeat_interval = 300    # Reduce network traffic (300ms)
\`\`\`

This configuration allows the cluster to tolerate higher network latency without triggering unnecessary leader elections. The three-second election timeout provides sufficient buffer for network delays, packet loss, and temporary connectivity issues that are common in wide-area network deployments. The reduced heartbeat frequency decreases network traffic, which is particularly important when bandwidth costs are a consideration or when network capacity is limited between regions.

The key principle when tuning these parameters is ensuring that the election timeout is at least ten times the heartbeat interval. This relationship prevents normal network delays from being mistaken for leader failures, while still providing reasonable failure detection times for actual leader outages.

## Security Considerations

Securing pgraft deployments requires attention to network communication, access control, and operational procedures. The extension inherits PostgreSQL's security model while adding cluster-specific security considerations that must be addressed to protect against unauthorized access and ensure cluster integrity.

### Network Security

pgraft communicates between nodes using TCP connections for Raft protocol messages, heartbeats, and log replication. These network communications contain sensitive cluster state information and must be protected against interception, tampering, and unauthorized access.

**1. Use SSL/TLS for Inter-Node Communication**

Encrypting inter-node communication prevents eavesdropping and man-in-the-middle attacks that could compromise cluster integrity. While SSL/TLS support is planned for future releases, current deployments should use network-level encryption such as VPNs or encrypted network links:

\`\`\`ini
# Future SSL/TLS configuration (coming soon)
pgraft.ssl_enabled = true
pgraft.ssl_cert_file = '/etc/postgresql/certs/server.crt'
pgraft.ssl_key_file = '/etc/postgresql/certs/server.key'
pgraft.ssl_ca_file = '/etc/postgresql/certs/ca.crt'
\`\`\`

Until native SSL/TLS support is available, deploy pgraft clusters on private networks, use VPNs to encrypt traffic between nodes, or deploy nodes within secure network segments that restrict access to authorized systems only. Network-level encryption ensures that Raft protocol messages cannot be intercepted or modified in transit, protecting against attacks that could disrupt cluster operations or compromise data consistency.

**2. Firewall Configuration**

Firewall rules should restrict pgraft port access to only authorized cluster nodes, preventing unauthorized systems from joining the cluster or interfering with consensus operations. Each node should only accept connections from other cluster members:

\`\`\`bash
# Allow pgraft port from cluster nodes only
# Node 1 configuration - allow connections from nodes 2 and 3
iptables -A INPUT -p tcp --dport 7001 -s 192.168.1.11 -j ACCEPT
iptables -A INPUT -p tcp --dport 7001 -s 192.168.1.12 -j ACCEPT
iptables -A INPUT -p tcp --dport 7001 -j DROP

# Repeat for each node with appropriate source IPs
\`\`\`

These firewall rules ensure that only authorized cluster nodes can establish Raft protocol connections, preventing unauthorized systems from participating in consensus operations or disrupting cluster behavior. The rules should be applied consistently across all nodes, and any changes to cluster membership must be reflected in firewall configurations to maintain security while allowing legitimate cluster communication.

### Access Control

PostgreSQL's role-based access control system provides fine-grained control over who can perform cluster management operations and who can only monitor cluster status. Proper access control prevents unauthorized cluster modifications while enabling necessary monitoring and operational procedures.

Cluster management functions that modify cluster state, such as adding or removing nodes, should be restricted to administrative roles with explicit need for these capabilities. The pgraft extension functions respect PostgreSQL's permission system, allowing administrators to grant specific permissions to specific roles:

\`\`\`sql
-- Create a role for cluster administrators with full management capabilities
CREATE ROLE pgraft_admin;

-- Grant necessary permissions for cluster management
GRANT EXECUTE ON FUNCTION pgraft_add_node TO pgraft_admin;
GRANT EXECUTE ON FUNCTION pgraft_remove_node TO pgraft_admin;
GRANT EXECUTE ON FUNCTION pgraft_replicate_entry TO pgraft_admin;
GRANT EXECUTE ON FUNCTION pgraft_init TO pgraft_admin;

-- Create read-only monitoring role for operational visibility
CREATE ROLE pgraft_monitor;

-- Grant read-only access to monitoring and status functions
GRANT EXECUTE ON FUNCTION pgraft_is_leader TO pgraft_monitor;
GRANT EXECUTE ON FUNCTION pgraft_get_leader TO pgraft_monitor;
GRANT EXECUTE ON FUNCTION pgraft_get_cluster_status TO pgraft_monitor;
GRANT EXECUTE ON FUNCTION pgraft_get_nodes TO pgraft_monitor;
GRANT EXECUTE ON FUNCTION pgraft_get_term TO pgraft_monitor;
GRANT EXECUTE ON FUNCTION pgraft_log_get_stats TO pgraft_monitor;
GRANT EXECUTE ON FUNCTION pgraft_log_get_replication_status TO pgraft_monitor;
\`\`\`

This role-based approach enables separation of duties, allowing monitoring teams to observe cluster health without the ability to modify cluster configuration. Application users should typically not have access to pgraft functions at all, as cluster management is an administrative function that should be performed by database administrators or automated operational systems with appropriate credentials.

Regular audits of role permissions ensure that access remains appropriate as team members change roles or leave the organization. The principle of least privilege should guide permission assignments, granting only the minimum permissions necessary for each role's responsibilities.

## Production Deployment Best Practices

Deploying pgraft in production requires careful consideration of cluster topology, network architecture, hardware specifications, and operational procedures. Following established best practices ensures reliable operation, optimal performance, and simplified maintenance.

### 1. Cluster Sizing

Cluster size directly impacts fault tolerance, performance characteristics, and operational complexity. The Raft consensus protocol requires a majority of nodes (quorum) to make decisions, which creates specific requirements for cluster sizing.

**Three-Node Cluster (Recommended Minimum)**

A three-node cluster provides the minimum viable production configuration, tolerating the failure of one node while maintaining cluster availability. This configuration requires two nodes for quorum, meaning the cluster can continue operating as long as at least two nodes remain healthy. Three-node clusters work well for most production deployments where moderate availability requirements are sufficient and where the cost of additional nodes is a consideration.

The three-node configuration provides a good balance between fault tolerance and operational simplicity. With only three nodes to manage, monitoring, maintenance, and troubleshooting are straightforward. Network communication overhead remains minimal, as each node only needs to maintain connections to two other nodes. This configuration is ideal for small to medium-sized deployments where high availability is important but extreme fault tolerance is not required.

**Five-Node Cluster (High Availability)**

A five-node cluster significantly increases fault tolerance, allowing the cluster to continue operating even when two nodes fail simultaneously. This configuration requires three nodes for quorum, providing better resilience against multiple concurrent failures. Five-node clusters are recommended for mission-critical applications where availability requirements are stringent and where the cost of additional nodes is justified by the increased reliability.

The five-node configuration enables more sophisticated deployment strategies, such as distributing nodes across multiple availability zones or data centers. With five nodes, you can deploy two nodes in each of two primary locations and one node in a third location, providing geographic redundancy and disaster recovery capabilities. This topology ensures that the cluster can survive the complete failure of an entire data center while maintaining quorum in the remaining locations.

**Seven-Node Cluster (Maximum Recommended)**

A seven-node cluster provides the highest level of fault tolerance in a single cluster, tolerating the simultaneous failure of three nodes. This configuration requires four nodes for quorum, making it suitable for extreme availability requirements where multiple concurrent failures must be survivable. However, seven-node clusters introduce diminishing returns in terms of availability improvement while increasing operational complexity and resource overhead.

Beyond seven nodes, the benefits of additional nodes become minimal while the costs increase significantly. More nodes mean more replication overhead, as the leader must replicate log entries to a larger number of followers. Network communication complexity increases quadratically with the number of nodes, as each node must maintain connections to all other nodes. Election times may increase with larger clusters, as more nodes participate in the voting process. For deployments requiring more than seven nodes, consider using multiple independent clusters, read replicas outside the Raft cluster, or database sharding strategies.

### 2. Hardware Recommendations

Hardware specifications directly impact cluster performance, reliability, and the ability to handle production workloads. pgraft's resource requirements are relatively modest, but the underlying PostgreSQL database and network infrastructure must be appropriately sized for your workload.

**Minimum Production Specs (per node):**

The minimum production configuration provides adequate resources for small to medium-sized workloads with moderate transaction volumes. CPU requirements are driven primarily by PostgreSQL's query processing needs, with pgraft adding minimal overhead. A four-core CPU provides sufficient processing power for most workloads, allowing PostgreSQL to handle concurrent connections and complex queries while leaving resources available for the Raft consensus engine.

Memory allocation must account for PostgreSQL's shared buffers, connection overhead, and pgraft's consensus engine. An 8GB RAM configuration typically allocates 4GB to PostgreSQL shared buffers, 2GB for operating system and other processes, and 2GB as a buffer for connection overhead and temporary operations. This allocation ensures that the database can maintain a reasonable cache of frequently accessed data while providing headroom for connection spikes and temporary query operations.

Storage performance is critical for both PostgreSQL data files and pgraft's Raft log. An SSD with at least 500 IOPS ensures that log writes complete quickly, preventing replication lag and maintaining responsive cluster operations. The Raft log is written synchronously for durability, so slow disk I/O directly impacts consensus performance and failover times.

Network infrastructure must provide sufficient bandwidth and low latency for Raft protocol communication. A 1 Gbps network connection with less than 5 milliseconds latency between nodes ensures that heartbeats and log replication complete quickly, enabling fast failure detection and maintaining cluster synchronization. Higher latency increases election timeout requirements and slows down log replication, potentially impacting cluster performance.

**Recommended Production Specs (per node):**

The recommended production configuration provides headroom for growth, improved performance characteristics, and better resilience under high load conditions. An eight-core CPU enables better concurrency handling, allowing PostgreSQL to process more simultaneous queries and transactions while maintaining responsive cluster operations even under peak load.

Sixteen gigabytes of RAM provides significantly more cache space for PostgreSQL, improving query performance by reducing disk I/O for frequently accessed data. The additional memory also provides buffer space for connection spikes, complex queries that require large work memory allocations, and temporary operations that benefit from in-memory processing.

NVMe SSD storage with 5000+ IOPS dramatically improves both PostgreSQL performance and Raft log write performance. The high IOPS capability ensures that log replication completes quickly even under heavy write loads, maintaining low replication lag and enabling fast failover operations. NVMe's low latency characteristics are particularly beneficial for the synchronous writes required by the Raft protocol.

A 10 Gbps network with less than 1 millisecond latency provides ample bandwidth for log replication and enables aggressive timing parameters for fast failure detection. The low latency allows the cluster to use shorter election timeouts and heartbeat intervals, providing sub-second failover capabilities while maintaining stability. This network configuration is essential for deployments requiring the highest levels of availability and performance.

## Why pgraft Over Traditional Solutions

Traditional PostgreSQL high availability solutions like Patroni, Stolon, and RepMgr rely on external coordination services to manage cluster consensus and make failover decisions. These external dependencies fundamentally change the operational model, introducing complexity that extends far beyond the database layer itself.

### The External Dependency Problem

Solutions like Patroni require etcd, Consul, or Zookeeper as separate infrastructure components that must be installed, configured, monitored, and maintained independently of PostgreSQL. etcd, for example, is a standalone distributed key-value store that operates as a completely separate application from PostgreSQL. This architectural separation creates multiple operational challenges that compound over time.

The external coordination service must be deployed, configured, and maintained as a separate system with its own resource requirements, monitoring needs, and failure modes. Administrators must understand not only PostgreSQL but also the coordination service's configuration, operational procedures, and troubleshooting techniques. This dual-system knowledge requirement increases training costs, operational complexity, and the potential for configuration errors.

Network communication between PostgreSQL and the coordination service introduces latency and potential failure points. Every consensus decision requires network round-trips between PostgreSQL processes and the external coordination service. These network hops add latency to failover detection, cluster state updates, and membership changes. Network partitions or connectivity issues between PostgreSQL and the coordination service can cause false failure detections, delayed failovers, or complete cluster unavailability even when the database itself is functioning correctly.

The separation between coordination and database state creates opportunities for synchronization issues. The coordination service maintains its own view of cluster state, which must be kept synchronized with the actual database state. Discrepancies between these views can lead to incorrect failover decisions, split-brain scenarios, or data corruption. Ensuring consistency between the coordination layer and database state requires careful design and adds complexity to the overall system.

### pgraft's Integrated Approach

pgraft eliminates these external dependencies entirely by embedding the Raft consensus protocol directly within PostgreSQL as a native extension. The consensus engine runs as part of PostgreSQL's background worker architecture, executing within the same process space as the database server itself. This tight integration ensures that cluster coordination happens directly within the database process, eliminating network hops, reducing latency, and providing stronger consistency guarantees.

The extension operates as a single, unified component within PostgreSQL. There are no separate processes to manage, no external services to configure, and no additional infrastructure components to monitor. The consensus engine has direct access to PostgreSQL's shared memory, enabling efficient state sharing without serialization overhead. Cluster state is maintained within PostgreSQL's own memory structures, ensuring that coordination decisions are immediately available to database operations without requiring inter-process or network communication.

This integrated architecture provides faster failover detection because the consensus engine can directly observe database state and respond immediately to changes. There are no network delays between detecting a failure and initiating recovery procedures. The background worker drives the Raft state machine every 100 milliseconds, providing sub-second failure detection and automatic recovery without requiring external systems to observe and react to database state changes.

The result is a fundamentally simpler deployment model with fewer moving parts, reduced resource overhead, and stronger guarantees about cluster consistency and availability. Administrators need only understand PostgreSQL and the pgraft extension, not multiple separate systems with different operational procedures. The unified architecture reduces the attack surface, simplifies security configuration, and provides a single point of monitoring and management for the entire high availability solution.

## Conclusion

pgraft represents a fundamental shift in how PostgreSQL high availability is achieved, moving consensus capabilities directly into the database rather than relying on external coordination services. This architectural approach provides significant advantages in terms of operational simplicity, performance characteristics, and reliability guarantees.

The extension combines native PostgreSQL integration with a proven Raft consensus implementation, creating a unified high availability solution that eliminates external dependencies while providing strong mathematical guarantees about cluster consistency and split-brain prevention. The tight integration between the consensus engine and database operations enables faster failure detection, more reliable cluster coordination, and simpler operational procedures compared to traditional solutions that require separate coordination infrastructure.

### Key Advantages

**Native Integration**: pgraft operates entirely within PostgreSQL, requiring no external dependencies or coordination services. This eliminates the operational complexity of managing separate systems, reduces resource overhead, and simplifies deployment architectures. Administrators need only understand PostgreSQL and the pgraft extension, not multiple separate systems with different operational procedures.

**Production Ready**: Built on etcd-io/raft, the same battle-tested consensus library that powers Kubernetes clusters worldwide, pgraft benefits from years of production hardening, extensive testing, and active community maintenance. The library has been proven in some of the world's largest container orchestration environments, handling millions of consensus operations daily with exceptional reliability.

**Strong Guarantees**: The Raft consensus protocol provides mathematical guarantees that prevent split-brain conditions, ensuring that only one leader can exist at any time regardless of network conditions or failure scenarios. These guarantees are proven through formal verification, not merely through testing, providing confidence that the system will maintain consistency even under extreme failure conditions.

**Unified Operations**: All cluster management operations are accessible through standard SQL functions, enabling administrators to monitor, manage, and troubleshoot the cluster using familiar PostgreSQL tools and techniques. This unified interface eliminates the need to learn separate tools for cluster management, reducing training requirements and operational complexity.

**Flexible Architecture**: pgraft provides Raft consensus primitives that enable building custom distributed applications on top of the consensus engine. The extension includes a built-in key-value store for distributed configuration management, and the replication functions enable building more sophisticated distributed systems that require strong consistency guarantees.

**Comprehensive Documentation**: Extensive documentation covers installation, configuration, operations, troubleshooting, and best practices. The documentation includes practical examples, performance tuning guidelines, and production deployment recommendations that help administrators successfully deploy and operate pgraft clusters.

Whether you run PostgreSQL in cloud environments, on-premises data centers, or containerized Kubernetes deployments, pgraft provides the foundation for building resilient database infrastructure. Its zero-dependency architecture eliminates external coordination services, reducing operational complexity and potential failure points. Sub-second failover capabilities ensure minimal downtime during node failures, while strong consistency guarantees protect data integrity even under extreme failure conditions. These characteristics make pgraft an ideal choice for mission-critical applications where data integrity and availability are paramount concerns.

The extension's design philosophy of embedding consensus directly within PostgreSQL represents the future of database high availability, moving away from complex multi-system architectures toward simpler, more reliable integrated solutions. As organizations increasingly demand higher availability, better performance, and simpler operations, pgraft provides a path forward that addresses all these requirements while maintaining the reliability and consistency guarantees that mission-critical applications demand.

## Getting Started

Getting started with pgraft involves building the extension from source, configuring PostgreSQL to load it, setting up cluster parameters, and initializing the first node. This section provides a step-by-step guide to deploying your first pgraft cluster.

### Step 1: Build and Install

Begin by cloning the pgraft repository from GitHub. The repository contains both the C extension code that integrates with PostgreSQL and the Go code that implements the Raft consensus engine. Building the extension requires both C and Go development tools:

\`\`\`bash
# Clone the repository
git clone https://github.com/pgElephant/pgraft.git
cd pgraft

# Build the extension (compiles both C and Go components)
make clean && make

# Install the extension files to PostgreSQL directories
sudo make install
\`\`\`

The build process compiles the C extension that provides SQL functions and PostgreSQL integration, as well as the Go library that implements the Raft consensus protocol. The installation step copies the compiled files to PostgreSQL's extension directory, making them available for use in any database.

### Step 2: Configure PostgreSQL

Configure PostgreSQL to load the pgraft extension by adding it to the shared_preload_libraries parameter. This parameter must be set before PostgreSQL starts, as it controls which extensions are loaded into shared memory at server startup:

\`\`\`bash
# Edit postgresql.conf to add pgraft configuration
# Add to postgresql.conf:
shared_preload_libraries = 'pgraft'

# Configure cluster identity (unique for each node)
pgraft.cluster_id = 'my-cluster'
pgraft.node_id = 1
pgraft.address = '192.168.1.10'
pgraft.port = 7001
pgraft.initial_cluster = 'node1=192.168.1.10:7001,node2=192.168.1.11:7002,node3=192.168.1.12:7003'
pgraft.data_dir = '/var/lib/postgresql/pgraft'
\`\`\`

Each node in the cluster requires unique configuration, particularly the node_id, address, and port parameters. The initial_cluster parameter must be identical on all nodes, listing all cluster members with their network addresses and ports. This configuration enables nodes to discover each other and establish cluster connectivity.

### Step 3: Restart and Initialize

After configuration, restart PostgreSQL to load the pgraft extension. The extension automatically starts the background worker when PostgreSQL starts, reading configuration from postgresql.conf:

\`\`\`bash
# Restart PostgreSQL to load the extension
sudo systemctl restart postgresql

# Create the extension in your target database
psql -d mydatabase -c "CREATE EXTENSION pgraft;"

# Initialize pgraft (starts background worker and establishes cluster connections)
psql -d mydatabase -c "SELECT pgraft_init();"
\`\`\`

The initialization process starts the background worker, establishes network connections to other cluster members specified in initial_cluster, and begins participating in the Raft consensus protocol. The function returns true on success, indicating that the node has successfully joined the cluster.

### Step 4: Verify Cluster Health

After initialization, verify that the cluster is operating correctly by checking cluster status and confirming that a leader has been elected:

\`\`\`sql
-- Check cluster status
SELECT * FROM pgraft_get_cluster_status();

-- Verify leader exists
SELECT pgraft_get_leader();

-- Check if current node is leader
SELECT pgraft_is_leader();

-- View all cluster nodes
SELECT * FROM pgraft_get_nodes();
\`\`\`

These queries confirm that the cluster is healthy, a leader has been elected, and all nodes are properly connected. In a single-node cluster, that node will be the leader. When additional nodes are added, they will join as followers and participate in future leader elections.

### Step 5: Add Additional Nodes

Once the first node is running, add additional nodes to form a multi-node cluster. Each additional node requires the same installation and configuration steps, with unique node_id, address, and port values:

\`\`\`bash
# On node 2, configure with node_id = 2, different address/port
# On node 3, configure with node_id = 3, different address/port
# Then on the leader node, add the new nodes:
psql -d mydatabase -c "SELECT pgraft_add_node(2, '192.168.1.11', 7002);"
psql -d mydatabase -c "SELECT pgraft_add_node(3, '192.168.1.12', 7003);"
\`\`\`

After adding nodes, verify that all nodes appear in the cluster status and that log replication is synchronized across all nodes. The cluster is now ready for production use with full high availability capabilities.

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
