import React from 'react';
import { Metadata } from 'next';
import { 
  Search, Database, TrendingUp, BarChart3, Clock, Zap, Eye, 
  AlertTriangle, CheckCircle, LineChart, Activity, Cpu, HardDrive,
  BookOpen, Code, Settings, Monitor, Download, Terminal, ArrowRight,
  Copy, Shield, Target, Filter, SortAsc, SortDesc
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'pg_stat_insights Query Analytics - Deep Query Performance Analysis',
  description: 'Complete guide to query analytics with pg_stat_insights. Identify slow queries, optimize performance, and monitor query patterns for PostgreSQL optimization.',
  keywords: [
    'PostgreSQL query analytics', 'query performance optimization', 'slow query analysis',
    'pg_stat_statements insights', 'query monitoring', 'database performance tuning'
  ].join(', '),
  openGraph: {
    title: 'pg_stat_insights Query Analytics - Deep Query Performance Analysis',
    description: 'Complete guide to query analytics with pg_stat_insights.',
    type: 'website',
    url: 'https://www.pgelephant.com/docs/pg-stat-insights/query-analytics',
    siteName: 'pgElephant',
  },
};

const PgStatInsightsQueryAnalyticsPage = () => {
  const queryMetrics = [
    {
      metric: 'Execution Time',
      description: 'Total and average time spent executing queries',
      icon: <Clock className="w-6 h-6" />,
      details: [
        'total_time: Total execution time across all calls',
        'avg_time: Average execution time per call',
        'min_time: Fastest execution time recorded',
        'max_time: Slowest execution time recorded'
      ],
      optimization: 'Focus on queries with high total_time and avg_time for maximum impact'
    },
    {
      metric: 'Call Frequency',
      description: 'How often queries are executed',
      icon: <Activity className="w-6 h-6" />,
      details: [
        'calls: Total number of times query was executed',
        'percentage_of_total: Percentage of all query calls',
        'calls_per_second: Average calls per second',
        'peak_calls: Highest call rate in any time period'
      ],
      optimization: 'Optimize frequently called queries even if individual execution time is low'
    },
    {
      metric: 'Row Processing',
      description: 'Data volume processed by queries',
      icon: <Database className="w-6 h-6" />,
      details: [
        'rows: Total rows returned across all calls',
        'avg_rows: Average rows returned per call',
        'rows_per_second: Rows processed per second',
        'blk_read_time: Time spent reading from disk'
      ],
      optimization: 'Look for queries processing large amounts of data inefficiently'
    },
    {
      metric: 'I/O Operations',
      description: 'Disk and memory I/O patterns',
      icon: <HardDrive className="w-6 h-6" />,
      details: [
        'shared_blks_hit: Blocks read from shared buffer cache',
        'shared_blks_read: Blocks read from disk',
        'local_blks_hit: Local buffer cache hits',
        'local_blks_read: Local buffer cache reads'
      ],
      optimization: 'Improve cache hit ratios to reduce disk I/O'
    }
  ];

  const queryCategories = [
    {
      category: 'Slow Queries',
      description: 'Queries taking longer than expected to execute',
      icon: <AlertTriangle className="w-6 h-6" />,
      threshold: '> 100ms average execution time',
      impact: 'High - Direct user experience impact',
      examples: [
        'Complex JOINs without proper indexes',
        'Queries scanning large tables',
        'Inefficient subqueries or CTEs',
        'Missing or outdated statistics'
      ],
      solutions: [
        'Add appropriate indexes',
        'Rewrite query logic',
        'Update table statistics',
        'Consider query optimization techniques'
      ]
    },
    {
      category: 'Frequent Queries',
      description: 'Queries executed very often',
      icon: <Activity className="w-6 h-6" />,
      threshold: '> 1000 calls per hour',
      impact: 'Medium - Resource consumption',
      examples: [
        'Authentication queries',
        'Session management queries',
        'Configuration lookups',
        'Health check queries'
      ],
      solutions: [
        'Implement query result caching',
        'Optimize query execution plan',
        'Consider connection pooling',
        'Review application query patterns'
      ]
    },
    {
      category: 'High I/O Queries',
      description: 'Queries causing excessive disk reads',
      icon: <HardDrive className="w-6 h-6" />,
      threshold: '> 50% disk reads vs cache hits',
      impact: 'High - System performance impact',
      examples: [
        'Full table scans',
        'Queries on cold data',
        'Missing indexes',
        'Insufficient shared_buffers'
      ],
      solutions: [
        'Add missing indexes',
        'Increase shared_buffers',
        'Implement data partitioning',
        'Optimize query filters'
      ]
    },
    {
      category: 'Resource Intensive',
      description: 'Queries consuming significant system resources',
      icon: <Cpu className="w-6 h-6" />,
      threshold: 'High CPU or memory usage',
      impact: 'High - System stability impact',
      examples: [
        'Complex analytical queries',
        'Large data aggregations',
        'Inefficient sorting operations',
        'Memory-intensive operations'
      ],
      solutions: [
        'Break down complex queries',
        'Use appropriate data types',
        'Implement query timeouts',
        'Consider materialized views'
      ]
    }
  ];

  const optimizationTechniques = [
    {
      technique: 'Index Optimization',
      description: 'Create and maintain optimal indexes',
      icon: <Target className="w-6 h-6" />,
      steps: [
        'Identify queries with high shared_blks_read',
        'Analyze WHERE clauses and JOIN conditions',
        'Create composite indexes for multi-column filters',
        'Monitor index usage with pg_stat_user_indexes',
        'Remove unused indexes to reduce maintenance overhead'
      ],
      code: `-- Analyze index usage
SELECT schemaname, tablename, indexname, idx_scan, idx_tup_read, idx_tup_fetch
FROM pg_stat_user_indexes 
WHERE idx_scan = 0  -- Unused indexes
ORDER BY pg_relation_size(indexrelid) DESC;

-- Create composite index
CREATE INDEX idx_users_email_status 
ON users(email, status) 
WHERE status = 'active';

-- Partial index for common filter
CREATE INDEX idx_orders_recent 
ON orders(created_at) 
WHERE created_at > '2024-01-01';`
    },
    {
      technique: 'Query Rewriting',
      description: 'Improve query structure and logic',
      icon: <Code className="w-6 h-6" />,
      steps: [
        'Replace subqueries with JOINs where possible',
        'Use EXISTS instead of IN for large datasets',
        'Avoid SELECT * and specify only needed columns',
        'Use appropriate data types to reduce storage',
        'Consider using window functions for analytical queries'
      ],
      code: `-- Instead of subquery
SELECT * FROM users 
WHERE id IN (SELECT user_id FROM orders WHERE status = 'completed');

-- Use JOIN
SELECT DISTINCT u.* FROM users u
JOIN orders o ON u.id = o.user_id 
WHERE o.status = 'completed';

-- Use EXISTS for better performance
SELECT * FROM users u
WHERE EXISTS (
    SELECT 1 FROM orders o 
    WHERE o.user_id = u.id AND o.status = 'completed'
);`
    },
    {
      technique: 'Statistics and Planning',
      description: 'Ensure optimal query planning',
      icon: <Settings className="w-6 h-6" />,
      steps: [
        'Keep table statistics up to date with ANALYZE',
        'Adjust statistics targets for large tables',
        'Use EXPLAIN ANALYZE to verify execution plans',
        'Consider query hints for complex scenarios',
        'Monitor and tune planner parameters'
      ],
      code: `-- Update statistics
ANALYZE users;
ANALYZE orders;

-- Increase statistics target for large table
ALTER TABLE large_table ALTER COLUMN important_column SET STATISTICS 1000;

-- Analyze query execution plan
EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT u.*, o.total 
FROM users u 
JOIN orders o ON u.id = o.user_id 
WHERE u.created_at > '2024-01-01';

-- Check for sequential scans
SELECT schemaname, tablename, seq_scan, seq_tup_read
FROM pg_stat_user_tables 
WHERE seq_scan > 0 
ORDER BY seq_tup_read DESC;`
    },
    {
      technique: 'Caching and Materialization',
      description: 'Reduce repeated computation',
      icon: <Zap className="w-6 h-6" />,
      steps: [
        'Implement application-level query caching',
        'Use materialized views for complex aggregations',
        'Consider query result caching in application',
        'Use prepared statements for repeated queries',
        'Implement connection pooling'
      ],
      code: `-- Create materialized view for complex aggregation
CREATE MATERIALIZED VIEW user_order_summary AS
SELECT 
    u.id,
    u.email,
    COUNT(o.id) as order_count,
    SUM(o.total) as total_spent,
    MAX(o.created_at) as last_order
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.email;

-- Refresh materialized view
REFRESH MATERIALIZED VIEW user_order_summary;

-- Create index on materialized view
CREATE INDEX idx_user_order_summary_email 
ON user_order_summary(email);`
    }
  ];

  const monitoringQueries = [
    {
      title: 'Top Slow Queries',
      description: 'Identify queries with highest execution times',
      icon: <Clock className="w-6 h-6" />,
      query: `SELECT 
    query,
    calls,
    total_time,
    mean_time,
    rows,
    100.0 * shared_blks_hit / nullif(shared_blks_hit + shared_blks_read, 0) AS hit_percent
FROM pg_stat_statements 
WHERE query NOT LIKE '%pg_stat_statements%'
ORDER BY mean_time DESC 
LIMIT 10;`
    },
    {
      title: 'Most Frequent Queries',
      description: 'Find queries executed most often',
      icon: <Activity className="w-6 h-6" />,
      query: `SELECT 
    query,
    calls,
    total_time,
    mean_time,
    (calls * 100.0 / SUM(calls) OVER()) AS percent_of_total
FROM pg_stat_statements 
WHERE query NOT LIKE '%pg_stat_statements%'
ORDER BY calls DESC 
LIMIT 10;`
    },
    {
      title: 'High I/O Queries',
      description: 'Queries causing most disk reads',
      icon: <HardDrive className="w-6 h-6" />,
      query: `SELECT 
    query,
    calls,
    shared_blks_read,
    shared_blks_hit,
    100.0 * shared_blks_read / nullif(shared_blks_hit + shared_blks_read, 0) AS read_percent
FROM pg_stat_statements 
WHERE shared_blks_read > 0
ORDER BY shared_blks_read DESC 
LIMIT 10;`
    },
    {
      title: 'Query Performance Trends',
      description: 'Track query performance over time',
      icon: <TrendingUp className="w-6 h-6" />,
      query: `SELECT 
    DATE_TRUNC('hour', now() - interval '1 hour' * generate_series(0, 23)) as hour,
    COUNT(*) as query_count,
    AVG(mean_time) as avg_execution_time,
    MAX(mean_time) as max_execution_time
FROM pg_stat_statements 
WHERE query NOT LIKE '%pg_stat_statements%'
GROUP BY hour
ORDER BY hour;`
    }
  ];

  const bestPractices = [
    {
      practice: 'Regular Monitoring',
      description: 'Establish consistent query performance monitoring',
      icon: <Eye className="w-6 h-6" />,
      details: [
        'Set up automated alerts for slow queries',
        'Review query performance reports weekly',
        'Monitor trends over time, not just current state',
        'Track both individual query performance and overall system health'
      ]
    },
    {
      practice: 'Baseline Establishment',
      description: 'Create performance baselines for comparison',
      icon: <Target className="w-6 h-6" />,
      details: [
        'Document normal query performance ranges',
        'Establish thresholds for different query types',
        'Track performance before and after changes',
        'Maintain historical performance data'
      ]
    },
    {
      practice: 'Incremental Optimization',
      description: 'Optimize queries systematically and safely',
      icon: <Zap className="w-6 h-6" />,
      details: [
        'Start with highest impact, lowest effort optimizations',
        'Test changes in development environment first',
        'Implement one optimization at a time',
        'Measure impact of each change'
      ]
    },
    {
      practice: 'Documentation and Knowledge',
      description: 'Maintain query performance knowledge base',
      icon: <BookOpen className="w-6 h-6" />,
      details: [
        'Document query optimization decisions',
        'Share knowledge with development team',
        'Create query performance guidelines',
        'Regular team training on database optimization'
      ]
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
                <Search className="w-16 h-16 text-cyan-500 animate-pulse" />
                <Database className="w-6 h-6 text-blue-400 absolute -top-1 -left-1 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <TrendingUp className="w-6 h-6 text-purple-400 absolute -top-1 -right-1" />
                <BarChart3 className="w-5 h-5 text-green-400 absolute -bottom-1 -right-1 animate-bounce" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Query Analytics
              <span className="block text-3xl md:text-4xl text-cyan-300 font-light mt-2">
                Deep Performance Analysis
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Comprehensive guide to analyzing and optimizing PostgreSQL query performance. 
              Identify bottlenecks, optimize execution plans, and monitor query patterns.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-cyan-500/20 border border-cyan-500/30 px-4 py-2 rounded-lg text-cyan-300">
                <Search className="w-4 h-4 inline mr-2" />
                Query analysis
              </div>
              <div className="bg-blue-500/20 border border-blue-500/30 px-4 py-2 rounded-lg text-blue-300">
                <TrendingUp className="w-4 h-4 inline mr-2" />
                Performance optimization
              </div>
              <div className="bg-green-500/20 border border-green-500/30 px-4 py-2 rounded-lg text-green-300">
                <CheckCircle className="w-4 h-4 inline mr-2" />
                Real-time monitoring
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Query Metrics */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Key Query Metrics</h2>
          <p className="text-slate-300 text-lg">Essential metrics for understanding query performance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {queryMetrics.map((metric, index) => (
            <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="text-cyan-400 mr-3">
                  {metric.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {metric.metric}
                </h3>
              </div>
              <p className="text-slate-300 mb-4">
                {metric.description}
              </p>
              
              <div className="mb-4">
                <h4 className="font-semibold text-white mb-2">Key Fields</h4>
                <ul className="space-y-1">
                  {metric.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="text-slate-300 text-sm flex items-start">
                      <ArrowRight className="w-3 h-3 text-cyan-400 mr-2 mt-1 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-slate-800 p-3 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Optimization Focus</h4>
                <p className="text-slate-300 text-sm">
                  {metric.optimization}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Query Categories */}
      <div className="bg-slate-800/30 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Query Categories</h2>
            <p className="text-slate-300 text-lg">Different types of performance issues and their solutions</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {queryCategories.map((category, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="text-orange-400 mr-3">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {category.category}
                  </h3>
                </div>
                <p className="text-slate-300 mb-4">
                  {category.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-800 p-3 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Threshold</h4>
                    <p className="text-slate-300 text-sm">{category.threshold}</p>
                  </div>
                  <div className="bg-slate-800 p-3 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">Impact</h4>
                    <p className="text-slate-300 text-sm">{category.impact}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Common Examples</h4>
                    <ul className="space-y-1">
                      {category.examples.map((example, exampleIndex) => (
                        <li key={exampleIndex} className="text-slate-300 text-sm flex items-start">
                          <ArrowRight className="w-3 h-3 text-orange-400 mr-2 mt-1 flex-shrink-0" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Solutions</h4>
                    <ul className="space-y-1">
                      {category.solutions.map((solution, solutionIndex) => (
                        <li key={solutionIndex} className="text-slate-300 text-sm flex items-start">
                          <CheckCircle className="w-3 h-3 text-green-400 mr-2 mt-1 flex-shrink-0" />
                          {solution}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Optimization Techniques */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Optimization Techniques</h2>
          <p className="text-slate-300 text-lg">Proven methods for improving query performance</p>
        </div>

        <div className="space-y-8">
          {optimizationTechniques.map((technique, index) => (
            <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="text-purple-400 mr-3">
                  {technique.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {technique.technique}
                </h3>
              </div>
              <p className="text-slate-300 mb-4">
                {technique.description}
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Implementation Steps</h4>
                  <ol className="space-y-2">
                    {technique.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="text-slate-300 text-sm flex items-start">
                        <span className="bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          {stepIndex + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                
                <div>
                  <h4 className="font-semibold text-white mb-3">Code Examples</h4>
                  <div className="bg-slate-800 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-slate-300 text-sm whitespace-pre-wrap">{technique.code}</pre>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monitoring Queries */}
      <div className="bg-slate-800/30 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Monitoring Queries</h2>
            <p className="text-slate-300 text-lg">Ready-to-use SQL queries for query performance monitoring</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {monitoringQueries.map((query, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="text-green-400 mr-3">
                    {query.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {query.title}
                  </h3>
                </div>
                <p className="text-slate-300 mb-4 text-sm">
                  {query.description}
                </p>
                <div className="bg-slate-800 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-slate-300 text-sm whitespace-pre-wrap">{query.query}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Best Practices</h2>
          <p className="text-slate-300 text-lg">Guidelines for effective query performance management</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bestPractices.map((practice, index) => (
            <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="text-blue-400 mr-3">
                  {practice.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {practice.practice}
                </h3>
              </div>
              <p className="text-slate-300 mb-4">
                {practice.description}
              </p>
              <ul className="space-y-2">
                {practice.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="text-slate-300 text-sm flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* API Integration */}
      <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">API Integration</h2>
          <p className="text-slate-300 text-lg mb-8">
            Use pg_stat_insights API to integrate query analytics into your applications
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/docs/pg-stat-insights/api"
              className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800/50 transition-colors group"
            >
              <Code className="w-8 h-8 text-cyan-400 mb-4 group-hover:text-cyan-300" />
              <h3 className="text-lg font-semibold text-white mb-2">API Reference</h3>
              <p className="text-slate-300 text-sm">Complete API documentation and examples</p>
            </a>
            
            <a
              href="/docs/pg-stat-insights/best-practices"
              className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800/50 transition-colors group"
            >
              <TrendingUp className="w-8 h-8 text-blue-400 mb-4 group-hover:text-blue-300" />
              <h3 className="text-lg font-semibold text-white mb-2">Best Practices</h3>
              <p className="text-slate-300 text-sm">Optimization strategies and monitoring tips</p>
            </a>
            
            <a
              href="/docs/pg-stat-insights/getting-started"
              className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800/50 transition-colors group"
            >
              <Database className="w-8 h-8 text-purple-400 mb-4 group-hover:text-purple-300" />
              <h3 className="text-lg font-semibold text-white mb-2">Getting Started</h3>
              <p className="text-slate-300 text-sm">Quick setup and first insights</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PgStatInsightsQueryAnalyticsPage;
