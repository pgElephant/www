import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'pgraft SQL Functions - Complete Reference | pgElephant',
  description:
    'Complete SQL function reference for pgraft PostgreSQL Raft extension covering cluster bootstrap, leadership, monitoring, and KV store operations.',
}

const tableOfContents: TocItem[] = [
  { id: 'cluster-bootstrap', title: 'Cluster Bootstrap' },
  { id: 'leadership-control', title: 'Leadership Control' },
  { id: 'operational-monitoring', title: 'Operational Monitoring' },
  { id: 'runtime-configuration', title: 'Runtime Configuration' },
  { id: 'kv-store', title: 'Replicated KV Store' },
  { id: 'troubleshooting-toolkit', title: 'Troubleshooting Toolkit' },
  { id: 'automation-workflows', title: 'Automation Workflows' },
]

const prevLink: NavLink = {
  href: '/docs/pgraft/architecture',
  label: 'Architecture',
}

const nextLink: NavLink = {
  href: '/docs/pgraft/configuration',
  label: 'Configuration',
}

export default function PgraftSqlFunctionsPage() {
  return (
    <PostgresDocsLayout
      title="pgraft SQL Functions"
      version="pgraft Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="cluster-bootstrap">
        <h2>Cluster Bootstrap</h2>
        <p>
          Initialize pgraft metadata, set cluster identity, and register members. Execute these commands on the elected leader once PostgreSQL configuration matches across nodes.
        </p>
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4 space-y-3">
            <h3>pgraft_init()</h3>
            <p>
              Bootstraps the cluster catalog and Raft log. Automatically executed during <code>CREATE EXTENSION pgraft</code> but exposed for automation.
            </p>
            <SqlCodeBlock
              title="Initialize cluster"
              code={`-- Run after CREATE EXTENSION if manual bootstrap is required
SELECT pgraft_init();`}
            />
          </div>
          <div className="border rounded-lg p-4 space-y-3">
            <h3>pgraft_add_node()</h3>
            <p>
              Adds a follower node to the membership roster. The follower must be online with matching <code>pgraft.cluster_id</code> and a unique <code>pgraft.node_id</code>.
            </p>
            <SqlCodeBlock
              title="Register followers"
              code={`SELECT pgraft_add_node(2, '10.0.0.12', 7002);
SELECT pgraft_add_node(3, '10.0.0.13', 7003);

SELECT node_id,
       state,
       match_index,
       commit_index
  FROM pgraft_get_nodes();`}
            />
          </div>
          <div className="border rounded-lg p-4 space-y-3">
            <h3>pgraft_remove_node()</h3>
            <p>
              Removes a node from voting membership. Use before decommissioning hardware or performing destructive maintenance.
            </p>
            <SqlCodeBlock
              title="Drain a node"
              code={`SELECT pgraft_remove_node(3);
SELECT pgraft_quorum_met() AS quorum_ok;`}
            />
          </div>
        </div>
      </section>

      <section id="leadership-control">
        <h2>Leadership Control</h2>
        <p>
          Determine leadership, orchestrate manual failovers, and coordinate rolling maintenance with declarative SQL calls.
        </p>
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4 space-y-3">
            <h3>pgraft_get_leader()</h3>
            <p>Returns the node ID of the current leader according to the calling session.</p>
            <SqlCodeBlock title="Who is leader?" code={`SELECT pgraft_get_leader();`} />
          </div>
          <div className="border rounded-lg p-4 space-y-3">
            <h3>pgraft_is_leader()</h3>
            <p>Boolean helper for routing logic and connection pools.</p>
            <SqlCodeBlock title="Am I leader?" code={`SELECT pgraft_is_leader();`} />
          </div>
          <div className="border rounded-lg p-4 space-y-3">
            <h3>pgraft_transfer_leadership()</h3>
            <p>
              Requests that the current leader hand off leadership to another node to support planned maintenance or topology changes.
            </p>
            <SqlCodeBlock
              title="Promote another node"
              code={`SELECT pgraft_transfer_leadership(2);
SELECT pgraft_get_leader();`}
            />
          </div>
        </div>
      </section>

      <section id="operational-monitoring">
        <h2>Operational Monitoring</h2>
        <p>
          These read-only views expose Raft health, replication status, and worker uptime. Use them to drive dashboards and alerting.
        </p>
        <div className="grid lg:grid-cols-2 gap-4">
          <SqlCodeBlock
            title="Cluster status"
            code={`SELECT node_id,
       leader_id,
       current_term,
       state,
       num_nodes,
       messages_processed,
       elections_triggered
  FROM pgraft_get_cluster_status();`}
          />
          <SqlCodeBlock
            title="Replication lag"
            code={`SELECT node_id,
       match_index,
       commit_index,
       lag_entries,
       state
  FROM pgraft_log_get_replication_status()
 ORDER BY lag_entries DESC;`}
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
          <SqlCodeBlock
            title="Log volume"
            code={`SELECT first_index,
       last_index,
       total_entries,
       disk_usage_mb
  FROM pgraft_log_get_stats();`}
          />
        </div>
      </section>

      <section id="runtime-configuration">
        <h2>Runtime Configuration</h2>
        <p>
          Update pgraft configuration dynamically and persist durable overrides without restarting PostgreSQL.
        </p>
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4 space-y-3">
            <h3>pgraft_set_config()</h3>
            <p>Adjusts any pgraft GUC at runtime on all nodes.</p>
            <SqlCodeBlock
              title="Tune consensus timing"
              code={`SELECT pgraft_set_config('heartbeat_interval', '75ms');
SELECT pgraft_set_config('election_timeout', '900ms');`}
            />
          </div>
          <div className="border rounded-lg p-4 space-y-3">
            <h3>pgraft_save_config()</h3>
            <p>Persists in-memory overrides to catalog tables so they survive a restart.</p>
            <SqlCodeBlock title="Persist changes" code={`SELECT pgraft_save_config();`} />
          </div>
          <div className="border rounded-lg p-4 space-y-3">
            <h3>pgraft_get_config()</h3>
            <p>Shows active configuration values, including defaults and overrides.</p>
            <SqlCodeBlock title="Inspect configuration" code={`SELECT * FROM pgraft_get_config();`} />
          </div>
        </div>
      </section>

      <section id="kv-store">
        <h2>Replicated KV Store</h2>
        <p>
          pgraft ships with a lightweight key-value store for coordination objects. Reads and writes follow the same consensus guarantees as SQL transactions.
        </p>
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4 space-y-3">
            <h3>pgraft_kv_put()</h3>
            <SqlCodeBlock
              title="Store metadata"
              code={`SELECT pgraft_kv_put('configs/maintenance', jsonb_build_object('window', '02:00 UTC', 'duration', '30m'));`}
            />
          </div>
          <div className="border rounded-lg p-4 space-y-3">
            <h3>pgraft_kv_get()</h3>
            <SqlCodeBlock title="Read value" code={`SELECT pgraft_kv_get('configs/maintenance');`} />
          </div>
          <div className="border rounded-lg p-4 space-y-3">
            <h3>pgraft_kv_delete()</h3>
            <SqlCodeBlock title="Delete key" code={`SELECT pgraft_kv_delete('configs/maintenance');`} />
          </div>
        </div>
        <SqlCodeBlock
          title="Health probe"
          code={`DO $$
DECLARE
  k TEXT := 'health_' || extract(epoch FROM now());
  v TEXT := md5(random()::text);
  r TEXT;
BEGIN
  PERFORM pgraft_kv_put(k, to_jsonb(v));
  SELECT pgraft_kv_get(k)::text INTO r;
  IF r IS NULL OR r <> to_jsonb(v)::text THEN
    RAISE EXCEPTION 'KV health check failed';
  END IF;
  PERFORM pgraft_kv_delete(k);
END;
$$;`}
        />
      </section>

      <section id="troubleshooting-toolkit">
        <h2>Troubleshooting Toolkit</h2>
        <p>
          Use these recipes to detect unhealthy patterns, salvage lagging followers, and debug Raft behavior in production.
        </p>
        <div className="grid lg:grid-cols-2 gap-4">
          <SqlCodeBlock
            title="Detect unhealthy elections"
            code={`SELECT node_id,
       elections_triggered,
       current_term,
       elections_triggered::float / GREATEST(current_term, 1) AS elections_per_term
  FROM pgraft_get_cluster_status()
 WHERE elections_triggered::float / GREATEST(current_term, 1) > 2.0;`}
          />
          <SqlCodeBlock
            title="Find stalled followers"
            code={`SELECT node_id,
       lag_entries,
       state
  FROM pgraft_log_get_replication_status()
 WHERE lag_entries > 1000
    OR state = 'stalled';`}
          />
          <SqlCodeBlock
            title="Reset follower"
            code={`-- Execute on lagging follower after maintenance
SELECT pgraft_log_sync_with_leader();`}
          />
          <SqlCodeBlock
            title="Expose debug info"
            code={`SELECT pgraft_set_debug(true);
-- Reproduce issue
SELECT pgraft_set_debug(false);`}
          />
        </div>
        <BashCodeBlock
          title="Collect diagnostics"
          code={`#!/usr/bin/env bash
psql -f - <<'SQL'
\o /tmp/pgraft-diagnostics.txt
SELECT now() AS collected_at;
SELECT * FROM pgraft_get_cluster_status();
SELECT * FROM pgraft_get_nodes();
SELECT * FROM pgraft_log_get_replication_status();
SELECT * FROM pgraft_log_get_stats();
SQL

sudo tail -200 /var/log/postgresql/postgresql-17-main.log | grep pgraft >> /tmp/pgraft-diagnostics.txt`}
        />
      </section>

      <section id="automation-workflows">
        <h2>Automation Workflows</h2>
        <p>
          Combine pgraft SQL with shell automation to orchestrate incident response and rolling deployments.
        </p>
        <SqlCodeBlock
          title="Rolling restart playbook"
          code={`-- Assume node 1 is leader and node 2 requires maintenance
BEGIN;
  PERFORM pgraft_transfer_leadership(3);
  PERFORM pgraft_set_config('failover_enabled', 'false');
COMMIT;

-- Perform OS updates on node 2, then rejoin cluster
SELECT pgraft_set_config('failover_enabled', 'true');
SELECT * FROM pgraft_get_cluster_status();`}
        />
        <BashCodeBlock
          title="Automated health check"
          code={`#!/usr/bin/env bash
RESULT=$(psql -t -c "SELECT * FROM pgraft_health_check() WHERE severity IN ('warning', 'critical');")
if [[ -n "$RESULT" ]]; then
  echo "$(date --iso-8601=seconds) - ALERT: $RESULT" >> /var/log/pgraft-health.log
fi`}
        />
      </section>
    </PostgresDocsLayout>
  )
}
