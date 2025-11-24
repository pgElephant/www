import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'GPU Auto-Detection | NeuronDB GPU Acceleration',
  description: 'Automatic GPU detection and fallback to CPU in NeuronDB.',
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'automatic-detection', title: 'Automatic Detection' },
  { id: 'fallback-behavior', title: 'Fallback Behavior' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/gpu/metal-support',
  label: 'Metal Support',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/performance',
  label: 'Performance',
}

export default function GPUAutoDetectionPage() {
  return (
    <PostgresDocsLayout
      title="GPU Auto-Detection"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>NeuronDB automatically detects available GPUs and falls back to CPU if GPU is unavailable.</p>
      </section>

      <section id="automatic-detection">
        <h2>Automatic Detection</h2>
        <SqlCodeBlock
          title="Check GPU status"
          code={`-- Check GPU status
SELECT neurondb_gpu_info();

-- Enable auto-detection (default)
SET neurondb.gpu_enabled = true;
SET neurondb.gpu_auto_detect = true;`}
        />
      </section>

      <section id="fallback-behavior">
        <h2>Fallback Behavior</h2>
        <p>When GPU is unavailable, operations automatically fall back to CPU:</p>
        <SqlCodeBlock
          title="Automatic fallback"
          code={`-- Will use GPU if available, CPU otherwise
SELECT vector_l2_distance_gpu(embedding, query) AS distance
FROM documents;`}
        />
      </section>

      <section>
        <h2>Learn More</h2>
        <p>
          For detailed documentation on GPU auto-detection, fallback behavior, and manual configuration, visit:{' '}
          <a href="https://www.pgelephant.com/docs/neurondb/gpu" target="_blank" rel="noopener noreferrer">
            GPU Auto-Detection Documentation
          </a>
        </p>
      </section>

      <section>
        <h2>Related Topics</h2>
        <ul>
          <li><a href="/docs/neurondb/gpu/cuda-support">CUDA Support</a> - NVIDIA GPU</li>
          <li><a href="/docs/neurondb/gpu/rocm-support">ROCm Support</a> - AMD GPU</li>
          <li><a href="/docs/neurondb/gpu/metal-support">Metal Support</a> - Apple Silicon</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

