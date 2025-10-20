import React from 'react';
import { Metadata } from 'next';
import { 
  Database, TrendingUp, BarChart3, Search, Cpu, HardDrive,
  Network, CheckCircle, AlertTriangle, LineChart, Activity,
  BookOpen, Code, Settings, Monitor, Download, Terminal,
  ArrowRight, Clock, Zap, Eye, Shield
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'pg_stat_insights Getting Started - Performance Analytics Setup',
  description: 'Complete getting started guide for pg_stat_insights - deep PostgreSQL performance analytics. Installation, configuration, and first insights dashboard.',
  keywords: [
    'pg_stat_insights getting started', 'PostgreSQL performance analytics', 'query optimization setup',
    'database monitoring quickstart', 'performance insights installation', 'PostgreSQL extensions setup'
  ].join(', '),
  openGraph: {
    title: 'pg_stat_insights Getting Started - Performance Analytics Setup',
    description: 'Complete getting started guide for pg_stat_insights performance analytics.',
    type: 'website',
    url: 'https://www.pgelephant.com/docs/pg-stat-insights/getting-started',
    siteName: 'pgElephant',
  },
};

const PgStatInsightsGettingStartedPage = () => {
  const steps = [
    {
      step: 1,
      title: 'PostgreSQL Extensions',
      description: 'Install required PostgreSQL extensions for deep analytics',
      icon: <Database className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-white mb-2">Core Extensions</h4>
            <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm">
              <div className="text-slate-300">-- Connect to your PostgreSQL database</div>
              <div className="text-blue-300">psql -U postgres -d your_database</div>
              <div className="text-slate-300">-- Enable pg_stat_statements (required)</div>
              <div className="text-blue-300">CREATE EXTENSION IF NOT EXISTS pg_stat_statements;</div>
              <div className="text-slate-300">-- Enable additional analytics extensions</div>
              <div className="text-blue-300">CREATE EXTENSION IF NOT EXISTS pg_stat_kcache;</div>
              <div className="text-blue-300">CREATE EXTENSION IF NOT EXISTS pg_qualstats;</div>
              <div className="text-blue-300">CREATE EXTENSION IF NOT EXISTS pg_buffercache;</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Configuration</h4>
            <div className="bg-slate-800 p-4 rounded-lg text-sm">
              <div className="text-slate-300 mb-2">Add to postgresql.conf:</div>
              <div className="text-blue-300">shared_preload_libraries = 'pg_stat_statements'</div>
              <div className="text-blue-300">pg_stat_statements.max = 10000</div>
              <div className="text-blue-300">pg_stat_statements.track = all</div>
              <div className="text-slate-400 text-xs mt-2">Restart PostgreSQL after changes</div>
            </div>
          </div>
        </div>
      )
    },
    {
      step: 2,
      title: 'Installation',
      description: 'Install pg_stat_insights Python package',
      icon: <Download className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-white mb-2">Python Package</h4>
            <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm">
              <div className="text-slate-300"># Install via pip</div>
              <div className="text-blue-300">pip install pg-stat-insights</div>
              <div className="text-slate-300"># Or install from source</div>
              <div className="text-blue-300">git clone https://github.com/pgelephant/pg-stat-insights.git</div>
              <div className="text-blue-300">cd pg-stat-insights</div>
              <div className="text-blue-300">pip install -e .</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Dependencies</h4>
            <div className="bg-slate-800 p-4 rounded-lg text-sm">
              <div className="text-slate-300 mb-2">Required Python packages:</div>
              <div className="text-blue-300">asyncpg{'>='}0.29.0</div>
              <div className="text-blue-300">psycopg2-binary{'>='}2.9.0</div>
              <div className="text-blue-300">pydantic{'>='}2.0.0</div>
              <div className="text-blue-300">psutil{'>='}5.9.0</div>
            </div>
          </div>
        </div>
      )
    },
    {
      step: 3,
      title: 'Basic Usage',
      description: 'Connect and start collecting insights',
      icon: <Code className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-white mb-2">Simple Connection</h4>
            <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm">
              <div className="text-slate-300">import asyncio</div>
              <div className="text-slate-300">from pg_stat_insights import PgStatInsights</div>
              <div className="text-slate-300">async def main():</div>
              <div className="text-blue-300">    # Connect to PostgreSQL</div>
              <div className="text-blue-300">    insights = PgStatInsights(</div>
              <div className="text-blue-300">        "postgresql://user:pass@localhost:5432/dbname"</div>
              <div className="text-blue-300">    )</div>
              <div className="text-blue-300">    await insights.connect()</div>
              <div className="text-blue-300">    # Get dashboard data</div>
              <div className="text-blue-300">    dashboard = await insights.get_complete_dashboard()</div>
              <div className="text-blue-300">    print(dashboard)</div>
              <div className="text-blue-300">    await insights.close()</div>
              <div className="text-slate-300">asyncio.run(main())</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Environment Variables</h4>
            <div className="bg-slate-800 p-4 rounded-lg text-sm">
              <div className="text-slate-300 mb-2">Set connection details:</div>
              <div className="text-blue-300">export DATABASE_URL="postgresql://user:pass@localhost:5432/dbname"</div>
              <div className="text-slate-300"># Or use .env file</div>
              <div className="text-blue-300">DATABASE_URL=postgresql://user:pass@localhost:5432/dbname</div>
            </div>
          </div>
        </div>
      )
    },
    {
      step: 4,
      title: 'Integration with pgSentinel',
      description: 'Use with pgSentinel monitoring platform',
      icon: <Monitor className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-white mb-2">pgSentinel Integration</h4>
            <div className="bg-slate-800 p-4 rounded-lg text-sm">
              <div className="text-slate-300 mb-2">pg_stat_insights is automatically integrated with pgSentinel:</div>
              <ul className="space-y-1 text-slate-300">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Real-time dashboard at /insights
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  REST API endpoints for programmatic access
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Prometheus metrics export
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  Grafana dashboard integration
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">API Endpoints</h4>
            <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm">
              <div className="text-slate-300"># Available endpoints</div>
              <div className="text-blue-300">GET /api/v1/insights/dashboard</div>
              <div className="text-blue-300">GET /api/v1/insights/queries</div>
              <div className="text-blue-300">GET /api/v1/insights/tables</div>
              <div className="text-blue-300">GET /api/v1/insights/indexes</div>
              <div className="text-blue-300">GET /api/v1/insights/recommendations</div>
            </div>
          </div>
        </div>
      )
    },
    {
      step: 5,
      title: 'First Insights',
      description: 'Explore your database performance data',
      icon: <Eye className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-white mb-2">Query Performance</h4>
            <div className="bg-slate-800 p-4 rounded-lg text-sm">
              <div className="text-slate-300 mb-2">Start by analyzing query performance:</div>
              <ul className="space-y-1 text-slate-300">
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-blue-400 mr-2" />
                  Identify slowest queries by execution time
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-blue-400 mr-2" />
                  Find most frequently executed queries
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-blue-400 mr-2" />
                  Analyze query patterns and optimization opportunities
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-2">Table & Index Analysis</h4>
            <div className="bg-slate-800 p-4 rounded-lg text-sm">
              <div className="text-slate-300 mb-2">Monitor table and index health:</div>
              <ul className="space-y-1 text-slate-300">
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-purple-400 mr-2" />
                  Detect table bloat and vacuum needs
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-purple-400 mr-2" />
                  Find unused or missing indexes
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-purple-400 mr-2" />
                  Monitor cache hit ratios
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    }
  ];

  const quickStart = [
    {
      title: 'Query Analysis',
      description: 'Find slow queries and optimization opportunities',
      icon: <Search className="w-6 h-6" />,
      code: `# Get top slow queries
queries = await insights.get_query_insights(limit=10)
for query in queries:
    print(f"Query: {query['query'][:100]}...")
    print(f"Avg time: {query['avg_time']}ms")
    print(f"Calls: {query['calls']}")
    print("---")`
    },
    {
      title: 'Table Statistics',
      description: 'Monitor table health and bloat',
      icon: <HardDrive className="w-6 h-6" />,
      code: `# Get table statistics
tables = await insights.get_table_stats()
for table in tables:
    print(f"Table: {table['table_name']}")
    print(f"Bloat: {table['bloat_percentage']}%")
    print(f"Size: {table['size_mb']}MB")
    print("---")`
    },
    {
      title: 'Cache Analysis',
      description: 'Monitor buffer cache performance',
      icon: <Cpu className="w-6 h-6" />,
      code: `# Get cache hit ratio
cache_stats = await insights.get_cache_stats()
print(f"Buffer hit ratio: {cache_stats['buffer_hit_ratio']}%")
print(f"Index hit ratio: {cache_stats['index_hit_ratio']}%")
print(f"Toast hit ratio: {cache_stats['toast_hit_ratio']}%")`
    },
    {
      title: 'Recommendations',
      description: 'Get intelligent optimization suggestions',
      icon: <TrendingUp className="w-6 h-6" />,
      code: `# Get performance recommendations
recommendations = await insights.get_recommendations()
for rec in recommendations:
    print(f"Priority: {rec['priority']}")
    print(f"Type: {rec['type']}")
    print(f"Description: {rec['description']}")
    print("---")`
    }
  ];

  const troubleshooting = [
    {
      issue: 'Extension not found',
      solution: 'Ensure PostgreSQL extensions are properly installed and enabled',
      commands: ['\\dx', 'CREATE EXTENSION pg_stat_statements;']
    },
    {
      issue: 'Connection refused',
      solution: 'Check database connection string and PostgreSQL is running',
      commands: ['psql $DATABASE_URL', 'systemctl status postgresql']
    },
    {
      issue: 'No data in pg_stat_statements',
      solution: 'Restart PostgreSQL after enabling extension and run some queries',
      commands: ['SELECT * FROM pg_stat_statements LIMIT 1;', 'systemctl restart postgresql']
    },
    {
      issue: 'Permission denied',
      solution: 'Ensure user has proper permissions to access system catalogs',
      commands: ['GRANT pg_monitor TO your_user;', 'GRANT SELECT ON pg_stat_statements TO your_user;']
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
                <Database className="w-16 h-16 text-cyan-500 animate-pulse" />
                <TrendingUp className="w-6 h-6 text-blue-400 absolute -top-1 -left-1 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <BarChart3 className="w-6 h-6 text-purple-400 absolute -top-1 -right-1" />
                <Search className="w-5 h-5 text-green-400 absolute -bottom-1 -right-1 animate-bounce" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Getting Started with
              <span className="block text-3xl md:text-4xl text-cyan-300 font-light mt-2">
                pg_stat_insights
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
              Deep PostgreSQL performance analytics in minutes. 
              Identify bottlenecks, optimize queries, and monitor database health.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-cyan-500/20 border border-cyan-500/30 px-4 py-2 rounded-lg text-cyan-300">
                <Clock className="w-4 h-4 inline mr-2" />
                2-minute setup
              </div>
              <div className="bg-blue-500/20 border border-blue-500/30 px-4 py-2 rounded-lg text-blue-300">
                <Database className="w-4 h-4 inline mr-2" />
                PostgreSQL native
              </div>
              <div className="bg-green-500/20 border border-green-500/30 px-4 py-2 rounded-lg text-green-300">
                <CheckCircle className="w-4 h-4 inline mr-2" />
                Zero dependencies
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Setup Steps */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Setup Steps</h2>
          <p className="text-slate-300 text-lg">Follow these steps to start analyzing your PostgreSQL performance</p>
        </div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-8 top-16 w-0.5 h-12 bg-gradient-to-b from-cyan-500 to-blue-500" />
              )}
              
              <div className="flex items-start">
                {/* Step Number */}
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {step.step}
                </div>
                
                {/* Content */}
                <div className="ml-8 flex-1">
                  <div className="flex items-center mb-4">
                    <div className="text-cyan-400 mr-3">
                      {step.icon}
                    </div>
                    <h3 className="text-2xl font-semibold text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-slate-300 text-lg mb-6">
                    {step.description}
                  </p>
                  
                  <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
                    {step.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Start Examples */}
      <div className="bg-slate-800/30 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Quick Start Examples</h2>
            <p className="text-slate-300 text-lg">Get started with common analytics tasks</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {quickStart.map((example, index) => (
              <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="text-cyan-400 mr-3">
                    {example.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {example.title}
                  </h3>
                </div>
                <p className="text-slate-300 mb-4">
                  {example.description}
                </p>
                <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre className="text-slate-300 whitespace-pre-wrap">{example.code}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Troubleshooting</h2>
          <p className="text-slate-300 text-lg">Common issues and solutions</p>
        </div>

        <div className="space-y-6">
          {troubleshooting.map((item, index) => (
            <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-orange-400 mr-4 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {item.issue}
                  </h3>
                  <p className="text-slate-300 mb-4">
                    {item.solution}
                  </p>
                  <div className="space-y-2">
                    {item.commands.map((command, cmdIndex) => (
                      <div key={cmdIndex} className="bg-slate-800 p-3 rounded-lg font-mono text-sm">
                        <div className="text-slate-300">$ {command}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Next Steps</h2>
          <p className="text-slate-300 text-lg mb-8">
            Now that pg_stat_insights is set up, explore advanced analytics and integration options.
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
              href="/docs/pg-stat-insights/best-practices"
              className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800/50 transition-colors group"
            >
              <TrendingUp className="w-8 h-8 text-purple-400 mb-4 group-hover:text-purple-300" />
              <h3 className="text-lg font-semibold text-white mb-2">Best Practices</h3>
              <p className="text-slate-300 text-sm">Optimization strategies and monitoring tips</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PgStatInsightsGettingStartedPage;
