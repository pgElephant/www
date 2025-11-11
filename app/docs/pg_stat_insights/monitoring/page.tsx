import React from 'react'
import DocsContentLayout from '../../../../components/DocsContentLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import { PgStatInsightsIcon } from '../../../../components/ProductIcons'

export const metadata = {
  title: 'pg_stat_insights Monitoring | Documentation',
  description: 'Integrate pg_stat_insights with Prometheus, Grafana, and alerting pipelines.',
}

const PgStatInsightsMonitoringPage = () => {
  return (
    <DocsContentLayout
      hero={{
        badgeLabel: 'pg_stat_insights',
        badgeIcon: <PgStatInsightsIcon size={20} />, 
        badgeTone: 'emerald',
        title: 'Monitoring Integration',
        description:
          'Export pg_stat_insights metrics to Prometheus, visualise them in Grafana, and create actionable alerting rules.',
      }}
      contentWidth="wide"
    >
      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Prometheus Exporter</h2>
          <p className="text-muted-foreground">
            Configure <code>postgres_exporter</code> or the PostgreSQL built-in exporter to scrape pg_stat_insights data using custom queries.
          </p>
          <BashCodeBlock
            title="queries.yaml"
            code={`pg_stat_insights:
  query: |
    SELECT queryid,
           LEFT(query, 100) AS query_snippet,
           calls,
           mean_exec_time,
           total_exec_time,
           shared_blks_read,
           shared_blks_hit
      FROM pg_stat_insights
     WHERE calls > 100;
  metrics:
    - queryid:
        usage: 'LABEL'
        description: 'Fingerprint'
    - query_snippet:
        usage: 'LABEL'
        description: 'Query preview'
    - calls:
        usage: 'COUNTER'
        description: 'Executions'
    - mean_exec_time:
        usage: 'GAUGE'
        description: 'Average execution time (ms)'
    - shared_blks_read:
        usage: 'COUNTER'
        description: 'Blocks read'
    - shared_blks_hit:
        usage: 'COUNTER'
        description: 'Blocks served from cache'`}
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Grafana Dashboards</h2>
          <p className="text-muted-foreground">
            Visualise execution time, cache hit ratio, and WAL generation to spot regressions quickly. Import a json dashboard or build panels using the sample PromQL queries below.
          </p>
          <SqlCodeBlock
            title="PromQL: Top queries by runtime"
            code={`topk(10, increase(pg_stat_insights_total_exec_time[5m]))`}
          />
          <SqlCodeBlock
            title="PromQL: Cache hit ratio"
            code={`1 - (sum(increase(pg_stat_insights_shared_blks_read[5m])) /
     sum(increase(pg_stat_insights_shared_blks_hit[5m]) + increase(pg_stat_insights_shared_blks_read[5m])))`}
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Alerting Rules</h2>
          <p className="text-muted-foreground">
            Create alerts that trigger when runtime increases beyond a tolerated baseline or when lag accumulates due to IO pressure.
          </p>
          <BashCodeBlock
            title="Alertmanager rule"
            code={`groups:
  - name: pg_stat_insights
    rules:
      - alert: SlowQueriesSpike
        expr: topk(1, increase(pg_stat_insights_total_exec_time[10m])) > 1.5e05
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "pg_stat_insights slow query spike"
          description: "Runtime increased past 150s in the last 10 minutes."`}
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Automated Resets</h2>
          <p className="text-muted-foreground">
            Reset counters during maintenance and archive snapshots for historical comparisons.
          </p>
          <SqlCodeBlock
            title="Capture + reset"
            code={`COPY (
  SELECT now() AS captured_at, *
    FROM pg_stat_insights
) TO '/var/lib/postgresql/metrics/pg_stat_insights_snapshot.csv' WITH CSV;

SELECT pg_stat_insights_reset();`}
          />
        </section>
      </div>
    </DocsContentLayout>
  )
}

export default PgStatInsightsMonitoringPage
