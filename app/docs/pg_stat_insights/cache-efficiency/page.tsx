export const metadata = {
  title: 'pg_stat_insights · Cache Efficiency Analysis',
  description: 'Optimize PostgreSQL buffer cache performance with detailed cache hit ratio analysis and tuning recommendations.'
}

import React from 'react'
import Link from 'next/link'
import { HardDrive, ArrowRight, Database, Activity, TrendingUp, Code } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/docs/pg_stat_insights" className="inline-flex items-center gap-2 text-teal-300 hover:text-teal-200 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to pg_stat_insights
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 text-transparent bg-clip-text flex items-center gap-3">
          <HardDrive className="w-10 h-10 text-blue-400" /> Cache Efficiency Analysis
        </h1>
        
        <p className="text-lg text-gray-300 mb-8">
          Analyze buffer cache performance, identify cache misses, and optimize memory usage for better database performance.
        </p>

        {/* STEP 1: OVERALL CACHE HIT RATIO */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-blue-400">Step 1: Overall Cache Hit Ratio</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-400" />
                Database-Wide Cache Performance
              </h3>
              <p className="text-gray-300 mb-4">
                Calculate overall cache hit ratio across all queries. Target: &gt;95% for optimal performance.
              </p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Overall cache hit ratio for entire database
SELECT 
    SUM(shared_blks_hit) as total_cache_hits,
    SUM(shared_blks_read) as total_disk_reads,
    SUM(shared_blks_hit + shared_blks_read) as total_blocks_accessed,
    ROUND(
        (SUM(shared_blks_hit)::numeric / 
         NULLIF(SUM(shared_blks_hit + shared_blks_read), 0) * 100)::numeric, 
        2
    ) as cache_hit_ratio_pct,
    CASE 
        WHEN (SUM(shared_blks_hit)::numeric / 
              NULLIF(SUM(shared_blks_hit + shared_blks_read), 0) * 100) >= 99 
            THEN '🟢 EXCELLENT (≥99%)'
        WHEN (SUM(shared_blks_hit)::numeric / 
              NULLIF(SUM(shared_blks_hit + shared_blks_read), 0) * 100) >= 95 
            THEN '✅ GOOD (95-99%)'
        WHEN (SUM(shared_blks_hit)::numeric / 
              NULLIF(SUM(shared_blks_hit + shared_blks_read), 0) * 100) >= 90 
            THEN '⚠️  FAIR (90-95%)'
        ELSE '🔴 POOR (<90%)'
    END as performance_rating
FROM pg_stat_insights;

-- Example Output:
-- total_cache_hits | total_disk_reads | total_blocks_accessed | cache_hit_ratio_pct | performance_rating
-- -----------------+------------------+-----------------------+---------------------+--------------------
--       1234567890 |         12345678 |            1246913568 |               98.01 | 🟢 EXCELLENT (≥99%)
--
-- Interpretation:
-- • 99%+ : Excellent - Cache is well-sized
-- • 95-99%: Good - Minor tuning may help
-- • 90-95%: Fair - Consider increasing shared_buffers
-- • <90%  : Poor - Significant cache misses, investigate queries`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* STEP 2: QUERIES WITH LOW CACHE HIT RATIO */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-cyan-400">Step 2: Identify Queries with Poor Cache Performance</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                Queries with Low Cache Hit Ratio
              </h3>
              <p className="text-gray-300 mb-4">
                Find queries causing excessive disk I/O due to cache misses.
              </p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Queries with poor cache hit ratios
SELECT 
    queryid,
    LEFT(query, 100) as query_preview,
    calls,
    shared_blks_hit,                            -- Blocks found in cache
    shared_blks_read,                           -- Blocks read from disk
    (shared_blks_hit + shared_blks_read) as total_blocks,
    ROUND(
        (shared_blks_hit::numeric / 
         NULLIF(shared_blks_hit + shared_blks_read, 0) * 100)::numeric, 
        2
    ) as cache_hit_ratio_pct,
    ROUND(
        (shared_blks_read::numeric / NULLIF(calls, 0))::numeric, 
        2
    ) as avg_disk_reads_per_call,
    CASE 
        WHEN shared_blks_hit::numeric / 
             NULLIF(shared_blks_hit + shared_blks_read, 0) < 0.50 
            THEN '🔴 CRITICAL: <50% cache hits'
        WHEN shared_blks_hit::numeric / 
             NULLIF(shared_blks_hit + shared_blks_read, 0) < 0.70 
            THEN '🟠 POOR: 50-70% cache hits'
        WHEN shared_blks_hit::numeric / 
             NULLIF(shared_blks_hit + shared_blks_read, 0) < 0.90 
            THEN '🟡 FAIR: 70-90% cache hits'
        ELSE '✅ ACCEPTABLE: >90% cache hits'
    END as status
FROM pg_stat_insights
WHERE (shared_blks_hit + shared_blks_read) > 1000  -- Significant block access
  AND calls > 10                                   -- Executed multiple times
ORDER BY 
    (shared_blks_hit::numeric / 
     NULLIF(shared_blks_hit + shared_blks_read, 0)) ASC,
    shared_blks_read DESC
LIMIT 20;

-- Action Items:
-- • <70% ratio: Add indexes, rewrite query, or increase shared_buffers
-- • High disk reads: Query may be scanning too much data
-- • Check if query needs optimization or better indexing`}</code>
              </pre>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4">Top Disk I/O Consumers</h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Queries causing most disk reads (absolute numbers)
SELECT 
    queryid,
    LEFT(query, 100) as query_preview,
    calls,
    shared_blks_read,                           -- Total disk reads
    shared_blks_hit,                            -- Total cache hits
    ROUND(
        (shared_blks_read::numeric / 1024)::numeric,  -- Convert to MB (8KB blocks)
        2
    ) as disk_read_mb,
    ROUND(
        (shared_blks_read::numeric / NULLIF(calls, 0))::numeric,
        2
    ) as avg_blocks_per_call,
    ROUND(
        (shared_blks_hit::numeric / 
         NULLIF(shared_blks_hit + shared_blks_read, 0) * 100)::numeric,
        2
    ) as cache_hit_pct
FROM pg_stat_insights
WHERE shared_blks_read > 0
ORDER BY shared_blks_read DESC
LIMIT 20;

-- High disk reads indicate:
-- • Missing indexes (sequential scans)
-- • Data not fitting in shared_buffers
-- • Working set larger than available cache`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* STEP 3: LOCAL BUFFER ANALYSIS */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-teal-400">Step 3: Local Buffer Activity</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-teal-400" />
                Analyze Local Buffer Usage (Temporary Tables)
              </h3>
              <p className="text-gray-300 mb-4">
                Track queries using local buffers for temporary tables and sorts.
              </p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Queries using local buffers (temporary objects)
SELECT 
    queryid,
    LEFT(query, 100) as query_preview,
    calls,
    local_blks_hit,                             -- Local cache hits
    local_blks_read,                            -- Local disk reads
    local_blks_written,                         -- Local writes
    (local_blks_hit + local_blks_read) as total_local_blocks,
    ROUND(
        ((local_blks_hit + local_blks_read + local_blks_written)::numeric * 8 / 1024)::numeric,
        2
    ) as total_local_mb,
    CASE 
        WHEN local_blks_read > 0 OR local_blks_written > 0 
            THEN 'Using temp tables/files'
        ELSE 'No temp usage'
    END as temp_usage
FROM pg_stat_insights
WHERE (local_blks_hit + local_blks_read + local_blks_written) > 0
ORDER BY (local_blks_hit + local_blks_read + local_blks_written) DESC
LIMIT 20;

-- Local buffer usage indicates:
-- • Temporary tables being created
-- • Sorts/hashes spilling to disk
-- • CTEs or subqueries materializing
--
-- High local buffer I/O suggests:
-- • Increase work_mem for sorts/hashes
-- • Optimize queries to avoid temp table creation
-- • Consider temp_buffers tuning`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* STEP 4: TEMP FILE USAGE */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-yellow-400">Step 4: Temporary File Analysis</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4">Queries Creating Temp Files</h3>
              <p className="text-gray-300 mb-4">
                Identify queries spilling to disk - a major performance bottleneck.
              </p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Queries using temporary files (performance warning!)
SELECT 
    queryid,
    LEFT(query, 100) as query_preview,
    calls,
    temp_blks_read,                             -- Temp file blocks read
    temp_blks_written,                          -- Temp file blocks written
    ROUND(
        (temp_blks_written::numeric * 8 / 1024)::numeric,
        2
    ) as temp_written_mb,
    ROUND(
        (temp_blks_written::numeric * 8 / 1024 / NULLIF(calls, 0))::numeric,
        2
    ) as avg_temp_mb_per_call,
    CASE 
        WHEN temp_blks_written * 8 / 1024 > 1000 
            THEN '🔴 CRITICAL: >1GB temp files'
        WHEN temp_blks_written * 8 / 1024 > 100 
            THEN '🟠 WARNING: >100MB temp files'
        WHEN temp_blks_written * 8 / 1024 > 10 
            THEN '🟡 INFO: >10MB temp files'
        ELSE '✅ Minimal temp usage'
    END as severity
FROM pg_stat_insights
WHERE temp_blks_written > 0
ORDER BY temp_blks_written DESC
LIMIT 20;

-- Temp file creation = SLOW PERFORMANCE!
-- Causes:
-- • work_mem too small for sorts/hashes
-- • Large GROUP BY or ORDER BY operations
-- • Hash joins on large datasets
-- • Window functions over large partitions
--
-- Solutions:
-- • Increase work_mem (session or query level)
-- • Add indexes to avoid sorts
-- • Rewrite queries to reduce data volume
-- • Use LIMIT or filters earlier in query`}</code>
              </pre>
            </div>

            <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-red-300">⚠️ Temp File Impact</h3>
              <div className="space-y-3 text-gray-300">
                <p><strong>Why temp files are bad:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Disk I/O is 100-1000x slower than memory</li>
                  <li>Serializes parallel operations</li>
                  <li>Creates disk contention</li>
                  <li>Can cause queries to timeout</li>
                </ul>
                <p className="mt-4"><strong>Quick Fix:</strong></p>
                <pre className="bg-black/50 p-3 rounded mt-2">
                  <code className="text-sm text-green-400">{`-- Temporarily increase work_mem for specific session
SET work_mem = '256MB';  -- Adjust based on query needs
-- Run your query
-- Reset after
RESET work_mem;`}</code>
                </pre>
              </div>
            </div>
          </section>
        </div>

        {/* STEP 5: BUFFER WRITTEN ANALYSIS */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-purple-400">Step 5: Buffer Write Activity</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Queries causing buffer writes (dirty data)
SELECT 
    queryid,
    LEFT(query, 100) as query_preview,
    calls,
    shared_blks_written,                        -- Shared buffers written
    shared_blks_dirtied,                        -- Blocks modified
    local_blks_written,                         -- Local temp writes
    ROUND(
        (shared_blks_written::numeric * 8 / 1024)::numeric,
        2
    ) as shared_written_mb,
    ROUND(
        (shared_blks_written::numeric / NULLIF(calls, 0))::numeric,
        2
    ) as avg_written_blocks_per_call
FROM pg_stat_insights
WHERE shared_blks_written > 0 OR local_blks_written > 0
ORDER BY shared_blks_written DESC
LIMIT 20;

-- Write-heavy queries:
-- • UPDATE/INSERT/DELETE operations
-- • Bulk data loads
-- • Index maintenance
-- • Checkpoint pressure
--
-- High writes may indicate:
-- • Frequent updates to hot rows
-- • Missing indexes causing write amplification
-- • Inefficient batch operations`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* OPTIMIZATION RECOMMENDATIONS */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-green-400">Cache Optimization Recommendations</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Comprehensive cache analysis with recommendations
SELECT 
    queryid,
    LEFT(query, 80) as query_preview,
    calls,
    ROUND(
        (shared_blks_hit::numeric / 
         NULLIF(shared_blks_hit + shared_blks_read, 0) * 100)::numeric,
        2
    ) as cache_hit_pct,
    shared_blks_read,
    temp_blks_written,
    CASE 
        -- Priority recommendations
        WHEN temp_blks_written * 8 / 1024 > 100 
            THEN '🔴 URGENT: Increase work_mem (spilling ' || 
                 ROUND((temp_blks_written * 8 / 1024)::numeric, 0) || 'MB to disk)'
        WHEN shared_blks_hit::numeric / 
             NULLIF(shared_blks_hit + shared_blks_read, 0) < 0.70 
             AND shared_blks_read > 10000
            THEN '🟠 Add index or increase shared_buffers (only ' || 
                 ROUND((shared_blks_hit::numeric / 
                        NULLIF(shared_blks_hit + shared_blks_read, 0) * 100)::numeric, 0) || '% cache hits)'
        WHEN local_blks_written > 1000 
            THEN '🟡 Review temp table usage - consider CTEs or materialized views'
        WHEN shared_blks_read / NULLIF(calls, 0) > 1000 
            THEN '📊 High per-query I/O - add selective indexes'
        ELSE '✅ Cache performance acceptable'
    END as recommendation
FROM pg_stat_insights
WHERE calls > 10
  AND (shared_blks_hit + shared_blks_read) > 100
ORDER BY 
    CASE 
        WHEN temp_blks_written > 12800 THEN 1  -- >100MB temp
        WHEN shared_blks_hit::numeric / 
             NULLIF(shared_blks_hit + shared_blks_read, 0) < 0.70 THEN 2
        ELSE 3
    END,
    shared_blks_read DESC
LIMIT 25;`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* CONFIGURATION TUNING */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-indigo-400">PostgreSQL Configuration Tuning</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 rounded-lg p-6 border border-indigo-700">
                <h3 className="text-xl font-semibold mb-3 text-indigo-400">shared_buffers</h3>
                <p className="text-gray-300 text-sm mb-3">Main buffer cache - start at 25% of RAM</p>
                <pre className="bg-black/50 p-3 rounded text-sm">
                  <code className="text-green-400">{`# PostgreSQL 16/17/18
shared_buffers = 8GB  # For 32GB RAM
# Restart required`}</code>
                </pre>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-6 border border-purple-700">
                <h3 className="text-xl font-semibold mb-3 text-purple-400">work_mem</h3>
                <p className="text-gray-300 text-sm mb-3">Per-operation memory for sorts/hashes</p>
                <pre className="bg-black/50 p-3 rounded text-sm">
                  <code className="text-green-400">{`# Session level
SET work_mem = '256MB';

# Global (careful!)
work_mem = 64MB`}</code>
                </pre>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-6 border border-cyan-700">
                <h3 className="text-xl font-semibold mb-3 text-cyan-400">effective_cache_size</h3>
                <p className="text-gray-300 text-sm mb-3">Hint to planner about OS cache</p>
                <pre className="bg-black/50 p-3 rounded text-sm">
                  <code className="text-green-400">{`# Set to 50-75% of total RAM
effective_cache_size = 24GB`}</code>
                </pre>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-6 border border-teal-700">
                <h3 className="text-xl font-semibold mb-3 text-teal-400">temp_buffers</h3>
                <p className="text-gray-300 text-sm mb-3">For temporary tables in session</p>
                <pre className="bg-black/50 p-3 rounded text-sm">
                  <code className="text-green-400">{`# Per session
temp_buffers = 32MB`}</code>
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
            <ul className="space-y-2 text-gray-300">
              <li><a href="https://github.com/pgelephant/pg_stat_insights/tree/main/sql/select.sql" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline">📄 sql/select.sql</a> - Cache hit tracking</li>
              <li><a href="https://github.com/pgelephant/pg_stat_insights/tree/main/sql/dml.sql" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline">📄 sql/dml.sql</a> - Buffer writes analysis</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
