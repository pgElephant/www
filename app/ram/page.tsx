import React from 'react';
import ProjectTemplate from '../_components/ProjectTemplate';
import RamDemoTerminal from '@/components/RamDemoTerminal';
import { Server, Cpu, Activity, Shield } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RAM - AI-Powered Resilient Adaptive Manager for PostgreSQL | pgElephant',
  description: 'RAM provides AI-driven PostgreSQL clustering with intelligent automatic failover, machine learning-powered resource management, and AI-enhanced real-time monitoring with predictive scaling.',
  keywords: 'AI PostgreSQL clustering, intelligent automatic failover, machine learning database, AI resource management, predictive scaling, enterprise-grade, artificial intelligence',
  openGraph: {
    title: 'RAM - AI-Powered Resilient Adaptive Manager for PostgreSQL',
    description: 'AI-driven PostgreSQL clustering with intelligent automatic failover and machine learning-powered resource management.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RAM - AI-Powered Resilient Adaptive Manager for PostgreSQL',
    description: 'AI-driven PostgreSQL clustering with intelligent automatic failover and machine learning-powered resource management.',
  },
};

// Custom RAM icon component
const RamIcon = ({ size = 80 }: { size?: number }) => (
  <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
    <Server className="text-cyan-400 animate-pulse" style={{ width: size * 0.6, height: size * 0.6 }} />
    <Cpu className="text-green-400 absolute -top-2 -right-2 animate-bounce" style={{ width: size * 0.3, height: size * 0.3, animationDelay: '0.2s' }} />
    <Activity className="text-orange-400 absolute -bottom-2 -left-2 animate-pulse" style={{ width: size * 0.25, height: size * 0.25, animationDelay: '0.7s' }} />
    <Shield className="text-purple-400 absolute -bottom-2 -right-2 animate-pulse" style={{ width: size * 0.2, height: size * 0.2, animationDelay: '1.1s' }} />
  </div>
)

const ramConfig = {
  hero: {
    title: 'RAM: AI-Powered Resilient Adaptive Manager',
    subtitle: 'Intelligent PostgreSQL Auto-Failover with Machine Learning',
    projectName: 'RAM',
    icon: <RamIcon size={80} />,
  },
  badges: [
    'AI-Powered Clustering',
    'Machine Learning',
    'Intelligent Failover',
    'Predictive Monitoring',
    'Self-Healing',
  ],
    demo: <RamDemoTerminal />,
  featurePillars: {
    kicker: 'Overview',
    items: [
      { title: 'AI-Native PostgreSQL Extension', desc: 'Intelligent in-core integration with machine learning capabilities.' },
      { title: 'Predictive Consensus', desc: 'AI-enhanced Raft consensus with predictive leader election.' },
      { title: 'Self-Healing Architecture', desc: 'AI-driven crash recovery and persistent state management.' },
      { title: 'Intelligent SQL Management', desc: 'AI-powered cluster lifecycle management via SQL.' },
      { title: 'Predictive Observability', desc: 'Machine learning-based cluster monitoring and anomaly detection.' },
      { title: 'Zero-Touch Configuration', desc: 'AI-optimized defaults with intelligent auto-configuration.' },
    ],
  },
  features: [
    { icon: '', iconColor: 'text-indigo-500', title: 'AI-Enhanced Consensus', desc: 'Machine learning-optimized leader election and log replication.' },
    { icon: '', iconColor: 'text-sky-500', title: 'Intelligent State Management', desc: 'AI-driven persistent state and predictive snapshots.' },
    { icon: '', iconColor: 'text-green-500', title: 'Smart Command Interface', desc: 'AI-powered SQL functions for intelligent cluster management.' },
    { icon: '', iconColor: 'text-yellow-500', title: 'Predictive Monitoring', desc: 'Machine learning-based anomaly detection and health prediction.' },
    { icon: '', iconColor: 'text-pink-500', title: 'Adaptive Membership', desc: 'AI-driven node scaling with intelligent resource allocation.' },
    { icon: '', iconColor: 'text-cyan-500', title: 'Intelligent Debug Mode', desc: 'AI-enhanced logging with smart diagnostic insights.' },
    { icon: '', iconColor: 'text-red-500', title: 'Self-Healing Recovery', desc: 'Machine learning-powered crash recovery and auto-repair.' },
    { icon: '', iconColor: 'text-violet-500', title: 'AI-Native Admin UX', desc: 'Intelligent database administration with ML insights.' },
    { icon: '', iconColor: 'text-emerald-500', title: 'Adaptive Background Worker', desc: 'AI-optimized, self-tuning operation with minimal overhead.' },
  ],
  featureMatrix: (
    <table className="w-full text-sm border border-slate-700 rounded-lg overflow-hidden">
      <thead className="bg-slate-800/60">
        <tr className="text-left">
          <th className="px-4 py-3 font-semibold text-white">AI Capability</th>
          <th className="px-4 py-3 font-semibold text-white">Description</th>
          <th className="px-4 py-3 font-semibold text-white">Operational Impact</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-700 bg-slate-800/40">
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">AI-Enhanced Consensus</td>
          <td className="px-4 py-3 text-slate-300">Machine learning-optimized leader election and intelligent log replication.</td>
          <td className="px-4 py-3 text-slate-300">Predictive failover; intelligent split-brain prevention.</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">Intelligent State Management</td>
          <td className="px-4 py-3 text-slate-300">AI-driven persistent state with predictive snapshots and smart recovery.</td>
          <td className="px-4 py-3 text-slate-300">Self-healing crash recovery with minimal downtime.</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Smart Command Interface</td>
          <td className="px-4 py-3 text-slate-300">AI-powered SQL functions with intelligent cluster management and diagnostics.</td>
          <td className="px-4 py-3 text-slate-300">Autonomous database administration with ML insights.</td>
        </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">Predictive Monitoring</td>
          <td className="px-4 py-3 text-slate-300">Machine learning-based health monitoring with anomaly detection and prediction.</td>
          <td className="px-4 py-3 text-slate-300">Proactive issue prevention and intelligent alerting.</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Adaptive Node Management</td>
          <td className="px-4 py-3 text-slate-300">AI-driven node scaling with intelligent resource allocation and replication.</td>
          <td className="px-4 py-3 text-slate-300">Autonomous scaling with optimal resource utilization.</td>
        </tr>
      </tbody>
    </table>
  ),
  featureComparison: (
    <table className="w-full text-sm border border-slate-700 rounded-lg overflow-hidden">
      <thead className="bg-slate-800/60">
        <tr className="text-left">
          <th className="px-4 py-3 font-semibold text-white">Feature</th>
          <th className="px-4 py-3 font-semibold text-white">RAM</th>
          <th className="px-4 py-3 font-semibold text-white">Patroni</th>
          <th className="px-4 py-3 font-semibold text-white">Stolon</th>
          <th className="px-4 py-3 font-semibold text-white">RepMgr</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-700 bg-slate-800/40">
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">AI-Enhanced Consensus</td>
          <td className="px-4 py-3 text-green-400">✔️ ML-Optimized</td>
          <td className="px-4 py-3 text-yellow-300">etcd/Consul</td>
          <td className="px-4 py-3 text-yellow-300">etcd</td>
          <td className="px-4 py-3 text-red-300">None</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">PostgreSQL Integration</td>
          <td className="px-4 py-3 text-green-400">AI-Native Extension</td>
          <td className="px-4 py-3 text-yellow-300">External Agent</td>
          <td className="px-4 py-3 text-yellow-300">External Agent</td>
          <td className="px-4 py-3 text-yellow-300">External Agent</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Predictive Monitoring</td>
          <td className="px-4 py-3 text-green-400">✔️ ML-Powered</td>
          <td className="px-4 py-3 text-yellow-300">Basic</td>
          <td className="px-4 py-3 text-yellow-300">Basic</td>
          <td className="px-4 py-3 text-red-300">✗</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Intelligent SQL Interface</td>
          <td className="px-4 py-3 text-green-400">✔️ AI-Enhanced</td>
          <td className="px-4 py-3 text-red-300">✗</td>
          <td className="px-4 py-3 text-red-300">✗</td>
          <td className="px-4 py-3 text-red-300">✗</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Self-Healing Architecture</td>
          <td className="px-4 py-3 text-green-400">✔️ AI-Driven</td>
          <td className="px-4 py-3 text-yellow-300">Manual</td>
          <td className="px-4 py-3 text-yellow-300">Manual</td>
          <td className="px-4 py-3 text-red-300">✗</td>
        </tr>
        <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Adaptive Resource Management</td>
          <td className="px-4 py-3 text-green-400">✔️ ML-Based</td>
          <td className="px-4 py-3 text-red-300">✗</td>
          <td className="px-4 py-3 text-red-300">✗</td>
          <td className="px-4 py-3 text-red-300">✗</td>
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