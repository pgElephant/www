import { Metadata } from 'next'
import DocsContentLayout from '../../../../components/DocsContentLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import { PgraftIcon } from '../../../../components/ProductIcons'

export const metadata: Metadata = {
  title: 'pgraft Raft Protocol - Consensus Implementation | pgElephant',
  description: 'Understanding pgraft Raft consensus protocol implementation: leader election, log replication, and cluster safety guarantees inside PostgreSQL.',
}

const electionSteps = [
  {
    title: 'Election timeout',
    description: 'Follower stops receiving heartbeats within the configured election timeout (default 1000 ms).',
  },
  {
    title: 'Candidate declaration',
    description: 'Follower increments the term, becomes candidate, and votes for itself.',
  },
  {
    title: 'Vote solicitation',
    description: 'Candidate issues RequestVote RPCs to the rest of the cluster and compares log freshness.',
  },
  {
    title: 'Leader promotion',
    description: 'Candidate becomes leader after receiving a majority of votes and immediately begins heartbeats.',
  },
]

const safetyProperties = [
  {
    title: 'Election safety',
    description: 'At most one leader can be elected in a given term, preventing split-brain.',
  },
  {
    title: 'Leader append-only',
    description: 'Leaders only append entries to their log; previously committed history is immutable.',
  },
  {
    title: 'Log matching',
    description: 'If two logs contain the same index and term, all prior entries are identical.',
  },
  {
    title: 'Leader completeness',
    description: 'Committed entries must exist in every subsequent leader for higher-numbered terms.',
  },
]

const consensusTuning = `# postgresql.conf (excerpt)
pgraft.heartbeat_interval = '75ms'
pgraft.election_timeout   = '900ms'
pgraft.append_batch_size  = 512
pgraft.snapshot_threshold = 8000`

export default function PgraftRaftProtocolPage() {
  return (
    <DocsContentLayout
      hero={{
        badgeLabel: 'pgRaft',
        badgeIcon: <PgraftIcon size={20} />, 
        badgeTone: 'blue',
        title: 'pgraft Raft Protocol',
        description:
          'Dive into pgraft’s Raft implementation to understand node roles, leader election, log replication semantics, and the safety guarantees applied inside PostgreSQL.',
      }}
      contentWidth="wide"
    >
      <div className="space-y-12">
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Consensus Overview</h2>
          <p className="text-muted-foreground">
            Raft keeps pgraft clusters converged on the same WAL-derived state, even with failures. One leader accepts client writes, followers replicate entries, and terms track leadership epochs. When the leader changes, Raft ensures only the freshest log can win, eliminating double commits.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Leader election</h3>
              <p className="text-sm text-muted-foreground">Deterministic timeouts pick a single leader per term. Heartbeats advertise leadership and reset follower timers.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Log replication</h3>
              <p className="text-sm text-muted-foreground">Write-ahead log summaries propagate via AppendEntries RPCs. Followers persist and acknowledge entries sequentially.</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Consensus safety</h3>
              <p className="text-sm text-muted-foreground">Quorum commits, term tracking, and log matching prevent divergent history while keeping read replicas available.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Node Roles</h2>
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 space-y-3">
              <div>
                <h3 className="font-semibold">Leader</h3>
                <p className="text-sm text-muted-foreground">
                  Accepts SQL writes, appends them to the Raft log, and streams AppendEntries to followers until a quorum confirms.
                </p>
              </div>
              <SqlCodeBlock title="Leadership probe" code={`SELECT pgraft_is_leader();`} />
            </div>
            <div className="border rounded-lg p-4 space-y-3">
              <div>
                <h3 className="font-semibold">Follower</h3>
                <p className="text-sm text-muted-foreground">
                  Receives AppendEntries, caches uncommitted entries, and applies changes once commit_index advances.
                </p>
              </div>
              <SqlCodeBlock
                title="Follower heartbeat lag"
                code={`SELECT node_id,
       last_heartbeat_ms
  FROM pgraft_get_nodes()
 WHERE node_id = pg_backend_pid();`}
              />
            </div>
            <div className="border rounded-lg p-4 space-y-3">
              <div>
                <h3 className="font-semibold">Candidate</h3>
                <p className="text-sm text-muted-foreground">
                  Transitional role triggered when heartbeats stop. Requests votes and upgrades to leader after majority approval.
                </p>
              </div>
              <SqlCodeBlock
                title="Election metrics"
                code={`SELECT current_term,
       elections_triggered
  FROM pgraft_get_cluster_status()
 LIMIT 1;`}
              />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Leader Election Flow</h2>
          <p className="text-muted-foreground">
            Each node runs an independent timer between heartbeats. Randomized offsets avoid simultaneous elections, while vote rules enforce log freshness.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {electionSteps.map((step, index) => (
              <div key={step.title} className="border rounded-lg p-4 space-y-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-medium text-blue-700">
                  {index + 1}
                </span>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
          <SqlCodeBlock
            title="Manual leadership transfer"
            code={`-- Redirect leadership before maintenance
SELECT pgraft_transfer_leadership(2);
SELECT pgraft_get_leader();`}
          />
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Log Replication Lifecycle</h2>
          <p className="text-muted-foreground">
            Leaders batch WAL summaries into Raft entries, replicate them concurrently, and advance commit indexes once a quorum acknowledges.
          </p>
          <SqlCodeBlock
            title="Replication vitals"
            code={`SELECT node_id,
       match_index,
       next_index,
       commit_index,
       lag_entries,
       state
  FROM pgraft_log_get_replication_status()
 ORDER BY lag_entries DESC;`}
          />
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Commit index</h3>
              <p className="text-sm text-muted-foreground">
                Highest log entry known to be replicated on a majority of nodes. Entries at or below this index are durable.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Last applied</h3>
              <p className="text-sm text-muted-foreground">
                Highest log entry applied to the PostgreSQL state machine. Followers eventually converge to the leader’s commit index.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Consensus Safety</h2>
          <p className="text-muted-foreground">
            Raft’s invariants guarantee that clients never observe divergent history, even if the cluster re-elects multiple leaders during failover or partition events.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {safetyProperties.map((property) => (
              <div key={property.title} className="border-l-4 border-blue-500 bg-blue-50/40 dark:border-blue-400 dark:bg-blue-500/10 rounded-r-lg p-4">
                <h3 className="font-semibold mb-1">{property.title}</h3>
                <p className="text-sm text-muted-foreground">{property.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Tuning Consensus Timing</h2>
          <p className="text-muted-foreground">
            Adjust timeouts and batching to match latency budgets. Keep <code>election_timeout</code> roughly 10× the heartbeat interval to avoid premature elections under load.
          </p>
          <BashCodeBlock title="postgresql.conf" code={consensusTuning} />
          <SqlCodeBlock
            title="Verify effective values"
            code={`SELECT name,
       setting,
       source
  FROM pgraft_get_config()
 WHERE name IN ('heartbeat_interval', 'election_timeout', 'append_batch_size', 'snapshot_threshold');`}
          />
        </section>
      </div>
    </DocsContentLayout>
  )
}
