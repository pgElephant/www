import React from 'react';
import { BookOpen, Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import PgraftDemoTerminal from '@/components/PgraftDemoTerminal';

/* ===================== Small Reusable UI Parts ===================== */
function SectionHeading({ children, kicker, className = '' }: { children: React.ReactNode; kicker?: string; className?: string }) {
  return (
    <div className={`text-center mb-14 ${className}`}>
      {kicker && <div className="text-xs tracking-wider font-semibold text-indigo-500 uppercase mb-2">{kicker}</div>}
      <h2 className={`text-3xl md:text-4xl font-bold ${className === 'text-white' ? 'text-white' : 'text-slate-900'} mb-3`}>{children}</h2>
      <div className="mx-auto h-1 w-28 bg-gradient-to-r from-indigo-500 to-sky-500 rounded" />
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200 p-6 flex flex-col">
      <h4 className="font-semibold text-lg mb-2 text-slate-900">{title}</h4>
      <p className="text-slate-600 text-sm leading-relaxed flex-1">{desc}</p>
    </div>
  );
}

function SqlCard({ fn, desc }: { fn: string; desc: string }) {
  return (
    <div className="bg-slate-900 rounded-xl p-5 text-white border border-slate-700 flex flex-col">
      <div className="font-mono text-green-400 text-sm mb-2 break-all">{fn}</div>
      <div className="text-slate-300 text-xs leading-relaxed flex-1">{desc}</div>
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-slate-900 text-green-300 rounded-lg p-5 text-xs md:text-sm overflow-x-auto leading-relaxed border border-slate-800 shadow-inner">
      {code}
    </pre>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-block bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-md border border-slate-200 mr-2 mb-2">{children}</span>;
}

/* ===================== Page Component ===================== */
const PgraftPage = () => {
  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.25),transparent_60%)]" />
        <div className="container-wide relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-5 tracking-tight">
            pgraft: Raft based postgresql extension for leader election
          </h1>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-white mb-4">Command Line Examples</h3>
          </div>
          <div className="max-w-4xl mx-auto">
            <PgraftDemoTerminal />
          </div>
          <div className="mt-8 flex flex-wrap justify-center">
            <Badge>PostgreSQL 16–18</Badge>
            <Badge>Strong Consistency</Badge>
            <Badge>Zero Split-Brain</Badge>
            <Badge>Raft Consensus</Badge>
            <Badge>Background Worker</Badge>
          </div>
        </div>
      </section>

      {/* High-Level Feature Pillars */}
      <section className="py-20 bg-slate-50">
        <div className="container-wide">
          <SectionHeading kicker="Overview">Why pgraft</SectionHeading>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard title="Production-Grade Consensus" desc="Built on proven libraft implementation for reliable leader election and distributed consensus." />
            <FeatureCard title="Transparent Operations" desc="All cluster state is inspectable through SQL functions—no external dependencies or control planes." />
            <FeatureCard title="Fast Recovery" desc="Automatic failover with deterministic leader elections and quick recovery during network partitions." />
            <FeatureCard title="Operational Simplicity" desc="Pure PostgreSQL extension with minimal configuration. Ideal for both development and production." />
            <FeatureCard title="Durable & Crash Safe" desc="Persistent Raft state and log entries ensure cluster consistency after restarts or failures." />
            <FeatureCard title="Native Integration" desc="Seamlessly integrates with PostgreSQL using background workers and shared memory IPC." />
          </div>
        </div>
      </section>

      {/* Detailed Features List (Hero Section) */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 via-sky-500 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="container-wide relative z-10">
          <div className="text-center mb-16">
            <div className="text-xs tracking-wider font-semibold text-white uppercase mb-2">Features</div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">Detailed Features List</h2>
            <p className="max-w-2xl mx-auto text-lg text-slate-100/90 font-medium">Everything you need for robust, distributed PostgreSQL—built in.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div className="flex items-start gap-4 bg-indigo-700/80 rounded-2xl shadow-xl p-8 border border-indigo-400/30">
              <span className="text-white"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M12 3v18m9-9H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <div>
                <h4 className="font-bold text-xl mb-2">Native PostgreSQL Extension</h4>
                <p className="text-slate-100/90">Seamless in-core integration—no external daemons, no sidecars, no wrappers. Deploy and manage consensus directly inside PostgreSQL.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-indigo-700/80 rounded-2xl shadow-xl p-8 border border-indigo-400/30">
              <span className="text-white"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <div>
                <h4 className="font-bold text-xl mb-2">Raft Consensus</h4>
                <p className="text-slate-100/90">Reliable leader election, log replication, and strong consistency using the proven Raft algorithm. No split-brain, deterministic failover.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-indigo-700/80 rounded-2xl shadow-xl p-8 border border-indigo-400/30">
              <span className="text-white"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2"/><path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <div>
                <h4 className="font-bold text-xl mb-2">Crash-Safe Durability</h4>
                <p className="text-slate-100/90">All Raft state and logs are persisted for robust, crash-safe recovery. Survive restarts and failures without data loss or reconfiguration.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-indigo-700/80 rounded-2xl shadow-xl p-8 border border-indigo-400/30">
              <span className="text-white"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/></svg></span>
              <div>
                <h4 className="font-bold text-xl mb-2">SQL Management Functions</h4>
                <p className="text-slate-100/90">Full cluster lifecycle—init, membership, diagnostics, and monitoring—managed via simple SQL functions. No external control plane required.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-indigo-700/80 rounded-2xl shadow-xl p-8 border border-indigo-400/30">
              <span className="text-white"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></span>
              <div>
                <h4 className="font-bold text-xl mb-2">Observability</h4>
                <p className="text-slate-100/90">Inspect cluster state, logs, and leader status with SQL queries. Built-in monitoring hooks for easy integration with dashboards and alerts.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-indigo-700/80 rounded-2xl shadow-xl p-8 border border-indigo-400/30">
              <span className="text-white"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2"/><path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <div>
                <h4 className="font-bold text-xl mb-2">Dynamic Node Membership</h4>
                <p className="text-slate-100/90">Add or remove nodes through consensus. Scale up or down safely, with all changes replicated and agreed by the cluster.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-indigo-700/80 rounded-2xl shadow-xl p-8 border border-indigo-400/30">
              <span className="text-white"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></span>
              <div>
                <h4 className="font-bold text-xl mb-2">Debug & Audit</h4>
                <p className="text-slate-100/90">Toggle extended logging, access audit-friendly SQL surfaces, and trace cluster events for compliance and troubleshooting.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-indigo-700/80 rounded-2xl shadow-xl p-8 border border-indigo-400/30">
              <span className="text-white"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2"/><path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></span>
              <div>
                <h4 className="font-bold text-xl mb-2">Minimal Configuration</h4>
                <p className="text-slate-100/90">Production-ready defaults, simple setup, and tuneable parameters. Get started quickly and adapt to your workload needs.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-indigo-700/80 rounded-2xl shadow-xl p-8 border border-indigo-400/30">
              <span className="text-white"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></span>
              <div>
                <h4 className="font-bold text-xl mb-2">Background Worker Architecture</h4>
                <p className="text-slate-100/90">Efficient, low-overhead operation inside PostgreSQL. Leverages background workers and shared memory for high performance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Matrix (Non-hero, technical table) */}
      <section className="py-16 bg-white border-t">
        <div className="container-wide">
          <div className="mb-10 text-center">
            <div className="text-xs tracking-wider font-semibold text-indigo-500 uppercase mb-2">Depth</div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Feature Matrix</h2>
            <p className="max-w-2xl mx-auto text-base text-slate-600">Technical breakdown of core mechanisms and operational impact.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100">
                <tr className="text-left">
                  <th className="px-4 py-3 font-semibold text-slate-700">Capability</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Description</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Operational Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                <tr>
                  <td className="px-4 py-3 font-medium text-indigo-700">Consensus (Raft)</td>
                  <td className="px-4 py-3 text-slate-700">Leader election, log replication, term monotonicity, and cluster-wide agreement on all writes.</td>
                  <td className="px-4 py-3 text-slate-600">Deterministic failover, no split-brain, and strong consistency guarantees.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-indigo-700">State Durability</td>
                  <td className="px-4 py-3 text-slate-700">Persistent HardState, log entries, and periodic snapshots for crash-safe recovery.</td>
                  <td className="px-4 py-3 text-slate-600">No data loss on restart, fast recovery, and robust cluster state.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-indigo-700">Command Interface</td>
                  <td className="px-4 py-3 text-slate-700">SQL functions for cluster init, membership changes, diagnostics, and monitoring.</td>
                  <td className="px-4 py-3 text-slate-600">Native DB admin UX, no external tools required.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-indigo-700">Monitoring Hooks</td>
                  <td className="px-4 py-3 text-slate-700">Cluster status, log stats, leader checks, and health endpoints.</td>
                  <td className="px-4 py-3 text-slate-600">Easy integration with dashboards and alerting systems.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-indigo-700">Node Membership</td>
                  <td className="px-4 py-3 text-slate-700">Add/remove nodes through leader-driven consensus and replication.</td>
                  <td className="px-4 py-3 text-slate-600">Controlled scaling and safe topology changes.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-indigo-700">Debug Mode</td>
                  <td className="px-4 py-3 text-slate-700">Toggle extended logging and trace cluster events for troubleshooting.</td>
                  <td className="px-4 py-3 text-slate-600">Faster incident analysis and compliance review.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PgraftPage;