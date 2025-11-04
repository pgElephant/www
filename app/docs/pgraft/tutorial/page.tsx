import React from 'react'
import { GitBranch, ArrowRight, PlayCircle } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'pgraft Tutorial | Documentation',
  description: 'Step-by-step tutorial for setting up and using pgraft logical replication',
}

const PgraftTutorialPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        <div className="mb-12">
          <Link href="/docs/pgraft" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to pgraft Documentation
          </Link>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            pgraft Tutorial
          </h1>
          <p className="text-xl text-slate-300">
            Learn how to set up logical replication with pgraft for major version upgrades
          </p>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <PlayCircle className="w-8 h-8 text-blue-400" />
            Getting Started
          </h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-400/30">
            <p className="text-slate-300 mb-6">
              pgraft enables zero-downtime PostgreSQL major version upgrades using logical replication.
              This tutorial walks through a complete upgrade from PostgreSQL 14 to PostgreSQL 16.
            </p>
            
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/40 rounded-lg p-4">
              <h3 className="font-semibold text-white mb-2">Prerequisites</h3>
              <ul className="text-slate-300 text-sm space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>PostgreSQL 14.x source database (running)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>PostgreSQL 16.x target database (installed)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>Logical replication enabled on source (wal_level=logical)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>Sufficient disk space for initial data copy</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Step 1: Prepare Source Database</h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
            <p className="text-slate-300 mb-4">Configure the source PostgreSQL 14 instance for logical replication:</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-purple-300 mb-2">postgresql.conf</h3>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`# Enable logical replication
wal_level = logical
max_wal_senders = 10
max_replication_slots = 10

# Restart PostgreSQL after changes
sudo systemctl restart postgresql-14`}</code></pre>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-purple-300 mb-2">Create Publication</h3>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`-- Connect to source database
psql -h localhost -p 5432 -U postgres -d mydb

-- Create publication for all tables
CREATE PUBLICATION pgraft_pub FOR ALL TABLES;

-- Or for specific tables
CREATE PUBLICATION pgraft_pub FOR TABLE users, orders, products;

-- Verify publication
SELECT * FROM pg_publication;`}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Step 2: Set Up Target Database</h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-400/30">
            <p className="text-slate-300 mb-4">Initialize the PostgreSQL 16 target database with identical schema:</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-blue-300 mb-2">Dump Schema from Source</h3>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`# Export schema only (no data)
pg_dump -h localhost -p 5432 -U postgres -d mydb \\
  --schema-only \\
  --no-owner \\
  --no-privileges \\
  -f schema.sql`}</code></pre>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-blue-300 mb-2">Initialize Target Database</h3>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`# Start PostgreSQL 16
sudo systemctl start postgresql-16

# Create target database
psql -h localhost -p 5433 -U postgres -c "CREATE DATABASE mydb;"

# Load schema
psql -h localhost -p 5433 -U postgres -d mydb -f schema.sql

# Verify tables exist
psql -h localhost -p 5433 -U postgres -d mydb -c "\\dt"`}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Step 3: Install and Run pgraft</h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-purple-300 mb-2">Install pgraft</h3>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`# Download pgraft
curl -LO https://github.com/pgedge/pgraft/releases/latest/download/pgraft

# Make executable
chmod +x pgraft

# Move to PATH
sudo mv pgraft /usr/local/bin/`}</code></pre>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-purple-300 mb-2">Create Configuration</h3>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <pre className="text-sm overflow-x-auto"><code className="text-yellow-400">{`# pgraft.yaml
source:
  host: localhost
  port: 5432
  database: mydb
  user: postgres
  password: password123

target:
  host: localhost
  port: 5433
  database: mydb
  user: postgres
  password: password123

replication:
  publication_name: pgraft_pub
  subscription_name: pgraft_sub
  copy_data: true
  
settings:
  create_subscription: true
  initial_sync_timeout: 3600
  monitor_lag: true`}</code></pre>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-purple-300 mb-2">Start Migration</h3>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`# Run pgraft
pgraft migrate --config pgraft.yaml

# Output:
# [INFO] Connecting to source database...
# [INFO] Connecting to target database...
# [INFO] Creating subscription pgraft_sub...
# [INFO] Initial data copy in progress...
# [INFO] Syncing table users (10000 rows)...
# [INFO] Syncing table orders (25000 rows)...
# [INFO] Syncing table products (500 rows)...
# [INFO] Initial sync complete
# [INFO] Monitoring replication lag...
# [INFO] Current lag: 0 bytes, 0 seconds`}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Step 4: Monitor Replication</h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-blue-400/30">
            <p className="text-slate-300 mb-4">Monitor the replication progress and lag:</p>
            
            <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
              <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`# Check subscription status on target
psql -h localhost -p 5433 -U postgres -d mydb -c "
SELECT subname, subenabled, subslotname
FROM pg_subscription;"

# Check replication slot on source
psql -h localhost -p 5432 -U postgres -d mydb -c "
SELECT slot_name, active, restart_lsn
FROM pg_replication_slots;"

# Monitor replication lag
pgraft status --config pgraft.yaml`}</code></pre>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-blue-300 mb-2">Expected Output</h3>
              <pre className="text-sm overflow-x-auto"><code className="text-cyan-400">{`Subscription Status:
  Name: pgraft_sub
  Enabled: true
  Slot: pgraft_sub
  Active: true
  
Replication Lag:
  Bytes: 0
  Time: 0 seconds
  
Status: ✓ In sync`}</code></pre>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Step 5: Cutover to New Version</h2>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30">
            <p className="text-slate-300 mb-4">
              Once replication lag is near zero, perform the final cutover:
            </p>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/40 rounded-lg p-4">
                <h3 className="font-semibold text-white mb-2">⚠️ Cutover Checklist</h3>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400">✓</span>
                    <span>Verify replication lag is under 1 second</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400">✓</span>
                    <span>Perform final backup of source database</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400">✓</span>
                    <span>Schedule maintenance window</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-400">✓</span>
                    <span>Notify users of brief downtime</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-purple-300 mb-2">Cutover Commands</h3>
                <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`# 1. Stop application traffic to source
# (Use load balancer or application config)

# 2. Wait for final replication to complete
pgraft wait --config pgraft.yaml --timeout 300

# 3. Disable subscription (optional)
psql -h localhost -p 5433 -U postgres -d mydb -c "
ALTER SUBSCRIPTION pgraft_sub DISABLE;"

# 4. Verify data consistency
pgraft verify --config pgraft.yaml

# 5. Update application to point to new database
# Change connection from port 5432 to 5433

# 6. Drop subscription (after verification)
psql -h localhost -p 5433 -U postgres -d mydb -c "
DROP SUBSCRIPTION pgraft_sub;"

# 7. Drop publication on source (optional)
psql -h localhost -p 5432 -U postgres -d mydb -c "
DROP PUBLICATION pgraft_pub;"`}</code></pre>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Troubleshooting</h2>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-xl p-6 border border-red-400/30">
              <h3 className="text-lg font-bold text-red-300 mb-3">Subscription Not Active</h3>
              <p className="text-slate-400 text-sm mb-2">
                If subscription shows as inactive, check:
              </p>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <pre className="text-sm overflow-x-auto"><code className="text-green-400">{`# Check pg_hba.conf allows replication connections
# Add to source database pg_hba.conf:
host    replication    postgres    10.0.0.0/8    md5

# Reload configuration
sudo systemctl reload postgresql-14`}</code></pre>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-yellow-400/30">
              <h3 className="text-lg font-bold text-yellow-300 mb-3">High Replication Lag</h3>
              <p className="text-slate-400 text-sm mb-2">
                If replication is slow:
              </p>
              <ul className="text-slate-300 text-sm space-y-1">
                <li>• Increase max_wal_senders on source</li>
                <li>• Tune network bandwidth between servers</li>
                <li>• Check target database has adequate resources</li>
                <li>• Consider creating indexes after initial sync</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8">Related Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/docs/pgraft/architecture" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-blue-400/50 transition-all group">
              <span className="font-semibold">Architecture Overview</span>
              <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/docs/pgraft/configuration" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-blue-400/50 transition-all group">
              <span className="font-semibold">Configuration Reference</span>
              <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/docs/pgraft" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-blue-400/50 transition-all group">
              <span className="font-semibold">pgraft Documentation</span>
              <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/docs/getting-started" className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 hover:border-blue-400/50 transition-all group">
              <span className="font-semibold">Getting Started</span>
              <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PgraftTutorialPage
