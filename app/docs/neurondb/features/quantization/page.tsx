import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../../components/BashCodeBlock'

export const metadata: Metadata = {
  title: 'NeurondB Quantization Strategies | Memory Efficient Vector Search',
  description:
    'Configure NeurondB product quantization, scalar quantization, and residual compression to lower memory usage while preserving recall. Includes SQL recipes and tuning guidance.',
}

const tableOfContents: TocItem[] = [
  { id: 'product-quantization', title: 'Product Quantization (PQ)' },
  { id: 'scalar-quantization', title: 'Scalar Quantization (SQ)' },
  { id: 'binary-quantization', title: 'Binary Quantization' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/features/distance-metrics',
  label: 'Distance Metrics',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/indexing',
  label: 'Indexing',
}

export default function QuantizationPage() {
  return (
    <PostgresDocsLayout
      title="Quantization Strategies"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="product-quantization">
        <h2>Product Quantization (PQ)</h2>
        <p>Splits vectors into subvectors, assigns each to a codebook centroid, and stores compact codes for fast approximate distance computation. Balances recall with aggressive compression.</p>

        <h3>Parameters</h3>
        <ul>
          <li><code>neurondb.pq_subvector_dim</code> - Dimensions per sub-vector (default: 32)</li>
          <li><code>neurondb.pq_codebooks</code> - Centroids per subspace (default: 256, 2^8)</li>
          <li><code>neurondb.pq_use_residuals</code> - Stores residual vector for recall boosts (default: on)</li>
        </ul>

        <SqlCodeBlock
          title="PQ index"
          code={`CREATE INDEX ON documents
USING neurondb_ivf_hnsw (embedding)
WITH (
  metric = 'cosine',
  pq_enabled = true,
  pq_subvector_dim = 32,
  pq_codebooks = 256,
  pq_residual = true
);`}
        />
      </section>

      <section id="scalar-quantization">
        <h2>Scalar Quantization (SQ)</h2>
        <p>Quantizes each dimension independently to 8-bit or 16-bit values. Simplest compression with predictable error bounds and GPU-friendly arithmetic.</p>

        <h3>Parameters</h3>
        <ul>
          <li><code>neurondb.sq_bits_per_dim</code> - 4 or 8 bits recommended (default: 8)</li>
          <li><code>neurondb.sq_dynamic_range</code> - Auto scales using percentile range (default: percentile)</li>
          <li><code>neurondb.sq_rebalance_interval</code> - Recalibrates quantizers hourly (default: 3600s)</li>
        </ul>

        <SqlCodeBlock
          title="Scalar quantization"
          code={`ALTER TABLE telemetry_embeddings
ALTER COLUMN embedding
SET STORAGE neurondb_scalar(8);

SELECT neurondb_rebalance_scalar_quantizer('telemetry_embeddings', 'embedding');`}
        />
      </section>

      <section id="binary-quantization">
        <h2>Binary Quantization</h2>
        <p>Thresholds vector components into binary codes for Hamming distance search. Ideal for large-scale dedupe and anomaly fingerprinting workloads.</p>

        <h3>Parameters</h3>
        <ul>
          <li><code>neurondb.binary_threshold</code> - Median per dimension (default: median)</li>
          <li><code>neurondb.binary_pack_width</code> - Bit packing for SIMD execution (default: 64)</li>
          <li><code>neurondb.binary_use_gpu</code> - Auto selects GPU at &gt;1M vectors (default: auto)</li>
        </ul>

        <SqlCodeBlock
          title="Binary quantization"
          code={`UPDATE media_fingerprints
SET fingerprint = neurondb_to_binary(embedding);

CREATE INDEX ON media_fingerprints
USING neurondb_hamming (fingerprint);`}
        />
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/performance">Performance Tuning</a> - Optimize quantized search</li>
          <li><a href="/docs/neurondb/background-workers">Automation Workers</a> - Auto-rebalance quantizers</li>
          <li><a href="/docs/neurondb/indexing">Indexing</a> - Create quantized indexes</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
