'use client'

import React, { useState, useEffect } from 'react';
import ProjectTemplate from '../_components/ProjectTemplate';
import { Terminal, Server, Activity, Users, Shield, Zap } from 'lucide-react';

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
    demo: (
      <div className="max-w-6xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ramctrl terminal */}
          <div className="bg-gray-900 rounded-xl p-4 text-white font-mono text-xs shadow-lg border border-gray-800">
            <div className="flex items-center mb-3">
              <div className="flex gap-1 mr-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-blue-300">ramctrl</span>
            </div>
            <pre className="whitespace-pre-line text-blue-200">{`> ramctrl status
Cluster State: Healthy
Leader: node1 (192.168.1.10:5432)
Followers: 2
  - node2 (192.168.1.11:5432)
  - node3 (192.168.1.12:5432)

> ramctrl failover
Initiating failover...
New Leader: node2
Failover completed in 1.2s

> ramctrl add-node node4
Node node4 added to cluster
Cluster size: 4 nodes
`}</pre>
          </div>
          
          {/* ramd daemon terminal */}
          <div className="bg-gray-900 rounded-xl p-4 text-white font-mono text-xs shadow-lg border border-gray-800">
            <div className="flex items-center mb-3">
              <div className="flex gap-1 mr-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-green-300">ramd</span>
            </div>
            <pre className="whitespace-pre-line text-green-200">{`> ramd start --config /etc/ram/ramd.conf
[INFO] RAMD daemon starting...
[INFO] PostgreSQL connection established
[INFO] Raft consensus initialized
[INFO] HTTP API listening on :8080
[INFO] Prometheus metrics on :9090
[INFO] Cluster health check: PASS
[INFO] Ready to serve requests

> curl http://localhost:8080/health
{"status":"healthy","leader":"node1","nodes":3}
`}</pre>
          </div>
          
          {/* pgraft extension terminal */}
          <div className="bg-gray-900 rounded-xl p-4 text-white font-mono text-xs shadow-lg border border-gray-800">
            <div className="flex items-center mb-3">
              <div className="flex gap-1 mr-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-purple-300">pgraft</span>
            </div>
            <pre className="whitespace-pre-line text-purple-200">{`> psql -c "SELECT * FROM pgraft_status();"
 node_id | role    | term | commit_index
---------+---------+------+-------------
       1 | leader  |   15 |         1024
       2 | follower|   15 |         1024
       3 | follower|   15 |         1024

> psql -c "SELECT pgraft_add_node(4, 'node4', '192.168.1.13');"
 pgraft_add_node
-----------------
 t
(1 row)
`}</pre>
          </div>
        </div>
      </div>
    ),
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