import React from 'react'
import { Activity, BarChart3, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'FauxDB Monitoring | Documentation',
  description: 'Monitor FauxDB with Prometheus, Grafana, and custom metrics',
}

const FauxDBMonitoringPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        <div className="mb-12">
          <Link href="/docs/fauxdb" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-6 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to FauxDB Documentation
          </Link>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-400">
            Monitoring & Observability
          </h1>
          <p className="text-xl text-slate-300">Monitor FauxDB performance with Prometheus and Grafana</p>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Activity className="w-8 h-8 text-cyan-400" />
            Prometheus Metrics
          </h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/30">
            <h3 className="text-xl font-bold text-cyan-300 mb-4">Enable Metrics</h3>
            <div className="bg-slate-900/50 rounded-lg p-4 mb-4"><pre className="text-sm overflow-x-auto"><code className="text-green-400">{`[monitoring]
prometheus_enabled = true
prometheus_port = 9090
metrics_path = "/metrics"`}</code></pre></div>
            <p className="text-slate-300 text-sm">Access metrics at: <code className="text-emerald-400">http://localhost:9090/metrics</code></p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Available Metrics</h2>
          <div className="space-y-4">
            {[
              { name: 'fauxdb_connections_total', desc: 'Total number of connections', type: 'Counter' },
              { name: 'fauxdb_queries_total', desc: 'Total queries executed', type: 'Counter' },
              { name: 'fauxdb_query_duration_seconds', desc: 'Query execution time', type: 'Histogram' },
              { name: 'fauxdb_connections_active', desc: 'Active connections', type: 'Gauge' },
              { name: 'fauxdb_pg_pool_size', desc: 'PostgreSQL connection pool size', type: 'Gauge' }
            ].map((metric, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center justify-between">
                  <code className="text-purple-300 font-mono text-sm">{metric.name}</code>
                  <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded">{metric.type}</span>
                </div>
                <p className="text-slate-400 text-sm mt-2">{metric.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-purple-400" />
            Grafana Dashboard
          </h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
            <p className="text-slate-300 mb-4">Import the official FauxDB Grafana dashboard:</p>
            <div className="bg-slate-900/50 rounded-lg p-4"><pre className="text-sm overflow-x-auto"><code className="text-green-400">{`# Dashboard ID: fauxdb-overview
# Download from: https://grafana.com/dashboards/fauxdb

# Or manually configure:
1. Add Prometheus data source
2. Import dashboard JSON from /monitoring/grafana-dashboard.json
3. Configure variables for your environment`}</code></pre></div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8">Related Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/docs/fauxdb/configuration" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-emerald-400/50 transition-all group">
              <span className="font-semibold">Configuration Guide</span>
              <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/docs/fauxdb/production" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-emerald-400/50 transition-all group">
              <span className="font-semibold">Production Deployment</span>
              <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default FauxDBMonitoringPage
