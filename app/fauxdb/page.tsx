import { useState } from 'react'
import ProjectTemplate from '../_components/ProjectTemplate'
import FauxDbDemoTerminal from '@/components/FauxDbDemoTerminal'
import { Play, Terminal, Monitor, CheckCircle, Users, Star, Clock, BarChart3, Zap, Shield } from 'lucide-react'

export const metadata = {
  title: 'FauxDB - MongoDB / DocumentDB Alternative | PostgreSQL Document Database',
  description: 'FauxDB: MongoDB- and DocumentDB-compatible document database with PostgreSQL backend. Wire protocol proxy, query translation, Rust-powered performance. Drop-in replacement with ACID transactions, geospatial support, and aggregation pipelines.',
  keywords: [
    'FauxDB', 'MongoDB alternative', 'DocumentDB alternative', 'MongoDB compatible', 'DocumentDB compatible',
    'AWS DocumentDB', 'document database', 'PostgreSQL document store', 'wire protocol proxy', 'query translation',
    'MongoDB to PostgreSQL', 'DocumentDB to PostgreSQL', 'NoSQL database', 'document store',
    'MongoDB replacement', 'DocumentDB replacement', 'PostgreSQL JSONB', 'Rust database', 'database proxy', 'query translator',
    'MongoDB migration', 'DocumentDB migration', 'document database PostgreSQL', 'MongoDB wire protocol', 'PostgreSQL NoSQL',
    'FauxDB database', 'MongoDB compatible database', 'DocumentDB compatible database', 'PostgreSQL document database', 'wire protocol',
    'database translation', 'MongoDB PostgreSQL', 'DocumentDB PostgreSQL', 'document store PostgreSQL', 'NoSQL PostgreSQL'
  ],
  openGraph: {
    title: 'FauxDB - MongoDB / DocumentDB Alternative with PostgreSQL Backend',
    description: 'Drop-in MongoDB & DocumentDB replacement with PostgreSQL storage. Wire protocol proxy, query translation, and enterprise features.',
    type: 'website',
    url: 'https://www.pgelephant.com/fauxdb',
    images: [
      {
        url: 'https://www.pgelephant.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FauxDB - MongoDB Alternative Database',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FauxDB - MongoDB / DocumentDB Alternative with PostgreSQL Backend',
    description: 'Drop-in MongoDB & DocumentDB replacement with PostgreSQL storage. Wire protocol proxy, query translation, and enterprise features.',
    images: ['https://www.pgelephant.com/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.pgelephant.com/fauxdb',
  },
}

// Structured Data for FauxDB
const fauxdbStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
  "name": "FauxDB",
  "alternateName": ["FauxDB Database", "MongoDB Alternative", "DocumentDB Alternative", "PostgreSQL Document Database"],
  "description": "MongoDB- and DocumentDB-compatible document database with PostgreSQL backend. Wire protocol proxy, query translation, and enterprise features.",
  "url": "https://www.pgelephant.com/fauxdb",
    "applicationCategory": "DatabaseApplication",
  "operatingSystem": ["Linux", "macOS", "Windows", "Docker", "Kubernetes"],
    "offers": {
      "@type": "Offer",
      "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "creator": {
    "@type": "Organization",
    "name": "pgElephant Team",
    "url": "https://www.pgelephant.com"
    },
    "featureList": [
    "MongoDB Wire Protocol",
    "Query Translation Engine", 
    "PostgreSQL Backend",
    "Rust-Powered Performance",
    "ACID Transactions",
    "Geospatial Support",
    "Aggregation Pipelines",
    "Real-time Sync",
    "Enterprise Security",
    "Production Ready"
  ],
  "softwareVersion": "1.0.0",
  "datePublished": "2024-01-01",
  "dateModified": new Date().toISOString().split('T')[0],
  "downloadUrl": "https://www.pgelephant.com/download",
  "screenshot": "https://www.pgelephant.com/og-image.jpg"
}

const fauxdbConfig = {
  hero: {
    title: 'FauxDB: MongoDB / DocumentDB wire-protocol proxy with PostgreSQL storage',
    subtitle: 'MongoDB & DocumentDB wire protocol proxy, Rust-powered, PostgreSQL backend',
    projectName: 'FauxDB',
    icon: '/ico/FauxDB_HD.ico',
  },
  badges: [
    'MongoDB Compatible',
    'Query Translator',
    'Rust Engine',
    'PostgreSQL Backend',
    'ACID Transactions',
    'Geospatial',
  ],
  demo: (
    <div className="max-w-6xl mx-auto mb-8">
      <FauxDbDemoTerminal />
    </div>
  ),
  featurePillars: {
    kicker: 'Overview',
    items: [
      { title: 'MongoDB Wire Protocol', desc: 'Full MongoDB wire protocol proxy for seamless compatibility.' },
      { title: 'Query Translation Engine', desc: 'Real-time MongoDB queries translated to PostgreSQL SQL.' },
      { title: 'Rust-Powered Performance', desc: 'High-performance, safe, and modern proxy engine.' },
      { title: 'PostgreSQL Backend', desc: 'Reliable, battle-tested PostgreSQL storage backend.' },
      { title: 'Advanced Features', desc: 'Transactions, geospatial, aggregation pipelines, and more.' },
      { title: 'Production Ready', desc: 'Enterprise-grade monitoring, logging, and configuration.' },
    ],
  },
  features: [
    { icon: <Terminal className="w-5 h-5" />, iconColor: 'text-indigo-500', title: 'MongoDB Wire Protocol', desc: 'Full MongoDB wire protocol support with mongosh compatibility and seamless client integration.' },
    { icon: <Monitor className="w-5 h-5" />, iconColor: 'text-sky-500', title: 'Query Translation Engine', desc: 'Real-time MongoDB queries translated to PostgreSQL SQL with intelligent optimization and caching.' },
    { icon: <Zap className="w-5 h-5" />, iconColor: 'text-green-500', title: 'Rust-Powered Performance', desc: 'High-performance, memory-safe proxy engine with minimal latency overhead and zero-copy operations.' },
    { icon: <CheckCircle className="w-5 h-5" />, iconColor: 'text-yellow-500', title: 'PostgreSQL Backend', desc: 'Pure PostgreSQL storage with native JSONB support, ACID transactions, and full SQL compatibility.' },
    { icon: <Users className="w-5 h-5" />, iconColor: 'text-pink-500', title: 'Advanced Features', desc: 'Full aggregation pipelines, geospatial queries, indexes, and MongoDB 4.4+ compatibility with extensions.' },
    { icon: <Shield className="w-5 h-5" />, iconColor: 'text-cyan-500', title: 'Production Ready', desc: 'Enterprise-grade monitoring, structured logging, metrics, and configuration management with health checks.' },
    { icon: <Star className="w-5 h-5" />, iconColor: 'text-purple-500', title: 'Aggregation Pipelines', desc: 'Complete MongoDB aggregation pipeline support with $match, $group, $sort, $limit, and custom stages.' },
    { icon: <Clock className="w-5 h-5" />, iconColor: 'text-orange-500', title: 'Real-time Sync', desc: 'Real-time data synchronization with PostgreSQL with change streams and event-driven updates.' },
    { icon: <BarChart3 className="w-5 h-5" />, iconColor: 'text-teal-500', title: 'Analytics & Reporting', desc: 'Advanced analytics capabilities with PostgreSQL window functions, CTEs, and complex reporting queries.' },
    { icon: <Play className="w-5 h-5" />, iconColor: 'text-red-500', title: 'Geospatial Support', desc: 'Full geospatial query support with PostGIS integration for location-based applications and spatial indexing.' },
    { icon: <Terminal className="w-5 h-5" />, iconColor: 'text-blue-600', title: 'Index Management', desc: 'Intelligent index management with automatic optimization, compound indexes, and partial index support.' },
    { icon: <Monitor className="w-5 h-5" />, iconColor: 'text-emerald-500', title: 'Connection Pooling', desc: 'Advanced connection pooling with load balancing, failover, and connection health monitoring.' },
    { icon: <Zap className="w-5 h-5" />, iconColor: 'text-violet-500', title: 'Caching Layer', desc: 'Multi-level caching with Redis integration, query result caching, and intelligent cache invalidation.' },
    { icon: <CheckCircle className="w-5 h-5" />, iconColor: 'text-amber-500', title: 'Security Features', desc: 'Enterprise security with authentication, authorization, encryption, and audit logging capabilities.' },
    { icon: <Users className="w-5 h-5" />, iconColor: 'text-rose-500', title: 'Multi-tenancy', desc: 'Built-in multi-tenancy support with database isolation, tenant management, and resource quotas.' },
    { icon: <Shield className="w-5 h-5" />, iconColor: 'text-lime-500', title: 'Backup & Recovery', desc: 'Automated backup and recovery with point-in-time recovery, incremental backups, and disaster recovery.' },
    { icon: <Star className="w-5 h-5" />, iconColor: 'text-indigo-600', title: 'Performance Tuning', desc: 'Advanced performance tuning with query optimization, execution plan analysis, and automatic tuning.' },
    { icon: <Clock className="w-5 h-5" />, iconColor: 'text-cyan-600', title: 'Monitoring & Metrics', desc: 'Comprehensive monitoring with Prometheus metrics, Grafana dashboards, and custom alerting rules.' },
    { icon: <BarChart3 className="w-5 h-5" />, iconColor: 'text-pink-600', title: 'Schema Evolution', desc: 'Flexible schema evolution with automatic migration, version control, and backward compatibility.' },
    { icon: <Play className="w-5 h-5" />, iconColor: 'text-green-600', title: 'API Gateway', desc: 'Built-in API gateway with rate limiting, request/response transformation, and API versioning support.' },
    { icon: <Terminal className="w-5 h-5" />, iconColor: 'text-yellow-600', title: 'Docker Support', desc: 'Complete Docker support with multi-stage builds, Docker Compose, and Kubernetes deployment manifests.' },
    { icon: <Monitor className="w-5 h-5" />, iconColor: 'text-blue-700', title: 'Cloud Integration', desc: 'Native cloud integration with AWS, GCP, and Azure services including managed databases and storage.' },
  ],
  featureMatrix: (
    <table className="w-full text-sm border border-slate-700 rounded-lg overflow-hidden">
      <thead className="bg-slate-800/60">
        <tr className="text-left">
          <th className="px-4 py-3 font-semibold text-white">Capability</th>
          <th className="px-4 py-3 font-semibold text-white">Description</th>
          <th className="px-4 py-3 font-semibold text-white">Operational Impact</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-700 bg-slate-800/40">
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">MongoDB Wire Protocol</td>
          <td className="px-4 py-3 text-slate-300">Full MongoDB wire protocol support with mongosh compatibility.</td>
          <td className="px-4 py-3 text-slate-300">Drop-in MongoDB replacement.</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">Query Translation</td>
          <td className="px-4 py-3 text-slate-300">Real-time MongoDB queries translated to PostgreSQL SQL.</td>
          <td className="px-4 py-3 text-slate-300">Transparent query execution.</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Rust Performance</td>
          <td className="px-4 py-3 text-slate-300">High-performance, memory-safe proxy engine.</td>
          <td className="px-4 py-3 text-slate-300">Minimal latency overhead.</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">PostgreSQL Storage</td>
          <td className="px-4 py-3 text-slate-300">Pure PostgreSQL backend with JSONB and ACID transactions.</td>
          <td className="px-4 py-3 text-slate-300">Reliable, battle-tested storage.</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Advanced Features</td>
          <td className="px-4 py-3 text-slate-300">Aggregation pipelines, geospatial, indexes, MongoDB 4.4+ compatibility.</td>
          <td className="px-4 py-3 text-slate-300">Full feature parity.</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">Production Ready</td>
          <td className="px-4 py-3 text-slate-300">Enterprise monitoring, logging, metrics, configuration.</td>
          <td className="px-4 py-3 text-slate-300">Operational excellence.</td>
        </tr>
      </tbody>
    </table>
  ),
  docsLinks: [
    { href: '/docs/fauxdb/api', title: 'API Reference', desc: 'Explore the FauxDB API.' },
    { href: '/docs/fauxdb/query-translation', title: 'Query Translation', desc: 'Learn how MongoDB queries are translated.' },
    { href: '/docs/fauxdb/performance', title: 'Performance Guide', desc: 'Optimize FauxDB performance and tuning.' },
    { href: '/docs/fauxdb/deployment', title: 'Deployment Guide', desc: 'Production deployment and configuration.' },
  ],
};

export default function FauxDbPage() {
  return (
    <div className="min-h-screen">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(fauxdbStructuredData)
        }}
      />
      <ProjectTemplate {...fauxdbConfig} />
    </div>
  );
}