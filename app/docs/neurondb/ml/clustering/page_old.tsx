export const metadata = {
  title: 'NeuronDB · Clustering (K-means, GMM, Hierarchical, DBSCAN)',
  description: 'Cluster large datasets directly in PostgreSQL using NeuronDB. Includes K-means, GMM, Mini-batch K-means, Hierarchical, and DBSCAN with training, evaluation, and deployment.',
}

import React from 'react'
import Link from 'next/link'
import { GitBranch, Layers, Target, BarChart3, Rocket, ArrowRight } from 'lucide-react'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

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
              <GitBranch className="w-9 h-9 text-cyan-300" /> Clustering in SQL
            </h1>
            <p className="text-white/80 text-lg mb-8">Group similar data points at scale without leaving PostgreSQL. Train, compare and deploy clustering models with NeuronDB's in-database ML.</p>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-6 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2"><Layers className="w-6 h-6 text-indigo-300"/> Prerequisite: Demo Dataset</h2>
              <p className="text-white/80 mb-4">Generate the sample fraud-detection dataset used in these examples (~1.5M rows):</p>
              <div className="bg-slate-900/80 rounded-lg p-4">
                <SqlCodeBlock
                  title="Generate dataset"
                  code={`-- Run in psql
\\i './demo/ML/sql/001_generate_dataset.sql'`}
                />
                <a
                  href="https://github.com/pgElephant/NeurondB/blob/main/demo/ML/sql/001_generate_dataset.sql"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center text-sm text-cyan-300 hover:text-cyan-200"
                >
                  📄 View 001_generate_dataset.sql on GitHub
                </a>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-6 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2"><Target className="w-6 h-6 text-cyan-300"/> K-means (K=7)</h2>
              <p className="text-white/80 mb-4">Train multiple K values, compare, and deploy the best version.</p>
              <div className="bg-slate-900/80 rounded-lg p-4 mb-4">
                <SqlCodeBlock
                  title="K-means training"
                  code={`-- K-means training, comparison and deployment
\\i './demo/ML/sql/002_kmeans_clustering.sql'`}
                />
                <a
                  href="https://github.com/pgElephant/NeurondB/blob/main/demo/ML/sql/002_kmeans_clustering.sql"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center text-sm text-cyan-300 hover:text-cyan-200"
                >
                  📄 View 002_kmeans_clustering.sql on GitHub
                </a>
              </div>
              <p className="text-white/70">Highlights: project tracking, multiple versions, evaluation on test split, and deployment with <code className="bg-slate-800 px-1 rounded">neurondb_deploy_model()</code>.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-6">
                <h3 className="text-xl font-semibold text-white mb-3">GMM (Gaussian Mixture)</h3>
                <p className="text-white/70 mb-3">Soft clustering with cluster membership probabilities.</p>
                <div className="bg-slate-900/80 rounded-lg p-4">
                  <SqlCodeBlock
                    title="Gaussian Mixture Models"
                    code={`-- Try Gaussian Mixture Models
\\i './demo/ML/sql/003_gmm_clustering.sql'`}
                  />
                  <a
                    href="https://github.com/pgElephant/NeurondB/blob/main/demo/ML/sql/003_gmm_clustering.sql"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center text-sm text-cyan-300 hover:text-cyan-200"
                  >
                    📄 View 003_gmm_clustering.sql on GitHub
                  </a>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Mini-batch K-means</h3>
                <p className="text-white/70 mb-3">Faster, streaming-friendly variant for large datasets.</p>
                <div className="bg-slate-900/80 rounded-lg p-4">
                  <SqlCodeBlock
                    title="Mini-batch K-means"
                    code={`\\i './demo/ML/sql/004_minibatch_kmeans.sql'`}
                  />
                  <a
                    href="https://github.com/pgElephant/NeurondB/blob/main/demo/ML/sql/004_minibatch_kmeans.sql"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center text-sm text-cyan-300 hover:text-cyan-200"
                  >
                    📄 View 004_minibatch_kmeans.sql on GitHub
                  </a>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Hierarchical Clustering</h3>
                <p className="text-white/70 mb-3">Tree-based grouping for exploratory analysis.</p>
                <div className="bg-slate-900/80 rounded-lg p-4">
                  <SqlCodeBlock
                    title="Hierarchical clustering"
                    code={`\\i './demo/ML/sql/006_hierarchical_clustering.sql'`}
                  />
                  <a
                    href="https://github.com/pgElephant/NeurondB/blob/main/demo/ML/sql/006_hierarchical_clustering.sql"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center text-sm text-cyan-300 hover:text-cyan-200"
                  >
                    📄 View 006_hierarchical_clustering.sql on GitHub
                  </a>
                </div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-6">
                <h3 className="text-xl font-semibold text-white mb-3">DBSCAN (Density-Based)</h3>
                <p className="text-white/70 mb-3">Find clusters of varying shapes, detect outliers.</p>
                <div className="bg-slate-900/80 rounded-lg p-4">
                  <SqlCodeBlock
                    title="DBSCAN clustering"
                    code={`\\i './demo/ML/sql/017_dbscan.sql'`}
                  />
                  <a
                    href="https://github.com/pgElephant/NeurondB/blob/main/demo/ML/sql/017_dbscan.sql"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center text-sm text-cyan-300 hover:text-cyan-200"
                  >
                    📄 View 017_dbscan.sql on GitHub
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-6">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2"><BarChart3 className="w-6 h-6 text-emerald-300"/> Outlier Detection</h2>
              <p className="text-white/80 mb-4">Identify anomalous transactions in unsupervised fashion.</p>
              <div className="bg-slate-900/80 rounded-lg p-4">
                <SqlCodeBlock
                  title="Outlier detection"
                  code={`\\i './demo/ML/sql/005_outlier_detection.sql'`}
                />
                <a
                  href="https://github.com/pgElephant/NeurondB/blob/main/demo/ML/sql/005_outlier_detection.sql"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center text-sm text-cyan-300 hover:text-cyan-200"
                >
                  📄 View 005_outlier_detection.sql on GitHub
                </a>
              </div>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-400/20 rounded-xl p-6 mt-8">
              <div className="flex items-start gap-3">
                <Rocket className="w-6 h-6 text-cyan-300 mt-1" />
                <div>
                  <h3 className="text-white font-semibold mb-2">Tip: Compare Algorithms Quickly</h3>
                  <p className="text-white/80">Use <code className="bg-slate-800 px-1 rounded">007_complete_comparison.sql</code> to run a side-by-side comparison across clustering methods and pick the best for your data.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
