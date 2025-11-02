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
    kicker: 'Comprehensive AI Database Features',
    items: [
      { 
        title: 'Vector Search & Indexing', 
        desc: 'Production-grade vector types (float32, float16, int8, binary, sparse). HNSW and IVF indexing with automatic parameter tuning. 10+ distance metrics including L2, Cosine, Inner Product, Manhattan, Hamming. 2x-32x compression with minimal accuracy loss.' 
      },
      { 
        title: 'ML & Embeddings', 
        desc: 'Built-in text, image, and multimodal embedding generation with automatic caching. ONNX runtime integration for custom models. Batch processing with 5x throughput. Fine-tuning support for domain adaptation. Models: all-MiniLM-L6-v2, BERT, CLIP.' 
      },
      { 
        title: 'Hybrid Search & Retrieval', 
        desc: 'Combine vector similarity with full-text search (BM25). Weighted scoring (70% vector + 30% text). Multi-vector documents. Faceted search with category filters. Temporal decay for time-sensitive relevance. Optimal for real-world search scenarios.' 
      },
      { 
        title: 'Advanced Reranking', 
        desc: 'Cross-encoder neural reranking for precision improvement. LLM-powered scoring (GPT-4, Claude). ColBERT late interaction models. MMR (Maximal Marginal Relevance) for diversity. Ensemble strategies combining multiple rankers. Sub-10ms latency.' 
      },
      { 
        title: 'Complete RAG Pipeline', 
        desc: 'End-to-end Retrieval Augmented Generation in PostgreSQL. Document chunking and processing. Semantic retrieval with reranking. LLM integration for answer generation. Context management. Guardrails for content safety. Production-ready RAG in SQL.' 
      },
      { 
        title: 'Background Workers', 
        desc: 'neuranq: Async job queue with SKIP LOCKED, rate limits, retries, poison job handling. neuranmon: Auto-tuner adjusting search params from SLOs, cache rotation, recall@k tracking. neurandefrag: Index compaction, re-leveling, tombstone pruning, rebuild scheduling. Tenant-aware with QPS/cost budgets.' 
      },
      { 
        title: 'ML Analytics Suite', 
        desc: 'K-means and Mini-batch K-means clustering (CPU & GPU). DBSCAN density-based clustering. PCA, OPQ dimensionality reduction. Isolation Forest outlier detection. GMM (Gaussian Mixture Models). Hierarchical clustering. Davies-Bouldin quality metrics. Drift detection for model monitoring.' 
      },
      { 
        title: 'GPU Acceleration', 
        desc: 'CUDA and ROCm support for NVIDIA and AMD GPUs. Batch distance computation (100x speedup). GPU-accelerated quantization. K-means clustering on GPU (23x faster). Automatic CPU fallback. Multi-stream copy/compute overlap. Configurable memory pools.' 
      },
      { 
        title: 'Performance & Optimization', 
        desc: 'SIMD-optimized distance calculations (AVX2, AVX-512, NEON). Intelligent query planning with cost estimates. ANN buffer cache for hot centroids. WAL compression with delta encoding. Parallel kNN execution. Predictive prefetching. Sub-millisecond searches on millions of vectors.' 
      },
      { 
        title: 'Enterprise Security', 
        desc: 'Vector encryption (AES-GCM via OpenSSL). Differential privacy for embeddings. Row-level security (RLS) integration. Multi-tenant isolation. HMAC-SHA256 signed results. Audit logging with tamper detection. Usage metering and governance policies. GDPR-compliant data handling.' 
      },
      { 
        title: 'Monitoring & Observability', 
        desc: 'pg_stat_neurondb view with real-time metrics. Worker heartbeats and watchdog. Query latency histograms. Cache hit rate tracking. Recall@K monitoring. Model cost accounting. Prometheus exporter ready. Structured JSON logging with neurondb: prefix.' 
      },
      { 
        title: 'PostgreSQL Native Architecture', 
        desc: 'Pure C implementation following PostgreSQL coding standards. 40+ source files, zero warnings. PGXS build system. Shared memory for caching. WAL integration for durability. SPI for safe database operations. Background worker framework. Standard extension, no core modifications.' 
      },
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

