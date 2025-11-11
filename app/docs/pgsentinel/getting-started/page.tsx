import React from 'react'
import { Metadata } from 'next'
import GettingStartedLayout from '../../../../components/GettingStartedLayout'
import BashCodeBlock from '../../../../components/BashCodeBlock'
import SqlCodeBlock from '../../../../components/SqlCodeBlock'
import { PgSentinelIcon } from '../../../../components/ProductIcons'

export const metadata: Metadata = {
  title: 'pgSentinel Getting Started - Quick Setup Guide',
  description:
    'Install pgSentinel, connect to pgBouncer, and ship metrics to Prometheus/Grafana in minutes.',
}

const PgSentinelGettingStartedPage = () => {
  return (
    <GettingStartedLayout
      product="pgSentinel"
      hero={{
        label: 'pgSentinel',
        labelIcon: <PgSentinelIcon size={20} />, 
        labelAccent: 'emerald',
        title: 'Deploy pgSentinel in 3 Steps',
        description:
          'Spin up pgSentinel with Docker, connect to pgBouncer, and start visualising pool metrics using the built-in dashboards.',
        cta: {
          href: '/docs/pgsentinel/dashboard',
          label: 'Explore dashboards',
        },
      }}
      theme={{
        pageBackground: 'bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-950',
        heroOverlay: 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 dark:from-emerald-500/10 dark:to-teal-500/10',
        requirementsBorder: 'emerald',
        requirementsBackground: 'bg-white/90 dark:bg-slate-900/70',
      }}
      requirements={{
        title: 'Prerequisites',
        items: [
          'pgBouncer 1.18+ with admin console enabled',
          'PostgreSQL 14+ for metrics storage (optional external DB)',
          'Docker or Kubernetes runtime for container deployment',
          'Prometheus (optional) for long-term metric retention',
        ],
      }}
      sections={[
        {
          title: 'Step 1 · Launch pgSentinel',
          description: 'Run the official container image or helm chart.',
          cards: [
            {
              id: 'docker',
              title: 'Docker compose',
              accent: 'emerald',
              content: (
                <BashCodeBlock
                  title="docker-compose.yml"
                  code={`version: '3.9'
services:
  pgsentinel:
    image: ghcr.io/pgelephant/pgsentinel:latest
    ports:
      - '8080:8080'
    environment:
      - PGSENTINEL_PGBOUNCER_DSN=postgres://admin:secret@pgbouncer:6432/pgbouncer
      - PGSENTINEL_STORAGE_DSN=postgres://pgsentinel:pass@postgres:5432/pgsentinel
      - PGSENTINEL_PROMETHEUS_EXPORT=true`}
                />
              ),
            },
            {
              id: 'kubernetes',
              title: 'Kubernetes (Helm)',
              accent: 'emerald',
              content: (
                <BashCodeBlock
                  title="Install chart"
                  code={`helm repo add pgelephant https://charts.pgelephant.com
helm install pgsentinel pgelephant/pgsentinel \
  --set pgbouncer.dsn=postgres://admin:secret@pgbouncer:6432/pgbouncer \
  --set storage.dsn=postgres://pgsentinel:pass@postgres:5432/pgsentinel`}
                />
              ),
            },
          ],
        },
        {
          title: 'Step 2 · Connect to pgBouncer & PostgreSQL',
          description: 'Provide connection strings for pgBouncer admin console and the metrics store.',
          cards: [
            {
              id: 'pgbouncer',
              title: 'pgBouncer credentials',
              accent: 'emerald',
              content: (
                <BashCodeBlock
                  title="pgbouncer.ini"
                  code={`[pgbouncer]
listen_port = 6432
admin_users = admin
stats_users = admin

[databases]
pgbouncer = host=postgres port=5432 dbname=pgbouncer user=admin password=secret`}
                />
              ),
            },
            {
              id: 'metrics-db',
              title: 'Metrics schema',
              accent: 'emerald',
              content: (
                <SqlCodeBlock
                  title="Create pgSentinel role"
                  code={`CREATE ROLE pgsentinel WITH LOGIN PASSWORD 'pass';
CREATE DATABASE pgsentinel OWNER pgsentinel;
GRANT ALL PRIVILEGES ON DATABASE pgsentinel TO pgsentinel;`}
                />
              ),
            },
          ],
        },
        {
          title: 'Step 3 · Enable Prometheus/Grafana',
          description: 'Expose metrics via /metrics and import the starter Grafana dashboard.',
          cards: [
            {
              id: 'prometheus',
              title: 'Prometheus scrape config',
              accent: 'emerald',
              content: (
                <BashCodeBlock
                  title="prometheus.yml"
                  code={`scrape_configs:
  - job_name: 'pgsentinel'
    static_configs:
      - targets: ['pgsentinel:8080']`}
                />
              ),
            },
            {
              id: 'grafana-import',
              title: 'Grafana import',
              accent: 'emerald',
              content: (
                <BashCodeBlock
                  title="Dashboard provisioning"
                  code={`curl -L https://raw.githubusercontent.com/pgElephant/pgsentinel/main/grafana/pgsentinel.json \
  -o /var/lib/grafana/dashboards/pgsentinel.json`}
                />
              ),
            },
          ],
        },
      ]}
      nextSteps={[
        {
          title: 'Configuration reference',
          href: '/docs/pgsentinel/configuration',
          description: 'Tweak retention, authentication, and alert routing.',
        },
        {
          title: 'Metrics catalog',
          href: '/docs/pgsentinel/metrics',
          description: 'Understand every pgSentinel metric for dashboards and alerts.',
        },
        {
          title: 'REST API',
          href: '/docs/pgsentinel/api',
          description: 'Automate pool actions and integrate with runbooks.',
        },
      ]}
      supportLinks={[
        {
          label: 'GitHub Discussions',
          description: 'Community Q&A and troubleshooting tips.',
          href: 'https://github.com/pgElephant/pgsentinel/discussions',
          external: true,
        },
        {
          label: 'Support Email',
          description: 'Contact pgElephant support with logs and environment details.',
          href: 'mailto:support@pgelephant.com',
          external: true,
        },
      ]}
    />
  )
}

export default PgSentinelGettingStartedPage
