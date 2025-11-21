import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'pg_stat_insights Troubleshooting | Common Issues & Fixes',
  description:
    'Resolve pg_stat_insights installation problems, missing metrics, high overhead, and reset errors with targeted SQL and configuration steps.',
}

const tableOfContents: TocItem[] = [
  { id: 'fast-triage', title: 'Fast Triage Checklist' },
  { id: 'extension-load', title: 'Extension Load & Setup' },
  { id: 'missing-metrics', title: 'Missing or Incomplete Metrics' },
  { id: 'high-overhead', title: 'High Overhead or Bloat' },
  { id: 'export-alerting', title: 'Export & Alerting' },
]

const prevLink: NavLink = {
  href: '/docs/pg_stat_insights/monitoring',
  label: 'Monitoring Integration',
}

const nextLink: NavLink = {
  href: '/docs/pg_stat_insights/cache-efficiency',
  label: 'Cache Efficiency Analysis',
}

export default function PgStatInsightsTroubleshootingPage() {
  return (
    <PostgresDocsLayout
      title="Troubleshooting"
      version="pg_stat_insights Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="fast-triage">
        <h2>Fast Triage Checklist</h2>
        <p>
          Use these guided diagnostics to fix preload errors, missing metrics, excessive overhead, and reset issues. Each section provides ready-to-run SQL or configuration commands.
        </p>
        <ul>
          <li>Verify <code>shared_preload_libraries</code> includes pg_stat_insights and PostgreSQL was restarted</li>
          <li>Run <code>SELECT * FROM pg_extension WHERE extname = 'pg_stat_insights';</code> to confirm the installed version</li>
          <li>Check <code>log_min_messages = debug1</code> temporarily if extension loading fails</li>
          <li>Collect <code>EXPLAIN (ANALYZE, BUFFERS)</code> plans before tuning query-level metrics</li>
        </ul>
        <p className="text-sm">
          Run remediation in staging first. Revert temporary settings (e.g. debug logging) after successful validation.
        </p>
      </section>

      <section id="extension-load">
        <h2>Extension Load & Setup</h2>
        <p>
          Solve common installation and configuration errors that prevent pg_stat_insights from loading.
        </p>
        
        <h3>Check shared_preload_libraries</h3>
        <SqlCodeBlock
          title="Confirm preload"
          code={`SHOW shared_preload_libraries;`}
        />

        <h3>Install or update extension</h3>
        <SqlCodeBlock
          title="Install commands"
          code={`CREATE EXTENSION IF NOT EXISTS pg_stat_insights;
ALTER EXTENSION pg_stat_insights UPDATE;`}
        />

        <h3>Capture load errors</h3>
        <BashCodeBlock
          title="PostgreSQL logs"
          code={`journalctl -u postgresql -n 100 | grep pg_stat_insights`}
        />
      </section>

      <section id="missing-metrics">
        <h2>Missing or Incomplete Metrics</h2>
        <p>
          Ensure collections are running and view-specific tables are populated.
        </p>

        <h3>Check primary view</h3>
        <SqlCodeBlock
          title="Verify rows"
          code={`SELECT COUNT(*) AS fingerprints
  FROM pg_stat_insights;`}
        />

        <h3>Increase retention & max fingerprints</h3>
        <SqlCodeBlock
          title="Adjust GUCs"
          code={`ALTER SYSTEM SET pg_stat_insights.max = 10000;
ALTER SYSTEM SET pg_stat_insights.save = true;
SELECT pg_reload_conf();`}
        />

        <h3>Reset safely</h3>
        <SqlCodeBlock
          title="Reset command"
          code={`SELECT pg_stat_insights_reset();`}
        />
      </section>

      <section id="high-overhead">
        <h2>High Overhead or Bloat</h2>
        <p>
          Reduce collection overhead when pg_stat_insights impacts latency or memory.
        </p>

        <h3>Disable planning metrics temporarily</h3>
        <SqlCodeBlock
          title="Toggle planning"
          code={`ALTER SYSTEM SET pg_stat_insights.track_planning = false;
SELECT pg_reload_conf();`}
        />

        <h3>Filter utility commands</h3>
        <SqlCodeBlock
          title="Utility filter"
          code={`ALTER SYSTEM SET pg_stat_insights.track_utility = false;
SELECT pg_reload_conf();`}
        />

        <h3>Archive snapshots & vacuum stats schema</h3>
        <SqlCodeBlock
          title="Maintenance"
          code={`VACUUM ANALYZE pg_stat_insights;
VACUUM ANALYZE pg_stat_insights_plan;`}
        />
      </section>

      <section id="export-alerting">
        <h2>Export & Alerting</h2>
        <p>
          Wire pg_stat_insights metrics into Prometheus/Grafana and alert on regressions.
        </p>

        <h3>Prometheus scrape excerpt</h3>
        <BashCodeBlock
          title="queries.yml"
          code={`pg_stat_insights:
  query: |
    SELECT queryid,
           calls,
           total_exec_time,
           mean_exec_time
      FROM pg_stat_insights
     WHERE calls > 100;
  metrics:
    - queryid:
        usage: "LABEL"
    - calls:
        usage: "COUNTER"
    - total_exec_time:
        usage: "COUNTER"
    - mean_exec_time:
        usage: "GAUGE"`}
        />

        <h3>Example alert rule</h3>
        <BashCodeBlock
          title="Alertmanager rule"
          code={`- alert: SlowQueriesSpike
  expr: topk(1, increase(pg_stat_insights_total_exec_time[10m])) > 1.5e05
  for: 5m
  labels:
    severity: warning`}
        />
      </section>
    </PostgresDocsLayout>
  )
}
