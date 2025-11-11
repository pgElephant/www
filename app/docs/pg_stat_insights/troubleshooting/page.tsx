import { Metadata } from 'next'
import GettingStartedLayout from '../../../../components/GettingStartedLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import { PgStatInsightsIcon } from '../../../../components/ProductIcons'

export const metadata: Metadata = {
  title: 'pg_stat_insights Troubleshooting | Common Issues & Fixes',
  description:
    'Resolve pg_stat_insights installation problems, missing metrics, high overhead, and reset errors with targeted SQL and configuration steps.',
}

const requirements = [
  'Verify `shared_preload_libraries` includes pg_stat_insights and PostgreSQL was restarted',
  'Run `SELECT * FROM pg_extension WHERE extname = ' + "'pg_stat_insights'" + ';` to confirm the installed version',
  'Check `log_min_messages = debug1` temporarily if extension loading fails',
  'Collect `EXPLAIN (ANALYZE, BUFFERS)` plans before tuning query-level metrics',
]

export default function PgStatInsightsTroubleshootingPage() {
  return (
    <GettingStartedLayout
      product="pg_stat_insights"
      hero={{
        label: 'pg_stat_insights',
        labelIcon: <PgStatInsightsIcon size={20} />, 
        labelAccent: 'emerald',
        title: 'Restore pg_stat_insights Telemetry',
        description:
          'Use these guided diagnostics to fix preload errors, missing metrics, excessive overhead, and reset issues. Each card provides ready-to-run SQL or configuration commands.',
        cta: {
          href: '/docs/pg_stat_insights/troubleshooting',
          label: 'Bookmark troubleshooting playbook',
        },
      }}
      theme={{
        pageBackground: 'bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-950',
        heroOverlay: 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 dark:from-emerald-500/10 dark:to-teal-500/10',
        requirementsBorder: 'emerald',
        requirementsBackground: 'bg-white/90 dark:bg-slate-900/70',
      }}
      requirements={{
        title: 'Fast triage checklist',
        items: requirements,
        note: 'Run remediation in staging first. Revert temporary settings (e.g. debug logging) after successful validation.',
      }}
      sections={[
        {
          title: 'Extension load & setup',
          description: 'Solve common installation and configuration errors that prevent pg_stat_insights from loading.',
          cards: [
            {
              id: 'preload',
              title: 'Check shared_preload_libraries',
              accent: 'emerald',
              content: (
                <SqlCodeBlock
                  title="Confirm preload"
                  code={`SHOW shared_preload_libraries;`}
                />
              ),
            },
            {
              id: 'install',
              title: 'Install or update extension',
              accent: 'emerald',
              content: (
                <SqlCodeBlock
                  title="Install commands"
                  code={`CREATE EXTENSION IF NOT EXISTS pg_stat_insights;
ALTER EXTENSION pg_stat_insights UPDATE;`}
                />
              ),
            },
            {
              id: 'log-check',
              title: 'Capture load errors',
              accent: 'slate',
              content: (
                <BashCodeBlock
                  title="PostgreSQL logs"
                  code={`journalctl -u postgresql -n 100 | grep pg_stat_insights`}
                />
              ),
            },
          ],
        },
        {
          title: 'Missing or incomplete metrics',
          description: 'Ensure collections are running and view-specific tables are populated.',
          cards: [
            {
              id: 'metrics-check',
              title: 'Check primary view',
              accent: 'blue',
              content: (
                <SqlCodeBlock
                  title="Verify rows"
                  code={`SELECT COUNT(*) AS fingerprints
  FROM pg_stat_insights;`}
                />
              ),
            },
            {
              id: 'sampling',
              title: 'Increase retention & max fingerprints',
              accent: 'cyan',
              content: (
                <SqlCodeBlock
                  title="Adjust GUCs"
                  code={`ALTER SYSTEM SET pg_stat_insights.max = 10000;
ALTER SYSTEM SET pg_stat_insights.save = true;
SELECT pg_reload_conf();`}
                />
              ),
            },
            {
              id: 'reset',
              title: 'Reset safely',
              accent: 'emerald',
              content: (
                <SqlCodeBlock
                  title="Reset command"
                  code={`SELECT pg_stat_insights_reset();`}
                />
              ),
            },
          ],
        },
        {
          title: 'High overhead or bloat',
          description: 'Reduce collection overhead when pg_stat_insights impacts latency or memory.',
          cards: [
            {
              id: 'plan-toggle',
              title: 'Disable planning metrics temporarily',
              accent: 'amber',
              content: (
                <SqlCodeBlock
                  title="Toggle planning"
                  code={`ALTER SYSTEM SET pg_stat_insights.track_planning = false;
SELECT pg_reload_conf();`}
                />
              ),
            },
            {
              id: 'utility-filter',
              title: 'Filter utility commands',
              accent: 'indigo',
              content: (
                <SqlCodeBlock
                  title="Utility filter"
                  code={`ALTER SYSTEM SET pg_stat_insights.track_utility = false;
SELECT pg_reload_conf();`}
                />
              ),
            },
            {
              id: 'cleanup',
              title: 'Archive snapshots & vacuum stats schema',
              accent: 'rose',
              content: (
                <SqlCodeBlock
                  title="Maintenance"
                  code={`VACUUM ANALYZE pg_stat_insights;
VACUUM ANALYZE pg_stat_insights_plan;`}
                />
              ),
            },
          ],
        },
        {
          title: 'Export & alerting',
          description: 'Wire pg_stat_insights metrics into Prometheus/Grafana and alert on regressions.',
          cards: [
            {
              id: 'prometheus',
              title: 'Prometheus scrape excerpt',
              accent: 'blue',
              content: (
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
              ),
            },
            {
              id: 'alerting',
              title: 'Example alert rule',
              accent: 'purple',
              content: (
                <BashCodeBlock
                  title="Alertmanager rule"
                  code={`- alert: SlowQueriesSpike
  expr: topk(1, increase(pg_stat_insights_total_exec_time[10m])) > 1.5e05
  for: 5m
  labels:
    severity: warning`}
                />
              ),
            },
          ],
        },
      ]}
    />
  )
}
