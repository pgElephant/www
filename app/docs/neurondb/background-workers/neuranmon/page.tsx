import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'neuranmon - Live Query Auto-Tuner | NeuronDB Background Workers',
  description: 'Live query auto-tuner and performance optimization in NeuronDB.',
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'configuration', title: 'Configuration' },
  { id: 'monitor-performance', title: 'Monitor Performance' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/background-workers/neuranq',
  label: 'neuranq',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/background-workers/neurandefrag',
  label: 'neurandefrag',
}

export default function NeurAnmonPage() {
  return (
    <PostgresDocsLayout
      title="neuranmon - Live Query Auto-Tuner"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>neuranmon monitors query performance and automatically tunes parameters for optimal performance.</p>
      </section>

      <section id="configuration">
        <h2>Configuration</h2>
        <BashCodeBlock
          title="postgresql.conf"
          code={`shared_preload_libraries = 'neurondb'
neurondb.neuranmon_enabled = true
neurondb.neuranmon_interval = 60  -- seconds`}
        />
      </section>

      <section id="monitor-performance">
        <h2>Monitor Performance</h2>
        <SqlCodeBlock
          title="View auto-tuning statistics"
          code={`-- View auto-tuning statistics
SELECT * FROM neurondb.query_performance;

-- Get tuning recommendations
SELECT * FROM neurondb.tuning_recommendations;`}
        />
      </section>

      <section>
        <h2>Learn More</h2>
        <p>
          For detailed documentation on query auto-tuning, performance optimization, and monitoring, visit:{' '}
          <a href="https://pgelephant.com/neurondb/workers/neuranmon/" target="_blank" rel="noopener noreferrer">
            neuranmon Documentation
          </a>
        </p>
      </section>

      <section>
        <h2>Related Topics</h2>
        <ul>
          <li><a href="/docs/neurondb/background-workers">Background Workers</a> - Overview</li>
          <li><a href="/docs/neurondb/performance/monitoring">Monitoring</a> - Performance monitoring</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

