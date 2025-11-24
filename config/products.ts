/**
 * Product Configuration
 * 
 * Centralized configuration for all products including metadata, URLs, features,
 * and SEO information. This is the single source of truth for product data.
 */

import { ProductId } from './types'
import { Metadata } from 'next'

export type { ProductId }

// ============================================================================
// PRODUCT METADATA INTERFACES
// ============================================================================

export interface ProductMetadata {
  id: ProductId
  name: string
  displayName: string
  tagline: string
  description: string
  longDescription: string
  keywords: string[]
  githubUrl: string
  docsUrl: string
  productUrl: string
  ogImage: string
  category: string
  version?: string
  postgresqlVersions: string[]
}

export interface ProductFeatures {
  title: string
  description: string
  items: string[]
}

export interface ProductBadges {
  badges: string[]
}

// ============================================================================
// PRODUCT CONFIGURATIONS
// ============================================================================

export const products: Record<ProductId, ProductMetadata & ProductFeatures & ProductBadges> = {
  neurondb: {
    id: 'neurondb',
    name: 'neurondb',
    displayName: 'NeurondB',
    tagline: 'Enterprise AI Database Extension for PostgreSQL',
    description: 'Production-grade AI database extension for PostgreSQL with vector search, RAG pipeline, machine learning inference, and GPU acceleration.',
    longDescription: 'Production-grade AI database extension for PostgreSQL with vector search, RAG pipeline, machine learning inference, and GPU acceleration. HNSW indexing, ONNX runtime, GPU acceleration (CUDA/ROCm), embeddings generation, cross-encoder reranking. Complete in-database RAG with semantic search, full-text search, and LLM integration.',
    keywords: [
      'ai database', 'ai database postgresql', 'postgres ai', 'postgresql ai extension', 'postgres ai extension',
      'vector database', 'vector database postgresql', 'postgres vector database', 'vector search postgresql',
      'rag pipeline', 'rag database', 'rag postgresql', 'retrieval augmented generation postgresql',
      'semantic search postgresql', 'semantic database', 'similarity search postgresql',
      'machine learning postgresql', 'ml inference postgresql', 'postgres ml', 'postgresql machine learning',
      'embeddings database', 'embedding generation postgresql', 'text embeddings postgresql',
      'hnsw index', 'hnsw postgresql', 'vector index postgresql', 'ann search postgresql',
      'hybrid search', 'hybrid search postgresql', 'vector full text search',
      'onnx postgresql', 'onnx runtime postgresql', 'ml models postgresql',
      'gpu accelerated database', 'cuda postgresql', 'rocm postgresql',
      'ai powered database', 'llm database', 'gpt database', 'chatgpt database',
      'langchain postgresql', 'llamaindex postgresql', 'rag framework postgresql',
      'pgvector alternative', 'postgres ai comparison', 'postgresql ai tools',
      'neurondb', 'neurondB', 'pg ai', 'pgai', 'postgres vector',
    ],
    githubUrl: 'https://github.com/pgElephant/NeurondB',
    docsUrl: '/docs/neurondb',
    productUrl: '/neurondb',
    ogImage: 'https://www.pgelephant.com/og-neurondb.jpg',
    category: 'AI Database Extension',
    postgresqlVersions: ['16', '17', '18'],
    title: 'Comprehensive AI Database Features',
    items: [
      'Production-grade vector search: HNSW + IVF indexing, 10+ distance metrics, up to 32x compression',
      'ML inference & embeddings: ONNX runtime, text/image/multimodal models, batch processing',
      'Hybrid search & RAG: Semantic + FTS, cross-encoder reranking, complete in-database RAG pipeline',
      'GPU acceleration: CUDA/ROCm support, 100x speedup for matrix ops, auto CPU fallback',
      'Enterprise ready: 100+ SQL functions, background workers, monitoring, PG 16-18 compatible',
    ],
    badges: [
      'PostgreSQL 16-18',
      '5 Vector Types',
      '52 ML Algorithms',
      '473 SQL Functions',
      'GPU Acceleration',
      '4 Background Workers',
    ],
  },
  pgraft: {
    id: 'pgraft',
    name: 'pgraft',
    displayName: 'pgraft',
    tagline: 'PostgreSQL Raft Consensus Extension',
    description: 'Production-ready Raft consensus for PostgreSQL with automatic leader election, crash-safe replication, and 100% split-brain prevention.',
    longDescription: 'Production-ready Raft consensus for distributed PostgreSQL clusters. Built on etcd-io/raft with automatic leader election, crash-safe replication, 100% split-brain prevention, zero-downtime failover, and comprehensive SQL API. Native background worker architecture with no external dependencies.',
    keywords: [
      'postgresql raft', 'raft consensus postgresql', 'postgresql consensus', 'pgraft',
      'postgresql leader election', 'automatic leader election', 'distributed postgresql',
      'postgresql high availability', 'postgresql ha', 'postgresql clustering', 'postgresql failover',
      'zero downtime postgresql', 'split-brain prevention', 'automatic failover postgresql',
      'distributed database', 'distributed consensus', 'consensus algorithm', 'raft algorithm',
      'etcd raft', 'etcd-io raft', 'raft protocol', 'paxos alternative',
      'postgresql cluster', 'database clustering', 'postgres cluster manager',
      'postgresql replication', 'multi-master postgresql', 'cluster management postgresql',
      'crash-safe replication', 'log replication', 'state machine replication',
      'quorum-based consensus', 'majority voting', 'term-based leader election',
      'postgresql production clustering', 'enterprise postgresql ha', 'postgresql disaster recovery',
      'postgres fault tolerance', 'distributed key-value store', 'postgresql synchronization',
      'patroni alternative', 'stolon alternative', 'repmgr alternative', 'pacemaker postgresql',
      'postgresql ha solutions', 'best postgresql clustering', 'postgresql high availability tools',
      'postgresql extension', 'postgres background worker', 'postgresql native clustering',
      'sql api clustering', 'postgresql extension ha', 'no external dependencies postgresql',
    ],
    githubUrl: 'https://github.com/pgElephant/pgraft',
    docsUrl: '/docs/pgraft',
    productUrl: '/pgraft',
    ogImage: 'https://www.pgelephant.com/og-pgraft.jpg',
    category: 'High Availability Extension',
    postgresqlVersions: ['14', '15', '16', '17', '18'],
    title: 'Key Features',
    items: [
      'Automatic Leader Election: Quorum-based, deterministic, fully automated leader election using proven etcd-io/raft implementation.',
      'Crash-Safe Replication: All state changes replicated and persisted across nodes. Survives crashes and network partitions.',
      '100% Split-Brain Prevention: Mathematical guarantee via Raft consensus protocol—never more than one leader per term.',
      'Zero-Downtime Failover: Sub-second detection and automatic recovery. Seamless failover with no service interruption.',
      'Production-Grade Raft: Built on proven etcd-io/raft library used in production by etcd, Kubernetes, and other systems.',
      'Native PostgreSQL Integration: Background worker architecture with no external dependencies. Pure PostgreSQL extension.',
      'Comprehensive SQL API: Full cluster management via SQL functions. Monitor, manage, and control through standard SQL.',
      'Built-in Observability: Status functions, metrics, detailed logging, and monitoring hooks for complete cluster visibility.',
      'etcd-Compatible KV Store: Raft-replicated key-value storage included. Perfect for distributed configuration and coordination.',
    ],
    badges: [
      'PostgreSQL 14-17',
      'etcd-io/raft',
      'Zero Split-Brain',
      'Auto Leader Election',
      'Background Worker',
      'etcd-Compatible KV',
    ],
  },
  pgbalancer: {
    id: 'pgbalancer',
    name: 'pgbalancer',
    displayName: 'pgBalancer',
    tagline: 'PostgreSQL AI Load Balancer & Connection Pooler',
    description: 'AI-powered PostgreSQL connection pooler with intelligent load balancing, REST API management, and MQTT event streaming.',
    longDescription: 'Modern connection pooler with AI-powered load balancing, REST API management, and MQTT event streaming. Intelligent query routing uses machine learning to keep PostgreSQL clusters responsive under any workload. Modern fork of pgpool-II with machine learning algorithms for optimal query routing.',
    keywords: [
      'postgresql load balancer', 'postgresql connection pooler', 'pgbalancer', 'pg balancer',
      'connection pooling postgresql', 'postgresql pooling', 'database connection pooling',
      'ai load balancing', 'machine learning load balancing', 'intelligent query routing',
      'rest api postgresql', 'rest api connection pooler', 'http api pooler',
      'mqtt clustering', 'yaml configuration', 'cli connection pooler', 'bctl cli',
      'pgpool-ii alternative', 'pgpool-ii vs pgbouncer', 'connection pooler comparison',
      'postgresql ha', 'database high availability', 'postgres high availability',
      'watchdog support', 'health monitoring postgresql', 'backend health check',
      'session pooling', 'transaction pooling', 'statement level load balance',
    ],
    githubUrl: 'https://github.com/pgElephant/pgBalancer',
    docsUrl: '/docs/pgbalancer',
    productUrl: '/pgbalancer',
    ogImage: 'https://www.pgelephant.com/og-pgbalancer.jpg',
    category: 'Connection Pooler & Load Balancer',
    postgresqlVersions: ['13', '14', '15', '16', '17', '18'],
    title: 'Core Features',
    items: [
      'AI Load Balancing: Machine learning algorithms analyze query patterns and server health for optimal routing.',
      'REST API Management: 17 HTTP/JSON endpoints for cluster orchestration, health checks, and automation.',
      'Connection Pooling: Session, transaction, and statement pooling with configurable health checks.',
      'MQTT Event Streaming: Push real-time status, failover, and metric events to observability pipelines.',
    ],
    badges: [
      'PostgreSQL 13+',
      'REST API',
      'MQTT Streaming',
      'AI Routing',
      'YAML Config',
      'CLI Tools',
    ],
  },
  fauxdb: {
    id: 'fauxdb',
    name: 'fauxdb',
    displayName: 'FauxDB',
    tagline: 'Dual-Protocol Database: MongoDB + MySQL on PostgreSQL',
    description: 'Dual-protocol database with MongoDB AND MySQL wire protocol support on PostgreSQL.',
    longDescription: 'Dual-protocol database with MongoDB AND MySQL wire protocol support on PostgreSQL. Connect with MongoDB clients (mongosh, PyMongo) OR MySQL clients (mysql, Tableau). Access the SAME data through both protocols with PostgreSQL ACID guarantees. Advanced SQL translator converts MySQL queries to PostgreSQL automatically. Rust-powered high-performance with geospatial, aggregation, and monitoring.',
    keywords: [
      'fauxdb', 'mongodb alternative', 'mysql alternative', 'dual-protocol database',
      'mongodb wire protocol', 'mysql wire protocol', 'postgresql mongodb',
      'postgresql mysql', 'sql translator', 'wire protocol postgresql',
      'mongodb compatible', 'mysql compatible', 'document database postgresql',
      'nosql postgresql', 'multi-protocol database', 'database protocol translation',
    ],
    githubUrl: 'https://github.com/fauxdb/fauxdb',
    docsUrl: '/docs/fauxdb',
    productUrl: '/fauxdb',
    ogImage: 'https://www.pgelephant.com/og-fauxdb.jpg',
    category: 'Dual-Protocol Database',
    postgresqlVersions: ['14', '15', '16', '17', '18'],
    title: 'Key Features',
    items: [
      'Dual-protocol support: MongoDB AND MySQL wire protocols simultaneously',
      'Connect with MongoDB clients (mongosh, PyMongo) OR MySQL clients (mysql, Tableau)',
      'Access the SAME data through both protocols with PostgreSQL ACID guarantees',
      'Advanced SQL translator converts MySQL queries to PostgreSQL automatically',
      'Rust-powered high-performance with geospatial, aggregation, and monitoring',
    ],
    badges: [
      'MongoDB Protocol',
      'MySQL Protocol',
      'PostgreSQL 14+',
      'Rust Powered',
      'ACID Guarantees',
      'SQL Translator',
    ],
  },
  pgsentinel: {
    id: 'pgsentinel',
    name: 'pgsentinel',
    displayName: 'pgSentinel',
    tagline: 'Professional PostgreSQL Monitoring Platform',
    description: 'Comprehensive web-based monitoring platform for pgbalancer with real-time metrics, Prometheus integration, and professional dashboards.',
    longDescription: 'Comprehensive real-time monitoring with Grafana dashboards. Advanced alerting system with Prometheus integration. Performance analytics with query optimization insights. Docker-based deployment with complete observability stack. Enterprise-grade monitoring with automated health checks.',
    keywords: [
      'pgsentinel', 'postgresql monitoring', 'pgbalancer monitoring', 'database monitoring',
      'prometheus postgresql', 'grafana postgresql', 'postgresql dashboards',
      'database observability', 'postgresql metrics', 'database health monitoring',
      'real-time monitoring', 'database analytics', 'postgresql performance monitoring',
    ],
    githubUrl: 'https://github.com/pgElephant/pgSentinel',
    docsUrl: '/docs/pgsentinel',
    productUrl: '/pgsentinel',
    ogImage: 'https://www.pgelephant.com/og-pgsentinel.jpg',
    category: 'Monitoring Platform',
    postgresqlVersions: ['13', '14', '15', '16', '17', '18'],
    title: 'Key Features',
    items: [
      'Comprehensive real-time monitoring with Grafana dashboards',
      'Advanced alerting system with Prometheus integration',
      'Performance analytics with query optimization insights',
      'Docker-based deployment with complete observability stack',
      'Enterprise-grade monitoring with automated health checks',
    ],
    badges: [
      'Grafana Dashboards',
      'Prometheus',
      'Docker',
      'Real-time Metrics',
      'Alerting',
      'Analytics',
    ],
  },
  'pg-stat-insights': {
    id: 'pg-stat-insights',
    name: 'pg-stat-insights',
    displayName: 'pg_stat_insights',
    tagline: 'Deep PostgreSQL Performance Analytics',
    description: 'Advanced query performance analysis with pg_stat_statements, table and index usage statistics, and optimization recommendations.',
    longDescription: 'Advanced query performance analysis with pg_stat_statements. Table and index usage statistics with optimization recommendations. Cache hit ratio monitoring with buffer pool analysis. Replication lag tracking with failover insights. Comprehensive database health metrics and reporting.',
    keywords: [
      'pg_stat_insights', 'postgresql performance', 'postgresql analytics', 'query performance',
      'pg_stat_statements', 'database performance', 'postgresql optimization',
      'query analysis', 'database metrics', 'postgresql monitoring',
      'performance insights', 'database health', 'postgresql statistics',
    ],
    githubUrl: 'https://github.com/pgElephant/pg_stat_insights',
    docsUrl: '/docs/pg-stat-insights',
    productUrl: '/pg-stat-insights',
    ogImage: 'https://www.pgelephant.com/og-pg-stat-insights.jpg',
    category: 'Performance Analytics Extension',
    postgresqlVersions: ['14', '15', '16', '17', '18'],
    title: 'Key Features',
    items: [
      'Advanced query performance analysis with pg_stat_statements',
      'Table and index usage statistics with optimization recommendations',
      'Cache hit ratio monitoring with buffer pool analysis',
      'Replication lag tracking with failover insights',
      'Comprehensive database health metrics and reporting',
    ],
    badges: [
      'PostgreSQL 14+',
      'Query Analysis',
      'Performance Metrics',
      'Optimization',
      'Health Monitoring',
      'Statistics',
    ],
  },
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get product configuration by ID
 */
export function getProduct(productId: ProductId) {
  return products[productId]
}

/**
 * Get all products as array
 */
export function getAllProducts() {
  return Object.values(products)
}

/**
 * Get product IDs
 */
export function getProductIds(): ProductId[] {
  return Object.keys(products) as ProductId[]
}

/**
 * Generate metadata for a product page
 */
export function generateProductMetadata(productId: ProductId): Metadata {
  const product = products[productId]
  
  return {
    title: `${product.displayName} - ${product.tagline} | pgElephant`,
    description: product.description,
    keywords: product.keywords.join(', '),
    openGraph: {
      title: `${product.displayName} - ${product.tagline}`,
      description: product.description,
      type: 'website',
      url: `https://www.pgelephant.com${product.productUrl}`,
      siteName: 'pgElephant',
      images: [
        {
          url: product.ogImage,
          width: 1200,
          height: 630,
          alt: `${product.displayName} - ${product.tagline}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.displayName} - ${product.tagline}`,
      description: product.description,
      images: [product.ogImage],
      creator: '@pgElephant',
      site: '@pgElephant',
    },
    alternates: {
      canonical: `https://www.pgelephant.com${product.productUrl}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

/**
 * Generate metadata for a product docs page
 */
export function generateDocsMetadata(productId: ProductId, pageTitle?: string): Metadata {
  const product = products[productId]
  const title = pageTitle 
    ? `${pageTitle} | ${product.displayName} Documentation`
    : `${product.displayName} Documentation | pgElephant`
  
  return {
    title,
    description: `Complete documentation for ${product.displayName}. ${product.description}`,
    keywords: product.keywords.join(', '),
    openGraph: {
      title,
      description: `Complete documentation for ${product.displayName}. ${product.description}`,
      type: 'website',
      url: `https://www.pgelephant.com${product.docsUrl}`,
      siteName: 'pgElephant',
      images: [
        {
          url: product.ogImage,
          width: 1200,
          height: 630,
          alt: `${product.displayName} Documentation`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: `Complete documentation for ${product.displayName}`,
      images: [product.ogImage],
    },
    alternates: {
      canonical: `https://www.pgelephant.com${product.docsUrl}`,
    },
  }
}

// ============================================================================
// EXPORT DEFAULT
// ============================================================================

export default products

