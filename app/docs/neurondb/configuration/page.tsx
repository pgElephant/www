export const metadata = {
  title: 'NeuronDB · Configuration',
  description: 'All configuration parameters (GUCs) and operational settings for NeuronDB.',
}

import React from 'react'
import { Settings, Database, Zap, CheckCircle } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)' }}>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Settings className="w-4 h-4" />
              Configuration
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                Configuration
              </span>
            </h1>
            
            <p className="text-xl text-white/80 mb-8">
              Complete configuration reference for NeuronDB. Tune performance, configure workers, and optimize for your workload.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-16">
            
            {/* Core Configuration */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Core Configuration</h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                <div className="bg-slate-900/50 rounded-lg p-6">
                  <pre className="text-sm overflow-x-auto"><code className="text-cyan-300">{`
# Add to postgresql.conf

# Load Extension
shared_preload_libraries = 'neurondb'

# Vector Index Parameters
neurondb.ef_search = 40                    # Search accuracy (10-200)
neurondb.m = 16                            # HNSW connections per node (4-48)
neurondb.ef_construction = 200             # Build quality (10-500)

# ML Inference
neurondb.model_path = '/var/lib/models'    # ONNX model directory
neurondb.inference_threads = 4             # Parallel inference threads
neurondb.batch_inference_size = 32         # Batch size for embeddings

# Background Workers
neurondb.neuranq_enabled = on
neurondb.neuranq_naptime = 1000
neurondb.neuranmon_enabled = on  
neurondb.neuranmon_naptime = 60000
neurondb.neurandefrag_enabled = on
neurondb.neurandefrag_naptime = 300000

# Performance
neurondb.enable_prefetch = on              # Predictive prefetching
neurondb.enable_simd = on                  # SIMD optimizations
neurondb.cache_size_mb = 256               # Embedding cache size

# Security
neurondb.enable_encryption = off           # Vector encryption
neurondb.enable_differential_privacy = off # DP noise addition`}</code></pre>
                </div>
              </div>
            </div>

            {/* GPU Configuration */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">GPU Configuration (Optional)</h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                <div className="bg-slate-900/50 rounded-lg p-6">
                  <pre className="text-sm overflow-x-auto"><code className="text-cyan-300">{`
# GPU Settings (optional)
neurondb.gpu_enabled = off                 # Default: off
neurondb.gpu_device = 0                    # GPU device ID
neurondb.gpu_batch_size = 8192             # Batch size
neurondb.gpu_streams = 2                   # CUDA/HIP streams
neurondb.gpu_memory_pool_mb = 512          # Memory pool
neurondb.gpu_fail_open = on                # Fallback to CPU
neurondb.gpu_kernels = 'l2,cosine,ip'      # Enabled kernels
neurondb.gpu_timeout_ms = 30000            # Kernel timeout`}</code></pre>
                </div>
              </div>
            </div>

            {/* Runtime Configuration */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Runtime Configuration (Session-Level)</h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                <p className="text-white/80 mb-6">
                  These can be changed per-session without restarting PostgreSQL:
                </p>
                <div className="bg-slate-900/50 rounded-lg p-6">
                  <pre className="text-sm overflow-x-auto"><code className="text-green-300">{`
-- Adjust search accuracy
SET neurondb.ef_search = 100;  -- Higher = more accurate but slower

-- Enable GPU for this session
SET neurondb.gpu_enabled = on;

-- Change cache size
SET neurondb.cache_size_mb = 512;

-- View current settings
SHOW neurondb.ef_search;
SELECT * FROM neurondb_config();`}</code></pre>
                </div>
              </div>
            </div>

            {/* Tuning Guide */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Performance Tuning</h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-orange-300 mb-3">For Low Latency</h3>
                    <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-sm">
                      <pre className="text-sm overflow-x-auto"><code className="text-cyan-300">{`
neurondb.ef_search = 20          # Lower for speed
neurondb.enable_prefetch = on    # Predictive loading
neurondb.enable_simd = on        # SIMD acceleration  
neurondb.gpu_enabled = on        # GPU if available`}</code></pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-amber-300 mb-3">For High Accuracy</h3>
                    <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-sm">
                      <pre className="text-sm overflow-x-auto"><code className="text-cyan-300">{`
neurondb.ef_search = 200         # Higher for accuracy
neurondb.ef_construction = 500   # Better index quality
neurondb.m = 32                  # More connections`}</code></pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-yellow-300 mb-3">For Large Scale</h3>
                    <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-sm">
                      <pre className="text-sm overflow-x-auto"><code className="text-cyan-300">{`
neurondb.cache_size_mb = 1024    # Larger cache
neurondb.inference_threads = 8   # More parallelism
neurondb.neuranq_batch_size = 200 # Larger batches`}</code></pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

