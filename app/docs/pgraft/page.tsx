import React from 'react'
import { BookOpen, Download, ExternalLink, Shield, Zap, Code } from 'lucide-react'
import ProductDocsLanding from '../../../components/ProductDocsLanding'
import { PgraftIcon } from '../../../components/ProductIcons'

export const metadata = {
  title: 'pgRaft Documentation | PostgreSQL Raft Consensus Extension',
  description:
    'Deploy, configure, and operate pgRaft to add Raft consensus, leader election, and high availability to PostgreSQL clusters. Guides for installation, configuration, cluster management, tuning, and diagnostics.'
}

export default function PgRaftDocsPage() {
  return (
    <ProductDocsLanding
      hero={{
        badgeLabel: 'pgRaft',
        badgeIcon: <PgraftIcon size={24} />,
        badgeGradient: 'from-blue-600 to-purple-600',
        title: 'PostgreSQL Raft Consensus Extension',
        description:
          'Embed Raft consensus directly into PostgreSQL. Use these guides to deploy pgRaft, manage multi-node clusters, execute failovers safely, and monitor consensus health with SQL.',
        ctas: [
          {
            label: 'Get Started',
            href: '/docs/pgraft/getting-started',
            icon: <BookOpen className="h-4 w-4" />,
            variant: 'primary'
          },
          {
            label: 'View on GitHub',
            href: 'https://github.com/pgElephant/pgraft',
            icon: <ExternalLink className="h-4 w-4" />,
            external: true,
            variant: 'secondary'
          }
        ]
      }}
      features={[
        {
          icon: () => <PgraftIcon size={24} />,
          title: 'Raft Consensus',
          description: 'Deterministic leader election, log replication, and commit guarantees implemented inside PostgreSQL.'
        },
        {
          icon: Shield,
          title: 'High Availability',
          description: 'Automatic failover, quorum enforcement, and rolling maintenance procedures for mission-critical deployments.'
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
      ]}
      docSections={[
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
      ]}
      quickLinks={[
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
      ]}
      theme={{
        featureIconClass: 'text-blue-600',
        linkHoverClass: 'hover:text-blue-600',
        quickLinkCardClass:
          'rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:border-blue-300 dark:border-slate-700/60 dark:bg-slate-900/60',
        quickLinkIconClass: 'text-blue-600',
        quickLinkHoverLabelClass: 'text-blue-600'
      }}
    />
  )
}