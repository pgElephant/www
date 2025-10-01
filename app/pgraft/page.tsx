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
            <p className="text-xl max-w-3xl mx-auto mb-8 text-slate-200">
            A battle-tested PostgreSQL extension that provides reliable leader election, automatic failover, 
            and robust consensus using proven libraft implementation. Built for high-availability clusters 
            with zero split-brain guarantee.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <Link href="/docs/pgraft/getting-started" className="bg-white text-slate-900 hover:bg-slate-100 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 inline-flex items-center shadow">
              <BookOpen className="w-5 h-5 mr-2" /> Get Started
            </Link>
            <a
              href="https://github.com/pgElephant/pgraft"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 inline-flex items-center"
            >
              <Github className="w-5 h-5 mr-2" /> Source <ExternalLink className="w-4 h-4 ml-2" />
            </a>
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

      {/* Installation & Setup */}
      <section className="py-20 bg-white border-t border-b">
        <div className="container-wide">
          <SectionHeading kicker="Setup">Getting Started</SectionHeading>
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-slate-600 mb-8">
              Get up and running with pgraft by following our comprehensive documentation. Our guides cover everything from installation prerequisites to configuration and usage examples.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <Link href="/docs/pgraft/getting-started/installation" className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-indigo-300 transition-colors">
                <h3 className="font-semibold text-lg text-slate-900 mb-2">Installation Guide</h3>
                <p className="text-sm text-slate-600">Step-by-step instructions for installing pgraft and setting up your environment.</p>
              </Link>
              <Link href="/docs/pgraft/getting-started/quick-start" className="bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-indigo-300 transition-colors">
                <h3 className="font-semibold text-lg text-slate-900 mb-2">Quick Start</h3>
                <p className="text-sm text-slate-600">Get a basic cluster up and running with our quick start tutorial.</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-20 bg-slate-50 border-t border-b">
        <div className="container-wide">
          <SectionHeading kicker="Architecture">Design & Components</SectionHeading>
          <div className="max-w-3xl mx-auto">
            <p className="text-slate-600 mb-6">
                            pgraft is a native PostgreSQL extension that leverages libraft, a robust implementation of the Raft consensus algorithm, to provide reliable leader election in distributed PostgreSQL environments.
            </p>
            <p className="text-slate-600 mb-4">
              The extension consists of two primary components:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6 text-slate-600">
              <li>pgraft core - Integration layer with libraft for consensus</li>
              <li>pgraft controller - High-level cluster management and coordination</li>
            </ul>
            <p className="text-slate-600 mb-6">
              These components work in harmony to enable efficient leader election while maintaining full compatibility with PostgreSQL's existing functionality.
            </p>
            <p className="text-slate-600">
              At its foundation, pgraft utilizes PostgreSQL background workers and shared memory IPC for optimal performance. The Raft state and logs are persistently stored to guarantee cluster consistency across restarts.
            </p>
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

      {/* Use Cases */}
      <section className="py-20 bg-white border-t">
        <div className="container-wide">
          <SectionHeading kicker="Adoption">Primary Use Cases</SectionHeading>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard title="Highly Available Writes" desc="Guarantee a single writer ordering path backed by consensus; survive node failures transparently." />
            <FeatureCard title="Edge / Regional Clusters" desc="Deploy compact 3-node consensus groups in latency-sensitive zones for localized workloads." />
            <FeatureCard title="Regulated Environments" desc="Deterministic election & audit-friendly SQL surfaces simplify compliance review and change tracking." />
          </div>
        </div>
      </section>

      {/* Performance Snapshot */}
      <section className="py-20 bg-slate-900 text-slate-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_70%_40%,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="container-wide relative z-10">
          <SectionHeading kicker="Performance">Operational Profile</SectionHeading>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700">
              <div className="text-2xl font-semibold text-white mb-1">~100ms</div>
              <p className="text-xs text-slate-300">Heartbeat Interval (default)</p>
            </div>
            <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700">
              <div className="text-2xl font-semibold text-white mb-1">1–5s</div>
              <p className="text-xs text-slate-300">Election Convergence Window</p>
            </div>
            <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700">
              <div className="text-2xl font-semibold text-white mb-1">&lt;1% CPU</div>
              <p className="text-xs text-slate-300">Idle Worker Overhead</p>
            </div>
            <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700">
              <div className="text-2xl font-semibold text-white mb-1">~50MB</div>
              <p className="text-xs text-slate-300">Resident Memory (node)</p>
            </div>
          </div>
          <p className="text-[11px] mt-6 text-slate-400 text-center">Figures are indicative defaults; tuneable via configuration. Always benchmark with production workload characteristics.</p>
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

      {/* API Documentation */}
      <section className="py-20 bg-white border-t">
        <div className="container-wide">
          <SectionHeading kicker="Interface">API Documentation</SectionHeading>
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-slate-600 mb-8">
              pgraft provides a comprehensive set of SQL functions for cluster management, monitoring, and control. Visit our documentation for detailed API references and usage examples.
            </p>
            <Link 
              href="/docs/pgraft/user-guide/sql-functions" 
              className="inline-block bg-slate-900 text-white hover:bg-slate-800 font-semibold px-8 py-4 rounded-xl transition-all duration-300">
              View Complete API Reference
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison Snapshot */}
      <section className="py-20 bg-slate-900 text-slate-100">
        <div className="container-wide">
          <SectionHeading kicker="Perspective">Comparison Snapshot</SectionHeading>
          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm border border-slate-700 rounded-lg overflow-hidden">
              <thead className="bg-slate-800">
                <tr className="text-left">
                  <th className="px-4 py-3 font-semibold">Aspect</th>
                  <th className="px-4 py-3 font-semibold">pgraft</th>
                  <th className="px-4 py-3 font-semibold">Streaming Replication</th>
                  <th className="px-4 py-3 font-semibold">Patroni-style Stack</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                <tr>
                  <td className="px-4 py-3 font-medium">Failover Determinism</td>
                  <td className="px-4 py-3">Formal Raft quorum</td>
                  <td className="px-4 py-3">Heuristic promotion</td>
                  <td className="px-4 py-3">External DCS policies</td>
                </tr>
                <tr className="bg-slate-800/40">
                  <td className="px-4 py-3 font-medium">Split-Brain Risk</td>
                  <td className="px-4 py-3">Mathematically excluded</td>
                  <td className="px-4 py-3">Possible under race</td>
                  <td className="px-4 py-3">Mitigated by DCS</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Operational Surface</td>
                  <td className="px-4 py-3">In-DB extension only</td>
                  <td className="px-4 py-3">Native + scripts</td>
                  <td className="px-4 py-3">Multiple daemons</td>
                </tr>
                <tr className="bg-slate-800/40">
                  <td className="px-4 py-3 font-medium">Observability</td>
                  <td className="px-4 py-3">SQL introspection</td>
                  <td className="px-4 py-3">Logs + views</td>
                  <td className="px-4 py-3">External + APIs</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Consistency Model</td>
                  <td className="px-4 py-3">Leader-linearized writes</td>
                  <td className="px-4 py-3">Async replication lag</td>
                  <td className="px-4 py-3">Depends on config</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-[11px] text-slate-400">See positioning notes: <Link href="/docs/pgraft/concepts/architecture" className="text-indigo-400 hover:underline">Architecture & Strategy</Link></p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15),transparent_70%)]" />
        <div className="container-wide relative z-10">
          <div className="premium-cta text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ship Reliable Distributed PostgreSQL Today</h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
              Adopt pgraft for strongly consistent, failure-resilient deployment topologies with a minimal operational surface.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/docs/pgraft/getting-started" className="bg-white text-slate-900 hover:bg-slate-100 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 inline-flex items-center shadow">
                <BookOpen className="w-5 h-5 mr-2" /> Get Started
              </Link>
              <a
                href="https://github.com/pgElephant/pgraft"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 inline-flex items-center"
              >
                <Github className="w-5 h-5 mr-2" /> View Source <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PgraftPage;