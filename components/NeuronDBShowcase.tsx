'use client'

import React from 'react'
import Link from 'next/link'
import { Brain, Database, Zap, Search, Cpu, Shield, BarChart3, Activity, CheckCircle } from 'lucide-react'

const NeuronDBShowcase = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden" style={{ backgroundColor: '#1f2937' }}>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-full mb-6 backdrop-blur-sm">
            <Brain className="w-6 h-6 text-indigo-400 animate-pulse" />
            <span className="text-indigo-400 font-semibold text-sm">NeurondB - AI Database Extension</span>
            <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI Database Extension
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-4">
            Add vector search, machine learning inference, hybrid retrieval, and RAG pipeline support to PostgreSQL.
          </p>
          <p className="text-lg text-indigo-300 max-w-2xl mx-auto">
            Built with PostgreSQL C standards. Zero external dependencies.
          </p>
        </div>

        {/* Core Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Vector Search */}
          <div className="group bg-gradient-to-br from-amber-900/20 to-orange-900/20 border border-amber-500/30 rounded-xl p-6 hover:border-amber-500/60 transition-all hover:scale-105 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-500/20 rounded-lg group-hover:bg-amber-500/30 transition-colors">
                <Search className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Vector Search</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span>HNSW + IVF indexing</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span>10+ distance metrics</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span>Up to 32x compression</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span>Sub-ms search on millions</span>
              </li>
            </ul>
          </div>

          {/* ML & Embeddings */}
          <div className="group bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl p-6 hover:border-green-500/60 transition-all hover:scale-105 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors">
                <Cpu className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-white">ML & Embeddings</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>ONNX runtime integration</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Text/image/multimodal</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Batch processing (5x)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Automatic model caching</span>
              </li>
            </ul>
          </div>

          {/* Hybrid Search & RAG */}
          <div className="group bg-gradient-to-br from-purple-900/20 to-violet-900/20 border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/60 transition-all hover:scale-105 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                <Database className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Hybrid & RAG</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span>Semantic + FTS (BM25)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span>Cross-encoder reranking</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span>Complete RAG pipeline</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span>LLM integration ready</span>
              </li>
            </ul>
          </div>

          {/* GPU Acceleration */}
          <div className="group bg-gradient-to-br from-red-900/20 to-rose-900/20 border border-red-500/30 rounded-xl p-6 hover:border-red-500/60 transition-all hover:scale-105 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-500/20 rounded-lg group-hover:bg-red-500/30 transition-colors">
                <Zap className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-lg font-bold text-white">GPU Acceleration</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span>CUDA/ROCm support</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span>100x speedup (batch ops)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span>K-means clustering (23x)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <span>Auto CPU fallback</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Advanced Features */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Advanced Enterprise Features
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* ML Analytics */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-6 h-6 text-blue-400" />
                <h4 className="text-lg font-semibold text-white">ML Analytics Suite</h4>
              </div>
              <p className="text-sm text-slate-300">
                K-means and Mini-batch K-means clustering with CPU & GPU support. DBSCAN density-based clustering. 
                PCA and OPQ dimensionality reduction. Isolation Forest for outlier detection. 
                Davies-Bouldin quality metrics and drift detection.
              </p>
            </div>

            {/* Background Workers */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="w-6 h-6 text-green-400" />
                <h4 className="text-lg font-semibold text-white">Background Workers</h4>
              </div>
              <p className="text-sm text-slate-300">
                neuranq: Async job queue with SKIP LOCKED, rate limits, and poison job handling. 
                neuranmon: Auto-tuner adjusting search params from SLOs and cache rotation. 
                neurandefrag: Index compaction, re-leveling, and rebuild scheduling.
              </p>
            </div>

            {/* Enterprise Security */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-purple-400" />
                <h4 className="text-lg font-semibold text-white">Enterprise Security</h4>
              </div>
              <p className="text-sm text-slate-300">
                Vector encryption with AES-GCM via OpenSSL. Differential privacy for embeddings. 
                Row-level security (RLS) integration. HMAC-SHA256 signed results. 
                Audit logging with tamper detection and GDPR-compliant data handling.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default NeuronDBShowcase

