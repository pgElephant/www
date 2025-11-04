import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Views Reference | pg_stat_insights',
  description: 'Complete reference for all 11 pg_stat_insights views with usage examples, SQL queries, and performance analysis techniques.'
};

export default function PgStatInsightsViewsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Views Reference</h1>
        <p className="text-lg text-muted-foreground">
          Complete documentation for all 11 pre-built views in pg_stat_insights. Each view provides instant access to specific performance metrics and query analytics.
        </p>
      </div>

      <section className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Quick Reference</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>11 views</strong> covering performance analysis, cache optimization, I/O tracking, and monitoring</li>
          <li><strong>All views</strong> are automatically created when extension is installed</li>
          <li><strong>Public access granted</strong> by default - all database users can query views</li>
          <li><strong>Real-time data</strong> - views reflect current statistics collection</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Main Statistics View</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pg_stat_insights</code></h3>
            <p className="mb-3 text-muted-foreground">
              Primary view with all 52 metric columns. Provides comprehensive query statistics including execution time, buffer usage, WAL generation, JIT compilation, and parallel worker metrics.
            </p>
            
            <h4 className="font-semibold mt-4 mb-2">Usage:</h4>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- View all tracked queries with full statistics
SELECT * FROM pg_stat_insights;

-- Find specific query by queryid
SELECT * FROM pg_stat_insights WHERE queryid = 1234567890;

-- Filter by database
SELECT * FROM pg_stat_insights WHERE dbid = (SELECT oid FROM pg_database WHERE datname = 'mydb');

-- Top queries by execution time
SELECT 
    query,
    calls,
    total_exec_time,
    mean_exec_time,
    max_exec_time,
    rows
FROM pg_stat_insights
ORDER BY total_exec_time DESC
LIMIT 20;`}</code>
            </pre>

            <h4 className="font-semibold mt-4 mb-2">Key Columns:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
              <li><code>userid</code>, <code>dbid</code>, <code>queryid</code> - Query identification</li>
              <li><code>query</code> - Normalized query text</li>
              <li><code>calls</code> - Number of times executed</li>
              <li><code>total_exec_time</code>, <code>mean_exec_time</code>, <code>min_exec_time</code>, <code>max_exec_time</code> - Execution timing</li>
              <li><code>rows</code> - Total rows retrieved/affected</li>
              <li><code>shared_blks_hit</code>, <code>shared_blks_read</code> - Buffer cache statistics</li>
              <li><code>wal_records</code>, <code>wal_bytes</code> - WAL generation metrics</li>
              <li>Plus 40+ additional metrics (see Metrics Guide for complete list)</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Performance Analysis Views</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pg_stat_insights_top_by_time</code></h3>
            <p className="mb-3 text-muted-foreground">
              Top 100 queries sorted by total execution time. Use this to find queries consuming the most cumulative database time.
            </p>
            
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- View slowest queries by total time
SELECT 
    query,
    calls,
    total_exec_time,
    mean_exec_time,
    ROUND((total_exec_time / SUM(total_exec_time) OVER ()) * 100, 2) AS pct_total_time
FROM pg_stat_insights_top_by_time
LIMIT 10;

-- Example output:
--  query                                    | calls | total_exec_time | mean_exec_time | pct_total_time 
-- ------------------------------------------+-------+-----------------+----------------+----------------
--  SELECT * FROM large_table WHERE id = $1  | 50000 |       125000.50 |           2.50 |          45.20
--  UPDATE users SET last_seen = NOW()...    | 10000 |        85000.30 |           8.50 |          30.75`}</code>
            </pre>

            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-sm">
              <strong>Use case:</strong> Identify queries that have accumulated the most execution time. 
              A query with low mean time but high call count may still dominate total time.
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pg_stat_insights_top_by_calls</code></h3>
            <p className="mb-3 text-muted-foreground">
              Top 100 queries sorted by call frequency. Identify the most frequently executed queries.
            </p>
            
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Most frequently called queries
SELECT 
    LEFT(query, 80) AS query_preview,
    calls,
    mean_exec_time,
    calls * mean_exec_time AS total_time_impact
FROM pg_stat_insights_top_by_calls
LIMIT 10;

-- Find hot path queries (high frequency, low latency)
SELECT 
    query,
    calls,
    mean_exec_time,
    shared_blks_hit,
    shared_blks_read,
    CASE 
        WHEN shared_blks_hit + shared_blks_read > 0 
        THEN ROUND((shared_blks_hit::numeric / (shared_blks_hit + shared_blks_read)) * 100, 2)
        ELSE 0
    END AS cache_hit_pct
FROM pg_stat_insights_top_by_calls
WHERE mean_exec_time < 5  -- Fast queries (< 5ms)
LIMIT 15;`}</code>
            </pre>

            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-sm">
              <strong>Use case:</strong> Optimize frequently-called queries for maximum impact. 
              Even small improvements (e.g., 1ms → 0.5ms) can save significant total time.
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pg_stat_insights_slow_queries</code></h3>
            <p className="mb-3 text-muted-foreground">
              Queries with mean execution time &gt; 100ms. Focus on individual query optimization.
            </p>
            
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- View slow queries
SELECT 
    query,
    calls,
    mean_exec_time AS avg_ms,
    max_exec_time AS max_ms,
    stddev_exec_time AS stddev_ms,
    rows / NULLIF(calls, 0) AS avg_rows_per_call
FROM pg_stat_insights_slow_queries
ORDER BY mean_exec_time DESC
LIMIT 20;

-- Slow queries with high variance (inconsistent performance)
SELECT 
    query,
    mean_exec_time,
    stddev_exec_time,
    stddev_exec_time / NULLIF(mean_exec_time, 0) AS coefficient_of_variation
FROM pg_stat_insights_slow_queries
WHERE stddev_exec_time > mean_exec_time * 0.5  -- High variance
ORDER BY coefficient_of_variation DESC;`}</code>
            </pre>

            <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-sm">
              <strong>Optimization tip:</strong> High standard deviation indicates inconsistent query performance. 
              Investigate parameter sniffing, plan stability, or resource contention issues.
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">I/O and Cache Analysis Views</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pg_stat_insights_top_by_io</code></h3>
            <p className="mb-3 text-muted-foreground">
              Top 100 queries by total I/O (shared_blks_read + local_blks_read + temp_blks_read). Find disk-intensive operations.
            </p>
            
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Highest I/O consumers
SELECT 
    query,
    calls,
    shared_blks_read,
    local_blks_read,
    temp_blks_read,
    shared_blks_read + local_blks_read + temp_blks_read AS total_blks_read,
    (shared_blks_read + local_blks_read + temp_blks_read) * 8 / 1024 AS total_mb_read
FROM pg_stat_insights_top_by_io
LIMIT 15;

-- I/O breakdown analysis
SELECT 
    query,
    calls,
    shared_blks_read AS shared_io,
    local_blks_read AS local_io,
    temp_blks_read AS temp_io,
    CASE 
        WHEN temp_blks_read > 0 THEN 'Uses temp files - consider work_mem increase'
        WHEN local_blks_read > shared_blks_read THEN 'Heavy local buffer usage'
        ELSE 'Normal shared buffer access'
    END AS io_pattern
FROM pg_stat_insights_top_by_io
WHERE shared_blks_read + local_blks_read + temp_blks_read > 1000
LIMIT 20;`}</code>
            </pre>

            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-sm">
              <strong>Performance impact:</strong> Each block read is 8KB. High I/O queries may benefit from:
              <ul className="list-disc list-inside mt-1 ml-4">
                <li>Index creation on filter columns</li>
                <li>Increasing <code>shared_buffers</code> for better caching</li>
                <li>Partitioning large tables</li>
                <li>Increasing <code>work_mem</code> to avoid temp file usage</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pg_stat_insights_top_cache_misses</code></h3>
            <p className="mb-3 text-muted-foreground">
              Queries with poor buffer cache performance (low hit ratio). Includes calculated <code>cache_hit_ratio</code>.
            </p>
            
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Queries with poor cache performance
SELECT 
    query,
    calls,
    shared_blks_hit,
    shared_blks_read,
    cache_hit_ratio,
    (shared_blks_read * 8 / 1024) AS mb_read_from_disk
FROM pg_stat_insights_top_cache_misses
WHERE cache_hit_ratio < 0.90  -- Less than 90% cache hit
ORDER BY shared_blks_read DESC
LIMIT 15;

-- Cache efficiency analysis
SELECT 
    CASE 
        WHEN cache_hit_ratio >= 0.99 THEN 'Excellent (>99%)'
        WHEN cache_hit_ratio >= 0.95 THEN 'Good (95-99%)'
        WHEN cache_hit_ratio >= 0.90 THEN 'Acceptable (90-95%)'
        ELSE 'Poor (<90%)'
    END AS cache_performance,
    COUNT(*) AS query_count,
    SUM(calls) AS total_calls,
    SUM(shared_blks_read) AS total_disk_reads
FROM pg_stat_insights_top_cache_misses
GROUP BY 1
ORDER BY 1;`}</code>
            </pre>

            <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-sm">
              <strong>Target cache hit ratio:</strong> &gt;95% is good, &gt;99% is excellent. 
              Low ratios indicate insufficient <code>shared_buffers</code>, missing indexes, or sequential scans on large tables.
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Advanced Analysis Views</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pg_stat_insights_histogram_summary</code></h3>
            <p className="mb-3 text-muted-foreground">
              Response time distribution with categorization (&lt;1ms, 1-10ms, 10-100ms, 100ms-1s, 1-10s, &gt;10s). Includes cache hit ratio and WAL metrics.
            </p>
            
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- View response time distribution
SELECT 
    response_time_category,
    COUNT(*) AS query_count,
    SUM(calls) AS total_calls,
    ROUND(AVG(mean_exec_time), 2) AS avg_mean_time,
    ROUND(AVG(cache_hit_ratio), 4) AS avg_cache_hit_ratio
FROM pg_stat_insights_histogram_summary
GROUP BY response_time_category
ORDER BY 
    CASE response_time_category
        WHEN '<1ms' THEN 1
        WHEN '1-10ms' THEN 2
        WHEN '10-100ms' THEN 3
        WHEN '100ms-1s' THEN 4
        WHEN '1-10s' THEN 5
        WHEN '>10s' THEN 6
    END;

-- Example output:
--  response_time_category | query_count | total_calls | avg_mean_time | avg_cache_hit_ratio 
-- ------------------------+-------------+-------------+---------------+---------------------
--  <1ms                   |         450 |    1250000  |          0.35 |              0.9950
--  1-10ms                 |         125 |      85000  |          3.25 |              0.9800
--  10-100ms               |          38 |      12000  |         45.50 |              0.8900
--  100ms-1s               |          15 |        800  |        350.00 |              0.7500
--  1-10s                  |           5 |         50  |       4500.00 |              0.6000`}</code>
            </pre>

            <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-sm">
              <strong>SLA monitoring:</strong> Use this view to track percentage of queries meeting response time SLAs.
              Example: 99% of queries should be &lt;100ms.
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pg_stat_insights_by_bucket</code></h3>
            <p className="mb-3 text-muted-foreground">
              Time-series aggregation view with statistics since timestamp (<code>stats_since</code>). Track performance trends over time.
            </p>
            
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Recent query performance (last hour)
SELECT 
    query_preview,
    total_calls,
    mean_exec_time,
    cache_hit_ratio,
    wal_bytes,
    stats_start_time,
    NOW() - stats_start_time AS stats_age
FROM pg_stat_insights_by_bucket
WHERE stats_start_time > NOW() - INTERVAL '1 hour'
ORDER BY total_exec_time DESC
LIMIT 20;

-- Trend analysis: compare recent vs historical performance
WITH recent AS (
    SELECT queryid, mean_exec_time AS recent_mean
    FROM pg_stat_insights_by_bucket
    WHERE stats_start_time > NOW() - INTERVAL '1 hour'
),
historical AS (
    SELECT queryid, mean_exec_time AS historical_mean
    FROM pg_stat_insights
)
SELECT 
    h.queryid,
    r.recent_mean,
    h.historical_mean,
    ((r.recent_mean - h.historical_mean) / NULLIF(h.historical_mean, 0)) * 100 AS pct_change
FROM recent r
JOIN historical h ON r.queryid = h.queryid
WHERE ABS((r.recent_mean - h.historical_mean) / NULLIF(h.historical_mean, 0)) > 0.20  -- >20% change
ORDER BY pct_change DESC;`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Monitoring and Error Views</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pg_stat_insights_replication</code></h3>
            <p className="mb-3 text-muted-foreground">
              Replication lag and status monitoring. Shows write lag, flush lag, replay lag in bytes and seconds.
            </p>
            
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- Monitor replication lag
SELECT 
    application_name,
    client_addr,
    repl_state,
    sync_state,
    write_lag_bytes,
    flush_lag_bytes,
    replay_lag_bytes,
    write_lag_seconds,
    flush_lag_seconds,
    replay_lag_seconds
FROM pg_stat_insights_replication;

-- Example output:
--  application_name | client_addr  | repl_state | sync_state | write_lag_bytes | flush_lag_bytes | replay_lag_bytes | write_lag_seconds | flush_lag_seconds | replay_lag_seconds
-- ------------------+--------------+------------+------------+-----------------+-----------------+------------------+-------------------+-------------------+--------------------
--  replica1         | 10.0.1.12    | streaming  | async      |            1024 |            2048 |             4096 |              0.15 |              0.25 |               0.50
--  replica2         | 10.0.1.13    | streaming  | sync       |               0 |               0 |                0 |              0.00 |              0.00 |               0.00

-- Alert on high replication lag
SELECT 
    application_name,
    replay_lag_bytes / 1024 / 1024 AS replay_lag_mb,
    replay_lag_seconds
FROM pg_stat_insights_replication
WHERE replay_lag_seconds > 5  -- More than 5 seconds lag
   OR replay_lag_bytes > 100 * 1024 * 1024;  -- More than 100MB lag`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pg_stat_insights_errors</code></h3>
            <p className="mb-3 text-muted-foreground">
              Queries with execution errors (placeholder view - requires error tracking in C code).
            </p>
            
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- View queries with errors
-- Note: Current implementation is placeholder
-- Future versions will track actual query errors
SELECT * FROM pg_stat_insights_errors;`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2"><code>pg_stat_insights_plan_errors</code></h3>
            <p className="mb-3 text-muted-foreground">
              Plan estimation errors (placeholder view - requires plan tracking).
            </p>
            
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
              <code>{`-- View queries with plan estimation issues
-- Note: Current implementation is placeholder
-- Future versions will track plan vs actual row estimates
SELECT * FROM pg_stat_insights_plan_errors;`}</code>
            </pre>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Common Query Patterns</h2>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Comprehensive Performance Report</h3>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>{`-- Generate performance summary report
SELECT 
    'Top 10 by Time' AS category,
    query,
    calls,
    total_exec_time,
    mean_exec_time
FROM pg_stat_insights_top_by_time
LIMIT 10

UNION ALL

SELECT 
    'Top 10 by Calls',
    query,
    calls,
    total_exec_time,
    mean_exec_time
FROM pg_stat_insights_top_by_calls
LIMIT 10

UNION ALL

SELECT 
    'Top 10 Slow Queries',
    query,
    calls,
    total_exec_time,
    mean_exec_time
FROM pg_stat_insights_slow_queries
LIMIT 10;`}</code>
          </pre>

          <h3 className="text-lg font-semibold mt-6">Query Optimization Candidates</h3>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code>{`-- Find queries that would benefit most from optimization
SELECT 
    query,
    calls,
    total_exec_time,
    mean_exec_time,
    shared_blks_read,
    cache_hit_ratio,
    CASE 
        WHEN mean_exec_time > 1000 THEN 'Slow query (>1s)'
        WHEN cache_hit_ratio < 0.90 THEN 'Poor cache performance'
        WHEN shared_blks_read > 10000 THEN 'High I/O'
        WHEN temp_blks_read > 0 THEN 'Uses temp files'
        ELSE 'Other'
    END AS optimization_reason,
    calls * mean_exec_time * 0.001 AS potential_time_savings_ms
FROM pg_stat_insights_top_cache_misses
WHERE mean_exec_time > 100 
   OR cache_hit_ratio < 0.90 
   OR shared_blks_read > 1000
ORDER BY potential_time_savings_ms DESC
LIMIT 20;`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        <ul className="space-y-3 text-muted-foreground">
          <li>
            <strong>Regular monitoring:</strong> Query views hourly or daily to identify performance trends
          </li>
          <li>
            <strong>Focus on high-impact queries:</strong> Start with <code>top_by_time</code> and <code>top_by_calls</code> for maximum ROI
          </li>
          <li>
            <strong>Cache optimization:</strong> Use <code>top_cache_misses</code> to improve buffer cache efficiency
          </li>
          <li>
            <strong>I/O reduction:</strong> Analyze <code>top_by_io</code> to identify candidates for indexing or partitioning
          </li>
          <li>
            <strong>SLA tracking:</strong> Use <code>histogram_summary</code> to monitor response time distribution
          </li>
          <li>
            <strong>Trend analysis:</strong> Compare <code>by_bucket</code> data over time to detect regressions
          </li>
          <li>
            <strong>Combine views:</strong> Join multiple views for comprehensive analysis
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
        <ul className="space-y-2">
          <li>
            <a href="/docs/pg_stat_insights/metrics" className="text-blue-600 hover:underline">
              Metrics Guide
            </a> - Detailed explanation of all 52 columns
          </li>
          <li>
            <a href="/docs/pg_stat_insights/usage" className="text-blue-600 hover:underline">
              Usage Examples
            </a> - 50+ SQL queries for performance analysis
          </li>
          <li>
            <a href="/docs/pg_stat_insights/configuration" className="text-blue-600 hover:underline">
              Configuration
            </a> - GUC parameters and tuning
          </li>
          <li>
            <a href="/docs/pg_stat_insights/monitoring" className="text-blue-600 hover:underline">
              Prometheus & Grafana
            </a> - Real-time monitoring integration
          </li>
        </ul>
      </section>
    </div>
  );
}
