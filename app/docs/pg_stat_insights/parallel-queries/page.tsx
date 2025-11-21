import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'pg_stat_insights · Parallel Query Analysis',
  description: 'Track parallel worker usage, measure speedups, and tune PostgreSQL parallel query execution with pg_stat_insights.',
}

const tableOfContents: TocItem[] = [
  { id: 'inspect-parallel', title: 'Inspect Parallel Adoption' },
  { id: 'evaluate-speedup', title: 'Evaluate Parallel Speedup' },
  { id: 'sequential-fallbacks', title: 'Highlight Sequential Fallbacks' },
  { id: 'tune-configuration', title: 'Tune Configuration' },
  { id: 'optimize-plans', title: 'Optimise Execution Plans' },
]

const prevLink: NavLink = {
  href: '/docs/pg_stat_insights/io-performance',
  label: 'I/O Performance Analysis',
}

const nextLink: NavLink = {
  href: '/docs/pg_stat_insights/slow-queries',
  label: 'Slow Query Analysis',
}

const parallelUsage = `SELECT queryid,
       LEFT(query, 160) AS query_preview,
       calls,
       parallel_workers_launched,
       parallel_workers_planned,
       mean_exec_time,
       (parallel_workers_launched::numeric / NULLIF(calls, 0)) AS avg_workers
  FROM pg_stat_insights
 WHERE parallel_workers_launched > 0
 ORDER BY parallel_workers_launched DESC
 LIMIT 20;`

const speedupRatio = `WITH stats AS (
  SELECT queryid,
         total_exec_time,
         total_plan_time,
         parallel_workers_launched,
         calls
    FROM pg_stat_insights
   WHERE parallel_workers_launched > 0
)
SELECT queryid,
       total_exec_time / NULLIF(calls, 0) AS avg_exec_ms,
       (total_exec_time - total_plan_time) / NULLIF(parallel_workers_launched, 0) AS exec_ms_per_worker
  FROM stats
 ORDER BY exec_ms_per_worker ASC
 LIMIT 15;`

const configuration = `max_parallel_workers_per_gather = 4
max_parallel_workers = 16
max_parallel_maintenance_workers = 4
parallel_leader_participation = on`

export default function PgStatInsightsParallelQueriesPage() {
  return (
    <PostgresDocsLayout
      title="Parallel Query Analysis"
      version="pg_stat_insights Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="inspect-parallel">
        <h2>Inspect Parallel Adoption</h2>
        <p>
            Start by listing the busiest queries that launched parallel workers. Compare the number planned versus launched to identify executor fallbacks (e.g., due to insufficient workers).
          </p>
          <SqlCodeBlock title="Queries using parallel workers" code={parallelUsage} />
      </section>

      <section id="evaluate-speedup">
        <h2>Evaluate Parallel Speedup</h2>
        <p>
            Gauge efficiency by normalising execution time per worker. Small or negative gains suggest the workload is not parallel-friendly.
          </p>
          <SqlCodeBlock title="Execution time per worker" code={speedupRatio} />
      </section>

      <section id="sequential-fallbacks">
        <h2>Highlight Sequential Fallbacks</h2>
          <SqlCodeBlock
            title="Queries planned for parallelism but executed serially"
            code={`SELECT queryid,
       parallel_workers_planned,
       parallel_workers_launched,
       mean_exec_time
  FROM pg_stat_insights
 WHERE parallel_workers_planned > 0
   AND parallel_workers_launched = 0
 ORDER BY mean_exec_time DESC
 LIMIT 15;`}
          />
        <p className="text-sm">
          Reasons include disabled <code>parallel_leader_participation</code>, insufficient workers, or functions marked <code>PARALLEL UNSAFE</code>.
        </p>
      </section>

      <section id="tune-configuration">
        <h2>Tune Configuration</h2>
          <BashCodeBlock title="Recommended starting values" code={configuration} />
        <p className="text-sm">
          Ensure <code>max_worker_processes</code> is set higher than <code>max_parallel_workers</code>, and monitor background worker contention (logical replication, autovacuum) when raising limits.
        </p>
      </section>

      <section id="optimize-plans">
        <h2>Optimise Execution Plans</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3>Encourage parallelism</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
                <li>Use <code>parallel_setup_cost</code> and <code>parallel_tuple_cost</code> to adjust planner sensitivity.</li>
                <li>Rewrite functions to be <code>PARALLEL SAFE</code> when possible.</li>
                <li>Partition large tables to enable partition-wise joins and aggregates.</li>
              </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h3>Disable when harmful</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
                <li>Set <code>ALTER ROLE user SET max_parallel_workers_per_gather = 0;</code> for latency-critical clients.</li>
                <li>Use <code>{'/*+ Parallel(0) */'}</code> planner hints (via pg_hint_plan) for known hotspots.</li>
                <li>Disable parallelism for queries with heavy locking or when CPU is saturated.</li>
            </ul>
          </div>
        </div>
      </section>
    </PostgresDocsLayout>
  )
}
