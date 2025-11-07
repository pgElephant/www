export const metadata = {
  title: 'NeurondB Quantization Strategies | Memory Efficient Vector Search',
  description:
    'Configure NeurondB product quantization, scalar quantization, and residual compression to lower memory usage while preserving recall. Includes SQL recipes and tuning guidance.',
}

import Link from 'next/link'
import { BadgeCheck, Cpu, Gauge, Layers } from 'lucide-react'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../../components/BashCodeBlock'
import { NeurondBIcon } from '../../../../../components/ProductIcons'

const quantizationModes = [
  {
    id: 'product-quantization',
    title: 'Product Quantization (PQ)',
    icon: <Layers className="h-6 w-6 text-purple-400" />,
    description:
      'Splits vectors into subvectors, assigns each to a codebook centroid, and stores compact codes for fast approximate distance computation. Balances recall with aggressive compression.',
    parameters: [
      { name: 'neurondb.pq_subvector_dim', value: '32', note: 'Dimensions per sub-vector' },
      { name: 'neurondb.pq_codebooks', value: '256', note: 'Centroids per subspace (2^8)' },
      { name: 'neurondb.pq_use_residuals', value: 'on', note: 'Stores residual vector for recall boosts' },
    ],
    sql: `CREATE INDEX ON documents
USING neurondb_ivf_hnsw (embedding)
WITH (
  metric = 'cosine',
  pq_enabled = true,
  pq_subvector_dim = 32,
  pq_codebooks = 256,
  pq_residual = true
);`,
  },
  {
    id: 'scalar-quantization',
    title: 'Scalar Quantization (SQ)',
    icon: <Gauge className="h-6 w-6 text-cyan-400" />,
    description:
      'Quantizes each dimension independently to 8-bit or 16-bit values. Simplest compression with predictable error bounds and GPU-friendly arithmetic.',
    parameters: [
      { name: 'neurondb.sq_bits_per_dim', value: '8', note: '4 or 8 bits recommended' },
      { name: 'neurondb.sq_dynamic_range', value: 'percentile', note: 'Auto scales using percentile range' },
      { name: 'neurondb.sq_rebalance_interval', value: '3600s', note: 'Recalibrates quantizers hourly' },
    ],
    sql: `ALTER TABLE telemetry_embeddings
ALTER COLUMN embedding
SET STORAGE neurondb_scalar(8);

SELECT neurondb_rebalance_scalar_quantizer('telemetry_embeddings', 'embedding');`,
  },
  {
    id: 'binary-quantization',
    title: 'Binary Quantization',
    icon: <Cpu className="h-6 w-6 text-amber-400" />,
    description:
      'Thresholds vector components into binary codes for Hamming distance search. Ideal for large-scale dedupe and anomaly fingerprinting workloads.',
    parameters: [
      { name: 'neurondb.binary_threshold', value: 'median', note: 'Median per dimension' },
      { name: 'neurondb.binary_pack_width', value: '64', note: 'Bit packing for SIMD execution' },
      { name: 'neurondb.binary_use_gpu', value: 'auto', note: 'Auto selects GPU at >1M vectors' },
    ],
    sql: `UPDATE media_fingerprints
SET fingerprint = neurondb_to_binary(embedding);

CREATE INDEX ON media_fingerprints
USING neurondb_hamming (fingerprint);`,
  },
]

const QuantizationPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900 via-slate-900 to-indigo-900 opacity-90" />
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-6 px-6 pb-16 pt-16">
          <div className="inline-flex items-center gap-3 rounded-full border border-fuchsia-400/40 bg-fuchsia-500/10 px-4 py-2 text-sm text-fuchsia-100">
            <NeurondBIcon size={24} />
            <span>NeurondB · Quantization Strategies</span>
          </div>
          <h1 className="text-4xl font-bold text-white md:text-5xl">Compress vectors without sacrificing recall</h1>
          <p className="max-w-3xl text-base text-fuchsia-100 md:text-lg">
            Quantization enables billion-scale search and GPU efficiency. Learn how to apply product, scalar, and binary quantization in NeurondB, monitor quality, and rebalance codebooks as your corpus grows.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/docs/neurondb/performance"
              className="inline-flex items-center gap-2 rounded-xl bg-fuchsia-500/20 px-4 py-2 text-sm font-semibold text-fuchsia-100 transition hover:bg-fuchsia-500/30"
            >
              Performance Tuning
            </Link>
            <Link
              href="/docs/neurondb/background-workers"
              className="inline-flex items-center gap-2 rounded-xl border border-fuchsia-400/40 px-4 py-2 text-sm font-semibold text-fuchsia-200 transition hover:border-fuchsia-300"
            >
              Automation Workers
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-16 px-6 pb-24 pt-12">
        {quantizationModes.map((mode) => (
          <section key={mode.id} id={mode.id} className="rounded-3xl border border-slate-700/60 bg-slate-900/70 p-8 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800/80">
                {mode.icon}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">{mode.title}</h2>
                <p className="text-sm text-slate-300">{mode.description}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
              <div className="space-y-4 text-sm text-slate-300">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-fuchsia-300">Key Parameters</h3>
                  <ul className="mt-2 space-y-2">
                    {mode.parameters.map((param) => (
                      <li key={param.name} className="flex items-start gap-3">
                        <BadgeCheck className="mt-1 h-4 w-4 text-fuchsia-400" />
                        <div>
                          <span className="font-semibold text-slate-100">{param.name}</span>
                          <span className="ml-2 rounded-full bg-fuchsia-500/10 px-2 py-0.5 text-xs text-fuchsia-200">{param.value}</span>
                          <div className="text-xs text-slate-400">{param.note}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <SqlCodeBlock title="Configuration" code={mode.sql} />
              </div>
            </div>
          </section>
        ))}

        <section id="monitoring" className="rounded-3xl border border-fuchsia-500/40 bg-fuchsia-500/10 p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-white">Monitor quantization quality</h2>
          <p className="mt-2 max-w-3xl text-sm text-fuchsia-100">
            Use system views and scheduled workers to validate recall, drift, and compression ratios. Quantization introduces approximation—monitor regularly to keep SLOs intact.
          </p>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <SqlCodeBlock
              title="Assess Recall vs Baseline"
              code={`WITH baseline AS (
  SELECT id, embedding <-> embed_text('retrieval quality') AS baseline_distance
  FROM   validation_corpus
),
quantized AS (
  SELECT id, embedding <-> embed_text('retrieval quality') AS quantized_distance
  FROM   validation_corpus
)
SELECT
  percent_rank() WITHIN GROUP (ORDER BY quantized_distance / baseline_distance) AS recall_loss,
  AVG(quantized_distance - baseline_distance) AS avg_delta
FROM quantized
JOIN baseline USING (id);`}
            />
            <SqlCodeBlock
              title="Track Compression Ratios"
              code={`SELECT
  table_schema,
  table_name,
  neurondb_quantization_ratio(table_schema, table_name, 'embedding') AS ratio,
  last_rebalanced_at
FROM   neurondb_quantization_catalog
ORDER  BY ratio;`}
            />
          </div>
        </section>

        <section id="automation" className="rounded-3xl border border-slate-700/60 bg-slate-900/80 p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-white">Automate with background workers</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Combine quantization with NeurondB background workers for continuous optimisation.
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Link
              href="/docs/neurondb/background-workers#neuranmon"
              className="rounded-2xl border border-slate-700/50 bg-slate-900/70 p-4 text-sm text-fuchsia-200 transition hover:border-fuchsia-400"
            >
              neuranmon Auto-Tuner
            </Link>
            <Link
              href="/docs/neurondb/background-workers#neurandefrag"
              className="rounded-2xl border border-slate-700/50 bg-slate-900/70 p-4 text-sm text-fuchsia-200 transition hover:border-fuchsia-400"
            >
              neurandefrag Maintenance
            </Link>
          </div>
        </section>

        <section id="next-steps" className="rounded-3xl border border-slate-700/60 bg-slate-950/80 p-8">
          <h2 className="text-2xl font-semibold text-white">Next Steps</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <Link
              href="/docs/neurondb/features/distance-metrics"
              className="rounded-2xl border border-slate-700/50 bg-slate-900/70 p-4 text-sm text-fuchsia-200 transition hover:border-fuchsia-400"
            >
              Distance Metrics Guide
            </Link>
            <Link
              href="/docs/neurondb/indexing"
              className="rounded-2xl border border-slate-700/50 bg-slate-900/70 p-4 text-sm text-fuchsia-200 transition hover:border-fuchsia-400"
            >
              Indexing Strategies
            </Link>
            <Link
              href="/docs/neurondb/ml/embeddings"
              className="rounded-2xl border border-slate-700/50 bg-slate-900/70 p-4 text-sm text-fuchsia-200 transition hover:border-fuchsia-400"
            >
              Embedding Generation
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

export default QuantizationPage
