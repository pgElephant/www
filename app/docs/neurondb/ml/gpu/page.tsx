export const metadata = {
  title: 'NeuronDB · GPU Acceleration (CUDA & Metal)',
  description: 'Accelerate vector operations 10-100x with GPU support in NeuronDB using CUDA or Apple Metal.'
}

import React from 'react'
import Link from 'next/link'
import { Zap, ArrowRight, Database, Activity, TrendingUp, Code } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/docs/neurondb/ml" className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Machine Learning
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 text-transparent bg-clip-text flex items-center gap-3">
          <Zap className="w-10 h-10 text-yellow-400" /> GPU Acceleration
        </h1>
        
        <p className="text-lg text-gray-300 mb-8">
          Speed up vector operations 10-100x with NVIDIA CUDA or Apple Metal backends.
        </p>

        {/* GPU CONFIGURATION */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-yellow-400">Enable GPU Support</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-blue-400">CUDA (NVIDIA GPUs)</h3>
                <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                  <code className="text-sm text-gray-300">{`-- Enable CUDA GPU backend
SET neurondb.gpu_enabled = true;
SET neurondb.gpu_backend = 'cuda';`}</code>
                </pre>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-purple-400">Metal (Apple Silicon)</h3>
                <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                  <code className="text-sm text-gray-300">{`-- Enable Metal GPU backend
SET neurondb.gpu_enabled = true;
SET neurondb.gpu_backend = 'metal';`}</code>
                </pre>
              </div>
            </div>
          </section>
        </div>

        {/* BENCHMARK 1: KNN SEARCH */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-orange-400">Benchmark 1: K-Nearest Neighbors Search</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-orange-400" />
                Create Large Dataset
              </h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Create EXTREME dataset for GPU performance test
DROP TABLE IF EXISTS extreme_vectors CASCADE;
CREATE TABLE extreme_vectors AS
SELECT 
    i as id,
    array_agg(random()::real ORDER BY j)::real[]::vector(2048) as vec
FROM generate_series(1, 50000) i,
     generate_series(1, 2048) j
GROUP BY i;

-- Dataset: 50,000 vectors × 2,048 dimensions (~400 MB)`}</code>
              </pre>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-red-400" />
                CPU Baseline
              </h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`SET neurondb.gpu_enabled = false;

\\timing on
-- KNN search: 100 queries × 50K vectors × 2048 dims = 5M distances
WITH query_vectors AS (
    SELECT id, vec FROM extreme_vectors WHERE id <= 100
)
SELECT 
    COUNT(*) as total_comparisons,
    AVG(distance)::numeric(10,4) as avg_distance
FROM (
    SELECT 
        q.id as query_id,
        e.id as result_id,
        q.vec <-> e.vec as distance,
        ROW_NUMBER() OVER (PARTITION BY q.id ORDER BY q.vec <-> e.vec) as rank
    FROM query_vectors q
    CROSS JOIN extreme_vectors e
    WHERE q.id != e.id
) ranked
WHERE rank <= 10;
\\timing off

-- CPU Time: ~15-20 seconds`}</code>
              </pre>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                GPU Accelerated
              </h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`SET neurondb.gpu_enabled = true;
SET neurondb.gpu_backend = 'metal';  -- or 'cuda'

\\timing on
-- Same KNN search using GPU
WITH query_vectors AS (
    SELECT id, vec FROM extreme_vectors WHERE id <= 100
)
SELECT 
    COUNT(*) as total_comparisons,
    AVG(distance)::numeric(10,4) as avg_distance
FROM (
    SELECT 
        q.id as query_id,
        e.id as result_id,
        vector_l2_distance_gpu(q.vec, e.vec) as distance,
        ROW_NUMBER() OVER (PARTITION BY q.id ORDER BY vector_l2_distance_gpu(q.vec, e.vec)) as rank
    FROM query_vectors q
    CROSS JOIN extreme_vectors e
    WHERE q.id != e.id
) ranked
WHERE rank <= 10;
\\timing off

-- GPU Time: ~1-2 seconds
-- Speedup: 10-15x faster`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* BENCHMARK 2: DISTANCE MATRIX */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-cyan-400">Benchmark 2: Distance Matrix Computation</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4">CPU Baseline</h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`SET neurondb.gpu_enabled = false;

\\timing on
-- Compute 500,000 distance calculations (500 × 1,000)
SELECT 
    COUNT(*) as total_distances,
    MIN(distance)::numeric(10,4) as min_dist,
    MAX(distance)::numeric(10,4) as max_dist,
    AVG(distance)::numeric(10,4) as avg_dist
FROM (
    SELECT v1.vec <-> v2.vec as distance
    FROM extreme_vectors v1
    CROSS JOIN extreme_vectors v2
    WHERE v1.id <= 500 AND v2.id BETWEEN 1001 AND 2000
) distances;
\\timing off

-- CPU Time: ~8-10 seconds`}</code>
              </pre>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4">GPU Accelerated</h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`SET neurondb.gpu_enabled = true;
SET neurondb.gpu_backend = 'metal';

\\timing on
-- Same distance matrix using GPU
SELECT 
    COUNT(*) as total_distances,
    MIN(distance)::numeric(10,4) as min_dist,
    MAX(distance)::numeric(10,4) as max_dist,
    AVG(distance)::numeric(10,4) as avg_dist
FROM (
    SELECT vector_l2_distance_gpu(v1.vec, v2.vec) as distance
    FROM extreme_vectors v1
    CROSS JOIN extreme_vectors v2
    WHERE v1.id <= 500 AND v2.id BETWEEN 1001 AND 2000
) distances;
\\timing off

-- GPU Time: ~0.5-1 seconds
-- Speedup: 10-20x faster`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* BENCHMARK 3: CLUSTERING */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-purple-400">Benchmark 3: All-to-All Distance (Clustering)</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- CPU: 1,000 × 1,000 = 1 MILLION distances
SET neurondb.gpu_enabled = false;
\\timing on
SELECT 
    COUNT(*) as total_distances,
    AVG(distance)::numeric(10,4) as avg_dist,
    STDDEV(distance)::numeric(10,4) as stddev_dist
FROM (
    SELECT v1.vec <-> v2.vec as distance
    FROM extreme_vectors v1
    CROSS JOIN extreme_vectors v2
    WHERE v1.id <= 1000 AND v2.id <= 1000 AND v1.id < v2.id
) distances;
\\timing off
-- CPU Time: ~30-40 seconds

-- GPU: Same workload
SET neurondb.gpu_enabled = true;
SET neurondb.gpu_backend = 'metal';
\\timing on
SELECT 
    COUNT(*) as total_distances,
    AVG(distance)::numeric(10,4) as avg_dist,
    STDDEV(distance)::numeric(10,4) as stddev_dist
FROM (
    SELECT vector_l2_distance_gpu(v1.vec, v2.vec) as distance
    FROM extreme_vectors v1
    CROSS JOIN extreme_vectors v2
    WHERE v1.id <= 1000 AND v2.id <= 1000 AND v1.id < v2.id
) distances;
\\timing off
-- GPU Time: ~2-3 seconds
-- Speedup: 15-20x faster`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* PERFORMANCE SUMMARY */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-green-400">Performance Summary</h2>
            
            <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/30 rounded-lg p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-green-300 mb-2">KNN Search (5M distances)</h3>
                  <p className="text-gray-300">CPU: ~15-20 seconds | GPU: ~1-2 seconds | <strong className="text-yellow-400">Speedup: 10-15x</strong></p>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-300 mb-2">Distance Matrix (500K distances)</h3>
                  <p className="text-gray-300">CPU: ~8-10 seconds | GPU: ~0.5-1 seconds | <strong className="text-yellow-400">Speedup: 10-20x</strong></p>
                </div>
                <div>
                  <h3 className="font-semibold text-purple-300 mb-2">Clustering (1M distances)</h3>
                  <p className="text-gray-300">CPU: ~30-40 seconds | GPU: ~2-3 seconds | <strong className="text-yellow-400">Speedup: 15-20x</strong></p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* COMPLETE DEMO FILES */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Code className="w-6 h-6 text-purple-400" />
            Complete Demo SQL File
          </h2>
          <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
            <a href="https://github.com/pgElephant/NeurondB/tree/main/demo/ML/sql/015_gpu.sql" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline">
              📄 View complete demo on GitHub: demo/ML/sql/015_gpu.sql
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
