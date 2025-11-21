import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'pgraft Tutorial | Documentation',
  description: 'Step-by-step tutorial for deploying pgraft, bootstrapping clusters, and executing a zero-downtime PostgreSQL major version upgrade.',
}

const tableOfContents: TocItem[] = [
  { id: 'prerequisites', title: 'Prerequisites' },
  { id: 'install', title: 'Install pgraft' },
  { id: 'bootstrap', title: 'Bootstrap the Leader' },
  { id: 'register-followers', title: 'Register Followers' },
  { id: 'logical-replication', title: 'Configure Logical Replication' },
  { id: 'verify-health', title: 'Verify Cluster Health' },
  { id: 'cutover', title: 'Perform Cutover' },
  { id: 'post-migration', title: 'Post-Migration Validation' },
]

const prevLink: NavLink = {
  href: '/docs/pgraft/cluster-management',
  label: 'Cluster Management',
}

const nextLink: NavLink = {
  href: '/docs/pgraft/monitoring',
  label: 'Monitoring',
}

const setupCommands = `# Install dependencies and build pgraft (example for Debian/Ubuntu)
sudo apt-get update && sudo apt-get install -y build-essential libpq-dev golang
make all
sudo make install

echo "shared_preload_libraries = 'pgraft'" | sudo tee -a /etc/postgresql/16/main/postgresql.conf
sudo systemctl restart postgresql@16-main`

const leaderBoot = `-- Run on the future leader after CREATE EXTENSION
dO $$ BEGIN PERFORM pgraft_init(); END $$;

SELECT pgraft_set_config('cluster_name', 'upgrade-cluster');
SELECT pgraft_save_config();

SELECT pgraft_is_leader();`

const followerEnroll = `-- Execute on the leader once follower nodes are configured
SELECT pgraft_add_node(2, '10.0.0.12', 7002);
SELECT pgraft_add_node(3, '10.0.0.13', 7003);

SELECT node_id,
       state,
       match_index,
       commit_index
  FROM pgraft_get_nodes();`

const logicalReplication = `-- Create publication on source (PostgreSQL 14)
CREATE PUBLICATION pgraft_upgrade FOR ALL TABLES;

-- On PostgreSQL 16 target node
CREATE SUBSCRIPTION pgraft_upgrade
  CONNECTION 'host=10.0.0.11 port=5432 user=replicator dbname=app sslmode=prefer'
  PUBLICATION pgraft_upgrade
  WITH (copy_data = true, create_slot = false);`

const cutoverChecklist = `-- Drain application traffic
SELECT pgraft_transfer_leadership(3);

-- Confirm replication queues are empty
SELECT * FROM pg_stat_subscription_stats WHERE subname = 'pgraft_upgrade';

-- Promote new cluster and redirect clients
SELECT pgraft_set_config('failover_enabled', 'true');`

export default function PgraftTutorialPage() {
  return (
    <PostgresDocsLayout
      title="pgraft Upgrade Tutorial"
      version="pgraft Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="prerequisites">
        <h2>Prerequisites</h2>
          <div className="border rounded-lg p-4 space-y-2">
            <ul>
              <li>Three PostgreSQL instances (source v14, target v16, plus an additional follower) with SSH access.</li>
              <li>Shared <code>pgraft.cluster_id</code>, unique <code>pgraft.node_id</code>, and open Raft port (default 7001+).</li>
              <li>Replication user with <code>REPLICATION</code> privilege for logical replication.</li>
              <li>Maintenance window to redirect application connections during cutover validation.</li>
            </ul>
          </div>
      </section>

      <section id="install">
        <h2>1. Install pgraft</h2>
        <p>
            Build and install pgraft on each node. Enable the extension in <code>postgresql.conf</code> and restart the service.
          </p>
          <BashCodeBlock title="Build + enable" code={setupCommands} />
          <SqlCodeBlock title="Create extension" code={`CREATE EXTENSION IF NOT EXISTS pgraft;`} />
      </section>

      <section id="bootstrap">
        <h2>2. Bootstrap the Leader</h2>
        <p>
            Initialize cluster metadata and set a friendly cluster label. Confirm the node elected itself leader.
          </p>
          <SqlCodeBlock title="Leader initialization" code={leaderBoot} />
      </section>

      <section id="register-followers">
        <h2>3. Register Followers</h2>
        <p>
            Configure the remaining nodes with matching cluster identity and unique node IDs, then register them from the leader.
          </p>
          <SqlCodeBlock title="Add followers" code={followerEnroll} />
          <div className="border rounded-lg p-4 space-y-2">
            <h3 className="font-semibold">Follower checklist</h3>
            <ul>
              <li><code>pgraft.port</code> and <code>pg_hba.conf</code> allow leader connectivity.</li>
              <li>Followers report <code>state = 'follower'</code> and <code>lag_entries = 0</code> after initial sync.</li>
              <li>Disk and snapshot directories reside on SSD storage to absorb write bursts.</li>
            </ul>
          </div>
      </section>

      <section id="logical-replication">
        <h2>4. Configure Logical Replication</h2>
        <p>
            pgraft orchestrates leader elections while PostgreSQL logical replication migrates data between major versions.
          </p>
          <SqlCodeBlock title="Create publication/subscription" code={logicalReplication} />
          <p>
            Allow the subscription to copy existing data. Monitor <code>pg_stat_subscription</code> until catch-up is complete.
          </p>
      </section>

      <section id="verify-health">
        <h2>5. Verify Cluster Health</h2>
        <p>
            Before cutover, ensure Raft consensus is stable and replication slots are healthy.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <SqlCodeBlock
              title="Raft metrics"
              code={`SELECT node_id,
       state,
       messages_processed,
       lag_entries
  FROM pgraft_log_get_replication_status()
 ORDER BY node_id;`}
            />
            <SqlCodeBlock
              title="Logical replication progress"
              code={`SELECT subname,
       (pg_current_xlog_location() - received_lsn) AS bytes_lag,
       last_msg_send_time,
       last_msg_receipt_time
  FROM pg_stat_subscription;`}
            />
          </div>
      </section>

      <section id="cutover">
        <h2>6. Perform Cutover</h2>
        <p>
            Drain application traffic, promote the new cluster, and redirect clients to the pgraft 16 cluster.
          </p>
          <SqlCodeBlock title="Cutover checklist" code={cutoverChecklist} />
          <BashCodeBlock
            title="Connection pool update"
            code={`# Example: Update PgBouncer configuration
echo "%include /etc/pgbouncer/pgraft-target.ini" | sudo tee /etc/pgbouncer/databases.ini
sudo systemctl reload pgbouncer`}
          />
      </section>

      <section id="post-migration">
        <h2>7. Post-Migration Validation</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <SqlCodeBlock
              title="Ensure quorum"
              code={`SELECT pgraft_quorum_met() AS quorum_ok,
       pgraft_get_leader() AS leader_id;`}
            />
            <SqlCodeBlock
              title="Verify application schema"
              code={`SELECT relname,
       relpages,
       reltuples
  FROM pg_catalog.pg_class
 WHERE relnamespace = 'public'::regnamespace
 ORDER BY reltuples DESC
 LIMIT 20;`}
            />
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold">Cleanup</h3>
            <ul>
              <li>Drop the logical subscription on the new cluster once validation completes.</li>
              <li>Optionally keep the old cluster as a warm standby using pgraft follower mode.</li>
              <li>Update monitoring dashboards to point at the new leader endpoint.</li>
            </ul>
          </div>
      </section>

      <section>
        <h2>Next Steps</h2>
        <p>
            Explore <a href="/docs/pgraft/config-reference" className="text-blue-500 hover:underline">configuration tuning</a> and the{' '}
            <a href="/docs/pgraft/cluster-management" className="text-blue-500 hover:underline">cluster management</a> guide for more automation patterns.
          </p>
      </section>
    </PostgresDocsLayout>
  )
}
