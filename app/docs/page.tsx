import React from 'react'
import { BookOpen, Download, ExternalLink, Shield, Cpu, Zap, Wrench, Network } from 'lucide-react'
import { NeurondBIcon, PgraftIcon, PgbalancerIcon, PgStatInsightsIcon, FauxDbIcon, PgSentinelIcon } from '../../components/ProductIcons'
import DocsHubLanding, { type HubProduct, type ResourceLink } from '../../components/DocsHubLanding'

const hero = {
  badgeLabel: 'Documentation Hub',
  badgeIcon: <BookOpen className="h-4 w-4 text-cyan-300" />, 
  title: 'Complete Documentation',
  description: 'Comprehensive guides, API references, and troubleshooting playbooks for every pgElephant product. Built by developers, for developers.',
  stats: [
    { label: 'Products', value: '6' },
    { label: 'Guides', value: '40+' },
    { label: 'Open Source', value: '100%' },
    { label: 'Updated', value: '24/7' },
  ],
}

  const products: HubProduct[] = [
    {
      id: 'neurondb',
    name: 'NeurondB',
    headline: 'PostgreSQL AI Vector Extension',
    summary:
      'Production-grade AI database extension for PostgreSQL with vector search, ONNX inference, hybrid retrieval, and RAG pipelines.',
    icon: <NeurondBIcon size={40} />, 
    theme: {
      gradient: 'from-indigo-900/60 via-purple-900/50 to-cyan-900/40',
      border: 'border-indigo-500/40',
      glow: 'shadow-indigo-900/40',
      iconBorder: 'border-indigo-500/50',
      accentText: 'text-indigo-200',
    },
    categories: [
      {
        key: 'getting-started',
        title: 'Getting Started',
        description: 'Initialize the extension, load sample data, and run first vector searches.',
        href: '/docs/neurondb/getting-started',
        icon: <BookOpen className="h-5 w-5" />, 
      },
      {
        key: 'installation',
        title: 'Installation',
        description: 'Platform-specific build and install instructions with GPU guidance.',
        href: '/docs/neurondb/installation',
        icon: <Download className="h-5 w-5" />, 
      },
      {
        key: 'configuration',
        title: 'Configuration',
        description: 'Tunable GUC parameters for search, inference, and background workers.',
        href: '/docs/neurondb/configuration',
        icon: <Cpu className="h-5 w-5" />, 
      },
      {
        key: 'troubleshooting',
        title: 'Troubleshooting',
        description: 'Fix build failures, GPU driver issues, and runtime load errors.',
        href: '/docs/neurondb/troubleshooting',
        icon: <Wrench className="h-5 w-5" />, 
      },
      {
        key: 'common-issues',
        title: 'Common Issues & Solutions',
        description: 'FAQ covering installation, configuration, and operational edge cases.',
        href: '/docs/neurondb/troubleshooting',
        icon: <Shield className="h-5 w-5" />, 
      },
    ],
    viewAllHref: '/docs/neurondb',
    },
    {
      id: 'pgraft',
    name: 'pgRaft',
    headline: 'PostgreSQL Raft Consensus Extension',
    summary:
      'Bring deterministic leader election, replication, and high availability into PostgreSQL clusters with embedded Raft workers.',
    icon: <PgraftIcon size={40} />, 
    theme: {
      gradient: 'from-blue-900/60 via-indigo-900/50 to-purple-900/40',
      border: 'border-blue-500/40',
      glow: 'shadow-blue-900/40',
      iconBorder: 'border-blue-500/50',
      accentText: 'text-blue-200',
    },
    categories: [
      {
        key: 'getting-started',
        title: 'Getting Started',
        description: 'Enable pgRaft, bootstrap metadata, and verify leader election.',
        href: '/docs/pgraft/getting-started',
        icon: <BookOpen className="h-5 w-5" />, 
      },
      {
        key: 'installation',
        title: 'Installation',
        description: 'Compile from source and deploy Raft workers on supported platforms.',
        href: '/docs/pgraft/installation',
        icon: <Download className="h-5 w-5" />, 
      },
      {
        key: 'configuration',
        title: 'Configuration',
        description: 'Tune postgresql.conf for Raft networking, timeouts, and storage.',
        href: '/docs/pgraft/configuration',
        icon: <Cpu className="h-5 w-5" />, 
      },
      {
        key: 'troubleshooting',
        title: 'Troubleshooting',
        description: 'Resolve election churn, replication lag, and snapshot backlog.',
        href: '/docs/pgraft/troubleshooting-guide',
        icon: <Wrench className="h-5 w-5" />, 
      },
      {
        key: 'common-issues',
        title: 'Common Issues & Solutions',
        description: 'Operator FAQ with recommended fixes for production incidents.',
        href: '/docs/pgraft/troubleshooting',
        icon: <Shield className="h-5 w-5" />, 
      },
    ],
    viewAllHref: '/docs/pgraft',
    },
    {
      id: 'pgbalancer',
    name: 'pgBalancer',
    headline: 'AI Load Balancer & Connection Pooler',
    summary:
      'Modern PostgreSQL proxy with machine learning routing, REST API controls, MQTT event streaming, and advanced pooling policies.',
    icon: <PgbalancerIcon size={40} />, 
    theme: {
      gradient: 'from-cyan-900/60 via-blue-900/50 to-purple-900/40',
      border: 'border-cyan-500/40',
      glow: 'shadow-cyan-900/40',
      iconBorder: 'border-cyan-500/50',
      accentText: 'text-cyan-200',
    },
    categories: [
      {
        key: 'getting-started',
        title: 'Getting Started',
        description: 'Launch pgBalancer, configure initial pools, and verify health.',
        href: '/docs/pgbalancer/getting-started',
        icon: <BookOpen className="h-5 w-5" />, 
      },
      {
        key: 'installation',
        title: 'Installation',
        description: 'Clone, compile, and install pgBalancer with autotools.',
        href: '/docs/pgbalancer/getting-started#build-and-install',
        icon: <Download className="h-5 w-5" />, 
      },
      {
        key: 'configuration',
        title: 'Configuration',
        description: 'Reference for .conf directives, authentication, and AI parameters.',
        href: '/docs/pgbalancer/configuration',
        icon: <Cpu className="h-5 w-5" />, 
      },
      {
        key: 'troubleshooting',
        title: 'Troubleshooting',
        description: 'Diagnose connection errors, failover issues, and routing anomalies.',
        href: '/docs/pgbalancer/troubleshooting-guide',
        icon: <Wrench className="h-5 w-5" />, 
      },
      {
        key: 'common-issues',
        title: 'Common Issues & Solutions',
        description: 'Operational FAQ covering TLS, pool sizing, and API errors.',
        href: '/docs/pgbalancer/troubleshooting-guide',
        icon: <Shield className="h-5 w-5" />, 
      },
    ],
    viewAllHref: '/docs/pgbalancer',
    },
    {
      id: 'pg_stat_insights',
      name: 'pg_stat_insights',
    headline: 'PostgreSQL Performance Analytics',
    summary:
      'Deep workload telemetry with 52 metrics across 11 curated views. Track slow queries, cache hit ratio, WAL pressure, and JIT behavior.',
    icon: <PgStatInsightsIcon size={40} />, 
    theme: {
      gradient: 'from-teal-900/60 via-cyan-900/50 to-blue-900/40',
      border: 'border-teal-500/40',
      glow: 'shadow-teal-900/40',
      iconBorder: 'border-teal-500/50',
      accentText: 'text-teal-200',
    },
    categories: [
      {
        key: 'getting-started',
        title: 'Getting Started',
        description: 'Enable pg_stat_insights and run first diagnostics in minutes.',
        href: '/docs/pg-stat-insights/getting-started',
        icon: <BookOpen className="h-5 w-5" />, 
      },
      {
        key: 'installation',
        title: 'Installation',
        description: 'Add package repositories or build from source for PostgreSQL 16–18.',
        href: '/docs/pg_stat_insights/overview',
        icon: <Download className="h-5 w-5" />, 
      },
      {
        key: 'configuration',
        title: 'Configuration',
        description: 'Tune pg_stat_insights GUCs for retention, histogram tracking, and memory budgets.',
        href: '/docs/pg_stat_insights/configuration',
        icon: <Cpu className="h-5 w-5" />, 
      },
      {
        key: 'troubleshooting',
        title: 'Troubleshooting',
        description: 'Identify missing metrics, preload errors, and query attribution gaps.',
        href: '/docs/pg_stat_insights/usage',
        icon: <Wrench className="h-5 w-5" />, 
      },
      {
        key: 'common-issues',
        title: 'Common Issues & Solutions',
        description: 'FAQ for extension conflicts, permissions, and high cardinality workloads.',
        href: '/docs/pg_stat_insights/best-practices',
        icon: <Shield className="h-5 w-5" />, 
      },
    ],
    viewAllHref: '/docs/pg_stat_insights',
    },
    {
      id: 'fauxdb',
      name: 'FauxDB',
    headline: 'Dual-Protocol Database Server',
    summary:
      'Single PostgreSQL-backed endpoint that speaks MongoDB and MySQL wire protocols. Built in Rust for hybrid document workloads.',
    icon: <FauxDbIcon size={40} />, 
    theme: {
      gradient: 'from-emerald-900/60 via-green-900/50 to-teal-900/40',
      border: 'border-emerald-500/40',
      glow: 'shadow-emerald-900/40',
      iconBorder: 'border-emerald-500/50',
      accentText: 'text-emerald-200',
    },
    categories: [
      {
        key: 'getting-started',
        title: 'Getting Started',
        description: 'Install FauxDB and configure dual protocol endpoints.',
        href: '/docs/fauxdb/getting-started',
        icon: <BookOpen className="h-5 w-5" />, 
      },
      {
        key: 'installation',
        title: 'Installation',
        description: 'Clone, build, and deploy FauxDB binaries or containers.',
        href: '/docs/fauxdb/getting-started#installation',
        icon: <Download className="h-5 w-5" />, 
      },
      {
        key: 'configuration',
        title: 'Configuration',
        description: 'Wire protocol configuration, authentication, and storage mapping.',
        href: '/docs/fauxdb/configuration',
        icon: <Cpu className="h-5 w-5" />, 
      },
      {
        key: 'troubleshooting',
        title: 'Troubleshooting',
        description: 'Resolve driver compatibility and query translation issues.',
        href: '/docs/fauxdb/troubleshooting',
        icon: <Wrench className="h-5 w-5" />, 
      },
      {
        key: 'common-issues',
        title: 'Common Issues & Solutions',
        description: 'FAQ for protocol mismatches, authentication errors, and performance tuning.',
        href: '/docs/fauxdb/troubleshooting',
        icon: <Shield className="h-5 w-5" />, 
      },
    ],
    viewAllHref: '/docs/fauxdb',
    },
    {
      id: 'pgsentinel',
      name: 'pgSentinel',
    headline: 'Monitoring & Management Platform',
    summary:
      'Web-based monitoring for pgBalancer with Grafana dashboards, Prometheus metrics, and multi-cluster health automation.',
    icon: <PgSentinelIcon size={40} />, 
    theme: {
      gradient: 'from-purple-900/60 via-indigo-900/50 to-blue-900/40',
      border: 'border-purple-500/40',
      glow: 'shadow-purple-900/40',
      iconBorder: 'border-purple-500/50',
      accentText: 'text-purple-200',
    },
    categories: [
      {
        key: 'getting-started',
        title: 'Getting Started',
        description: 'Install pgSentinel, add clusters, and explore the dashboard.',
        href: '/docs/pgsentinel/getting-started',
        icon: <BookOpen className="h-5 w-5" />, 
      },
      {
        key: 'installation',
        title: 'Installation',
        description: 'Container deployment, docker-compose, and manual install steps.',
        href: '/docs/pgsentinel/getting-started#installation',
        icon: <Download className="h-5 w-5" />, 
      },
      {
        key: 'configuration',
        title: 'Configuration',
        description: 'Configure agents, collectors, alerting rules, and SSO.',
        href: '/docs/pgsentinel/configuration',
        icon: <Cpu className="h-5 w-5" />, 
      },
      {
        key: 'troubleshooting',
        title: 'Troubleshooting',
        description: 'Resolve collector connectivity, metrics gaps, and login issues.',
        href: '/docs/pgsentinel/troubleshooting',
        icon: <Wrench className="h-5 w-5" />, 
      },
      {
        key: 'common-issues',
        title: 'Common Issues & Solutions',
        description: 'FAQ for dashboards, Prometheus scrapes, and alert noise.',
        href: '/docs/pgsentinel/troubleshooting',
        icon: <Shield className="h-5 w-5" />, 
      },
    ],
    viewAllHref: '/docs/pgsentinel',
  },
]

const resources: ResourceLink[] = [
  {
    title: 'GitHub',
    description: 'Browse source code, open issues, and contribution guidelines.',
    href: 'https://github.com/pgElephant',
    icon: <ExternalLink className="h-7 w-7" />, 
    external: true,
  },
  {
    title: 'Downloads',
    description: 'Get the latest binary releases, container images, and install scripts.',
    href: '/download',
    icon: <Download className="h-7 w-7" />, 
  },
  {
    title: 'Community',
    description: 'Join forums, discussions, and share best practices with peers.',
    href: '/community',
    icon: <Network className="h-7 w-7" />, 
  },
  {
    title: 'Support',
    description: 'Reach pgElephant support for enterprise SLAs or consulting.',
    href: '/contact',
    icon: <Shield className="h-7 w-7" />, 
  },
]

const DocsPage = () => {
  return <DocsHubLanding hero={hero} products={products} resources={resources} />
}

export default DocsPage
