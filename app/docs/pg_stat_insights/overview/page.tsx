import DocsContentLayout from '../../../../components/DocsContentLayout'
import { PgStatInsightsIcon } from '../../../../components/ProductIcons'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata = {
  title: 'pg_stat_insights Overview | Documentation',
  description: 'Introduction to pg_stat_insights PostgreSQL performance analytics extension and the metrics it exposes.',
}

const metricPreview = `SELECT dbname,
       userid,
       queryid,
       calls,
       total_exec_time,
       rows,
       shared_blks_hit,
       shared_blks_dirty,
       wal_bytes
  FROM pg_stat_insights
 ORDER BY total_exec_time DESC
 LIMIT 10;`

export default function PgStatInsightsOverviewPage() {
  return (
    <DocsContentLayout
      hero={{
        badgeLabel: 'pg_stat_insights',
        badgeIcon: <PgStatInsightsIcon size={20} />, 
        badgeTone: 'emerald',
        title: 'pg_stat_insights Overview',
        description:
          'pg_stat_insights extends pg_stat_statements with 52 additional performance metrics across planning, IO, WAL, JIT, and parallel execution to uncover bottlenecks in PostgreSQL workloads.',
      }}
      contentWidth="wide"
    >
      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">What is pg_stat_insights?</h2>
          <p className="text-muted-foreground">
            pg_stat_insights augments PostgreSQL with deep query analytics, adding lightweight views that expose plan cost variance, buffer churn, wait events, and WAL amplification. It ships as an extension and integrates with standard monitoring pipelines using SQL alone.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <p className="text-3xl font-semibold text-teal-600">52</p>
              <p className="text-sm text-muted-foreground">Metric columns covering execution, planning, IO, WAL, JIT, and parallelism.</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-3xl font-semibold text-cyan-600">11</p>
              <p className="text-sm text-muted-foreground">Views tailored to schedules, wait events, cache performance, and aggregates.</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-3xl font-semibold text-purple-600">5</p>
              <p className="text-sm text-muted-foreground">Core configuration parameters to tune sampling frequency and retention.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Key Capabilities</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 space-y-2">
              <h3 className="font-semibold">Workload visibility</h3>
              <p className="text-sm text-muted-foreground">
                Track per-query latency, row throughput, and block cache efficiency with automatic baselines for regression detection.
              </p>
            </div>
            <div className="border rounded-lg p-4 space-y-2">
              <h3 className="font-semibold">Planner insight</h3>
              <p className="text-sm text-muted-foreground">
                Compare estimated versus actual cost, row counts, and startup times to tune statistics and identify planners that need more sampling.
              </p>
            </div>
            <div className="border rounded-lg p-4 space-y-2">
              <h3 className="font-semibold">JIT &amp; parallel analytics</h3>
              <p className="text-sm text-muted-foreground">
                Measure LLVM compilation overhead and parallel worker contribution to decide when JIT or parallelism should be disabled or encouraged.
              </p>
            </div>
            <div className="border rounded-lg p-4 space-y-2">
              <h3 className="font-semibold">WAL amplification tracking</h3>
              <p className="text-sm text-muted-foreground">
                Understand write-heavy workloads by monitoring wal_bytes, wal_fpi_bytes, and total WAL generation per query.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">View the Metrics</h2>
          <p className="text-muted-foreground">
            Start with the main <code>pg_stat_insights</code> view for top queries, then drill into specialized views such as <code>pg_stat_insights_plan</code>, <code>pg_stat_insights_jit</code>, and <code>pg_stat_insights_wal</code>.
          </p>
          <SqlCodeBlock title="Top 10 queries by execution time" code={metricPreview} />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Next Steps</h2>
          <p className="text-muted-foreground">
            Continue with installation and configuration guides to enable the extension and integrate it into dashboards.
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>
              <a href="/docs/pg_stat_insights/getting-started" className="text-teal-600 hover:underline">
                Getting started with pg_stat_insights
              </a>
            </li>
            <li>
              <a href="/docs/pg_stat_insights/configuration" className="text-teal-600 hover:underline">
                Configuration reference
              </a>
            </li>
            <li>
              <a href="/docs/pg_stat_insights/metrics" className="text-teal-600 hover:underline">
                Metrics deep dive
              </a>
            </li>
          </ul>
        </section>
      </div>
    </DocsContentLayout>
  )
}
