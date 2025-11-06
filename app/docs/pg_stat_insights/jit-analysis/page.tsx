export const metadata = {
  title: 'pg_stat_insights · JIT Compilation Analysis',
  description: 'Measure JIT compilation overhead, identify when to disable JIT, and optimize query performance.'
}

import React from 'react'
import Link from 'next/link'
import { Zap, ArrowRight, Database, Activity, TrendingUp, Code } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/docs/pg_stat_insights" className="inline-flex items-center gap-2 text-teal-300 hover:text-teal-200 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to pg_stat_insights
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-transparent bg-clip-text flex items-center gap-3">
          <Zap className="w-10 h-10 text-yellow-400" /> JIT Compilation Analysis
        </h1>
        
        <p className="text-lg text-gray-300 mb-8">
          Measure Just-In-Time compilation overhead, identify performance impact, and optimize JIT configuration.
        </p>

        {/* STEP 1: IDENTIFY JIT USAGE */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-yellow-400">Step 1: Identify JIT-Compiled Queries</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-yellow-400" />
                Queries Using JIT Compilation
              </h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Find queries with JIT compilation activity
SELECT 
    queryid,
    LEFT(query, 100) as query_preview,
    calls,
    jit_functions,                              -- Number of functions JIT-compiled
    jit_generation_time,                        -- Time spent generating code (ms)
    jit_inlining_time,                          -- Time spent inlining (ms)
    jit_optimization_time,                      -- Time spent optimizing (ms)
    jit_emission_time,                          -- Time spent emitting machine code (ms)
    ROUND(mean_exec_time::numeric, 2) as avg_exec_ms,
    ROUND(
        ((jit_generation_time + jit_inlining_time + jit_optimization_time + jit_emission_time) / 
         NULLIF(calls, 0))::numeric, 
        2
    ) as avg_jit_overhead_ms
FROM pg_stat_insights
WHERE jit_functions > 0                         -- Only JIT-compiled queries
ORDER BY (jit_generation_time + jit_optimization_time) DESC
LIMIT 20;

-- JIT Metrics Explained:
-- • jit_functions: Number of LLVM functions generated
-- • generation_time: Parsing and IR generation
-- • inlining_time: Function inlining optimization
-- • optimization_time: LLVM optimization passes
-- • emission_time: Machine code generation`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* STEP 2: JIT OVERHEAD ANALYSIS */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-orange-400">Step 2: Measure JIT Overhead vs Benefit</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-orange-400" />
                JIT Cost/Benefit Analysis
              </h3>
              <p className="text-gray-300 mb-4">
                Calculate JIT overhead as percentage of total execution time.
              </p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Analyze JIT overhead percentage
SELECT 
    queryid,
    LEFT(query, 80) as query_preview,
    calls,
    ROUND(mean_exec_time::numeric, 2) as avg_exec_ms,
    ROUND(
        ((jit_generation_time + jit_inlining_time + jit_optimization_time + jit_emission_time) / 
         NULLIF(calls, 0))::numeric,
        2
    ) as avg_jit_ms,
    ROUND(
        ((jit_generation_time + jit_inlining_time + jit_optimization_time + jit_emission_time) / 
         NULLIF(calls, 0))::numeric / NULLIF(mean_exec_time, 0) * 100,
        2
    ) as jit_overhead_pct,
    CASE 
        WHEN ((jit_generation_time + jit_optimization_time) / NULLIF(calls, 0)) / NULLIF(mean_exec_time, 0) > 0.10 
            THEN '🔴 HIGH OVERHEAD (>10%) - Consider disabling JIT'
        WHEN ((jit_generation_time + jit_optimization_time) / NULLIF(calls, 0)) / NULLIF(mean_exec_time, 0) > 0.05 
            THEN '🟡 MODERATE OVERHEAD (5-10%) - Monitor closely'
        ELSE '✅ ACCEPTABLE OVERHEAD (<5%)'
    END as jit_status
FROM pg_stat_insights
WHERE jit_functions > 0
ORDER BY 
    ((jit_generation_time + jit_optimization_time) / NULLIF(calls, 0)) / NULLIF(mean_exec_time, 0) DESC
LIMIT 20;

-- Rule of Thumb:
-- • JIT overhead > 10%: Disable JIT for this query
-- • JIT overhead 5-10%: Marginal benefit
-- • JIT overhead < 5%: JIT is beneficial`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* STEP 3: JIT OPTIMIZATION DETAILS */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-red-400">Step 3: JIT Optimization Breakdown</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-red-400" />
                JIT Time Distribution
              </h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Break down JIT time components
SELECT 
    queryid,
    LEFT(query, 80) as query_preview,
    calls,
    jit_functions,
    ROUND((jit_generation_time / NULLIF(calls, 0))::numeric, 2) as avg_gen_ms,
    ROUND((jit_inlining_time / NULLIF(calls, 0))::numeric, 2) as avg_inline_ms,
    ROUND((jit_optimization_time / NULLIF(calls, 0))::numeric, 2) as avg_opt_ms,
    ROUND((jit_emission_time / NULLIF(calls, 0))::numeric, 2) as avg_emit_ms,
    -- Calculate which phase dominates
    CASE 
        WHEN jit_optimization_time = GREATEST(jit_generation_time, jit_inlining_time, jit_optimization_time, jit_emission_time) 
            THEN 'Optimization-heavy'
        WHEN jit_generation_time = GREATEST(jit_generation_time, jit_inlining_time, jit_optimization_time, jit_emission_time) 
            THEN 'Generation-heavy'
        WHEN jit_inlining_time = GREATEST(jit_generation_time, jit_inlining_time, jit_optimization_time, jit_emission_time) 
            THEN 'Inlining-heavy'
        ELSE 'Emission-heavy'
    END as dominant_phase
FROM pg_stat_insights
WHERE jit_functions > 0
ORDER BY (jit_generation_time + jit_optimization_time) / NULLIF(calls, 0) DESC
LIMIT 15;

-- Optimization-heavy: Complex expressions being optimized
-- Generation-heavy: Many functions being compiled
-- Inlining-heavy: Aggressive function inlining`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* STEP 4: WHEN TO DISABLE JIT */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-purple-400">Step 4: Identify Queries to Disable JIT</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Queries where JIT hurts performance
WITH jit_analysis AS (
    SELECT 
        queryid,
        LEFT(query, 100) as query_preview,
        calls,
        mean_exec_time,
        (jit_generation_time + jit_inlining_time + jit_optimization_time + jit_emission_time) / NULLIF(calls, 0) as avg_jit_time,
        (jit_generation_time + jit_optimization_time) / NULLIF(calls, 0) / NULLIF(mean_exec_time, 0) as jit_overhead_ratio
    FROM pg_stat_insights
    WHERE jit_functions > 0
)
SELECT 
    queryid,
    query_preview,
    calls,
    ROUND(mean_exec_time::numeric, 2) as avg_exec_ms,
    ROUND(avg_jit_time::numeric, 2) as avg_jit_ms,
    ROUND((jit_overhead_ratio * 100)::numeric, 2) as jit_overhead_pct,
    CASE 
        WHEN mean_exec_time < 10 AND jit_overhead_ratio > 0.10 
            THEN '🔴 DISABLE JIT: Fast query with high JIT overhead'
        WHEN jit_overhead_ratio > 0.15 
            THEN '🟠 DISABLE JIT: JIT overhead >15%'
        WHEN calls > 10000 AND jit_overhead_ratio > 0.05 
            THEN '🟡 CONSIDER DISABLING: High frequency + overhead'
        ELSE '✅ JIT beneficial or acceptable'
    END as recommendation,
    -- SQL to disable JIT for this query
    'SET jit = off;  -- Add before running this query' as disable_command
FROM jit_analysis
WHERE jit_overhead_ratio > 0.05                 -- Focus on problematic cases
ORDER BY jit_overhead_ratio DESC
LIMIT 20;

-- Disable JIT when:
-- 1. Query execution time < 10ms (JIT overhead dominates)
-- 2. JIT overhead > 15% of execution time
-- 3. High-frequency queries with >5% JIT overhead`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* JIT CONFIGURATION */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-green-400">JIT Configuration Tuning</h2>
            
            <div className="bg-gradient-to-r from-green-900/20 to-teal-900/20 border border-green-500/30 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-green-300">JIT Settings</h3>
              <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded">
                  <h4 className="font-semibold text-green-400 mb-2">Global JIT Control</h4>
                  <pre className="bg-black/50 p-3 rounded text-sm">
                    <code className="text-green-400">{`# postgresql.conf
jit = on                        # Enable/disable JIT globally
jit_above_cost = 100000         # JIT when estimated cost > 100000
jit_inline_above_cost = 500000  # Inline functions when cost > 500000
jit_optimize_above_cost = 500000 # Optimize when cost > 500000`}</code>
                  </pre>
                </div>

                <div className="bg-black/30 p-4 rounded">
                  <h4 className="font-semibold text-teal-400 mb-2">Session-Level Control</h4>
                  <pre className="bg-black/50 p-3 rounded text-sm">
                    <code className="text-green-400">{`-- Disable JIT for specific session
SET jit = off;

-- Disable just optimization (keep generation)
SET jit_optimize_above_cost = -1;

-- Enable aggressive JIT for complex queries
SET jit_above_cost = 10000;`}</code>
                  </pre>
                </div>

                <div className="bg-black/30 p-4 rounded">
                  <h4 className="font-semibold text-yellow-400 mb-2">Query-Level Control</h4>
                  <pre className="bg-black/50 p-3 rounded text-sm">
                    <code className="text-green-400">{`-- Disable JIT for single query
BEGIN;
SET LOCAL jit = off;
SELECT /* your query */;
COMMIT;`}</code>
                  </pre>
                </div>
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
            <p className="text-gray-300">JIT metrics are tracked across all query execution test files.</p>
          </div>
        </section>
      </div>
    </div>
  )
}
