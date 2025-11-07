export const metadata = {
  title: 'NeurondB Distance Metrics | Vector Similarity Guide',
  description:
    'Understand and tune NeurondB distance metrics including cosine, inner product, L2/L1, Hamming, and hybrid scoring. Includes SQL examples and tuning guidance.',
}

import { Activity, BarChart3, Calculator, Compass, Gauge, Sparkles } from 'lucide-react'
import Link from 'next/link'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../../components/BashCodeBlock'
import { NeurondBIcon } from '../../../../../components/ProductIcons'

const metrics = [
  {
    id: 'l2-distance',
    icon: <Compass className="h-6 w-6 text-indigo-400" />,
    title: 'L2 Distance (<->)',
    description:
      'Euclidean distance between two vectors. Balanced accuracy and performance for normalized embeddings and general semantic search workloads.',
    useCases: ['Semantic document search', 'Image similarity', 'Recommendations'],
    sql: `SELECT id, title, embedding <-> query_embedding AS distance
FROM   neurondb_vectors
ORDER  BY distance
LIMIT  10;`,
    tuning: [
      'Normalize embeddings during ingestion to keep magnitudes comparable',
      'Consider IVF+PQ indexing for billion-scale collections',
      'Set neurondb.metric_preference = l2 to influence planner choices',
    ],
  },
  {
    id: 'inner-product',
    icon: <Activity className="h-6 w-6 text-emerald-400" />,
    title: 'Inner Product (<#>)',
    description:
      'Negative inner product (equivalent to maximizing dot product). Ideal when embeddings are already length-normalized or you want to prioritize directional similarity.',
    useCases: ['Recommendation ranking', 'Two-tower retrieval models', 'Vector reranking pipelines'],
    sql: `SELECT id, product_name, embedding <#> embed_text('wireless earbuds') AS score
FROM   products
ORDER  BY score
LIMIT  20;`,
    tuning: [
      'Normalize embeddings with embed_text(..., normalize => true)',
      'Track score variance with pg_stat_insights histograms',
      'Set neurondb.inner_product_bias to adjust for magnitude break-even points',
    ],
  },
  {
    id: 'cosine-distance',
    icon: <BarChart3 className="h-6 w-6 text-purple-400" />,
    title: 'Cosine Distance (<=>)',
    description:
      'Measure of angular distance between vectors (1 - cosine similarity). Works well for text embeddings and hybrid keyword/semantic ranking.',
    useCases: ['LLM retrieval augmented generation', 'Support ticket similarity', 'Knowledge base search'],
    sql: `SELECT doc_id, summary, embedding <=> embed_text('llm retrieval best practices') AS distance
FROM   kb_articles
ORDER  BY distance
LIMIT  15;`,
    tuning: [
      'Combine with CLASSIFIER reranker functions for hybrid scoring',
      'Monitor neurondb.cosine_precision to adjust GPU/CPU execution balance',
      'Use neurondb.hybrid_weight to blend cosine and lexical scores',
    ],
  },
  {
    id: 'manhattan-distance',
    icon: <Gauge className="h-6 w-6 text-cyan-400" />,
    title: 'L1 / Manhattan Distance (<+>)',
    description:
      'Summation of absolute differences per dimension. Useful for sparse or quantized embeddings where L2 can exaggerate outliers.',
    useCases: ['Anomaly detection', 'Time-series embeddings', 'Quantized representations'],
    sql: `SELECT sensor_id,
       embedding <+> embed_series($1::float4[]) AS divergence
FROM   telemetry_vectors
WHERE  measurement_window = $2
ORDER  BY divergence DESC
LIMIT  5;`,
    tuning: [
      'Pair with sparsevec or PQ compressed vectors for memory efficiency',
      'Set neurondb.l1_gpu_threshold to control GPU offload',
      'Track divergence trends in neurondb_metric_samples view',
    ],
  },
  {
    id: 'hamming-distance',
    icon: <Calculator className="h-6 w-6 text-amber-400" />,
    title: 'Hamming Distance (<%>)',
    description:
      'Counts differing bits between binary vectors. Designed for binary embeddings, perceptual hashes, and fingerprinting workloads.',
    useCases: ['Perceptual image dedupe', 'Audio/video fingerprinting', 'Security anomaly detection'],
    sql: `SELECT asset_id,
       fingerprint <% embed_binary($1) AS distance
FROM   media_fingerprints
ORDER  BY distance
LIMIT  12;`,
    tuning: [
      'Store fingerprints using neurondb.bit type to minimize storage',
      'Configure neurondb.hamming_bit_packing to align CPU vectorization',
      'Use neurondb_distance_profile() to audit distribution per collection',
    ],
  },
]

const hybridExamples = [
  {
    id: 'hybrid-sql',
    title: 'Hybrid BM25 + Cosine',
    description: 'Blend lexical and semantic relevance. Adjust weights to emphasize vector or keyword components.',
    code: `WITH hybrid AS (
  SELECT
    d.id,
    lex.rank AS bm25_rank,
    sem.distance AS cosine_distance,
    lex.rank * 0.4 + (1 - sem.distance) * 0.6 AS combined_score
  FROM
    lex_ranked_documents lex
    JOIN sem_ranked_documents sem ON sem.id = lex.id
)
SELECT *
FROM   hybrid
ORDER  BY combined_score DESC
LIMIT  10;`,
  },
  {
    id: 'metric-profiles',
    title: 'Collect Metric Profiles',
    description: 'Track distribution of distances for quality assurance and drift monitoring.',
    code: `SELECT *
FROM   neurondb_distance_profile('kb_articles', 'embedding', metric => 'cosine');`,
  },
]

const DistanceMetricsPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900 opacity-90" />
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-start gap-6 px-6 pb-16 pt-16">
          <div className="inline-flex items-center gap-3 rounded-full border border-indigo-400/40 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-200">
            <NeurondBIcon size={24} />
            <span>NeurondB · Distance Metrics</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
            Choose the right distance metric for every vector workload
          </h1>
          <p className="max-w-3xl text-base text-indigo-100 md:text-lg">
            NeurondB implements multiple distance operators optimized for CPU and GPU execution. This guide explains how each metric works, when to use it, and how to tune planner preferences for enterprise-grade vector search.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/docs/neurondb/indexing"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-500/20 px-4 py-2 text-sm font-semibold text-indigo-100 transition hover:bg-indigo-500/30"
            >
              Indexing Strategies
            </Link>
            <Link
              href="/docs/neurondb/ml/embeddings"
              className="inline-flex items-center gap-2 rounded-xl border border-indigo-400/40 px-4 py-2 text-sm font-semibold text-indigo-200 transition hover:border-indigo-300"
            >
              Embedding Quality
            </Link>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-5xl space-y-16 px-6 pb-24 pt-12">
        {metrics.map((metric) => (
          <section key={metric.id} id={metric.id} className="rounded-3xl border border-slate-700/60 bg-slate-900/70 p-8 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800/80">
                {metric.icon}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">{metric.title}</h2>
                <p className="text-sm text-slate-300">{metric.description}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              <div className="space-y-4 text-sm text-slate-300">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-indigo-300">Recommended Use Cases</h3>
                  <ul className="mt-2 grid gap-2 md:grid-cols-2">
                    {metric.useCases.map((useCase) => (
                      <li key={useCase} className="flex items-center gap-2 text-slate-200">
                        <Sparkles className="h-4 w-4 text-indigo-400" />
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-indigo-300">Tuning Checklist</h3>
                  <ul className="mt-2 space-y-2 text-sm">
                    {metric.tuning.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <SqlCodeBlock title="Query Example" code={metric.sql} />
              </div>
            </div>
          </section>
        ))}

        <section id="hybrid" className="rounded-3xl border border-indigo-500/40 bg-indigo-500/10 p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-white">Hybrid Scoring Recipes</h2>
          <p className="mt-2 max-w-3xl text-sm text-indigo-100">
            Blend lexical relevance with vector similarity or harvest metric histograms for quality assurance. These examples use standard NeurondB functions and can be automated with background workers.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {hybridExamples.map((example) => (
              <div key={example.id} className="flex flex-col gap-4 rounded-2xl border border-indigo-400/30 bg-slate-950/70 p-6">
                <div>
                  <h3 className="text-lg font-semibold text-indigo-100">{example.title}</h3>
                  <p className="mt-1 text-sm text-slate-300">{example.description}</p>
                </div>
                <SqlCodeBlock title="SQL" code={example.code} />
              </div>
            ))}
          </div>
        </section>

        <section id="gpu-tuning" className="rounded-3xl border border-slate-700/60 bg-slate-900/70 p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-white">GPU Execution & Planner Hints</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            NeurondB automatically chooses CPU or GPU execution paths based on dimensionality, batch size, and planner statistics. Override defaults with configuration or session-level hints when benchmarking.
          </p>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <BashCodeBlock
              title="postgresql.conf"
              code={`# Enable GPU acceleration for distance computations
neurondb.gpu_enabled = on
neurondb.distance_gpu_threshold = 256     # Minimum dimensions for GPU offload
neurondb.metric_preference = 'cosine'     # Planner bias`}
            />
            <SqlCodeBlock
              title="Session Overrides"
              code={`-- Force cosine distance on GPU for benchmarking
SET neurondb.session_metric = 'cosine';
SET neurondb.session_force_gpu = on;

SELECT id, embedding <=> embed_text('retrieval evaluation') AS distance
FROM   eval_corpus
ORDER  BY distance
LIMIT  25;`}
            />
          </div>
        </section>

        <section id="next-steps" className="rounded-3xl border border-slate-700/60 bg-slate-950/80 p-8">
          <h2 className="text-2xl font-semibold text-white">Next Steps</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <Link
              href="/docs/neurondb/features/vector-types"
              className="rounded-2xl border border-slate-700/50 bg-slate-900/70 p-4 text-sm text-indigo-200 transition hover:border-indigo-400"
            >
              Vector Types
            </Link>
            <Link
              href="/docs/neurondb/features/quantization"
              className="rounded-2xl border border-slate-700/50 bg-slate-900/70 p-4 text-sm text-indigo-200 transition hover:border-indigo-400"
            >
              Quantization Techniques
            </Link>
            <Link
              href="/docs/neurondb/hybrid/overview"
              className="rounded-2xl border border-slate-700/50 bg-slate-900/70 p-4 text-sm text-indigo-200 transition hover:border-indigo-400"
            >
              Hybrid Retrieval
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

export default DistanceMetricsPage
