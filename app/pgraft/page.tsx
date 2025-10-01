import React from 'react';
import { BookOpen, Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const DEMO_VIDEO_URL = 'https://www.youtube.com/embed/1u7QpQqQGgE'; // Using home page demo video

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
            pgraft: Distributed PostgreSQL Powered by Raft
          </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8 text-slate-200">
            A production-ready PostgreSQL extension delivering strong consistency, automatic failover,
            log replication, and 100% split-brain protection using the proven etcd-io/raft engine.
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
          <div className="aspect-video w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-700/60 border border-slate-700">
            <iframe
              className="w-full h-full"
              src={DEMO_VIDEO_URL}
              title="pgraft Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
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
            <FeatureCard title="Battle-Tested Consensus" desc="Leverages etcd-io/raft for correctness, liveness and proven reliability in production environments." />
            <FeatureCard title="Transparent Operations" desc="All cluster state is inspectable through SQL functions—no opaque sidecars or proprietary control planes." />
            <FeatureCard title="Fast Recovery" desc="Automatic failover with deterministic leader elections and bounded recovery time under network turbulence." />
            <FeatureCard title="Operational Simplicity" desc="Single extension load + minimal configuration. Scale from laptop dev clusters to production footprints." />
            <FeatureCard title="Durable & Crash Safe" desc="Persistent Raft HardState, log entries and snapshots ensure continuity after ungraceful restarts." />
            <FeatureCard title="Native Postgres UX" desc="Uses PostgreSQL background workers + shared memory IPC for seamless integration and low overhead." />
          </div>
        </div>
      </section>

      {/* Installation & Requirements */}
      <section className="py-20 bg-white border-t border-b">
        <div className="container-wide">
          <SectionHeading kicker="Setup">Installation & Requirements</SectionHeading>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="space-y-6">
              <h3 className="font-semibold text-lg text-slate-900">Prerequisites</h3>
              <ul className="text-sm text-slate-600 list-disc pl-5 space-y-2">
                <li>PostgreSQL 16, 17 or 18 compiled with standard extension toolchain</li>
                <li>Go 1.21+ for building the Raft integration layer</li>
                <li>Build tools: make, gcc/clang, pg_config available in PATH</li>
                <li>Linux or macOS recommended (ARM64 + x86_64 supported)</li>
              </ul>
              <h3 className="font-semibold text-lg text-slate-900 pt-4">Build From Source</h3>
              <CodeBlock code={`git clone https://github.com/pgelephant/pgraft.git\ncd pgraft\nmake clean && make -j\nsudo make install`} />
              <p className="text-xs text-slate-500">More: <Link href="/docs/pgraft/getting-started/installation" className="text-indigo-600 hover:underline">Full Installation Guide</Link></p>
            </div>
            <div className="space-y-6">
              <h3 className="font-semibold text-lg text-slate-900">Configure postgresql.conf</h3>
              <CodeBlock code={`shared_preload_libraries = 'pgraft'\npgraft.cluster_id = 'prod-cluster'\npgraft.node_id = 1\npgraft.address = '127.0.0.1'\npgraft.port = 7001\npgraft.election_timeout = 1000    # ms\npgraft.heartbeat_interval = 100   # ms`} />
              <h3 className="font-semibold text-lg text-slate-900">Initialize</h3>
              <CodeBlock code={`CREATE EXTENSION pgraft;\nSELECT pgraft_init(); -- Run on each node\n-- After leader elected (~10s) add members\nSELECT pgraft_add_node(2,'127.0.0.1',7002);\nSELECT pgraft_add_node(3,'127.0.0.1',7003);`} />
              <p className="text-xs text-slate-500">See <Link href="/docs/pgraft/getting-started/quick-start" className="text-indigo-600 hover:underline">Quick Start</Link> for full multi-node walkthrough.</p>
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

      {/* Monitoring & Observability */}
      <section className="py-20 bg-slate-50 border-t border-b">
        <div className="container-wide">
          <SectionHeading kicker="Operations">Monitoring & Observability</SectionHeading>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="space-y-5 text-sm text-slate-600">
              <p>Core surfaces expose cluster health, leader identity, log progression and worker state. Suitable for scraping into Prometheus via psql exporters or custom scripts.</p>
              <CodeBlock code={`SELECT pgraft_is_leader(), pgraft_get_leader(), pgraft_get_worker_state();\nSELECT * FROM pgraft_get_cluster_status();\nSELECT * FROM pgraft_log_get_stats();`} />
              <p>Integrate with external tooling by wrapping SQL calls in cron / sidecar scripts. Debug mode can be toggled to enrich logs during incident windows.</p>
              <CodeBlock code={`SELECT pgraft_set_debug(true); -- enable\n-- investigative period\nSELECT pgraft_set_debug(false); -- disable`} />
            </div>
            <div className="space-y-5">
              <h3 className="font-semibold text-slate-900 text-lg">Recommended Alerts</h3>
              <ul className="list-disc pl-5 text-sm space-y-2 text-slate-600">
                <li>No leader elected &gt; 10s</li>
                <li>Commit index stalled &gt; threshold</li>
                <li>Excessive elections per hour</li>
                <li>Replication lag between last_index and commit_index widening</li>
                <li>Worker state not RUNNING</li>
              </ul>
              <p className="text-xs text-slate-500">More: <Link href="/docs/pgraft/operations/monitoring" className="text-indigo-600 hover:underline">Monitoring Guide</Link></p>
            </div>
          </div>
        </div>
                  <div key={s.state} className="bg-white border border-slate-200 rounded-lg p-5">
                    <div className="font-mono text-[11px] bg-slate-900 text-indigo-300 inline-block px-2 py-1 rounded mb-3">{s.state}</div>
                    <p className="text-slate-600 leading-relaxed text-xs md:text-sm">{s.desc}</p>
                  </div>
                ))}
          <SectionHeading kicker="Trust">Security & Reliability</SectionHeading>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard title="Isolation Aligned" desc="All access mediated through PostgreSQL permissions; no external daemon with elevated privileges." />
            <FeatureCard title="Transport Hardening" desc="Leverage native PostgreSQL SSL for encrypted channels; restrict Raft ports via firewall rules." />
            <FeatureCard title="Deterministic Elections" desc="Mathematically ensures only one leader per term—eliminating write divergence conditions." />
          </div>
          <p className="mt-6 text-xs text-slate-500">See <Link href="/docs/pgraft/concepts/split-brain" className="text-indigo-600 hover:underline">Split-Brain Protection</Link> for deeper guarantees.</p>
        </div>
      </section>

      {/* SQL API Overview */}
      <section className="py-20 bg-white border-t">
        <div className="container-wide">
          <SectionHeading kicker="Interface">Core SQL Functions</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <SqlCard fn="pgraft_init()" desc="Initialize the local node environment and worker." />
            <SqlCard fn="pgraft_add_node(node_id,address,port)" desc="Add a new member through the leader—replicated as configuration change." />
            <SqlCard fn="pgraft_remove_node(node_id)" desc="Remove an existing member (leader only)." />
                  <CodeBlock code={`N1 (L) N2 (F) N3 (F) N4 (F) N5 (F)`} />
            <SqlCard fn="pgraft_get_cluster_status()" desc="Structured snapshot of cluster + role metadata." />
            <SqlCard fn="pgraft_is_leader()" desc="Boolean leadership check for routing logic." />
            <SqlCard fn="pgraft_replicate_entry(data)" desc="Manually append an opaque payload entry for replication experiments." />
            <SqlCard fn="pgraft_log_get_stats()" desc="Inspect log sequence, commit & apply progression." />
                  <CodeBlock code={`Region A: N1 N2 N3\nRegion B: N4 N5 N6`} />
                <li>Add <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">shared_preload_libraries='pgraft'</code>.</li>
                <li>Restart PostgreSQL.</li>
              <p className="mt-4 text-xs text-slate-500">Topology guidance: <Link href="/docs/pgraft/concepts/architecture" className="text-indigo-600 hover:underline">Architecture Guide</Link></p>
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

      {/* Configuration Highlights */}
      <section className="py-20 bg-slate-50">
        <div className="container-wide">
          <SectionHeading kicker="Config">Key Configuration Levers</SectionHeading>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 text-sm">
            {[
              { name: 'pgraft.election_timeout', desc: 'Milliseconds before follower starts election. Tune higher for unstable networks; lower for faster failover.', link: '/docs/pgraft/user-guide/configuration#election_timeout' },
              { name: 'pgraft.heartbeat_interval', desc: 'Leader heartbeat cadence. Lower increases responsiveness, higher reduces chatter.', link: '/docs/pgraft/user-guide/configuration#heartbeat_interval' },
              { name: 'pgraft.node_id', desc: 'Unique integer identity per node. Never reuse concurrently.', link: '/docs/pgraft/user-guide/configuration#node_id' },
              { name: 'pgraft.address', desc: 'Advertised host / IP for peer messaging.', link: '/docs/pgraft/user-guide/configuration#address' },
              { name: 'pgraft.port', desc: 'Raft communication port distinct from SQL listener.', link: '/docs/pgraft/user-guide/configuration#port' },
              { name: 'pgraft.cluster_id', desc: 'Logical cluster namespace for disambiguation.', link: '/docs/pgraft/user-guide/configuration#cluster_id' },
            ].map(c => (
              <div key={c.name} className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col">
                <div className="font-mono text-xs bg-slate-900 text-green-300 px-2 py-1 rounded self-start mb-3">{c.name}</div>
                <p className="text-slate-600 flex-1 leading-relaxed">{c.desc}</p>
                <Link href={c.link} className="text-indigo-600 hover:underline mt-3 text-xs font-medium">Docs →</Link>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-slate-500">Full list: <Link href="/docs/pgraft/user-guide/configuration" className="text-indigo-600 hover:underline">Configuration Reference</Link></p>
        </div>
      </section>

      {/* Failure Handling Scenarios */}
      <section className="py-20 bg-white border-t">
        <div className="container-wide">
          <SectionHeading kicker="Resilience">Failure Scenarios</SectionHeading>
          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-900 text-slate-100">
                <tr className="text-left">
                  <th className="px-4 py-3 font-semibold">Event</th>
                  <th className="px-4 py-3 font-semibold">Behavior</th>
                  <th className="px-4 py-3 font-semibold">Operator Focus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-800">Leader crash</td>
                  <td className="px-4 py-3">Followers trigger election after timeout; new leader chosen.</td>
                  <td className="px-4 py-3 text-slate-600">Confirm cluster liveness; investigate root cause.</td>
                </tr>
                <tr className="bg-slate-50/70">
                  <td className="px-4 py-3 font-medium text-slate-800">Network partition (minority)</td>
                  <td className="px-4 py-3">Isolated minority cannot elect leader—protects consistency.</td>
                  <td className="px-4 py-3 text-slate-600">Restore connectivity; avoid forced promotion.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-800">Disk crash on follower</td>
                  <td className="px-4 py-3">Node offline; quorum maintained if majority intact.</td>
                  <td className="px-4 py-3 text-slate-600">Replace / repair; rejoin via add node if needed.</td>
                </tr>
                <tr className="bg-slate-50/70">
                  <td className="px-4 py-3 font-medium text-slate-800">Log divergence attempt</td>
                  <td className="px-4 py-3">Rejected by term/index invariants.</td>
                  <td className="px-4 py-3 text-slate-600">Check for clock/drift or misrouted clients.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-slate-800">Repeated elections</td>
                  <td className="px-4 py-3">Likely heartbeat loss or resource saturation.</td>
                  <td className="px-4 py-3 text-slate-600">Inspect network latency, I/O pressure, tuning.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-slate-500">More: <Link href="/docs/pgraft/concepts/architecture" className="text-indigo-600 hover:underline">Architecture & Guarantees</Link></p>
        </div>
      </section>

      {/* Lifecycle States */}
      <section className="py-20 bg-slate-50">
        <div className="container-wide">
          <SectionHeading kicker="Internals">Worker Lifecycle States</SectionHeading>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            {[
              { state: 'INIT', desc: 'Extension loaded; worker preparing in-memory + disk state.' },
              { state: 'RUNNING', desc: 'Actively participating in Raft; processing ticks and messages.' },
              { state: 'LEADER', desc: 'Holds leadership; sending heartbeats and replicating entries.' },
              { state: 'FOLLOWER', desc: 'Replicating from leader; eligible to campaign if timeouts expire.' },
              { state: 'CANDIDATE', desc: 'Campaigning for leadership during election interval.' },
              { state: 'STOPPING', desc: 'Graceful shutdown sequence triggered.' },
            ].map(s => (
              <div key={s.state} className="bg-white border border-slate-200 rounded-lg p-5">
                <div className="font-mono text-[11px] bg-slate-900 text-indigo-300 inline-block px-2 py-1 rounded mb-3">{s.state}</div>
                <p className="text-slate-600 leading-relaxed text-xs md:text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-slate-500">Query state via: <code className="font-mono bg-slate-100 px-1 py-0.5 rounded">SELECT pgraft_get_worker_state();</code></p>
        </div>
      </section>

      {/* Deployment Patterns */}
      <section className="py-20 bg-white border-t">
        <div className="container-wide">
          <SectionHeading kicker="Patterns">Deployment Topologies</SectionHeading>
          <div className="grid lg:grid-cols-3 gap-10 text-sm text-slate-600">
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900">3-Node Core (Recommended)</h4>
              <p>Baseline production quorum: minimal overhead, fault tolerant against one node failure.</p>
              <CodeBlock code={`Node1 (Leader)\nNode2 (Follower)\nNode3 (Follower)`} />
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900">5-Node Extended</h4>
              <p>Higher resilience; tolerates 2 node failures at cost of added election complexity.</p>
              <CodeBlock code={`N1 (L) N2 (F) N3 (F) N4 (F) N5 (F)`} />
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900">Regional Edge Clusters</h4>
              <p>Multiple isolated 3-node groups fronted by a routing layer for geographical latency reduction.</p>
              <CodeBlock code={`Region A: N1 N2 N3\nRegion B: N4 N5 N6`} />
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-500">More: <Link href="/docs/pgraft/concepts/architecture" className="text-indigo-600 hover:underline">Architecture Guide</Link></p>
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