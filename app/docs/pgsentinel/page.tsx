import React from 'react'
import { Metadata } from 'next'
import { BookOpen, Monitor, Shield } from 'lucide-react'
import ProductDocsLanding from '../../../components/ProductDocsLanding'
import { PgSentinelIcon } from '../../../components/ProductIcons'

export const metadata: Metadata = {
  title: 'pgSentinel Documentation | pgbouncer Monitoring & Management',
  description:
    'Install, configure, and operate pgSentinel for real-time pgBouncer monitoring, alerting, and analytics. Explore setup guides, metrics, and Grafana integration.',
}

const PgSentinelDocsPage = () => {
  return (
    <ProductDocsLanding
      hero={{
        badgeLabel: 'pgSentinel',
        badgeIcon: <PgSentinelIcon size={24} />, 
        badgeGradient: 'from-slate-700 to-slate-600',
        title: 'pgBouncer Observability Platform',
        description:
          'pgSentinel delivers dashboards, alerting, and analytics for pgBouncer. Build always-on observability with Prometheus, Grafana, and pg_stat_insights integrations.',
        ctas: [
          {
            label: 'Get Started',
            href: '/docs/pgsentinel/getting-started',
            icon: <BookOpen className="h-4 w-4" />, 
            variant: 'primary',
          },
          {
            label: 'View Dashboards',
            href: '/docs/pgsentinel/dashboard',
            icon: <Monitor className="h-4 w-4" />, 
            variant: 'secondary',
          },
        ],
      }}
      features={[
        {
          icon: () => <PgSentinelIcon size={24} />, 
          title: 'Real-Time Monitoring',
          description: 'Collect granular metrics for pools, databases, and clients. Visualise saturation, latency, and wait reasons at a glance.',
        },
        {
          icon: () => <Shield className="h-6 w-6 text-emerald-400" />,
          title: 'Alerting & Automation',
          description: 'Hook into Prometheus Alertmanager, send Slack notifications, and automate remediation with pgSentinel API hooks.',
        },
        {
          icon: () => <Monitor className="h-6 w-6 text-teal-400" />,
          title: 'Grafana Dashboards',
          description: 'Deploy pre-built Grafana dashboards that correlate pgBouncer, PostgreSQL, and infrastructure metrics.',
        },
      ]}
      docSections={[
        {
          title: 'Overview & Setup',
          description: 'Install pgSentinel, connect to pgBouncer, and configure Prometheus scraping.',
          items: [
            {
              title: 'Getting Started',
              href: '/docs/pgsentinel/getting-started',
              description: 'Launch the container or Helm chart and verify baseline metrics.'
            },
            {
              title: 'Configuration',
              href: '/docs/pgsentinel/configuration',
              description: 'Set environment variables, secure credentials, and enable alert integrations.'
            },
            {
              title: 'Metrics Catalog',
              href: '/docs/pgsentinel/metrics',
              description: 'Review all Prometheus metrics emitted by pgSentinel.'
            },
          ],
        },
        {
          title: 'Dashboards & API',
          description: 'Operate the web UI, customise charts, and integrate with automation.',
          items: [
            {
              title: 'Dashboard Tour',
              href: '/docs/pgsentinel/dashboard',
              description: 'Explore the live dashboards, filters, and alert configuration.'
            },
            {
              title: 'REST API',
              href: '/docs/pgsentinel/api',
              description: 'Automate pool management, retrieve metrics, and manage alerts programmatically.'
            },
            {
              title: 'Grafana Integration',
              href: '/docs/pgsentinel/grafana',
              description: 'Provision Prometheus data sources and import the official dashboard.'
            },
          ],
        },
        {
          title: 'Operations & Recovery',
          description: 'Troubleshoot deployments and keep pgSentinel aligned with pgBouncer upgrades.',
          items: [
            {
              title: 'Troubleshooting',
              href: '/docs/pgsentinel/troubleshooting',
              description: 'Resolve connectivity issues, missing metrics, and alert delivery failures.'
            },
          ],
        },
      ]}
      quickLinks={[
        {
          title: 'Getting Started Guide',
          description: 'Deploy pgSentinel and connect to pgBouncer in minutes.',
          href: '/docs/pgsentinel/getting-started',
          icon: BookOpen,
        },
        {
          title: 'Configuration Reference',
          description: 'Full list of environment variables and security best practices.',
          href: '/docs/pgsentinel/configuration',
          icon: Shield,
        },
        {
          title: 'Dashboard Deep Dive',
          description: 'Understand every panel and alert in the pgSentinel UI.',
          href: '/docs/pgsentinel/dashboard',
          icon: Monitor,
        },
      ]}
    />
  )
}

export default PgSentinelDocsPage
