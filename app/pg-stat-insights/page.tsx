import React from 'react';
import ProductPageTemplate from '@/components/templates/ProductPageTemplate';
import PgStatInsightsDemoTerminal from '@/components/PgStatInsightsDemoTerminal';
import { generateProductPageMetadata } from '@/config/seo';
import { 
  TrendingUp, Database, Zap, Target, Eye, AlertTriangle,
  BarChart3, PieChart, Activity, Clock, Lock, HardDrive,
  Search, CheckCircle, FileText, Layers
} from 'lucide-react';

export const metadata = generateProductPageMetadata('pg-stat-insights');

const pgStatInsightsConfig = {
  productId: 'pg-stat-insights' as const,
  hero: {
    subtitle: '52 metrics across 11 pre-built views for query optimization, cache analysis, and WAL monitoring',
  },
  badges: [
    'PostgreSQL 16-18',
    '52 Metrics',
    '11 Views',
    '11 Parameters',
    'pg_stat_statements Drop-in',
    'TAP Testing',
    'Prometheus Ready',
    'Grafana Dashboards',
  ],
  demo: <PgStatInsightsDemoTerminal />,
  features: [
    { icon: '📊', iconColor: 'text-blue-500', title: '52 Metrics', desc: 'Execution time, plan time, cache hits, WAL generation, JIT stats, buffer I/O, parallel workers, and timing data, all in one extension.' },
    { icon: '🎯', iconColor: 'text-purple-500', title: '11 Pre-Built Views', desc: 'Access to top slow queries, cache misses, I/O intensive operations, errors, histogram summaries, and time-series aggregation.' },
    { icon: '⚡', iconColor: 'text-green-500', title: 'Response Time Categories', desc: 'Categorize queries by execution time: under 1ms, 1-10ms, 10-100ms, 100ms-1s, 1-10s, over 10s for SLA monitoring.' },
    { icon: '💾', iconColor: 'text-cyan-500', title: 'Cache Efficiency Analysis', desc: 'Cache analysis with hit/miss ratios, shared_blks_hit, shared_blks_read, and buffer cache optimization insights.' },
    { icon: '📝', iconColor: 'text-orange-500', title: 'WAL Generation Tracking', desc: 'Monitor write-ahead log per query: wal_records, wal_fpi, wal_bytes, wal_buffers_full for write optimization.' },
    { icon: '⚙️', iconColor: 'text-pink-500', title: 'JIT Compilation Stats', desc: 'Track JIT functions, generation time, inlining, optimization, emission, and deform operations for query performance.' },
    { icon: '🔄', iconColor: 'text-red-500', title: 'Parallel Query Monitoring', desc: 'Track parallel_workers_to_launch vs parallel_workers_launched for parallel query efficiency analysis.' },
    { icon: '🧪', iconColor: 'text-yellow-500', title: '150 TAP Tests', desc: 'Test suite with 16 test files, 150 test cases, 100% code coverage, and PostgreSQL 18 compatibility.' },
    { icon: '📈', iconColor: 'text-indigo-500', title: 'Prometheus and Grafana', desc: 'Pre-built Prometheus queries, Grafana dashboards (8 panels), and 11 alert rules for production monitoring integration.' },
  ],
  featurePillars: {
    kicker: '52 Metrics Across 11 Views',
    items: [
      { title: 'Main Statistics View (pg_stat_insights)', desc: '52 columns including userid, dbid, queryid, query text, plans, total/min/max/mean/stddev plan/exec times, rows, all buffer I/O metrics, WAL stats, JIT stats, parallel workers, and timestamps.' },
      { title: 'Top Queries by Time', desc: 'pg_stat_insights_top_by_time view shows slowest queries by total_exec_time. Identifies performance bottlenecks and optimization opportunities.' },
      { title: 'Top Queries by Calls', desc: 'pg_stat_insights_top_by_calls view shows most frequently executed queries. Finds high-frequency operations that need caching or optimization.' },
      { title: 'I/O Intensive Operations', desc: 'pg_stat_insights_top_by_io view identifies highest I/O consumers based on shared_blks_read + temp_blks_read. Finds disk-heavy queries.' },
      { title: 'Cache Miss Analysis', desc: 'pg_stat_insights_top_cache_misses view shows poor cache performers. Includes cache_hit_ratio calculation for buffer optimization.' },
      { title: 'Slow Query Detection', desc: 'pg_stat_insights_slow_queries view filters queries with mean_exec_time over 100ms. Automatic slow query identification for tuning.' },
      { title: 'Error Tracking', desc: 'pg_stat_insights_errors view shows queries with execution errors. Tracks failed queries for debugging and reliability improvement.' },
      { title: 'Plan Estimation Issues', desc: 'pg_stat_insights_plan_errors view identifies plan estimation problems. Compares estimated vs actual rows for query planner accuracy.' },
      { title: 'Response Time Histograms', desc: 'pg_stat_insights_histogram_summary aggregates queries into time buckets: <1ms, 1-10ms, 10-100ms, 100ms-1s, 1-10s, >10s for SLA tracking.' },
      { title: 'Time-Series Aggregation', desc: 'pg_stat_insights_by_bucket view provides time-series data with bucket-based aggregation for trend analysis and capacity planning.' },
      { title: 'Replication Monitoring', desc: 'pg_stat_insights_replication view tracks WAL sender/receiver stats, lag (write/flush/replay), sync_state, and replication health across all standbys.' },
    ],
  },
  featureMatrix: {
    title: 'Performance Analytics Overview',
    subtitle: 'Comprehensive views and metrics for PostgreSQL performance monitoring and optimization.',
    content: (
    <div className="space-y-8">
      {/* 11 Views Overview */}
      <div className="style={{ backgroundColor: '#1f2937' }} p-8 rounded-xl border border-slate-700">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">11 Pre-Built Views for Complete Performance Visibility</h3>
        
        <div className="grid grid-cols-3 gap-4">
          {/* View 1 */}
          <div className="bg-blue-600/10 border-2 border-blue-500 rounded-lg p-4">
            <div className="text-center">
              <Database className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <div className="font-bold text-blue-300 text-sm">pg_stat_insights</div>
              <div className="text-xs text-slate-400 mt-2">Main view - 52 columns</div>
              <div className="mt-2 text-xs text-slate-300">All metrics in one place</div>
            </div>
          </div>
          
          {/* View 2 */}
          <div className="bg-purple-600/10 border-2 border-purple-500 rounded-lg p-4">
            <div className="text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-purple-400" />
              <div className="font-bold text-purple-300 text-sm">top_by_time</div>
              <div className="text-xs text-slate-400 mt-2">Slowest queries</div>
              <div className="mt-2 text-xs text-slate-300">By total_exec_time</div>
            </div>
      </div>
      
          {/* View 3 */}
          <div className="bg-green-600/10 border-2 border-green-500 rounded-lg p-4">
            <div className="text-center">
              <Activity className="w-8 h-8 mx-auto mb-2 text-green-400" />
              <div className="font-bold text-green-300 text-sm">top_by_calls</div>
              <div className="text-xs text-slate-400 mt-2">Most frequent</div>
              <div className="mt-2 text-xs text-slate-300">High-frequency queries</div>
            </div>
          </div>
          
          {/* View 4 */}
          <div className="bg-cyan-600/10 border-2 border-cyan-500 rounded-lg p-4">
            <div className="text-center">
              <HardDrive className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
              <div className="font-bold text-cyan-300 text-sm">top_by_io</div>
              <div className="text-xs text-slate-400 mt-2">I/O intensive</div>
              <div className="mt-2 text-xs text-slate-300">Disk-heavy queries</div>
            </div>
          </div>
          
          {/* View 5 */}
          <div className="bg-orange-600/10 border-2 border-orange-500 rounded-lg p-4">
            <div className="text-center">
              <Target className="w-8 h-8 mx-auto mb-2 text-orange-400" />
              <div className="font-bold text-orange-300 text-sm">top_cache_misses</div>
              <div className="text-xs text-slate-400 mt-2">Poor cache hits</div>
              <div className="mt-2 text-xs text-slate-300">Buffer optimization</div>
            </div>
          </div>
          
          {/* View 6 */}
          <div className="bg-red-600/10 border-2 border-red-500 rounded-lg p-4">
            <div className="text-center">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-red-400" />
              <div className="font-bold text-red-300 text-sm">slow_queries</div>
              <div className="text-xs text-slate-400 mt-2">Mean time &gt; 100ms</div>
              <div className="mt-2 text-xs text-slate-300">Performance alerts</div>
            </div>
          </div>
          
          {/* View 7 */}
          <div className="bg-pink-600/10 border-2 border-pink-500 rounded-lg p-4">
            <div className="text-center">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-pink-400" />
              <div className="font-bold text-pink-300 text-sm">errors</div>
              <div className="text-xs text-slate-400 mt-2">Failed queries</div>
              <div className="mt-2 text-xs text-slate-300">Error tracking</div>
          </div>
        </div>
        
          {/* View 8 */}
          <div className="bg-yellow-600/10 border-2 border-yellow-500 rounded-lg p-4">
            <div className="text-center">
              <Search className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
              <div className="font-bold text-yellow-300 text-sm">plan_errors</div>
              <div className="text-xs text-slate-400 mt-2">Estimation issues</div>
              <div className="mt-2 text-xs text-slate-300">Planner accuracy</div>
            </div>
          </div>
          
          {/* View 9 */}
          <div className="bg-indigo-600/10 border-2 border-indigo-500 rounded-lg p-4">
            <div className="text-center">
              <BarChart3 className="w-8 h-8 mx-auto mb-2 text-indigo-400" />
              <div className="font-bold text-indigo-300 text-sm">histogram_summary</div>
              <div className="text-xs text-slate-400 mt-2">Time distribution</div>
              <div className="mt-2 text-xs text-slate-300">6 time buckets</div>
            </div>
          </div>
          
          {/* View 10 */}
          <div className="bg-teal-600/10 border-2 border-teal-500 rounded-lg p-4">
            <div className="text-center">
              <Layers className="w-8 h-8 mx-auto mb-2 text-teal-400" />
              <div className="font-bold text-teal-300 text-sm">by_bucket</div>
              <div className="text-xs text-slate-400 mt-2">Time-series</div>
              <div className="mt-2 text-xs text-slate-300">Bucket aggregation</div>
            </div>
          </div>
          
          {/* View 11 */}
          <div className="bg-violet-600/10 border-2 border-violet-500 rounded-lg p-4">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-violet-400" />
              <div className="font-bold text-violet-300 text-sm">replication</div>
              <div className="text-xs text-slate-400 mt-2">Standby lag</div>
              <div className="mt-2 text-xs text-slate-300">WAL monitoring</div>
            </div>
          </div>
        </div>
        
        {/* 52 Metrics Breakdown */}
        <div className="mt-6 bg-slate-800/40 border border-slate-600 rounded-lg p-6">
          <h4 className="text-lg font-bold text-white text-center mb-4">52 Metrics</h4>
          <div className="grid grid-cols-4 gap-4 text-xs">
            <div>
              <div className="font-semibold text-blue-300 mb-2">Execution Metrics (10)</div>
              <div className="space-y-1 text-slate-400">
                <div>• plans, calls, rows</div>
                <div>• total/min/max times</div>
                <div>• mean/stddev times</div>
                <div>• plan + exec times</div>
              </div>
            </div>
            <div>
              <div className="font-semibold text-green-300 mb-2">Buffer I/O (14)</div>
              <div className="space-y-1 text-slate-400">
                <div>• shared_blks (hit/read)</div>
                <div>• dirtied/written</div>
                <div>• local_blks (4 types)</div>
                <div>• temp_blks (2 types)</div>
                <div>• read/write times (6)</div>
              </div>
            </div>
            <div>
              <div className="font-semibold text-purple-300 mb-2">WAL Stats (4)</div>
              <div className="space-y-1 text-slate-400">
                <div>• wal_records</div>
                <div>• wal_fpi</div>
                <div>• wal_bytes</div>
                <div>• wal_buffers_full</div>
              </div>
            </div>
            <div>
              <div className="font-semibold text-orange-300 mb-2">JIT Stats (10)</div>
              <div className="space-y-1 text-slate-400">
                <div>• jit_functions</div>
                <div>• generation_time</div>
                <div>• inlining (count/time)</div>
                <div>• optimization (count/time)</div>
                <div>• emission (count/time)</div>
                <div>• deform (count/time)</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-xs mt-4">
            <div>
              <div className="font-semibold text-cyan-300 mb-2">Parallel (2)</div>
              <div className="space-y-1 text-slate-400">
                <div>• workers_to_launch</div>
                <div>• workers_launched</div>
              </div>
            </div>
            <div>
              <div className="font-semibold text-pink-300 mb-2">Metadata (5)</div>
              <div className="space-y-1 text-slate-400">
                <div>• userid, dbid, queryid</div>
                <div>• toplevel, query text</div>
              </div>
            </div>
            <div>
              <div className="font-semibold text-yellow-300 mb-2">Timestamps (2)</div>
              <div className="space-y-1 text-slate-400">
                <div>• stats_since</div>
                <div>• minmax_stats_since</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Comparison Table */}
    <table className="w-full text-sm border border-slate-700 rounded-lg overflow-hidden">
      <thead className="bg-slate-800/60">
        <tr className="text-left">
          <th className="px-4 py-3 font-semibold text-white">Feature</th>
          <th className="px-4 py-3 font-semibold text-white">pg_stat_statements</th>
          <th className="px-4 py-3 font-semibold text-white">pg_stat_monitor</th>
          <th className="px-4 py-3 font-semibold text-white">pg_stat_insights</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-700 bg-slate-800/40">
        <tr>
          <td className="px-4 py-3 font-medium text-slate-200">Metric Columns</td>
          <td className="px-4 py-3 text-slate-300">44</td>
          <td className="px-4 py-3 text-slate-300">58</td>
          <td className="px-4 py-3 text-green-400 font-bold">52</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-slate-200">Pre-built Views</td>
          <td className="px-4 py-3 text-slate-300">2</td>
          <td className="px-4 py-3 text-slate-300">5</td>
          <td className="px-4 py-3 text-green-400 font-bold">11</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-slate-200">Configuration Options</td>
          <td className="px-4 py-3 text-slate-300">5</td>
          <td className="px-4 py-3 text-slate-300">12</td>
          <td className="px-4 py-3 text-green-400 font-bold">11</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-slate-200">Response Time Categories</td>
          <td className="px-4 py-3 text-red-400">✗ No</td>
          <td className="px-4 py-3 text-green-400">✓ Yes (10 buckets)</td>
          <td className="px-4 py-3 text-green-400">✓ Yes (6 buckets)</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-slate-200">Time-Series Tracking</td>
          <td className="px-4 py-3 text-red-400">✗ No</td>
          <td className="px-4 py-3 text-green-400">✓ Bucket-based</td>
          <td className="px-4 py-3 text-green-400">✓ Bucket-based</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-slate-200">TAP Test Coverage</td>
          <td className="px-4 py-3 text-yellow-400">~ Standard</td>
          <td className="px-4 py-3 text-yellow-400">~ Limited</td>
          <td className="px-4 py-3 text-green-400">✓ 150 tests, 100%</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-slate-200">Documentation</td>
          <td className="px-4 py-3 text-yellow-400">~ Basic</td>
          <td className="px-4 py-3 text-yellow-400">~ Medium</td>
          <td className="px-4 py-3 text-green-400">✓ 30+ pages</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-slate-200">Prometheus Integration</td>
          <td className="px-4 py-3 text-yellow-400">~ Manual</td>
          <td className="px-4 py-3 text-yellow-400">~ Manual</td>
          <td className="px-4 py-3 text-green-400">✓ Pre-built queries</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-orange-300">Replication Health</td>
          <td className="px-4 py-3 text-slate-300">pg_stat_replication</td>
          <td className="px-4 py-3 text-slate-300">Lag bytes/seconds, WAL position, state</td>
          <td className="px-4 py-3 text-slate-300">Lag alerts, replication monitoring</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-pink-300">Connection Stats</td>
          <td className="px-4 py-3 text-slate-300">pg_stat_activity</td>
          <td className="px-4 py-3 text-slate-300">Active, idle, idle-in-transaction counts</td>
          <td className="px-4 py-3 text-slate-300">Connection leak detection</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-red-300">Lock Analysis</td>
          <td className="px-4 py-3 text-slate-300">pg_locks</td>
          <td className="px-4 py-3 text-slate-300">Lock types, blocking queries, wait times</td>
          <td className="px-4 py-3 text-slate-300">Deadlock prevention insights</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-yellow-300">Vacuum Monitoring</td>
          <td className="px-4 py-3 text-slate-300">pg_stat_progress_vacuum</td>
          <td className="px-4 py-3 text-slate-300">Progress, tuples, phases, duration</td>
          <td className="px-4 py-3 text-slate-300">Autovacuum optimization</td>
        </tr>
      </tbody>
    </table>
    </div>
    ),
  },
  useCases: [
    {
      title: 'Query Optimization',
      description: 'Identify slow queries, analyze execution patterns, and get recommendations for query rewrites and index creation.',
      icon: <Target className="w-8 h-8" />,
    },
    {
      title: 'Capacity Planning',
      description: 'Monitor table growth, analyze disk usage trends, and forecast future storage needs based on historical data.',
      icon: <BarChart3 className="w-8 h-8" />,
    },
    {
      title: 'Performance Troubleshooting',
      description: 'Quickly identify bottlenecks, analyze lock contention, and diagnose replication issues with detailed metrics.',
      icon: <AlertTriangle className="w-8 h-8" />,
    },
    {
      title: 'Production Monitoring',
      description: 'Continuous monitoring of query performance, table health, and system resources with automatic alerting.',
      icon: <Activity className="w-8 h-8" />,
    },
  ],
  codeExamples: [
    {
      title: 'Install PostgreSQL Extensions',
      code: `-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
CREATE EXTENSION IF NOT EXISTS pg_stat_kcache;
CREATE EXTENSION IF NOT EXISTS pg_qualstats;
CREATE EXTENSION IF NOT EXISTS pg_buffercache;

-- Verify installations
SELECT * FROM pg_available_extensions 
WHERE name LIKE 'pg_stat%' OR name LIKE 'pg_%cache';

-- Configure pg_stat_statements
ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_statements';
ALTER SYSTEM SET pg_stat_statements.track = 'all';
ALTER SYSTEM SET pg_stat_statements.max = 10000;

-- Reload configuration
SELECT pg_reload_conf();`,
      language: 'sql',
    },
    {
      title: 'Query Top Slow Queries',
      code: `-- Get top 10 slowest queries
SELECT 
    query,
    calls,
    mean_exec_time / 1000 as avg_seconds,
    total_exec_time / 1000 as total_seconds,
    100.0 * shared_blks_hit / NULLIF(shared_blks_hit + shared_blks_read, 0) as cache_hit_pct
FROM pg_stat_statements
WHERE mean_exec_time > 1000  -- > 1 second
ORDER BY mean_exec_time DESC
LIMIT 10;

-- Analyze query patterns
SELECT 
    LEFT(query, 50) as query_preview,
    calls,
    rows,
    100.0 * rows / NULLIF(calls, 0) as rows_per_call
FROM pg_stat_statements
ORDER BY calls DESC
LIMIT 20;`,
      language: 'sql',
    },
    {
      title: 'Analyze Table Bloat',
      code: `-- Detect table bloat
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as total_size,
    n_live_tup,
    n_dead_tup,
    ROUND(100 * n_dead_tup::numeric / NULLIF(n_live_tup + n_dead_tup, 0), 2) as dead_tuple_pct,
    last_vacuum,
    last_autovacuum
FROM pg_stat_user_tables
WHERE n_dead_tup > 1000
ORDER BY n_dead_tup DESC
LIMIT 20;

-- Index usage analysis
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan as scans,
    idx_tup_read as tuples_read,
    idx_tup_fetch as tuples_fetched,
    pg_size_pretty(pg_relation_size(indexrelid)) as size
FROM pg_stat_user_indexes
WHERE idx_scan = 0  -- Unused indexes
ORDER BY pg_relation_size(indexrelid) DESC;`,
      language: 'sql',
    },
    {
      title: 'API Integration',
      code: `from pg_stat_insights import PgStatInsights
import asyncio

async def analyze_database():
    # Initialize pg_stat_insights
    insights = PgStatInsights(
        'postgresql://user:pass@localhost:5432/mydb'
    )
    await insights.connect()
    
    # Get comprehensive dashboard
    dashboard = await insights.get_complete_dashboard()
    
    print(f"Cache Hit Ratio: {dashboard['cache_hit_ratio']}%")
    print(f"Total Queries: {dashboard['total_queries']}")
    print(f"Slow Queries: {len(dashboard['slow_queries'])}")
    
    # Get query insights
    queries = await insights.get_query_insights(limit=10)
    for q in queries:
        if q['mean_exec_time'] > 1000:  # > 1 second
            print(f"Slow Query: {q['query'][:50]}...")
            print(f"  Avg Time: {q['mean_exec_time']}ms")
            print(f"  Calls: {q['calls']}")
    
    # Get table statistics
    tables = await insights.get_table_stats()
    for t in tables:
        bloat_pct = t.get('bloat_percentage', 0)
        if bloat_pct > 20:
            print(f"Bloated Table: {t['table_name']}")
            print(f"  Bloat: {bloat_pct}%")
            print(f"  Recommendation: VACUUM FULL")
    
    # Get recommendations
    recs = await insights.get_recommendations()
    for rec in recs:
        print(f"{rec['severity']}: {rec['recommendation']}")
    
    await insights.close()

asyncio.run(analyze_database())`,
      language: 'python',
    },
  ],
  documentation: [
    { title: 'Getting Started', path: '/docs/pg-stat-insights/getting-started' },
    { title: 'Query Analytics', path: '/docs/pg-stat-insights/query-analytics' },
    { title: 'Table & Index Analysis', path: '/docs/pg-stat-insights/table-index' },
    { title: 'Cache Monitoring', path: '/docs/pg-stat-insights/cache' },
    { title: 'Replication Insights', path: '/docs/pg-stat-insights/replication' },
    { title: 'API Reference', path: '/docs/pg-stat-insights/api' },
    { title: 'pgSentinel Integration', path: '/pgsentinel' },
    { title: 'Best Practices', path: '/docs/pg-stat-insights/best-practices' },
  ],
  comparison: {
    title: 'Why pg_stat_insights?',
    description: 'PostgreSQL analytics in a single package',
    items: [
      {
        feature: 'Query Analytics',
        pgsentinel: '✅ Complete pg_stat_statements analysis',
        alternative: '⚠️ Manual query monitoring',
      },
      {
        feature: 'Table Statistics',
        pgsentinel: '✅ Bloat detection & recommendations',
        alternative: '⚠️ Manual bloat calculation',
      },
      {
        feature: 'Index Analysis',
        pgsentinel: '✅ Usage tracking & missing index detection',
        alternative: '❌ No automated analysis',
      },
      {
        feature: 'Cache Monitoring',
        pgsentinel: '✅ Real-time hit ratios & optimization',
        alternative: '⚠️ Basic pg_stat_database only',
      },
      {
        feature: 'Replication Insights',
        pgsentinel: '✅ Lag monitoring across all replicas',
        alternative: '⚠️ Manual lag checking',
      },
      {
        feature: 'Recommendations',
        pgsentinel: '✅ Intelligent, actionable suggestions',
        alternative: '❌ No automated recommendations',
      },
      {
        feature: 'API Access',
        pgsentinel: '✅ RESTful API with Python/TypeScript',
        alternative: '❌ SQL queries only',
      },
      {
        feature: 'Integration',
        pgsentinel: '✅ Built into pgSentinel dashboard',
        alternative: '⚠️ Separate tools required',
      },
    ],
  },
  architecture: (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 font-mono text-sm">
      <div className="text-center mb-6">
        <div className="text-cyan-400 text-lg font-semibold mb-2">pg_stat_insights Architecture</div>
        <div className="text-slate-400 text-xs">Multi-Source Analytics Engine</div>
      </div>
      
      <div className="space-y-4">
        {/* Data Collection Layer */}
        <div className="border border-blue-500/30 bg-blue-900/10 rounded-lg p-4">
          <div className="text-blue-300 font-semibold mb-2">PostgreSQL Extensions</div>
          <div className="pl-4 space-y-1 text-slate-400 text-xs">
            <div>• pg_stat_statements - Query statistics</div>
            <div>• pg_stat_kcache - Kernel cache metrics</div>
            <div>• pg_qualstats - Predicate statistics</div>
            <div>• pg_buffercache - Buffer cache analysis</div>
          </div>
        </div>
        
        {/* System Catalogs */}
        <div className="border border-purple-500/30 bg-purple-900/10 rounded-lg p-4">
          <div className="text-purple-300 font-semibold mb-2">System Catalogs</div>
          <div className="pl-4 space-y-1 text-slate-400 text-xs">
            <div>• pg_stat_user_tables - Table statistics</div>
            <div>• pg_stat_user_indexes - Index usage</div>
            <div>• pg_stat_database - Database metrics</div>
            <div>• pg_stat_replication - Replication stats</div>
            <div>• pg_stat_activity - Connection data</div>
            <div>• pg_locks - Lock information</div>
          </div>
        </div>
        
        {/* Analytics Engine */}
        <div className="border border-green-500/30 bg-green-900/10 rounded-lg p-4">
          <div className="text-green-300 font-semibold mb-2">Analytics Engine</div>
          <div className="pl-4 space-y-1 text-slate-400 text-xs">
            <div>• Python asyncpg connector</div>
            <div>• Query complexity analysis</div>
            <div>• Pattern recognition algorithms</div>
            <div>• Recommendation engine</div>
          </div>
        </div>
        
        {/* Output Layer */}
        <div className="border border-orange-500/30 bg-orange-900/10 rounded-lg p-4">
          <div className="text-orange-300 font-semibold mb-2">Output & Integration</div>
          <div className="pl-4 space-y-1 text-slate-400 text-xs">
            <div>• REST API endpoints</div>
            <div>• Prometheus metrics export</div>
            <div>• Grafana dashboard integration</div>
            <div>• Real-time WebSocket updates</div>
          </div>
        </div>
      </div>
    </div>
  ),
  performance: {
    kicker: 'Analytics at Scale',
    metrics: [
      { label: 'Query Analysis Time', value: '<100ms', color: 'text-blue-400' },
      { label: 'Metrics Collection', value: 'Every 5s', color: 'text-green-400' },
      { label: 'Data Sources', value: '10+', color: 'text-cyan-400' },
      { label: 'Tracked Metrics', value: '50+', color: 'text-purple-400' },
      { label: 'API Response Time', value: '<50ms', color: 'text-orange-400' },
      { label: 'Historical Data', value: 'Unlimited', color: 'text-pink-400' },
    ],
  },
  installation: {
    title: 'Enable in Minutes',
    description: 'Add analytics to your PostgreSQL database',
    steps: [
      'Install PostgreSQL extensions (pg_stat_statements, etc.)',
      'Configure shared_preload_libraries',
      'Restart PostgreSQL server',
      'Access via pgSentinel dashboard',
      'View insights at http://localhost:3000/insights',
      'Query via API at http://localhost:8000/api/v1/insights/*',
    ],
  },
  ctaSection: {
    kicker: 'Get Started',
    title: 'Monitor PostgreSQL Performance',
    description: 'Install pg_stat_insights and track 52 metrics across 11 pre-built views to identify slow queries, optimize cache performance, and monitor database health.',
    primaryCTA: { href: '/docs/pg-stat-insights/getting-started', label: 'View Documentation' },
    secondaryCTA: { href: 'https://github.com/pgElephant/pg_stat_insights', label: 'View on GitHub', external: true },
  },
};

export default function PgStatInsightsPage() {
  return <ProductPageTemplate {...pgStatInsightsConfig} />;
}

