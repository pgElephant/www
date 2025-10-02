'use client'

import React, { useState, useEffect } from 'react';
import ProjectTemplate from '../_components/ProjectTemplate';
import RaleDemoTerminal from '@/components/RaleDemoTerminal';
import { Terminal, Database, Activity, Users, Shield, Zap, Server } from 'lucide-react';

const raleConfig = {
  hero: {
    title: 'RALE: Resilient Adaptive Leader Election',
    subtitle: 'Raft Log Engine for Distributed Consensus',
    projectName: 'RALE',
    icon: '/ico/RALE_HD.ico',
  },
  badges: [
    'Raft Log Engine',
    'Leader Election',
    'Distributed Consensus',
    'Crash Safe',
    'Observability',
  ],
  demo: (
    <div className="max-w-6xl mx-auto mb-8">
      <RaleDemoTerminal />
    </div>
  ),
  featurePillars: {
    kicker: 'Overview',
    items: [
      { title: 'Raft Log Engine', desc: 'Distributed write-ahead log for consensus operations.' },
      { title: 'Leader Election', desc: 'Automatic leader election with split-brain prevention.' },
      { title: 'Crash Safe', desc: 'Persistent logs for robust recovery and consistency.' },
      { title: 'Distributed Consensus', desc: 'Strong consistency guarantees across nodes.' },
      { title: 'Observability', desc: 'Monitor log state, replication, and cluster health.' },
      { title: 'Minimal Configuration', desc: 'Easy setup and scaling with sensible defaults.' },
    ],
  },
  features: [
    { icon: <Database className="w-5 h-5" />, iconColor: 'text-indigo-500', title: 'Distributed Key-Value Store', desc: 'High-performance replicated key-value storage with strong consistency.' },
    { icon: <Users className="w-5 h-5" />, iconColor: 'text-sky-500', title: 'Raft Consensus', desc: 'Reliable leader election and log replication with split-brain prevention.' },
    { icon: <Shield className="w-5 h-5" />, iconColor: 'text-green-500', title: 'Thread Safety', desc: 'Full multi-threading support with proper synchronization mechanisms.' },
    { icon: <Activity className="w-5 h-5" />, iconColor: 'text-yellow-500', title: 'Network Layer', desc: 'TCP/UDP communication with automatic failover and fault tolerance.' },
    { icon: <Zap className="w-5 h-5" />, iconColor: 'text-pink-500', title: 'Memory Safety', desc: 'Safe allocation/deallocation with comprehensive leak prevention.' },
    { icon: <Terminal className="w-5 h-5" />, iconColor: 'text-cyan-500', title: 'Professional CLI', desc: 'Clean logging without colors or terminal dependencies.' },
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
          <td className="px-4 py-3 font-medium text-cyan-300">Raft Log Engine</td>
          <td className="px-4 py-3 text-slate-300">Distributed write-ahead log for consensus operations.</td>
          <td className="px-4 py-3 text-slate-300">Durable, consistent log replication.</td>
                  </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">Leader Election</td>
          <td className="px-4 py-3 text-slate-300">Automatic leader election with split-brain prevention.</td>
          <td className="px-4 py-3 text-slate-300">Deterministic leadership transitions.</td>
                  </tr>
                  <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Crash Safe</td>
          <td className="px-4 py-3 text-slate-300">Persistent logs for robust recovery.</td>
          <td className="px-4 py-3 text-slate-300">Crash-safe recovery.</td>
                  </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">Distributed Consensus</td>
          <td className="px-4 py-3 text-slate-300">Strong consistency guarantees across nodes.</td>
          <td className="px-4 py-3 text-slate-300">Reliable distributed operations.</td>
                  </tr>
                </tbody>
              </table>
  ),
  docsLinks: [
    { href: '/docs/rale/architecture', title: 'Architecture', desc: 'Learn about RALE\'s internal architecture.' },
    { href: '/docs/rale/api', title: 'API Reference', desc: 'Explore the RALE API.' },
  ],
};

export default function RalePage() {
  return <ProjectTemplate {...raleConfig} />;
}