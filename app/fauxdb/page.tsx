import React from 'react';
import ProjectTemplate from '../_components/ProjectTemplate';
import FauxDbDemoTerminal from '@/components/FauxDbDemoTerminal';
import { Database, FileText, Layers, Activity } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FauxDB - Dual-Protocol Database: MongoDB + MySQL on PostgreSQL | Wire Protocol Compatibility',
  description: 'FauxDB is the ONLY database with MongoDB AND MySQL wire protocol support simultaneously. Built in Rust with pure PostgreSQL backend. Connect with mongosh OR mysql client—access the same data through both protocols with ACID guarantees, SQL translator, and zero external dependencies.',
  keywords: [
    // Primary keywords
    'fauxdb', 'dual-protocol database', 'mongodb mysql postgresql', 'multi-protocol database',
    // MongoDB compatibility
    'mongodb compatible postgresql', 'mongodb wire protocol', 'mongosh postgresql', 'mongodb alternative',
    'mongodb to postgresql', 'mongodb postgresql proxy', 'mongodb replica postgresql',
    // MySQL compatibility
    'mysql compatible postgresql', 'mysql wire protocol', 'mysql postgresql proxy', 'mysql protocol postgresql',
    'mysql to postgresql', 'mysql connector postgresql', 'mysql translation postgresql',
    // Wire protocol
    'wire protocol compatibility', 'database protocol translation', 'protocol proxy database',
    'dual wire protocol', 'multi-protocol database server',
    // Migration and compatibility
    'migrate mongodb to postgresql', 'migrate mysql to postgresql', 'mongodb postgresql migration',
    'mysql postgresql migration', 'database migration tool', 'zero downtime migration',
    // Document database
    'document database postgresql', 'jsonb mongodb', 'postgresql document store',
    'nosql postgresql', 'document oriented database', 'schema-less postgresql',
    // Technical features
    'rust database', 'postgresql backend', 'acid transactions nosql', 'sql translator',
    'query translation engine', 'bson postgresql', 'mongodb queries postgresql',
    // Use cases
    'mongodb postgresql compatibility', 'mysql postgresql compatibility', 'legacy application migration',
    'multi-client database', 'hybrid database access', 'protocol abstraction layer',
    // Competitive
    'ferretdb alternative', 'mongosql alternative', 'best mongodb postgresql',
    'production mongodb compatibility', 'enterprise database migration',
    // Open source
    'open source mongodb alternative', 'rust mongodb', 'rust mysql proxy', 'postgresql proxy'
  ].join(', '),
  openGraph: {
    title: 'FauxDB - Dual-Protocol Database: MongoDB + MySQL on PostgreSQL',
    description: 'The ONLY database with MongoDB AND MySQL wire protocol support simultaneously. Built in Rust with pure PostgreSQL backend. Connect with mongosh OR mysql client—access the same data through both protocols.',
    type: 'website',
    url: 'https://www.pgelephant.com/fauxdb',
    siteName: 'pgElephant',
    images: [
      {
        url: 'https://www.pgelephant.com/og-fauxdb.jpg',
        width: 1200,
        height: 630,
        alt: 'FauxDB - Dual-Protocol Database Server',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FauxDB - Dual-Protocol Database | MongoDB + MySQL on PostgreSQL',
    description: 'The ONLY database with MongoDB AND MySQL wire protocol support simultaneously. Connect with mongosh OR mysql client—access the same data through both protocols.',
    images: ['https://www.pgelephant.com/og-fauxdb.jpg'],
  },
  alternates: {
    canonical: 'https://www.pgelephant.com/fauxdb',
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
};

// Custom FauxDB icon component
const FauxDbIcon = ({ size = 80 }: { size?: number }) => (
  <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
    <Database className="text-emerald-400 animate-pulse" style={{ width: size * 0.6, height: size * 0.6 }} />
    <FileText className="text-orange-400 absolute -top-2 -right-2 animate-bounce" style={{ width: size * 0.3, height: size * 0.3, animationDelay: '0.3s' }} />
    <Layers className="text-blue-400 absolute -bottom-2 -left-2 animate-pulse" style={{ width: size * 0.25, height: size * 0.25, animationDelay: '0.8s' }} />
    <Activity className="text-red-400 absolute -bottom-2 -right-2 animate-pulse" style={{ width: size * 0.2, height: size * 0.2, animationDelay: '1.2s' }} />
  </div>
)

const fauxdbConfig = {
  hero: {
    title: 'FauxDB: Dual-Protocol Database Server',
    subtitle: 'The ONLY database with MongoDB AND MySQL wire protocol support simultaneously—backed by pure PostgreSQL. Connect with MongoDB clients OR MySQL clients, access the same data through both protocols.',
    projectName: 'FauxDB',
    icon: <FauxDbIcon size={80} />,
  },
  badges: [
    'MongoDB + MySQL Protocols',
    'Dual-Protocol Access',
    'Rust Engine',
    'PostgreSQL Backend',
    'SQL Translator',
    'ACID Transactions',
  ],
  demo: <FauxDbDemoTerminal />,
  featurePillars: {
    kicker: 'Key Features',
    items: [
      { title: 'Dual-Protocol Support', desc: 'MongoDB AND MySQL wire protocols simultaneously! Connect with mongosh OR mysql client—access the SAME data through both protocols.' },
      { title: 'MongoDB Wire Protocol', desc: 'Full MongoDB compatibility. Use mongosh, PyMongo, Node.js driver, and all MongoDB clients with zero changes.' },
      { title: 'MySQL Wire Protocol', desc: 'Standard MySQL protocol support via msql-srv. Connect with mysql client, Tableau, PowerBI, and all MySQL tools.' },
      { title: 'SQL Query Translator', desc: 'Automatic MySQL → PostgreSQL query translation. Handles backticks, data types, functions, LIMIT syntax, and 20+ patterns.' },
      { title: 'Rust Performance', desc: 'Built in Rust for memory safety and concurrency. 10,000+ ops/sec MongoDB throughput, 5,000+ ops/sec MySQL throughput.' },
      { title: 'Pure PostgreSQL Backend', desc: 'Native JSONB storage with PostgreSQL power. ACID transactions, data integrity, and enterprise features. Zero external dependencies.' },
      { title: 'Production Ready', desc: 'Enterprise-grade monitoring, Prometheus metrics, Grafana dashboards, health checks, and comprehensive logging.' },
      { title: 'Advanced Features', desc: 'Transactions, geospatial queries (PostGIS), aggregation pipeline, change streams, and connection pooling.' },
      { title: 'Cross-Protocol Consistency', desc: 'Insert via MongoDB, query via MySQL. Write via MySQL, read via MongoDB. Always consistent with PostgreSQL ACID.' },
    ],
  },
  featureMatrix: (
    <table className="w-full text-sm border border-slate-700 rounded-lg overflow-hidden">
      <thead className="bg-slate-800/60">
        <tr className="text-left">
          <th className="px-4 py-3 font-semibold text-white">Capability</th>
          <th className="px-4 py-3 font-semibold text-white">Description</th>
          <th className="px-4 py-3 font-semibold text-white">Performance</th>
          <th className="px-4 py-3 font-semibold text-white">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-700 bg-slate-800/40">
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Dual-Protocol</td>
          <td className="px-4 py-3 text-slate-300">MongoDB AND MySQL protocols simultaneously on ports 27018 + 3306</td>
          <td className="px-4 py-3 text-slate-300">10K+ MongoDB ops/sec, 5K+ MySQL ops/sec</td>
          <td className="px-4 py-3 text-green-400">✓</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">MongoDB Protocol</td>
          <td className="px-4 py-3 text-slate-300">Full wire protocol, mongosh, PyMongo, Node.js driver</td>
          <td className="px-4 py-3 text-slate-300">P50 &lt; 5ms, P99 &lt; 50ms</td>
          <td className="px-4 py-3 text-green-400">✓</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">MySQL Protocol</td>
          <td className="px-4 py-3 text-slate-300">Standard MySQL protocol, mysql client, Tableau, PowerBI</td>
          <td className="px-4 py-3 text-slate-300">msql-srv library</td>
          <td className="px-4 py-3 text-green-400">✓</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">SQL Translator</td>
          <td className="px-4 py-3 text-slate-300">MySQL → PostgreSQL query translation (700+ lines)</td>
          <td className="px-4 py-3 text-slate-300">20+ translation patterns</td>
          <td className="px-4 py-3 text-green-400">✓</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">PostgreSQL Backend</td>
          <td className="px-4 py-3 text-slate-300">Native JSONB storage, ACID transactions, zero dependencies</td>
          <td className="px-4 py-3 text-slate-300">PostgreSQL 17+</td>
          <td className="px-4 py-3 text-green-400">✓</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">Monitoring</td>
          <td className="px-4 py-3 text-slate-300">Prometheus metrics, Grafana dashboards, health checks</td>
          <td className="px-4 py-3 text-slate-300">Per-protocol tracking</td>
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
          <th className="px-4 py-3 font-semibold text-white">FauxDB</th>
          <th className="px-4 py-3 font-semibold text-white">FerretDB</th>
          <th className="px-4 py-3 font-semibold text-white">MongoDB</th>
          <th className="px-4 py-3 font-semibold text-white">MySQL</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-700 bg-slate-800/40">
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">MongoDB Wire Protocol</td>
          <td className="px-4 py-3 text-green-400">✔️ Port 27018</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-red-300">✗</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">MySQL Wire Protocol</td>
          <td className="px-4 py-3 text-green-400">✔️ Port 3306</td>
          <td className="px-4 py-3 text-red-300">✗</td>
          <td className="px-4 py-3 text-red-300">✗</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Dual-Protocol (Both)</td>
          <td className="px-4 py-3 text-green-400">✔️ Unique!</td>
          <td className="px-4 py-3 text-red-300">✗</td>
          <td className="px-4 py-3 text-red-300">✗</td>
          <td className="px-4 py-3 text-red-300">✗</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">PostgreSQL Backend</td>
          <td className="px-4 py-3 text-green-400">✔️ JSONB</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-red-300">✗</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">ACID Transactions</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Geospatial Queries</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-yellow-300">Limited</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Aggregation Pipeline</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-yellow-300">Partial</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-yellow-300">Limited</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Advanced Indexing</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Rust Performance</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-yellow-300">Go</td>
          <td className="px-4 py-3 text-red-300">✗</td>
          <td className="px-4 py-3 text-red-300">✗</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">PostgreSQL Storage</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-red-300">✗</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Multi-Document Transactions</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-yellow-300">Partial</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-yellow-300">Limited</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Production Ready</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
        </tr>
      </tbody>
    </table>
  ),
  docsLinks: [
    { href: '/docs/fauxdb/getting-started', title: 'Getting Started', desc: 'Quick start guide for FauxDB.' },
    { href: '/docs/fauxdb/api', title: 'API Reference', desc: 'Explore the FauxDB API.' },
  ],
};

export default function FauxDbPage() {
  return <ProjectTemplate {...fauxdbConfig} />;
}
