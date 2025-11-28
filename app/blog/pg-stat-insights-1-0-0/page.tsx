import { BlogMarkdown } from '../../_components/BlogMarkdown';
import GiscusComments from '../../../components/GiscusComments';
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
      <div style={{ backgroundColor: '#4b5563' }}>
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

      {/* Comments Section */}
      <div 
        className="relative overflow-hidden py-16 px-6"
        style={{ 
          background: `linear-gradient(135deg, #070d1a 0%, #111827 25%, #1f2937 50%, #374151 75%, #4b5563 100%)`,
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(6, 182, 212, 0.15) 50%, rgba(16, 185, 129, 0.15) 100%)'
          }}
        />
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-primary-500/25 to-secondary-500/25 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-secondary-500/20 to-accent-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-r from-accent-500/15 to-primary-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }}
          />
        </div>

        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 shadow-2xl">
            <GiscusComments
              repo="pgElephant/www"
              repoId="R_kgDONWqK3A"
              category="Blog Comments"
              categoryId="DIC_kwDONWqK3M4ClOuv"
              mapping="pathname"
              reactionsEnabled={true}
              theme="dark"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
