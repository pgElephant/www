import React from 'react';
import ProjectTemplate from '../_components/ProjectTemplate';
import { Brain, Database, Zap, Search, Cpu, Shield, BarChart3, Layers } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NeurondB - Advanced AI Database Extension for PostgreSQL | Vector Search & ML Inference',
  description: 'Production-grade PostgreSQL extension for vector search, machine learning inference, hybrid retrieval, and complete RAG pipelines. Built with PostgreSQL C standards, featuring HNSW indexing, embedding generation, cross-encoder reranking, and background workers.',
  keywords: 'NeurondB, PostgreSQL, vector database, AI database, machine learning, embeddings, HNSW, hybrid search, RAG, semantic search, vector search, ML inference, PostgreSQL extension',
  openGraph: {
    title: 'NeurondB - Advanced AI Database Extension for PostgreSQL',
    description: 'Production-grade vector search, machine learning, and hybrid search—directly in PostgreSQL.',
    type: 'website',
    url: 'https://www.pgelephant.com/neurondb',
    siteName: 'pgElephant',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeurondB - Advanced AI Database Extension for PostgreSQL',
    description: 'Production-grade vector search, machine learning, and hybrid search—directly in PostgreSQL.',
  },
  alternates: {
    canonical: 'https://www.pgelephant.com/neurondb',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Custom NeurondB icon component
const NeurondBIcon = ({ size = 80 }: { size?: number }) => (
  <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
    <Brain className="text-indigo-400 animate-pulse" style={{ width: size * 0.7, height: size * 0.7 }} />
    <Database className="text-teal-400 absolute -bottom-2 -right-2 animate-bounce" style={{ width: size * 0.35, height: size * 0.35, animationDelay: '0.5s' }} />
    <Zap className="text-yellow-400 absolute -top-2 -left-2 animate-pulse" style={{ width: size * 0.3, height: size * 0.3, animationDelay: '1s' }} />
    <Search className="text-purple-400 absolute -top-2 -right-2 animate-pulse" style={{ width: size * 0.25, height: size * 0.25, animationDelay: '1.5s' }} />
  </div>
)

const neurondbConfig = {
  hero: {
    title: 'NeurondB: Advanced AI Database Extension for PostgreSQL',
    subtitle: 'Production-grade vector search, machine learning inference, hybrid retrieval, and complete RAG pipeline support—all within PostgreSQL',
    projectName: 'neurondb',
    icon: <NeurondBIcon size={80} />,
  },
  badges: [
    'PostgreSQL 16-18',
    'Vector Search',
    'ML Inference',
    'HNSW Indexing',
    'Hybrid Search',
    'RAG Pipeline',
  ],
  demo: (
    <div className="bg-slate-900 rounded-lg p-6 font-mono text-sm text-green-400 overflow-x-auto">
      <div className="mb-4">
        <span className="text-slate-400">$</span> psql -d mydb
      </div>
      <div className="mb-4">
        <span className="text-blue-400">mydb=#</span> CREATE EXTENSION neurondb;
      </div>
      <div className="text-green-300 mb-4">CREATE EXTENSION</div>
      <div className="mb-4">
        <span className="text-blue-400">mydb=#</span> CREATE TABLE docs (
      </div>
      <div className="ml-4 mb-4">
        id SERIAL, content TEXT, embedding vector(384)
      </div>
      <div className="mb-4">);</div>
      <div className="mb-4">
        <span className="text-blue-400">mydb=#</span> INSERT INTO docs VALUES
      </div>
      <div className="ml-4 mb-4">
        (1, 'AI overview', embed_text('AI overview'));
      </div>
      <div className="text-green-300 mb-4">INSERT 0 1</div>
      <div className="mb-4">
        <span className="text-blue-400">mydb=#</span> SELECT * FROM hybrid_search(
      </div>
      <div className="ml-4 mb-2">
        'docs', embed_text('machine learning'), 'ML', '{}', 0.7, 10
      </div>
      <div className="mb-4">);</div>
      <div className="text-green-300">id | content | score</div>
      <div className="text-green-300">1 | AI overview | 0.92</div>
    </div>
  ),
  featurePillars: {
    kicker: 'Key Features',
    items: [
      { title: 'Vector Search & Indexing', desc: 'Multiple vector types (float32, float16, int8, binary), 10+ distance metrics, HNSW and IVF indexing with automatic tuning, 2x-32x quantization.' },
      { title: 'ML & Embeddings', desc: 'Text, image, and multimodal embedding generation with caching. ONNX runtime for model inference, batch processing, and fine-tuning support.' },
      { title: 'Hybrid Search', desc: 'Combine vector and full-text search with weighted scoring. Multi-vector support, faceted search, and temporal decay for relevance.' },
      { title: 'Reranking', desc: 'Cross-encoder reranking, LLM-powered scoring (GPT/Claude), ColBERT late interaction models, and ensemble strategies.' },
      { title: 'RAG Pipeline', desc: 'Complete Retrieval Augmented Generation pipeline in-database. Document processing, retrieval, generation, and best practices.' },
      { title: 'Background Workers', desc: 'neuranq (async job queue), neuranmon (auto-tuner), neurandefrag (index maintenance). Production-ready with tenant isolation.' },
      { title: 'Analytics', desc: 'K-means and DBSCAN clustering, PCA/UMAP dimensionality reduction, outlier detection, and embedding quality metrics.' },
      { title: 'Performance & Security', desc: 'SIMD-optimized operations, intelligent query planning, encryption, differential privacy, row-level security, and comprehensive monitoring.' },
      { title: 'PostgreSQL Native', desc: 'Built with PostgreSQL C coding standards. Pure SQL interface, 100+ functions, PostgreSQL 16-18 compatible.' },
    ],
  },
  featureMatrix: (
    <table className="w-full text-sm border border-slate-700 rounded-lg overflow-hidden">
      <thead className="bg-slate-800/60">
        <tr className="text-left">
          <th className="px-4 py-3 font-semibold text-white">Capability</th>
          <th className="px-4 py-3 font-semibold text-white">Description</th>
          <th className="px-4 py-3 font-semibold text-white">Performance</th>
          <th className="px-4 py-3 font-semibold text-white">Production Ready</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-700 bg-slate-800/40">
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Vector Search</td>
          <td className="px-4 py-3 text-slate-300">HNSW indexing, multiple distance metrics, quantization</td>
          <td className="px-4 py-3 text-slate-300">Sub-millisecond on millions</td>
          <td className="px-4 py-3 text-green-400">✓</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">ML Inference</td>
          <td className="px-4 py-3 text-slate-300">ONNX runtime, batch processing, embedding generation</td>
          <td className="px-4 py-3 text-slate-300">High-throughput batch ops</td>
          <td className="px-4 py-3 text-green-400">✓</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Hybrid Search</td>
          <td className="px-4 py-3 text-slate-300">Vector + FTS, multi-vector, faceted, temporal</td>
          <td className="px-4 py-3 text-slate-300">Optimized query planning</td>
          <td className="px-4 py-3 text-green-400">✓</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">Reranking</td>
          <td className="px-4 py-3 text-slate-300">Cross-encoder, LLM, ColBERT, ensemble</td>
          <td className="px-4 py-3 text-slate-300">GPU-accelerated support</td>
          <td className="px-4 py-3 text-green-400">✓</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Background Workers</td>
          <td className="px-4 py-3 text-slate-300">Queue executor, auto-tuner, index maintenance</td>
          <td className="px-4 py-3 text-slate-300">Non-blocking async ops</td>
          <td className="px-4 py-3 text-green-400">✓</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">RAG Pipeline</td>
          <td className="px-4 py-3 text-slate-300">Complete in-database RAG with document processing</td>
          <td className="px-4 py-3 text-slate-300">End-to-end optimization</td>
          <td className="px-4 py-3 text-green-400">✓</td>
        </tr>
      </tbody>
    </table>
  ),
  ctaSection: {
    kicker: 'Get Started',
    title: 'Transform PostgreSQL into an AI Database',
    description: 'Install NeurondB and start building semantic search, RAG applications, and ML-powered features—all within your existing PostgreSQL infrastructure.',
    primaryCTA: { href: '/docs/neurondb/getting-started', label: 'View Documentation' },
    secondaryCTA: { href: 'https://github.com/pgElephant/NeurondB', label: 'View on GitHub', external: true },
  },
};

export default function NeurondBPage() {
  return <ProjectTemplate {...neurondbConfig} />;
}

