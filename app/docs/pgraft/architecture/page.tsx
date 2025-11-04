import React from 'react'
import { Network, ArrowRight, Database, Zap } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'pgraft Architecture | Documentation',
  description: 'Technical architecture and design of pgraft logical replication system',
}

const PgraftArchitecturePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        <div className="mb-12">
          <Link href="/docs/pgraft" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to pgraft Documentation
          </Link>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            pgraft Architecture
          </h1>
          <p className="text-xl text-slate-300">
            Understanding the technical design and components of pgraft
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Network className="w-8 h-8 text-purple-400" />
            System Overview
          </h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
            <p className="text-slate-300 mb-6">
              pgraft is a logical replication orchestration tool that simplifies PostgreSQL major version upgrades.
              It leverages PostgreSQL's native logical replication to enable zero-downtime migrations.
            </p>
            
            <div className="bg-slate-900/50 rounded-lg p-6 border border-purple-400/20">
              <h3 className="text-lg font-bold text-purple-300 mb-4">Key Components</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-bold text-purple-400 mb-2">Source DB</h4>
                  <p className="text-slate-400 text-sm">Older PostgreSQL version with publication</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-bold text-pink-400 mb-2">pgraft CLI</h4>
                  <p className="text-slate-400 text-sm">Orchestration and monitoring tool</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-bold text-blue-400 mb-2">Target DB</h4>
                  <p className="text-slate-400 text-sm">Newer PostgreSQL version with subscription</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Architecture Diagram</h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-pink-400/30">
            <div className="bg-slate-900/50 rounded-lg p-8 font-mono text-sm">
              <pre className="text-cyan-400">{`┌─────────────────────────────────────────────────────────────────┐
│                        Application Layer                         │
│                  (Connects to PostgreSQL 14)                      │
└────────────────────────┬────────────────────────────────────────┘
                         │ Read/Write Traffic
                         ▼
┌──────────────────────────────────────────────────────────────────┐
│                    Source Database (PG 14)                        │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  WAL Stream                                                 │  │
│  │  wal_level = logical                                        │  │
│  │  max_wal_senders = 10                                       │  │
│  └────────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Publication: pgraft_pub                                    │  │
│  │  - Tables: users, orders, products                          │  │
│  │  - Operations: INSERT, UPDATE, DELETE                       │  │
│  └────────────────────────────────────────────────────────────┘  │
└────────────────────────┬─────────────────────────────────────────┘
                         │ Logical Replication Stream
                         │ (CDC - Change Data Capture)
                         ▼
         ┌───────────────────────────────────────┐
         │        pgraft CLI Tool                 │
         │  - Create subscription                 │
         │  - Monitor lag                         │
         │  - Verify consistency                  │
         │  - Manage cutover                      │
         └───────────────────────────────────────┘
                         │
                         ▼ Orchestrates
┌──────────────────────────────────────────────────────────────────┐
│                    Target Database (PG 16)                        │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Subscription: pgraft_sub                                   │  │
│  │  - Publication: pgraft_pub @ source                         │  │
│  │  - Copy Data: true (initial sync)                           │  │
│  │  - Enabled: true                                            │  │
│  └────────────────────────────────────────────────────────────┘  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Replicated Tables                                          │  │
│  │  - users (synced from source)                               │  │
│  │  - orders (synced from source)                              │  │
│  │  - products (synced from source)                            │  │
│  └────────────────────────────────────────────────────────────┘  │
└────────────────────────┬─────────────────────────────────────────┘
                         │
                         ▼ After Cutover
┌──────────────────────────────────────────────────────────────────┐
│                        Application Layer                         │
│              (Now connects to PostgreSQL 16)                      │
└──────────────────────────────────────────────────────────────────┘`}</pre>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Database className="w-8 h-8 text-blue-400" />
            Logical Replication Flow
          </h2>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-xl p-6 border border-blue-400/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Publication Creation</h3>
                  <p className="text-slate-400 mb-4">
                    On the source database, a publication is created for the tables to replicate.
                  </p>
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`CREATE PUBLICATION pgraft_pub FOR ALL TABLES;
-- Internally creates:
-- - Publication metadata in pg_publication
-- - Table references in pg_publication_tables
-- - WAL decoder configuration`}</code></pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-purple-400/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Subscription Creation</h3>
                  <p className="text-slate-400 mb-4">
                    On the target database, a subscription is created pointing to the source publication.
                  </p>
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`CREATE SUBSCRIPTION pgraft_sub
  CONNECTION 'host=source port=5432 dbname=mydb'
  PUBLICATION pgraft_pub
  WITH (copy_data = true);
-- This triggers:
-- - Replication slot creation on source
-- - Initial table snapshot and data copy
-- - Continuous WAL streaming`}</code></pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-pink-400/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Initial Sync</h3>
                  <p className="text-slate-400 mb-4">
                    PostgreSQL performs an initial data copy using COPY protocol:
                  </p>
                  <ul className="text-slate-300 text-sm space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-pink-400">•</span>
                      <span>Source creates snapshot of each table</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-400">•</span>
                      <span>Data streamed to target via COPY protocol</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-400">•</span>
                      <span>Replication slot holds WAL position during copy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-400">•</span>
                      <span>Changes during copy are queued in WAL</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-cyan-400/30">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Continuous Replication</h3>
                  <p className="text-slate-400 mb-4">
                    After initial sync, continuous replication streams changes:
                  </p>
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <pre className="text-sm overflow-x-auto"><code className="text-yellow-400">{`WAL Stream Decode:
- Source: Writes changes to WAL
- Decoder: Converts WAL to logical changes
- Publisher: Streams to subscriber
- Applier: Applies to target tables

Change Format:
INSERT users: id=123, name='Alice', email='alice@example.com'
UPDATE orders: SET status='shipped' WHERE id=456
DELETE products: WHERE id=789`}</code></pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Zap className="w-8 h-8 text-yellow-400" />
            Performance Considerations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-xl p-6 border border-yellow-400/30">
              <h3 className="text-lg font-bold text-yellow-300 mb-3">WAL Generation</h3>
              <p className="text-slate-400 text-sm mb-4">
                Logical replication increases WAL volume compared to physical replication:
              </p>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• ~15-20% more WAL due to logical decoding</li>
                <li>• Replication slots prevent WAL cleanup</li>
                <li>• Monitor pg_replication_slots for growth</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-green-400/30">
              <h3 className="text-lg font-bold text-green-300 mb-3">Network Bandwidth</h3>
              <p className="text-slate-400 text-sm mb-4">
                Bandwidth requirements depend on write volume:
              </p>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• Initial sync: 100+ Mbps for large databases</li>
                <li>• Continuous: Proportional to write rate</li>
                <li>• Compression available (gzip level 6)</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-blue-400/30">
              <h3 className="text-lg font-bold text-blue-300 mb-3">CPU Usage</h3>
              <p className="text-slate-400 text-sm mb-4">
                Logical decoding and application add CPU overhead:
              </p>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• Source: 5-10% CPU for WAL decoding</li>
                <li>• Target: 10-15% CPU for apply workers</li>
                <li>• Parallel apply in PG 16+ improves performance</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-purple-400/30">
              <h3 className="text-lg font-bold text-purple-300 mb-3">Disk I/O</h3>
              <p className="text-slate-400 text-sm mb-4">
                I/O patterns during replication:
              </p>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• Source: Sequential WAL reads</li>
                <li>• Target: Random writes during apply</li>
                <li>• Index updates can be I/O intensive</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Limitations and Constraints</h2>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-xl p-6 border border-orange-400/30">
              <h3 className="text-lg font-bold text-orange-300 mb-3">Schema Changes</h3>
              <p className="text-slate-400 text-sm mb-3">
                DDL is NOT automatically replicated. Schema changes must be applied manually:
              </p>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <pre className="text-sm overflow-x-auto"><code className="text-yellow-400">{`-- Apply DDL to BOTH source and target
-- Example: Adding a column

-- On source (PG 14):
ALTER TABLE users ADD COLUMN age INTEGER;

-- On target (PG 16):
ALTER TABLE users ADD COLUMN age INTEGER;

-- Data replication continues automatically`}</code></pre>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-red-400/30">
              <h3 className="text-lg font-bold text-red-300 mb-3">Unsupported Objects</h3>
              <p className="text-slate-400 text-sm mb-3">
                The following are NOT replicated via logical replication:
              </p>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• Sequences (nextval() calls don't sync)</li>
                <li>• Large objects (pg_largeobject)</li>
                <li>• Unlogged tables</li>
                <li>• Materialized views</li>
                <li>• Foreign tables</li>
                <li>• TRUNCATE operations (unless explicitly enabled)</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-yellow-400/30">
              <h3 className="text-lg font-bold text-yellow-300 mb-3">Conflict Resolution</h3>
              <p className="text-slate-400 text-sm mb-3">
                Conflicts occur if target is modified independently:
              </p>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• UPDATE of missing row: Skipped with warning</li>
                <li>• DELETE of missing row: Ignored</li>
                <li>• INSERT of duplicate key: Error, replication stops</li>
                <li>• Solution: Target should be read-only during migration</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8">Related Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/docs/pgraft/tutorial" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-purple-400/50 transition-all group">
              <span className="font-semibold">Tutorial</span>
              <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/docs/pgraft/configuration" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-purple-400/50 transition-all group">
              <span className="font-semibold">Configuration Reference</span>
              <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/docs/pgraft" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-purple-400/50 transition-all group">
              <span className="font-semibold">pgraft Documentation</span>
              <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/docs" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-purple-400/50 transition-all group">
              <span className="font-semibold">All Documentation</span>
              <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PgraftArchitecturePage
