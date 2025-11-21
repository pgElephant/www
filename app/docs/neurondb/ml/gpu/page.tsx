import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'NeuronDB · GPU Acceleration (CUDA & Metal)',
  description: 'Accelerate vector operations 10-100x with GPU support in NeuronDB using CUDA or Apple Metal.',
}

const tableOfContents: TocItem[] = [
  { id: 'enable-gpu', title: 'Enable GPU Support' },
  { id: 'cuda', title: 'CUDA (NVIDIA GPUs)' },
  { id: 'metal', title: 'Metal (Apple Silicon)' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/ml/hyperparameter-tuning',
  label: 'Hyperparameter Tuning',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/ml/text-ml',
  label: 'Text ML',
}

export default function Page() {
  return (
    <PostgresDocsLayout
      title="GPU Acceleration"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="enable-gpu">
        <h2>Enable GPU Support</h2>
        <p>Speed up vector operations 10-100x with NVIDIA CUDA or Apple Metal backends.</p>
      </section>

      <section id="cuda">
        <h2>CUDA (NVIDIA GPUs)</h2>
        <BashCodeBlock
          title="Enable CUDA"
          code={`-- Enable CUDA GPU backend
SET neurondb.gpu_enabled = true;
SET neurondb.gpu_backend = 'cuda';`}
        />
        <p>CUDA provides significant speedups for large-scale vector operations and ML training.</p>
      </section>

      <section id="metal">
        <h2>Metal (Apple Silicon)</h2>
        <BashCodeBlock
          title="Enable Metal"
          code={`-- Enable Metal GPU backend
SET neurondb.gpu_enabled = true;
SET neurondb.gpu_backend = 'metal';`}
        />
        <p>Metal provides GPU acceleration on Apple Silicon Macs.</p>
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/gpu">GPU Guide</a> - Complete GPU documentation</li>
          <li><a href="/docs/neurondb/ml/text-ml">Text ML</a> - Text processing with GPU</li>
          <li><a href="/docs/neurondb/performance">Performance</a> - Optimize GPU performance</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
