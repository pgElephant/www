import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'pg_stat_insights | PostgreSQL Performance Monitoring',
  description: 'Advanced PostgreSQL query performance monitoring extension with 52 metrics, 11 views, and comprehensive analytics for database optimization.'
};

export default function PgStatInsightsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">pg_stat_insights</h1>
        <p className="text-lg text-muted-foreground">
          Advanced PostgreSQL query performance monitoring, SQL optimization, and database analytics extension.
          Track 52 comprehensive metrics across 11 pre-built views to identify slow queries, optimize cache performance, and monitor database health in real-time.
        </p>
      </div>

      <section className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Key Features</h3>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <ul className="space-y-1">
            <li>✅ <strong>52 metric columns</strong> - Execution time, cache hits, WAL generation, JIT stats, buffer I/O</li>
            <li>✅ <strong>11 pre-built views</strong> - Top slow queries, cache misses, I/O intensive operations</li>
            <li>✅ <strong>5 GUC parameters</strong> - Fine-tune tracking and statistics collection</li>
          </ul>
          <ul className="space-y-1">
            <li>✅ <strong>Drop-in replacement</strong> for pg_stat_statements with enhanced metrics</li>
            <li>✅ <strong>PostgreSQL 16-18</strong> - Full compatibility with latest versions</li>
            <li>✅ <strong>Prometheus/Grafana ready</strong> - Pre-built dashboards included</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Quick Start</h2>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Install in 3 Steps</h3>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>{`-- Step 1: Enable extension in PostgreSQL configuration
ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_insights';
-- Restart PostgreSQL server required

-- Step 2: Create the extension in your database
CREATE EXTENSION pg_stat_insights;

-- Step 3: View your slowest queries instantly
SELECT 
    query,
    calls,
    total_exec_time,
    mean_exec_time,
    rows
FROM pg_stat_insights_top_by_time 
LIMIT 10;`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Documentation Pages</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <a href="/docs/pg_stat_insights/overview" className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
            <h3 className="font-semibold mb-2">Overview & Installation</h3>
            <p className="text-sm text-muted-foreground">Get started with pg_stat_insights, installation guide, and basic configuration</p>
          </a>
          <a href="/docs/pg_stat_insights/views" className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
            <h3 className="font-semibold mb-2">Views Reference</h3>
            <p className="text-sm text-muted-foreground">Complete documentation for all 11 pre-built views with examples</p>
          </a>
          <a href="/docs/pg_stat_insights/metrics" className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
            <h3 className="font-semibold mb-2">Metrics Guide</h3>
            <p className="text-sm text-muted-foreground">Detailed explanation of all 52 metric columns and how to use them</p>
          </a>
          <a href="/docs/pg_stat_insights/configuration" className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
            <h3 className="font-semibold mb-2">Configuration</h3>
            <p className="text-sm text-muted-foreground">All 5 GUC parameters with tuning recommendations</p>
          </a>
          <a href="/docs/pg_stat_insights/usage" className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
            <h3 className="font-semibold mb-2">Usage Examples</h3>
            <p className="text-sm text-muted-foreground">50+ SQL queries for performance analysis and optimization</p>
          </a>
          <a href="/docs/pg_stat_insights/monitoring" className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
            <h3 className="font-semibold mb-2">Prometheus & Grafana</h3>
            <p className="text-sm text-muted-foreground">Integration guide with pre-built dashboards and alert rules</p>
          </a>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Comparison with Other Extensions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead className="bg-muted">
              <tr>
                <th className="border border-gray-300 dark:border-gray-700 p-3 text-left">Feature</th>
                <th className="border border-gray-300 dark:border-gray-700 p-3 text-center">pg_stat_statements</th>
                <th className="border border-gray-300 dark:border-gray-700 p-3 text-center">pg_stat_monitor</th>
                <th className="border border-gray-300 dark:border-gray-700 p-3 text-center font-semibold">pg_stat_insights</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 p-3">Metric Columns</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3 text-center">44</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3 text-center">58</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3 text-center font-semibold bg-green-50 dark:bg-green-900/20">52</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 p-3">Pre-built Views</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3 text-center">2</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3 text-center">5</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3 text-center font-semibold bg-green-50 dark:bg-green-900/20">11</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 p-3">Configuration Options</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3 text-center">5</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3 text-center">12</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3 text-center font-semibold bg-green-50 dark:bg-green-900/20">5</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 p-3">Cache Analysis</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3 text-center">Basic</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3 text-center">Basic</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3 text-center font-semibold bg-green-50 dark:bg-green-900/20">Enhanced with ratios</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 p-3">Response Time Categories</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3 text-center">No</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3 text-center">No</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3 text-center font-semibold bg-green-50 dark:bg-green-900/20">Yes (&lt;1ms to &gt;10s)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 p-3">Time-Series Tracking</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3 text-center">No</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3 text-center">No</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3 text-center font-semibold bg-green-50 dark:bg-green-900/20">Yes (bucket-based)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 p-3">Prometheus Integration</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3 text-center">Manual</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3 text-center">Manual</td>
                <td className="border border-gray-300 dark:border-gray-700 p-3 text-center font-semibold bg-green-50 dark:bg-green-900/20">Pre-built queries & dashboards</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Why Choose pg_stat_insights?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">🔍 Find Slow Queries</h3>
            <p className="text-sm text-muted-foreground">
              Identify queries consuming excessive execution time and resources with pre-built views sorted by total time, mean time, and call frequency.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">💾 Optimize Cache Usage</h3>
            <p className="text-sm text-muted-foreground">
              Detect buffer cache misses and improve shared_buffers efficiency with enhanced cache hit ratio calculations and analysis views.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">📊 Track WAL Overhead</h3>
            <p className="text-sm text-muted-foreground">
              Monitor write-ahead log generation per query type to identify heavy write operations and optimize WAL settings.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">⚡ Real-time Monitoring</h3>
            <p className="text-sm text-muted-foreground">
              Integrate with Grafana for live dashboards and alerting with pre-configured Prometheus queries and alert rules.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">All 11 Views at a Glance</h2>
        <div className="space-y-3">
          {[
            { name: 'pg_stat_insights', desc: 'Main statistics view with all 52 metric columns' },
            { name: 'pg_stat_insights_top_by_time', desc: 'Slowest queries by total execution time (top 100)' },
            { name: 'pg_stat_insights_top_by_calls', desc: 'Most frequently called queries (top 100)' },
            { name: 'pg_stat_insights_top_by_io', desc: 'Highest I/O consumers (blocks read, top 100)' },
            { name: 'pg_stat_insights_top_cache_misses', desc: 'Queries with poor cache performance (top 100)' },
            { name: 'pg_stat_insights_slow_queries', desc: 'Queries with mean execution time > 100ms' },
            { name: 'pg_stat_insights_errors', desc: 'Queries with execution errors (requires tracking)' },
            { name: 'pg_stat_insights_plan_errors', desc: 'Queries with plan estimation issues' },
            { name: 'pg_stat_insights_histogram_summary', desc: 'Response time distribution by category' },
            { name: 'pg_stat_insights_by_bucket', desc: 'Time-series aggregation with statistics' },
            { name: 'pg_stat_insights_replication', desc: 'Replication lag and status monitoring' },
          ].map((view) => (
            <div key={view.name} className="p-3 border border-gray-300 dark:border-gray-700 rounded">
              <code className="text-sm font-semibold text-blue-600 dark:text-blue-400">{view.name}</code>
              <p className="text-sm text-muted-foreground mt-1">{view.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
        <ul className="space-y-3 text-muted-foreground">
          <li>
            <strong>Database Administrators:</strong> Monitor PostgreSQL performance, identify slow queries, and optimize database operations
          </li>
          <li>
            <strong>DevOps Teams:</strong> Track query performance and resource usage in production environments with real-time metrics
          </li>
          <li>
            <strong>Developers:</strong> Optimize SQL queries during development using detailed execution statistics and cache analysis
          </li>
          <li>
            <strong>SREs:</strong> Implement database monitoring and alerting with Prometheus/Grafana integration
          </li>
          <li>
            <strong>Performance Engineers:</strong> Analyze query patterns, execution frequency, response times, and resource consumption
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
        <ul className="space-y-2">
          <li>
            <a href="/docs/pg_stat_insights/overview" className="text-blue-600 hover:underline">
              Overview & Installation
            </a> - Get started with pg_stat_insights
          </li>
          <li>
            <a href="/docs/pg_stat_insights/views" className="text-blue-600 hover:underline">
              Views Reference
            </a> - Complete documentation for all 11 views
          </li>
          <li>
            <a href="/docs/pg_stat_insights/metrics" className="text-blue-600 hover:underline">
              Metrics Guide
            </a> - Understand all 52 metric columns
          </li>
          <li>
            <a href="/docs/pg_stat_insights/usage" className="text-blue-600 hover:underline">
              Usage Examples
            </a> - 50+ SQL queries for performance analysis
          </li>
        </ul>
      </section>
    </div>
  );
}
