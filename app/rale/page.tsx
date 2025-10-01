'use client'

import React, { useState, useEffect } from 'react';
import ProjectTemplate from '../_components/ProjectTemplate';
import { Terminal, Database, Activity, Users, Shield, Zap, Server } from 'lucide-react';

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
    <div className="max-w-6xl mx-auto mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* raled daemon terminal */}
        <div className="bg-gray-900 rounded-xl p-4 text-white font-mono text-xs shadow-lg border border-gray-800">
          <div className="flex items-center mb-3">
            <div className="flex gap-1 mr-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-green-300">raled</span>
          </div>
          <pre className="whitespace-pre-line text-green-200">{`> raled --config conf/raled1.conf
[INFO] RALE daemon starting...
[INFO] Node ID: 1, Name: node1
[INFO] RALE port: 7400, DStore port: 7401
[INFO] Data directory: ./data
[INFO] Consensus initialized
[INFO] Distributed store ready
[INFO] Listening on 127.0.0.1:7400
[INFO] Cluster ready

> raled --config conf/raled2.conf &
> raled --config conf/raled3.conf &
`}</pre>
        </div>
        
        {/* ralectrl CLI terminal */}
        <div className="bg-gray-900 rounded-xl p-4 text-white font-mono text-xs shadow-lg border border-gray-800">
          <div className="flex items-center mb-3">
            <div className="flex gap-1 mr-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-blue-300">ralectrl</span>
          </div>
          <pre className="whitespace-pre-line text-blue-200">{`> ralectrl STATUS
Cluster State: Healthy
Leader: node1 (127.0.0.1:7400)
Term: 15
Nodes: 3
  - node1 (Leader)
  - node2 (Follower)
  - node3 (Follower)

> ralectrl ADD --node-id 4 --node-name "node4"
Node node4 added to cluster
Cluster size: 4 nodes

> ralectrl LIST
Node ID | Name  | IP         | RALE Port | DStore Port
--------|-------|------------|-----------|------------
      1 | node1 | 127.0.0.1  | 7400      | 7401
      2 | node2 | 127.0.0.1  | 7402      | 7403
      3 | node3 | 127.0.0.1  | 7404      | 7405
      4 | node4 | 127.0.0.1  | 7406      | 7407
`}</pre>
        </div>
        
        {/* librale library terminal */}
        <div className="bg-gray-900 rounded-xl p-4 text-white font-mono text-xs shadow-lg border border-gray-800">
          <div className="flex items-center mb-3">
            <div className="flex gap-1 mr-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-purple-300">librale</span>
          </div>
          <pre className="whitespace-pre-line text-purple-200">{`> ./benchmark_tool
RALE Performance Benchmark
==========================
Consensus Operations: 1000 ops/sec
Storage Operations: 10000 ops/sec
Write Latency: <10ms
Read Latency: <1ms

> librale_dstore_put("key1", "value1", 6)
Success: Entry stored at index 1024

> librale_dstore_get("key1", buffer, &len)
Success: Retrieved "value1" (6 bytes)
`}</pre>
        </div>
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