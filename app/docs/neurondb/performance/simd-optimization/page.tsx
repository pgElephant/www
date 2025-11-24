import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'SIMD Optimization | NeuronDB Performance',
  description: 'AVX2/AVX512 (x86_64) and NEON (ARM64) optimization with prefetching in NeuronDB.',
}

const tableOfContents: TocItem[] = [
  { id: 'overview', title: 'Overview' },
  { id: 'supported-architectures', title: 'Supported Architectures' },
  { id: 'automatic-optimization', title: 'Automatic Optimization' },
  { id: 'performance', title: 'Performance' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/performance',
  label: 'Performance',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/performance/monitoring',
  label: 'Monitoring',
}

export default function SIMDOptimizationPage() {
  return (
    <PostgresDocsLayout
      title="SIMD Optimization"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="overview">
        <h2>Overview</h2>
        <p>NeuronDB uses SIMD (Single Instruction, Multiple Data) instructions for faster vector operations.</p>
      </section>

      <section id="supported-architectures">
        <h2>Supported Architectures</h2>
        <ul>
          <li><strong>x86_64</strong>: AVX2 and AVX512 with FMA instructions</li>
          <li><strong>ARM64</strong>: NEON with dotprod extension</li>
        </ul>
      </section>

      <section id="automatic-optimization">
        <h2>Automatic Optimization</h2>
        <p>SIMD optimizations are enabled automatically at compile time:</p>
        <SqlCodeBlock
          title="Operations automatically use SIMD"
          code={`-- Operations automatically use SIMD
SELECT embedding <-> query_vector AS distance
FROM documents
ORDER BY distance
LIMIT 10;`}
        />
      </section>

      <section id="performance">
        <h2>Performance</h2>
        <p>SIMD provides significant speedup:</p>
        <ul>
          <li><strong>2-4x faster</strong> for distance calculations</li>
          <li><strong>3-5x faster</strong> for batch operations</li>
        </ul>
      </section>

      <section>
        <h2>Learn More</h2>
        <p>
          For detailed documentation on SIMD optimization, compiler flags, and performance tuning, visit:{' '}
          <a href="https://www.pgelephant.com/docs/neurondb/performance/simd-optimization" target="_blank" rel="noopener noreferrer">
            SIMD Optimization Documentation
          </a>
        </p>
      </section>

      <section>
        <h2>Related Topics</h2>
        <ul>
          <li><a href="/docs/neurondb/gpu/cuda-support">GPU Acceleration</a> - GPU optimization</li>
          <li><a href="/docs/neurondb/performance/monitoring">Monitoring</a> - Performance monitoring</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}

