import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'SQL Functions Reference | pgraft',
  description: 'Complete SQL API reference for pgraft Raft consensus functions, views, and key-value store operations.',
}

const tableOfContents: TocItem[] = [
  { id: 'cluster-lifecycle', title: 'Cluster Lifecycle' },
  { id: 'leadership-operations', title: 'Leadership Operations' },
  { id: 'monitoring-views', title: 'Monitoring Views' },
  { id: 'consensus-diagnostics', title: 'Consensus Diagnostics' },
  { id: 'kv-store-api', title: 'Key-Value Store API' },
  { id: 'maintenance-helpers', title: 'Maintenance & Debug Helpers' },
  { id: 'automation-recipes', title: 'Automation Recipes' },
]

const prevLink: NavLink = {
  href: '/docs/pgraft/raft-protocol',
  label: 'Raft Protocol',
}

const nextLink: NavLink = {
  href: '/docs/pgraft/config-reference',
  label: 'Config Reference',
}

const clusterFunctions = [
  {
    name: 'pgraft_init()',
    description: 'Initializes pgraft metadata using configured GUC parameters. Automatically executed on CREATE EXTENSION but exposed for reinitialization.',
    returns: 'boolean',
    example: `-- Initialize cluster (typically automatic during CREATE EXTENSION)
SELECT pgraft_init();`,
  },
  {
    name: 'pgraft_add_node(node_id integer, address text, port integer)',
    description: 'Registers a follower with the elected leader. Ensure the follower is running and shares the same cluster_id before calling.',
    returns: 'void',
    example: `-- Register followers from the leader node
SELECT pgraft_add_node(2, '10.0.0.12', 7002);
SELECT pgraft_add_node(3, '10.0.0.13', 7003);`,
  },
  {
    name: 'pgraft_remove_node(node_id integer)',
    description: 'Removes a node from membership and updates the Raft configuration. Wait for quorum confirmation before shutting down the node.',
    returns: 'void',
    example: `-- Gracefully remove node 3
SELECT pgraft_remove_node(3);
SELECT pgraft_quorum_met() AS quorum_ok;`,
  },
]

const leadershipFunctions = [
  {
    name: 'pgraft_get_leader()',
    description: 'Returns the current leader node ID as observed by the caller.',
    returns: 'integer',
    example: `SELECT pgraft_get_leader(); -- Example: returns 1`,
  },
  {
    name: 'pgraft_is_leader()',
    description: 'Boolean helper indicating whether the connected session is running on the leader.',
    returns: 'boolean',
    example: `SELECT pgraft_is_leader();`,
  },
  {
    name: 'pgraft_transfer_leadership(target_node_id integer)',
    description: 'Requests the current leader to step down and promote another node. Useful for scheduled maintenance and rolling restarts.',
    returns: 'void',
    example: `-- Promote node 2 to become leader
SELECT pgraft_transfer_leadership(2);`,
  },
]

const monitoringViews = [
  {
    name: 'pgraft_get_cluster_status()',
    description: 'Primary cluster health view containing leadership state, current term, quorum, message counters, and election statistics.',
    example: `SELECT * FROM pgraft_get_cluster_status();`,
  },
  {
    name: 'pgraft_get_nodes()',
    description: 'Lists registered members with connection info, Raft role, and replication indexes as seen by the local node.',
    example: `SELECT node_id,
       address,
       port,
       state,
       is_leader
  FROM pgraft_get_nodes();`,
  },
  {
    name: 'pgraft_log_get_stats()',
    description: 'Reports Raft log volume, commit/applied indexes, and disk usage metrics for sizing and troubleshooting.',
    example: `SELECT first_index,
       last_index,
       commit_index,
       applied_index,
       total_entries,
       disk_usage_mb
  FROM pgraft_log_get_stats();`,
  },
]

const kvFunctions = [
  {
    name: 'pgraft_kv_put(key text, value jsonb)',
    description: 'Writes an item to the replicated key-value store that ships with pgraft.',
    returns: 'void',
    example: `SELECT pgraft_kv_put('models/embedding', jsonb_build_object('version', '1.2.0', 'status', 'active'));`,
  },
  {
    name: 'pgraft_kv_get(key text)',
    description: 'Reads a value from the KV store. Returns NULL when the key does not exist.',
    returns: 'jsonb',
    example: `SELECT pgraft_kv_get('models/embedding');`,
  },
  {
    name: 'pgraft_kv_delete(key text)',
    description: 'Removes a key/value pair. Replicated to the entire cluster through the Raft log.',
    returns: 'void',
    example: `SELECT pgraft_kv_delete('models/embedding');`,
  },
]

const maintenanceHelpers = [
  {
    name: 'pgraft_set_config(name text, value text)',
    description: 'Adjusts pgraft configuration at runtime. Changes persist only in memory until pgraft_save_config() is called.',
    returns: 'void',
    example: `SELECT pgraft_set_config('heartbeat_interval', '75ms');`,
  },
  {
    name: 'pgraft_save_config()',
    description: 'Persists runtime configuration overrides to the metadata catalog so changes survive restarts.',
    returns: 'void',
    example: `SELECT pgraft_save_config();`,
  },
  {
    name: 'pgraft_set_debug(enabled boolean)',
    description: 'Enables verbose logging inside pgraft for investigating consensus behavior.',
    returns: 'void',
    example: `SELECT pgraft_set_debug(true);
-- ... perform operations ...
SELECT pgraft_set_debug(false);`,
  },
]

export default function PgraftSqlReferencePage() {
  return (
    <PostgresDocsLayout
      title="pgraft SQL Reference"
      version="pgraft Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="cluster-lifecycle">
        <h2>Cluster Lifecycle</h2>
        <p>
            Lifecycle helpers manage initial bootstrap, node membership, and cluster shape changes. Always execute membership changes on the elected leader and confirm quorum before shutting down members.
          </p>
          <div className="grid lg:grid-cols-3 gap-4">
            {clusterFunctions.map((fn) => (
              <div key={fn.name} className="border rounded-lg p-4 space-y-3">
                <div>
                  <h3 className="font-semibold">{fn.name}</h3>
                  <p>{fn.description}</p>
                </div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Returns: {fn.returns}</p>
                <SqlCodeBlock title="Usage" code={fn.example} />
              </div>
            ))}
          </div>
      </section>

      <section id="leadership-operations">
        <h2>Leadership Operations</h2>
        <p>
            Leader discovery and transfer functions coordinate manual failovers and allow automation to verify topology.
          </p>
          <div className="grid lg:grid-cols-3 gap-4">
            {leadershipFunctions.map((fn) => (
              <div key={fn.name} className="border rounded-lg p-4 space-y-3">
                <div>
                  <h3 className="font-semibold">{fn.name}</h3>
                  <p>{fn.description}</p>
                </div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Returns: {fn.returns}</p>
                <SqlCodeBlock title="Usage" code={fn.example} />
              </div>
            ))}
          </div>
      </section>

      <section id="monitoring-views">
        <h2>Monitoring Views</h2>
        <p>
            pgraft exposes lightweight SQL views that surface Raft metrics, node status, and log growth without attaching external agents.
          </p>
          <div className="grid lg:grid-cols-3 gap-4">
            {monitoringViews.map((view) => (
              <div key={view.name} className="border rounded-lg p-4 space-y-3">
                <div>
                  <h3 className="font-semibold">{view.name}</h3>
                  <p>{view.description}</p>
                </div>
                <SqlCodeBlock title="Query" code={view.example} />
              </div>
            ))}
          </div>
      </section>

      <section id="consensus-diagnostics">
        <h2>Consensus Diagnostics</h2>
        <p>
            Combine status and log views to create dashboards or alerting pipelines. The examples below illustrate common checks for operational readiness.
          </p>
          <div className="grid lg:grid-cols-2 gap-4">
            <SqlCodeBlock
              title="Election stability"
              code={`SELECT node_id,
       state,
       current_term,
       elections_triggered,
       elections_triggered::float / GREATEST(current_term, 1) AS elections_per_term
  FROM pgraft_get_cluster_status();`}
            />
            <SqlCodeBlock
              title="Follower lag"
              code={`SELECT node_id,
       match_index,
       commit_index,
       lag_entries,
       state
  FROM pgraft_log_get_replication_status()
 ORDER BY lag_entries DESC;`}
            />
            <SqlCodeBlock
              title="Log growth rate"
              code={`SELECT total_entries,
       disk_usage_mb,
       (disk_usage_mb::float / NULLIF(total_entries, 0)) * 1024 AS avg_entry_kb
  FROM pgraft_log_get_stats();`}
            />
            <SqlCodeBlock
              title="Node connectivity"
              code={`SELECT node_id,
       address,
       port,
       last_heartbeat_ms,
       replication_lag_bytes
  FROM pgraft_get_nodes();`}
            />
          </div>
      </section>

      <section id="kv-store-api">
        <h2>Key-Value Store API</h2>
        <p>
            pgraft bundles a replicated KV store for small configuration payloads and coordination primitives. Values replicate through the Raft log and honor the same commit guarantees as SQL writes.
          </p>
          <div className="grid lg:grid-cols-3 gap-4">
            {kvFunctions.map((fn) => (
              <div key={fn.name} className="border rounded-lg p-4 space-y-3">
                <div>
                  <h3 className="font-semibold">{fn.name}</h3>
                  <p>{fn.description}</p>
                </div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Returns: {fn.returns}</p>
                <SqlCodeBlock title="Usage" code={fn.example} />
              </div>
            ))}
          </div>
      </section>

      <section id="maintenance-helpers">
        <h2>Maintenance & Debug Helpers</h2>
        <p>
            Runtime configuration functions allow automation pipelines to tune consensus behavior, enable debug logging, and persist safe defaults without restarting PostgreSQL.
          </p>
          <div className="grid lg:grid-cols-3 gap-4">
            {maintenanceHelpers.map((fn) => (
              <div key={fn.name} className="border rounded-lg p-4 space-y-3">
                <div>
                  <h3 className="font-semibold">{fn.name}</h3>
                  <p>{fn.description}</p>
                </div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Returns: {fn.returns}</p>
                <SqlCodeBlock title="Usage" code={fn.example} />
              </div>
            ))}
          </div>
      </section>

      <section id="automation-recipes">
        <h2>Automation Recipes</h2>
        <p>
            Bundle the fundamental commands into reusable automation tasks for DevOps pipelines and incident response playbooks.
          </p>
          <SqlCodeBlock
            title="Rolling maintenance checklist"
            code={`-- 1. Confirm quorum and leadership
SELECT pgraft_quorum_met(), pgraft_get_leader();

-- 2. Transfer leadership away from maintenance target
SELECT pgraft_transfer_leadership(2);

-- 3. Pause automatic failover if required
SELECT pgraft_set_config('failover_enabled', 'false');

-- 4. After maintenance, resume elections and verify status
SELECT pgraft_set_config('failover_enabled', 'true');
SELECT * FROM pgraft_get_cluster_status();`}
          />
      </section>
    </PostgresDocsLayout>
  )
}
