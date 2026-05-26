import { Metadata } from 'next'
import { ExternalLink, Github } from 'lucide-react'

export const metadata: Metadata = {
  title: 'pgElephant Repositories',
  description: 'A single-page directory of pgElephant GitHub repositories.',
  alternates: {
    canonical: '/',
  },
}

const repositories = [
  {
    name: 'pgraft',
    label: 'pgraft',
    href: 'https://github.com/pgElephant/pgraft',
    description:
      'PostgreSQL Raft consensus extension for leader election, crash-safe replication, and split-brain prevention.',
    stack: ['PostgreSQL extension', 'Raft consensus', 'High availability'],
  },
  {
    name: 'pgBalancer',
    label: 'pgBalancer',
    href: 'https://github.com/pgElephant/pgBalancer',
    description:
      'PostgreSQL connection pooler and load balancer with REST API management and event streaming.',
    stack: ['Connection pooling', 'Load balancing', 'REST API'],
  },
  {
    name: 'pgSentinel',
    label: 'pgSentinel',
    href: 'https://github.com/pgElephant/pgSentinel',
    description:
      'Monitoring platform for PostgreSQL and pgBalancer with dashboards, metrics, and health checks.',
    stack: ['Monitoring', 'Metrics', 'Dashboards'],
  },
  {
    name: 'pg_stat_insights',
    label: 'pg_stat_insights',
    href: 'https://github.com/pgElephant/pg_stat_insights',
    description:
      'PostgreSQL performance analytics extension for query, table, index, cache, and replication insights.',
    stack: ['Performance', 'Analytics', 'PostgreSQL stats'],
  },
]

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <section className="relative isolate px-6 py-10 sm:py-14 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.14),transparent_28%)]" />
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl flex-col justify-center">
          <div className="mb-10 max-w-3xl">
            <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
              PostgreSQL repositories
            </h1>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {repositories.map((repo) => (
              <a
                key={repo.name}
                href={repo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur transition duration-200 hover:-translate-y-1 hover:border-amber-300/40 hover:bg-white/[0.07] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-900">
                      <Github
                        className="h-5 w-5 text-amber-200"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white">
                        {repo.label}
                      </h2>
                      <p className="font-mono text-sm text-slate-400">
                        github.com/pgElephant/{repo.name}
                      </p>
                    </div>
                  </div>
                  <ExternalLink
                    className="h-5 w-5 shrink-0 text-slate-500 transition group-hover:text-amber-200"
                    aria-hidden="true"
                  />
                </div>

                <p className="mt-5 text-sm leading-6 text-slate-300">
                  {repo.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {repo.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <span>pgElephant repository directory.</span>
            <a
              href="https://github.com/pgElephant"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-slate-200 transition hover:text-amber-200"
            >
              View GitHub organization
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
