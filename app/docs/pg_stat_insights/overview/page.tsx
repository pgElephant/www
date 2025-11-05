import React from 'react'
import { Database, TrendingUp, ArrowRight, Zap } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'pg_stat_insights Overview | Documentation',
  description: 'Introduction to pg_stat_insights PostgreSQL performance analytics extension',
}

const PgStatInsightsOverviewPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        <div className="mb-12">
          <Link href="/docs/pg_stat_insights" className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 mb-6 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to pg_stat_insights Documentation
          </Link>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400">
            pg_stat_insights Overview
          </h1>
          <p className="text-xl text-slate-300">
            Deep PostgreSQL performance analytics extension with 52 metrics across 11 views
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Database className="w-8 h-8 text-teal-400" />
            What is pg_stat_insights?
          </h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-teal-400/30">
            <p className="text-slate-300 leading-relaxed mb-4">
              pg_stat_insights is a PostgreSQL extension that provides comprehensive query performance analytics. 
              It extends pg_stat_statements with additional metrics for cache efficiency, I/O patterns, planning overhead, 
              JIT compilation, and parallel execution.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-4xl font-bold text-teal-400 mb-1">52</p>
                <p className="text-sm text-slate-400">Metric Columns</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-4xl font-bold text-cyan-400 mb-1">11</p>
                <p className="text-sm text-slate-400">Performance Views</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <p className="text-4xl font-bold text-purple-400 mb-1">5</p>
                <p className="text-sm text-slate-400">Configuration Parameters</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Zap className="w-8 h-8 text-yellow-400" />
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Query Performance Tracking',
                desc: 'Track execution time, planning time, and call counts for all queries',
                color: 'teal'
              },
              {
                title: 'Cache Efficiency Analysis',
                desc: 'Analyze buffer cache hits, shared block reads, and I/O patterns',
                color: 'cyan'
              },
              {
                title: 'JIT Compilation Metrics',
                desc: 'Monitor JIT compilation overhead and optimization benefits',
                color: 'purple'
              },
              {
                title: 'Parallel Execution Stats',
                desc: 'Track parallel worker usage and parallel query efficiency',
                color: 'blue'
              },
              {
                title: 'WAL Activity Monitoring',
                desc: 'Monitor WAL generation and FPI (Full Page Image) activity',
                color: 'green'
              },
              {
                title: 'I/O Timing Breakdown',
                desc: 'Detailed read/write timing for shared, local, and temp blocks',
                color: 'orange'
              }
            ].map((feature, i) => (
              <div key={i} className={`bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-${feature.color}-400/30 hover:border-${feature.color}-400/50 transition-all`}>
                <h3 className={`text-lg font-bold text-${feature.color}-300 mb-2`}>{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Performance Views</h2>
          <div className="space-y-4">
            {[
              { view: 'pg_stat_insights', desc: 'Main view with all 52 metrics', icon: '📊' },
              { view: 'pg_stat_insights_cache', desc: 'Cache efficiency analysis', icon: '💾' },
              { view: 'pg_stat_insights_io', desc: 'I/O pattern analysis', icon: '⚡' },
              { view: 'pg_stat_insights_jit', desc: 'JIT compilation metrics', icon: '🔥' },
              { view: 'pg_stat_insights_parallel', desc: 'Parallel execution stats', icon: '🔀' },
              { view: 'pg_stat_insights_wal', desc: 'WAL activity tracking', icon: '📝' },
              { view: 'pg_stat_insights_slow', desc: 'Slow query identification', icon: '🐌' },
              { view: 'pg_stat_insights_top', desc: 'Top queries by execution time', icon: '🏆' },
              { view: 'pg_stat_insights_table', desc: 'Per-table statistics', icon: '📋' },
              { view: 'pg_stat_insights_index', desc: 'Index usage patterns', icon: '🔍' },
              { view: 'pg_stat_insights_replication', desc: 'Replication lag monitoring', icon: '🔄' }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-teal-400/30 transition-all">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1">
                    <pre className="text-sm overflow-x-auto">
                      <code className="text-teal-300 font-mono text-sm">{item.view}</code>
                    </pre>
                    <p className="text-slate-400 text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Quick Start</h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/30">
            <div className="bg-slate-900/50 rounded-lg p-4">
              <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`-- Install extension
CREATE EXTENSION pg_stat_insights;

-- View slow queries
SELECT query, mean_exec_time, calls, total_exec_time
FROM pg_stat_insights_slow
ORDER BY mean_exec_time DESC
LIMIT 10;

-- Analyze cache efficiency
SELECT query, cache_hit_ratio, shared_blks_hit, shared_blks_read
FROM pg_stat_insights_cache
WHERE cache_hit_ratio < 0.90
ORDER BY shared_blks_read DESC;

-- Check JIT compilation overhead
SELECT query, jit_functions, jit_generation_time, jit_optimization_time
FROM pg_stat_insights_jit
WHERE jit_functions > 0
ORDER BY jit_generation_time DESC;`}</code>
                </pre>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8">Related Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/docs/pg_stat_insights/metrics" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-teal-400/50 transition-all group">
              <span className="font-semibold">Metrics Reference</span>
              <ArrowRight className="w-5 h-5 text-teal-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/docs/pg_stat_insights/views" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-teal-400/50 transition-all group">
              <span className="font-semibold">Views Documentation</span>
              <ArrowRight className="w-5 h-5 text-teal-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/docs/pg_stat_insights/configuration" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-teal-400/50 transition-all group">
              <span className="font-semibold">Configuration Guide</span>
              <ArrowRight className="w-5 h-5 text-teal-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/docs/pg_stat_insights/usage" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-teal-400/50 transition-all group">
              <span className="font-semibold">Usage Examples</span>
              <ArrowRight className="w-5 h-5 text-teal-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PgStatInsightsOverviewPage
