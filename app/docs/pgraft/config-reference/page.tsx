import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Configuration Reference | pgraft',
  description: 'Complete configuration guide for pgraft Raft consensus extension with all GUC parameters, examples, and tuning recommendations.'
};

export default function PgraftConfigurationPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Configuration Reference</h1>
        <p className="text-lg text-muted-foreground">
          Complete guide to configuring pgraft for distributed PostgreSQL clusters. All configuration is done via PostgreSQL GUC (Grand Unified Configuration) parameters in <code>postgresql.conf</code>.
        </p>
      </div>

      <section className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Important: Configuration Requirements</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><code>shared_preload_libraries = 'pgraft'</code> is <strong>required</strong> in postgresql.conf</li>
          <li>All pgraft configuration must be identical across cluster nodes (except node-specific settings)</li>
          <li>PostgreSQL restart is required after changing pgraft configuration</li>
          <li>Node IDs are assigned automatically based on position in <code>initial_cluster</code></li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Essential Configuration Parameters</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2"><code>shared_preload_libraries</code></h3>
            <p className="mb-2"><strong>Type:</strong> string | <strong>Required:</strong> Yes | <strong>Restart:</strong> Required</p>
            <p className="mb-3 text-muted-foreground">
              PostgreSQL shared library preload list. Must include 'pgraft' for the extension to load.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`# postgresql.conf
shared_preload_libraries = 'pgraft'

# If using multiple extensions
shared_preload_libraries = 'pgraft,pg_stat_statements'`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft.name</code></h3>
            <p className="mb-2"><strong>Type:</strong> string | <strong>Required:</strong> Yes | <strong>Node-specific:</strong> Yes</p>
            <p className="mb-3 text-muted-foreground">
              Unique name for this node. Must match one of the names in <code>pgraft.initial_cluster</code>. 
              This is how pgraft determines the node's identity and assigns its ID.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`# Node 1 (postgresql.conf)
pgraft.name = 'node1'

# Node 2 (postgresql.conf)
pgraft.name = 'node2'

# Node 3 (postgresql.conf)
pgraft.name = 'node3'`}</code>
            </pre>
            <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-sm">
              <strong>Important:</strong> Node names must be unique across the cluster and match exactly with names in <code>initial_cluster</code>.
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft.data_dir</code></h3>
            <p className="mb-2"><strong>Type:</strong> string | <strong>Required:</strong> Yes | <strong>Default:</strong> None</p>
            <p className="mb-3 text-muted-foreground">
              Directory where pgraft stores Raft log, snapshots, and state. Must be writable by PostgreSQL user.
              Separate from PostgreSQL data directory for independent management.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`pgraft.data_dir = '/var/lib/postgresql/pgraft'

# Or within PostgreSQL data directory
pgraft.data_dir = '/var/lib/postgresql/17/main/pgraft'

# macOS Homebrew example
pgraft.data_dir = '/opt/homebrew/var/postgresql@17/pgraft'`}</code>
            </pre>
            <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-sm">
              <strong>Setup:</strong> Create directory before starting PostgreSQL:
              <pre className="mt-2 bg-muted p-2 rounded text-xs overflow-x-auto">
                <code>{`sudo mkdir -p /var/lib/postgresql/pgraft
sudo chown postgres:postgres /var/lib/postgresql/pgraft
sudo chmod 700 /var/lib/postgresql/pgraft`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft.initial_cluster</code></h3>
            <p className="mb-2"><strong>Type:</strong> string | <strong>Required:</strong> Yes | <strong>Same on all nodes:</strong> Yes</p>
            <p className="mb-3 text-muted-foreground">
              Comma-separated list of all cluster members in format <code>name=host:port</code>. 
              This configuration must be <strong>identical</strong> on all nodes. Node IDs are assigned based on position (1-indexed).
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`# Same on all nodes
pgraft.initial_cluster = 'node1=10.0.1.11:7001,node2=10.0.1.12:7002,node3=10.0.1.13:7003'

# Using hostnames
pgraft.initial_cluster = 'pg1=pg1.example.com:7001,pg2=pg2.example.com:7002,pg3=pg3.example.com:7003'

# Using IPv6
pgraft.initial_cluster = 'n1=[2001:db8::1]:7001,n2=[2001:db8::2]:7002,n3=[2001:db8::3]:7003'

# Local development (single machine)
pgraft.initial_cluster = 'node1=127.0.0.1:7001,node2=127.0.0.1:7002,node3=127.0.0.1:7003'`}</code>
            </pre>
            <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-sm">
              <strong>Critical:</strong> Order matters! Node 1 is the first name, node 2 is second, etc. 
              Changing order or names requires cluster rebuild.
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft.listen_address</code></h3>
            <p className="mb-2"><strong>Type:</strong> string | <strong>Required:</strong> Yes | <strong>Node-specific:</strong> Yes</p>
            <p className="mb-3 text-muted-foreground">
              Address and port for Raft communication (peer-to-peer). Format: <code>host:port</code> or <code>0.0.0.0:port</code> to listen on all interfaces.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`# Node 1
pgraft.listen_address = '0.0.0.0:7001'

# Node 2 (specific interface)
pgraft.listen_address = '10.0.1.12:7002'

# Node 3 (IPv6)
pgraft.listen_address = '[::]:7003'`}</code>
            </pre>
            <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-sm">
              <strong>Tip:</strong> Use <code>0.0.0.0:port</code> to accept connections on all network interfaces, 
              then use firewall rules to restrict access.
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Consensus Timing Parameters</h2>
        <p className="mb-4 text-muted-foreground">
          Control Raft election and heartbeat timing. Critical for failover speed and stability.
        </p>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft.election_timeout</code></h3>
            <p className="mb-2"><strong>Type:</strong> integer (milliseconds) | <strong>Default:</strong> 1000 | <strong>Range:</strong> 100–10000</p>
            <p className="mb-3 text-muted-foreground">
              Time a follower waits without hearing from leader before triggering election. 
              Lower values = faster failover, but higher risk of spurious elections. 
              Should be 10x <code>heartbeat_interval</code>.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`# Default (1 second failover detection)
pgraft.election_timeout = 1000

# Fast failover (500ms, for low-latency networks)
pgraft.election_timeout = 500

# Stable on high-latency networks (3 seconds)
pgraft.election_timeout = 3000`}</code>
            </pre>
            <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-sm">
              <strong>Tuning:</strong> Start with default 1000ms. Decrease only if network latency is consistently low (&lt;10ms). 
              Increase if you see frequent leader elections in logs.
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft.heartbeat_interval</code></h3>
            <p className="mb-2"><strong>Type:</strong> integer (milliseconds) | <strong>Default:</strong> 100 | <strong>Range:</strong> 10–1000</p>
            <p className="mb-3 text-muted-foreground">
              Interval at which leader sends heartbeats to followers. Lower values = faster failure detection, 
              but more network traffic. Should be 1/10th of <code>election_timeout</code>.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`# Default (10 heartbeats per second)
pgraft.heartbeat_interval = 100

# Low latency networks (20 heartbeats/sec)
pgraft.heartbeat_interval = 50

# Reduce network traffic (5 heartbeats/sec)
pgraft.heartbeat_interval = 200`}</code>
            </pre>
            <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-sm">
              <strong>Rule of thumb:</strong> <code>election_timeout = 10 × heartbeat_interval</code>
              <br />
              Example: heartbeat=100ms → election=1000ms
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft.snapshot_count</code></h3>
            <p className="mb-2"><strong>Type:</strong> integer | <strong>Default:</strong> 10000 | <strong>Range:</strong> 1000–100000</p>
            <p className="mb-3 text-muted-foreground">
              Number of committed log entries before triggering automatic snapshot. 
              Snapshots compact the log, reducing recovery time and disk usage.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`# Default
pgraft.snapshot_count = 10000

# More frequent snapshots (faster recovery, more I/O)
pgraft.snapshot_count = 5000

# Less frequent snapshots (less I/O, slower recovery)
pgraft.snapshot_count = 50000`}</code>
            </pre>
            <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-sm">
              <strong>Monitoring:</strong> Check snapshot frequency with:
              <pre className="mt-1 bg-muted p-2 rounded text-xs overflow-x-auto">
                <code>ls -lh /var/lib/postgresql/pgraft/snapshots/</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Cluster State Parameters</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft.initial_cluster_state</code></h3>
            <p className="mb-2"><strong>Type:</strong> string | <strong>Default:</strong> 'new' | <strong>Values:</strong> 'new', 'existing'</p>
            <p className="mb-3 text-muted-foreground">
              Whether this node is joining a new cluster or an existing one. Use 'new' for initial cluster bootstrap, 
              'existing' when adding nodes to running cluster.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`# Initial cluster setup (all nodes start together)
pgraft.initial_cluster_state = 'new'

# Adding node to existing cluster
pgraft.initial_cluster_state = 'existing'`}</code>
            </pre>
            <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-sm">
              <strong>Important:</strong> After initial setup, this should remain 'new' on original nodes. 
              Only set to 'existing' on nodes being dynamically added.
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft.initial_cluster_token</code></h3>
            <p className="mb-2"><strong>Type:</strong> string | <strong>Default:</strong> 'pgraft-cluster' | <strong>Optional:</strong> Yes</p>
            <p className="mb-3 text-muted-foreground">
              Unique cluster identifier token. Use different tokens for multiple clusters on same network 
              to prevent accidental cross-cluster communication.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`# Default
pgraft.initial_cluster_token = 'pgraft-cluster'

# Production cluster
pgraft.initial_cluster_token = 'prod-cluster-01'

# Development cluster
pgraft.initial_cluster_token = 'dev-cluster-test'`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Network and URL Parameters</h2>
        <p className="mb-4 text-muted-foreground">
          Advanced networking configuration for complex topologies, proxies, and multi-network environments.
        </p>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft.initial_advertise_peer_urls</code></h3>
            <p className="mb-2"><strong>Type:</strong> string | <strong>Optional:</strong> Yes | <strong>Node-specific:</strong> Yes</p>
            <p className="mb-3 text-muted-foreground">
              URLs advertised to peers for Raft communication. Use when node's external address differs from listen address 
              (e.g., behind NAT, load balancer, or using different NICs).
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`# Node behind NAT (advertise public IP)
pgraft.listen_address = '0.0.0.0:7001'
pgraft.initial_advertise_peer_urls = 'http://203.0.113.10:7001'

# Multiple URLs (prefer internal, fallback to external)
pgraft.initial_advertise_peer_urls = 'http://10.0.1.11:7001,http://203.0.113.10:7001'`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft.listen_peer_urls</code></h3>
            <p className="mb-2"><strong>Type:</strong> string | <strong>Optional:</strong> Yes</p>
            <p className="mb-3 text-muted-foreground">
              URLs to listen on for peer traffic. Alternative format to <code>listen_address</code>, supports multiple URLs.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`# Single URL
pgraft.listen_peer_urls = 'http://0.0.0.0:7001'

# Multiple interfaces
pgraft.listen_peer_urls = 'http://10.0.1.11:7001,http://192.168.1.11:7001'`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft.listen_client_urls</code></h3>
            <p className="mb-2"><strong>Type:</strong> string | <strong>Optional:</strong> Yes</p>
            <p className="mb-3 text-muted-foreground">
              URLs to listen on for client traffic (etcd compatibility feature). 
              Separate from PostgreSQL client connections.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`pgraft.listen_client_urls = 'http://0.0.0.0:2379'`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft.advertise_client_urls</code></h3>
            <p className="mb-2"><strong>Type:</strong> string | <strong>Optional:</strong> Yes</p>
            <p className="mb-3 text-muted-foreground">
              URLs advertised to clients (etcd compatibility).
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`pgraft.advertise_client_urls = 'http://10.0.1.11:2379'`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Resource Limits and Performance</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft.max_log_entries</code></h3>
            <p className="mb-2"><strong>Type:</strong> integer | <strong>Default:</strong> 100000 | <strong>Range:</strong> 1000–1000000</p>
            <p className="mb-3 text-muted-foreground">
              Maximum number of log entries to keep in memory before forcing a snapshot. 
              Higher values = more memory usage, lower I/O overhead.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`# Default
pgraft.max_log_entries = 100000

# High-throughput clusters
pgraft.max_log_entries = 500000

# Memory-constrained environments
pgraft.max_log_entries = 50000`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft.batch_size</code></h3>
            <p className="mb-2"><strong>Type:</strong> integer | <strong>Default:</strong> 100 | <strong>Range:</strong> 1–10000</p>
            <p className="mb-3 text-muted-foreground">
              Number of log entries to batch in a single append operation. 
              Higher values improve throughput at the cost of latency.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`# Default
pgraft.batch_size = 100

# High throughput (sacrifice latency)
pgraft.batch_size = 1000

# Low latency (sacrifice throughput)
pgraft.batch_size = 10`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft.max_batch_delay</code></h3>
            <p className="mb-2"><strong>Type:</strong> integer (milliseconds) | <strong>Default:</strong> 10 | <strong>Range:</strong> 1–1000</p>
            <p className="mb-3 text-muted-foreground">
              Maximum time to wait before flushing a partial batch. Balances throughput and latency.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`# Default (10ms max delay)
pgraft.max_batch_delay = 10

# Real-time applications (minimize delay)
pgraft.max_batch_delay = 1

# Batch-oriented workloads (maximize throughput)
pgraft.max_batch_delay = 100`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>quota_backend_bytes</code></h3>
            <p className="mb-2"><strong>Type:</strong> integer (bytes) | <strong>Default:</strong> 8GB | <strong>Optional:</strong> Yes</p>
            <p className="mb-3 text-muted-foreground">
              Backend database size quota (etcd compatibility).
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`quota_backend_bytes = 8589934592  # 8GB`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>max_request_bytes</code></h3>
            <p className="mb-2"><strong>Type:</strong> integer (bytes) | <strong>Default:</strong> 1.5MB | <strong>Optional:</strong> Yes</p>
            <p className="mb-3 text-muted-foreground">
              Maximum size of individual requests (etcd compatibility).
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`max_request_bytes = 1572864  # 1.5MB`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Logging and Debugging</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft.log_level</code></h3>
            <p className="mb-2"><strong>Type:</strong> string | <strong>Default:</strong> 'info' | <strong>Values:</strong> 'debug', 'info', 'warning', 'error'</p>
            <p className="mb-3 text-muted-foreground">
              Logging verbosity for pgraft. Debug level provides detailed Raft protocol messages.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`# Production
pgraft.log_level = 'info'

# Troubleshooting
pgraft.log_level = 'debug'

# Quiet (errors only)
pgraft.log_level = 'error'`}</code>
            </pre>
            <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-sm">
              <strong>Warning:</strong> Debug level generates significant log volume. Use only for troubleshooting.
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>log_outputs</code></h3>
            <p className="mb-2"><strong>Type:</strong> string | <strong>Optional:</strong> Yes</p>
            <p className="mb-3 text-muted-foreground">
              Log output destinations (etcd compatibility).
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`log_outputs = 'stderr'`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>log_package_levels</code></h3>
            <p className="mb-2"><strong>Type:</strong> string | <strong>Optional:</strong> Yes</p>
            <p className="mb-3 text-muted-foreground">
              Package-specific log levels (etcd compatibility).
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`log_package_levels = 'raft=info,pgraft=debug'`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Snapshot and Compaction</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2"><code>max_snapshots</code></h3>
            <p className="mb-2"><strong>Type:</strong> integer | <strong>Default:</strong> 5 | <strong>Range:</strong> 1–100</p>
            <p className="mb-3 text-muted-foreground">
              Maximum number of snapshots to retain. Older snapshots are automatically deleted.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`# Default (keep 5 snapshots)
max_snapshots = 5

# Disk space limited
max_snapshots = 2

# Long recovery history
max_snapshots = 10`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>max_wals</code></h3>
            <p className="mb-2"><strong>Type:</strong> integer | <strong>Default:</strong> 5 | <strong>Range:</strong> 1–100</p>
            <p className="mb-3 text-muted-foreground">
              Maximum number of Raft WAL files to retain.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`max_wals = 5`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>auto_compaction_retention</code></h3>
            <p className="mb-2"><strong>Type:</strong> string | <strong>Optional:</strong> Yes</p>
            <p className="mb-3 text-muted-foreground">
              Automatic compaction retention (etcd compatibility).
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`auto_compaction_retention = '1h'`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>auto_compaction_mode</code></h3>
            <p className="mb-2"><strong>Type:</strong> string | <strong>Optional:</strong> Yes | <strong>Values:</strong> 'periodic', 'revision'</p>
            <p className="mb-3 text-muted-foreground">
              Compaction mode (etcd compatibility).
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`auto_compaction_mode = 'periodic'`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>compaction_batch_limit</code></h3>
            <p className="mb-2"><strong>Type:</strong> integer | <strong>Default:</strong> 1000</p>
            <p className="mb-3 text-muted-foreground">
              Batch size for compaction operations.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`compaction_batch_limit = 1000`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Security and TLS</h2>
        <p className="mb-4 text-muted-foreground">
          Configure TLS/SSL encryption for Raft peer communication and client connections (etcd compatibility features).
        </p>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Peer TLS Configuration</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`# Peer certificate authentication
peer_client_cert_auth = true
peer_trusted_ca_file = '/etc/pgraft/certs/ca.crt'
peer_cert_file = '/etc/pgraft/certs/peer.crt'
peer_key_file = '/etc/pgraft/certs/peer.key'

# Allowed peer certificate CN
peer_cert_allowed_cn = 'pgraft-peer'

# Hostname verification
peer_cert_allowed_hostname = true`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Client TLS Configuration</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`# Client certificate authentication
client_cert_auth = true
trusted_ca_file = '/etc/pgraft/certs/ca.crt'
cert_file = '/etc/pgraft/certs/server.crt'
key_file = '/etc/pgraft/certs/server.key'
client_cert_file = '/etc/pgraft/certs/client.crt'
client_key_file = '/etc/pgraft/certs/client.key'`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>cipher_suites</code></h3>
            <p className="mb-2"><strong>Type:</strong> string | <strong>Optional:</strong> Yes</p>
            <p className="mb-3 text-muted-foreground">
              Allowed TLS cipher suites.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`cipher_suites = 'TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384'`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Metrics and Monitoring</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2"><code>listen_metrics_urls</code></h3>
            <p className="mb-2"><strong>Type:</strong> string | <strong>Optional:</strong> Yes</p>
            <p className="mb-3 text-muted-foreground">
              URLs to expose Prometheus metrics (etcd compatibility).
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`listen_metrics_urls = 'http://0.0.0.0:2379/metrics'`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>metrics</code></h3>
            <p className="mb-2"><strong>Type:</strong> string | <strong>Optional:</strong> Yes | <strong>Values:</strong> 'basic', 'extensive'</p>
            <p className="mb-3 text-muted-foreground">
              Metrics collection level.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`metrics = 'extensive'`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Advanced Options</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pgraft.go_library_path</code></h3>
            <p className="mb-2"><strong>Type:</strong> string | <strong>Optional:</strong> Yes</p>
            <p className="mb-3 text-muted-foreground">
              Path to pgraft Go shared library. Auto-detected if not specified.
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`# Usually auto-detected, manual override if needed
pgraft.go_library_path = '/usr/lib/postgresql/17/lib/libpgraft_core.so'`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>cors</code></h3>
            <p className="mb-2"><strong>Type:</strong> string | <strong>Optional:</strong> Yes</p>
            <p className="mb-3 text-muted-foreground">
              CORS allowed origins (etcd compatibility).
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`cors = '*'`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>host_whitelist</code></h3>
            <p className="mb-2"><strong>Type:</strong> string | <strong>Optional:</strong> Yes</p>
            <p className="mb-3 text-muted-foreground">
              Allowed hostnames for client connections (etcd compatibility).
            </p>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`host_whitelist = 'localhost,*.example.com'`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Complete Configuration Examples</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Minimal Production Configuration</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`# postgresql.conf - Node 1

# Required
shared_preload_libraries = 'pgraft'
pgraft.name = 'pg1'
pgraft.data_dir = '/var/lib/postgresql/pgraft'
pgraft.listen_address = '0.0.0.0:7001'
pgraft.initial_cluster = 'pg1=10.0.1.11:7001,pg2=10.0.1.12:7002,pg3=10.0.1.13:7003'

# Recommended
pgraft.election_timeout = 1000
pgraft.heartbeat_interval = 100
pgraft.snapshot_count = 10000
pgraft.log_level = 'info'`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">High-Performance Configuration</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`# postgresql.conf - High-throughput cluster

shared_preload_libraries = 'pgraft'
pgraft.name = 'node1'
pgraft.data_dir = '/nvme/pgraft'  # Fast SSD
pgraft.listen_address = '0.0.0.0:7001'
pgraft.initial_cluster = 'node1=10.0.1.11:7001,node2=10.0.1.12:7002,node3=10.0.1.13:7003'

# Fast failover
pgraft.election_timeout = 500
pgraft.heartbeat_interval = 50

# High throughput
pgraft.batch_size = 1000
pgraft.max_batch_delay = 50
pgraft.max_log_entries = 500000

# Aggressive snapshotting
pgraft.snapshot_count = 50000
max_snapshots = 3

# Minimal logging
pgraft.log_level = 'warning'`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">WAN/High-Latency Configuration</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`# postgresql.conf - Nodes across data centers

shared_preload_libraries = 'pgraft'
pgraft.name = 'dc1-node1'
pgraft.data_dir = '/var/lib/postgresql/pgraft'
pgraft.listen_address = '0.0.0.0:7001'
pgraft.initial_cluster = 'dc1-node1=10.1.1.11:7001,dc2-node1=10.2.1.11:7001,dc3-node1=10.3.1.11:7001'

# Tolerant of high latency
pgraft.election_timeout = 5000
pgraft.heartbeat_interval = 500

# Conservative batching
pgraft.batch_size = 50
pgraft.max_batch_delay = 100

# Verbose logging for debugging
pgraft.log_level = 'info'`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Development/Testing Configuration</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`# postgresql.conf - Local development (3 nodes on one machine)

shared_preload_libraries = 'pgraft'
pgraft.name = 'dev1'  # Change to dev2, dev3 for other nodes
pgraft.data_dir = '/tmp/pgraft/node1'  # /tmp/pgraft/node2, /tmp/pgraft/node3
pgraft.listen_address = '127.0.0.1:7001'  # 7002, 7003 for other nodes
pgraft.initial_cluster = 'dev1=127.0.0.1:7001,dev2=127.0.0.1:7002,dev3=127.0.0.1:7003'

# Fast iteration
pgraft.election_timeout = 300
pgraft.heartbeat_interval = 30
pgraft.snapshot_count = 100

# Verbose debugging
pgraft.log_level = 'debug'`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Configuration Validation</h2>
        
        <div className="space-y-4">
          <p className="text-muted-foreground">
            After modifying configuration, validate before restarting PostgreSQL:
          </p>
          
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>{`# 1. Check syntax
postgres --check -D /var/lib/postgresql/17/main

# 2. Restart PostgreSQL
sudo systemctl restart postgresql

# 3. Verify pgraft loaded
psql -c "SELECT * FROM pg_extension WHERE extname = 'pgraft';"

# 4. Check cluster status
psql -c "SELECT * FROM pgraft_get_cluster_status();"

# 5. View current configuration
psql -c "SELECT name, setting FROM pg_settings WHERE name LIKE 'pgraft.%' ORDER BY name;"

# 6. Check logs for errors
sudo tail -f /var/log/postgresql/postgresql-17-main.log | grep pgraft`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Troubleshooting Configuration Issues</h2>
        
        <div className="space-y-4">
          <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg">
            <h4 className="font-semibold mb-2 text-red-700 dark:text-red-400">Extension fails to load</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Check <code>shared_preload_libraries = 'pgraft'</code> is set</li>
              <li>Verify pgraft shared library exists: <code>ls -l /usr/lib/postgresql/17/lib/pgraft.so</code></li>
              <li>Check PostgreSQL error log for "could not load library"</li>
              <li>Ensure Go library path is accessible</li>
            </ul>
          </div>

          <div className="p-4 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <h4 className="font-semibold mb-2 text-yellow-700 dark:text-yellow-400">Cluster won't form</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Verify <code>initial_cluster</code> is identical on all nodes</li>
              <li>Check <code>pgraft.name</code> matches one entry in <code>initial_cluster</code></li>
              <li>Ensure Raft ports (e.g., 7001, 7002) are reachable between nodes</li>
              <li>Check firewall rules allow Raft communication</li>
              <li>Verify <code>data_dir</code> exists and is writable</li>
            </ul>
          </div>

          <div className="p-4 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <h4 className="font-semibold mb-2 text-yellow-700 dark:text-yellow-400">Frequent leader elections</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Increase <code>election_timeout</code> (try 2000 or 3000)</li>
              <li>Increase <code>heartbeat_interval</code> proportionally</li>
              <li>Check network latency between nodes</li>
              <li>Review system load and CPU availability</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
        <ul className="space-y-2">
          <li>
            <a href="/docs/pgraft/cluster-management" className="text-blue-600 hover:underline">
              Cluster Management Guide
            </a> - Learn about node operations and topology changes
          </li>
          <li>
            <a href="/docs/pgraft/sql-reference" className="text-blue-600 hover:underline">
              SQL Functions Reference
            </a> - Complete API documentation
          </li>
          <li>
            <a href="/docs/pgraft/monitoring" className="text-blue-600 hover:underline">
              Monitoring and Observability
            </a> - Track cluster health and performance
          </li>
          <li>
            <a href="/docs/pgraft/troubleshooting" className="text-blue-600 hover:underline">
              Troubleshooting Guide
            </a> - Diagnose and resolve issues
          </li>
        </ul>
      </section>
    </div>
  );
}
