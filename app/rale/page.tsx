import React from 'react';
import ProjectTemplate from '../_components/ProjectTemplate';

const raleConfig = {
  hero: {
    title: 'RALE: Raft Log Engine',
    subtitle: 'Distributed Write-Ahead Log for PostgreSQL',
    projectName: 'RALE',
  },
  badges: [
    'Distributed WAL',
    'Raft Consensus',
    'PostgreSQL Integration',
    'Crash Safe',
    'Observability',
  ],
  demo: (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="bg-gray-900 rounded-xl p-8 text-white font-mono text-sm">
        <div className="flex items-center mb-6">
          <div className="flex gap-2 mr-4">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-gray-300">RALE Demo Terminal</span>
        </div>
          <pre className="bg-transparent p-0 m-0 mb-4 text-green-300 whitespace-pre-line">
{`> raled status
Cluster: Healthy
Leader: node1
Term: 42
Nodes: node1, node2, node3

> raled log append "set x=1"
Entry appended to log. Index: 1234

> raled leader-election
Leader election initiated...
New Leader: node3
`}
          </pre>
      </div>
    </div>
  ),
  featurePillars: {
    kicker: 'Overview',
    items: [
      { title: 'Distributed WAL', desc: 'Write-ahead log replication across nodes.' },
      { title: 'Raft Consensus', desc: 'Reliable log ordering and durability.' },
      { title: 'Crash Safe', desc: 'Persistent logs for robust recovery.' },
      { title: 'PostgreSQL Integration', desc: 'Seamless integration with PostgreSQL.' },
      { title: 'Observability', desc: 'Monitor log state and replication.' },
      { title: 'Minimal Configuration', desc: 'Easy setup and scaling.' },
    ],
  },
  features: [
    { icon: '', iconColor: 'text-indigo-500', title: 'Raft Log', desc: 'Distributed, strongly consistent log.' },
    { icon: '', iconColor: 'text-sky-500', title: 'Crash Safe', desc: 'Persistent, durable log entries.' },
    { icon: '', iconColor: 'text-green-500', title: 'PostgreSQL Integration', desc: 'Native extension for PostgreSQL.' },
    { icon: '', iconColor: 'text-yellow-500', title: 'Observability', desc: 'Monitor log state and replication.' },
    { icon: '', iconColor: 'text-pink-500', title: 'Minimal Configuration', desc: 'Production-ready defaults.' },
    { icon: '', iconColor: 'text-cyan-500', title: 'Scaling', desc: 'Add/remove nodes easily.' },
    { icon: '', iconColor: 'text-red-500', title: 'Debugging', desc: 'Extended logging and audit.' },
    { icon: '', iconColor: 'text-violet-500', title: 'Open Source', desc: 'MIT licensed, community-driven.' },
    { icon: '', iconColor: 'text-emerald-500', title: 'Extensible', desc: 'Plugin architecture for custom features.' },
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
          <td className="px-4 py-3 font-medium text-cyan-300">Distributed WAL</td>
          <td className="px-4 py-3 text-slate-300">Write-ahead log replication across nodes.</td>
          <td className="px-4 py-3 text-slate-300">Durable, consistent log.</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">Raft Consensus</td>
          <td className="px-4 py-3 text-slate-300">Reliable log ordering and durability.</td>
          <td className="px-4 py-3 text-slate-300">No split-brain, deterministic failover.</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Crash Safe</td>
          <td className="px-4 py-3 text-slate-300">Persistent logs for robust recovery.</td>
          <td className="px-4 py-3 text-slate-300">Crash-safe recovery.</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">PostgreSQL Integration</td>
          <td className="px-4 py-3 text-slate-300">Native extension for PostgreSQL.</td>
          <td className="px-4 py-3 text-slate-300">Seamless integration.</td>
        </tr>
      </tbody>
    </table>
  ),
  docsLinks: [
    { href: '/docs/rale/architecture', title: 'Architecture', desc: 'Learn about RALE’s internal architecture.' },
    { href: '/docs/rale/api', title: 'API Reference', desc: 'Explore the RALE API.' },
  ],
};

  export default function RalePage() {
    return <ProjectTemplate {...raleConfig} />;
  }