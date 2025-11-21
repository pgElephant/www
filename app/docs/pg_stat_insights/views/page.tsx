import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Views Reference | pg_stat_insights',
  description: 'Reference guide for the 11 pg_stat_insights views with usage examples and diagnostic tips.',
}

const prevLink: NavLink = {
  href: '/docs/pg_stat_insights/metrics',
  label: 'Metrics Reference Guide',
}

const nextLink: NavLink = {
  href: '/docs/pg_stat_insights/usage',
  label: 'Usage Examples',
}

interface ViewDefinition {
  name: string
  description: string
  sample: string
}

const views: ViewDefinition[] = [
  {
    name: 'pg_stat_insights',
    description: 'Primary view containing all 52 metrics. Use for comprehensive analysis.',
    sample: `SELECT queryid,
       calls,
       total_exec_time,
       mean_exec_time,
       shared_blks_hit,
       shared_blks_read
  FROM pg_stat_insights
 ORDER BY total_exec_time DESC
 LIMIT 20;`,
  },
  {
    name: 'pg_stat_insights_plan',
    description: 'Augments statements with plan hash, plan time, and planning counters (requires track_planning).',
    sample: `SELECT queryid,
       planid,
       total_plan_time,
       mean_plan_time,
       plans
  FROM pg_stat_insights_plan
 ORDER BY total_plan_time DESC
 LIMIT 15;`,
  },
  {
    name: 'pg_stat_insights_io',
    description: 'Block-level IO timing and counts, including temp usage and write amplification.',
    sample: `SELECT queryid,
       blk_read_time,
       blk_write_time,
       temp_blks_read,
       temp_blks_written
  FROM pg_stat_insights_io
 ORDER BY blk_read_time DESC
 LIMIT 15;`,
  },
  {
    name: 'pg_stat_insights_cache',
    description: 'Derived cache hit ratio and buffer churn metrics to quickly spot thrashing statements.',
    sample: `SELECT queryid,
       cache_hit_ratio,
       shared_blks_read,
       shared_blks_hit
  FROM pg_stat_insights_cache
 WHERE cache_hit_ratio < 0.9
 ORDER BY shared_blks_read DESC
 LIMIT 15;`,
  },
  {
    name: 'pg_stat_insights_waits',
    description: 'Aggregates execution time by wait event type for root cause analysis.',
    sample: `SELECT wait_event_type,
       wait_event,
       total_exec_time,
       calls
  FROM pg_stat_insights_waits
 ORDER BY total_exec_time DESC
 LIMIT 20;`,
  },
  {
    name: 'pg_stat_insights_relation',
    description: 'Relation-level statistics including shared/temp blocks and WAL usage by table/index.',
    sample: `SELECT relid::regclass AS relation,
       shared_blks_read,
       shared_blks_hit,
       wal_bytes
  FROM pg_stat_insights_relation
 ORDER BY shared_blks_read DESC
 LIMIT 15;`,
  },
  {
    name: 'pg_stat_insights_db',
    description: 'Database-wide aggregates, summarising metrics at database granularity.',
    sample: `SELECT datname,
       sum(total_exec_time) AS total_exec_ms,
       sum(calls) AS calls
  FROM pg_stat_insights_db
 GROUP BY datname
 ORDER BY total_exec_ms DESC;`,
  },
  {
    name: 'pg_stat_insights_user',
    description: 'Aggregates metrics per role to understand workload by user.',
    sample: `SELECT rolname,
       calls,
       total_exec_time
  FROM pg_stat_insights_user
 ORDER BY total_exec_time DESC
 LIMIT 10;`,
  },
  {
    name: 'pg_stat_insights_plan_stats',
    description: 'Plan hash frequency and last execution timestamps for change detection.',
    sample: `SELECT planid,
       plan_runs,
       last_run
  FROM pg_stat_insights_plan_stats
 ORDER BY last_run DESC
 LIMIT 20;`,
  },
  {
    name: 'pg_stat_insights_jit',
    description: 'JIT compilation metrics capturing LLVM overhead.',
    sample: `SELECT queryid,
       jit_functions,
       jit_generation_time,
       jit_emission_time
  FROM pg_stat_insights_jit
 ORDER BY jit_generation_time DESC
 LIMIT 15;`,
  },
  {
    name: 'pg_stat_insights_reset_history',
    description: 'Audit trail of statistic resets to correlate metric drops with operational events.',
    sample: `SELECT reset_by,
       reset_at,
       reason
  FROM pg_stat_insights_reset_history
 ORDER BY reset_at DESC
 LIMIT 20;`,
  },
]

const tableOfContents: TocItem[] = [
  { id: 'at-a-glance', title: 'At a Glance' },
  ...views.map((view) => ({ id: view.name.replace(/\./g, '-'), title: view.name })),
]

export default function PgStatInsightsViewsPage() {
  return (
    <PostgresDocsLayout
      title="Views Reference"
      version="pg_stat_insights Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="at-a-glance">
        <h2>At a Glance</h2>
        <p>
          All views are created alongside the extension and require only <code>SELECT</code> privileges. Most views aggregate the primary statistics to reduce joins during investigations.
        </p>
      </section>

      {views.map((view) => (
        <section key={view.name} id={view.name.replace(/\./g, '-')} className="space-y-3 border rounded-lg p-4">
          <div>
            <h3 className="font-semibold text-lg">
              <code>{view.name}</code>
            </h3>
            <p className="text-sm">{view.description}</p>
          </div>
          <SqlCodeBlock title="Sample query" code={view.sample} />
        </section>
      ))}
    </PostgresDocsLayout>
  )
}
