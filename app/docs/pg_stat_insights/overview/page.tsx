import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'pg_stat_insights Overview | Documentation',
  description: 'Introduction to pg_stat_insights PostgreSQL performance analytics extension and the metrics it exposes.',
}

const tableOfContents: TocItem[] = [
  { id: 'what-is', title: 'What is pg_stat_insights?' },
  { id: 'key-capabilities', title: 'Key Capabilities' },
  { id: 'view-metrics', title: 'View the Metrics' },
  { id: 'next-steps', title: 'Next Steps' },
]

const prevLink: NavLink = {
  href: '/docs/pg_stat_insights/jit-analysis',
  label: 'JIT Compilation Analysis',
}

const nextLink: NavLink = {
  href: '/docs/pg_stat_insights/getting-started',
  label: 'Getting Started',
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
    <PostgresDocsLayout
      title="pg_stat_insights Overview"
      version="pg_stat_insights Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="what-is">
        <h2>What is pg_stat_insights?</h2>
        <p>
          pg_stat_insights augments PostgreSQL with deep query analytics, adding lightweight views that expose plan cost variance, buffer churn, wait events, and WAL amplification. It ships as an extension and integrates with standard monitoring pipelines using SQL alone.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <p className="text-3xl font-semibold text-teal-600">52</p>
            <p className="text-sm">Metric columns covering execution, planning, IO, WAL, JIT, and parallelism.</p>
          </div>
          <div className="border rounded-lg p-4">
            <p className="text-3xl font-semibold text-cyan-600">11</p>
            <p className="text-sm">Views tailored to schedules, wait events, cache performance, and aggregates.</p>
          </div>
          <div className="border rounded-lg p-4">
            <p className="text-3xl font-semibold text-purple-600">5</p>
            <p className="text-sm">Core configuration parameters to tune sampling frequency and retention.</p>
          </div>
        </div>
      </section>

      <section id="key-capabilities">
        <h2>Key Capabilities</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4 space-y-2">
            <h3>Workload visibility</h3>
            <p className="text-sm">
              Track per-query latency, row throughput, and block cache efficiency with automatic baselines for regression detection.
            </p>
          </div>
          <div className="border rounded-lg p-4 space-y-2">
            <h3>Planner insight</h3>
            <p className="text-sm">
              Compare estimated versus actual cost, row counts, and startup times to tune statistics and identify planners that need more sampling.
            </p>
          </div>
          <div className="border rounded-lg p-4 space-y-2">
            <h3>JIT &amp; parallel analytics</h3>
            <p className="text-sm">
              Measure LLVM compilation overhead and parallel worker contribution to decide when JIT or parallelism should be disabled or encouraged.
            </p>
          </div>
          <div className="border rounded-lg p-4 space-y-2">
            <h3>WAL amplification tracking</h3>
            <p className="text-sm">
              Understand write-heavy workloads by monitoring wal_bytes, wal_fpi_bytes, and total WAL generation per query.
            </p>
          </div>
        </div>
      </section>

      <section id="view-metrics">
        <h2>View the Metrics</h2>
        <p>
          Start with the main <code>pg_stat_insights</code> view for top queries, then drill into specialized views such as <code>pg_stat_insights_plan</code>, <code>pg_stat_insights_jit</code>, and <code>pg_stat_insights_wal</code>.
        </p>
        <SqlCodeBlock title="Top 10 queries by execution time" code={metricPreview} />
      </section>

      <section id="next-steps">
        <h2>Next Steps</h2>
        <p>
          Continue with installation and configuration guides to enable the extension and integrate it into dashboards.
        </p>
        <ul className="list-disc list-inside text-sm space-y-1">
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
    </PostgresDocsLayout>
  )
}
