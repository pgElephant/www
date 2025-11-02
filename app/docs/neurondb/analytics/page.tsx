'use client'

import React from 'react'
import Link from 'next/link'
import { BarChart3, Brain, Zap, ArrowRight, CheckCircle } from 'lucide-react'

export default function NeuronDBAnalyticsPage() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)' }}>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BarChart3 className="w-4 h-4" />
              ML Analytics
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                ML Analytics Suite
              </span>
            </h1>
            
            <p className="text-xl text-white/80 mb-8">
              Comprehensive machine learning algorithms for clustering, dimensionality reduction, outlier detection, and embedding quality assessment—all in SQL.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-16">
            
            {/* Clustering */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Clustering Algorithms</h2>
              
              {/* K-Means */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8 mb-6">
                <h3 className="text-2xl font-bold text-emerald-300 mb-4">K-Means Clustering</h3>
                <p className="text-white/80 mb-6">
                  Lloyd's K-Means with k-means++ initialization for finding customer segments, topic clusters, and data grouping.
                </p>
                <div className="bg-slate-900/50 rounded-lg p-6 font-mono text-sm mb-4">
                  <code className="text-green-300">
                    {`-- CPU K-Means
SELECT cluster_kmeans(
  'customer_data',  -- table
  'features',       -- vector column
  5,                -- number of clusters
  100               -- max iterations
);

-- GPU K-Means (23x faster)
SELECT cluster_kmeans_gpu(
  'customer_data', 'features', 5, 100
);

-- Get cluster assignments
SELECT id, cluster_id, centroid_distance
FROM neurondb_cluster_assignments('customer_data', 'features', 5)
ORDER BY cluster_id, centroid_distance
LIMIT 100;`}
                  </code>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/30">
                    <div className="text-lg font-bold text-emerald-400 mb-1">O(n·k·i·d)</div>
                    <div className="text-xs text-white/60">Time Complexity</div>
                  </div>
                  <div className="bg-teal-500/10 rounded-lg p-4 border border-teal-500/30">
                    <div className="text-lg font-bold text-teal-400 mb-1">23x GPU</div>
                    <div className="text-xs text-white/60">Speedup on GPU</div>
                  </div>
                  <div className="bg-cyan-500/10 rounded-lg p-4 border border-cyan-500/30">
                    <div className="text-lg font-bold text-cyan-400 mb-1">k-means++</div>
                    <div className="text-xs text-white/60">Initialization</div>
                  </div>
                </div>
              </div>

              {/* DBSCAN */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                <h3 className="text-2xl font-bold text-emerald-300 mb-4">DBSCAN (Density-Based)</h3>
                <p className="text-white/80 mb-6">
                  Density-based clustering that automatically discovers the number of clusters and identifies outliers.
                </p>
                <div className="bg-slate-900/50 rounded-lg p-6 font-mono text-sm">
                  <code className="text-green-300">
                    {`-- DBSCAN clustering (auto-discovers cluster count)
SELECT cluster_dbscan(
  'customer_data',
  'features',
  0.5,      -- epsilon (neighborhood radius)
  5         -- min_points (minimum cluster size)
);

-- Get clusters and outliers
SELECT cluster_id, COUNT(*) as size
FROM neurondb_dbscan_assignments('customer_data', 'features', 0.5, 5)
GROUP BY cluster_id
ORDER BY cluster_id;

-- cluster_id = -1 means outlier`}
                  </code>
                </div>
              </div>
            </div>

            {/* Dimensionality Reduction */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Dimensionality Reduction</h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                <h3 className="text-2xl font-bold text-cyan-300 mb-4">PCA (Principal Component Analysis)</h3>
                <p className="text-white/80 mb-6">
                  Reduce high-dimensional vectors to lower dimensions while preserving variance.
                </p>
                <div className="bg-slate-900/50 rounded-lg p-6 font-mono text-sm">
                  <code className="text-green-300">
                    {`-- Reduce dimensions: 768 → 128
SELECT reduce_dimensionality_pca(
  'embeddings_table',
  'vector_column',
  128  -- target dimensions
);

-- Returns: {"components": 128, 
--           "explained_variance": [0.45, 0.23, 0.12, ...],
--           "total_variance_explained": 0.80}

-- 80% of information retained with 83% size reduction`}
                  </code>
                </div>
              </div>
            </div>

            {/* Outlier Detection */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Outlier Detection</h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                <h3 className="text-2xl font-bold text-yellow-300 mb-4">Isolation Forest</h3>
                <p className="text-white/80 mb-6">
                  Detect anomalies and unusual patterns in your vector data using Isolation Forest algorithm.
                </p>
                <div className="bg-slate-900/50 rounded-lg p-6 font-mono text-sm">
                  <code className="text-green-300">
                    {`-- Detect outliers with 95% confidence
SELECT detect_outliers(
  'customer_data',
  'features',
  0.95  -- confidence level
) AS outlier_count;

-- Get outlier details
SELECT id, anomaly_score
FROM neurondb_outlier_scores('customer_data', 'features', 0.95)
WHERE is_outlier = true
ORDER BY anomaly_score DESC;`}
                  </code>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl border border-emerald-500/30 p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Related Documentation</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/docs/neurondb/gpu" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-all group">
                  <Zap className="w-6 h-6 text-emerald-400" />
                  <div>
                    <div className="font-semibold text-white">GPU Acceleration</div>
                    <div className="text-sm text-white/60">23x faster clustering</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 ml-auto" />
                </Link>
                <Link href="/docs/neurondb/ml/embeddings" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-all group">
                  <Brain className="w-6 h-6 text-cyan-400" />
                  <div>
                    <div className="font-semibold text-white">Embeddings</div>
                    <div className="text-sm text-white/60">Generate vectors</div>
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

