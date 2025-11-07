import Link from 'next/link'
import { Metadata } from 'next'
import { BookOpen, Database, Gauge, Activity, BarChart3, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'pg_stat_insights Documentation | PostgreSQL Performance Analytics',
  description:
    'Install and operate pg_stat_insights to capture 52 performance metrics, 11 curated views, and advanced workload analytics for PostgreSQL 16–18.'
}

const featureCards = [
  {
    icon: Gauge,
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
    description: 'Designed as a superset of pg_stat_statements with identical APIs plus richer analytics.'
  },
  {
    icon: BarChart3,
    title: 'Observability Ready',
    description: 'Prometheus exporters and Grafana dashboards for real-time SLO tracking and alerting.'
  }
]

const docSections = [
  {
    title: 'Getting Started',
    description: 'Enable pg_stat_insights, validate installation, and learn the core views in minutes.',
    links: [
      { title: 'Overview & Installation', href: '/docs/pg_stat_insights/overview' },
      { title: 'Getting Started Guide', href: '/docs/pg-stat-insights/getting-started' },
      { title: 'Configuration', href: '/docs/pg_stat_insights/configuration' }
    ]
  },
  {
    title: 'Deep Dive Views',
    description: 'Understand each curated view and how to run diagnostics during incidents.',
    links: [
      { title: 'Views Reference', href: '/docs/pg_stat_insights/views' },
      { title: 'Metrics Guide', href: '/docs/pg_stat_insights/metrics' },
      { title: 'Usage Examples', href: '/docs/pg_stat_insights/usage' }
    ]
  },
  {
    title: 'Operations & Monitoring',
    description: 'Integrate with Prometheus, Grafana, and automate routine maintenance checks.',
    links: [
      { title: 'Monitoring & Dashboards', href: '/docs/pg_stat_insights/monitoring' },
      { title: 'WAL Monitoring', href: '/docs/pg_stat_insights/wal-monitoring' },
      { title: 'Cache Efficiency', href: '/docs/pg_stat_insights/cache-efficiency' }
    ]
  }
]

const quickLinks = [
  {
    title: 'Installation Quick Start',
    description: 'Three commands to enable pg_stat_insights and view top slow queries.',
    href: '/docs/pg-stat-insights/getting-started',
    icon: BookOpen
  },
  {
    title: 'Views Reference',
    description: 'Detailed explanation of every curated view and how to combine them.',
    href: '/docs/pg_stat_insights/views',
    icon: Database
  },
  {
    title: 'Usage Playbooks',
    description: '50+ SQL snippets for troubleshooting latency, I/O, locking, and errors.',
    href: '/docs/pg_stat_insights/usage',
    icon: Activity
  }
]

export default function PgStatInsightsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-cyan-900">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 dark:from-cyan-500/10 dark:to-blue-500/10" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="rounded-2xl bg-white/80 p-2 shadow-2xl ring-1 ring-gray-900/10 dark:bg-slate-800/80 dark:ring-white/10">
                <div className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 text-white">
                  <Gauge className="h-6 w-6" />
                  <span className="text-lg font-semibold">pg_stat_insights</span>
                </div>
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              PostgreSQL Performance Analytics Extension
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              Gain instant visibility into query latency, cache behavior, I/O costs, and WAL pressure. pg_stat_insights ships
              with 52 metrics across 11 curated views, making it a drop-in upgrade from pg_stat_statements with richer analytics.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/docs/pg-stat-insights/getting-started"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-slate-800"
              >
                <BookOpen className="h-4 w-4" />
                Get Started
              </Link>
              <Link
                href="/docs/pg_stat_insights/views"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400"
              >
                <Database className="h-4 w-4" />
                Explore Views
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-slate-900 dark:text-white">Key Capabilities</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featureCards.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white/85 p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-900/60">
                <Icon className="h-6 w-6 text-cyan-600" />
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start Summary */}
      <section className="pb-4">
        <div className="mx-auto max-w-4xl rounded-2xl border border-cyan-200 bg-white/90 p-8 shadow-sm dark:border-cyan-900/40 dark:bg-slate-900/60">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Install in 3 Steps</h2>
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

      {/* Documentation Sections */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-slate-900 dark:text-white">Documentation Library</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {docSections.map((section) => (
              <div key={section.title} className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-900/60">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{section.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{section.description}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex items-center justify-between text-slate-700 hover:text-cyan-600 dark:text-slate-200"
                      >
                        <span>{link.title}</span>
                        <ArrowRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-slate-900 dark:text-white">Quick Links</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {quickLinks.map(({ title, description, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:border-cyan-300 dark:border-slate-700/60 dark:bg-slate-900/60"
              >
                <Icon className="h-6 w-6 text-cyan-600" />
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-cyan-600">
                  View guide
                  <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
