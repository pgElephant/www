import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'ROCm Support | NeuronDB GPU Acceleration',
  description: 'AMD GPU acceleration for vector operations in NeuronDB.',
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'configuration', title: 'Configuration' },
  { id: 'gpu-operations', title: 'GPU Operations' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/gpu/cuda-support',
  label: 'CUDA Support',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/gpu/metal-support',
  label: 'Metal Support',
}

export default function ROCmSupportPage() {
  return (
    <PostgresDocsLayout
      title="ROCm Support"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>ROCm support enables AMD GPU acceleration for NeuronDB operations.</p>
      </section>

      <section id="configuration">
        <h2>Configuration</h2>
        <BashCodeBlock
          title="postgresql.conf"
          code={`shared_preload_libraries = 'neurondb'
neurondb.gpu_enabled = true
neurondb.gpu_backend = 'rocm'
neurondb.gpu_device = 0`}
        />
      </section>

      <section id="gpu-operations">
        <h2>GPU Operations</h2>
        <SqlCodeBlock
          title="GPU-accelerated operations"
          code={`-- GPU-accelerated operations
SELECT vector_l2_distance_gpu(embedding, query) AS distance
FROM documents;`}
        />
      </section>

      <section>
        <h2>Learn More</h2>
        <p>
          For detailed documentation on ROCm setup and AMD GPU configuration, visit:{' '}
          <a href="https://pgelephant.com/neurondb/gpu/" target="_blank" rel="noopener noreferrer">
            ROCm Support Documentation
          </a>
        </p>
      </section>

      <section>
        <h2>Related Topics</h2>
        <ul>
          <li><a href="/docs/neurondb/gpu/cuda-support">CUDA Support</a> - NVIDIA GPU support</li>
          <li><a href="/docs/neurondb/gpu/auto-detection">GPU Auto-Detection</a> - Automatic detection</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

