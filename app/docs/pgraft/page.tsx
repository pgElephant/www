import Link from 'next/link'
import { Metadata } from 'next'
import {
  BookOpen,
  Download,
  ExternalLink,
  ArrowRight,
  Database,
  Shield,
  Zap,
  Code
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'pgRaft Documentation | PostgreSQL Raft Consensus Extension',
  description:
    'Operational guides and references for pgRaft: installation, cluster management, Raft internals, performance tuning, and troubleshooting.'
}

const featureCards = [
  {
    icon: Database,
    title: 'Raft Consensus',
    description: 'Fault-tolerant write replication with deterministic leader election and log matching guarantees.'
  },
  {
    icon: Shield,
    title: 'High Availability',
    description: 'Automatic failover, quorum enforcement, and rolling maintenance procedures for mission-critical clusters.'
  },
  {
    icon: Zap,
    title: 'Low Latency',
    description: 'Optimized AppendEntries batching and configurable election timers to match LAN or geo workloads.'
  },
  {
    icon: Code,
    title: 'SQL Integration',
    description: 'Manage membership, inspect Raft state, and automate operations with SQL functions and views.'
  }
]

const docSections = [
  {
    title: 'Guides & Tutorials',
    description: 'Install pgRaft, configure PostgreSQL, and bootstrap new clusters from scratch.',
    links: [
      { title: 'Getting Started', href: '/docs/pgraft/getting-started' },
      { title: 'Installation', href: '/docs/pgraft/installation' },
      { title: 'Configuration', href: '/docs/pgraft/configuration' },
      { title: 'Cluster Management', href: '/docs/pgraft/cluster-management' }
    ]
  },
  {
    title: 'Reference & Advanced',
    description: 'Deep dives into Raft internals, SQL APIs, performance tuning, and diagnostic tooling.',
    links: [
      { title: 'Raft Protocol', href: '/docs/pgraft/architecture' },
      { title: 'SQL Functions', href: '/docs/pgraft/sql-functions' },
      { title: 'Performance Tuning', href: '/docs/pgraft/performance' },
      { title: 'Troubleshooting', href: '/docs/pgraft/troubleshooting' }
    ]
  }
]

const quickLinks = [
  {
    title: 'Getting Started',
    description: 'Enable pgRaft in PostgreSQL, bootstrap the first node, and confirm leader election.',
    href: '/docs/pgraft/getting-started',
    icon: BookOpen
  },
  {
    title: 'Installation Guide',
    description: 'Compile pgRaft from source, install binaries, and verify shared library deployment.',
    href: '/docs/pgraft/installation',
    icon: Download
  },
  {
    title: 'GitHub Repository',
    description: 'Source code, issues, and roadmap for the pgRaft extension.',
    href: 'https://github.com/pgElephant/pgraft',
    icon: ExternalLink,
    external: true
  }
]

export default function PgRaftDocsPage() {
  return (
    <div className="space-y-16">
      <section className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-wide text-slate-500">Product Documentation</p>
          <h1 className="text-4xl font-bold">pgRaft</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">
          pgRaft embeds the Raft consensus algorithm directly inside PostgreSQL clusters. Use these guides to deploy the
          extension, administer multi-node topologies, perform rolling upgrades, and monitor consensus health with SQL.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/docs/pgraft/getting-started"
            className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            <BookOpen className="h-4 w-4" />
            Get Started
          </Link>
          <a
            className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400"
            href="https://github.com/pgElephant/pgraft"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-4 w-4" />
            View on GitHub
          </a>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Key Capabilities</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {featureCards.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-lg border border-slate-200 p-5 shadow-sm">
              <Icon className="h-6 w-6 text-slate-900" />
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Documentation Library</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {docSections.map(({ title, description, links }) => (
            <div key={title} className="rounded-lg border border-slate-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {links.map(({ title: linkTitle, href }) => (
                  <li key={href}>
                    <Link href={href} className="group flex items-center justify-between text-slate-700 hover:text-slate-900">
                      <span>{linkTitle}</span>
                      <ArrowRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Quick Links</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {quickLinks.map(({ title, description, href, icon: Icon, external }) => {
            const Component = external ? 'a' : Link
            const props = external
              ? { href, target: '_blank', rel: 'noopener noreferrer' }
              : { href }
            return (
              <Component
                key={href}
                {...props}
                className="rounded-lg border border-slate-200 p-5 shadow-sm transition hover:border-slate-300"
              >
                <Icon className="h-6 w-6 text-slate-900" />
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{description}</p>
                <span className="mt-3 inline-flex items-center text-sm font-medium text-slate-900">
                  Learn more
                  <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </Component>
            )
          })}
        </div>
      </section>
    </div>
  )
}