'use client'

import React, { useState, useEffect } from 'react';
import ProjectTemplate from '../_components/ProjectTemplate';
import RamDemoTerminal from '@/components/RamDemoTerminal';
import { Terminal, Server, Activity, Users, Shield, Zap } from 'lucide-react';

const ramConfig = {
  hero: {
    title: 'RAM: Resilient Adaptive Manager',
    subtitle: 'PostgreSQL Auto-Failover Daemon with Raft Consensus',
    projectName: 'RAM',
    icon: '/ico/RAM_HD.ico',
  },
  badges: [
    'PostgreSQL Clustering',
    'Raft Consensus',
    'Auto Failover',
    'Real-time Monitoring',
    'Production Ready',
  ],
  demo: (
    <div className="max-w-6xl mx-auto mb-8">
      <RamDemoTerminal />
    </div>
  ),
  featurePillars: {
    kicker: 'Overview',
    items: [
      { title: 'Auto-Failover Daemon', desc: 'Intelligent failover with sub-second detection and recovery.' },
      { title: 'Raft Consensus', desc: 'Reliable leader election and strong consistency guarantees.' },
      { title: 'Real-time Monitoring', desc: 'Comprehensive health checks and performance metrics.' },
      { title: 'PostgreSQL Integration', desc: 'Native PostgreSQL clustering with seamless integration.' },
      { title: 'Production Ready', desc: 'Enterprise-grade reliability and operational excellence.' },
      { title: 'Minimal Configuration', desc: 'Production-ready defaults, simple setup and scaling.' },
    ],
  },
  features: [
    { icon: <Zap className="w-5 h-5" />, iconColor: 'text-indigo-500', title: 'Automatic Failover', desc: 'Zero-downtime failover with sub-second detection and leader election.' },
    { icon: <Users className="w-5 h-5" />, iconColor: 'text-sky-500', title: 'Raft Consensus', desc: 'Leader election, log replication, term monotonicity with split-brain prevention.' },
    { icon: <Terminal className="w-5 h-5" />, iconColor: 'text-green-500', title: 'Professional CLI', desc: 'Advanced command-line interface with JSON/table output formats.' },
    { icon: <Activity className="w-5 h-5" />, iconColor: 'text-yellow-500', title: 'Real-time Monitoring', desc: 'Prometheus metrics, Grafana dashboards, and health checks.' },
    { icon: <Shield className="w-5 h-5" />, iconColor: 'text-pink-500', title: 'Enterprise Security', desc: 'Token-based authentication, SSL/TLS, rate limiting, and audit logging.' },
    { icon: <Server className="w-5 h-5" />, iconColor: 'text-cyan-500', title: 'Cloud-Native', desc: 'Docker, Kubernetes, and Helm chart support for modern deployments.' },
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
          <td className="px-4 py-3 font-medium text-cyan-300">Auto-Failover</td>
          <td className="px-4 py-3 text-slate-300">Intelligent failover with sub-second detection and recovery.</td>
          <td className="px-4 py-3 text-slate-300">Zero-downtime operations.</td>
                  </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">Raft Consensus</td>
          <td className="px-4 py-3 text-slate-300">Leader election, log replication, term monotonicity.</td>
          <td className="px-4 py-3 text-slate-300">Deterministic failover; no split-brain.</td>
                  </tr>
                  <tr>
          <td className="px-4 py-3 font-medium text-cyan-300">Real-time Monitoring</td>
          <td className="px-4 py-3 text-slate-300">Comprehensive health checks and performance metrics.</td>
          <td className="px-4 py-3 text-slate-300">Proactive issue detection.</td>
                  </tr>
        <tr className="bg-slate-800/60">
          <td className="px-4 py-3 font-medium text-cyan-300">PostgreSQL Integration</td>
          <td className="px-4 py-3 text-slate-300">Native PostgreSQL clustering with seamless integration.</td>
          <td className="px-4 py-3 text-slate-300">Native DB admin UX.</td>
                  </tr>
                </tbody>
              </table>
  ),
  docsLinks: [
    { href: '/docs/ram/architecture', title: 'Architecture', desc: 'Learn about RAM\'s internal architecture.' },
    { href: '/docs/ram/api', title: 'API Reference', desc: 'Explore the RAM API.' },
  ],
};

export default function RamPage() {
  return <ProjectTemplate {...ramConfig} />;
}