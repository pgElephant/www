import React from 'react'
import DocsContentLayout from '../../../../components/DocsContentLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import { PgStatInsightsIcon } from '../../../../components/ProductIcons'

export const metadata = {
  title: 'pg_stat_insights Usage Examples | Documentation',
  description: 'Practical SQL queries and usage patterns for pg_stat_insights performance analysis',
}

const examples = [
  {
    title: 'Find Slow Queries',
    desc: 'Identify queries with high execution time.',
    query: `SELECT LEFT(query, 100) AS query_snippet,
       calls,
       mean_exec_time,
       total_exec_time,
       stddev_exec_time
  FROM pg_stat_insights
 ORDER BY mean_exec_time DESC
 LIMIT 20;`,
  },
  {
    title: 'Cache Hit Ratio Analysis',
    desc: 'Focus on statements thrashing shared buffers.',
    query: `SELECT LEFT(query, 100) AS query_snippet,
       (shared_blks_hit::numeric /
       NULLIF(shared_blks_hit + shared_blks_read, 0)) AS cache_hit_ratio,
       shared_blks_hit,
       shared_blks_read
  FROM pg_stat_insights
 WHERE shared_blks_read > 100
 ORDER BY cache_hit_ratio ASC
 LIMIT 20;`,
  },
  {
    title: 'Top Resource Consumers',
    desc: 'Aggregate execution time, IO, and WAL generated per query.',
    query: `SELECT LEFT(query, 100) AS query_snippet,
       calls,
       total_exec_time,
       mean_exec_time,
       (shared_blks_hit + shared_blks_read) AS total_io,
       wal_bytes
  FROM pg_stat_insights
 ORDER BY total_exec_time DESC
 LIMIT 20;`,
  },
  {
    title: 'JIT Compilation Impact',
    desc: 'Compare JIT overhead with net execution time.',
    query: `SELECT queryid,
       mean_exec_time,
       (jit_generation_time + jit_inlining_time + jit_optimization_time + jit_emission_time) / calls AS avg_jit_ms
  FROM pg_stat_insights
 WHERE jit_functions > 0
 ORDER BY avg_jit_ms DESC
 LIMIT 15;`,
  },
]

const maintenance = `SELECT pg_stat_insights_reset();`;

const PgStatInsightsUsagePage = () => {
  return (
    <DocsContentLayout
      hero={{
        badgeLabel: 'pg_stat_insights',
        badgeIcon: <PgStatInsightsIcon size={20} />, 
        badgeTone: 'emerald',
        title: 'Usage Examples',
        description:
          'Copy-paste SQL patterns for pg_stat_insights to triage performance regressions, IO pressure, and compilation cost.',
      }}
      contentWidth="wide"
    >
      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Common Query Patterns</h2>
          <p className="text-muted-foreground">
            Use the snippets below as building blocks for dashboards and ad-hoc investigations. Adjust filters to your workload and retain query IDs for repeat analysis.
          </p>
          <div className="grid lg:grid-cols-2 gap-4">
            {examples.map((example) => (
              <div key={example.title} className="border rounded-lg p-4 space-y-2">
                <div>
                  <h3 className="font-semibold">{example.title}</h3>
                  <p className="text-sm text-muted-foreground">{example.desc}</p>
                </div>
                <SqlCodeBlock title="SQL" code={example.query} />
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Reset Statistics Safely</h2>
          <p className="text-muted-foreground">
            Reset counters after collecting baselines to avoid losing trend data unexpectedly.
          </p>
          <SqlCodeBlock title="Reset command" code={maintenance} />
        </section>
      </div>
    </DocsContentLayout>
  )
}

export default PgStatInsightsUsagePage
