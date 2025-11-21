import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'pg_stat_insights Metrics Reference Guide',
  description: 'Understand the 52 metrics exposed by pg_stat_insights across execution timing, cache efficiency, WAL, JIT, and parallelism.',
}

const tableOfContents: TocItem[] = [
  { id: 'workflow-overview', title: 'Workflow Overview' },
  { id: 'identity-classification', title: 'Identity & Classification' },
  { id: 'execution-timing', title: 'Execution & Timing' },
  { id: 'cache-io-wal', title: 'Cache, IO & WAL' },
  { id: 'advanced', title: 'Advanced (Parallel & JIT)' },
  { id: 'reset-retention', title: 'Reset & Retention' },
]

const prevLink: NavLink = {
  href: '/docs/pg_stat_insights/configuration',
  label: 'Configuration Reference',
}

const nextLink: NavLink = {
  href: '/docs/pg_stat_insights/views',
  label: 'Views Reference',
}

interface MetricRow {
  name: string
  description: string
}

const identityMetrics: MetricRow[] = [
  {
    name: 'userid, dbid, queryid',
    description: 'Identifiers for role, database, and fingerprint. Join with pg_roles and pg_database for human-readable names.',
  },
  {
    name: 'query',
    description: 'Normalized text of the statement. Use alongside queryid to fetch the canonical SQL.',
  },
  {
    name: 'calls, rows',
    description: 'Execution count and rows returned. Combine to compute throughput and efficiency.',
  },
]

const executionMetrics: MetricRow[] = [
  { name: 'total_exec_time, mean_exec_time, min/max/stddev_exec_time', description: 'Aggregate, average, and variability of execution time. Use stddev to detect jitter.' },
  { name: 'total_plan_time, mean_plan_time', description: 'Time spent planning statements (requires track_planning).' },
  { name: 'blk_read_time, blk_write_time', description: 'Block-level read/write timings (requires track_io_timing).' },
]

const cacheWalMetrics: MetricRow[] = [
  { name: 'shared_blks_hit / read / dirtied / written', description: 'Shared buffer interaction. Combine to compute cache hit ratio and flush pressure.' },
  { name: 'temp_blks_read / written', description: 'Temporary file usage signalling sorts or hash spills.' },
  { name: 'wal_bytes, wal_fpi_bytes, wal_records', description: 'WAL generation cost. Useful for analysing write amplification.' },
]

const advancedMetrics: MetricRow[] = [
  { name: 'parallel_workers_planned / launched / rejected', description: 'Parallel executor information for speedup analysis.' },
  { name: 'jit_functions, jit_generation_time, jit_emission_time…', description: 'LLVM compilation metrics indicating JIT overhead (track_planning required).' },
  { name: 'plans_since_last_reset, plans_with_leader_participation', description: 'Planner statistics for monitoring resets and leader activity.' },
]

const resetSql = `SELECT pg_stat_insights_reset();`;

export default function PgStatInsightsMetricsGuidePage() {
  const renderMetricSection = (id: string, title: string, rows: MetricRow[]) => (
    <section key={id} id={id} className="space-y-4">
      <h2>{title}</h2>
      <div className="border rounded-lg divide-y">
        {rows.map((row) => (
          <div key={row.name} className="p-4 space-y-1">
            <h3 className="font-semibold text-base">{row.name}</h3>
            <p className="text-sm">{row.description}</p>
          </div>
        ))}
      </div>
    </section>
  )

  return (
    <PostgresDocsLayout
      title="Metrics Reference Guide"
      version="pg_stat_insights Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="workflow-overview">
        <h2>Workflow Overview</h2>
        <p>
          View metrics via <code>pg_stat_insights</code> or specialised views such as <code>pg_stat_insights_plan</code>, <code>pg_stat_insights_io</code>, and <code>pg_stat_insights_waits</code>. Combine identifiers with execution/caching metrics for a holistic profile of each statement.
        </p>
        <SqlCodeBlock
          title="Sample metric projection"
          code={`SELECT queryid,
       calls,
       total_exec_time,
       shared_blks_hit,
       shared_blks_read,
       wal_bytes,
       parallel_workers_launched,
       jit_generation_time
  FROM pg_stat_insights
 ORDER BY total_exec_time DESC
 LIMIT 20;`}
        />
      </section>

      {renderMetricSection('identity-classification', 'Identity & Classification', identityMetrics)}
      {renderMetricSection('execution-timing', 'Execution & Timing', executionMetrics)}
      {renderMetricSection('cache-io-wal', 'Cache, IO & WAL', cacheWalMetrics)}
      {renderMetricSection('advanced', 'Advanced (Parallel & JIT)', advancedMetrics)}

      <section id="reset-retention">
        <h2>Reset & Retention</h2>
        <p>
          Metrics accumulate until reset. Schedule resets post-maintenance or collect deltas into historical tables for trend analysis.
        </p>
        <SqlCodeBlock title="Reset command" code={resetSql} />
        <p className="text-sm">
          Resets also clear derived views such as <code>pg_stat_insights_plan</code>. Capture baselines prior to reset if you rely on historical comparisons.
        </p>
      </section>
    </PostgresDocsLayout>
  )
}
