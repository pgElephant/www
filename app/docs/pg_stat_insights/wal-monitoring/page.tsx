import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'pg_stat_insights · WAL Activity Monitoring',
  description: 'Track Write-Ahead Log generation, full page images, and tune write-heavy workloads with pg_stat_insights.',
}

const tableOfContents: TocItem[] = [
  { id: 'rank-wal-queries', title: 'Rank WAL-Hungry Queries' },
  { id: 'analyse-relation', title: 'Analyse WAL by Relation' },
  { id: 'trending-alerting', title: 'Trending & Alerting' },
  { id: 'remediation-checklist', title: 'Remediation Checklist' },
]

const prevLink: NavLink = {
  href: '/docs/pg_stat_insights/slow-queries',
  label: 'Slow Query Analysis',
}

const nextLink: NavLink = {
  href: '/docs/pg_stat_insights/jit-analysis',
  label: 'JIT Compilation Analysis',
}

const walTopQueries = `SELECT queryid,
       LEFT(query, 120) AS query_preview,
       calls,
       wal_records,
       wal_fpi,
       wal_bytes,
       wal_bytes / NULLIF(calls, 0) AS wal_bytes_per_call
  FROM pg_stat_insights
 WHERE wal_bytes > 0
 ORDER BY wal_bytes DESC
 LIMIT 20;`

const walPerRelation = `SELECT relid::regclass AS relation,
       wal_bytes,
       wal_fpi,
       shared_blks_dirtied
  FROM pg_stat_insights_relation
 ORDER BY wal_bytes DESC
 LIMIT 15;`

const walTimeline = `SELECT date_trunc('minute', collected_at) AS minute,
       SUM(wal_bytes) AS wal_bytes
  FROM pg_stat_insights_wal_history
 WHERE collected_at > now() - interval '24 hours'
 GROUP BY 1
 ORDER BY 1;`

export default function PgStatInsightsWalMonitoringPage() {
  return (
    <PostgresDocsLayout
      title="WAL Activity Monitoring"
      version="pg_stat_insights Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="rank-wal-queries">
        <h2>Rank WAL-Hungry Queries</h2>
        <p>
            Monitor queries that generate the highest WAL volume to spot bulk writes, inefficient updates, or missing HOT optimisations.
          </p>
          <SqlCodeBlock title="Top WAL generators" code={walTopQueries} />
      </section>

      <section id="analyse-relation">
        <h2>Analyse WAL by Relation</h2>
        <p>
            Determine which tables or indexes contribute most to WAL traffic and evaluate whether autovacuum or fillfactor adjustments are needed.
          </p>
          <SqlCodeBlock title="Relation WAL usage" code={walPerRelation} />
      </section>

      <section id="trending-alerting">
        <h2>Trending &amp; Alerting</h2>
        <p>
            Persist WAL history into a time-series table for Grafana or trigger alerts when daily volume exceeds expected baselines.
          </p>
          <SqlCodeBlock title="Summarise WAL timeline" code={walTimeline} />
          <BashCodeBlock
            title="Prometheus alert"
            code={`groups:
  - name: wal
    rules:
      - alert: WalGrowthSpike
        expr: increase(pg_stat_insights_wal_bytes[10m]) > 5e8
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "WAL throughput exceeded 500 MB in 10 minutes"`}
          />
      </section>

      <section id="remediation-checklist">
        <h2>Remediation Checklist</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3>Configuration</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
                <li>Enable <code>wal_compression = on</code> for workloads with frequent full page images.</li>
                <li>Review <code>checkpoint_timeout</code> and <code>max_wal_size</code> to avoid checkpoint storms.</li>
                <li>Consider <code>synchronous_commit = off</code> for bulk ETL operations where durability trade-offs are acceptable.</li>
              </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h3>Application tuning</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
                <li>Batch writes and use COPY to reduce per-row wal_bytes.</li>
                <li>Use HOT updates (unchanged indexed columns) to minimise FPI generation.</li>
                <li>Rebuild bloated indexes and adjust <code>fillfactor</code> to lessen page rewrites.</li>
            </ul>
          </div>
        </div>
      </section>
    </PostgresDocsLayout>
  )
}
