export const metadata = {
  title: 'NeuronDB · Regression (Linear, Ridge, Lasso)',
  description: 'Train and evaluate regression models in PostgreSQL using NeuronDB: Linear Regression and regularized (Ridge/Lasso) variants.'
}

import React from 'react'
import Link from 'next/link'
import { TrendingUp, Ruler, ArrowRight } from 'lucide-react'

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
              <TrendingUp className="w-9 h-9 text-emerald-300" /> Regression in SQL
            </h1>
            <p className="text-white/80 text-lg mb-8">Predict continuous values fully in-database. Evaluate with R², MSE, MAE, RMSE.</p>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-6 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Linear Regression</h2>
              <div className="bg-slate-900/80 rounded-lg p-4 mb-4">
                <pre className="text-green-400 font-mono text-sm overflow-x-auto">{
`-- Train, evaluate and record linear regression
\i /Users/pgedge/pge/NeurondB/demo/ML/sql/008_linear_regression.sql`
                }</pre>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-6 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2"><Ruler className="w-6 h-6 text-emerald-300"/> Ridge & Lasso (Regularization)</h2>
              <p className="text-white/80 mb-3">Use L2 (Ridge) or L1 (Lasso) penalties to reduce overfitting.</p>
              <pre className="bg-slate-900/80 p-4 rounded text-green-400 text-sm overflow-x-auto">{`\i /Users/pgedge/pge/NeurondB/demo/ML/sql/014_ridge_lasso.sql`}</pre>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
