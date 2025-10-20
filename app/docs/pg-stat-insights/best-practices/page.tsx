import React from 'react';
import { Metadata } from 'next';
import { 
  TrendingUp, Database, Search, BarChart3, Clock, Zap, Eye, 
  AlertTriangle, CheckCircle, LineChart, Activity, Cpu, HardDrive,
  BookOpen, Code, Settings, Monitor, Download, Terminal, ArrowRight,
  Copy, Shield, Target, Filter, SortAsc, SortDesc, Users, Globe
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'pg_stat_insights Best Practices - Performance Optimization Guide',
  description: 'Complete best practices guide for pg_stat_insights. Performance optimization strategies, monitoring techniques, and production deployment recommendations.',
  keywords: [
    'PostgreSQL best practices', 'database performance optimization', 'query optimization',
    'monitoring best practices', 'production deployment', 'database tuning'
  ].join(', '),
  openGraph: {
    title: 'pg_stat_insights Best Practices - Performance Optimization Guide',
    description: 'Complete best practices guide for pg_stat_insights performance optimization.',
    type: 'website',
    url: 'https://www.pgelephant.com/docs/pg-stat-insights/best-practices',
    siteName: 'pgElephant',
  },
};

const PgStatInsightsBestPracticesPage = () => {
  const optimizationStrategies = [
    {
      category: 'Query Optimization',
      icon: <Search className="w-6 h-6" />,
      strategies: [
        {
          title: 'Index Strategy',
          description: 'Create and maintain optimal indexes',
          practices: [
            'Analyze query patterns before creating indexes',
            'Use composite indexes for multi-column WHERE clauses',
            'Create partial indexes for common filter conditions',
            'Monitor index usage and remove unused indexes',
            'Consider covering indexes to avoid table lookups'
          ],
          code: `-- Analyze query patterns
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements 
WHERE query LIKE '%WHERE%'
ORDER BY total_time DESC;

-- Create composite index
CREATE INDEX idx_users_email_status 
ON users(email, status) 
WHERE status = 'active';

-- Monitor index usage
SELECT schemaname, tablename, indexname, idx_scan, idx_tup_read
FROM pg_stat_user_indexes 
WHERE idx_scan = 0;`
        },
        {
          title: 'Query Rewriting',
          description: 'Improve query structure and efficiency',
          practices: [
            'Replace subqueries with JOINs where possible',
            'Use EXISTS instead of IN for large datasets',
            'Avoid SELECT * and specify only needed columns',
            'Use appropriate data types to reduce storage',
            'Consider window functions for analytical queries'
          ],
          code: `-- Instead of subquery
SELECT * FROM users 
WHERE id IN (SELECT user_id FROM orders WHERE status = 'completed');

-- Use JOIN for better performance
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
          title: 'Statistics and Planning',
          description: 'Ensure optimal query planning',
          practices: [
            'Keep table statistics up to date with ANALYZE',
            'Adjust statistics targets for large tables',
            'Use EXPLAIN ANALYZE to verify execution plans',
            'Consider query hints for complex scenarios',
            'Monitor and tune planner parameters'
          ],
          code: `-- Update statistics regularly
ANALYZE users;
ANALYZE orders;

-- Increase statistics target for large table
ALTER TABLE large_table ALTER COLUMN important_column SET STATISTICS 1000;

-- Analyze query execution plan
EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT u.*, o.total 
FROM users u 
JOIN orders o ON u.id = o.user_id 
WHERE u.created_at > '2024-01-01';`
        }
      ]
    },
    {
      category: 'Monitoring Strategy',
      icon: <Eye className="w-6 h-6" />,
      strategies: [
        {
          title: 'Baseline Establishment',
          description: 'Create performance baselines for comparison',
          practices: [
            'Document normal query performance ranges',
            'Establish thresholds for different query types',
            'Track performance before and after changes',
            'Maintain historical performance data',
            'Create performance regression tests'
          ],
          code: `-- Create performance baseline
CREATE TABLE performance_baseline AS
SELECT 
    query,
    calls,
    total_time,
    mean_time,
    now() as baseline_date
FROM pg_stat_statements 
WHERE query NOT LIKE '%pg_stat_statements%';

-- Compare current vs baseline
SELECT 
    current.query,
    current.mean_time as current_avg,
    baseline.mean_time as baseline_avg,
    (current.mean_time - baseline.mean_time) as difference
FROM pg_stat_statements current
JOIN performance_baseline baseline ON current.query = baseline.query;`
        },
        {
          title: 'Alert Configuration',
          description: 'Set up intelligent alerting for performance issues',
          practices: [
            'Create alerts for slow queries (> 1 second)',
            'Monitor query frequency anomalies',
            'Alert on high I/O operations',
            'Set up capacity planning alerts',
            'Implement escalation procedures'
          ],
          code: `-- Slow query alert
SELECT query, mean_time, calls
FROM pg_stat_statements 
WHERE mean_time > 1000  -- 1 second
AND calls > 10
ORDER BY mean_time DESC;

-- High I/O alert
SELECT query, shared_blks_read, shared_blks_hit
FROM pg_stat_statements 
WHERE shared_blks_read > 1000
AND (shared_blks_read::float / (shared_blks_hit + shared_blks_read)) > 0.5;`
        },
        {
          title: 'Trend Analysis',
          description: 'Monitor performance trends over time',
          practices: [
            'Track query performance over time',
            'Identify seasonal patterns',
            'Monitor growth in query volume',
            'Analyze performance degradation',
            'Plan capacity based on trends'
          ],
          code: `-- Query performance trends
SELECT 
    DATE_TRUNC('hour', now() - interval '1 hour' * generate_series(0, 23)) as hour,
    COUNT(*) as query_count,
    AVG(mean_time) as avg_execution_time,
    MAX(mean_time) as max_execution_time
FROM pg_stat_statements 
WHERE query NOT LIKE '%pg_stat_statements%'
GROUP BY hour
ORDER BY hour;`
        }
      ]
    },
    {
      category: 'Production Deployment',
      icon: <Globe className="w-6 h-6" />,
      strategies: [
        {
          title: 'Security Configuration',
          description: 'Secure pg_stat_insights in production',
          practices: [
            'Use dedicated database user with minimal privileges',
            'Enable SSL/TLS for database connections',
            'Implement proper authentication and authorization',
            'Regular security updates and patches',
            'Monitor access logs and audit trails'
          ],
          code: `-- Create dedicated user
CREATE USER pgsentinel_monitor WITH PASSWORD 'secure_password';
GRANT pg_monitor TO pgsentinel_monitor;
GRANT SELECT ON pg_stat_statements TO pgsentinel_monitor;
GRANT SELECT ON pg_stat_user_tables TO pgsentinel_monitor;

-- Enable SSL
ALTER SYSTEM SET ssl = on;
SELECT pg_reload_conf();`
        },
        {
          title: 'Performance Tuning',
          description: 'Optimize pg_stat_insights for production',
          practices: [
            'Configure appropriate connection pooling',
            'Implement caching for frequently accessed data',
            'Use read replicas for analytics queries',
            'Optimize data retention policies',
            'Monitor resource usage and scale accordingly'
          ],
          code: `-- Connection pooling configuration
# pgbouncer.ini
[databases]
analytics = host=localhost port=5432 dbname=analytics

[pgbouncer]
pool_mode = transaction
max_client_conn = 100
default_pool_size = 20

-- Data retention policy
DELETE FROM pg_stat_statements 
WHERE query_start < now() - interval '7 days';`
        },
        {
          title: 'High Availability',
          description: 'Ensure reliable monitoring service',
          practices: [
            'Deploy multiple monitoring instances',
            'Use load balancers for API endpoints',
            'Implement health checks and auto-recovery',
            'Backup monitoring data and configurations',
            'Plan for disaster recovery scenarios'
          ],
          code: `-- Health check endpoint
GET /api/v1/health
{
  "status": "healthy",
  "database": "connected",
  "timestamp": "2024-01-15T10:30:00Z"
}

-- Load balancer configuration
upstream pgsentinel_backend {
    server backend1:8000;
    server backend2:8000;
    server backend3:8000;
}`
        }
      ]
    }
  ];

  const monitoringBestPractices = [
    {
      practice: 'Regular Performance Reviews',
      description: 'Establish consistent performance monitoring routines',
      icon: <Clock className="w-6 h-6" />,
      frequency: 'Weekly',
      tasks: [
        'Review slow query reports',
        'Analyze query performance trends',
        'Check for new performance issues',
        'Update optimization recommendations',
        'Document performance changes'
      ],
      metrics: [
        'Average query execution time',
        'Query frequency patterns',
        'I/O operation trends',
        'Cache hit ratios',
        'Connection usage patterns'
      ]
    },
    {
      practice: 'Proactive Optimization',
      description: 'Continuously optimize based on monitoring data',
      icon: <Zap className="w-6 h-6" />,
      frequency: 'Ongoing',
      tasks: [
        'Implement optimization recommendations',
        'Test changes in development environment',
        'Monitor impact of optimizations',
        'Rollback ineffective changes',
        'Document optimization results'
      ],
      metrics: [
        'Query performance improvements',
        'Resource usage reduction',
        'Error rate changes',
        'User experience metrics',
        'System stability indicators'
      ]
    },
    {
      practice: 'Capacity Planning',
      description: 'Plan for future growth and resource needs',
      icon: <TrendingUp className="w-6 h-6" />,
      frequency: 'Monthly',
      tasks: [
        'Analyze growth trends in query volume',
        'Project future resource requirements',
        'Plan infrastructure scaling',
        'Review and update monitoring thresholds',
        'Document capacity planning decisions'
      ],
      metrics: [
        'Query volume growth rates',
        'Resource utilization trends',
        'Performance degradation patterns',
        'Peak usage periods',
        'Scaling trigger points'
      ]
    },
    {
      practice: 'Team Training and Knowledge Sharing',
      description: 'Ensure team understands monitoring and optimization',
      icon: <Users className="w-6 h-6" />,
      frequency: 'Quarterly',
      tasks: [
        'Conduct performance optimization training',
        'Share monitoring insights and best practices',
        'Document troubleshooting procedures',
        'Review and update team guidelines',
        'Conduct performance optimization workshops'
      ],
      metrics: [
        'Team knowledge assessment scores',
        'Time to resolution for performance issues',
        'Number of optimization implementations',
        'Team confidence in monitoring tools',
        'Documentation completeness'
      ]
    }
  ];

  const commonPitfalls = [
    {
      pitfall: 'Over-indexing',
      description: 'Creating too many indexes can hurt performance',
      icon: <AlertTriangle className="w-6 h-6" />,
      problem: 'Each index adds overhead for INSERT, UPDATE, DELETE operations',
      solution: 'Monitor index usage and remove unused indexes regularly',
      prevention: [
        'Analyze query patterns before creating indexes',
        'Use partial indexes for common filter conditions',
        'Monitor index usage with pg_stat_user_indexes',
        'Regularly review and clean up unused indexes'
      ]
    },
    {
      pitfall: 'Ignoring Statistics',
      description: 'Outdated statistics lead to poor query plans',
      icon: <Database className="w-6 h-6" />,
      problem: 'Query planner makes suboptimal decisions with stale statistics',
      solution: 'Implement regular ANALYZE schedules and monitor statistics age',
      prevention: [
        'Set up automated ANALYZE jobs',
        'Monitor statistics age with pg_stat_user_tables',
        'Increase statistics targets for important columns',
        'Analyze tables after bulk data changes'
      ]
    },
    {
      pitfall: 'Query Complexity',
      description: 'Overly complex queries are hard to optimize',
      icon: <Code className="w-6 h-6" />,
      problem: 'Complex queries often have poor execution plans',
      solution: 'Break down complex queries into simpler, more manageable parts',
      prevention: [
        'Use views to simplify complex queries',
        'Consider materialized views for expensive aggregations',
        'Break down complex JOINs into steps',
        'Use CTEs to improve query readability'
      ]
    },
    {
      pitfall: 'Insufficient Monitoring',
      description: 'Not monitoring the right metrics or frequently enough',
      icon: <Eye className="w-6 h-6" />,
      problem: 'Performance issues go undetected until they become critical',
      solution: 'Implement comprehensive monitoring with appropriate alerting',
      prevention: [
        'Set up monitoring for all critical queries',
        'Configure alerts for performance thresholds',
        'Monitor both current performance and trends',
        'Regular review of monitoring effectiveness'
      ]
    }
  ];

  const performanceChecklist = [
    {
      category: 'Database Configuration',
      icon: <Settings className="w-6 h-6" />,
      items: [
        'PostgreSQL extensions enabled (pg_stat_statements, etc.)',
        'Statistics collection configured and up to date',
        'Appropriate memory settings (shared_buffers, work_mem)',
        'Logging configured for slow queries',
        'Connection limits set appropriately'
      ]
    },
    {
      category: 'Query Optimization',
      icon: <Search className="w-6 h-6" />,
      items: [
        'Slow queries identified and optimized',
        'Appropriate indexes created and maintained',
        'Query plans reviewed and optimized',
        'Statistics targets set for important columns',
        'Query complexity reduced where possible'
      ]
    },
    {
      category: 'Monitoring Setup',
      icon: <Monitor className="w-6 h-6" />,
      items: [
        'pg_stat_insights properly configured',
        'Monitoring dashboards set up and functional',
        'Alerts configured for performance thresholds',
        'Historical data collection working',
        'Team trained on monitoring tools'
      ]
    },
    {
      category: 'Production Readiness',
      icon: <Shield className="w-6 h-6" />,
      items: [
        'Security configuration implemented',
        'Backup and recovery procedures tested',
        'High availability setup configured',
        'Performance baselines established',
        'Documentation and runbooks created'
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
                <TrendingUp className="w-16 h-16 text-cyan-500 animate-pulse" />
                <Database className="w-6 h-6 text-blue-400 absolute -top-1 -left-1 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <Search className="w-6 h-6 text-purple-400 absolute -top-1 -right-1" />
                <CheckCircle className="w-5 h-5 text-green-400 absolute -bottom-1 -right-1 animate-bounce" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Best Practices
              <span className="block text-3xl md:text-4xl text-cyan-300 font-light mt-2">
                Performance Optimization Guide
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Comprehensive best practices guide for pg_stat_insights. 
              Performance optimization strategies, monitoring techniques, and production deployment recommendations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-cyan-500/20 border border-cyan-500/30 px-4 py-2 rounded-lg text-cyan-300">
                <TrendingUp className="w-4 h-4 inline mr-2" />
                Optimization strategies
              </div>
              <div className="bg-blue-500/20 border border-blue-500/30 px-4 py-2 rounded-lg text-blue-300">
                <Eye className="w-4 h-4 inline mr-2" />
                Monitoring best practices
              </div>
              <div className="bg-green-500/20 border border-green-500/30 px-4 py-2 rounded-lg text-green-300">
                <CheckCircle className="w-4 h-4 inline mr-2" />
                Production ready
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optimization Strategies */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Optimization Strategies</h2>
          <p className="text-slate-300 text-lg">Proven strategies for improving PostgreSQL performance</p>
        </div>

        <div className="space-y-12">
          {optimizationStrategies.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-slate-900/50 border border-slate-700 rounded-xl p-8">
              <div className="flex items-center mb-8">
                <div className="text-cyan-400 mr-4">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  {category.category}
                </h3>
              </div>

              <div className="space-y-8">
                {category.strategies.map((strategy, strategyIndex) => (
                  <div key={strategyIndex} className="border-l-4 border-slate-700 pl-6">
                    <h4 className="text-lg font-semibold text-white mb-3">
                      {strategy.title}
                    </h4>
                    <p className="text-slate-300 mb-4">
                      {strategy.description}
                    </p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-green-300 mb-2">Best Practices</h5>
                        <ul className="space-y-1">
                          {strategy.practices.map((practice, practiceIndex) => (
                            <li key={practiceIndex} className="text-slate-300 text-sm flex items-start">
                              <CheckCircle className="w-3 h-3 text-green-400 mr-2 mt-1 flex-shrink-0" />
                              {practice}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-blue-300 mb-2">Code Examples</h5>
                        <div className="bg-slate-800 p-4 rounded-lg overflow-x-auto">
                          <pre className="text-slate-300 text-sm whitespace-pre-wrap">{strategy.code}</pre>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monitoring Best Practices */}
      <div className="bg-slate-800/30 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Monitoring Best Practices</h2>
            <p className="text-slate-300 text-lg">Establish effective monitoring routines and procedures</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {monitoringBestPractices.map((practice, index) => (
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
                
                <div className="mb-4">
                  <span className="inline-block bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded text-sm font-semibold">
                    {practice.frequency}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-300 mb-2">Key Tasks</h4>
                    <ul className="space-y-1">
                      {practice.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="text-slate-300 text-sm flex items-start">
                          <ArrowRight className="w-3 h-3 text-green-400 mr-2 mt-1 flex-shrink-0" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-purple-300 mb-2">Key Metrics</h4>
                    <ul className="space-y-1">
                      {practice.metrics.map((metric, metricIndex) => (
                        <li key={metricIndex} className="text-slate-300 text-sm flex items-start">
                          <Target className="w-3 h-3 text-purple-400 mr-2 mt-1 flex-shrink-0" />
                          {metric}
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

      {/* Common Pitfalls */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Common Pitfalls</h2>
          <p className="text-slate-300 text-lg">Avoid these common mistakes in performance optimization</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {commonPitfalls.map((pitfall, index) => (
            <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="text-red-400 mr-3">
                  {pitfall.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {pitfall.pitfall}
                </h3>
              </div>
              <p className="text-slate-300 mb-4">
                {pitfall.description}
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-orange-300 mb-2">The Problem</h4>
                  <p className="text-slate-300 text-sm">
                    {pitfall.problem}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-green-300 mb-2">The Solution</h4>
                  <p className="text-slate-300 text-sm">
                    {pitfall.solution}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-blue-300 mb-2">Prevention</h4>
                  <ul className="space-y-1">
                    {pitfall.prevention.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-slate-300 text-sm flex items-start">
                        <CheckCircle className="w-3 h-3 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Checklist */}
      <div className="bg-slate-800/30 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Performance Checklist</h2>
            <p className="text-slate-300 text-lg">Use this checklist to ensure optimal performance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {performanceChecklist.map((category, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="text-purple-400 mr-3">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {category.category}
                  </h3>
                </div>
                
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-slate-300 text-sm flex items-start">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Additional Resources</h2>
          <p className="text-slate-300 text-lg mb-8">
            Continue learning with these additional resources and guides
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="/docs/pg-stat-insights/query-analytics"
              className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800/50 transition-colors group"
            >
              <Search className="w-8 h-8 text-cyan-400 mb-4 group-hover:text-cyan-300" />
              <h3 className="text-lg font-semibold text-white mb-2">Query Analytics</h3>
              <p className="text-slate-300 text-sm">Deep dive into query performance analysis</p>
            </a>
            
            <a
              href="/docs/pg-stat-insights/api"
              className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800/50 transition-colors group"
            >
              <Code className="w-8 h-8 text-blue-400 mb-4 group-hover:text-blue-300" />
              <h3 className="text-lg font-semibold text-white mb-2">API Reference</h3>
              <p className="text-slate-300 text-sm">Complete API documentation and examples</p>
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

export default PgStatInsightsBestPracticesPage;
