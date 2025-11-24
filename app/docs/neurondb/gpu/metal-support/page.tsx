import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'Metal Support | NeuronDB GPU Acceleration',
  description: 'Apple Silicon GPU acceleration for NeuronDB on macOS.',
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'configuration', title: 'Configuration' },
  { id: 'gpu-operations', title: 'GPU Operations' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/gpu/rocm-support',
  label: 'ROCm Support',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/gpu/auto-detection',
  label: 'GPU Auto-Detection',
}

export default function MetalSupportPage() {
  return (
    <PostgresDocsLayout
      title="Metal Support"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>Metal support enables GPU acceleration on Apple Silicon (M1, M2, M3) Macs.</p>
      </section>

      <section id="configuration">
        <h2>Configuration</h2>
        <BashCodeBlock
          title="postgresql.conf"
          code={`shared_preload_libraries = 'neurondb'
neurondb.gpu_enabled = true
neurondb.gpu_backend = 'metal'`}
        />
      </section>

      <section id="gpu-operations">
        <h2>GPU Operations</h2>
        <SqlCodeBlock
          title="Metal-accelerated vector operations"
          code={`-- Metal-accelerated vector operations
SELECT vector_l2_distance_gpu(embedding, query) AS distance
FROM documents;`}
        />
      </section>

      <section>
        <h2>Learn More</h2>
        <p>
          For detailed documentation on Metal setup and Apple Silicon optimization, visit:{' '}
          <a href="https://pgelephant.com/neurondb/gpu/" target="_blank" rel="noopener noreferrer">
            Metal Support Documentation
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

