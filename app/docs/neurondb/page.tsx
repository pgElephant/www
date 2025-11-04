import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  BookOpen, 
  ArrowRight, 
  Code, 
  Download, 
  ExternalLink, 
  Play, 
  Container, 
  FileText,
  Brain,
  Database,
  Zap,
  Search,
  BarChart3,
  Cpu,
  Shield
} from 'lucide-react'

export const metadata = {
  title: 'NeuronDB - PostgreSQL AI Vector Database Extension | Official Documentation',
  description:
    'NeuronDB is a powerful PostgreSQL extension for AI and vector embeddings. Build semantic search, RAG (Retrieval Augmented Generation), recommendation systems, and ML applications with pgvector compatibility, HNSW indexing, GPU acceleration, and 10+ distance metrics. Free, open-source, production-ready.',
  keywords: [
    'NeuronDB',
    'PostgreSQL vector database',
    'AI database',
    'vector embeddings',
    'pgvector',
    'semantic search',
    'RAG database',
    'retrieval augmented generation',
    'HNSW index',
    'IVFFlat',
    'similarity search',
    'nearest neighbor search',
    'vector search PostgreSQL',
    'embedding database',
    'ML database',
    'machine learning PostgreSQL',
    'OpenAI embeddings',
    'LangChain PostgreSQL',
    'vector similarity',
    'cosine similarity',
    'GPU accelerated database',
    'hybrid search',
    'full-text search vectors'
  ],
  openGraph: {
    title: 'NeuronDB - PostgreSQL AI Vector Database Extension',
    description: 'Production-ready PostgreSQL extension for AI embeddings, semantic search, and RAG applications. HNSW indexing, GPU acceleration, pgvector compatible.',
    type: 'website',
    url: 'https://www.pgelephant.com/docs/neurondb',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeuronDB - PostgreSQL AI Vector Database',
    description: 'Build AI applications with PostgreSQL. Vector embeddings, semantic search, RAG, HNSW indexing, GPU acceleration.',
  },
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/neurondb',
  },
}

export default function Page() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'NeuronDB',
    applicationCategory: 'DatabaseApplication',
    operatingSystem: 'Linux, macOS, Windows',
    description: 'PostgreSQL extension for AI and vector embeddings. Build semantic search, RAG applications, and ML systems with HNSW indexing and GPU acceleration.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '250'
    },
    softwareRequirements: 'PostgreSQL 12+',
    releaseNotes: 'https://www.pgelephant.com/docs/neurondb/getting-started',
    installUrl: 'https://www.pgelephant.com/docs/neurondb/installation',
    screenshot: 'https://www.pgelephant.com/neurondb-screenshot.png',
    keywords: 'PostgreSQL, vector database, AI, embeddings, semantic search, RAG, HNSW, machine learning',
    author: {
      '@type': 'Organization',
      name: 'pgEdge',
      url: 'https://www.pgelephant.com'
    },
    creator: {
      '@type': 'Organization',
      name: 'pgEdge',
      url: 'https://www.pgelephant.com'
    }
  }
  const features = [
    {
      icon: Database,
      title: 'Vector Search',
      description: 'HNSW indexing, multiple distance metrics, quantization'
    },
    {
      icon: Brain,
      title: 'ML Inference',
      description: 'Embedding generation, ONNX runtime, batch processing'
    },
    {
      icon: Search,
      title: 'Hybrid Search',
      description: 'Vector + full-text, multi-vector, faceted search'
    },
    {
      icon: Zap,
      title: 'RAG Pipeline',
      description: 'Complete retrieval-augmented generation in-database'
    }
  ]

  const quickLinks = [
    {
      title: 'Getting Started',
      href: '/docs/neurondb/getting-started',
      description: 'Install and configure NeurondB extension',
      icon: BookOpen
    },
    {
      title: 'Installation Guide',
      href: '/docs/neurondb/installation',
      description: 'Build and install from source',
      icon: Download
    },
    {
      title: 'GitHub Repository',
      href: 'https://github.com/pgElephant/NeurondB',
      description: 'View source code and contribute',
      icon: ExternalLink,
      external: true
    }
  ]

  const docSections = [
    {
      title: 'Getting Started',
      description: 'Installation, quick start, and configuration guides',
      links: [
        { title: 'Installation', href: '/docs/neurondb/getting-started', icon: Download },
        { title: 'Quick Start', href: '/docs/neurondb/quickstart', icon: Play },
        { title: 'Configuration', href: '/docs/neurondb/configuration', icon: FileText }
      ]
    },
    {
      title: 'Core Features',
      description: 'Vector types, indexing, distance metrics, and quantization',
      links: [
        { title: 'Vector Types', href: '/docs/neurondb/features/vector-types', icon: Database },
        { title: 'Distance Metrics', href: '/docs/neurondb/features/distance-metrics', icon: BarChart3 },
        { title: 'Indexing', href: '/docs/neurondb/features/indexing', icon: Zap },
        { title: 'Quantization', href: '/docs/neurondb/features/quantization', icon: Cpu }
      ]
    },
    {
      title: 'ML & Embeddings',
      description: 'Embedding generation, model inference, and management',
      links: [
        { title: 'Embeddings', href: '/docs/neurondb/ml/embeddings', icon: Brain },
        { title: 'Model Inference', href: '/docs/neurondb/ml/inference', icon: Cpu },
        { title: 'Model Management', href: '/docs/neurondb/ml/model-management', icon: FileText }
      ]
    },
    {
      title: 'Hybrid Search',
      description: 'Combining vector and text search for better results',
      links: [
        { title: 'Overview', href: '/docs/neurondb/hybrid/overview', icon: Search },
        { title: 'Vector + Text', href: '/docs/neurondb/hybrid/vector-text', icon: Database },
        { title: 'Multi-Vector', href: '/docs/neurondb/hybrid/multi-vector', icon: Zap },
        { title: 'Faceted Search', href: '/docs/neurondb/hybrid/faceted', icon: BarChart3 }
      ]
    },
    {
      title: 'Reranking',
      description: 'Improve search results with neural reranking',
      links: [
        { title: 'Cross-Encoder', href: '/docs/neurondb/reranking/cross-encoder', icon: Brain },
        { title: 'LLM Reranking', href: '/docs/neurondb/reranking/llm', icon: Cpu },
        { title: 'ColBERT', href: '/docs/neurondb/reranking/colbert', icon: Zap }
      ]
    },
    {
      title: 'Background Workers',
      description: 'Async job processing, auto-tuning, and index maintenance',
      links: [
        { title: 'Overview', href: '/docs/neurondb/workers/overview', icon: Cpu },
        { title: 'Queue Worker', href: '/docs/neurondb/workers/neuranq', icon: Zap },
        { title: 'Auto-Tuner', href: '/docs/neurondb/workers/neuranmon', icon: BarChart3 },
        { title: 'Index Maintenance', href: '/docs/neurondb/workers/neurandefrag', icon: Database }
      ]
    },
    {
      title: 'API Reference',
      description: 'Complete function, operator, and type reference',
      links: [
        { title: 'SQL Functions', href: '/docs/neurondb/api/functions', icon: Code },
        { title: 'Data Types', href: '/docs/neurondb/api/types', icon: FileText },
        { title: 'Operators', href: '/docs/neurondb/api/operators', icon: Zap }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white/10 backdrop-blur-sm">
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Hero Section */}
      <div style={{ background: 'linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)' }}>
        <div className="container-wide py-16">
          <div className="flex items-center mb-8">
            <Brain className="w-16 h-16 mr-6 text-indigo-400" />
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                NeurondB Documentation
              </h1>
              <p className="text-xl text-slate-600">
                Advanced AI Database Extension for PostgreSQL
              </p>
            </div>
          </div>
          
          <p className="text-lg text-slate-700 mb-8 max-w-3xl leading-relaxed">
            NeurondB transforms PostgreSQL into a comprehensive AI platform. Complete documentation for vector search, machine learning inference, hybrid retrieval, RAG pipelines, and production deployment.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link 
              href="/docs/neurondb/getting-started" 
              className="professional-button"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Get Started
            </Link>
            <a 
              href="https://github.com/pgElephant/NeurondB" 
              target="_blank" 
              rel="noopener noreferrer"
              className="professional-button-outline"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              View on GitHub
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Key Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="professional-card p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                    <feature.icon className="w-6 h-6 text-slate-700" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Documentation Sections */}
      <div className="py-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)' }}>
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Documentation Sections
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {docSections.map((section, index) => (
              <div key={index} className="professional-card p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {section.title}
                </h3>
                <p className="text-slate-600 mb-4 text-sm">
                  {section.description}
                </p>
                <div className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      href={link.href}
                      className="flex items-center gap-2 text-slate-700 hover:text-indigo-400 transition-colors text-sm"
                    >
                      <link.icon className="w-4 h-4" />
                      <span>{link.title}</span>
                      <ArrowRight className="w-3 h-3 ml-auto" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="py-16">
        <div className="container-wide">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Quick Links
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickLinks.map((link, index) => {
              const LinkComponent = link.external ? 'a' : Link
              const linkProps = link.external 
                ? { href: link.href, target: '_blank', rel: 'noopener noreferrer' }
                : { href: link.href }
              
              return (
                <LinkComponent
                  key={index}
                  {...linkProps}
                  className="professional-card p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <link.icon className="w-8 h-8 text-indigo-400 mr-4" />
                    <h3 className="text-xl font-bold text-slate-900">
                      {link.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 mb-4">
                    {link.description}
                  </p>
                  <div className="flex items-center text-indigo-400 font-semibold">
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </LinkComponent>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

