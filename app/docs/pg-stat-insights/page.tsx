import React from 'react';
import { Metadata } from 'next';
import { 
  TrendingUp, Database, Zap, Target, Eye, AlertTriangle,
  BarChart3, PieChart, Activity, Clock, Lock, HardDrive,
  Search, CheckCircle, FileText, Layers, BookOpen, Code, Network, Users
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'pg_stat_insights Documentation - Deep PostgreSQL Performance Analytics',
  description: 'Complete documentation for pg_stat_insights - comprehensive PostgreSQL performance analytics with query optimization, table/index analysis, cache monitoring, and intelligent recommendations.',
  keywords: [
    'pg_stat_insights documentation', 'PostgreSQL performance analytics', 'query optimization',
    'database performance monitoring', 'pg_stat_statements', 'table statistics', 'index analysis',
    'cache hit ratio', 'replication monitoring', 'PostgreSQL insights'
  ].join(', '),
  openGraph: {
    title: 'pg_stat_insights Documentation - PostgreSQL Performance Analytics',
    description: 'Complete documentation for pg_stat_insights performance analytics.',
    type: 'website',
    url: 'https://www.pgelephant.com/docs/pg-stat-insights',
    siteName: 'pgElephant',
  },
};

const PgStatInsightsDocsPage = () => {
  const sections = [
    {
      title: 'Getting Started',
      description: 'Installation and basic setup of pg_stat_insights',
      icon: <Zap className="w-6 h-6" />,
      href: '/docs/pg-stat-insights/getting-started',
      features: ['Extension installation', 'Configuration', 'First insights', 'Basic queries']
    },
    {
      title: 'Query Analytics',
      description: 'Deep analysis of query performance and patterns',
      icon: <Search className="w-6 h-6" />,
      href: '/docs/pg-stat-insights/query-analytics',
      features: ['Slow query detection', 'Execution patterns', 'Query optimization', 'Performance trends']
    },
    {
      title: 'Table & Index Analysis',
      description: 'Comprehensive table and index usage statistics',
      icon: <HardDrive className="w-6 h-6" />,
      href: '/docs/pg-stat-insights/table-index',
      features: ['Bloat detection', 'Index usage', 'Missing indexes', 'Vacuum recommendations']
    },
    {
      title: 'Cache Monitoring',
      description: 'Buffer cache efficiency and optimization',
      icon: <Activity className="w-6 h-6" />,
      href: '/docs/pg-stat-insights/cache',
      features: ['Hit ratios', 'Cache usage', 'Memory optimization', 'Performance tuning']
    },
    {
      title: 'Replication Insights',
      description: 'Real-time replication monitoring and analysis',
      icon: <Network className="w-6 h-6" />,
      href: '/docs/pg-stat-insights/replication',
      features: ['Lag monitoring', 'WAL analysis', 'Health checks', 'Failover insights']
    },
    {
      title: 'API Reference',
      description: 'Complete API documentation and examples',
      icon: <Code className="w-6 h-6" />,
      href: '/docs/pg-stat-insights/api',
      features: ['REST endpoints', 'Python client', 'WebSocket API', 'Integration examples']
    },
    {
      title: 'Best Practices',
      description: 'Optimization strategies and recommendations',
      icon: <CheckCircle className="w-6 h-6" />,
      href: '/docs/pg-stat-insights/best-practices',
      features: ['Performance tuning', 'Monitoring setup', 'Alert configuration', 'Maintenance']
    }
  ];

  const analytics = [
    {
      category: 'Query Performance',
      icon: <Search className="w-8 h-8 text-blue-500" />,
      metrics: ['Execution time', 'Call counts', 'Rows processed', 'Cache hits'],
      description: 'Comprehensive analysis of query execution patterns and performance bottlenecks'
    },
    {
      category: 'Table Statistics',
      icon: <HardDrive className="w-8 h-8 text-green-500" />,
      metrics: ['Row counts', 'Bloat percentage', 'Scan ratios', 'Vacuum stats'],
      description: 'Detailed table-level metrics for storage optimization and maintenance planning'
    },
    {
      category: 'Index Usage',
      icon: <Target className="w-8 h-8 text-purple-500" />,
      metrics: ['Scan counts', 'Usage patterns', 'Size tracking', 'Efficiency ratios'],
      description: 'Index utilization analysis and recommendations for optimization'
    },
    {
      category: 'Cache Efficiency',
      icon: <Activity className="w-8 h-8 text-cyan-500" />,
      metrics: ['Hit ratios', 'Buffer usage', 'Cache misses', 'Memory stats'],
      description: 'Buffer cache performance monitoring and memory optimization insights'
    },
    {
      category: 'Replication Health',
      icon: <Network className="w-8 h-8 text-orange-500" />,
      metrics: ['Lag times', 'WAL position', 'Sync status', 'Health scores'],
      description: 'Real-time replication monitoring across all standby servers'
    },
    {
      category: 'Connection Stats',
      icon: <Users className="w-8 h-8 text-pink-500" />,
      metrics: ['Active connections', 'Idle sessions', 'Lock analysis', 'Wait events'],
      description: 'Connection monitoring and lock contention analysis'
    }
  ];

  const dataSources = [
    {
      extension: 'pg_stat_statements',
      purpose: 'Query execution statistics',
      metrics: ['Execution time', 'Call counts', 'Rows', 'Buffer hits'],
      status: 'Required'
    },
    {
      extension: 'pg_stat_kcache',
      purpose: 'Kernel cache metrics',
      metrics: ['CPU time', 'System time', 'I/O time', 'Cache usage'],
      status: 'Optional'
    },
    {
      extension: 'pg_qualstats',
      purpose: 'Predicate statistics',
      metrics: ['Qual usage', 'Predicate frequency', 'Index usage', 'Filter stats'],
      status: 'Optional'
    },
    {
      extension: 'pg_buffercache',
      purpose: 'Buffer cache analysis',
      metrics: ['Cache usage', 'Buffer hits', 'Page stats', 'Memory usage'],
      status: 'Optional'
    },
    {
      catalog: 'pg_stat_user_tables',
      purpose: 'Table-level statistics',
      metrics: ['Row counts', 'Scans', 'Tuples', 'Bloat data'],
      status: 'Built-in'
    },
    {
      catalog: 'pg_stat_user_indexes',
      purpose: 'Index usage statistics',
      metrics: ['Scan counts', 'Tuples', 'Size', 'Usage patterns'],
      status: 'Built-in'
    },
    {
      catalog: 'pg_stat_replication',
      purpose: 'Replication monitoring',
      metrics: ['Lag times', 'WAL position', 'Sync status', 'Health'],
      status: 'Built-in'
    },
    {
      catalog: 'pg_stat_activity',
      purpose: 'Connection monitoring',
      metrics: ['Active sessions', 'Query states', 'Wait events', 'Locks'],
      status: 'Built-in'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Database className="w-20 h-20 text-blue-500" />
                <TrendingUp className="w-8 h-8 text-green-400 absolute -top-2 -right-2 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <BarChart3 className="w-8 h-8 text-purple-400 absolute -bottom-2 -left-2 animate-pulse" style={{ animationDelay: '0.4s' }} />
                <Eye className="w-6 h-6 text-cyan-400 absolute top-0 left-0 animate-pulse" style={{ animationDelay: '0.6s' }} />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              pg_stat_insights
              <span className="block text-3xl md:text-4xl text-cyan-300 font-light mt-2">
                Documentation
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Complete guide to deep PostgreSQL performance analytics. Query optimization, 
              table/index analysis, cache monitoring, and intelligent recommendations for production databases.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-blue-500/20 border border-blue-500/30 px-4 py-2 rounded-lg text-blue-300">
                <Search className="w-4 h-4 inline mr-2" />
                Query Analytics
              </div>
              <div className="bg-green-500/20 border border-green-500/30 px-4 py-2 rounded-lg text-green-300">
                <HardDrive className="w-4 h-4 inline mr-2" />
                Table Statistics
              </div>
              <div className="bg-purple-500/20 border border-purple-500/30 px-4 py-2 rounded-lg text-purple-300">
                <Target className="w-4 h-4 inline mr-2" />
                Index Analysis
              </div>
              <div className="bg-cyan-500/20 border border-cyan-500/30 px-4 py-2 rounded-lg text-cyan-300">
                <Activity className="w-4 h-4 inline mr-2" />
                Cache Monitoring
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Documentation Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Documentation Sections</h2>
          <p className="text-slate-300 text-lg">Everything you need to master PostgreSQL performance analytics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <a
              key={index}
              href={section.href}
              className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:bg-slate-700/50 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  {section.icon}
                </div>
                <h3 className="text-xl font-semibold text-white ml-3 group-hover:text-cyan-300 transition-colors">
                  {section.title}
                </h3>
              </div>
              <p className="text-slate-300 mb-4 group-hover:text-slate-200 transition-colors">
                {section.description}
              </p>
              <ul className="space-y-1">
                {section.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-sm text-slate-400 flex items-center">
                    <CheckCircle className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </a>
          ))}
        </div>
      </div>

      {/* Analytics Categories */}
      <div className="bg-slate-800/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Analytics Categories</h2>
            <p className="text-slate-300 text-lg">Comprehensive performance insights across all database aspects</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {analytics.map((category, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-xl p-8">
                <div className="flex items-start mb-6">
                  <div className="flex-shrink-0">
                    {category.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {category.category}
                    </h3>
                    <p className="text-slate-300">
                      {category.description}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {category.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="bg-slate-800/50 px-3 py-2 rounded-lg text-sm text-slate-300">
                      {metric}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Sources */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Data Sources</h2>
          <p className="text-slate-300 text-lg">PostgreSQL extensions and system catalogs for comprehensive analytics</p>
        </div>

        <div className="bg-slate-900/50 border border-slate-700 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/60">
                <tr>
                  <th className="px-6 py-4 text-left text-white font-semibold">Source</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Purpose</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Key Metrics</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {dataSources.map((source, index) => (
                  <tr key={index} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-mono text-sm text-blue-300">
                        {source.extension || source.catalog}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {source.purpose}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {source.metrics.slice(0, 3).map((metric, metricIndex) => (
                          <span
                            key={metricIndex}
                            className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs"
                          >
                            {metric}
                          </span>
                        ))}
                        {source.metrics.length > 3 && (
                          <span className="text-slate-400 text-xs">
                            +{source.metrics.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        source.status === 'Required' 
                          ? 'bg-red-500/20 text-red-300' 
                          : source.status === 'Optional'
                          ? 'bg-yellow-500/20 text-yellow-300'
                          : 'bg-green-500/20 text-green-300'
                      }`}>
                        {source.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Start */}
      <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Quick Start</h2>
          <p className="text-slate-300 text-lg mb-8">
            Enable pg_stat_insights in your PostgreSQL database
          </p>
          
          <div className="bg-slate-900 rounded-xl p-8 text-left">
            <div className="flex items-center mb-4">
              <Code className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-green-400 font-semibold">SQL Commands</span>
            </div>
            <div className="space-y-4 font-mono text-sm">
              <div className="text-slate-300">
                <span className="text-cyan-400">--</span> Enable required extensions
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="text-slate-300">CREATE EXTENSION IF NOT EXISTS pg_stat_statements;</div>
                <div className="text-slate-300">CREATE EXTENSION IF NOT EXISTS pg_stat_kcache;</div>
                <div className="text-slate-300">CREATE EXTENSION IF NOT EXISTS pg_qualstats;</div>
                <div className="text-slate-300">CREATE EXTENSION IF NOT EXISTS pg_buffercache;</div>
              </div>
              
              <div className="text-slate-300">
                <span className="text-cyan-400">--</span> Configure pg_stat_statements
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="text-slate-300">ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_statements';</div>
                <div className="text-slate-300">ALTER SYSTEM SET pg_stat_statements.track = 'all';</div>
                <div className="text-slate-300">ALTER SYSTEM SET pg_stat_statements.max = 10000;</div>
                <div className="text-slate-300">SELECT pg_reload_conf();</div>
              </div>
              
              <div className="text-slate-300">
                <span className="text-cyan-400">--</span> Access via pgSentinel
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="text-slate-300"># Dashboard: http://localhost:3000/insights</div>
                <div className="text-slate-300"># API: http://localhost:8000/api/v1/insights/*</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Start Analyzing Performance</h2>
          <p className="text-slate-300 text-lg mb-8">
            Dive deep into PostgreSQL performance with comprehensive analytics and intelligent recommendations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/docs/pg-stat-insights/getting-started"
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center"
            >
              <Zap className="w-5 h-5 mr-2" />
              Getting Started Guide
            </a>
            <a
              href="/pg-stat-insights"
              className="border border-cyan-500 text-cyan-300 hover:bg-cyan-500/10 px-8 py-3 rounded-lg font-semibold transition-colors flex items-center"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Product Overview
            </a>
            <a
              href="/docs/pg-stat-insights/api"
              className="border border-purple-500 text-purple-300 hover:bg-purple-500/10 px-8 py-3 rounded-lg font-semibold transition-colors flex items-center"
            >
              <Code className="w-5 h-5 mr-2" />
              API Reference
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PgStatInsightsDocsPage;
