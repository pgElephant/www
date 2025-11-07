import React from 'react'
import Link from 'next/link'
import {
  BookOpen,
  ArrowRight,
  Code,
  Download,
  ExternalLink,
  Brain,
  Database,
  Zap,
  Search,
  BarChart3,
  Cpu,
  FileText
} from 'lucide-react'

export const metadata = {
  title: 'NeurondB Documentation | PostgreSQL AI Vector Extension',
  description:
    'Deploy, configure, and operate NeurondB: GPU-accelerated vector search, machine learning inference, hybrid retrieval, RAG pipelines, and background workers for PostgreSQL.'
}

export default function Page() {
  const featureCards = [
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
  ]

  const docSections = [
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
  ]

  const quickLinks = [
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
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 dark:from-indigo-500/10 dark:to-purple-500/10" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative rounded-2xl bg-white/80 dark:bg-slate-800/80 p-2 shadow-2xl ring-1 ring-gray-900/10 dark:ring-white/10">
                <div className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-white">
                  <Brain className="h-6 w-6" />
                  <span className="text-lg font-semibold">NeurondB</span>
                </div>
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              PostgreSQL AI Vector Extension
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              GPU-accelerated vector search, model inference, hybrid retrieval, and RAG orchestration built directly into
              PostgreSQL. Use this documentation to deploy NeurondB, operate background workers, and embed ML pipelines in SQL.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/docs/neurondb/getting-started"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-slate-800"
              >
                <BookOpen className="h-4 w-4" />
                Get Started
              </Link>
              <a
                href="https://github.com/pgElephant/NeurondB"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400"
              >
                <ExternalLink className="h-4 w-4" />
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-slate-900 dark:text-white">
            Key Capabilities
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featureCards.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-900/60">
                <Icon className="h-6 w-6 text-indigo-600" />
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-slate-900 dark:text-white">
            Documentation Library
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {docSections.map((section) => (
              <div key={section.title} className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-900/60">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{section.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{section.description}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group flex items-center justify-between text-slate-700 hover:text-indigo-600 dark:text-slate-200"
                      >
                        <span>{item.title}</span>
                        <ArrowRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
                      </Link>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-slate-900 dark:text-white">Quick Links</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {quickLinks.map(({ title, description, href, icon: Icon, external }) => {
              const Component = external ? 'a' : Link
              const props = external
                ? { href, target: '_blank', rel: 'noopener noreferrer' }
                : { href }

              return (
                <Component
                  key={href}
                  {...props}
                  className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:border-indigo-300 dark:border-slate-700/60 dark:bg-slate-900/60"
                >
                  <Icon className="h-6 w-6 text-indigo-600" />
                  <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-indigo-600">
                    Learn more
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </span>
                </Component>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

