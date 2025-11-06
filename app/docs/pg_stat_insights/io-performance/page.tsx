export const metadata = {
  title: 'pg_stat_insights · I/O Performance Analysis',
  description: 'Analyze block read/write timing, identify I/O bottlenecks, and optimize disk performance.'
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

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text flex items-center gap-3">
          <HardDrive className="w-10 h-10 text-indigo-400" /> I/O Performance Analysis
        </h1>
        
        <p className="text-lg text-gray-300 mb-8">
          Analyze block read/write timing, identify I/O bottlenecks, and optimize disk performance.
        </p>

        {/* STEP 1: I/O TIMING OVERVIEW */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-indigo-400">Step 1: I/O Timing Overview</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-indigo-400" />
                Queries with Highest I/O Wait Time
              </h3>
              <p className="text-gray-300 mb-4">
                Requires <code className="text-yellow-400">track_io_timing = on</code> in postgresql.conf
              </p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Find queries spending most time on I/O
SELECT 
    queryid,
    LEFT(query, 100) as query_preview,
    calls,
    ROUND(mean_exec_time::numeric, 2) as avg_exec_ms,
    ROUND(blk_read_time::numeric / NULLIF(calls, 0), 2) as avg_read_ms,
    ROUND(blk_write_time::numeric / NULLIF(calls, 0), 2) as avg_write_ms,
    ROUND((blk_read_time + blk_write_time)::numeric / NULLIF(calls, 0), 2) as avg_io_ms,
    ROUND(
        ((blk_read_time + blk_write_time)::numeric / NULLIF(mean_exec_time * calls, 0) * 100)::numeric,
        2
    ) as io_time_pct,
    shared_blks_read,
    shared_blks_written
FROM pg_stat_insights
WHERE (blk_read_time + blk_write_time) > 0      -- Has I/O timing data
ORDER BY (blk_read_time + blk_write_time) DESC
LIMIT 20;

-- Key Metrics:
-- • avg_io_ms: Average I/O wait time per query
-- • io_time_pct: Percentage of execution time spent on I/O
-- • High io_time_pct (>50%): Query is I/O-bound

-- Enable I/O timing:
-- ALTER SYSTEM SET track_io_timing = on;
-- SELECT pg_reload_conf();`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* STEP 2: READ VS WRITE ANALYSIS */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-blue-400">Step 2: Read vs Write I/O Analysis</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-400" />
                Separate Read and Write Performance
              </h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Analyze read vs write I/O patterns
SELECT 
    queryid,
    LEFT(query, 80) as query_preview,
    calls,
    -- Read I/O
    shared_blks_read,
    ROUND((blk_read_time / NULLIF(calls, 0))::numeric, 2) as avg_read_ms,
    ROUND((blk_read_time / NULLIF(shared_blks_read, 0))::numeric, 4) as ms_per_read_block,
    -- Write I/O
    shared_blks_written,
    ROUND((blk_write_time / NULLIF(calls, 0))::numeric, 2) as avg_write_ms,
    ROUND((blk_write_time / NULLIF(shared_blks_written, 0))::numeric, 4) as ms_per_write_block,
    -- Classification
    CASE 
        WHEN blk_read_time > blk_write_time * 2 THEN '📖 READ-heavy'
        WHEN blk_write_time > blk_read_time * 2 THEN '✍️  WRITE-heavy'
        ELSE '⚖️  BALANCED'
    END as io_pattern
FROM pg_stat_insights
WHERE (blk_read_time + blk_write_time) > 0
ORDER BY (blk_read_time + blk_write_time) DESC
LIMIT 20;

-- Typical Block I/O Times:
-- • SSD: 0.1-1ms per block
-- • HDD: 5-15ms per block
-- • Network storage: 1-10ms per block
--
-- Slow blocks indicate:
-- • Disk contention
-- • Storage performance issues
-- • Network latency (remote storage)`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* STEP 3: LOCAL VS SHARED BLOCKS */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-cyan-400">Step 3: Local vs Shared Block I/O</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                Analyze Different Block Types
              </h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Break down I/O by block type
SELECT 
    queryid,
    LEFT(query, 80) as query_preview,
    calls,
    -- Shared blocks (main tables/indexes)
    shared_blks_read as shared_read,
    shared_blks_written as shared_write,
    ROUND((shared_blks_read + shared_blks_written)::numeric * 8 / 1024, 2) as shared_mb,
    -- Local blocks (temp tables)
    local_blks_read as local_read,
    local_blks_written as local_write,
    ROUND((local_blks_read + local_blks_written)::numeric * 8 / 1024, 2) as local_mb,
    -- Temp blocks (spilled to disk)
    temp_blks_read as temp_read,
    temp_blks_written as temp_write,
    ROUND((temp_blks_read + temp_blks_written)::numeric * 8 / 1024, 2) as temp_mb,
    -- Total I/O
    ROUND(
        ((shared_blks_read + shared_blks_written + local_blks_read + 
          local_blks_written + temp_blks_read + temp_blks_written)::numeric * 8 / 1024)::numeric,
        2
    ) as total_io_mb
FROM pg_stat_insights
WHERE (shared_blks_read + shared_blks_written + local_blks_read + 
       local_blks_written + temp_blks_read + temp_blks_written) > 0
ORDER BY total_io_mb DESC
LIMIT 20;

-- Block Type Meanings:
-- • shared_blks: Regular tables/indexes (shared_buffers)
-- • local_blks: Temporary tables (temp_buffers)
-- • temp_blks: Disk spill from sorts/hashes (work_mem exceeded)
--
-- High temp_blks = PERFORMANCE PROBLEM!`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* STEP 4: I/O BOTTLENECK IDENTIFICATION */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-purple-400">Step 4: Identify I/O Bottlenecks</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Comprehensive I/O bottleneck analysis
SELECT 
    queryid,
    LEFT(query, 100) as query_preview,
    calls,
    ROUND(mean_exec_time::numeric, 2) as avg_exec_ms,
    ROUND((blk_read_time + blk_write_time)::numeric / NULLIF(calls, 0), 2) as avg_io_ms,
    ROUND(
        ((blk_read_time + blk_write_time)::numeric / NULLIF(mean_exec_time * calls, 0) * 100)::numeric,
        2
    ) as io_pct,
    temp_blks_written,
    CASE 
        -- Prioritize issues
        WHEN temp_blks_written * 8 / 1024 > 100 
            THEN '🔴 CRITICAL: Spilling ' || ROUND((temp_blks_written * 8 / 1024)::numeric, 0) || 'MB to disk'
        WHEN (blk_read_time + blk_write_time) / NULLIF(mean_exec_time * calls, 0) > 0.70 
            THEN '🟠 I/O-BOUND: ' || ROUND(((blk_read_time + blk_write_time) / NULLIF(mean_exec_time * calls, 0) * 100)::numeric, 0) || '% I/O wait'
        WHEN shared_blks_read / NULLIF(calls, 0) > 10000 
            THEN '🟡 HIGH DISK READS: Add indexes or tune cache'
        WHEN shared_blks_written / NULLIF(calls, 0) > 10000 
            THEN '📝 HIGH WRITES: Review write patterns'
        ELSE '✅ I/O acceptable'
    END as io_recommendation,
    -- Specific actions
    CASE 
        WHEN temp_blks_written > 12800 THEN 'Increase work_mem'
        WHEN (blk_read_time + blk_write_time) / NULLIF(mean_exec_time * calls, 0) > 0.50 
            THEN 'Add indexes, increase shared_buffers, or upgrade storage'
        WHEN shared_blks_read > 100000 THEN 'Add selective indexes'
        ELSE 'Monitor performance trends'
    END as action_item
FROM pg_stat_insights
WHERE calls > 10
  AND ((blk_read_time + blk_write_time) > 0 OR temp_blks_written > 0 OR shared_blks_read > 1000)
ORDER BY 
    CASE 
        WHEN temp_blks_written > 12800 THEN 1
        WHEN (blk_read_time + blk_write_time) / NULLIF(mean_exec_time * calls, 0) > 0.70 THEN 2
        ELSE 3
    END,
    (blk_read_time + blk_write_time) DESC
LIMIT 25;`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* I/O OPTIMIZATION */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-green-400">I/O Optimization Strategies</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 rounded-lg p-6 border border-green-700">
                <h3 className="text-xl font-semibold mb-3 text-green-400">Reduce Disk Reads</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Increase <code>shared_buffers</code> (25% of RAM)</li>
                  <li>• Add appropriate indexes</li>
                  <li>• Use covering indexes</li>
                  <li>• Enable index-only scans</li>
                  <li>• Partition large tables</li>
                </ul>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-6 border border-blue-700">
                <h3 className="text-xl font-semibold mb-3 text-blue-400">Reduce Temp File Spill</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Increase <code>work_mem</code> (per operation)</li>
                  <li>• Optimize queries to reduce sorts</li>
                  <li>• Add indexes to eliminate sorts</li>
                  <li>• Use materialized views</li>
                  <li>• Break complex queries into steps</li>
                </ul>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-6 border border-purple-700">
                <h3 className="text-xl font-semibold mb-3 text-purple-400">Optimize Write Performance</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Use COPY for bulk loads</li>
                  <li>• Batch INSERT/UPDATE operations</li>
                  <li>• Drop indexes before bulk load</li>
                  <li>• Tune checkpoint settings</li>
                  <li>• Consider UNLOGGED tables for temp data</li>
                </ul>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-6 border border-yellow-700">
                <h3 className="text-xl font-semibold mb-3 text-yellow-400">Storage Configuration</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Use SSDs for database files</li>
                  <li>• Separate WAL to different disk</li>
                  <li>• Enable write cache on battery-backed RAID</li>
                  <li>• Monitor disk queue depth</li>
                  <li>• Ensure filesystem alignment</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* CONFIGURATION PARAMETERS */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-orange-400">I/O-Related Configuration</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`# postgresql.conf - I/O tuning

# Enable I/O timing tracking
track_io_timing = on

# Cache and buffer settings
shared_buffers = 8GB                    # 25% of RAM
effective_cache_size = 24GB             # 75% of RAM
work_mem = 64MB                         # Per operation memory
maintenance_work_mem = 2GB              # For VACUUM, CREATE INDEX

# Checkpoint tuning (reduce I/O spikes)
checkpoint_timeout = 15min
max_wal_size = 4GB
checkpoint_completion_target = 0.9

# Background writer (smooth out writes)
bgwriter_delay = 200ms
bgwriter_lru_maxpages = 100
bgwriter_lru_multiplier = 2.0

# WAL settings
wal_buffers = 16MB
wal_writer_delay = 200ms`}</code>
              </pre>
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
              <li><code className="text-green-400">/Users/pgedge/pge/pg_stat_insights/sql/select.sql</code> - Read I/O patterns</li>
              <li><code className="text-green-400">/Users/pgedge/pge/pg_stat_insights/sql/dml.sql</code> - Write I/O patterns</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
