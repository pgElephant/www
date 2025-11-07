export const metadata = {
  title: 'Hybrid Retrieval Overview | NeurondB',
  description:
    'Design hybrid retrieval pipelines that blend BM25, metadata filters, and NeurondB vector search. Learn ranking formulas, index strategies, and fallback plans for production workloads.',
}

import Link from 'next/link'
import { Filter, Layers, Search, SlidersHorizontal } from 'lucide-react'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'
import { NeurondBIcon } from '../../../../../components/ProductIcons'

const HybridOverviewPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-900 via-slate-900 to-indigo-900 opacity-90" />
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-6 px-6 pb-16 pt-16">
          <div className="inline-flex items-center gap-3 rounded-full border border-fuchsia-400/40 bg-fuchsia-500/10 px-4 py-2 text-sm text-fuchsia-100">
            <NeurondBIcon size={24} />
            <span>NeurondB · Hybrid Retrieval</span>
          </div>
          <h1 className="text-4xl font-bold text-white md:text-5xl">Blend lexical and semantic ranking for precision</h1>
          <p className="max-w-3xl text-base text-fuchsia-100 md:text-lg">
            Combine PostgreSQL full-text search, metadata filters, and NeurondB vector scoring to deliver accurate answers with full control over latency and recall.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/docs/neurondb/rag"
              className="inline-flex items-center gap-2 rounded-xl bg-fuchsia-500/20 px-4 py-2 text-sm font-semibold text-fuchsia-100 transition hover:bg-fuchsia-500/30"
            >
              RAG Playbooks
            </Link>
            <Link
              href="/docs/neurondb/features/distance-metrics"
              className="inline-flex items-center gap-2 rounded-xl border border-fuchsia-400/40 px-4 py-2 text-sm font-semibold text-fuchsia-200 transition hover:border-fuchsia-300"
            >
              Distance Metrics
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-16 px-6 pb-24 pt-12">
        <section className="rounded-3xl border border-slate-700/60 bg-slate-900/70 p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-white">Scoring architecture</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Hybrid retrieval uses multiple rankers and merges results. Use the default weighted sum or build custom scoring pipelines with SQL window functions.
          </p>
          <SqlCodeBlock
            title="Weighted hybrid scoring"
            code={`WITH
lexical AS (
  SELECT id,
         ts_rank_cd(search_vector, plainto_tsquery('pg vector search')) AS bm25_score
  FROM   documents
),
semantic AS (
  SELECT id,
         1 - (embedding <=> embed_text('pg vector search')) AS cosine_score
  FROM   documents
)
SELECT d.id,
       0.45 * lexical.bm25_score + 0.55 * semantic.cosine_score AS hybrid_score
FROM   documents d
JOIN   lexical USING (id)
JOIN   semantic USING (id)
ORDER  BY hybrid_score DESC
LIMIT  20;`}
          />
        </section>

        <section className="rounded-3xl border border-fuchsia-500/40 bg-fuchsia-500/10 p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-white">Metadata filtering</h2>
          <p className="mt-2 max-w-3xl text-sm text-fuchsia-100">
            Apply row-level filters and tenant boundaries before scoring to keep results relevant. Use JSONB containment or partitioning for customer isolation.
          </p>
          <SqlCodeBlock
            title="Tenant scoping"
            code={`WITH query_input AS (
  SELECT embed_text('high availability failover guide') AS q_emb,
         'enterprise'::text AS tenant
)
SELECT id,
       title,
       metadata ->> 'tenant' AS tenant,
       embedding <-> (SELECT q_emb FROM query_input) AS distance
FROM   knowledge_base,
       query_input
WHERE  metadata ->> 'tenant' = query_input.tenant
ORDER  BY distance
LIMIT  15;`}
          />
        </section>

        <section className="rounded-3xl border border-slate-700/60 bg-slate-900/70 p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-white">Reranking with cross-encoders</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            After retrieving top K candidates, rerank them with ONNX cross-encoders for better semantic matching. Combine with canary weights to fail open if the reranker is unavailable.
          </p>
          <SqlCodeBlock
            title="Rerank candidates"
            code={`WITH
initial AS (
  SELECT id,
         title,
         content,
         embedding <-> embed_text('configure synchronous replication') AS distance
  FROM   docs
  ORDER  BY distance
  LIMIT  40
)
SELECT id,
       neurondb_rerank(
         model_name => 'cross-encoder-msmarco',
         query      => 'configure synchronous replication',
         document   => content
       ) AS rerank_score
FROM   initial
ORDER  BY rerank_score DESC
LIMIT  10;`}
          />
        </section>

        <section className="rounded-3xl border border-slate-700/60 bg-slate-950/80 p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-white">Operational checklist</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li className="flex items-start gap-3"><Search className="h-5 w-5 text-fuchsia-300" />Tune BM25 weights with <code>ts_rank_cd</code> and store favorites per collection.</li>
            <li className="flex items-start gap-3"><Layers className="h-5 w-5 text-fuchsia-300" />Use CTE layers for retrieval → reranking → final selection transparency.</li>
            <li className="flex items-start gap-3"><Filter className="h-5 w-5 text-fuchsia-300" />Pre-filter by tenant, ACL, or language to avoid leaking sensitive content.</li>
            <li className="flex items-start gap-3"><SlidersHorizontal className="h-5 w-5 text-fuchsia-300" />Expose weighting parameters via configuration tables for runtime tuning.</li>
          </ul>
        </section>
      </main>
    </div>
  )
}

export default HybridOverviewPage
