export const metadata = {
  title: 'NeuronDB · RAG Pipeline (Chunk → Embed → Rank → Transform)',
  description: 'Build retrieval-augmented generation pipelines directly in PostgreSQL with NeuronDB utilities for chunking, embedding, ranking and transformations.'
}

import React from 'react'
import Link from 'next/link'
import { BookOpen, Sparkles, ArrowRight } from 'lucide-react'

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
              <BookOpen className="w-9 h-9 text-indigo-300" /> RAG Pipeline
            </h1>
            <p className="text-white/80 text-lg mb-8">Chunk long text, embed with GPU support, rerank results and apply transformations — all in SQL.</p>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-slate-400/30 p-6 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">End-to-End RAG Demo</h2>
              <div className="bg-slate-900/80 rounded-lg p-4 mb-4">
                <pre className="text-green-400 font-mono text-sm overflow-x-auto">{
`-- Chunk → Embed → Rank → Transform → End-to-End
\i /Users/pgedge/pge/NeurondB/demo/ML/sql/019_rag_pipeline.sql`
                }</pre>
              </div>
              <ul className="text-white/80 list-disc pl-6 space-y-2">
                <li><code className="bg-slate-800 px-1 rounded">neurondb.chunk(text, size, overlap)</code> — overlap-aware chunking</li>
                <li><code className="bg-slate-800 px-1 rounded">neurondb.embed(model, text, use_gpu)</code> — text embeddings with optional GPU</li>
                <li><code className="bg-slate-800 px-1 rounded">neurondb.rank(query, docs, 'bm25')</code> — reranking</li>
                <li><code className="bg-slate-800 px-1 rounded">neurondb.transform(kind, data)</code> — normalize, standardize, min-max</li>
              </ul>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
