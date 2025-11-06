export const metadata = {
  title: 'NeuronDB · Clustering (K-means, GMM, Hierarchical, DBSCAN)',
  description: 'Cluster large datasets directly in PostgreSQL using NeuronDB. Includes K-means, GMM, Mini-batch K-means, Hierarchical, and DBSCAN with training, evaluation, and deployment.',
}

import React from 'react'
import Link from 'next/link'
import { GitBranch, ArrowRight, Database, Activity, TrendingUp, Zap, Code } from 'lucide-react'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <Link href="/docs/neurondb/ml" className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" /> Back to Machine Learning
          </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 text-transparent bg-clip-text flex items-center gap-3">
          <GitBranch className="w-10 h-10 text-blue-400" /> Clustering Algorithms
        </h1>
        
        <p className="text-lg text-gray-300 mb-8">
          Group similar data points using unsupervised learning. NeuronDB supports K-means, GMM, Mini-batch K-means, Hierarchical clustering, and DBSCAN.
        </p>

        {/* K-MEANS CLUSTERING */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-blue-400">K-means Clustering</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-400" />
                Step 1: Train K-means Model
              </h3>
              <p className="text-gray-300 mb-4">Train K-means with 7 clusters and 50 iterations:</p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Train K-means clustering model
SELECT neurondb_train_kmeans_project(
    'fraud_kmeans',      -- Project name
    'train_data',        -- Training table
    'features',          -- Feature column
    7,                   -- Number of clusters (K)
    50                   -- Maximum iterations
) AS kmeans_model_id;

-- Returns: model_id (e.g., 1)`}</code>
              </pre>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-400" />
                Step 2: View Clustering Results
              </h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Analyze cluster distribution and fraud rates
WITH kmeans_clusters AS (
    SELECT cluster_kmeans('train_data', 'features', 7, 50) as clusters
),
kmeans_result AS (
    SELECT 
        t.transaction_id,
        t.is_fraud,
        c.cluster
    FROM (
        SELECT transaction_id, is_fraud, 
               ROW_NUMBER() OVER (ORDER BY transaction_id) as rn 
        FROM train_data
    ) t,
    kmeans_clusters,
    LATERAL unnest(clusters) WITH ORDINALITY AS c(cluster, rn)
    WHERE t.rn = c.rn
),
cluster_fraud_rates AS (
    SELECT 
        cluster,
        COUNT(*) as transactions,
        SUM(CASE WHEN is_fraud THEN 1 ELSE 0 END) as frauds,
        ROUND(100.0 * SUM(CASE WHEN is_fraud THEN 1 ELSE 0 END) / COUNT(*), 2) as fraud_rate
    FROM kmeans_result
    GROUP BY cluster
)
SELECT 
    cluster,
    transactions,
    frauds,
    fraud_rate || '%' as fraud_percentage
FROM cluster_fraud_rates
ORDER BY fraud_rate DESC;

-- Output shows which clusters have higher fraud concentration`}</code>
              </pre>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                Step 3: Train Multiple K Values
              </h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Train K=5 model
SELECT neurondb_train_kmeans_project(
    'fraud_kmeans', 'train_data', 'features', 5, 50
) AS kmeans_v2;

-- Train K=10 model
SELECT neurondb_train_kmeans_project(
    'fraud_kmeans', 'train_data', 'features', 10, 50
) AS kmeans_v3;

-- Compare all versions
SELECT 
    version,
    parameters->>'k' as K_value,
    training_time_ms || 'ms' as training_time,
    is_deployed
FROM neurondb_list_project_models('fraud_kmeans')
ORDER BY version;`}</code>
              </pre>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-400" />
                Step 4: Deploy Best Model
              </h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Deploy model for production use
SELECT neurondb_deploy_model('fraud_kmeans', 1);  -- Deploy model_id 1

-- Verify deployment
SELECT 
    neurondb_get_deployed_model('fraud_kmeans') as deployed_model_id;`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* GMM CLUSTERING */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-purple-400">Gaussian Mixture Models (GMM)</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4">What is GMM?</h3>
              <p className="text-gray-300 mb-4">
                GMM provides <strong>soft clustering</strong> with probability distributions. Unlike K-means (hard assignment), 
                GMM returns the probability that each point belongs to each cluster.
              </p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- GMM returns 2D array of probabilities
-- Convert to cluster IDs using helper function
WITH gmm_probabilities AS (
    SELECT cluster_gmm('train_data', 'features', 7, 30) as probs
),
gmm_clusters AS (
    SELECT gmm_to_clusters(probs) as clusters
    FROM gmm_probabilities
),
gmm_result AS (
    SELECT 
        t.transaction_id,
        t.is_fraud,
        c.cluster
    FROM (
        SELECT transaction_id, is_fraud, 
               ROW_NUMBER() OVER (ORDER BY transaction_id) as rn 
        FROM train_data
    ) t,
    gmm_clusters,
    LATERAL unnest(clusters) WITH ORDINALITY AS c(cluster, rn)
    WHERE t.rn = c.rn
)
SELECT 
    cluster,
    COUNT(*) as transactions,
    ROUND(100.0 * SUM(CASE WHEN is_fraud THEN 1 ELSE 0 END) / COUNT(*), 2) as fraud_rate
FROM gmm_result
GROUP BY cluster
ORDER BY fraud_rate DESC;`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* MINI-BATCH K-MEANS */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-green-400">Mini-batch K-means (Fast Clustering)</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4">Why Mini-batch K-means?</h3>
              <p className="text-gray-300 mb-4">
                <strong>3-5x faster</strong> than standard K-means on large datasets. Processes data in batches instead of all at once.
              </p>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Train Mini-batch K-means
WITH mb_clusters AS (
    SELECT cluster_minibatch_kmeans(
        'train_data',    -- Training table
        'features',      -- Feature column
        7,               -- Number of clusters
        50,              -- Max iterations
        100              -- Batch size
    ) as clusters
),
mb_result AS (
    SELECT 
        c.cluster,
        COUNT(*) as transactions
    FROM (
        SELECT ROW_NUMBER() OVER (ORDER BY transaction_id) as rn 
        FROM train_data
    ) t,
    mb_clusters,
    LATERAL unnest(clusters) WITH ORDINALITY AS c(cluster, rn)
    WHERE t.rn = c.rn
    GROUP BY c.cluster
)
SELECT * FROM mb_result ORDER BY cluster;

-- Performance: ~3-4 seconds on 1.2M rows
-- vs ~15-20 seconds for standard K-means`}</code>
              </pre>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4">Batch Size Impact</h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Test different batch sizes
-- Batch size = 50 (smaller batches, more updates)
SELECT array_length(
    cluster_minibatch_kmeans('train_data', 'features', 7, 30, 50), 1
);

-- Batch size = 200 (larger batches, fewer updates)
SELECT array_length(
    cluster_minibatch_kmeans('train_data', 'features', 7, 30, 200), 1
);

-- Recommendation: batch_size = 100 for best speed/quality tradeoff`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* HIERARCHICAL CLUSTERING */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-orange-400">Hierarchical Clustering</h2>
            
            <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-6 mb-6">
              <p className="text-orange-200">
                <strong>⚠️ Warning:</strong> O(n²) complexity - VERY SLOW on large datasets. Use only for exploratory analysis on small samples (&lt;10k rows).
              </p>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4">Linkage Methods</h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Use small sample due to O(n²) complexity
CREATE TEMP TABLE small_sample AS 
SELECT * FROM train_data LIMIT 1000;

-- Single linkage (minimum distance)
SELECT cluster_hierarchical('small_sample', 'features', 5, 'single');

-- Average linkage (recommended)
SELECT cluster_hierarchical('small_sample', 'features', 5, 'average');

-- Complete linkage (maximum distance)
SELECT cluster_hierarchical('small_sample', 'features', 5, 'complete');`}</code>
              </pre>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4">Performance Comparison</h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Complexity analysis:
-- 1k samples:   ~1 second
-- 2k samples:   ~4 seconds  (4x slower for 2x data)
-- 10k samples:  ~100 seconds (O(n²) confirmed)
-- 100k samples: ~2.7 hours (estimated)

-- Recommendation: Use K-means or Mini-batch K-means for production`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* DBSCAN */}
        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-cyan-400">DBSCAN (Density-Based Clustering)</h2>
            
            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 mb-6">
              <h3 className="text-xl font-semibold mb-4">What Makes DBSCAN Different?</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                <li>Automatically detects number of clusters</li>
                <li>Identifies noise points (outliers)</li>
                <li>Finds clusters of arbitrary shape</li>
                <li>No need to specify K in advance</li>
              </ul>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- Run DBSCAN clustering
CREATE TEMP TABLE dbscan_results AS
SELECT 
    id,
    features,
    cluster_dbscan(
        'dbscan_data',   -- Table name
        'features',      -- Feature column
        5.0,             -- eps: Maximum distance between neighbors
        10,              -- min_points: Minimum points to form cluster
        id               -- Point ID
    ) as cluster_id
FROM dbscan_data;

-- Analyze results
SELECT 
    CASE 
        WHEN cluster_id = -1 THEN 'NOISE'
        ELSE 'Cluster ' || cluster_id
    END as cluster_label,
    COUNT(*) as point_count,
    ROUND(100.0 * COUNT(*) / (SELECT COUNT(*) FROM dbscan_results), 2) as percentage
FROM dbscan_results
GROUP BY cluster_id
ORDER BY CASE WHEN cluster_id = -1 THEN 999999 ELSE cluster_id END;

-- cluster_id = -1 means noise/outlier
-- cluster_id >= 0 means valid cluster`}</code>
              </pre>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4">Parameter Tuning</h3>
              <pre className="bg-black/50 p-4 rounded overflow-x-auto">
                <code className="text-sm text-gray-300">{`-- eps (epsilon): Maximum distance between two points to be neighbors
--   - Too small: Many small clusters + noise
--   - Too large: All points in one cluster
--   - Start with: average distance to k-nearest neighbors

-- min_points: Minimum points to form a dense region
--   - Rule of thumb: min_points = 2 × dimensions
--   - For 3D data: min_points ≥ 6
--   - Higher values = fewer, denser clusters`}</code>
              </pre>
            </div>
          </section>
        </div>

        {/* COMPLETE DEMO FILES */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Code className="w-6 h-6 text-purple-400" />
            Complete Demo SQL Files
          </h2>
          <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
            <ul className="space-y-2 text-gray-300">
              <li><code className="text-green-400">/Users/pgedge/pge/NeurondB/demo/ML/sql/002_kmeans_clustering.sql</code></li>
              <li><code className="text-green-400">/Users/pgedge/pge/NeurondB/demo/ML/sql/003_gmm_clustering.sql</code></li>
              <li><code className="text-green-400">/Users/pgedge/pge/NeurondB/demo/ML/sql/004_minibatch_kmeans.sql</code></li>
              <li><code className="text-green-400">/Users/pgedge/pge/NeurondB/demo/ML/sql/006_hierarchical_clustering.sql</code></li>
              <li><code className="text-green-400">/Users/pgedge/pge/NeurondB/demo/ML/sql/017_dbscan.sql</code></li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
