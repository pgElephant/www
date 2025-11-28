import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'Getting Started with pg_stat_insights | PostgreSQL Performance Monitoring',
  description: 'Install and configure pg_stat_insights in minutes, then explore core analytics views and metrics.',
}

const tableOfContents: TocItem[] = [
  { id: 'prerequisites', title: 'Prerequisites' },
  { id: 'installation-steps', title: 'Installation in 3 Steps' },
  { id: 'complete-installation', title: 'Complete Installation Reference' },
  { id: 'configuration-checklist', title: 'Configuration Checklist' },
  { id: 'next-steps', title: 'Next Steps' },
]

const prevLink: NavLink = {
  href: '/docs/pg-stat-insights',
  label: 'pg_stat_insights',
}

const nextLink: NavLink = {
  href: '/docs/pg_stat_insights/configuration',
  label: 'Configuration Reference',
}

export default function GettingStartedPage() {
  return (
    <PostgresDocsLayout
      title="Getting Started with pg_stat_insights"
      version="pg_stat_insights Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="prerequisites">
        <h2>Prerequisites</h2>
        <p>
          Enable 52 query performance metrics and 11 diagnostic views. Follow the three-step installation, then explore tuning guides below.
        </p>
        <p>
          pg_stat_insights ships as a single extension and requires no external collectors. Load it at startup, create the extension, then query the telemetry views immediately.
        </p>
        <ul>
          <li>PostgreSQL 16, 17, or 18 with superuser access</li>
          <li>Ability to modify shared_preload_libraries and restart PostgreSQL</li>
          <li>Build toolchain (make, gcc/clang) for optional source installs</li>
          <li>Optional: Package repository or Homebrew for binary installs</li>
        </ul>
      </section>

      <section id="installation-steps">
        <h2>Installation in 3 Steps</h2>
        <p>Execute these commands from the PostgreSQL superuser. Restart is required only after enabling shared_preload_libraries.</p>
        
        <h3>Step 1 · Update postgresql.conf</h3>
        <p>Enable the extension at startup and restart PostgreSQL.</p>
        <SqlCodeBlock
          title="PostgreSQL configuration"
          code={`-- Enable pg_stat_insights in PostgreSQL configuration
ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_insights';

-- Restart PostgreSQL after changing shared_preload_libraries
-- sudo systemctl restart postgresql
-- brew services restart postgresql@18`}
        />

        <h3>Step 2 · Create the Extension</h3>
        <p>Connect to the target database and register pg_stat_insights.</p>
        <SqlCodeBlock
          title="Create extension"
          code={`-- Connect to your database
\\c your_database_name

-- Create the extension
CREATE EXTENSION pg_stat_insights;`}
        />

        <h3>Step 3 · Run First Diagnostics</h3>
        <p>Inspect top slow queries, cache ratios, and disk usage immediately.</p>
        <SqlCodeBlock
          title="Initial analytics"
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
        />
      </section>

      <section id="complete-installation">
        <h2>Complete Installation Reference</h2>
        <p>Build from source, install via packages, or automate with CI. Use the commands below as a template.</p>
        
        <h3>Build from source</h3>
        <BashCodeBlock
          title="Build from source"
          code={`# Clone repository
git clone https://github.com/pgelephant/pg_stat_insights.git
cd pg_stat_insights

# Build extension shared library
make clean && make

# Install binaries (may require sudo)
sudo make install

# Override pg_config if using custom PostgreSQL
make install PG_CONFIG=/path/to/pg_config`}
        />

        <h3>Package installs</h3>
        <BashCodeBlock
          title="Package installs"
          code={`# Ubuntu / Debian
sudo apt-get install postgresql-18-pg-stat-insights

# RHEL / Rocky / AlmaLinux
yum install pg-stat-insights_18

# Homebrew (macOS)
brew install pg_stat_insights`}
        />
      </section>

      <section id="configuration-checklist">
        <h2>Configuration Checklist</h2>
        <p>Tune runtime overhead, memory consumption, and view attribution with the optional GUC parameters below.</p>
        <SqlCodeBlock
          title="Session-level tuning"
          code={`-- Optional GUC tuning
SET pg_stat_insights.track_timing = on;
SET pg_stat_insights.max_entries = 10000;
SET pg_stat_insights.track_histogram = on;
SET pg_stat_insights.track_user = on;
SET pg_stat_insights.track_application = on;`}
        />
      </section>

      <section id="next-steps">
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/pg_stat_insights/views">Views Reference</a> - Understand all 11 curated analytics views.</li>
          <li><a href="/docs/pg_stat_insights/metrics">Metrics Guide</a> - Detailed definitions for all 52 collected metrics.</li>
          <li><a href="/docs/pg_stat_insights/usage">Usage Playbooks</a> - Troubleshoot latency, cache misses, locking, and WAL.</li>
          <li><a href="/docs/pg_stat_insights/monitoring">Monitoring Integration</a> - Prometheus exporters, Grafana dashboards, and alerting tips.</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
