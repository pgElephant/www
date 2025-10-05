import React from 'react';
import ProjectTemplate from '../_components/ProjectTemplate';
import FauxDbDemoTerminal from '@/components/FauxDbDemoTerminal';
import { Database, FileText, Layers, Activity } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FauxDB - MongoDB Compatible Document Database | pgElephant',
  description: 'FauxDB is a high-performance MongoDB-compatible document database built in Rust with PostgreSQL storage. Full wire protocol support, ACID transactions, and geospatial queries.',
  keywords: 'MongoDB compatible, document database, Rust, PostgreSQL, ACID transactions, geospatial, wire protocol',
  openGraph: {
    title: 'FauxDB - MongoDB Compatible Document Database',
    description: 'High-performance MongoDB-compatible document database built in Rust with PostgreSQL storage.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FauxDB - MongoDB Compatible Document Database',
    description: 'High-performance MongoDB-compatible document database built in Rust with PostgreSQL storage.',
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
    title: 'FauxDB: MongoDB Wire Protocol + PostgreSQL Storage',
    subtitle: 'MongoDB-compatible document database powered by Rust and PostgreSQL',
    projectName: 'FauxDB',
    icon: <FauxDbIcon size={80} />,
  },
  badges: [
    'MongoDB Compatible',
    'Rust Engine',
    'PostgreSQL Storage',
    'ACID Transactions',
    'Geospatial',
  ],
  demo: <FauxDbDemoTerminal />,
  featurePillars: {
    kicker: 'Overview',
    items: [
      { title: 'MongoDB Compatibility', desc: 'Full MongoDB wire protocol support for seamless migration.' },
      { title: 'Rust-Powered Engine', desc: 'High-performance, safe, and modern backend.' },
      { title: 'PostgreSQL Storage', desc: 'Reliable, battle-tested storage engine.' },
      { title: 'ACID Transactions', desc: 'Multi-document ACID compliance.' },
      { title: 'Geospatial', desc: 'Advanced geospatial queries.' },
      { title: 'Minimal Configuration', desc: 'Easy setup and scaling.' },
    ],
  },
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
          <td className="px-4 py-3 font-medium text-cyan-300">MongoDB Compatibility</td>
          <td className="px-4 py-3 text-slate-300">Wire protocol, drivers, and tools compatibility.</td>
          <td className="px-4 py-3 text-slate-300">Seamless migration.</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">Rust Engine</td>
          <td className="px-4 py-3 text-slate-300">Modern, safe, and fast backend.</td>
          <td className="px-4 py-3 text-slate-300">High performance.</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">PostgreSQL Storage</td>
          <td className="px-4 py-3 text-slate-300">Battle-tested, reliable storage.</td>
          <td className="px-4 py-3 text-slate-300">Durability and reliability.</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">ACID Transactions</td>
          <td className="px-4 py-3 text-slate-300">Multi-document ACID compliance.</td>
          <td className="px-4 py-3 text-slate-300">Data integrity.</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Geospatial</td>
          <td className="px-4 py-3 text-slate-300">Advanced geospatial queries.</td>
          <td className="px-4 py-3 text-slate-300">Location-based features.</td>
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
          <th className="px-4 py-3 font-semibold text-white">PostgreSQL JSON</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-700 bg-slate-800/40">
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">MongoDB Wire Protocol</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-red-300">✗</td>
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
