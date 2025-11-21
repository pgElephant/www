import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'pg_stat_insights · JIT Compilation Analysis',
  description: 'Measure JIT compilation overhead with pg_stat_insights and decide when to enable or disable JIT.',
}

const tableOfContents: TocItem[] = [
  { id: 'confirm-instrumentation', title: 'Confirm JIT Instrumentation' },
  { id: 'identify-jit-queries', title: 'Identify JIT-Compiled Queries' },
  { id: 'compare-costs', title: 'Compare Execution vs Compilation Cost' },
  { id: 'jit-strategy', title: 'Decide on JIT Strategy' },
  { id: 'optimize-jit', title: 'Optimise or Sandbox JIT' },
]

const prevLink: NavLink = {
  href: '/docs/pg_stat_insights/wal-monitoring',
  label: 'WAL Activity Monitoring',
}

const nextLink: NavLink = {
  href: '/docs/pg_stat_insights/overview',
  label: 'Overview',
}

const jitUsage = `SELECT queryid,
       LEFT(query, 160) AS query_preview,
       calls,
       jit_functions,
       jit_generation_time + jit_inlining_time + jit_optimization_time + jit_emission_time AS total_jit_ms,
       mean_exec_time
  FROM pg_stat_insights
 WHERE jit_functions > 0
 ORDER BY total_jit_ms DESC
 LIMIT 20;`

const jitOverheadPerCall = `SELECT queryid,
       (jit_generation_time + jit_inlining_time + jit_optimization_time + jit_emission_time) / calls AS avg_jit_ms,
       mean_exec_time
  FROM pg_stat_insights
 WHERE jit_functions > 0
 ORDER BY avg_jit_ms DESC
 LIMIT 20;`

const planToggle = `-- Disable JIT for a single session
SET jit = off;

-- Disable globally (requires restart)
ALTER SYSTEM SET jit = off;
SELECT pg_reload_conf();`

export default function PgStatInsightsJitAnalysisPage() {
  return (
    <PostgresDocsLayout
      title="JIT Compilation Analysis"
      version="pg_stat_insights Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="confirm-instrumentation">
        <h2>Confirm JIT Instrumentation</h2>
        <p>
          JIT metrics require <code>pg_stat_insights.track_planning = true</code> and <code>jit = on</code>. Toggle planning metrics during tuning sessions to limit overhead.
        </p>
        <BashCodeBlock
          title="postgresql.conf excerpt"
          code={`jit = on
pg_stat_insights.track_planning = true`}
        />
      </section>

      <section id="identify-jit-queries">
        <h2>Identify JIT-Compiled Queries</h2>
        <p>
          Surface the queries that trigger JIT compilation most often and accumulate the highest compilation time.
        </p>
        <SqlCodeBlock title="Top JIT consumers" code={jitUsage} />
      </section>

      <section id="compare-costs">
        <h2>Compare Execution vs Compilation Cost</h2>
        <p>
          JIT is beneficial when compilation overhead is tiny relative to overall execution. Use the per-call view to spot queries where JIT dominates response time.
        </p>
        <SqlCodeBlock title="Per-call JIT overhead" code={jitOverheadPerCall} />
      </section>

      <section id="jit-strategy">
        <h2>Decide on JIT Strategy</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3>Keep JIT enabled when</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Queries scan millions of rows or perform complex aggregates where code generation saves CPU.</li>
              <li>Average JIT overhead is &lt;10% of total execution time.</li>
              <li>Workload is OLAP-heavy and can amortise compilation cost over long-running calls.</li>
            </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h3>Disable or limit JIT when</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>Queries execute frequently with small result sets and JIT cost exceeds execution time.</li>
              <li>Latency-sensitive workloads suffer from compilation spikes under burst traffic.</li>
              <li>Infrastructure has limited CPU headroom to absorb compilation.</li>
            </ul>
          </div>
        </div>
        <SqlCodeBlock title="Toggle JIT" code={planToggle} />
      </section>

      <section id="optimize-jit">
        <h2>Optimise or Sandbox JIT</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <BashCodeBlock
            title="Force JIT off for specific roles"
            code={`ALTER ROLE app_user SET jit = off;`}
          />
          <SqlCodeBlock
            title="Reset planning stats"
            code={`SELECT pg_stat_insights_reset();`}
          />
        </div>
        <p className="text-sm">
          Review <code>EXPLAIN (ANALYZE, BUFFERS, WAL)</code> output to validate whether compiled loops outperform interpreter execution for your workload.
        </p>
      </section>
    </PostgresDocsLayout>
  )
}
