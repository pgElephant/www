export const metadata = {
  title: 'pg_stat_insights · WAL Activity Monitoring',
  description: 'Track Write-Ahead Log generation, FPI activity, and optimize write-heavy PostgreSQL workloads.'
}

import React from 'react'
import Link from 'next/link'
import { FileText, ArrowRight, Database, Activity, TrendingUp, Code } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/docs/pg_stat_insights" className="inline-flex items-center gap-2 text-teal-300 hover:text-teal-200 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to pg_stat_insights
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 text-transparent bg-clip-text flex items-center gap-3">
          <FileText className="w-10 h-10 text-green-400" /> WAL Activity Monitoring
        </h1>
        
        <p className="text-lg text-gray-300 mb-8">
          Track Write-Ahead Log generation, analyze FPI activity, and optimize write-heavy database workloads.
        </p>

        {/* STEP 1: WAL GENERATION BY QUERY */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-green-400">Step 1: Track WAL Generation by Query</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-green-400" />
                Top WAL Generators
              </h3>
              <p className="text-gray-300 mb-4">
                Identify queries generating the most Write-Ahead Log data.
              </p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Queries generating most WAL data
SELECT 
    queryid,
    LEFT(query, 100) as query_preview,
    calls,
    wal_records,                                -- Number of WAL records
    wal_fpi,                                    -- Full Page Images written
    wal_bytes,                                  -- Total WAL bytes
    ROUND((wal_bytes / 1024.0 / 1024.0)::numeric, 2) as wal_mb,
    ROUND((wal_bytes / 1024.0 / 1024.0 / 1024.0)::numeric, 2) as wal_gb,
    ROUND((wal_bytes::numeric / NULLIF(calls, 0) / 1024.0)::numeric, 2) as avg_wal_kb_per_call,
    ROUND((wal_records::numeric / NULLIF(calls, 0))::numeric, 2) as avg_records_per_call
FROM pg_stat_insights
WHERE wal_bytes > 0                             -- Only queries generating WAL
ORDER BY wal_bytes DESC
LIMIT 20;

-- Example Output:
-- queryid        | query_preview                        | calls | wal_records | wal_fpi | wal_mb  | wal_gb | avg_wal_kb | avg_records
-- --------------+--------------------------------------+-------+-------------+---------+---------+--------+------------+-------------
-- 1234567890123 | INSERT INTO orders (customer_id,...  |  5678 |    12345678 |   23456 | 4567.89 |   4.46 |     823.45 |     2174.56
-- 9876543210987 | UPDATE products SET stock = stock... |  3456 |     8901234 |   34567 | 3456.78 |   3.37 |    1024.56 |     2576.89

-- Key Metrics:
-- • wal_gb > 1: Significant write activity
-- • avg_wal_kb > 100: Large per-query WAL generation
-- • wal_fpi: Full Page Images (checkpoint-related writes)`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* STEP 2: FPI ANALYSIS */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-emerald-400">Step 2: Full Page Image (FPI) Analysis</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" />
                Queries Generating Full Page Images
              </h3>
              <p className="text-gray-300 mb-4">
                FPIs are written after checkpoints - high FPI counts indicate checkpoint-heavy workloads.
              </p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Analyze Full Page Image generation
SELECT 
    queryid,
    LEFT(query, 100) as query_preview,
    calls,
    wal_fpi,                                    -- Full Page Images
    wal_records,
    ROUND((wal_fpi::numeric / NULLIF(wal_records, 0) * 100)::numeric, 2) as fpi_pct_of_records,
    ROUND((wal_fpi::numeric / NULLIF(calls, 0))::numeric, 2) as avg_fpi_per_call,
    ROUND((wal_bytes / 1024.0 / 1024.0)::numeric, 2) as total_wal_mb,
    CASE 
        WHEN wal_fpi::numeric / NULLIF(wal_records, 0) > 0.30 
            THEN '🔴 HIGH FPI ratio (>30%)'
        WHEN wal_fpi::numeric / NULLIF(wal_records, 0) > 0.15 
            THEN '🟡 MODERATE FPI ratio (15-30%)'
        ELSE '✅ ACCEPTABLE FPI ratio (<15%)'
    END as fpi_status
FROM pg_stat_insights
WHERE wal_fpi > 0
ORDER BY wal_fpi DESC
LIMIT 20;

-- High FPI Generation Indicates:
-- • Frequent checkpoints (tune checkpoint_timeout, max_wal_size)
-- • Random writes to many different pages
-- • Write amplification after checkpoints
-- • Potential for WAL optimization

-- Recommendations:
-- • Increase checkpoint_timeout (default 5min → 15-30min)
-- • Increase max_wal_size (default 1GB → 4-8GB)
-- • Monitor checkpoint frequency with pg_stat_bgwriter`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* STEP 3: WAL GENERATION RATE */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-teal-400">Step 3: WAL Generation Rate</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-teal-400" />
                Estimate WAL Generation Over Time
              </h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Calculate WAL generation rate
WITH wal_stats AS (
    SELECT 
        SUM(wal_bytes) as total_wal_bytes,
        SUM(wal_records) as total_wal_records,
        SUM(wal_fpi) as total_fpi,
        SUM(calls) as total_calls
    FROM pg_stat_insights
    WHERE wal_bytes > 0
)
SELECT 
    ROUND((total_wal_bytes / 1024.0 / 1024.0)::numeric, 2) as total_wal_mb,
    ROUND((total_wal_bytes / 1024.0 / 1024.0 / 1024.0)::numeric, 2) as total_wal_gb,
    total_wal_records,
    total_fpi,
    total_calls,
    ROUND((total_wal_bytes::numeric / NULLIF(total_calls, 0) / 1024.0)::numeric, 2) as avg_wal_kb_per_query,
    ROUND((total_fpi::numeric / NULLIF(total_wal_records, 0) * 100)::numeric, 2) as overall_fpi_pct,
    -- Estimate daily WAL generation (if stats span 24hrs)
    ROUND((total_wal_bytes / 1024.0 / 1024.0 / 1024.0)::numeric, 2) || ' GB/day' as estimated_daily_wal
FROM wal_stats;

-- Use this to size:
-- • WAL disk space requirements
-- • Replication bandwidth needs
-- • Archive storage capacity`}</code>
              </pre>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4">DML Operations WAL Impact</h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Compare WAL generation by operation type
SELECT 
    CASE 
        WHEN query ILIKE '%INSERT%' THEN 'INSERT'
        WHEN query ILIKE '%UPDATE%' THEN 'UPDATE'
        WHEN query ILIKE '%DELETE%' THEN 'DELETE'
        WHEN query ILIKE '%CREATE%' THEN 'CREATE/DDL'
        ELSE 'OTHER'
    END as operation_type,
    COUNT(*) as query_count,
    SUM(calls) as total_executions,
    ROUND((SUM(wal_bytes) / 1024.0 / 1024.0)::numeric, 2) as total_wal_mb,
    ROUND((AVG(wal_bytes / NULLIF(calls, 0)) / 1024.0)::numeric, 2) as avg_wal_kb_per_call,
    SUM(wal_fpi) as total_fpi
FROM pg_stat_insights
WHERE wal_bytes > 0
GROUP BY operation_type
ORDER BY total_wal_mb DESC;

-- Typical WAL patterns:
-- • UPDATE: Highest WAL (old + new row versions)
-- • INSERT: Moderate WAL (new row only)
-- • DELETE: Low-moderate WAL (deletion markers)
-- • CREATE INDEX: Can generate significant WAL`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* STEP 4: OPTIMIZE WAL GENERATION */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-yellow-400">Step 4: WAL Optimization Strategies</h2>
            
            <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/30 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4 text-yellow-300">Optimization Techniques</h3>
              <div className="space-y-4 text-gray-300">
                <div className="bg-black/30 p-4 rounded">
                  <h4 className="font-semibold text-yellow-400 mb-2">1. Batch Operations</h4>
                  <pre className="bg-black/50 p-3 rounded mt-2">
                    <code className="text-sm text-green-400">{`-- Instead of:
INSERT INTO table VALUES (1), (2), (3);  -- 3 WAL records

-- Use:
INSERT INTO table VALUES (1), (2), (3), ... , (1000);  -- 1 WAL record for batch`}</code>
                  </pre>
                </div>

                <div className="bg-black/30 p-4 rounded">
                  <h4 className="font-semibold text-orange-400 mb-2">2. Use COPY for Bulk Loads</h4>
                  <pre className="bg-black/50 p-3 rounded mt-2">
                    <code className="text-sm text-green-400">{`-- COPY generates less WAL than individual INSERTs
COPY table FROM '/path/to/data.csv' CSV;`}</code>
                  </pre>
                </div>

                <div className="bg-black/30 p-4 rounded">
                  <h4 className="font-semibold text-red-400 mb-2">3. HOT Updates (Heap-Only Tuple)</h4>
                  <pre className="bg-black/50 p-3 rounded mt-2">
                    <code className="text-sm text-green-400">{`-- Ensure fillfactor allows HOT updates
ALTER TABLE large_table SET (fillfactor = 80);

-- HOT updates generate less WAL (no index updates)`}</code>
                  </pre>
                </div>

                <div className="bg-black/30 p-4 rounded">
                  <h4 className="font-semibold text-purple-400 mb-2">4. Tune Checkpoint Settings</h4>
                  <pre className="bg-black/50 p-3 rounded mt-2">
                    <code className="text-sm text-green-400">{`# postgresql.conf
checkpoint_timeout = 30min      # Reduce checkpoint frequency
max_wal_size = 8GB              # Allow more WAL before checkpoint
checkpoint_completion_target = 0.9  # Spread checkpoint I/O`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* WAL CONFIGURATION */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-purple-400">WAL Configuration Parameters</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 rounded-lg p-6 border border-purple-700">
                <h3 className="text-xl font-semibold mb-3 text-purple-400">wal_level</h3>
                <pre className="bg-black/50 p-3 rounded text-sm">
                  <code className="text-green-400">{`# Options: minimal, replica, logical
wal_level = replica  # Default, supports replication`}</code>
                </pre>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-6 border border-pink-700">
                <h3 className="text-xl font-semibold mb-3 text-pink-400">max_wal_size</h3>
                <pre className="bg-black/50 p-3 rounded text-sm">
                  <code className="text-green-400">{`# Maximum WAL size before checkpoint
max_wal_size = 8GB  # Increase for write-heavy workloads`}</code>
                </pre>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-6 border border-indigo-700">
                <h3 className="text-xl font-semibold mb-3 text-indigo-400">wal_buffers</h3>
                <pre className="bg-black/50 p-3 rounded text-sm">
                  <code className="text-green-400">{`# WAL buffer size (auto-tuned based on shared_buffers)
wal_buffers = 16MB  # Usually auto-set correctly`}</code>
                </pre>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-6 border border-cyan-700">
                <h3 className="text-xl font-semibold mb-3 text-cyan-400">full_page_writes</h3>
                <pre className="bg-black/50 p-3 rounded text-sm">
                  <code className="text-green-400">{`# Write full page images after checkpoint
full_page_writes = on  # Required for crash safety`}</code>
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
            <code className="text-green-400">/Users/pgedge/pge/pg_stat_insights/sql/wal.sql</code>
          </div>
        </section>
      </div>
    </div>
  )
}
