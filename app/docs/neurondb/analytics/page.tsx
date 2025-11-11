'use client'

import Link from 'next/link'
import { BarChart3, ArrowRight, CheckCircle } from 'lucide-react'
import DocsContentLayout from '../../../../components/DocsContentLayout'
import { NeurondBIcon } from '../../../../components/ProductIcons'

export default function NeuronDBAnalyticsPage() {
  return (
    <DocsContentLayout
      hero={{
        badgeLabel: 'NeurondB',
        badgeIcon: <NeurondBIcon size={20} />, 
        badgeTone: 'emerald',
        title: 'ML Analytics Suite',
        description:
          'Comprehensive machine learning algorithms for clustering, dimensionality reduction, outlier detection, and embedding quality assessment — all in SQL.',
      }}
      contentWidth="default"
    >
      <div className="space-y-16">
        {/* Clustering */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8">Clustering Algorithms</h2>

          {/* K-Means */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8 mb-6">
            <h3 className="text-2xl font-bold text-emerald-300 mb-4">K-Means Clustering</h3>
            <p className="text-white/80 mb-6">
              Lloyd&apos;s K-Means with k-means++ initialization for finding customer segments, topic clusters, and data grouping.
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
              <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
                <div className="text-lg font-bold text-blue-400 mb-1">Project Models</div>
                <div className="text-xs text-white/60">Versioned training runs</div>
              </div>
            </div>
          </div>

          {/* DBSCAN */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
            <h3 className="text-2xl font-bold text-emerald-300 mb-4">DBSCAN</h3>
            <p className="text-white/80 mb-6">
              Density-based clustering for arbitrary shapes. Automatically detects noise while grouping dense regions.
            </p>
            <div className="bg-slate-900/50 rounded-lg p-6 mb-4">
              <pre className="text-sm overflow-x-auto"><code className="text-green-300">
{`
SELECT *
FROM cluster_dbscan(
  relation      => 'train_data',
  column_name   => 'features',
  eps           => 0.35,
  min_samples   => 12,
  distance      => 'cosine'
);`}
              </code></pre>
            </div>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                <span>No need to specify cluster count — DBSCAN finds density-based groupings.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                <span>Detect and label outliers; store them for anomaly review with <code className="text-white">is_noise</code>.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                <span>Supports cosine, L2, and inner product distances.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Dimensionality Reduction */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8">Dimensionality Reduction</h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
            <h3 className="text-2xl font-bold text-emerald-300 mb-4">PCA & t-SNE</h3>
            <p className="text-white/80 mb-6">
              Reduce high-dimensional embeddings to tractable sizes for visualization, indexing, or compression.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-900/50 rounded-lg p-6">
                <pre className="text-sm overflow-x-auto"><code className="text-green-300">
{`
SELECT *
FROM neurondb_pca(
  relation    => 'vector_store',
  column_name => 'embedding',
  components  => 128
);`}
                </code></pre>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-6">
                <pre className="text-sm overflow-x-auto"><code className="text-green-300">
{`
SELECT *
FROM neurondb_tsne(
  relation    => 'vector_store',
  column_name => 'embedding',
  perplexity  => 30,
  iterations  => 1000
);`}
                </code></pre>
              </div>
            </div>
          </div>
        </div>

        {/* Embedding Quality */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8">Embedding Quality Checks</h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-8">
            <p className="text-white/80 mb-6">
              Built-in diagnostics to track drift, coverage, and retrieval performance over time.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-900/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-emerald-300 mb-3">Drift Monitoring</h3>
                <pre className="text-sm overflow-x-auto"><code className="text-green-300">
{`
SELECT *
FROM neurondb_embedding_drift(
  relation    => 'vector_store',
  column_name => 'embedding',
  window_days => 30
);`}
                </code></pre>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-emerald-300 mb-3">Nearest Neighbor Quality</h3>
                <pre className="text-sm overflow-x-auto"><code className="text-green-300">
{`
SELECT *
FROM neurondb_recall_benchmark(
  relation     => 'vector_store',
  column_name  => 'embedding',
  metric       => 'cosine',
  k_candidates => 100
);`}
                </code></pre>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-emerald-500/20 via-teal-500/15 to-cyan-500/20 rounded-xl border border-emerald-500/30 p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Continue Building</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/docs/neurondb/ml/inference" className="flex items-center gap-3 rounded-lg bg-white/10 p-4 transition hover:bg-white/20">
              <NeurondBIcon size={20} />
              <div>
                <div className="font-semibold text-white">Model Inference</div>
                <div className="text-sm text-white/60">Serve ONNX models inside PostgreSQL</div>
              </div>
              <ArrowRight className="w-5 h-5 text-white/40 ml-auto" />
            </Link>
            <Link href="/docs/neurondb/background-workers" className="flex items-center gap-3 rounded-lg bg-white/10 p-4 transition hover:bg-white/20">
              <BarChart3 className="w-5 h-5 text-emerald-300" />
              <div>
                <div className="font-semibold text-white">Background Workers</div>
                <div className="text-sm text-white/60">Automate embedding quality and retraining</div>
              </div>
              <ArrowRight className="w-5 h-5 text-white/40 ml-auto" />
            </Link>
          </div>
        </div>
      </div>
    </DocsContentLayout>
  )
}

