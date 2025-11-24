import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'neurandefrag - Index Maintenance | NeuronDB Background Workers',
  description: 'Automatic index maintenance and defragmentation in NeuronDB.',
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'configuration', title: 'Configuration' },
  { id: 'index-maintenance', title: 'Index Maintenance' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/background-workers/neuranmon',
  label: 'neuranmon',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/background-workers/neuranllm',
  label: 'neuranllm',
}

export default function NeurAndefragPage() {
  return (
    <PostgresDocsLayout
      title="neurandefrag - Index Maintenance"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>neurandefrag automatically maintains and optimizes vector indexes.</p>
      </section>

      <section id="configuration">
        <h2>Configuration</h2>
        <BashCodeBlock
          title="postgresql.conf"
          code={`shared_preload_libraries = 'neurondb'
neurondb.neurandefrag_enabled = true
neurondb.neurandefrag_interval = 3600  -- seconds`}
        />
      </section>

      <section id="index-maintenance">
        <h2>Index Maintenance</h2>
        <SqlCodeBlock
          title="Check index health"
          code={`-- Check index health
SELECT * FROM neurondb.index_health;

-- View maintenance status
SELECT * FROM neurondb.index_maintenance_status;`}
        />
      </section>

      <section>
        <h2>Learn More</h2>
        <p>
          For detailed documentation on index maintenance, defragmentation strategies, and performance optimization, visit:{' '}
          <a href="https://pgelephant.com/neurondb/workers/neurandefrag/" target="_blank" rel="noopener noreferrer">
            neurandefrag Documentation
          </a>
        </p>
      </section>

      <section>
        <h2>Related Topics</h2>
        <ul>
          <li><a href="/docs/neurondb/background-workers">Background Workers</a> - Overview</li>
          <li><a href="/docs/neurondb/indexing">Indexing</a> - Index creation</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

