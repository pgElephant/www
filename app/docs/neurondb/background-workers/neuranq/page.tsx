import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'neuranq - Async Job Queue Executor | NeuronDB Background Workers',
  description: 'Async job queue executor with batch processing support in NeuronDB.',
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'configuration', title: 'Configuration' },
  { id: 'queue-jobs', title: 'Queue Jobs' },
  { id: 'monitor-queue', title: 'Monitor Queue' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/background-workers',
  label: 'Background Workers Overview',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/background-workers/neuranmon',
  label: 'neuranmon',
}

export default function NeurAnqPage() {
  return (
    <PostgresDocsLayout
      title="neuranq - Async Job Queue Executor"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>neuranq processes async jobs from the job queue with efficient batch processing.</p>
      </section>

      <section id="configuration">
        <h2>Configuration</h2>
        <p>Enable in <code>postgresql.conf</code>:</p>
        <BashCodeBlock
          title="postgresql.conf"
          code={`shared_preload_libraries = 'neurondb'
neurondb.neuranq_enabled = true
neurondb.neuranq_queue_depth = 10000
neurondb.neuranq_naptime = 1000  -- milliseconds`}
        />
      </section>

      <section id="queue-jobs">
        <h2>Queue Jobs</h2>
        <p>Add jobs to the queue:</p>
        <SqlCodeBlock
          title="Add job to queue"
          code={`-- Add job to queue
INSERT INTO neurondb.neurondb_job_queue (job_type, job_data)
VALUES ('embedding', '{"text": "Hello world"}'::jsonb);`}
        />
      </section>

      <section id="monitor-queue">
        <h2>Monitor Queue</h2>
        <SqlCodeBlock
          title="Check queue status"
          code={`-- Check queue status
SELECT * FROM neurondb.neurondb_job_queue WHERE status = 'pending';

-- Queue statistics
SELECT status, COUNT(*) FROM neurondb.neurondb_job_queue GROUP BY status;`}
        />
      </section>

      <section>
        <h2>Learn More</h2>
        <p>
          For detailed documentation on job queue management, batch processing, error handling, and performance tuning, visit:{' '}
          <a href="https://pgelephant.com/neurondb/workers/neuranq/" target="_blank" rel="noopener noreferrer">
            neuranq Documentation
          </a>
        </p>
      </section>

      <section>
        <h2>Related Topics</h2>
        <ul>
          <li><a href="/docs/neurondb/background-workers">Background Workers</a> - Overview</li>
          <li><a href="/docs/neurondb/background-workers/neuranmon">neuranmon</a> - Auto-tuner worker</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

