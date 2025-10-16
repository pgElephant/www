import React from 'react';
import ProjectTemplate from '../_components/ProjectTemplate';
import { Metadata } from 'next';
import { 
  TrendingUp, Database, Zap, Target, Eye, AlertTriangle,
  BarChart3, PieChart, Activity, Clock, Lock, HardDrive,
  Search, CheckCircle, FileText, Layers
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'pg_stat_insights - Deep PostgreSQL Performance Analytics | Query Optimization & Database Intelligence',
  description: 'pg_stat_insights provides comprehensive PostgreSQL performance analytics with query statistics, table/index analysis, cache hit ratios, replication monitoring, and intelligent optimization recommendations. Deep insights into database performance for production PostgreSQL.',
  keywords: [
    // Primary keywords
    'pg_stat_insights', 'PostgreSQL performance analytics', 'database performance monitoring',
    'query optimization', 'PostgreSQL insights', 'database analytics',
    
    // Technical keywords
    'pg_stat_statements', 'PostgreSQL query analysis', 'table statistics', 'index usage analysis',
    'cache hit ratio', 'replication lag monitoring', 'PostgreSQL metrics',
    
    // Feature keywords
    'slow query detection', 'query performance tuning', 'table bloat analysis', 'index recommendations',
    'vacuum monitoring', 'lock analysis', 'connection statistics', 'database health monitoring',
    
    // Integration keywords
    'Prometheus PostgreSQL metrics', 'Grafana PostgreSQL', 'PostgreSQL extensions',
    'pg_buffercache', 'pg_stat_kcache', 'pg_qualstats',
    
    // Use case keywords
    'database performance tuning', 'PostgreSQL optimization', 'production database monitoring',
    'query optimization recommendations', 'database health checks', 'performance troubleshooting'
  ].join(', '),
  authors: [
    { name: 'pgElephant Team', url: 'https://www.pgelephant.com' }
  ],
  category: 'Database Analytics Software',
  classification: 'Database Tools',
  openGraph: {
    title: 'pg_stat_insights - Deep PostgreSQL Performance Analytics',
    description: 'Comprehensive PostgreSQL performance analytics with query optimization, table/index analysis, and intelligent recommendations for production databases.',
    type: 'website',
    url: 'https://www.pgelephant.com/pg-stat-insights',
    siteName: 'pgElephant',
    images: [
      {
        url: 'https://www.pgelephant.com/og-pg-stat-insights.jpg',
        width: 1200,
        height: 630,
        alt: 'pg_stat_insights - PostgreSQL Performance Analytics',
        type: 'image/jpeg',
      }
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@pgElephant',
    creator: '@pgElephant',
    title: 'pg_stat_insights - Deep PostgreSQL Performance Analytics',
    description: 'Comprehensive performance analytics with query optimization, table/index analysis, and intelligent recommendations.',
    images: [
      {
        url: 'https://www.pgelephant.com/twitter-pg-stat-insights.jpg',
        alt: 'pg_stat_insights - PostgreSQL Analytics',
        width: 1200,
        height: 600,
      }
    ],
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  alternates: {
    canonical: 'https://www.pgelephant.com/pg-stat-insights',
    types: {
      'application/rss+xml': 'https://www.pgelephant.com/blog/rss.xml',
    },
  },
};

// Custom pg_stat_insights icon component
const PgStatInsightsIcon = ({ size = 80 }: { size?: number }) => (
  <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
    <Database className="text-blue-500" style={{ width: size * 0.6, height: size * 0.6 }} />
    <TrendingUp className="text-green-400 absolute -top-2 -right-2 animate-pulse" style={{ width: size * 0.35, height: size * 0.35, animationDelay: '0.2s' }} />
    <BarChart3 className="text-purple-400 absolute -bottom-2 -left-2 animate-pulse" style={{ width: size * 0.3, height: size * 0.3, animationDelay: '0.4s' }} />
    <Eye className="text-cyan-400 absolute top-0 left-0 animate-pulse" style={{ width: size * 0.25, height: size * 0.25, animationDelay: '0.6s' }} />
    <Zap className="text-yellow-400 absolute -bottom-2 -right-2" style={{ width: size * 0.25, height: size * 0.25 }} />
  </div>
);

const pgStatInsightsConfig = {
  hero: {
    title: 'pg_stat_insights: Deep PostgreSQL Performance Analytics',
    subtitle: 'Comprehensive Database Intelligence with Query Optimization & Intelligent Recommendations',
    projectName: 'pg_stat_insights',
    icon: <PgStatInsightsIcon size={80} />,
  },
  badges: [
    'Query Analytics',
    'Table Statistics',
    'Index Analysis',
    'Cache Monitoring',
    'Replication Insights',
    'Bloat Detection',
    'Lock Analysis',
    'Recommendations',
  ],
  demo: (
    <div className="bg-slate-900 rounded-xl p-6 shadow-2xl border border-slate-700">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-700">
        <TrendingUp className="w-5 h-5 text-green-400" />
        <span className="text-green-400 font-semibold">pg_stat_insights Dashboard</span>
        <span className="ml-auto text-xs text-slate-400">Live Analytics</span>
      </div>
      
      <div className="space-y-4 font-mono text-sm">
        {/* Query Insights */}
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
          <div className="text-cyan-300 mb-3 flex items-center gap-2">
            <Search className="w-4 h-4" />
            <span>Top Slow Queries</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">SELECT * FROM large_table WHERE ...</span>
              <span className="text-red-400">2.4s avg</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">UPDATE orders SET status = ...</span>
              <span className="text-orange-400">1.8s avg</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">SELECT COUNT(*) FROM events ...</span>
              <span className="text-yellow-400">1.2s avg</span>
            </div>
          </div>
        </div>
        
        {/* Performance Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-900/20 border border-blue-700/30 p-3 rounded">
            <div className="text-blue-300 text-xs mb-1">Cache Hit Ratio</div>
            <div className="text-2xl font-bold text-blue-400">98.7%</div>
          </div>
          <div className="bg-green-900/20 border border-green-700/30 p-3 rounded">
            <div className="text-green-300 text-xs mb-1">Total Queries</div>
            <div className="text-2xl font-bold text-green-400">1.2M</div>
          </div>
          <div className="bg-purple-900/20 border border-purple-700/30 p-3 rounded">
            <div className="text-purple-300 text-xs mb-1">Active Connections</div>
            <div className="text-2xl font-bold text-purple-400">127</div>
          </div>
          <div className="bg-orange-900/20 border border-orange-700/30 p-3 rounded">
            <div className="text-orange-300 text-xs mb-1">Replication Lag</div>
            <div className="text-2xl font-bold text-orange-400">0.2s</div>
          </div>
        </div>
        
        {/* Recommendations */}
        <div className="bg-green-900/20 border border-green-700/30 p-4 rounded-lg">
          <div className="text-green-300 mb-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span className="font-semibold">Optimization Recommendations</span>
          </div>
          <div className="space-y-2 text-xs text-slate-400">
            <div>• Create index on users.email (80% queries)</div>
            <div>• Vacuum table orders (15% bloat detected)</div>
            <div>• Consider partitioning events table (50M rows)</div>
          </div>
        </div>
      </div>
    </div>
  ),
  features: [
    { icon: '🔍', iconColor: 'text-blue-500', title: 'Query Insights', desc: 'Detailed statistics from pg_stat_statements including execution times, call counts, and query patterns with automatic slow query detection.' },
    { icon: '📊', iconColor: 'text-purple-500', title: 'Table Statistics', desc: 'Comprehensive table-level metrics including row counts, live/dead tuples, bloat detection, and sequential vs index scan ratios.' },
    { icon: '🎯', iconColor: 'text-green-500', title: 'Index Analysis', desc: 'Index usage statistics, scan counts, size tracking, and recommendations for missing or unused indexes.' },
    { icon: '💾', iconColor: 'text-cyan-500', title: 'Cache Monitoring', desc: 'Buffer cache hit ratios, shared buffer usage, and cache efficiency analysis with optimization suggestions.' },
    { icon: '🔄', iconColor: 'text-orange-500', title: 'Replication Insights', desc: 'Real-time replication lag monitoring, WAL sender/receiver stats, and streaming replication health analysis.' },
    { icon: '🗑️', iconColor: 'text-pink-500', title: 'Bloat Detection', desc: 'Automatic detection of table and index bloat with size impact analysis and vacuum recommendations.' },
    { icon: '🔒', iconColor: 'text-red-500', title: 'Lock Analysis', desc: 'Active lock monitoring, blocking query detection, and lock type analysis for deadlock prevention.' },
    { icon: '💡', iconColor: 'text-yellow-500', title: 'Smart Recommendations', desc: 'Intelligent optimization suggestions based on query patterns, table usage, and performance bottlenecks.' },
    { icon: '📈', iconColor: 'text-indigo-500', title: 'Trend Analysis', desc: 'Historical performance trends with time-series data for capacity planning and anomaly detection.' },
  ],
  featurePillars: {
    kicker: 'Complete Database Analytics',
    items: [
      { title: 'Query Performance Analytics', desc: 'Leverage pg_stat_statements to identify slow queries, analyze execution patterns, and track query performance over time. Automatic detection of queries exceeding thresholds with detailed statistics.' },
      { title: 'Table & Index Insights', desc: 'Monitor table growth, detect bloat, analyze vacuum effectiveness, and track index usage. Get recommendations for missing indexes and identify unused indexes consuming space.' },
      { title: 'Cache Efficiency Analysis', desc: 'Track buffer cache hit ratios, analyze cache effectiveness, and optimize shared_buffers configuration. Detect cache misses and recommend memory adjustments.' },
      { title: 'Replication Monitoring', desc: 'Real-time lag detection across all replicas, WAL sender/receiver monitoring, and streaming replication health checks with automatic alerting for lag spikes.' },
      { title: 'Connection Statistics', desc: 'Monitor active, idle, and idle-in-transaction connections. Detect connection leaks, analyze connection patterns, and optimize max_connections settings.' },
      { title: 'Lock & Bloat Detection', desc: 'Identify blocking queries, analyze lock types, detect table/index bloat, and recommend maintenance operations like VACUUM or REINDEX.' },
      { title: 'Vacuum Analytics', desc: 'Track autovacuum progress, analyze vacuum effectiveness, detect vacuum candidates, and optimize autovacuum settings for better performance.' },
      { title: 'Intelligent Recommendations', desc: 'Get actionable insights powered by pattern analysis including index suggestions, vacuum recommendations, configuration optimizations, and query rewrites.' },
    ],
  },
  featureMatrix: (
    <table className="w-full text-sm border border-slate-700 rounded-lg overflow-hidden">
      <thead className="bg-slate-800/60">
        <tr className="text-left">
          <th className="px-4 py-3 font-semibold text-white">Analytics Category</th>
          <th className="px-4 py-3 font-semibold text-white">Data Sources</th>
          <th className="px-4 py-3 font-semibold text-white">Key Metrics</th>
          <th className="px-4 py-3 font-semibold text-white">Output</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-700 bg-slate-800/40">
        <tr>
          <td className="px-4 py-3 font-medium text-blue-300">Query Analytics</td>
          <td className="px-4 py-3 text-slate-300">pg_stat_statements</td>
          <td className="px-4 py-3 text-slate-300">Execution time, calls, rows, cache hits</td>
          <td className="px-4 py-3 text-slate-300">Slow query list, performance trends</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-purple-300">Table Statistics</td>
          <td className="px-4 py-3 text-slate-300">pg_stat_user_tables</td>
          <td className="px-4 py-3 text-slate-300">Rows, scans, tuples, bloat percentage</td>
          <td className="px-4 py-3 text-slate-300">Bloat analysis, vacuum recommendations</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-green-300">Index Usage</td>
          <td className="px-4 py-3 text-slate-300">pg_stat_user_indexes</td>
          <td className="px-4 py-3 text-slate-300">Scans, tuples, size, usage patterns</td>
          <td className="px-4 py-3 text-slate-300">Missing/unused index recommendations</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">Cache Efficiency</td>
          <td className="px-4 py-3 text-slate-300">pg_stat_database, pg_buffercache</td>
          <td className="px-4 py-3 text-slate-300">Hit ratio, blocks read/hit, cache usage</td>
          <td className="px-4 py-3 text-slate-300">Memory optimization suggestions</td>
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
  ),
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
    description: 'Comprehensive PostgreSQL analytics in a single integrated package',
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
    description: 'Add comprehensive analytics to your PostgreSQL database',
    steps: [
      'Install PostgreSQL extensions (pg_stat_statements, etc.)',
      'Configure shared_preload_libraries',
      'Restart PostgreSQL server',
      'Access via pgSentinel dashboard',
      'View insights at http://localhost:3000/insights',
      'Query via API at http://localhost:8000/api/v1/insights/*',
    ],
  },
};

export default function PgStatInsightsPage() {
  return (
    <>
      <ProjectTemplate {...pgStatInsightsConfig} />
    </>
  );
}

