'use client'

import { useState } from 'react'
import ProjectTemplate from '../_components/ProjectTemplate'
import FauxDbDemoTerminal from '@/components/FauxDbDemoTerminal'
import { Play, Terminal, Monitor, CheckCircle, Users, Star, Clock, BarChart3, Zap, Shield } from 'lucide-react'

const fauxdbConfig = {
  hero: {
    title: 'FauxDB: MongoDB wire-protocol proxy with PostgreSQL storage',
    subtitle: 'MongoDB wire protocol proxy, Rust-powered, PostgreSQL backend',
    projectName: 'fauxdb',
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
    { icon: <Terminal className="w-5 h-5" />, iconColor: 'text-indigo-500', title: 'MongoDB Wire Protocol', desc: 'Full MongoDB wire protocol support with mongosh compatibility.' },
    { icon: <Monitor className="w-5 h-5" />, iconColor: 'text-sky-500', title: 'Query Translation Engine', desc: 'Real-time MongoDB queries translated to PostgreSQL SQL with intelligent optimization.' },
    { icon: <Zap className="w-5 h-5" />, iconColor: 'text-green-500', title: 'Rust-Powered Performance', desc: 'High-performance, memory-safe proxy engine with minimal latency overhead.' },
    { icon: <CheckCircle className="w-5 h-5" />, iconColor: 'text-yellow-500', title: 'PostgreSQL Backend', desc: 'Pure PostgreSQL storage with native JSONB support and ACID transactions.' },
    { icon: <Users className="w-5 h-5" />, iconColor: 'text-pink-500', title: 'Advanced Features', desc: 'Full aggregation pipelines, geospatial queries, indexes, and MongoDB 4.4+ compatibility.' },
    { icon: <Shield className="w-5 h-5" />, iconColor: 'text-cyan-500', title: 'Production Ready', desc: 'Enterprise-grade monitoring, structured logging, metrics, and configuration management.' },
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
  return <ProjectTemplate {...fauxdbConfig} />;
}