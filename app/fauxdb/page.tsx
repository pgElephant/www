import React from 'react';
import ProjectTemplate from '../_components/ProjectTemplate';
import FauxDbDemoTerminal from '@/components/FauxDbDemoTerminal';

const fauxdbConfig = {
  hero: {
    title: 'FauxDB: MongoDB Wire Protocol + PostgreSQL Storage',
    subtitle: 'MongoDB-compatible document database powered by Rust and PostgreSQL',
    projectName: 'FauxDB',
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
  features: [
    { icon: '', iconColor: 'text-indigo-500', title: 'MongoDB Compatible', desc: 'Wire protocol, drivers, and tools compatibility.' },
    { icon: '', iconColor: 'text-sky-500', title: 'Rust Engine', desc: 'Modern, safe, and fast backend.' },
    { icon: '', iconColor: 'text-green-500', title: 'PostgreSQL Storage', desc: 'Battle-tested, reliable storage.' },
    { icon: '', iconColor: 'text-yellow-500', title: 'ACID Transactions', desc: 'Multi-document ACID compliance.' },
    { icon: '', iconColor: 'text-pink-500', title: 'Geospatial', desc: 'Advanced geospatial queries.' },
    { icon: '', iconColor: 'text-cyan-500', title: 'Aggregation', desc: 'Powerful aggregation pipeline.' },
    { icon: '', iconColor: 'text-red-500', title: 'Indexing', desc: 'Fast queries with advanced indexing.' },
    { icon: '', iconColor: 'text-violet-500', title: 'Open Source', desc: 'MIT licensed, community-driven.' },
    { icon: '', iconColor: 'text-emerald-500', title: 'Production Ready', desc: 'Proven in production environments.' },
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
  docsLinks: [
    { href: '/docs/fauxdb/getting-started', title: 'Getting Started', desc: 'Quick start guide for FauxDB.' },
    { href: '/docs/fauxdb/api', title: 'API Reference', desc: 'Explore the FauxDB API.' },
  ],
};

export default function FauxDbPage() {
  return <ProjectTemplate {...fauxdbConfig} />;
}
