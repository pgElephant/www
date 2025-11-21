import React from 'react';
import { Metadata } from 'next';
import { 
  Code, Database, TrendingUp, BarChart3, Search, Cpu, HardDrive,
  Network, CheckCircle, AlertTriangle, LineChart, Activity,
  BookOpen, Settings, Monitor, Download, Terminal, ArrowRight,
  Copy, Clock, Zap, Eye, Shield
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'pg_stat_insights API Reference - Performance Analytics API',
  description: 'Complete API reference for pg_stat_insights - deep PostgreSQL performance analytics. All endpoints, parameters, responses, and examples for database optimization.',
  keywords: [
    'pg_stat_insights API', 'PostgreSQL analytics API', 'performance monitoring API',
    'query optimization API', 'database insights API', 'PostgreSQL extensions API'
  ].join(', '),
  openGraph: {
    title: 'pg_stat_insights API Reference - Performance Analytics API',
    description: 'Complete API reference for pg_stat_insights performance analytics.',
    type: 'website',
    url: 'https://www.pgelephant.com/docs/pg-stat-insights/api',
    siteName: 'pgElephant',
  },
};

const PgStatInsightsApiPage = () => {
  const baseUrl = 'http://localhost:8000/api/v1/insights';
  
  const endpoints = [
    {
      category: 'Dashboard & Overview',
      color: 'cyan',
      description: 'Complete dashboard data and system overview',
      endpoints: [
        {
          method: 'GET',
          path: '/dashboard',
          description: 'Get complete insights dashboard with all key metrics',
          parameters: [],
          response: {
            query_stats: {
              total_queries: 1250,
              slow_queries: 23,
              avg_execution_time: 12.5,
              total_execution_time: 15625.0
            },
            table_stats: {
              total_tables: 45,
              bloated_tables: 3,
              total_size_mb: 1024.5,
              avg_bloat_percentage: 5.2
            },
            cache_stats: {
              buffer_hit_ratio: 98.5,
              index_hit_ratio: 99.2,
              toast_hit_ratio: 97.8
            },
            connection_stats: {
              active_connections: 15,
              idle_connections: 8,
              idle_in_transaction: 2
            },
            replication_stats: {
              lag_seconds: 0.5,
              replication_slots: 2,
              standby_servers: 2
            }
          }
        },
        {
          method: 'GET',
          path: '/summary',
          description: 'Get high-level performance summary',
          parameters: [],
          response: {
            overall_health: 'good',
            performance_score: 85,
            critical_issues: 0,
            warnings: 2,
            recommendations_count: 5
          }
        }
      ]
    },
    {
      category: 'Query Analytics',
      color: 'blue',
      description: 'Deep query performance analysis and optimization',
      endpoints: [
        {
          method: 'GET',
          path: '/queries',
          description: 'Get detailed query performance insights',
          parameters: [
            { name: 'limit', type: 'integer', required: false, description: 'Number of queries to return (default: 20, max: 100)' },
            { name: 'order_by', type: 'string', required: false, description: 'Sort by: calls, total_time, avg_time, rows (default: total_time)' },
            { name: 'min_calls', type: 'integer', required: false, description: 'Minimum number of calls to include' },
            { name: 'min_avg_time', type: 'float', required: false, description: 'Minimum average execution time (ms)' }
          ],
          response: {
            queries: [
              {
                query_id: 12345,
                query: 'SELECT * FROM users WHERE email = $1',
                calls: 150,
                total_time: 1250.5,
                avg_time: 8.34,
                min_time: 2.1,
                max_time: 45.2,
                rows: 1,
                shared_blks_hit: 1200,
                shared_blks_read: 50,
                local_blks_hit: 0,
                local_blks_read: 0
              }
            ],
            total_queries: 1250,
            slowest_query_time: 245.8,
            most_frequent_calls: 500
          }
        },
        {
          method: 'GET',
          path: '/queries/slow',
          description: 'Get slowest queries requiring optimization',
          parameters: [
            { name: 'threshold', type: 'float', required: false, description: 'Minimum execution time threshold in ms (default: 100)' },
            { name: 'limit', type: 'integer', required: false, description: 'Number of queries to return (default: 10)' }
          ],
          response: {
            slow_queries: [
              {
                query: 'SELECT u.*, p.* FROM users u JOIN profiles p ON u.id = p.user_id WHERE u.created_at > $1',
                avg_time: 245.8,
                calls: 25,
                total_time: 6145.0,
                optimization_potential: 'high'
              }
            ]
          }
        },
        {
          method: 'GET',
          path: '/queries/frequent',
          description: 'Get most frequently executed queries',
          parameters: [
            { name: 'limit', type: 'integer', required: false, description: 'Number of queries to return (default: 10)' },
            { name: 'min_calls', type: 'integer', required: false, description: 'Minimum number of calls (default: 10)' }
          ],
          response: {
            frequent_queries: [
              {
                query: 'SELECT id, email FROM users WHERE id = $1',
                calls: 500,
                avg_time: 2.1,
                total_time: 1050.0,
                percentage_of_total: 40.0
              }
            ]
          }
        }
      ]
    },
    {
      category: 'Table & Index Analysis',
      color: 'purple',
      description: 'Table health, bloat analysis, and index optimization',
      endpoints: [
        {
          method: 'GET',
          path: '/tables',
          description: 'Get comprehensive table statistics and bloat analysis',
          parameters: [
            { name: 'schema', type: 'string', required: false, description: 'Filter by schema name' },
            { name: 'min_size_mb', type: 'float', required: false, description: 'Minimum table size in MB' },
            { name: 'bloat_threshold', type: 'float', required: false, description: 'Minimum bloat percentage to include (default: 5.0)' }
          ],
          response: {
            tables: [
              {
                schema_name: 'public',
                table_name: 'users',
                size_mb: 45.2,
                row_count: 10000,
                bloat_percentage: 5.2,
                bloat_size_mb: 2.3,
                last_vacuum: '2024-01-15T08:00:00Z',
                last_analyze: '2024-01-15T08:00:00Z',
                vacuum_count: 15,
                analyze_count: 12,
                needs_vacuum: true,
                needs_analyze: false
              }
            ],
            total_tables: 45,
            total_size_mb: 1024.5,
            bloated_tables: 3,
            avg_bloat_percentage: 5.2
          }
        },
        {
          method: 'GET',
          path: '/indexes',
          description: 'Get index usage statistics and optimization recommendations',
          parameters: [
            { name: 'schema', type: 'string', required: false, description: 'Filter by schema name' },
            { name: 'unused_only', type: 'boolean', required: false, description: 'Show only unused indexes (default: false)' },
            { name: 'min_size_mb', type: 'float', required: false, description: 'Minimum index size in MB' }
          ],
          response: {
            indexes: [
              {
                schema_name: 'public',
                table_name: 'users',
                index_name: 'idx_users_email',
                size_mb: 2.1,
                usage_count: 1250,
                is_used: true,
                usage_percentage: 95.2,
                last_used: '2024-01-15T10:30:00Z',
                index_type: 'btree',
                is_unique: true
              }
            ],
            total_indexes: 78,
            unused_indexes: 5,
            total_index_size_mb: 156.8
          }
        },
        {
          method: 'GET',
          path: '/indexes/missing',
          description: 'Get missing index recommendations based on query patterns',
          parameters: [
            { name: 'min_benefit', type: 'float', required: false, description: 'Minimum benefit score (0-100)' },
            { name: 'limit', type: 'integer', required: false, description: 'Number of recommendations (default: 10)' }
          ],
          response: {
            missing_indexes: [
              {
                table_name: 'orders',
                column_name: 'created_at',
                benefit_score: 85.5,
                estimated_improvement: '80% faster queries',
                query_example: 'SELECT * FROM orders WHERE created_at > $1',
                frequency: 150
              }
            ]
          }
        }
      ]
    },
    {
      category: 'Cache & Memory',
      color: 'green',
      description: 'Buffer cache analysis and memory optimization',
      endpoints: [
        {
          method: 'GET',
          path: '/cache',
          description: 'Get comprehensive cache hit ratio statistics',
          parameters: [],
          response: {
            buffer_hit_ratio: 98.5,
            index_hit_ratio: 99.2,
            toast_hit_ratio: 97.8,
            tup_hit_ratio: 99.1,
            buffer_cache_size_mb: 1024,
            shared_buffers_mb: 1024,
            effective_cache_size_mb: 4096,
            recommendations: [
              {
                type: 'increase_shared_buffers',
                priority: 'medium',
                description: 'Consider increasing shared_buffers to 25% of RAM'
              }
            ]
          }
        },
        {
          method: 'GET',
          path: '/cache/top_tables',
          description: 'Get tables with highest cache usage',
          parameters: [
            { name: 'limit', type: 'integer', required: false, description: 'Number of tables to return (default: 10)' }
          ],
          response: {
            top_tables: [
              {
                table_name: 'users',
                cache_hit_ratio: 99.5,
                cache_size_mb: 45.2,
                total_reads: 15000,
                cache_hits: 14925,
                cache_misses: 75
              }
            ]
          }
        }
      ]
    },
    {
      category: 'Replication & Locks',
      color: 'orange',
      description: 'Replication monitoring and lock analysis',
      endpoints: [
        {
          method: 'GET',
          path: '/replication',
          description: 'Get replication lag and status information',
          parameters: [],
          response: {
            lag_seconds: 0.5,
            replication_slots: [
              {
                slot_name: 'replica1',
                active: true,
                lag_bytes: 1024,
                lag_wal: 0
              }
            ],
            standby_servers: 2,
            max_lag_seconds: 2.1,
            avg_lag_seconds: 0.8
          }
        },
        {
          method: 'GET',
          path: '/locks',
          description: 'Get current lock information and blocking queries',
          parameters: [
            { name: 'blocking_only', type: 'boolean', required: false, description: 'Show only blocking locks (default: false)' }
          ],
          response: {
            locks: [
              {
                lock_type: 'ExclusiveLock',
                relation_name: 'users',
                mode: 'ExclusiveLock',
                granted: true,
                pid: 12345,
                query: 'UPDATE users SET last_login = NOW() WHERE id = $1',
                duration_seconds: 5.2
              }
            ],
            blocking_locks: 0,
            total_locks: 15,
            longest_lock_duration: 5.2
          }
        }
      ]
    },
    {
      category: 'Recommendations',
      color: 'red',
      description: 'Intelligent optimization recommendations',
      endpoints: [
        {
          method: 'GET',
          path: '/recommendations',
          description: 'Get intelligent performance optimization recommendations',
          parameters: [
            { name: 'priority', type: 'string', required: false, description: 'Filter by priority: high, medium, low' },
            { name: 'category', type: 'string', required: false, description: 'Filter by category: query, index, cache, vacuum' },
            { name: 'limit', type: 'integer', required: false, description: 'Number of recommendations (default: 20)' }
          ],
          response: {
            recommendations: [
              {
                id: 'rec_001',
                type: 'missing_index',
                priority: 'high',
                category: 'index',
                title: 'Add index on users.email',
                description: 'Query performance can be improved by 80% with an index on users.email',
                impact: 'high',
                effort: 'low',
                sql_command: 'CREATE INDEX idx_users_email ON users(email);',
                affected_queries: 5,
                estimated_improvement: '80% faster queries'
              }
            ],
            total_recommendations: 8,
            high_priority: 2,
            medium_priority: 4,
            low_priority: 2
          }
        },
        {
          method: 'GET',
          path: '/recommendations/vacuum',
          description: 'Get vacuum and analyze recommendations',
          parameters: [],
          response: {
            vacuum_recommendations: [
              {
                table_name: 'orders',
                schema_name: 'public',
                bloat_percentage: 15.2,
                last_vacuum: '2024-01-10T08:00:00Z',
                vacuum_command: 'VACUUM ANALYZE orders;',
                priority: 'high'
              }
            ]
          }
        }
      ]
    }
  ];

  const codeExamples = [
    {
      title: 'Python Client',
      language: 'python',
      code: `import asyncio
import aiohttp
from datetime import datetime, timedelta

class PgStatInsightsClient:
    def __init__(self, base_url="http://localhost:8000/api/v1/insights"):
        self.base_url = base_url
        self.session = None
    
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    async def get_dashboard(self):
        """Get complete insights dashboard"""
        async with self.session.get(f"{self.base_url}/dashboard") as response:
            return await response.json()
    
    async def get_slow_queries(self, threshold=100):
        """Get slowest queries"""
        params = {'threshold': threshold}
        async with self.session.get(f"{self.base_url}/queries/slow", params=params) as response:
            return await response.json()
    
    async def get_table_bloat(self, min_bloat=5.0):
        """Get tables with significant bloat"""
        params = {'bloat_threshold': min_bloat}
        async with self.session.get(f"{self.base_url}/tables", params=params) as response:
            return await response.json()
    
    async def get_recommendations(self, priority='high'):
        """Get optimization recommendations"""
        params = {'priority': priority}
        async with self.session.get(f"{self.base_url}/recommendations", params=params) as response:
            return await response.json()

# Usage
async def main():
    async with PgStatInsightsClient() as client:
        # Get dashboard overview
        dashboard = await client.get_dashboard()
        print(f"Total queries: {dashboard['query_stats']['total_queries']}")
        print(f"Cache hit ratio: {dashboard['cache_stats']['buffer_hit_ratio']}%")
        
        # Get slow queries
        slow_queries = await client.get_slow_queries(threshold=50)
        for query in slow_queries['slow_queries']:
            print(f"Slow query: {query['query'][:100]}...")
            print(f"Avg time: {query['avg_time']}ms")
        
        # Get recommendations
        recommendations = await client.get_recommendations('high')
        for rec in recommendations['recommendations']:
            print(f"Recommendation: {rec['title']}")
            print(f"Impact: {rec['impact']}, Effort: {rec['effort']}")

# Run the client
asyncio.run(main())`
    },
    {
      title: 'JavaScript/Node.js Client',
      language: 'javascript',
      code: `class PgStatInsightsClient {
    constructor(baseUrl = 'http://localhost:8000/api/v1/insights') {
        this.baseUrl = baseUrl;
    }
    
    async request(endpoint, params = {}) {
        const url = new URL(\`\${this.baseUrl}\${endpoint}\`);
        Object.keys(params).forEach(key => 
            url.searchParams.append(key, params[key])
        );
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        
        return response.json();
    }
    
    async getDashboard() {
        return this.request('/dashboard');
    }
    
    async getSlowQueries(threshold = 100) {
        return this.request('/queries/slow', { threshold });
    }
    
    async getTableBloat(minBloat = 5.0) {
        return this.request('/tables', { bloat_threshold: minBloat });
    }
    
    async getRecommendations(priority = 'high') {
        return this.request('/recommendations', { priority });
    }
    
    async getCacheStats() {
        return this.request('/cache');
    }
    
    async getReplicationStatus() {
        return this.request('/replication');
    }
}

// Usage
const client = new PgStatInsightsClient();

async function analyzePerformance() {
    try {
        // Get overall dashboard
        const dashboard = await client.getDashboard();
        console.log('Performance Overview:');
        console.log(\`Total queries: \${dashboard.query_stats.total_queries}\`);
        console.log(\`Cache hit ratio: \${dashboard.cache_stats.buffer_hit_ratio}%\`);
        
        // Analyze slow queries
        const slowQueries = await client.getSlowQueries(50);
        console.log('\\nSlow Queries:');
        slowQueries.slow_queries.forEach(query => {
            console.log(\`- \${query.query.substring(0, 100)}...\`);
            console.log(\`  Avg time: \${query.avg_time}ms\`);
        });
        
        // Check table bloat
        const tableBloat = await client.getTableBloat(10);
        console.log('\\nTables with Bloat:');
        tableBloat.tables.forEach(table => {
            console.log(\`- \${table.table_name}: \${table.bloat_percentage}% bloat\`);
        });
        
        // Get recommendations
        const recommendations = await client.getRecommendations('high');
        console.log('\\nHigh Priority Recommendations:');
        recommendations.recommendations.forEach(rec => {
            console.log(\`- \${rec.title}\`);
            console.log(\`  Impact: \${rec.impact}, Effort: \${rec.effort}\`);
        });
        
    } catch (error) {
        console.error('Error analyzing performance:', error);
    }
}

analyzePerformance();`
    },
    {
      title: 'cURL Examples',
      language: 'bash',
      code: `# Get complete dashboard
curl -X GET "http://localhost:8000/api/v1/insights/dashboard" \\
  -H "Content-Type: application/json"

# Get slow queries (threshold 100ms)
curl -X GET "http://localhost:8000/api/v1/insights/queries/slow?threshold=100" \\
  -H "Content-Type: application/json"

# Get frequent queries
curl -X GET "http://localhost:8000/api/v1/insights/queries/frequent?limit=5" \\
  -H "Content-Type: application/json"

# Get table bloat analysis
curl -X GET "http://localhost:8000/api/v1/insights/tables?bloat_threshold=5.0" \\
  -H "Content-Type: application/json"

# Get index usage statistics
curl -X GET "http://localhost:8000/api/v1/insights/indexes?unused_only=true" \\
  -H "Content-Type: application/json"

# Get missing index recommendations
curl -X GET "http://localhost:8000/api/v1/insights/indexes/missing?min_benefit=50" \\
  -H "Content-Type: application/json"

# Get cache statistics
curl -X GET "http://localhost:8000/api/v1/insights/cache" \\
  -H "Content-Type: application/json"

# Get replication status
curl -X GET "http://localhost:8000/api/v1/insights/replication" \\
  -H "Content-Type: application/json"

# Get current locks
curl -X GET "http://localhost:8000/api/v1/insights/locks?blocking_only=true" \\
  -H "Content-Type: application/json"

# Get optimization recommendations
curl -X GET "http://localhost:8000/api/v1/insights/recommendations?priority=high&limit=10" \\
  -H "Content-Type: application/json"

# Get vacuum recommendations
curl -X GET "http://localhost:8000/api/v1/insights/recommendations/vacuum" \\
  -H "Content-Type: application/json"`
    }
  ];

  const errorCodes = [
    { code: 400, name: 'Bad Request', description: 'Invalid request parameters or malformed JSON' },
    { code: 401, name: 'Unauthorized', description: 'Authentication required or invalid credentials' },
    { code: 403, name: 'Forbidden', description: 'Insufficient permissions to access PostgreSQL system catalogs' },
    { code: 404, name: 'Not Found', description: 'Requested resource or endpoint does not exist' },
    { code: 422, name: 'Unprocessable Entity', description: 'Request validation failed or invalid parameter values' },
    { code: 429, name: 'Too Many Requests', description: 'Rate limit exceeded for API requests' },
    { code: 500, name: 'Internal Server Error', description: 'Unexpected server error or database connection issue' },
    { code: 503, name: 'Service Unavailable', description: 'PostgreSQL service unavailable or extensions not installed' }
  ];

  return (
    <div className="min-h-screen bg-page-gradient">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Database className="w-16 h-16 text-cyan-500 animate-pulse" />
                <TrendingUp className="w-6 h-6 text-blue-400 absolute -top-1 -left-1 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <BarChart3 className="w-6 h-6 text-purple-400 absolute -top-1 -right-1" />
                <Search className="w-5 h-5 text-green-400 absolute -bottom-1 -right-1 animate-bounce" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              pg_stat_insights
              <span className="block text-3xl md:text-4xl text-cyan-300 font-light mt-2">
                API Reference
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Complete API documentation for deep PostgreSQL performance analytics. 
              All endpoints, parameters, responses, and code examples for database optimization.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-cyan-500/20 border border-cyan-500/30 px-4 py-2 rounded-lg text-cyan-300">
                <Code className="w-4 h-4 inline mr-2" />
                20+ endpoints
              </div>
              <div className="bg-blue-500/20 border border-blue-500/30 px-4 py-2 rounded-lg text-blue-300">
                <Database className="w-4 h-4 inline mr-2" />
                PostgreSQL native
              </div>
              <div className="bg-green-500/20 border border-green-500/30 px-4 py-2 rounded-lg text-green-300">
                <CheckCircle className="w-4 h-4 inline mr-2" />
                Real-time data
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Base URL */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Database className="w-6 h-6 text-cyan-400 mr-3" />
            Base URL
          </h2>
          <div className="bg-slate-800 p-4 rounded-lg font-mono text-lg">
            <span className="text-slate-300">http://localhost:8000/api/v1/insights</span>
          </div>
          <p className="text-slate-400 text-sm mt-2">
            All pg_stat_insights API endpoints are prefixed with this base URL
          </p>
        </div>
      </div>

      {/* API Endpoints */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">API Endpoints</h2>
          <p className="text-slate-300 text-lg">Complete reference for all analytics endpoints</p>
        </div>

        <div className="space-y-12">
          {endpoints.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-slate-900/50 border border-slate-700 rounded-xl p-8">
              <div className="flex items-center mb-6">
                <div className={`w-3 h-3 rounded-full bg-${category.color}-500 mr-4`}></div>
                <div>
                  <h3 className="text-2xl font-semibold text-white">
                    {category.category}
                  </h3>
                  <p className="text-slate-400">{category.description}</p>
                </div>
              </div>

              <div className="space-y-8">
                {category.endpoints.map((endpoint, endpointIndex) => (
                  <div key={endpointIndex} className="border-l-4 border-slate-700 pl-6">
                    <div className="flex items-center mb-4">
                      <span className={`px-3 py-1 rounded text-sm font-mono font-semibold mr-4 ${
                        endpoint.method === 'GET' ? 'bg-green-500/20 text-green-300' :
                        endpoint.method === 'POST' ? 'bg-blue-500/20 text-blue-300' :
                        endpoint.method === 'PUT' ? 'bg-yellow-500/20 text-yellow-300' :
                        endpoint.method === 'DELETE' ? 'bg-red-500/20 text-red-300' :
                        'bg-purple-500/20 text-purple-300'
                      }`}>
                        {endpoint.method}
                      </span>
                      <code className="text-lg font-mono text-white">
                        {endpoint.path}
                      </code>
                    </div>

                    <p className="text-slate-300 mb-4">
                      {endpoint.description}
                    </p>

                    {endpoint.parameters && endpoint.parameters.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-white mb-2">Parameters</h4>
                        <div className="bg-slate-800 rounded-lg overflow-hidden">
                          <table className="w-full">
                            <thead className="bg-slate-700">
                              <tr>
                                <th className="px-4 py-2 text-left text-slate-300">Name</th>
                                <th className="px-4 py-2 text-left text-slate-300">Type</th>
                                <th className="px-4 py-2 text-left text-slate-300">Required</th>
                                <th className="px-4 py-2 text-left text-slate-300">Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {endpoint.parameters.map((param, paramIndex) => (
                                <tr key={paramIndex} className="border-t border-slate-700">
                                  <td className="px-4 py-2 font-mono text-cyan-300">{param.name}</td>
                                  <td className="px-4 py-2 text-slate-300">{param.type}</td>
                                  <td className="px-4 py-2">
                                    <span className={`px-2 py-1 rounded text-xs ${
                                      param.required 
                                        ? 'bg-red-500/20 text-red-300' 
                                        : 'bg-slate-500/20 text-slate-300'
                                    }`}>
                                      {param.required ? 'Yes' : 'No'}
                                    </span>
                                  </td>
                                  <td className="px-4 py-2 text-slate-300">{param.description}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    <div className="mb-4">
                      <h4 className="font-semibold text-white mb-2">Response</h4>
                      <div className="bg-slate-800 p-4 rounded-lg">
                        <pre className="text-slate-300 text-sm overflow-x-auto">
                          {JSON.stringify(endpoint.response, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Code Examples */}
      <div className="bg-slate-800/30 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Code Examples</h2>
            <p className="text-slate-300 text-lg">Ready-to-use client implementations</p>
          </div>

          <div className="space-y-8">
            {codeExamples.map((example, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Code className="w-6 h-6 text-cyan-400 mr-3" />
                  <h3 className="text-xl font-semibold text-white">
                    {example.title}
                  </h3>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-slate-300 text-sm whitespace-pre-wrap">{example.code}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Error Codes */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">HTTP Status Codes</h2>
          <p className="text-slate-300 text-lg">Common error responses and their meanings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {errorCodes.map((error, index) => (
            <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-center mb-3">
                <span className={`px-3 py-1 rounded text-lg font-mono font-bold mr-4 ${
                  error.code >= 500 ? 'bg-red-500/20 text-red-300' :
                  error.code >= 400 ? 'bg-orange-500/20 text-orange-300' :
                  'bg-green-500/20 text-green-300'
                }`}>
                  {error.code}
                </span>
                <h3 className="text-lg font-semibold text-white">
                  {error.name}
                </h3>
              </div>
              <p className="text-slate-300">
                {error.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Tips */}
      <div className="bg-slate-800/30 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Performance Tips</h2>
            <p className="text-slate-300 text-lg">Best practices for optimal API performance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Zap className="w-6 h-6 text-yellow-400 mr-3" />
                Query Optimization
              </h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Use pagination with limit parameter
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Filter results with min_calls, min_avg_time
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Cache dashboard data for 30-60 seconds
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Use specific endpoints instead of dashboard
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Database className="w-6 h-6 text-blue-400 mr-3" />
                Database Setup
              </h3>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Ensure pg_stat_statements is enabled
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Grant pg_monitor role to API user
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Set appropriate pg_stat_statements.max
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Monitor query performance regularly
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive API Explorer */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Interactive API Explorer</h2>
          <p className="text-slate-300 text-lg">Try the API directly in your browser</p>
        </div>

        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-8">
          <div className="text-center">
            <Database className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-white mb-4">
              Swagger UI Documentation
            </h3>
            <p className="text-slate-300 mb-8">
              Interactive API documentation with live testing capabilities for all pg_stat_insights endpoints
            </p>
            <a
              href="http://localhost:8000/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors"
            >
              <Code className="w-5 h-5 mr-2" />
              Open API Explorer
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PgStatInsightsApiPage;
