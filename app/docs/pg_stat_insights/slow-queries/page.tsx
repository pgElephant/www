import { Metadata } from 'next'
import DocsContentLayout from '../../../../components/DocsContentLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import { PgStatInsightsIcon } from '../../../../components/ProductIcons'

export const metadata: Metadata = {
  title: 'pg_stat_insights · Slow Query Analysis',
  description: 'Identify and optimise slow PostgreSQL queries with pg_stat_insights metrics.',
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
    <DocsContentLayout
      hero={{
        badgeLabel: 'pg_stat_insights',
        badgeIcon: <PgStatInsightsIcon size={20} />, 
        badgeTone: 'emerald',
        title: 'Slow Query Analysis',
        description:
          'Surface the slowest queries, evaluate variance, and apply indexing or query tuning guided by pg_stat_insights metrics.',
      }}
      contentWidth="wide"
    >
      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Rank Slow Queries</h2>
          <p className="text-muted-foreground">
            Start with average execution time to locate persistent bottlenecks. Filter by call count to ignore one-off statements.
          </p>
          <SqlCodeBlock title="Top 10 slowest queries" code={topSlowQueries} />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Measure Variability</h2>
          <p className="text-muted-foreground">
            High standard deviation indicates intermittent slowness due to locking, bloated tables, or cache misses. Prioritise queries with high coefficient of variation.
          </p>
          <SqlCodeBlock title="Execution time variance" code={varianceQuery} />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. Drill into Execution Plans</h2>
          <p className="text-muted-foreground">
            Use <code>pg_stat_insights_plan</code> to fetch the captured plan summary, then re-run the statement with <code>EXPLAIN (ANALYZE, BUFFERS, WAL)</code> for current statistics.
          </p>
          <SqlCodeBlock title="Plan investigation" code={planDrilldown} />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Remediation Checklist</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Index &amp; schema fixes</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Create missing indexes surfaced by <code>EXPLAIN</code> or <code>pg_stat_user_indexes</code>.</li>
                <li>VACUUM and ANALYZE bloated tables; stale statistics often cause bad plans.</li>
                <li>Consider partitioning large tables to minimise scanned data.</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Query optimisation</h3>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Rewrite OR chains into UNION ALL or use partial indexes.</li>
                <li>Push predicates closer to data sources to avoid wide joins.</li>
                <li>Reduce client round-trips by batching repeated lookups.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Automate Regression Detection</h2>
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
      </div>
    </DocsContentLayout>
  )
}
