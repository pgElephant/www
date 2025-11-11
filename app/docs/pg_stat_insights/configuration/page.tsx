import { Metadata } from 'next'
import DocsContentLayout from '../../../../components/DocsContentLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import { PgStatInsightsIcon } from '../../../../components/ProductIcons'

export const metadata: Metadata = {
  title: 'pg_stat_insights Configuration Reference',
  description: 'Tune pg_stat_insights GUC parameters for tracking scope, retention, and planning analytics.',
}

const gucParameters = [
  {
    name: 'pg_stat_insights.max',
    defaultValue: '5000',
    context: 'sighup',
    purpose: 'Controls how many distinct query fingerprints are tracked before older entries age out.',
    guidance: 'Increase for diverse workloads, but monitor memory footprint.',
  },
  {
    name: 'pg_stat_insights.track',
    defaultValue: "'top'",
    context: 'user',
    purpose: 'Defines which statements are tracked (top-level only, or include nested statements).',
    guidance: "Use 'all' to capture functions and triggers; use 'top' to minimise overhead.",
  },
  {
    name: 'pg_stat_insights.track_utility',
    defaultValue: 'off',
    context: 'sighup',
    purpose: 'Includes utility commands (DDL, COPY, VACUUM) in the metrics.',
    guidance: 'Enable in staging during migrations to observe DDL impact.',
  },
  {
    name: 'pg_stat_insights.track_planning',
    defaultValue: 'off',
    context: 'sighup',
    purpose: 'Adds plan-time metrics such as total_plan_time and jit_functions.',
    guidance: 'Turn on temporarily during tuning sessions; planning stats add overhead.',
  },
  {
    name: 'pg_stat_insights.save',
    defaultValue: 'on',
    context: 'sighup',
    purpose: 'Persists statistics to disk across restarts and promote/failover events.',
    guidance: 'Leave enabled in production to keep baselines consistent.',
  },
]

const baseConfig = `shared_preload_libraries = 'pg_stat_insights'
pg_stat_insights.max = 5000
pg_stat_insights.track = 'all'
pg_stat_insights.track_planning = true
pg_stat_insights.track_utility = true
pg_stat_insights.save = true`

const runtimeChanges = `-- Adjust track scope without restart
ALTER SYSTEM SET pg_stat_insights.track = 'all';
SELECT pg_reload_conf();

-- Enable planning metrics for 1 hour window
ALTER SYSTEM SET pg_stat_insights.track_planning = true;
SELECT pg_reload_conf();
-- ...collect diagnostics...
ALTER SYSTEM RESET pg_stat_insights.track_planning;
SELECT pg_reload_conf();`

const retentionCheck = `SELECT datname,
       sum(total_exec_time) AS total_exec_ms,
       sum(calls) AS calls,
       count(*) AS fingerprints
FROM pg_stat_insights
 GROUP BY datname
 ORDER BY total_exec_time DESC;`

export default function PgStatInsightsConfigurationPage() {
  return (
    <DocsContentLayout
      hero={{
        badgeLabel: 'pg_stat_insights',
        badgeIcon: <PgStatInsightsIcon size={20} />, 
        badgeTone: 'emerald',
        title: 'Configuration Reference',
        description:
          'Manage pg_stat_insights tracking scope, retention, and planning analytics with these GUC parameters and tuning guidelines.',
      }}
      contentWidth="wide"
    >
      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Baseline Configuration</h2>
          <p className="text-muted-foreground">
            Add pg_stat_insights to <code>shared_preload_libraries</code> and restart PostgreSQL. Tune retention and tracking filters to balance insight with overhead.
          </p>
          <BashCodeBlock title="postgresql.conf" code={baseConfig} />
          <p className="text-sm text-muted-foreground">
            Revisit <code>pg_stat_insights.max</code> if your workload contains more than 5k unique fingerprints per maintenance window.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Parameter Catalog</h2>
          <div className="grid lg:grid-cols-2 gap-4">
            {gucParameters.map((param) => (
              <div key={param.name} className="border rounded-lg p-4 space-y-2">
                  <div>
                  <h3 className="font-semibold">{param.name}</h3>
                  <p className="text-sm text-muted-foreground">{param.purpose}</p>
                </div>
                <dl className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-muted-foreground uppercase tracking-wide">
                  <dt>Default</dt>
                  <dd className="text-right normal-case text-sm text-foreground">{param.defaultValue}</dd>
                  <dt>Context</dt>
                  <dd className="text-right normal-case text-sm text-foreground">{param.context}</dd>
                </dl>
                <p className="text-sm text-muted-foreground">{param.guidance}</p>
              </div>
            ))}
            </div>
          </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Runtime Adjustments</h2>
          <p className="text-muted-foreground">
            Most parameters accept SIGHUP, enabling change via <code>ALTER SYSTEM</code> without a full restart. Use reloads during investigations and reset once complete.
          </p>
          <SqlCodeBlock title="Toggle parameters at runtime" code={runtimeChanges} />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Verify Retention &amp; Memory Usage</h2>
          <p className="text-muted-foreground">
            The view below summarises fingerprint counts and execution totals per database to ensure <code>pg_stat_insights.max</code> is sufficient.
          </p>
          <SqlCodeBlock title="Fingerprint inventory" code={retentionCheck} />
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold">Guidelines</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>If fingerprints approach the maximum, increase <code>pg_stat_insights.max</code> or shorten retention windows via cron job resets.</li>
              <li>Monitor shared memory usage with <code>SELECT pg_size_pretty(pg_stat_file('global/pg_stat/pg_stat_insights.stat').size);</code>.</li>
              <li>Reset statistics after major releases by calling <code>SELECT pg_stat_insights_reset();</code>.</li>
                  </ul>
            </div>
          </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Observability Integrations</h2>
          <p className="text-muted-foreground">
            Expose configuration metrics to dashboards or alert when planning metrics are accidentally left enabled in production.
          </p>
          <SqlCodeBlock
            title="Configuration audit"
            code={`SELECT name,
       setting,
       source
  FROM pg_settings 
 WHERE name LIKE 'pg_stat_insights%'
 ORDER BY name;`}
          />
          <BashCodeBlock
            title="Prometheus textfile exporter"
            code={`#!/usr/bin/env bash
cat <<'EOF'
# HELP pg_stat_insights_planning_enabled 1 when planning stats are active
# TYPE pg_stat_insights_planning_enabled gauge
pg_stat_insights_planning_enabled $(psql -t -c "SELECT CASE WHEN current_setting('pg_stat_insights.track_planning')::boolean THEN 1 ELSE 0 END;")
EOF`}
          />
          </section>
      </div>
    </DocsContentLayout>
  )
}
