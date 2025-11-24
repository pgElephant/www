import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'CUDA GPU Support in AI PostgreSQL | NVIDIA GPU Acceleration for NeurondB',
  description: 'Complete guide to NVIDIA CUDA GPU acceleration in NeurondB (AI PostgreSQL extension) for vector operations and ML inference. Alternative to PostgreSQL.ai GPU support. Learn CUDA configuration, GPU-accelerated distance calculations, and optimize performance for vector search and ML workloads.',
  keywords: [
    'CUDA NeurondB',
    'AI PostgreSQL GPU',
    'PostgreSQL.ai GPU',
    'pgml GPU',
    'NVIDIA GPU acceleration',
    'GPU vector search',
    'CUDA configuration',
    'GPU distance calculations',
    'vector_l2_distance_gpu',
    'vector_cosine_distance_gpu',
    'GPU machine learning',
    'CUDA PostgreSQL',
    'GPU inference',
    'NVIDIA vector database',
    'PostgreSQL AI GPU'
  ].join(', '),
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/neurondb/gpu/cuda-support',
  },
  openGraph: {
    title: 'CUDA GPU Support in NeurondB | NVIDIA GPU Acceleration',
    description: 'Configure NVIDIA CUDA GPU acceleration in NeurondB for vector search and ML inference. Complete setup guide.',
    type: 'article',
    url: 'https://www.pgelephant.com/docs/neurondb/gpu/cuda-support',
  },
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'configuration', title: 'Configuration' },
  { id: 'gpu-distance-calculations', title: 'GPU Distance Calculations' },
  { id: 'check-gpu-status', title: 'Check GPU Status' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/gpu',
  label: 'GPU Acceleration',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/gpu/rocm-support',
  label: 'ROCm Support',
}

export default function CUDASupportPage() {
  return (
    <PostgresDocsLayout
      title="CUDA Support"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>CUDA support provides GPU acceleration for vector distance calculations and ML operations.</p>
      </section>

      <section id="configuration">
        <h2>Configuration</h2>
        <p>Enable CUDA in <code>postgresql.conf</code>:</p>
        <BashCodeBlock
          title="postgresql.conf"
          code={`shared_preload_libraries = 'neurondb'
neurondb.gpu_enabled = true
neurondb.gpu_backend = 'cuda'
neurondb.gpu_device = 0`}
        />
      </section>

      <section id="gpu-distance-calculations">
        <h2>GPU Distance Calculations</h2>
        <SqlCodeBlock
          title="GPU-accelerated L2 distance"
          code={`-- GPU-accelerated L2 distance
SELECT vector_l2_distance_gpu(
    '[1.0, 2.0, 3.0]'::vector,
    '[4.0, 5.0, 6.0]'::vector
) AS distance;`}
        />
        <SqlCodeBlock
          title="GPU-accelerated cosine distance"
          code={`-- GPU-accelerated cosine distance
SELECT vector_cosine_distance_gpu(
    embedding,
    query_vector
) AS distance
FROM documents;`}
        />
      </section>

      <section id="check-gpu-status">
        <h2>Check GPU Status</h2>
        <SqlCodeBlock
          title="GPU information"
          code={`-- GPU information
SELECT neurondb_gpu_info();

-- GPU statistics
SELECT * FROM pg_stat_neurondb_gpu;`}
        />
      </section>

      <section>
        <h2>Learn More</h2>
        <p>
          For detailed documentation on CUDA setup, GPU optimization, and performance tuning, visit:{' '}
          <a href="https://pgelephant.com/neurondb/gpu/" target="_blank" rel="noopener noreferrer">
            CUDA Support Documentation
          </a>
        </p>
      </section>

      <section>
        <h2>Related Topics</h2>
        <ul>
          <li><a href="/docs/neurondb/gpu/auto-detection">GPU Auto-Detection</a> - Automatic GPU setup</li>
          <li><a href="/docs/neurondb/gpu/rocm-support">ROCm Support</a> - AMD GPU support</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

