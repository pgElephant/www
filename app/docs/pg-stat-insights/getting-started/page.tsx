import { Metadata } from 'next'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import { BookOpen, Gauge } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Getting Started with pg_stat_insights | PostgreSQL Performance Monitoring',
  description: 'Install and configure pg_stat_insights in minutes, then explore core analytics views and metrics.',
}

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-cyan-900">
      {/* Hero */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 dark:from-cyan-500/10 dark:to-blue-500/10" />
        <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
          <div className="rounded-2xl bg-white/85 p-8 shadow-lg ring-1 ring-slate-200 dark:bg-slate-900/70 dark:ring-slate-700">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 text-sm font-semibold text-white">
                  <Gauge className="h-4 w-4" />
                  pg_stat_insights
                </div>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                  Getting Started with pg_stat_insights
                </h1>
                <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
                  Enable 52 query performance metrics and 11 curated diagnostic views in under five minutes. Follow the three-step
                  onboarding to install the extension, and then explore deeper tuning guides below.
                </p>
              </div>
              <a
                href="/docs/pg_stat_insights/views"
                className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400 dark:border-slate-600 dark:text-slate-200"
              >
                <BookOpen className="h-4 w-4" />
                View Documentation Library
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-8 px-6 pb-24 lg:px-8">
        <div className="rounded-2xl border border-emerald-200 bg-white/90 p-6 shadow-sm dark:border-emerald-900/50 dark:bg-slate-900/60">
          <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-300">✅ Standalone Extension</h3>
          <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-200">
            pg_stat_insights ships as a single extension and requires only PostgreSQL 16, 17, or 18. No additional dependencies or collectors needed—simply load the extension and start analyzing workloads immediately.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Installation in 3 Steps</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Follow these commands from your PostgreSQL superuser. Restart is only required after enabling shared_preload_libraries.
          </p>

          <div className="mt-6 space-y-6">
            <div className="border-l-4 border-blue-500 bg-white/80 p-4 shadow-sm dark:bg-slate-900/50">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Step 1 · Update postgresql.conf</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Enable the extension at startup and restart PostgreSQL.
              </p>
              <SqlCodeBlock
                code={`-- Enable pg_stat_insights in PostgreSQL configuration
ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_insights';

-- Restart PostgreSQL after changing shared_preload_libraries
-- sudo systemctl restart postgresql
-- brew services restart postgresql@18`}
                title="PostgreSQL Configuration"
              />
            </div>

            <div className="border-l-4 border-emerald-500 bg-white/80 p-4 shadow-sm dark:bg-slate-900/50">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Step 2 · Create the Extension</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Connect to the target database and register pg_stat_insights.
              </p>
              <SqlCodeBlock
                code={`-- Connect to your database
\c your_database_name

-- Create the extension
CREATE EXTENSION pg_stat_insights;`}
                title="Create Extension"
              />
            </div>

            <div className="border-l-4 border-purple-500 bg-white/80 p-4 shadow-sm dark:bg-slate-900/50">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Step 3 · Run First Diagnostics</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Immediately inspect top slow queries, cache ratios, and disk usage.
              </p>
              <SqlCodeBlock
                code={`-- Slowest queries by total runtime
SELECT query, calls, total_exec_time, mean_exec_time
FROM   pg_stat_insights_top_by_time
LIMIT  10;

-- Queries with the weakest cache hit ratios
SELECT query, shared_blks_hit, shared_blks_read,
       round(100.0 * shared_blks_hit / NULLIF(shared_blks_hit + shared_blks_read, 0), 2) AS cache_hit_ratio
FROM   pg_stat_insights_top_cache_misses
WHERE  shared_blks_hit + shared_blks_read > 0
LIMIT  10;`}
                title="Initial Analytics"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Complete Installation Reference</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Build from source, install via packages, or automate with CI—use the commands below as a template.
          </p>

          <BashCodeBlock
            code={`# Clone repository
 git clone https://github.com/pgelephant/pg_stat_insights.git
 cd pg_stat_insights

# Build extension shared library
 make clean && make

# Install binaries (may require sudo)
 sudo make install

# Override pg_config if using custom PostgreSQL
 make install PG_CONFIG=/path/to/pg_config`}
            title="Build from Source"
          />

          <BashCodeBlock
            code={`# Ubuntu / Debian
sudo apt-get install postgresql-18-pg-stat-insights

# RHEL / Rocky / AlmaLinux
yum install pg-stat-insights_18

# Homebrew (macOS)
brew install pg_stat_insights`}
            title="Package Installs"
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Configuration Checklist</h2>
          <SqlCodeBlock
            code={`-- Optional GUC tuning
SET pg_stat_insights.track_timing = on;
SET pg_stat_insights.max_entries = 10000;
SET pg_stat_insights.track_histogram = on;
SET pg_stat_insights.track_user = on;
SET pg_stat_insights.track_application = on;`}
            title="Session-level Tuning"
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Next Steps</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <Link
              href="/docs/pg_stat_insights/views"
              className="rounded-xl border border-slate-200 bg-white/90 p-4 text-sm font-semibold text-slate-700 shadow-sm hover:border-cyan-400 dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-200"
            >
              Views Reference
              <p className="mt-1 text-xs font-normal text-slate-500 dark:text-slate-400">Understand all 11 curated analytics views.</p>
            </Link>
            <Link
              href="/docs/pg_stat_insights/metrics"
              className="rounded-xl border border-slate-200 bg-white/90 p-4 text-sm font-semibold text-slate-700 shadow-sm hover:border-cyan-400 dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-200"
            >
              Metrics Guide
              <p className="mt-1 text-xs font-normal text-slate-500 dark:text-slate-400">Detailed definitions for all 52 collected metrics.</p>
            </Link>
            <Link
              href="/docs/pg_stat_insights/usage"
              className="rounded-xl border border-slate-200 bg-white/90 p-4 text-sm font-semibold text-slate-700 shadow-sm hover:border-cyan-400 dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-200"
            >
              Usage Playbooks
              <p className="mt-1 text-xs font-normal text-slate-500 dark:text-slate-400">Troubleshoot latency, cache misses, locking, and WAL.</p>
            </Link>
            <Link
              href="/docs/pg_stat_insights/monitoring"
              className="rounded-xl border border-slate-200 bg-white/90 p-4 text-sm font-semibold text-slate-700 shadow-sm hover:border-cyan-400 dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-200"
            >
              Monitoring Integration
              <p className="mt-1 text-xs font-normal text-slate-500 dark:text-slate-400">Prometheus exporters, Grafana dashboards, and alerting tips.</p>
            </Link>
          </div>
        </section>
      </section>
    </div>
  )
}

