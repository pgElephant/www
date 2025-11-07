import { Metadata } from 'next';
import SqlCodeBlock from '../../../../components/SqlCodeBlock';
import BashCodeBlock from '../../../../components/BashCodeBlock';

export const metadata: Metadata = {
  title: 'Getting Started with pg_stat_insights | PostgreSQL Performance Monitoring',
  description: 'Quick start guide for pg_stat_insights - install and configure PostgreSQL performance monitoring in 3 steps.',
};

export default function GettingStartedPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Getting Started with pg_stat_insights</h1>
        <p className="text-lg text-muted-foreground">
          Monitor PostgreSQL query performance in under 5 minutes. pg_stat_insights is a standalone extension that provides comprehensive performance monitoring with 52 metrics across 11 pre-built views.
        </p>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2 text-green-800 dark:text-green-400">✅ Standalone Extension</h3>
        <p className="text-sm text-green-700 dark:text-green-300">
          pg_stat_insights requires <strong>no other extensions</strong> - just PostgreSQL 16, 17, or 18. It's a drop-in replacement for pg_stat_statements with enhanced analytics.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Installation in 3 Steps</h2>

        <div className="space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-lg font-semibold mb-2">Step 1: Enable Extension in PostgreSQL Configuration</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Add pg_stat_insights to shared_preload_libraries and restart PostgreSQL.
            </p>
            <SqlCodeBlock
              code={`-- Enable pg_stat_insights in PostgreSQL configuration
ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_insights';

-- Restart PostgreSQL server (required for shared_preload_libraries changes)
-- On systemd systems:
-- sudo systemctl restart postgresql

-- On macOS/Homebrew:
-- brew services restart postgresql@18`}
              title="PostgreSQL Configuration"
            />
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="text-lg font-semibold mb-2">Step 2: Create the Extension</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Create the extension in your database. No additional dependencies required.
            </p>
            <SqlCodeBlock
              code={`-- Connect to your database
\\c your_database_name

-- Create the pg_stat_insights extension
CREATE EXTENSION pg_stat_insights;`}
              title="Create Extension"
            />
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="text-lg font-semibold mb-2">Step 3: View Your Performance Data</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Instantly access comprehensive query performance metrics.
            </p>
            <SqlCodeBlock
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
    round(100.0 * shared_blks_hit / (shared_blks_hit + shared_blks_read), 2) as cache_hit_ratio
FROM pg_stat_insights_top_cache_misses
WHERE shared_blks_hit + shared_blks_read > 0
LIMIT 10;`}
              title="Query Performance Analysis"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Complete Installation Guide</h2>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Build and Install from Source</h3>

          <BashCodeBlock
            code={`# Clone the repository
git clone https://github.com/pgelephant/pg_stat_insights.git
cd pg_stat_insights

# Build the extension
make clean && make

# Install system-wide
sudo make install

# Or install to custom location
make install PG_CONFIG=/path/to/pg_config`}
            title="Build from Source"
          />

          <h3 className="text-xl font-semibold">Package Installation (Ubuntu/Debian)</h3>

          <BashCodeBlock
            code={`# Add PostgreSQL repository (if not already added)
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

# Update package list
sudo apt-get update

# Install pg_stat_insights
sudo apt-get install postgresql-18-pg-stat-insights`}
            title="Package Installation"
          />

          <h3 className="text-xl font-semibold">Homebrew Installation (macOS)</h3>

          <BashCodeBlock
            code={`# Install pg_stat_insights via Homebrew
brew install pg_stat_insights

# Or if using custom PostgreSQL installation
cd pg_stat_insights
make && make install PG_CONFIG=/usr/local/pgsql/bin/pg_config`}
            title="Homebrew Installation"
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Configuration Options</h2>

        <p className="text-muted-foreground mb-4">
          pg_stat_insights provides 5 GUC parameters to fine-tune performance monitoring:
        </p>

        <SqlCodeBlock
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
          title="Configuration Parameters"
        />

        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">Performance Tuning</h4>
            <ul className="text-sm space-y-1">
              <li>• <code>max_entries</code>: Controls memory usage</li>
              <li>• <code>track_timing</code>: Enable for execution time metrics</li>
              <li>• <code>track_histogram</code>: Enable for response time distribution</li>
            </ul>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold mb-2">Security & Filtering</h4>
            <ul className="text-sm space-y-1">
              <li>• <code>track_user</code>: Filter by database user</li>
              <li>• <code>track_application</code>: Filter by application</li>
              <li>• <code>track_utility</code>: Include utility commands</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Quick Performance Analysis</h2>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Top Slow Queries</h3>
          <SqlCodeBlock
            code={`SELECT
    query,
    calls,
    round(total_exec_time::numeric, 2) as total_time_ms,
    round(mean_exec_time::numeric, 2) as avg_time_ms,
    rows,
    round((shared_blks_hit * 100.0 / (shared_blks_hit + shared_blks_read))::numeric, 2) as cache_hit_pct
FROM pg_stat_insights_top_by_time
WHERE mean_exec_time > 100  -- Queries slower than 100ms
ORDER BY total_exec_time DESC
LIMIT 20;`}
            title="Slow Query Analysis"
          />

          <h3 className="text-lg font-semibold">Cache Performance Issues</h3>
          <SqlCodeBlock
            code={`SELECT
    query,
    calls,
    shared_blks_hit,
    shared_blks_read,
    shared_blks_hit + shared_blks_read as total_blocks,
    round((shared_blks_hit * 100.0 / (shared_blks_hit + shared_blks_read))::numeric, 2) as cache_hit_ratio
FROM pg_stat_insights_top_cache_misses
WHERE shared_blks_hit + shared_blks_read > 1000  -- Significant I/O
ORDER BY shared_blks_read DESC
LIMIT 15;`}
            title="Cache Efficiency Analysis"
          />

          <h3 className="text-lg font-semibold">Response Time Distribution</h3>
          <SqlCodeBlock
            code={`SELECT
    response_time_category,
    count,
    round((count * 100.0 / sum(count) over ())::numeric, 2) as percentage,
    round(avg_exec_time::numeric, 2) as avg_time_ms,
    round(min_exec_time::numeric, 2) as min_time_ms,
    round(max_exec_time::numeric, 2) as max_time_ms
FROM pg_stat_insights_histogram_summary
ORDER BY response_time_category;`}
            title="Response Time Analysis"
          />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <a href="/docs/pg-stat-insights/query-analytics" className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
            <h3 className="font-semibold mb-2">📊 Query Analytics</h3>
            <p className="text-sm text-muted-foreground">Deep analysis of query performance and patterns</p>
          </a>
          <a href="/docs/pg-stat-insights/api" className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
            <h3 className="font-semibold mb-2">📈 API Reference</h3>
            <p className="text-sm text-muted-foreground">Complete API documentation with examples</p>
          </a>
          <a href="/docs/pg-stat-insights/best-practices" className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
            <h3 className="font-semibold mb-2">⚙️ Best Practices</h3>
            <p className="text-sm text-muted-foreground">Performance tuning recommendations</p>
          </a>
          <a href="/docs/pg-stat-insights" className="p-4 border rounded-lg hover:border-blue-500 transition-colors">
            <h3 className="font-semibold mb-2">📚 Documentation</h3>
            <p className="text-sm text-muted-foreground">Complete documentation index</p>
          </a>
        </div>
      </section>

      <section className="bg-muted p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Need Help?</h2>
        <p className="text-muted-foreground mb-4">
          Join our community for support and discussion:
        </p>
        <ul className="space-y-2">
          <li>• <a href="https://github.com/pgelephant/pg_stat_insights/issues" className="text-blue-600 hover:underline">GitHub Issues</a> - Report bugs and request features</li>
          <li>• <a href="https://github.com/pgelephant/pg_stat_insights/discussions" className="text-blue-600 hover:underline">GitHub Discussions</a> - Ask questions and share experiences</li>
          <li>• <a href="https://www.pgelephant.com/blog" className="text-blue-600 hover:underline">Blog Articles</a> - Performance tuning guides and best practices</li>
        </ul>
      </section>
    </div>
  );
}

