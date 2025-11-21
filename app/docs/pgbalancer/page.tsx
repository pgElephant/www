import React from 'react'
import { BookOpen, Code, ExternalLink, Play, Activity, Cpu, Network } from 'lucide-react'
import ProductDocsLanding from '../../../components/ProductDocsLanding'
import { PgbalancerIcon } from '../../../components/ProductIcons'

export const metadata = {
  title: 'pgBalancer - PostgreSQL AI Load Balancer & Connection Pooler | Official Documentation',
  description: 'pgBalancer is an AI-powered PostgreSQL connection pooler with intelligent load balancing, REST API management, and MQTT event streaming. Modern fork of pgpool-II with machine learning algorithms for optimal query routing.',
  keywords: [
    'pgBalancer',
    'PostgreSQL load balancer',
    'connection pooler',
    'AI load balancing',
    'PostgreSQL cluster',
    'query routing',
    'REST API',
    'MQTT streaming',
    'pgpool-II',
    'database proxy',
    'connection pooling PostgreSQL',
    'intelligent routing',
    'machine learning database',
    'PostgreSQL high availability',
    'database load balancing'
  ],
  openGraph: {
    title: 'pgBalancer - PostgreSQL AI Load Balancer & Connection Pooler',
    description: 'AI-powered PostgreSQL connection pooler with intelligent load balancing, REST API management, and real-time monitoring. Modern alternative to pgpool-II.',
    type: 'website',
    url: 'https://www.pgelephant.com/docs/pgbalancer'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'pgBalancer - PostgreSQL AI Load Balancer',
    description: 'Intelligent PostgreSQL connection pooling with AI-based load balancing and REST API management.'
  },
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/pgbalancer'
  }
}

export default function Page() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'pgBalancer',
    applicationCategory: 'DatabaseApplication',
    operatingSystem: 'Linux, macOS, Windows',
    description:
      'AI-powered PostgreSQL connection pooler with intelligent load balancing, REST API management, and MQTT event streaming. Modern fork of pgpool-II with machine learning algorithms.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      ratingCount: '180'
    },
    softwareRequirements: 'PostgreSQL 13+',
    releaseNotes: 'https://www.pgelephant.com/docs/pgbalancer/getting-started',
    installUrl: 'https://www.pgelephant.com/docs/pgbalancer/getting-started',
    keywords: 'PostgreSQL, load balancer, connection pooler, AI routing, REST API, MQTT, pgpool-II',
    author: {
      '@type': 'Organization',
      name: 'pgEdge',
      url: 'https://www.pgelephant.com'
    },
    creator: {
      '@type': 'Organization',
      name: 'pgEdge',
      url: 'https://www.pgelephant.com'
    }
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ProductDocsLanding
        hero={{
          badgeLabel: 'pgBalancer',
          badgeIcon: <PgbalancerIcon size={24} />,
          badgeGradient: 'from-blue-600 to-purple-600',
          title: 'PostgreSQL AI Load Balancer',
          description:
            'Modern connection pooler with AI-powered load balancing, REST API management, and MQTT event streaming. Intelligent query routing uses machine learning to keep PostgreSQL clusters responsive under any workload.',
          ctas: [
            {
              label: 'Get Started',
              href: '/docs/pgbalancer/getting-started',
              icon: <BookOpen className="h-4 w-4" />,
              variant: 'primary'
            },
            {
              label: 'View on GitHub',
              href: 'https://github.com/pgElephant/pgBalancer',
              icon: <ExternalLink className="h-4 w-4" />,
              external: true,
              variant: 'secondary'
            }
          ]
        }}
        features={[
          {
            icon: Cpu,
            title: 'AI Load Balancing',
            description: 'Machine learning algorithms analyze query patterns and server health for optimal routing.'
          },
          {
            icon: Network,
            title: 'REST API Management',
            description: '17 HTTP/JSON endpoints for cluster orchestration, health checks, and automation.'
          },
          {
            icon: () => <PgbalancerIcon size={24} />,
            title: 'Connection Pooling',
            description: 'Session, transaction, and statement pooling with configurable health checks.'
          },
          {
            icon: Activity,
            title: 'MQTT Event Streaming',
            description: 'Push real-time status, failover, and metric events to observability pipelines.'
          }
        ]}
        docSections={[
          {
            title: 'Getting Started',
            description: 'Installation, quick start, and baseline configuration for pgBalancer.',
            items: [
              { title: 'Installation Guide', href: '/docs/pgbalancer/getting-started', description: 'Build and install pgBalancer on popular platforms.' },
              { title: 'Quick Start', href: '/docs/pgbalancer/getting-started#quick-start', description: 'Launch with sample pools and verify routing in minutes.' },
              { title: 'Configuration', href: '/docs/pgbalancer/configuration', description: 'Tune core parameters, authentication, and pool definitions.' }
            ]
          },
          {
            title: 'Core Features',
            description: 'Load balancing, pooling, and high availability capabilities.',
            items: [
              { title: 'AI Load Balancing', href: '/docs/pgbalancer/load-balancing', description: 'Explore machine learning routing strategies and tuning knobs.' },
              { title: 'Connection Pooling', href: '/docs/pgbalancer/connection-pooling', description: 'Session lifecycle management, health checks, and scaling tips.' },
              { title: 'High Availability', href: '/docs/pgbalancer/high-availability', description: 'Failover policies, watchdog integration, and redundancy patterns.' }
            ]
          },
          {
            title: 'Management & Monitoring',
            description: 'Operational tooling, APIs, and observability integrations.',
            items: [
              { title: 'REST API', href: '/docs/pgbalancer/rest-api', description: 'Automate operations with structured API calls and examples.' },
              { title: 'CLI Management (bctl)', href: '/docs/pgbalancer/cli-management', description: 'Complete command-line reference for day-two operations.' },
              { title: 'Metrics & Monitoring', href: '/docs/pgbalancer/metrics', description: 'Expose metrics, dashboards, and alert strategies.' }
            ]
          },
          {
            title: 'Advanced Topics',
            description: 'Architecture fundamentals, troubleshooting, and internals.',
            items: [
              { title: 'Architecture & Internals', href: '/docs/pgbalancer/internals', description: 'Worker lifecycle, routing pipeline, and AI model updates.' },
              { title: 'Monitoring Integration', href: '/docs/pgbalancer/monitoring', description: 'Integrate with Prometheus, Grafana, and external APM tools.' }
            ]
          }
        ]}
        quickLinks={[
          {
            title: 'Getting Started',
            description: 'Install and configure pgBalancer in five minutes.',
            href: '/docs/pgbalancer/getting-started',
            icon: BookOpen
          },
          {
            title: 'REST API Reference',
            description: 'Browse all endpoints, payloads, and response schemas.',
            href: '/docs/pgbalancer/rest-api',
            icon: Code
          },
          {
            title: 'GitHub Repository',
            description: 'Read source, open issues, and follow the roadmap.',
            href: 'https://github.com/pgElephant/pgBalancer',
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
      <section className="pb-16 pt-6">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Ready to Get Started?</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Follow the guided installation to deploy pgBalancer, then star the project to receive release updates and roadmap news.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-blue-700 hover:to-purple-700"
              href="/docs/pgbalancer/getting-started"
            >
              Start Installation
              <Play className="h-4 w-4" />
            </a>
            <a
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-400 dark:border-slate-600 dark:text-slate-200"
              href="https://github.com/pgElephant/pgBalancer"
              target="_blank"
              rel="noopener noreferrer"
            >
              Star on GitHub
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
