import { Metadata } from 'next'
import GettingStartedLayout from '../../../../components/GettingStartedLayout'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import { PgStatInsightsIcon } from '../../../../components/ProductIcons'

export const metadata: Metadata = {
  title: 'Getting Started with pg_stat_insights | PostgreSQL Performance Monitoring',
  description: 'Install and configure pg_stat_insights in minutes, then explore core analytics views and metrics.',
}

export default function GettingStartedPage() {
  return (
    <GettingStartedLayout
      product="pg_stat_insights"
      hero={{
        label: 'pg_stat_insights',
        labelIcon: <PgStatInsightsIcon size={20} />, 
        labelAccent: 'cyan',
        title: 'Getting Started with pg_stat_insights',
        description:
          'Enable 52 query performance metrics and 11 curated diagnostic views in under five minutes. Follow the three-step onboarding to install the extension, and then explore deeper tuning guides below.',
        cta: {
          href: '/docs/pg_stat_insights/views',
          label: 'View documentation library',
        },
      }}
      theme={{
        pageBackground:
          'bg-gradient-to-br from-slate-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-cyan-900',
        heroOverlay:
          'bg-gradient-to-r from-cyan-600/20 to-blue-600/20 dark:from-cyan-500/10 dark:to-blue-500/10',
        requirementsBorder: 'emerald',
        requirementsBackground: 'bg-white/90 dark:bg-slate-900/60',
      }}
      requirements={{
        title: 'Standalone Extension',
        items: [
          'PostgreSQL 16, 17, or 18 with superuser access',
          'Ability to modify shared_preload_libraries and restart PostgreSQL',
          'Build toolchain (make, gcc/clang) for optional source installs',
          'Optional: Package repository or Homebrew for binary installs',
        ],
        note: (
          <span>
            pg_stat_insights ships as a single extension and requires no external collectors. Load it at startup, create the extension, then
            query the telemetry views immediately.
          </span>
        ),
      }}
      sections={[
        {
          title: 'Installation in 3 Steps',
          description: 'Execute these commands from the PostgreSQL superuser. Restart is required only after enabling shared_preload_libraries.',
          cards: [
            {
              id: 'update-conf',
              title: 'Step 1 · Update postgresql.conf',
              accent: 'blue',
              description: 'Enable the extension at startup and restart PostgreSQL.',
              content: (
                <SqlCodeBlock
                  title="PostgreSQL configuration"
                  code={`-- Enable pg_stat_insights in PostgreSQL configuration
ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_insights';

-- Restart PostgreSQL after changing shared_preload_libraries
-- sudo systemctl restart postgresql
-- brew services restart postgresql@18`}
                />
              ),
            },
            {
              id: 'create-ext',
              title: 'Step 2 · Create the Extension',
              accent: 'emerald',
              description: 'Connect to the target database and register pg_stat_insights.',
              content: (
                <SqlCodeBlock
                  title="Create extension"
                  code={`-- Connect to your database
\\c your_database_name

-- Create the extension
CREATE EXTENSION pg_stat_insights;`}
                />
              ),
            },
            {
              id: 'initial-diagnostics',
              title: 'Step 3 · Run First Diagnostics',
              accent: 'purple',
              description: 'Inspect top slow queries, cache ratios, and disk usage immediately.',
              content: (
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
              ),
            },
          ],
        },
        {
          title: 'Complete Installation Reference',
          description: 'Build from source, install via packages, or automate with CI—use the commands below as a template.',
          content: [
            <BashCodeBlock
              key="source"
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
            />,
            <BashCodeBlock
              key="packages"
              title="Package installs"
              code={`# Ubuntu / Debian
sudo apt-get install postgresql-18-pg-stat-insights

# RHEL / Rocky / AlmaLinux
yum install pg-stat-insights_18

# Homebrew (macOS)
brew install pg_stat_insights`}
            />,
          ],
        },
        {
          title: 'Configuration Checklist',
          description: 'Tune runtime overhead, memory consumption, and view attribution with the optional GUC parameters below.',
          content: [
            <SqlCodeBlock
              key="guc"
              title="Session-level tuning"
              code={`-- Optional GUC tuning
SET pg_stat_insights.track_timing = on;
SET pg_stat_insights.max_entries = 10000;
SET pg_stat_insights.track_histogram = on;
SET pg_stat_insights.track_user = on;
SET pg_stat_insights.track_application = on;`}
            />,
          ],
        },
      ]}
      nextSteps={[
        {
          href: '/docs/pg_stat_insights/views',
          title: '📊 Views Reference',
          description: 'Understand all 11 curated analytics views.',
        },
        {
          href: '/docs/pg_stat_insights/metrics',
          title: '📈 Metrics Guide',
          description: 'Detailed definitions for all 52 collected metrics.',
        },
        {
          href: '/docs/pg_stat_insights/usage',
          title: '🧰 Usage Playbooks',
          description: 'Troubleshoot latency, cache misses, locking, and WAL.',
        },
        {
          href: '/docs/pg_stat_insights/monitoring',
          title: '🛰 Monitoring Integration',
          description: 'Prometheus exporters, Grafana dashboards, and alerting tips.',
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

