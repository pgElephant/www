import { Metadata } from 'next'
import PostgresDocsLayout, { type TocItem, type NavLink } from '../../../../../components/PostgresDocsLayout'
import SqlCodeBlock from '../../../../../components/SqlCodeBlock'

export const metadata: Metadata = {
  title: 'Hybrid Search in NeurondB | Vector + Full-Text Search Fusion Guide',
  description: 'Complete guide to hybrid search in NeurondB combining vector similarity and full-text search. Learn hybrid_search() function, fusion algorithms, metadata filtering, and production deployment strategies for optimal retrieval performance.',
  keywords: [
    'hybrid search NeurondB',
    'vector text search fusion',
    'semantic keyword search',
    'hybrid retrieval',
    'BM25 vector search',
    'multi-signal search',
    'hybrid_search function',
    'lexical semantic fusion',
    'metadata filtering',
    'reranking search results',
    'production search pipeline'
  ].join(', '),
  alternates: {
    canonical: 'https://www.pgelephant.com/docs/neurondb/hybrid/overview',
  },
  openGraph: {
    title: 'Hybrid Search in NeurondB | Vector + Full-Text Fusion',
    description: 'Combine vector similarity and full-text search in NeurondB. Complete guide to hybrid retrieval pipelines.',
    type: 'article',
    url: 'https://www.pgelephant.com/docs/neurondb/hybrid/overview',
  },
}

const tableOfContents: TocItem[] = [
  { id: 'scoring-architecture', title: 'Scoring architecture' },
  { id: 'metadata-filtering', title: 'Metadata filtering' },
  { id: 'reranking', title: 'Reranking with cross-encoders' },
  { id: 'hybrid-search-function', title: 'Hybrid Search Function' },
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

      <section id="hybrid-search-function">
        <h2>Hybrid Search Function</h2>
        <p>NeuronDB provides a <code>hybrid_search</code> function that combines vector similarity and full-text search in a single call:</p>
        <SqlCodeBlock
          title="Hybrid search function"
          code={`-- Hybrid search combining vector and text search
SELECT 
    search_result.id,
    hybrid_search_test.title,
    hybrid_search_test.content,
    search_result.score
FROM hybrid_search_test,
    LATERAL hybrid_search(
        'hybrid_search_test',                    -- table name
        embed_text('database systems', 'all-MiniLM-L6-v2'),  -- query vector
        'database systems',                       -- query text for FTS
        '{}'::text,                              -- additional config
        0.7,                                     -- alpha: vector weight (0-1)
        5                                        -- top K results
    ) AS search_result(id, score)
WHERE hybrid_search_test.id = search_result.id
ORDER BY search_result.score DESC
LIMIT 5;`}
        />
        <p><strong>Function Signature:</strong></p>
        <pre><code>hybrid_search(
    table_name TEXT,    -- Source table name
    query_vector VECTOR, -- Query embedding vector
    query_text TEXT,    -- Query text for full-text search
    config TEXT,        -- Additional configuration (JSON string)
    alpha REAL,         -- Vector weight (0.0-1.0), 1-alpha = text weight
    top_k INTEGER       -- Number of results to return
) RETURNS TABLE (
    id INTEGER,         -- Row ID from source table
    score REAL          -- Combined relevance score
)</code></pre>
      </section>

      <section>
        <h2>Next Steps</h2>
        <ul>
          <li><a href="/docs/neurondb/hybrid/multi-vector">Multi-Vector Search</a> - Multiple embeddings per document</li>
          <li><a href="/docs/neurondb/hybrid/faceted-search">Faceted Search</a> - Category-aware filtering</li>
          <li><a href="/docs/neurondb/hybrid/temporal-search">Temporal Search</a> - Time-decay relevance</li>
          <li><a href="/docs/neurondb/rag">RAG Playbooks</a> - Complete RAG workflows</li>
          <li><a href="/docs/neurondb/features/distance-metrics">Distance Metrics</a> - Tune distance functions</li>
          <li><a href="/docs/neurondb/reranking/overview">Reranking Guide</a> - Cross-encoder reranking</li>
        </ul>
      </section>
    </PostgresDocsLayout>
  )
}
