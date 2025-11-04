import React from 'react'
import { AlertTriangle, Bug, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'FauxDB Troubleshooting | Documentation',
  description: 'Common issues and solutions for FauxDB',
}

const FauxDBTroubleshootingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        <div className="mb-12">
          <Link href="/docs/fauxdb" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-6 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to FauxDB Documentation
          </Link>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-400">
            Troubleshooting Guide
          </h1>
          <p className="text-xl text-slate-300">Common issues and solutions for FauxDB</p>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-yellow-400" />
            Connection Issues
          </h2>
          <div className="space-y-6">
            {[
              {
                problem: 'Cannot connect to FauxDB',
                causes: ['FauxDB service not running', 'Firewall blocking ports', 'Incorrect connection string'],
                solutions: ['Check if FauxDB is running: systemctl status fauxdb', 'Verify ports 27017 and 3306 are open', 'Check connection string format']
              },
              {
                problem: 'Authentication failed',
                causes: ['Invalid credentials', 'User not created in PostgreSQL', 'Auth mechanism mismatch'],
                solutions: ['Verify username/password', 'Create user in PostgreSQL backend', 'Check auth_mechanisms in config']
              },
              {
                problem: 'Connection pool exhausted',
                causes: ['Too many concurrent connections', 'Pool size too small', 'Connection leaks'],
                solutions: ['Increase pool_max_size', 'Monitor active connections', 'Check application connection handling']
              }
            ].map((issue, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-red-400/30">
                <h3 className="text-xl font-bold text-red-300 mb-3 flex items-center gap-2">
                  <Bug className="w-5 h-5" />
                  {issue.problem}
                </h3>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-slate-400 mb-2">Possible Causes:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
                    {issue.causes.map((cause, j) => <li key={j}>{cause}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-400 mb-2">Solutions:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
                    {issue.solutions.map((solution, j) => <li key={j}>{solution}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Performance Issues</h2>
          <div className="space-y-4">
            {[
              { issue: 'Slow query performance', solution: 'Enable query caching, add indexes to PostgreSQL tables, optimize query complexity' },
              { issue: 'High memory usage', solution: 'Reduce query_cache_size, lower pool_max_size, check for memory leaks' },
              { issue: 'High CPU usage', solution: 'Increase worker_threads, optimize queries, add database indexes' }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-4 border border-yellow-400/30">
                <p className="font-bold text-yellow-300 mb-2">{item.issue}</p>
                <p className="text-sm text-slate-300">{item.solution}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Debugging</h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/30">
            <h3 className="text-xl font-bold text-cyan-300 mb-4">Enable Debug Logging</h3>
            <div className="bg-slate-900/50 rounded-lg p-4 mb-4"><pre className="text-sm overflow-x-auto"><pre className="text-sm overflow-x-auto"><code className="text-green-400">{`[logging]
level = "debug"
format = "json"
output = "file"
file_path = "/var/log/fauxdb/debug.log"`}</code></pre></pre></div>
            <p className="text-slate-300 text-sm">View logs: <code className="text-emerald-400">tail -f /var/log/fauxdb/debug.log</code></p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8">Related Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/docs/fauxdb/configuration" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-emerald-400/50 transition-all group">
              <span className="font-semibold">Configuration Guide</span>
              <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/docs/fauxdb/monitoring" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-emerald-400/50 transition-all group">
              <span className="font-semibold">Monitoring Setup</span>
              <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default FauxDBTroubleshootingPage
