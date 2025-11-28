import React from 'react'
import { BookOpen, Download, ExternalLink, Database, Zap, Search } from 'lucide-react'
import ProductDocsLanding from '../../../components/ProductDocsLanding'
import { NeurondBIcon } from '../../../components/ProductIcons'

export const metadata = {
  title: 'NeurondB Documentation | AI PostgreSQL Extension',
  description:
    'NeurondB: AI PostgreSQL extension for vector search, machine learning, and AI workloads. GPU-accelerated vector search, HNSW indexing, ML inference, hybrid retrieval, RAG pipelines, and ONNX model deployment in PostgreSQL.',
  keywords: [
    'NeurondB',
    'AI PostgreSQL',
    'AI Postgres',
    'PostgreSQL AI extension',
    'PostgreSQL.ai',
    'PostgreSQL.ai alternative',
    'pgml',
    'pgml alternative',
    'PostgreSQLml',
    'PostgreSQL ML',
    'PostgreSQL machine learning',
    'AI extension for PostgreSQL',
    'PostgreSQL vector search',
    'GPU-accelerated vector database',
    'HNSW index',
    'vector similarity search',
    'machine learning in PostgreSQL',
    'ONNX inference',
    'hybrid search',
    'RAG pipeline',
    'vector embeddings',
    'semantic search',
    'neural network database',
    'vector indexing',
    'cosine similarity',
    'L2 distance',
    'approximate nearest neighbor',
    'ANN search',
    'embedding generation',
    'PostgreSQL AI',
    'Postgres AI',
    'AI database extension'
  ].join(', '),
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/neurondb',
  },
  openGraph: {
    title: 'NeurondB Documentation | PostgreSQL AI Vector Extension',
    description: 'Guide to GPU-accelerated vector search, ML inference, and RAG pipelines in PostgreSQL with NeurondB.',
    type: 'website',
    url: 'https://www.pgelephant.com/docs/neurondb',
    siteName: 'pgElephant',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeurondB Documentation | PostgreSQL AI Vector Extension',
    description: 'Guide to GPU-accelerated vector search, ML inference, and RAG pipelines in PostgreSQL.',
  },
}

export default function Page() {
  return (
    <ProductDocsLanding
      hero={{
        badgeLabel: 'NeurondB',
        badgeIcon: <NeurondBIcon size={24} />,
        badgeGradient: 'from-slate-700 to-slate-600',
        title: 'PostgreSQL AI Vector Extension',
        description:
          'GPU-accelerated vector search, model inference, hybrid retrieval, and RAG orchestration built into PostgreSQL. NeurondB is an AI PostgreSQL extension. Use this documentation to deploy NeurondB, operate background workers, and embed ML pipelines in SQL.',
        ctas: [
          {
            label: 'Get Started',
            href: '/docs/neurondb/getting-started',
            icon: <BookOpen className="h-4 w-4" />,
            variant: 'primary'
          },
          {
            label: 'View on GitHub',
            href: 'https://github.com/pgElephant/NeurondB',
            icon: <ExternalLink className="h-4 w-4" />,
            external: true,
            variant: 'secondary'
          }
        ]
      }}
      features={[
        {
          icon: Database,
          title: 'Vector Search',
          description: 'HNSW, IVF, product quantization, and custom distance metrics for billion-scale similarity search.'
        },
        {
          icon: () => <NeurondBIcon size={24} />,
          title: 'ML Inference',
          description: 'ONNX runtime integration, GPU offload, and batch execution for deep learning workloads in SQL.'
        },
        {
          icon: Search,
          title: 'Hybrid Retrieval',
          description: 'Blend keyword, metadata, and vector signals to deliver highly relevant multimodal results.'
        },
        {
          icon: Zap,
          title: 'RAG Pipelines',
          description: 'In-database retrieval augmented generation with prompt templates, metadata policies, and observability.'
        }
      ]}
      docSections={[
        {
          title: 'Getting Started',
          description: 'Install NeurondB on PostgreSQL 16–18, verify GPU support, and apply baseline configuration.',
          items: [
            { title: 'Installation', href: '/docs/neurondb/getting-started', description: 'Build from source or install packages.' },
            { title: 'Quick Start', href: '/docs/neurondb/getting-started#quick-start', description: 'Load sample data and run first vector searches.' },
            { title: 'Configuration', href: '/docs/neurondb/configuration', description: 'GUC parameters for CPU/GPU execution paths.' }
          ]
        },
        {
          title: 'Core Features',
          description: 'Learn how NeurondB models vectors, maintains indexes, and tunes recall versus latency.',
          items: [
            { title: 'Vector Types', href: '/docs/neurondb/features/vector-types', description: 'Supported dimensionality and storage formats.' },
            { title: 'Distance Metrics', href: '/docs/neurondb/features/distance-metrics', description: 'Cosine, L2, IP, dot, and hybrid scoring.' },
            { title: 'Indexing', href: '/docs/neurondb/features/indexing', description: 'HNSW, IVF, PQ, and adaptive index selection.' },
            { title: 'Quantization', href: '/docs/neurondb/features/quantization', description: 'Reduce memory footprint with scalar and vector quantization.' }
          ]
        },
        {
          title: 'ML & Embeddings',
          description: 'Generate, store, and serve embeddings alongside model lifecycle management.',
          items: [
            { title: 'Embeddings', href: '/docs/neurondb/ml/embeddings', description: 'Transform text, audio, and images into dense vectors.' },
            { title: 'Inference', href: '/docs/neurondb/ml/inference', description: 'Deploy ONNX models with GPU batching and caching.' },
            { title: 'Model Management', href: '/docs/neurondb/ml/model-management', description: 'Version control, approvals, and rollback workflows.' }
          ]
        },
        {
          title: 'Hybrid Search & Reranking',
          description: 'Combine text search, BM25, and neural rerankers for production retrieval pipelines.',
          items: [
            { title: 'Hybrid Overview', href: '/docs/neurondb/hybrid/overview', description: 'Architectures for multi-signal retrieval.' },
            { title: 'Reranking', href: '/docs/neurondb/reranking/overview', description: 'Cross-encoder and LLM reranking playbooks.' },
            { title: 'RAG Workflows', href: '/docs/neurondb/rag', description: 'Orchestrate retrieval augmented generation end to end.' }
          ]
        },
        {
          title: 'Background Workers',
          description: 'Operational guidance for queue execution, auto-tuning, and index maintenance workers.',
          items: [
            { title: 'Worker Overview', href: '/docs/neurondb/background-workers', description: 'Understand worker architecture and lifecycles.' },
            { title: 'Queue Worker (neuranq)', href: '/docs/neurondb/background-workers#neuranq', description: 'Batch ingestion and asynchronous scoring.' },
            { title: 'Auto-Tuner (neuranmon)', href: '/docs/neurondb/background-workers#neuranmon', description: 'Automated index health and GPU utilization tuning.' },
            { title: 'Index Maintenance (neurandefrag)', href: '/docs/neurondb/background-workers#neurandefrag', description: 'Defragment and rebalance vector indexes online.' }
          ]
        },
        {
          title: 'API Reference',
          description: 'Browse SQL functions, operators, and data types exported by NeurondB.',
          items: [
            { title: 'SQL Functions', href: '/docs/neurondb/api/functions', description: 'Query, indexing, and analytics procedures.' },
            { title: 'Data Types', href: '/docs/neurondb/api/types', description: 'Custom vector, tensor, and metadata types.' },
            { title: 'Operators', href: '/docs/neurondb/api/operators', description: 'Similarity, distance, and hybrid scoring operators.' }
          ]
        }
      ]}
      quickLinks={[
        {
          title: 'Getting Started Guide',
          description: 'Bootstrap NeurondB on PostgreSQL 16–18 with CPU and GPU execution paths.',
          href: '/docs/neurondb/getting-started',
          icon: BookOpen
        },
        {
          title: 'Installation Reference',
          description: 'Build from source, package installations, upgrades, and validation scripts.',
          href: '/docs/neurondb/installation',
          icon: Download
        },
        {
          title: 'GitHub Repository',
          description: 'Source code, issues, and contribution guide for NeurondB.',
          href: 'https://github.com/pgElephant/NeurondB',
          icon: ExternalLink,
          external: true
        }
      ]}
      theme={{
        featureIconClass: 'text-indigo-600',
        linkHoverClass: 'hover:text-indigo-600',
        quickLinkCardClass:
          'rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:border-indigo-300 dark:border-slate-700/60 dark:bg-slate-900/60',
        quickLinkIconClass: 'text-indigo-600',
        quickLinkHoverLabelClass: 'text-indigo-600'
      }}
    />
  )
}

