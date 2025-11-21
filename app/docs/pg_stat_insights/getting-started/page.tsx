import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'Getting Started with pg_stat_insights | PostgreSQL Performance Monitoring',
  description: 'Quick start guide for pg_stat_insights - install and configure PostgreSQL performance monitoring in 3 steps.',
}

const tableOfContents: TocItem[] = [
  { id: 'requirements', title: 'Requirements' },
  { id: 'installation-steps', title: 'Installation in 3 Steps' },
  { id: 'complete-installation', title: 'Complete Installation Guide' },
  { id: 'configuration-options', title: 'Configuration Options' },
  { id: 'quick-analysis', title: 'Quick Performance Analysis' },
  { id: 'next-steps', title: 'Next Steps' },
]

const prevLink: NavLink = {
  href: '/docs/pg_stat_insights/overview',
  label: 'Overview',
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
      <section id="requirements">
        <h2>Requirements</h2>
        <p>
          Monitor PostgreSQL query performance in under 5 minutes. pg_stat_insights is a standalone extension with 52 metrics across 11 pre-built diagnostic views.
        </p>
        <ul>
          <li>PostgreSQL 16, 17, or 18 with superuser access</li>
          <li>Ability to modify shared_preload_libraries and restart PostgreSQL</li>
          <li>Build toolchain (make, gcc/clang) for source installations</li>
          <li>Optional: Package repository or Homebrew for binary installs</li>
        </ul>
      </section>

      <section id="installation-steps">
        <h2>Installation in 3 Steps</h2>
        
        <h3>Step 1 · Enable Extension in postgresql.conf</h3>
        <p>Add pg_stat_insights to shared_preload_libraries and restart PostgreSQL.</p>
        <SqlCodeBlock
          title="PostgreSQL configuration"
          code={`-- Enable pg_stat_insights in PostgreSQL configuration
ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_insights';

-- Restart PostgreSQL server (required for shared_preload_libraries changes)
-- On systemd systems:
-- sudo systemctl restart postgresql

-- On macOS/Homebrew:
-- brew services restart postgresql@18`}
        />

        <h3>Step 2 · Create the Extension</h3>
        <p>Create the extension in your target database. No additional dependencies required.</p>
        <SqlCodeBlock
          title="Create extension"
          code={`-- Connect to your database
\\c your_database_name

-- Create the pg_stat_insights extension
CREATE EXTENSION pg_stat_insights;`}
        />

        <h3>Step 3 · View Your Performance Data</h3>
        <p>Query any of the 11 curated diagnostic views for immediate performance insights.</p>
        <SqlCodeBlock
          title="Query performance analysis"
          code={`-- View your slowest queries
SELECT
    query,
    calls,
    total_exec_time,
    mean_exec_time,
    rows,
    shared_blks_hit,
    shared_blks_read,
    temp_blks_written
FROM pg_stat_insights_top_by_time
LIMIT 10;

-- Check cache efficiency
SELECT
    query,
    calls,
    shared_blks_hit,
    shared_blks_read,
    round(100.0 * shared_blks_hit / (shared_blks_hit + shared_blks_read), 2) AS cache_hit_ratio
FROM pg_stat_insights_top_cache_misses
WHERE shared_blks_hit + shared_blks_read > 0
LIMIT 10;`}
        />
      </section>

      <section id="complete-installation">
        <h2>Complete Installation Guide</h2>
        <p>Prefer packages or Homebrew? Use the reference commands below to build or install pg_stat_insights.</p>
        
        <h3>Build from source</h3>
        <BashCodeBlock
          title="Build from source"
          code={`# Clone the repository
git clone https://github.com/pgelephant/pg_stat_insights.git
cd pg_stat_insights

# Build the extension
make clean && make

# Install system-wide
sudo make install

# Or install to custom location
make install PG_CONFIG=/path/to/pg_config`}
        />

        <h3>Package installation (Ubuntu / Debian)</h3>
        <BashCodeBlock
          title="Package installation (Ubuntu / Debian)"
          code={`# Add PostgreSQL repository (if not already added)
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

# Update package list
sudo apt-get update

# Install pg_stat_insights
sudo apt-get install postgresql-18-pg-stat-insights`}
        />

        <h3>Homebrew installation (macOS)</h3>
        <BashCodeBlock
          title="Homebrew installation (macOS)"
          code={`# Install pg_stat_insights via Homebrew
brew install pg_stat_insights

# Or if using custom PostgreSQL installation
cd pg_stat_insights
make && make install PG_CONFIG=/usr/local/pgsql/bin/pg_config`}
        />
      </section>

      <section id="configuration-options">
        <h2>Configuration Options</h2>
        <p>Fine-tune monitoring coverage with 5 GUC parameters concentrated on memory usage, histogram tracking, and attribution.</p>
        
        <SqlCodeBlock
          title="Configuration parameters"
          code={`-- Enable query timing tracking
SET pg_stat_insights.track_timing = on;

-- Set maximum number of queries to track
SET pg_stat_insights.max_entries = 10000;

-- Enable histogram collection for response time analysis
SET pg_stat_insights.track_histogram = on;

-- Track queries by database user
SET pg_stat_insights.track_user = on;

-- Track queries by application name
SET pg_stat_insights.track_application = on;`}
        />
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white/80 p-4 text-sm shadow-sm dark:border-slate-700/60 dark:bg-slate-900/50">
            <h4 className="font-semibold">Performance Tuning</h4>
            <ul className="mt-2 space-y-1">
              <li>• <code>max_entries</code>: Controls memory usage for tracked queries</li>
              <li>• <code>track_timing</code>: Enable for execution time metrics</li>
              <li>• <code>track_histogram</code>: Collect response time distribution buckets</li>
            </ul>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white/80 p-4 text-sm shadow-sm dark:border-slate-700/60 dark:bg-slate-900/50">
            <h4 className="font-semibold">Security & Filtering</h4>
            <ul className="mt-2 space-y-1">
              <li>• <code>track_user</code>: Filter by database user</li>
              <li>• <code>track_application</code>: Attribute queries to application_name</li>
              <li>• <code>track_utility</code>: Include VACUUM, ANALYZE, and maintenance commands</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="quick-analysis">
        <h2>Quick Performance Analysis</h2>
        <p>Run targeted analytics to uncover bottlenecks, cache issues, and response time distributions.</p>
        
        <h3>Top Slow Queries</h3>
        <SqlCodeBlock
          title="Slow query analysis"
          code={`SELECT
    query,
    calls,
    round(total_exec_time::numeric, 2) AS total_time_ms,
    round(mean_exec_time::numeric, 2) AS avg_time_ms,
    rows,
    round((shared_blks_hit * 100.0 / (shared_blks_hit + shared_blks_read))::numeric, 2) AS cache_hit_pct
FROM pg_stat_insights_top_by_time
WHERE mean_exec_time > 100  -- Queries slower than 100ms
ORDER BY total_exec_time DESC
LIMIT 20;`}
        />

        <h3>Cache Performance Issues</h3>
        <SqlCodeBlock
          title="Cache efficiency analysis"
          code={`SELECT
    query,
    calls,
    shared_blks_hit,
    shared_blks_read,
    shared_blks_hit + shared_blks_read AS total_blocks,
    round((shared_blks_hit * 100.0 / (shared_blks_hit + shared_blks_read))::numeric, 2) AS cache_hit_ratio
FROM pg_stat_insights_top_cache_misses
WHERE shared_blks_hit + shared_blks_read > 1000  -- Significant I/O
ORDER BY shared_blks_read DESC
LIMIT 15;`}
        />

        <h3>Response Time Distribution</h3>
        <SqlCodeBlock
          title="Response time analysis"
          code={`SELECT
    response_time_category,
    count,
    round((count * 100.0 / sum(count) OVER ())::numeric, 2) AS percentage,
    round(avg_exec_time::numeric, 2) AS avg_time_ms,
    round(min_exec_time::numeric, 2) AS min_time_ms,
    round(max_exec_time::numeric, 2) AS max_time_ms
FROM pg_stat_insights_histogram_summary
ORDER BY response_time_category;`}
        />
      </section>

      <section id="next-steps">
        <h2>Next Steps</h2>
        <p>Continue learning about pg_stat_insights with these resources:</p>
        <ul>
          <li><a href="/docs/pg_stat_insights/views">Views Reference</a> - Complete documentation for all 11 pre-built views.</li>
          <li><a href="/docs/pg_stat_insights/metrics">Metrics Guide</a> - Detailed explanation of all 52 metric columns.</li>
          <li><a href="/docs/pg_stat_insights/configuration">Configuration</a> - All 5 GUC parameters with tuning recommendations.</li>
          <li><a href="/docs/pg_stat_insights/monitoring">Prometheus & Grafana</a> - Integration guide with pre-built dashboards.</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
