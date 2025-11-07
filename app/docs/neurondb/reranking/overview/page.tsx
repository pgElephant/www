export const metadata = {
  title: 'NeurondB Reranking Overview | Cross-Encoder Playbooks',
  description:
    'Improve retrieval relevance with NeurondB reranking pipelines. Use cross-encoders, LLM verification, and fallback scoring to refine top-K candidates.',
}

import Link from 'next/link'
import { Award, Compass, Rocket, Target } from 'lucide-react'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'
import BashCodeBlock from '../../../../../components/BashCodeBlock'
import { NeurondBIcon } from '../../../../../components/ProductIcons'

const RerankingOverviewPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-slate-900 to-violet-900 opacity-90" />
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-6 px-6 pb-16 pt-16">
          <div className="inline-flex items-center gap-3 rounded-full border border-purple-400/40 bg-purple-500/10 px-4 py-2 text-sm text-purple-100">
            <NeurondBIcon size={24} />
            <span>NeurondB · Reranking</span>
          </div>
          <h1 className="text-4xl font-bold text-white md:text-5xl">Boost relevance with cross-encoder reranking</h1>
          <p className="max-w-3xl text-base text-purple-100 md:text-lg">
            Reorder vector search candidates with ONNX cross-encoders, scoring functions, or LLM verification. Blend offline evaluation with online metrics to guard against regressions.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/docs/neurondb/ml/inference"
              className="inline-flex items-center gap-2 rounded-xl bg-purple-500/20 px-4 py-2 text-sm font-semibold text-purple-100 transition hover:bg-purple-500/30"
            >
              Inference Runtime
            </Link>
            <Link
              href="/docs/neurondb/hybrid/overview"
              className="inline-flex items-center gap-2 rounded-xl border border-purple-400/40 px-4 py-2 text-sm font-semibold text-purple-200 transition hover:border-purple-300"
            >
              Hybrid Retrieval
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-16 px-6 pb-24 pt-12">
        <section id="pipeline" className="rounded-3xl border border-slate-700/60 bg-slate-900/70 p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-white">End-to-end pipeline</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Retrieve top-K vectors, rerank them with cross-encoders, then evaluate with business-specific scoring. This pattern keeps latency predictable while improving quality.
          </p>
          <SqlCodeBlock
            title="Three-stage rerank"
            code={`WITH initial AS (
  SELECT id,
         content,
         embedding <-> embed_text('PostgreSQL failover') AS distance
  FROM   docs
  ORDER  BY distance
  LIMIT  80
),
ranked AS (
  SELECT id,
         neurondb_rerank(
           model_name => 'cross-encoder-nli-base',
           query      => 'PostgreSQL failover',
           document   => content
         ) AS cross_score
  FROM   initial
),
scored AS (
  SELECT id,
         cross_score,
         distance,
         0.7 * cross_score + 0.3 * (1 - distance) AS final_score
  FROM   ranked
  JOIN   initial USING (id)
)
SELECT id, final_score
FROM   scored
ORDER  BY final_score DESC
LIMIT  15;`}
          />
        </section>

        <section id="batching" className="rounded-3xl border border-purple-500/40 bg-purple-500/10 p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-white">Batch efficiently</h2>
          <p className="mt-2 max-w-3xl text-sm text-purple-100">
            Batch reranking requests to maintain throughput. The NeurondB inference scheduler groups payloads and leverages GPU execution when available.
          </p>
          <BashCodeBlock
            title="Tune batching"
            code={`-- Limit max rerank latency to 40ms
SET neurondb.session_inference_max_latency = '40ms';

-- Process 32 candidates per batch
SET neurondb.session_rerank_batch_size = 32;`}
          />
        </section>

        <section id="evaluation" className="rounded-3xl border border-slate-700/60 bg-slate-900/70 p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-white">Evaluate & guardrail</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Store offline metrics and track production KPIs like click-through-rate to prevent regressions when rolling out new models.
          </p>
          <SqlCodeBlock
            title="Log evaluation"
            code={`INSERT INTO neurondb_rerank_metrics (
  experiment,
  model_name,
  metric,
  value
) VALUES (
  'support-search',
  'cross-encoder-nli-base',
  'nDCG@10',
  0.918
);`}
          />
        </section>

        <section id="tips" className="rounded-3xl border border-slate-700/60 bg-slate-950/80 p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-white">Operational tips</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-3"><Target className="h-5 w-5 text-purple-300" />Set <code>neurondb.rerank_candidate_limit</code> based on latency budgets.</li>
            <li className="flex items-start gap-3"><Award className="h-5 w-5 text-purple-300" />Track per-model win rates with <code>neurondb_rerank_metrics</code> table.</li>
            <li className="flex items-start gap-3"><Compass className="h-5 w-5 text-purple-300" />Provide fallback scoring to handle outages (<code>IF cross_score IS NULL</code>).</li>
            <li className="flex items-start gap-3"><Rocket className="h-5 w-5 text-purple-300" />Use background workers to warm caches before high-traffic events.</li>
          </ul>
        </section>
      </main>
    </div>
  )
}

export default RerankingOverviewPage
