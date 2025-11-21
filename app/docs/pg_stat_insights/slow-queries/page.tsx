import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'pg_stat_insights · Slow Query Analysis',
  description: 'Identify and optimise slow PostgreSQL queries with pg_stat_insights metrics.',
}

const tableOfContents: TocItem[] = [
  { id: 'rank-slow-queries', title: 'Rank Slow Queries' },
  { id: 'measure-variability', title: 'Measure Variability' },
  { id: 'drill-plans', title: 'Drill into Execution Plans' },
  { id: 'remediation-checklist', title: 'Remediation Checklist' },
  { id: 'automate-regression', title: 'Automate Regression Detection' },
]

const prevLink: NavLink = {
  href: '/docs/pg_stat_insights/parallel-queries',
  label: 'Parallel Query Analysis',
}

const nextLink: NavLink = {
  href: '/docs/pg_stat_insights/wal-monitoring',
  label: 'WAL Activity Monitoring',
}

const topSlowQueries = `SELECT queryid,
       LEFT(query, 120) AS query_preview,
       calls,
       mean_exec_time AS avg_ms,
       total_exec_time AS total_ms,
       stddev_exec_time,
       rows
  FROM pg_stat_insights
 WHERE calls > 10
 ORDER BY mean_exec_time DESC
 LIMIT 10;`

const varianceQuery = `SELECT queryid,
       stddev_exec_time,
       mean_exec_time,
       max_exec_time,
       min_exec_time,
       (stddev_exec_time / NULLIF(mean_exec_time, 0)) AS coeff_variation
  FROM pg_stat_insights
 WHERE stddev_exec_time > 0
 ORDER BY coeff_variation DESC
 LIMIT 15;`

const planDrilldown = `-- Replace :queryid with target ID
SELECT *
  FROM pg_stat_insights_plan
 WHERE queryid = :queryid;

-- Capture execution plan
dO $$
DECLARE
  sql TEXT;
BEGIN
  SELECT query INTO sql
    FROM pg_stat_insights
   WHERE queryid = :queryid;
  EXECUTE format('EXPLAIN (ANALYZE, BUFFERS, WAL) %s', sql);
END;
$$;`

export default function PgStatInsightsSlowQueriesPage() {
  return (
    <PostgresDocsLayout
      title="Slow Query Analysis"
      version="pg_stat_insights Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="rank-slow-queries">
        <h2>Rank Slow Queries</h2>
        <p>
            Start with average execution time to locate persistent bottlenecks. Filter by call count to ignore one-off statements.
          </p>
          <SqlCodeBlock title="Top 10 slowest queries" code={topSlowQueries} />
      </section>

      <section id="measure-variability">
        <h2>Measure Variability</h2>
        <p>
            High standard deviation indicates intermittent slowness due to locking, bloated tables, or cache misses. Prioritise queries with high coefficient of variation.
          </p>
          <SqlCodeBlock title="Execution time variance" code={varianceQuery} />
      </section>

      <section id="drill-plans">
        <h2>Drill into Execution Plans</h2>
        <p>
            Use <code>pg_stat_insights_plan</code> to fetch the captured plan summary, then re-run the statement with <code>EXPLAIN (ANALYZE, BUFFERS, WAL)</code> for current statistics.
          </p>
          <SqlCodeBlock title="Plan investigation" code={planDrilldown} />
      </section>

      <section id="remediation-checklist">
        <h2>Remediation Checklist</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3>Index &amp; schema fixes</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
                <li>Create missing indexes surfaced by <code>EXPLAIN</code> or <code>pg_stat_user_indexes</code>.</li>
                <li>VACUUM and ANALYZE bloated tables; stale statistics often cause bad plans.</li>
                <li>Consider partitioning large tables to minimise scanned data.</li>
              </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h3>Query optimisation</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
                <li>Rewrite OR chains into UNION ALL or use partial indexes.</li>
                <li>Push predicates closer to data sources to avoid wide joins.</li>
                <li>Reduce client round-trips by batching repeated lookups.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="automate-regression">
        <h2>Automate Regression Detection</h2>
          <SqlCodeBlock
            title="Store baselines"
            code={`CREATE TABLE IF NOT EXISTS slow_query_baselines AS
SELECT queryid,
       mean_exec_time,
       total_exec_time,
       calls,
       now() AS captured_at
  FROM pg_stat_insights
 WHERE mean_exec_time > 100;`}
          />
          <BashCodeBlock
            title="Alert on regressions"
            code={`#!/usr/bin/env bash
REGRESS=$(psql -t -c "SELECT queryid FROM pg_stat_insights s JOIN slow_query_baselines b USING (queryid) WHERE s.mean_exec_time > b.mean_exec_time * 1.5;")
if [[ -n "$REGRESS" ]]; then
  echo "Slow query regression detected: $REGRESS" | mail -s "pg_stat_insights regression" dba@example.com
fi`}
          />
      </section>
    </PostgresDocsLayout>
  )
}
