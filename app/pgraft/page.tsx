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
          <div className="flex flex-col items-center justify-center mb-5">
            <div className="mb-4">
              <img src="/ico/pgraft.ico" alt="pgraft icon" width={64} height={64} className="inline-block align-middle" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight">
              <b>pgraft</b>: Raft based postgresql extension for leader election
            </h1>
            <div className="text-xl font-semibold text-white/90 mt-2">
              Raft-Based PostgresSQL Extension For Leader Election
            </div>
          </div>
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

      {/* Detailed Features List */}
      <section className="py-20 bg-slate-50 border-t border-b">
        <div className="container-wide">
          <SectionHeading kicker="Features">Detailed Features List</SectionHeading>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start gap-4 bg-white rounded-xl shadow p-6 border border-slate-200">
              <span className="text-indigo-500"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M12 3v18m9-9H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <div>
                <h4 className="font-bold text-lg mb-1">Native PostgreSQL Extension</h4>
                <p className="text-slate-600">Seamless in-core integration—no external daemons, no sidecars, no wrappers. Deploy and manage consensus directly inside PostgreSQL.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white rounded-xl shadow p-6 border border-slate-200">
              <span className="text-sky-500"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <div>
                <h4 className="font-bold text-lg mb-1">Raft Consensus</h4>
                <p className="text-slate-600">Reliable leader election, log replication, and strong consistency using the proven Raft algorithm. No split-brain, deterministic failover.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white rounded-xl shadow p-6 border border-slate-200">
              <span className="text-green-500"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2"/><path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <div>
                <h4 className="font-bold text-lg mb-1">Crash-Safe Durability</h4>
                <p className="text-slate-600">All Raft state and logs are persisted for robust, crash-safe recovery. Survive restarts and failures without data loss or reconfiguration.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white rounded-xl shadow p-6 border border-slate-200">
              <span className="text-yellow-500"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/></svg></span>
              <div>
                <h4 className="font-bold text-lg mb-1">SQL Management Functions</h4>
                <p className="text-slate-600">Full cluster lifecycle—init, membership, diagnostics, and monitoring—managed via simple SQL functions. No external control plane required.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white rounded-xl shadow p-6 border border-slate-200">
              <span className="text-pink-500"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></span>
              <div>
                <h4 className="font-bold text-lg mb-1">Observability</h4>
                <p className="text-slate-600">Inspect cluster state, logs, and leader status with SQL queries. Built-in monitoring hooks for easy integration with dashboards and alerts.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white rounded-xl shadow p-6 border border-slate-200">
              <span className="text-cyan-500"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2"/><path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <div>
                <h4 className="font-bold text-lg mb-1">Dynamic Node Membership</h4>
                <p className="text-slate-600">Add or remove nodes through consensus. Scale up or down safely, with all changes replicated and agreed by the cluster.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white rounded-xl shadow p-6 border border-slate-200">
              <span className="text-red-500"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></span>
              <div>
                <h4 className="font-bold text-lg mb-1">Debug & Audit</h4>
                <p className="text-slate-600">Toggle extended logging, access audit-friendly SQL surfaces, and trace cluster events for compliance and troubleshooting.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white rounded-xl shadow p-6 border border-slate-200">
              <span className="text-violet-500"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2"/><path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></span>
              <div>
                <h4 className="font-bold text-lg mb-1">Minimal Configuration</h4>
                <p className="text-slate-600">Production-ready defaults, simple setup, and tuneable parameters. Get started quickly and adapt to your workload needs.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white rounded-xl shadow p-6 border border-slate-200">
              <span className="text-emerald-500"><svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></span>
              <div>
                <h4 className="font-bold text-lg mb-1">Background Worker Architecture</h4>
                <p className="text-slate-600">Efficient, low-overhead operation inside PostgreSQL. Leverages background workers and shared memory for high performance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Feature Matrix */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.25),transparent_60%)]" />
        <div className="container-wide relative z-10">
          <SectionHeading kicker="Depth" className="text-white">Feature Matrix</SectionHeading>
          <div className="overflow-x-auto">
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
                <tr className="bg-slate-800/60">
                  <td className="px-4 py-3 font-medium text-cyan-300">Debug Mode</td>
                  <td className="px-4 py-3 text-slate-300">Toggle extended logging via SQL.</td>
                  <td className="px-4 py-3 text-slate-300">Faster incident analysis.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-slate-400">Full reference: <Link href="/docs/pgraft/user-guide/sql-functions" className="text-indigo-400 hover:underline">SQL Functions Guide</Link></p>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-20 bg-slate-50">
        <div className="container-wide">
          <SectionHeading kicker="Internals">Technical Documentation</SectionHeading>
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-slate-600 mb-8">
              Dive deep into pgraft's technical details, architecture, and internal workings with our comprehensive documentation.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <Link href="/docs/pgraft/internals/architecture" className="bg-white p-6 rounded-xl border border-slate-200 hover:border-indigo-300 transition-colors">
                <h3 className="font-semibold text-lg text-slate-900 mb-2">Architecture</h3>
                <p className="text-sm text-slate-600">Learn about pgraft's internal architecture and design decisions.</p>
              </Link>
              <Link href="/docs/pgraft/internals/worker-lifecycle" className="bg-white p-6 rounded-xl border border-slate-200 hover:border-indigo-300 transition-colors">
                <h3 className="font-semibold text-lg text-slate-900 mb-2">Worker Lifecycle</h3>
                <p className="text-sm text-slate-600">Understand the states and transitions of pgraft workers.</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PgraftPage;