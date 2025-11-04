export const metadata = {
  title: 'Vector Database Performance Tuning | Optimize NeuronDB PostgreSQL',
  description: 'Complete performance optimization guide for NeuronDB PostgreSQL vector database. HNSW tuning, recall optimization, latency reduction, memory management, and production scaling. Handle 100M+ vectors with sub-10ms queries.',
  keywords: [
    'vector database performance',
    'PostgreSQL performance tuning',
    'HNSW optimization',
    'vector search performance',
    'database tuning',
    'recall optimization',
    'latency optimization',
    'PostgreSQL scaling',
    'vector index tuning',
    'database performance',
    'fast vector search',
    'production vector database'
  ],
  openGraph: {
    title: 'Performance Tuning Guide - NeuronDB Vector Database',
    description: 'Optimize NeuronDB for production. HNSW tuning, recall/latency optimization, and scaling to 100M+ vectors.',
    url: 'https://www.pgelephant.com/docs/neurondb/performance',
  },
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/neurondb/performance',
  },
}

import React from 'react'
import { Zap, BarChart3, Cpu, CheckCircle } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)' }}>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Performance
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                Performance
              </span>
            </h1>
            
            <p className="text-xl text-white/80 mb-8">
              Sub-millisecond vector searches, 100x GPU acceleration, SIMD-optimized operations, and intelligent caching for production-scale AI workloads.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-16">
            
            {/* Benchmarks */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Performance Benchmarks</h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 overflow-hidden">
                <div className="bg-white/10 px-6 py-4">
                  <p className="text-white/80">
                    <strong>Test Environment:</strong> AWS r6i.2xlarge (8 vCPU, 64GB RAM), 10M vectors, 768 dimensions
                  </p>
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-4 text-left text-white">Operation</th>
                      <th className="px-6 py-4 text-left text-white">Throughput</th>
                      <th className="px-6 py-4 text-left text-white">Latency (p95)</th>
                      <th className="px-6 py-4 text-left text-white">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    <tr>
                      <td className="px-6 py-4 text-cyan-300">Vector Insert</td>
                      <td className="px-6 py-4 text-white/70">50K/sec</td>
                      <td className="px-6 py-4 text-green-400">2ms</td>
                      <td className="px-6 py-4 text-white/60 text-xs">Bulk COPY</td>
                    </tr>
                    <tr className="bg-white/5">
                      <td className="px-6 py-4 text-cyan-300">HNSW Search (k=10)</td>
                      <td className="px-6 py-4 text-white/70">10K QPS</td>
                      <td className="px-6 py-4 text-green-400">5ms</td>
                      <td className="px-6 py-4 text-white/60 text-xs">ef_search=40</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-cyan-300">Embedding Generation</td>
                      <td className="px-6 py-4 text-white/70">1K/sec</td>
                      <td className="px-6 py-4 text-green-400">10ms</td>
                      <td className="px-6 py-4 text-white/60 text-xs">Batch size 32</td>
                    </tr>
                    <tr className="bg-white/5">
                      <td className="px-6 py-4 text-cyan-300">Hybrid Search</td>
                      <td className="px-6 py-4 text-white/70">5K QPS</td>
                      <td className="px-6 py-4 text-green-400">8ms</td>
                      <td className="px-6 py-4 text-white/60 text-xs">Vector+FTS</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-cyan-300">Reranking</td>
                      <td className="px-6 py-4 text-white/70">2K/sec</td>
                      <td className="px-6 py-4 text-green-400">15ms</td>
                      <td className="px-6 py-4 text-white/60 text-xs">Cross-encoder</td>
                    </tr>
                    <tr className="bg-white/5">
                      <td className="px-6 py-4 text-cyan-300">GPU K-Means</td>
                      <td className="px-6 py-4 text-white/70">55K vectors/sec</td>
                      <td className="px-6 py-4 text-green-400">18ms</td>
                      <td className="px-6 py-4 text-white/60 text-xs">10 clusters</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Optimization Techniques */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Optimization Techniques</h2>
              <div className="space-y-6">
                
                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                  <h3 className="text-2xl font-bold text-yellow-300 mb-4">1. SIMD Acceleration</h3>
                  <p className="text-white/80 mb-4">
                    Automatic SIMD (Single Instruction Multiple Data) optimization for distance calculations using AVX2, AVX-512 (x86) or NEON (ARM).
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/30">
                      <div className="text-lg font-bold text-yellow-400 mb-1">4-8x</div>
                      <div className="text-xs text-white/60">AVX2 Speedup</div>
                    </div>
                    <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/30">
                      <div className="text-lg font-bold text-orange-400 mb-1">8-16x</div>
                      <div className="text-xs text-white/60">AVX-512 Speedup</div>
                    </div>
                    <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30">
                      <div className="text-lg font-bold text-red-400 mb-1">Auto</div>
                      <div className="text-xs text-white/60">Detection</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                  <h3 className="text-2xl font-bold text-orange-300 mb-4">2. Intelligent Caching</h3>
                  <ul className="space-y-3 text-white/80">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Embedding Cache:</strong> 95%+ hit rate, 50x faster than generation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Model Cache:</strong> Models loaded in shared memory, 99.8% hit rate</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span><strong>ANN Buffer:</strong> Hot centroids and entry points cached</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span><strong>Index Page Cache:</strong> 92%+ hit rate for frequently accessed vectors</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                  <h3 className="text-2xl font-bold text-red-300 mb-4">3. Query Planning</h3>
                  <p className="text-white/80 mb-4">
                    Intelligent cost-based query planning chooses optimal execution paths:
                  </p>
                  <ul className="space-y-2 text-white/70 text-sm ml-4">
                    <li>• Small result sets → Sequential scan</li>
                    <li>• Medium result sets → IVF index</li>
                    <li>• Large result sets → HNSW index</li>
                    <li>• GPU available + large batch → GPU acceleration</li>
                    <li>• Hybrid query → Parallel vector + FTS execution</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Best Practices */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Best Practices</h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-cyan-300 mb-3">1. Index Selection</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-white/10">
                          <tr>
                            <th className="px-4 py-3 text-left text-white">Dataset Size</th>
                            <th className="px-4 py-3 text-left text-white">Recommended Index</th>
                            <th className="px-4 py-3 text-left text-white">Parameters</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          <tr>
                            <td className="px-4 py-3 text-white/70">&lt; 100K vectors</td>
                            <td className="px-4 py-3 text-cyan-300">HNSW</td>
                            <td className="px-4 py-3 text-white/60 text-xs">m=16, ef=200</td>
                          </tr>
                          <tr className="bg-white/5">
                            <td className="px-4 py-3 text-white/70">100K - 10M vectors</td>
                            <td className="px-4 py-3 text-cyan-300">HNSW or IVF</td>
                            <td className="px-4 py-3 text-white/60 text-xs">m=32, ef=400 or nlist=sqrt(n)</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-white/70">&gt; 10M vectors</td>
                            <td className="px-4 py-3 text-cyan-300">IVF + PQ</td>
                            <td className="px-4 py-3 text-white/60 text-xs">nlist=4000, PQ compression</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-cyan-300 mb-3">2. Use Batch Operations</h3>
                    <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-sm">
                      <pre className="text-sm overflow-x-auto"><code className="text-green-300">
                        {`
-- Good: Batch embedding generation (5x faster)
UPDATE docs SET embedding = batch.emb
FROM (
  SELECT id, unnest(embed_text_batch(array_agg(content))) AS emb
  FROM docs GROUP BY id % 100
) batch WHERE docs.id = batch.id;

-- Bad: Individual calls
UPDATE docs SET embedding = embed_text(content);  -- Slow!`}
                      </code></pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-cyan-300 mb-3">3. Monitor Cache Hit Rates</h3>
                    <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-sm">
                      <pre className="text-sm overflow-x-auto"><code className="text-green-300">
                        {`
SELECT * FROM neurondb_cache_stats();

-- Target hit rates:
--   Embeddings: > 50%
--   Models: > 95%
--   Index pages: > 90%`}
                      </code></pre>
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

