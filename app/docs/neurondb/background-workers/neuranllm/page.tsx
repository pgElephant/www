import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'neuranllm - LLM Job Processor | NeuronDB Background Workers',
  description: 'LLM job processing with crash recovery in NeuronDB.',
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'configuration', title: 'Configuration' },
  { id: 'llm-jobs', title: 'LLM Jobs' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/background-workers/neurandefrag',
  label: 'neurandefrag',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/gpu',
  label: 'GPU Acceleration',
}

export default function NeurAnllmPage() {
  return (
    <PostgresDocsLayout
      title="neuranllm - LLM Job Processor"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>neuranllm processes LLM-related jobs with automatic crash recovery.</p>
      </section>

      <section id="configuration">
        <h2>Configuration</h2>
        <BashCodeBlock
          title="postgresql.conf"
          code={`shared_preload_libraries = 'neurondb'
neurondb.neuranllm_enabled = true
neurondb_llm_provider = 'huggingface'
neurondb_llm_endpoint = 'https://api-inference.huggingface.co'
neurondb_llm_api_key = 'YOUR_KEY'`}
        />
      </section>

      <section id="llm-jobs">
        <h2>LLM Jobs</h2>
        <SqlCodeBlock
          title="Check LLM job status"
          code={`-- Check LLM job status
SELECT * FROM neurondb.llm_job_status;

-- View job queue
SELECT * FROM neurondb.llm_jobs WHERE status = 'pending';`}
        />
      </section>

      <section>
        <h2>Learn More</h2>
        <p>
          For detailed documentation on LLM job processing, crash recovery, and error handling, visit:{' '}
          <a href="https://pgelephant.com/neurondb/workers/neuranllm/" target="_blank" rel="noopener noreferrer">
            neuranllm Documentation
          </a>
        </p>
      </section>

      <section>
        <h2>Related Topics</h2>
        <ul>
          <li><a href="/docs/neurondb/background-workers">Background Workers</a> - Overview</li>
          <li><a href="/docs/neurondb/rag/llm-integration">LLM Integration</a> - LLM providers</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

