import React from 'react';
import ProjectTemplate from '../_components/ProjectTemplate';
import RamDemoTerminal from '@/components/RamDemoTerminal';

const ramConfig = {
  hero: {
    title: 'RAM: Resilient Adaptive Manager',
    subtitle: 'PostgreSQL Auto-Failover Daemon with Raft Consensus',
    projectName: 'RAM',
  },
  badges: [
    'PostgreSQL Clustering',
    'Raft Consensus',
    'Auto Failover',
    'Real-time Monitoring',
    'Production Ready',
  ],
    demo: <RamDemoTerminal />,
  featurePillars: {
    kicker: 'Overview',
    items: [
      { title: 'Native PostgreSQL Extension', desc: 'Seamless in-core integration—no external daemons.' },
      { title: 'Raft Consensus', desc: 'Reliable leader election and strong consistency.' },
      { title: 'Crash-Safe Durability', desc: 'Persistent state and logs for robust recovery.' },
      { title: 'SQL Management', desc: 'Full cluster lifecycle managed via SQL.' },
      { title: 'Observability', desc: 'Inspect cluster state and leader status with SQL.' },
      { title: 'Minimal Configuration', desc: 'Production-ready defaults, simple setup.' },
    ],
  },
  features: [
    { icon: '', iconColor: 'text-indigo-500', title: 'Raft Consensus', desc: 'Leader election, log replication, term monotonicity.' },
    { icon: '', iconColor: 'text-sky-500', title: 'State Durability', desc: 'Persistent HardState, entries, snapshots.' },
    { icon: '', iconColor: 'text-green-500', title: 'Command Interface', desc: 'SQL functions for init, membership, diagnostics.' },
    { icon: '', iconColor: 'text-yellow-500', title: 'Monitoring Hooks', desc: 'Cluster status, log stats, leader checks.' },
    { icon: '', iconColor: 'text-pink-500', title: 'Node Membership', desc: 'Add/remove nodes through leader replication.' },
    { icon: '', iconColor: 'text-cyan-500', title: 'Debug Mode', desc: 'Toggle extended logging via SQL.' },
    { icon: '', iconColor: 'text-red-500', title: 'Crash-Safe', desc: 'Crash-safe recovery.' },
    { icon: '', iconColor: 'text-violet-500', title: 'Native DB Admin', desc: 'Native DB admin UX.' },
    { icon: '', iconColor: 'text-emerald-500', title: 'Background Worker', desc: 'Efficient, low-overhead operation.' },
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
          <td className="px-4 py-3 font-medium text-cyan-300">Consensus (Raft)</td>
          <td className="px-4 py-3 text-slate-300">Leader election, log replication, term monotonicity.</td>
          <td className="px-4 py-3 text-slate-300">Deterministic failover; no split-brain.</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">State Durability</td>
          <td className="px-4 py-3 text-slate-300">Persistent HardState, entries, snapshots.</td>
          <td className="px-4 py-3 text-slate-300">Crash-safe recovery.</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Command Interface</td>
          <td className="px-4 py-3 text-slate-300">SQL functions for init, membership, diagnostics.</td>
          <td className="px-4 py-3 text-slate-300">Native DB admin UX.</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">Monitoring Hooks</td>
          <td className="px-4 py-3 text-slate-300">Cluster status, log stats, leader checks.</td>
          <td className="px-4 py-3 text-slate-300">Simplifies observability.</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Node Membership</td>
          <td className="px-4 py-3 text-slate-300">Add/remove nodes through leader replication.</td>
          <td className="px-4 py-3 text-slate-300">Controlled scaling.</td>
        </tr>
      </tbody>
    </table>
  ),
  docsLinks: [
    { href: '/docs/ram/architecture', title: 'Architecture', desc: 'Learn about RAM’s internal architecture.' },
    { href: '/docs/ram/api', title: 'API Reference', desc: 'Explore the RAM API.' },
  ],
};

export default function RamPage() {
  return <ProjectTemplate {...ramConfig} />;
}