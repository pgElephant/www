import React from 'react';
import { Metadata } from 'next';
import { 
  Code, Database, Activity, TrendingUp, Eye, Bell, BarChart3, 
  Network, Cpu, HardDrive, Clock, Server, Zap, Globe, 
  CheckCircle, AlertTriangle, LineChart, BookOpen, Settings, 
  Monitor, Download, Terminal, Container, ArrowRight, Copy
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'pgSentinel API Reference - Complete REST API Documentation',
  description: 'Complete REST API reference for pgSentinel monitoring platform. All endpoints, parameters, responses, and examples for pgbalancer management and monitoring.',
  keywords: [
    'pgSentinel API', 'REST API documentation', 'pgbalancer API', 'monitoring API',
    'PostgreSQL monitoring endpoints', 'real-time metrics API', 'WebSocket API'
  ].join(', '),
  openGraph: {
    title: 'pgSentinel API Reference - Complete REST API Documentation',
    description: 'Complete REST API reference for pgSentinel monitoring platform.',
    type: 'website',
    url: 'https://www.pgelephant.com/docs/pgsentinel/api',
    siteName: 'pgElephant',
  },
};

const PgSentinelApiPage = () => {
  const baseUrl = 'http://localhost:8000/api/v1';
  
  const endpoints = [
    {
      category: 'System Health',
      color: 'blue',
      endpoints: [
        {
          method: 'GET',
          path: '/health',
          description: 'Get system health status',
          parameters: [],
          response: {
            status: 'healthy',
            timestamp: '2024-01-15T10:30:00Z',
            services: {
              database: 'connected',
              redis: 'connected',
              prometheus: 'active'
            }
          }
        },
        {
          method: 'GET',
          path: '/status',
          description: 'Get detailed system status',
          parameters: [],
          response: {
            uptime: 3600,
            memory_usage: '45%',
            cpu_usage: '12%',
            active_connections: 15,
            total_queries: 1250
          }
        }
      ]
    },
    {
      category: 'pgbalancer Management',
      color: 'purple',
      endpoints: [
        {
          method: 'GET',
          path: '/pgbalancer/status',
          description: 'Get pgbalancer connection status',
          parameters: [],
          response: {
            connected: true,
            version: '1.0.0',
            uptime: 3600,
            active_connections: 8,
            total_connections: 150
          }
        },
        {
          method: 'POST',
          path: '/pgbalancer/reload',
          description: 'Reload pgbalancer configuration',
          parameters: [],
          response: {
            success: true,
            message: 'Configuration reloaded successfully'
          }
        },
        {
          method: 'GET',
          path: '/pgbalancer/pools',
          description: 'Get connection pool statistics',
          parameters: [],
          response: {
            pools: [
              {
                name: 'postgres',
                active_connections: 5,
                idle_connections: 3,
                total_connections: 8,
                max_connections: 100
              }
            ]
          }
        }
      ]
    },
    {
      category: 'Real-time Metrics',
      color: 'green',
      endpoints: [
        {
          method: 'GET',
          path: '/metrics/live',
          description: 'Get real-time metrics',
          parameters: [],
          response: {
            timestamp: '2024-01-15T10:30:00Z',
            connections: {
              active: 15,
              idle: 8,
              total: 23
            },
            performance: {
              queries_per_second: 45.2,
              avg_response_time: 12.5,
              cache_hit_ratio: 98.5
            }
          }
        },
        {
          method: 'GET',
          path: '/metrics/history',
          description: 'Get historical metrics',
          parameters: [
            { name: 'start_time', type: 'string', required: true, description: 'Start time (ISO 8601)' },
            { name: 'end_time', type: 'string', required: false, description: 'End time (ISO 8601)' },
            { name: 'interval', type: 'string', required: false, description: 'Data interval (1m, 5m, 1h)' }
          ],
          response: {
            data: [
              {
                timestamp: '2024-01-15T10:00:00Z',
                connections: 15,
                queries_per_second: 42.1,
                avg_response_time: 11.8
              }
            ]
          }
        }
      ]
    },
    {
      category: 'pg_stat_insights',
      color: 'cyan',
      endpoints: [
        {
          method: 'GET',
          path: '/insights/dashboard',
          description: 'Get complete insights dashboard data',
          parameters: [],
          response: {
            query_stats: {
              total_queries: 1250,
              slow_queries: 23,
              avg_execution_time: 12.5
            },
            table_stats: {
              total_tables: 45,
              bloated_tables: 3,
              total_size_mb: 1024
            },
            cache_stats: {
              buffer_hit_ratio: 98.5,
              index_hit_ratio: 99.2
            }
          }
        },
        {
          method: 'GET',
          path: '/insights/queries',
          description: 'Get query performance insights',
          parameters: [
            { name: 'limit', type: 'integer', required: false, description: 'Number of queries to return (default: 20)' },
            { name: 'order_by', type: 'string', required: false, description: 'Sort by: calls, total_time, avg_time' }
          ],
          response: {
            queries: [
              {
                query: 'SELECT * FROM users WHERE id = $1',
                calls: 150,
                total_time: 1250.5,
                avg_time: 8.34,
                rows: 1
              }
            ]
          }
        },
        {
          method: 'GET',
          path: '/insights/tables',
          description: 'Get table statistics and bloat analysis',
          parameters: [],
          response: {
            tables: [
              {
                table_name: 'users',
                size_mb: 45.2,
                bloat_percentage: 5.2,
                last_vacuum: '2024-01-15T08:00:00Z',
                last_analyze: '2024-01-15T08:00:00Z'
              }
            ]
          }
        },
        {
          method: 'GET',
          path: '/insights/indexes',
          description: 'Get index usage statistics',
          parameters: [],
          response: {
            indexes: [
              {
                index_name: 'idx_users_email',
                table_name: 'users',
                usage_count: 1250,
                size_mb: 2.1,
                is_used: true
              }
            ]
          }
        },
        {
          method: 'GET',
          path: '/insights/recommendations',
          description: 'Get performance optimization recommendations',
          parameters: [],
          response: {
            recommendations: [
              {
                type: 'missing_index',
                priority: 'high',
                description: 'Add index on users.email for faster lookups',
                impact: 'Reduce query time by 80%'
              }
            ]
          }
        }
      ]
    },
    {
      category: 'WebSocket Events',
      color: 'orange',
      endpoints: [
        {
          method: 'WS',
          path: '/ws/live',
          description: 'Real-time metrics WebSocket connection',
          parameters: [],
          events: [
            {
              event: 'metrics_update',
              description: 'Real-time metrics data',
              data: {
                timestamp: '2024-01-15T10:30:00Z',
                connections: 15,
                queries_per_second: 45.2
              }
            },
            {
              event: 'alert',
              description: 'System alert notification',
              data: {
                level: 'warning',
                message: 'High connection count detected',
                timestamp: '2024-01-15T10:30:00Z'
              }
            }
          ]
        }
      ]
    }
  ];

  const codeExamples = [
    {
      title: 'Python Client',
      language: 'python',
      code: `import requests
import json
from datetime import datetime, timedelta

class PgSentinelClient:
    def __init__(self, base_url="http://localhost:8000/api/v1"):
        self.base_url = base_url
        self.session = requests.Session()
    
    def get_health(self):
        """Get system health status"""
        response = self.session.get(f"{self.base_url}/health")
        return response.json()
    
    def get_metrics(self, start_time=None, end_time=None):
        """Get historical metrics"""
        params = {}
        if start_time:
            params['start_time'] = start_time.isoformat()
        if end_time:
            params['end_time'] = end_time.isoformat()
        
        response = self.session.get(f"{self.base_url}/metrics/history", params=params)
        return response.json()
    
    def get_query_insights(self, limit=20):
        """Get query performance insights"""
        response = self.session.get(f"{self.base_url}/insights/queries", 
                                  params={'limit': limit})
        return response.json()

# Usage
client = PgSentinelClient()
health = client.get_health()
print(f"System status: {health['status']}")

# Get metrics for last hour
end_time = datetime.now()
start_time = end_time - timedelta(hours=1)
metrics = client.get_metrics(start_time, end_time)
print(f"Data points: {len(metrics['data'])}")`
    },
    {
      title: 'JavaScript/Node.js Client',
      language: 'javascript',
      code: `class PgSentinelClient {
    constructor(baseUrl = 'http://localhost:8000/api/v1') {
        this.baseUrl = baseUrl;
    }
    
    async request(endpoint, options = {}) {
        const url = \`\${this.baseUrl}\${endpoint}\`;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        
        return response.json();
    }
    
    async getHealth() {
        return this.request('/health');
    }
    
    async getMetrics(startTime, endTime) {
        const params = new URLSearchParams();
        if (startTime) params.append('start_time', startTime.toISOString());
        if (endTime) params.append('end_time', endTime.toISOString());
        
        return this.request(\`/metrics/history?\${params}\`);
    }
    
    async getQueryInsights(limit = 20) {
        return this.request(\`/insights/queries?limit=\${limit}\`);
    }
    
    // WebSocket connection for real-time data
    connectWebSocket(onMessage) {
        const ws = new WebSocket('ws://localhost:8000/ws/live');
        
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            onMessage(data);
        };
        
        return ws;
    }
}

// Usage
const client = new PgSentinelClient();

// Get system health
client.getHealth().then(health => {
    console.log('System status:', health.status);
});

// Connect to real-time updates
const ws = client.connectWebSocket((data) => {
    console.log('Real-time update:', data);
});`
    },
    {
      title: 'cURL Examples',
      language: 'bash',
      code: `# Get system health
curl -X GET "http://localhost:8000/api/v1/health" \\
  -H "Content-Type: application/json"

# Get real-time metrics
curl -X GET "http://localhost:8000/api/v1/metrics/live" \\
  -H "Content-Type: application/json"

# Get query insights
curl -X GET "http://localhost:8000/api/v1/insights/queries?limit=10" \\
  -H "Content-Type: application/json"

# Get historical metrics
curl -X GET "http://localhost:8000/api/v1/metrics/history?start_time=2024-01-15T09:00:00Z&interval=5m" \\
  -H "Content-Type: application/json"

# Reload pgbalancer configuration
curl -X POST "http://localhost:8000/api/v1/pgbalancer/reload" \\
  -H "Content-Type: application/json"

# Get table statistics
curl -X GET "http://localhost:8000/api/v1/insights/tables" \\
  -H "Content-Type: application/json"`
    }
  ];

  const errorCodes = [
    { code: 400, name: 'Bad Request', description: 'Invalid request parameters or malformed JSON' },
    { code: 401, name: 'Unauthorized', description: 'Authentication required or invalid credentials' },
    { code: 403, name: 'Forbidden', description: 'Insufficient permissions for the requested resource' },
    { code: 404, name: 'Not Found', description: 'Requested resource does not exist' },
    { code: 422, name: 'Unprocessable Entity', description: 'Request validation failed' },
    { code: 429, name: 'Too Many Requests', description: 'Rate limit exceeded' },
    { code: 500, name: 'Internal Server Error', description: 'Unexpected server error' },
    { code: 503, name: 'Service Unavailable', description: 'Service temporarily unavailable' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Code className="w-16 h-16 text-blue-500 animate-pulse" />
                <Database className="w-6 h-6 text-purple-400 absolute -top-1 -left-1 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <Activity className="w-6 h-6 text-green-400 absolute -top-1 -right-1" />
                <Globe className="w-5 h-5 text-orange-400 absolute -bottom-1 -right-1 animate-bounce" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              pgSentinel
              <span className="block text-3xl md:text-4xl text-blue-300 font-light mt-2">
                API Reference
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Complete REST API documentation for pgSentinel monitoring platform. 
              All endpoints, parameters, responses, and code examples.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-blue-500/20 border border-blue-500/30 px-4 py-2 rounded-lg text-blue-300">
                <Code className="w-4 h-4 inline mr-2" />
                25+ endpoints
              </div>
              <div className="bg-purple-500/20 border border-purple-500/30 px-4 py-2 rounded-lg text-purple-300">
                <Globe className="w-4 h-4 inline mr-2" />
                REST + WebSocket
              </div>
              <div className="bg-green-500/20 border border-green-500/30 px-4 py-2 rounded-lg text-green-300">
                <CheckCircle className="w-4 h-4 inline mr-2" />
                Production ready
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Base URL */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Server className="w-6 h-6 text-blue-400 mr-3" />
            Base URL
          </h2>
          <div className="bg-slate-800 p-4 rounded-lg font-mono text-lg">
            <span className="text-slate-300">http://localhost:8000/api/v1</span>
          </div>
          <p className="text-slate-400 text-sm mt-2">
            All API endpoints are prefixed with this base URL
          </p>
        </div>
      </div>

      {/* API Endpoints */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">API Endpoints</h2>
          <p className="text-slate-300 text-lg">Complete reference for all available endpoints</p>
        </div>

        <div className="space-y-12">
          {endpoints.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-slate-900/50 border border-slate-700 rounded-xl p-8">
              <div className="flex items-center mb-8">
                <div className={`w-3 h-3 rounded-full bg-${category.color}-500 mr-4`}></div>
                <h3 className="text-2xl font-semibold text-white">
                  {category.category}
                </h3>
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
                                  <td className="px-4 py-2 font-mono text-blue-300">{param.name}</td>
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

                    {'response' in endpoint && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-white mb-2">Response</h4>
                        <div className="bg-slate-800 p-4 rounded-lg">
                          <pre className="text-slate-300 text-sm overflow-x-auto">
                            {JSON.stringify(endpoint.response, null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}

                    {'events' in endpoint && (
                      <div>
                        <h4 className="font-semibold text-white mb-2">WebSocket Events</h4>
                        <div className="space-y-3">
                          {endpoint.events.map((event, eventIndex) => (
                            <div key={eventIndex} className="bg-slate-800 p-4 rounded-lg">
                              <div className="flex items-center mb-2">
                                <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-sm font-mono mr-3">
                                  {event.event}
                                </span>
                                <span className="text-slate-300">{event.description}</span>
                              </div>
                              <div className="bg-slate-900 p-3 rounded">
                                <pre className="text-slate-300 text-sm">
                                  {JSON.stringify(event.data, null, 2)}
                                </pre>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
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
                  <Code className="w-6 h-6 text-blue-400 mr-3" />
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

      {/* Rate Limiting */}
      <div className="bg-slate-800/30 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Rate Limiting</h2>
            <p className="text-slate-300 text-lg">API usage limits and best practices</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 text-center">
              <Clock className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Standard Limit</h3>
              <p className="text-2xl font-bold text-blue-300 mb-2">1000 requests</p>
              <p className="text-slate-300 text-sm">per hour per IP</p>
            </div>
            
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 text-center">
              <Zap className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Burst Limit</h3>
              <p className="text-2xl font-bold text-purple-300 mb-2">100 requests</p>
              <p className="text-slate-300 text-sm">per minute per IP</p>
            </div>
            
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 text-center">
              <AlertTriangle className="w-8 h-8 text-orange-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">WebSocket</h3>
              <p className="text-2xl font-bold text-orange-300 mb-2">No limit</p>
              <p className="text-slate-300 text-sm">real-time connections</p>
            </div>
          </div>

          <div className="mt-12 bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Rate Limit Headers</h3>
            <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm">
              <div className="text-slate-300">X-RateLimit-Limit: 1000</div>
              <div className="text-slate-300">X-RateLimit-Remaining: 999</div>
              <div className="text-slate-300">X-RateLimit-Reset: 1642248000</div>
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
            <Globe className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-white mb-4">
              Swagger UI Documentation
            </h3>
            <p className="text-slate-300 mb-8">
              Interactive API documentation with live testing capabilities
            </p>
            <a
              href="http://localhost:8000/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
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

export default PgSentinelApiPage;
