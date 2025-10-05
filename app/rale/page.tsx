import React from 'react';
import ProjectTemplate from '../_components/ProjectTemplate';
import RaleDemoTerminal from '@/components/RaleDemoTerminal';
import { Users, Crown, Network, Activity } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RALE - Raft Log Engine for PostgreSQL | pgElephant',
  description: 'RALE provides distributed consensus for high availability in distributed systems. Automated leader election and failover with zero data loss and strong consistency guarantees.',
  keywords: 'distributed consensus, leader election, failover, strong consistency, zero data loss, distributed systems, high availability',
  openGraph: {
    title: 'RALE - Raft Log Engine for PostgreSQL',
    description: 'Distributed consensus for high availability with automated leader election and failover.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RALE - Raft Log Engine for PostgreSQL',
    description: 'Distributed consensus for high availability with automated leader election and failover.',
  },
};

// Custom RALE icon component
const RaleIcon = ({ size = 80 }: { size?: number }) => (
  <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
    <Users className="text-indigo-400 animate-pulse" style={{ width: size * 0.6, height: size * 0.6 }} />
    <Crown className="text-yellow-400 absolute -top-2 -right-2 animate-bounce" style={{ width: size * 0.3, height: size * 0.3, animationDelay: '0.4s' }} />
    <Network className="text-green-400 absolute -bottom-2 -left-2 animate-pulse" style={{ width: size * 0.25, height: size * 0.25, animationDelay: '0.9s' }} />
    <Activity className="text-cyan-400 absolute -bottom-2 -right-2 animate-pulse" style={{ width: size * 0.2, height: size * 0.2, animationDelay: '1.3s' }} />
  </div>
)

const raleConfig = {
  hero: {
    title: 'RALE: Raft Log Engine',
    subtitle: 'Distributed Write-Ahead Log for PostgreSQL',
    projectName: 'RALE',
    icon: <RaleIcon size={80} />,
  },
  badges: [
    'Distributed WAL',
    'Raft Consensus',
    'PostgreSQL Integration',
    'Crash Safe',
    'Observability',
  ],
  demo: <RaleDemoTerminal />,
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
  featureComparison: (
    <table className="w-full text-sm border border-slate-700 rounded-lg overflow-hidden">
      <thead className="bg-slate-800/60">
        <tr className="text-left">
          <th className="px-4 py-3 font-semibold text-white">Feature</th>
          <th className="px-4 py-3 font-semibold text-white">RALE</th>
          <th className="px-4 py-3 font-semibold text-white">PostgreSQL WAL</th>
          <th className="px-4 py-3 font-semibold text-white">etcd</th>
          <th className="px-4 py-3 font-semibold text-white">Consul</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-700 bg-slate-800/40">
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Distributed Log</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-red-300">✗</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-yellow-300">Limited</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Raft Consensus</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-red-300">✗</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-red-300">✗</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">PostgreSQL Integration</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-red-300">✗</td>
          <td className="px-4 py-3 text-red-300">✗</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Crash Safe</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">SQL Interface</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-red-300">✗</td>
          <td className="px-4 py-3 text-red-300">✗</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Zero External Dependencies</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-green-400">✔️</td>
          <td className="px-4 py-3 text-red-300">✗</td>
          <td className="px-4 py-3 text-red-300">✗</td>
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