import React from 'react';
import ProjectTemplate from '../_components/ProjectTemplate';

const pgbalancerConfig = {
  hero: {
    title: 'pgbalancer: Connection Pooling & Load Balancing for PostgreSQL',
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
  demo: (
    <div className="max-w-6xl mx-auto mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Client terminal */}
        <div className="bg-gray-900 rounded-xl p-4 text-white font-mono text-xs shadow-lg border border-gray-800">
          <div className="flex items-center mb-3">
            <div className="flex gap-1 mr-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-gray-300">psql (client)</span>
          </div>
          <pre className="whitespace-pre-line text-green-300">{`$ psql -h 127.0.0.1 -p 6432 -U appuser appdb\nPassword for user appuser: \nappdb=> SELECT count(*) FROM users;\n count \n-------\n   42\n`}</pre>
        </div>
        {/* pgbalancer terminal */}
        <div className="bg-gray-900 rounded-xl p-4 text-white font-mono text-xs shadow-lg border border-gray-800">
          <div className="flex items-center mb-3">
            <div className="flex gap-1 mr-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-cyan-300">pgbalancer</span>
          </div>
          <pre className="whitespace-pre-line text-cyan-200">{`$ pgbalancer -c pgbalancer.yaml\n[INFO] Starting pgbalancer...\n[INFO] Listening on 0.0.0.0:6432\n[INFO] Connected to PostgreSQL backend(s)\n[INFO] Pool mode: session\n[INFO] Load balancing enabled\n[INFO] Accepting client connections\n`}</pre>
        </div>
        {/* postgresql terminal */}
        <div className="bg-gray-900 rounded-xl p-4 text-white font-mono text-xs shadow-lg border border-gray-800">
          <div className="flex items-center mb-3">
            <div className="flex gap-1 mr-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-yellow-200">postgresql</span>
          </div>
          <pre className="whitespace-pre-line text-yellow-100">{`2025-10-05 12:00:00 [INFO] connection from pgbalancer (127.0.0.1:6432)\n2025-10-05 12:00:00 [INFO] query: SELECT count(*) FROM users;\n2025-10-05 12:00:00 [INFO] result: 42 rows\n`}</pre>
        </div>
      </div>
    </div>
  ),
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
