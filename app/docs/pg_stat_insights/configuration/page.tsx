export default function ConfigurationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Configuration Reference</h1>
          <p className="text-xl text-slate-300">Complete guide to pg_stat_insights GUC parameters with tuning recommendations for optimal performance monitoring</p>
        </div>

        <div className="space-y-8">
          {/* Overview */}
          <section className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Configuration Overview</h2>
            <p className="text-slate-300 mb-6">
              pg_stat_insights provides 5 GUC (Grand Unified Configuration) parameters to control statement tracking behavior,
              storage limits, and what types of statements to monitor. All parameters can be set in postgresql.conf or via SQL.
            </p>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Configuration Example</h3>
              <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700">
                <code>{`# Add to postgresql.conf
shared_preload_libraries = 'pg_stat_insights'  # Required
pg_stat_insights.max = 5000                     # Track up to 5000 unique queries
pg_stat_insights.track = 'all'                  # Track all statements
pg_stat_insights.track_utility = true           # Include DDL/utility commands
pg_stat_insights.track_planning = true          # Track planning time (adds overhead)
pg_stat_insights.save = true                    # Persist stats across restarts

# Restart PostgreSQL for changes to take effect
# or use ALTER SYSTEM + pg_reload_conf() for SIGHUP-level parameters`}</code>
              </pre>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="text-sm text-slate-400 mb-1">Parameters</div>
                <div className="text-3xl font-bold text-green-400">5</div>
                <div className="text-slate-300 mt-1">GUC Variables</div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="text-sm text-slate-400 mb-1">Default Max</div>
                <div className="text-3xl font-bold text-blue-400">5000</div>
                <div className="text-slate-300 mt-1">Tracked Queries</div>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <div className="text-sm text-slate-400 mb-1">Memory Usage</div>
                <div className="text-3xl font-bold text-purple-400">~2MB</div>
                <div className="text-slate-300 mt-1">Per 1000 Queries</div>
              </div>
            </div>
          </section>

          {/* pg_stat_insights.max */}
          <section className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">pg_stat_insights.max</h2>
                <div className="flex gap-3">
                  <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm font-semibold">PGC_POSTMASTER</span>
                  <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm">Requires Restart</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                <p className="text-slate-300">
                  Maximum number of unique SQL statements tracked by pg_stat_insights. When the limit is reached,
                  the least frequently executed queries are evicted to make room for new queries.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">Data Type</div>
                  <div className="text-white font-mono">integer</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">Default Value</div>
                  <div className="text-white font-mono">5000</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">Valid Range</div>
                  <div className="text-white font-mono">100 to INT_MAX/2</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Configuration</h3>
                <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700">
                  <code>{`# Method 1: postgresql.conf
pg_stat_insights.max = 10000

# Method 2: ALTER SYSTEM (requires restart)
ALTER SYSTEM SET pg_stat_insights.max = 10000;
-- Then restart PostgreSQL

# Check current value
SHOW pg_stat_insights.max;

# Check how many slots are in use
SELECT COUNT(*) as tracked_queries,
       current_setting('pg_stat_insights.max')::int as max_queries,
       (COUNT(*)::float / current_setting('pg_stat_insights.max')::int * 100) as usage_pct
FROM pg_stat_insights;`}</code>
                </pre>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Memory Impact</h3>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-slate-300 mb-3">
                    Each tracked query consumes approximately <strong className="text-white">2-3 KB</strong> of shared memory.
                  </p>
                  <pre className="bg-slate-950 text-slate-100 p-3 rounded-lg font-mono text-sm">
{`pg_stat_insights.max = 5000   →  ~10-15 MB
pg_stat_insights.max = 10000  →  ~20-30 MB
pg_stat_insights.max = 50000  →  ~100-150 MB
pg_stat_insights.max = 100000 →  ~200-300 MB`}
                  </pre>
                  <p className="text-slate-300 mt-3 text-sm">
                    <strong className="text-yellow-400">Note:</strong> This memory is allocated from shared_buffers at PostgreSQL startup and cannot be reclaimed without a restart.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Tuning Recommendations</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-white mb-2">Small Databases (Low Query Diversity)</h4>
                    <p className="text-slate-300 text-sm mb-2">
                      Applications with &lt; 500 unique query patterns (OLTP with prepared statements)
                    </p>
                    <pre className="bg-slate-950 text-slate-100 p-3 rounded-lg font-mono text-sm">
                      <code>pg_stat_insights.max = 1000  # Plenty of headroom</code>
                    </pre>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h4 className="font-semibold text-white mb-2">Medium Databases (Moderate Query Diversity)</h4>
                    <p className="text-slate-300 text-sm mb-2">
                      Applications with 1000-5000 unique queries (typical web applications, multi-tenant SaaS)
                    </p>
                    <pre className="bg-slate-950 text-slate-100 p-3 rounded-lg font-mono text-sm">
                      <code>pg_stat_insights.max = 5000  # Default, good balance</code>
                    </pre>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold text-white mb-2">Large Databases (High Query Diversity)</h4>
                    <p className="text-slate-300 text-sm mb-2">
                      Analytical workloads, ad-hoc queries, many users with dynamic SQL
                    </p>
                    <pre className="bg-slate-950 text-slate-100 p-3 rounded-lg font-mono text-sm">
                      <code>pg_stat_insights.max = 20000  # Increase for high diversity</code>
                    </pre>
                  </div>

                  <div className="border-l-4 border-red-500 pl-4">
                    <h4 className="font-semibold text-white mb-2">Very Large Databases (Extreme Diversity)</h4>
                    <p className="text-slate-300 text-sm mb-2">
                      Multi-tenant platforms, data warehouses, ORM-heavy applications generating thousands of unique queries
                    </p>
                    <pre className="bg-slate-950 text-slate-100 p-3 rounded-lg font-mono text-sm">
                      <code>pg_stat_insights.max = 50000  # Maximum practical limit</code>
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
                <h4 className="font-semibold text-white mb-3">🎯 How to Choose the Right Value</h4>
                <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700 text-sm">
                  <code>{`-- Monitor query slot usage over time
SELECT 
  NOW() as check_time,
  COUNT(*) as tracked_queries,
  current_setting('pg_stat_insights.max')::int as max_queries,
  (COUNT(*)::float / current_setting('pg_stat_insights.max')::int * 100) as usage_pct,
  CASE 
    WHEN (COUNT(*)::float / current_setting('pg_stat_insights.max')::int) > 0.9 
    THEN '⚠️ Increase pg_stat_insights.max'
    WHEN (COUNT(*)::float / current_setting('pg_stat_insights.max')::int) > 0.7
    THEN '⚡ Monitor - approaching limit'
    ELSE '✓ Capacity OK'
  END as status
FROM pg_stat_insights;

-- If usage_pct consistently > 80%, double pg_stat_insights.max
-- If queries are being evicted frequently, you'll see new queries with recent stats_since timestamps`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* pg_stat_insights.track */}
          <section className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">pg_stat_insights.track</h2>
                <div className="flex gap-3">
                  <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm font-semibold">PGC_SUSET</span>
                  <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">Reload Only</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                <p className="text-slate-300">
                  Controls which SQL statements are tracked. Determines the granularity of statistics collection
                  and helps reduce overhead by focusing on relevant queries.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">Data Type</div>
                  <div className="text-white font-mono">enum</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">Default Value</div>
                  <div className="text-white font-mono">'top'</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">Valid Values</div>
                  <div className="text-white font-mono">'none', 'top', 'all'</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Tracking Modes</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-red-500 pl-6 bg-red-500/5 py-4 rounded-r-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <code className="bg-red-500/20 text-red-300 px-3 py-1 rounded font-mono font-semibold">none</code>
                      <span className="text-slate-400 text-sm">Tracking Disabled</span>
                    </div>
                    <p className="text-slate-300 mb-3">
                      No statement tracking. pg_stat_insights view returns no data.
                      Use when you want to completely disable the extension without uninstalling.
                    </p>
                    <pre className="bg-slate-950 text-slate-100 p-3 rounded-lg font-mono text-sm">
                      <code>ALTER SYSTEM SET pg_stat_insights.track = 'none';
SELECT pg_reload_conf();</code>
                    </pre>
                    <div className="mt-3 bg-red-500/10 border border-red-500/30 rounded p-3 text-sm text-slate-300">
                      <strong className="text-red-400">Use Case:</strong> Temporarily disable tracking in emergency situations or when debugging overhead issues.
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-6 bg-blue-500/5 py-4 rounded-r-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <code className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded font-mono font-semibold">top</code>
                      <span className="text-green-400 text-sm">✓ DEFAULT - Recommended</span>
                    </div>
                    <p className="text-slate-300 mb-3">
                      Track top-level statements only. Excludes statements executed inside functions, procedures, and triggers.
                      This is the <strong className="text-white">recommended setting</strong> for most production environments.
                    </p>
                    <pre className="bg-slate-950 text-slate-100 p-3 rounded-lg font-mono text-sm">
                      <code>ALTER SYSTEM SET pg_stat_insights.track = 'top';
SELECT pg_reload_conf();</code>
                    </pre>
                    <div className="grid md:grid-cols-2 gap-3 mt-3">
                      <div className="bg-green-500/10 border border-green-500/30 rounded p-3 text-sm">
                        <strong className="text-green-400">✓ Tracks:</strong>
                        <ul className="list-disc list-inside text-slate-300 mt-1 space-y-1">
                          <li>Application SQL queries</li>
                          <li>Direct psql commands</li>
                          <li>ORM-generated queries</li>
                          <li>API/web queries</li>
                        </ul>
                      </div>
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-3 text-sm">
                        <strong className="text-yellow-400">✗ Excludes:</strong>
                        <ul className="list-disc list-inside text-slate-300 mt-1 space-y-1">
                          <li>SQL inside PL/pgSQL functions</li>
                          <li>Trigger internal queries</li>
                          <li>Stored procedure statements</li>
                          <li>Recursive function calls</li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-3 bg-blue-500/10 border border-blue-500/30 rounded p-3 text-sm text-slate-300">
                      <strong className="text-blue-400">Best For:</strong> Production OLTP systems, web applications, and any environment where you want to focus on application-level query performance without noise from internal functions.
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-6 bg-purple-500/5 py-4 rounded-r-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <code className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded font-mono font-semibold">all</code>
                      <span className="text-yellow-400 text-sm">⚠️ Higher Overhead</span>
                    </div>
                    <p className="text-slate-300 mb-3">
                      Track <strong className="text-white">all</strong> statements including those inside functions, procedures, triggers, and nested calls.
                      Provides complete visibility but with increased overhead.
                    </p>
                    <pre className="bg-slate-950 text-slate-100 p-3 rounded-lg font-mono text-sm">
                      <code>ALTER SYSTEM SET pg_stat_insights.track = 'all';
SELECT pg_reload_conf();</code>
                    </pre>
                    <div className="grid md:grid-cols-2 gap-3 mt-3">
                      <div className="bg-purple-500/10 border border-purple-500/30 rounded p-3 text-sm">
                        <strong className="text-purple-400">✓ Advantages:</strong>
                        <ul className="list-disc list-inside text-slate-300 mt-1 space-y-1">
                          <li>Complete query visibility</li>
                          <li>Debug function performance</li>
                          <li>Identify slow trigger queries</li>
                          <li>Comprehensive profiling</li>
                        </ul>
                      </div>
                      <div className="bg-orange-500/10 border border-orange-500/30 rounded p-3 text-sm">
                        <strong className="text-orange-400">⚠️ Disadvantages:</strong>
                        <ul className="list-disc list-inside text-slate-300 mt-1 space-y-1">
                          <li>2-5% higher CPU overhead</li>
                          <li>More memory usage</li>
                          <li>Faster slot exhaustion</li>
                          <li>Noisy data (many internal queries)</li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-3 bg-purple-500/10 border border-purple-500/30 rounded p-3 text-sm text-slate-300">
                      <strong className="text-purple-400">Best For:</strong> Development environments, performance profiling, debugging complex PL/pgSQL code, or when you need to optimize internal function queries.
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Filtering by Top-Level in Queries</h3>
                <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700">
                  <code>{`-- When track = 'all', filter to see only top-level queries
SELECT query, calls, mean_exec_time, total_exec_time
FROM pg_stat_insights
WHERE toplevel = true  -- Exclude function-internal queries
ORDER BY total_exec_time DESC
LIMIT 20;

-- See only internal function queries
SELECT query, calls, mean_exec_time
FROM pg_stat_insights
WHERE toplevel = false  -- Only function-internal queries
ORDER BY total_exec_time DESC
LIMIT 20;

-- Compare overhead: top-level vs internal queries
SELECT 
  toplevel,
  COUNT(*) as query_count,
  SUM(calls) as total_calls,
  SUM(total_exec_time) as total_time,
  AVG(mean_exec_time) as avg_time
FROM pg_stat_insights
GROUP BY toplevel;`}</code>
                </pre>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-6">
                <h4 className="font-semibold text-white mb-3">🎯 Recommendation by Environment</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-500/20 text-green-300 px-2 py-1 rounded font-mono min-w-[60px] text-center">top</div>
                    <div className="text-slate-300">
                      <strong className="text-white">Production OLTP:</strong> Web apps, SaaS, APIs - focus on application queries, minimal overhead
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded font-mono min-w-[60px] text-center">all</div>
                    <div className="text-slate-300">
                      <strong className="text-white">Development/Staging:</strong> Debug functions, optimize stored procedures, comprehensive profiling
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded font-mono min-w-[60px] text-center">top</div>
                    <div className="text-slate-300">
                      <strong className="text-white">Data Warehouse:</strong> Track analytical queries, exclude ETL function internals
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-red-500/20 text-red-300 px-2 py-1 rounded font-mono min-w-[60px] text-center">none</div>
                    <div className="text-slate-300">
                      <strong className="text-white">Emergency:</strong> Temporarily disable during performance crisis or incident response
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* pg_stat_insights.track_utility */}
          <section className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">pg_stat_insights.track_utility</h2>
                <div className="flex gap-3">
                  <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm font-semibold">PGC_SUSET</span>
                  <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">Reload Only</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                <p className="text-slate-300">
                  Controls whether utility commands (DDL and administrative commands) are tracked.
                  When enabled, tracks CREATE, ALTER, DROP, VACUUM, ANALYZE, and other non-DML statements.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">Data Type</div>
                  <div className="text-white font-mono">boolean</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">Default Value</div>
                  <div className="text-white font-mono">true</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">Overhead</div>
                  <div className="text-white font-mono">Minimal (&lt;0.1%)</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">What Gets Tracked</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-500/5 border border-green-500/30 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-3">Utility Commands (tracked when true)</h4>
                    <ul className="space-y-1 text-slate-300 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        <span><strong className="text-white">DDL:</strong> CREATE, ALTER, DROP (tables, indexes, etc.)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        <span><strong className="text-white">Maintenance:</strong> VACUUM, ANALYZE, REINDEX, CLUSTER</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        <span><strong className="text-white">Admin:</strong> GRANT, REVOKE, TRUNCATE</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        <span><strong className="text-white">Copy:</strong> COPY FROM/TO</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        <span><strong className="text-white">Transaction:</strong> BEGIN, COMMIT, ROLLBACK</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        <span><strong className="text-white">Prepare:</strong> PREPARE, EXECUTE</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-500/5 border border-blue-500/30 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-3">DML (always tracked)</h4>
                    <ul className="space-y-1 text-slate-300 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        <span><strong className="text-white">SELECT:</strong> All queries and subqueries</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        <span><strong className="text-white">INSERT:</strong> Single and bulk inserts</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        <span><strong className="text-white">UPDATE:</strong> Row modifications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        <span><strong className="text-white">DELETE:</strong> Row deletions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400">•</span>
                        <span><strong className="text-white">WITH (CTE):</strong> Common table expressions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Configuration Examples</h3>
                <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700">
                  <code>{`-- Enable utility tracking (default, recommended)
ALTER SYSTEM SET pg_stat_insights.track_utility = true;
SELECT pg_reload_conf();

-- Disable utility tracking (track only DML)
ALTER SYSTEM SET pg_stat_insights.track_utility = false;
SELECT pg_reload_conf();

-- Check current setting
SHOW pg_stat_insights.track_utility;

-- See utility commands being tracked
SELECT query, calls, total_exec_time
FROM pg_stat_insights
WHERE query LIKE 'CREATE %'
   OR query LIKE 'ALTER %'
   OR query LIKE 'DROP %'
   OR query LIKE 'VACUUM %'
   OR query LIKE 'ANALYZE %'
ORDER BY total_exec_time DESC;`}</code>
                </pre>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="border-l-4 border-green-500 pl-4 bg-green-500/5 py-4">
                  <h4 className="font-semibold text-white mb-3">track_utility = true (Default)</h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Track maintenance overhead (VACUUM, ANALYZE)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Monitor schema changes (DDL auditing)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Identify slow migrations and deployments</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Track COPY and bulk load performance</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Minimal overhead (&lt; 0.1%)</span>
                    </div>
                  </div>
                  <div className="mt-3 bg-green-500/10 border border-green-500/30 rounded p-3 text-sm text-slate-300">
                    <strong className="text-green-400">Recommended:</strong> Keep enabled unless you have specific reasons to disable
                  </div>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-500/5 py-4">
                  <h4 className="font-semibold text-white mb-3">track_utility = false</h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="flex items-start gap-2">
                      <span className="text-yellow-400">•</span>
                      <span>Focus only on DML performance</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-yellow-400">•</span>
                      <span>Reduce noise from automated maintenance</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-yellow-400">•</span>
                      <span>Save a few query slots for DML</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-400">✗</span>
                      <span>Lose visibility into DDL performance</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-400">✗</span>
                      <span>Can't track VACUUM/ANALYZE overhead</span>
                    </div>
                  </div>
                  <div className="mt-3 bg-yellow-500/10 border border-yellow-500/30 rounded p-3 text-sm text-slate-300">
                    <strong className="text-yellow-400">Use Case:</strong> Pure OLTP with no schema changes and automated maintenance
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
                <h4 className="font-semibold text-white mb-3">📊 Useful Queries for Utility Commands</h4>
                <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700 text-sm">
                  <code>{`-- Track VACUUM performance
SELECT query, calls, mean_exec_time, max_exec_time
FROM pg_stat_insights
WHERE query LIKE 'VACUUM %'
ORDER BY total_exec_time DESC;

-- Monitor ANALYZE overhead
SELECT query, calls, mean_exec_time
FROM pg_stat_insights
WHERE query LIKE 'ANALYZE %'
ORDER BY mean_exec_time DESC;

-- Identify expensive DDL operations
SELECT query, calls, mean_exec_time, total_exec_time
FROM pg_stat_insights
WHERE query ~ '^(CREATE|ALTER|DROP|REINDEX)'
ORDER BY mean_exec_time DESC
LIMIT 20;

-- Track bulk loading (COPY) performance
SELECT query, calls, rows / NULLIF(calls, 0) as avg_rows_per_copy,
       mean_exec_time, total_exec_time
FROM pg_stat_insights
WHERE query LIKE 'COPY %'
ORDER BY total_exec_time DESC;`}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* pg_stat_insights.track_planning */}
          <section className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">pg_stat_insights.track_planning</h2>
                <div className="flex gap-3">
                  <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm font-semibold">PGC_SUSET</span>
                  <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">Reload Only</span>
                  <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm">Adds Overhead</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                <p className="text-slate-300">
                  Controls whether query planning time statistics are collected. When enabled, tracks planning duration
                  in addition to execution time. This helps identify queries where planning overhead is significant.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">Data Type</div>
                  <div className="text-white font-mono">boolean</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">Default Value</div>
                  <div className="text-white font-mono">false</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">Overhead</div>
                  <div className="text-white font-mono">~1-2% CPU</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">What Gets Tracked</h3>
                <p className="text-slate-300 mb-4">
                  When enabled, pg_stat_insights collects 5 additional planning metrics for each query:
                </p>
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-start gap-3">
                      <code className="bg-slate-700 px-2 py-1 rounded text-cyan-300 font-mono text-sm min-w-[180px]">plans</code>
                      <span>Number of times the query was planned</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <code className="bg-slate-700 px-2 py-1 rounded text-cyan-300 font-mono text-sm min-w-[180px]">total_plan_time</code>
                      <span>Total planning time (milliseconds)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <code className="bg-slate-700 px-2 py-1 rounded text-cyan-300 font-mono text-sm min-w-[180px]">min_plan_time</code>
                      <span>Minimum planning time observed</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <code className="bg-slate-700 px-2 py-1 rounded text-cyan-300 font-mono text-sm min-w-[180px]">max_plan_time</code>
                      <span>Maximum planning time observed</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <code className="bg-slate-700 px-2 py-1 rounded text-cyan-300 font-mono text-sm min-w-[180px]">mean_plan_time</code>
                      <span>Average planning time</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <code className="bg-slate-700 px-2 py-1 rounded text-cyan-300 font-mono text-sm min-w-[180px]">stddev_plan_time</code>
                      <span>Standard deviation of planning time</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Configuration</h3>
                <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700">
                  <code>{`-- Enable planning time tracking (adds 1-2% overhead)
ALTER SYSTEM SET pg_stat_insights.track_planning = true;
SELECT pg_reload_conf();

-- Disable planning time tracking (default)
ALTER SYSTEM SET pg_stat_insights.track_planning = false;
SELECT pg_reload_conf();

-- Check current setting
SHOW pg_stat_insights.track_planning;`}</code>
                </pre>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-500/5 py-4">
                  <h4 className="font-semibold text-white mb-3">track_planning = false (Default)</h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Lower overhead (recommended for production)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Focus on execution time only</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-400">✗</span>
                      <span>Can't identify planning bottlenecks</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-400">✗</span>
                      <span>Planning metrics show as NULL/0</span>
                    </div>
                  </div>
                  <div className="mt-3 bg-green-500/10 border border-green-500/30 rounded p-3 text-sm text-slate-300">
                    <strong className="text-green-400">Best For:</strong> Production OLTP systems where execution time is the primary concern
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 bg-blue-500/5 py-4">
                  <h4 className="font-semibold text-white mb-3">track_planning = true</h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Identify queries with expensive planning</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Find candidates for prepared statements</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Debug complex query planning</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-yellow-400">⚠️</span>
                      <span>1-2% CPU overhead for timing</span>
                    </div>
                  </div>
                  <div className="mt-3 bg-blue-500/10 border border-blue-500/30 rounded p-3 text-sm text-slate-300">
                    <strong className="text-blue-400">Best For:</strong> Development, staging, or production systems with complex queries and planning concerns
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Analysis Queries</h3>
                <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700 text-sm">
                  <code>{`-- Queries with high planning overhead
SELECT query, plans, calls,
       mean_plan_time, mean_exec_time,
       (total_plan_time / NULLIF(total_plan_time + total_exec_time, 0) * 100) as plan_overhead_pct,
       CASE 
         WHEN mean_plan_time > mean_exec_time THEN '🚨 Planning slower than execution!'
         WHEN mean_plan_time > mean_exec_time * 0.3 THEN '⚠️ High planning overhead'
         WHEN mean_plan_time > mean_exec_time * 0.1 THEN 'ℹ️ Moderate planning time'
         ELSE '✓ Efficient planning'
       END as analysis
FROM pg_stat_insights
WHERE plans > 10 AND track_planning
ORDER BY plan_overhead_pct DESC
LIMIT 20;

-- Prepared statement candidates (high plan cost, frequently called)
SELECT query, calls, plans,
       mean_plan_time, mean_exec_time,
       (calls - plans) as executions_without_planning,
       CASE 
         WHEN plans < calls THEN '✓ Using prepared statements'
         WHEN mean_plan_time > 5 AND calls > 100 THEN '💡 Prepare this query!'
         ELSE 'OK'
       END as recommendation
FROM pg_stat_insights
WHERE plans > 0 AND calls > 50
ORDER BY mean_plan_time DESC
LIMIT 20;

-- Planning time variability
SELECT query, plans,
       min_plan_time, max_plan_time, mean_plan_time, stddev_plan_time,
       (stddev_plan_time / NULLIF(mean_plan_time, 0)) as plan_cv,
       (max_plan_time / NULLIF(min_plan_time, 0)) as max_min_ratio
FROM pg_stat_insights
WHERE plans > 100 AND stddev_plan_time > 0
ORDER BY plan_cv DESC
LIMIT 20;`}</code>
                </pre>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6">
                <h4 className="font-semibold text-white mb-3">⚠️ When Planning Overhead is High</h4>
                <div className="space-y-3 text-slate-300 text-sm">
                  <div>
                    <strong className="text-white">If plan_overhead_pct &gt; 30%:</strong>
                    <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                      <li>Use prepared statements: <code className="bg-slate-800 px-2 py-1 rounded">PREPARE</code> / <code className="bg-slate-800 px-2 py-1 rounded">EXECUTE</code></li>
                      <li>In application code: use parameterized queries (e.g., <code className="bg-slate-800 px-2 py-1 rounded">$1, $2</code> placeholders)</li>
                      <li>PostgreSQL drivers automatically use prepared statements for repeated queries</li>
                    </ul>
                  </div>
                  <div>
                    <strong className="text-white">If planning time is highly variable (high stddev):</strong>
                    <ul className="list-disc list-inside mt-2 ml-4 space-y-1">
                      <li>Check for stale statistics: run <code className="bg-slate-800 px-2 py-1 rounded">ANALYZE</code></li>
                      <li>Investigate complex JOINs with many tables (planning cost grows exponentially)</li>
                      <li>Consider query simplification or materialized views</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-6">
                <h4 className="font-semibold text-white mb-3">🎯 Recommendation by Workload</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="bg-red-500/20 text-red-300 px-2 py-1 rounded font-mono min-w-[60px] text-center">false</div>
                    <div className="text-slate-300">
                      <strong className="text-white">High-throughput OLTP:</strong> Minimize overhead, planning time usually negligible
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-500/20 text-green-300 px-2 py-1 rounded font-mono min-w-[60px] text-center">true</div>
                    <div className="text-slate-300">
                      <strong className="text-white">Complex analytical queries:</strong> Large multi-table JOINs, planning can be expensive
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-500/20 text-green-300 px-2 py-1 rounded font-mono min-w-[60px] text-center">true</div>
                    <div className="text-slate-300">
                      <strong className="text-white">Development/Debugging:</strong> Essential for understanding full query cost
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded font-mono min-w-[60px] text-center">true</div>
                    <div className="text-slate-300">
                      <strong className="text-white">Prepared statement analysis:</strong> Compare plans vs calls to verify usage
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* pg_stat_insights.save */}
          <section className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">pg_stat_insights.save</h2>
                <div className="flex gap-3">
                  <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-semibold">PGC_SIGHUP</span>
                  <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">Reload Only</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                <p className="text-slate-300">
                  Controls whether query statistics are saved to disk on shutdown and restored on startup.
                  When enabled, statistics persist across PostgreSQL restarts. When disabled, statistics are lost on shutdown.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">Data Type</div>
                  <div className="text-white font-mono">boolean</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">Default Value</div>
                  <div className="text-white font-mono">true</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-1">Reload Type</div>
                  <div className="text-white font-mono">PGC_SIGHUP</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">How It Works</h3>
                <div className="bg-slate-800/30 rounded-lg p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2">On Shutdown (when save = true):</h4>
                      <ol className="list-decimal list-inside space-y-1 text-slate-300 text-sm ml-4">
                        <li>PostgreSQL serializes all pg_stat_insights data</li>
                        <li>Writes statistics to <code className="bg-slate-700 px-2 py-1 rounded">$PGDATA/pg_stat_insights.stat</code></li>
                        <li>File contains normalized queries and all metric values</li>
                      </ol>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">On Startup (when save = true):</h4>
                      <ol className="list-decimal list-inside space-y-1 text-slate-300 text-sm ml-4">
                        <li>PostgreSQL reads <code className="bg-slate-700 px-2 py-1 rounded">pg_stat_insights.stat</code></li>
                        <li>Restores all query statistics to shared memory</li>
                        <li>Statistics continue accumulating from previous values</li>
                        <li>Timestamps (stats_since) preserve original collection start time</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Configuration</h3>
                <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700">
                  <code>{`-- Enable persistence (default, recommended)
ALTER SYSTEM SET pg_stat_insights.save = true;
SELECT pg_reload_conf();

-- Disable persistence (stats lost on restart)
ALTER SYSTEM SET pg_stat_insights.save = false;
SELECT pg_reload_conf();

-- Check current setting
SHOW pg_stat_insights.save;

-- Check when stats were last loaded
SELECT MIN(stats_since) as oldest_stat,
       MAX(stats_since) as newest_stat,
       NOW() - MIN(stats_since) as data_age
FROM pg_stat_insights;

-- Manually save statistics to disk (requires superuser)
SELECT pg_stat_insights_reset();  -- This triggers a save if save=true`}</code>
                </pre>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="border-l-4 border-green-500 pl-4 bg-green-500/5 py-4">
                  <h4 className="font-semibold text-white mb-3">save = true (Default, Recommended)</h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Preserve historical query performance data</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Survive planned restarts and upgrades</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Maintain long-term performance trends</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Compare performance before/after changes</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Minimal overhead (disk I/O on shutdown only)</span>
                    </div>
                  </div>
                  <div className="mt-3 bg-green-500/10 border border-green-500/30 rounded p-3 text-sm text-slate-300">
                    <strong className="text-green-400">Best For:</strong> Production systems, historical analysis, long-term monitoring
                  </div>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-500/5 py-4">
                  <h4 className="font-semibold text-white mb-3">save = false</h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="flex items-start gap-2">
                      <span className="text-yellow-400">•</span>
                      <span>Statistics reset on every restart</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-yellow-400">•</span>
                      <span>Fresh start for each PostgreSQL session</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-yellow-400">•</span>
                      <span>Useful for short-term testing</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-400">✗</span>
                      <span>Lose all historical data on restart</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-400">✗</span>
                      <span>Can't track long-term performance trends</span>
                    </div>
                  </div>
                  <div className="mt-3 bg-yellow-500/10 border border-yellow-500/30 rounded p-3 text-sm text-slate-300">
                    <strong className="text-yellow-400">Use Case:</strong> Development, testing, ephemeral environments, or when you want clean slate after restart
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">File System Impact</h3>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
                  <h4 className="font-semibold text-white mb-3">Statistics File Details</h4>
                  <div className="space-y-3 text-sm text-slate-300">
                    <div className="flex items-start gap-3">
                      <code className="bg-slate-800 px-2 py-1 rounded text-cyan-300 font-mono">Location:</code>
                      <span>$PGDATA/pg_stat_insights.stat</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <code className="bg-slate-800 px-2 py-1 rounded text-cyan-300 font-mono">Size:</code>
                      <span>~2-3 KB per tracked query (same as in-memory)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <code className="bg-slate-800 px-2 py-1 rounded text-cyan-300 font-mono">Format:</code>
                      <span>Binary (not human-readable)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <code className="bg-slate-800 px-2 py-1 rounded text-cyan-300 font-mono">Example:</code>
                      <span>5000 queries = ~10-15 MB file</span>
                    </div>
                  </div>
                  <pre className="bg-slate-950 text-slate-100 p-3 rounded-lg font-mono text-xs mt-4">
{`# Check file size
ls -lh $PGDATA/pg_stat_insights.stat

# Example output:
# -rw------- 1 postgres postgres 12M Nov  4 10:30 pg_stat_insights.stat`}
                  </pre>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6">
                <h4 className="font-semibold text-white mb-3">⚠️ Important Considerations</h4>
                <div className="space-y-3 text-slate-300 text-sm">
                  <div>
                    <strong className="text-white">Disk Space:</strong>
                    <p className="mt-1">With default max=5000, the file is ~10-15 MB. Ensure adequate disk space in $PGDATA.</p>
                  </div>
                  <div>
                    <strong className="text-white">Shutdown Time:</strong>
                    <p className="mt-1">Writing statistics adds a few seconds to shutdown time (proportional to number of queries tracked).</p>
                  </div>
                  <div>
                    <strong className="text-white">Startup Time:</strong>
                    <p className="mt-1">Loading statistics adds a few seconds to startup time. Not noticeable for most deployments.</p>
                  </div>
                  <div>
                    <strong className="text-white">Manual Reset:</strong>
                    <p className="mt-1">Call <code className="bg-slate-800 px-2 py-1 rounded">pg_stat_insights_reset()</code> to clear all statistics and remove the file.</p>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-6">
                <h4 className="font-semibold text-white mb-3">🎯 Recommendation</h4>
                <div className="space-y-3">
                  <p className="text-slate-300">
                    <strong className="text-white">Keep save = true (default)</strong> for all production and staging environments.
                    The benefits of historical data far outweigh the minimal disk space and I/O cost.
                  </p>
                  <p className="text-slate-300">
                    Only set save = false in special scenarios:
                  </p>
                  <ul className="list-disc list-inside text-slate-300 ml-4 space-y-1 text-sm">
                    <li>Temporary testing environments where restarts should reset stats</li>
                    <li>Disk space is severely constrained</li>
                    <li>Deliberately want fresh baseline after each restart</li>
                    <li>Automated testing that requires clean state</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Summary Section */}
          <section className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Configuration Summary & Quick Reference</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800/60">
                  <tr>
                    <th className="px-6 py-3 text-left text-white font-semibold">Parameter</th>
                    <th className="px-6 py-3 text-left text-white font-semibold">Default</th>
                    <th className="px-6 py-3 text-left text-white font-semibold">Context</th>
                    <th className="px-6 py-3 text-left text-white font-semibold">Impact</th>
                    <th className="px-6 py-3 text-left text-white font-semibold">Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  <tr className="hover:bg-slate-800/30">
                    <td className="px-6 py-4 font-mono text-cyan-300">pg_stat_insights.max</td>
                    <td className="px-6 py-4 text-slate-300">5000</td>
                    <td className="px-6 py-4">
                      <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded text-xs">POSTMASTER</span>
                    </td>
                    <td className="px-6 py-4 text-slate-300 text-sm">~2MB per 1000 queries</td>
                    <td className="px-6 py-4 text-slate-300 text-sm">Increase if usage &gt; 80%</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="px-6 py-4 font-mono text-cyan-300">pg_stat_insights.track</td>
                    <td className="px-6 py-4 text-slate-300">'top'</td>
                    <td className="px-6 py-4">
                      <span className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded text-xs">SUSET</span>
                    </td>
                    <td className="px-6 py-4 text-slate-300 text-sm">2-5% with 'all'</td>
                    <td className="px-6 py-4 text-slate-300 text-sm">'top' for prod, 'all' for dev</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="px-6 py-4 font-mono text-cyan-300">pg_stat_insights.track_utility</td>
                    <td className="px-6 py-4 text-slate-300">true</td>
                    <td className="px-6 py-4">
                      <span className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded text-xs">SUSET</span>
                    </td>
                    <td className="px-6 py-4 text-slate-300 text-sm">&lt; 0.1%</td>
                    <td className="px-6 py-4 text-slate-300 text-sm">Keep true</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="px-6 py-4 font-mono text-cyan-300">pg_stat_insights.track_planning</td>
                    <td className="px-6 py-4 text-slate-300">false</td>
                    <td className="px-6 py-4">
                      <span className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded text-xs">SUSET</span>
                    </td>
                    <td className="px-6 py-4 text-slate-300 text-sm">1-2% CPU</td>
                    <td className="px-6 py-4 text-slate-300 text-sm">Enable for complex queries</td>
                  </tr>
                  <tr className="hover:bg-slate-800/30">
                    <td className="px-6 py-4 font-mono text-cyan-300">pg_stat_insights.save</td>
                    <td className="px-6 py-4 text-slate-300">true</td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">SIGHUP</span>
                    </td>
                    <td className="px-6 py-4 text-slate-300 text-sm">Disk I/O on shutdown</td>
                    <td className="px-6 py-4 text-slate-300 text-sm">Keep true for prod</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Production OLTP</h3>
                <pre className="bg-slate-950 text-slate-100 p-3 rounded text-xs font-mono">
{`pg_stat_insights.max = 5000
pg_stat_insights.track = 'top'
pg_stat_insights.track_utility = true
pg_stat_insights.track_planning = false
pg_stat_insights.save = true`}
                </pre>
              </div>

              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Development/Staging</h3>
                <pre className="bg-slate-950 text-slate-100 p-3 rounded text-xs font-mono">
{`pg_stat_insights.max = 10000
pg_stat_insights.track = 'all'
pg_stat_insights.track_utility = true
pg_stat_insights.track_planning = true
pg_stat_insights.save = true`}
                </pre>
              </div>

              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Data Warehouse</h3>
                <pre className="bg-slate-950 text-slate-100 p-3 rounded text-xs font-mono">
{`pg_stat_insights.max = 20000
pg_stat_insights.track = 'top'
pg_stat_insights.track_utility = true
pg_stat_insights.track_planning = true
pg_stat_insights.save = true`}
                </pre>
              </div>
            </div>

            <div className="mt-8 bg-white/5 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Complete Setup Script</h3>
              <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700 text-sm">
                <code>{`-- Add to postgresql.conf
shared_preload_libraries = 'pg_stat_insights'  # Required for extension
pg_stat_insights.max = 5000
pg_stat_insights.track = 'top'
pg_stat_insights.track_utility = true
pg_stat_insights.track_planning = false
pg_stat_insights.save = true

-- Restart PostgreSQL
sudo systemctl restart postgresql

-- Create extension in database
psql -d your_database -c "CREATE EXTENSION pg_stat_insights;"

-- Verify configuration
psql -d your_database -c "
  SELECT name, setting, context 
  FROM pg_settings 
  WHERE name LIKE 'pg_stat_insights.%';
"

-- Check statistics collection
psql -d your_database -c "
  SELECT COUNT(*) as tracked_queries,
         current_setting('pg_stat_insights.max')::int as max_queries
  FROM pg_stat_insights;
"`}</code>
              </pre>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
