import React from 'react'
import { Code, Search, ArrowRight, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'pg_stat_insights Usage Examples | Documentation',
  description: 'Practical SQL queries and usage patterns for pg_stat_insights performance analysis',
}

const PgStatInsightsUsagePage = () => {
  const examples = [
    {
      title: 'Find Slow Queries',
      desc: 'Identify queries with high execution time',
      query: `-- Queries with highest average execution time
SELECT 
  LEFT(query, 100) as query_snippet,
  calls,
  mean_exec_time,
  total_exec_time,
  stddev_exec_time
FROM pg_stat_insights_slow
ORDER BY mean_exec_time DESC
LIMIT 20;`
    },
    {
      title: 'Cache Hit Ratio Analysis',
      desc: 'Find queries with poor cache performance',
      query: `-- Queries with low cache hit ratio
SELECT 
  LEFT(query, 100) as query_snippet,
  cache_hit_ratio,
  shared_blks_hit,
  shared_blks_read,
  (shared_blks_hit + shared_blks_read) as total_blocks
FROM pg_stat_insights_cache
WHERE cache_hit_ratio < 0.90
  AND (shared_blks_hit + shared_blks_read) > 1000
ORDER BY total_blocks DESC
LIMIT 20;`
    },
    {
      title: 'Top Resource Consumers',
      desc: 'Queries consuming most database resources',
      query: `-- Top queries by total execution time
SELECT 
  LEFT(query, 100) as query_snippet,
  calls,
  total_exec_time,
  mean_exec_time,
  (shared_blks_hit + shared_blks_read) as total_io,
  wal_bytes / (1024*1024) as wal_mb
FROM pg_stat_insights
ORDER BY total_exec_time DESC
LIMIT 20;`
    },
    {
      title: 'JIT Compilation Impact',
      desc: 'Analyze JIT compilation overhead vs benefits',
      query: `-- JIT overhead analysis
SELECT 
  LEFT(query, 100) as query_snippet,
  calls,
  jit_functions,
  jit_generation_time / calls as avg_jit_gen_time,
  jit_optimization_time / calls as avg_jit_opt_time,
  mean_exec_time,
  ROUND((jit_generation_time + jit_optimization_time) / mean_exec_time * 100, 2) as jit_overhead_pct
FROM pg_stat_insights_jit
WHERE jit_functions > 0
ORDER BY jit_generation_time DESC
LIMIT 20;`
    },
    {
      title: 'Parallel Query Efficiency',
      desc: 'Monitor parallel worker usage and efficiency',
      query: `-- Parallel query analysis
SELECT 
  LEFT(query, 100) as query_snippet,
  calls,
  parallel_workers_launched / calls as avg_workers,
  mean_exec_time,
  total_exec_time,
  CASE 
    WHEN parallel_workers_launched > 0 
    THEN total_exec_time / (parallel_workers_launched / calls)
    ELSE NULL 
  END as parallelism_benefit
FROM pg_stat_insights_parallel
WHERE parallel_workers_launched > 0
ORDER BY parallel_workers_launched DESC
LIMIT 20;`
    },
    {
      title: 'I/O Timing Analysis',
      desc: 'Identify queries with high I/O wait time',
      query: `-- I/O timing analysis
SELECT 
  LEFT(query, 100) as query_snippet,
  calls,
  blk_read_time / calls as avg_read_time_ms,
  blk_write_time / calls as avg_write_time_ms,
  (blk_read_time + blk_write_time) / calls as avg_io_time_ms,
  mean_exec_time,
  ROUND((blk_read_time + blk_write_time) / mean_exec_time * 100, 2) as io_time_pct
FROM pg_stat_insights_io
WHERE (blk_read_time + blk_write_time) > 0
ORDER BY avg_io_time_ms DESC
LIMIT 20;`
    },
    {
      title: 'WAL Activity Monitoring',
      desc: 'Track WAL generation and write activity',
      query: `-- WAL generation by query
SELECT 
  LEFT(query, 100) as query_snippet,
  calls,
  wal_bytes / (1024*1024*1024) as wal_gb,
  wal_records,
  wal_fpi,
  wal_bytes / calls / 1024 as avg_wal_kb_per_call
FROM pg_stat_insights_wal
WHERE wal_bytes > 0
ORDER BY wal_bytes DESC
LIMIT 20;`
    },
    {
      title: 'Table-Level Statistics',
      desc: 'Per-table query performance breakdown',
      query: `-- Table access patterns
SELECT 
  schemaname,
  tablename,
  query_count,
  total_exec_time,
  avg_exec_time,
  total_io_blocks,
  cache_hit_ratio
FROM pg_stat_insights_table
ORDER BY total_exec_time DESC
LIMIT 20;`
    },
    {
      title: 'Index Usage Analysis',
      desc: 'Find unused or inefficient indexes',
      query: `-- Index usage patterns
SELECT 
  schemaname,
  tablename,
  indexname,
  idx_scan,
  idx_tup_read,
  idx_tup_fetch,
  CASE 
    WHEN idx_scan > 0 
    THEN ROUND(idx_tup_fetch::numeric / idx_scan, 2)
    ELSE 0 
  END as avg_tuples_per_scan
FROM pg_stat_insights_index
WHERE idx_scan < 10  -- Rarely used indexes
ORDER BY pg_relation_size(indexrelid) DESC;`
    },
    {
      title: 'Query Pattern Detection',
      desc: 'Group similar queries and find patterns',
      query: `-- Query patterns analysis
WITH query_patterns AS (
  SELECT 
    regexp_replace(query, E'[0-9]+', '?', 'g') as pattern,
    COUNT(*) as pattern_count,
    SUM(calls) as total_calls,
    SUM(total_exec_time) as total_time,
    AVG(mean_exec_time) as avg_time
  FROM pg_stat_insights
  GROUP BY pattern
)
SELECT 
  LEFT(pattern, 100) as query_pattern,
  pattern_count,
  total_calls,
  total_time,
  avg_time
FROM query_patterns
ORDER BY total_time DESC
LIMIT 20;`
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        <div className="mb-12">
          <Link href="/docs/pg_stat_insights" className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 mb-6 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to pg_stat_insights Documentation
          </Link>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400">
            Usage Examples
          </h1>
          <p className="text-xl text-slate-300">
            Practical SQL queries for performance analysis with pg_stat_insights
          </p>
        </div>

        <div className="space-y-8">
          {examples.map((example, index) => (
            <section key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-teal-400/30 hover:border-teal-400/50 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">{example.title}</h2>
                  <p className="text-slate-400 text-sm">{example.desc}</p>
                </div>
              </div>
              
              <div className="bg-slate-900/50 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm">
                  <code className="text-green-400">{example.query}</code>
                </pre>
              </div>
            </section>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Reset Statistics Periodically',
                desc: 'Call pg_stat_insights_reset() weekly to avoid data accumulation',
                icon: '🔄'
              },
              {
                title: 'Monitor Cache Hit Ratios',
                desc: 'Target > 95% cache hit ratio for optimal performance',
                icon: '💾'
              },
              {
                title: 'Identify Query Patterns',
                desc: 'Group similar queries to find optimization opportunities',
                icon: '🔍'
              },
              {
                title: 'Track JIT Overhead',
                desc: 'Disable JIT if overhead exceeds 10% of execution time',
                icon: '⚡'
              },
              {
                title: 'Analyze Parallel Efficiency',
                desc: 'Ensure parallel queries show significant speedup',
                icon: '🔀'
              },
              {
                title: 'Monitor WAL Generation',
                desc: 'High WAL activity may indicate inefficient write patterns',
                icon: '📝'
              }
            ].map((practice, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-6 border border-cyan-400/30">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{practice.icon}</span>
                  <h3 className="text-lg font-bold text-cyan-300 flex-1">{practice.title}</h3>
                </div>
                <p className="text-slate-400 text-sm">{practice.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
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
            <Link href="/docs/pg_stat_insights/monitoring" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-teal-400/50 transition-all group">
              <span className="font-semibold">Monitoring Integration</span>
              <ArrowRight className="w-5 h-5 text-teal-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PgStatInsightsUsagePage
