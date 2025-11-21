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
    <ProductDocsLanding
      hero={{
        badgeLabel: 'pg_stat_insights',
        badgeIcon: <PgStatInsightsIcon size={24} />, 
        badgeGradient: 'from-slate-700 to-slate-600',
        title: 'PostgreSQL Performance Analytics Extension',
        description:
          'Gain instant visibility into query latency, cache efficiency, I/O, and WAL pressure. pg_stat_insights collects 52 metrics across 11 curated views, making it a drop-in upgrade from pg_stat_statements with richer diagnostics.',
        ctas: [
          {
            label: 'Get Started',
            href: '/docs/pg_stat_insights/getting-started',
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
          title: '52 Deep Metrics',
          description: 'Collect extended plan, execution, IO, WAL, and JIT metrics for faster root cause analysis.'
        },
        {
          icon: () => <Activity className="h-6 w-6 text-cyan-400" />,
          title: '11 Curated Views',
          description: 'Purpose-built views for cache efficiency, IO profiling, parallel query tuning, and more.'
        },
        {
          icon: () => <Database className="h-6 w-6 text-emerald-400" />,
          title: 'Drop-in Upgrade',
          description: 'Extends pg_stat_statements semantics, keeps the same reset functions, and integrates with existing dashboards.'
        }
      ]}
      docSections={[
        {
          title: 'Overview & Setup',
          description: 'Install pg_stat_insights, enable tracking, and understand the metric catalog.',
          items: [
            {
              title: 'Getting Started',
              href: '/docs/pg_stat_insights/getting-started',
              description: 'Install the extension, enable shared_preload_libraries, and verify metrics are populated.'
            },
            {
              title: 'Configuration',
              href: '/docs/pg_stat_insights/configuration',
              description: 'Tune tracking scope, retention, and planning metrics for production workloads.'
            },
            {
              title: 'Metrics Overview',
              href: '/docs/pg_stat_insights/metrics',
              description: 'Explore all 52 metric columns and how to interpret them.'
            }
          ]
        },
        {
          title: 'Performance Deep Dives',
          description: 'Investigate cache, IO, parallelism, WAL, and slow query behaviour with targeted guides.',
          items: [
            {
              title: 'Cache Efficiency',
              href: '/docs/pg_stat_insights/cache-efficiency',
              description: 'Measure cache hit ratios and identify statements that thrash shared buffers.'
            },
            {
              title: 'I/O Performance',
              href: '/docs/pg_stat_insights/io-performance',
              description: 'Analyse block read/write timing and detect temp file spillovers.'
            },
            {
              title: 'Parallel Queries',
              href: '/docs/pg_stat_insights/parallel-queries',
              description: 'Review parallel worker usage and evaluate speedups versus overhead.'
            },
            {
              title: 'WAL Monitoring',
              href: '/docs/pg_stat_insights/wal-monitoring',
              description: 'Track WAL volume per query and tune write-heavy workloads.'
            }
          ]
        },
        {
          title: 'Operations & Monitoring',
          description: 'Integrate with observability stacks, automate resets, and export metrics to dashboards.',
          items: [
            {
              title: 'Usage & Reset Patterns',
              href: '/docs/pg_stat_insights/usage',
              description: 'Copy/paste SQL snippets for investigations and schedule safe resets.'
            },
            {
              title: 'Monitoring & Alerts',
              href: '/docs/pg_stat_insights/monitoring',
              description: 'Wire metrics into Prometheus/Grafana and configure alert rules.'
            },
            {
              title: 'Troubleshooting',
              href: '/docs/pg_stat_insights/troubleshooting',
              description: 'Fix preload errors, missing metrics, excessive overhead, and reset issues.'
            },
            {
              title: 'Views Reference',
              href: '/docs/pg_stat_insights/views',
              description: 'Reference for the eleven curated views bundled with pg_stat_insights.'
            }
          ]
        }
      ]}
      quickLinks={[
        {
          title: 'Getting Started Guide',
          description: 'Enable pg_stat_insights and validate metrics within five minutes.',
          href: '/docs/pg_stat_insights/getting-started',
          icon: BookOpen
        },
        {
          title: 'Configuration Reference',
          description: 'Learn how to adjust tracking scope, retention, and planning metrics.',
          href: '/docs/pg_stat_insights/configuration',
          icon: Database
        },
        {
          title: 'Troubleshooting Playbook',
          description: 'Step-by-step fixes for missing metrics, overhead, and reset problems.',
          href: '/docs/pg_stat_insights/troubleshooting',
          icon: Activity
        },
        {
          title: 'Metrics Deep Dive',
          description: 'Understand every column exposed by pg_stat_insights for dashboards.',
          href: '/docs/pg_stat_insights/metrics',
          icon: Activity
        }
      ]}
    />
  )
}
