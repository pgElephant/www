import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem } from '../../../components/PostgresDocsLayout'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'FauxDB Documentation - Complete Guide | pgElephant',
  description:
    'Comprehensive FauxDB documentation covering installation, configuration, API reference, deployment, and best practices for MongoDB-compatible document database.',
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/fauxdb',
  },
}

const tableOfContents: TocItem[] = [
  { id: 'getting-started', title: 'Getting Started' },
  { id: 'installation', title: 'Installation' },
  { id: 'configuration', title: 'Configuration' },
  { id: 'api-reference', title: 'API Reference' },
  { id: 'docker', title: 'Docker' },
  { id: 'monitoring', title: 'Monitoring' },
  { id: 'production', title: 'Production' },
  { id: 'troubleshooting', title: 'Troubleshooting' },
]

export default function FauxDBDocsPage() {
  return (
    <PostgresDocsLayout
      title="FauxDB Documentation"
      version="FauxDB Documentation"
      tableOfContents={tableOfContents}
      showToc={true}
    >
      <p>
        Complete guide to MongoDB-compatible document database. Comprehensive documentation covering installation, configuration, API reference, deployment strategies, and best practices for FauxDB.
      </p>

      <section id="getting-started">
        <h2>Getting Started</h2>
        <p>Quick setup guide, installation instructions, and your first FauxDB application.</p>
        <ul>
          <li><Link href="/docs/fauxdb/getting-started">Getting Started Guide</Link> - Start here for your first FauxDB application</li>
        </ul>
      </section>

      <section id="installation">
        <h2>Installation</h2>
        <p>Install FauxDB on Linux, macOS, and Windows. Package managers, Docker, and source builds.</p>
        <ul>
          <li>Package managers (apt, yum, brew)</li>
          <li>Docker containers</li>
          <li>Source compilation</li>
          <li>System requirements</li>
        </ul>
      </section>

      <section id="configuration">
        <h2>Configuration</h2>
        <p>Complete configuration guide for production deployments and performance tuning.</p>
        <ul>
          <li><Link href="/docs/fauxdb/configuration">Configuration Guide</Link> - Configuration files, environment variables, performance tuning, and security settings</li>
        </ul>
      </section>

      <section id="api-reference">
        <h2>API Reference</h2>
        <p>Complete MongoDB API compatibility reference with examples and best practices.</p>
        <ul>
          <li><Link href="/docs/fauxdb/api">API Reference</Link> - CRUD operations, aggregation pipelines, index management, and transactions</li>
        </ul>
      </section>

      <section id="docker">
        <h2>Docker</h2>
        <p>Docker deployment guide with development, production, and monitoring setups.</p>
        <ul>
          <li><Link href="/docs/fauxdb/docker">Docker Setup Guide</Link> - Complete Docker deployment instructions</li>
        </ul>
      </section>

      <section id="monitoring">
        <h2>Monitoring</h2>
        <p>Comprehensive monitoring setup with Prometheus, Grafana, and alerting.</p>
        <ul>
          <li><Link href="/docs/fauxdb/monitoring">Monitoring Setup</Link> - Prometheus metrics, Grafana dashboards, health checks, and performance monitoring</li>
        </ul>
      </section>

      <section id="production">
        <h2>Production</h2>
        <p>Production deployment best practices, security, and high availability.</p>
        <ul>
          <li><Link href="/docs/fauxdb/production">Production Deployment</Link> - Security hardening, backup strategies, high availability, and performance optimization</li>
        </ul>
      </section>

      <section id="troubleshooting">
        <h2>Troubleshooting</h2>
        <p>Common issues, debugging techniques, and performance troubleshooting.</p>
        <ul>
          <li><Link href="/docs/fauxdb/troubleshooting">Troubleshooting Guide</Link> - Common issues, debug logging, performance issues, and error codes</li>
        </ul>
      </section>

      <section>
        <h2>Quick Links</h2>
        <div>
          <h3>Development</h3>
          <ul>
            <li><Link href="/docs/fauxdb/getting-started">Getting Started Guide</Link></li>
            <li><Link href="/docs/fauxdb/docker">Docker Development Setup</Link></li>
            <li><a href="https://github.com/pgElephant/fauxdb" target="_blank" rel="noopener noreferrer">
              GitHub Repository <ExternalLink className="inline w-3 h-3 ml-1" />
            </a></li>
          </ul>
        </div>
        <div>
          <h3>Production</h3>
          <ul>
            <li><Link href="/docs/fauxdb/production">Production Deployment</Link></li>
            <li><Link href="/docs/fauxdb/monitoring">Monitoring Setup</Link></li>
            <li><Link href="/docs/fauxdb/troubleshooting">Troubleshooting Guide</Link></li>
          </ul>
        </div>
      </section>

      <section>
        <h2>Need Help?</h2>
        <p>
          <Link href="/community">Community Support</Link> |{' '}
          <a href="https://github.com/pgElephant/fauxdb/issues" target="_blank" rel="noopener noreferrer">
            Report Issues <ExternalLink className="inline w-3 h-3 ml-1" />
          </a>
        </p>
      </section>
    </PostgresDocsLayout>
  )
}
