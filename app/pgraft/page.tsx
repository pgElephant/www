import React from 'react';
import ProjectTemplate from '../_components/ProjectTemplate';
import PgraftDemoTerminal from '@/components/PgraftDemoTerminal';
import { Database, Crown, Network, Shield } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'pgraft - PostgreSQL Raft Consensus Extension | Automatic Leader Election & Zero Split-Brain',
  description: 'Production-ready Raft consensus for distributed PostgreSQL clusters. Built on etcd-io/raft with automatic leader election, crash-safe replication, 100% split-brain prevention, zero-downtime failover, and comprehensive SQL API. Native background worker architecture with no external dependencies.',
  keywords: [
    // Primary keywords
    'postgresql raft', 'raft consensus postgresql', 'postgresql consensus', 'pgraft',
    'postgresql leader election', 'automatic leader election', 'distributed postgresql',
    // High availability
    'postgresql high availability', 'postgresql ha', 'postgresql clustering', 'postgresql failover',
    'zero downtime postgresql', 'split-brain prevention', 'automatic failover postgresql',
    // Distributed systems
    'distributed database', 'distributed consensus', 'consensus algorithm', 'raft algorithm',
    'etcd raft', 'etcd-io raft', 'raft protocol', 'paxos alternative',
    // PostgreSQL clustering
    'postgresql cluster', 'database clustering', 'postgres cluster manager',
    'postgresql replication', 'multi-master postgresql', 'cluster management postgresql',
    // Technical features
    'crash-safe replication', 'log replication', 'state machine replication',
    'quorum-based consensus', 'majority voting', 'term-based leader election',
    // Use cases
    'postgresql production clustering', 'enterprise postgresql ha', 'postgresql disaster recovery',
    'postgres fault tolerance', 'distributed key-value store', 'postgresql synchronization',
    // Alternatives and comparisons
    'patroni alternative', 'stolon alternative', 'repmgr alternative', 'pacemaker postgresql',
    'postgresql ha solutions', 'best postgresql clustering', 'postgresql high availability tools',
    // Extensions and integration
    'postgresql extension', 'postgres background worker', 'postgresql native clustering',
    'sql api clustering', 'postgresql extension ha', 'no external dependencies postgresql'
  ].join(', '),
  openGraph: {
    title: 'pgraft - PostgreSQL Raft Consensus Extension | Leader Election & HA',
    description: 'Production-ready Raft consensus for PostgreSQL with automatic leader election, crash-safe replication, and 100% split-brain prevention. Built on proven etcd-io/raft library.',
    type: 'website',
    url: 'https://www.pgelephant.com/pgraft',
    siteName: 'pgElephant',
    images: [
      {
        url: 'https://www.pgelephant.com/og-pgraft.jpg',
        width: 1200,
        height: 630,
        alt: 'pgraft - PostgreSQL Raft Consensus Extension',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'pgraft - PostgreSQL Raft Consensus | Leader Election & HA',
    description: 'Production-ready Raft consensus for PostgreSQL clusters with automatic leader election, crash-safe replication, and 100% split-brain prevention.',
    images: ['https://www.pgelephant.com/og-pgraft.jpg'],
  },
  alternates: {
    canonical: 'https://www.pgelephant.com/pgraft',
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
    title: 'pgraft: PostgreSQL Raft Consensus Extension',
    subtitle: 'Production-ready Raft consensus for distributed PostgreSQL clusters with automatic leader election, crash-safe replication, and 100% split-brain prevention',
    projectName: 'pgraft',
    icon: <PgraftIcon size={80} />,
  },
  badges: [
    'PostgreSQL 14-17',
    'etcd-io/raft',
    'Zero Split-Brain',
    'Auto Leader Election',
    'Background Worker',
    'etcd-Compatible KV',
  ],
  demo: <PgraftDemoTerminal />,
  featurePillars: {
    kicker: 'Key Features',
    items: [
      { title: 'Automatic Leader Election', desc: 'Quorum-based, deterministic, fully automated leader election using proven etcd-io/raft implementation.' },
      { title: 'Crash-Safe Replication', desc: 'All state changes replicated and persisted across nodes. Survives crashes and network partitions.' },
      { title: '100% Split-Brain Prevention', desc: 'Mathematical guarantee via Raft consensus protocol—never more than one leader per term.' },
      { title: 'Zero-Downtime Failover', desc: 'Sub-second detection and automatic recovery. Seamless failover with no service interruption.' },
      { title: 'Production-Grade Raft', desc: 'Built on proven etcd-io/raft library used in production by etcd, Kubernetes, and other systems.' },
      { title: 'Native PostgreSQL Integration', desc: 'Background worker architecture with no external dependencies. Pure PostgreSQL extension.' },
      { title: 'Comprehensive SQL API', desc: 'Full cluster management via SQL functions. Monitor, manage, and control through standard SQL.' },
      { title: 'Built-in Observability', desc: 'Status functions, metrics, detailed logging, and monitoring hooks for complete cluster visibility.' },
      { title: 'etcd-Compatible KV Store', desc: 'Raft-replicated key-value storage included. Perfect for distributed configuration and coordination.' },
    ],
  },
  featureMatrix: (
    <table className="w-full text-sm border border-slate-700 rounded-lg overflow-hidden">
      <thead className="bg-slate-800/60">
        <tr className="text-left">
          <th className="px-4 py-3 font-semibold text-white">Capability</th>
          <th className="px-4 py-3 font-semibold text-white">Description</th>
          <th className="px-4 py-3 font-semibold text-white">Operational Impact</th>
          <th className="px-4 py-3 font-semibold text-white">Performance</th>
          <th className="px-4 py-3 font-semibold text-white">Scalability</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-700 bg-slate-800/40">
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Consensus (Raft)</td>
          <td className="px-4 py-3 text-slate-300">Leader election, log replication, term monotonicity.</td>
          <td className="px-4 py-3 text-slate-300">Deterministic failover; no split-brain.</td>
          <td className="px-4 py-3 text-slate-300">Sub-second leader election</td>
          <td className="px-4 py-3 text-slate-300">3-5 nodes optimal</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">State Durability</td>
          <td className="px-4 py-3 text-slate-300">Persistent HardState, entries, snapshots.</td>
          <td className="px-4 py-3 text-slate-300">Crash-safe recovery.</td>
          <td className="px-4 py-3 text-slate-300">WAL-based persistence</td>
          <td className="px-4 py-3 text-slate-300">Unlimited log entries</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Command Interface</td>
          <td className="px-4 py-3 text-slate-300">SQL functions for init, membership, diagnostics.</td>
          <td className="px-4 py-3 text-slate-300">Native DB admin UX.</td>
          <td className="px-4 py-3 text-slate-300">Zero-latency SQL access</td>
          <td className="px-4 py-3 text-slate-300">Per-connection scaling</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">Monitoring Hooks</td>
          <td className="px-4 py-3 text-slate-300">Cluster status, log stats, leader checks.</td>
          <td className="px-4 py-3 text-slate-300">Simplifies observability.</td>
          <td className="px-4 py-3 text-slate-300">Real-time metrics</td>
          <td className="px-4 py-3 text-slate-300">Multi-cluster support</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Node Membership</td>
          <td className="px-4 py-3 text-slate-300">Add/remove nodes through leader replication.</td>
          <td className="px-4 py-3 text-slate-300">Controlled scaling.</td>
          <td className="px-4 py-3 text-slate-300">Online reconfiguration</td>
          <td className="px-4 py-3 text-slate-300">Dynamic cluster size</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">Debug Mode</td>
          <td className="px-4 py-3 text-slate-300">Toggle extended logging via SQL.</td>
          <td className="px-4 py-3 text-slate-300">Faster incident analysis.</td>
          <td className="px-4 py-3 text-slate-300">Configurable verbosity</td>
          <td className="px-4 py-3 text-slate-300">Per-node granularity</td>
        </tr>
      </tbody>
    </table>
  ),
  featureComparison: (
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