export const metadata = {
  title: 'NeuronDB · Classification (Logistic, KNN, SVM, Trees, RF, Naive Bayes)',
  description: 'Binary and multi-class classification in PostgreSQL using NeuronDB. Train, evaluate, and deploy models entirely in SQL.'
}

import React from 'react'
import Link from 'next/link'
import { Target, Gauge, LineChart, ArrowRight } from 'lucide-react'

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
              <Target className="w-9 h-9 text-rose-300" /> Classification in SQL
            </h1>
            <p className="text-white/80 text-lg mb-8">Train fraud detection and other classifiers with NeuronDB, fully in-database.</p>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-6 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Logistic Regression (Binary)</h2>
              <p className="text-white/80 mb-4">End-to-end training, metrics, threshold tuning, and model recording.</p>
              <div className="bg-slate-900/80 rounded-lg p-4 mb-4">
                <pre className="text-green-400 font-mono text-sm overflow-x-auto">{
`-- Train, evaluate and record logistic regression
\i /Users/pgedge/pge/NeurondB/demo/ML/sql/009_logistic_regression.sql`
                }</pre>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-white/80 text-sm">Metrics reported: Accuracy, Precision, Recall, F1, LogLoss. Includes threshold sweep and sample predictions with probabilities.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-6">
                <h3 className="text-xl font-semibold text-white mb-3">K-Nearest Neighbors (KNN)</h3>
                <pre className="bg-slate-900/80 p-4 rounded text-green-400 text-sm overflow-x-auto">{`\i /Users/pgedge/pge/NeurondB/demo/ML/sql/010_knn.sql`}</pre>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Decision Trees</h3>
                <pre className="bg-slate-900/80 p-4 rounded text-green-400 text-sm overflow-x-auto">{`\i /Users/pgedge/pge/NeurondB/demo/ML/sql/011_decision_tree.sql`}</pre>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Naive Bayes</h3>
                <pre className="bg-slate-900/80 p-4 rounded text-green-400 text-sm overflow-x-auto">{`\i /Users/pgedge/pge/NeurondB/demo/ML/sql/012_naive_bayes.sql`}</pre>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Support Vector Machines (SVM)</h3>
                <pre className="bg-slate-900/80 p-4 rounded text-green-400 text-sm overflow-x-auto">{`\i /Users/pgedge/pge/NeurondB/demo/ML/sql/013_svm.sql`}</pre>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-6 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Random Forest</h2>
              <pre className="bg-slate-900/80 p-4 rounded text-green-400 text-sm overflow-x-auto">{`\i /Users/pgedge/pge/NeurondB/demo/ML/sql/016_random_forest.sql`}</pre>
            </div>

            <div className="bg-rose-500/10 border border-rose-400/20 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Gauge className="w-6 h-6 text-rose-300 mt-1" />
                <div>
                  <h3 className="text-white font-semibold mb-2">Model Management</h3>
                  <p className="text-white/80">Every trained model can be recorded into <code className="bg-slate-800 px-1 rounded">neurondb.ml_models</code> with metrics and parameters for future comparisons and deployment.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
