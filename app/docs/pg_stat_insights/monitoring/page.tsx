import React from 'react'
import { Activity, BarChart3, ArrowRight, Settings } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'pg_stat_insights Monitoring | Documentation',
  description: 'Integration with monitoring tools, alerting, and real-time performance dashboards',
}

const PgStatInsightsMonitoringPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        <div className="mb-12">
          <Link href="/docs/pg_stat_insights" className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 mb-6 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to pg_stat_insights Documentation
          </Link>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400">
            Monitoring Integration
          </h1>
          <p className="text-xl text-slate-300">
            Connect pg_stat_insights to Prometheus, Grafana, and monitoring tools
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-teal-400" />
            Prometheus Exporter
          </h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-teal-400/30">
            <p className="text-slate-300 mb-6">
              Use postgres_exporter to expose pg_stat_insights metrics to Prometheus:
            </p>
            
            <div className="bg-slate-900/50 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-semibold text-teal-300 mb-3">Custom Queries Configuration</h3>
              <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`# queries.yaml
pg_stat_insights:
  query: |
    SELECT 
      LEFT(query, 100) as query_snippet,
      calls,
      mean_exec_time,
      total_exec_time,
      cache_hit_ratio,
      shared_blks_read,
      shared_blks_hit
    FROM pg_stat_insights_cache
    WHERE calls > 100
  metrics:
    - query_snippet:
        usage: "LABEL"
        description: "Query text snippet"
    - calls:
        usage: "COUNTER"
        description: "Number of times executed"
    - mean_exec_time:
        usage: "GAUGE"
        description: "Average execution time in ms"
    - total_exec_time:
        usage: "COUNTER"
        description: "Total execution time in ms"
    - cache_hit_ratio:
        usage: "GAUGE"
        description: "Cache hit ratio (0-1)"
    - shared_blks_read:
        usage: "COUNTER"
        description: "Shared blocks read from disk"
    - shared_blks_hit:
        usage: "COUNTER"
        description: "Shared blocks found in cache"

pg_stat_insights_slow:
  query: |
    SELECT 
      COUNT(*) as slow_query_count,
      AVG(mean_exec_time) as avg_slow_time
    FROM pg_stat_insights_slow
    WHERE mean_exec_time > 1000
  metrics:
    - slow_query_count:
        usage: "GAUGE"
        description: "Number of slow queries"
    - avg_slow_time:
        usage: "GAUGE"
        description: "Average execution time of slow queries"`}</code></pre>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-teal-300 mb-3">Docker Compose Setup</h3>
              <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`version: '3.8'

services:
  postgres_exporter:
    image: prometheuscommunity/postgres-exporter:latest
    environment:
      DATA_SOURCE_NAME: "postgresql://monitor:password@postgres:5432/dbname?sslmode=disable"
    volumes:
      - ./queries.yaml:/etc/postgres_exporter/queries.yaml
    command:
      - --extend.query-path=/etc/postgres_exporter/queries.yaml
    ports:
      - "9187:9187"
    restart: unless-stopped`}</code></pre>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Activity className="w-8 h-8 text-cyan-400" />
            Grafana Dashboards
          </h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/30">
            <p className="text-slate-300 mb-6">
              Create comprehensive dashboards for pg_stat_insights metrics:
            </p>

            <div className="space-y-6">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-lg font-bold text-cyan-300 mb-3">Panel 1: Top Slow Queries</h3>
                <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`# PromQL Query
topk(10, 
  rate(pg_stat_insights_mean_exec_time[5m])
) by (query_snippet)`}</code></pre>
                <p className="text-slate-400 text-sm mt-2">Visualization: Bar chart showing slowest queries</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-lg font-bold text-cyan-300 mb-3">Panel 2: Cache Hit Ratio</h3>
                <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`# PromQL Query
avg(pg_stat_insights_cache_hit_ratio) by (query_snippet)`}</code></pre>
                <p className="text-slate-400 text-sm mt-2">Visualization: Time series with threshold at 0.90</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-lg font-bold text-cyan-300 mb-3">Panel 3: Query Call Rate</h3>
                <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`# PromQL Query
rate(pg_stat_insights_calls[5m])`}</code></pre>
                <p className="text-slate-400 text-sm mt-2">Visualization: Time series showing query frequency</p>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-lg font-bold text-cyan-300 mb-3">Panel 4: I/O Operations</h3>
                <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`# PromQL Query
sum(rate(pg_stat_insights_shared_blks_read[5m])) by (query_snippet) 
+ 
sum(rate(pg_stat_insights_shared_blks_hit[5m])) by (query_snippet)`}</code></pre>
                <p className="text-slate-400 text-sm mt-2">Visualization: Stacked area chart</p>
              </div>
            </div>

            <div className="mt-6 bg-slate-900/50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-cyan-300 mb-3">Import Pre-built Dashboard</h3>
              <p className="text-slate-400 text-sm mb-2">Coming soon: Official pg_stat_insights Grafana dashboard</p>
              <pre className="text-sm"><code className="text-green-400">{`# Dashboard ID: TBD (will be published to grafana.com)`}</code></pre>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Settings className="w-8 h-8 text-purple-400" />
            Alerting Rules
          </h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
            <p className="text-slate-300 mb-6">
              Prometheus alerting rules for pg_stat_insights:
            </p>

            <div className="bg-slate-900/50 rounded-lg p-4">
              <pre className="text-sm overflow-x-auto"><code className="text-yellow-400">{`# alerts.yml
groups:
  - name: pg_stat_insights
    interval: 30s
    rules:
      - alert: HighSlowQueryCount
        expr: pg_stat_insights_slow_query_count > 10
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High number of slow queries detected"
          description: "{{ $value }} slow queries detected on {{ $labels.instance }}"

      - alert: LowCacheHitRatio
        expr: avg(pg_stat_insights_cache_hit_ratio) < 0.90
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "Low cache hit ratio"
          description: "Cache hit ratio is {{ $value | humanizePercentage }} on {{ $labels.instance }}"

      - alert: HighMeanExecTime
        expr: avg(pg_stat_insights_mean_exec_time) > 5000
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Very high average query execution time"
          description: "Average execution time is {{ $value }}ms on {{ $labels.instance }}"

      - alert: ExcessiveIOWait
        expr: |
          (
            sum(rate(pg_stat_insights_blk_read_time[5m])) 
            + 
            sum(rate(pg_stat_insights_blk_write_time[5m]))
          ) > 10000
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Excessive I/O wait time"
          description: "I/O wait time exceeds 10s on {{ $labels.instance }}"`}</code></pre>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Monitoring Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Set Baseline Metrics',
                desc: 'Establish normal performance baselines during low-traffic periods',
                icon: '📊'
              },
              {
                title: 'Monitor Trends',
                desc: 'Track metric changes over time to identify performance degradation',
                icon: '📈'
              },
              {
                title: 'Alert Thresholds',
                desc: 'Set realistic thresholds based on your application requirements',
                icon: '🚨'
              },
              {
                title: 'Regular Reviews',
                desc: 'Review slow queries weekly and optimize as needed',
                icon: '🔍'
              },
              {
                title: 'Correlate Metrics',
                desc: 'Combine pg_stat_insights with system metrics for full picture',
                icon: '🔗'
              },
              {
                title: 'Automate Reports',
                desc: 'Schedule automated performance reports for stakeholders',
                icon: '📧'
              }
            ].map((practice, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6 border border-teal-400/30">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{practice.icon}</span>
                  <h3 className="text-lg font-bold text-teal-300 flex-1">{practice.title}</h3>
                </div>
                <p className="text-slate-400 text-sm">{practice.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8">Related Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/docs/pg_stat_insights/overview" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-teal-400/50 transition-all group">
              <span className="font-semibold">Overview</span>
              <ArrowRight className="w-5 h-5 text-teal-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/docs/pg_stat_insights/usage" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-teal-400/50 transition-all group">
              <span className="font-semibold">Usage Examples</span>
              <ArrowRight className="w-5 h-5 text-teal-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/docs/pg_stat_insights/metrics" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-teal-400/50 transition-all group">
              <span className="font-semibold">Metrics Reference</span>
              <ArrowRight className="w-5 h-5 text-teal-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/docs/pg_stat_insights/configuration" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-teal-400/50 transition-all group">
              <span className="font-semibold">Configuration Guide</span>
              <ArrowRight className="w-5 h-5 text-teal-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PgStatInsightsMonitoringPage
