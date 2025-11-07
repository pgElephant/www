'use client'

import React from 'react'
import Link from 'next/link'
import { BarChart3, ArrowRight, CheckCircle } from 'lucide-react'
import { NeurondBIcon } from '../../../../components/ProductIcons'

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
                  The examples below mirror the fraud demo in NeuronDB/demo/ML and use a table with a vector column named features.
                </p>
                <div className="bg-slate-900/50 rounded-lg p-6 mb-4">
                  <pre className="text-sm overflow-x-auto"><code className="text-green-300">
                    {`
-- K-Means clustering
SELECT cluster_kmeans(
  'train_data',   -- table with vectors
  'features',     -- vector column
  7,              -- K clusters
  50              -- max iterations
);

-- Project-based training and versioning
SELECT neurondb_train_kmeans_project(
  'fraud_kmeans',   -- project name
  'train_data',
  'features',
  7,
  50
) AS model_id;

-- List models for a project
SELECT version, algorithm, parameters, is_deployed
FROM neurondb_list_project_models('fraud_kmeans')
ORDER BY version;`}
                  </code></pre>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/30">
                    <div className="text-lg font-bold text-emerald-400 mb-1">O(n·k·i·d)</div>
                    <div className="text-xs text-white/60">Time Complexity</div>
                  </div>
                  <div className="bg-cyan-500/10 rounded-lg p-4 border border-cyan-500/30">
                    <div className="text-lg font-bold text-cyan-400 mb-1">k-means++</div>
                    <div className="text-xs text-white/60">Initialization</div>
                  </div>
                  <div className="bg-teal-500/10 rounded-lg p-4 border border-teal-500/30">
                    <div className="text-lg font-bold text-teal-400 mb-1">Versioned</div>
                    <div className="text-xs text-white/60">Project + deployment
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini-batch K-Means */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                <h3 className="text-2xl font-bold text-emerald-300 mb-4">Mini-batch K-Means</h3>
                <p className="text-white/80 mb-6">
                  Fast stochastic K-Means optimized for large datasets. Matches the demo at NeuronDB/demo/ML/004_minibatch_kmeans.sql.
                </p>
                <div className="bg-slate-900/50 rounded-lg p-6">
                  <pre className="text-sm overflow-x-auto"><code className="text-green-300">
                    {`
-- Mini-batch K-Means (fast)
SELECT cluster_minibatch_kmeans(
  'train_data',
  'features',
  7,      -- K clusters
  50,     -- max iterations
  100     -- batch size
) AS clusters;`}
                  </code></pre>
                </div>
              </div>

              {/* GMM */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                <h3 className="text-2xl font-bold text-emerald-300 mb-4">Gaussian Mixture Models (GMM)</h3>
                <p className="text-white/80 mb-6">
                  Probabilistic clustering that returns a probability matrix. Convert to hard cluster IDs using a helper function from the demo.
                </p>
                <div className="bg-slate-900/50 rounded-lg p-6 mb-4">
                  <pre className="text-sm overflow-x-auto"><code className="text-green-300">
                    {`
-- Helper: convert probability matrix to cluster IDs
CREATE OR REPLACE FUNCTION gmm_to_clusters(probs float8[][])
RETURNS integer[] LANGUAGE plpgsql IMMUTABLE AS $$
DECLARE r integer[] := ARRAY[]::integer[]; i int; j int; k int; m float8; b int; BEGIN
  k := array_length(probs,2); FOR i IN 1..array_length(probs,1) LOOP m := -1; b := 1;
    FOR j IN 1..k LOOP IF probs[i][j] > m THEN m := probs[i][j]; b := j; END IF; END LOOP;
    r := array_append(r, b); END LOOP; RETURN r; END; $$;

-- Train GMM and convert to clusters
WITH p AS (
  SELECT cluster_gmm('train_data','features',7,30) AS probs
)
SELECT gmm_to_clusters(probs) FROM p;`}
                  </code></pre>
                </div>
                <div className="text-white/60 text-sm">
                  Tip: See NeuronDB/demo/ML/003_gmm_clustering.sql for a complete workflow including evaluation on test data.
                </div>
              </div>
            </div>

            {/* Dimensionality Reduction (coming soon) */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Dimensionality Reduction</h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                <p className="text-white/80">
                  PCA and related techniques will be documented here. For now, focus on clustering and outlier detection from the ML demo.
                </p>
              </div>
            </div>

            {/* Outlier Detection */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Outlier Detection</h2>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
                <h3 className="text-2xl font-bold text-yellow-300 mb-4">Z-score Outlier Detection</h3>
                <p className="text-white/80 mb-6">
                  Statistical anomaly detection using Z-scores. Matches the workflow in NeuronDB/demo/ML/005_outlier_detection.sql.
                </p>
                <div className="bg-slate-900/50 rounded-lg p-6">
                  <pre className="text-sm overflow-x-auto"><code className="text-green-300">
                    {`
-- Flag outliers using Z-score
SELECT detect_outliers_zscore(
  'train_data',
  'features',
  3.0,      -- threshold (higher = fewer outliers)
  'zscore'  -- method
) AS outliers;

-- Aggregate fraud detection rate among outliers (demo schema)
WITH flags AS (
  SELECT detect_outliers_zscore('train_data','features',3.0,'zscore') AS f
), labeled AS (
  SELECT t.is_fraud, o.is_outlier
  FROM (SELECT is_fraud, ROW_NUMBER() OVER (ORDER BY transaction_id) rn FROM train_data) t,
       flags,
       LATERAL unnest(f) WITH ORDINALITY AS o(is_outlier, rn)
  WHERE t.rn = o.rn
)
SELECT ROUND(100.0*SUM(CASE WHEN is_outlier AND is_fraud THEN 1 ELSE 0 END)/NULLIF(SUM(CASE WHEN is_fraud THEN 1 ELSE 0 END),0),2) AS fraud_detection_rate
FROM labeled;`}
                  </code></pre>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl border border-emerald-500/30 p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Related Documentation</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/docs/neurondb/gpu" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-all group">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                  <div>
                    <div className="font-semibold text-white">GPU Acceleration</div>
                    <div className="text-sm text-white/60">Vector distance + quantization</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40 ml-auto" />
                </Link>
                <Link href="/docs/neurondb/ml/embeddings" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-all group">
                  <NeurondBIcon size={24} />
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

