import { Metadata } from 'next'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'pgraft Cluster Management | Operational Playbooks',
  description: 'Create clusters, add and remove nodes, orchestrate failover, and execute maintenance procedures for pgraft-managed PostgreSQL deployments.',
}

export default function PgraftClusterManagementPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold mb-4">pgraft Cluster Management</h1>
        <p className="text-lg text-muted-foreground">
          Manage Raft-backed PostgreSQL clusters with pgraft. This guide covers cluster bootstrap, node lifecycle
          operations, failover orchestration, and rolling maintenance activities.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Bootstrap a New Cluster</h2>
        <p className="text-muted-foreground mb-4">
          Run these commands after installing pgraft and configuring the leader node. They initialize metadata, elect the
          first leader, and confirm that the cluster is healthy.
        </p>
        <SqlCodeBlock
          title="Initialize Raft metadata"
          code={`-- Run on the leader after CREATE EXTENSION
SELECT pgraft_init();

-- Optional: set a human-friendly cluster label
SELECT pgraft_set_config('cluster_name', 'production-cluster');

-- Verify leader election and quorum
SELECT pgraft_is_leader() AS is_leader,
       pgraft_get_term() AS current_term,
       pgraft_quorum_met() AS quorum_ready;`}
        />
        <SqlCodeBlock
          title="Review current members"
          code={`-- Shows the local node (leader) after initialization
SELECT * FROM pgraft_get_nodes();

-- Detailed cluster status including commit indexes
SELECT * FROM pgraft_get_cluster_status();`}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Add and Remove Nodes</h2>
        <p className="text-muted-foreground mb-4">
          Prepare each follower with the same postgresql.conf identity settings, then register it with the leader. Removing nodes requires leader confirmation to maintain quorum.
        </p>
        <SqlCodeBlock
          title="Add follower nodes"
          code={`-- Execute on the elected leader once the follower database is running
SELECT pgraft_add_node(2, '10.0.0.12', 7002);
SELECT pgraft_add_node(3, '10.0.0.13', 7003);

-- Monitor replication catch-up
SELECT node_id,
       state,
       match_index,
       commit_index
  FROM pgraft_get_nodes();`}
        />
        <SqlCodeBlock
          title="Remove a node gracefully"
          code={`-- Triggered from the leader to revoke membership
SELECT pgraft_remove_node(3);

-- Confirm removal and quorum health
SELECT pgraft_quorum_met() AS quorum_ok,
       pgraft_get_nodes();`}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Operational Monitoring</h2>
        <p className="text-muted-foreground mb-4">
          pgraft exposes diagnostic functions for Raft internals. Use them to track leadership, log replication, and worker health in dashboards or alerts.
        </p>
        <SqlCodeBlock
          title="Health overview"
          code={`-- Leader identity, Raft term, and election metrics
SELECT * FROM pgraft_get_cluster_status();

-- Per-node connectivity and Raft lag
SELECT node_id,
       state,
       last_heartbeat_ms,
       replication_lag_bytes
  FROM pgraft_get_nodes();`}
        />
        <SqlCodeBlock
          title="Log and snapshot telemetry"
          code={`-- Append/commit counts, snapshot cadence, and RPC statistics
SELECT * FROM pgraft_log_get_stats();

-- Inspect last five leadership transitions
SELECT *
  FROM pgraft_get_events()
 ORDER BY event_timestamp DESC
 LIMIT 5;`}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Failover & Leadership Control</h2>
        <p className="text-muted-foreground mb-4">
          Automatic elections occur when the leader misses heartbeat deadlines. Use the following procedures to simulate failover, promote a new leader, or pause elections during maintenance.
        </p>
        <SqlCodeBlock
          title="Manual leadership transfer"
          code={`-- Ask the current leader to step down and trigger an election
SELECT pgraft_transfer_leadership(2);

-- Pause elections when taking the leader offline (e.g., maintenance)
SELECT pgraft_set_config('failover_enabled', 'false');
-- Resume elections after maintenance concludes
SELECT pgraft_set_config('failover_enabled', 'true');`}
        />
        <BashCodeBlock
          title="Failover drill checklist"
          code={`# 1. Confirm cluster is healthy
psql -c "SELECT pgraft_quorum_met();"

# 2. Trigger leadership transfer
psql -c "SELECT pgraft_transfer_leadership(2);"

# 3. Validate new leader
psql -c "SELECT pgraft_is_leader(), pgraft_get_leader();"

# 4. Re-enable automatic failover if disabled
psql -c "SELECT pgraft_set_config('failover_enabled', 'true');"`}
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Rolling Maintenance Workflow</h2>
        <p className="text-muted-foreground mb-4">
          Keep quorum while patching or restarting individual members. Always drain workload and verify replication catch-up before shutting down a node.
        </p>
        <ol className="space-y-4 text-muted-foreground">
          <li>
            <strong>1. Drain client traffic.</strong> Redirect application connections away from the target node or remove it from connection poolers.
          </li>
          <li>
            <strong>2. Ensure follower status.</strong> If the node is leader, run <code>pgraft_transfer_leadership()</code> to promote another server.
          </li>
          <li>
            <strong>3. Wait for log sync.</strong> Use <code>SELECT replication_lag_bytes</code> from <code>pgraft_get_nodes()</code> to confirm lag is zero.
          </li>
          <li>
            <strong>4. Stop PostgreSQL.</strong> Apply OS patches or package upgrades and restart the instance.
          </li>
          <li>
            <strong>5. Rejoin the cluster.</strong> After startup, pgraft automatically reconnects and catches up; monitor <code>state = 'follower'</code>.
          </li>
        </ol>
      </section>
    </div>
  )
}
