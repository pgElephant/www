import { BlogMarkdown } from '../../_components/BlogMarkdown';
import ShareOnLinkedIn from '../../../components/ShareOnLinkedIn';

export const metadata = {
  title: 'pg_stat_insights 1.0.0 Release Announcement',
  description: 'We are excited to announce pg_stat_insights 1.0.0, an advanced PostgreSQL performance monitoring extension with 52 metrics across 11 views. Production-ready and compatible with PostgreSQL 16, 17, and 18.',
  openGraph: {
    title: 'pg_stat_insights 1.0.0 Release Announcement',
    description: 'Advanced PostgreSQL performance monitoring with 52 metrics and 11 views. PostgreSQL 16/17/18 support.',
    images: ['/blog/pg-stat-insights/og-image-v9.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'pg_stat_insights 1.0.0 Release Announcement',
    description: 'Advanced PostgreSQL performance monitoring with 52 metrics and 11 views. PostgreSQL 16/17/18 support.',
    images: ['/blog/pg-stat-insights/og-image-v9.jpg'],
  },
};

const markdown = `![pg_stat_insights header](/blog/pg-stat-insights/header.svg?v=7)

# pg_stat_insights 1.0.0 Release Announcement

**[Download v1.0.0](https://github.com/pgElephant/pg_stat_insights/releases/tag/v1.0.0)**  ·  **[Source Code](https://github.com/pgElephant/pg_stat_insights)**  ·  **[Documentation](https://www.pgelephant.com/docs/pg-stat-insights)**

## Executive Summary

We are releasing pg_stat_insights 1.0.0, a PostgreSQL performance monitoring extension with 52 metrics across 11 views. It is a drop-in enhancement to standard PostgreSQL statistics. It helps you identify slow queries, understand cache behavior, track WAL generation, and make tuning decisions.

- PostgreSQL 16, 17, and 18 compatibility
- Build artifacts for Ubuntu, Rocky Linux, and macOS
- Install with packages or build-from-source

## What’s in this release

- 52 execution, I/O, WAL, JIT, parallelism, and metadata metrics
- 11 pre-built views including: top by time, top by calls, I/O heavy, cache misses, slow queries, errors, histogram summaries, and replication
- Response-time categories for practical SLA monitoring (<1ms to >10s)
- Works alongside (and beyond) pg_stat_statements

## Build Artifacts

- PostgreSQL versions: **16, 17, 18**
- Platforms: **Ubuntu (\`.so\`), Rocky Linux (\`.so\`), macOS (\`.dylib\`)**
- Get them here: **[Release Assets](https://github.com/pgElephant/pg_stat_insights/releases/tag/v1.0.0)**

## Quick Install

**Binary install (example):**
\`\`\`bash
# On Ubuntu/Rocky: install the package that matches your PG version
# Then enable the extension in your database
psql -d yourdb -c "CREATE EXTENSION pg_stat_insights;"
\`\`\`

**Build from source:**
\`\`\`bash
make PG_CONFIG=/path/to/pg_config
sudo make install
\`\`\`

## Documentation

- Quick Start: https://pgelephant.github.io/pg_stat_insights/quick-start/
- Full Docs: https://pgelephant.github.io/pg_stat_insights/

## Verify Download

We publish checksums for all artifacts. After downloading, verify with:
\`\`\`bash
sha256sum -c SHA256SUMS
\`\`\`

## Thank You

Huge thanks to the PostgreSQL community and early users who helped shape this release with feedback and testing.

pgElephant Team
`;

export default function PgStatInsightsReleaseBlog() {
  return (
    <div className="pt-16">
      {/* Blog Content */}
      <div style={{ backgroundColor: '#1f2937' }}>
        <BlogMarkdown>{markdown}</BlogMarkdown>

        {/* Share Section */}
        <div className="max-w-4xl mx-auto px-6 pb-12">
          <div className="border-t border-white/10 pt-8">
            <h3 className="text-2xl font-bold text-white mb-4">Share This Announcement</h3>
            <ShareOnLinkedIn
              url="https://www.pgelephant.com/blog/pg-stat-insights-1-0-0"
              title="pg_stat_insights 1.0.0 Release Announcement"
              summary="We are releasing pg_stat_insights 1.0.0, a PostgreSQL performance monitoring extension with 52 metrics and 11 pre-built views. Production-ready and installable."
              hashtags={[
                'PostgreSQL',
                'PerformanceMonitoring',
                'pg_stat_insights',
                'Database',
                'Observability',
                'SRE',
                'OpenSource',
                'pgElephant',
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
