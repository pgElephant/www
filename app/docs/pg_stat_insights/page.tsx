import { Metadata } from 'next'
import { BookOpen, Database, Activity } from 'lucide-react'
import ProductDocsLanding from '../../../components/ProductDocsLanding'
import { PgStatInsightsIcon } from '../../../components/ProductIcons'

export const metadata: Metadata = {
  title: 'pg_stat_insights Documentation | PostgreSQL Performance Analytics',
  description:
    'Install and operate pg_stat_insights to capture 52 performance metrics, 11 curated views, and advanced workload analytics for PostgreSQL 16–18.'
}

export default function PgStatInsightsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-cyan-900">
      <ProductDocsLanding
        hero={{
          badgeLabel: 'pg_stat_insights',
          badgeIcon: <PgStatInsightsIcon size={24} />,
          badgeGradient: 'from-cyan-600 to-blue-600',
          title: 'PostgreSQL Performance Analytics Extension',
          description:
            'Gain instant visibility into query latency, cache efficiency, I/O, and WAL pressure. pg_stat_insights collects 52 metrics across 11 curated views, making it a drop-in upgrade from pg_stat_statements with richer diagnostics.',
          ctas: [
            {
              label: 'Get Started',
              href: '/docs/pg-stat-insights/getting-started',
              icon: <BookOpen className="h-4 w-4" />,
              variant: 'primary'
            },
            {
              label: 'Explore Views',
              href: '/docs/pg_stat_insights/views',
              icon: <Database className="h-4 w-4" />,
              variant: 'secondary'
            }
          ]
        }}
        features={[
          {
            icon: () => <PgStatInsightsIcon size={24} />,
            title: 'Comprehensive Metrics',
            description: 'Capture 52 timing, planning, I/O, WAL, and JIT statistics per query fingerprint with low overhead.'
          },
          {
            icon: Activity,
            title: '11 Curated Views',
            description: 'Pre-built analytics for slow queries, cache misses, I/O outliers, replication lag, and error hot spots.'
          },
          {
            icon: Database,
            title: 'Drop-in Replacement',
            description: 'Superset of pg_stat_statements APIs with additional histograms, attribution, and workload tagging.'
          },
          {
            icon: () => <PgStatInsightsIcon size={24} />,
            title: 'Observability Ready',
            description: 'Prometheus exporters and Grafana dashboards for real-time SLO tracking and alerting.'
          }
        ]}
        docSections={[
          {
            title: 'Getting Started',
            description: 'Enable pg_stat_insights, validate installation, and learn the core views in minutes.',
            items: [
              { title: 'Overview & Installation', href: '/docs/pg_stat_insights/overview', description: 'Understand architecture requirements and install paths.' },
              { title: 'Getting Started Guide', href: '/docs/pg-stat-insights/getting-started', description: 'Follow the three-step onboarding with SQL examples.' },
              { title: 'Configuration', href: '/docs/pg_stat_insights/configuration', description: 'Tune GUC parameters for retention, histograms, and attribution.' }
            ]
          },
          {
            title: 'Deep Dive Views',
            description: 'Understand each curated view and how to run diagnostics during incidents.',
            items: [
              { title: 'Views Reference', href: '/docs/pg_stat_insights/views', description: 'Detailed documentation for all 11 curated views.' },
              { title: 'Metrics Guide', href: '/docs/pg_stat_insights/metrics', description: 'Column definitions, units, and interpretation guidance.' },
              { title: 'Usage Examples', href: '/docs/pg_stat_insights/usage', description: '50+ SQL recipes for common performance investigations.' }
            ]
          },
          {
            title: 'Operations & Monitoring',
            description: 'Integrate with observability stacks and automate health checks.',
            items: [
              { title: 'Monitoring & Dashboards', href: '/docs/pg_stat_insights/monitoring', description: 'Prometheus exporters and Grafana dashboards.' },
              { title: 'WAL Monitoring', href: '/docs/pg_stat_insights/wal-monitoring', description: 'Track checkpoint rate, WAL flush pressure, and replication lag.' },
              { title: 'Cache Efficiency', href: '/docs/pg_stat_insights/cache-efficiency', description: 'Identify buffer hit regressions and I/O-intensive queries.' }
            ]
          }
        ]}
        quickLinks={[
          {
            title: 'Installation Quick Start',
            description: 'Three commands to enable pg_stat_insights and capture top slow queries.',
            href: '/docs/pg-stat-insights/getting-started',
            icon: BookOpen
          },
          {
            title: 'Views Reference',
            description: 'Detailed explanation of every curated view and relationship.',
            href: '/docs/pg_stat_insights/views',
            icon: Database
          },
          {
            title: 'Usage Playbooks',
            description: 'Incident response SQL covering latency, locks, and throughput hotspots.',
            href: '/docs/pg_stat_insights/usage',
            icon: Activity
          }
        ]}
        theme={{
          featureIconClass: 'text-cyan-600',
          linkHoverClass: 'hover:text-cyan-600',
          quickLinkCardClass:
            'rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:border-cyan-300 dark:border-slate-700/60 dark:bg-slate-900/60',
          quickLinkIconClass: 'text-cyan-600',
          quickLinkHoverLabelClass: 'text-cyan-600',
          heroOverlay: 'bg-gradient-to-r from-cyan-600/20 to-blue-600/20 dark:from-cyan-500/10 dark:to-blue-500/10'
        }}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-4xl rounded-2xl border border-cyan-200 bg-white/90 p-8 shadow-sm dark:border-cyan-900/40 dark:bg-slate-900/60">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Install in 3 Commands</h2>
          <pre className="mt-4 whitespace-pre-wrap rounded-xl bg-slate-900/90 p-5 text-sm text-cyan-100">
{`-- 1) Load the extension at startup
ALTER SYSTEM SET shared_preload_libraries = 'pg_stat_insights';
-- Restart PostgreSQL after changing shared_preload_libraries

-- 2) Create the extension in your database
CREATE EXTENSION pg_stat_insights;

-- 3) Run your first diagnostic
SELECT query, calls, total_exec_time, mean_exec_time
FROM   pg_stat_insights_top_by_time
LIMIT  10;`}
          </pre>
        </div>
      </section>
    </div>
  )
}
