import React from 'react';
import ProjectTemplate from '../_components/ProjectTemplate';
import NeurondBDemoTerminal from '@/components/NeurondBDemoTerminal';
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
  demo: <NeurondBDemoTerminal />,
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
  featureComparison: (
    <table className="w-full text-sm border border-slate-700 rounded-lg overflow-hidden">
      <thead className="bg-slate-800/60">
        <tr className="text-left">
          <th className="px-4 py-3 font-semibold text-white">Feature</th>
          <th className="px-4 py-3 font-semibold text-white">NeurondB</th>
          <th className="px-4 py-3 font-semibold text-white">pgvector</th>
          <th className="px-4 py-3 font-semibold text-white">pgvectorscale</th>
          <th className="px-4 py-3 font-semibold text-white">pgai</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-700 bg-slate-800/40">
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Vector Indexing</td>
          <td className="px-4 py-3 text-green-400">HNSW + IVF</td>
          <td className="px-4 py-3 text-green-400">HNSW + IVF</td>
          <td className="px-4 py-3 text-green-400">StreamingDiskANN</td>
          <td className="px-4 py-3 text-red-300">No (uses pgvector)</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">ML Inference</td>
          <td className="px-4 py-3 text-green-400">ONNX Runtime</td>
          <td className="px-4 py-3 text-red-300">None</td>
          <td className="px-4 py-3 text-red-300">None</td>
          <td className="px-4 py-3 text-green-400">OpenAI/Ollama API</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Embedding Generation</td>
          <td className="px-4 py-3 text-green-400">In-database</td>
          <td className="px-4 py-3 text-red-300">External</td>
          <td className="px-4 py-3 text-red-300">External</td>
          <td className="px-4 py-3 text-yellow-300">External API</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">Hybrid Search</td>
          <td className="px-4 py-3 text-green-400">Native (Vector+FTS)</td>
          <td className="px-4 py-3 text-yellow-300">Manual</td>
          <td className="px-4 py-3 text-yellow-300">Manual</td>
          <td className="px-4 py-3 text-yellow-300">Manual</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Reranking</td>
          <td className="px-4 py-3 text-green-400">Cross-encoder, LLM, ColBERT</td>
          <td className="px-4 py-3 text-red-300">None</td>
          <td className="px-4 py-3 text-red-300">None</td>
          <td className="px-4 py-3 text-red-300">None</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">Background Workers</td>
          <td className="px-4 py-3 text-green-400">Queue, Tuner, Defrag</td>
          <td className="px-4 py-3 text-red-300">None</td>
          <td className="px-4 py-3 text-red-300">None</td>
          <td className="px-4 py-3 text-red-300">None</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">RAG Pipeline</td>
          <td className="px-4 py-3 text-green-400">Complete In-DB</td>
          <td className="px-4 py-3 text-red-300">None</td>
          <td className="px-4 py-3 text-red-300">None</td>
          <td className="px-4 py-3 text-yellow-300">Partial (API calls)</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">Quantization</td>
          <td className="px-4 py-3 text-green-400">2x-32x (FP16, INT8, Binary)</td>
          <td className="px-4 py-3 text-yellow-300">Binary only</td>
          <td className="px-4 py-3 text-yellow-300">Binary only</td>
          <td className="px-4 py-3 text-red-300">None</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Analytics</td>
          <td className="px-4 py-3 text-green-400">Clustering, PCA, UMAP, Outliers</td>
          <td className="px-4 py-3 text-red-300">None</td>
          <td className="px-4 py-3 text-red-300">None</td>
          <td className="px-4 py-3 text-red-300">None</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">Multi-Tenancy</td>
          <td className="px-4 py-3 text-green-400">Tenant isolation + quotas</td>
          <td className="px-4 py-3 text-red-300">Manual</td>
          <td className="px-4 py-3 text-red-300">Manual</td>
          <td className="px-4 py-3 text-red-300">Manual</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Auto-Tuning</td>
          <td className="px-4 py-3 text-green-400">Background worker</td>
          <td className="px-4 py-3 text-red-300">None</td>
          <td className="px-4 py-3 text-red-300">None</td>
          <td className="px-4 py-3 text-red-300">None</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">PostgreSQL Versions</td>
          <td className="px-4 py-3 text-green-400">16, 17, 18</td>
          <td className="px-4 py-3 text-green-400">12-18</td>
          <td className="px-4 py-3 text-yellow-300">15-18</td>
          <td className="px-4 py-3 text-yellow-300">16-18</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">License</td>
          <td className="px-4 py-3 text-green-400">Apache 2.0</td>
          <td className="px-4 py-3 text-green-400">PostgreSQL</td>
          <td className="px-4 py-3 text-yellow-300">Timescale License</td>
          <td className="px-4 py-3 text-green-400">PostgreSQL</td>
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

