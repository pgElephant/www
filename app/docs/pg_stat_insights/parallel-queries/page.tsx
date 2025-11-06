export const metadata = {
  title: 'pg_stat_insights · Parallel Query Analysis',
  description: 'Track parallel worker usage, measure parallelism benefits, and optimize parallel query execution.'
}

import React from 'react'
import Link from 'next/link'
import { GitBranch, ArrowRight, Database, Activity, TrendingUp, Code } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/docs/pg_stat_insights" className="inline-flex items-center gap-2 text-teal-300 hover:text-teal-200 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to pg_stat_insights
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-transparent bg-clip-text flex items-center gap-3">
          <GitBranch className="w-10 h-10 text-purple-400" /> Parallel Query Analysis
        </h1>
        
        <p className="text-lg text-gray-300 mb-8">
          Track parallel worker usage, measure parallelism efficiency, and tune parallel execution configuration.
        </p>

        {/* STEP 1: IDENTIFY PARALLEL QUERIES */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-purple-400">Step 1: Identify Queries Using Parallelism</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-purple-400" />
                Queries with Parallel Execution
              </h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Find queries using parallel workers
SELECT 
    queryid,
    LEFT(query, 100) as query_preview,
    calls,
    parallel_workers_launched,                  -- Total workers launched
    ROUND((parallel_workers_launched::numeric / NULLIF(calls, 0))::numeric, 2) as avg_workers_per_call,
    ROUND(mean_exec_time::numeric, 2) as avg_exec_ms,
    ROUND(total_exec_time::numeric, 2) as total_exec_ms,
    rows,
    ROUND((rows::numeric / NULLIF(calls, 0))::numeric, 0) as avg_rows_per_call
FROM pg_stat_insights
WHERE parallel_workers_launched > 0             -- Only parallel queries
ORDER BY parallel_workers_launched DESC
LIMIT 20;

-- Parallel Query Indicators:
-- • parallel_workers_launched > 0: Query used parallel execution
-- • avg_workers_per_call: Typical parallelism level
-- • High workers + high exec time: Good candidate for parallelism`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* STEP 2: MEASURE PARALLELISM BENEFIT */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-pink-400">Step 2: Measure Parallelism Efficiency</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-pink-400" />
                Parallel Efficiency Analysis
              </h3>
              <p className="text-gray-300 mb-4">
                Estimate speedup from parallel execution (theoretical vs actual).
              </p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Analyze parallel query efficiency
SELECT 
    queryid,
    LEFT(query, 80) as query_preview,
    calls,
    ROUND((parallel_workers_launched::numeric / NULLIF(calls, 0))::numeric, 2) as avg_workers,
    ROUND(mean_exec_time::numeric, 2) as avg_exec_ms,
    ROUND((rows::numeric / NULLIF(calls, 0))::numeric, 0) as avg_rows,
    -- Theoretical speedup if perfectly parallel
    ROUND((parallel_workers_launched::numeric / NULLIF(calls, 0) + 1)::numeric, 2) as theoretical_speedup,
    -- Actual throughput benefit
    ROUND(
        (rows::numeric / NULLIF(total_exec_time, 0) * 1000)::numeric,
        2
    ) as rows_per_second,
    CASE 
        WHEN parallel_workers_launched::numeric / NULLIF(calls, 0) >= 4 
            THEN '🟢 HIGH parallelism (4+ workers)'
        WHEN parallel_workers_launched::numeric / NULLIF(calls, 0) >= 2 
            THEN '✅ MODERATE parallelism (2-4 workers)'
        WHEN parallel_workers_launched::numeric / NULLIF(calls, 0) >= 1 
            THEN '🟡 LOW parallelism (1-2 workers)'
        ELSE '⚪ MINIMAL parallelism'
    END as parallel_level
FROM pg_stat_insights
WHERE parallel_workers_launched > 0
ORDER BY parallel_workers_launched DESC
LIMIT 20;

-- Ideal Parallelism:
-- • avg_workers ≥ 4: Excellent for large scans
-- • avg_workers 2-4: Good for medium queries
-- • avg_workers < 2: May not justify overhead`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* STEP 3: PARALLEL VS NON-PARALLEL COMPARISON */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-red-400">Step 3: Parallel vs Non-Parallel Queries</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-red-400" />
                Compare Execution Patterns
              </h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Compare parallel vs non-parallel query performance
WITH query_stats AS (
    SELECT 
        CASE 
            WHEN parallel_workers_launched > 0 THEN 'Parallel'
            ELSE 'Non-Parallel'
        END as execution_mode,
        COUNT(*) as query_count,
        SUM(calls) as total_calls,
        ROUND(AVG(mean_exec_time)::numeric, 2) as avg_exec_time,
        ROUND(AVG(rows::numeric / NULLIF(calls, 0))::numeric, 0) as avg_rows_per_query,
        SUM(parallel_workers_launched) as total_workers_launched
    FROM pg_stat_insights
    WHERE calls > 10
    GROUP BY execution_mode
)
SELECT 
    execution_mode,
    query_count,
    total_calls,
    avg_exec_time,
    avg_rows_per_query,
    total_workers_launched,
    CASE execution_mode
        WHEN 'Parallel' THEN ROUND((total_workers_launched::numeric / NULLIF(total_calls, 0))::numeric, 2)
        ELSE 0
    END as avg_workers_per_call
FROM query_stats
ORDER BY execution_mode;

-- Insights:
-- • Parallel queries should show lower avg_exec_time for large datasets
-- • If parallel queries slower, may indicate:
--   - Overhead exceeds benefit
--   - Too many workers competing
--   - Insufficient parallelizable work`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* STEP 4: IDENTIFY PARALLELIZATION CANDIDATES */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-green-400">Step 4: Find Queries That Should Be Parallel</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Queries that could benefit from parallelism but aren't using it
SELECT 
    queryid,
    LEFT(query, 100) as query_preview,
    calls,
    ROUND(mean_exec_time::numeric, 2) as avg_exec_ms,
    ROUND((rows::numeric / NULLIF(calls, 0))::numeric, 0) as avg_rows,
    shared_blks_read,
    parallel_workers_launched,                  -- Should be > 0 but isn't
    CASE 
        WHEN mean_exec_time > 1000 AND rows / NULLIF(calls, 0) > 10000 
            THEN '🔴 EXCELLENT parallel candidate (slow + large dataset)'
        WHEN mean_exec_time > 500 AND rows / NULLIF(calls, 0) > 5000 
            THEN '🟡 GOOD parallel candidate'
        WHEN shared_blks_read > 10000 
            THEN '📊 CONSIDER parallelism (high I/O)'
        ELSE 'May not benefit from parallelism'
    END as parallelization_potential,
    -- Recommendation
    CASE 
        WHEN mean_exec_time > 1000 AND rows / NULLIF(calls, 0) > 10000 
            THEN 'Increase max_parallel_workers_per_gather or reduce parallel_setup_cost'
        ELSE 'Review query plan - may have non-parallelizable operations'
    END as recommendation
FROM pg_stat_insights
WHERE parallel_workers_launched = 0             -- NOT using parallelism
  AND calls > 10
  AND (mean_exec_time > 500 OR rows / NULLIF(calls, 0) > 5000)
ORDER BY mean_exec_time DESC, rows DESC
LIMIT 20;

-- Parallelization Candidates:
-- • Slow queries (>500ms) with large datasets (>5000 rows)
-- • Sequential scans on large tables
-- • Aggregations over many rows
-- • Hash joins on large datasets`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* PARALLEL CONFIGURATION */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-cyan-400">Parallel Query Configuration</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 rounded-lg p-6 border border-cyan-700">
                <h3 className="text-xl font-semibold mb-3 text-cyan-400">max_parallel_workers_per_gather</h3>
                <pre className="bg-black/50 p-3 rounded text-sm">
                  <code className="text-green-400">{`# Maximum workers per query
max_parallel_workers_per_gather = 4  # Default: 2

# Increase for queries on large datasets`}</code>
                </pre>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-6 border border-blue-700">
                <h3 className="text-xl font-semibold mb-3 text-blue-400">max_parallel_workers</h3>
                <pre className="bg-black/50 p-3 rounded text-sm">
                  <code className="text-green-400">{`# Total parallel workers system-wide
max_parallel_workers = 8  # Should be ≥ max_parallel_workers_per_gather`}</code>
                </pre>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-6 border border-purple-700">
                <h3 className="text-xl font-semibold mb-3 text-purple-400">parallel_setup_cost</h3>
                <pre className="bg-black/50 p-3 rounded text-sm">
                  <code className="text-green-400">{`# Cost of launching parallel workers
parallel_setup_cost = 1000  # Default

# Decrease to encourage parallelism
SET parallel_setup_cost = 100;`}</code>
                </pre>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-6 border border-pink-700">
                <h3 className="text-xl font-semibold mb-3 text-pink-400">parallel_tuple_cost</h3>
                <pre className="bg-black/50 p-3 rounded text-sm">
                  <code className="text-green-400">{`# Cost per tuple transferred to leader
parallel_tuple_cost = 0.1  # Default

# Decrease for better parallel selectivity`}</code>
                </pre>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-6 border border-green-700">
                <h3 className="text-xl font-semibold mb-3 text-green-400">min_parallel_table_scan_size</h3>
                <pre className="bg-black/50 p-3 rounded text-sm">
                  <code className="text-green-400">{`# Minimum table size for parallel scan
min_parallel_table_scan_size = 8MB  # Default

# Decrease for smaller tables
SET min_parallel_table_scan_size = '1MB';`}</code>
                </pre>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-6 border border-yellow-700">
                <h3 className="text-xl font-semibold mb-3 text-yellow-400">force_parallel_mode</h3>
                <pre className="bg-black/50 p-3 rounded text-sm">
                  <code className="text-green-400">{`# Force parallelism for testing
SET force_parallel_mode = on;  # Use for testing only!

# Options: off, on, regress`}</code>
                </pre>
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
            <code className="text-green-400">/Users/pgedge/pge/pg_stat_insights/sql/parallel.sql</code>
          </div>
        </section>
      </div>
    </div>
  )
}
