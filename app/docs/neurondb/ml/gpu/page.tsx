export const metadata = {
  title: 'NeuronDB · GPU Acceleration (CUDA & Metal)',
  description: 'Accelerate vector operations 10-100x with GPU support in NeuronDB using CUDA or Apple Metal.'
}

import React from 'react'
import Link from 'next/link'
import { Zap, Cpu, ArrowRight } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)' }}>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <Link href="/docs/neurondb/ml" className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200">
                <ArrowRight className="w-4 h-4 rotate-180" /> Back to Machine Learning
              </Link>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center gap-3">
              <Zap className="w-9 h-9 text-yellow-300" /> GPU Acceleration
            </h1>
            <p className="text-white/80 text-lg mb-8">Speed up vector operations 10-100x with NVIDIA CUDA or Apple Metal backends.</p>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-6 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <Cpu className="w-6 h-6 text-cyan-300" /> Extreme GPU Performance Test
              </h2>
              <p className="text-white/80 mb-4">Compare CPU vs GPU on large-scale workloads: 50,000 vectors × 2,048 dimensions.</p>
              <div className="bg-slate-900/80 rounded-lg p-4 mb-4">
                <pre className="text-green-400 font-mono text-sm overflow-x-auto">{
`-- Benchmark CPU vs GPU (CUDA/Metal)
\i /Users/pgedge/pge/NeurondB/demo/ML/sql/015_gpu.sql`
                }</pre>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-400/20 rounded-lg p-4">
                <p className="text-white/80 text-sm"><strong>Benchmarks:</strong> KNN search, distance matrix computation, clustering — all tested with CPU baseline and GPU acceleration for direct comparison.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Enable GPU (CUDA)</h3>
                <pre className="bg-slate-900/80 p-4 rounded text-green-400 text-sm overflow-x-auto">{
`SET neurondb.gpu_enabled = true;
SET neurondb.gpu_backend = 'cuda';`
                }</pre>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Enable GPU (Metal)</h3>
                <pre className="bg-slate-900/80 p-4 rounded text-green-400 text-sm overflow-x-auto">{
`SET neurondb.gpu_enabled = true;
SET neurondb.gpu_backend = 'metal';`
                }</pre>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-6">
              <h2 className="text-2xl font-semibold text-white mb-4">Usage in Queries</h2>
              <pre className="bg-slate-900/80 p-4 rounded text-green-400 text-sm overflow-x-auto mb-4">{
`-- GPU-accelerated distance function
SELECT vector_l2_distance_gpu(vec1, vec2) FROM vectors;

-- Embedding with GPU
SELECT neurondb.embed('all-MiniLM-L6-v2', text, true) FROM docs;`
              }</pre>
              <p className="text-white/70">When <code className="bg-slate-800 px-1 rounded">gpu_enabled</code> is true, vector operations automatically leverage the configured backend.</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
