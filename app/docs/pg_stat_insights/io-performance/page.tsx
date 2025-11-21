import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'pg_stat_insights · I/O Performance Analysis',
  description: 'Use pg_stat_insights to diagnose PostgreSQL I/O bottlenecks, track wait timing, and optimise storage throughput.',
}

const tableOfContents: TocItem[] = [
  { id: 'enable-timing', title: 'Enable Timing Instrumentation' },
  { id: 'identify-io-wait', title: 'Identify Queries with High I/O Wait' },
  { id: 'inspect-relations', title: 'Inspect Hot Relations and Temp Usage' },
  { id: 'correlate-wait-events', title: 'Correlate Wait Events' },
  { id: 'remediation-checklist', title: 'Remediation Checklist' },
]

const prevLink: NavLink = {
  href: '/docs/pg_stat_insights/cache-efficiency',
  label: 'Cache Efficiency Analysis',
}

const nextLink: NavLink = {
  href: '/docs/pg_stat_insights/parallel-queries',
  label: 'Parallel Query Analysis',
}

const ioTiming = `SELECT queryid,
       query,
       calls,
       blk_read_time,
       blk_write_time,
       (blk_read_time + blk_write_time) / calls AS avg_io_ms
  FROM pg_stat_insights_io
 ORDER BY blk_read_time + blk_write_time DESC
 LIMIT 20;`

const relationIO = `SELECT relid::regclass AS relation,
       shared_blks_read,
       shared_blks_dirtied,
       temp_blks_read,
       temp_blks_written
  FROM pg_stat_insights_relation
 ORDER BY shared_blks_read DESC
 LIMIT 15;`

const waitEvents = `SELECT wait_event_type,
       wait_event,
       SUM(total_exec_time) AS total_time_ms,
       SUM(calls) AS calls
  FROM pg_stat_insights_waits
 GROUP BY wait_event_type, wait_event
 ORDER BY total_time_ms DESC
 LIMIT 15;`

export default function PgStatInsightsIOPerformancePage() {
  return (
    <PostgresDocsLayout
      title="I/O Performance Analysis"
      version="pg_stat_insights Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="enable-timing">
        <h2>Enable Timing Instrumentation</h2>
        <p>
            Collect detailed block timing by enabling <code>track_io_timing = on</code> and restarting PostgreSQL. Plan this change during a maintenance window because it increases LWLock sampling cost slightly.
          </p>
          <BashCodeBlock
            title="postgresql.conf"
            code={`track_io_timing = on
pg_stat_insights.track = 'all'
pg_stat_insights.track_planning = true`}
          />
      </section>

      <section id="identify-io-wait">
        <h2>Identify Queries with High I/O Wait</h2>
        <p>
            Rank queries by cumulative I/O time to find candidates for indexing, caching, or query rewrites.
          </p>
          <SqlCodeBlock title="Query I/O timing" code={ioTiming} />
      </section>

      <section id="inspect-relations">
        <h2>Inspect Hot Relations and Temp Usage</h2>
        <p>
            Combine relation statistics with temp block tracking to discover tables or sorts causing spillover to disk.
          </p>
          <SqlCodeBlock title="Relation I/O profile" code={relationIO} />
          <SqlCodeBlock
            title="Temp usage hotspots"
            code={`SELECT queryid,
       temp_blks_read,
       temp_blks_written,
       calls
  FROM pg_stat_insights
 WHERE temp_blks_written > 0
 ORDER BY temp_blks_written DESC
 LIMIT 15;`}
          />
      </section>

      <section id="correlate-wait-events">
        <h2>Correlate Wait Events</h2>
        <p>
            Use the waits view to break down latency by wait event type and confirm whether storage or locking limits throughput.
          </p>
          <SqlCodeBlock title="I/O wait events" code={waitEvents} />
      </section>

      <section id="remediation-checklist">
        <h2>Remediation Checklist</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3>Storage tuning</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
                <li>Place WAL and data files on separate, high-throughput volumes.</li>
                <li>Increase <code>effective_io_concurrency</code> when using SSD/NVMe storage.</li>
                <li>Enable <code>synchronous_commit = off</code> for non-critical workloads to reduce fsync latency.</li>
              </ul>
          </div>
          <div className="border rounded-lg p-4">
            <h3>Query tuning</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
                <li>Add indexes for high temp block usage to avoid large sorts or hash spills.</li>
                <li>Rewrite sequential scans on cold tables to use partition pruning or partial indexes.</li>
                <li>Batch ETL and maintenance jobs to off-peak windows to reduce contention.</li>
            </ul>
          </div>
        </div>
      </section>
    </PostgresDocsLayout>
  )
}
