import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Hybrid Retrieval Overview | NeurondB',
  description:
    'Design hybrid retrieval pipelines that blend BM25, metadata filters, and NeurondB vector search. Learn ranking formulas, index strategies, and fallback plans for production workloads.',
}

const tableOfContents: TocItem[] = [
  { id: 'scoring-architecture', title: 'Scoring architecture' },
  { id: 'metadata-filtering', title: 'Metadata filtering' },
  { id: 'reranking', title: 'Reranking with cross-encoders' },
]

const prevLink: NavLink = {
  href: '/docs/neurondb/hybrid',
  label: 'Hybrid Search',
}

const nextLink: NavLink = {
  href: '/docs/neurondb/reranking/overview',
  label: 'Reranking',
}

export default function HybridOverviewPage() {
  return (
    <PostgresDocsLayout
      title="Blend lexical and semantic ranking for precision"
      version="NeurondB Documentation"
      tableOfContents={tableOfContents}
      prevLink={prevLink}
      nextLink={nextLink}
    >
      <section id="scoring-architecture">
        <h2>Scoring architecture</h2>
        <p>Hybrid retrieval uses multiple rankers and merges results. Use the default weighted sum or build custom scoring pipelines with SQL window functions.</p>
        <SqlCodeBlock
          title="Weighted hybrid scoring"
          code={`WITH hybrid AS (
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
LIMIT  10;`}
        />
      </section>

      <section id="metadata-filtering">
        <h2>Metadata filtering</h2>
        <p>Apply row-level filters and tenant boundaries before scoring to keep results relevant. Use JSONB containment or partitioning for customer isolation.</p>
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

      <section id="reranking">
        <h2>Reranking with cross-encoders</h2>
        <p>After retrieving top K candidates, rerank them with ONNX cross-encoders for better semantic matching. Combine with canary weights to fail open if the reranker is unavailable.</p>
        <SqlCodeBlock
          title="Rerank candidates"
          code={`WITH
initial AS (
  SELECT id,
         title,
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
           document   => title
         ) AS cross_score
  FROM   initial
)
SELECT id, cross_score
FROM   ranked
ORDER  BY cross_score DESC
LIMIT  15;`}
        />
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/rag">RAG Playbooks</a> - Complete RAG workflows</li>
          <li><a href="/docs/neurondb/features/distance-metrics">Distance Metrics</a> - Tune distance functions</li>
          <li><a href="/docs/neurondb/reranking/overview">Reranking Guide</a> - Cross-encoder reranking</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
