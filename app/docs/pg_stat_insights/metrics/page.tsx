export default function MetricsGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Metrics Reference Guide</h1>
          <p className="text-xl text-slate-300">Complete reference for all 52 metric columns in pg_stat_insights with interpretation guidance and optimization tips</p>
        </div>

        <div className="space-y-8">
          {/* Overview */}
          <section className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Metrics Overview</h2>
            <p className="text-slate-300 mb-4">
              pg_stat_insights extends pg_stat_statements with 52 comprehensive metrics organized into categories:
              execution timing, buffer I/O, WAL generation, JIT compilation, and parallel execution.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="text-3xl font-bold text-blue-400">17</div>
                <div className="text-slate-300">Timing Metrics</div>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <div className="text-3xl font-bold text-purple-400">20</div>
                <div className="text-slate-300">I/O & Cache Metrics</div>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="text-3xl font-bold text-green-400">15</div>
                <div className="text-slate-300">Advanced Metrics</div>
              </div>
            </div>
          </section>

          {/* Identity Columns */}
          <section className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Identity & Classification</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-cyan-500 pl-6">
                <h3 className="text-xl font-semibold text-white mb-2">userid (oid)</h3>
                <p className="text-slate-300 mb-3">
                  OID of user who executed the query. Join with <code className="bg-slate-800 px-2 py-1 rounded">pg_user</code> or <code className="bg-slate-800 px-2 py-1 rounded">pg_roles</code> for username.
                </p>
                <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700">
                  <code>{`-- Get query stats by username
SELECT u.usename, s.query, s.calls, s.total_exec_time
FROM pg_stat_insights s
JOIN pg_user u ON s.userid = u.usesysid
ORDER BY s.total_exec_time DESC
LIMIT 10;`}</code>
                </pre>
              </div>

              <div className="border-l-4 border-cyan-500 pl-6">
                <h3 className="text-xl font-semibold text-white mb-2">dbid (oid)</h3>
                <p className="text-slate-300 mb-3">
                  OID of database in which the query was executed. Join with <code className="bg-slate-800 px-2 py-1 rounded">pg_database</code> for database name.
                </p>
                <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700">
                  <code>{`-- Get query stats by database
SELECT d.datname, COUNT(*) as query_count, 
       SUM(s.calls) as total_calls,
       SUM(s.total_exec_time) as total_time
FROM pg_stat_insights s
JOIN pg_database d ON s.dbid = d.oid
GROUP BY d.datname
ORDER BY total_time DESC;`}</code>
                </pre>
              </div>

              <div className="border-l-4 border-cyan-500 pl-6">
                <h3 className="text-xl font-semibold text-white mb-2">toplevel (bool)</h3>
                <p className="text-slate-300 mb-3">
                  True for top-level statements, false for statements executed inside functions or procedures.
                  Use to distinguish application queries from internal function calls.
                </p>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-3">
                  <strong className="text-yellow-400">📌 Tip:</strong>
                  <span className="text-slate-300 ml-2">Filter by toplevel=true to focus on application-level queries and avoid noise from internal functions.</span>
                </div>
              </div>

              <div className="border-l-4 border-cyan-500 pl-6">
                <h3 className="text-xl font-semibold text-white mb-2">queryid (bigint)</h3>
                <p className="text-slate-300 mb-3">
                  Hash identifier computed from the query's parse tree. Same structure = same queryid regardless of literal values.
                </p>
                <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700">
                  <code>{`-- These queries have the SAME queryid:
SELECT * FROM users WHERE id = 1;
SELECT * FROM users WHERE id = 2;

-- Track query evolution over time
SELECT queryid, query, calls, mean_exec_time,
       stats_since, minmax_stats_since
FROM pg_stat_insights
WHERE queryid = 1234567890
ORDER BY stats_since DESC;`}</code>
                </pre>
              </div>

              <div className="border-l-4 border-cyan-500 pl-6">
                <h3 className="text-xl font-semibold text-white mb-2">query (text)</h3>
                <p className="text-slate-300 mb-3">
                  Normalized query text with constants replaced by parameter markers ($1, $2, etc.).
                  Length controlled by <code className="bg-slate-800 px-2 py-1 rounded">track_activity_query_size</code>.
                </p>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <strong className="text-yellow-400">⚙️ Configuration:</strong>
                  <span className="text-slate-300 ml-2">Increase track_activity_query_size if queries are truncated (default 1024 bytes).</span>
                </div>
              </div>
            </div>
          </section>

          {/* Planning Metrics */}
          <section className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Query Planning Metrics</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-white mb-2">plans (bigint)</h3>
                <p className="text-slate-300 mb-3">
                  Number of times the query was planned (if track_planning is enabled).
                </p>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <strong className="text-blue-400">📊 Analysis:</strong>
                  <span className="text-slate-300 ml-2">Compare plans vs calls to detect prepared statement usage. plans &lt; calls indicates use of prepared statements.</span>
                </div>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-white mb-2">total_plan_time (float8)</h3>
                <p className="text-slate-300 mb-3">
                  Total time spent planning this query (milliseconds). Only tracked when <code className="bg-slate-800 px-2 py-1 rounded">pg_stat_insights.track_planning = true</code>.
                </p>
                <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700">
                  <code>{`-- Queries with high planning overhead
SELECT query, plans, 
       total_plan_time,
       total_plan_time / NULLIF(plans, 0) as avg_plan_time,
       total_exec_time,
       (total_plan_time / NULLIF(total_plan_time + total_exec_time, 0) * 100) as plan_overhead_pct
FROM pg_stat_insights
WHERE plans > 0 AND total_plan_time > 0
ORDER BY plan_overhead_pct DESC
LIMIT 20;`}</code>
                </pre>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mt-3">
                  <strong className="text-yellow-400">💡 Optimization:</strong>
                  <span className="text-slate-300 ml-2">If plan_overhead_pct &gt; 30%, consider using prepared statements or PREPARE/EXECUTE.</span>
                </div>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-white mb-2">min_plan_time, max_plan_time, mean_plan_time, stddev_plan_time (float8)</h3>
                <p className="text-slate-300 mb-3">
                  Planning time statistics: minimum, maximum, mean (average), and standard deviation in milliseconds.
                </p>
                <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700">
                  <code>{`-- Planning time variability analysis
SELECT query, plans,
       min_plan_time, max_plan_time, mean_plan_time,
       stddev_plan_time,
       (stddev_plan_time / NULLIF(mean_plan_time, 0)) as coefficient_of_variation
FROM pg_stat_insights
WHERE plans > 10 AND stddev_plan_time > 0
ORDER BY coefficient_of_variation DESC
LIMIT 20;`}</code>
                </pre>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-3">
                  <strong className="text-blue-400">📈 Interpretation:</strong>
                  <span className="text-slate-300 ml-2">High stddev indicates planning time varies significantly - may indicate cache effects or statistics staleness.</span>
                </div>
              </div>
            </div>
          </section>

          {/* Execution Metrics */}
          <section className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Query Execution Metrics</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold text-white mb-2">calls (bigint)</h3>
                <p className="text-slate-300 mb-3">
                  Number of times this query was executed. Critical for identifying frequently-run queries.
                </p>
                <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700">
                  <code>{`-- Most frequently executed queries
SELECT query, calls, 
       mean_exec_time,
       total_exec_time,
       (total_exec_time / SUM(total_exec_time) OVER () * 100) as pct_of_total_time
FROM pg_stat_insights
ORDER BY calls DESC
LIMIT 20;`}</code>
                </pre>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold text-white mb-2">total_exec_time (float8)</h3>
                <p className="text-slate-300 mb-3">
                  Total time spent executing this query (milliseconds). <strong>Most important metric for optimization</strong> - represents actual database load.
                </p>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-3">
                  <strong className="text-red-400">🔥 Critical Metric:</strong>
                  <span className="text-slate-300 ml-2">Optimize queries with highest total_exec_time first - they have the biggest impact on database performance.</span>
                </div>
                <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700">
                  <code>{`-- Queries consuming most database time (80/20 rule)
WITH total AS (
  SELECT SUM(total_exec_time) as sum_time FROM pg_stat_insights
),
ranked AS (
  SELECT query, total_exec_time, calls, mean_exec_time,
         SUM(total_exec_time) OVER (ORDER BY total_exec_time DESC) as cumulative_time,
         (SELECT sum_time FROM total) as total_time
  FROM pg_stat_insights
)
SELECT query, calls, mean_exec_time, total_exec_time,
       (cumulative_time / total_time * 100) as cumulative_pct
FROM ranked
WHERE (cumulative_time / total_time) <= 0.80
ORDER BY total_exec_time DESC;`}</code>
                </pre>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold text-white mb-2">min_exec_time, max_exec_time, mean_exec_time, stddev_exec_time (float8)</h3>
                <p className="text-slate-300 mb-3">
                  Execution time statistics in milliseconds. Essential for understanding query performance variability.
                </p>
                <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700">
                  <code>{`-- Queries with high performance variability
SELECT query, calls,
       min_exec_time, max_exec_time, mean_exec_time, stddev_exec_time,
       (max_exec_time / NULLIF(min_exec_time, 0)) as max_min_ratio,
       (stddev_exec_time / NULLIF(mean_exec_time, 0)) as cv
FROM pg_stat_insights
WHERE calls > 100 AND stddev_exec_time > 0
ORDER BY cv DESC
LIMIT 20;`}</code>
                </pre>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                    <strong className="text-purple-400">⚡ Low Variability (CV &lt; 0.5):</strong>
                    <p className="text-slate-300 mt-2 text-sm">Consistent performance - well-optimized with stable data distribution.</p>
                  </div>
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                    <strong className="text-orange-400">⚠️ High Variability (CV &gt; 2.0):</strong>
                    <p className="text-slate-300 mt-2 text-sm">Inconsistent performance - investigate data skew, missing indexes, or plan instability.</p>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold text-white mb-2">rows (bigint)</h3>
                <p className="text-slate-300 mb-3">
                  Total number of rows retrieved or affected by the query across all executions.
                </p>
                <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700">
                  <code>{`-- Queries processing many rows
SELECT query, calls, rows,
       rows / NULLIF(calls, 0) as avg_rows_per_call,
       mean_exec_time,
       mean_exec_time / NULLIF((rows::float / NULLIF(calls, 0)), 0) * 1000 as us_per_row
FROM pg_stat_insights
WHERE calls > 10
ORDER BY avg_rows_per_call DESC
LIMIT 20;`}</code>
                </pre>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mt-3">
                  <strong className="text-yellow-400">💡 Optimization:</strong>
                  <span className="text-slate-300 ml-2">High avg_rows_per_call with slow execution suggests need for pagination, LIMIT clauses, or better indexing.</span>
                </div>
              </div>
            </div>
          </section>

          {/* Buffer I/O Metrics - Shared Blocks */}
          <section className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Buffer I/O: Shared Blocks</h2>
            <p className="text-slate-300 mb-6">
              Shared blocks are the main PostgreSQL buffer cache for tables and indexes. Understanding cache efficiency is critical for performance.
            </p>
            
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-white mb-2">shared_blks_hit (bigint)</h3>
                <p className="text-slate-300 mb-3">
                  Number of shared blocks found in buffer cache (cache hits). <strong>Higher is better</strong> - indicates efficient cache usage.
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-xl font-semibold text-white mb-2">shared_blks_read (bigint)</h3>
                <p className="text-slate-300 mb-3">
                  Number of shared blocks read from disk (cache misses). <strong>Lower is better</strong> - high values indicate cache thrashing or insufficient memory.
                </p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-6">
                <h3 className="text-xl font-semibold text-white mb-2">shared_blks_dirtied (bigint)</h3>
                <p className="text-slate-300 mb-3">
                  Number of shared blocks modified (marked as dirty). Indicates write load and triggers checkpoint activity.
                </p>
              </div>

              <div className="border-l-4 border-orange-500 pl-6">
                <h3 className="text-xl font-semibold text-white mb-2">shared_blks_written (bigint)</h3>
                <p className="text-slate-300 mb-3">
                  Number of shared blocks written to disk by this query (unusual - typically handled by checkpointer).
                  High values may indicate checkpoint pressure.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border border-green-500/30 rounded-lg p-6 mt-6">
                <h4 className="text-lg font-semibold text-white mb-4">Cache Hit Ratio Calculation</h4>
                <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700">
                  <code>{`-- Calculate cache hit ratio for each query
SELECT query, calls,
       shared_blks_hit, shared_blks_read,
       (shared_blks_hit + shared_blks_read) as total_blocks,
       CASE 
         WHEN (shared_blks_hit + shared_blks_read) = 0 THEN NULL
         ELSE (shared_blks_hit::float / (shared_blks_hit + shared_blks_read) * 100)
       END as cache_hit_ratio
FROM pg_stat_insights
WHERE (shared_blks_hit + shared_blks_read) > 0
ORDER BY total_blocks DESC
LIMIT 20;`}</code>
                </pre>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-400">&gt; 99%</div>
                    <div className="text-slate-300 text-sm mt-1">Excellent - optimal cache usage</div>
                  </div>
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                    <div className="text-2xl font-bold text-yellow-400">95-99%</div>
                    <div className="text-slate-300 text-sm mt-1">Good - acceptable performance</div>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <div className="text-2xl font-bold text-red-400">&lt; 95%</div>
                    <div className="text-slate-300 text-sm mt-1">Poor - needs optimization or more memory</div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <strong className="text-yellow-400">🎯 Optimization Strategies:</strong>
                <ul className="list-disc list-inside text-slate-300 mt-2 space-y-1">
                  <li>Low cache hit ratio + high shared_blks_read → Increase shared_buffers</li>
                  <li>Sequential scans on large tables → Add indexes or increase effective_cache_size</li>
                  <li>High shared_blks_dirtied → Review write-heavy queries, consider partitioning</li>
                  <li>High shared_blks_written → Tune checkpoint_completion_target and max_wal_size</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Buffer I/O Metrics - Local & Temp Blocks */}
          <section className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Buffer I/O: Local & Temporary Blocks</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Local Blocks (Per-Backend Buffers)</h3>
                <p className="text-slate-300 mb-4">
                  Used for temporary tables created with CREATE TEMP TABLE. Similar patterns to shared blocks but isolated per session.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border-l-4 border-cyan-500 pl-4">
                    <h4 className="font-semibold text-white mb-2">local_blks_hit (bigint)</h4>
                    <p className="text-slate-300 text-sm">Local buffer cache hits</p>
                  </div>
                  <div className="border-l-4 border-cyan-500 pl-4">
                    <h4 className="font-semibold text-white mb-2">local_blks_read (bigint)</h4>
                    <p className="text-slate-300 text-sm">Local buffer cache misses</p>
                  </div>
                  <div className="border-l-4 border-cyan-500 pl-4">
                    <h4 className="font-semibold text-white mb-2">local_blks_dirtied (bigint)</h4>
                    <p className="text-slate-300 text-sm">Local blocks modified</p>
                  </div>
                  <div className="border-l-4 border-cyan-500 pl-4">
                    <h4 className="font-semibold text-white mb-2">local_blks_written (bigint)</h4>
                    <p className="text-slate-300 text-sm">Local blocks written</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Temporary Blocks (Overflow to Disk)</h3>
                <p className="text-slate-300 mb-4">
                  Used when operations exceed work_mem and spill to disk. <strong className="text-red-400">High temp block usage indicates performance problems.</strong>
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold text-white mb-2">temp_blks_read (bigint)</h4>
                    <p className="text-slate-300 text-sm">Temporary data read from disk</p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold text-white mb-2">temp_blks_written (bigint)</h4>
                    <p className="text-slate-300 text-sm">Temporary data written to disk</p>
                  </div>
                </div>
              </div>

              <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700">
                <code>{`-- Queries using temporary disk storage (performance killers)
SELECT query, calls, mean_exec_time,
       temp_blks_read, temp_blks_written,
       (temp_blks_written * 8 / 1024.0) as temp_mb_written,
       ((temp_blks_written * 8 / 1024.0) / NULLIF(calls, 0)) as avg_temp_mb_per_call
FROM pg_stat_insights
WHERE temp_blks_written > 0
ORDER BY temp_blks_written DESC
LIMIT 20;`}</code>
              </pre>

              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mt-4">
                <strong className="text-red-400">🚨 Critical Issue - Temp Blocks:</strong>
                <ul className="list-disc list-inside text-slate-300 mt-2 space-y-1">
                  <li><strong>Causes:</strong> Large sorts, hash joins, or aggregations exceeding work_mem</li>
                  <li><strong>Impact:</strong> 10-100x slower than in-memory operations</li>
                  <li><strong>Fix:</strong> Increase work_mem for specific queries (SET work_mem = '256MB') or globally</li>
                  <li><strong>Alternative:</strong> Add indexes to avoid sorts, rewrite queries to reduce data volume</li>
                </ul>
              </div>
            </div>
          </section>

          {/* I/O Timing Metrics */}
          <section className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">I/O Timing Metrics</h2>
            <p className="text-slate-300 mb-6">
              Requires <code className="bg-slate-800 px-2 py-1 rounded">track_io_timing = on</code> in postgresql.conf (adds &lt;1% overhead).
            </p>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-white mb-2">shared_blk_read_time (float8)</h4>
                  <p className="text-slate-300 text-sm mb-1">Time spent reading shared blocks from disk (ms)</p>
                  <div className="text-xs text-blue-400 mt-2">Most important I/O timing metric</div>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-white mb-2">shared_blk_write_time (float8)</h4>
                  <p className="text-slate-300 text-sm mb-1">Time spent writing shared blocks (ms)</p>
                  <div className="text-xs text-blue-400 mt-2">Usually low (handled by background writer)</div>
                </div>
                <div className="border-l-4 border-cyan-500 pl-4">
                  <h4 className="font-semibold text-white mb-2">local_blk_read_time (float8)</h4>
                  <p className="text-slate-300 text-sm mb-1">Time reading local blocks (ms)</p>
                </div>
                <div className="border-l-4 border-cyan-500 pl-4">
                  <h4 className="font-semibold text-white mb-2">local_blk_write_time (float8)</h4>
                  <p className="text-slate-300 text-sm mb-1">Time writing local blocks (ms)</p>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-white mb-2">temp_blk_read_time (float8)</h4>
                  <p className="text-slate-300 text-sm mb-1">Time reading temp blocks (ms)</p>
                  <div className="text-xs text-orange-400 mt-2">High values = work_mem too low</div>
                </div>
                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-white mb-2">temp_blk_write_time (float8)</h4>
                  <p className="text-slate-300 text-sm mb-1">Time writing temp blocks (ms)</p>
                  <div className="text-xs text-orange-400 mt-2">Indicates disk spilling</div>
                </div>
              </div>

              <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700">
                <code>{`-- I/O-bound queries analysis
SELECT query, calls, mean_exec_time,
       shared_blk_read_time, temp_blk_read_time,
       (shared_blk_read_time + temp_blk_read_time) as total_read_time,
       ((shared_blk_read_time + temp_blk_read_time) / NULLIF(total_exec_time, 0) * 100) as io_pct
FROM pg_stat_insights
WHERE total_exec_time > 0 AND (shared_blk_read_time + temp_blk_read_time) > 0
ORDER BY io_pct DESC
LIMIT 20;`}</code>
              </pre>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <strong className="text-blue-400">📊 Interpretation:</strong>
                <ul className="list-disc list-inside text-slate-300 mt-2 space-y-1">
                  <li><strong>io_pct &gt; 50%:</strong> Query is I/O bound - add indexes, increase shared_buffers, or use faster storage</li>
                  <li><strong>io_pct &lt; 10%:</strong> Query is CPU bound - focus on query optimization, not I/O</li>
                  <li><strong>High temp_blk_read_time:</strong> Increase work_mem to avoid disk spilling</li>
                  <li><strong>High shared_blk_read_time with low cache hit ratio:</strong> Increase shared_buffers or effective_cache_size</li>
                </ul>
              </div>
            </div>
          </section>

          {/* WAL Metrics */}
          <section className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Write-Ahead Log (WAL) Metrics</h2>
            <p className="text-slate-300 mb-6">
              Track WAL generation for write-heavy workloads. Critical for replication lag and archive storage planning.
            </p>
            
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-white mb-2">wal_records (bigint)</h3>
                <p className="text-slate-300 mb-3">
                  Number of WAL records generated. Each database modification creates WAL records for crash recovery and replication.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-white mb-2">wal_fpi (bigint)</h3>
                <p className="text-slate-300 mb-3">
                  Full Page Images (FPIs) written to WAL. After checkpoint, first modification of a page writes entire page to WAL.
                  <strong className="text-yellow-400"> High FPI count increases WAL volume and replication lag.</strong>
                </p>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <strong className="text-yellow-400">💡 Optimization:</strong>
                  <span className="text-slate-300 ml-2">High wal_fpi suggests frequent checkpoints. Increase checkpoint_timeout or max_wal_size to reduce FPI overhead.</span>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-white mb-2">wal_bytes (numeric)</h3>
                <p className="text-slate-300 mb-3">
                  Total bytes of WAL generated by this query. <strong>Critical metric for replication and backup sizing.</strong>
                </p>
                <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700">
                  <code>{`-- Top WAL generators (heavy write workload)
SELECT query, calls,
       wal_records, wal_fpi, wal_bytes,
       pg_size_pretty(wal_bytes) as wal_size,
       pg_size_pretty(wal_bytes / NULLIF(calls, 0)) as avg_wal_per_call,
       (wal_bytes::float / SUM(wal_bytes) OVER () * 100) as pct_of_total_wal
FROM pg_stat_insights
WHERE wal_bytes > 0
ORDER BY wal_bytes DESC
LIMIT 20;`}</code>
                </pre>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-white mb-2">wal_buffers_full (bigint)</h3>
                <p className="text-slate-300 mb-3">
                  Number of times query had to wait because WAL buffers were full. <strong className="text-red-400">Non-zero values indicate WAL buffer contention.</strong>
                </p>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <strong className="text-red-400">🚨 Critical Issue:</strong>
                  <span className="text-slate-300 ml-2">If wal_buffers_full &gt; 0, increase wal_buffers (default 16MB, recommend 64MB+ for write-heavy workloads).</span>
                </div>
              </div>

              <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700">
                <code>{`-- WAL buffer pressure analysis
SELECT 
  COUNT(*) FILTER (WHERE wal_buffers_full > 0) as queries_with_wal_pressure,
  SUM(wal_buffers_full) as total_wal_buffer_waits,
  SUM(wal_bytes) as total_wal_bytes,
  pg_size_pretty(SUM(wal_bytes)) as total_wal_size,
  MAX(wal_buffers_full) as max_wal_buffers_full
FROM pg_stat_insights
WHERE calls > 10;

-- If queries_with_wal_pressure > 0, increase wal_buffers`}</code>
              </pre>
            </div>
          </section>

          {/* JIT Metrics */}
          <section className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">JIT Compilation Metrics</h2>
            <p className="text-slate-300 mb-6">
              Just-In-Time compilation (PostgreSQL 11+) compiles query expressions to machine code. Can improve performance by 20-30% for complex expressions but adds compilation overhead.
            </p>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-white mb-2">jit_functions (bigint)</h4>
                  <p className="text-slate-300 text-sm">Number of functions JIT-compiled</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-white mb-2">jit_generation_time (float8)</h4>
                  <p className="text-slate-300 text-sm">Time spent generating machine code (ms)</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-white mb-2">jit_inlining_count (bigint)</h4>
                  <p className="text-slate-300 text-sm">Function inlining optimizations</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-white mb-2">jit_inlining_time (float8)</h4>
                  <p className="text-slate-300 text-sm">Time spent on inlining (ms)</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-white mb-2">jit_optimization_count (bigint)</h4>
                  <p className="text-slate-300 text-sm">LLVM optimization passes</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-white mb-2">jit_optimization_time (float8)</h4>
                  <p className="text-slate-300 text-sm">Time spent optimizing (ms)</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-white mb-2">jit_emission_count (bigint)</h4>
                  <p className="text-slate-300 text-sm">Machine code generation count</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-white mb-2">jit_emission_time (float8)</h4>
                  <p className="text-slate-300 text-sm">Time emitting machine code (ms)</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-white mb-2">jit_deform_count (bigint)</h4>
                  <p className="text-slate-300 text-sm">Tuple deforming operations (PostgreSQL 18+)</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-white mb-2">jit_deform_time (float8)</h4>
                  <p className="text-slate-300 text-sm">Time deforming tuples (ms, PostgreSQL 18+)</p>
                </div>
              </div>

              <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700">
                <code>{`-- JIT cost-benefit analysis
SELECT query, calls, mean_exec_time,
       jit_functions,
       (jit_generation_time + jit_inlining_time + jit_optimization_time + jit_emission_time) as total_jit_time,
       (total_jit_time / NULLIF(calls, 0)) as avg_jit_time_per_call,
       (total_jit_time / NULLIF(total_exec_time, 0) * 100) as jit_overhead_pct,
       CASE 
         WHEN (total_jit_time / NULLIF(calls, 0)) > mean_exec_time * 0.1 THEN 'Disable JIT'
         WHEN jit_functions > 0 THEN 'Beneficial'
         ELSE 'No JIT'
       END as recommendation
FROM pg_stat_insights
WHERE calls > 100
ORDER BY total_jit_time DESC
LIMIT 20;`}</code>
              </pre>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <strong className="text-green-400">✅ JIT is Beneficial When:</strong>
                  <ul className="list-disc list-inside text-slate-300 mt-2 text-sm space-y-1">
                    <li>Complex expressions (math, string ops)</li>
                    <li>Large row counts processed</li>
                    <li>jit_overhead_pct &lt; 5% and mean_exec_time &gt; 100ms</li>
                    <li>Queries run frequently (amortize compilation cost)</li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <strong className="text-red-400">❌ Disable JIT When:</strong>
                  <ul className="list-disc list-inside text-slate-300 mt-2 text-sm space-y-1">
                    <li>jit_overhead_pct &gt; 10%</li>
                    <li>Short-running queries (&lt; 10ms)</li>
                    <li>Simple queries (no complex expressions)</li>
                    <li>One-off queries (no amortization)</li>
                  </ul>
                  <pre className="bg-slate-950 text-slate-100 p-2 rounded mt-2 text-xs">
                    <code>SET jit = off; -- Disable for specific query</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Parallel Execution Metrics */}
          <section className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Parallel Execution Metrics</h2>
            <p className="text-slate-300 mb-6">
              Track parallel query execution efficiency (PostgreSQL 9.6+). Parallel workers can significantly speed up large table scans and aggregations.
            </p>
            
            <div className="space-y-6">
              <div className="border-l-4 border-cyan-500 pl-6">
                <h3 className="text-xl font-semibold text-white mb-2">parallel_workers_to_launch (bigint)</h3>
                <p className="text-slate-300 mb-3">
                  Number of parallel workers the planner intended to use. Based on table size, available CPU cores, and max_parallel_workers_per_gather.
                </p>
              </div>

              <div className="border-l-4 border-cyan-500 pl-6">
                <h3 className="text-xl font-semibold text-white mb-2">parallel_workers_launched (bigint)</h3>
                <p className="text-slate-300 mb-3">
                  Number of parallel workers actually started. May be less than planned if max_parallel_workers limit is reached.
                </p>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <strong className="text-yellow-400">⚠️ Workers Not Launching:</strong>
                  <span className="text-slate-300 ml-2">If launched &lt; to_launch, increase max_parallel_workers and max_worker_processes.</span>
                </div>
              </div>

              <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700">
                <code>{`-- Parallel execution efficiency analysis
SELECT query, calls, mean_exec_time,
       parallel_workers_to_launch as planned_workers,
       parallel_workers_launched as actual_workers,
       (parallel_workers_launched::float / NULLIF(parallel_workers_to_launch, 0)) as launch_ratio,
       rows / NULLIF(calls, 0) as avg_rows,
       CASE
         WHEN parallel_workers_to_launch = 0 THEN 'No parallelism'
         WHEN parallel_workers_launched < parallel_workers_to_launch THEN 'Worker shortage'
         WHEN mean_exec_time > 1000 AND parallel_workers_launched > 0 THEN 'Parallel not helping'
         WHEN parallel_workers_launched > 0 THEN 'Effective parallelism'
         ELSE 'Check query plan'
       END as analysis
FROM pg_stat_insights
WHERE calls > 10
ORDER BY parallel_workers_to_launch DESC
LIMIT 20;`}</code>
              </pre>

              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
                <strong className="text-cyan-400">🎯 Parallel Query Tuning:</strong>
                <ul className="list-disc list-inside text-slate-300 mt-2 space-y-1">
                  <li><strong>max_parallel_workers_per_gather = 4</strong> - Max workers per query (increase for analytical queries)</li>
                  <li><strong>max_parallel_workers = 8</strong> - Total parallel workers across all queries</li>
                  <li><strong>parallel_setup_cost = 1000</strong> - Lower to encourage parallelism</li>
                  <li><strong>parallel_tuple_cost = 0.1</strong> - Lower to encourage parallelism</li>
                  <li><strong>min_parallel_table_scan_size = 8MB</strong> - Minimum table size for parallel scan</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Timestamp Metrics */}
          <section className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Statistics Timestamp Metrics</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-white mb-2">stats_since (timestamp with time zone)</h3>
                <p className="text-slate-300 mb-3">
                  Timestamp when statistics for this query began accumulating. Reset when pg_stat_insights_reset() is called or when the extension is reloaded.
                </p>
                <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700">
                  <code>{`-- How long have stats been collecting?
SELECT 
  MIN(stats_since) as oldest_stats,
  MAX(stats_since) as newest_stats,
  NOW() - MIN(stats_since) as stats_age
FROM pg_stat_insights;`}</code>
                </pre>
              </div>

              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-white mb-2">minmax_stats_since (timestamp with time zone)</h3>
                <p className="text-slate-300 mb-3">
                  Timestamp when min/max statistics were last reset. Used for tracking short-term min/max variations separately from cumulative stats.
                </p>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <strong className="text-blue-400">💡 Use Case:</strong>
                  <span className="text-slate-300 ml-2">Reset minmax periodically to track recent performance changes vs historical averages.</span>
                </div>
              </div>
            </div>
          </section>

          {/* Summary & Best Practices */}
          <section className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Summary & Best Practices</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Most Critical Metrics for Optimization</h3>
                <ol className="list-decimal list-inside space-y-2 text-slate-300">
                  <li><strong className="text-white">total_exec_time</strong> - Optimize queries with highest total time first</li>
                  <li><strong className="text-white">cache_hit_ratio</strong> - (shared_blks_hit / total_blocks) should be &gt; 99%</li>
                  <li><strong className="text-white">temp_blks_written</strong> - Non-zero = increase work_mem</li>
                  <li><strong className="text-white">mean_exec_time</strong> - Target specific slow queries</li>
                  <li><strong className="text-white">wal_bytes</strong> - Size replication and backup infrastructure</li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Common Optimization Patterns</h3>
                <ul className="space-y-2 text-slate-300">
                  <li><strong className="text-white">High shared_blks_read:</strong> Add indexes or increase shared_buffers</li>
                  <li><strong className="text-white">High stddev_exec_time:</strong> Check for data skew or plan instability</li>
                  <li><strong className="text-white">High temp_blk_*:</strong> Increase work_mem or rewrite query</li>
                  <li><strong className="text-white">High jit_overhead_pct:</strong> Consider SET jit = off</li>
                  <li><strong className="text-white">launched &lt; to_launch:</strong> Increase max_parallel_workers</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-white/5 rounded-lg p-6">
              <h4 className="font-semibold text-white mb-3">Complete Performance Analysis Query</h4>
              <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700 text-sm">
                <code>{`-- Comprehensive query performance analysis
SELECT 
  LEFT(query, 80) as query_text,
  calls,
  pg_size_pretty(wal_bytes) as wal_volume,
  
  -- Execution timing
  ROUND(mean_exec_time::numeric, 2) as avg_ms,
  ROUND((stddev_exec_time / NULLIF(mean_exec_time, 0))::numeric, 2) as cv,
  
  -- Cache efficiency
  ROUND((shared_blks_hit::float / NULLIF(shared_blks_hit + shared_blks_read, 0) * 100)::numeric, 1) as cache_hit_pct,
  
  -- Temp usage (CRITICAL)
  CASE WHEN temp_blks_written > 0 THEN '🚨' ELSE '✓' END as temp_flag,
  pg_size_pretty((temp_blks_written * 8192)::bigint) as temp_size,
  
  -- I/O percentage
  ROUND(((shared_blk_read_time + temp_blk_read_time) / NULLIF(total_exec_time, 0) * 100)::numeric, 1) as io_pct,
  
  -- Performance impact
  ROUND((total_exec_time / SUM(total_exec_time) OVER () * 100)::numeric, 1) as pct_total_time

FROM pg_stat_insights
WHERE calls > 10
ORDER BY total_exec_time DESC
LIMIT 50;`}</code>
              </pre>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
