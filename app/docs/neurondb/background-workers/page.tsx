export const metadata = {
  title: 'NeuronDB · Background Workers',
  description: 'Asynchronous job execution, auto-tuning, and index maintenance with NeuronDB background workers.',
}

import React from 'react'
import Link from 'next/link'
import { Database, Zap, Settings, ArrowRight, CheckCircle } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)' }}>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Database className="w-4 h-4" />
              Background Workers
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Background Workers
              </span>
            </h1>
            
            <p className="text-xl text-white/80 mb-8">
              Three production-ready background workers for async operations, auto-tuning, and index maintenance. Built with PostgreSQL background worker framework and tenant isolation.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-16">
            
            {/* neuranq */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">neuranq - Async Job Queue</h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                <p className="text-white/80 mb-6">
                  Asynchronous job queue executor with SKIP LOCKED, rate limits, retries, and poison job handling. Perfect for batch embedding generation, model inference, and long-running operations.
                </p>
                
                <h3 className="text-xl font-bold text-blue-300 mb-4">Features</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
                    <h4 className="font-bold text-blue-300 mb-2 text-sm">SKIP LOCKED Queuing</h4>
                    <p className="text-white/70 text-xs">Concurrent job processing without lock contention</p>
                  </div>
                  <div className="bg-indigo-500/10 rounded-lg p-4 border border-indigo-500/30">
                    <h4 className="font-bold text-indigo-300 mb-2 text-sm">Rate Limiting</h4>
                    <p className="text-white/70 text-xs">Per-tenant QPS and token budgets</p>
                  </div>
                  <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/30">
                    <h4 className="font-bold text-purple-300 mb-2 text-sm">Auto Retry</h4>
                    <p className="text-white/70 text-xs">Exponential backoff for transient failures</p>
                  </div>
                  <div className="bg-violet-500/10 rounded-lg p-4 border border-violet-500/30">
                    <h4 className="font-bold text-violet-300 mb-2 text-sm">Poison Jobs</h4>
                    <p className="text-white/70 text-xs">Dead letter queue for failed jobs</p>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-blue-300 mb-4">Configuration</h3>
                <div className="bg-slate-900/50 rounded-lg p-6">
                  <pre className="text-sm overflow-x-auto"><code className="text-cyan-300">
                    {`
# postgresql.conf
neurondb.neuranq_enabled = on
neurondb.neuranq_naptime = 1000        # Check queue every 1 second
neurondb.neuranq_batch_size = 100      # Process 100 jobs per cycle
neurondb.neuranq_max_retries = 3       # Retry failed jobs 3 times`}
                  </code></pre>
                </div>
              </div>
            </div>

            {/* neuranmon */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">neuranmon - Auto-Tuner</h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                <p className="text-white/80 mb-6">
                  Automatically tunes index parameters based on query performance and SLO targets. Adjusts ef_search, rotates caches, and tracks recall@k metrics.
                </p>
                
                <h3 className="text-xl font-bold text-indigo-300 mb-4">What It Does</h3>
                <ul className="space-y-3 text-white/80 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Monitors query latency and adjusts ef_search for HNSW indexes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Tracks recall@10 and recall@100 to measure search quality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Rotates embedding and model caches based on access patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Records performance metrics for trend analysis</span>
                  </li>
                </ul>

                <div className="bg-slate-900/50 rounded-lg p-6">
                  <pre className="text-sm overflow-x-auto"><code className="text-cyan-300">
                    {`
# postgresql.conf
neurondb.neuranmon_enabled = on
neurondb.neuranmon_naptime = 60000     # Check every 60 seconds
neurondb.neuranmon_target_latency_ms = 10  # Target latency SLO
neurondb.neuranmon_min_recall = 0.95   # Minimum 95% recall`}
                  </code></pre>
                </div>
              </div>
            </div>

            {/* neurandefrag */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">neurandefrag - Index Maintenance</h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                <p className="text-white/80 mb-6">
                  Automatic index maintenance: compacts HNSW graphs, re-levels layers, prunes tombstones, and schedules rebuilds for optimal performance.
                </p>
                
                <h3 className="text-xl font-bold text-purple-300 mb-4">Maintenance Tasks</h3>
                <div className="space-y-4 mb-6">
                  <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/30">
                    <h4 className="font-bold text-purple-300 mb-2">Graph Compaction</h4>
                    <p className="text-white/70 text-sm">Removes fragmentation from HNSW graphs after deletes and updates</p>
                  </div>
                  <div className="bg-violet-500/10 rounded-lg p-4 border border-violet-500/30">
                    <h4 className="font-bold text-violet-300 mb-2">Layer Re-leveling</h4>
                    <p className="text-white/70 text-sm">Rebalances hierarchical layers for optimal search performance</p>
                  </div>
                  <div className="bg-indigo-500/10 rounded-lg p-4 border border-indigo-500/30">
                    <h4 className="font-bold text-indigo-300 mb-2">Tombstone Pruning</h4>
                    <p className="text-white/70 text-sm">Removes deleted vector markers to reclaim space</p>
                  </div>
                  <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
                    <h4 className="font-bold text-blue-300 mb-2">Rebuild Scheduling</h4>
                    <p className="text-white/70 text-sm">Automatically rebuilds indexes when fragmentation exceeds threshold</p>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-lg p-6">
                  <pre className="text-sm overflow-x-auto"><code className="text-cyan-300">
                    {`
# postgresql.conf
neurondb.neurandefrag_enabled = on
neurondb.neurandefrag_naptime = 300000     # Check every 5 minutes
neurondb.neurandefrag_fragmentation_threshold = 0.30  # Rebuild at 30%`}
                  </code></pre>
                </div>
              </div>
            </div>

            {/* Monitoring */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Monitor Workers</h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                <div className="bg-slate-900/50 rounded-lg p-6">
                  <pre className="text-sm overflow-x-auto"><code className="text-green-300">
                    {`
-- View all worker status
SELECT * FROM neurondb_worker_status();

-- Returns:
--  worker_name  | status  |      last_run       | jobs_processed | avg_runtime_ms
-- --------------+---------+---------------------+----------------+---------------
--  neuranq      | running | 2025-11-03 12:30:15 |      427       |      12.3
--  neuranmon    | running | 2025-11-03 12:30:10 |       89       |      45.7
--  neurandefrag | running | 2025-11-03 12:28:00 |       23       |     234.8`}
                  </code></pre>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30 p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Related Documentation</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/docs/neurondb/configuration" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-all group">
                  <Settings className="w-6 h-6 text-blue-400" />
                  <div>
                    <div className="font-semibold text-white">Configuration</div>
                    <div className="text-sm text-white/60">Worker settings</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 ml-auto" />
                </Link>
                <Link href="/docs/neurondb/performance" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-all group">
                  <Zap className="w-6 h-6 text-purple-400" />
                  <div>
                    <div className="font-semibold text-white">Performance</div>
                    <div className="text-sm text-white/60">Optimization tips</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 ml-auto" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

