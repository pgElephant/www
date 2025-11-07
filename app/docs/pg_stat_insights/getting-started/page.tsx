import { Metadata } from 'next'
import { Gauge } from 'lucide-react'
import GettingStartedLayout from '../../../../components/GettingStartedLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'Getting Started with pg_stat_insights | PostgreSQL Performance Monitoring',
  description: 'Quick start guide for pg_stat_insights - install and configure PostgreSQL performance monitoring in 3 steps.',
}

export default function GettingStartedPage() {
  return (
    <GettingStartedLayout
      product="pg_stat_insights"
      hero={{
        label: 'pg_stat_insights',
        labelIcon: <Gauge className="h-4 w-4" />, 
        labelAccent: 'emerald',
        title: 'Getting Started with pg_stat_insights',
        description:
          'Monitor PostgreSQL query performance in under 5 minutes. pg_stat_insights is a standalone extension with 52 metrics across 11 pre-built diagnostic views.',
        cta: {
          href: '/docs/pg_stat_insights/views',
          label: 'View documentation library',
        },
      }}
      theme={{
        pageBackground:
          'bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-900',
        heroOverlay:
          'bg-gradient-to-r from-emerald-600/20 to-cyan-500/20 dark:from-emerald-500/10 dark:to-cyan-500/10',
        requirementsBorder: 'emerald',
        requirementsBackground: 'bg-white/90 dark:bg-slate-900/60',
      }}
      requirements={{
        title: 'Requirements',
        items: [
          'PostgreSQL 16, 17, or 18 with superuser access',
          'Ability to modify shared_preload_libraries and restart PostgreSQL',
          'Build toolchain (make, gcc/clang) for source installations',
          'Optional: Package repository or Homebrew for binary installs',
        ],
      }}
      sections={[
        {
          title: 'Installation in 3 Steps',
          cards: [
            {
              id: 'configure-postgres',
              title: 'Step 1 · Enable Extension in postgresql.conf',
              accent: 'blue',
              description: 'Add pg_stat_insights to shared_preload_libraries and restart PostgreSQL.',
              content: (
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
              ),
            },
            {
              id: 'create-extension',
              title: 'Step 2 · Create the Extension',
              accent: 'emerald',
              description: 'Create the extension in your target database. No additional dependencies required.',
              content: (
                <SqlCodeBlock
                  title="Create extension"
                  code={`-- Connect to your database
\\c your_database_name

-- Create the pg_stat_insights extension
CREATE EXTENSION pg_stat_insights;`}
                />
              ),
            },
            {
              id: 'metric-views',
              title: 'Step 3 · View Your Performance Data',
              accent: 'purple',
              description: 'Query any of the 11 curated diagnostic views for immediate performance insights.',
              content: (
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
              ),
            },
          ],
        },
        {
          title: 'Complete Installation Guide',
          description: 'Prefer packages or Homebrew? Use the reference commands below to build or install pg_stat_insights.',
          content: [
            <BashCodeBlock
              key="source-build"
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
            />,
            <BashCodeBlock
              key="debian-packages"
              title="Package installation (Ubuntu / Debian)"
              code={`# Add PostgreSQL repository (if not already added)
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

# Update package list
sudo apt-get update

# Install pg_stat_insights
sudo apt-get install postgresql-18-pg-stat-insights`}
            />,
            <BashCodeBlock
              key="homebrew"
              title="Homebrew installation (macOS)"
              code={`# Install pg_stat_insights via Homebrew
brew install pg_stat_insights

# Or if using custom PostgreSQL installation
cd pg_stat_insights
make && make install PG_CONFIG=/usr/local/pgsql/bin/pg_config`}
            />,
          ],
        },
        {
          title: 'Configuration Options',
          description: 'Fine-tune monitoring coverage with 5 GUC parameters concentrated on memory usage, histogram tracking, and attribution.',
          content: [
            <SqlCodeBlock
              key="guc-parameters"
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
            />,
            <div
              key="guc-details"
              className="grid gap-4 md:grid-cols-2"
            >
              <div className="rounded-lg border border-slate-200 bg-white/80 p-4 text-sm text-slate-600 shadow-sm dark:border-slate-700/60 dark:bg-slate-900/50 dark:text-slate-300">
                <h4 className="font-semibold text-slate-900 dark:text-white">Performance Tuning</h4>
                <ul className="mt-2 space-y-1">
                  <li>• <code>max_entries</code>: Controls memory usage for tracked queries</li>
                  <li>• <code>track_timing</code>: Enable for execution time metrics</li>
                  <li>• <code>track_histogram</code>: Collect response time distribution buckets</li>
                </ul>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white/80 p-4 text-sm text-slate-600 shadow-sm dark:border-slate-700/60 dark:bg-slate-900/50 dark:text-slate-300">
                <h4 className="font-semibold text-slate-900 dark:text-white">Security & Filtering</h4>
                <ul className="mt-2 space-y-1">
                  <li>• <code>track_user</code>: Filter by database user</li>
                  <li>• <code>track_application</code>: Attribute queries to application_name</li>
                  <li>• <code>track_utility</code>: Include VACUUM, ANALYZE, and maintenance commands</li>
                </ul>
              </div>
            </div>,
          ],
        },
        {
          title: 'Quick Performance Analysis',
          description: 'Run targeted analytics to uncover bottlenecks, cache issues, and response time distributions.',
          cards: [
            {
              id: 'slow-queries',
              title: 'Top Slow Queries',
              accent: 'rose',
              content: (
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
              ),
            },
            {
              id: 'cache-efficiency',
              title: 'Cache Performance Issues',
              accent: 'amber',
              content: (
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
              ),
            },
            {
              id: 'response-distribution',
              title: 'Response Time Distribution',
              accent: 'cyan',
              content: (
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
              ),
            },
          ],
        },
      ]}
      nextSteps={[
        {
          href: '/docs/pg_stat_insights/views',
          title: '📊 Views Reference',
          description: 'Complete documentation for all 11 pre-built views.',
        },
        {
          href: '/docs/pg_stat_insights/metrics',
          title: '📈 Metrics Guide',
          description: 'Detailed explanation of all 52 metric columns.',
        },
        {
          href: '/docs/pg_stat_insights/configuration',
          title: '⚙️ Configuration',
          description: 'All 5 GUC parameters with tuning recommendations.',
        },
        {
          href: '/docs/pg_stat_insights/monitoring',
          title: '📡 Prometheus & Grafana',
          description: 'Integration guide with pre-built dashboards.',
        },
      ]}
      supportLinks={[
        {
          href: 'https://github.com/pgelephant/pg_stat_insights/issues',
          label: 'GitHub Issues',
          description: 'Report bugs and request features',
          external: true,
        },
        {
          href: 'https://github.com/pgelephant/pg_stat_insights/discussions',
          label: 'GitHub Discussions',
          description: 'Ask questions and share experiences',
          external: true,
        },
        {
          href: 'https://www.pgelephant.com/blog',
          label: 'Blog Articles',
          description: 'Performance tuning guides and best practices',
          external: true,
        },
      ]}
    />
  )
}

