import Link from 'next/link'
import { Metadata } from 'next'
import {
  BookOpen,
  ExternalLink,
  Download,
  ArrowRight,
  Brain,
  Database,
  Search,
  Zap,
  BarChart3,
  Cpu,
  FileText,
  Code
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'NeurondB Documentation | PostgreSQL AI Vector Extension',
  description:
    'Complete reference for NeurondB: installation, configuration, vector search, machine learning inference, hybrid search, RAG, and background workers.'
}

const featureCards = [
  {
    icon: Database,
    title: 'Vector Search',
    description: 'HNSW, IVF, quantization, and specialized distance metrics for billion-scale search.'
  },
  {
    icon: Brain,
    title: 'ML Inference',
    description: 'ONNX runtime integration, batch scoring, and GPU offload for deep learning workloads.'
  },
  {
    icon: Search,
    title: 'Hybrid Retrieval',
    description: 'Blend vector, keyword, and attribute filters to deliver relevant results across modalities.'
  },
  {
    icon: Zap,
    title: 'RAG Pipelines',
    description: 'In-database retrieval augmented generation with prompt orchestration and metadata policy controls.'
  }
]

const docSections = [
  {
    title: 'Getting Started',
    description: 'Install, configure, and validate NeurondB on PostgreSQL 16–18.',
    links: [
      { title: 'Installation', href: '/docs/neurondb/getting-started', icon: Download },
      { title: 'Quick Start', href: '/docs/neurondb/getting-started#quick-start', icon: BookOpen },
      { title: 'Configuration', href: '/docs/neurondb/configuration', icon: FileText }
    ]
  },
  {
    title: 'Core Features',
    description: 'Understand vector types, distance metrics, indexing, and quantization strategies.',
    links: [
      { title: 'Vector Types', href: '/docs/neurondb/features/vector-types', icon: Database },
      { title: 'Distance Metrics', href: '/docs/neurondb/features/distance-metrics', icon: BarChart3 },
      { title: 'Indexing', href: '/docs/neurondb/features/indexing', icon: Zap },
      { title: 'Quantization', href: '/docs/neurondb/features/quantization', icon: Cpu }
    ]
  },
  {
    title: 'ML & Embeddings',
    description: 'Run embedding generation, model inference, and manage model lifecycle inside PostgreSQL.',
    links: [
      { title: 'Embeddings', href: '/docs/neurondb/ml/embeddings', icon: Brain },
      { title: 'Inference', href: '/docs/neurondb/ml/inference', icon: Cpu },
      { title: 'Model Management', href: '/docs/neurondb/ml/model-management', icon: FileText }
    ]
  },
  {
    title: 'Hybrid Search & Reranking',
    description: 'Combine text + vector retrieval and apply neural rerankers to boost relevance.',
    links: [
      { title: 'Hybrid Overview', href: '/docs/neurondb/hybrid/overview', icon: Search },
      { title: 'Multi-Vector', href: '/docs/neurondb/hybrid/multi-vector', icon: Zap },
      { title: 'Reranking', href: '/docs/neurondb/reranking/overview', icon: Brain }
    ]
  },
  {
    title: 'Background Workers',
    description: 'Monitor auto-tuning, queue execution, and index maintenance services.',
    links: [
      { title: 'Worker Overview', href: '/docs/neurondb/workers/overview', icon: Cpu },
      { title: 'Queue Worker', href: '/docs/neurondb/workers/neuranq', icon: Zap },
      { title: 'Auto-Tuner', href: '/docs/neurondb/workers/neuranmon', icon: BarChart3 },
      { title: 'Index Maintenance', href: '/docs/neurondb/workers/neurandefrag', icon: Database }
    ]
  },
  {
    title: 'API Reference',
    description: 'Discover SQL functions, operators, and data types exported by the extension.',
    links: [
      { title: 'SQL Functions', href: '/docs/neurondb/api/functions', icon: Code },
      { title: 'Data Types', href: '/docs/neurondb/api/types', icon: FileText },
      { title: 'Operators', href: '/docs/neurondb/api/operators', icon: Zap }
    ]
  }
]

const quickLinks = [
  {
    title: 'Getting Started Guide',
    description: 'Bootstrap NeurondB on PostgreSQL 16, 17, or 18 with CPU/GPU support.',
    href: '/docs/neurondb/getting-started',
    icon: BookOpen
  },
  {
    title: 'Installation Reference',
    description: 'Build from source, package deployment options, and upgrade procedures.',
    href: '/docs/neurondb/installation',
    icon: Download
  },
  {
    title: 'GitHub Repository',
    description: 'Source code, issues, and contribution guidelines for NeurondB.',
    href: 'https://github.com/pgElephant/NeurondB',
    icon: ExternalLink,
    external: true
  }
]

export default function NeurondBDocsPage() {
  return (
    <div className="space-y-16">
      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-wide text-slate-500">Product Documentation</p>
          <h1 className="text-4xl font-bold">NeurondB</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          NeurondB extends PostgreSQL with GPU-accelerated vector search, machine learning inference, hybrid retrieval,
          and RAG orchestration. Use these guides to deploy the extension, operate background workers, and integrate ML
          models directly in SQL.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/docs/neurondb/getting-started"
            className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            <BookOpen className="h-4 w-4" />
            Get Started
          </Link>
          <a
            className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400"
            href="https://github.com/pgElephant/NeurondB"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-4 w-4" />
            View on GitHub
          </a>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Key Capabilities</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {featureCards.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-lg border border-slate-200 p-5 shadow-sm">
              <Icon className="h-6 w-6 text-slate-900" />
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Documentation Library</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {docSections.map(({ title, description, links }) => (
            <div key={title} className="rounded-lg border border-slate-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {links.map(({ title: linkTitle, href, icon: Icon }) => (
                  <li key={href}>
                    <Link href={href} className="group flex items-center gap-2 text-slate-700 hover:text-slate-900">
                      <Icon className="h-4 w-4" />
                      <span>{linkTitle}</span>
                      <ArrowRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Quick Links</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {quickLinks.map(({ title, description, href, icon: Icon, external }) => {
            const Component = external ? 'a' : Link
            const props = external
              ? { href, target: '_blank', rel: 'noopener noreferrer' }
              : { href }
            return (
              <Component
                key={href}
                {...props}
                className="rounded-lg border border-slate-200 p-5 shadow-sm transition hover:border-slate-300"
              >
                <Icon className="h-6 w-6 text-slate-900" />
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{description}</p>
                <span className="mt-3 inline-flex items-center text-sm font-medium text-slate-900">
                  Learn more
                  <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </Component>
            )
          })}
        </div>
      </section>
    </div>
  )
}

