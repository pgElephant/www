import React from 'react'
import { LayoutDashboard, ArrowRight, Activity, Bell } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'pgSentinel Dashboard | Documentation',
  description: 'Complete guide to using the pgSentinel monitoring dashboard',
}

const PgSentinelDashboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        <div className="mb-12">
          <Link href="/docs/pgsentinel" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-6 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to pgSentinel Documentation
          </Link>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            pgSentinel Dashboard
          </h1>
          <p className="text-xl text-slate-300">
            Real-time monitoring, alerting, and analytics dashboard for PostgreSQL
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-indigo-400" />
            Dashboard Overview
          </h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-indigo-400/30">
            <p className="text-slate-300 mb-6">
              The pgSentinel dashboard provides comprehensive PostgreSQL monitoring with real-time metrics,
              historical trends, alerting, and automated performance insights.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-3xl font-bold text-indigo-400 mb-1">50+</p>
                <p className="text-sm text-slate-400">Monitored Metrics</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-3xl font-bold text-purple-400 mb-1">12</p>
                <p className="text-sm text-slate-400">Dashboard Views</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-3xl font-bold text-pink-400 mb-1">Real-time</p>
                <p className="text-sm text-slate-400">1s Update Interval</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Accessing the Dashboard</h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-purple-300 mb-3">Installation</h3>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`# Install pgSentinel
npm install -g pgsentinel

# Or with Docker
docker pull pgedge/pgsentinel:latest

# Start dashboard server
pgsentinel start --port 3000 --host 0.0.0.0`}</code></pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-purple-300 mb-3">Configuration</h3>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <pre className="text-sm overflow-x-auto"><code className="text-yellow-400">{`# config.yaml
databases:
  - name: production
    host: db.example.com
    port: 5432
    database: myapp
    user: monitor
    password: \${PG_MONITOR_PASSWORD}
    
  - name: staging
    host: staging-db.example.com
    port: 5432
    database: myapp
    user: monitor
    password: \${PG_STAGING_PASSWORD}

dashboard:
  port: 3000
  refresh_interval: 1000  # milliseconds
  retention_days: 30
  
alerts:
  enabled: true
  smtp_host: smtp.example.com
  smtp_port: 587
  from_email: alerts@example.com`}</code></pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-purple-300 mb-3">Access URL</h3>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <pre className="text-sm"><code className="text-cyan-400">http://localhost:3000</code></pre>
                  <p className="text-slate-400 text-sm mt-2">
                    Default credentials: admin / admin (change immediately after first login)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Dashboard Views</h2>
          <div className="space-y-4">
            {[
              {
                title: 'Overview Dashboard',
                desc: 'High-level health metrics across all databases',
                metrics: ['Active connections', 'Query throughput', 'Cache hit ratio', 'Replication lag', 'Disk usage'],
                color: 'indigo'
              },
              {
                title: 'Performance Dashboard',
                desc: 'Query performance and execution statistics',
                metrics: ['Slow queries', 'Query execution time', 'Index usage', 'Table scan rates', 'Lock wait times'],
                color: 'purple'
              },
              {
                title: 'Connections Dashboard',
                desc: 'Connection pool monitoring and session analysis',
                metrics: ['Active/idle connections', 'Connection pool usage', 'Long-running queries', 'Blocked sessions', 'Client applications'],
                color: 'pink'
              },
              {
                title: 'Storage Dashboard',
                desc: 'Database and table size metrics',
                metrics: ['Database sizes', 'Table growth trends', 'Index sizes', 'TOAST usage', 'Bloat analysis'],
                color: 'blue'
              },
              {
                title: 'Replication Dashboard',
                desc: 'Streaming and logical replication monitoring',
                metrics: ['Replication lag (bytes/seconds)', 'Slot status', 'WAL senders', 'Subscription status', 'Sync state'],
                color: 'cyan'
              },
              {
                title: 'Vacuum Dashboard',
                desc: 'Autovacuum and maintenance tracking',
                metrics: ['Last vacuum times', 'Dead tuple ratios', 'Autovacuum runs', 'XID wraparound risk', 'Freeze age'],
                color: 'green'
              }
            ].map((view, index) => (
              <div key={index} className={`bg-white/5 rounded-xl p-6 border border-${view.color}-400/30`}>
                <h3 className={`text-xl font-bold text-${view.color}-300 mb-2`}>{view.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{view.desc}</p>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <p className="text-sm text-slate-500 mb-2">Key Metrics:</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {view.metrics.map((metric, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                        <span className={`text-${view.color}-400`}>•</span>
                        {metric}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Activity className="w-8 h-8 text-green-400" />
            Live Monitoring Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl p-6 border border-green-400/30">
              <h3 className="text-lg font-bold text-green-300 mb-3">Real-Time Queries</h3>
              <p className="text-slate-400 text-sm mb-4">
                View currently executing queries with live updates:
              </p>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• Query text and execution time</li>
                <li>• Client application and user</li>
                <li>• Wait events and lock status</li>
                <li>• Kill query capability</li>
                <li>• EXPLAIN plan on demand</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-blue-400/30">
              <h3 className="text-lg font-bold text-blue-300 mb-3">Lock Monitoring</h3>
              <p className="text-slate-400 text-sm mb-4">
                Detect and analyze lock contention:
              </p>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• Blocked query visualization</li>
                <li>• Lock dependency tree</li>
                <li>• Blocker/waiter relationships</li>
                <li>• Lock types and modes</li>
                <li>• Historical lock patterns</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-purple-400/30">
              <h3 className="text-lg font-bold text-purple-300 mb-3">Session Analysis</h3>
              <p className="text-slate-400 text-sm mb-4">
                Analyze database sessions and connections:
              </p>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• Active vs idle connections</li>
                <li>• Session duration tracking</li>
                <li>• Client IP and application</li>
                <li>• Transaction state</li>
                <li>• Temp file usage per session</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-pink-400/30">
              <h3 className="text-lg font-bold text-pink-300 mb-3">System Resources</h3>
              <p className="text-slate-400 text-sm mb-4">
                Monitor system-level metrics:
              </p>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• CPU usage per database</li>
                <li>• Memory consumption</li>
                <li>• Disk I/O rates</li>
                <li>• Network throughput</li>
                <li>• WAL generation rate</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Bell className="w-8 h-8 text-orange-400" />
            Alerting System
          </h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-orange-400/30">
            <p className="text-slate-300 mb-6">
              Configure alerts for critical database events and threshold violations:
            </p>

            <div className="space-y-4">
              <div className="bg-slate-900/50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-orange-300 mb-3">Alert Configuration</h3>
                <pre className="text-sm overflow-x-auto"><code className="text-yellow-400">{`# alerts.yaml
alerts:
  - name: high_connection_count
    condition: connections > 80% of max_connections
    severity: warning
    notifications:
      - email: ops@example.com
      - slack: #database-alerts
      
  - name: replication_lag
    condition: replication_lag_seconds > 60
    severity: critical
    notifications:
      - email: oncall@example.com
      - pagerduty: database-oncall
      
  - name: disk_space_low
    condition: disk_usage_percent > 85
    severity: warning
    check_interval: 300  # seconds
    
  - name: slow_queries
    condition: query_time > 10s
    severity: info
    throttle: 300  # Don't repeat within 5 min`}</code></pre>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="font-semibold text-orange-300 mb-2">Notification Channels</h4>
                  <ul className="text-slate-300 text-sm space-y-1">
                    <li>• Email (SMTP)</li>
                    <li>• Slack webhooks</li>
                    <li>• PagerDuty integration</li>
                    <li>• Microsoft Teams</li>
                    <li>• Custom webhooks</li>
                  </ul>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="font-semibold text-yellow-300 mb-2">Built-in Alert Rules</h4>
                  <ul className="text-slate-300 text-sm space-y-1">
                    <li>• High connection usage</li>
                    <li>• Replication lag</li>
                    <li>• Low cache hit ratio</li>
                    <li>• Disk space warnings</li>
                    <li>• Long-running transactions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Customizing the Dashboard</h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/30">
            <p className="text-slate-300 mb-6">
              Create custom dashboards and visualizations for your specific needs:
            </p>

            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-lg font-bold text-cyan-300 mb-3">Custom Metrics</h3>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`# custom_metrics.sql
-- Define custom metric queries
SELECT 'active_cart_sessions' as metric,
       COUNT(*) as value
FROM sessions
WHERE cart_items > 0
  AND last_activity > NOW() - INTERVAL '1 hour';

-- Add to dashboard via UI or config
metrics:
  - name: active_cart_sessions
    query_file: custom_metrics.sql
    refresh_seconds: 60
    chart_type: gauge
    threshold_warning: 1000
    threshold_critical: 5000`}</code></pre>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-lg font-bold text-cyan-300 mb-3">Dashboard Templates</h3>
                <p className="text-slate-400 text-sm mb-2">
                  Import pre-built dashboard templates for common scenarios:
                </p>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>• E-commerce transaction monitoring</li>
                  <li>• SaaS application analytics</li>
                  <li>• Data warehouse performance</li>
                  <li>• Time-series database metrics</li>
                  <li>• Multi-tenant monitoring</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8">Related Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/docs/pgsentinel" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-indigo-400/50 transition-all group">
              <span className="font-semibold">pgSentinel Overview</span>
              <ArrowRight className="w-5 h-5 text-indigo-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/docs/pgsentinel/configuration" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-indigo-400/50 transition-all group">
              <span className="font-semibold">Configuration Guide</span>
              <ArrowRight className="w-5 h-5 text-indigo-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/docs/pgsentinel/alerts" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-indigo-400/50 transition-all group">
              <span className="font-semibold">Alerting Setup</span>
              <ArrowRight className="w-5 h-5 text-indigo-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/docs" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-indigo-400/50 transition-all group">
              <span className="font-semibold">All Documentation</span>
              <ArrowRight className="w-5 h-5 text-indigo-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PgSentinelDashboardPage
