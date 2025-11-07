export const metadata = {
  title: 'NeurondB Model Inference | ONNX & GPU Serving',
  description:
    'Deploy ONNX models inside PostgreSQL with NeurondB. Configure GPU batching, caching, runtime preferences, and integrate inference with SQL pipelines.',
}

import Link from 'next/link'
import {  } from 'lucide-react'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../../components/BashCodeBlock'
import { NeurondBIcon } from '../../../../../components/ProductIcons'

const InferencePage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-emerald-900 opacity-90" />
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-6 px-6 pb-16 pt-16">
          <div className="inline-flex items-center gap-3 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-100">
            <NeurondBIcon size={24} />
            <span>NeurondB · Model Inference</span>
          </div>
          <h1 className="text-4xl font-bold text-white md:text-5xl">Serve ONNX models directly from PostgreSQL</h1>
          <p className="max-w-3xl text-base text-emerald-100 md:text-lg">
            NeurondB embeds ONNX Runtime for CPU and GPU model execution. Load transformer encoders, rerankers, custom classifiers, and more—no external microservices required.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/docs/neurondb/ml/embeddings"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/30"
            >
              Embedding Generation
            </Link>
            <Link
              href="/docs/neurondb/performance"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-400/40 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:border-emerald-300"
            >
              Performance Tuning
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-16 px-6 pb-24 pt-12">
        <section id="load-models" className="rounded-3xl border border-slate-700/60 bg-slate-900/70 p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-white">Load ONNX models</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Register models once, version them, and share across schemas. Use GitHub releases or object storage URLs for centralized distribution.
          </p>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <SqlCodeBlock
              title="Register a model"
              code={`SELECT neurondb_register_model(
  name          => 'text-embedding-3-small',
  version       => '1.0.0',
  storage_url   => 'https://github.com/pgElephant/NeurondB/releases/download/models/text-embedding-3-small.onnx',
  runtime       => 'onnx',
  device        => 'auto'
);`}
            />
            <SqlCodeBlock
              title="Inspect registry"
              code={`SELECT name, version, device, created_at
FROM   neurondb_model_registry
ORDER  BY created_at DESC;`}
            />
          </div>
        </section>

        <section id="batching" className="rounded-3xl border border-emerald-500/40 bg-emerald-500/10 p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-white">GPU batching & scheduling</h2>
          <p className="mt-2 max-w-3xl text-sm text-emerald-100">
            NeurondB orchestrates micro-batches per GPU worker. Configure queue sizes, max latency, and fallbacks.
          </p>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <BashCodeBlock
              title="postgresql.conf"
              code={`neurondb.gpu_enabled = on
neurondb.gpu_device_ids = '0,1'
neurondb.inference_batch_size = 32
neurondb.inference_max_latency_ms = 25
neurondb.inference_timeout_ms = 1000`}
            />
            <SqlCodeBlock
              title="Session-level overrides"
              code={`SET neurondb.session_inference_batch_size = 16;
SET neurondb.session_inference_max_latency = '15ms';

SELECT neurondb_embed_batch(
  model_name => 'text-embedding-3-small',
  inputs     => ARRAY['vector search', 'pg extension', 'gpu batching']
);`}
            />
          </div>
        </section>

        <section id="pipeline" className="rounded-3xl border border-slate-700/60 bg-slate-900/70 p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-white">Inference pipelines in SQL</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Compose embeddings, reranking, and metadata enrichment inline. Use CTEs and window functions for production-ready retrieval augmented generation (RAG) workflows.
          </p>

          <SqlCodeBlock
            title="RAG pipeline"
            code={`WITH query_embedding AS (
  SELECT neurondb_embed('text-embedding-3-small', 'how do i tune hnsw ef_search?') AS embedding
),
vector_candidates AS (
  SELECT id, doc, embedding <-> (SELECT embedding FROM query_embedding) AS distance
  FROM   support_articles
  ORDER  BY distance
  LIMIT  40
),
reranked AS (
  SELECT id,
         neurondb_rerank(
           model_name => 'cross-encoder-msmarco',
           query      => 'how do i tune hnsw ef_search?',
           document   => doc
         ) AS rerank_score
  FROM   vector_candidates
)
SELECT id, rerank_score
FROM   reranked
ORDER  BY rerank_score DESC
LIMIT  10;`}
          />
        </section>

        <section id="monitoring" className="rounded-3xl border border-emerald-500/40 bg-slate-950/70 p-8">
          <h2 className="text-2xl font-semibold text-white">Monitor runtime health</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            System views expose queue depth, device utilization, and per-model latency. Export to Prometheus or integrate with pg_stat_insights for correlated diagnostics.
          </p>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <SqlCodeBlock
              title="Runtime metrics"
              code={`SELECT model_name,
       device,
       avg_latency_ms,
       p95_latency_ms,
       batch_size,
       queue_depth
FROM   neurondb_inference_metrics
ORDER  BY avg_latency_ms DESC;`}
            />
            <SqlCodeBlock
              title="Queue depth alerts"
              code={`SELECT *
FROM   neurondb_inference_queue
WHERE  queue_depth > 100
ORDER  BY queue_depth DESC;`}
            />
          </div>
        </section>

        <section id="fallback" className="rounded-3xl border border-slate-700/60 bg-slate-900/70 p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-white">Graceful fallbacks</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Configure CPU fallback for GPU saturation, and precompute embeddings to avoid cold start penalties.
          </p>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <BashCodeBlock
              title="Fallback configuration"
              code={`neurondb.gpu_fail_open = on
neurondb.inference_cpu_parallelism = 8
neurondb.inference_warm_start = on`}
            />
            <SqlCodeBlock
              title="Queue warm start"
              code={`-- Pre-warm GPU caches
SELECT neurondb_prerun_model(
  model_name => 'text-embedding-3-small',
  warm_tokens => ARRAY['vector', 'postgresql', 'neurondb']
);`}
            />
          </div>
        </section>

        <section id="next-steps" className="rounded-3xl border border-slate-700/60 bg-slate-950/80 p-8">
          <h2 className="text-2xl font-semibold text-white">Next Steps</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <Link
              href="/docs/neurondb/ml/model-management"
              className="rounded-2xl border border-slate-700/50 bg-slate-900/70 p-4 text-sm text-emerald-200 transition hover:border-emerald-400"
            >
              Model Lifecycle
            </Link>
            <Link
              href="/docs/neurondb/background-workers#neuranq"
              className="rounded-2xl border border-slate-700/50 bg-slate-900/70 p-4 text-sm text-emerald-200 transition hover:border-emerald-400"
            >
              Asynchronous Jobs
            </Link>
            <Link
              href="/docs/neurondb/hybrid/overview"
              className="rounded-2xl border border-slate-700/50 bg-slate-900/70 p-4 text-sm text-emerald-200 transition hover:border-emerald-400"
            >
              Hybrid Retrieval
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

export default InferencePage
