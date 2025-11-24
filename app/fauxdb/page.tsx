import React from 'react';
import ProductPageTemplate from '@/components/templates/ProductPageTemplate';
import FauxDbDemoTerminal from '@/components/FauxDbDemoTerminal';
import { generateProductPageMetadata } from '@/config/seo';

export const metadata = generateProductPageMetadata('fauxdb');

const fauxdbConfig = {
  productId: 'fauxdb' as const,
  hero: {
    subtitle: 'The ONLY database with MongoDB AND MySQL wire protocol support simultaneously—backed by pure PostgreSQL. Connect with MongoDB clients OR MySQL clients, access the same data through both protocols.',
  },
  demo: <FauxDbDemoTerminal />,
  badges: [
    'MongoDB + MySQL Protocols',
    'Dual-Protocol Access',
    'Rust Engine',
    'PostgreSQL Backend',
    'SQL Translator',
    'ACID Transactions',
  ],
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
  ctaSection: {
    kicker: 'Get Started',
    title: 'Deploy Dual-Protocol Database',
    description: 'Install FauxDB and access your PostgreSQL data through both MongoDB and MySQL protocols simultaneously with zero downtime migration.',
    primaryCTA: { href: '/docs/fauxdb/getting-started', label: 'View Documentation' },
    secondaryCTA: { href: 'https://github.com/pgElephant/fauxdb', label: 'View on GitHub', external: true },
  },
};

export default function FauxDbPage() {
  return <ProductPageTemplate {...fauxdbConfig} />;
}
