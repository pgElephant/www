import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Monitoring | NeuronDB Performance',
  description: '7 built-in monitoring views and Prometheus metrics export in NeuronDB.',
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'monitoring-views', title: 'Monitoring Views' },
  { id: 'extension-statistics', title: 'Extension Statistics' },
  { id: 'prometheus-export', title: 'Prometheus Export' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/performance/simd-optimization',
  label: 'SIMD Optimization',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/security',
  label: 'Security',
}

export default function MonitoringPage() {
  return (
    <PostgresDocsLayout
      title="Monitoring"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>7 built-in monitoring views and Prometheus metrics export.</p>
      </section>

      <section id="monitoring-views">
        <h2>Monitoring Views</h2>
        <p>NeuronDB provides comprehensive monitoring views:</p>
        <SqlCodeBlock
          title="Monitoring views"
          code={`-- Vector statistics
SELECT * FROM neurondb.vector_stats;

-- Index health dashboard
SELECT * FROM neurondb.index_health;

-- Tenant quota usage
SELECT * FROM neurondb.tenant_quota_usage;

-- LLM job queue status
SELECT * FROM neurondb.llm_job_status;

-- Query performance metrics (last 24h)
SELECT * FROM neurondb.query_performance;

-- Index maintenance operations
SELECT * FROM neurondb.index_maintenance_status;

-- Prometheus metrics summary
SELECT * FROM neurondb.metrics_summary;`}
        />
      </section>

      <section id="extension-statistics">
        <h2>Extension Statistics</h2>
        <SqlCodeBlock
          title="Extension statistics"
          code={`-- Extension statistics
SELECT * FROM pg_stat_neurondb();

-- Worker status
SELECT * FROM neurondb_worker_status();`}
        />
      </section>

      <section id="prometheus-export">
        <h2>Prometheus Export</h2>
        <p>Prometheus metrics are available for external monitoring.</p>
      </section>

      <section>
        <h2>Learn More</h2>
        <p>
          For detailed documentation on monitoring, metrics interpretation, and alerting, visit:{' '}
          <a href="https://www.pgelephant.com/docs/neurondb/performance/monitoring" target="_blank" rel="noopener noreferrer">
            Monitoring Documentation
          </a>
        </p>
      </section>

      <section>
        <h2>Related Topics</h2>
        <ul>
          <li><a href="/docs/neurondb/performance/simd-optimization">SIMD Optimization</a> - Performance optimization</li>
          <li><a href="/docs/neurondb/configuration">Configuration</a> - Configuration options</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

