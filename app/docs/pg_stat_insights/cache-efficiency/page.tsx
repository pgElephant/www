import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'pg_stat_insights · Cache Efficiency Analysis',
  description: 'Analyze PostgreSQL buffer cache performance, identify misses, and tune memory for pg_stat_insights workloads.',
}

const tableOfContents: TocItem[] = [
  { id: 'measure-hit-ratio', title: 'Measure Database-Wide Cache Hit Ratio' },
  { id: 'identify-poor-cache', title: 'Identify Queries with Poor Cache Performance' },
  { id: 'detect-hotspots', title: 'Detect Relation-Level Hotspots' },
  { id: 'monitor-autovacuum', title: 'Monitor Autovacuum & Checkpoint Impact' },
  { id: 'apply-remediation', title: 'Apply Remediation' },
]

const prevLink: NavLink = {
  href: '/docs/pg_stat_insights/troubleshooting',
  label: 'Troubleshooting',
}

const nextLink: NavLink = {
  href: '/docs/pg_stat_insights/io-performance',
  label: 'I/O Performance Analysis',
}

export default function CacheEfficiencyPage() {
  return (
    <PostgresDocsLayout
      title="Cache Efficiency Analysis"
      version="pg_stat_insights Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="measure-hit-ratio">
        <h2>Measure Database-Wide Cache Hit Ratio</h2>
        <p>
          Start with global hit ratio to confirm shared buffers alignment. Aim for ≥95% in OLTP systems; values below this threshold typically point to undersized buffers or missing indexes.
        </p>
          <SqlCodeBlock
            title="Database cache hit ratio"
            code={`SELECT
    SUM(shared_blks_hit) AS total_cache_hits,
    SUM(shared_blks_read) AS total_disk_reads,
    SUM(shared_blks_hit + shared_blks_read) AS total_blocks_accessed,
    ROUND((SUM(shared_blks_hit)::numeric /
           NULLIF(SUM(shared_blks_hit + shared_blks_read), 0) * 100)::numeric, 2) AS cache_hit_ratio_pct
FROM pg_stat_insights;`}
          />
      </section>

      <section id="identify-poor-cache">
        <h2>Identify Queries with Poor Cache Performance</h2>
        <p>
            Highlight queries that miss cache frequently or drive heavy disk reads. Triage by frequency and bytes to decide whether to tune or cache.
          </p>
          <SqlCodeBlock
            title="Queries with low cache hit ratio"
            code={`SELECT query,
       calls,
       shared_blks_hit,
       shared_blks_read,
       (shared_blks_hit::numeric /
        NULLIF(shared_blks_hit + shared_blks_read, 0)) AS hit_ratio
  FROM pg_stat_insights
 WHERE shared_blks_read > 0
 ORDER BY hit_ratio ASC, shared_blks_read DESC
 LIMIT 20;`}
          />
      </section>

      <section id="detect-hotspots">
        <h2>Detect Relation-Level Hotspots</h2>
          <SqlCodeBlock
            title="Tables with highest disk reads"
            code={`SELECT relid::regclass AS relation,
       SUM(shared_blks_read) AS disk_reads,
       SUM(shared_blks_hit) AS cache_hits,
       SUM(shared_blks_read) * 8 / 1024 AS read_mb
  FROM pg_stat_insights_relation
 GROUP BY relid
 ORDER BY disk_reads DESC
 LIMIT 15;`}
          />
        <p className="text-sm">
          Hot relations may require dedicated indexes, partitioning, or prewarming strategies to keep data resident in shared buffers.
        </p>
      </section>

      <section id="monitor-autovacuum">
        <h2>Monitor Autovacuum &amp; Checkpoint Impact</h2>
          <SqlCodeBlock
            title="Autovacuum pressure"
            code={`SELECT datname,
       relname,
       autovacuum_count,
       vacuum_count,
       n_dead_tup
  FROM pg_stat_user_tables
 ORDER BY autovacuum_count DESC
 LIMIT 20;`}
          />
          <BashCodeBlock
            title="Shared buffers pressure"
            code={`psql -c "SELECT checkpoint_write_time, buffers_checkpoint, buffers_clean, buffers_backend FROM pg_stat_bgwriter;"`}
          />
      </section>

      <section id="apply-remediation">
        <h2>Apply Remediation</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3>Configuration</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
                <li>Increase <code>shared_buffers</code> by 10–20% if the working set routinely exceeds cache capacity.</li>
                <li>Consider <code>effective_cache_size</code> adjustments to inform planner about OS cache space.</li>
                <li>Enable <code>pg_prewarm</code> for cold restarts on critical relations.</li>
              </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h3>Query tuning</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
                <li>Add covering indexes for queries reading large sequential ranges with poor hit ratios.</li>
                <li>Review query plans via <code>EXPLAIN (ANALYZE, BUFFERS)</code> to locate inefficient nested loops.</li>
                <li>Batch bulk loads and maintenance to non-peak periods to avoid evicting hot data.</li>
            </ul>
          </div>
        </div>
      </section>
    </PostgresDocsLayout>
  )
}
