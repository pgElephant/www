import type { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'GitHub',
  description:
    'Open source by Dr. Ibrar Ahmed: pgBalancer, pgraft, pg_stat_insights, and pgSentinel for PostgreSQL.',
  keywords: [
    'pgBalancer',
    'pgraft',
    'pg_stat_insights',
    'pgSentinel',
    'PostgreSQL open source',
    'Dr. Ibrar Ahmed',
  ],
  alternates: { canonical: '/github' },
  openGraph: {
    title: 'GitHub · Dr. Ibrar Ahmed',
    description:
      'Open source PostgreSQL tools: pgBalancer, pgraft, pg_stat_insights, and pgSentinel.',
    url: '/github',
  },
};

const repositories = [
  {
    name: 'pgBalancer',
    href: 'https://github.com/pgElephant/pgBalancer',
    description: 'PostgreSQL connection pooler and load balancer with a REST API for management.',
  },
  {
    name: 'pgraft',
    href: 'https://github.com/pgElephant/pgraft',
    description: 'Raft consensus for PostgreSQL: leader election and safer replication.',
  },
  {
    name: 'pg_stat_insights',
    href: 'https://github.com/pgElephant/pg_stat_insights',
    description: 'Performance analytics for queries, indexes, cache, and replication.',
  },
  {
    name: 'pgSentinel',
    href: 'https://github.com/pgElephant/pgSentinel',
    description:
      'Monitoring for PostgreSQL and pgBalancer: dashboards, metrics, and health checks.',
  },
];

export default function GithubPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12 sm:px-6 sm:py-16">
      <p className="mb-6 text-sm text-stone-500">
        <Link href="/" className="hover:text-stone-300">
          Home
        </Link>
        <span className="mx-2" aria-hidden="true">
          /
        </span>
        <span className="text-stone-400">GitHub</span>
      </p>

      <header className="mb-10">
        <h1 className="mb-4 text-3xl font-semibold tracking-tight text-stone-50 sm:text-4xl">
          GitHub
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-stone-400">
          Open-source projects I build and maintain around PostgreSQL, distributed systems,
          observability, and practical AI.
        </p>
      </header>

      <ul className="divide-y divide-stone-800/80 border-y border-stone-800/80">
        {repositories.map(repo => (
          <li key={repo.name}>
            <a
              href={repo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-5 transition-colors hover:bg-stone-900/40"
            >
              <span className="inline-flex items-center gap-2 text-base font-medium text-stone-100">
                {repo.name}
                <ExternalLink className="h-3.5 w-3.5 text-stone-500" aria-hidden="true" />
              </span>
              <p className="mt-1.5 text-sm leading-relaxed text-stone-500">{repo.description}</p>
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-sm text-stone-500">
        More repositories:{' '}
        <a
          href="https://github.com/pgElephant"
          target="_blank"
          rel="noopener noreferrer"
          className="text-stone-300 underline-offset-4 hover:underline"
        >
          github.com/pgElephant
        </a>
      </p>
    </main>
  );
}
