import React from 'react';
import ProjectTemplate from '../_components/ProjectTemplate';
import PgraftDemoTerminal from '@/components/PgraftDemoTerminal';
import { Database, Crown, Network, Shield } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'pgraft - Raft-Based PostgreSQL Extension | pgElephant',
  description: 'pgraft brings automatic leader election, split-brain prevention, and high availability to PostgreSQL clusters with mathematical guarantees. Native Raft consensus for PostgreSQL.',
  keywords: 'PostgreSQL, Raft consensus, leader election, high availability, distributed systems, database clustering',
  openGraph: {
    title: 'pgraft - Raft-Based PostgreSQL Extension',
    description: 'Native Raft consensus for PostgreSQL clusters with automatic leader election and split-brain prevention.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'pgraft - Raft-Based PostgreSQL Extension',
    description: 'Native Raft consensus for PostgreSQL clusters with automatic leader election and split-brain prevention.',
  },
};

// Custom pgraft icon component
const PgraftIcon = ({ size = 80 }: { size?: number }) => (
  <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
    <Database className="text-blue-400 animate-pulse" style={{ width: size * 0.6, height: size * 0.6 }} />
    <Crown className="text-yellow-400 absolute -top-2 -right-2 animate-bounce" style={{ width: size * 0.3, height: size * 0.3, animationDelay: '0.5s' }} />
    <Network className="text-green-400 absolute -bottom-2 -left-2 animate-pulse" style={{ width: size * 0.25, height: size * 0.25, animationDelay: '1s' }} />
    <Shield className="text-purple-400 absolute -bottom-2 -right-2 animate-pulse" style={{ width: size * 0.2, height: size * 0.2, animationDelay: '1.5s' }} />
    </div>
)

const pgraftConfig = {
  hero: {
    title: 'pgraft: Raft-Based PostgreSQL Extension',
    subtitle: 'Native Raft consensus for PostgreSQL clusters with automatic leader election and split-brain prevention',
    projectName: 'pgraft',
    icon: <PgraftIcon size={80} />,
  },
  badges: [
    'PostgreSQL 16–18',
    'Strong Consistency',
    'Zero Split-Brain',
    'Raft Consensus',
    'Background Worker',
  ],
  demo: <PgraftDemoTerminal />,
  featurePillars: {
    kicker: 'Overview',
    items: [
      { title: 'Production-Grade Consensus', desc: 'Built on proven libraft implementation for reliable leader election and distributed consensus.' },
      { title: 'Transparent Operations', desc: 'All cluster state is inspectable through SQL functions—no external dependencies or control planes.' },
      { title: 'Fast Recovery', desc: 'Automatic failover with deterministic leader elections and quick recovery during network partitions.' },
      { title: 'Operational Simplicity', desc: 'Pure PostgreSQL extension with minimal configuration. Ideal for both development and production.' },
      { title: 'Durable & Crash Safe', desc: 'Persistent Raft state and log entries ensure cluster consistency after restarts or failures.' },
      { title: 'Native Integration', desc: 'Seamlessly integrates with PostgreSQL using background workers and shared memory IPC.' },
    ],
  },
  features: [
    { icon: '', iconColor: 'text-indigo-400', title: 'Native PostgreSQL Extension', desc: 'Seamless in-core integration—no external daemons, no sidecars, no wrappers. Deploy and manage consensus directly inside PostgreSQL.' },
    { icon: '', iconColor: 'text-sky-400', title: 'Raft Consensus', desc: 'Reliable leader election, log replication, and strong consistency using the proven Raft algorithm. No split-brain, deterministic failover.' },
    { icon: '', iconColor: 'text-green-400', title: 'Crash-Safe Durability', desc: 'All Raft state and logs are persisted for robust, crash-safe recovery. Survive restarts and failures without data loss or reconfiguration.' },
    { icon: '', iconColor: 'text-yellow-400', title: 'SQL Management Functions', desc: 'Full cluster lifecycle—init, membership, diagnostics, and monitoring—managed via simple SQL functions. No external control plane required.' },
    { icon: '', iconColor: 'text-pink-400', title: 'Observability', desc: 'Inspect cluster state, logs, and leader status with SQL queries. Built-in monitoring hooks for easy integration with dashboards and alerts.' },
    { icon: '', iconColor: 'text-cyan-400', title: 'Dynamic Node Membership', desc: 'Add or remove nodes through consensus. Scale up or down safely, with all changes replicated and agreed by the cluster.' },
    { icon: '', iconColor: 'text-red-400', title: 'Debug & Audit', desc: 'Toggle extended logging, access audit-friendly SQL surfaces, and trace cluster events for compliance and troubleshooting.' },
    { icon: '', iconColor: 'text-violet-400', title: 'Minimal Configuration', desc: 'Production-ready defaults, simple setup, and tuneable parameters. Get started quickly and adapt to your workload needs.' },
    { icon: '', iconColor: 'text-emerald-400', title: 'Background Worker Architecture', desc: 'Efficient, low-overhead operation inside PostgreSQL. Leverages background workers and shared memory for high performance.' },
  ],
  featureMatrix: (
    <>
      <table className="w-full text-sm border border-slate-700 rounded-lg overflow-hidden mb-12">
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
                <tr className="bg-slate-800/60">
                  <td className="px-4 py-3 font-medium text-cyan-300">Debug Mode</td>
                  <td className="px-4 py-3 text-slate-300">Toggle extended logging via SQL.</td>
                  <td className="px-4 py-3 text-slate-300">Faster incident analysis.</td>
                </tr>
              </tbody>
            </table>

      {/* Feature Comparison Table */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-4 text-white">Feature Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-slate-700 rounded-lg overflow-hidden">
            <thead className="bg-slate-800/60">
              <tr className="text-left">
                <th className="px-4 py-3 font-semibold text-white">Feature</th>
                <th className="px-4 py-3 font-semibold text-white">pgraft</th>
                <th className="px-4 py-3 font-semibold text-white">Patroni</th>
                <th className="px-4 py-3 font-semibold text-white">Stolon</th>
                <th className="px-4 py-3 font-semibold text-white">RepMgr</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700 bg-slate-800/40">
              <tr>
                <td className="px-4 py-3 font-medium text-cyan-300">Consensus Protocol</td>
                <td className="px-4 py-3 text-green-400">Raft (libraft)</td>
                <td className="px-4 py-3 text-yellow-300">etcd/Consul</td>
                <td className="px-4 py-3 text-yellow-300">etcd</td>
                <td className="px-4 py-3 text-red-300">None</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-cyan-300">PostgreSQL Integration</td>
                <td className="px-4 py-3 text-green-400">Native Extension</td>
                <td className="px-4 py-3 text-yellow-300">External Agent</td>
                <td className="px-4 py-3 text-yellow-300">External Agent</td>
                <td className="px-4 py-3 text-yellow-300">External Agent</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-cyan-300">Split-Brain Prevention</td>
                <td className="px-4 py-3 text-green-400">✔️</td>
                <td className="px-4 py-3 text-green-400">✔️</td>
                <td className="px-4 py-3 text-green-400">✔️</td>
                <td className="px-4 py-3 text-red-300">✗</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-cyan-300">SQL Interface</td>
                <td className="px-4 py-3 text-green-400">✔️</td>
                <td className="px-4 py-3 text-red-300">✗</td>
                <td className="px-4 py-3 text-red-300">✗</td>
                <td className="px-4 py-3 text-red-300">✗</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-cyan-300">Zero External Dependencies</td>
                <td className="px-4 py-3 text-green-400">✔️</td>
                <td className="px-4 py-3 text-red-300">✗</td>
                <td className="px-4 py-3 text-red-300">✗</td>
                <td className="px-4 py-3 text-green-400">✔️</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-cyan-300">Background Workers</td>
                <td className="px-4 py-3 text-green-400">✔️</td>
                <td className="px-4 py-3 text-red-300">✗</td>
                <td className="px-4 py-3 text-red-300">✗</td>
                <td className="px-4 py-3 text-red-300">✗</td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
    </>
  ),
  docsLinks: [
    { href: '/docs/pgraft/getting-started', title: 'Getting Started', desc: 'Quick start guide for pgraft.' },
    { href: '/docs/pgraft/configuration', title: 'Configuration', desc: 'Setup and configuration options.' },
    { href: '/docs/pgraft/sql-functions', title: 'SQL Functions', desc: 'Complete reference of SQL functions.' },
    { href: '/docs/pgraft/troubleshooting', title: 'Troubleshooting', desc: 'Common issues and solutions.' },
  ],
};

export default function PgraftPage() {
  return <ProjectTemplate {...pgraftConfig} />;
}