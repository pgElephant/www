import React from 'react'
import { BookOpen, Download, ExternalLink, Brain, Database, Zap, Search } from 'lucide-react'
import ProductDocsLanding from '../../../components/ProductDocsLanding'

export const metadata = {
  title: 'NeurondB Documentation | PostgreSQL AI Vector Extension',
  description:
    'Deploy, configure, and operate NeurondB: GPU-accelerated vector search, machine learning inference, hybrid retrieval, RAG pipelines, and background workers for PostgreSQL.'
}

export default function Page() {
  return (
    <ProductDocsLanding
      hero={{
        badgeLabel: 'NeurondB',
        badgeIcon: <Brain className="h-6 w-6" />,
        badgeGradient: 'from-indigo-600 to-purple-600',
        title: 'PostgreSQL AI Vector Extension',
        description:
          'GPU-accelerated vector search, model inference, hybrid retrieval, and RAG orchestration built directly into PostgreSQL. Use this documentation to deploy NeurondB, operate background workers, and embed ML pipelines in SQL.',
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
          icon: Brain,
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
            { title: 'RAG Workflows', href: '/docs/neurondb/rag/page', description: 'Orchestrate retrieval augmented generation end to end.' }
          ]
        },
        {
          title: 'Background Workers',
          description: 'Operational guidance for queue execution, auto-tuning, and index maintenance workers.',
          items: [
            { title: 'Worker Overview', href: '/docs/neurondb/workers/overview', description: 'Understand worker architecture and lifecycles.' },
            { title: 'Queue Worker', href: '/docs/neurondb/workers/neuranq', description: 'Batch ingestion and asynchronous scoring.' },
            { title: 'Auto-Tuner', href: '/docs/neurondb/workers/neuranmon', description: 'Automated index health and GPU utilization tuning.' },
            { title: 'Index Maintenance', href: '/docs/neurondb/workers/neurandefrag', description: 'Defragment and rebalance vector indexes online.' }
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

