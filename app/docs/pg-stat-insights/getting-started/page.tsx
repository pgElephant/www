export const metadata = {
  title: 'pg_stat_insights · Slow Query Analysis',
  description: 'Step-by-step guide to identifying, analyzing, and optimizing slow PostgreSQL queries using pg_stat_insights.'
}

import React from 'react'
import Link from 'next/link'
import { TurtleIcon as Turtle, ArrowRight, Database, Activity, TrendingUp, Code } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/docs/pg_stat_insights" className="inline-flex items-center gap-2 text-teal-300 hover:text-teal-200 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to pg_stat_insights
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 text-transparent bg-clip-text flex items-center gap-3">
          <Turtle className="w-10 h-10 text-red-400" /> Slow Query Analysis
        </h1>
        
        <p className="text-lg text-gray-300 mb-8">
          Identify, categorize, and optimize slow queries with comprehensive performance metrics and step-by-step analysis.
        </p>

        {/* STEP 1: IDENTIFY SLOW QUERIES */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-red-400">Step 1: Identify Slow Queries</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-red-400" />
                Top 10 Slowest Queries by Average Execution Time
              </h3>
              <p className="text-gray-300 mb-4">
                Find queries with highest mean execution time - these are your primary optimization targets.
              </p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Find queries with highest average execution time
SELECT 
    queryid,                                    -- Unique query identifier
    LEFT(query, 80) as query_preview,           -- First 80 chars of query
    calls,                                      -- Number of executions
    ROUND(mean_exec_time::numeric, 2) as avg_ms,  -- Average time per execution
    ROUND(total_exec_time::numeric, 2) as total_ms, -- Total cumulative time
    ROUND(stddev_exec_time::numeric, 2) as stddev_ms, -- Execution time variance
    ROUND(min_exec_time::numeric, 2) as min_ms,   -- Fastest execution
    ROUND(max_exec_time::numeric, 2) as max_ms    -- Slowest execution
FROM pg_stat_insights
WHERE calls > 10                                -- Filter: executed more than 10 times
ORDER BY mean_exec_time DESC                    -- Sort: slowest average first
LIMIT 10;

-- Example Output:
-- queryid        | query_preview                                  | calls | avg_ms  | total_ms | stddev_ms | min_ms | max_ms
-- --------------+------------------------------------------------+-------+---------+----------+-----------+--------+---------
-- 5234567890123 | SELECT * FROM orders o JOIN customers c ON ... |   342 | 1234.56 | 422219.5 |    456.78 |  234.5 | 3456.7
-- 8765432109876 | UPDATE inventory SET stock = stock - ? WHERE...|   156 |  987.65 | 154073.4 |    234.56 |  456.7 | 2345.6`}</code>
              </pre>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4">Queries Over 1 Second (Critical)</h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Find queries exceeding 1 second average execution time
SELECT 
    queryid,
    LEFT(query, 100) as query_preview,
    calls,
    ROUND(mean_exec_time::numeric, 2) as avg_ms,
    ROUND((mean_exec_time / 1000)::numeric, 2) as avg_seconds,
    CASE 
        WHEN mean_exec_time > 10000 THEN '🔴 CRITICAL (>10s)'
        WHEN mean_exec_time > 5000 THEN '🟠 SEVERE (5-10s)'
        WHEN mean_exec_time > 1000 THEN '🟡 WARNING (1-5s)'
        ELSE '🟢 OK'
    END as severity
FROM pg_stat_insights
WHERE mean_exec_time > 1000                     -- Over 1 second average
ORDER BY mean_exec_time DESC;

-- Priority: Focus on CRITICAL and SEVERE queries first`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* STEP 2: CATEGORIZE BY EXECUTION TIME */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-orange-400">Step 2: Categorize Queries by Execution Time</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-orange-400" />
                Query Distribution by Response Time
              </h3>
              <p className="text-gray-300 mb-4">
                Group queries into response time buckets to understand performance distribution.
              </p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Categorize queries by execution time ranges
WITH query_categories AS (
    SELECT 
        queryid,
        LEFT(query, 60) as query_preview,
        calls,
        mean_exec_time,
        total_exec_time,
        CASE 
            WHEN mean_exec_time < 1 THEN '⚡ Ultra Fast (<1ms)'
            WHEN mean_exec_time < 10 THEN '✅ Fast (1-10ms)'
            WHEN mean_exec_time < 100 THEN '⚠️  Moderate (10-100ms)'
            WHEN mean_exec_time < 1000 THEN '🟡 Slow (100ms-1s)'
            WHEN mean_exec_time < 5000 THEN '🟠 Very Slow (1-5s)'
            ELSE '🔴 Critical (>5s)'
        END as category,
        CASE 
            WHEN mean_exec_time < 1 THEN 1
            WHEN mean_exec_time < 10 THEN 2
            WHEN mean_exec_time < 100 THEN 3
            WHEN mean_exec_time < 1000 THEN 4
            WHEN mean_exec_time < 5000 THEN 5
            ELSE 6
        END as category_order
    FROM pg_stat_insights
    WHERE calls > 5
)
SELECT 
    category,
    COUNT(*) as query_count,
    SUM(calls) as total_executions,
    ROUND(SUM(total_exec_time)::numeric, 2) as cumulative_time_ms,
    ROUND(AVG(mean_exec_time)::numeric, 2) as avg_exec_time_ms
FROM query_categories
GROUP BY category, category_order
ORDER BY category_order;

-- Example Output:
-- category                | query_count | total_executions | cumulative_time_ms | avg_exec_time_ms
-- -----------------------+-------------+------------------+--------------------+------------------
-- ⚡ Ultra Fast (<1ms)    |         245 |          1234567 |          456789.23 |             0.45
-- ✅ Fast (1-10ms)        |         123 |           234567 |         1234567.89 |             5.67
-- ⚠️  Moderate (10-100ms) |          45 |            34567 |         1567890.12 |            45.34
-- 🟡 Slow (100ms-1s)      |          12 |             5678 |         3456789.01 |           608.91
-- 🟠 Very Slow (1-5s)     |           5 |             1234 |         8901234.56 |          7215.43
-- 🔴 Critical (>5s)       |           3 |              456 |        12345678.90 |         27069.03`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* STEP 3: ANALYZE QUERY PATTERNS */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-yellow-400">Step 3: Analyze Query Execution Patterns</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-yellow-400" />
                Planning vs Execution Time
              </h3>
              <p className="text-gray-300 mb-4">
                Identify queries where planning overhead is significant compared to execution.
              </p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Compare planning time vs execution time
SELECT 
    queryid,
    LEFT(query, 80) as query_preview,
    calls,
    ROUND(mean_plan_time::numeric, 2) as avg_plan_ms,
    ROUND(mean_exec_time::numeric, 2) as avg_exec_ms,
    ROUND((mean_plan_time + mean_exec_time)::numeric, 2) as total_avg_ms,
    ROUND((mean_plan_time / NULLIF(mean_plan_time + mean_exec_time, 0) * 100)::numeric, 2) as plan_pct
FROM pg_stat_insights
WHERE mean_plan_time > 0                        -- Has planning time data
  AND calls > 20
ORDER BY plan_pct DESC                          -- Highest planning overhead first
LIMIT 15;

-- Insight: If plan_pct > 20%, consider using prepared statements
-- Example Output:
-- queryid        | query_preview                    | calls | avg_plan_ms | avg_exec_ms | total_avg_ms | plan_pct
-- --------------+----------------------------------+-------+-------------+-------------+--------------+----------
-- 1234567890123 | SELECT * FROM complex_view WHERE |   456 |       12.34 |       23.45 |        35.79 |    34.49
-- 
-- Action: High planning % → Use PREPARE/EXECUTE for repeated queries`}</code>
              </pre>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4">Execution Time Variability</h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Find queries with high execution time variability
SELECT 
    queryid,
    LEFT(query, 80) as query_preview,
    calls,
    ROUND(mean_exec_time::numeric, 2) as avg_ms,
    ROUND(stddev_exec_time::numeric, 2) as stddev_ms,
    ROUND(min_exec_time::numeric, 2) as min_ms,
    ROUND(max_exec_time::numeric, 2) as max_ms,
    ROUND((stddev_exec_time / NULLIF(mean_exec_time, 0) * 100)::numeric, 2) as coefficient_variation,
    ROUND((max_exec_time / NULLIF(min_exec_time, 0))::numeric, 2) as range_ratio
FROM pg_stat_insights
WHERE calls > 50
  AND stddev_exec_time > mean_exec_time * 0.5   -- High variance: stddev > 50% of mean
ORDER BY coefficient_variation DESC
LIMIT 15;

-- High variability indicates:
-- • Inconsistent query plans (parameter sniffing)
-- • Cache warming effects
-- • Lock contention
-- • Data distribution changes
--
-- coefficient_variation > 100% → Investigate query plan stability`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* STEP 4: TOTAL TIME IMPACT */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-green-400">Step 4: Measure Total Time Impact</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4">Top Queries by Cumulative Execution Time</h3>
              <p className="text-gray-300 mb-4">
                Even fast queries can consume significant resources if called frequently. Find high-impact queries.
              </p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Queries consuming most total database time
WITH query_stats AS (
    SELECT 
        queryid,
        LEFT(query, 80) as query_preview,
        calls,
        ROUND(mean_exec_time::numeric, 2) as avg_ms,
        ROUND(total_exec_time::numeric, 2) as total_ms,
        ROUND((total_exec_time / 1000)::numeric, 2) as total_seconds,
        ROUND((total_exec_time / 60000)::numeric, 2) as total_minutes
    FROM pg_stat_insights
    WHERE calls > 10
),
total_time AS (
    SELECT SUM(total_exec_time) as db_total_time
    FROM pg_stat_insights
)
SELECT 
    q.queryid,
    q.query_preview,
    q.calls,
    q.avg_ms,
    q.total_minutes,
    ROUND((q.total_ms / t.db_total_time * 100)::numeric, 2) as pct_of_total_time,
    ROUND((SUM(q.total_ms) OVER (ORDER BY q.total_ms DESC) / t.db_total_time * 100)::numeric, 2) as cumulative_pct
FROM query_stats q, total_time t
ORDER BY q.total_ms DESC
LIMIT 20;

-- Example Output:
-- queryid        | query_preview                       | calls  | avg_ms | total_min | pct_of_total | cumulative_pct
-- --------------+-------------------------------------+--------+--------+-----------+--------------+----------------
-- 5678901234567 | SELECT * FROM orders WHERE status...|  45678 |  12.34 |     9.39  |        15.23 |          15.23
-- 3456789012345 | UPDATE products SET stock = ?...    |  23456 |  23.45 |     9.17  |        14.87 |          30.10
-- 
-- 80/20 Rule: Top 20% of queries often account for 80% of execution time`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* STEP 5: OPTIMIZATION RECOMMENDATIONS */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-cyan-400">Step 5: Get Optimization Recommendations</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Comprehensive slow query analysis with recommendations
SELECT 
    queryid,
    LEFT(query, 100) as query_preview,
    calls,
    ROUND(mean_exec_time::numeric, 2) as avg_ms,
    ROUND(total_exec_time::numeric, 2) as total_ms,
    ROUND(mean_plan_time::numeric, 2) as avg_plan_ms,
    ROUND(stddev_exec_time::numeric, 2) as stddev_ms,
    rows,
    CASE 
        -- Optimization recommendations based on metrics
        WHEN mean_plan_time > mean_exec_time * 0.3 
            THEN '📋 Use PREPARE/EXECUTE to reduce planning overhead'
        WHEN stddev_exec_time > mean_exec_time 
            THEN '📊 Investigate query plan instability'
        WHEN mean_exec_time > 5000 
            THEN '🔴 CRITICAL: Requires immediate optimization'
        WHEN mean_exec_time > 1000 
            THEN '🟡 Add indexes or rewrite query'
        WHEN calls > 10000 AND mean_exec_time > 10 
            THEN '🔄 High frequency: Consider caching'
        WHEN rows / NULLIF(calls, 0) > 10000 
            THEN '📦 Large result set: Add LIMIT or pagination'
        ELSE '✅ Performance acceptable'
    END as recommendation
FROM pg_stat_insights
WHERE calls > 10
ORDER BY 
    CASE 
        WHEN mean_exec_time > 5000 THEN 1
        WHEN mean_exec_time > 1000 THEN 2
        WHEN total_exec_time > 100000 THEN 3
        ELSE 4
    END,
    mean_exec_time DESC
LIMIT 20;`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* MONITORING BEST PRACTICES */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-purple-400">Monitoring Best Practices</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 rounded-lg p-6 border border-purple-700">
                <h3 className="text-xl font-semibold mb-3 text-purple-400">✅ Do This:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Review slow queries daily/weekly</li>
                  <li>• Set alerts for queries &gt; 1 second</li>
                  <li>• Track query performance trends</li>
                  <li>• Monitor total_exec_time, not just avg</li>
                  <li>• Reset stats periodically (weekly)</li>
                </ul>
              </div>
              
              <div className="bg-gray-900/50 rounded-lg p-6 border border-orange-700">
                <h3 className="text-xl font-semibold mb-3 text-orange-400">⚠️ Avoid This:</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Ignoring queries with few calls</li>
                  <li>• Only looking at mean_exec_time</li>
                  <li>• Not considering planning overhead</li>
                  <li>• Forgetting to check stddev</li>
                  <li>• Never resetting statistics</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* SQL FILES REFERENCE */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Code className="w-6 h-6 text-purple-400" />
            Related SQL Test Files
          </h2>
          <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
            <ul className="space-y-2 text-gray-300">
              <li><code className="text-green-400">/Users/pgedge/pge/pg_stat_insights/sql/select.sql</code> - SELECT query tracking</li>
              <li><code className="text-green-400">/Users/pgedge/pge/pg_stat_insights/sql/planning.sql</code> - Planning time analysis</li>
              <li><code className="text-green-400">/Users/pgedge/pge/pg_stat_insights/sql/dml.sql</code> - DML statement performance</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
