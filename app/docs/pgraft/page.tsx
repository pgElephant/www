import React from 'react'
import Link from 'next/link'
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

export const metadata = {
  title: 'pgRaft Documentation | PostgreSQL Raft Consensus Extension',
  description:
    'Deploy, configure, and operate pgRaft to add Raft consensus, leader election, and high availability to PostgreSQL clusters. Complete guides for installation, configuration, cluster management, tuning, and diagnostics.'
}

export default function PgRaftDocsPage() {
  const featureCards = [
    {
      icon: Database,
      title: 'Raft Consensus',
      description: 'Deterministic leader election, log replication, and commit guarantees implemented inside PostgreSQL.'
    },
    {
      icon: Shield,
      title: 'High Availability',
      description: 'Automatic failover, quorum enforcement, and rolling maintenance procedures for mission‑critical deployments.'
    },
    {
      icon: Zap,
      title: 'Low Latency',
      description: 'Configurable heartbeat and election timers with optimized AppendEntries batching for LAN or geo clusters.'
    },
    {
      icon: Code,
      title: 'SQL Integration',
      description: 'Manage membership, inspect Raft state, and orchestrate maintenance entirely through SQL functions and views.'
    }
  ]

  const docSections = [
    {
      title: 'Guides & Tutorials',
      description: 'Install pgRaft, bootstrap the first cluster, and learn daily operator workflows.',
      items: [
        { title: 'Getting Started', href: '/docs/pgraft/getting-started', description: 'Enable pgRaft, initialize metadata, and verify leader election.' },
        { title: 'Installation', href: '/docs/pgraft/installation', description: 'Compile from source, install binaries, and confirm shared libraries.' },
        { title: 'Configuration', href: '/docs/pgraft/configuration', description: 'postgresql.conf and pg_hba settings for Raft traffic.' },
        { title: 'Cluster Management', href: '/docs/pgraft/cluster-management', description: 'Add/remove nodes, perform rolling upgrades, and monitor health.' }
      ]
    },
    {
      title: 'Reference & Advanced',
      description: 'Dig into Raft internals, SQL APIs, performance tuning, troubleshooting, and diagnostics.',
      items: [
        { title: 'Architecture', href: '/docs/pgraft/architecture', description: 'Understand background workers, metadata stores, and networking model.' },
        { title: 'SQL Functions', href: '/docs/pgraft/sql-functions', description: 'Reference for membership, monitoring, and maintenance routines.' },
        { title: 'Performance Tuning', href: '/docs/pgraft/performance', description: 'Consensus timing, batching, WAL optimization, and observability.' },
        { title: 'Troubleshooting', href: '/docs/pgraft/troubleshooting', description: 'Resolve election churn, lag, snapshot backlog, and connectivity issues.' }
      ]
    }
  ]

  const quickLinks = [
    {
      title: 'Getting Started Guide',
      description: 'Bootstrap pgRaft on PostgreSQL 16–18 and promote the first leader node.',
      href: '/docs/pgraft/getting-started',
      icon: BookOpen
    },
    {
      title: 'Installation Reference',
      description: 'Build from source, install artifacts, and validate environment prerequisites.',
      href: '/docs/pgraft/installation',
      icon: Download
    },
    {
      title: 'GitHub Repository',
      description: 'Source code, issues, and roadmap for pgRaft.',
      href: 'https://github.com/pgElephant/pgraft',
      icon: ExternalLink,
      external: true
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 dark:from-blue-500/10 dark:to-purple-500/10" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative rounded-2xl bg-white/80 dark:bg-slate-800/80 p-2 shadow-2xl ring-1 ring-gray-900/10 dark:ring-white/10">
                <div className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-white">
                  <Database className="h-6 w-6" />
                  <span className="text-lg font-semibold">pgRaft</span>
                </div>
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              PostgreSQL Raft Consensus Extension
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              Embed Raft consensus directly into PostgreSQL. Use these guides to deploy pgRaft, manage multi-node clusters,
              execute failovers safely, and monitor consensus health with SQL.</p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/docs/pgraft/getting-started"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-slate-800"
              >
                <BookOpen className="h-4 w-4" />
                Get Started
              </Link>
              <a
                href="https://github.com/pgElephant/pgraft"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:border-slate-400"
              >
                <ExternalLink className="h-4 w-4" />
                View on GitHub
              </a>
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
                <Icon className="h-6 w-6 text-blue-600" />
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="text-center text-2xl font-semibold text-slate-900 dark:text-white">Documentation Library</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {docSections.map((section) => (
              <div key={section.title} className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-900/60">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{section.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{section.description}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group flex items-center justify-between text-slate-700 hover:text-blue-600 dark:text-slate-200"
                      >
                        <span>{item.title}</span>
                        <ArrowRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
                      </Link>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
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
            {quickLinks.map(({ title, description, href, icon: Icon, external }) => {
              const Component = external ? 'a' : Link
              const props = external
                ? { href, target: '_blank', rel: 'noopener noreferrer' }
                : { href }

              return (
                <Component
                  key={href}
                  {...props}
                  className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:border-blue-300 dark:border-slate-700/60 dark:bg-slate-900/60"
                >
                  <Icon className="h-6 w-6 text-blue-600" />
                  <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600">
                    Learn more
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </span>
                </Component>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}