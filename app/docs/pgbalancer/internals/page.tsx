import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../components/PostgresDocsLayout'

export const metadata: Metadata = {
  title: 'pgbalancer Architecture & Internals',
  description: 'Learn about pgbalancer internals and architecture.',
}

const tableOfContents: TocItem[] = [
  { id: 'core-architecture', title: 'Core Architecture' },
  { id: 'worker-lifecycle', title: 'Worker Lifecycle' },
  { id: 'technical-details', title: 'Technical Details' },
]

const prevLink: NavLink = {
  href: '/docs/pgbalancer/monitoring',
  label: 'Monitoring & Metrics',
}

const nextLink: NavLink = {
  href: '/docs/pgbalancer/troubleshooting-guide',
  label: 'Troubleshooting Guide',
}

export default function PgBalancerInternalsDocs() {
  return (
    <PostgresDocsLayout
      title="Architecture & Internals"
      version="pgBalancer Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="core-architecture">
        <h2>Core Architecture</h2>
        <p>
          pgbalancer is built for performance and reliability with a modern, scalable architecture:
        </p>
        <ul className="space-y-3">
          <li>• Written in C with PostgreSQL integration for optimal performance</li>
          <li>• Event-driven, non-blocking I/O with epoll/kqueue support</li>
          <li>• Modular design with pluggable components for pooling, routing, and metrics</li>
          <li>• Cloud-native architecture designed for container and Kubernetes environments</li>
        </ul>
      </section>

      <section id="worker-lifecycle">
        <h2>Worker Lifecycle</h2>
        <p>pgbalancer uses a multi-process architecture with specialized workers:</p>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3>Main Process</h3>
            <ul className="space-y-2 text-sm">
              <li>• Configuration loading and validation</li>
              <li>• Worker process management</li>
              <li>• Signal handling and graceful shutdown</li>
              <li>• Health monitoring and restart logic</li>
            </ul>
          </div>
          <div>
            <h3>Worker Processes</h3>
            <ul className="space-y-2 text-sm">
              <li>• Client connection handling</li>
              <li>• Backend connection pooling</li>
              <li>• Query routing and load balancing</li>
              <li>• Health checks and failover</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="technical-details">
        <h2>Technical Details</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3>Connection Pooling</h3>
            <p className="text-sm">Intelligent connection management with automatic scaling and health monitoring.</p>
          </div>
          <div>
            <h3>Load Balancing</h3>
            <p className="text-sm">Multiple algorithms including round-robin, least connections, and weighted distribution.</p>
          </div>
          <div>
            <h3>Monitoring</h3>
            <p className="text-sm">Built-in metrics collection with Prometheus integration and REST API endpoints.</p>
          </div>
        </div>
        <p className="mt-6">
          See the <a href="/docs/pgbalancer/configuration" className="text-blue-400 hover:text-blue-300 underline">Configuration</a> page for configuration options and setup details.
        </p>
      </section>
    </PostgresDocsLayout>
  )
}
