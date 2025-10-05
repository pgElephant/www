import React from 'react';
import ProjectTemplate from '../_components/ProjectTemplate';
import PgbalancerDemoTerminal from '@/components/PgbalancerDemoTerminal';
import { Database, Loader2, Zap } from 'lucide-react';

const pgbalancerConfig = {
  hero: {
    title: (
      <div className="flex items-center justify-center gap-4">
        <div className="relative">
          <Database className="w-16 h-16 text-cyan-400" />
          <Loader2 className="w-8 h-8 text-green-400 absolute -top-1 -right-1 animate-spin" />
          <Zap className="w-6 h-6 text-yellow-400 absolute -bottom-1 -left-1" />
        </div>
        <div>
          <div className="text-5xl font-bold mb-2">pgbalancer</div>
          <div className="text-xl text-slate-300">Connection Pooling & Load Balancing for PostgreSQL</div>
        </div>
      </div>
    ),
    subtitle: 'High-performance, cloud-native connection pooler and load balancer for PostgreSQL',
    projectName: 'pgbalancer',
  },
  badges: [
    'Open Source',
    'High Availability',
    'Connection Pooling',
    'Load Balancing',
    'Failover',
    'YAML Config',
    'Prometheus Metrics',
  ],
  demo: <PgbalancerDemoTerminal />,
  featurePillars: {
    kicker: 'Overview',
    items: [
      { title: 'Connection Pooling', desc: 'Multiplex thousands of client connections onto a small pool of backend connections.' },
      { title: 'Load Balancing', desc: 'Distribute queries across multiple PostgreSQL servers for high availability and scale.' },
      { title: 'Automatic Failover', desc: 'Detects backend failures and reroutes connections to healthy nodes.' },
      { title: 'Observability', desc: 'Prometheus metrics, logging, and health checks for full visibility.' },
      { title: 'Cloud Native', desc: 'Lightweight, embeddable, and ready for containerized environments.' },
      { title: 'Security', desc: 'SSL/TLS, authentication, and access control.' },
    ],
  },
  features: [
    { icon: '', iconColor: 'text-indigo-500', title: 'Session/Transaction Pooling', desc: 'Flexible pooling modes for any workload.' },
    { icon: '', iconColor: 'text-sky-500', title: 'Read/Write Split', desc: 'Route queries to primary/replica nodes automatically.' },
    { icon: '', iconColor: 'text-green-500', title: 'Health Checks', desc: 'Automatic backend health monitoring and removal.' },
    { icon: '', iconColor: 'text-yellow-500', title: 'Dynamic Reconfiguration', desc: 'Reload config and update pools without restart.' },
    { icon: '', iconColor: 'text-pink-500', title: 'Prometheus Metrics', desc: 'Built-in metrics endpoint for monitoring.' },
    { icon: '', iconColor: 'text-cyan-500', title: 'Audit Logging', desc: 'Detailed logs for compliance and troubleshooting.' },
    { icon: '', iconColor: 'text-red-500', title: 'Extensible', desc: 'Support for PostgreSQL extensions and custom plugins.' },
    { icon: '', iconColor: 'text-violet-500', title: 'Cloud Ready', desc: 'Optimized for Kubernetes and cloud deployments.' },
    { icon: '', iconColor: 'text-emerald-500', title: 'Open Source', desc: 'MIT licensed, community-driven.' },
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
            <td className="px-4 py-3 font-medium text-cyan-300">Connection Pooling</td>
            <td className="px-4 py-3 text-slate-300">Session, transaction, and statement pooling modes.</td>
            <td className="px-4 py-3 text-slate-300">Reduces backend load, increases throughput.</td>
          </tr>
          <tr className="bg-slate-800/60">
            <td className="px-4 py-3 font-medium text-cyan-300">Load Balancing</td>
            <td className="px-4 py-3 text-slate-300">Distributes queries across multiple servers.</td>
            <td className="px-4 py-3 text-slate-300">High availability, scale-out.</td>
          </tr>
          <tr>
            <td className="px-4 py-3 font-medium text-cyan-300">Failover</td>
            <td className="px-4 py-3 text-slate-300">Automatic detection and rerouting on backend failure.</td>
            <td className="px-4 py-3 text-slate-300">Minimizes downtime.</td>
          </tr>
          <tr className="bg-slate-800/60">
            <td className="px-4 py-3 font-medium text-cyan-300">Observability</td>
            <td className="px-4 py-3 text-slate-300">Prometheus metrics, logging, health checks.</td>
            <td className="px-4 py-3 text-slate-300">Full visibility, easy monitoring.</td>
          </tr>
          <tr>
            <td className="px-4 py-3 font-medium text-cyan-300">Cloud Native</td>
            <td className="px-4 py-3 text-slate-300">Lightweight, embeddable, container-ready.</td>
            <td className="px-4 py-3 text-slate-300">Easy deployment, scaling.</td>
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
                <th className="px-4 py-3 font-semibold text-white">pgbalancer</th>
                <th className="px-4 py-3 font-semibold text-white">pgbouncer</th>
                <th className="px-4 py-3 font-semibold text-white">pgpool-II</th>
                <th className="px-4 py-3 font-semibold text-white">Odyssey</th>
                <th className="px-4 py-3 font-semibold text-white">Supavisor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700 bg-slate-800/40">
              <tr>
                <td className="px-4 py-3 font-medium text-cyan-300">Connection Pooling Modes</td>
                <td className="px-4 py-3 text-green-400">Session, Transaction, Statement</td>
                <td className="px-4 py-3 text-green-400">Session, Transaction, Statement</td>
                <td className="px-4 py-3 text-green-400">Session, Transaction</td>
                <td className="px-4 py-3 text-green-400">Session, Transaction, Statement</td>
                <td className="px-4 py-3 text-green-400">Session, Transaction, Statement</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-cyan-300">Load Balancing</td>
                <td className="px-4 py-3 text-green-400">✔️</td>
                <td className="px-4 py-3 text-yellow-300">Limited</td>
                <td className="px-4 py-3 text-green-400">✔️</td>
                <td className="px-4 py-3 text-green-400">✔️</td>
                <td className="px-4 py-3 text-yellow-300">Limited</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-cyan-300">Automatic Failover</td>
                <td className="px-4 py-3 text-green-400">✔️</td>
                <td className="px-4 py-3 text-yellow-300">Manual</td>
                <td className="px-4 py-3 text-green-400">✔️</td>
                <td className="px-4 py-3 text-green-400">✔️</td>
                <td className="px-4 py-3 text-green-400">✔️</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-cyan-300">Read/Write Split</td>
                <td className="px-4 py-3 text-green-400">✔️</td>
                <td className="px-4 py-3 text-yellow-300">Limited</td>
                <td className="px-4 py-3 text-green-400">✔️</td>
                <td className="px-4 py-3 text-green-400">✔️</td>
                <td className="px-4 py-3 text-yellow-300">Limited</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-cyan-300">Prometheus Metrics</td>
                <td className="px-4 py-3 text-green-400">✔️</td>
                <td className="px-4 py-3 text-yellow-300">Plugin</td>
                <td className="px-4 py-3 text-yellow-300">Plugin</td>
                <td className="px-4 py-3 text-green-400">✔️</td>
                <td className="px-4 py-3 text-green-400">✔️</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-cyan-300">Dynamic Reconfiguration</td>
                <td className="px-4 py-3 text-green-400">✔️</td>
                <td className="px-4 py-3 text-yellow-300">Reload</td>
                <td className="px-4 py-3 text-green-400">✔️</td>
                <td className="px-4 py-3 text-green-400">✔️</td>
                <td className="px-4 py-3 text-green-400">✔️</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-cyan-300">Cloud Native</td>
                <td className="px-4 py-3 text-green-400">✔️</td>
                <td className="px-4 py-3 text-yellow-300">Limited</td>
                <td className="px-4 py-3 text-yellow-300">Limited</td>
                <td className="px-4 py-3 text-green-400">✔️</td>
                <td className="px-4 py-3 text-green-400">✔️</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-cyan-300">Extensibility/Plugins</td>
                <td className="px-4 py-3 text-green-400">✔️</td>
                <td className="px-4 py-3 text-yellow-300">Limited</td>
                <td className="px-4 py-3 text-green-400">✔️</td>
                <td className="px-4 py-3 text-green-400">✔️</td>
                <td className="px-4 py-3 text-yellow-300">Limited</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  ),
  docsLinks: [
    { href: '/docs/pgbalancer/getting-started', title: 'Getting Started', desc: 'Quick start guide for pgbalancer.' },
    { href: '/docs/pgbalancer/configuration', title: 'Configuration', desc: 'YAML config and advanced options.' },
    { href: '/docs/pgbalancer/metrics', title: 'Metrics & Observability', desc: 'Prometheus metrics and monitoring.' },
    { href: '/docs/pgbalancer/internals', title: 'Architecture & Internals', desc: 'Learn about pgbalancer internals.' },
  ],
};

export default function PgBalancerPage() {
  return <ProjectTemplate {...pgbalancerConfig} />;
}
