import React from 'react';
import { BarChart, AlertTriangle, TrendingUp, Activity, Eye, Bell } from 'lucide-react';

export const metadata = {
  title: 'Monitoring & Metrics - pgBalancer',
  description: 'Configure Prometheus metrics, Grafana dashboards, and alerting for pgBalancer monitoring.'
};

export default function MonitoringMetricsPage() {
  return (
    <div className="prose dark:prose-invert max-w-4xl mx-auto py-12 px-6">
      {/* Header */}
      <div className="not-prose mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent mb-4">
          Monitoring & Metrics
        </h1>
        <p className="text-xl text-gray-300">
          Configure Prometheus metrics, Grafana dashboards, and alerting for comprehensive pgBalancer monitoring
        </p>
      </div>

      {/* Step 1: Prometheus Setup */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-orange-500/20 rounded-lg">
            <BarChart className="w-6 h-6 text-orange-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 1: Configure Prometheus Scraping</h2>
        </div>

        <p className="text-gray-300 mb-4">
          pgBalancer exposes Prometheus metrics on the <code>/metrics</code> endpoint:
        </p>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Prometheus Configuration</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# prometheus.yml configuration
global:
  scrape_interval: 15s      # Scrape every 15 seconds
  evaluation_interval: 15s  # Evaluate rules every 15 seconds

scrape_configs:
  # pgBalancer metrics
  - job_name: 'pgbalancer'
    static_configs:
      - targets:
          - 'pgbalancer1.internal:8080'
          - 'pgbalancer2.internal:8080'
          - 'pgbalancer3.internal:8080'
    metrics_path: '/metrics'
    scrape_interval: 15s
    scrape_timeout: 10s

# Load alert rules
rule_files:
  - 'pgbalancer-alerts.yml'`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Verify Metrics Endpoint</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Test metrics endpoint
curl -s http://localhost:8080/metrics

# HELP pgbalancer_up Server status (1=up, 0=down)
# TYPE pgbalancer_up gauge
pgbalancer_up 1

# HELP pgbalancer_version_info Version information
# TYPE pgbalancer_version_info gauge
pgbalancer_version_info{version="5.0.0"} 1

# HELP pgbalancer_uptime_seconds Server uptime in seconds
# TYPE pgbalancer_uptime_seconds gauge
pgbalancer_uptime_seconds 432000

# Backend metrics
# HELP pgbalancer_backend_up Backend status (1=up, 0=down)
# TYPE pgbalancer_backend_up gauge
pgbalancer_backend_up{node_id="0",hostname="db-primary.internal"} 1
pgbalancer_backend_up{node_id="1",hostname="db-replica1.internal"} 1
pgbalancer_backend_up{node_id="2",hostname="db-replica2.internal"} 1

# Query metrics
# HELP pgbalancer_backend_queries_total Total queries sent to backend
# TYPE pgbalancer_backend_queries_total counter
pgbalancer_backend_queries_total{node_id="0"} 1523
pgbalancer_backend_queries_total{node_id="1"} 4501
pgbalancer_backend_queries_total{node_id="2"} 4389`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Reload Prometheus</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Reload Prometheus configuration
curl -X POST http://localhost:9090/-/reload

# Verify targets in Prometheus UI
# Visit: http://localhost:9090/targets
# Should show pgbalancer endpoints with "UP" status

# Query metrics in Prometheus
# Visit: http://localhost:9090/graph
# Query: pgbalancer_backend_up`}
          </pre>
        </div>

        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-4">
          <p className="text-sm text-blue-200 m-0">
            <strong>💡 Tip:</strong> For Kubernetes deployments, use a ServiceMonitor to automatically configure 
            Prometheus scraping. See <a href="https://github.com/pgElephant/pgbalancer/tree/main/monitoring/prometheus" className="text-cyan-400">pgBalancer monitoring README</a>.
          </p>
        </div>
      </section>

      {/* Step 2: Key Metrics */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-red-500/20 rounded-lg">
            <Activity className="w-6 h-6 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 2: Monitor Key Metrics</h2>
        </div>

        <p className="text-gray-300 mb-4">
          Track critical pgBalancer metrics:
        </p>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Backend Health Metrics</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Number of backends currently up
sum(pgbalancer_backend_up)

# Backend uptime percentage (last 24 hours)
avg_over_time(pgbalancer_backend_up[24h]) * 100

# Backends currently down (for alerting)
pgbalancer_backend_up == 0

# Health check failure rate
rate(pgbalancer_health_check_failures_total[5m])

# Health check success rate
rate(pgbalancer_health_check_total{result="success"}[5m])

# Average health check duration
avg(pgbalancer_health_check_duration_seconds)`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Load Distribution Metrics</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Queries per second by backend
rate(pgbalancer_backend_queries_total[5m])

# Total cluster queries per second
sum(rate(pgbalancer_backend_queries_total[5m]))

# Query distribution percentage
(
  rate(pgbalancer_backend_queries_total[5m])
  /
  sum(rate(pgbalancer_backend_queries_total[5m]))
) * 100

# Load imbalance coefficient of variation
stddev(rate(pgbalancer_backend_queries_total[5m]))
/
avg(rate(pgbalancer_backend_queries_total[5m]))

# Alert if CV > 0.3 (30% imbalance)

# Active connections per backend
pgbalancer_backend_connections{node_id="0"}
pgbalancer_backend_connections{node_id="1"}
pgbalancer_backend_connections{node_id="2"}`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Connection Pool Metrics</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Pool utilization percentage
pgbalancer_pool_utilization_percent

# Active vs idle connections
pgbalancer_pool_connections_active
pgbalancer_pool_connections_idle

# Pool exhaustion detection (utilization > 95%)
pgbalancer_pool_utilization_percent > 95

# Connection pool efficiency (cache hit rate)
(
  rate(pgbalancer_pool_hits_total[5m])
  /
  (rate(pgbalancer_pool_hits_total[5m]) + rate(pgbalancer_pool_misses_total[5m]))
) * 100

# Pool cache miss rate (should be low)
rate(pgbalancer_pool_misses_total[5m])`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Replication Lag Metrics</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Replication lag in seconds
pgbalancer_backend_replication_lag_seconds

# Maximum replication lag across all replicas
max(pgbalancer_backend_replication_lag_seconds)

# Alert if any replica lag > 60 seconds
pgbalancer_backend_replication_lag_seconds > 60

# Replicas with excessive lag (> 5 minutes)
pgbalancer_backend_replication_lag_seconds > 300`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Failover Metrics</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Failover events (last 24 hours)
increase(pgbalancer_failover_total[24h])

# Recent failovers (last hour)
increase(pgbalancer_failover_total[1h])

# Failback events
increase(pgbalancer_failback_total[24h])

# Backend detach/attach events
increase(pgbalancer_backend_detach_total[24h])
increase(pgbalancer_backend_attach_total[24h])

# Frequent failovers alert (> 3 in 1 hour)
increase(pgbalancer_failover_total[1h]) > 3`}
          </pre>
        </div>
      </section>

      {/* Step 3: Alert Rules */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-pink-500/20 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-pink-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 3: Configure Alert Rules</h2>
        </div>

        <p className="text-gray-300 mb-4">
          Set up critical alerts for pgBalancer monitoring:
        </p>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">pgbalancer-alerts.yml</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`groups:
  - name: pgbalancer_alerts
    interval: 30s
    rules:
      # Critical: pgBalancer server down
      - alert: PgbalancerDown
        expr: pgbalancer_up == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "pgBalancer server is down"
          description: "pgBalancer instance {{ $labels.instance }} is down"

      # Critical: Backend node down
      - alert: PgbalancerBackendDown
        expr: pgbalancer_backend_up == 0
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "Backend node {{ $labels.node_id }} is down"
          description: "Backend {{ $labels.hostname }}:{{ $labels.port }} (node {{ $labels.node_id }}) has been down for 2 minutes"

      # Critical: Primary backend down
      - alert: PgbalancerPrimaryDown
        expr: pgbalancer_backend_up{node_id="0"} == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Primary backend is down!"
          description: "Primary backend (node 0) is down - cluster in degraded state"

      # Warning: High pool utilization
      - alert: PgbalancerHighPoolUtilization
        expr: pgbalancer_pool_utilization_percent > 90
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High connection pool utilization"
          description: "Pool utilization at {{ $value }}% - consider increasing num_init_children"

      # Critical: Pool exhaustion
      - alert: PgbalancerPoolExhaustion
        expr: pgbalancer_pool_utilization_percent >= 100
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Connection pool exhausted!"
          description: "Pool at 100% capacity - clients may be waiting for connections"

      # Warning: Load imbalance
      - alert: PgbalancerUnbalancedLoad
        expr: |
          (
            stddev(rate(pgbalancer_backend_queries_total[5m]))
            /
            avg(rate(pgbalancer_backend_queries_total[5m]))
          ) > 0.3
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "Load distribution is imbalanced"
          description: "Query distribution shows >30% variation - check backend weights and health"

      # Warning: High replication lag
      - alert: PgbalancerHighReplicationLag
        expr: pgbalancer_backend_replication_lag_seconds > 60
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High replication lag on node {{ $labels.node_id }}"
          description: "Replica {{ $labels.hostname }} lag: {{ $value }}s (>60s threshold)"

      # Critical: Excessive replication lag
      - alert: PgbalancerCriticalReplicationLag
        expr: pgbalancer_backend_replication_lag_seconds > 300
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Critical replication lag on node {{ $labels.node_id }}"
          description: "Replica {{ $labels.hostname }} lag: {{ $value }}s (>5 minutes!)"

      # Warning: Health check failures
      - alert: PgbalancerHealthCheckFailures
        expr: rate(pgbalancer_health_check_failures_total[5m]) > 0.1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Frequent health check failures on node {{ $labels.node_id }}"
          description: "Health checks failing at {{ $value }}/sec for {{ $labels.hostname }}"

      # Warning: Watchdog quorum lost
      - alert: PgbalancerWatchdogQuorumLost
        expr: pgbalancer_watchdog_quorum == 0
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: "Watchdog quorum lost"
          description: "Watchdog has lost quorum - automatic failover may not work"

      # Info: Failover occurred
      - alert: PgbalancerFailoverEvent
        expr: increase(pgbalancer_failover_total[5m]) > 0
        labels:
          severity: info
        annotations:
          summary: "Failover event occurred"
          description: "A failover was triggered - check cluster status"

      # Critical: Frequent failovers
      - alert: PgbalancerFrequentFailovers
        expr: increase(pgbalancer_failover_total[1h]) > 3
        labels:
          severity: critical
        annotations:
          summary: "Frequent failovers detected"
          description: "{{ $value }} failovers in last hour - cluster unstable"

      # Warning: All backends down
      - alert: PgbalancerAllBackendsDown
        expr: sum(pgbalancer_backend_up) == 0
        for: 30s
        labels:
          severity: critical
        annotations:
          summary: "All backends are down!"
          description: "Complete cluster outage - all PostgreSQL backends unreachable"`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Test Alert Rules</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Validate alert rules syntax
promtool check rules pgbalancer-alerts.yml

# Test specific alert
promtool test rules pgbalancer-alerts.yml

# Query active alerts in Prometheus UI
# Visit: http://localhost:9090/alerts`}
          </pre>
        </div>
      </section>

      {/* Step 4: Grafana Dashboard */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-cyan-500/20 rounded-lg">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 4: Grafana Dashboard</h2>
        </div>

        <p className="text-gray-300 mb-4">
          Import the pre-built pgBalancer Grafana dashboard:
        </p>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Import Dashboard</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Download dashboard JSON
wget https://raw.githubusercontent.com/pgElephant/pgbalancer/main/monitoring/grafana/pgbalancer-dashboard.json

# Import via Grafana UI
# 1. Go to: http://localhost:3000/dashboard/import
# 2. Upload pgbalancer-dashboard.json
# 3. Select Prometheus data source
# 4. Click "Import"

# Or import via API
curl -X POST http://admin:admin@localhost:3000/api/dashboards/db \
  -H "Content-Type: application/json" \
  -d @pgbalancer-dashboard.json

# Dashboard includes:
# - Server status overview
# - Backend node health timeline
# - Connection pool utilization gauge
# - Queries per second (QPS) graph
# - Load distribution pie chart
# - Replication lag timeline
# - Health check success rate
# - Failover event annotations
# - Watchdog status panel
# - Process statistics`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Key Dashboard Panels</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Panel 1: Cluster Status (Stat Panel)
Query: pgbalancer_up
Display: Big number with "Healthy" / "Down" status

# Panel 2: Backend Status Timeline (Graph)
Query: pgbalancer_backend_up{node_id=~".*"}
Legend: node_id {{node_id}} - {{hostname}}

# Panel 3: Pool Utilization (Gauge)
Query: pgbalancer_pool_utilization_percent
Thresholds: 0-80 green, 80-90 yellow, 90-100 red

# Panel 4: Queries Per Second (Graph)
Query: sum(rate(pgbalancer_backend_queries_total[5m])) by (node_id)
Legend: Node {{node_id}}

# Panel 5: Load Distribution (Pie Chart)
Query: sum(rate(pgbalancer_backend_queries_total[5m])) by (node_id)

# Panel 6: Replication Lag (Graph)
Query: pgbalancer_backend_replication_lag_seconds
Threshold: 60s warning line

# Panel 7: Failover Events (Stat)
Query: increase(pgbalancer_failover_total[24h])
Display: Total failovers last 24h

# Panel 8: Active Connections (Bar Gauge)
Query: pgbalancer_backend_connections
Display: Connections per backend`}
          </pre>
        </div>
      </section>

      {/* Step 5: Alertmanager Integration */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-yellow-500/20 rounded-lg">
            <Bell className="w-6 h-6 text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 5: Alertmanager Notifications</h2>
        </div>

        <p className="text-gray-300 mb-4">
          Configure alert notifications via Slack, email, or PagerDuty:
        </p>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Alertmanager Configuration</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# alertmanager.yml
global:
  resolve_timeout: 5m
  slack_api_url: 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK'

route:
  receiver: 'pgbalancer-alerts'
  group_by: ['alertname', 'instance']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h
  
  # Route critical alerts to PagerDuty
  routes:
    - match:
        severity: critical
      receiver: 'pagerduty'
      continue: true
    
    - match:
        severity: warning
      receiver: 'slack'

receivers:
  - name: 'pgbalancer-alerts'
    slack_configs:
      - channel: '#database-alerts'
        title: 'pgBalancer Alert'
        text: '{{ .Annotations.description }}'
        send_resolved: true

  - name: 'pagerduty'
    pagerduty_configs:
      - service_key: 'YOUR_PAGERDUTY_KEY'
        description: '{{ .Annotations.summary }}'

  - name: 'slack'
    slack_configs:
      - channel: '#database-warnings'
        title: 'pgBalancer Warning'
        text: '{{ .Annotations.description }}'
        color: 'warning'

inhibit_rules:
  # Inhibit backend down alerts if entire cluster is down
  - source_match:
      alertname: 'PgbalancerAllBackendsDown'
    target_match:
      alertname: 'PgbalancerBackendDown'
    equal: ['instance']`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Test Alerts</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Send test alert
curl -X POST http://localhost:9093/api/v1/alerts \
  -H "Content-Type: application/json" \
  -d '[{
    "labels": {
      "alertname": "PgbalancerBackendDown",
      "severity": "warning",
      "node_id": "1",
      "hostname": "db-replica1.internal"
    },
    "annotations": {
      "summary": "Backend node 1 is down",
      "description": "Test alert from pgBalancer monitoring"
    }
  }]'

# Check Alertmanager UI
# Visit: http://localhost:9093/#/alerts`}
          </pre>
        </div>
      </section>

      {/* Step 6: Monitoring Best Practices */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <Eye className="w-6 h-6 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold m-0">Step 6: Monitoring Best Practices</h2>
        </div>

        <p className="text-gray-300 mb-4">
          Follow these practices for effective monitoring:
        </p>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Metrics Retention</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Prometheus storage configuration
# prometheus.yml
storage:
  tsdb:
    retention.time: 30d      # Keep 30 days of metrics
    retention.size: 50GB     # Or 50GB max storage

# Recording rules for expensive queries
# pgbalancer-recording-rules.yml
groups:
  - name: pgbalancer_recording
    interval: 15s
    rules:
      # Pre-calculate QPS for faster dashboards
      - record: pgbalancer:backend_qps:rate5m
        expr: rate(pgbalancer_backend_queries_total[5m])
      
      # Pre-calculate pool utilization
      - record: pgbalancer:pool_utilization:percent
        expr: pgbalancer_pool_utilization_percent
      
      # Pre-calculate load imbalance
      - record: pgbalancer:load_imbalance:cv
        expr: |
          stddev(rate(pgbalancer_backend_queries_total[5m]))
          /
          avg(rate(pgbalancer_backend_queries_total[5m]))`}
          </pre>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Monitoring Checklist</h3>
          <pre className="bg-black text-green-400 p-4 rounded overflow-x-auto">
{`# Daily Monitoring Tasks
✓ Check Grafana dashboard for anomalies
✓ Review alert history in Alertmanager
✓ Verify all backends show "up" status
✓ Check pool utilization trend (should be <80%)
✓ Monitor replication lag (should be <10s)

# Weekly Monitoring Tasks
✓ Review failover event history
✓ Analyze load distribution balance
✓ Check for increasing pool utilization trend
✓ Review health check failure patterns
✓ Validate backup/recovery procedures

# Monthly Monitoring Tasks
✓ Capacity planning: pool size, backend count
✓ Review alert rules and tune thresholds
✓ Update Grafana dashboard panels
✓ Test failover and alerting pipelines
✓ Audit monitoring coverage gaps`}
          </pre>
        </div>
      </section>

      {/* Metrics Reference */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Metrics Reference</h2>
        
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 border border-gray-700 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-2 text-cyan-400 whitespace-nowrap">Metric</th>
                <th className="text-left py-2 text-cyan-400">Type</th>
                <th className="text-left py-2 text-cyan-400">Description</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400 text-xs whitespace-nowrap">pgbalancer_up</td>
                <td className="py-2">Gauge</td>
                <td className="py-2">Server status (1=up)</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400 text-xs whitespace-nowrap">pgbalancer_backend_up</td>
                <td className="py-2">Gauge</td>
                <td className="py-2">Backend status by node_id</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400 text-xs whitespace-nowrap">pgbalancer_backend_queries_total</td>
                <td className="py-2">Counter</td>
                <td className="py-2">Total queries per backend</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400 text-xs whitespace-nowrap">pgbalancer_pool_utilization_percent</td>
                <td className="py-2">Gauge</td>
                <td className="py-2">Pool utilization (0-100)</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400 text-xs whitespace-nowrap">pgbalancer_health_check_failures_total</td>
                <td className="py-2">Counter</td>
                <td className="py-2">Failed health checks</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400 text-xs whitespace-nowrap">pgbalancer_backend_replication_lag_seconds</td>
                <td className="py-2">Gauge</td>
                <td className="py-2">Replication lag in seconds</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 font-mono text-green-400 text-xs whitespace-nowrap">pgbalancer_failover_total</td>
                <td className="py-2">Counter</td>
                <td className="py-2">Total failover events</td>
              </tr>
              <tr>
                <td className="py-2 font-mono text-green-400 text-xs whitespace-nowrap">pgbalancer_watchdog_quorum</td>
                <td className="py-2">Gauge</td>
                <td className="py-2">Watchdog quorum status</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Best Practices</h2>
        
        <div className="space-y-4">
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-400 mb-2">✓ DO</h3>
            <ul className="text-gray-300 space-y-2 mb-0">
              <li>• Scrape metrics every <strong>15-30 seconds</strong> (balance freshness vs load)</li>
              <li>• Retain metrics for <strong>30+ days</strong> for trend analysis</li>
              <li>• Use <strong>recording rules</strong> for expensive queries in dashboards</li>
              <li>• Configure <strong>Alertmanager</strong> for critical alerts (don't rely on Grafana alone)</li>
              <li>• Test failover and alert pipelines regularly</li>
              <li>• Use Kubernetes ServiceMonitor for auto-discovery</li>
            </ul>
          </div>

          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-red-400 mb-2">✗ DON'T</h3>
            <ul className="text-gray-300 space-y-2 mb-0">
              <li>• Don't scrape faster than 10 seconds (adds unnecessary load)</li>
              <li>• Don't set alert <code>for</code> duration too low (avoid flapping)</li>
              <li>• Don't create high-cardinality metrics (per-connection labels)</li>
              <li>• Don't ignore warning alerts for extended periods</li>
              <li>• Don't rely only on metrics - monitor logs too</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Additional Resources</h2>
        <div className="bg-gray-800/50 rounded-lg p-6">
          <ul className="space-y-2 text-gray-300 mb-0">
            <li>
              • <a href="https://github.com/pgElephant/pgbalancer/tree/main/monitoring" className="text-cyan-400 hover:text-cyan-300">
                pgBalancer Monitoring Guide (Full README)
              </a>
            </li>
            <li>
              • <a href="https://github.com/pgElephant/pgbalancer/blob/main/monitoring/prometheus/pgbalancer-alerts.yml" className="text-cyan-400 hover:text-cyan-300">
                Complete Alert Rules (pgbalancer-alerts.yml)
              </a>
            </li>
            <li>
              • <a href="https://github.com/pgElephant/pgbalancer/blob/main/monitoring/grafana/pgbalancer-dashboard.json" className="text-cyan-400 hover:text-cyan-300">
                Grafana Dashboard JSON
              </a>
            </li>
            <li>
              • <a href="/docs/pgbalancer/rest-api" className="text-cyan-400 hover:text-cyan-300">
                REST API Documentation
              </a>
            </li>
            <li>
              • <a href="/docs/pgbalancer/cli-management" className="text-cyan-400 hover:text-cyan-300">
                CLI Management (bctl)
              </a>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
